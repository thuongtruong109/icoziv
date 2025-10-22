<div align="center">

  ![CI status](https://img.shields.io/github/actions/workflow/status/thuongtruong109/icoziv/ci.yml?branch=main&label=Test&logo=github&style=flat)
  [![Website](https://img.shields.io/badge/Playground-121013?style=flat&logo=github&logoColor=white)](https://thuongtruong109.github.io/icoziv)
  ![Icons](public/count.svg)
  ![Cloudflare](https://img.shields.io/badge/Cloudflare-F38020?style=flat&logo=Cloudflare&logoColor=white)
  ![Hacktoberfest](https://img.shields.io/badge/Hacktoberfest%202025-blueviolet?style=flat&logo=hackster&logoColor=white)
  ![Contribute](https://img.shields.io/badge/Contributions-welcome-violet.svg?style=flat&logo=git)
  ![Star](https://img.shields.io/static/v1?label=%F0%9F%8C%9F&message=If%20Useful&style=style=flat&color=BC4E99)

  <!-- [![License](https://img.shields.io/badge/MIT%20License-2b9348?style=flat&logo=monkeytie&logoColor=white)](./LICENSE) -->
  <!-- <a href="https://github.com/thuongtruong109/icoziv/pulls"><img src="https://img.shields.io/github/issues-pr/thuongtruong109/icoziv" alt="Pull Requests Badge"/></a> -->
  <!-- <a href="https://github.com/thuongtruong109/icoziv/graphs/contributors"><img alt="GitHub contributors" src="https://img.shields.io/github/contributors/thuongtruong109/icoziv?color=2b9348"></a> -->

  <img src="./.github/assets/brand.png#gh-dark-mode-only" alt="Brand Dark" />
  <img src="./.github/assets/brand-light.png#gh-light-mode-only" alt="Brand Light" />
</div>

## 🐱‍💻 Hacktoberfest 2025

> 💡 This project is participating in Hacktoberfest 2025! We're excited to welcome contributions from the community. Feel free to open pull requests to add new icons or improve the project. Let's make it even better together!

![Hacktoberfest](.github/assets/hacktoberfest-2025.png)

#### How to Contribute

- Check [todo.md](./todo.md) for ideas on what to work on.

> [!IMPORTANT]
> We'd really appreciate it if you would consider starring our repository! It helps us gain visibility and support the project.

## 📚 Contents

[![About](https://img.shields.io/badge/1.%20About-yellow?style=flat)](#-about)
[![Features](https://img.shields.io/badge/2.%20Features-blue?style=flat)](#features)
[![Specifying Icons](https://img.shields.io/badge/3.%20Specifying%20Icons-success?style=flat)](#specifying-icons)
[![Themed Icons](https://img.shields.io/badge/4.%20Themed%20Icons-orange?style=flat)](#themed-icons)
[![Icons Per Line](https://img.shields.io/badge/5.%20Icons%20Per%20Line-00a6f4?style=flat)](#icons-per-line)
[![Centering Icons](https://img.shields.io/badge/6.%20Centering%20Icons-pink?style=flat)](#centering-icons)
[![API Reference](https://img.shields.io/badge/7.%20API%20Reference-00bba7?style=flat)](#-api-reference)
[![Icons List](https://img.shields.io/badge/8.%20Icons%20List-purple?style=flat)](#icons-list)

## 🧩 About

**Icoziv** is a fast, serverless service that generates beautiful skill and technology icon badges for your GitHub README files. Built for lightning-fast performance and global CDN distribution, it provides an easy way to showcase your tech stack with customizable themes and layouts.

Simply specify the technologies you use, and get a professional-looking SVG badge that automatically adapts to your README's theme.

<p align="center"><img align="center" src="./.github/assets/example-dark.png#gh-dark-mode-only"/></p>
<p align="center"><img align="center" src="./.github/assets/example-light.png#gh-light-mode-only"/></p>

## ⚙️ Features

- **Fast and Serverless:** Icoziv is built for speed and efficiency, leveraging serverless architecture for quick icon generation.
- **Customizable Themes:** Choose between dark and light themes to match your README's style.
- **Flexible Layouts:** Easily adjust the number of icons per line and their alignment.
- **Global CDN:** Icons are served from a global CDN for optimal performance.
- **Extensive Icon Library:** A wide range of technology and skill icons to choose from.
- **Open Source:** Fully open source, welcoming contributions from the community.
- **Easy Integration:** Simple URL parameters to customize your icon badges.
- **Lazy Loading:** Improve initial loading times by lazy loading icons as they come into view.
- **Pagination:** Implement pagination or infinite scroll for easier navigation through icons.

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

<!-- ## 🔍 Example -->

## 📋 Icons List

Here's a list of all the icons currently supported. Feel free to open an issue to suggest icons to add!

| Name | Icon | | Name | Icon | | Name | Icon |
| :---: | :--: | :-: | :---: | :--: | :-: | :---: | :--: |
| `1c` | <img src="./icons/1c.svg" width="48"> | | `7zip` | <img src="./icons/7zip.svg" width="48"> | | `8th` | <img src="./icons/8th.svg" width="48"> |
| `ableton` | <img src="./icons/Ableton-Dark.svg" width="48"> | | `activitypub` | <img src="./icons/ActivityPub-Dark.svg" width="48"> | | `actix` | <img src="./icons/Actix-Dark.svg" width="48"> |
| `adobe` | <img src="./icons/Adobe.svg" width="48"> | | `adobeaftereffects` | <img src="./icons/AdobeAfterEffects.svg" width="48"> | | `adobeaudition` | <img src="./icons/AdobeAudition.svg" width="48"> |
| `adobedreamweaver` | <img src="./icons/AdobeDreamWeaver.svg" width="48"> | | `adobeexpress` | <img src="./icons/AdobeExpress.svg" width="48"> | | `adobeillustrator` | <img src="./icons/AdobeIllustrator.svg" width="48"> |
| `adobeindesign` | <img src="./icons/AdobeIndesign.svg" width="48"> | | `adobelightroom` | <img src="./icons/AdobeLightroom.svg" width="48"> | | `adobephotoshop` | <img src="./icons/AdobePhotoshop.svg" width="48"> |
| `adobepremiere` | <img src="./icons/AdobePremiere.svg" width="48"> | | `adobexd` | <img src="./icons/AdobeXD.svg" width="48"> | | `adonis` | <img src="./icons/Adonis.svg" width="48"> |
| `airflow` | <img src="./icons/Airflow.svg" width="48"> | | `aiscript` | <img src="./icons/AiScript-Dark.svg" width="48"> | | `alacritty` | <img src="./icons/Alacritty.svg" width="48"> |
| `alchemy` | <img src="./icons/Alchemy.svg" width="48"> | | `alpinejs` | <img src="./icons/AlpineJS-Dark.svg" width="48"> | | `alpinelinux` | <img src="./icons/AlpineLinux.svg" width="48"> |
| `amazonewebservices` | <img src="./icons/AmazoneWebServices-Dark.svg" width="48"> | | `amazonwebservices` | <img src="./icons/AmazonWebServices-Light.svg" width="48"> | | `amplify` | <img src="./icons/Amplify.svg" width="48"> |
| `anaconda` | <img src="./icons/Anaconda-Dark.svg" width="48"> | | `android` | <img src="./icons/Android.svg" width="48"> | | `androidstudio` | <img src="./icons/AndroidStudio-Dark.svg" width="48"> |
| `angularjs` | <img src="./icons/Angularjs-Dark.svg" width="48"> | | `ansible` | <img src="./icons/Ansible.svg" width="48"> | | `antdesign` | <img src="./icons/AntDesign.svg" width="48"> |
| `anyscale` | <img src="./icons/AnyScale.svg" width="48"> | | `apache` | <img src="./icons/Apache.svg" width="48"> | | `apachehadoop` | <img src="./icons/ApacheHadoop.svg" width="48"> |
| `apachehive` | <img src="./icons/ApacheHive.svg" width="48"> | | `apachehop` | <img src="./icons/ApacheHop.svg" width="48"> | | `apachejmeter` | <img src="./icons/ApacheJmeter.svg" width="48"> |
| `apachemaven` | <img src="./icons/ApacheMaven-Dark.svg" width="48"> | | `apachespark` | <img src="./icons/ApacheSpark.svg" width="48"> | | `apidog` | <img src="./icons/Apidog.svg" width="48"> |
| `apifox` | <img src="./icons/Apifox.svg" width="48"> | | `apipost` | <img src="./icons/Apipost.svg" width="48"> | | `apktool` | <img src="./icons/Apktool.svg" width="48"> |
| `apollo` | <img src="./icons/Apollo.svg" width="48"> | | `appcelerator` | <img src="./icons/Appcelerator-Dark.svg" width="48"> | | `appian` | <img src="./icons/Appian.svg" width="48"> |
| `appium` | <img src="./icons/Appium.svg" width="48"> | | `apple` | <img src="./icons/Apple-Dark.svg" width="48"> | | `appwrite` | <img src="./icons/Appwrite-Dark.svg" width="48"> |
| `arcbrowser` | <img src="./icons/ArcBrowser.svg" width="48"> | | `archlinux` | <img src="./icons/ArchLinux-Dark.svg" width="48"> | | `arduino` | <img src="./icons/Arduino.svg" width="48"> |
| `argocd` | <img src="./icons/Argocd.svg" width="48"> | | `arm` | <img src="./icons/Arm.svg" width="48"> | | `arturo` | <img src="./icons/Arturo.svg" width="48"> |
| `asciidoctor` | <img src="./icons/Asciidoctor.svg" width="48"> | | `aseprite` | <img src="./icons/Aseprite.svg" width="48"> | | `asm` | <img src="./icons/Asm.svg" width="48"> |
| `assembly` | <img src="./icons/Assembly.svg" width="48"> | | `astraluv` | <img src="./icons/Astraluv.svg" width="48"> | | `astro` | <img src="./icons/Astro-Dark.svg" width="48"> |
| `atom` | <img src="./icons/Atom.svg" width="48"> | | `auth0` | <img src="./icons/Auth0.svg" width="48"> | | `authy` | <img src="./icons/Authy.svg" width="48"> |
| `autocad` | <img src="./icons/AutoCAD-Dark.svg" width="48"> | | `autohotkey` | <img src="./icons/Autohotkey.svg" width="48"> | | `avaloniaui` | <img src="./icons/AvaloniaUI.svg" width="48"> |
| `axios` | <img src="./icons/Axios.svg" width="48"> | | `azul` | <img src="./icons/Azul.svg" width="48"> | | `azure` | <img src="./icons/Azure-Dark.svg" width="48"> |
| `azuresqldatabase` | <img src="./icons/AzureSQLDatabase-Dark.svg" width="48"> | | `babel` | <img src="./icons/Babel-Dark.svg" width="48"> | | `babylonjs` | <img src="./icons/Babylonjs.svg" width="48"> |
| `backbone` | <img src="./icons/Backbone-Dark.svg" width="48"> | | `balenaetcher` | <img src="./icons/BalenaEtcher.svg" width="48"> | | `ballerina` | <img src="./icons/Ballerina.svg" width="48"> |
| `baseui` | <img src="./icons/BaseUI.svg" width="48"> | | `bash` | <img src="./icons/Bash-Dark.svg" width="48"> | | `batch` | <img src="./icons/Batch.svg" width="48"> |
| `bbtainium` | <img src="./icons/Bbtainium.svg" width="48"> | | `beagleboard` | <img src="./icons/BeagleBoard.svg" width="48"> | | `beeflang` | <img src="./icons/Beeflang.svg" width="48"> |
| `behance` | <img src="./icons/Behance-Dark.svg" width="48"> | | `bento` | <img src="./icons/Bento.svg" width="48"> | | `betterauth` | <img src="./icons/BetterAuth.svg" width="48"> |
| `bevy` | <img src="./icons/Bevy-Dark.svg" width="48"> | | `bing` | <img src="./icons/Bing.svg" width="48"> | | `biome` | <img src="./icons/Biome.svg" width="48"> |
| `bitbucket` | <img src="./icons/BitBucket-Dark.svg" width="48"> | | `bitwarden` | <img src="./icons/Bitwarden.svg" width="48"> | | `blazor` | <img src="./icons/Blazor-Dark.svg" width="48"> |
| `blender` | <img src="./icons/Blender-Dark.svg" width="48"> | | `bloc` | <img src="./icons/Bloc.svg" width="48"> | | `bluesky` | <img src="./icons/Bluesky.svg" width="48"> |
| `bolt` | <img src="./icons/Bolt.svg" width="48"> | | `bookstack` | <img src="./icons/Bookstack.svg" width="48"> | | `bootstrap` | <img src="./icons/Bootstrap.svg" width="48"> |
| `boundary` | <img src="./icons/Boundary.svg" width="48"> | | `box2d` | <img src="./icons/Box2d.svg" width="48"> | | `brave` | <img src="./icons/Brave.svg" width="48"> |
| `bruno` | <img src="./icons/Bruno.svg" width="48"> | | `bsd` | <img src="./icons/BSD-Dark.svg" width="48"> | | `bugsnag` | <img src="./icons/Bugsnag.svg" width="48"> |
| `builder` | <img src="./icons/Builder.svg" width="48"> | | `bullmq` | <img src="./icons/BullMQ.svg" width="48"> | | `bulma` | <img src="./icons/Bulma-Dark.svg" width="48"> |
| `bun` | <img src="./icons/Bun-Dark.svg" width="48"> | | `burncloud` | <img src="./icons/BurnCloud.svg" width="48"> | | `bytedance` | <img src="./icons/Bytedance.svg" width="48"> |
| `c` | <img src="./icons/C.svg" width="48"> | | `caddyserver` | <img src="./icons/CaddyServer.svg" width="48"> | | `cairo` | <img src="./icons/Cairo.svg" width="48"> |
| `cakebuild` | <img src="./icons/CakeBuild.svg" width="48"> | | `cakephp` | <img src="./icons/CakePhp-Dark.svg" width="48"> | | `camtasia` | <img src="./icons/Camtasia.svg" width="48"> |
| `camunda` | <img src="./icons/Camunda.svg" width="48"> | | `canva` | <img src="./icons/Canva.svg" width="48"> | | `capacitorjs` | <img src="./icons/Capacitorjs.svg" width="48"> |
| `capcut` | <img src="./icons/Capcut.svg" width="48"> | | `cassandra` | <img src="./icons/Cassandra-Dark.svg" width="48"> | | `centos` | <img src="./icons/CentOS.svg" width="48"> |
| `chai` | <img src="./icons/Chai-Dark.svg" width="48"> | | `chakraui` | <img src="./icons/ChakraUI.svg" width="48"> | | `chartjs` | <img src="./icons/Chartjs-Dark.svg" width="48"> |
| `chocolatey` | <img src="./icons/Chocolatey.svg" width="48"> | | `chromium` | <img src="./icons/Chromium.svg" width="48"> | | `circleci` | <img src="./icons/CircleCI.svg" width="48"> |
| `cisco` | <img src="./icons/Cisco.svg" width="48"> | | `civitai` | <img src="./icons/Civitai.svg" width="48"> | | `claudeai` | <img src="./icons/ClaudeAI.svg" width="48"> |
| `clerk` | <img src="./icons/Clerk.svg" width="48"> | | `clickhouse` | <img src="./icons/ClickHouse.svg" width="48"> | | `clickup` | <img src="./icons/ClickUp.svg" width="48"> |
| `cline` | <img src="./icons/Cline.svg" width="48"> | | `clion` | <img src="./icons/CLion-Dark.svg" width="48"> | | `clojure` | <img src="./icons/Clojure-Dark.svg" width="48"> |
| `cloudflare` | <img src="./icons/Cloudflare-Dark.svg" width="48"> | | `cloudinary` | <img src="./icons/Cloudinary.svg" width="48"> | | `cmake` | <img src="./icons/CMake-Dark.svg" width="48"> |
| `cmder` | <img src="./icons/Cmder.svg" width="48"> | | `codeberg` | <img src="./icons/Codeberg.svg" width="48"> | | `codeblocks` | <img src="./icons/CodeBlocks.svg" width="48"> |
| `codechef` | <img src="./icons/Codechef.svg" width="48"> | | `codecov` | <img src="./icons/Codecov.svg" width="48"> | | `codeforces` | <img src="./icons/CodeForces.svg" width="48"> |
| `codegeex` | <img src="./icons/CodeGeeX.svg" width="48"> | | `codeigniter` | <img src="./icons/CodeIgniter-Dark.svg" width="48"> | | `codepen` | <img src="./icons/CodePen-Dark.svg" width="48"> |
| `codeql` | <img src="./icons/CodeQL.svg" width="48"> | | `coffeescript` | <img src="./icons/CoffeeScript-Dark.svg" width="48"> | | `cohere` | <img src="./icons/Cohere.svg" width="48"> |
| `comfyui` | <img src="./icons/ComfyUI.svg" width="48"> | | `commitlint` | <img src="./icons/Commitlint.svg" width="48"> | | `compose` | <img src="./icons/Compose-Dark.svg" width="48"> |
| `confluence` | <img src="./icons/Confluence.svg" width="48"> | | `consul` | <img src="./icons/Consul.svg" width="48"> | | `cookiecutter` | <img src="./icons/CookieCutter.svg" width="48"> |
| `couchdb` | <img src="./icons/CouchDB-Dark.svg" width="48"> | | `coze` | <img src="./icons/Coze.svg" width="48"> | | `cpanel` | <img src="./icons/CPanel.svg" width="48"> |
| `cpp` | <img src="./icons/CPP.svg" width="48"> | | `crusoe` | <img src="./icons/Crusoe.svg" width="48"> | | `crystal` | <img src="./icons/Crystal-Dark.svg" width="48"> |
| `cs` | <img src="./icons/CS.svg" width="48"> | | `css` | <img src="./icons/CSS.svg" width="48"> | | `cucumber` | <img src="./icons/Cucumber.svg" width="48"> |
| `cudacplusplus` | <img src="./icons/Cudacplusplus.svg" width="48"> | | `curl` | <img src="./icons/Curl.svg" width="48"> | | `curseforge` | <img src="./icons/CurseForge.svg" width="48"> |
| `cursor` | <img src="./icons/Cursor.svg" width="48"> | | `cypress` | <img src="./icons/Cypress-Dark.svg" width="48"> | | `d3` | <img src="./icons/D3-Dark.svg" width="48"> |
| `dailydev` | <img src="./icons/Dailydev.svg" width="48"> | | `daisyui` | <img src="./icons/DaisyUI.svg" width="48"> | | `dart` | <img src="./icons/Dart-Dark.svg" width="48"> |
| `databricks` | <img src="./icons/DataBricks.svg" width="48"> | | `datadog` | <img src="./icons/Datadog.svg" width="48"> | | `datagrip` | <img src="./icons/Datagrip.svg" width="48"> |
| `datalore` | <img src="./icons/Datalore.svg" width="48"> | | `datefns` | <img src="./icons/Datefns.svg" width="48"> | | `dbeaver` | <img src="./icons/DBeaver-Dark.svg" width="48"> |
| `dbt` | <img src="./icons/Dbt.svg" width="48"> | | `debian` | <img src="./icons/Debian.svg" width="48"> | | `deepin` | <img src="./icons/Deepin.svg" width="48"> |
| `deepseek` | <img src="./icons/Deepseek.svg" width="48"> | | `deno2` | <img src="./icons/Deno2-Dark.svg" width="48"> | | `dependabot` | <img src="./icons/Dependabot.svg" width="48"> |
| `designali` | <img src="./icons/Designali.svg" width="48"> | | `devto` | <img src="./icons/DevTo-Dark.svg" width="48"> | | `digitalocean` | <img src="./icons/DigitalOcean.svg" width="48"> |
| `directus` | <img src="./icons/Directus.svg" width="48"> | | `directx` | <img src="./icons/DirectX-Dark.svg" width="48"> | | `discord` | <img src="./icons/Discord.svg" width="48"> |
| `discordbots` | <img src="./icons/DiscordBots.svg" width="48"> | | `discordjs` | <img src="./icons/DiscordJS-Dark.svg" width="48"> | | `disqus` | <img src="./icons/Disqus.svg" width="48"> |
| `django` | <img src="./icons/Django.svg" width="48"> | | `djangorestframework` | <img src="./icons/DjangoRestFramework.svg" width="48"> | | `dlang` | <img src="./icons/Dlang.svg" width="48"> |
| `dndkit` | <img src="./icons/Dndkit.svg" width="48"> | | `dnspy` | <img src="./icons/Dnspy.svg" width="48"> | | `docker` | <img src="./icons/Docker.svg" width="48"> |
| `docus` | <img src="./icons/Docus.svg" width="48"> | | `docusaurus` | <img src="./icons/Docusaurus.svg" width="48"> | | `dotnet` | <img src="./icons/DotNet.svg" width="48"> |
| `dremio` | <img src="./icons/DremIO.svg" width="48"> | | `dribble` | <img src="./icons/Dribble-Dark.svg" width="48"> | | `drizzle` | <img src="./icons/Drizzle.svg" width="48"> |
| `dropbox` | <img src="./icons/Dropbox.svg" width="48"> | | `drupal` | <img src="./icons/Drupal.svg" width="48"> | | `duckdb` | <img src="./icons/Duckdb.svg" width="48"> |
| `duckduckgo` | <img src="./icons/Duckduckgo.svg" width="48"> | | `dynamodb` | <img src="./icons/DynamoDB-Dark.svg" width="48"> | | `easybuild` | <img src="./icons/Easybuild.svg" width="48"> |
| `echarts` | <img src="./icons/ECharts.svg" width="48"> | | `echo` | <img src="./icons/Echo.svg" width="48"> | | `eclipse` | <img src="./icons/Eclipse-Dark.svg" width="48"> |
| `edge` | <img src="./icons/Edge.svg" width="48"> | | `effect` | <img src="./icons/Effect.svg" width="48"> | | `ejs` | <img src="./icons/Ejs.svg" width="48"> |
| `elasticsearch` | <img src="./icons/Elasticsearch-Dark.svg" width="48"> | | `electron` | <img src="./icons/Electron-Dark.svg" width="48"> | | `element` | <img src="./icons/Element.svg" width="48"> |
| `elementor` | <img src="./icons/Elementor.svg" width="48"> | | `elementplus` | <img src="./icons/ElementPlus.svg" width="48"> | | `elixir` | <img src="./icons/Elixir-Dark.svg" width="48"> |
| `elm` | <img src="./icons/Elm-Dark.svg" width="48"> | | `elysia` | <img src="./icons/Elysia-Dark.svg" width="48"> | | `emacs` | <img src="./icons/Emacs.svg" width="48"> |
| `ember` | <img src="./icons/Ember.svg" width="48"> | | `emotion` | <img src="./icons/Emotion-Dark.svg" width="48"> | | `erlang` | <img src="./icons/Erlang.svg" width="48"> |
| `esbuild` | <img src="./icons/Esbuild.svg" width="48"> | | `eslint` | <img src="./icons/Eslint-Dark.svg" width="48"> | | `etcd` | <img src="./icons/Etcd.svg" width="48"> |
| `eventbridge` | <img src="./icons/EventBridge.svg" width="48"> | | `excel` | <img src="./icons/Excel-Dark.svg" width="48"> | | `expo` | <img src="./icons/Expo-Dark.svg" width="48"> |
| `expressjs` | <img src="./icons/ExpressJS-Dark.svg" width="48"> | | `fabricjs` | <img src="./icons/Fabricjs.svg" width="48"> | | `fabricmc` | <img src="./icons/FabricMC.svg" width="48"> |
| `facebook` | <img src="./icons/Facebook.svg" width="48"> | | `fastapi` | <img src="./icons/FastAPI.svg" width="48"> | | `fastify` | <img src="./icons/Fastify.svg" width="48"> |
| `fdroid` | <img src="./icons/Fdroid.svg" width="48"> | | `featuresliceddesign` | <img src="./icons/FeatureSlicedDesign.svg" width="48"> | | `fediverse` | <img src="./icons/Fediverse-Dark.svg" width="48"> |
| `fedora` | <img src="./icons/Fedora.svg" width="48"> | | `fiber` | <img src="./icons/Fiber.svg" width="48"> | | `figma` | <img src="./icons/Figma-Dark.svg" width="48"> |
| `filezilla` | <img src="./icons/Filezilla.svg" width="48"> | | `filmora` | <img src="./icons/Filmora.svg" width="48"> | | `firebase` | <img src="./icons/Firebase-Dark.svg" width="48"> |
| `firebaseailogic` | <img src="./icons/FirebaseAILogic.svg" width="48"> | | `firebasestudio` | <img src="./icons/FirebaseStudio.svg" width="48"> | | `firefox` | <img src="./icons/Firefox.svg" width="48"> |
| `fivetran` | <img src="./icons/Fivetran.svg" width="48"> | | `flask` | <img src="./icons/Flask-Dark.svg" width="48"> | | `flatassembler` | <img src="./icons/FlatAssembler.svg" width="48"> |
| `fleet` | <img src="./icons/Fleet.svg" width="48"> | | `flowbite` | <img src="./icons/Flowbite.svg" width="48"> | | `flutter` | <img src="./icons/Flutter-Dark.svg" width="48"> |
| `flutterflow` | <img src="./icons/Flutterflow.svg" width="48"> | | `flyio` | <img src="./icons/Flyio.svg" width="48"> | | `forem` | <img src="./icons/Forem.svg" width="48"> |
| `forgemc` | <img src="./icons/ForgeMC.svg" width="48"> | | `forth` | <img src="./icons/Forth.svg" width="48"> | | `fortran` | <img src="./icons/Fortran.svg" width="48"> |
| `framermotion` | <img src="./icons/FramerMotion-Dark.svg" width="48"> | | `freebsd` | <img src="./icons/FreeBSD.svg" width="48"> | | `freecad` | <img src="./icons/FreeCAD-Dark.svg" width="48"> |
| `fresh` | <img src="./icons/Fresh.svg" width="48"> | | `fsharp` | <img src="./icons/Fsharp.svg" width="48"> | | `gamemakerstudio` | <img src="./icons/GameMakerStudio.svg" width="48"> |
| `ganache` | <img src="./icons/Ganache.svg" width="48"> | | `gatsby` | <img src="./icons/Gatsby.svg" width="48"> | | `gcp` | <img src="./icons/GCP-Dark.svg" width="48"> |
| `geany` | <img src="./icons/Geany.svg" width="48"> | | `genkit` | <img src="./icons/Genkit.svg" width="48"> | | `gentoo` | <img src="./icons/Gentoo-Dark.svg" width="48"> |
| `getx` | <img src="./icons/Getx.svg" width="48"> | | `gherkin` | <img src="./icons/Gherkin-Dark.svg" width="48"> | | `ghostty` | <img src="./icons/Ghostty.svg" width="48"> |
| `gimp` | <img src="./icons/Gimp.svg" width="48"> | | `gin` | <img src="./icons/Gin.svg" width="48"> | | `git` | <img src="./icons/Git-Dark.svg" width="48"> |
| `gitbash` | <img src="./icons/GitBash.svg" width="48"> | | `gitbook` | <img src="./icons/Gitbook.svg" width="48"> | | `gitea` | <img src="./icons/Gitea.svg" width="48"> |
| `github` | <img src="./icons/Github-Dark.svg" width="48"> | | `githubactions` | <img src="./icons/GithubActions-Dark.svg" width="48"> | | `githubcopilot` | <img src="./icons/GithubCopilot.svg" width="48"> |
| `githubpages` | <img src="./icons/GithubPages.svg" width="48"> | | `gitkraken` | <img src="./icons/GitKraken.svg" width="48"> | | `gitlab` | <img src="./icons/GitLab-Dark.svg" width="48"> |
| `gitlocalize` | <img src="./icons/Gitlocalize.svg" width="48"> | | `gitmind` | <img src="./icons/Gitmind.svg" width="48"> | | `gitpod` | <img src="./icons/GitPod.svg" width="48"> |
| `gleam` | <img src="./icons/Gleam.svg" width="48"> | | `gmail` | <img src="./icons/Gmail-Dark.svg" width="48"> | | `gnu` | <img src="./icons/Gnu.svg" width="48"> |
| `godot` | <img src="./icons/Godot-Dark.svg" width="48"> | | `goland` | <img src="./icons/Goland.svg" width="48"> | | `golang` | <img src="./icons/GoLang.svg" width="48"> |
| `googleadk` | <img src="./icons/GoogleADK.svg" width="48"> | | `googleadsense` | <img src="./icons/GoogleadSense.svg" width="48"> | | `googleanalytics` | <img src="./icons/GoogleAnalytics-Dark.svg" width="48"> |
| `googleappsscript` | <img src="./icons/GoogleAppsScript-Dark.svg" width="48"> | | `googlechrome` | <img src="./icons/GoogleChrome.svg" width="48"> | | `googlecloud` | <img src="./icons/GoogleCloud.svg" width="48"> |
| `googlecolab` | <img src="./icons/GoogleColab-Dark.svg" width="48"> | | `googledrive` | <img src="./icons/GoogleDrive.svg" width="48"> | | `googlegemini` | <img src="./icons/GoogleGemini.svg" width="48"> |
| `googleidx` | <img src="./icons/GoogleIdx.svg" width="48"> | | `gorm` | <img src="./icons/Gorm.svg" width="48"> | | `gradio` | <img src="./icons/Gradio-Dark.svg" width="48"> |
| `gradle` | <img src="./icons/Gradle-Dark.svg" width="48"> | | `grafana` | <img src="./icons/Grafana-Dark.svg" width="48"> | | `graphite` | <img src="./icons/Graphite.svg" width="48"> |
| `graphql` | <img src="./icons/GraphQL-Dark.svg" width="48"> | | `gridsome` | <img src="./icons/Gridsome.svg" width="48"> | | `grok` | <img src="./icons/Grok.svg" width="48"> |
| `groovy` | <img src="./icons/Groovy.svg" width="48"> | | `groq` | <img src="./icons/Groq.svg" width="48"> | | `grpc` | <img src="./icons/Grpc.svg" width="48"> |
| `gruntjs` | <img src="./icons/Gruntjs.svg" width="48"> | | `gsap` | <img src="./icons/GSAP-Dark.svg" width="48"> | | `gtk` | <img src="./icons/GTK-Dark.svg" width="48"> |
| `gulp` | <img src="./icons/Gulp.svg" width="48"> | | `hackerrank` | <img src="./icons/Hackerrank-Dark.svg" width="48"> | | `hackthebox` | <img src="./icons/HackTheBox.svg" width="48"> |
| `hacs` | <img src="./icons/Hacs.svg" width="48"> | | `handycontrols` | <img src="./icons/HandyControls.svg" width="48"> | | `haproxy` | <img src="./icons/HaProxy.svg" width="48"> |
| `hashicorp` | <img src="./icons/Hashicorp.svg" width="48"> | | `hashnode` | <img src="./icons/HashNode.svg" width="48"> | | `haskell` | <img src="./icons/Haskell-Dark.svg" width="48"> |
| `haxe` | <img src="./icons/Haxe-Dark.svg" width="48"> | | `haxeflixel` | <img src="./icons/HaxeFlixel-Dark.svg" width="48"> | | `headlessui` | <img src="./icons/HeadlessUI.svg" width="48"> |
| `heroku` | <img src="./icons/Heroku.svg" width="48"> | | `heroui` | <img src="./icons/HeroUI.svg" width="48"> | | `hexo` | <img src="./icons/Hexo.svg" width="48"> |
| `hibernate` | <img src="./icons/Hibernate-Dark.svg" width="48"> | | `homeassistant` | <img src="./icons/HomeAssistant.svg" width="48"> | | `homebrew` | <img src="./icons/HomeBrew.svg" width="48"> |
| `hono` | <img src="./icons/Hono.svg" width="48"> | | `hoppscotch` | <img src="./icons/HoppScotch.svg" width="48"> | | `hostgator` | <img src="./icons/Hostgator.svg" width="48"> |
| `html` | <img src="./icons/HTML.svg" width="48"> | | `htmx` | <img src="./icons/Htmx-Dark.svg" width="48"> | | `httpie` | <img src="./icons/Httpie.svg" width="48"> |
| `hub` | <img src="./icons/Hub.svg" width="48"> | | `huggingface` | <img src="./icons/HuggingFace.svg" width="48"> | | `hugo` | <img src="./icons/Hugo.svg" width="48"> |
| `hydrogen` | <img src="./icons/Hydrogen-Dark.svg" width="48"> | | `hyper` | <img src="./icons/Hyper.svg" width="48"> | | `iceberg` | <img src="./icons/Iceberg.svg" width="48"> |
| `idea` | <img src="./icons/Idea-Dark.svg" width="48"> | | `ifttt` | <img src="./icons/IFTTT.svg" width="48"> | | `inertiajs` | <img src="./icons/Inertiajs.svg" width="48"> |
| `influxdb` | <img src="./icons/InfluxDB.svg" width="48"> | | `inkscape` | <img src="./icons/Inkscape.svg" width="48"> | | `insomnia` | <img src="./icons/Insomnia.svg" width="48"> |
| `instagram` | <img src="./icons/Instagram.svg" width="48"> | | `intellijidea` | <img src="./icons/IntellijIdea.svg" width="48"> | | `ionic` | <img src="./icons/Ionic-Dark.svg" width="48"> |
| `ios` | <img src="./icons/IOS.svg" width="48"> | | `ipados` | <img src="./icons/IPadOS.svg" width="48"> | | `ipfs` | <img src="./icons/IPFS-Dark.svg" width="48"> |
| `jakartaee` | <img src="./icons/JakartaEE.svg" width="48"> | | `jamstack` | <img src="./icons/Jamstack.svg" width="48"> | | `jasmine` | <img src="./icons/Jasmine.svg" width="48"> |
| `java` | <img src="./icons/Java-Dark.svg" width="48"> | | `javascript` | <img src="./icons/JavaScript.svg" width="48"> | | `javascriptregistry` | <img src="./icons/JavascriptRegistry.svg" width="48"> |
| `jekyll` | <img src="./icons/Jekyll-Dark.svg" width="48"> | | `jenkins` | <img src="./icons/Jenkins-Dark.svg" width="48"> | | `jest` | <img src="./icons/Jest.svg" width="48"> |
| `jetpackcompose` | <img src="./icons/JetpackCompose.svg" width="48"> | | `jhipster` | <img src="./icons/Jhipster-Dark.svg" width="48"> | | `jira` | <img src="./icons/Jira.svg" width="48"> |
| `jitsi` | <img src="./icons/Jitsi.svg" width="48"> | | `joomla` | <img src="./icons/Joomla.svg" width="48"> | | `jotai` | <img src="./icons/Jotai.svg" width="48"> |
| `jquery` | <img src="./icons/JQuery.svg" width="48"> | | `json` | <img src="./icons/JSON-Dark.svg" width="48"> | | `jsonschema` | <img src="./icons/JsonSchema.svg" width="48"> |
| `julia` | <img src="./icons/Julia-Dark.svg" width="48"> | | `junit4` | <img src="./icons/JUnit4.svg" width="48"> | | `junit5` | <img src="./icons/JUnit5.svg" width="48"> |
| `jupiter` | <img src="./icons/Jupiter-Dark.svg" width="48"> | | `jupyter` | <img src="./icons/Jupyter-Light.svg" width="48"> | | `jwt` | <img src="./icons/Jwt.svg" width="48"> |
| `k3s` | <img src="./icons/K3s.svg" width="48"> | | `kafka` | <img src="./icons/Kafka.svg" width="48"> | | `kaggle` | <img src="./icons/Kaggle.svg" width="48"> |
| `kalilinux` | <img src="./icons/KaliLinux-Dark.svg" width="48"> | | `kepware` | <img src="./icons/Kepware.svg" width="48"> | | `keras` | <img src="./icons/Keras.svg" width="48"> |
| `keycloak` | <img src="./icons/Keycloak.svg" width="48"> | | `konva` | <img src="./icons/Konva.svg" width="48"> | | `kotlin` | <img src="./icons/Kotlin-Dark.svg" width="48"> |
| `ktor` | <img src="./icons/Ktor-Dark.svg" width="48"> | | `kubernetes` | <img src="./icons/Kubernetes.svg" width="48"> | | `kubuntu` | <img src="./icons/Kubuntu.svg" width="48"> |
| `lambda` | <img src="./icons/Lambda-Dark.svg" width="48"> | | `langchain` | <img src="./icons/Langchain-Dark.svg" width="48"> | | `laravel` | <img src="./icons/Laravel-Dark.svg" width="48"> |
| `latex` | <img src="./icons/LaTeX-Dark.svg" width="48"> | | `leaflet` | <img src="./icons/Leaflet.svg" width="48"> | | `leetcode` | <img src="./icons/Leetcode.svg" width="48"> |
| `lemonsqueezy` | <img src="./icons/LemonSqueezy.svg" width="48"> | | `less` | <img src="./icons/Less-Dark.svg" width="48"> | | `librepcb` | <img src="./icons/LibrePCB.svg" width="48"> |
| `linkedin` | <img src="./icons/LinkedIn.svg" width="48"> | | `linux` | <img src="./icons/Linux-Dark.svg" width="48"> | | `linuxmint` | <img src="./icons/LinuxMint.svg" width="48"> |
| `lit` | <img src="./icons/Lit-Dark.svg" width="48"> | | `litert` | <img src="./icons/Litert.svg" width="48"> | | `litestar` | <img src="./icons/Litestar.svg" width="48"> |
| `litmus` | <img src="./icons/Litmus.svg" width="48"> | | `livewire` | <img src="./icons/Livewire-Dark.svg" width="48"> | | `llamaindex` | <img src="./icons/LlamaIndex.svg" width="48"> |
| `llvm` | <img src="./icons/Llvm.svg" width="48"> | | `lmstudio` | <img src="./icons/LMstudio.svg" width="48"> | | `locofy` | <img src="./icons/Locofy-Dark.svg" width="48"> |
| `logto` | <img src="./icons/Logto.svg" width="48"> | | `lokalise` | <img src="./icons/Lokalise.svg" width="48"> | | `loki` | <img src="./icons/Loki.svg" width="48"> |
| `lookerstudio` | <img src="./icons/LookerStudio.svg" width="48"> | | `lottiefiles` | <img src="./icons/Lottiefiles.svg" width="48"> | | `lovable` | <img src="./icons/Lovable.svg" width="48"> |
| `lua` | <img src="./icons/Lua-Dark.svg" width="48"> | | `lubuntu` | <img src="./icons/Lubuntu.svg" width="48"> | | `lucia` | <img src="./icons/Lucia.svg" width="48"> |
| `lucide` | <img src="./icons/Lucide.svg" width="48"> | | `lumo` | <img src="./icons/Lumo.svg" width="48"> | | `lynxjs` | <img src="./icons/Lynxjs.svg" width="48"> |
| `macos` | <img src="./icons/MacOS.svg" width="48"> | | `magicui` | <img src="./icons/MagicUI.svg" width="48"> | | `magisk` | <img src="./icons/Magisk.svg" width="48"> |
| `mailchimp` | <img src="./icons/Mailchimp.svg" width="48"> | | `mambaui` | <img src="./icons/MambaUI.svg" width="48"> | | `manifoldjs` | <img src="./icons/Manifoldjs.svg" width="48"> |
| `manim` | <img src="./icons/Manim.svg" width="48"> | | `manjaro` | <img src="./icons/Manjaro.svg" width="48"> | | `mapbox` | <img src="./icons/Mapbox.svg" width="48"> |
| `mariadb` | <img src="./icons/MariaDB-Dark.svg" width="48"> | | `markdown` | <img src="./icons/Markdown-Dark.svg" width="48"> | | `mastodon` | <img src="./icons/Mastodon-Dark.svg" width="48"> |
| `materialdesign` | <img src="./icons/MaterialDesign.svg" width="48"> | | `materialformkdocs` | <img src="./icons/MaterialFormkDocs.svg" width="48"> | | `materialize` | <img src="./icons/Materialize-Dark.svg" width="48"> |
| `materialui` | <img src="./icons/MaterialUI-Dark.svg" width="48"> | | `matlab` | <img src="./icons/Matlab-Dark.svg" width="48"> | | `matplotlib` | <img src="./icons/Matplotlib-Dark.svg" width="48"> |
| `medium` | <img src="./icons/Medium.svg" width="48"> | | `medusa` | <img src="./icons/Medusa.svg" width="48"> | | `mermaid` | <img src="./icons/Mermaid.svg" width="48"> |
| `meshtastic` | <img src="./icons/Meshtastic.svg" width="48"> | | `meta` | <img src="./icons/Meta.svg" width="48"> | | `metal` | <img src="./icons/Metal.svg" width="48"> |
| `metasploit` | <img src="./icons/Metasploit.svg" width="48"> | | `meteor` | <img src="./icons/Meteor-Dark.svg" width="48"> | | `microsoftcopilot` | <img src="./icons/MicrosoftCopilot.svg" width="48"> |
| `milligram` | <img src="./icons/Milligram.svg" width="48"> | | `mimir` | <img src="./icons/Mimir.svg" width="48"> | | `minimax` | <img src="./icons/Minimax.svg" width="48"> |
| `minio` | <img src="./icons/MinIO.svg" width="48"> | | `mint` | <img src="./icons/Mint-Dark.svg" width="48"> | | `misskey` | <img src="./icons/Misskey-Dark.svg" width="48"> |
| `mkdocs` | <img src="./icons/Mkdocs.svg" width="48"> | | `ml5` | <img src="./icons/ML5-Dark.svg" width="48"> | | `mocha` | <img src="./icons/Mocha-Dark.svg" width="48"> |
| `mongodb` | <img src="./icons/MongoDB.svg" width="48"> | | `mongoose` | <img src="./icons/Mongoose-Dark.svg" width="48"> | | `motherduck` | <img src="./icons/MotherDuck.svg" width="48"> |
| `motion` | <img src="./icons/Motion.svg" width="48"> | | `mqtt` | <img src="./icons/Mqtt.svg" width="48"> | | `msdos` | <img src="./icons/MSdos.svg" width="48"> |
| `msys2` | <img src="./icons/MSys2.svg" width="48"> | | `mybatis` | <img src="./icons/Mybatis-Dark.svg" width="48"> | | `mybatisplus` | <img src="./icons/MybatisPlus-Dark.svg" width="48"> |
| `myshellai` | <img src="./icons/MyshellAI.svg" width="48"> | | `mysql` | <img src="./icons/MySQL-Dark.svg" width="48"> | | `n8n` | <img src="./icons/N8n.svg" width="48"> |
| `nativescript` | <img src="./icons/NativeScript-Dark.svg" width="48"> | | `navicat` | <img src="./icons/Navicat.svg" width="48"> | | `neo4j` | <img src="./icons/Neo4j-Dark.svg" width="48"> |
| `neoforge` | <img src="./icons/NeoForge.svg" width="48"> | | `neon` | <img src="./icons/Neon.svg" width="48"> | | `neovim` | <img src="./icons/NeoVim-Dark.svg" width="48"> |
| `nestjs` | <img src="./icons/NestJS-Dark.svg" width="48"> | | `netbeans` | <img src="./icons/Netbeans.svg" width="48"> | | `netlify` | <img src="./icons/Netlify-Dark.svg" width="48"> |
| `netty` | <img src="./icons/Netty-Dark.svg" width="48"> | | `nextdns` | <img src="./icons/Nextdns.svg" width="48"> | | `nextjs` | <img src="./icons/NextJS-Dark.svg" width="48"> |
| `nginx` | <img src="./icons/Nginx.svg" width="48"> | | `ngrok` | <img src="./icons/Ngrok.svg" width="48"> | | `nim` | <img src="./icons/Nim-Dark.svg" width="48"> |
| `nitro` | <img src="./icons/Nitro.svg" width="48"> | | `nix` | <img src="./icons/Nix-Dark.svg" width="48"> | | `nixos` | <img src="./icons/NixOS.svg" width="48"> |
| `nodejs` | <img src="./icons/NodeJS-Dark.svg" width="48"> | | `nodered` | <img src="./icons/NodeRED.svg" width="48"> | | `nomad` | <img src="./icons/Nomad.svg" width="48"> |
| `notepadplusplus` | <img src="./icons/NotepadPlusPlus.svg" width="48"> | | `notion` | <img src="./icons/Notion-Dark.svg" width="48"> | | `npm` | <img src="./icons/Npm-Dark.svg" width="48"> |
| `nuget` | <img src="./icons/Nuget.svg" width="48"> | | `numpy` | <img src="./icons/Numpy-Dark.svg" width="48"> | | `nunjucks` | <img src="./icons/Nunjucks.svg" width="48"> |
| `nuxtjs` | <img src="./icons/NuxtJS-Dark.svg" width="48"> | | `obs` | <img src="./icons/Obs.svg" width="48"> | | `obsidian` | <img src="./icons/Obsidian-Dark.svg" width="48"> |
| `ocaml` | <img src="./icons/OCaml.svg" width="48"> | | `octave` | <img src="./icons/Octave-Dark.svg" width="48"> | | `ollama` | <img src="./icons/Ollama.svg" width="48"> |
| `onyx` | <img src="./icons/Onyx.svg" width="48"> | | `openai` | <img src="./icons/OpenAI.svg" width="48"> | | `openapi` | <img src="./icons/OpenAPI.svg" width="48"> |
| `opencv` | <img src="./icons/OpenCV-Dark.svg" width="48"> | | `opengl` | <img src="./icons/OpenGL-Dark.svg" width="48"> | | `openlayers` | <img src="./icons/OpenLayers.svg" width="48"> |
| `openondemand` | <img src="./icons/OpenOnDemand.svg" width="48"> | | `opensergo` | <img src="./icons/OpenSergo.svg" width="48"> | | `openshift` | <img src="./icons/OpenShift.svg" width="48"> |
| `openstack` | <img src="./icons/OpenStack-Dark.svg" width="48"> | | `opentelemetry` | <img src="./icons/OpenTelemetry.svg" width="48"> | | `openvpn` | <img src="./icons/OpenVPN.svg" width="48"> |
| `openweather` | <img src="./icons/OpenWeather.svg" width="48"> | | `openwebui` | <img src="./icons/OpenWebUI.svg" width="48"> | | `opera` | <img src="./icons/Opera.svg" width="48"> |
| `oracle` | <img src="./icons/Oracle-Dark.svg" width="48"> | | `oraclecloudinfrastructure` | <img src="./icons/OracleCloudInfrastructure.svg" width="48"> | | `outlook` | <img src="./icons/Outlook.svg" width="48"> |
| `overleaf` | <img src="./icons/Overleaf.svg" width="48"> | | `p4` | <img src="./icons/P4.svg" width="48"> | | `p5js` | <img src="./icons/P5JS-Dark.svg" width="48"> |
| `packer` | <img src="./icons/Packer.svg" width="48"> | | `pandacss` | <img src="./icons/PandaCSS.svg" width="48"> | | `pandas` | <img src="./icons/Pandas-Dark.svg" width="48"> |
| `parcel` | <img src="./icons/Parcel.svg" width="48"> | | `parrotos` | <img src="./icons/ParrotOS.svg" width="48"> | | `passportjs` | <img src="./icons/PassportJS.svg" width="48"> |
| `payload` | <img src="./icons/Payload.svg" width="48"> | | `pennylane` | <img src="./icons/PennyLane.svg" width="48"> | | `penpot` | <img src="./icons/Penpot.svg" width="48"> |
| `pentahopdi` | <img src="./icons/PentahoPDI.svg" width="48"> | | `perl` | <img src="./icons/Perl.svg" width="48"> | | `perplexity` | <img src="./icons/Perplexity.svg" width="48"> |
| `phoenix` | <img src="./icons/Phoenix.svg" width="48"> | | `php` | <img src="./icons/PHP-Dark.svg" width="48"> | | `phpstorm` | <img src="./icons/PhpStorm-Dark.svg" width="48"> |
| `pinia` | <img src="./icons/Pinia-Dark.svg" width="48"> | | `pinterest` | <img src="./icons/Pinterest.svg" width="48"> | | `pkgroll` | <img src="./icons/Pkgroll.svg" width="48"> |
| `pkl` | <img src="./icons/Pkl-Dark.svg" width="48"> | | `plan9` | <img src="./icons/Plan9-Dark.svg" width="48"> | | `planetscale` | <img src="./icons/PlanetScale-Dark.svg" width="48"> |
| `platformio` | <img src="./icons/PlatformIO.svg" width="48"> | | `plausible` | <img src="./icons/Plausible.svg" width="48"> | | `playwright` | <img src="./icons/PlayWright-Dark.svg" width="48"> |
| `pnpm` | <img src="./icons/Pnpm-Dark.svg" width="48"> | | `pocketbase` | <img src="./icons/Pocketbase.svg" width="48"> | | `podman` | <img src="./icons/Podman.svg" width="48"> |
| `polars` | <img src="./icons/Polars.svg" width="48"> | | `popos` | <img src="./icons/PopOS.svg" width="48"> | | `portugolstudio` | <img src="./icons/PortugolStudio.svg" width="48"> |
| `postcss` | <img src="./icons/PostCSS-Dark.svg" width="48"> | | `postgresql` | <img src="./icons/PostgreSQL-Dark.svg" width="48"> | | `posthog` | <img src="./icons/Posthog.svg" width="48"> |
| `postman` | <img src="./icons/Postman.svg" width="48"> | | `powerbi` | <img src="./icons/PowerBI.svg" width="48"> | | `powershell` | <img src="./icons/Powershell-Dark.svg" width="48"> |
| `preact` | <img src="./icons/Preact-Dark.svg" width="48"> | | `prettier` | <img src="./icons/Prettier.svg" width="48"> | | `primevue` | <img src="./icons/Primevue.svg" width="48"> |
| `prisma` | <img src="./icons/Prisma.svg" width="48"> | | `prismic` | <img src="./icons/Prismic.svg" width="48"> | | `processing` | <img src="./icons/Processing-Dark.svg" width="48"> |
| `procure` | <img src="./icons/Procure.svg" width="48"> | | `prometheus` | <img src="./icons/Prometheus.svg" width="48"> | | `protoncalendar` | <img src="./icons/ProtonCalendar.svg" width="48"> |
| `protonmail` | <img src="./icons/ProtonMail-Dark.svg" width="48"> | | `protonpass` | <img src="./icons/ProtonPass.svg" width="48"> | | `protonvpn` | <img src="./icons/ProtonVPN.svg" width="48"> |
| `protonwallet` | <img src="./icons/ProtonWallet.svg" width="48"> | | `proxmox` | <img src="./icons/Proxmox.svg" width="48"> | | `psycopg` | <img src="./icons/Psycopg.svg" width="48"> |
| `pug` | <img src="./icons/Pug-Dark.svg" width="48"> | | `pull` | <img src="./icons/Pull.svg" width="48"> | | `pulumi` | <img src="./icons/Pulumi.svg" width="48"> |
| `puppeteer` | <img src="./icons/Puppeteer-Dark.svg" width="48"> | | `putty` | <img src="./icons/Putty-Dark.svg" width="48"> | | `pwa` | <img src="./icons/PWA-Dark.svg" width="48"> |
| `pycharm` | <img src="./icons/PyCharm-Dark.svg" width="48"> | | `pydantic` | <img src="./icons/Pydantic.svg" width="48"> | | `pygame` | <img src="./icons/Pygame.svg" width="48"> |
| `pymc` | <img src="./icons/PyMC.svg" width="48"> | | `pypi` | <img src="./icons/PyPI.svg" width="48"> | | `pyramid` | <img src="./icons/Pyramid.svg" width="48"> |
| `pytest` | <img src="./icons/PyTest.svg" width="48"> | | `python` | <img src="./icons/Python-Dark.svg" width="48"> | | `pytorch` | <img src="./icons/PyTorch-Dark.svg" width="48"> |
| `pytorch3d` | <img src="./icons/Pytorch3D.svg" width="48"> | | `qdrant` | <img src="./icons/Qdrant.svg" width="48"> | | `qtwidgets` | <img src="./icons/QtWidgets-Dark.svg" width="48"> |
| `quasar` | <img src="./icons/Quasar-Dark.svg" width="48"> | | `qubesos` | <img src="./icons/QubesOS.svg" width="48"> | | `qwik` | <img src="./icons/Qwik-Dark.svg" width="48"> |
| `r` | <img src="./icons/R-Dark.svg" width="48"> | | `rabbitmq` | <img src="./icons/RabbitMQ-Dark.svg" width="48"> | | `radixui` | <img src="./icons/RadixUI.svg" width="48"> |
| `rails` | <img src="./icons/Rails.svg" width="48"> | | `railway` | <img src="./icons/Railway.svg" width="48"> | | `raspberrypi` | <img src="./icons/RaspberryPi-Dark.svg" width="48"> |
| `raygui` | <img src="./icons/Raygui.svg" width="48"> | | `raylib` | <img src="./icons/Raylib.svg" width="48"> | | `reactdatepicker` | <img src="./icons/ReactDatePicker.svg" width="48"> |
| `reacthookform` | <img src="./icons/ReactHookform.svg" width="48"> | | `reactivex` | <img src="./icons/ReactiveX-Dark.svg" width="48"> | | `reactjs` | <img src="./icons/ReactJS-Dark.svg" width="48"> |
| `reactlynx` | <img src="./icons/ReactLynx.svg" width="48"> | | `reactnative` | <img src="./icons/ReactNative.svg" width="48"> | | `reactquery` | <img src="./icons/ReactQuery-Dark.svg" width="48"> |
| `reactrelay` | <img src="./icons/ReactRelay-Dark.svg" width="48"> | | `reactrouter` | <img src="./icons/ReactRouter.svg" width="48"> | | `readthedocs` | <img src="./icons/ReadTheDocs.svg" width="48"> |
| `recoil` | <img src="./icons/Recoil.svg" width="48"> | | `reddit` | <img src="./icons/Reddit.svg" width="48"> | | `redhat` | <img src="./icons/RedHat-Dark.svg" width="48"> |
| `redis` | <img src="./icons/Redis-Dark.svg" width="48"> | | `redoc` | <img src="./icons/Redoc.svg" width="48"> | | `redux` | <img src="./icons/Redux.svg" width="48"> |
| `refine` | <img src="./icons/Refine.svg" width="48"> | | `regex` | <img src="./icons/Regex-Dark.svg" width="48"> | | `reglejs` | <img src="./icons/RegleJS.svg" width="48"> |
| `rekaui` | <img src="./icons/RekaUI.svg" width="48"> | | `remix` | <img src="./icons/Remix-Dark.svg" width="48"> | | `render` | <img src="./icons/Render-Dark.svg" width="48"> |
| `renovate` | <img src="./icons/Renovate.svg" width="48"> | | `replit` | <img src="./icons/Replit-Dark.svg" width="48"> | | `resend` | <img src="./icons/Resend.svg" width="48"> |
| `rest` | <img src="./icons/Rest.svg" width="48"> | | `revolt` | <img src="./icons/Revolt.svg" width="48"> | | `rider` | <img src="./icons/Rider-Dark.svg" width="48"> |
| `risc-v` | <img src="./icons/RISC-V-Dark.svg" width="48"> | | `riverpod` | <img src="./icons/Riverpod.svg" width="48"> | | `robloxstudio` | <img src="./icons/RobloxStudio.svg" width="48"> |
| `rocket` | <img src="./icons/Rocket.svg" width="48"> | | `rocketmq` | <img src="./icons/RocketMQ.svg" width="48"> | | `rolldown` | <img src="./icons/Rolldown.svg" width="48"> |
| `rollupjs` | <img src="./icons/RollupJS-Dark.svg" width="48"> | | `ros` | <img src="./icons/ROS-Dark.svg" width="48"> | | `ruby` | <img src="./icons/Ruby.svg" width="48"> |
| `rubymine` | <img src="./icons/RubyMine.svg" width="48"> | | `rust` | <img src="./icons/Rust.svg" width="48"> | | `rxjs` | <img src="./icons/RxJS.svg" width="48"> |
| `salesforce` | <img src="./icons/Salesforce-Dark.svg" width="48"> | | `sanity` | <img src="./icons/Sanity.svg" width="48"> | | `sap` | <img src="./icons/Sap.svg" width="48"> |
| `sass` | <img src="./icons/Sass.svg" width="48"> | | `scala` | <img src="./icons/Scala-Dark.svg" width="48"> | | `scikitlearn` | <img src="./icons/ScikitLearn-Dark.svg" width="48"> |
| `scipy` | <img src="./icons/SciPy.svg" width="48"> | | `scss` | <img src="./icons/SCSS.svg" width="48"> | | `seaborn` | <img src="./icons/Seaborn.svg" width="48"> |
| `selenium` | <img src="./icons/Selenium.svg" width="48"> | | `semanticui` | <img src="./icons/SemanticUI.svg" width="48"> | | `sentry` | <img src="./icons/Sentry.svg" width="48"> |
| `sequelize` | <img src="./icons/Sequelize-Dark.svg" width="48"> | | `serverless` | <img src="./icons/Serverless-Dark.svg" width="48"> | | `servicenow` | <img src="./icons/Servicenow-Dark.svg" width="48"> |
| `shadcn` | <img src="./icons/Shadcn-Dark.svg" width="48"> | | `shopify` | <img src="./icons/Shopify-Dark.svg" width="48"> | | `signal` | <img src="./icons/Signal.svg" width="48"> |
| `simpledirectmedialayer` | <img src="./icons/SimpleDirectmediaLayer.svg" width="48"> | | `singlespa` | <img src="./icons/Singlespa.svg" width="48"> | | `singularity` | <img src="./icons/Singularity.svg" width="48"> |
| `skeletonui` | <img src="./icons/SkeletonUI.svg" width="48"> | | `sketch` | <img src="./icons/Sketch.svg" width="48"> | | `sketchup` | <img src="./icons/Sketchup-Dark.svg" width="48"> |
| `slack` | <img src="./icons/Slack-Dark.svg" width="48"> | | `slidev` | <img src="./icons/Slidev.svg" width="48"> | | `slint` | <img src="./icons/Slint.svg" width="48"> |
| `slurm` | <img src="./icons/Slurm.svg" width="48"> | | `snipcart` | <img src="./icons/Snipcart.svg" width="48"> | | `snowflake` | <img src="./icons/Snowflake.svg" width="48"> |
| `snyk` | <img src="./icons/Snyk.svg" width="48"> | | `soap` | <img src="./icons/SOAP.svg" width="48"> | | `socketio` | <img src="./icons/SocketIO-Dark.svg" width="48"> |
| `solidity` | <img src="./icons/Solidity-Dark.svg" width="48"> | | `solidjs` | <img src="./icons/SolidJS-Dark.svg" width="48"> | | `solidstart` | <img src="./icons/Solidstart.svg" width="48"> |
| `solr` | <img src="./icons/Solr.svg" width="48"> | | `sonarqube` | <img src="./icons/Sonarqube-Dark.svg" width="48"> | | `soundbridge` | <img src="./icons/SoundBridge.svg" width="48"> |
| `sphinx` | <img src="./icons/Sphinx.svg" width="48"> | | `splunk` | <img src="./icons/Splunk.svg" width="48"> | | `spring` | <img src="./icons/Spring-Dark.svg" width="48"> |
| `springai` | <img src="./icons/SpringAI.svg" width="48"> | | `springbatch` | <img src="./icons/SpringBatch.svg" width="48"> | | `springboot` | <img src="./icons/SpringBoot-Dark.svg" width="48"> |
| `springcloud` | <img src="./icons/SpringCloud-Dark.svg" width="48"> | | `springgraphql` | <img src="./icons/SpringGraphQL.svg" width="48"> | | `springsecurity` | <img src="./icons/SpringSecurity.svg" width="48"> |
| `springshell` | <img src="./icons/SpringShell.svg" width="48"> | | `spyder` | <img src="./icons/Spyder-Dark.svg" width="48"> | | `sqlalchemy` | <img src="./icons/SQLAlchemy.svg" width="48"> |
| `sqlite` | <img src="./icons/SQLite.svg" width="48"> | | `sqlserver1` | <img src="./icons/SQLServer1-Dark.svg" width="48"> | | `sst` | <img src="./icons/Sst.svg" width="48"> |
| `stackblitz` | <img src="./icons/Stackblitz.svg" width="48"> | | `stackoverflow` | <img src="./icons/StackOverflow-Dark.svg" width="48"> | | `stanjs` | <img src="./icons/StanJS.svg" width="48"> |
| `starlight` | <img src="./icons/Starlight.svg" width="48"> | | `stata` | <img src="./icons/Stata.svg" width="48"> | | `steam` | <img src="./icons/Steam.svg" width="48"> |
| `stimulus` | <img src="./icons/Stimulus.svg" width="48"> | | `storyblok` | <img src="./icons/Storyblok.svg" width="48"> | | `storybook` | <img src="./icons/StoryBook.svg" width="48"> |
| `strapi` | <img src="./icons/Strapi.svg" width="48"> | | `streamlit` | <img src="./icons/Streamlit-Dark.svg" width="48"> | | `stride` | <img src="./icons/Stride.svg" width="48"> |
| `stripe` | <img src="./icons/Stripe.svg" width="48"> | | `styledcomponents` | <img src="./icons/StyledComponents.svg" width="48"> | | `sublime` | <img src="./icons/Sublime-Dark.svg" width="48"> |
| `suitecrm` | <img src="./icons/SuiteCRM.svg" width="48"> | | `supabase` | <img src="./icons/Supabase-Dark.svg" width="48"> | | `surrealdb` | <img src="./icons/SurrealDB.svg" width="48"> |
| `svelte` | <img src="./icons/Svelte.svg" width="48"> | | `svg` | <img src="./icons/SVG-Dark.svg" width="48"> | | `swagger` | <img src="./icons/Swagger-Dark.svg" width="48"> |
| `swc` | <img src="./icons/SWC.svg" width="48"> | | `swift` | <img src="./icons/Swift.svg" width="48"> | | `swiftui` | <img src="./icons/SwiftUI.svg" width="48"> |
| `swiper` | <img src="./icons/Swiper.svg" width="48"> | | `swr` | <img src="./icons/SWR.svg" width="48"> | | `symfony` | <img src="./icons/Symfony-Dark.svg" width="48"> |
| `systemd` | <img src="./icons/Systemd.svg" width="48"> | | `tailwindcss` | <img src="./icons/TailwindCSS-Dark.svg" width="48"> | | `tauri` | <img src="./icons/Tauri-Dark.svg" width="48"> |
| `tensorflow` | <img src="./icons/TensorFlow-Dark.svg" width="48"> | | `terraform` | <img src="./icons/Terraform-Dark.svg" width="48"> | | `testinglibrary` | <img src="./icons/TestingLibrary-Dark.svg" width="48"> |
| `threads` | <img src="./icons/Threads-Dark.svg" width="48"> | | `threejs` | <img src="./icons/ThreeJS-Dark.svg" width="48"> | | `thunderclient` | <img src="./icons/ThunderClient.svg" width="48"> |
| `thymeleaf` | <img src="./icons/Thymeleaf.svg" width="48"> | | `trello` | <img src="./icons/Trello.svg" width="48"> | | `twitter` | <img src="./icons/Twitter.svg" width="48"> |
| `typescript` | <img src="./icons/TypeScript.svg" width="48"> | | `ubuntu` | <img src="./icons/Ubuntu-Dark.svg" width="48"> | | `unity` | <img src="./icons/Unity-Dark.svg" width="48"> |
| `unrealengine` | <img src="./icons/UnrealEngine.svg" width="48"> | | `v` | <img src="./icons/V-Dark.svg" width="48"> | | `vala` | <img src="./icons/Vala.svg" width="48"> |
| `vercel` | <img src="./icons/Vercel-Dark.svg" width="48"> | | `vim` | <img src="./icons/VIM-Dark.svg" width="48"> | | `visualbasic` | <img src="./icons/VisualBasic-Dark.svg" width="48"> |
| `visualstudio` | <img src="./icons/VisualStudio-Dark.svg" width="48"> | | `visualstudiocode` | <img src="./icons/VisualStudioCode-Dark.svg" width="48"> | | `vite` | <img src="./icons/Vite-Dark.svg" width="48"> |
| `vitest` | <img src="./icons/Vitest-Dark.svg" width="48"> | | `vscode` | <img src="./icons/VSCode-Dark.svg" width="48"> | | `vscodium` | <img src="./icons/VSCodium-Dark.svg" width="48"> |
| `vuejs` | <img src="./icons/VueJS-Dark.svg" width="48"> | | `vuetify` | <img src="./icons/Vuetify-Dark.svg" width="48"> | | `vulkan` | <img src="./icons/Vulkan-Dark.svg" width="48"> |
| `webassembly` | <img src="./icons/WebAssembly.svg" width="48"> | | `webflow` | <img src="./icons/Webflow.svg" width="48"> | | `webpack` | <img src="./icons/Webpack-Dark.svg" width="48"> |
| `webstorm` | <img src="./icons/WebStorm-Dark.svg" width="48"> | | `windicss` | <img src="./icons/WindiCSS-Dark.svg" width="48"> | | `windows` | <img src="./icons/Windows-Dark.svg" width="48"> |
| `word` | <img src="./icons/Word-Dark.svg" width="48"> | | `wordpress` | <img src="./icons/Wordpress.svg" width="48"> | | `workers` | <img src="./icons/Workers-Dark.svg" width="48"> |
| `xamarin` | <img src="./icons/Xamarin-Dark.svg" width="48"> | | `xcode` | <img src="./icons/Xcode-Dark.svg" width="48"> | | `xml` | <img src="./icons/XML-Dark.svg" width="48"> |
| `yarn` | <img src="./icons/Yarn-Dark.svg" width="48"> | | `yew` | <img src="./icons/Yew-Dark.svg" width="48"> | | `zabbix` | <img src="./icons/Zabbix.svg" width="48"> |
| `zig` | <img src="./icons/Zig-Dark.svg" width="48"> | | |  | | |  |

## ⚙️ Technologies

- Cloudflare Workers for hosting the icon API.
- JSON → GZIP + GCM/AES CBC 256 + Base64 encoding for efficient and secure icon data transmission.
- TypeScript for type-safe development.
- Node.js for fallback server-side JavaScript execution.
- ESLint and Prettier for code quality and formatting.
- Vitest for testing

## 🤝 Contributing

We welcome contributions! See [CONTRIBUTING.md](.github/CONTRIBUTING.md) for details.

View the [changelog](CHANGELOG.md) for recent changes and [contributors](.github/contributors.md) who made this project possible.

## 💖 Support the Project

Thank you so much already for using my projects! If you want to go a step further and support my open source work, buy me a coffee:

<a href='https://buymeacoffee.com/thuongtruong' target='_blank'><img style='border:0px;height:26px;' src='https://cdn.ko-fi.com/cdn/kofi1.png?v=3' border='0' alt='Buy Me a Coffee' /></a>
<a href="https://github.com/sponsors/thuongtruong" target='_blank'><img src="https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86" style='border:0px;height:26px;'></a>

To support the project directly, feel free to open issues for icon suggestions, or contribute with a pull request!

## 📜 License

This project is licensed under the [MIT LICENSE](LICENSE). Copyright (c) Thuong Truong 2025.