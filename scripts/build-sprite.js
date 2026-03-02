const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');

const INPUT_DIR = './public/assets/hero-sequence/keyboard sequence';
const OUTPUT_DIR = './public/assets';
const FRAME_COUNT = 192; // Total frames
const FRAME_WIDTH = 1000;
const FRAME_HEIGHT = 563;

// iOS Safari has a hard 16.7 Megapixel limit for Canvas/Image decoding.
// To stay under 4096x4096px boundaries, we will chunk the 192 frames into 8 separate sprite sheets.
// Each sheet will contain 24 frames (4 cols x 6 rows)
const SHEETS = 8;
const FRAMES_PER_SHEET = 24;
const COLS = 4;
const ROWS = 6;

async function buildSpriteSheets() {
    console.log(`Building ${SHEETS} Hardware-Safe Sprite Sheets...`);

    for (let sheet = 0; sheet < SHEETS; sheet++) {
        const canvas = createCanvas(FRAME_WIDTH * COLS, FRAME_HEIGHT * ROWS);
        const ctx = canvas.getContext('2d');
        const startFrame = sheet * FRAMES_PER_SHEET;

        console.log(`Building Sheet ${sheet} (Frames ${startFrame + 1} to ${startFrame + FRAMES_PER_SHEET})...`);

        for (let i = 0; i < FRAMES_PER_SHEET; i++) {
            const globalFrameIndex = startFrame + i;
            if (globalFrameIndex >= FRAME_COUNT) break;

            // Files are named 00001.png to 00192.png
            const paddedIndex = String(globalFrameIndex + 1).padStart(5, "0");
            const filePath = `${INPUT_DIR}/${paddedIndex}.png`;

            try {
                const img = await loadImage(filePath);

                const col = i % COLS;
                const row = Math.floor(i / COLS);
                const x = col * FRAME_WIDTH;
                const y = row * FRAME_HEIGHT;

                ctx.drawImage(img, x, y, FRAME_WIDTH, FRAME_HEIGHT);
            } catch (err) {
                console.error(`Missing frame ${filePath}, rendering blank spot.`);
            }
        }

        const outPath = `${OUTPUT_DIR}/hero-sequence-sprite-${sheet}.webp`;
        // Using WebP for massive compression savings if node-canvas was built with it, 
        // falling back to PNG if not
        try {
            const buffer = canvas.toBuffer('image/jpeg', { quality: 0.85 });
            fs.writeFileSync(outPath.replace('.webp', '.jpeg'), buffer);
        } catch (e) {
            const buffer = canvas.toBuffer('image/png');
            fs.writeFileSync(outPath.replace('.webp', '.png'), buffer);
        }
    }

    console.log("All Sprite Sheets successfully compiled!");
}

buildSpriteSheets();
