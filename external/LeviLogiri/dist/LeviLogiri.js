"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

// src/index.ts
var src_exports = {};
__export(src_exports, {
  Config: () => Config,
  apply: () => apply
});
module.exports = __toCommonJS(src_exports);

// ../../node_modules/ansi-styles/index.js
var ANSI_BACKGROUND_OFFSET = 10;
var wrapAnsi16 = (offset = 0) => (code) => `\x1B[${code + offset}m`;
var wrapAnsi256 = (offset = 0) => (code) => `\x1B[${38 + offset};5;${code}m`;
var wrapAnsi16m = (offset = 0) => (red, green, blue) => `\x1B[${38 + offset};2;${red};${green};${blue}m`;
var styles = {
  modifier: {
    reset: [0, 0],
    // 21 isn't widely supported and 22 does the same thing
    bold: [1, 22],
    dim: [2, 22],
    italic: [3, 23],
    underline: [4, 24],
    overline: [53, 55],
    inverse: [7, 27],
    hidden: [8, 28],
    strikethrough: [9, 29]
  },
  color: {
    black: [30, 39],
    red: [31, 39],
    green: [32, 39],
    yellow: [33, 39],
    blue: [34, 39],
    magenta: [35, 39],
    cyan: [36, 39],
    white: [37, 39],
    // Bright color
    blackBright: [90, 39],
    gray: [90, 39],
    // Alias of `blackBright`
    grey: [90, 39],
    // Alias of `blackBright`
    redBright: [91, 39],
    greenBright: [92, 39],
    yellowBright: [93, 39],
    blueBright: [94, 39],
    magentaBright: [95, 39],
    cyanBright: [96, 39],
    whiteBright: [97, 39]
  },
  bgColor: {
    bgBlack: [40, 49],
    bgRed: [41, 49],
    bgGreen: [42, 49],
    bgYellow: [43, 49],
    bgBlue: [44, 49],
    bgMagenta: [45, 49],
    bgCyan: [46, 49],
    bgWhite: [47, 49],
    // Bright color
    bgBlackBright: [100, 49],
    bgGray: [100, 49],
    // Alias of `bgBlackBright`
    bgGrey: [100, 49],
    // Alias of `bgBlackBright`
    bgRedBright: [101, 49],
    bgGreenBright: [102, 49],
    bgYellowBright: [103, 49],
    bgBlueBright: [104, 49],
    bgMagentaBright: [105, 49],
    bgCyanBright: [106, 49],
    bgWhiteBright: [107, 49]
  }
};
var modifierNames = Object.keys(styles.modifier);
var foregroundColorNames = Object.keys(styles.color);
var backgroundColorNames = Object.keys(styles.bgColor);
var colorNames = [...foregroundColorNames, ...backgroundColorNames];
function assembleStyles() {
  const codes = /* @__PURE__ */ new Map();
  for (const [groupName, group] of Object.entries(styles)) {
    for (const [styleName, style] of Object.entries(group)) {
      styles[styleName] = {
        open: `\x1B[${style[0]}m`,
        close: `\x1B[${style[1]}m`
      };
      group[styleName] = styles[styleName];
      codes.set(style[0], style[1]);
    }
    Object.defineProperty(styles, groupName, {
      value: group,
      enumerable: false
    });
  }
  Object.defineProperty(styles, "codes", {
    value: codes,
    enumerable: false
  });
  styles.color.close = "\x1B[39m";
  styles.bgColor.close = "\x1B[49m";
  styles.color.ansi = wrapAnsi16();
  styles.color.ansi256 = wrapAnsi256();
  styles.color.ansi16m = wrapAnsi16m();
  styles.bgColor.ansi = wrapAnsi16(ANSI_BACKGROUND_OFFSET);
  styles.bgColor.ansi256 = wrapAnsi256(ANSI_BACKGROUND_OFFSET);
  styles.bgColor.ansi16m = wrapAnsi16m(ANSI_BACKGROUND_OFFSET);
  Object.defineProperties(styles, {
    rgbToAnsi256: {
      value: (red, green, blue) => {
        if (red === green && green === blue) {
          if (red < 8) {
            return 16;
          }
          if (red > 248) {
            return 231;
          }
          return Math.round((red - 8) / 247 * 24) + 232;
        }
        return 16 + 36 * Math.round(red / 255 * 5) + 6 * Math.round(green / 255 * 5) + Math.round(blue / 255 * 5);
      },
      enumerable: false
    },
    hexToRgb: {
      value: (hex) => {
        const matches = /[a-f\d]{6}|[a-f\d]{3}/i.exec(hex.toString(16));
        if (!matches) {
          return [0, 0, 0];
        }
        let [colorString] = matches;
        if (colorString.length === 3) {
          colorString = [...colorString].map((character) => character + character).join("");
        }
        const integer = Number.parseInt(colorString, 16);
        return [
          /* eslint-disable no-bitwise */
          integer >> 16 & 255,
          integer >> 8 & 255,
          integer & 255
          /* eslint-enable no-bitwise */
        ];
      },
      enumerable: false
    },
    hexToAnsi256: {
      value: (hex) => styles.rgbToAnsi256(...styles.hexToRgb(hex)),
      enumerable: false
    },
    ansi256ToAnsi: {
      value: (code) => {
        if (code < 8) {
          return 30 + code;
        }
        if (code < 16) {
          return 90 + (code - 8);
        }
        let red;
        let green;
        let blue;
        if (code >= 232) {
          red = ((code - 232) * 10 + 8) / 255;
          green = red;
          blue = red;
        } else {
          code -= 16;
          const remainder = code % 36;
          red = Math.floor(code / 36) / 5;
          green = Math.floor(remainder / 6) / 5;
          blue = remainder % 6 / 5;
        }
        const value = Math.max(red, green, blue) * 2;
        if (value === 0) {
          return 30;
        }
        let result = 30 + (Math.round(blue) << 2 | Math.round(green) << 1 | Math.round(red));
        if (value === 2) {
          result += 60;
        }
        return result;
      },
      enumerable: false
    },
    rgbToAnsi: {
      value: (red, green, blue) => styles.ansi256ToAnsi(styles.rgbToAnsi256(red, green, blue)),
      enumerable: false
    },
    hexToAnsi: {
      value: (hex) => styles.ansi256ToAnsi(styles.hexToAnsi256(hex)),
      enumerable: false
    }
  });
  return styles;
}
var ansiStyles = assembleStyles();
var ansi_styles_default = ansiStyles;

