# Contributing to Flashot

Thank you for your interest in contributing! This guide covers setup, development, testing, building, and publishing.

## 🛠️ Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/thuongtruong109/flashot.git
   cd flashot
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
