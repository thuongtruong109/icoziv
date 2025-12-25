declare module '*.bin' {
  const content: string;
  export default content;
}

declare module '../dist/icons.bin' {
  const content: string;
  export default content;
}

interface Env {
  ICONS_KV: KVNamespace;
}
