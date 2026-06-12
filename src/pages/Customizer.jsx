import React, { useState, useRef } from 'react';

// Premium Palette
const precuratedColors = [
  { name: 'Rich Tan', hex: '#7c5730', class: 'bg-[#7c5730]' },
  { name: 'Deep Navy', hex: '#162839', class: 'bg-[#162839]' },
  { name: 'Burgundy', hex: '#581825', class: 'bg-[#581825]' },
  { name: 'Forest Green', hex: '#1b3f27', class: 'bg-[#1b3f27]' },
  { name: 'Slate Grey', hex: '#4a5568', class: 'bg-[#4a5568]' },
  { name: 'Obsidian Black', hex: '#1a1a1a', class: 'bg-[#1a1a1a]' }
];

const interiorColors = [
  { name: 'Cream Velvet', hex: '#fdf6e2', class: 'bg-[#fdf6e2]' },
  { name: 'Amber Gold', hex: '#d4af37', class: 'bg-[#d4af37]' },
  { name: 'Midnight Blue', hex: '#0f172a', class: 'bg-[#0f172a]' },
  { name: 'Emerald Green', hex: '#064e3b', class: 'bg-[#064e3b]' },
  { name: 'Charcoal Grey', hex: '#334155', class: 'bg-[#334155]' }
];

const caseStyles = [
  { id: 'flat', name: 'Lunoris Flat Case', basePrice: 1200, desc: 'Sleek, folding structure for pocket efficiency.' },
  { id: 'hard', name: 'Lunoris Hard Case', basePrice: 1500, desc: 'Robust crush-proof protective capsule.' },
  { id: 'pocket', name: 'Lunoris Pocket Case', basePrice: 1350, desc: 'Minimalist wrap style with envelope closure.' },
  { id: 'tray', name: 'Lunoris Display Tray', basePrice: 1800, desc: 'Luxury desk tray divided for multiple frames.' },
  { id: 'chain', name: 'Lunoris Chain & Strap', basePrice: 650, desc: 'Premium leather glasses cord with metal loop ends.' }
];

const textures = [
  { id: 'smooth', label: 'Smooth Grain Leather', price: 0, desc: 'Sleek, classic, and premium hand-feel.' },
  { id: 'pebbled', label: 'Pebbled Leather', price: 150, desc: 'Textured surface, high scratch resistance.' },
  { id: 'saffiano', label: 'Saffiano Cross-Grain', price: 200, desc: 'Hardwearing diagonal hatching.' },
  { id: 'suede', label: 'Brushed Suede', price: 250, desc: 'Rich, soft napped velvety exterior.' }
];

const metalFinishes = [
  { id: 'gold', label: 'Polished Gold', hex: '#d4af37' },
  { id: 'silver', label: 'Brushed Silver', hex: '#cbd5e1' },
  { id: 'gunmetal', label: 'Obsidian Gunmetal', hex: '#334155' }
];

const stampTypes = [
  { id: 'gold', label: 'Gold Foil Stamping', price: 100 },
  { id: 'silver', label: 'Silver Foil Stamping', price: 100 },
  { id: 'blind', label: 'Blind Debossing', price: 50 }
];

const fontStyles = [
  { id: 'serif', label: 'Elegant Serif (Georgia)', style: 'font-serif' },
  { id: 'sans', label: 'Modern Sans (Manrope)', style: 'font-sans' },
  { id: 'script', label: 'Bespoke Script (Playfair Italic)', style: 'italic font-serif' }
];

