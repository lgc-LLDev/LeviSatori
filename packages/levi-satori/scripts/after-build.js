const fs = require("fs");

fs.appendFileSync("dist/LeviSatori.js", ";globalThis.LeviSatori = LeviSatori;");
fs.renameSync("lib/index.d.ts", "dist/LeviSatori.d.ts");
fs.rmSync("lib", { recursive: true });
fs.appendFileSync("dist/LeviSatori.d.ts", ";export as namespace LeviSatori;");
