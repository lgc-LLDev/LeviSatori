import { Loader as BaseLoader } from "@levi-cordisjs/loader";
import { Dict, trimSlash } from "cosmokit";
import { Context } from "levi-cordis";
import * as Logger from "./logger";

export namespace Loader {
  export interface Options extends BaseLoader.Options {
    requireBase?: string;
    importMapping?: Dict;
  }
}

export class Loader<
  T extends Loader.Options = Loader.Options
> extends BaseLoader<T> {
  public override async import(name: string) {
    if (this.options.importMapping && name in this.options.importMapping) {
      name = this.options.importMapping[name];
    }
    const base = trimSlash(
      this.options.requireBase ?? this.options.baseDir ?? ""
    );
    try {
      // @ts-expect-error - require in baseLib
      // eslint-disable-next-line import/no-dynamic-require
      return require(`${base}/${name}`);
    } catch (err: any) {
      this.app.emit("internal/error", err);
    }
    return undefined;
  }

  public override async reload() {
    const config = await this.readConfig();
    this.entryFork.update(config);
    this.app.emit("config");
  }
}

export interface Options extends Loader.Options {
  logger?: Logger.Config;
}

export async function start(options: Options) {
  const ctx = new Context();
  ctx.plugin(Loader, options);
  await ctx.loader.init();
  if (options.logger) ctx.plugin(Logger, options.logger);
  await ctx.start();
}