// src/logiri.ts
var OSC = "\x1B]";
var BEL = "\x07";
var SEP = ";";
var link = (text, url) => url ? [OSC, "8", SEP, SEP, url, BEL, text, OSC, "8", SEP, SEP, BEL].join("") : text;
var LogiriMessager = class {
  constructor() {
    __publicField(this, "children", []);
    __publicField(this, "results", []);
    // eslint-disable-next-line class-methods-use-this
    __publicField(this, "prepare", async () => {
    });
    __publicField(this, "render", async (elements, flush) => {
      for (const element of elements)
        await this.visit(element);
      if (flush)
        await this.flush();
    });
    __publicField(this, "send", async (elements) => {
      if (!elements.length)
        return [];
      await this.prepare();
      await this.render(elements);
      await this.flush();
      return this.results.filter(Boolean);
    });
    __publicField(this, "flush", async () => {
      if (!this.children.length)
        return;
      this.results.push(
        this.children.join("").replace(/\r/g, "").replace(/\n/g, " ")
      );
      this.children = [];
    });
    __publicField(this, "visit", async (element) => {
      const { type, attrs, children } = element;
      switch (type) {
        case "text": {
          this.children.push(attrs.content);
          return;
        }
        case "img": {
          this.children.push(link("[\u56FE\u7247]", attrs.src));
          return;
        }
        case "audio": {
          this.children.push(link("[\u8BED\u97F3]", attrs.src));
          return;
        }
        case "file": {
          this.children.push(link("[\u6587\u4EF6]", attrs.src));
          return;
        }
        case "at": {
          if (attrs.type === "all")
            this.children.push("@\u5168\u4F53\u6210\u5458 ");
          else
            this.children.push(
              `@${attrs.name}(${attrs.id}) `
            );
          return;
        }
        case "quote": {
          const author = children.find((x) => x.type === "author");
          const id = author?.attrs["user-id"];
          this.children.push(
            `${ansi_styles_default.grey.open}${id ? `[\u56DE\u590D${id}] ` : `[\u56DE\u590D] `}${ansi_styles_default.grey.close}`
          );
          return;
        }
        case "message": {
          await this.flush();
          if ("forward" in attrs) {
            if ("id" in attrs) {
              this.children.push("[\u5355\u6761\u8F6C\u53D1\u6D88\u606F]");
            } else if (children.every((x) => "id" in x)) {
              this.children.push("[\u666E\u901A\u5408\u5E76\u8F6C\u53D1\u6D88\u606F]");
            } else {
              this.children.push("[\u4F2A\u9020\u5408\u5E76\u8F6C\u53D1\u6D88\u606F]");
            }
          } else {
            await this.render(children, true);
          }
          return;
        }
        default: {
          await this.render(children);
        }
      }
    });
  }
};
async function formatMessageCreated(sess) {
  const d = sess.event;
  const messages = await new LogiriMessager().send(sess.elements);
  return messages.map(
    (x) => `${ansi_styles_default.blue.open}${link(
      d.channel?.id === d.guild?.id ? `${d.channel?.name ?? d.guild?.name}(${d.channel?.id})` : `${d.guild?.name}(${d.guild?.id})/${d.channel?.name}(${d.channel?.id})`,
      d.guild?.avatar
    )}${ansi_styles_default.blue.close}${ansi_styles_default.grey.open}-${ansi_styles_default.grey.close}${ansi_styles_default.cyan.open}${link(
      `${d.user?.name || d.member?.name}(${d.user?.id})`,
      d.user?.avatar
    )}${ansi_styles_default.cyan.close}${ansi_styles_default.grey.open}:${ansi_styles_default.grey.close} ${x}`
  );
}

// src/index.ts
var s = globalThis.LeviSatori;
var Config = s.Schema.object({});
function apply(ctx) {
  const logger = ctx.logger("logiri");
  ctx.on("message-created", (session) => {
    formatMessageCreated(session).then((arr) => arr.forEach((x) => logger.info(x))).catch((e) => logger.error(e));
  });
}
