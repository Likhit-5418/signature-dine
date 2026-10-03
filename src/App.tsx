import React from 'react';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MenuSection } from './components/MenuSection';
import { PrivateDiningSection } from './components/PrivateDiningSection';
import { ReviewsSection } from './components/ReviewsSection';
import { LocationAndHours } from './components/LocationAndHours';
import { BookingModal } from './components/BookingModal';
import { CartDrawer } from './components/CartDrawer';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-[#100e0d] text-[#e8e4df] flex flex-col font-sans selection:bg-[#d4af37] selection:text-black">
        <Navbar />
        <main className="flex-1">
          <Hero />
          <MenuSection />
          <PrivateDiningSection />
          <ReviewsSection />
          <LocationAndHours />
        </main>
        <Footer />
        <BookingModal />
        <CartDrawer />
      </div>
    </CartProvider>
  );
}
