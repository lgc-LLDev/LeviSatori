// https://github.com/ilharp/logiri

import styles from "ansi-styles";

const s = globalThis.LeviSatori;

const OSC = "\u001B]";
const BEL = "\u0007";
const SEP = ";";

const link = (text: string, url: string | undefined) =>
  url
    ? [OSC, "8", SEP, SEP, url, BEL, text, OSC, "8", SEP, SEP, BEL].join("")
    : text;

const mcHighlight = (text: string) => `§b${text}§r`;

const formatName = (
  name: string | undefined,
  id: string | undefined,
  unknown: string
) => {
  if (name) return `${name}(${id})`;
  if (id) return id;
  return unknown;
};

const platformCommonNameMap = {
  onebot: "OneBot",
};

function getPlatformCommonName(platform: string) {
  return (
    platformCommonNameMap[platform as keyof typeof platformCommonNameMap] ??
    [platform[0].toUpperCase(), platform.slice(1)].join("")
  );
}

export class LogiriMessager {
  private children: string[] = [];

  private results: string[] = [];

  constructor(public readonly mcFormat = false) {}

  // eslint-disable-next-line class-methods-use-this
  prepare = async () => {};

  render = async (elements: LeviSatori.h.Element[], flush?: boolean) => {
    // eslint-disable-next-line no-await-in-loop
    for (const element of elements) await this.visit(element);
    if (flush) await this.flush();
  };

  send = async (content: string | null | undefined) => {
    if (!content) return [];
    await this.prepare();
    const elements = s.Element.normalize(content);
    await this.render(elements);
    await this.flush();
    return this.results.filter(Boolean);
  };

  flush = async () => {
    if (!this.children.length) return;
    this.results.push(
      this.children.join("").replace(/\r/g, "").replace(/\n/g, " ")
    );
    this.children = [];
  };

  visit = async (element: LeviSatori.h.Element) => {
    const { type, attrs, children } = element;

    switch (type) {
      case "text": {
        this.children.push(attrs.content as string);
        return;
      }

      case "img": {
        const x = "[图片]";
        this.children.push(
          this.mcFormat ? mcHighlight(x) : link(x, attrs.src as string)
        );
        return;
      }

      case "audio": {
        const x = "[语音]";
        this.children.push(
          this.mcFormat ? mcHighlight(x) : link(x, attrs.src as string)
        );
        return;
      }

      case "file": {
        const x = `[文件]`;
        this.children.push(
          this.mcFormat ? mcHighlight(x) : link(x, attrs.src as string)
        );
        return;
      }

      case "at": {
        const target =
          attrs.type === "all"
            ? "全体成员"
            : formatName(attrs.name as string, attrs.id as string, "未知用户");
        const x = `@${target} `;
        this.children.push(this.mcFormat ? mcHighlight(x) : x);
        return;
      }

      case "quote": {
        const author = children.find((x) => x.type === "author");
        const id = author?.attrs["user-id"] as string | undefined;
        const x = id ? `[回复${id}] ` : `[回复] `;
        this.children.push(
          this.mcFormat
            ? mcHighlight(x)
            : `${styles.grey.open}${x}${styles.grey.close}`
        );
        return;
      }

      case "message": {
        // 前面的消息直接发送，开始一条新消息
        await this.flush();

        if ("forward" in attrs) {
          const x = (() => {
            if ("id" in attrs) return "[单条转发消息]";
            if (children.every((y) => "id" in y)) return "[普通合并转发消息]";
            return "[伪造合并转发消息]";
          })();
          this.results.push(this.mcFormat ? mcHighlight(x) : x);
        } else {
          // 普通切割消息
          await this.render(children, true);
        }
        return;
      }

      default: {
        // 兜底
        await this.render(children);
      }
    }
  };
}

export async function formatMessageCreated(
  ss: LeviSatori.Session,
  mcFormat = false
) {
  const d = ss.event;
  const messages = await new LogiriMessager(mcFormat).send(d.message?.content);

  const bOpen = mcFormat ? "§9" : styles.blue.open;
  const bClose = mcFormat ? "§r" : styles.blue.close;
  const gOpen = mcFormat ? "§7" : styles.grey.open;
  const gClose = mcFormat ? "§r" : styles.grey.close;
  const cOpen = mcFormat ? "§3" : styles.cyan.open;
  const cClose = mcFormat ? "§r" : styles.cyan.close;

  // 是否存在频道样式的二级分组
  const hasGuild =
    !ss.isDirect &&
    d.guild?.id &&
    d.channel?.id &&
    d.guild?.id !== d.channel?.id;

  const platformName = getPlatformCommonName(ss.platform);
  const fromOri = (() => {
    if (ss.isDirect) return "";
    if (hasGuild)
      return (
        `${formatName(d.guild?.name, d.guild?.id, "未知群组")}/` +
        `${formatName(d.channel?.name, d.channel?.id, "未知频道")}`
      );
    return formatName(
      d.guild?.name ?? d.channel?.name,
      d.guild?.id ?? d.channel?.id,
      "未知群聊"
    );
  })();
  const platform = fromOri ? `${platformName} ${fromOri}` : platformName;
  const group = mcFormat ? platform : link(platform, d.guild?.avatar);
  const userOri = formatName(
    d.user?.name ?? d.member?.name,
    d.user?.id,
    "未知用户"
  );
  const user = mcFormat ? userOri : link(userOri, d.user?.avatar);
  const chat =
    `${group ? `${bOpen}${group}${bClose}${gOpen}-${gClose}` : ""}` +
    `${cOpen}${user}${cClose}`;
  const pfx = mcFormat
    ? // eslint-disable-next-line no-nested-ternary
      `§e[${ss.isDirect ? "私聊" : hasGuild ? "频道" : "群聊"}]§r `
    : "";
  return messages.map((x) => `${pfx}${chat}${gOpen}:${gClose} ${x}`);
}
