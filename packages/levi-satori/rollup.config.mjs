import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import { defineConfig } from "rollup";
import { dts } from "rollup-plugin-dts";
import { getBabelOutputPlugin } from "@rollup/plugin-babel";

export default defineConfig([
  {
    input: "./src/index.ts",
    output: [
      {
        name: "LeviSatori",
        file: "./dist/LeviSatori.tmp.js",
        format: "esm",
      },
    ],
    plugins: [
      json(),
      nodeResolve({ browser: true }),
      commonjs(),
      typescript(),
      getBabelOutputPlugin({
        plugins: [
          "@babel/plugin-transform-class-static-block",
          "@babel/plugin-transform-class-properties",
        ],
      }),
    ],
  },
  {
    input: "./dist/LeviSatori.tmp.js",
    output: [
      {
        name: "LeviSatori",
        file: "./dist/LeviSatori.js",
        format: "umd",
      },
    ],
    plugins: [nodeResolve()],
  },
  {
    input: "./src/index.ts",
    output: [{ file: "./dist/index.d.ts", format: "es" }],
    plugins: [json(), nodeResolve(), commonjs(), dts()],
  },
]);
