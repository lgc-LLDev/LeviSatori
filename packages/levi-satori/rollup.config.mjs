import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import { dts } from "rollup-plugin-dts";

export default [
  {
    input: "./src/index.ts",
    output: [
      {
        name: "LeviSatori",
        file: "./dist/LeviSatori.js",
        format: "iife",
      },
    ],
    plugins: [json(), nodeResolve(), commonjs(), typescript()],
  },
  {
    input: "./src/bundle.ts",
    output: [{ file: "./dist/index.d.ts", format: "es" }],
    plugins: [json(), nodeResolve(), commonjs(), dts()],
  },
];
