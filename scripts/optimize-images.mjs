// Конвертує растрові зображення у WebP потрібного розміру.
// Оригінали беруться з images-src/ (не комітяться у збірку), результат — у images/.
import { readdir, mkdir, stat } from 'node:fs/promises';
import { join, parse } from 'node:path';
import sharp from 'sharp';

const SRC = 'images-src';
const OUT = 'images';
// максимальна ширина (px) для кожної теки; значення з урахуванням retina
const WIDTHS = { 'our-cases': 800, 'logos-bw': 400, team: 1200, '.': 400 };

async function walk(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else if (/\.(png|jpe?g)$/i.test(e.name)) out.push(p);
  }
  return out;
}

for (const file of await walk(SRC)) {
  const rel = file.slice(SRC.length + 1);
  const { dir, name } = parse(rel);
  const width = WIDTHS[dir || '.'] ?? 800;
  const dest = join(OUT, dir, `${name}.webp`);
  await mkdir(join(OUT, dir), { recursive: true });
  const info = await sharp(file)
    .rotate()
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 78, effort: 5 })
    .toFile(dest);
  console.log(`${rel} -> ${dest} ${info.width}x${info.height} ${(info.size / 1024).toFixed(0)}KB`);
}
