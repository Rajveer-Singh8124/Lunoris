import React, { useState, useMemo, useEffect } from 'react';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';

export default function Collections({ onSelectProduct, initialCategory = 'all', setCurrentPage }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [visibleCount, setVisibleCount] = useState(12);

  useEffect(() => {
    setSelectedCategory(initialCategory);
    setVisibleCount(12);
  }, [initialCategory]);

  const categories = [
    { id: 'all', label: 'All Products' },
    { id: 'flat-case', label: 'Flat Cases' },
    { id: 'pocket-case', label: 'Pocket Cases' },
    { id: 'hard-case', label: 'Hard Cases' },
    { id: 'display-tray', label: 'Display Trays' },
    { id: 'chain-strap', label: 'Chains & Straps' },
    { id: 'accessory', label: 'Selvet & Cloths' }
  ];

  // Filter products based on category and search query
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.materials.some(m => m.toLowerCase().includes(searchQuery.toLowerCase())) ||
        product.features.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  // Reset pagination when filter changes
  const handleCategoryChange = (catId) => {
    setSelectedCategory(catId);
    setVisibleCount(12);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setVisibleCount(12);
  };

  const loadMore = () => {
    setVisibleCount(prev => prev + 12);
  };

  const paginatedProducts = filteredProducts.slice(0, visibleCount);

  return (
    <div className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-16">

      {/* Header */}
      <header className="mb-12 text-center max-w-2xl mx-auto">
        <span className="font-label-md text-label-md text-secondary uppercase tracking-widest mb-4 block">Catalogue</span>
        <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary mb-4">
          Curated Collections
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant">
          Discover our range of meticulously crafted eyewear protection, designed for retail boutiques and optical professionals.
        </p>
      </header>

      {/* Controls: Search and Filters */}
      <div className="flex flex-col gap-8 mb-12 border-b border-surface-variant/40 pb-8">

        {/* Search Bar */}
        <div className="relative max-w-md w-full mx-auto">
          <input
            type="text"
            placeholder="Search by name, material, feature..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-3 bg-white border border-surface-variant/60 rounded-lg text-primary placeholder-on-surface-variant/50 focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary/20 shadow-sm transition-all"
          />
          <span className="material-symbols-outlined absolute left-3 top-3.5 text-on-surface-variant/60 text-xl pointer-events-none">
            search
          </span>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-3.5 text-on-surface-variant hover:text-primary transition-colors"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
          )}
        </div>

        {/* Category Filter Tags */}
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`px-5 py-2.5 rounded-full font-label-md text-xs uppercase tracking-widest border transition-all duration-300 ${selectedCategory === cat.id
                ? 'bg-secondary border-secondary text-white shadow-sm'
                : 'bg-white border-surface-variant/50 text-primary hover:border-secondary hover:text-secondary'
                }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Product Count Indicator */}
      <div className="mb-6 flex justify-between items-center text-sm text-on-surface-variant">
        <span>Showing {paginatedProducts.length} of {filteredProducts.length} products</span>
        {searchQuery && <span>Search results for "{searchQuery}"</span>}
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {paginatedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={onSelectProduct}
              />
            ))}
          </div>

          {/* Load More Button */}
          {visibleCount < filteredProducts.length && (
            <div className="mt-16 text-center">
              <button
                onClick={loadMore}
                className="bg-primary text-on-primary hover:bg-tertiary px-8 py-4 rounded font-label-md text-label-md uppercase tracking-widest transition-all duration-300 shadow-ambient"
              >
                Load More Products
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="py-24 text-center border border-dashed border-surface-variant rounded-xl max-w-md mx-auto bg-white/40">
          <span className="material-symbols-outlined text-secondary text-5xl mb-4">
            inbox
          </span>
          <h3 className="font-headline-md text-xl text-primary mb-2">No Products Found</h3>
          <p className="font-body-md text-on-surface-variant px-6">
            We couldn't find any products matching your current filters or search terms. Try clearing search or selecting another category.
          </p>
          <button
            onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
            className="mt-6 border border-secondary text-secondary hover:bg-secondary hover:text-white px-6 py-2.5 rounded font-label-md text-xs uppercase tracking-widest transition-all"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
