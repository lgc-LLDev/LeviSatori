import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import { defineConfig } from "rollup";
import { dts } from "rollup-plugin-dts";

export default defineConfig([
  {
    input: "./src/index.ts",
    output: [
      {
        name: "LeviSatori",
        file: "./dist/LeviSatori.js",
        format: "umd",
      },
    ],
    plugins: [json(), nodeResolve(), commonjs(), typescript()],
  },
  {
    input: "./src/index.ts",
    output: [{ file: "./dist/index.d.ts", format: "es" }],
    plugins: [json(), nodeResolve(), commonjs(), dts()],
  },
]);
