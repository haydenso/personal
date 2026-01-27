#!/usr/bin/env node

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const galleryDir = path.join(__dirname, '..', 'public', 'gallery');

async function compressAndRenameImages() {
  const files = fs.readdirSync(galleryDir);
  
  // Filter for image files (exclude SVGs and already processed files)
  const imageFiles = files.filter(file => {
    const ext = path.extname(file).toLowerCase();
    return ['.jpg', '.jpeg', '.png', '.heic'].includes(ext) && !file.match(/^gallery-\d+\.jpg$/);
  });

  console.log(`Found ${imageFiles.length} images to process...`);

  // Delete old SVG placeholders
  const svgFiles = files.filter(f => f.endsWith('.svg'));
  for (const svg of svgFiles) {
    fs.unlinkSync(path.join(galleryDir, svg));
    console.log(`Deleted: ${svg}`);
  }

  // Process each image
  for (let i = 0; i < imageFiles.length; i++) {
    const file = imageFiles[i];
    const inputPath = path.join(galleryDir, file);
    const outputFilename = `gallery-${i + 1}.jpg`;
    const outputPath = path.join(galleryDir, outputFilename);

    try {
      await sharp(inputPath)
        .resize(1200, 1200, {
          fit: 'inside',
          withoutEnlargement: true
        })
        .jpeg({
          quality: 85,
          progressive: true,
          mozjpeg: true
        })
        .toFile(outputPath);

      console.log(`✓ Compressed and renamed: ${file} → ${outputFilename}`);

      // Delete original file if it's different from output
      if (file !== outputFilename) {
        fs.unlinkSync(inputPath);
      }
    } catch (error) {
      console.error(`Error processing ${file}:`, error.message);
    }
  }

  // Delete about-3.jpg if it exists
  const aboutFile = path.join(galleryDir, 'about-3.jpg');
  if (fs.existsSync(aboutFile)) {
    fs.unlinkSync(aboutFile);
    console.log('Deleted: about-3.jpg');
  }

  console.log(`\n✅ Processing complete! ${imageFiles.length} images optimized.`);
}

compressAndRenameImages().catch(console.error);
