// One-off import for the homepage redesign: takes the full-resolution photography in
// Images-adv/ and produces the 4K hero slides, the Tomorrowland banner and the cropped
// "Why travel with us" card photos under public/images/**.
// Run with `node scripts/import-hero-photos.mjs`. Source folders are kept in place.
import { mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, "..");
const srcRoot = path.join(rootDir, "Images-adv");
const imagesRoot = path.join(rootDir, "public", "images");

// Hero slides — international only, in display order. Output is 3840x2160 (4K UHD).
// Portrait sources need a 16:9 slice; `top` (0 = top edge, 1 = bottom edge) picks where that
// slice sits vertically, overriding the attention-based crop where it chooses badly.
const heroSlides = [
  { src: "Destination/tomorrowland/pexels-toon-38637962.jpg" },
  { src: "Destination/Paris/pexels-dusan-stupar-477352248-30797339.jpg", top: 0.75 },
  { src: "Destination/USA/pexels-luana-scorsoni-2154631905-33448109.jpg" },
  { src: "Destination/tomorrowland/pexels-jack-davis-86003658-12995432.jpg" },
  { src: "Destination/Singapore/pexels-realcereal-15480459.jpg" },
  { src: "Destination/USA/pexels-matteo-roman-1151921619-29580357.jpg", top: 0.3 },
  { src: "Destination/Thailand/pexels-dushenkovsky-4100135.jpg" },
  { src: "Destination/South Africa/pexels-kelly-33622074.jpg" },
];

// "Why travel with us" source artwork has the title and icon printed on its left side, so
// only the photographic right-hand part is kept (the site renders its own text beside it).
const whyImages = {
  "based-in-jodhpur": "Why Travel with us/Based in jodhpur.png",
  "domestic-international": "Why Travel with us/Domestic & International Travel Team.png",
  "built-to-budget": "Why Travel with us/Built to Your Budget.png",
  "travel-assistance": "Why Travel with us/Travel Assistance at Your Fingertips.png",
};
// Fraction of the source width (from the left) that holds the printed text.
const WHY_TEXT_FRACTION = 0.56;

// "What we do" card photos, keyed by service slug (lib/data/services.ts). Services/ holds
// free-licence Unsplash photos (unsplash.com/photos/<id>, id in the filename):
// IQKuHc2lils hotel, 7FvdDlRBp3g couple, vIluu0IH6Ps group, sjG8lBBlXv4 corporate,
// mHusyBu4bxM support. `crop` = { left, top, width, height } as fractions of the source,
// for sources (the Why-us artwork) where only part of the frame fits.
const serviceImages = {
  "customized-tour-packages": { src: "Destination/Mauritus/pexels-vince-34732320.jpg" },
  "domestic-international-holidays": {
    src: "Why Travel with us/Domestic & International Travel Team.png",
    crop: { left: 0.56, top: 0, width: 0.44, height: 0.62 },
  },
  "hotel-bookings": { src: "Services/unsplash-IQKuHc2lils-hotel.jpg" },
  "transportation-private-vehicles": {
    src: "Why Travel with us/Based in jodhpur.png",
    crop: { left: 0.48, top: 0.55, width: 0.52, height: 0.45 },
  },
  "sightseeing-activities": { src: "Destination/Thailand/pexels-dushenkovsky-4100135.jpg" },
  "family-couple-holidays": { src: "Services/unsplash-7FvdDlRBp3g-couple.jpg" },
  "group-tours": { src: "Services/unsplash-vIluu0IH6Ps-group.jpg" },
  "corporate-mice-travel": { src: "Services/unsplash-sjG8lBBlXv4-corporate.jpg" },
  "complete-travel-assistance": { src: "Services/unsplash-mHusyBu4bxM-support.jpg" },
};

async function writeJpeg(pipeline, destPath, quality) {
  mkdirSync(path.dirname(destPath), { recursive: true });
  await pipeline.jpeg({ quality, mozjpeg: true }).toFile(destPath);
  const { width, height } = await sharp(destPath).metadata();
  console.log(`${path.relative(rootDir, destPath).padEnd(48)} ${width}x${height}`);
}

async function run() {
  for (let i = 0; i < heroSlides.length; i++) {
    const { src, top } = heroSlides[i];
    let pipeline = sharp(path.join(srcRoot, src)).rotate();
    if (top !== undefined) {
      const { width, height } = await sharp(path.join(srcRoot, src)).metadata();
      const sliceHeight = Math.round((width * 9) / 16);
      pipeline = pipeline.extract({ left: 0, top: Math.round((height - sliceHeight) * top), width, height: sliceHeight });
    }
    await writeJpeg(
      pipeline.resize(3840, 2160, { fit: "cover", position: "attention" }),
      path.join(imagesRoot, "hero", `${i + 1}.jpg`),
      82
    );
  }

  // Tomorrowland destination cover doubles as the destination page banner, so it is
  // exported larger than the 1200x800 used for other destinations.
  await writeJpeg(
    sharp(path.join(srcRoot, "Destination/tomorrowland/pexels-toon-38637962.jpg"))
      .rotate()
      .resize(2400, 1600, { fit: "cover", position: "attention" }),
    path.join(imagesRoot, "destinations", "tomorrowland.jpg"),
    82
  );

  for (const [slug, src] of Object.entries(whyImages)) {
    const abs = path.join(srcRoot, src);
    const { width, height } = await sharp(abs).metadata();
    const left = Math.round(width * WHY_TEXT_FRACTION);
    await writeJpeg(
      sharp(abs)
        .extract({ left, top: 0, width: width - left, height })
        .resize(800, 1000, { fit: "cover", position: "attention" }),
      path.join(imagesRoot, "why", `${slug}.jpg`),
      85
    );
    // Full native-resolution crop (no upscaling) for the large panels on /why-adventophile.
    await writeJpeg(
      sharp(abs).extract({ left, top: 0, width: width - left, height }),
      path.join(imagesRoot, "why", "large", `${slug}.jpg`),
      88
    );
  }

  for (const [slug, { src, crop }] of Object.entries(serviceImages)) {
    const abs = path.join(srcRoot, src);
    let pipeline = sharp(abs).rotate();
    if (crop) {
      const { width, height } = await sharp(abs).metadata();
      pipeline = pipeline.extract({
        left: Math.round(width * crop.left),
        top: Math.round(height * crop.top),
        width: Math.round(width * crop.width),
        height: Math.round(height * crop.height),
      });
    }
    await writeJpeg(
      pipeline.resize(1200, 900, { fit: "cover", position: "attention" }),
      path.join(imagesRoot, "services", `${slug}.jpg`),
      82
    );
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
