import React from 'react';
import { Star, MapPin, Phone, Heart } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0c0a09] border-t border-[#221c17] text-[#a3988d] text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          
          {/* Brand info */}
          <div className="space-y-3">
            <span className="text-xl font-serif text-[#f5ebd7] tracking-wider block">
              Signature Dine
            </span>
            <p className="text-[#8c8074] leading-relaxed">
              Authentic Dum Biryani, coastal seafood & serene family dining in Guntur. Loved by over 1,380+ local diners on Google.
            </p>
            <div className="flex items-center gap-1.5 text-[#e5b340]">
              <Star className="w-3.5 h-3.5 fill-[#e5b340]" />
              <span className="font-mono font-semibold">4.5 / 5.0</span>
              <span className="text-[#8c8074]">· 1,384 Ratings</span>
            </div>
          </div>

          {/* Popular dishes in Guntur */}
          <div className="space-y-2.5">
            <h4 className="font-semibold text-xs text-[#f5ebd7] uppercase tracking-wider">
              Signature Specialties
            </h4>
            <ul className="space-y-1.5 text-[#8c8074]">
              <li><a href="#menu" className="hover:text-[#d4af37] transition-colors">Special Dum Biryani (Chicken & Mutton)</a></li>
              <li><a href="#menu" className="hover:text-[#d4af37] transition-colors">Guntur Spiced Royyala (Prawns) Fry</a></li>
              <li><a href="#menu" className="hover:text-[#d4af37] transition-colors">Paneer Karivepaku (Diner Favorite)</a></li>
              <li><a href="#menu" className="hover:text-[#d4af37] transition-colors">Butter Creamy Garlic Mushroom</a></li>
              <li><a href="#menu" className="hover:text-[#d4af37] transition-colors">Methi Chaman & Tomato Cashew Curry</a></li>
              <li><a href="#menu" className="hover:text-[#d4af37] transition-colors">Crispy Butter Garlic Naan</a></li>
            </ul>
          </div>

          {/* Quick links & services */}
          <div className="space-y-2.5">
            <h4 className="font-semibold text-xs text-[#f5ebd7] uppercase tracking-wider">
              Services & Amenities
            </h4>
            <ul className="space-y-1.5 text-[#8c8074]">
              <li><a href="#menu" className="hover:text-[#d4af37] transition-colors">Dine-In Menu</a></li>
              <li><a href="#private-dining" className="hover:text-[#d4af37] transition-colors">Private Family Alcoves (Up to 20 Guests)</a></li>
              <li><a href="#menu" className="hover:text-[#d4af37] transition-colors">Online Food Delivery & Takeaway</a></li>
              <li><a href="#location" className="hover:text-[#d4af37] transition-colors">Location & Timings (12PM–11PM)</a></li>
              <li><a href="#reviews" className="hover:text-[#d4af37] transition-colors">Guest Reviews & Ratings</a></li>
            </ul>
          </div>

          {/* Location & Contact */}
          <div className="space-y-2.5">
            <h4 className="font-semibold text-xs text-[#f5ebd7] uppercase tracking-wider">
              Address & Contact
            </h4>
            <div className="space-y-2 text-[#8c8074]">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                <span>3rd Line, Guntur, Andhra Pradesh, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#d4af37] shrink-0" />
                <a href={`tel:${RESTAURANT_INFO.phone}`} className="hover:text-[#f5ebd7]">
                  {RESTAURANT_INFO.phone}
                </a>
              </div>
              <div className="pt-2 text-[11px] text-[#786d62]">
                Open Daily: 12:00 PM – 11:00 PM (Lunch 12PM–3:30PM · Dinner 7PM–11PM)
              </div>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-[#1d1713] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#786d62]">
          <div>
            © {new Date().getFullYear()} Signature Dine (New). All rights reserved. 3rd Line, Guntur.
          </div>
          <div className="flex items-center gap-1">
            <span>Crafted with pride for Guntur’s food lovers</span>
            <Heart className="w-3 h-3 text-[#d4af37] fill-[#d4af37]" />
          </div>
        </div>
      </div>
    </footer>
  );
};
