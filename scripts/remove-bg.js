const sharp = require("sharp");
const path = require("path");

// Labels every connected component of near-white/near-cream pixels (4-conn),
// then removes (alpha -> 0) any component that either touches the image
// border OR is large (a sizable enclosed pocket, e.g. background peeking
// through a gap between hair strands). Small enclosed islands — like eye
// specular highlights — are left untouched because they're far too small
// to meet the size threshold.
async function removeBackground(inputPath, outputPath, { lightnessMin = 205, satMax = 22, minIslandSize = 500 } = {}) {
  const { data, info } = await sharp(inputPath).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  const n = width * height;

  const isBgColor = (i) => {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    return max >= lightnessMin && max - min <= satMax;
  };

  const label = new Int32Array(n).fill(-1); // -1 = not background color, else component id
  const idx = (x, y) => y * width + x;

  let nextId = 0;
  const componentSize = [];
  const componentTouchesBorder = [];

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const p = idx(x, y);
      if (label[p] !== -1) continue;
      if (!isBgColor(p * channels)) continue;

      // BFS a new component
      const id = nextId++;
      let size = 0;
      let touchesBorder = false;
      const queue = [p];
      label[p] = id;
      while (queue.length) {
        const cp = queue.pop();
        size++;
        const cx = cp % width;
        const cy = (cp - cx) / width;
        if (cx === 0 || cy === 0 || cx === width - 1 || cy === height - 1) touchesBorder = true;
        for (const [nx, ny] of [[cx - 1, cy], [cx + 1, cy], [cx, cy - 1], [cx, cy + 1]]) {
          if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
          const np = idx(nx, ny);
          if (label[np] !== -1) continue;
          if (!isBgColor(np * channels)) continue;
          label[np] = id;
          queue.push(np);
        }
      }
      componentSize.push(size);
      componentTouchesBorder.push(touchesBorder);
    }
  }

  const remove = new Uint8Array(nextId);
  for (let id = 0; id < nextId; id++) {
    if (componentTouchesBorder[id] || componentSize[id] >= minIslandSize) remove[id] = 1;
  }

  const removedMask = new Uint8Array(n);
  for (let p = 0; p < n; p++) {
    if (label[p] !== -1 && remove[label[p]]) {
      data[p * channels + 3] = 0;
      removedMask[p] = 1;
    }
  }

  // Feather pass: subject pixels directly touching a removed pixel are very
  // likely anti-aliased edge blend — fade them too, to avoid a light halo.
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const p = idx(x, y);
      if (removedMask[p]) continue;
      const i = p * channels;
      let touchesRemoved = false;
      for (const [nx, ny] of [[x - 1, y], [x + 1, y], [x, y - 1], [x, y + 1]]) {
        if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
        if (removedMask[idx(nx, ny)]) { touchesRemoved = true; break; }
      }
      if (touchesRemoved) {
        const r = data[i], g = data[i + 1], b = data[i + 2];
        const max = Math.max(r, g, b), min = Math.min(r, g, b);
        if (max >= 170 && max - min <= 40) {
          data[i + 3] = Math.round(data[i + 3] * 0.25);
        }
      }
    }
  }

  await sharp(data, { raw: { width, height, channels } }).png().toFile(outputPath);
  console.log("wrote", outputPath, "— components:", nextId, "removed:", remove.reduce((a, b) => a + b, 0));
}

async function main() {
  const srcDir = path.join(__dirname, "..", "assets-src", "zana");
  const outDir = path.join(__dirname, "..", "public", "zana");
  await removeBackground(path.join(srcDir, "avatar-original.png"), path.join(outDir, "avatar.png"));
  await removeBackground(path.join(srcDir, "bust-original.png"), path.join(outDir, "bust.png"));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
