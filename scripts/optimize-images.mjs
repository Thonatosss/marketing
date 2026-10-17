// Генерує WebP-варіанти з оригіналів. Оригінали лежать поза репозиторієм
// (../marketing-originals/images), у репозиторії — лише готові -<ширина>.webp.
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

const SRC = process.env.ORIGINALS || '../marketing-originals/images';
const OUT = 'images';

const jobs = [
  { dir: 'our-cases', widths: [480, 960], quality: 74 },
  { dir: 'logos-bw', widths: [320], quality: 82 },
  { dir: 'team', only: ['second-section-black.jpg'], widths: [500, 1000], quality: 76 },
  { dir: '.', only: ['second_logo.png'], widths: [190, 380], quality: 85 },
];
const skip = new Set(['cars.png', 'start_home.jpeg', 'logo_transparent_icon.jpg', 'logo2.png']);

for (const { dir, widths, quality, only } of jobs) {
  const from = path.join(SRC, dir);
  for (const file of fs.readdirSync(from)) {
    const ext = path.extname(file);
    if (!/\.(jpe?g|png)$/i.test(ext) || skip.has(file)) continue;
    if (only && !only.includes(file)) continue;
    const base = path.basename(file, ext);
    fs.mkdirSync(path.join(OUT, dir), { recursive: true });
    for (const w of widths) {
      const dest = path.join(OUT, dir, `${base}-${w}.webp`);
      const info = await sharp(path.join(from, file))
        .rotate()
        .resize({ width: w, withoutEnlargement: true })
        .webp({ quality })
        .toFile(dest);
      console.log(dest, `${Math.round(info.size / 1024)} KB`, `${info.width}x${info.height}`);
    }
  }
}
