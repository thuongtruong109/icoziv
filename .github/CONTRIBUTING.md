# 🤝 Contributing

We welcome contributions! Here's how you can help improve Icoziv:

## Adding New Icons

1. **Find or Create SVG**: Source high-quality SVG icons (preferably from official sources)
2. **Optimize**: Ensure SVGs are optimized and clean
3. **Naming Convention**:
   - Use PascalCase for the filename (e.g., `React-Dark.svg`)
   - Add `-Dark` or `-Light` suffix for themed variants
   - Keep names consistent with existing icons
4. **Place in Directory**: Add to the `icons/` folder
5. **Test**: Run `bun run build` and verify the icon appears
6. **Update README**: Run `bun run list` to regenerate the icons table

## Development Workflow

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-icon`
3. Make your changes
4. Run tests: `bun run check`
5. Commit your changes: `git commit -m "Add new icon"`
6. Push to your fork: `git push origin feature/new-icon`
7. Open a Pull Request

## Guidelines

- Ensure icons are recognizable and professional
- Prefer official brand colors and styles
- Test icons in both dark and light themes
- Keep file sizes small (under 5KB per icon)
- Follow existing naming conventions
- Update documentation as needed

## Issues and Feature Requests

- Use GitHub Issues to report bugs or request features
- Provide clear descriptions and examples
- Include screenshots for UI-related issues

## 🗺️ Roadmap

### Planned Features

- [ ] **Icon Packs**: Curated collections (Frontend, Backend, DevOps, etc.)
- [ ] **Custom Colors**: Allow custom color schemes beyond dark/light
- [ ] **Animation Support**: Optional hover animations and transitions
- [ ] **Icon Search API**: Search functionality for finding icons
- [ ] **Bulk Generation**: Generate multiple badges at once
- [ ] **Icon Statistics**: Usage analytics and popular icon tracking
- [ ] **Community Submissions**: User-submitted icon approval workflow

### Technical Improvements

- [ ] **Performance Optimization**: Further reduce response times
- [ ] **Caching Strategy**: Implement intelligent caching layers
- [ ] **Rate Limiting**: Add proper rate limiting for fair usage
- [ ] **Monitoring**: Add logging and error tracking
- [ ] **CDN Optimization**: Optimize SVG delivery globally

Thank you for your interest in contributing! This guide covers setup, development, testing, building, and publishing.

## 🛠️ Setup

### Prerequisites

- [Bun](https://bun.sh/) (recommended) or Node.js
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/)

1. **Clone the repository:**

   ```bash
   git clone https://github.com/thuongtruong109/icoziv.git
   cd icoziv
   ```

2. **Install dependencies:**

   ```bash
   bun install
   # or
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

## 🚀 Run

- **Start development server (watch mode):**
  ```bash
  bun run dev
  ```

## 🧪 Test

- **Run all tests:**

  ```bash
  bun run test
  ```

- **Interactive test UI:**

  ```bash
  bun run test:ui
  ```

## 🏗️ Build

```bash
bun run build
```

## 🧹 Lint & Format

- **Lint code:**

  ```bash
  bun run lint
  ```

- **Auto-fix lint issues:**

  ```bash
  bun run lint:fix
  ```

- **Format checks:**

  ```bash
  bun run format
  ```

- **Auto-fix Format issues:**
  ```bash
  bun run format:fix
  ```

## 📦 Publish

1. **Update version:**

   ```bash
   npm version patch|minor|major
   ```

2. **Build the library:**

   ```bash
   bun run build
   ```

3. **Publish to npm:**
   ```bash
   npm publish
   ```

## ✅ Quality Checks

- **Run all checks:**

  ```bash
  bun run check
  ```

- **Auto-fix all issues:**
  ```bash
  bun run check:fix
  ```

## 💡 Tips

- Ensure all tests and checks pass before submitting a PR.
- Follow code style enforced by Biome and ESLint.

## 🤝 Need Help?

Open an [issue](https://github.com/thuongtruong109/icoziv/issues/new/choose), or [discussions](https://github.com/thuongtruong109/icoziv/discussions/new/choose) on GitHub if you need assistance.
