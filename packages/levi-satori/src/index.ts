/// <reference path="../../../HelperLib/src/index.d.ts"/>

import './polyfill';

import Logger from 'levi-reggol';
import Satori from '@levi-satorijs/adapter-satori';

import { start } from './loader';

export * from '@levi-satorijs/satori';
export * from '@levi-satorijs/adapter-satori';
export * from 'cosmokit';
export { Logger };

const name = 'LeviSatori';
const baseDir = `./plugins/${name}`;
const pluginBaseDir = `./plugins/${name}/plugins`;
const requireBase = `./${name}/plugins`;
const configPath = `${baseDir}/${name}.yml`;

mc.listen('onServerStarted', () => {
  if (!file.exists(configPath)) {
    file.writeTo(configPath, 'plugins: []');
  }
  if (!file.exists(pluginBaseDir)) {
    file.mkdir(pluginBaseDir);
  }
  start({
    name,
    baseDir,
    requireBase,
    importMapping: { 'adapter-satori': Satori },
  }).catch((e) => new Logger('app').info(e));
});
