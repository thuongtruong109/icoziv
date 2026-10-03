import { spawnSync } from 'node:child_process';

type CurlRunner = (args: string[]) => string;

export interface Http3CheckResult {
  url: string;
  status: number;
}

function runCurl(args: string[]): string {
  const executable = process.platform === 'win32' ? 'curl.exe' : 'curl';
  const result = spawnSync(executable, args, {
    encoding: 'utf8',
    timeout: 25000,
  });

  if (result.error) {
    throw new Error(`Cannot run curl: ${result.error.message}`);
  }
  if (result.status !== 0) {
    throw new Error(
      `curl failed (exit ${result.status ?? 'unknown'}): ${result.stderr.trim()}`,
    );
  }

  return result.stdout;
}

export function checkHttp3(
  target: string,
  run: CurlRunner = runCurl,
): Http3CheckResult {
  const url = new URL(target);
  if (url.protocol !== 'https:' || url.username || url.password) {
    throw new Error('Use an HTTPS URL without embedded credentials.');
  }
  url.hash = '';

  const version = run(['--disable', '--version']);
  if (!/^Features:.*\bHTTP3\b/m.test(version)) {
    throw new Error(
      'curl lacks HTTP/3 support. Use a build with HTTP3 in its Features line; see docs/http3.md.',
    );
  }

  const output = run([
    '--disable',
    '--http3-only',
    '--proto',
    '=https',
    '--globoff',
    '--silent',
    '--show-error',
    '--connect-timeout',
    '10',
    '--max-time',
    '20',
    '--output',
    process.platform === 'win32' ? 'NUL' : '/dev/null',
    '--write-out',
    '%{http_version} %{http_code}',
    '--url',
    url.toString(),
  ]).trim();

  const match = /^3(?:\.0)? (\d{3})$/.exec(output);
  const status = match ? Number(match[1]) : 0;
  if (status < 200 || status >= 300) {
    throw new Error(
      `Expected HTTP/3 with a 2xx response; curl reported ${JSON.stringify(output)}.`,
    );
  }

  return { url: url.toString(), status };
}
