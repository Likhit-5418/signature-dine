import React, { useState } from 'react';
import { X, Calendar, Clock, Users, CheckCircle2, MapPin, Sparkles, Phone } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { RESTAURANT_INFO } from '../data/restaurantData';

export const BookingModal: React.FC = () => {
  const { isBookingOpen, setIsBookingOpen } = useCart();

  const [guests, setGuests] = useState('4');
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [timeSlot, setTimeSlot] = useState('1:00 PM');
  const [seatingType, setSeatingType] = useState<'hall' | 'private' | 'celebration'>('hall');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [specialRequest, setSpecialRequest] = useState('');
  
  const [confirmedBooking, setConfirmedBooking] = useState<{
    code: string;
    name: string;
    guests: string;
    date: string;
    time: string;
    seating: string;
  } | null>(null);

  if (!isBookingOpen) return null;

  const lunchSlots = ['12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM'];
  const dinnerSlots = ['7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM', '10:00 PM'];

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    const randomCode = 'SIG-' + Math.floor(1000 + Math.random() * 9000);
    const seatingLabels = {
      hall: 'Standard Dining Hall (Calm)',
      private: 'Private Family Alcove (Kids Friendly)',
      celebration: 'Celebration / Birthday Setup'
    };

    setConfirmedBooking({
      code: randomCode,
      name,
      guests,
      date,
      time: timeSlot,
      seating: seatingLabels[seatingType],
    });
  };

  const handleResetAndClose = () => {
    setConfirmedBooking(null);
    setIsBookingOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in">
      <div className="bg-[#191512] border border-[#382f25] rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={handleResetAndClose}
          className="absolute top-5 right-5 p-2 rounded-lg text-[#9e9285] hover:text-[#f5ebd7] hover:bg-[#251e18] transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {confirmedBooking ? (
          <div className="py-6 space-y-6 text-center">
            <div className="w-16 h-16 bg-[#d4af37]/20 border border-[#d4af37] rounded-full flex items-center justify-center mx-auto text-[#d4af37]">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div>
              <div className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
                Table Reserved Successfully
              </div>
              <h3 className="text-2xl font-serif text-[#fcf9f2] font-semibold mt-1">
                We Look Forward to Hosting You, {confirmedBooking.name}
              </h3>
              <p className="text-xs text-[#a3988d] mt-1.5">
                A table confirmation SMS has been prepared for {phone}.
              </p>
            </div>

            {/* Ticket Card */}
            <div className="bg-[#120f0d] border border-[#332b22] rounded-xl p-5 text-left space-y-3 font-sans">
              <div className="flex justify-between items-center pb-3 border-b border-[#251e18]">
                <span className="text-xs text-[#8c8074]">Booking Reference</span>
                <span className="font-mono text-sm font-bold text-[#d4af37] tracking-wider">
                  {confirmedBooking.code}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-[#8c8074] block">Date & Time</span>
                  <span className="text-[#f5ebd7] font-medium">{confirmedBooking.date} at {confirmedBooking.time}</span>
                </div>
                <div>
                  <span className="text-[#8c8074] block">Party Size</span>
                  <span className="text-[#f5ebd7] font-medium">{confirmedBooking.guests} Guests</span>
                </div>
                <div className="col-span-2">
                  <span className="text-[#8c8074] block">Seating Preference</span>
                  <span className="text-[#d4af37] font-medium">{confirmedBooking.seating}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-[#251e18] flex items-center gap-2 text-[11px] text-[#8c8074]">
                <MapPin className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>3rd Line, Guntur, Andhra Pradesh (Opens 12:00 PM)</span>
              </div>
            </div>

            <div className="space-y-2">
              <button
                onClick={handleResetAndClose}
                className="w-full py-3 text-xs font-semibold uppercase tracking-wider text-black bg-[#d4af37] hover:bg-[#e6c148] rounded-lg transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleBookingSubmit} className="space-y-5">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-[#d4af37]">
                Zero Waiting · Guaranteed Table
              </div>
              <h3 className="text-2xl font-serif text-[#fcf9f2] font-semibold mt-1">
                Reserve Table or Private Alcove
              </h3>
              <p className="text-xs text-[#a3988d] mt-1">
                Experience prompt hosting at Signature Dine. Special family alcoves available for 6 to 20 guests.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#d8cfc4] mb-1.5 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>Number of Guests</span>
                </label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="w-full px-3 py-2 bg-[#120f0d] border border-[#302820] rounded-lg text-xs text-[#f5ebd7] focus:outline-none focus:border-[#d4af37]"
                >
                  <option value="1-2">1 to 2 Diners (Couple / Solo)</option>
                  <option value="3-4">3 to 4 Diners (Small Family)</option>
                  <option value="5-7">5 to 7 Diners (Family Group)</option>
                  <option value="8-12">8 to 12 Diners (Private Alcove)</option>
                  <option value="13-20">13 to 20 Diners (Full Private Section)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#d8cfc4] mb-1.5 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>Dining Date</span>
                </label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3 py-2 bg-[#120f0d] border border-[#302820] rounded-lg text-xs text-[#f5ebd7] focus:outline-none focus:border-[#d4af37]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#d8cfc4] mb-2">
                Preferred Seating Area:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <button
                  type="button"
                  onClick={() => setSeatingType('hall')}
                  className={`p-3 rounded-xl text-left border text-xs transition-colors cursor-pointer ${
                    seatingType === 'hall'
                      ? 'bg-[#29221b] border-[#d4af37] text-[#f5ebd7]'
                      : 'bg-[#120f0d] border-[#2e261f] text-[#9c9085] hover:border-[#42372c]'
                  }`}
                >
                  <div className="font-semibold text-[#f5ebd7]">Main Dining Hall</div>
                  <div className="text-[11px] text-[#8c8074] mt-0.5">Calm, air conditioned</div>
                </button>

                <button
                  type="button"
                  onClick={() => setSeatingType('private')}
                  className={`p-3 rounded-xl text-left border text-xs transition-colors cursor-pointer ${
                    seatingType === 'private'
                      ? 'bg-[#29221b] border-[#d4af37] text-[#f5ebd7]'
                      : 'bg-[#120f0d] border-[#2e261f] text-[#9c9085] hover:border-[#42372c]'
                  }`}
                >
                  <div className="font-semibold text-[#d4af37] flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    <span>Private Alcove</span>
                  </div>
                  <div className="text-[11px] text-[#8c8074] mt-0.5">Kids & joint family privacy</div>
                </button>

                <button
                  type="button"
                  onClick={() => setSeatingType('celebration')}
                  className={`p-3 rounded-xl text-left border text-xs transition-colors cursor-pointer ${
                    seatingType === 'celebration'
                      ? 'bg-[#29221b] border-[#d4af37] text-[#f5ebd7]'
                      : 'bg-[#120f0d] border-[#2e261f] text-[#9c9085] hover:border-[#42372c]'
                  }`}
                >
                  <div className="font-semibold text-[#f5ebd7]">Celebration Table</div>
                  <div className="text-[11px] text-[#8c8074] mt-0.5">Birthday / Anniversary</div>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#d8cfc4] mb-2 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>Select Dining Slot:</span>
              </label>
              
              <div className="space-y-2">
                <div>
                  <span className="text-[11px] text-[#8c8074] block mb-1">Lunch Slots (12PM - 3:30PM)</span>
                  <div className="flex flex-wrap gap-1.5">
                    {lunchSlots.map(slot => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setTimeSlot(slot)}
                        className={`px-2.5 py-1 text-xs rounded border transition-colors cursor-pointer font-mono ${
                          timeSlot === slot
                            ? 'bg-[#d4af37] text-black font-semibold border-[#d4af37]'
                            : 'bg-[#120f0d] text-[#a3988d] border-[#2b231c] hover:border-[#4d3d2e]'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-1">
                  <span className="text-[11px] text-[#8c8074] block mb-1">Dinner Slots (7PM - 10:30PM)</span>
                  <div className="flex flex-wrap gap-1.5">
                    {dinnerSlots.map(slot => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setTimeSlot(slot)}
                        className={`px-2.5 py-1 text-xs rounded border transition-colors cursor-pointer font-mono ${
                          timeSlot === slot
                            ? 'bg-[#d4af37] text-black font-semibold border-[#d4af37]'
                            : 'bg-[#120f0d] text-[#a3988d] border-[#2b231c] hover:border-[#4d3d2e]'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#d8cfc4] mb-1">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Sasank Kanulla"
                  className="w-full px-3 py-2 bg-[#120f0d] border border-[#302820] rounded-lg text-xs text-[#f5ebd7] focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#d8cfc4] mb-1 flex items-center gap-1">
                  <Phone className="w-3 h-3 text-[#d4af37]" />
                  <span>Phone Number</span>
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 98480 12345"
                  className="w-full px-3 py-2 bg-[#120f0d] border border-[#302820] rounded-lg text-xs text-[#f5ebd7] focus:outline-none focus:border-[#d4af37]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#d8cfc4] mb-1">
                Special Requests (Spice preferences, kids high chairs, celebrations)
              </label>
              <input
                type="text"
                value={specialRequest}
                onChange={(e) => setSpecialRequest(e.target.value)}
                placeholder="e.g. Need mild starters for children, anniversary cake table"
                className="w-full px-3 py-2 bg-[#120f0d] border border-[#302820] rounded-lg text-xs text-[#f5ebd7] focus:outline-none focus:border-[#d4af37]"
              />
            </div>

            <div className="pt-3 border-t border-[#2e261f] flex items-center justify-between gap-4">
              <span className="text-[11px] text-[#8c8074]">
                Instant reservation · No pre-payment required
              </span>
              <button
                type="submit"
                className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-black bg-[#d4af37] hover:bg-[#e6c148] rounded-lg transition-colors cursor-pointer"
              >
                Confirm Reservation
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
