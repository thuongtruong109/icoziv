type ResponseHeaders = Record<string, string>;

export async function createEtag(content: string): Promise<string> {
  const bytes = new TextEncoder().encode(content);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  const hash = Array.from(new Uint8Array(digest), byte =>
    byte.toString(16).padStart(2, '0'),
  ).join('');
  return `"sha256-${hash}"`;
}

export function requestMatchesEtag(request: Request, etag: string): boolean {
  const ifNoneMatch = request.headers.get('If-None-Match');
  if (!ifNoneMatch) return false;

  return ifNoneMatch.split(',').some(candidate => {
    const normalized = candidate.trim();
    return (
      normalized === '*' || normalized === etag || normalized === `W/${etag}`
    );
  });
}

export async function contentResponse(
  request: Request,
  content: string,
  headers: ResponseHeaders,
): Promise<Response> {
  const etag = await createEtag(content);
  const responseHeaders = { ...headers, ETag: etag };

  if (requestMatchesEtag(request, etag)) {
    return new Response(null, { status: 304, headers: responseHeaders });
  }

  return new Response(request.method === 'HEAD' ? null : content, {
    headers: responseHeaders,
  });
}
