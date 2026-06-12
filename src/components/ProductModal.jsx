import React, { useState } from 'react';

export default function ProductModal({ product, onClose, onInquire }) {
  if (!product) return null;

  const [checkoutStep, setCheckoutStep] = useState('details'); // 'details' or 'checkout'
  const [activeTab, setActiveTab] = useState('specs'); // 'specs' or 'shipping'
  const [checkoutForm, setCheckoutForm] = useState({
    name: '',
    address: '',
    quantity: 1,
    color: 'Rich Tan'
  });

  const colors = [
    'Rich Tan',
    'Deep Navy',
    'Slate Grey',
    'Burgundy',
    'Forest Green'
  ];

  const generateSecureRef = (prodId) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 5; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return `SEC-LUN-${prodId.toUpperCase()}-${code}`;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCheckoutForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePurchaseSubmit = (e) => {
    e.preventDefault();
    if (!checkoutForm.name || !checkoutForm.address || checkoutForm.quantity < 1) {
      return;
    }

    const secureRef = generateSecureRef(product.id);
    const totalPrice = product.price * checkoutForm.quantity;

    const formattedMessage = `*New Secure Purchase Order - Lunoris*\n` +
      `*Order Reference:* ${secureRef}\n` +
      `*Product Name:* ${product.name} (${product.id})\n` +
      `*Color:* ${checkoutForm.color}\n` +
      `*Quantity:* ${checkoutForm.quantity}\n` +
      `*Total Price:* ₹${totalPrice.toLocaleString('en-IN')} (₹${product.price.toLocaleString('en-IN')} each)\n\n` +
      `*Delivery Address:*\n` +
      `Name: ${checkoutForm.name}\n` +
      `Address: ${checkoutForm.address}\n\n` +
      `Please share payment link or UPI details to complete this secure purchase order.`;

    const whatsappUrl = `https://wa.me/917734010101?text=${encodeURIComponent(formattedMessage)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 bg-primary/40 backdrop-blur-sm flex items-center justify-center p-4 md:p-6 z-[100] animate-fadeIn">
      {/* Modal Card container */}
      <div 
        className="bg-white rounded-xl overflow-hidden ambient-shadow border border-surface-variant/40 w-full max-w-4xl max-h-[90vh] overflow-y-auto relative flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 bg-white/80 backdrop-blur-md text-primary hover:text-secondary w-10 h-10 rounded-full flex items-center justify-center z-10 transition-all duration-300 shadow-sm border border-surface-variant/30"
          aria-label="Close"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        {/* Left Side: Product Image */}
        <div className="w-full md:w-1/2 bg-surface-container-lowest relative flex items-center justify-center aspect-square md:aspect-auto md:h-auto min-h-[300px]">
          <img 
            alt={product.name} 
            className="w-full h-full object-cover object-center absolute inset-0" 
            src={product.image}
          />
        </div>

        {/* Right Side: Product Details */}
        <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-between">
          {checkoutStep === 'details' ? (
            /* DETAILS VIEW */
            <div className="flex flex-col justify-between h-full">
              <div>
                <span className="bg-surface-container-low text-on-surface-variant font-label-md text-xs px-3 py-1 rounded-lg border border-surface-variant mb-4 inline-block uppercase tracking-wider">
                  {product.categoryLabel}
                </span>
                <h2 className="font-display-lg text-2xl md:text-3xl text-primary mb-2">
                  {product.name}
                </h2>
                
                {/* Price Display */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-secondary font-headline-md text-2xl font-bold">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[10px] uppercase font-semibold tracking-wider text-on-surface-variant bg-surface-container px-2 py-0.5 rounded border border-surface-variant/40">
                    GST Inclusive
                  </span>
                </div>

                <p className="font-body-md text-on-surface-variant leading-relaxed mb-6">
                  {product.description}
                </p>

                {/* Tabs Header */}
                <div className="flex border-b border-surface-variant/40 mb-6 mt-4">
                  <button
                    type="button"
                    onClick={() => setActiveTab('specs')}
                    className={`pb-3 pr-6 font-label-md text-xs uppercase tracking-widest transition-all relative ${
                      activeTab === 'specs' 
                        ? 'text-secondary font-semibold' 
                        : 'text-outline hover:text-primary'
                    }`}
                  >
                    Specifications
                    {activeTab === 'specs' && (
                      <span className="absolute bottom-0 left-0 right-6 h-0.5 bg-secondary animate-fadeIn"></span>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('shipping')}
                    className={`pb-3 px-6 font-label-md text-xs uppercase tracking-widest transition-all relative ${
                      activeTab === 'shipping' 
                        ? 'text-secondary font-semibold' 
                        : 'text-outline hover:text-primary'
                    }`}
                  >
                    Shipping &amp; Returns
                    {activeTab === 'shipping' && (
                      <span className="absolute bottom-0 left-6 right-6 h-0.5 bg-secondary animate-fadeIn"></span>
                    )}
                  </button>
                </div>

                {activeTab === 'specs' ? (
                  /* SPECIFICATIONS TAB CONTENT */
                  <div className="animate-fadeIn">
                    {/* Spec grid */}
                    <div className="grid grid-cols-2 gap-4 border-b border-surface-variant/40 pb-4 mb-6">
                      <div>
                        <h4 className="font-label-md text-xs text-secondary uppercase tracking-widest mb-1">Dimensions</h4>
                        <p className="font-body-md text-sm text-primary">{product.dimensions}</p>
                      </div>
                      <div>
                        <h4 className="font-label-md text-xs text-secondary uppercase tracking-widest mb-1">Weight</h4>
                        <p className="font-body-md text-sm text-primary">{product.weight}</p>
                      </div>
                    </div>

                    {/* Materials and Features */}
                    <div className="mb-6">
                      <h4 className="font-label-md text-xs text-secondary uppercase tracking-widest mb-2">Materials</h4>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {product.materials.map((mat, i) => (
                          <span key={i} className="px-3 py-1 bg-surface-container-low text-on-surface-variant text-xs rounded border border-surface-variant/50">
                            {mat}
                          </span>
                        ))}
                      </div>

                      <h4 className="font-label-md text-xs text-secondary uppercase tracking-widest mb-2">Core Features</h4>
                      <ul className="space-y-1.5">
                        {product.features.map((feat, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-on-surface-variant">
                            <span className="material-symbols-outlined text-[16px] text-secondary">check</span>
                            {feat}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  /* SHIPPING & REPLACEMENT POLICY TAB CONTENT */
                  <div className="space-y-4 font-body-md text-xs md:text-sm text-on-surface-variant leading-relaxed animate-fadeIn mb-6">
                    {/* Free Shipping Badge */}
                    <div className="bg-emerald-50 border border-emerald-200/50 text-emerald-800 rounded-lg p-3.5 flex items-center gap-3 mb-2 text-xs font-semibold">
                      <span className="material-symbols-outlined text-emerald-600 text-lg">local_shipping</span>
                      <span>Free shipping for orders above ₹500</span>
                    </div>
                    
                    <p>
                      All orders are delivered within <strong>7 to 10 working days</strong> from the date of shipping.
                    </p>
                    <p>
                      Eyewear cases and accessories are carefully inspected prior to shipment, and request you to check your order upon receipt.
                    </p>
                    <p>
                      If a defect is discovered, please contact our Customer Care team within <strong>48 hours</strong> of receiving your order.
                    </p>
                    
                    <div className="bg-surface-container-low p-3.5 rounded border border-surface-variant/40 text-xs">
                      <span className="font-semibold text-primary block mb-1">Customer Care Support:</span>
                      Our office timings are 10:00 am – 6:30 pm from Monday to Saturday. (Excluding National Holidays).
                    </div>
                    
                    <p className="text-[11px] text-outline leading-tight">
                      * All returns must be requested within <strong>48 hours</strong> of receiving the order to receive replacement in case of manufacturing defects.
                    </p>
                  </div>
                )}</div>

              {/* Secure Payment Information */}
              <div className="bg-surface-container-low border border-surface-variant/50 rounded-lg p-3.5 mb-4 text-[11px] text-on-surface-variant leading-relaxed flex items-start gap-2">
                <span className="material-symbols-outlined text-secondary text-base shrink-0 mt-0.5">lock</span>
                <div>
                  <span className="font-semibold text-primary block mb-0.5">Direct & Secure Payment Verification</span>
                  Payment is processed securely via direct UPI or Bank Transfer link generated by our accounts representative on WhatsApp.
                </div>
              </div>

              <div className="flex flex-col gap-2.5 mt-2">
                <button 
                  onClick={() => setCheckoutStep('checkout')}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-label-md text-label-md uppercase tracking-widest rounded py-4 w-full text-center transition-colors duration-300 shadow-ambient flex items-center justify-center gap-3 font-semibold"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.73-1.455L0 24zm6.59-4.846c1.6.95 3.32 1.45 5.093 1.45 5.568 0 10.103-4.532 10.106-10.104.002-2.701-1.047-5.24-2.952-7.147C16.988 1.446 14.454.398 11.75.398c-5.58 0-10.116 4.534-10.12 10.107-.001 1.776.467 3.51 1.353 5.046L2.01 21.993l6.637-1.739-.399.248zm12.39-7.142c-.3-.15-1.77-.874-2.042-.973-.272-.099-.47-.149-.667.15-.197.299-.766.973-.938 1.171-.173.199-.347.223-.647.074-.3-.15-1.267-.467-2.413-1.488-.892-.796-1.493-1.78-1.668-2.079-.175-.3-.019-.462.131-.61.135-.133.3-.347.45-.52.15-.173.2-.297.3-.495.1-.198.05-.371-.025-.52-.075-.149-.667-1.609-.914-2.203-.24-.58-.485-.502-.667-.512-.172-.008-.37-.01-.567-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.77-.724 2.016-1.424.247-.699.247-1.299.172-1.424-.075-.124-.272-.198-.57-.347z" />
                  </svg>
                  <span>Secure Purchase</span>
                </button>
                <button 
                  onClick={() => onInquire(product)}
                  className="border border-primary-container text-primary hover:bg-surface-container-low font-label-md text-label-md uppercase tracking-widest rounded py-3 w-full text-center transition-colors duration-300 flex items-center justify-center gap-2"
                >
                  Inquire Wholesale Catalog
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
              </div>
            </div>
          ) : (
            /* CHECKOUT FORM VIEW */
            <form onSubmit={handlePurchaseSubmit} className="flex flex-col justify-between h-full animate-fadeIn">
              <div>
                <span className="bg-surface-container-low text-on-surface-variant font-label-md text-xs px-3 py-1 rounded-lg border border-surface-variant mb-4 inline-block uppercase tracking-wider">
                  Secure Checkout
                </span>
                <h2 className="font-display-lg text-2xl text-primary mb-1">
                  Complete Order Request
                </h2>
                <p className="font-body-md text-sm text-on-surface-variant mb-6 border-b border-surface-variant/40 pb-4">
                  For: <span className="font-semibold text-primary">{product.name}</span>
                </p>

                <div className="space-y-6">
                  {/* Name Input */}
                  <div className="relative group">
                    <input 
                      type="text" 
                      id="checkoutName" 
                      name="name" 
                      value={checkoutForm.name}
                      onChange={handleInputChange}
                      required
                      className="form-input w-full font-body-md text-body-md text-primary placeholder-transparent peer border-b border-surface-variant focus:border-secondary" 
                      placeholder="Your Name" 
                    />
                    <label 
                      htmlFor="checkoutName"
                      className="absolute left-0 -top-3.5 text-[11px] text-outline transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-on-surface-variant/65 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-secondary peer-focus:text-[11px] font-label-md uppercase tracking-wider"
                    >
                      Delivery Name *
                    </label>
                  </div>

                  {/* Dropdowns (Color & Quantity) */}
                  <div className="grid grid-cols-2 gap-4">
                    {/* Color Select */}
                    <div className="relative group">
                      <select 
                        id="checkoutColor" 
                        name="color" 
                        value={checkoutForm.color}
                        onChange={handleInputChange}
                        required
                        className="form-input w-full font-body-md text-body-md text-primary bg-transparent border-b border-surface-variant focus:border-secondary py-3 appearance-none cursor-pointer"
                      >
                        {colors.map((col, idx) => (
                          <option key={idx} value={col}>{col}</option>
                        ))}
                      </select>
                      <span className="material-symbols-outlined absolute right-0 top-3 text-outline pointer-events-none">
                        expand_more
                      </span>
                      <label 
                        htmlFor="checkoutColor"
                        className="absolute left-0 -top-3.5 text-[11px] text-secondary font-label-md uppercase tracking-wider"
                      >
                        Selected Color *
                      </label>
                    </div>

                    {/* Quantity Input */}
                    <div className="relative group">
                      <input 
                        type="number" 
                        id="checkoutQuantity" 
                        name="quantity" 
                        min="1"
                        value={checkoutForm.quantity}
                        onChange={handleInputChange}
                        required
                        className="form-input w-full font-body-md text-body-md text-primary border-b border-surface-variant focus:border-secondary" 
                      />
                      <label 
                        htmlFor="checkoutQuantity"
                        className="absolute left-0 -top-3.5 text-[11px] text-secondary font-label-md uppercase tracking-wider"
                      >
                        Quantity *
                      </label>
                    </div>
                  </div>

                  {/* Delivery Address */}
                  <div className="relative group">
                    <textarea 
                      id="checkoutAddress" 
                      name="address" 
                      value={checkoutForm.address}
                      onChange={handleInputChange}
                      required
                      rows="3"
                      className="form-input w-full font-body-md text-body-md text-primary placeholder-transparent peer resize-none border-b border-surface-variant focus:border-secondary" 
                      placeholder="Delivery Address"
                    ></textarea>
                    <label 
                      htmlFor="checkoutAddress"
                      className="absolute left-0 -top-3.5 text-[11px] text-outline transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-on-surface-variant/65 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-secondary peer-focus:text-[11px] font-label-md uppercase tracking-wider"
                    >
                      Delivery Address *
                    </label>
                  </div>
                </div>
              </div>

              {/* Order pricing summary */}
              <div className="bg-surface-container-low border border-surface-variant/50 rounded-lg p-4 mt-6">
                <div className="flex justify-between items-center text-sm font-semibold text-primary">
                  <span>Total Order Value:</span>
                  <span className="text-secondary text-lg">
                    ₹{(product.price * checkoutForm.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="text-[10px] text-on-surface-variant opacity-75 mt-1 text-right">
                  ₹{product.price.toLocaleString('en-IN')} x {checkoutForm.quantity} unit(s)
                </div>
              </div>

              {/* Checkout actions */}
              <div className="flex gap-3 mt-6">
                <button 
                  type="button"
                  onClick={() => setCheckoutStep('details')}
                  className="border border-surface-variant hover:bg-surface-container-low text-primary font-label-md text-xs uppercase tracking-widest rounded px-4 py-4 w-1/3 transition-colors"
                >
                  Back
                </button>
                <button 
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-label-md text-xs uppercase tracking-widest rounded py-4 w-2/3 text-center transition-colors duration-300 shadow-ambient flex items-center justify-center gap-2 font-semibold"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.73-1.455L0 24zm6.59-4.846c1.6.95 3.32 1.45 5.093 1.45 5.568 0 10.103-4.532 10.106-10.104.002-2.701-1.047-5.24-2.952-7.147C16.988 1.446 14.454.398 11.75.398c-5.58 0-10.116 4.534-10.12 10.107-.001 1.776.467 3.51 1.353 5.046L2.01 21.993l6.637-1.739-.399.248zm12.39-7.142c-.3-.15-1.77-.874-2.042-.973-.272-.099-.47-.149-.667.15-.197.299-.766.973-.938 1.171-.173.199-.347.223-.647.074-.3-.15-1.267-.467-2.413-1.488-.892-.796-1.493-1.78-1.668-2.079-.175-.3-.019-.462.131-.61.135-.133.3-.347.45-.52.15-.173.2-.297.3-.495.1-.198.05-.371-.025-.52-.075-.149-.667-1.609-.914-2.203-.24-.58-.485-.502-.667-.512-.172-.008-.37-.01-.567-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.77-.724 2.016-1.424.247-.699.247-1.299.172-1.424-.075-.124-.272-.198-.57-.347z" />
                  </svg>
                  <span>Pay via WhatsApp</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
