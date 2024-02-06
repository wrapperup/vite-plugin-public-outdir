import type { Plugin } from "vite";

/**
 * A Vite plugin that allows you to specify where the public assets are built to,
 * relative to the output directory.
 *
 * @param The directory where the public assets are built to, relative to the output directory.
 */
export default function publicOutDirPlugin(publicOutDir: string): Plugin;

