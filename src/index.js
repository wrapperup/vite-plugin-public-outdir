function copyDir(srcDir, destDir) {
  fs.mkdirSync(destDir, { recursive: true })
  for (const file of fs.readdirSync(srcDir)) {
    const srcFile = resolve(srcDir, file)
    if (srcFile === destDir) {
      continue
    }
    const destFile = resolve(destDir, file)
    const stat = fs.statSync(srcFile)
    if (stat.isDirectory()) {
      copyDir(srcFile, destFile)
    } else {
      fs.copyFileSync(srcFile, destFile)
    }
  }
}

function publicOutDirPlugin(publicOutDir) {
  let viteConfig;
  let publicDir;

  return {
    name: "vite-plugin-public-outdir",
    apply: "build",

    config(config) {
      // Vite serves the files correctly in development, 
      // so we only need to rewrite the out path in builds.
      publicDir = config.publicDir === undefined ? "public" : config.publicDir;
      config.publicDir = false;
    },

    configResolved(config) {
      viteConfig = config;
    },

    async generateBundle() {
      if (
        viteConfig.build.copyPublicDir &&
        publicDir &&
        fs.existsSync(publicDir)
      ) {
        const src = resolve(`${__dirname}/${publicDir}`);
        const dest = resolve(`${viteConfig.build.outDir}/${publicOutDir}`);

        copyDir(src, dest);
      }
    }
  };
}

export default publicOutDirPlugin;
