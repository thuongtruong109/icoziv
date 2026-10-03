# HTTP/3 (QUIC)

Icoziv's API runs on Cloudflare Workers. Cloudflare negotiates HTTP/3 between
the client and its edge; the Worker handles the same HTTPS requests regardless
of the transport. QUIC can improve performance on lossy networks, but a speed
improvement depends on the client and network.

## Current deployment

The API uses `https://i.icoziv.workers.dev`, with `workers_dev = true` in
`wrangler.toml`. Cloudflare manages this hostname's transport configuration.
There is no HTTP/3 switch in the Worker code or Wrangler configuration.

On 2026-10-04 (Asia/Saigon), a GET request to `/icons?i=js` returned HTTP 200
with this edge header:

```http
alt-svc: h3=":443"; ma=86400
```

This advertises HTTP/3 on port 443. The checking machine's curl lacked HTTP/3
support, so this observation does **not** confirm a successful QUIC handshake.
Do not add a hard-coded `Alt-Svc` header to Worker responses: advertising a
protocol does not enable a listener, and Cloudflare owns that configuration.

The Next.js playground is exported to GitHub Pages. Its hosting provider
controls its transport separately; Worker settings do not enable HTTP/3 for
the playground or third-party image hosts.

## Custom domains

For a Worker served on a domain in your own Cloudflare zone:

1. Connect the hostname to the Worker using a Custom Domain or proxied route.
2. Ensure the hostname has an active Cloudflare edge SSL certificate.
3. In the zone dashboard, open **Speed > Settings > Protocol Optimization**
   and turn **HTTP/3** on.
4. Verify the exact hostname after deployment with the check below.

Cloudflare also exposes the zone setting through
`PATCH /zones/{zone_id}/settings/http3` with the body `{"value":"on"}`.
This is a zone setting, not an account ID or Worker binding.
API authentication requires a token with **Zone Settings Write** permission.

## Verify a real connection

Use curl 7.88.0 or later built with HTTP/3 support. `curl --version` must list
`HTTP3` on the `Features:` line. On Windows, inspect `curl.exe --version`;
the bundled Windows curl may lack that feature.

```bash
bun run check:http3
# Or check a custom hostname:
bun run check:http3 'https://your-domain.example/icons?i=js'
```

The check performs an HTTPS GET with `--http3-only` and requires both a
negotiated HTTP version of 3 and a 2xx response. It verifies TLS normally,
does not follow redirects, and bounds connection and transfer time. It exits
nonzero for unsupported curl builds, failed QUIC connections, older HTTP
versions, or unsuccessful responses. It makes no configuration changes.

`--http3` alone allows fallback to HTTP/2 or HTTP/1.1, so a successful transfer
with that flag is insufficient proof. Likewise, an `Alt-Svc` header alone is
only an advertisement.

Run this separately from unit tests, on a network that permits QUIC traffic
(normally UDP 443). Proxy restrictions or blocked UDP can prevent the check
from succeeding even when Cloudflare has HTTP/3 enabled. Ordinary clients
can continue using HTTP/2 or HTTP/1.1 when QUIC is unavailable. For browser
verification, inspect the API request's **Protocol** column in the Network
panel and look for `h3`; an initial request may use an older protocol.

## References

- [Cloudflare HTTP/3 configuration](https://developers.cloudflare.com/speed/optimization/protocol/http3/)
- [Cloudflare Worker routes and domains](https://developers.cloudflare.com/workers/configuration/routing/)
- [Cloudflare zone settings API](https://developers.cloudflare.com/api/resources/zones/subresources/settings/methods/edit/)
- [curl HTTP/3-only option](https://curl.se/docs/manpage.html#--http3-only)
