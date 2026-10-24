import os
from PIL import Image, ImageOps, ImageDraw

def create_single_squircle_frame(size=(1024, 1024)):
    """Draws a single, delicate grey squircle frame matching Ethan's exact border."""
    tw, th = size
    scale = 4
    sw, sh = tw * scale, th * scale
    
    hi_res = Image.new("L", (sw, sh), 0)
    draw = ImageDraw.Draw(hi_res)
    
    margin = 0.08
    x0, y0 = int(sw * margin), int(sh * margin)
    x1, y1 = int(sw * (1 - margin)), int(sh * (1 - margin))
    box_w = x1 - x0
    r = int(box_w * 0.225)
    
    # 45 opacity produces the exact subtle light grey tone on white and black backgrounds
    draw.rounded_rectangle((x0, y0, x1, y1), radius=r, outline=45, width=int(sw * 0.0028))
    return hi_res.resize(size, Image.Resampling.LANCZOS)

def extract_uncut_symbol(filename):
    """Extracts the entire symbol artwork without clipping arrows or dots."""
    img = Image.open(filename)
    w, h = img.size

    # 1. Jyanipur & Three Pillars (Transparent PNGs)
    if filename in ["jyanipur.png", "threepillars.png"]:
        bg_white = Image.new("RGBA", (w, h), (255, 255, 255, 255))
        if img.mode == 'RGBA':
            bg_white.paste(img, (0, 0), img)
        else:
            bg_white.paste(img, (0, 0))
        gray = bg_white.convert("L")
        return ImageOps.invert(gray).point(lambda p: 255 if p > 35 else 0)

    # 2. Grid, FirstFeedback, ZX (Gentle border trim that keeps artwork intact)
    elif filename in ["grid.png", "firstfeedback.png", "zx.png"]:
        gray = img.convert("L")
        mask = gray.point(lambda p: 0 if p < 25 else min(255, int(p * 1.5)))
        px = mask.load()
        trim_top = int(h * 0.09)
        trim_side = int(w * 0.08)
        trim_bot = int(h * 0.08)
        for y in range(h):
            for x in range(w):
                if y < trim_top or y > (h - trim_bot) or x < trim_side or x > (w - trim_side):
                    px[x, y] = 0
        return mask

    # 3. Empty OS (Clears out right-edge boundary artifact for true centering)
    elif filename == "empty.png":
        gray = img.convert("L")
        mask = gray.point(lambda p: 255 if p > 35 else 0)
        px = mask.load()
        right_artifact_margin = int(w * 0.90)
        for y in range(h):
            for x in range(w):
                if x > right_artifact_margin or x < int(w * 0.05):
                    px[x, y] = 0
        return mask

    # 4. Ethan (Concentric rings + its own native single squircle)
    elif filename == "Ethan.png":
        gray = img.convert("L")
        return gray.point(lambda p: 0 if p < 18 else min(255, int(p * 1.5)))

    else:
        gray = img.convert("L")
        return gray.point(lambda p: 255 if p > 40 else 0)

def build_assets():
    target_size = (1024, 1024)
    tw, th = target_size
    frame = create_single_squircle_frame(target_size)

    all_logos = [
        "jyanipur.png", 
        "threepillars.png", 
        "grid.png", 
        "firstfeedback.png", 
        "zx.png", 
        "Ethan.png", 
        "empty.png"
    ]

    for filename in all_logos:
        if not os.path.exists(filename):
            print(f"⚠️ Could not find {filename}")
            continue

        name, _ = os.path.splitext(filename)

        # ETHAN: Already has its own squircle; do not add a duplicate frame
        if filename == "Ethan.png":
            ethan_mask = extract_uncut_symbol(filename)
            final_mask = ethan_mask.resize(target_size, Image.Resampling.LANCZOS)

        else:
            symbol = extract_uncut_symbol(filename)
            bbox = symbol.getbbox()

            if bbox:
                cropped = symbol.crop(bbox)
                bw, bh = cropped.size

                # Proportion each symbol cleanly inside the squircle frame
                if filename in ["jyanipur.png", "threepillars.png", "grid.png", "firstfeedback.png", "zx.png"]:
                    max_dim = int(tw * 0.52)
                elif filename == "empty.png":
                    max_dim = int(tw * 0.56)

                scale_factor = max_dim / max(bw, bh)
                nw, nh = int(bw * scale_factor), int(bh * scale_factor)
                resized = cropped.resize((nw, nh), Image.Resampling.LANCZOS)

                # Center the symbol on the canvas
                canvas = Image.new("L", target_size, 0)
                canvas.paste(resized, ((tw - nw) // 2, (th - nh) // 2))

                # Combine the centered symbol with the squircle frame for all 6 logos
                final_mask = Image.new("L", target_size, 0)
                final_px = final_mask.load()
                c_px = canvas.load()
                f_px = frame.load()
                for y in range(th):
                    for x in range(tw):
                        if c_px[x, y] > 0:
                            final_px[x, y] = c_px[x, y]
                        elif f_px[x, y] > 0:
                            final_px[x, y] = f_px[x, y]
            else:
                final_mask = symbol.resize(target_size)

        # 1. Pure transparent BLACK logo (default)
        black_img = Image.new("RGBA", target_size, color=(0, 0, 0, 255))
        black_img.putalpha(final_mask)
        black_img.save(f"{name}_black.png")

        # 2. Pure transparent WHITE logo (hover)
        white_img = Image.new("RGBA", target_size, color=(255, 255, 255, 255))
        white_img.putalpha(final_mask)
        white_img.save(f"{name}_white.png")

        print(f"✅ Generated {name}_black.png & {name}_white.png with grey squircle frame")

    print("\nAll 7 logos generated with matching squircle frames and centered symbols.")

build_assets()