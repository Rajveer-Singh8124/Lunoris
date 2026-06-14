import fs from 'fs';
import path from 'path';

const imgDir = './src/assets/img';
const chainsDir = './src/assets/img/eyeglass chains';
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

const chainMetadata = {
  "Eyeglass-Chain-Glasses-Strap-Cords-Sunglass-Holder.webp": {
    name: "Lunoris Premium Leather Strap",
    description: "Handcrafted leather glasses cord designed for durability and refined accessory style.",
    materials: ["Full Grain Leather", "Brass Loop Ends"],
    features: ["Adjustable loop grips", "Soft neck-friendly strap", "Durable stitching"],
    price: 450,
    dimensions: "70cm length",
    weight: "15g"
  },
  "Screenshot_12-6-2026_192125_www.meesho.com.jpeg": {
    name: "Lunoris Classic Link Chain",
    description: "Sleek and delicate metal link eyeglass chain designed for daily elegance.",
    materials: ["Polished Alloy", "Silicone Grips"],
    features: ["Universal rubber fit", "Lightweight feel", "Tarnish resistant"],
    price: 499,
    dimensions: "72cm length",
    weight: "18g"
  },
  "Screenshot_12-6-2026_192243_www.meesho.com.jpeg": {
    name: "Lunoris Soft Weave Cord",
    description: "Vibrant and robust braided cotton glasses cord with adjustable non-slip locks.",
    materials: ["Braided Cotton Thread", "Brass Sleeves"],
    features: ["Soft and washable", "Adjustable tension sliders", "Secures sports and fashion glasses"],
    price: 399,
    dimensions: "75cm length",
    weight: "12g"
  },
  "Screenshot_12-6-2026_192336_www.meesho.com.jpeg": {
    name: "Lunoris Luxe Beaded Holder",
    description: "Premium beaded sunglass strap adding a elegant jewelry accent to your visionwear.",
    materials: ["Natural Glass Beads", "Gold-plated Accents"],
    features: ["Double-reinforced thread", "Non-slip silicon loops", "Drapes elegantly as a necklace"],
    price: 599,
    dimensions: "68cm length",
    weight: "25g"
  }
};

try {
  // 1. Read root img folder for main case/accessory products
  const files = fs.readdirSync(imgDir);
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
  const caseImages = files.filter(file => {
    const fullPath = path.join(imgDir, file);
    const isFile = fs.statSync(fullPath).isFile();
    return isFile && imageExtensions.includes(path.extname(file).toLowerCase());
  });

  console.log(`Found ${caseImages.length} case images in ${imgDir}.`);

  let productList = [];
  let productIndex = 1;
  let importsList = [];

  // Process case products
  caseImages.forEach((filename, index) => {
    const categories = Object.keys(types);
    const category = categories[index % categories.length];
    const namePrefix = names[index % names.length];
    const categoryName = types[category];
    const name = `Lunoris ${namePrefix} ${categoryName}`;
    const desc = descriptions[index % descriptions.length];
    const mats = [
      materials[index % materials.length],
      materials[(index + 2) % materials.length]
    ];
    const features = featuresList[index % featuresList.length];
    const price = 450 + (index % 10) * 150;

    const varName = `case_img_${index}`;
    importsList.push(`import ${varName} from '../assets/img/${filename}';`);

    productList.push({
      id: `p-${productIndex++}`,
      name,
      category,
      categoryLabel: categoryName,
      image: `__IMG_VAR_${varName}__`,
      price,
      description: desc,
      materials: mats,
      features,
      dimensions: `${15 + (index % 3)}cm x ${6 + (index % 2)}cm x ${4 + (index % 2)}cm`,
      weight: `${80 + (index % 5) * 15}g`
    });
  });

  // 2. Read eyeglass chains folder for chain-strap products
  if (fs.existsSync(chainsDir)) {
    const chainFiles = fs.readdirSync(chainsDir);
    const chainImages = chainFiles.filter(file => {
      const fullPath = path.join(chainsDir, file);
      const isFile = fs.statSync(fullPath).isFile();
      return isFile && imageExtensions.includes(path.extname(file).toLowerCase());
    });

    console.log(`Found ${chainImages.length} chain images in ${chainsDir}.`);

    chainImages.forEach((filename, index) => {
      // Check if we have defined metadata for this file, else generate dynamically
      const meta = chainMetadata[filename] || {
        name: `Lunoris ${names[(index + 5) % names.length]} Eyeglass Chain`,
        description: "Artisan glasses strap crafted with premium styling to keep your eyewear secure.",
        materials: ["Vegan Leather", "Silicone Grips"],
        features: ["Adjustable loop ends", "Lightweight design"],
        price: 399 + (index % 5) * 100,
        dimensions: "72cm length",
        weight: "15g"
      };

      const varName = `chain_img_${index}`;
      importsList.push(`import ${varName} from '../assets/img/eyeglass chains/${filename}';`);

      productList.push({
        id: `p-${productIndex++}`,
        name: meta.name,
        category: "chain-strap",
        categoryLabel: "Chains & Straps",
        image: `__IMG_VAR_${varName}__`,
        price: meta.price,
        description: meta.description,
        materials: meta.materials,
        features: meta.features,
        dimensions: meta.dimensions,
        weight: meta.weight
      });
    });
  }

  // 3. Write generated file content
  let codeContent = `// Automatically generated product data
${importsList.join('\n')}

export const products = ${JSON.stringify(productList, null, 2)};
`;

  codeContent = codeContent.replace(/"__IMG_VAR_(.*?)__"/g, '$1');

  const dir = path.dirname(outputFile);
  if (!fs.existsSync(dir)){
      fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(outputFile, codeContent, 'utf8');
  console.log(`Successfully generated ${outputFile} with ${productList.length} products.`);

} catch (err) {
  console.error("Error generating products:", err);
  process.exit(1);
}