export default function Customizer() {
  // Configurator States
  const [selectedStyle, setSelectedStyle] = useState(caseStyles[0]);
  const [exteriorColor, setExteriorColor] = useState(precuratedColors[0].hex);
  const [customExterior, setCustomExterior] = useState(false);
  const [selectedTexture, setSelectedTexture] = useState(textures[0]);
  
  const [selectedInteriorColor, setSelectedInteriorColor] = useState(interiorColors[0].hex);
  const [selectedInteriorType, setSelectedInteriorType] = useState('Velvet');

  const [selectedMetal, setSelectedMetal] = useState(metalFinishes[0]);
  
  const [monogram, setMonogram] = useState('');
  const [selectedStamp, setSelectedStamp] = useState(stampTypes[0]);
  const [selectedFont, setSelectedFont] = useState(fontStyles[0]);

  const [customRequest, setCustomRequest] = useState('');
  const [attachedLogoName, setAttachedLogoName] = useState('');
  const [attachedLogoUrl, setAttachedLogoUrl] = useState('');

  const [isOpenState, setIsOpenState] = useState(false); // Open vs Closed toggle

  const fileInputRef = useRef(null);

  // File Upload Helper
  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAttachedLogoName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        setAttachedLogoUrl(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClearLogo = () => {
    setAttachedLogoName('');
    setAttachedLogoUrl('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Pricing Calculation
  const calculateTotal = () => {
    let total = selectedStyle.basePrice;
    total += selectedTexture.price;
    if (monogram.trim().length > 0) {
      total += selectedStamp.price;
    }
    if (attachedLogoName) {
      total += 300; // Custom logo setup charge
    }
    return total;
  };

  // WhatsApp Message Generator
  const handleOrderSubmit = (e) => {
    e.preventDefault();

    const secureRef = `BESPOKE-${selectedStyle.id.toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const total = calculateTotal();

    const message = 
      `*New Bespoke Custom Design Order - Lunoris*\n` +
      `*Order Reference:* ${secureRef}\n` +
      `*Silhouette Style:* ${selectedStyle.name}\n\n` +
      `*Exterior Specifications:*\n` +
      `- Color: ${exteriorColor} (${customExterior ? 'Custom HEX Pick' : precuratedColors.find(c => c.hex === exteriorColor)?.name || 'Custom Color'})\n` +
      `- Texture & Leather: ${selectedTexture.label}\n\n` +
      `*Interior Lining (N/A for Straps):*\n` +
      `- Material: ${selectedInteriorType}\n` +
      `- Color: ${selectedInteriorColor} (${interiorColors.find(c => c.hex === selectedInteriorColor)?.name || 'Bespoke Color'})\n\n` +
      `*Hardware Finish:* ${selectedMetal.label}\n\n` +
      `*Monogram Personalization:*\n` +
      `- Initials: ${monogram.trim() ? `"${monogram.trim()}"` : 'None'}\n` +
      `- Method: ${monogram.trim() ? selectedStamp.label : 'N/A'}\n` +
      `- Style: ${monogram.trim() ? selectedFont.label : 'N/A'}\n\n` +
      `*Bespoke Notes / Logo:*\n` +
      `- Attached Logo: ${attachedLogoName ? `Yes (${attachedLogoName})` : 'No'}\n` +
      `- Custom Requests: ${customRequest.trim() ? customRequest.trim() : 'None'}\n\n` +
      `*Estimated Price:* ₹${total.toLocaleString('en-IN')}\n\n` +
      `Please contact me to review design render and finalize order details.`;

    const whatsappUrl = `https://wa.me/917734010101?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  // Render SVG Vector Dynamic Preview
  const renderSvgPreview = () => {
    const extColor = exteriorColor;
    const intColor = selectedInteriorColor;

    // Stamp Fill Color
    let stampFill = '#000000';
    if (selectedStamp.id === 'gold') stampFill = 'url(#gold-stamp)';
    else if (selectedStamp.id === 'silver') stampFill = 'url(#silver-stamp)';
    else stampFill = 'rgba(0,0,0,0.3)';

    // Font family mapping
    let fontFam = 'Noto Serif, serif';
    if (selectedFont.id === 'sans') fontFam = 'Manrope, sans-serif';
    else if (selectedFont.id === 'script') fontFam = 'Georgia, serif';

    // SVG Defs
    const svgDefs = (
      <defs>
        {/* Gradients */}
        <linearGradient id="gold-stamp" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#d4af37" />
          <stop offset="50%" stopColor="#f3e5ab" />
          <stop offset="100%" stopColor="#aa7c11" />
        </linearGradient>
        <linearGradient id="silver-stamp" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#94a3b8" />
          <stop offset="50%" stopColor="#f1f5f9" />
          <stop offset="100%" stopColor="#475569" />
        </linearGradient>
        <linearGradient id="gold-metal" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fdf0cd" />
          <stop offset="50%" stopColor="#d4af37" />
          <stop offset="100%" stopColor="#8a6f27" />
        </linearGradient>
        <linearGradient id="silver-metal" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f8fafc" />
          <stop offset="50%" stopColor="#cbd5e1" />
          <stop offset="100%" stopColor="#64748b" />
        </linearGradient>
        <linearGradient id="gunmetal-metal" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#64748b" />
          <stop offset="50%" stopColor="#334155" />
          <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>

        {/* Shadows */}
        <filter id="preview-shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="12" stdDeviation="16" floodColor="#1e293b" floodOpacity="0.12" />
        </filter>
        <filter id="emboss-effect" x="-10%" y="-10%" width="120%" height="120%">
          <feOffset dx="0.5" dy="0.5" />
          <feGaussianBlur stdDeviation="0.5" result="offset-blur"/>
          <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse"/>
          <feFlood floodColor="black" floodOpacity="0.6" result="color"/>
          <feComposite operator="in" in="color" in2="inverse" result="shadow"/>
          <feComposite operator="over" in="SourceGraphic" in2="shadow"/>
        </filter>

        {/* Textures */}
        <pattern id="pebbled-texture" width="12" height="12" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="0.8" fill="#000000" opacity="0.08" />
          <circle cx="8" cy="7" r="1.1" fill="#000000" opacity="0.08" />
          <circle cx="4" cy="9" r="0.6" fill="#000000" opacity="0.05" />
          <circle cx="10" cy="3" r="0.9" fill="#000000" opacity="0.06" />
        </pattern>

        <pattern id="saffiano-texture" width="8" height="8" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="8" y2="8" stroke="#000000" strokeWidth="0.8" opacity="0.09" />
          <line x1="8" y1="0" x2="0" y2="8" stroke="#000000" strokeWidth="0.8" opacity="0.09" />
        </pattern>

        <pattern id="suede-texture" width="40" height="40" patternUnits="userSpaceOnUse">
          <rect width="40" height="40" fill="none" />
          <circle cx="20" cy="20" r="18" fill="#ffffff" opacity="0.04" filter="blur(3px)" />
          <circle cx="5" cy="5" r="4" fill="#000000" opacity="0.03" filter="blur(2px)" />
        </pattern>
      </defs>
    );

    // Textures Overlays matching State
    const getTextureOverlay = (targetId) => {
      if (selectedTexture.id === 'smooth') return null;
      return (
        <rect 
          width="100%" 
          height="100%" 
          fill={`url(#${selectedTexture.id}-texture)`} 
          style={{ mixBlendMode: 'multiply', clipPath: `url(#${targetId})` }} 
          pointerEvents="none"
        />
      );
    };

    // Rendering shapes according to selection
    if (selectedStyle.id === 'flat') {
      return (
        <svg viewBox="0 0 400 400" className="w-full h-full max-h-[350px] md:max-h-[420px] transition-all duration-500" filter="url(#preview-shadow)">
          {svgDefs}
          
          {/* Clip paths for texture binding */}
          <clipPath id="flat-exterior-clip">
            <rect x="50" y="110" width="300" height="180" rx="16" />
          </clipPath>
          <clipPath id="flat-flap-clip">
            <path d="M 50 110 L 50 170 Q 200 240 350 170 L 350 110 Z" />
          </clipPath>
          <clipPath id="flat-pocket-clip">
            <rect x="50" y="180" width="300" height="120" rx="12" />
          </clipPath>
          <clipPath id="flat-open-flap-clip">
            <path d="M 50 150 L 50 60 Q 200 -10 350 60 L 350 150 Z" />
          </clipPath>

          {/* Render Case */}
          {!isOpenState ? (
            /* CLOSED VIEW */
            <g className="animate-fadeIn">
              {/* Outer Shell */}
              <rect x="50" y="110" width="300" height="180" rx="16" fill={extColor} />
              {getTextureOverlay('flat-exterior-clip')}

              {/* Stitching */}
              <rect x="56" y="116" width="288" height="168" rx="12" fill="none" stroke="rgba(255,255,255,0.2)" strokeDasharray="5,4" strokeWidth="1.2" />
              <rect x="56" y="116" width="288" height="168" rx="12" fill="none" stroke="rgba(0,0,0,0.15)" strokeDasharray="5,4" strokeWidth="1.2" style={{ mixBlendMode: 'multiply' }} />

              {/* Front flap shadow */}
              <path d="M 50 174 Q 200 244 350 174" fill="none" stroke="rgba(0,0,0,0.25)" strokeWidth="6" opacity="0.3" filter="blur(4px)" />

              {/* Front Flap */}
              <path d="M 50 110 L 50 170 Q 200 240 350 170 L 350 110 Z" fill={extColor} />
              {getTextureOverlay('flat-flap-clip')}

              {/* Stitching Flap */}
              <path d="M 56 110 L 56 164 Q 200 230 344 164 L 344 110" fill="none" stroke="rgba(255,255,255,0.2)" strokeDasharray="5,4" strokeWidth="1.2" />
              <path d="M 56 110 L 56 164 Q 200 230 344 164 L 344 110" fill="none" stroke="rgba(0,0,0,0.15)" strokeDasharray="5,4" strokeWidth="1.2" style={{ mixBlendMode: 'multiply' }} />

              {/* Snap Button */}
              <circle cx="200" cy="180" r="14" fill={`url(#${selectedMetal.id}-metal)`} stroke="rgba(0,0,0,0.15)" strokeWidth="1" />
              <circle cx="200" cy="180" r="8" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />

              {/* Monogram */}
              {monogram.trim() && (
                <text 
                  x="200" 
                  y="245" 
                  textAnchor="middle" 
                  fill={stampFill} 
                  style={{ fontFamily: fontFam, letterSpacing: '0.15em', fontSize: '20px', fontWeight: 'bold' }}
                  filter={selectedStamp.id === 'blind' ? 'url(#emboss-effect)' : undefined}
                >
                  {monogram.trim().toUpperCase()}
                </text>
              )}

              {/* Attached Logo Rendering */}
              {attachedLogoUrl && (
                <image 
                  href={attachedLogoUrl} 
                  x="160" 
                  y="125" 
                  width="80" 
                  height="30" 
                  preserveAspectRatio="xMidYMid meet"
                  opacity="0.85"
                />
              )}
            </g>
          ) : (
            /* OPEN VIEW */
            <g className="animate-fadeIn">
              {/* Back Shell (Interior Velvet) */}
              <rect x="50" y="110" width="300" height="180" rx="16" fill={intColor} />
              
              {/* Velvet Interior Texture Overlay */}
              <rect x="50" y="110" width="300" height="180" rx="16" fill="url(#suede-texture)" opacity="0.25" style={{ mixBlendMode: 'multiply' }} />

              {/* Eyewear Temples (Mockup inside) */}
              <path d="M 80 150 Q 200 130 320 150 M 95 165 Q 200 145 305 165" fill="none" stroke="#2c3e50" strokeWidth="6" opacity="0.35" strokeLinecap="round" />
              <path d="M 100 140 C 130 110, 270 110, 300 140" fill="none" stroke="#e2e8f0" strokeWidth="8" opacity="0.6" strokeLinecap="round" />

              {/* Opened Flap pointing upwards */}
              <path d="M 50 110 L 50 30 Q 200 -30 350 30 L 350 110 Z" fill={extColor} />
              {getTextureOverlay('flat-open-flap-clip')}
              
              {/* Opened Flap Lining Backing */}
              <path d="M 50 110 L 50 30 Q 200 -30 350 30 L 350 110 Z" fill={intColor} opacity="0.1" />

              {/* Stitching Flap Upward */}
              <path d="M 56 110 L 56 36 Q 200 -20 344 36 L 344 110" fill="none" stroke="rgba(255,255,255,0.2)" strokeDasharray="5,4" strokeWidth="1.2" />

              {/* Backside snap button on upper flap */}
              <circle cx="200" cy="45" r="10" fill={`url(#${selectedMetal.id}-metal)`} opacity="0.9" />

              {/* Front Lower Pocket */}
              <rect x="50" y="180" width="300" height="110" rx="12" fill={extColor} />
              {getTextureOverlay('flat-pocket-clip')}
              <rect x="56" y="186" width="288" height="98" rx="8" fill="none" stroke="rgba(255,255,255,0.2)" strokeDasharray="5,4" strokeWidth="1.2" />

              {/* Front Snap Receiver */}
              <circle cx="200" cy="210" r="12" fill={`url(#${selectedMetal.id}-metal)`} stroke="rgba(0,0,0,0.15)" strokeWidth="1" />
              <circle cx="200" cy="210" r="6" fill="#1e293b" />

              {/* Monogram on Pocket */}
              {monogram.trim() && (
                <text 
                  x="200" 
                  y="255" 
                  textAnchor="middle" 
                  fill={stampFill} 
                  style={{ fontFamily: fontFam, letterSpacing: '0.15em', fontSize: '18px', fontWeight: 'bold' }}
                  filter={selectedStamp.id === 'blind' ? 'url(#emboss-effect)' : undefined}
                >
                  {monogram.trim().toUpperCase()}
                </text>
              )}
            </g>
          )}
        </svg>
      );
    }

    if (selectedStyle.id === 'hard') {
      return (
        <svg viewBox="0 0 400 400" className="w-full h-full max-h-[350px] md:max-h-[420px] transition-all duration-500" filter="url(#preview-shadow)">
          {svgDefs}
          
          <clipPath id="hard-exterior-clip">
            <rect x="65" y="100" width="270" height="200" rx="48" />
          </clipPath>
          <clipPath id="hard-upper-clip">
            <path d="M 65 100 H 335 V 200 H 65 Z" />
          </clipPath>
          <clipPath id="hard-lower-clip">
            <path d="M 65 200 H 335 V 300 H 65 Z" />
          </clipPath>

          {!isOpenState ? (
            /* CLOSED VIEW */
            <g className="animate-fadeIn">
              {/* Capsule Main Body */}
              <rect x="65" y="100" width="270" height="200" rx="48" fill={extColor} />
              {getTextureOverlay('hard-exterior-clip')}

              {/* Premium Leather Stitch Border Top and Bottom */}
              <rect x="71" y="106" width="258" height="188" rx="42" fill="none" stroke="rgba(255,255,255,0.2)" strokeDasharray="5,4" strokeWidth="1.2" />
              <rect x="71" y="106" width="258" height="188" rx="42" fill="none" stroke="rgba(0,0,0,0.15)" strokeDasharray="5,4" strokeWidth="1.2" style={{ mixBlendMode: 'multiply' }} />

              {/* Seam line */}
              <line x1="65" y1="200" x2="335" y2="200" stroke="rgba(0,0,0,0.3)" strokeWidth="2.5" />
              <line x1="65" y1="201" x2="335" y2="201" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />

              {/* Center Metal Buckle/Clasp */}
              <rect x="180" y="186" width="40" height="28" rx="4" fill={`url(#${selectedMetal.id}-metal)`} stroke="rgba(0,0,0,0.2)" strokeWidth="1" />
              <circle cx="200" cy="200" r="5" fill="rgba(0,0,0,0.2)" />

              {/* Monogram */}
              {monogram.trim() && (
                <text 
                  x="200" 
                  y="160" 
                  textAnchor="middle" 
                  fill={stampFill} 
                  style={{ fontFamily: fontFam, letterSpacing: '0.15em', fontSize: '20px', fontWeight: 'bold' }}
                  filter={selectedStamp.id === 'blind' ? 'url(#emboss-effect)' : undefined}
                >
                  {monogram.trim().toUpperCase()}
                </text>
              )}

              {/* Logo */}
              {attachedLogoUrl && (
                <image 
                  href={attachedLogoUrl} 
                  x="160" 
                  y="235" 
                  width="80" 
                  height="30" 
                  preserveAspectRatio="xMidYMid meet"
                  opacity="0.8"
                />
              )}
            </g>
          ) : (
            /* OPEN VIEW */
            <g className="animate-fadeIn">
              {/* Upper Shell Tilted Open */}
              <path d="M 65 150 C 65 90, 335 90, 335 150 Z" fill={extColor} />
              
              {/* Upper Shell Interior Lining */}
              <path d="M 72 150 C 72 98, 328 98, 328 150 Z" fill={intColor} />
              <path d="M 72 150 C 72 98, 328 98, 328 150 Z" fill="url(#suede-texture)" opacity="0.2" style={{ mixBlendMode: 'multiply' }} />

              {/* Glasses Inside */}
              <circle cx="150" cy="180" r="35" fill="none" stroke="#2c3e50" strokeWidth="8" opacity="0.3" />
              <circle cx="250" cy="180" r="35" fill="none" stroke="#2c3e50" strokeWidth="8" opacity="0.3" />
              <path d="M 185 180 Q 200 170 215 180" fill="none" stroke="#2c3e50" strokeWidth="8" opacity="0.3" />

              {/* Lower Shell (Facing Front) */}
              <rect x="65" y="200" width="270" height="100" rx="20" fill={extColor} />
              <rect x="65" y="200" width="270" height="100" rx="20" fill={`url(#${selectedTexture.id}-texture)`} style={{ mixBlendMode: 'multiply' }} />
              
              {/* Lower Shell Interior Rim */}
              <rect x="73" y="204" width="254" height="92" rx="16" fill={intColor} />
              <rect x="73" y="204" width="254" height="92" rx="16" fill="url(#suede-texture)" opacity="0.25" style={{ mixBlendMode: 'multiply' }} />

              {/* Lower Clasp receiver */}
              <rect x="188" y="200" width="24" height="16" rx="2" fill={`url(#${selectedMetal.id}-metal)`} />

              {/* Monogram inside Rim */}
              {monogram.trim() && (
                <text 
                  x="200" 
                  y="260" 
                  textAnchor="middle" 
                  fill={stampFill} 
                  style={{ fontFamily: fontFam, letterSpacing: '0.12em', fontSize: '18px', fontWeight: 'bold' }}
                  filter={selectedStamp.id === 'blind' ? 'url(#emboss-effect)' : undefined}
                >
                  {monogram.trim().toUpperCase()}
                </text>
              )}
            </g>
          )}
        </svg>
      );
    }

    if (selectedStyle.id === 'pocket') {
      return (
        <svg viewBox="0 0 400 400" className="w-full h-full max-h-[350px] md:max-h-[420px] transition-all duration-500" filter="url(#preview-shadow)">
          {svgDefs}
          
          <clipPath id="pocket-exterior-clip">
            <path d="M 60 110 H 340 V 290 H 60 Z" />
          </clipPath>
          <clipPath id="pocket-flap-clip">
            <path d="M 60 110 L 220 230 L 340 110 Z" />
          </clipPath>

          {!isOpenState ? (
            /* CLOSED VIEW */
            <g className="animate-fadeIn">
              {/* Main Wrap Pouch */}
              <rect x="60" y="110" width="280" height="180" rx="24" fill={extColor} />
              {getTextureOverlay('pocket-exterior-clip')}

              {/* Stitching */}
              <rect x="66" y="116" width="268" height="168" rx="18" fill="none" stroke="rgba(255,255,255,0.2)" strokeDasharray="5,4" strokeWidth="1.2" />
              <rect x="66" y="116" width="268" height="168" rx="18" fill="none" stroke="rgba(0,0,0,0.15)" strokeDasharray="5,4" strokeWidth="1.2" style={{ mixBlendMode: 'multiply' }} />

              {/* Triangular Flap */}
              <path d="M 60 110 L 220 230 L 340 110 Z" fill={extColor} filter="url(#emboss-effect)" />
              {getTextureOverlay('pocket-flap-clip')}

              {/* Flap stitching */}
              <path d="M 66 110 L 220 222 L 334 110" fill="none" stroke="rgba(255,255,255,0.25)" strokeDasharray="5,4" strokeWidth="1.2" />

              {/* Closure Strap / Metal Emblem */}
              <circle cx="220" cy="220" r="10" fill={`url(#${selectedMetal.id}-metal)`} stroke="rgba(0,0,0,0.2)" strokeWidth="1" />
              <circle cx="220" cy="220" r="4" fill="rgba(0,0,0,0.3)" />

              {/* Monogram on bottom left */}
              {monogram.trim() && (
                <text 
                  x="120" 
                  y="260" 
                  textAnchor="middle" 
                  fill={stampFill} 
                  style={{ fontFamily: fontFam, letterSpacing: '0.12em', fontSize: '18px', fontWeight: 'bold' }}
                  filter={selectedStamp.id === 'blind' ? 'url(#emboss-effect)' : undefined}
                >
                  {monogram.trim().toUpperCase()}
                </text>
              )}

              {/* Attached Logo */}
              {attachedLogoUrl && (
                <image 
                  href={attachedLogoUrl} 
                  x="230" 
                  y="240" 
                  width="70" 
                  height="25" 
                  preserveAspectRatio="xMidYMid meet"
                  opacity="0.8"
                />
              )}
            </g>
          ) : (
            /* OPEN VIEW */
            <g className="animate-fadeIn">
              {/* Back Flat Panel (Lining Interior) */}
              <rect x="60" y="110" width="280" height="180" rx="24" fill={intColor} />
              <rect x="60" y="110" width="280" height="180" rx="24" fill="url(#suede-texture)" opacity="0.25" style={{ mixBlendMode: 'multiply' }} />

              {/* Flaps unfolded sideways (showing lining backing) */}
              <path d="M 60 110 L 10 160 L 60 210 Z" fill={intColor} opacity="0.9" />
              <path d="M 340 110 L 390 160 L 340 210 Z" fill={intColor} opacity="0.9" />

              {/* Eyewear sitting in pouch */}
              <rect x="110" y="150" width="180" height="70" rx="8" fill="rgba(0,0,0,0.08)" stroke="rgba(0,0,0,0.2)" strokeWidth="1.5" />
              <path d="M 120 185 C 140 155, 260 155, 280 185" fill="none" stroke="#2c3e50" strokeWidth="6" opacity="0.25" />

              {/* Front Lower Flap Folded Down */}
              <path d="M 60 230 L 220 340 L 340 230 Z" fill={extColor} />
              
              {/* Lower flap stitching */}
              <path d="M 66 230 L 220 330 L 334 230" fill="none" stroke="rgba(255,255,255,0.2)" strokeDasharray="4,3" />

              {/* Metal Clasp receiver on lower flap */}
              <circle cx="220" cy="315" r="8" fill={`url(#${selectedMetal.id}-metal)`} />

              {/* Monogram inside back lining */}
              {monogram.trim() && (
                <text 
                  x="200" 
                  y="140" 
                  textAnchor="middle" 
                  fill={stampFill} 
                  style={{ fontFamily: fontFam, letterSpacing: '0.12em', fontSize: '18px', fontWeight: 'bold' }}
                  filter={selectedStamp.id === 'blind' ? 'url(#emboss-effect)' : undefined}
                >
                  {monogram.trim().toUpperCase()}
                </text>
              )}
            </g>
          )}
        </svg>
      );
    }

    if (selectedStyle.id === 'tray') {
      return (
        <svg viewBox="0 0 400 400" className="w-full h-full max-h-[350px] md:max-h-[420px] transition-all duration-500" filter="url(#preview-shadow)">
          {svgDefs}
          
          <clipPath id="tray-exterior-clip">
            <rect x="40" y="80" width="320" height="240" rx="12" />
          </clipPath>

          {/* DISPLAY TRAY (One View only) */}
          <g className="animate-fadeIn">
            {/* Tray Outer Box */}
            <rect x="40" y="80" width="320" height="240" rx="12" fill={extColor} stroke="rgba(0,0,0,0.15)" strokeWidth="2.5" />
            {getTextureOverlay('tray-exterior-clip')}

            {/* Tray Outer Stitching */}
            <rect x="46" y="86" width="308" height="228" rx="8" fill="none" stroke="rgba(255,255,255,0.25)" strokeDasharray="4,3" strokeWidth="1.2" />

            {/* Tray Inner Base Lining (Velvet) */}
            <rect x="54" y="94" width="292" height="212" rx="6" fill={intColor} />
            <rect x="54" y="94" width="292" height="212" rx="6" fill="url(#suede-texture)" opacity="0.3" style={{ mixBlendMode: 'multiply' }} />

            {/* Dividers (Made of Exterior leather style) */}
            <line x1="150" y1="94" x2="150" y2="306" stroke={extColor} strokeWidth="6" />
            <line x1="250" y1="94" x2="250" y2="306" stroke={extColor} strokeWidth="6" />

            {/* Divider shadow overlays */}
            <line x1="150" y1="94" x2="150" y2="306" stroke="rgba(0,0,0,0.15)" strokeWidth="6" style={{ mixBlendMode: 'multiply' }} />
            <line x1="250" y1="94" x2="250" y2="306" stroke="rgba(0,0,0,0.15)" strokeWidth="6" style={{ mixBlendMode: 'multiply' }} />

            {/* Eyewear Mockup silhouettes sitting inside divisions */}
            {!isOpenState ? (
              // Labeled: Showing glasses inside
              <g opacity="0.4">
                {/* Frame 1 */}
                <rect x="70" y="140" width="60" height="30" rx="4" fill="none" stroke="#1e293b" strokeWidth="3" />
                <rect x="70" y="190" width="60" height="30" rx="4" fill="none" stroke="#1e293b" strokeWidth="3" />
                {/* Frame 2 */}
                <rect x="170" y="120" width="60" height="30" rx="4" fill="none" stroke="#1e293b" strokeWidth="3" />
                <rect x="170" y="170" width="60" height="30" rx="4" fill="none" stroke="#1e293b" strokeWidth="3" />
                {/* Frame 3 */}
                <rect x="270" y="150" width="60" height="30" rx="4" fill="none" stroke="#1e293b" strokeWidth="3" />
              </g>
            ) : (
              // Empty tray view
              <g opacity="0.1">
                <text x="200" y="200" textAnchor="middle" fill="#000" className="text-xs uppercase tracking-widest">Atelier Tray</text>
              </g>
            )}

            {/* Metal Emblem / Logo Plate on bottom leather rim */}
            <rect x="170" y="284" width="60" height="16" rx="2" fill={`url(#${selectedMetal.id}-metal)`} stroke="rgba(0,0,0,0.15)" strokeWidth="1" />
            <text x="200" y="295" textAnchor="middle" fill="rgba(0,0,0,0.6)" style={{ fontSize: '8px', fontWeight: 'bold', letterSpacing: '0.05em' }}>LUNORIS</text>

            {/* Monogram on bottom right of the tray edge */}
            {monogram.trim() && (
              <text 
                x="300" 
                y="296" 
                textAnchor="middle" 
                fill={stampFill} 
                style={{ fontFamily: fontFam, letterSpacing: '0.1em', fontSize: '13px', fontWeight: 'bold' }}
                filter={selectedStamp.id === 'blind' ? 'url(#emboss-effect)' : undefined}
              >
                {monogram.trim().toUpperCase()}
              </text>
            )}
          </g>
        </svg>
      );
    }

    if (selectedStyle.id === 'chain') {
      return (
        <svg viewBox="0 0 400 400" className="w-full h-full max-h-[350px] md:max-h-[420px] transition-all duration-500" filter="url(#preview-shadow)">
          {svgDefs}
          
          <clipPath id="chain-strap-clip">
            <path d="M 80 80 Q 200 370 320 80 M 90 80 Q 200 360 310 80" />
          </clipPath>

          {/* EYEGLASS STRAP / CHAIN PREVIEW */}
          <g className="animate-fadeIn">
            {/* Background mockup representing eyeglass frames sitting inside strap loop if closed */}
            {!isOpenState ? (
              <g opacity="0.45" className="animate-fadeIn">
                {/* Elegant Eyeglasses resting at bottom */}
                <circle cx="160" cy="220" r="24" fill="none" stroke="#2c3e50" strokeWidth="6" />
                <circle cx="240" cy="220" r="24" fill="none" stroke="#2c3e50" strokeWidth="6" />
                <path d="M 184 220 Q 200 210 216 220" fill="none" stroke="#2c3e50" strokeWidth="6" />
                {/* Temples extending back to strap connectors */}
                <path d="M 136 215 C 120 200, 100 130, 85 90" fill="none" stroke="#2c3e50" strokeWidth="4" />
                <path d="M 264 215 C 280 200, 300 130, 315 90" fill="none" stroke="#2c3e50" strokeWidth="4" />
              </g>
            ) : (
              // Empty Display Mode (no frames shown)
              <g opacity="0.1" className="animate-fadeIn">
                <text x="200" y="170" textAnchor="middle" fill="#000" className="text-[10px] uppercase tracking-widest">Atelier Strap</text>
              </g>
            )}

            {/* Draped Strap Cord */}
            <path 
              d="M 80 80 Q 200 370 320 80" 
              fill="none" 
              stroke={extColor} 
              strokeWidth="9" 
              strokeLinecap="round" 
            />
            {/* Texture overlay on strap */}
            {selectedTexture.id !== 'smooth' && (
              <path 
                d="M 80 80 Q 200 370 320 80" 
                fill="none" 
                stroke={`url(#${selectedTexture.id}-texture)`} 
                strokeWidth="9" 
                strokeLinecap="round" 
                style={{ mixBlendMode: 'multiply' }}
              />
            )}

            {/* Fine Stitching along Cord */}
            <path 
              d="M 80 80 Q 200 370 320 80" 
              fill="none" 
              stroke="rgba(255,255,255,0.25)" 
              strokeWidth="1.2" 
              strokeDasharray="4,3" 
              strokeLinecap="round" 
            />
            <path 
              d="M 80 80 Q 200 370 320 80" 
              fill="none" 
              stroke="rgba(0,0,0,0.15)" 
              strokeWidth="1.2" 
              strokeDasharray="4,3" 
              strokeLinecap="round" 
              style={{ mixBlendMode: 'multiply' }}
            />

            {/* Metal End Connectors (Left / Right) */}
            <rect x="76" y="65" width="8" height="20" rx="2" fill={`url(#${selectedMetal.id}-metal)`} stroke="rgba(0,0,0,0.15)" />
            <circle cx="80" cy="85" r="5" fill={`url(#${selectedMetal.id}-metal)`} />
            <rect x="316" y="65" width="8" height="20" rx="2" fill={`url(#${selectedMetal.id}-metal)`} stroke="rgba(0,0,0,0.15)" />
            <circle cx="320" cy="85" r="5" fill={`url(#${selectedMetal.id}-metal)`} />

            {/* Silicon Loop ends for holding glasses temples */}
            <ellipse cx="80" cy="55" rx="4" ry="10" fill="none" stroke="#1e293b" strokeWidth="2.5" />
            <ellipse cx="320" cy="55" rx="4" ry="10" fill="none" stroke="#1e293b" strokeWidth="2.5" />
            {/* Adjuster slider beads */}
            <circle cx="80" cy="62" r="4.5" fill={`url(#${selectedMetal.id}-metal)`} />
            <circle cx="320" cy="62" r="4.5" fill={`url(#${selectedMetal.id}-metal)`} />

            {/* Hanging Custom Leather Monogram Tag */}
            <g transform="rotate(-10, 200, 280)">
              {/* Tag Leather Body */}
              <rect x="175" y="275" width="50" height="26" rx="4" fill={extColor} stroke="rgba(0,0,0,0.1)" strokeWidth="1" filter="url(#emboss-effect)" />
              {selectedTexture.id !== 'smooth' && (
                <rect x="175" y="275" width="50" height="26" rx="4" fill={`url(#${selectedTexture.id}-texture)`} style={{ mixBlendMode: 'multiply' }} />
              )}
              {/* Stitching */}
              <rect x="179" y="279" width="42" height="18" rx="2" fill="none" stroke="rgba(255,255,255,0.2)" strokeDasharray="2,2" />

              {/* Tag Hanging Hole & Metal ring */}
              <circle cx="182" cy="288" r="3" fill="#1e293b" />
              <circle cx="182" cy="288" r="2.5" fill="none" stroke={`url(#${selectedMetal.id}-metal)`} strokeWidth="1" />
              <line x1="182" y1="288" x2="182" y2="270" stroke={`url(#${selectedMetal.id}-metal)`} strokeWidth="1.5" />

              {/* Monogram Text on tag */}
              {monogram.trim() && (
                <text 
                  x="203" 
                  y="292" 
                  textAnchor="middle" 
                  fill={stampFill} 
                  style={{ fontFamily: fontFam, fontSize: '10px', fontWeight: 'bold', letterSpacing: '0.05em' }}
                >
                  {monogram.trim().toUpperCase()}
                </text>
              )}
            </g>

            {/* Attached Logo (drawn in center) */}
            {attachedLogoUrl && (
              <image 
                href={attachedLogoUrl} 
                x="165" 
                y="140" 
                width="70" 
                height="24" 
                preserveAspectRatio="xMidYMid meet"
                opacity="0.8"
              />
            )}
          </g>
        </svg>
      );
    }
  };

  return (
    <div className="min-h-screen bg-background text-on-background py-10 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
      {/* Page Header */}
      <header className="mb-12 text-center max-w-3xl mx-auto">
        <span className="font-label-md text-label-md text-secondary uppercase tracking-widest mb-4 block">Bespoke Custom Studio</span>
        <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary mb-4">
          The Atelier Lunoris
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant">
          Create a personalized masterpiece. Configure custom colors, materials, linings, metal hardware finishes, and foil-stamped monograms down to every luxury detail.
        </p>
      </header>

      {/* Main Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-24">
        
        {/* LEFT COLUMN: Visual Preview (Sticky on desktop) */}
        <div className="lg:col-span-5 lg:sticky lg:top-24 flex flex-col items-center gap-6">
          <div className="w-full aspect-square bg-white border border-surface-variant/45 rounded-xl shadow-ambient flex flex-col items-center justify-center p-6 relative overflow-hidden group">
            {/* Ambient visual background glow */}
            <div className="absolute inset-0 bg-pattern opacity-60"></div>
            <div className="absolute top-0 right-0 w-48 h-48 bg-secondary/5 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3"></div>

            {/* View Open/Closed toggle */}
            {selectedStyle.id !== 'tray' && (
              <button 
                onClick={() => setIsOpenState(!isOpenState)}
                className="absolute top-4 left-4 z-20 bg-surface-container-low hover:bg-surface-variant text-primary border border-surface-variant/60 font-label-md text-[11px] uppercase tracking-widest px-4 py-2 rounded-lg transition-colors flex items-center gap-2 shadow-sm"
              >
                <span className="material-symbols-outlined text-sm">
                  {isOpenState ? 'lock' : 'lock_open'}
                </span>
                {selectedStyle.id === 'chain' 
                  ? (isOpenState ? 'Attach Glasses' : 'View Chain Only') 
                  : (isOpenState ? 'View Closed' : 'View Interior')
                }
              </button>
            )}

            {/* Interactive Preview Element */}
            <div className="relative z-10 w-full flex items-center justify-center">
              {renderSvgPreview()}
            </div>

            {/* Live Stats Overlay */}
            <div className="absolute bottom-4 left-4 right-4 z-10 flex justify-between items-end border-t border-surface-variant/40 pt-3 text-[11px] uppercase tracking-widest text-outline">
              <div>
                <span className="block text-secondary font-semibold">{selectedStyle.name}</span>
                <span>{selectedTexture.label}</span>
              </div>
              <div className="text-right">
                <span className="block text-primary font-bold text-sm">₹{calculateTotal().toLocaleString('en-IN')}</span>
                <span>GST Inc.</span>
              </div>
            </div>
          </div>

          <div className="text-center font-body-md text-xs text-on-surface-variant max-w-sm flex items-center gap-2 justify-center">
            <span className="material-symbols-outlined text-secondary text-sm">info</span>
            Real-time interactive render. Handcrafted variations may occur.
          </div>
        </div>

        {/* RIGHT COLUMN: Configurator Options Panel */}
        <div className="lg:col-span-7 bg-white border border-surface-variant/30 rounded-xl shadow-ambient p-8 md:p-10 space-y-10">
          
          {/* STEP 1: Silhouette Case Shape */}
          <section className="space-y-4">
            <h3 className="font-headline-md text-lg text-primary border-b border-surface-variant/40 pb-2 flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-semibold text-xs">1</span>
              Select Silhouette Case Style
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {caseStyles.map((style) => (
                <button
                  key={style.id}
                  onClick={() => {
                    setSelectedStyle(style);
                    setIsOpenState(false); // Reset to closed view when switching styles
                  }}
                  className={`p-5 rounded-lg border text-left transition-all duration-300 ${
                    selectedStyle.id === style.id
                      ? 'border-secondary bg-surface-container-low shadow-sm'
                      : 'border-surface-variant/50 hover:border-secondary'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-headline-md text-sm text-primary font-semibold">{style.name}</span>
                    <span className="font-label-md text-xs text-secondary">₹{style.basePrice}</span>
                  </div>
                  <p className="font-body-md text-xs text-on-surface-variant">{style.desc}</p>
                </button>
              ))}
            </div>
          </section>

          {/* STEP 2: Leather Texture & Finish */}
          <section className="space-y-4">
            <h3 className="font-headline-md text-lg text-primary border-b border-surface-variant/40 pb-2 flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-semibold text-xs">2</span>
              Exterior Material &amp; Texture
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {textures.map((texture) => (
                <button
                  key={texture.id}
                  onClick={() => setSelectedTexture(texture)}
                  className={`p-5 rounded-lg border text-left transition-all duration-300 ${
                    selectedTexture.id === texture.id
                      ? 'border-secondary bg-surface-container-low shadow-sm'
                      : 'border-surface-variant/50 hover:border-secondary'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-headline-md text-sm text-primary font-semibold">{texture.label}</span>
                    {texture.price > 0 && <span className="font-label-md text-xs text-secondary">+₹{texture.price}</span>}
                  </div>
                  <p className="font-body-md text-xs text-on-surface-variant">{texture.desc}</p>
                </button>
              ))}
            </div>
          </section>

          {/* STEP 3: Exterior Color (Curated & Custom Color Picker) */}
          <section className="space-y-4">
            <h3 className="font-headline-md text-lg text-primary border-b border-surface-variant/40 pb-2 flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-semibold text-xs">3</span>
              Exterior Leather Color
            </h3>
            <div className="space-y-4">
              {/* Precurated Swatches */}
              <div>
                <span className="font-label-md text-xs text-on-surface-variant uppercase tracking-wider block mb-3">Pre-Curated Luxury Palette</span>
                <div className="flex flex-wrap gap-4">
                  {precuratedColors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => {
                        setExteriorColor(color.hex);
                        setCustomExterior(false);
                      }}
                      className={`w-12 h-12 rounded-full border-2 transition-transform ${
                        exteriorColor === color.hex && !customExterior
                          ? 'border-secondary scale-110 shadow-sm'
                          : 'border-surface-variant/40 hover:scale-105'
                      } ${color.class}`}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              {/* Custom Color Selector */}
              <div className="pt-2 border-t border-dashed border-surface-variant/40">
                <span className="font-label-md text-xs text-on-surface-variant uppercase tracking-wider block mb-3">Design Service Custom Color</span>
                <div className="flex items-center gap-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border border-surface-variant">
                    <input 
                      type="color" 
                      value={exteriorColor}
                      onChange={(e) => {
                        setExteriorColor(e.target.value);
                        setCustomExterior(true);
                      }}
                      className="absolute inset-0 w-full h-full cursor-pointer p-0 border-none scale-150"
                    />
                  </div>
                  <div>
                    <span className="font-headline-md text-sm text-primary font-semibold block">Pick Bespoke Color</span>
                    <span className="font-body-md text-xs text-on-surface-variant opacity-80">HEX Code: <span className="font-mono font-bold text-secondary uppercase">{exteriorColor}</span></span>
                  </div>
                  {customExterior && (
                    <span className="ml-auto bg-secondary-container/20 text-secondary border border-secondary-container/50 font-label-md text-[10px] px-2.5 py-1 rounded uppercase tracking-widest animate-fadeIn">
                      Custom Active
                    </span>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* STEP 4: Velvet Lining Interior */}
          {selectedStyle.id !== 'chain' && (
            <section className="space-y-4 animate-fadeIn">
              <h3 className="font-headline-md text-lg text-primary border-b border-surface-variant/40 pb-2 flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-semibold text-xs">4</span>
                Interior Lining &amp; Color
              </h3>
              <div className="space-y-6">
                {/* Material choice */}
                <div>
                  <span className="font-label-md text-xs text-on-surface-variant uppercase tracking-wider block mb-3">Lining Fabric</span>
                  <div className="flex gap-3">
                    {['Velvet Cloth', 'Microfiber Suede', 'Smooth Satin'].map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setSelectedInteriorType(type)}
                        className={`px-4 py-2 border rounded font-label-md text-xs uppercase tracking-widest transition-all ${
                          selectedInteriorType === type
                            ? 'border-secondary bg-surface-container-low text-secondary'
                            : 'border-surface-variant/60 hover:border-secondary'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Lining Color swatches */}
                <div>
                  <span className="font-label-md text-xs text-on-surface-variant uppercase tracking-wider block mb-3">Interior Lining Color</span>
                  <div className="flex flex-wrap gap-4">
                    {interiorColors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => {
                          setSelectedInteriorColor(color.hex);
                          // Open view to show interior color immediately (unless Display Tray)
                          if (selectedStyle.id !== 'tray') setIsOpenState(true);
                        }}
                        className={`w-12 h-12 rounded-full border-2 transition-transform ${
                          selectedInteriorColor === color.hex
                            ? 'border-secondary scale-110 shadow-sm'
                            : 'border-surface-variant/40 hover:scale-105'
                        } ${color.class}`}
                        title={color.name}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* STEP 5: Monogram debossing */}
          <section className="space-y-4">
            <h3 className="font-headline-md text-lg text-primary border-b border-surface-variant/40 pb-2 flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-semibold text-xs">
                {selectedStyle.id === 'chain' ? '4' : '5'}
              </span>
              Luxury Monogram Personalization
            </h3>
            <div className="space-y-6">
              {/* Monogram input */}
              <div className="relative group">
                <input 
                  type="text"
                  maxLength="4"
                  value={monogram}
                  onChange={(e) => {
                    setMonogram(e.target.value);
                    if (selectedStyle.id !== 'tray' && selectedStyle.id !== 'chain') setIsOpenState(false); // Switch to closed view so they see monogram on exterior
                  }}
                  className="form-input w-full font-body-md text-body-md text-primary placeholder-transparent peer border-b border-surface-variant focus:border-secondary" 
                  placeholder="Initials (e.g. A.K.)" 
                  id="monogramInput"
                />
                <label 
                  htmlFor="monogramInput"
                  className="absolute left-0 -top-3.5 text-[11px] text-outline transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-on-surface-variant/65 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-secondary peer-focus:text-[11px] font-label-md uppercase tracking-wider"
                >
                  Initials (Up to 4 characters)
                </label>
              </div>

              {/* Stamping options */}
              {monogram.trim().length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 animate-fadeIn">
                  {/* Stamping Style */}
                  <div className="space-y-2">
                    <span className="font-label-md text-xs text-on-surface-variant uppercase tracking-wider">Foil / Debossing Finish</span>
                    <div className="space-y-2">
                      {stampTypes.map((stamp) => (
                        <label key={stamp.id} className="flex items-center gap-3 font-body-md text-sm text-primary cursor-pointer select-none">
                          <input 
                            type="radio" 
                            name="stampType"
                            checked={selectedStamp.id === stamp.id}
                            onChange={() => setSelectedStamp(stamp)}
                            className="w-4 h-4 accent-secondary"
                          />
                          <span>{stamp.label} (+₹{stamp.price})</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Stamping Font */}
                  <div className="space-y-2">
                    <span className="font-label-md text-xs text-on-surface-variant uppercase tracking-wider">Font Family Style</span>
                    <div className="space-y-2">
                      {fontStyles.map((font) => (
                        <label key={font.id} className="flex items-center gap-3 font-body-md text-sm text-primary cursor-pointer select-none">
                          <input 
                            type="radio" 
                            name="fontStyle"
                            checked={selectedFont.id === font.id}
                            onChange={() => setSelectedFont(font)}
                            className="w-4 h-4 accent-secondary"
                          />
                          <span className={font.style}>{font.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* STEP 6: Metal clasp hardware */}
          <section className="space-y-4">
            <h3 className="font-headline-md text-lg text-primary border-b border-surface-variant/40 pb-2 flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-semibold text-xs">
                {selectedStyle.id === 'chain' ? '5' : '6'}
              </span>
              Closing Metal Hardware / Connector Finish
            </h3>
            <div className="flex gap-4">
              {metalFinishes.map((metal) => (
                <button
                  key={metal.id}
                  onClick={() => setSelectedMetal(metal)}
                  className={`p-4 rounded-lg border text-left transition-all duration-300 flex items-center gap-3 ${
                    selectedMetal.id === metal.id
                      ? 'border-secondary bg-surface-container-low shadow-sm'
                      : 'border-surface-variant/50 hover:border-secondary'
                  }`}
                >
                  <span className="w-5 h-5 rounded-full border border-surface-variant shadow-inner" style={{ backgroundColor: metal.hex }} />
                  <span className="font-headline-md text-xs text-primary font-semibold">{metal.label}</span>
                </button>
              ))}
            </div>
          </section>

          {/* STEP 7: Logo & custom requests */}
          <section className="space-y-4">
            <h3 className="font-headline-md text-lg text-primary border-b border-surface-variant/40 pb-2 flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-semibold text-xs">
                {selectedStyle.id === 'chain' ? '6' : '7'}
              </span>
              Upload Logo &amp; Special Instructions
            </h3>
            <div className="space-y-4">
              {/* Logo Uploader */}
              <div className="border border-dashed border-surface-variant rounded-lg p-5 text-center bg-surface-container-lowest relative">
                <input 
                  type="file" 
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden" 
                  id="logo-upload-input"
                />
                
                {attachedLogoName ? (
                  <div className="flex flex-col items-center gap-2 animate-fadeIn">
                    <span className="material-symbols-outlined text-emerald-600 text-3xl">check_circle</span>
                    <div>
                      <span className="font-headline-md text-sm text-primary font-semibold block">{attachedLogoName}</span>
                      <span className="font-body-md text-xs text-on-surface-variant">Logo design added to customizer request (+₹300 Setup Fee)</span>
                    </div>
                    <button 
                      type="button"
                      onClick={handleClearLogo}
                      className="mt-2 text-xs font-semibold text-red-600 hover:text-red-700 underline uppercase tracking-wider"
                    >
                      Remove Logo
                    </button>
                  </div>
                ) : (
                  <label htmlFor="logo-upload-input" className="cursor-pointer flex flex-col items-center gap-2 group-hover:scale-105 transition-transform duration-300">
                    <span className="material-symbols-outlined text-outline text-3xl">cloud_upload</span>
                    <span className="font-headline-md text-sm text-primary font-semibold block">Upload Custom Emblem / Logo</span>
                    <span className="font-body-md text-xs text-on-surface-variant">PNG, JPG formats. Visualized live in render window.</span>
                  </label>
                )}
              </div>

              {/* Special details */}
              <div className="relative group">
                <textarea 
                  value={customRequest}
                  onChange={(e) => setCustomRequest(e.target.value)}
                  rows="3"
                  className="form-input w-full font-body-md text-body-md text-primary placeholder-transparent peer resize-none border-b border-surface-variant focus:border-secondary" 
                  placeholder="Describe your design patterns, stitch color preferences, or other styling details"
                  id="customDetails"
                />
                <label 
                  htmlFor="customDetails"
                  className="absolute left-0 -top-3.5 text-[11px] text-outline transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-on-surface-variant/65 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-secondary peer-focus:text-[11px] font-label-md uppercase tracking-wider"
                >
                  Describe custom details (e.g. cord length, custom stitch pattern...)
                </label>
              </div>
            </div>
          </section>

          {/* Checkout & Submit Section */}
          <div className="pt-8 border-t border-surface-variant">
            <div className="bg-surface-container-low border border-surface-variant/50 rounded-lg p-5 mb-6">
              <h4 className="font-headline-md text-sm text-primary mb-3 uppercase tracking-wider font-semibold">Pricing &amp; Bespoke Summary</h4>
              <div className="space-y-2 font-body-md text-sm text-on-surface-variant">
                <div className="flex justify-between">
                  <span>Base Style Price:</span>
                  <span>₹{selectedStyle.basePrice}</span>
                </div>
                {selectedTexture.price > 0 && (
                  <div className="flex justify-between">
                    <span>{selectedTexture.label}:</span>
                    <span>+₹{selectedTexture.price}</span>
                  </div>
                )}
                {monogram.trim().length > 0 && (
                  <div className="flex justify-between">
                    <span>Initials Stamping ({selectedStamp.label}):</span>
                    <span>+₹{selectedStamp.price}</span>
                  </div>
                )}
                {attachedLogoName && (
                  <div className="flex justify-between">
                    <span>Emblem Layout &amp; Setup Charge:</span>
                    <span>+₹300</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-primary border-t border-surface-variant/50 pt-2.5 mt-2">
                  <span>Estimated Custom Cost:</span>
                  <span className="text-secondary text-lg">₹{calculateTotal().toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            {/* Direct Send Buttons */}
            <form onSubmit={handleOrderSubmit}>
              <button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-label-md text-label-md uppercase tracking-widest rounded py-4.5 w-full text-center transition-all duration-300 shadow-ambient flex items-center justify-center gap-3 font-semibold hover:-translate-y-0.5"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.73-1.455L0 24zm6.59-4.846c1.6.95 3.32 1.45 5.093 1.45 5.568 0 10.103-4.532 10.106-10.104.002-2.701-1.047-5.24-2.952-7.147C16.988 1.446 14.454.398 11.75.398c-5.58 0-10.116 4.534-10.12 10.107-.001 1.776.467 3.51 1.353 5.046L2.01 21.993l6.637-1.739-.399.248zm12.39-7.142c-.3-.15-1.77-.874-2.042-.973-.272-.099-.47-.149-.667.15-.197.299-.766.973-.938 1.171-.173.199-.347.223-.647.074-.3-.15-1.267-.467-2.413-1.488-.892-.796-1.493-1.78-1.668-2.079-.175-.3-.019-.462.131-.61.135-.133.3-.347.45-.52.15-.173.2-.297.3-.495.1-.198.05-.371-.025-.52-.075-.149-.667-1.609-.914-2.203-.24-.58-.485-.502-.667-.512-.172-.008-.37-.01-.567-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.77-.724 2.016-1.424.247-.699.247-1.299.172-1.424-.075-.124-.272-.198-.57-.347z" />
              </svg>
              <span>Submit Design render to WhatsApp</span>
            </button>
          </form>
        </div>

      </div>
    </div>
  </div>
);
}
