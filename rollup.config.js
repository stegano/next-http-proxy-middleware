import typescript from "rollup-plugin-typescript2";
import { uglify } from "rollup-plugin-uglify";

export default {
  input: "./src/index.ts",
  output: {
    file: "./build/index.js",
    format: "cjs",
    exports: "named"
  },
  plugins: [typescript(), uglify()],
  external: ['next', 'http-proxy']
};
