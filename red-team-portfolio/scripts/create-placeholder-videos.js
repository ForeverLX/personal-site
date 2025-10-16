#!/usr/bin/env node

/**
 * Placeholder video creation script
 * This creates simple animated videos for sunrise/sunset using canvas
 * In production, these would be replaced with actual video files
 */

const fs = require('fs');
const path = require('path');

// Create a simple HTML file that can generate the videos
const createVideoGenerator = () => {
  const html = `
<!DOCTYPE html>
<html>
<head>
    <title>Video Generator</title>
</head>
<body>
    <canvas id="sunriseCanvas" width="1920" height="1080"></canvas>
    <canvas id="sunsetCanvas" width="1920" height="1080"></canvas>
    <script>
        // Sunrise animation
        const sunriseCanvas = document.getElementById('sunriseCanvas');
        const sunriseCtx = sunriseCanvas.getContext('2d');
        
        function createSunriseFrame(time) {
            const gradient = sunriseCtx.createLinearGradient(0, 0, 0, 1080);
            gradient.addColorStop(0, 'hsl(30, 100%, 20%)'); // Dark orange
            gradient.addColorStop(0.3, 'hsl(45, 100%, 40%)'); // Orange
            gradient.addColorStop(0.6, 'hsl(60, 100%, 60%)'); // Yellow
            gradient.addColorStop(1, 'hsl(200, 100%, 80%)'); // Light blue
            
            sunriseCtx.fillStyle = gradient;
            sunriseCtx.fillRect(0, 0, 1920, 1080);
            
            // Sun
            const sunY = 800 - (time * 400); // Sun rises
            sunriseCtx.beginPath();
            sunriseCtx.arc(960, sunY, 80, 0, 2 * Math.PI);
            sunriseCtx.fillStyle = 'hsl(45, 100%, 70%)';
            sunriseCtx.fill();
        }
        
        // Sunset animation
        const sunsetCanvas = document.getElementById('sunsetCanvas');
        const sunsetCtx = sunsetCanvas.getContext('2d');
        
        function createSunsetFrame(time) {
            const gradient = sunsetCtx.createLinearGradient(0, 0, 0, 1080);
            gradient.addColorStop(0, 'hsl(200, 100%, 80%)'); // Light blue
            gradient.addColorStop(0.3, 'hsl(60, 100%, 60%)'); // Yellow
            gradient.addColorStop(0.6, 'hsl(30, 100%, 50%)'); // Orange
            gradient.addColorStop(1, 'hsl(15, 100%, 20%)'); // Dark red
            
            sunsetCtx.fillStyle = gradient;
            sunsetCtx.fillRect(0, 0, 1920, 1080);
            
            // Sun
            const sunY = 400 + (time * 400); // Sun sets
            sunsetCtx.beginPath();
            sunsetCtx.arc(960, sunY, 80, 0, 2 * Math.PI);
            sunsetCtx.fillStyle = 'hsl(30, 100%, 60%)';
            sunsetCtx.fill();
        }
        
        // Generate frames (this would need to be converted to actual video)
        console.log('Video generation would happen here');
        console.log('For now, we need actual video files');
    </script>
</body>
</html>`;

  fs.writeFileSync(path.join(__dirname, 'video-generator.html'), html);
  console.log('Created video-generator.html - this can be used to create actual videos');
};

// Create placeholder video files (empty for now)
const createPlaceholderVideos = () => {
  const videosDir = path.join(__dirname, '..', 'public', 'videos');
  
  if (!fs.existsSync(videosDir)) {
    fs.mkdirSync(videosDir, { recursive: true });
  }
  
  // Create placeholder files
  fs.writeFileSync(path.join(videosDir, 'sunrise.mp4'), '');
  fs.writeFileSync(path.join(videosDir, 'sunset.mp4'), '');
  
  console.log('Created placeholder video files');
  console.log('You need to replace these with actual video files:');
  console.log('- /public/videos/sunrise.mp4 (7-15 second loop)');
  console.log('- /public/videos/sunset.mp4 (7-15 second loop)');
};

// Create README for video requirements
const createVideoReadme = () => {
  const readme = `# Video Requirements

## Sunrise Video (/public/videos/sunrise.mp4)
- Duration: 7-15 seconds (looping)
- Resolution: 1920x1080 or 2560x1440
- Format: H.264 MP4
- Content: Warm sunrise colors, sun rising, dawn → daylight transition
- File size: ~1-2MB (optimized)

## Sunset Video (/public/videos/sunset.mp4)
- Duration: 7-15 seconds (looping)
- Resolution: 1920x1080 or 2560x1440
- Format: H.264 MP4
- Content: Deep sunset colors, sun setting, daylight → dusk transition
- File size: ~1-2MB (optimized)

## Recommended Sources
- Pexels: https://www.pexels.com/search/sunrise/
- Pixabay: https://pixabay.com/videos/search/sunset/
- Unsplash: https://unsplash.com/s/photos/sunrise

## Fallback
If videos don't work, the component will fall back to gradient backgrounds.
`;

  fs.writeFileSync(path.join(__dirname, '..', 'public', 'videos', 'README.md'), readme);
  console.log('Created video requirements README');
};

// Run the script
createPlaceholderVideos();
createVideoReadme();
createVideoGenerator();

console.log('\n=== Video Setup Complete ===');
console.log('Next steps:');
console.log('1. Find sunrise/sunset videos (7-15 seconds each)');
console.log('2. Replace placeholder files in /public/videos/');
console.log('3. Test the intro screen and hero section');
console.log('4. Optimize videos for web (compress if needed)');



