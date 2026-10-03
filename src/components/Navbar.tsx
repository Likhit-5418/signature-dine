import React, { useState } from 'react';
import { ShoppingBag, Calendar, Menu as MenuIcon, X, Phone } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { RESTAURANT_INFO } from '../data/restaurantData';

export const Navbar: React.FC = () => {
  const { totalItems, setIsCartOpen, setIsBookingOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#141210]/95 backdrop-blur-md border-b border-[#2d2722]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#"
            className="text-2xl sm:text-3xl font-serif tracking-wider text-[#f5ebd7] hover:text-[#d4af37] transition-colors whitespace-nowrap"
          >
            Signature Dine
          </a>

          {/* Zone 2: 4-6 clean text navigation links */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium tracking-wide text-[#b5aba0]">
            <a href="#menu" className="hover:text-[#f5ebd7] transition-colors">
              Menu
            </a>
            <a href="#ambience" className="hover:text-[#f5ebd7] transition-colors">
              Ambience
            </a>
            <a href="#private-dining" className="hover:text-[#f5ebd7] transition-colors">
              Private Dining
            </a>
            <a href="#reviews" className="hover:text-[#f5ebd7] transition-colors">
              Reviews
            </a>
            <a href="#location" className="hover:text-[#f5ebd7] transition-colors">
              Location & Hours
            </a>
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-lg text-[#e8e4df] bg-[#221d19] hover:bg-[#2d2621] border border-[#3d342c] transition-colors flex items-center gap-2 text-xs font-medium cursor-pointer"
              aria-label="View shopping bag"
            >
              <ShoppingBag className="w-4 h-4 text-[#d4af37]" />
              <span className="hidden sm:inline font-mono tabular-nums">Bag</span>
              {totalItems > 0 && (
                <span className="inline-flex items-center justify-center px-1.5 py-0.5 text-[11px] font-semibold text-black bg-[#d4af37] rounded-full min-w-[18px]">
                  {totalItems}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsBookingOpen(true)}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold tracking-wide uppercase text-black bg-[#d4af37] hover:bg-[#e4be45] rounded-lg transition-colors whitespace-nowrap cursor-pointer shadow-sm"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Table</span>
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-[#b5aba0] hover:text-[#f5ebd7] hover:bg-[#221d19]"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#2d2722] bg-[#171412] px-4 pt-3 pb-6 space-y-3">
          <div className="flex flex-col space-y-3 text-base text-[#d8cfc4]">
            <a
              href="#menu"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#d4af37] transition-colors"
            >
              Explore Menu
            </a>
            <a
              href="#ambience"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#d4af37] transition-colors"
            >
              Restaurant Ambience
            </a>
            <a
              href="#private-dining"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#d4af37] transition-colors"
            >
              Private Family Dining
            </a>
            <a
              href="#reviews"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#d4af37] transition-colors"
            >
              Guest Reviews (4.5★)
            </a>
            <a
              href="#location"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#d4af37] transition-colors"
            >
              Location & Timings
            </a>
          </div>

          <div className="pt-3 border-t border-[#2d2722] flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsBookingOpen(true);
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-semibold tracking-wider uppercase text-black bg-[#d4af37] rounded-lg cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Reserve a Table</span>
            </button>
            <a
              href={`tel:${RESTAURANT_INFO.phone}`}
              className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-medium text-[#e8e4df] bg-[#221d19] border border-[#3d342c] rounded-lg"
            >
              <Phone className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Call: {RESTAURANT_INFO.phone}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
