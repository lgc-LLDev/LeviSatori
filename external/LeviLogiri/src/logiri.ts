// https://github.com/ilharp/logiri

import styles from "ansi-styles";

const OSC = "\u001B]";
const BEL = "\u0007";
const SEP = ";";

const link = (text: string, url: string | undefined) =>
  url
    ? [OSC, "8", SEP, SEP, url, BEL, text, OSC, "8", SEP, SEP, BEL].join("")
    : text;

export class LogiriMessager {
  private children: string[] = [];

  private results: string[] = [];

  // eslint-disable-next-line class-methods-use-this
  prepare = async () => {};

  render = async (elements: LeviSatori.h.Element[], flush?: boolean) => {
    // eslint-disable-next-line no-await-in-loop
    for (const element of elements) await this.visit(element);
    if (flush) await this.flush();
  };

  send = async (elements: LeviSatori.h.Element[]) => {
    if (!elements.length) return [];
    await this.prepare();
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
        this.children.push(link("[图片]", attrs.src as string));
        return;
      }

      case "audio": {
        this.children.push(link("[语音]", attrs.src as string));
        return;
      }

      case "file": {
        this.children.push(link("[文件]", attrs.src as string));
        return;
      }

      case "at": {
        if (attrs.type === "all") this.children.push("@全体成员 ");
        else
          this.children.push(
            `@${attrs.name as string}(${attrs.id as string}) `
          );
        return;
      }

      case "quote": {
        const author = children.find((x) => x.type === "author");
        const id = author?.attrs["user-id"] as string | undefined;

        this.children.push(
          `${styles.grey.open}${id ? `[回复${id}] ` : `[回复] `}${
            styles.grey.close
          }`
        );
        return;
      }

      case "message": {
        // 前面的消息直接发送，开始一条新消息
        await this.flush();

        if ("forward" in attrs) {
          if ("id" in attrs) {
            this.children.push("[单条转发消息]");
          } else if (children.every((x) => "id" in x)) {
            this.children.push("[普通合并转发消息]");
          } else {
            this.children.push("[伪造合并转发消息]");
          }
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

export async function formatMessageCreated(sess: LeviSatori.Session) {
  const d = sess.event;
  const messages = await new LogiriMessager().send(sess.elements);
  return messages.map(
    (x) =>
      `${styles.blue.open}${link(
        d.channel?.id === d.guild?.id
          ? `${d.channel?.name ?? d.guild?.name}(${d.channel?.id})`
          : `${d.guild?.name}(${d.guild?.id})/${d.channel?.name}(${d.channel?.id})`,
        d.guild?.avatar
      )}${styles.blue.close}` +
      `${styles.grey.open}-${styles.grey.close}` +
      `${styles.cyan.open}${link(
        `${d.user?.name || d.member?.name}(${d.user?.id})`,
        d.user?.avatar
      )}${styles.cyan.close}` +
      `${styles.grey.open}:${styles.grey.close} ${x}`
  );
}
