import React from 'react';
import { Users, HeartHandshake, Clock, ShieldCheck, Sparkles, Calendar } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const PrivateDiningSection: React.FC = () => {
  const { setIsBookingOpen } = useCart();

  return (
    <section id="private-dining" className="py-16 sm:py-24 bg-[#100e0d] border-b border-[#29221b] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div id="ambience" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Image with measured scrim */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden border border-[#332b24] bg-[#1a1613] shadow-2xl">
              <img
                src="/src/assets/images/ambiance_signature_dine_1791001948590.jpg"
                alt="Signature Dine Private Family Dining Room and Calm Ambience"
                referrerPolicy="no-referrer"
                className="w-full aspect-[16/10] object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#100e0d] via-black/20 to-transparent" />
              
              {/* Overlay note highlighting Sravani & team hosting */}
              <div className="absolute bottom-4 left-4 right-4 bg-[#141210]/90 backdrop-blur-md border border-[#3d342c] p-4 rounded-xl">
                <div className="flex items-start gap-3">
                  <HeartHandshake className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-semibold text-[#f5ebd7]">
                      Hosted with Personal Care
                    </div>
                    <p className="text-[12px] text-[#b3a79a] mt-0.5 leading-snug">
                      “They managed to give a private place for us, kids enjoyed the privacy. We have been hosted by Sravani—she handled 13 people with patience.”
                    </p>
                    <span className="text-[11px] text-[#8a7e72] mt-1 block">
                      — Sasank K., Verified Family Diner
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial & Features */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
              Family-First Dining Experience
            </div>

            <h2 className="text-3xl sm:text-4xl font-serif text-[#fcf9f2] tracking-tight">
              Calm Ambiance & Private Spaces for Cherished Gatherings
            </h2>

            <p className="text-sm sm:text-base text-[#b8aca0] leading-relaxed">
              Dining with a large family or celebrating a special milestone? Avoid waiting during peak hours by reserving one of Signature Dine’s secluded family alcoves. Designed for comfort, privacy, and seamless multi-course feasts.
            </p>

            {/* Feature List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              
              <div className="p-4 bg-[#191512] rounded-xl border border-[#2e261f]">
                <div className="flex items-center gap-2.5 mb-1.5">
                  <Users className="w-4 h-4 text-[#d4af37]" />
                  <span className="text-sm font-semibold text-[#f5ebd7]">Up to 20 Guests</span>
                </div>
                <p className="text-xs text-[#9c9085] leading-normal">
                  Comfortably accommodate joint families, kids, and elders in a private, quiet dining zone.
                </p>
              </div>

              <div className="p-4 bg-[#191512] rounded-xl border border-[#2e261f]">
                <div className="flex items-center gap-2.5 mb-1.5">
                  <Clock className="w-4 h-4 text-[#d4af37]" />
                  <span className="text-sm font-semibold text-[#f5ebd7]">Zero Wait-Time</span>
                </div>
                <p className="text-xs text-[#9c9085] leading-normal">
                  Direct table readiness upon arrival. No waiting in lines outside during weekend rushes.
                </p>
              </div>

              <div className="p-4 bg-[#191512] rounded-xl border border-[#2e261f]">
                <div className="flex items-center gap-2.5 mb-1.5">
                  <Sparkles className="w-4 h-4 text-[#d4af37]" />
                  <span className="text-sm font-semibold text-[#f5ebd7]">Kid & Elder Menus</span>
                </div>
                <p className="text-xs text-[#9c9085] leading-normal">
                  Custom low-spice starters and soothing curries crafted specially for sensitive palates.
                </p>
              </div>

              <div className="p-4 bg-[#191512] rounded-xl border border-[#2e261f]">
                <div className="flex items-center gap-2.5 mb-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
                  <span className="text-sm font-semibold text-[#f5ebd7]">Celebration Setups</span>
                </div>
                <p className="text-xs text-[#9c9085] leading-normal">
                  Ideal for birthdays, anniversaries, and corporate lunches with attentive staff.
                </p>
              </div>

            </div>

            {/* CTA */}
            <div className="pt-2">
              <button
                onClick={() => setIsBookingOpen(true)}
                className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-black bg-[#d4af37] hover:bg-[#e6c148] rounded-lg transition-colors cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Reserve Private Family Dining</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
