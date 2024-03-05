/// <reference types="levi-satori" />

import { formatMessageCreated } from "./logiri";

const s = globalThis.LeviSatori;

export const Config = s.Schema.object({});

export function apply(ctx: LeviSatori.Context) {
  const logger = ctx.logger("logiri");
  ctx.on("message-created", (session) => {
    formatMessageCreated(session)
      .then((arr) => arr.forEach((x) => logger.info(x)))
      .catch((e) => logger.error(e));
  });
}
