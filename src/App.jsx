import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProductModal from './components/ProductModal';

// Pages
import Home from './pages/Home';
import Collections from './pages/Collections';
import Craft from './pages/Craft';
import Contact from './pages/Contact';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [preselectedProduct, setPreselectedProduct] = useState(null);
  const [collectionsCategory, setCollectionsCategory] = useState('all');

  const navigateToCollections = (category = 'all') => {
    setCollectionsCategory(category);
    setCurrentPage('collections');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Deep link inquiry from modal into contact form
  const handleInquireProduct = (product) => {
    setPreselectedProduct(product);
    setSelectedProduct(null);
    setCurrentPage('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearPreselectedProduct = () => {
    setPreselectedProduct(null);
  };

  // Content switcher based on active route state
  const renderPageContent = () => {
    switch (currentPage) {
      case 'home':
        return (
          <Home 
            setCurrentPage={setCurrentPage} 
            navigateToCollections={navigateToCollections} 
          />
        );
      case 'collections':
        return (
          <Collections 
            onSelectProduct={setSelectedProduct} 
            initialCategory={collectionsCategory} 
            setCurrentPage={setCurrentPage}
          />
        );
      case 'about':
        return <Craft setCurrentPage={setCurrentPage} />;
      case 'contact':
        return (
          <Contact
            preselectedProduct={preselectedProduct}
            clearPreselectedProduct={clearPreselectedProduct}
          />
        );
      default:
        return (
          <Home 
            setCurrentPage={setCurrentPage} 
            navigateToCollections={navigateToCollections} 
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-on-background font-body-md">
      {/* Header */}
      <Navbar 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        navigateToCollections={navigateToCollections} 
      />

      {/* Main viewport */}
      <main className="flex-grow">
        {renderPageContent()}
      </main>

      {/* Footer */}
      <Footer 
        setCurrentPage={setCurrentPage} 
        navigateToCollections={navigateToCollections} 
      />

      {/* Global Product Detail Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onInquire={handleInquireProduct}
        />
      )}
    </div>
  );
}
