import fs from "fs";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import { defineConfig } from "rollup";
import { getBabelOutputPlugin } from "@rollup/plugin-babel";

if (!fs.existsSync("dist")) fs.mkdirSync("dist");
fs.writeFileSync(
  "dist/LeviSatori.d.ts",
  `declare const LeviSatori: typeof import("./index");`
);

export default defineConfig([
  {
    input: "./src/index.ts",
    output: [{ file: "./dist/LeviSatori.js", format: "esm" }],
    plugins: [
      json(),
      nodeResolve({ browser: true }),
      commonjs(),
      typescript(),
      getBabelOutputPlugin({
        plugins: [
          "@babel/plugin-transform-class-static-block",
          "@babel/plugin-transform-class-properties",
          ["@babel/plugin-transform-modules-umd", { moduleId: "LeviSatori" }],
        ],
      }),
    ],
  },
  {
    input: "./src/index.ts",
    output: [{ file: "./dist/index.d.ts", format: "esm" }],
    plugins: [json(), nodeResolve({ browser: true }), dts()],
  },
]);
