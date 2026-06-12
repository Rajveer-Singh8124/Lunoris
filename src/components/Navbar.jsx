import React, { useState } from 'react';

export default function Navbar({ currentPage, setCurrentPage, navigateToCollections }) {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { id: 'collections', label: 'Collections' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <nav className="bg-surface/90 dark:bg-surface/90 backdrop-blur-md sticky top-0 w-full border-b border-surface-variant z-50 transition-all duration-300">
      <div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto h-20">

        {/* Mobile Menu Icon */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-primary hover:text-secondary transition-all duration-300 flex items-center"
        >
          <span className="material-symbols-outlined">{isOpen ? 'close' : 'menu'}</span>
        </button>

        {/* Brand Logo */}
        <a
          onClick={(e) => { e.preventDefault(); setCurrentPage('home'); }}
          className="font-display-lg text-[28px] md:text-headline-md text-primary tracking-tighter flex items-center gap-2 relative cursor-pointer group"
          href="#"
        >
          <span className="relative z-10 select-none">Lunoris</span>
          {/* Subtle crescent motif */}
          <div className="absolute -right-3 -top-1 w-4 h-4 rounded-full border-t-2 border-r-2 border-secondary opacity-50 transform rotate-45 group-hover:rotate-90 transition-transform duration-500"></div>
        </a>

        {/* Navigation Links (Desktop) */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.id}
              onClick={(e) => {
                e.preventDefault();
                if (link.id === 'collections') {
                  navigateToCollections('all');
                } else {
                  setCurrentPage(link.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className={`font-body-md text-label-md tracking-widest uppercase transition-all duration-300 cursor-pointer pb-1 ${currentPage === link.id
                  ? 'text-secondary border-b-2 border-secondary opacity-100'
                  : 'text-primary hover:text-secondary opacity-80 hover:opacity-100'
                }`}
              href={`#${link.id}`}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Trailing Icons */}
        <div className="flex items-center gap-4 text-primary">
          <button
            onClick={() => {
              navigateToCollections('all');
            }}
            className="hover:text-secondary transition-all duration-300 flex items-center justify-center p-2 rounded-full hover:bg-surface-variant/50"
          >
            <span className="material-symbols-outlined">shopping_bag</span>
          </button>
          <button className="hover:text-secondary transition-all duration-300 hidden md:flex items-center justify-center p-2 rounded-full hover:bg-surface-variant/50">
            <span className="material-symbols-outlined">person</span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden bg-surface border-t border-surface-variant absolute top-20 left-0 w-full py-6 px-margin-mobile flex flex-col gap-4 shadow-ambient transition-all duration-300 z-40">
          {navLinks.map((link) => (
            <a
              key={link.id}
              onClick={(e) => {
                e.preventDefault();
                setIsOpen(false);
                if (link.id === 'collections') {
                  navigateToCollections('all');
                } else {
                  setCurrentPage(link.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className={`font-body-md text-label-md tracking-widest uppercase py-2 border-b border-surface-variant/30 ${currentPage === link.id ? 'text-secondary font-semibold' : 'text-primary'
                }`}
              href={`#${link.id}`}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
