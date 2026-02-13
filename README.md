<div align="center">

  ![CI status](https://img.shields.io/github/actions/workflow/status/thuongtruong109/icoziv/ci.yml?branch=main&label=Test&logo=github&style=flat)
  [![Website](https://img.shields.io/badge/Playground-121013?style=flat&logo=github&logoColor=white)](https://thuongtruong109.github.io/icoziv)
  ![Icons](public/count.svg)
  ![Cloudflare](https://img.shields.io/badge/Cloudflare-F38020?style=flat&logo=Cloudflare&logoColor=white)
  ![Contribute](https://img.shields.io/badge/Contributions-welcome-00a6f4.svg?style=flat&logo=git)
  ![Star](https://img.shields.io/static/v1?label=%F0%9F%8C%9F&message=If%20Useful&style=style=flat&color=BC4E99)
  [![License](https://img.shields.io/badge/MIT%20License-2b9348?style=flat&logo=monkeytie&logoColor=white)](./LICENSE)

   <!-- ![Contribute](https://img.shields.io/badge/Contributions-welcome-violet.svg?style=flat&logo=git) -->
  <!-- <a href="https://github.com/thuongtruong109/icoziv/pulls"><img src="https://img.shields.io/github/issues-pr/thuongtruong109/icoziv" alt="Pull Requests Badge"/></a> -->
  <!-- <a href="https://github.com/thuongtruong109/icoziv/graphs/contributors"><img alt="GitHub contributors" src="https://img.shields.io/github/contributors/thuongtruong109/icoziv?color=2b9348&logo=git"></a> -->

  <img src="./.github/assets/brand.png#gh-dark-mode-only" alt="Brand Dark" />
  <img src="./.github/assets/brand-light.png#gh-light-mode-only" alt="Brand Light" />
</div>

<!-- ## 🐱‍💻 Hacktoberfest 2025

> 💡 This project is participating in Hacktoberfest 2025! We're excited to welcome contributions from the community. Feel free to open pull requests to add new icons or improve the project. Let's make it even better together!

![Hacktoberfest](.github/assets/hacktoberfest-2025.png) -->

> [!IMPORTANT]
> We'd really appreciate it if you would consider starring our repository! It helps us gain visibility and support the project.

## 📚 Contents

[![About](https://img.shields.io/badge/1.%20About-yellow?style=flat)](#-about)
[![Features](https://img.shields.io/badge/2.%20Features-blue?style=flat)](#features)
[![Specifying Icons](https://img.shields.io/badge/3.%20Specifying-success?style=flat)](#specifying-icons)
[![Themed Icons](https://img.shields.io/badge/4.%20Themed-orange?style=flat)](#themed-icons)
[![Icons Per Line](https://img.shields.io/badge/5.%20Per%20Line-00a6f4?style=flat)](#icons-per-line)
[![Centering Icons](https://img.shields.io/badge/6.%20Centering-pink?style=flat)](#centering-icons)
[![API Reference](https://img.shields.io/badge/7.%20API-00bba7?style=flat)](#-api-reference)
[![Examples](https://img.shields.io/badge/8.%20Examples-9cf?style=flat)](#-example)
[![Icons List](https://img.shields.io/badge/9.%20List-purple?style=flat)](#icons-list)

## 🧩 About

**Icoziv** is a fast, serverless service that generates beautiful skill and technology icon badges for your GitHub README files. Built for lightning-fast performance and global CDN distribution, it provides an easy way to showcase your tech stack with customizable themes and layouts.

Simply specify the technologies you use, and get a professional-looking SVG badge that automatically adapts to your README's theme.

<p align="center"><img align="center" src="./.github/assets/example-dark.png#gh-dark-mode-only"/></p>
<p align="center"><img align="center" src="./.github/assets/example-light.png#gh-light-mode-only"/></p>

## ⚙️ Features

<img src="https://static.vecteezy.com/system/resources/previews/010/151/789/original/tick-icon-accept-approve-sign-design-free-png.png" alt="tick" width="12" height="12" /> **Fast and Serverless:** Built for speed and efficiency, leveraging serverless architecture for instant icon generation.<br/>
<img src="https://static.vecteezy.com/system/resources/previews/010/151/789/original/tick-icon-accept-approve-sign-design-free-png.png" alt="tick" width="12" height="12" /> **Global CDN & Smart Routing:** Icons are served from Cloudflare's global CDN with Smart Placement for optimal edge routing and low latency worldwide.<br/>
<img src="https://static.vecteezy.com/system/resources/previews/010/151/789/original/tick-icon-accept-approve-sign-design-free-png.png" alt="tick" width="12" height="12" /> **Immutable Content:** SVG icons are cached indefinitely with the `immutable` flag, ensuring unchanged assets are always served instantly from edge caches.<br/>
<img src="https://static.vecteezy.com/system/resources/previews/010/151/789/original/tick-icon-accept-approve-sign-design-free-png.png" alt="tick" width="12" height="12" /> **Stale-While-Revalidate:** Stale content is served immediately while the cache updates in the background, minimizing latency on cache misses.<br/>
<img src="https://static.vecteezy.com/system/resources/previews/010/151/789/original/tick-icon-accept-approve-sign-design-free-png.png" alt="tick" width="12" height="12" /> **CDN-Friendly & Conditional Headers:** Optimized for Cloudflare's CDN infrastructure with advanced cache-control, ETag, and If-None-Match support for efficient conditional requests (304 Not Modified).<br/>
<img src="https://static.vecteezy.com/system/resources/previews/010/151/789/original/tick-icon-accept-approve-sign-design-free-png.png" alt="tick" width="12" height="12" /> **CORS Support:** Cross-origin resource sharing enabled for seamless caching and embedding across domains.<br/>
<img src="https://static.vecteezy.com/system/resources/previews/010/151/789/original/tick-icon-accept-approve-sign-design-free-png.png" alt="tick" width="12" height="12" /> **Compression:** Automatic gzip/brotli compression via Accept-Encoding negotiation for reduced payload sizes.<br/>
<img src="https://static.vecteezy.com/system/resources/previews/010/151/789/original/tick-icon-accept-approve-sign-design-free-png.png" alt="tick" width="12" height="12" /> **Resource Limits:** Predictable performance with CPU time limits and resource caps at the edge.<br/>
<img src="https://static.vecteezy.com/system/resources/previews/010/151/789/original/tick-icon-accept-approve-sign-design-free-png.png" alt="tick" width="12" height="12" /> **Customizable Themes:** Choose between dark and light themes to match your README's style.<br/>
<img src="https://static.vecteezy.com/system/resources/previews/010/151/789/original/tick-icon-accept-approve-sign-design-free-png.png" alt="tick" width="12" height="12" /> **Flexible Layouts:** Easily adjust the number of icons per line and their alignment.<br/>
<img src="https://static.vecteezy.com/system/resources/previews/010/151/789/original/tick-icon-accept-approve-sign-design-free-png.png" alt="tick" width="12" height="12" /> **Extensive Icon Library:** A wide range of technology and skill icons to choose from.<br/>
<img src="https://static.vecteezy.com/system/resources/previews/010/151/789/original/tick-icon-accept-approve-sign-design-free-png.png" alt="tick" width="12" height="12" /> **Open Source:** Fully open source, welcoming contributions from the community.<br/>
<img src="https://static.vecteezy.com/system/resources/previews/010/151/789/original/tick-icon-accept-approve-sign-design-free-png.png" alt="tick" width="12" height="12" /> **Easy Integration:** Simple URL parameters to customize your icon badges.<br/>
<img src="https://static.vecteezy.com/system/resources/previews/010/151/789/original/tick-icon-accept-approve-sign-design-free-png.png" alt="tick" width="12" height="12" /> **Lazy Loading:** Improve initial loading times by lazy loading icons as they come into view.<br/>
<img src="https://static.vecteezy.com/system/resources/previews/010/151/789/original/tick-icon-accept-approve-sign-design-free-png.png" alt="tick" width="12" height="12" /> **Pagination:** Implement pagination or infinite scroll for easier navigation through icons.<br/>
<img src="https://static.vecteezy.com/system/resources/previews/010/151/789/original/tick-icon-accept-approve-sign-design-free-png.png" alt="tick" width="12" height="12" /> **Playground:** Interactive playground to experiment with icon configurations before embedding them in your README.<br/>
<img src="https://static.vecteezy.com/system/resources/previews/010/151/789/original/tick-icon-accept-approve-sign-design-free-png.png" alt="tick" width="12" height="12" /> **API Access:** Comprehensive API for fetching icon lists and SVG data programmatically.<br/>
<img src="https://static.vecteezy.com/system/resources/previews/010/151/789/original/tick-icon-accept-approve-sign-design-free-png.png" alt="tick" width="12" height="12" /> **Minified Output:** Icons are delivered as lightweight SVGs for crisp visuals and minimal load times.<br/>
<img src="https://static.vecteezy.com/system/resources/previews/010/151/789/original/tick-icon-accept-approve-sign-design-free-png.png" alt="tick" width="12" height="12" /> **Classify:** Icons are organized into categories for easier selection and discovery.<br/>

## 🏷️ Specifying Icons

Copy and paste the code block below into your readme to add the skills icon element!

Change the `?i=js,html,css` to a list of your skills separated by ","s! You can find a full list of icons [here](#icons-list).

```md
[![Icoziv Skills](https://i.icoziv.workers.dev/icons?i=js,html,css,wasm)](https://github.com/thuongtruong109/icoziv)
```

[![Icoziv Skills](https://i.icoziv.workers.dev/icons?i=js,html,css,wasm)](https://github.com/thuongtruong109/icoziv)

## 🎨 Themed Icons

Some icons have a dark and light themed background. You can specify which theme you want as a url parameter.

This is optional. The default theme is dark.

Change the `&theme=light` to either `dark` or `light`. The theme is the background color, so light theme has a white icon background, and dark has a black-ish.

**Light Theme Example:**

```md
[![Icoziv Skills](https://i.icoziv.workers.dev/icons?i=java,kotlin,nodejs,figma&theme=light)](https://github.com/thuongtruong109/icoziv)
```

[![Icoziv Skills](https://i.icoziv.workers.dev/icons?i=java,kotlin,nodejs,figma&theme=light)](https://github.com/thuongtruong109/icoziv)

## 📏 Icons Per Line

You can specify how many icons you would like per line! It's an optional argument, and the default is 15.

Change the `&perline=3` to any number between 1 and 50.

```md
[![Icoziv Skills](https://i.icoziv.workers.dev/icons?i=aws,gcp,azure,react,vue,flutter&perline=3)](https://github.com/thuongtruong109/icoziv)
```

[![Icoziv Skills](https://i.icoziv.workers.dev/icons?i=aws,gcp,azure,react,vue,flutter&perline=3)](https://github.com/thuongtruong109/icoziv)

## 📐 Centering Icons

Want to center the icons in your readme? The SVGs are automatically resized, so you can do it the same way you'd normally center an image.

```html
<p align="center">
  <a href="https://github.com/thuongtruong109/icoziv">
    <img
      src="https://i.icoziv.workers.dev/icons?i=git,kubernetes,docker,c,vim"
    />
  </a>
</p>
```

<p align="center">
  <a href="https://github.com/thuongtruong109/icoziv">
    <img src="https://i.icoziv.workers.dev/icons?i=git,kubernetes,docker,c,vim" />
  </a>
</p>

## 🗺️ API Reference

### Generate Icons

**Endpoint:** `GET /icons`

| Parameter | Short | Description | Required | Default |
|-----------|-------|-------------|----------|---------|
| `icons`   | `i`   | Comma-separated list of icon names                | Yes      | /       |
| `theme`   | `t`   | Theme - `dark` (default) or `light`               | No       | dark    |
| `perline` |       | Number of icons per line (1-50)                          | No       | 15      |
| `radius`  |       | Icon(s) corner radius (value between 25 and 85)   | No       | 40      |

**Example:**
```
GET /icons?i=javascript,typescript,react,vue&theme=dark&perline=4
```

**Response:** SVG image

### Get Icon List

**Endpoint:** `GET /api/icons`

Returns a JSON array of all available icon names.

**Example:**
```
GET /api/icons
```

**Response:**
```json
["javascript", "typescript", "react", "vue", ...]
```

### Get SVG Data

**Endpoint:** `GET /api/svgs`

Returns a JSON object with all icon SVG data.

**Example:**
```
GET /api/svgs
```

**Response:**
```json
{
  "javascript": "<svg>...</svg>",
  "typescript": "<svg>...</svg>",
  ...
}
```

## 🔍 Example

<table style="border-collapse: collapse; width: 100%;">
  <tr>
    <th style="border: 2px solid #333; padding: 8px;" align="center">
      Social Media
    </th>
  </tr>
  <tr>
    <td style="border: 1px solid #999; padding: 8px;">
      <img src="https://i.icoziv.workers.dev/icons?i=twitter,instagram,facebook,linkedin,tiktok,telegram,discord,reddit,youtube,threads,mastodon" />
      <details>
        <summary><strong>Copy code</strong></summary><br/>
        <ul>
          <li>Raw Link: <code>https://i.icoziv.workers.dev/icons?i=twitter,instagram,facebook,linkedin,tiktok,telegram,discord,reddit,youtube,threads,mastodon</code></li><br/>
          <li>Markdown: <code>![Icoziv Skills](https://i.icoziv.workers.dev/icons?i=twitter,instagram,facebook,linkedin,tiktok,telegram,discord,reddit,youtube,threads,mastodon)</code></li><br/>
          <li>HTML: <code>&lt;img src="https://i.icoziv.workers.dev/icons?i=twitter,instagram,facebook,linkedin,tiktok,telegram,discord,reddit,youtube,threads,mastodon" /&gt;</code></li>
        </ul>
      </details>
    </td>
  </tr>
</table>

<table style="border-collapse: collapse; width: 100%;">
  <tr>
    <th style="border: 2px solid #333; padding: 8px;" align="center">
      App
    </th>
  </tr>
  <tr>
    <td style="border: 1px solid #999; padding: 8px;">
      <img src="https://i.icoziv.workers.dev/icons?i=android,apple,flutter,react,swift,kotlin,typescript,graphql,firebase,appstore,playstore"
      />
      <details>
        <summary>
          <strong>
            Copy code
          </strong>
        </summary>
        <br/>
        <ul>
          <li>
            Raw Link:
            <code>
              https://i.icoziv.workers.dev/icons?i=android,apple,flutter,react,swift,kotlin,typescript,graphql,firebase,appstore,playstore
            </code>
          </li>
          <br/>
          <li>
            Markdown:
            <code>
              ![Icoziv Skills](https://i.icoziv.workers.dev/icons?i=android,apple,flutter,react,swift,kotlin,typescript,graphql,firebase,appstore,playstore)
            </code>
          </li>
          <br/>
          <li>
            HTML:
            <code>
              &lt;img src="https://i.icoziv.workers.dev/icons?i=android,apple,flutter,react,swift,kotlin,typescript,graphql,firebase,appstore,playstore"
              /&gt;
            </code>
          </li>
        </ul>
      </details>
    </td>
  </tr>
</table>
<table style="border-collapse: collapse; width: 100%;">
  <tr>
    <th style="border: 2px solid #333; padding: 8px;" align="center">
      Software
    </th>
  </tr>
  <tr>
    <td style="border: 1px solid #999; padding: 8px;">
      <img src="https://i.icoziv.workers.dev/icons?i=code,terminal,python,java,nodejs,go,rust,csharp,dotnet,docker,kubernetes,git,github"
      />
      <details>
        <summary>
          <strong>
            Copy code
          </strong>
        </summary>
        <br/>
        <ul>
          <li>
            Raw Link:
            <code>
              https://i.icoziv.workers.dev/icons?i=code,terminal,python,java,nodejs,go,rust,csharp,dotnet,docker,kubernetes,git,github
            </code>
          </li>
          <br/>
          <li>
            Markdown:
            <code>
              ![Icoziv Skills](https://i.icoziv.workers.dev/icons?i=code,terminal,python,java,nodejs,go,rust,csharp,dotnet,docker,kubernetes,git,github)
            </code>
          </li>
          <br/>
          <li>
            HTML:
            <code>
              &lt;img src="https://i.icoziv.workers.dev/icons?i=code,terminal,python,java,nodejs,go,rust,csharp,dotnet,docker,kubernetes,git,github"
              /&gt;
            </code>
          </li>
        </ul>
      </details>
    </td>
  </tr>
</table>
<table style="border-collapse: collapse; width: 100%;">
  <tr>
    <th style="border: 2px solid #333; padding: 8px;" align="center">
      Frontend
    </th>
  </tr>
  <tr>
    <td style="border: 1px solid #999; padding: 8px;">
      <img src="https://i.icoziv.workers.dev/icons?i=html5,css3,js,typescript,react,nextjs,vue,nuxt,angular,svelte,tailwind,bootstrap,vite,webpack,babel"
      />
      <details>
        <summary>
          <strong>
            Copy code
          </strong>
        </summary>
        <br/>
        <ul>
          <li>
            Raw Link:
            <code>
              https://i.icoziv.workers.dev/icons?i=html5,css3,js,typescript,react,nextjs,vue,nuxt,angular,svelte,tailwind,bootstrap,vite,webpack,babel
            </code>
          </li>
          <br/>
          <li>
            Markdown:
            <code>
              ![Icoziv Skills](https://i.icoziv.workers.dev/icons?i=html5,css3,js,typescript,react,nextjs,vue,nuxt,angular,svelte,tailwind,bootstrap,vite,webpack,babel)
            </code>
          </li>
          <br/>
          <li>
            HTML:
            <code>
              &lt;img src="https://i.icoziv.workers.dev/icons?i=html5,css3,js,typescript,react,nextjs,vue,nuxt,angular,svelte,tailwind,bootstrap,vite,webpack,babel"
              /&gt;
            </code>
          </li>
        </ul>
      </details>
    </td>
  </tr>
</table>
<table style="border-collapse: collapse; width: 100%;">
  <tr>
    <th style="border: 2px solid #333; padding: 8px;" align="center">
      Backend
    </th>
  </tr>
  <tr>
    <td style="border: 1px solid #999; padding: 8px;">
      <img src="https://i.icoziv.workers.dev/icons?i=nodejs,express,nestjs,python,django,flask,fastapi,go,java,spring,mongodb,postgresql,mysql,redis,docker,nginx"
      />
      <details>
        <summary>
          <strong>
            Copy code
          </strong>
        </summary>
        <br/>
        <ul>
          <li>
            Raw Link:
            <code>
              https://i.icoziv.workers.dev/icons?i=nodejs,express,nestjs,python,django,flask,fastapi,go,java,spring,mongodb,postgresql,mysql,redis,docker,nginx
            </code>
          </li>
          <br/>
          <li>
            Markdown:
            <code>
              ![Icoziv Skills](https://i.icoziv.workers.dev/icons?i=nodejs,express,nestjs,python,django,flask,fastapi,go,java,spring,mongodb,postgresql,mysql,redis,docker,nginx)
            </code>
          </li>
          <br/>
          <li>
            HTML:
            <code>
              &lt;img src="https://i.icoziv.workers.dev/icons?i=nodejs,express,nestjs,python,django,flask,fastapi,go,java,spring,mongodb,postgresql,mysql,redis,docker,nginx"
              /&gt;
            </code>
          </li>
        </ul>
      </details>
    </td>
  </tr>
</table>
<table style="border-collapse: collapse; width: 100%;">
  <tr>
    <th style="border: 2px solid #333; padding: 8px;" align="center">
      Designer
    </th>
  </tr>
  <tr>
    <td style="border: 1px solid #999; padding: 8px;">
      <img src="https://i.icoziv.workers.dev/icons?i=figma,adobe,illustrator,photoshop,xd,sketch,framer,canva,dribbble,behance,palette,brush,gradient"
      />
      <details>
        <summary>
          <strong>
            Copy code
          </strong>
        </summary>
        <br/>
        <ul>
          <li>
            Raw Link:
            <code>
              https://i.icoziv.workers.dev/icons?i=figma,adobe,illustrator,photoshop,xd,sketch,framer,canva,dribbble,behance,palette,brush,gradient
            </code>
          </li>
          <br/>
          <li>
            Markdown:
            <code>
              ![Icoziv Skills](https://i.icoziv.workers.dev/icons?i=figma,adobe,illustrator,photoshop,xd,sketch,framer,canva,dribbble,behance,palette,brush,gradient)
            </code>
          </li>
          <br/>
          <li>
            HTML:
            <code>
              &lt;img src="https://i.icoziv.workers.dev/icons?i=figma,adobe,illustrator,photoshop,xd,sketch,framer,canva,dribbble,behance,palette,brush,gradient"
              /&gt;
            </code>
          </li>
        </ul>
      </details>
    </td>
  </tr>
</table>
<table style="border-collapse: collapse; width: 100%;">
  <tr>
    <th style="border: 2px solid #333; padding: 8px;" align="center">
      DevOps
    </th>
  </tr>
  <tr>
    <td style="border: 1px solid #999; padding: 8px;">
      <img src="https://i.icoziv.workers.dev/icons?i=docker,kubernetes,aws,azure,gcp,terraform,ansible,jenkins,githubactions,gitlab,linux,bash,nginx,cloudflare"
      />
      <details>
        <summary>
          <strong>
            Copy code
          </strong>
        </summary>
        <br/>
        <ul>
          <li>
            Raw Link:
            <code>
              https://i.icoziv.workers.dev/icons?i=docker,kubernetes,aws,azure,gcp,terraform,ansible,jenkins,githubactions,gitlab,linux,bash,nginx,cloudflare
            </code>
          </li>
          <br/>
          <li>
            Markdown:
            <code>
              ![Icoziv Skills](https://i.icoziv.workers.dev/icons?i=docker,kubernetes,aws,azure,gcp,terraform,ansible,jenkins,githubactions,gitlab,linux,bash,nginx,cloudflare)
            </code>
          </li>
          <br/>
          <li>
            HTML:
            <code>
              &lt;img src="https://i.icoziv.workers.dev/icons?i=docker,kubernetes,aws,azure,gcp,terraform,ansible,jenkins,githubactions,gitlab,linux,bash,nginx,cloudflare"
              /&gt;
            </code>
          </li>
        </ul>
      </details>
    </td>
  </tr>
</table>
<table style="border-collapse: collapse; width: 100%;">
  <tr>
    <th style="border: 2px solid #333; padding: 8px;" align="center">
      Startup
    </th>
  </tr>
  <tr>
    <td style="border: 1px solid #999; padding: 8px;">
      <img src="https://i.icoziv.workers.dev/icons?i=rocket,lightbulb,chart,line,team,notion,slack,figma,github,vercel,netlify,aws,analytics"
      />
      <details>
        <summary>
          <strong>
            Copy code
          </strong>
        </summary>
        <br/>
        <ul>
          <li>
            Raw Link:
            <code>
              https://i.icoziv.workers.dev/icons?i=rocket,lightbulb,chart,line,team,notion,slack,figma,github,vercel,netlify,aws,analytics
            </code>
          </li>
          <br/>
          <li>
            Markdown:
            <code>
              ![Icoziv Skills](https://i.icoziv.workers.dev/icons?i=rocket,lightbulb,chart,line,team,notion,slack,figma,github,vercel,netlify,aws,analytics)
            </code>
          </li>
          <br/>
          <li>
            HTML:
            <code>
              &lt;img src="https://i.icoziv.workers.dev/icons?i=rocket,lightbulb,chart,line,team,notion,slack,figma,github,vercel,netlify,aws,analytics"
              /&gt;
            </code>
          </li>
        </ul>
      </details>
    </td>
  </tr>
</table>
<table style="border-collapse: collapse; width: 100%;">
  <tr>
    <th style="border: 2px solid #333; padding: 8px;" align="center">
      Developer Portfolio
    </th>
  </tr>
  <tr>
    <td style="border: 1px solid #999; padding: 8px;">
      <img src="https://i.icoziv.workers.dev/icons?i=code,terminal,github,git,linux,react,nextjs,nodejs,typescript,tailwind,vercel,linkedin,twitter,coffee"
      />
      <details>
        <summary>
          <strong>
            Copy code
          </strong>
        </summary>
        <br/>
        <ul>
          <li>
            Raw Link:
            <code>
              https://i.icoziv.workers.dev/icons?i=code,terminal,github,git,linux,react,nextjs,nodejs,typescript,tailwind,vercel,linkedin,twitter,coffee
            </code>
          </li>
          <br/>
          <li>
            Markdown:
            <code>
              ![Icoziv Skills](https://i.icoziv.workers.dev/icons?i=code,terminal,github,git,linux,react,nextjs,nodejs,typescript,tailwind,vercel,linkedin,twitter,coffee)
            </code>
          </li>
          <br/>
          <li>
            HTML:
            <code>
              &lt;img src="https://i.icoziv.workers.dev/icons?i=code,terminal,github,git,linux,react,nextjs,nodejs,typescript,tailwind,vercel,linkedin,twitter,coffee"
              /&gt;
            </code>
          </li>
        </ul>
      </details>
    </td>
  </tr>
</table>
<table style="border-collapse: collapse; width: 100%;">
  <tr>
    <th style="border: 2px solid #333; padding: 8px;" align="center">
      Blog
    </th>
  </tr>
  <tr>
    <td style="border: 1px solid #999; padding: 8px;">
      <img src="https://i.icoziv.workers.dev/icons?i=markdown,book,pen,calendar,hash,notion,medium,devto,ghost,wordpress,comment,share,readme"
      />
      <details>
        <summary>
          <strong>
            Copy code
          </strong>
        </summary>
        <br/>
        <ul>
          <li>
            Raw Link:
            <code>
              https://i.icoziv.workers.dev/icons?i=markdown,book,pen,calendar,hash,notion,medium,devto,ghost,wordpress,comment,share,readme
            </code>
          </li>
          <br/>
          <li>
            Markdown:
            <code>
              ![Icoziv Skills](https://i.icoziv.workers.dev/icons?i=markdown,book,pen,calendar,hash,notion,medium,devto,ghost,wordpress,comment,share,readme)
            </code>
          </li>
          <br/>
          <li>
            HTML:
            <code>
              &lt;img src="https://i.icoziv.workers.dev/icons?i=markdown,book,pen,calendar,hash,notion,medium,devto,ghost,wordpress,comment,share,readme"
              /&gt;
            </code>
          </li>
        </ul>
      </details>
    </td>
  </tr>
</table>
<table style="border-collapse: collapse; width: 100%;">
  <tr>
    <th style="border: 2px solid #333; padding: 8px;" align="center">
      Data / AI
    </th>
  </tr>
  <tr>
    <td style="border: 1px solid #999; padding: 8px;">
      <img src="https://i.icoziv.workers.dev/icons?i=python,numpy,pandas,jupyter,tensorflow,pytorch,scikitlearn,mlflow,fastapi,streamlit,sql,postgresql,azure,gcp"
      />
      <details>
        <summary>
          <strong>
            Copy code
          </strong>
        </summary>
        <br/>
        <ul>
          <li>
            Raw Link:
            <code>
              https://i.icoziv.workers.dev/icons?i=python,numpy,pandas,jupyter,tensorflow,pytorch,scikitlearn,mlflow,fastapi,streamlit,sql,postgresql,azure,gcp
            </code>
          </li>
          <br/>
          <li>
            Markdown:
            <code>
              ![Icoziv Skills](https://i.icoziv.workers.dev/icons?i=python,numpy,pandas,jupyter,tensorflow,pytorch,scikitlearn,mlflow,fastapi,streamlit,sql,postgresql,azure,gcp)
            </code>
          </li>
          <br/>
          <li>
            HTML:
            <code>
              &lt;img src="https://i.icoziv.workers.dev/icons?i=python,numpy,pandas,jupyter,tensorflow,pytorch,scikitlearn,mlflow,fastapi,streamlit,sql,postgresql,azure,gcp"
              /&gt;
            </code>
          </li>
        </ul>
      </details>
    </td>
  </tr>
</table>

<table style="border-collapse: collapse; width: 100%;">
  <tr>
    <th style="border: 2px solid #333; padding: 8px;" align="center">
      Marketing
    </th>
  </tr>
  <tr>
    <td style="border: 1px solid #999; padding: 8px;">
      <img src="https://i.icoziv.workers.dev/icons?i=googleads,facebookads,instagram,tiktok,linkedin,email,hubspot,mailchimp,semrush,ahrefs,canva,notion,analytics"
      />
      <details>
        <summary>
          <strong>
            Copy code
          </strong>
        </summary>
        <br/>
        <ul>
          <li>
            Raw Link:
            <code>
              https://i.icoziv.workers.dev/icons?i=googleads,facebookads,instagram,tiktok,linkedin,email,hubspot,mailchimp,semrush,ahrefs,canva,notion,analytics
            </code>
          </li>
          <br/>
          <li>
            Markdown:
            <code>
              ![Icoziv Skills](https://i.icoziv.workers.dev/icons?i=googleads,facebookads,instagram,tiktok,linkedin,email,hubspot,mailchimp,semrush,ahrefs,canva,notion,analytics)
            </code>
          </li>
          <br/>
          <li>
            HTML:
            <code>
              &lt;img src="https://i.icoziv.workers.dev/icons?i=googleads,facebookads,instagram,tiktok,linkedin,email,hubspot,mailchimp,semrush,ahrefs,canva,notion,analytics"
              /&gt;
            </code>
          </li>
        </ul>
      </details>
    </td>
  </tr>
</table>
<table style="border-collapse: collapse; width: 100%;">
  <tr>
    <th style="border: 2px solid #333; padding: 8px;" align="center">
      Cloud
    </th>
  </tr>
  <tr>
    <td style="border: 1px solid #999; padding: 8px;">
      <img src="https://i.icoziv.workers.dev/icons?i=aws,azure,gcp,docker,kubernetes,terraform,ansible,cloudflare,heroku,vercel,netlify,linode,scaleway"
      />
      <details>
        <summary>
          <strong>
            Copy code
          </strong>
        </summary>
        <br/>
        <ul>
          <li>
            Raw Link:
            <code>
              https://i.icoziv.workers.dev/icons?i=aws,azure,gcp,docker,kubernetes,terraform,ansible,cloudflare,heroku,vercel,netlify,linode,scaleway
            </code>
          </li>
          <br/>
          <li>
            Markdown:
            <code>
              ![Icoziv Skills](https://i.icoziv.workers.dev/icons?i=aws,azure,gcp,docker,kubernetes,terraform,ansible,cloudflare,heroku,vercel,netlify,linode,scaleway)
            </code>
          </li>
          <br/>
          <li>
            HTML:
            <code>
              &lt;img src="https://i.icoziv.workers.dev/icons?i=aws,azure,gcp,docker,kubernetes,terraform,ansible,cloudflare,heroku,vercel,netlify,linode,scaleway"
              /&gt;
            </code>
          </li>
        </ul>
      </details>
    </td>
  </tr>
</table>
<table style="border-collapse: collapse; width: 100%;">
  <tr>
    <th style="border: 2px solid #333; padding: 8px;" align="center">
      Security
    </th>
  </tr>
  <tr>
    <td style="border: 1px solid #999; padding: 8px;">
      <img src="https://i.icoziv.workers.dev/icons?i=ssl,firewall,auth0,okta,jwt,oauth2,hash,crypto,snyk,owasp,clamav,malwarebytes,nmap"
      />
      <details>
        <summary>
          <strong>
            Copy code
          </strong>
        </summary>
        <br/>
        <ul>
          <li>
            Raw Link:
            <code>
              https://i.icoziv.workers.dev/icons?i=ssl,firewall,auth0,okta,jwt,oauth2,hash,crypto,snyk,owasp,clamav,malwarebytes,nmap
            </code>
          </li>
          <br/>
          <li>
            Markdown:
            <code>
              ![Icoziv Skills](https://i.icoziv.workers.dev/icons?i=ssl,firewall,auth0,okta,jwt,oauth2,hash,crypto,snyk,owasp,clamav,malwarebytes,nmap)
            </code>
          </li>
          <br/>
          <li>
            HTML:
            <code>
              &lt;img src="https://i.icoziv.workers.dev/icons?i=ssl,firewall,auth0,okta,jwt,oauth2,hash,crypto,snyk,owasp,clamav,malwarebytes,nmap"
              /&gt;
            </code>
          </li>
        </ul>
      </details>
    </td>
  </tr>
</table>
<table style="border-collapse: collapse; width: 100%;">
  <tr>
    <th style="border: 2px solid #333; padding: 8px;" align="center">
      Database
    </th>
  </tr>
  <tr>
    <td style="border: 1px solid #999; padding: 8px;">
      <img src="https://i.icoziv.workers.dev/icons?i=mysql,postgresql,mongodb,redis,sqlite,firebase,awsrds,aurora,dynamodb,elasticsearch,cassandra,neo4j,mariadb"
      />
      <details>
        <summary>
          <strong>
            Copy code
          </strong>
        </summary>
        <br/>
        <ul>
          <li>
            Raw Link:
            <code>
              https://i.icoziv.workers.dev/icons?i=mysql,postgresql,mongodb,redis,sqlite,firebase,awsrds,aurora,dynamodb,elasticsearch,cassandra,neo4j,mariadb
            </code>
          </li>
          <br/>
          <li>
            Markdown:
            <code>
              ![Icoziv Skills](https://i.icoziv.workers.dev/icons?i=mysql,postgresql,mongodb,redis,sqlite,firebase,awsrds,aurora,dynamodb,elasticsearch,cassandra,neo4j,mariadb)
            </code>
          </li>
          <br/>
          <li>
            HTML:
            <code>
              &lt;img src="https://i.icoziv.workers.dev/icons?i=mysql,postgresql,mongodb,redis,sqlite,firebase,awsrds,aurora,dynamodb,elasticsearch,cassandra,neo4j,mariadb"
              /&gt;
            </code>
          </li>
        </ul>
      </details>
    </td>
  </tr>
</table>

<table style="border-collapse: collapse; width: 100%;">
  <tr>
    <th style="border: 2px solid #333; padding: 8px;" align="center">
      Mobile
    </th>
  </tr>
  <tr>
    <td style="border: 1px solid #999; padding: 8px;">
      <img src="https://i.icoziv.workers.dev/icons?i=android,ios,flutter,reactnative,xamarin,swift,kotlin,jetpack,expo,cordova,phonegap,unity,appstore,playstore"
      />
      <details>
        <summary>
          <strong>
            Copy code
          </strong>
        </summary>
        <br/>
        <ul>
          <li>
            Raw Link:
            <code>
              https://i.icoziv.workers.dev/icons?i=android,ios,flutter,reactnative,xamarin,swift,kotlin,jetpack,expo,cordova,phonegap,unity,appstore,playstore
            </code>
          </li>
          <br/>
          <li>
            Markdown:
            <code>
              ![Icoziv Skills](https://i.icoziv.workers.dev/icons?i=android,ios,flutter,reactnative,xamarin,swift,kotlin,jetpack,expo,cordova,phonegap,unity,appstore,playstore)
            </code>
          </li>
          <br/>
          <li>
            HTML:
            <code>
              &lt;img src="https://i.icoziv.workers.dev/icons?i=android,ios,flutter,reactnative,xamarin,swift,kotlin,jetpack,expo,cordova,phonegap,unity,appstore,playstore"
              /&gt;
            </code>
          </li>
        </ul>
      </details>
    </td>
  </tr>
</table>
<table style="border-collapse: collapse; width: 100%;">
  <tr>
    <th style="border: 2px solid #333; padding: 8px;" align="center">
      Productivity
    </th>
  </tr>
  <tr>
    <td style="border: 1px solid #999; padding: 8px;">
      <img src="https://i.icoziv.workers.dev/icons?i=notion,trello,asana,slack,evernote,googlecalendar,zoom,microsoftteams,clickup,jira,confluence,dropbox,onedrive,todoist"
      />
      <details>
        <summary>
          <strong>
            Copy code
          </strong>
        </summary>
        <br/>
        <ul>
          <li>
            Raw Link:
            <code>
              https://i.icoziv.workers.dev/icons?i=notion,trello,asana,slack,evernote,googlecalendar,zoom,microsoftteams,clickup,jira,confluence,dropbox,onedrive,todoist
            </code>
          </li>
          <br/>
          <li>
            Markdown:
            <code>
              ![Icoziv Skills](https://i.icoziv.workers.dev/icons?i=notion,trello,asana,slack,evernote,googlecalendar,zoom,microsoftteams,clickup,jira,confluence,dropbox,onedrive,todoist)
            </code>
          </li>
          <br/>
          <li>
            HTML:
            <code>
              &lt;img src="https://i.icoziv.workers.dev/icons?i=notion,trello,asana,slack,evernote,googlecalendar,zoom,microsoftteams,clickup,jira,confluence,dropbox,onedrive,todoist"
              /&gt;
            </code>
          </li>
        </ul>
      </details>
    </td>
  </tr>
</table>
<table style="border-collapse: collapse; width: 100%;">
  <tr>
    <th style="border: 2px solid #333; padding: 8px;" align="center">
      Design Tools
    </th>
  </tr>
  <tr>
    <td style="border: 1px solid #999; padding: 8px;">
      <img src="https://i.icoziv.workers.dev/icons?i=figma,sketch,adobephotoshop,illustrator,xd,canva,framer,blender,aftereffects,premiere,coreldraw,inkscape,procreate,affinity,dribbble"
      />
      <details>
        <summary>
          <strong>
            Copy code
          </strong>
        </summary>
        <br/>
        <ul>
          <li>
            Raw Link:
            <code>
              https://i.icoziv.workers.dev/icons?i=figma,sketch,adobephotoshop,illustrator,xd,canva,framer,blender,aftereffects,premiere,coreldraw,inkscape,procreate,affinity,dribbble
            </code>
          </li>
          <br/>
          <li>
            Markdown:
            <code>
              ![Icoziv Skills](https://i.icoziv.workers.dev/icons?i=figma,sketch,adobephotoshop,illustrator,xd,canva,framer,blender,aftereffects,premiere,coreldraw,inkscape,procreate,affinity,dribbble)
            </code>
          </li>
          <br/>
          <li>
            HTML:
            <code>
              &lt;img src="https://i.icoziv.workers.dev/icons?i=figma,sketch,adobephotoshop,illustrator,xd,canva,framer,blender,aftereffects,premiere,coreldraw,inkscape,procreate,affinity,dribbble"
              /&gt;
            </code>
          </li>
        </ul>
      </details>
    </td>
  </tr>
</table>
<table style="border-collapse: collapse; width: 100%;">
  <tr>
    <th style="border: 2px solid #333; padding: 8px;" align="center">
      Video / Audio
    </th>
  </tr>
  <tr>
    <td style="border: 1px solid #999; padding: 8px;">
      <img src="https://i.icoziv.workers.dev/icons?i=premiere,aftereffects,finalcut,blender,audacity,flstudio,ableton,logicpro,vlc,youtube,spotify,obs,zoom,audition"
      />
      <details>
        <summary>
          <strong>
            Copy code
          </strong>
        </summary>
        <br/>
        <ul>
          <li>
            Raw Link:
            <code>
              https://i.icoziv.workers.dev/icons?i=premiere,aftereffects,finalcut,blender,audacity,flstudio,ableton,logicpro,vlc,youtube,spotify,obs,zoom,audition
            </code>
          </li>
          <br/>
          <li>
            Markdown:
            <code>
              ![Icoziv Skills](https://i.icoziv.workers.dev/icons?i=premiere,aftereffects,finalcut,blender,audacity,flstudio,ableton,logicpro,vlc,youtube,spotify,obs,zoom,audition)
            </code>
          </li>
          <br/>
          <li>
            HTML:
            <code>
              &lt;img src="https://i.icoziv.workers.dev/icons?i=premiere,aftereffects,finalcut,blender,audacity,flstudio,ableton,logicpro,vlc,youtube,spotify,obs,zoom,audition"
              /&gt;
            </code>
          </li>
        </ul>
      </details>
    </td>
  </tr>
</table>

## 📋 Icons List

Currently, there are over 800+ icons available, and more are being added regularly.

To view full list of all available icons, check out the [Playground](https://thuongtruong109.github.io/icoziv/). It lets you browse, search, and customize icons easily.

## ⚙️ Technologies

- Cloudflare Workers + CDN caching for hosting the icon APIs.
- JSON → GZIP + GCM/AES CBC 256 + Base64 encoding for efficient and secure icon data transmission.
- TypeScript for type-safe development.
- Node.js for fallback server-side JavaScript execution.
- ESLint and Prettier for code quality and formatting.
- Vitest for testing

## 🤝 Contributing

We welcome contributions!

- See [CONTRIBUTING.md](.github/CONTRIBUTING.md) for details.
- Check [todo.md](./todo.md) for ideas on what to work on.
- View the [contributors](https://thuongtruong109.github.io/icoziv/playground/contributors.html) who made this project possible.
- View the [changelog](https://github.com/thuongtruong109/icoziv/blob/main/CHANGELOG.md) for recent changes

## 🚫 Branding and Intellectual Property

We strive to respect all branding guidelines and intellectual property. If you represent a company whose icon is included in this project and you would like it removed, or if you believe we have used an icon in a way that violates your branding guidelines, please open an issue on this repository detailing your request. We will review your request promptly and take appropriate action. We appreciate your understanding and cooperation.

## 💖 Support the Project

Thank you so much already for using my projects! If you want to go a step further and support my open source work, buy me a coffee:

<a href='https://buymeacoffee.com/thuongtruong' target='_blank'><img style='border:0px;height:26px;' src='https://cdn.ko-fi.com/cdn/kofi1.png?v=3' border='0' alt='Buy Me a Coffee' /></a>
<a href="https://github.com/sponsors/thuongtruong109" target='_blank'><img src="https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86" style='border:0px;height:26px;'></a>

To support the project directly, feel free to open issues for icon suggestions, or contribute with a pull request!

## 📜 License

This project is licensed under the [MIT LICENSE](LICENSE). Copyright (c) Thuong Truong 2025.