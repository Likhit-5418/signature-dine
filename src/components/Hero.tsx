import React from 'react';
import { Star, MapPin, ArrowRight, Utensils, Users, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { RESTAURANT_INFO } from '../data/restaurantData';

export const Hero: React.FC = () => {
  const { setIsBookingOpen } = useCart();

  const now = new Date();
  const currentHour = now.getHours();
  const isOpen = currentHour >= RESTAURANT_INFO.hours.openHour && currentHour < RESTAURANT_INFO.hours.closeHour;

  return (
    <section className="relative overflow-hidden bg-[#100e0d] pt-8 pb-16 lg:py-20 border-b border-[#26211c]">
      {/* Subtle radial ambient glow */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute -top-40 right-0 w-[500px] h-[500px] bg-[#d4af37]/8 rounded-full blur-3xl"
      />
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#8c2a18]/10 rounded-full blur-3xl"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Headline & Proof */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Clean unboxed proof & metadata */}
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-[#a3988d]">
              <span className="flex items-center gap-1 text-[#e5b340] font-semibold">
                <Star className="w-3.5 h-3.5 fill-[#e5b340]" />
                <span className="font-mono tabular-nums">4.5</span>
              </span>
              <span aria-hidden="true">·</span>
              <span>1,384 Google Ratings</span>
              <span aria-hidden="true">·</span>
              <span>{RESTAURANT_INFO.cityRank}</span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#d4af37]" />
                <span>3rd Line, Guntur</span>
              </span>
            </div>

            {/* Operating status line */}
            <div className="flex items-center gap-2 text-xs">
              <span className={`inline-block w-2 h-2 rounded-full ${isOpen ? 'bg-emerald-400 animate-pulse' : 'bg-amber-500'}`} />
              <span className="font-medium text-[#e0d6cb]">
                {isOpen ? 'Open Now for Dining & Delivery' : 'Opens Daily at 12:00 PM'}
              </span>
              <span className="text-[#8c8278]">· Regular Hours: 12:00 PM – 11:00 PM</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-normal text-[#fcf9f2] tracking-tight leading-[1.15] text-balance">
              Where Royal Dum Biryani Meets Coastal Spiced Prawns
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-[#b8aca0] max-w-2xl leading-relaxed">
              Signature Dine welcomes you to calm, comfortable dining, beloved for tender prawns, aromatic biryanis, and private family alcoves hosted with heart.
            </p>

            {/* Primary Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href="#menu"
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold tracking-wide uppercase text-black bg-[#d4af37] hover:bg-[#e6c148] rounded-lg transition-all shadow-md hover:shadow-lg cursor-pointer whitespace-nowrap"
              >
                <Utensils className="w-4 h-4" />
                <span>Explore Menu & Order</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={() => setIsBookingOpen(true)}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold tracking-wide uppercase text-[#f5ebd7] bg-[#221c17] hover:bg-[#2d251f] border border-[#42372c] rounded-lg transition-colors cursor-pointer whitespace-nowrap"
              >
                <Users className="w-4 h-4 text-[#d4af37]" />
                <span>Reserve Private Family Table</span>
              </button>
            </div>

            {/* Key Quality Markers */}
            <div className="pt-6 border-t border-[#26211c] grid grid-cols-3 gap-4 text-left">
              <div>
                <div className="text-xl sm:text-2xl font-serif text-[#f5ebd7] font-semibold tabular-nums">
                  ₹200–₹400
                </div>
                <div className="text-xs text-[#9c9085] mt-0.5">Average Spend per Diner</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-serif text-[#f5ebd7] font-semibold tabular-nums">
                  13+ Guests
                </div>
                <div className="text-xs text-[#9c9085] mt-0.5">Private Alcove Capacity</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-serif text-[#f5ebd7] font-semibold">
                  100% Halal & Fresh
                </div>
                <div className="text-xs text-[#9c9085] mt-0.5">Finest Coastal Produce</div>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Platter with Fallback Container */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-[#332b24] bg-[#1a1613] shadow-2xl group">
              <img
                src="/src/assets/images/hero_biryani_platter_1791001924016.jpg"
                alt="Signature Dum Biryani cooked with fragrant basmati and traditional spices"
                referrerPolicy="no-referrer"
                className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.style.display = 'none';
                }}
              />
              
              {/* Subtle gradient scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#100e0d] via-transparent to-black/20 pointer-events-none" />

              {/* Bottom Caption Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-[#100e0d] via-[#100e0d]/90 to-transparent">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold text-[#d4af37] uppercase tracking-wider">
                      Chef's Pride
                    </div>
                    <div className="text-lg font-serif text-[#fcf9f2] font-medium">
                      Special Guntur Chicken Dum Biryani
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-sm font-semibold text-[#fcf9f2]">₹320</span>
                    <span className="block text-[11px] text-[#9c9085]">Serves 1-2</span>
                  </div>
                </div>
              </div>

              {/* Top Accent Floating Tag */}
              <div className="absolute top-4 left-4 bg-[#141210]/85 backdrop-blur-md border border-[#3d342c] px-3 py-1.5 rounded-lg text-xs text-[#e8e4df] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>Guntur's Preferred Biryani</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
