import React from 'react';

export default function Craft({ setCurrentPage }) {
  return (
    <div className="w-full">
      {/* Hero / Header Section */}
      <header className="relative pt-24 pb-32 overflow-hidden bg-surface-container-lowest border-b border-surface-variant/40">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-1 md:grid-cols-2 gap-gutter items-center">
          <div className="max-w-xl">
            <span className="font-label-md text-label-md uppercase tracking-widest text-secondary mb-4 block">Our Story &amp; Craft</span>
            <h1 className="font-display-lg text-4xl md:text-5xl text-primary mb-6 leading-tight">
              Artisanal Protection for the Discerning Eye.
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-8 leading-relaxed">
              At Lunoris, we believe eyewear protection is an extension of personal style. We meticulously source premium materials and employ precision manufacturing to create cases that are as elegant as the eyewear they hold.
            </p>
            <button 
              onClick={() => {
                document.getElementById('capabilities')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-primary-container text-on-primary rounded font-label-md text-label-md px-8 py-4 hover:bg-tertiary transition-colors duration-300 shadow-ambient"
            >
              Explore the Process
            </button>
          </div>
          <div className="relative h-[450px] md:h-[550px] rounded-xl overflow-hidden ambient-shadow border border-surface-variant/40 mt-8 md:mt-0">
            <img 
              alt="Artisan Craftsmanship" 
              className="object-cover w-full h-full" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDnmVVxlmC39YlOeHTmaBwGS4fmiXNwThVj1CA31H1q3hBBfxKMX851ZCUiUt4BlQo8Az7fl-po_5RG7D5Olt_6AhxGxSStwqu_TiWaNvxthJ2vYoiEJthb3vCqfTrW0EG3j4V5yoCqBHc62hBNUYlzpDxjGR4vjZwLnEQ0L7YpBwoPCDvCuH9J49qKLYNK-UWKjz92B2Zaj6i3sooqP5--8ZE0v3ATaB90sLOon9htCBVpgUDVckRCJa-3APiXLxq1AOQ2GCEuWOu8"
            />
          </div>
        </div>
      </header>

      {/* Manufacturing Capabilities (Bento Grid) */}
      <section className="py-24 bg-background" id="capabilities">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <span className="font-label-md text-label-md text-secondary uppercase tracking-widest mb-4 block">Manufacturing Excellence</span>
            <h2 className="font-headline-lg text-headline-lg text-primary mb-4">Precision at Scale</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              From boutique custom selections to large-scale wholesale orders, our state-of-the-art facilities ensure uncompromised quality at every volume.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter auto-rows-[300px]">
            {/* Large Feature Cell */}
            <div className="md:col-span-8 md:row-span-2 bg-surface-container-lowest rounded-xl ambient-shadow border border-surface-variant overflow-hidden group relative flex flex-col justify-end p-8">
              <div className="absolute inset-0 z-0">
                <img 
                  alt="Industrial Scale Display Trays" 
                  className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA0Y_jT9DHW87UmP_t-qlPOyOcpwIUZz7PBWIDEWUsjQLC7qgdB6FaOOsRO1logiJ0SpepGIZHP5FJObmjutHseDzM3dfLRGJ2KLiR9G7fp_c6RkozdXU9rH3PYxbHHVeYHYgdwd6QzGEX9j-ZU223tvBAE9Zo3SPVzabQMgZREED-3bkV19quPZN-ts9L6TdPOuld17vhg85_G48XknplBMBJHCn2x883lvJL_yIn1jbSlFEc4tZ8L-PKAiZwZIEuILl8Gi32ac0cd"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent"></div>
              </div>
              <div className="relative z-10 text-on-primary">
                <h3 className="font-headline-md text-headline-md mb-2">Industrial Scale Display Trays</h3>
                <p className="font-body-md text-body-md max-w-md opacity-90">
                  Engineered for retail environments, our multi-compartment trays offer organized, high-visibility storage for entire eyewear collections.
                </p>
              </div>
            </div>

            {/* Small Cell 1 */}
            <div className="md:col-span-4 bg-surface-container-lowest rounded-xl ambient-shadow border border-surface-variant p-8 flex flex-col justify-center">
              <span className="material-symbols-outlined text-secondary text-4xl mb-4">
                precision_manufacturing
              </span>
              <h3 className="font-headline-md text-headline-md text-primary mb-2">Automated Precision</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Advanced laser cutting and pressing machinery ensures every edge is perfectly aligned and every hinge operates flawlessly.
              </p>
            </div>

            {/* Small Cell 2 */}
            <div className="md:col-span-4 bg-surface-container-lowest rounded-xl ambient-shadow border border-surface-variant p-8 flex flex-col justify-center">
              <span className="material-symbols-outlined text-secondary text-4xl mb-4">
                handshake
              </span>
              <h3 className="font-headline-md text-headline-md text-primary mb-2">B2B Partnerships</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                We partner with leading opticians and distributors globally to deliver customized, branded packaging solutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Material Quality Section */}
      <section className="py-24 bg-surface-container-lowest border-t border-surface-variant/40 relative overflow-hidden">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            
            <div className="relative h-[400px] md:h-[500px] rounded-xl overflow-hidden ambient-shadow border border-surface-variant/40 order-2 md:order-1">
              <img 
                alt="Tactile Suede Material" 
                className="object-cover w-full h-full" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDlgoEFYNWg7oMFtaFiX-7hWm5dHzjhe7ylfNB1x6Z2wk8WQE9_5W8YTuGRAzvoJHmskKzya0mqTdCejKanrAE4_oWzvI2yMRDEruXk6a8Cs9HckhA9VTkBQgfQ9_RiQiFqhITd6V7vu16WCuhcyVrsy0aiLfqi-mxlYPosEQyDs8O6UJL-2gTlBFQI4fw-tHpSq1lSRAMiFgZsvpou24LpG3LCu5vKW3DsYT4V2EgldSVJwEu_d2lAthpJBc43Xk6enVbCszRGM11J"
              />
            </div>
            
            <div className="order-1 md:order-2">
              <h2 className="font-headline-lg text-headline-lg text-primary mb-6 leading-tight">
                Tactile Luxury in Every Case
              </h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant mb-8 leading-relaxed">
                We select materials that not only protect but also delight the senses. The exterior finishes emulate the rich texture of natural leather, providing a secure grip and a sophisticated aesthetic.
              </p>
              
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-secondary mt-1">check_circle</span>
                  <div>
                    <h4 className="font-label-md text-label-md text-primary">Premium Leather-Style Finishes</h4>
                    <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                      Durable, scuff-resistant vegan leather available in earthy tones like deep navy, rich tan, and slate grey.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-secondary mt-1">check_circle</span>
                  <div>
                    <h4 className="font-label-md text-label-md text-primary">Plush Suede-Like Interiors</h4>
                    <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                      Soft, non-abrasive microfiber velvet linings that prevent micro-scratches on delicate lenses.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-secondary mt-1">check_circle</span>
                  <div>
                    <h4 className="font-label-md text-label-md text-primary">Reinforced Core Structure</h4>
                    <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                      Rigid steel or molded polymer inner core layers that provide crush-proof protection for all frame shapes.
                    </p>
                  </div>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
