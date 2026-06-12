import fs from 'fs';
import path from 'path';

const imgDir = './img';
const outputFile = './src/data/products.js';

const names = [
  "Astra", "Solis", "Nova", "Orion", "Lyra", "Vela", "Cygnus", "Taurus", 
  "Gemini", "Polaris", "Sirius", "Vega", "Altair", "Capella", "Castor", 
  "Pollux", "Rigel", "Betelgeuse", "Procyon", "Arcturus", "Spica", "Antares", 
  "Fomalhaut", "Regulus", "Aldebaran", "Deneb", "Acrux", "Castella", "Luna",
  "Zenith", "Apex", "Aero", "Somna", "Equinox", "Solstice", "Eclipse"
];

const types = {
  "flat-case": "Flat Case",
  "pocket-case": "Pocket Case",
  "hard-case": "Hard Case",
  "display-tray": "Display & Counter Tray",
  "accessory": "Selvet & Accessory"
};

const materials = [
  "Vegan Leather", "Microfiber Velvet", "Wood Finish Accents", "Premium Suede",
  "Full Grain Leather", "Crush-Resistant Shell", "Matte Finish Leather", "Treated Canvas"
];

const descriptions = [
  "Meticulously crafted with a sleek profile and refined stitching, perfect for everyday sophistication.",
  "Engineered for optimal protection with an organic lining that cushions and guards your delicate frames.",
  "A contemporary take on traditional luxury eyewear protection, blending utility with quiet luxury.",
  "Constructed from premium textured materials for ultimate tactile satisfaction and durability.",
  "Designed for effortless mobility, fitting comfortably in any bag or pocket while maintaining rigid protection.",
  "Features a soft microfiber interior and secure ambient closure to keep lenses clean and scratch-free."
];

const featuresList = [
  ["Reinforced core", "Ambient magnetic closure", "Sleek pocket profile"],
  ["Plush velvet lining", "Anti-scratch pocket", "Minimalist envelope shape"],
  ["Crush-proof structure", "Dust-proof seal", "Ergonomic leather grip"],
  ["High-visibility slots", "Stackable structure", "Velveteen dividers"],
  ["Ultra-soft microfiber", "Static-free cleaning", "Compact packaging"]
];

fs.readdir(imgDir, (err, files) => {
  if (err) {
    console.error("Error reading directory:", err);
    process.exit(1);
  }

  // Filter image files
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
  const images = files.filter(file => imageExtensions.includes(path.extname(file).toLowerCase()));

  console.log(`Found ${images.length} images.`);

  const products = images.map((filename, index) => {
    // Determine a category based on index
    const categories = Object.keys(types);
    const category = categories[index % categories.length];
    
    // Select name and details
    const namePrefix = names[index % names.length];
    const categoryName = types[category];
    const name = `Lunoris ${namePrefix} ${categoryName}`;
    
    const desc = descriptions[index % descriptions.length];
    
    // Choose 2-3 materials
    const mats = [
      materials[index % materials.length],
      materials[(index + 2) % materials.length]
    ];
    
    // Select features
    const features = featuresList[index % featuresList.length];

    // Assign custom dimensions and pricing
    const price = 450 + (index % 10) * 150; // Mock price in INR or $
    
    return {
      id: `p-${index + 1}`,
      name,
      category,
      categoryLabel: categoryName,
      image: `/img/${filename}`,
      price,
      description: desc,
      materials: mats,
      features,
      dimensions: `${15 + (index % 3)}cm x ${6 + (index % 2)}cm x ${4 + (index % 2)}cm`,
      weight: `${80 + (index % 5) * 15}g`
    };
  });

  // Write file content
  const codeContent = `// Automatically generated product data
export const products = ${JSON.stringify(products, null, 2)};
`;

  // Ensure directories exist
  const dir = path.dirname(outputFile);
  if (!fs.existsSync(dir)){
      fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFile(outputFile, codeContent, 'utf8', (err) => {
    if (err) {
      console.error("Error writing file:", err);
      process.exit(1);
    }
    console.log("Successfully generated src/data/products.js");
  });
});
