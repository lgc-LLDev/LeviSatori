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
      return this.options.importMapping[name];
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
}

export interface Options extends Loader.Options {}

declare module "@levi-cordisjs/loader" {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  namespace Loader {
    interface Config {
      logger?: Logger.Config;
    }
  }
}

export async function start(options: Options) {
  const ctx = new Context();

  ctx.plugin(Loader, options);
  await ctx.loader.init();
  const config = await ctx.loader.readConfig();

  ctx.plugin(Logger, config.logger ?? {});

  await ctx.start();
}
