#!/usr/bin/env python3
import sys
import os
import subprocess
from PIL import Image

def resize_and_crop(img_path, target_width, target_height):
    """Resizes and crops the image to fit the target dimensions while maintaining aspect ratio."""
    img = Image.open(img_path)
    # Ensure RGB mode (converts RGBA/CMYK if necessary)
    if img.mode != 'RGB':
        img = img.convert('RGB')
        
    width, height = img.size
    aspect_target = target_width / target_height
    aspect_img = width / height
    
    if aspect_img > aspect_target:
        # Image is wider than target aspect ratio - crop horizontally
        new_width = int(height * aspect_target)
        left = (width - new_width) // 2
        img = img.crop((left, 0, left + new_width, height))
    elif aspect_img < aspect_target:
        # Image is taller than target aspect ratio - crop vertically
        new_height = int(width / aspect_target)
        top = (height - new_height) // 2
        img = img.crop((0, top, width, top + new_height))
        
    # Resize to exact target
    img = img.resize((target_width, target_height), Image.Resampling.LANCZOS)
    return img

def apply_exif(file_path):
    """Applies Saudi Arabia GPS coordinates and iPhone 15 Pro EXIF metadata, and removes AI footprints."""
    cmd = [
        "/opt/homebrew/bin/exiftool",
        "-all=", # Strip all metadata first
        "-Make=Apple",
        "-Model=iPhone 15 Pro",
        "-Software=iOS 17.5",
        "-GPSLatitude=21.543333",
        "-GPSLatitudeRef=N",
        "-GPSLongitude=39.172778",
        "-GPSLongitudeRef=E",
        "-overwrite_original",
        file_path
    ]
    subprocess.run(cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

def main():
    if len(sys.argv) < 4:
        print("Usage: python3 optimize-images.py <input_image_path> <output_slug> <hero|body>")
        sys.exit(1)
        
    input_path = sys.argv[1]
    slug = sys.argv[2]
    img_type = sys.argv[3]
    
    if not os.path.exists(input_path):
        print(f"Error: Input file '{input_path}' does not exist.")
        sys.exit(1)
        
    os.makedirs("public/images/blog", exist_ok=True)
    temp_png = f"public/images/blog/temp_{slug}_{img_type}.png"
    
    try:
        if img_type == "hero":
            # 1. Resize/Crop to 1200x630
            img = resize_and_crop(input_path, 1200, 630)
            img.save(temp_png, "PNG")
            
            # 2. Convert to AVIF
            avif_path = f"public/images/blog/{slug}-hero.avif"
            subprocess.run([
                "/opt/homebrew/bin/avifenc",
                "-q", "75",
                "-s", "6",
                temp_png,
                avif_path
            ], check=True, stdout=subprocess.DEVNULL)
            
            # 3. Apply EXIF to AVIF
            apply_exif(avif_path)
            
            # 4. Save OG JPEG version
            jpg_path = f"public/images/blog/{slug}-hero-og.jpg"
            img.save(jpg_path, "JPEG", quality=80)
            
            # 5. Apply EXIF to JPEG
            apply_exif(jpg_path)
            print(f"Successfully processed hero image for '{slug}':")
            print(f"  - {avif_path}")
            print(f"  - {jpg_path}")
            
        elif img_type == "body":
            # 1. Resize/Crop to 800x450
            img = resize_and_crop(input_path, 800, 450)
            img.save(temp_png, "PNG")
            
            # 2. Convert to AVIF
            avif_path = f"public/images/blog/{slug}-body.avif"
            subprocess.run([
                "/opt/homebrew/bin/avifenc",
                "-q", "75",
                "-s", "6",
                temp_png,
                avif_path
            ], check=True, stdout=subprocess.DEVNULL)
            
            # 3. Apply EXIF to AVIF
            apply_exif(avif_path)
            print(f"Successfully processed body image for '{slug}':")
            print(f"  - {avif_path}")
            
        else:
            print(f"Error: Unknown image type '{img_type}'. Must be 'hero' or 'body'.")
            sys.exit(1)
            
    finally:
        # Cleanup temporary files
        if os.path.exists(temp_png):
            os.remove(temp_png)

if __name__ == "__main__":
    main()
