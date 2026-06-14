import React, { useState } from 'react';
import chainImg1 from '../assets/img/eyeglass chains/Eyeglass-Chain-Glasses-Strap-Cords-Sunglass-Holder.webp';
import chainImg2 from '../assets/img/eyeglass chains/Screenshot_12-6-2026_192125_www.meesho.com.jpeg';
import chainImg3 from '../assets/img/eyeglass chains/Screenshot_12-6-2026_192243_www.meesho.com.jpeg';
import chainImg4 from '../assets/img/eyeglass chains/Screenshot_12-6-2026_192336_www.meesho.com.jpeg';

export default function Home({ setCurrentPage, navigateToCollections }) {
  const chainImages = [
    chainImg1,
    chainImg2,
    chainImg3,
    chainImg4
  ];
  const [activeChainImg, setActiveChainImg] = useState(chainImages[0]);
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center px-margin-mobile md:px-margin-desktop py-24 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            alt="Lunoris Hero Banner"
            className="w-full h-full object-cover object-center opacity-90 scale-105"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-V7Quz8PzC9DtBEN8D2RyAtHTVeBlBerBq4EUU0-JJOEeJKrahAkT2cKA6oQ7I2TLnQXDtM-1YuHCCv2izXda1wh1_Z6kn3NLx9VWJOxm2dadztdMy-u9xiTjgYyuny14-MJVLwbAwd0T6Wv0W6ggMxIGokW5orWdgjUpeswPL6MZFpmKkwd4C34CsNfPwu43DWqrsvqKpaMplpHgfg7rF-GMpxZiMHqR8X7MQC6YVgA35qoD0R5cntMpnqx9L830eVV-1TE8p505"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-container-max mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-gutter items-center">
          <div className="md:col-span-7 lg:col-span-6 flex flex-col gap-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-surface-container-low rounded-lg w-fit border border-surface-variant shadow-sm">
              <span className="w-2 h-2 rounded-full bg-secondary"></span>
              <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest">Artisan Crafted</span>
            </div>
            <h1 className="font-display-lg text-display-lg text-primary leading-tight">
              Elevate Your <br />
              <span className="text-secondary italic">Perspective.</span>
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-lg">
              Premium protection for discerning visionaries. Manufacturing high-end Sunglass Cases, Display Trays, Counter Trays, and microfiber Selvet Cloths.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a
                onClick={(e) => { e.preventDefault(); navigateToCollections('all'); }}
                className="inline-flex items-center justify-center px-8 py-4 bg-primary-container text-on-primary font-label-md text-label-md uppercase tracking-widest rounded transition-all duration-300 hover:bg-tertiary hover:-translate-y-1 shadow-ambient cursor-pointer"
                href="#collections"
              >
                Explore Collection
              </a>
              <a
                onClick={(e) => { e.preventDefault(); setCurrentPage('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="inline-flex items-center justify-center px-8 py-4 border-[1.5px] border-secondary text-secondary font-label-md text-label-md uppercase tracking-widest rounded transition-all duration-300 hover:bg-secondary/5 hover:-translate-y-1 cursor-pointer"
                href="#contact"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* The Collection (Bento Grid) */}
      <section className="py-24 px-margin-mobile md:px-margin-desktop bg-surface-container-lowest relative" id="collections">
        <div className="max-w-container-max mx-auto">
          <div className="text-center mb-16 flex flex-col items-center">
            <span className="font-label-md text-label-md text-secondary uppercase tracking-widest mb-4 block">Curated Selection</span>
            <h2 className="font-headline-lg text-headline-lg md:text-display-lg text-primary">The Collection</h2>
            <div className="w-12 h-0.5 bg-secondary mt-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[300px]">
            {/* Bento Item 1: Flat Case (Large) */}
            <div className="md:col-span-8 row-span-2 group relative overflow-hidden rounded-xl bg-white shadow-ambient border border-surface-variant flex flex-col justify-end p-8 transition-transform duration-500 hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent z-10 opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
              <img
                alt="Flat Cases"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB0fX2Zf4eGIug1khXK8rQ2UTIbG27UOddoXckT2hr09SdDv6koELVGYg4bLK6rhYnq1WYV8ZGhqQ1ac3AfqIiNh2xvK5gFmHFNmTmHBCeAOdbXvmqXWJHB--2IiNYCaUu-YlyX1QRxLvRngxil5-YGR4PaAysQ2FQsvEFnDc6gPSjMwOoiIkcveoQscomoye0_oBzVV4ynoWyN8DWbmZADvZ9CcSu_jBK7uvaMLQ_m6kuHNIpLqfFJwlJY3tdZlYoyUhucSlxoxau-"
              />
              <div className="relative z-20 flex justify-between items-end">
                <div>
                  <span className="inline-block px-3 py-1 mb-3 bg-surface-container-lowest/20 backdrop-blur-sm text-on-primary font-label-md text-[10px] uppercase tracking-widest rounded-lg border border-on-primary/20">Signature</span>
                  <h3 className="font-headline-md text-headline-md text-on-primary mb-2">Flat Case Series</h3>
                  <p className="font-body-md text-body-md text-surface-variant max-w-sm">Minimalist profile, maximum protection. Designed for seamless everyday carry.</p>
                </div>
                <a
                  onClick={(e) => { e.preventDefault(); navigateToCollections('flat-case'); }}
                  className="w-12 h-12 rounded-full bg-on-primary flex items-center justify-center text-primary hover:bg-secondary hover:text-on-secondary transition-colors duration-300 cursor-pointer"
                  href="#"
                >
                  <span className="material-symbols-outlined">arrow_forward</span>
                </a>
              </div>
            </div>

            {/* Bento Item 2: Pocket Case */}
            <div className="md:col-span-4 row-span-1 group relative overflow-hidden rounded-xl bg-white shadow-ambient border border-surface-variant p-6 flex flex-col justify-between transition-transform duration-500 hover:-translate-y-1">
              <div className="absolute right-0 bottom-0 w-32 h-32 bg-secondary/5 rounded-full blur-2xl transform translate-x-1/2 translate-y-1/2"></div>
              <div className="relative z-10">
                <span className="font-label-md text-label-md text-secondary uppercase tracking-widest mb-2 block">Compact</span>
                <h3 className="font-headline-md text-headline-md text-primary">Pocket Case</h3>
              </div>
              <div className="relative z-10 flex justify-between items-end mt-4">
                <p className="font-body-md text-body-md text-on-surface-variant text-sm">Foldable envelope design.</p>
                <a
                  onClick={(e) => { e.preventDefault(); navigateToCollections('pocket-case'); }}
                  className="text-secondary hover:text-primary transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined">east</span>
                </a>
              </div>
            </div>

            {/* Bento Item 3: Display Trays */}
            <div className="md:col-span-4 row-span-1 group relative overflow-hidden rounded-xl bg-white shadow-ambient border border-surface-variant p-6 flex flex-col justify-between transition-transform duration-500 hover:-translate-y-1">
              <div className="absolute inset-0 bg-primary/5 z-0"></div>
              <div className="relative z-10">
                <span className="font-label-md text-label-md text-secondary uppercase tracking-widest mb-2 block">Manufacturer</span>
                <h3 className="font-headline-md text-headline-md text-primary">Display Trays</h3>
              </div>
              <div className="relative z-10 flex justify-between items-end mt-4">
                <p className="font-body-md text-body-md text-on-surface-variant text-sm">Elevated presentation for boutiques.</p>
                <a
                  onClick={(e) => { e.preventDefault(); navigateToCollections('display-tray'); }}
                  className="text-secondary hover:text-primary transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined">east</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Eyeglass Chains & Straps Section */}
      <section className="py-24 px-margin-mobile md:px-margin-desktop bg-surface-container-low relative overflow-hidden">
        {/* Subtle decorative grid background element */}
        <div className="absolute inset-0 bg-pattern opacity-40"></div>

        <div className="max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center relative z-10">

          <div className="flex flex-col gap-6 order-1 md:order-1">
            <span className="font-label-md text-label-md text-secondary uppercase tracking-widest">Luxury Accessories</span>
            <h2 className="font-headline-lg text-headline-lg md:text-display-lg text-primary">Eyeglass Chains &amp; Strap Cords</h2>
            <p className="font-body-md text-body-lg text-on-surface-variant leading-relaxed">
              Keep your spectacles secure in style. Introducing our artisan line of glasses strap cords, leather eyeglass chains, and sunglass holders. Designed to drape comfortably around the neck and connect seamlessly with non-slip silicone loops, each piece is handcrafted using premium full-grain leather.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-secondary mt-0.5">verified</span>
                <div>
                  <h4 className="font-headline-md text-sm text-primary font-semibold">Adjustable Grip</h4>
                  <p className="text-xs text-on-surface-variant">Non-slip silicone loop ends fit all temple widths securely.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-secondary mt-0.5">brush</span>
                <div>
                  <h4 className="font-headline-md text-sm text-primary font-semibold">Monogram Tag</h4>
                  <p className="text-xs text-on-surface-variant">Add custom stamped leather initials to make it uniquely yours.</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-6">
              <a
                onClick={(e) => { e.preventDefault(); navigateToCollections('chain-strap'); }}
                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-on-primary font-label-md text-xs uppercase tracking-widest rounded transition-all duration-300 hover:bg-secondary hover:-translate-y-0.5 cursor-pointer shadow-sm"
              >
                Shop Collection
              </a>
              <a
                onClick={(e) => { e.preventDefault(); setCurrentPage('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="inline-flex items-center justify-center px-6 py-3 border border-secondary text-secondary font-label-md text-xs uppercase tracking-widest rounded transition-all duration-300 hover:bg-secondary/5 hover:-translate-y-0.5 cursor-pointer"
              >
                Design Custom Strap
              </a>
            </div>
          </div>

          <div className="order-2 md:order-2 flex flex-col gap-4 w-full">
            <div className="relative group w-full">
              <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-ambient relative z-10 border border-surface-variant/40 bg-white">
                <img
                  alt="Eyeglass Chain Glasses Strap Cords Sunglass Holder"
                  className="w-full h-full object-cover transition-all duration-500"
                  src={activeChainImg}
                />
              </div>
              {/* Styled border decoration */}
              <div className="absolute -top-4 -right-4 w-12 h-12 border-t-2 border-r-2 border-secondary rounded-tr-lg pointer-events-none transition-all duration-300"></div>
              <div className="absolute -bottom-4 -left-4 w-12 h-12 border-b-2 border-l-2 border-secondary rounded-bl-lg pointer-events-none transition-all duration-300"></div>
            </div>

            {/* Thumbnail row */}
            <div className="grid grid-cols-4 gap-3 z-10 relative">
              {chainImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveChainImg(img)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-all duration-300 ${activeChainImg === img
                      ? 'border-secondary scale-105 shadow-md'
                      : 'border-surface-variant/60 opacity-70 hover:opacity-100 hover:scale-105'
                    }`}
                >
                  <img src={img} alt={`Chain Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Shipping & Returns Information Section */}
      <section className="py-16 px-margin-mobile md:px-margin-desktop bg-surface-container-lowest border-t border-surface-variant/40">
        <div className="max-w-container-max mx-auto">
          <div className="bg-surface-container-low border border-surface-variant/40 rounded-2xl p-8 md:p-12 relative overflow-hidden">
            {/* Subtle background glow */}
            <div className="absolute right-0 bottom-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl transform translate-x-1/3 translate-y-1/3 pointer-events-none"></div>

            <div className="relative z-10">
              <span className="font-label-md text-label-md text-secondary uppercase tracking-widest mb-3 block">Service & Guarantees</span>
              <h2 className="font-headline-md text-2xl md:text-3xl text-primary mb-8">Shipping & Replacement Policy</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Card 1: Delivery */}
                <div className="flex gap-4">
                  <span className="material-symbols-outlined text-secondary text-2xl shrink-0">local_shipping</span>
                  <div>
                    <h4 className="font-headline-md text-base text-primary font-semibold mb-2">7 - 10 Day Delivery</h4>
                    <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
                      All orders are delivered within 7 to 10 working days from the date of shipping. Free shipping is provided for all orders above ₹500.
                    </p>
                  </div>
                </div>

                {/* Card 2: Quality Inspection */}
                <div className="flex gap-4">
                  <span className="material-symbols-outlined text-secondary text-2xl shrink-0">verified</span>
                  <div>
                    <h4 className="font-headline-md text-base text-primary font-semibold mb-2">Quality Inspected</h4>
                    <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
                      Eyewear cases and accessories are carefully inspected prior to shipment, and request you to check your order upon receipt.
                    </p>
                  </div>
                </div>

                {/* Card 3: Replacement Policy */}
                <div className="flex gap-4">
                  <span className="material-symbols-outlined text-secondary text-2xl shrink-0">assignment_return</span>
                  <div>
                    <h4 className="font-headline-md text-base text-primary font-semibold mb-2">Replacement Guarantee</h4>
                    <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
                      All returns must be requested within 48 hours of delivery to receive replacement in case of manufacturing defects (no refunds).
                    </p>
                  </div>
                </div>
              </div>

              {/* Customer Support Footer Banner */}
              <div className="mt-10 pt-8 border-t border-surface-variant/40 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs text-on-surface-variant">
                <div>
                  <span className="font-semibold text-primary block mb-0.5">Customer Care Support:</span>
                  Our office timings are 10:00 am – 6:30 pm from Monday to Saturday. (Excluding National Holidays).
                </div>
                <a
                  onClick={(e) => { e.preventDefault(); setCurrentPage('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="inline-flex items-center gap-1.5 text-secondary hover:text-primary font-semibold transition-colors cursor-pointer"
                >
                  <span>Contact Support</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
