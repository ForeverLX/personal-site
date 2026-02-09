#!/bin/bash

# Video Optimization Script for Red Team Portfolio
# Compresses 3 downloaded videos to web-optimized format for hero typography

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
TARGET_SIZE_MB=1.5
TARGET_DURATION=12
TARGET_RESOLUTION="1920x1080"
TARGET_FPS=30

echo -e "${BLUE}🎬 Video Optimization Script for Red Team Portfolio${NC}"
echo -e "${BLUE}================================================${NC}"

# Check if FFmpeg is installed
if ! command -v ffmpeg &> /dev/null; then
    echo -e "${RED}❌ FFmpeg is not installed. Please install it first:${NC}"
    echo "sudo pacman -S ffmpeg"
    exit 1
fi

# Create output directory
mkdir -p "$OUTPUT_DIR"

# Function to analyze video
analyze_video() {
    local file="$1"
    echo -e "\n${YELLOW}📊 Analyzing: $(basename "$file")${NC}"
    
    # Get video info
    local duration=$(ffprobe -v quiet -print_format json -show_format "$file" | jq -r '.format.duration' | cut -d. -f1)
    local width=$(ffprobe -v quiet -print_format json -show_streams "$file" | jq -r '.streams[0].width')
    local height=$(ffprobe -v quiet -print_format json -show_streams "$file" | jq -r '.streams[0].height')
    local fps=$(ffprobe -v quiet -print_format json -show_streams "$file" | jq -r '.streams[0].r_frame_rate' | cut -d/ -f1)
    local size_mb=$(du -m "$file" | cut -f1)
    
    echo "  Duration: ${duration}s"
    echo "  Resolution: ${width}x${height}"
    echo "  FPS: ${fps}"
    echo "  Size: ${size_mb}MB"
    
    # Determine if it's sunrise or sunset based on filename
    local type="unknown"
    if [[ "$file" == *"sunrise"* ]] || [[ "$file" == *"radiant"* ]]; then
        type="sunrise"
    elif [[ "$file" == *"sunset"* ]] || [[ "$file" == *"abstract"* ]] || [[ "$file" == *"beautiful"* ]]; then
        type="sunset"
    fi
    
    echo "  Type: ${type}"
    
    # Calculate optimal start time (middle of video for best content)
    local start_time=$((duration / 2 - TARGET_DURATION / 2))
    if [ $start_time -lt 0 ]; then
        start_time=0
    fi
    
    echo "  Optimal start: ${start_time}s"
    
    # Calculate target bitrate for ~1.5MB
    local target_bitrate=$((1500 * 8 * 1024 / TARGET_DURATION))
    echo "  Target bitrate: ${target_bitrate}k"
    
    # Store analysis results
    echo "$file|$duration|${width}x${height}|$fps|${size_mb}|$type|$start_time|$target_bitrate" >> "$OUTPUT_DIR/analysis.txt"
}

# Function to optimize video
optimize_video() {
    local input="$1"
    local output="$2"
    local start_time="$3"
    local bitrate="$4"
    local type="$5"
    
    echo -e "\n${GREEN}🎯 Optimizing: $(basename "$input")${NC}"
    echo "  Output: $(basename "$output")"
    echo "  Start time: ${start_time}s"
    echo "  Duration: ${TARGET_DURATION}s"
    echo "  Bitrate: ${bitrate}k"
    
    # Two-pass encoding for best quality
    echo "  Pass 1/2: Analyzing..."
    ffmpeg -y -i "$input" \
        -ss "$start_time" \
        -t "$TARGET_DURATION" \
        -c:v libx264 \
        -preset slow \
        -b:v "${bitrate}k" \
        -maxrate "${bitrate}k" \
        -bufsize "$((bitrate * 2))k" \
        -vf "scale=$TARGET_RESOLUTION:force_original_aspect_ratio=decrease,pad=$TARGET_RESOLUTION:(ow-iw)/2:(oh-ih)/2:black" \
        -r "$TARGET_FPS" \
        -g "$TARGET_FPS" \
        -keyint_min "$TARGET_FPS" \
        -an \
        -pass 1 \
        -f null \
        /dev/null 2>/dev/null
    
    echo "  Pass 2/2: Encoding..."
    ffmpeg -y -i "$input" \
        -ss "$start_time" \
        -t "$TARGET_DURATION" \
        -c:v libx264 \
        -preset slow \
        -b:v "${bitrate}k" \
        -maxrate "${bitrate}k" \
        -bufsize "$((bitrate * 2))k" \
        -vf "scale=$TARGET_RESOLUTION:force_original_aspect_ratio=decrease,pad=$TARGET_RESOLUTION:(ow-iw)/2:(oh-ih)/2:black" \
        -r "$TARGET_FPS" \
        -g "$TARGET_FPS" \
        -keyint_min "$TARGET_FPS" \
        -an \
        -pass 2 \
        -movflags +faststart \
        "$output"
    
    # Clean up pass files
    rm -f ffmpeg2pass-0.log ffmpeg2pass-0.log.mbtree
    
    local final_size=$(du -k "$output" | cut -f1)
    echo -e "  ${GREEN}✅ Complete! Final size: $((final_size / 1024))MB${NC}"
}

