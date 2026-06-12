import React from 'react';

export default function ProductCard({ product, onSelect }) {
  return (
    <article 
      onClick={() => onSelect(product)}
      className="bg-white rounded-xl overflow-hidden ambient-shadow flex flex-col group border border-surface-variant/50 relative transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_30px_60px_rgba(44,62,80,0.08)] cursor-pointer"
    >
      <div className="absolute top-4 left-4 z-10 flex gap-2 pointer-events-none">
        <span className="bg-surface-container-low/90 backdrop-blur-sm text-on-surface-variant font-label-md text-[10px] md:text-label-md px-3 py-1 rounded-lg border border-surface-variant/40 shadow-sm uppercase tracking-wider">
          {product.categoryLabel}
        </span>
      </div>
      
      {/* Image Container */}
      <div className="aspect-[4/3] bg-surface-container-lowest relative overflow-hidden flex-shrink-0">
        <img 
          alt={product.name} 
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105" 
          src={product.image}
        />
        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-500"></div>
      </div>
      
      {/* Text & Button Details */}
      <div className="p-6 bg-white flex flex-col justify-between flex-grow border-t border-surface-variant/30">
        <div className="mb-4">
          <span className="font-label-md text-[11px] text-secondary uppercase tracking-widest block mb-1">
            {product.materials[0]}
          </span>
          <h3 className="font-headline-md text-lg text-primary line-clamp-1 group-hover:text-secondary transition-colors duration-300">
            {product.name}
          </h3>
        </div>
        
        <div className="flex justify-between items-center mt-auto">
          <div className="flex flex-col">
            <span className="font-headline-md text-sm text-secondary font-semibold">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            <span className="font-body-md text-[11px] text-on-surface-variant opacity-75">
              Dim: {product.dimensions.split(' ')[0]}
            </span>
          </div>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onSelect(product);
            }}
            className="border border-secondary text-secondary hover:bg-secondary hover:text-white px-4 py-1.5 rounded font-label-md text-[12px] uppercase tracking-widest transition-all duration-300"
          >
            View Details
          </button>
        </div>
      </div>
    </article>
  );
}
