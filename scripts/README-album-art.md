# Fetch Album Art Script

This script fetches your top tracks from Spotify and downloads their album art to the `public/music/` directory. It also automatically updates `content/music.tsx` with your tracks.

## Setup

1. **Get a Spotify User Token:**
   - Go to https://developer.spotify.com/console/get-current-user-top-artists-and-tracks/
   - Click "Get Token"
   - Select the `user-top-read` scope
   - Click "Request Token"
   - Copy the token that appears

2. **Run the script:**

```bash
SPOTIFY_TOKEN=your_token_here node scripts/fetch-album-art.mjs
```

**Note:** Tokens expire after 1 hour. If you get an error, get a new token from the console.

## What it does

- Fetches your top 50 tracks from Spotify (all-time favorites)
- Downloads album art (640x640 or larger) for each track
- Saves images as `{slug}.jpg` in `public/music/`
- Automatically updates `content/music.tsx` with track information
- Shows progress for each track

## Manual Usage

If you prefer to manually add specific songs, edit `content/music.tsx` and download album art:
1. Find the song on Spotify
2. Right-click the album art and save it
3. Save as `public/music/{slug}.jpg`