# Function to generate thumbnail
generate_thumbnail() {
    local video="$1"
    local output="$2"
    
    ffmpeg -y -i "$video" -ss 2 -vframes 1 -vf "scale=320:180" "$output" 2>/dev/null
}

# Function to create comparison report
create_report() {
    local report_file="$OUTPUT_DIR/optimization-report.md"
    
    echo -e "\n${BLUE}📋 Generating comparison report...${NC}"
    
    cat > "$report_file" << EOF
# Video Optimization Report

Generated: $(date)

## Original Videos Analysis

| File | Duration | Resolution | FPS | Size | Type | Start Time |
|------|----------|------------|-----|------|------|------------|
EOF

    while IFS='|' read -r file duration resolution fps size type start_time bitrate; do
        echo "| $(basename "$file") | ${duration}s | $resolution | $fps | ${size}MB | $type | ${start_time}s |" >> "$report_file"
    done < "$OUTPUT_DIR/analysis.txt"

    cat >> "$report_file" << EOF

## Optimized Videos

| Original | Optimized | Size Reduction | Type |
|----------|-----------|----------------|------|
EOF

    for file in "$OUTPUT_DIR"/*.mp4; do
        if [ -f "$file" ]; then
            local original_name=$(basename "$file" .mp4)
            local original_file=$(find "$VIDEO_DIR" -name "*${original_name}*" -type f | head -1)
            local original_size=$(du -m "$original_file" | cut -f1)
            local optimized_size=$(du -k "$file" | cut -f1)
            local reduction=$((100 - (optimized_size * 100 / (original_size * 1024))))
            
            # Determine type
            local type="unknown"
            if [[ "$file" == *"sunrise"* ]] || [[ "$file" == *"radiant"* ]]; then
                type="sunrise"
            elif [[ "$file" == *"sunset"* ]] || [[ "$file" == *"abstract"* ]] || [[ "$file" == *"beautiful"* ]]; then
                type="sunset"
            fi
            
            echo "| $(basename "$original_file") | $(basename "$file") | ${reduction}% | $type |" >> "$report_file"
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
- **Target Size**: ${TARGET_SIZE_MB}MB
- **Audio**: Removed (not needed for typography)
- **Optimization**: Two-pass encoding for best quality

EOF

    echo -e "${GREEN}✅ Report generated: $report_file${NC}"
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

# Clear previous analysis
rm -f "$OUTPUT_DIR/analysis.txt"

# Analyze all videos
for file in "${video_files[@]}"; do
    analyze_video "$file"
done

# Optimize all videos
echo -e "\n${BLUE}🎬 Starting optimization process...${NC}"

while IFS='|' read -r file duration resolution fps size type start_time bitrate; do
    basename=$(basename "$file")
    name_without_ext="${basename%.*}"
    output_file="$OUTPUT_DIR/${name_without_ext}_optimized.mp4"
    
    optimize_video "$file" "$output_file" "$start_time" "$bitrate" "$type"
    
    # Generate thumbnail
    thumbnail="$OUTPUT_DIR/${name_without_ext}_thumb.jpg"
    generate_thumbnail "$output_file" "$thumbnail"
    
done < "$OUTPUT_DIR/analysis.txt"

# Create comparison report
create_report

# Summary
echo -e "\n${GREEN}🎉 Optimization Complete!${NC}"
echo -e "${GREEN}========================${NC}"
echo -e "📁 Optimized videos: $OUTPUT_DIR"
echo -e "📋 Report: $OUTPUT_DIR/optimization-report.md"
echo -e "🖼️  Thumbnails: $OUTPUT_DIR/*_thumb.jpg"
echo -e "\n${YELLOW}Next steps:${NC}"
echo -e "1. Review the optimized videos"
echo -e "2. Choose your preferred sunrise and sunset videos"
echo -e "3. Rename them to sunrise.mp4 and sunset.mp4"
echo -e "4. Move them to $VIDEO_DIR"
echo -e "\n${BLUE}Happy optimizing! 🚀${NC}"
