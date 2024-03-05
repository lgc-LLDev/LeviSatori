const fs = require("fs");
fs.copyFileSync("src/bundle.d.ts", "dist/LeviSatori.d.ts");
fs.appendFileSync("dist/LeviSatori.js", ";globalThis.LeviSatori = LeviSatori;");
