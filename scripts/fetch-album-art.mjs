#!/usr/bin/env node

/**
 * Script to fetch your top tracks and album art from Spotify
 * 
 * Setup:
 * 1. Get your Spotify user token from https://developer.spotify.com/console/get-current-user-top-artists-and-tracks/
 * 2. Run: SPOTIFY_TOKEN=your_token node scripts/fetch-album-art.mjs
 */

import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const TOKEN = process.env.SPOTIFY_TOKEN;

if (!TOKEN) {
  console.error('❌ Missing Spotify token');
  console.error('Set SPOTIFY_TOKEN environment variable');
  console.error('Get it from: https://developer.spotify.com/console/get-current-user-top-artists-and-tracks/');
  process.exit(1);
}

async function fetchWebApi(endpoint, method, body) {
  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
    method,
    body: body ? JSON.stringify(body) : undefined
  });
  return await res.json();
}

async function getTopTracks() {
  // Get top 50 tracks from all time
  return (await fetchWebApi(
    'v1/me/top/tracks?time_range=long_term&limit=50', 'GET'
  )).items;
}

async function downloadImage(url, filepath) {
  const response = await fetch(url);
  const buffer = await response.arrayBuffer();
  await writeFile(filepath, Buffer.from(buffer));
}

function createSlug(title, artist) {
  // Create a slug from title and artist
  const text = `${title} ${artist}`.toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special chars
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Remove duplicate hyphens
    .trim();
  return text.substring(0, 60); // Limit length
}

async function main() {
  console.log('🎵 Fetching your top tracks from Spotify...\n');

  const tracks = await getTopTracks();
  
  if (!tracks || tracks.length === 0) {
    console.error('❌ No tracks found. Check your token.');
    return;
  }

  const musicDir = join(__dirname, '..', 'public', 'music');
  const contentFile = join(__dirname, '..', 'content', 'music.tsx');

  // Create music directory if it doesn't exist
  if (!existsSync(musicDir)) {
    await mkdir(musicDir, { recursive: true });
  }

  const albumData = [];

  console.log(`Found ${tracks.length} tracks. Processing...\n`);

  for (const track of tracks) {
    try {
      const title = track.name;
      const artists = track.artists.map(a => a.name).join(', ');
      const slug = createSlug(title, track.artists[0].name);
      
      console.log(`Processing: ${title} - ${artists}`);
      
      if (track.album?.images?.[0]) {
        const imageUrl = track.album.images[0].url; // Largest image
        const filepath = join(musicDir, `${slug}.jpg`);
        
        await downloadImage(imageUrl, filepath);
        console.log(`✅ Downloaded: ${slug}.jpg\n`);

        // Store album data for music.tsx
        albumData.push({
          slug,
          title,
          artist: artists,
          album: track.album.name,
          spotifyUrl: track.external_urls.spotify
        });
      } else {
        console.log(`❌ No image for: ${title}\n`);
      }

      // Rate limiting
      await new Promise(resolve => setTimeout(resolve, 100));
    } catch (error) {
      console.error(`❌ Error for ${track.name}:`, error.message, '\n');
    }
  }

  // Generate music.tsx content
  const today = new Date();
  const dateStr = `${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}-${today.getFullYear()}`;
  
  const musicContent = `export interface Album {
  slug: string
  title: string
  artist: string
  date: string
  lastUpdated?: string
  hasNotes: boolean
  isListening: boolean
  pinned: boolean
  content: string
}

export const albums: Album[] = [
${albumData.map(album => `  {
    "slug": "${album.slug}",
    "title": "${album.title.replace(/"/g, '\\"')}",
    "artist": "${album.artist.replace(/"/g, '\\"')}",
    "date": "${today.getFullYear()}",
    "lastUpdated": "${dateStr}",
    "hasNotes": false,
    "isListening": true,
    "pinned": false,
    "content": "From album: ${album.album.replace(/"/g, '\\"')}"
  }`).join(',\n')}
]
`;

  await writeFile(contentFile, musicContent);
  console.log(`\n✅ Updated ${contentFile}`);
  console.log(`✨ Done! Added ${albumData.length} tracks.`);
}

main().catch(console.error);
