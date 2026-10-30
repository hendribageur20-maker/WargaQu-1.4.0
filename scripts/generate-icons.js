import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

const publicDir = path.resolve('public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// 1. Create beautiful SVG icon in Emerald & Mint Green theme
const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="emeraldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#064E3B" />
      <stop offset="45%" stop-color="#047857" />
      <stop offset="100%" stop-color="#059669" />
    </linearGradient>
    <linearGradient id="mintGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#34D399" />
      <stop offset="100%" stop-color="#10B981" />
    </linearGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#000000" flood-opacity="0.25" />
    </filter>
  </defs>

  <!-- Background rounded rect -->
  <rect width="512" height="512" rx="112" fill="url(#emeraldGrad)" />

  <!-- Outer subtle glow circle -->
  <circle cx="256" cy="256" r="190" fill="none" stroke="#34D399" stroke-width="3" opacity="0.3" />

  <!-- Shield / House Badge -->
  <g filter="url(#shadow)">
    <!-- Roof / Crest shape -->
    <path d="M256 100 L380 190 L340 330 L256 385 L172 330 L132 190 Z" fill="#ffffff" fill-opacity="0.12" stroke="#34D399" stroke-width="6" stroke-linejoin="round" />
    
    <!-- Central Modern House Icon -->
    <path d="M256 160 L330 225 V315 H182 V225 Z" fill="url(#mintGrad)" />
    <!-- Doorway cut -->
    <rect x="236" y="245" width="40" height="70" rx="8" fill="#064E3B" />
    <!-- Heart / Community symbol inside -->
    <circle cx="256" cy="230" r="10" fill="#ffffff" />
  </g>

  <!-- Brand Typography -->
  <text x="256" y="440" font-family="'Inter', sans-serif, system-ui" font-size="52" font-weight="900" font-style="italic" fill="#ffffff" text-anchor="middle" letter-spacing="1">
    warga<tspan fill="#34D399">Qu</tspan>
  </text>
  <rect x="210" y="460" width="92" height="20" rx="10" fill="#34D399" fill-opacity="0.25" stroke="#34D399" stroke-width="1.5" />
  <text x="256" y="474" font-family="'Inter', sans-serif, system-ui" font-size="12" font-weight="800" fill="#A7F3D0" text-anchor="middle">
    RT 03 / RW 05
  </text>
</svg>`;

fs.writeFileSync(path.join(publicDir, 'icon.svg'), svgContent);
console.log('Created Emerald icon.svg');

// CRC32 table & function for valid PNG chunk creation
const crcTable = new Uint32Array(256);
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  }
  crcTable[n] = c;
}

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  }
  return (c ^ 0xffffffff) >>> 0;
}

function createChunk(type, data) {
  const len = data.length;
  const chunk = Buffer.alloc(4 + 4 + len + 4);
  chunk.writeUInt32BE(len, 0);
  chunk.write(type, 4, 4, 'ascii');
  data.copy(chunk, 8);
  const toCrc = Buffer.concat([Buffer.from(type, 'ascii'), data]);
  chunk.writeUInt32BE(crc32(toCrc), 8 + len);
  return chunk;
}

// Generate a valid PNG buffer of size x size with Emerald & Mint brand colors
function generatePNG(size, isMaskable = false) {
  const width = size;
  const height = size;

  const lineSize = 1 + width * 4;
  const rawData = Buffer.alloc(lineSize * height);

  const cx = width / 2;
  const cy = height / 2;
  const maxR = width / 2;
  const safeRadius = isMaskable ? maxR * 0.75 : maxR * 0.9;

  for (let y = 0; y < height; y++) {
    const rowOffset = y * lineSize;
    rawData[rowOffset] = 0;

    for (let x = 0; x < width; x++) {
      const pixelOffset = rowOffset + 1 + x * 4;
      const dx = x - cx;
      const dy = y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Background gradient from top (#064E3B) to bottom (#059669)
      const gradFactor = y / height;
      let r = Math.round(6 * (1 - gradFactor) + 5 * gradFactor);
      let g = Math.round(78 * (1 - gradFactor) + 150 * gradFactor);
      let b = Math.round(59 * (1 - gradFactor) + 105 * gradFactor);
      let a = 255;

      // Inside safe radius house symbol
      if (dist < safeRadius) {
        // Subtle glow ring
        if (Math.abs(dist - safeRadius * 0.9) < 2) {
          r = 52; g = 211; b = 153; a = 180; // Mint #34D399
        }

        // Inner house silhouette
        const inHouseX = Math.abs(dx) < safeRadius * 0.45;
        const roofPeakY = -safeRadius * 0.45;
        const roofEavesY = -safeRadius * 0.05;
        const houseFloorY = safeRadius * 0.4;

        if (dy >= roofPeakY && dy <= roofEavesY) {
          const roofWidthAtY = ((dy - roofPeakY) / (roofEavesY - roofPeakY)) * (safeRadius * 0.55);
          if (Math.abs(dx) <= roofWidthAtY) {
            // Mint roof
            r = 52; g = 211; b = 153; a = 255;
          }
        } else if (dy > roofEavesY && dy <= houseFloorY && inHouseX) {
          // Mint body
          // Doorway
          if (Math.abs(dx) < safeRadius * 0.12 && dy > houseFloorY - safeRadius * 0.22) {
            r = 6; g = 78; b = 59; a = 255; // Deep emerald door
          } else {
            r = 52; g = 211; b = 153; a = 255;
          }
        }
      }

      rawData[pixelOffset] = r;
      rawData[pixelOffset + 1] = g;
      rawData[pixelOffset + 2] = b;
      rawData[pixelOffset + 3] = a;
    }
  }

  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8;
  ihdrData[9] = 6;
  ihdrData[10] = 0;
  ihdrData[11] = 0;
  ihdrData[12] = 0;
  const ihdrChunk = createChunk('IHDR', ihdrData);

  const compressedData = zlib.deflateSync(rawData);
  const idatChunk = createChunk('IDAT', compressedData);

  const iendChunk = createChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

// Generate Emerald & Mint icons
const icon192 = generatePNG(192, false);
fs.writeFileSync(path.join(publicDir, 'pwa-192x192.png'), icon192);

const icon512 = generatePNG(512, false);
fs.writeFileSync(path.join(publicDir, 'pwa-512x512.png'), icon512);

const maskable512 = generatePNG(512, true);
fs.writeFileSync(path.join(publicDir, 'pwa-maskable-512x512.png'), maskable512);

const appleTouch = generatePNG(180, false);
fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), appleTouch);

fs.writeFileSync(path.join(publicDir, 'favicon.ico'), generatePNG(64, false));

console.log('Emerald & Mint PWA icons generated successfully in public/');
