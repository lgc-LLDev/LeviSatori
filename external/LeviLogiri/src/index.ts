/// <reference types="levi-satori" />

import { formatMessageCreated } from "./logiri";

const s = globalThis.LeviSatori;

export interface ChatInfo {
  platform?: string;
  id: string;
}

export interface Config {
  enableInConsole: boolean;
  enableInGame: boolean;
  gameEnabledChannels: ChatInfo[];
  gameEnabledGuilds: ChatInfo[];
}

export function toChatInfo(str: string): ChatInfo {
  if (!str.includes(":")) return { platform: undefined, id: str };
  const [platform, ...id] = str.split(":");
  return { platform: platform ?? undefined, id: id.join(":") };
}

export const chatInfoSchema = s.Schema.object({
  platform: s.Schema.string(),
  id: s.Schema.string(),
});

export const chatInfoListSchema = s.Schema.union([
  s.Schema.array(chatInfoSchema),
  s.Schema.transform(s.Schema.array(s.Schema.string()), (arr) =>
    arr.map(toChatInfo)
  ),
]);

export const Config: LeviSatori.Schema<Config> = s.Schema.object({
  enableInConsole: s.Schema.boolean().default(true),
  enableInGame: s.Schema.boolean().default(true),
  gameEnabledChannels: chatInfoListSchema.default([]),
  gameEnabledGuilds: chatInfoListSchema.default([]),
});

export function apply(ctx: LeviSatori.Context, config: Config) {
  const logger = ctx.logger("logiri");

  const checkToGame = (ss: LeviSatori.Session) => {
    const channelList = config.gameEnabledChannels;
    const guildList = config.gameEnabledGuilds;
    const rightChannel =
      !channelList.length ||
      channelList.some(
        (x) =>
          (!x.platform || x.platform === ss.platform) && x.id === ss.channelId
      );
    const rightGuild =
      !guildList.length ||
      guildList.some(
        (x) =>
          (!x.platform || x.platform === ss.platform) && x.id === ss.guildId
      );
    return rightChannel && rightGuild;
  };

  ctx.on("message-created", (session) => {
    if (config.enableInConsole) {
      formatMessageCreated(session)
        .then((arr) => arr.forEach((x) => logger.info(x)))
        .catch((e) => logger.error(e));
    }
    if (config.enableInGame && checkToGame(session)) {
      formatMessageCreated(session, true)
        .then((arr) => arr.forEach((x) => mc.broadcast(x)))
        .catch((e) => logger.error(e));
    }
  });
}
