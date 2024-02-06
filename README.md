# vite-plugin-public-outdir
Change where public files are copied to in a build.

[![NPM Version](https://img.shields.io/npm/v/vite-plugin-public-outdir)](https://www.npmjs.com/package/vite-plugin-public-outdir)
[![NPM License](https://img.shields.io/npm/l/vite-plugin-public-outdir)](./LICENSE)

## Installation ##

```sh
npm i vite-plugin-public-outdir --save-dev
```

## Usage
```js
// vite.config.js
import publicOutDir from 'vite-plugin-public-outdir';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    publicOutDir("public"), // copies public files to "dist/public" instead of "dist"
  ]
});
```

Instead of your public files being copied directly into `outDir`, they are now copied to `outDir/publicOutDir`
in a build.

## Example with bundled assets and public files
```js
export default defineConfig({
  build: {
    assetsDir: "public/assets",
  },
  plugins: [
    bundleScripts({
      publicOutDir: "public",
    })]
});
```

Would create this directory tree:

```
dist/
├── index.js
└── public/
    ├── favicon.ico
    ├── robots.txt
    └── assets/
        └── image-Jx1-xSXfF.webp
```
