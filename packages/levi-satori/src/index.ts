/// <reference path="../../../HelperLib/src/index.d.ts"/>

import "./polyfill";

import { start } from "levi-cordis";

export * from "@levi-satorijs/satori";

const name = "LeviSatori";
const baseDir = `./plugins/${name}`;
const configPath = `${baseDir}/${name}.yml`;

mc.listen("onServerStarted", () => {
  if (!file.exists(configPath)) {
    file.writeTo(configPath, "");
  }
  start({
    name,
    baseDir,
    logger: { levels: 2 },
  });
});
