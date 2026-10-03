import React from 'react';
import { MapPin, Clock, Phone, CreditCard, Wifi, UtensilsCrossed, Calendar, Car, Navigation, AlertCircle, Award } from 'lucide-react';
import { RESTAURANT_INFO, NEARBY_RESTAURANTS } from '../data/restaurantData';

export const LocationAndHours: React.FC = () => {
  const now = new Date();
  const currentHour = now.getHours();
  const isOpen = currentHour >= RESTAURANT_INFO.hours.openHour && currentHour < RESTAURANT_INFO.hours.closeHour;

  const daysSchedule = [
    { day: 'Monday', hours: '12:00 PM – 11:00 PM', lunch: '12PM–3:30PM', dinner: '7PM–11PM' },
    { day: 'Tuesday', hours: '12:00 PM – 11:00 PM', lunch: '12PM–3:30PM', dinner: '7PM–11PM' },
    { day: 'Wednesday', hours: '12:00 PM – 11:00 PM', lunch: '12PM–3:30PM', dinner: '7PM–11PM' },
    { day: 'Thursday', hours: '12:00 PM – 11:00 PM', lunch: '12PM–3:30PM', dinner: '7PM–11PM' },
    { day: 'Friday', hours: '12:00 PM – 11:00 PM', lunch: '12PM–3:30PM', dinner: '7PM–11PM' },
    { day: 'Saturday', hours: '12:00 PM – 11:00 PM', lunch: '12PM–3:30PM', dinner: '7PM–11PM', active: true },
    { day: 'Sunday', hours: '12:00 PM – 11:00 PM', lunch: '12PM–3:30PM', dinner: '7PM–11PM' },
  ];

  return (
    <section id="location" className="py-16 sm:py-24 bg-[#100e0d] border-b border-[#29221b]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold mb-2">
            Visit & Contact
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-[#fcf9f2] tracking-tight">
            Find Us in the Heart of Guntur
          </h2>
          <p className="mt-2 text-sm text-[#a3988d]">
            Conveniently situated on 3rd Line, Guntur with valet assistance, takeaway counter, and cozy dine-in spaces.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Location & Amenities */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Interactive Map Visual Representation */}
            <div className="relative rounded-2xl overflow-hidden border border-[#332b23] bg-[#1a1512] p-6 shadow-xl space-y-5">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#29221b]">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-[#26201a] border border-[#3d3227] text-[#d4af37] shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-serif font-semibold text-[#f5ebd7]">
                      3rd Line, Guntur
                    </h3>
                    <p className="text-xs text-[#a3988d] mt-0.5">
                      3rd Line, Guntur, Andhra Pradesh, India
                    </p>
                  </div>
                </div>

                <a
                  href="https://maps.google.com/?q=3rd+Line+Guntur+Andhra+Pradesh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-black bg-[#d4af37] hover:bg-[#e6c148] rounded-lg transition-colors cursor-pointer self-start sm:self-auto shrink-0"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Get Directions</span>
                </a>
              </div>

              {/* Graphic Map stylized grid */}
              <div className="h-44 w-full bg-[#14110e] rounded-xl border border-[#2b241d] p-4 flex flex-col justify-between relative overflow-hidden">
                <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:16px_16px]" />
                
                <div className="relative z-10 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-[#8c8074] uppercase tracking-wider">
                    Guntur City Center · Andhra Pradesh
                  </span>
                  <span className="text-[11px] text-[#e5b340] font-medium flex items-center gap-1">
                    <Award className="w-3.5 h-3.5" />
                    <span>Top Rated on 3rd Line</span>
                  </span>
                </div>

                <div className="relative z-10 text-center my-auto">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#29221b]/95 border border-[#d4af37] shadow-lg">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-xs font-serif font-semibold text-[#f5ebd7]">
                      Signature Dine (New)
                    </span>
                  </div>
                  <p className="text-[11px] text-[#8c8074] mt-1.5">
                    Landmark: Central 3rd Line Dining Corridor
                  </p>
                </div>

                <div className="relative z-10 flex items-center justify-between text-[11px] text-[#8c8074]">
                  <span>Near Brodipet & Lakshmipuram Junctions</span>
                  <span className="font-mono text-[#f5ebd7]">5 Min from Guntur Railway Station</span>
                </div>
              </div>

              {/* Amenities Grid */}
              <div>
                <h4 className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold mb-3">
                  Restaurant Amenities & Services
                </h4>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="p-3 bg-[#13100e] rounded-lg border border-[#26201a] flex flex-col items-center text-center">
                    <CreditCard className="w-4 h-4 text-[#d4af37] mb-1.5" />
                    <span className="text-[#f5ebd7] font-medium">Credit Cards</span>
                    <span className="text-[10px] text-[#8c8074]">Accepted</span>
                  </div>

                  <div className="p-3 bg-[#13100e] rounded-lg border border-[#26201a] flex flex-col items-center text-center">
                    <Wifi className="w-4 h-4 text-[#d4af37] mb-1.5" />
                    <span className="text-[#f5ebd7] font-medium">Free Wi-Fi</span>
                    <span className="text-[10px] text-[#8c8074]">High Speed</span>
                  </div>

                  <div className="p-3 bg-[#13100e] rounded-lg border border-[#26201a] flex flex-col items-center text-center">
                    <UtensilsCrossed className="w-4 h-4 text-[#d4af37] mb-1.5" />
                    <span className="text-[#f5ebd7] font-medium">Takeaway & Delivery</span>
                    <span className="text-[10px] text-[#8c8074]">Packaged hot</span>
                  </div>

                  <div className="p-3 bg-[#13100e] rounded-lg border border-[#26201a] flex flex-col items-center text-center">
                    <Calendar className="w-4 h-4 text-[#d4af37] mb-1.5" />
                    <span className="text-[#f5ebd7] font-medium">Table Booking</span>
                    <span className="text-[10px] text-[#8c8074]">Available</span>
                  </div>
                </div>

                {/* Accessibility Transparency */}
                <div className="mt-3 flex items-center gap-2 p-2.5 rounded-lg bg-[#181310] border border-[#2d241d] text-xs text-[#a3988d]">
                  <AlertCircle className="w-4 h-4 text-[#d4af37] shrink-0" />
                  <span>
                    <strong>Note:</strong> Building has a short staircase entrance (not wheelchair accessible). Our staff gladly assists elderly guests with step access.
                  </span>
                </div>
              </div>

            </div>

            {/* Nearby Guntur Restaurants Context */}
            <div className="bg-[#171310] rounded-xl border border-[#2e261f] p-5">
              <div className="text-xs uppercase tracking-wider text-[#8c8074] font-medium mb-3">
                Dining Ecosystem in Guntur
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {NEARBY_RESTAURANTS.map((item, idx) => (
                  <div
                    key={idx}
                    className={`p-2.5 rounded-lg border flex items-center justify-between ${
                      item.isCurrent
                        ? 'bg-[#26201a] border-[#d4af37] text-[#f5ebd7]'
                        : 'bg-[#120f0d] border-[#29221b] text-[#9c9085]'
                    }`}
                  >
                    <div>
                      <span className="font-medium text-[#f5ebd7] block">{item.name}</span>
                      <span className="text-[10px] text-[#8c8074]">{item.rank}</span>
                    </div>
                    {item.isCurrent && (
                      <span className="text-[10px] font-bold text-black bg-[#d4af37] px-2 py-0.5 rounded">
                        You Are Here
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Operating Hours & Direct Contact */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-[#1a1512] rounded-2xl border border-[#332b23] p-6 shadow-xl space-y-5">
              
              <div className="flex items-center justify-between pb-4 border-b border-[#29221b]">
                <div className="flex items-center gap-2.5">
                  <Clock className="w-5 h-5 text-[#d4af37]" />
                  <h3 className="text-lg font-serif font-semibold text-[#f5ebd7]">
                    Operating Hours
                  </h3>
                </div>

                <div className="flex items-center gap-1.5 text-xs">
                  <span className={`w-2 h-2 rounded-full ${isOpen ? 'bg-emerald-400' : 'bg-amber-500'}`} />
                  <span className="text-[#f5ebd7] font-medium">
                    {isOpen ? 'Open Now' : 'Closed · Opens 12PM'}
                  </span>
                </div>
              </div>

              {/* Schedule list */}
              <div className="space-y-2 text-xs">
                {daysSchedule.map((s, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center justify-between py-2 px-3 rounded-lg ${
                      s.active
                        ? 'bg-[#26201a] border border-[#3d3227] text-[#f5ebd7]'
                        : 'text-[#9c9085] hover:bg-[#15120f]'
                    }`}
                  >
                    <span className="font-medium text-[#f5ebd7]">{s.day}</span>
                    <div className="text-right font-mono">
                      <span className="text-[#d8cfc4]">{s.hours}</span>
                      <span className="block text-[10px] text-[#8c8074]">Lunch {s.lunch} · Dinner {s.dinner}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Contact Box */}
              <div className="pt-4 border-t border-[#29221b] space-y-3">
                <div className="text-xs font-semibold text-[#d4af37] uppercase tracking-wider">
                  Direct Line & Instant Reservation
                </div>

                <a
                  href={`tel:${RESTAURANT_INFO.phone}`}
                  className="flex items-center justify-between p-3 rounded-xl bg-[#120f0d] border border-[#2e261f] hover:border-[#d4af37] transition-colors group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-[#d4af37]" />
                    <div>
                      <span className="text-xs text-[#8c8074] block">Call for Inquiries & Pre-Orders</span>
                      <span className="font-mono text-sm font-semibold text-[#f5ebd7] group-hover:text-[#d4af37]">
                        {RESTAURANT_INFO.phone}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-medium text-[#d4af37]">Call</span>
                </a>

                <div className="p-3 rounded-xl bg-[#120f0d] border border-[#2e261f]">
                  <span className="text-xs text-[#8c8074] block">WhatsApp Desk</span>
                  <span className="font-mono text-sm font-semibold text-[#f5ebd7]">
                    {RESTAURANT_INFO.whatsapp}
                  </span>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
