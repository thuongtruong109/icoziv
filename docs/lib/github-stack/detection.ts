const TECHNOLOGIES: Record<string, string> = {
  react: 'React',
  reactjs: 'React',
  nextjs: 'Next.js',
  vue: 'Vue',
  vuejs: 'Vue',
  nuxt: 'Nuxt',
  nuxtjs: 'Nuxt',
  angular: 'Angular',
  angularjs: 'AngularJS',
  svelte: 'Svelte',
  sveltekit: 'Svelte',
  astro: 'Astro',
  solidjs: 'SolidJS',
  express: 'Express',
  expressjs: 'Express',
  nestjs: 'NestJS',
  fastify: 'Fastify',
  reactnative: 'React Native',
  electron: 'Electron',
  tailwindcss: 'Tailwind CSS',
  bootstrap: 'Bootstrap',
  django: 'Django',
  flask: 'Flask',
  fastapi: 'FastAPI',
  pytorch: 'PyTorch',
  tensorflow: 'TensorFlow',
  laravel: 'Laravel',
  symfony: 'Symfony',
  rails: 'Rails',
  rubyonrails: 'Rails',
  flutter: 'Flutter',
  spring: 'Spring',
  springboot: 'Spring Boot',
  dotnet: '.NET',
  aspnetcore: '.NET',
};

const PACKAGES: Record<string, string> = {
  react: 'React',
  next: 'Next.js',
  vue: 'Vue',
  nuxt: 'Nuxt',
  '@angular/core': 'Angular',
  angular: 'AngularJS',
  svelte: 'Svelte',
  '@sveltejs/kit': 'Svelte',
  astro: 'Astro',
  'solid-js': 'SolidJS',
  express: 'Express',
  '@nestjs/core': 'NestJS',
  fastify: 'Fastify',
  'react-native': 'React Native',
  electron: 'Electron',
  tailwindcss: 'Tailwind CSS',
  bootstrap: 'Bootstrap',
  'laravel/framework': 'Laravel',
  'symfony/framework-bundle': 'Symfony',
  django: 'Django',
  flask: 'Flask',
  fastapi: 'FastAPI',
  torch: 'PyTorch',
  tensorflow: 'TensorFlow',
  rails: 'Rails',
  flutter: 'Flutter',
};

export function normalizeTechnology(name: string): string {
  return name
    .toLowerCase()
    .replace(/\+\+/g, 'plusplus')
    .replace(/#/g, 'sharp')
    .replace(/[^a-z0-9]/g, '');
}

export function detectTopic(topic: string): string | undefined {
  return TECHNOLOGIES[normalizeTechnology(topic)];
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function isManifest(name: string): boolean {
  return (
    [
      'package.json',
      'composer.json',
      'requirements.txt',
      'pyproject.toml',
      'Gemfile',
      'pubspec.yaml',
      'pom.xml',
      'build.gradle',
      'build.gradle.kts',
    ].includes(name) || name.endsWith('.csproj')
  );
}

export function detectManifest(name: string, text: string): string[] {
  if (name !== 'package.json' && name !== 'composer.json') {
    text = text
      .replace(/<!--[\s\S]*?-->/g, '')
      .replace(/^\s*(?:#|\/\/).*$/gm, '')
      .replace(/\/\*[\s\S]*?\*\//g, '');
  }
  const packages = new Set<string>();
  const frameworks = new Set<string>();

  if (name === 'package.json' || name === 'composer.json') {
    const value: unknown = JSON.parse(text);
    if (!isRecord(value)) return [];
    for (const field of [
      'dependencies',
      'devDependencies',
      'peerDependencies',
      'optionalDependencies',
      'require',
      'require-dev',
    ]) {
      const dependencies = value[field];
      if (!isRecord(dependencies)) continue;
      for (const [dependency, version] of Object.entries(dependencies)) {
        if (typeof version === 'string') packages.add(dependency);
      }
    }
  } else if (name === 'requirements.txt') {
    for (const line of text.split('\n')) {
      const match =
        /^\s*([a-zA-Z0-9_.-]+)(?:\[[^\]]+\])?(?=\s|[<>=!~;@]|$)/.exec(line);
      if (match) packages.add(match[1].toLowerCase());
    }
  } else if (name === 'pyproject.toml') {
    for (const match of text.matchAll(/\bdependencies\s*=\s*\[([\s\S]*?)\]/g)) {
      for (const dependency of match[1].matchAll(
        /['"]([\w.-]+)(?:\[[^\]]+\])?(?:[^'"]*)['"]/g,
      )) {
        packages.add(dependency[1].toLowerCase());
      }
    }
    let inDependencies = false;
    for (const line of text.split('\n')) {
      if (line.trim().startsWith('[')) {
        inDependencies =
          /^\[tool\.poetry(?:\.group\.[\w-]+)?\.dependencies\]/.test(
            line.trim(),
          );
      } else if (inDependencies) {
        const dependency = /^\s*([\w.-]+)\s*=/.exec(line);
        if (dependency) packages.add(dependency[1].toLowerCase());
      }
    }
  } else if (name === 'Gemfile') {
    for (const match of text.matchAll(/^\s*gem\s+['"]([^'"]+)['"]/gm)) {
      packages.add(match[1]);
    }
  } else if (name === 'pubspec.yaml') {
    let inDependencies = false;
    for (const line of text.split('\n')) {
      if (/^\S/.test(line)) {
        inDependencies = /^(?:dev_)?dependencies:\s*(?:#.*)?$/.test(line);
      } else if (inDependencies) {
        const dependency = /^ {2}([\w-]+):/.exec(line);
        if (dependency) packages.add(dependency[1]);
      }
    }
  } else if (name === 'pom.xml' || name.startsWith('build.gradle')) {
    if (
      /(?:<artifactId>\s*spring-boot[\w-]*\s*<\/artifactId>|['"]org\.springframework\.boot[:'"\s])/.test(
        text,
      )
    ) {
      frameworks.add('Spring Boot');
    } else if (
      /(?:<artifactId>\s*spring-(?:webmvc|webflux|context)\s*<\/artifactId>|['"]org\.springframework:)/.test(
        text,
      )
    ) {
      frameworks.add('Spring');
    }
  } else if (name.endsWith('.csproj')) {
    if (/\bSdk\s*=\s*['"]Microsoft\.NET\.Sdk\.Web['"]/.test(text)) {
      frameworks.add('.NET');
    }
  }

  for (const dependency of packages) {
    const framework = PACKAGES[dependency];
    if (framework) frameworks.add(framework);
  }
  return [...frameworks];
}
