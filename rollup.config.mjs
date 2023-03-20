import typescript from "rollup-plugin-typescript2";
import {uglify} from 'rollup-plugin-uglify';

// https://stackoverflow.com/a/74097336/7748446

/** @type {import('rollup').RollupOptions} */
const config = {
  input: "./src/index.ts",
  output: {
    file: "./build/index.js",
    format: "cjs",
    exports: "named"
  },
  plugins: [typescript(), uglify()],
  external: ['next', 'http-proxy'],
};

export default config;
