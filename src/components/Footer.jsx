import React from 'react';
import logo from '../assets/logo.png';

export default function Footer({ setCurrentPage, navigateToCollections }) {
  return (
    <footer className="bg-primary text-on-primary font-body-md text-body-md w-full mt-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter px-margin-mobile md:px-margin-desktop py-16 max-w-container-max mx-auto">

        {/* Brand Column */}
        <div className="col-span-1 md:col-span-1 flex flex-col gap-6">
          <a
            onClick={(e) => { e.preventDefault(); setCurrentPage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="font-display-lg text-headline-lg text-on-primary flex items-center gap-3 cursor-pointer"
            href="#"
          >
            <img src={logo} alt="Lunoris Logo" className="h-8 w-auto object-contain brightness-0 invert" />
            <span>Lunoris</span>
          </a>
          <p className="text-on-primary-container text-sm max-w-xs leading-relaxed opacity-80">
            Artisan eyewear protection. Blending utility with quiet luxury. A division of Sunshine Opticals.
          </p>
        </div>

        {/* Contact Information */}
        <div className="col-span-1 md:col-span-2 flex flex-col gap-4">
          <h4 className="font-label-md text-label-md uppercase tracking-widest text-secondary-container mb-2">Connect</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-on-primary-container">
            <p className="flex items-start gap-2">
              <span className="material-symbols-outlined text-secondary-container text-xl shrink-0 mt-0.5">location_on</span>
              <span className="text-sm leading-relaxed opacity-85">
                Plot No. 812/H1-57, First Floor,<br />
                Samtal Zone, RIICO Industrial Area,<br />
                Bhiwadi, Tapukara, Khairthal - Tijara,<br />
                Rajasthan, India – 301019
              </span>
            </p>
            <div className="flex flex-col gap-3">
              <a
                className="flex items-center gap-2 text-on-primary-container hover:text-secondary-fixed transition-colors text-sm"
                href="tel:+919887700077"
              >
                <span className="material-symbols-outlined text-secondary-container text-xl">phone</span>
                +91 98877 00077
              </a>
              <a
                className="flex items-center gap-2 text-on-primary-container hover:text-secondary-fixed transition-colors text-sm break-all"
                href="mailto:harsh.712@gmail.com"
              >
                <span className="material-symbols-outlined text-secondary-container text-xl">mail</span>
                harsh.712@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Quick Links / Legal */}
        <div className="col-span-1 md:col-span-1 flex flex-col gap-4 md:items-end">
          <h4 className="font-label-md text-label-md uppercase tracking-widest text-secondary-container mb-2 w-full md:text-right">Explore</h4>
          <a 
            onClick={(e) => { e.preventDefault(); navigateToCollections('all'); }}
            className="text-sm text-on-primary-container hover:text-on-primary w-full md:text-right hover:text-secondary-fixed transition-colors cursor-pointer"
          >
            Collections
          </a>
          <a
            onClick={(e) => { e.preventDefault(); setCurrentPage('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="text-sm text-on-primary-container hover:text-on-primary w-full md:text-right hover:text-secondary-fixed transition-colors cursor-pointer"
          >
            Our Process
          </a>
          <a
            onClick={(e) => { e.preventDefault(); setCurrentPage('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="text-sm text-on-primary-container hover:text-on-primary w-full md:text-right hover:text-secondary-fixed transition-colors cursor-pointer"
          >
            Wholesale Inquiry
          </a>
        </div>
      </div>

      {/* Copyright Bottom Bar */}
      <div className="border-t border-on-primary/10 py-6 px-margin-mobile md:px-margin-desktop text-center">
        <p className="text-sm text-on-primary-container opacity-60">
          © {new Date().getFullYear()} Lunoris Eyewear Protection. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
