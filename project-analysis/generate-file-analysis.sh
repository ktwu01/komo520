#!/bin/bash
cd ..

# Create output file
output_file="./project-analysis/file_analysis.txt"

# Write header
echo "# Project File Analysis" > "$output_file"
echo "Generated on: $(date)" >> "$output_file"
echo "" >> "$output_file"

# Function to extract file samples
analyze_file() {
    local file="$1"
    local lines=$(wc -l < "$file" 2>/dev/null)
        
    # Skip .js files
    if [[ "$file" == *.js ]]; then
        echo "  Type: JavaScript file (skipped)" >> "$output_file"
        return
    fi
    
    local lines=$(wc -l < "$file" 2>/dev/null)

    # Skip binary files
    if file -b --mime-encoding "$file" | grep -q binary; then
        echo "  Type: Binary file" >> "$output_file"
        return
    fi
    
    echo "  Type: Text file" >> "$output_file"
    echo "  Lines: $lines" >> "$output_file"
    echo "" >> "$output_file"
    
    # Extract samples
    echo "  First 5 lines:" >> "$output_file"
    echo "  \`\`\`" >> "$output_file"
    head -5 "$file" | sed 's/^/  /' >> "$output_file"
    echo "  \`\`\`" >> "$output_file"
    echo "" >> "$output_file"
    
    if [ "$lines" -gt 10 ]; then
        echo "  Middle 5 lines (around line $((lines/2))):" >> "$output_file"
        echo "  \`\`\`" >> "$output_file"
        start_line=$((lines/2 - 2))
        tail -n +"$start_line" "$file" | head -5 | sed 's/^/  /' >> "$output_file"
        echo "  \`\`\`" >> "$output_file"
        echo "" >> "$output_file"
    fi
    
    echo "  Last 5 lines:" >> "$output_file"
    echo "  \`\`\`" >> "$output_file"
    tail -5 "$file" | sed 's/^/  /' >> "$output_file"
    echo "  \`\`\`" >> "$output_file"
    echo "" >> "$output_file"
}

# Recursively find and analyze files
find . -type f -not -path '*/\.*' -not -path '*/node_modules/*' -not -path '*/__pycache__/*' | while read -r file; do
    echo "## File: $file" >> "$output_file"
    echo "" >> "$output_file"
    analyze_file "$file"
    echo "---" >> "$output_file"
    echo "" >> "$output_file"
done

echo "File analysis completed. Output saved to $output_file"