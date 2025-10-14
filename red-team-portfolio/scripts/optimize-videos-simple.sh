#!/bin/bash

# Simple Video Optimization Script for Red Team Portfolio
# Compresses 3 downloaded videos to web-optimized format

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
VIDEO_DIR="/home/paradigm/red-team-portfolio/public/videos"
OUTPUT_DIR="$VIDEO_DIR/optimized"
TARGET_DURATION=12
TARGET_RESOLUTION="1920x1080"
TARGET_FPS=30

echo -e "${BLUE}🎬 Simple Video Optimization Script${NC}"
echo -e "${BLUE}===================================${NC}"

# Check if FFmpeg is installed
if ! command -v ffmpeg &> /dev/null; then
    echo -e "${RED}❌ FFmpeg is not installed. Please install it first:${NC}"
    echo "sudo pacman -S ffmpeg"
    exit 1
fi

# Create output directory
mkdir -p "$OUTPUT_DIR"

# Function to optimize video (single pass)
optimize_video_simple() {
    local input="$1"
    local output="$2"
    local start_time="$3"
    local type="$4"
    
    echo -e "\n${GREEN}🎯 Optimizing: $(basename "$input")${NC}"
    echo "  Output: $(basename "$output")"
    echo "  Start time: ${start_time}s"
    echo "  Duration: ${TARGET_DURATION}s"
    echo "  Type: $type"
    
    # Single pass encoding with CRF for consistent quality
    ffmpeg -y -i "$input" \
        -ss "$start_time" \
        -t "$TARGET_DURATION" \
        -c:v libx264 \
        -preset medium \
        -crf 23 \
        -vf "scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2:black" \
        -r "$TARGET_FPS" \
        -g "$TARGET_FPS" \
        -keyint_min "$TARGET_FPS" \
        -an \
        -movflags +faststart \
        "$output"
    
    local final_size=$(du -k "$output" | cut -f1)
    echo -e "  ${GREEN}✅ Complete! Final size: $((final_size / 1024))MB${NC}"
}

# Function to generate thumbnail
generate_thumbnail() {
    local video="$1"
    local output="$2"
    
    ffmpeg -y -i "$video" -ss 2 -vframes 1 -vf "scale=320:180" "$output" 2>/dev/null
}

# Main execution
echo -e "${YELLOW}🔍 Finding video files...${NC}"

# Find all video files (excluding placeholders)
video_files=()
for ext in mp4 mov; do
    for file in "$VIDEO_DIR"/*.$ext; do
        if [ -f "$file" ] && [ -s "$file" ]; then
            video_files+=("$file")
        fi
    done
done

if [ ${#video_files[@]} -eq 0 ]; then
    echo -e "${RED}❌ No video files found in $VIDEO_DIR${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Found ${#video_files[@]} video files${NC}"

# Process each video
for file in "${video_files[@]}"; do
    echo -e "\n${YELLOW}📊 Processing: $(basename "$file")${NC}"
    
    # Get video info
    duration=$(ffprobe -v quiet -print_format json -show_format "$file" | jq -r '.format.duration' | cut -d. -f1)
    echo "  Duration: ${duration}s"
    
    # Determine type
    type="unknown"
    if [[ "$file" == *"sunrise"* ]] || [[ "$file" == *"radiant"* ]]; then
        type="sunrise"
    elif [[ "$file" == *"sunset"* ]] || [[ "$file" == *"abstract"* ]] || [[ "$file" == *"beautiful"* ]]; then
        type="sunset"
    fi
    echo "  Type: $type"
    
    # Calculate start time (middle of video for best content)
    start_time=$((duration / 2 - TARGET_DURATION / 2))
    if [ $start_time -lt 0 ]; then
        start_time=0
    fi
    echo "  Start time: ${start_time}s"
    
    # Create output filename
    basename=$(basename "$file")
    name_without_ext="${basename%.*}"
    output_file="$OUTPUT_DIR/${name_without_ext}_optimized.mp4"
    
    # Optimize video
    optimize_video_simple "$file" "$output_file" "$start_time" "$type"
    
    # Generate thumbnail
    thumbnail="$OUTPUT_DIR/${name_without_ext}_thumb.jpg"
    generate_thumbnail "$output_file" "$thumbnail"
done

# Create simple report
report_file="$OUTPUT_DIR/optimization-report.md"
echo -e "\n${BLUE}📋 Generating report...${NC}"

cat > "$report_file" << EOF
# Video Optimization Report

Generated: $(date)

## Optimized Videos

| Original File | Optimized File | Type | Size |
|---------------|----------------|------|------|
EOF

for file in "$OUTPUT_DIR"/*_optimized.mp4; do
    if [ -f "$file" ]; then
        original_name=$(basename "$file" _optimized.mp4)
        original_file=$(find "$VIDEO_DIR" -name "*${original_name}*" -type f | head -1)
        original_size=$(du -m "$original_file" | cut -f1)
        optimized_size=$(du -k "$file" | cut -f1)
        reduction=$((100 - (optimized_size * 100 / (original_size * 1024))))
        
        # Determine type
        type="unknown"
        if [[ "$file" == *"sunrise"* ]] || [[ "$file" == *"radiant"* ]]; then
            type="sunrise"
        elif [[ "$file" == *"sunset"* ]] || [[ "$file" == *"abstract"* ]] || [[ "$file" == *"beautiful"* ]]; then
            type="sunset"
        fi
        
        echo "| $(basename "$original_file") | $(basename "$file") | $type | $((optimized_size / 1024))MB |" >> "$report_file"
    fi
done

cat >> "$report_file" << EOF

## Recommendations

### For Sunrise (DARRIUS GRATE):
- Look for warm golden/orange tones
- Clear sun visibility
- Smooth, professional feel

### For Sunset (FOREVERLX):
- Look for deep oranges, purples, reds
- Dramatic lighting
- Cinematic quality

## Next Steps

1. Review the optimized videos in \`$OUTPUT_DIR\`
2. Choose your preferred sunrise video
3. Choose your preferred sunset video
4. Rename them to \`sunrise.mp4\` and \`sunset.mp4\`
5. Move them to \`$VIDEO_DIR\` (replacing the placeholder files)

## Technical Details

- **Codec**: H.264 (libx264)
- **Resolution**: $TARGET_RESOLUTION
- **Framerate**: $TARGET_FPS fps
- **Duration**: ${TARGET_DURATION}s
- **Quality**: CRF 23 (good quality/size balance)
- **Audio**: Removed (not needed for typography)

EOF

# Summary
echo -e "\n${GREEN}🎉 Optimization Complete!${NC}"
echo -e "${GREEN}========================${NC}"
echo -e "📁 Optimized videos: $OUTPUT_DIR"
echo -e "📋 Report: $report_file"
echo -e "🖼️  Thumbnails: $OUTPUT_DIR/*_thumb.jpg"
echo -e "\n${YELLOW}Next steps:${NC}"
echo -e "1. Review the optimized videos"
echo -e "2. Choose your preferred sunrise and sunset videos"
echo -e "3. Rename them to sunrise.mp4 and sunset.mp4"
echo -e "4. Move them to $VIDEO_DIR"
echo -e "\n${BLUE}Happy optimizing! 🚀${NC}"
