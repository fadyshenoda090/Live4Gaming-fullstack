// lib/image-resizer.js
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const inputDir = "/home/fady/Desktop/Projects/Live4Gaming/public/games";
const outputDir = "/home/fady/Desktop/Projects/Live4Gaming/public/games/resized";

const width = 1280;
const height = 720;

// Make sure output folder exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function resizeImages() {
  const files = fs
    .readdirSync(inputDir)
    .filter((file) => file.endsWith(".jpeg") || file.endsWith(".jpg"));

  for (const file of files) {
    const inputPath = path.join(inputDir, file);
    const outputPath = path.join(outputDir, file.replace(".jpeg", ".jpg"));

    try {
      await sharp(inputPath)
        .resize(width, height, { fit: "cover", position: "center" })
        .jpeg({ quality: 90 })
        .toFile(outputPath);

      console.log(`✅ Resized: ${file}`);
    } catch (err) {
      console.error(`❌ Error resizing ${file}:`, err.message);
    }
  }

  console.log("✨ All images processed!");
}

resizeImages();
