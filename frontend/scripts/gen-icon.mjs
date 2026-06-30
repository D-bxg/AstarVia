import sharp from 'sharp';
import pngToIco from 'png-to-ico';
import { writeFileSync } from 'fs';

const png256 = await sharp('src/shared/assets/logo.svg').resize(256, 256).png().toBuffer();
const buf = await pngToIco([png256]);
writeFileSync('build/icon.ico', buf);
console.log('ICO generated');
