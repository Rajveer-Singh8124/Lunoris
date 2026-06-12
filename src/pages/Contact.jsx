import React, { useState, useEffect } from 'react';

export default function Contact({ preselectedProduct, clearPreselectedProduct }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    inquiryType: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Pre-fill message if a product was preselected for inquiry
  useEffect(() => {
    if (preselectedProduct) {
      setFormData(prev => ({
        ...prev,
        inquiryType: 'wholesale',
        message: `Hello, I would like to inquire about wholesale pricing, customization, and minimum order quantities for the "${preselectedProduct.name}" (${preselectedProduct.categoryLabel}).`
      }));
      // Clear after populating so it doesn't sticky-fill if they reset
      clearPreselectedProduct();
    }
  }, [preselectedProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const subjectLabel = {
      wholesale: 'Wholesale Pricing',
      custom: 'Custom Manufacturing',
      display: 'Display Trays',
      other: 'General Inquiry'
    }[formData.inquiryType] || formData.inquiryType;

    const formattedMessage = `*New Wholesale Inquiry - Lunoris*\n` +
      `*Name:* ${formData.firstName} ${formData.lastName}\n` +
      `*Email:* ${formData.email}\n` +
      `*Phone:* ${formData.phone || 'N/A'}\n` +
      `*Company:* ${formData.company || 'N/A'}\n` +
      `*Subject:* ${subjectLabel}\n` +
      `*Message:* ${formData.message}`;

    const whatsappUrl = `https://wa.me/917734010101?text=${encodeURIComponent(formattedMessage)}`;

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);

      // Redirect to WhatsApp
      window.open(whatsappUrl, '_blank');

      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        inquiryType: '',
        message: ''
      });
    }, 1000);
  };

  return (
    <div className="w-full relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 px-margin-mobile md:px-margin-desktop bg-pattern border-b border-surface-variant/35">
        <div className="max-w-container-max mx-auto text-center">
          <p className="font-label-md text-label-md text-secondary tracking-widest uppercase mb-4">Connect With Us</p>
          <h1 className="font-display-lg text-4xl md:text-display-lg text-primary mb-6">Contact &amp; Wholesale</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
            Partner with Lunoris for premium eyewear protection. Whether you are inquiring about bulk orders, custom designs, or general questions, our team is ready to assist.
          </p>
        </div>
      </section>

      {/* Bento Grid Layout for Contact Info & Form */}
      <section className="py-16 px-margin-mobile md:px-margin-desktop mb-24 max-w-container-max mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-stretch">

          {/* Contact Information Card (Left Column) */}
          <div className="lg:col-span-5 bg-surface-container-lowest shadow-ambient border border-surface-variant/30 rounded-xl p-8 md:p-12 flex flex-col justify-between">
            <div>
              <h2 className="font-headline-md text-headline-md text-primary mb-8 border-b border-surface-variant pb-4">Direct Contact</h2>
              <div className="space-y-8">

                {/* Head Office */}
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center flex-shrink-0 text-secondary border border-surface-variant/40">
                    <span className="material-symbols-outlined text-xl">location_on</span>
                  </div>
                  <div>
                    <h3 className="font-label-md text-label-md text-primary uppercase tracking-wider mb-2">Regd. Office &amp; Mfg. Unit</h3>
                    <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed opacity-90">
                      Plot No. 812/H1-57, First Floor,<br />
                      Samtal Zone, RIICO Industrial Area,<br />
                      Bhiwadi, Tapukara, Khairthal - Tijara,<br />
                      Rajasthan, India – 301019
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center flex-shrink-0 text-secondary border border-surface-variant/40">
                    <span className="material-symbols-outlined text-xl">call</span>
                  </div>
                  <div>
                    <h3 className="font-label-md text-label-md text-primary uppercase tracking-wider mb-2">Phone</h3>
                    <ul className="font-body-md text-body-md text-on-surface-variant space-y-1 opacity-90">
                      <li>+91 98877 00077 <span className="text-outline text-xs font-semibold">(Harsh Mangal)</span></li>

                      <li>+91 7734 010101</li>
                    </ul>
                  </div>
                </div>

                {/* Email */}
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center flex-shrink-0 text-secondary border border-surface-variant/40">
                    <span className="material-symbols-outlined text-xl">mail</span>
                  </div>
                  <div>
                    <h3 className="font-label-md text-label-md text-primary uppercase tracking-wider mb-2">Email</h3>
                    <ul className="font-body-md text-body-md text-on-surface-variant space-y-1 opacity-90">
                      <li><a className="hover:text-secondary transition-colors underline decoration-secondary-container" href="mailto:harsh.712@gmail.com">harsh.712@gmail.com</a></li>
                      <li><a className="hover:text-secondary transition-colors underline decoration-secondary-container" href="mailto:ssopticals07@gmail.com">ssopticals07@gmail.com</a></li>
                    </ul>
                  </div>
                </div>

              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-surface-variant/40">
              <img
                alt="Lunoris Case Detail"
                className="w-full h-44 object-cover rounded-lg filter grayscale opacity-90 border border-surface-variant/40 shadow-sm"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBw85Dg9sfx8lL8Y4Yl6nRpizvrLA0LEAoMAAL5Knwt0cYVT6m26ReLOMmzdiEtcD4I6nahNTbUfQsltlKl1yv_PHnPDUSbYkmy59-9o-WkA8J8hsOVcnX3DAAjeRb-yI6_-A7g0Sf8InuCficRe25EAwLXROKHyR8DKXE0jBjXMvubZ1spoznRyk1nGo5D42mXLvV-FBAdDtiO7-5ADwFQZaVCZcP6Qc-6s-PtyIpM7V8qicJh7nl731wX-u_d5H1tsr00vO-Wa-zi"
              />
            </div>
          </div>

          {/* Inquiry Form (Right Column) */}
          <div className="lg:col-span-7 bg-white shadow-ambient border border-surface-variant/30 rounded-xl p-8 md:p-12 relative overflow-hidden flex flex-col justify-between">
            {/* Decorative crescent element */}
            <div className="absolute -top-24 -right-24 w-64 h-64 border border-secondary/5 rounded-full pointer-events-none"></div>

            {submitted ? (
              <div className="my-auto py-12 text-center flex flex-col items-center animate-fadeIn">
                <div className="w-16 h-16 bg-secondary-container/20 rounded-full flex items-center justify-center text-secondary mb-6 border border-secondary-container/40">
                  <span className="material-symbols-outlined text-3xl font-semibold">check</span>
                </div>
                <h2 className="font-display-lg text-2xl text-primary mb-4">Inquiry Submitted Successfully</h2>
                <p className="font-body-md text-on-surface-variant max-w-md mx-auto leading-relaxed mb-8">
                  Thank you for reaching out. A wholesale representative from Lunoris (Sunshine Opticals) will review your request and contact you within 24-48 business hours with catalog details and pricing options.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="border border-secondary text-secondary hover:bg-secondary hover:text-white px-8 py-3 rounded font-label-md text-xs uppercase tracking-widest transition-all duration-300"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <div>
                <h2 className="font-headline-md text-headline-md text-primary mb-2">Wholesale Inquiry</h2>
                <p className="font-body-md text-body-md text-on-surface-variant mb-10">
                  Request a bulk catalog, wholesale pricing sheets, or discuss bespoke manufacturing parameters.
                </p>

                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="relative group">
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="form-input w-full font-body-md text-body-md text-primary placeholder-transparent peer border-b border-surface-variant focus:border-secondary"
                        placeholder="First Name"
                      />
                      <label
                        htmlFor="firstName"
                        className="absolute left-0 -top-3.5 text-[11px] text-outline transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-on-surface-variant/65 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-secondary peer-focus:text-[11px] font-label-md uppercase tracking-wider"
                      >
                        First Name *
                      </label>
                    </div>

                    <div className="relative group">
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className="form-input w-full font-body-md text-body-md text-primary placeholder-transparent peer border-b border-surface-variant focus:border-secondary"
                        placeholder="Last Name"
                      />
                      <label
                        htmlFor="lastName"
                        className="absolute left-0 -top-3.5 text-[11px] text-outline transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-on-surface-variant/65 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-secondary peer-focus:text-[11px] font-label-md uppercase tracking-wider"
                      >
                        Last Name *
                      </label>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="relative group">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="form-input w-full font-body-md text-body-md text-primary placeholder-transparent peer border-b border-surface-variant focus:border-secondary"
                        placeholder="Email Address"
                      />
                      <label
                        htmlFor="email"
                        className="absolute left-0 -top-3.5 text-[11px] text-outline transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-on-surface-variant/65 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-secondary peer-focus:text-[11px] font-label-md uppercase tracking-wider"
                      >
                        Email Address *
                      </label>
                    </div>

                    <div className="relative group">
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="form-input w-full font-body-md text-body-md text-primary placeholder-transparent peer border-b border-surface-variant focus:border-secondary"
                        placeholder="Phone Number"
                      />
                      <label
                        htmlFor="phone"
                        className="absolute left-0 -top-3.5 text-[11px] text-outline transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-on-surface-variant/65 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-secondary peer-focus:text-[11px] font-label-md uppercase tracking-wider"
                      >
                        Phone Number
                      </label>
                    </div>
                  </div>

                  <div className="relative group">
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="form-input w-full font-body-md text-body-md text-primary placeholder-transparent peer border-b border-surface-variant focus:border-secondary"
                      placeholder="Company Name"
                    />
                    <label
                      htmlFor="company"
                      className="absolute left-0 -top-3.5 text-[11px] text-outline transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-on-surface-variant/65 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-secondary peer-focus:text-[11px] font-label-md uppercase tracking-wider"
                    >
                      Company / Retail Store
                    </label>
                  </div>

                  <div className="relative group">
                    <select
                      id="inquiryType"
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleChange}
                      required
                      className="form-input w-full font-body-md text-body-md text-primary bg-transparent appearance-none cursor-pointer focus:border-secondary border-b border-surface-variant py-3"
                    >
                      <option value="" disabled>Select Inquiry Type</option>
                      <option value="wholesale">Wholesale Pricing</option>
                      <option value="custom">Custom Manufacturing</option>
                      <option value="display">Display Trays</option>
                      <option value="other">General Inquiry</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-0 top-3 text-outline pointer-events-none">
                      expand_more
                    </span>
                    <label
                      htmlFor="inquiryType"
                      className="absolute left-0 -top-3.5 text-[11px] text-secondary font-label-md uppercase tracking-wider"
                    >
                      Subject *
                    </label>
                  </div>

                  <div className="relative group mt-10">
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="4"
                      className="form-input w-full font-body-md text-body-md text-primary placeholder-transparent peer resize-none border-b border-surface-variant focus:border-secondary"
                      placeholder="Your Message"
                    ></textarea>
                    <label
                      htmlFor="message"
                      className="absolute left-0 -top-3.5 text-[11px] text-outline transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-on-surface-variant/65 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-secondary peer-focus:text-[11px] font-label-md uppercase tracking-wider"
                    >
                      Message Details *
                    </label>
                  </div>

                  <div className="pt-6">
                    <button
                      type="submit"
                      disabled={loading}
                      className="bg-primary-container text-on-primary hover:bg-secondary px-8 py-4 rounded font-label-md text-label-md uppercase tracking-widest transition-all duration-300 w-full md:w-auto inline-flex items-center justify-center gap-3 shadow-ambient disabled:opacity-70"
                    >
                      {loading ? (
                        <span>Submitting...</span>
                      ) : (
                        <>
                          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.73-1.455L0 24zm6.59-4.846c1.6.95 3.32 1.45 5.093 1.45 5.568 0 10.103-4.532 10.106-10.104.002-2.701-1.047-5.24-2.952-7.147C16.988 1.446 14.454.398 11.75.398c-5.58 0-10.116 4.534-10.12 10.107-.001 1.776.467 3.51 1.353 5.046L2.01 21.993l6.637-1.739-.399.248zm12.39-7.142c-.3-.15-1.77-.874-2.042-.973-.272-.099-.47-.149-.667.15-.197.299-.766.973-.938 1.171-.173.199-.347.223-.647.074-.3-.15-1.267-.467-2.413-1.488-.892-.796-1.493-1.78-1.668-2.079-.175-.3-.019-.462.131-.61.135-.133.3-.347.45-.52.15-.173.2-.297.3-.495.1-.198.05-.371-.025-.52-.075-.149-.667-1.609-.914-2.203-.24-.58-.485-.502-.667-.512-.172-.008-.37-.01-.567-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.77-.724 2.016-1.424.247-.699.247-1.299.172-1.424-.075-.124-.272-.198-.57-.347z" />
                          </svg>
                          <span>Submit &amp; Send to WhatsApp</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>

        </div>
      </section>
    </div>
  );
}
