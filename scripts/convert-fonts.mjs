// TTF -> WOFF2 для шрифтів, що реально використовуються (див. sass/base/_common.scss).
import ttf2woff2 from 'ttf2woff2';
import fs from 'node:fs';

const SRC = process.env.ORIGINALS || '../marketing-originals/fonts';
for (const name of ['RG-SpaciousBook', 'RG-StandardMedium']) {
  const out = ttf2woff2(fs.readFileSync(`${SRC}/${name}.ttf`));
  fs.mkdirSync('fonts', { recursive: true });
  fs.writeFileSync(`fonts/${name}.woff2`, out);
  console.log(name, Math.round(out.length / 1024), 'KB');
}
