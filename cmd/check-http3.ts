import { checkHttp3 } from './lib/http3.js';

const defaultUrl = 'https://i.icoziv.workers.dev/icons?i=js';
const usage = 'Usage: bun run check:http3 [https://host/path]';
const args = process.argv.slice(2);

try {
  if (args.length === 1 && args[0] === '--help') {
    console.log(usage);
  } else {
    if (args.length > 1) throw new Error(usage);
    const result = checkHttp3(args[0] ?? defaultUrl);
    console.log(`Verified HTTP/3: ${result.url} (HTTP ${result.status})`);
  }
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
}
