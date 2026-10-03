import React, { useState } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, Truck, Package, ArrowRight, CheckCircle2, Clock } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { RESTAURANT_INFO } from '../data/restaurantData';

export const CartDrawer: React.FC = () => {
  const { cart, updateQuantity, removeFromCart, clearCart, isCartOpen, setIsCartOpen, subtotal, totalItems } = useCart();
  
  const [orderType, setOrderType] = useState<'delivery' | 'takeaway'>('delivery');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'upi'>('upi');
  
  const [confirmedOrder, setConfirmedOrder] = useState<{
    orderId: string;
    itemsCount: number;
    totalAmount: number;
    type: 'delivery' | 'takeaway';
    customerName: string;
    address: string;
    prepMinutes: number;
  } | null>(null);

  if (!isCartOpen) return null;

  const gst = Math.round(subtotal * 0.05);
  const packagingFee = subtotal > 500 ? 0 : 25;
  const deliveryFee = orderType === 'delivery' ? (subtotal >= 499 ? 0 : 40) : 0;
  const grandTotal = subtotal + gst + packagingFee + deliveryFee;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim()) return;
    if (orderType === 'delivery' && !deliveryAddress.trim()) return;

    const orderId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
    setConfirmedOrder({
      orderId,
      itemsCount: totalItems,
      totalAmount: grandTotal,
      type: orderType,
      customerName,
      address: orderType === 'delivery' ? deliveryAddress : 'Signature Dine Counter, 3rd Line, Guntur',
      prepMinutes: orderType === 'delivery' ? 35 : 20,
    });
    clearCart();
  };

  const handleCloseAndFinish = () => {
    setConfirmedOrder(null);
    setIsCartOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#171310] border-l border-[#332b23] text-[#e8e4df] shadow-2xl flex flex-col justify-between">
          
          <div className="p-5 border-b border-[#29221b] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-[#d4af37]" />
              <h3 className="text-lg font-serif font-semibold text-[#fcf9f2]">
                Your Order Bag
              </h3>
              {totalItems > 0 && (
                <span className="font-mono text-xs px-2 py-0.5 rounded-full bg-[#26201a] border border-[#3b3127] text-[#d4af37]">
                  {totalItems} items
                </span>
              )}
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-lg text-[#9c9085] hover:text-[#f5ebd7] hover:bg-[#251e18] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {confirmedOrder ? (
            <div className="p-6 flex-1 overflow-y-auto space-y-6 flex flex-col justify-center text-center">
              <div className="w-16 h-16 bg-[#d4af37]/20 border border-[#d4af37] rounded-full flex items-center justify-center mx-auto text-[#d4af37]">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <div className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
                  Kitchen Received Order
                </div>
                <h4 className="text-2xl font-serif text-[#fcf9f2] font-semibold mt-1">
                  Order #{confirmedOrder.orderId}
                </h4>
                <p className="text-xs text-[#a3988d] mt-1">
                  Thank you, {confirmedOrder.customerName}. Fresh preparation has begun!
                </p>
              </div>

              <div className="bg-[#120f0d] border border-[#2e261e] rounded-xl p-4 text-left space-y-3 font-sans">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#8c8074]">Order Method</span>
                  <span className="capitalize font-semibold text-[#f5ebd7]">{confirmedOrder.type}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#8c8074]">Estimated Ready Time</span>
                  <span className="flex items-center gap-1 font-mono font-semibold text-[#d4af37]">
                    <Clock className="w-3.5 h-3.5" />
                    <span>~{confirmedOrder.prepMinutes} Mins</span>
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#8c8074]">Total Amount to Pay</span>
                  <span className="font-mono font-bold text-[#fcf9f2]">₹{confirmedOrder.totalAmount}</span>
                </div>
                <div className="pt-2 border-t border-[#251e18] text-[11px] text-[#8c8074]">
                  <span className="block font-medium text-[#d8cfc4] mb-0.5">Destination:</span>
                  <span>{confirmedOrder.address}</span>
                </div>
              </div>

              <div className="text-xs text-[#a3988d]">
                For questions, reach our restaurant desk at <span className="text-[#d4af37]">{RESTAURANT_INFO.phone}</span>.
              </div>

              <button
                onClick={handleCloseAndFinish}
                className="w-full py-3 text-xs font-semibold uppercase tracking-wider text-black bg-[#d4af37] hover:bg-[#e6c148] rounded-lg transition-colors cursor-pointer"
              >
                Return to Restaurant
              </button>
            </div>
          ) : cart.length === 0 ? (
            <div className="p-8 flex-1 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-full bg-[#201a15] border border-[#332a22] flex items-center justify-center text-[#8a7f73] mb-4">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-serif text-[#f5ebd7]">Your bag is currently empty</h4>
              <p className="text-xs text-[#9c9085] max-w-xs mt-1">
                Explore our signature biryanis, prawns fry, paneer karivepaku and delicious tandoor breads.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="mt-6 px-5 py-2.5 text-xs font-semibold uppercase text-black bg-[#d4af37] rounded-lg cursor-pointer"
              >
                Browse Menu
              </button>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto flex flex-col justify-between">
              <div className="p-5 space-y-5">
                <div className="grid grid-cols-2 gap-2 bg-[#120f0d] p-1 rounded-xl border border-[#2b241e]">
                  <button
                    type="button"
                    onClick={() => setOrderType('delivery')}
                    className={`flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                      orderType === 'delivery'
                        ? 'bg-[#2b241e] text-[#f5ebd7] shadow-sm'
                        : 'text-[#8a7e72] hover:text-[#f5ebd7]'
                    }`}
                  >
                    <Truck className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>Home Delivery</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setOrderType('takeaway')}
                    className={`flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                      orderType === 'takeaway'
                        ? 'bg-[#2b241e] text-[#f5ebd7] shadow-sm'
                        : 'text-[#8a7e72] hover:text-[#f5ebd7]'
                    }`}
                  >
                    <Package className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>Takeaway Pickup</span>
                  </button>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-[#8c8074] pb-1 border-b border-[#241d17]">
                    <span>Item & Customization</span>
                    <button
                      onClick={clearCart}
                      className="hover:text-red-400 transition-colors text-[11px] cursor-pointer"
                    >
                      Clear Bag
                    </button>
                  </div>

                  {cart.map(cartItem => (
                    <div
                      key={cartItem.item.id + cartItem.selectedSpice}
                      className="bg-[#1c1714] rounded-xl border border-[#2d251e] p-3 flex items-center justify-between gap-3"
                    >
                      {cartItem.item.image && (
                        <img
                          src={cartItem.item.image}
                          alt={cartItem.item.name}
                          className="w-12 h-12 rounded-lg object-cover shrink-0 border border-[#382e25]"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`w-2 h-2 rounded-full shrink-0 ${
                              cartItem.item.isVeg ? 'bg-emerald-500' : 'bg-red-500'
                            }`}
                          />
                          <h5 className="text-xs font-medium text-[#f5ebd7] truncate">
                            {cartItem.item.name}
                          </h5>
                        </div>
                        <div className="text-[11px] text-[#8c8074] mt-0.5 flex items-center gap-1.5">
                          <span className="capitalize">{cartItem.selectedSpice} spice</span>
                          {cartItem.specialNote && (
                            <>
                              <span>·</span>
                              <span className="text-[#a3988d] italic truncate">{cartItem.specialNote}</span>
                            </>
                          )}
                        </div>
                        <div className="font-mono text-xs font-semibold text-[#fcf9f2] mt-1 tabular-nums">
                          ₹{cartItem.item.price * cartItem.quantity}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 bg-[#120f0d] border border-[#2b241e] rounded-lg p-1">
                        <button
                          onClick={() => updateQuantity(cartItem.item.id, -1)}
                          className="p-1 text-[#9c9085] hover:text-[#f5ebd7] cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-mono text-xs font-semibold w-4 text-center tabular-nums">
                          {cartItem.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(cartItem.item.id, 1)}
                          className="p-1 text-[#9c9085] hover:text-[#f5ebd7] cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(cartItem.item.id)}
                        className="text-[#6e6358] hover:text-red-400 p-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                <form id="checkout-form" onSubmit={handleCheckout} className="space-y-3 pt-2">
                  <div className="text-xs font-semibold uppercase tracking-wider text-[#d4af37]">
                    Contact & Delivery Details
                  </div>

                  <div>
                    <label className="block text-[11px] text-[#a3988d] mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Niveditha Devathi"
                      className="w-full px-3 py-2 bg-[#120f0d] border border-[#2b241e] rounded-lg text-xs text-[#f5ebd7] focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-[#a3988d] mb-1">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="e.g. 98490 54321"
                      className="w-full px-3 py-2 bg-[#120f0d] border border-[#2b241e] rounded-lg text-xs text-[#f5ebd7] focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>

                  {orderType === 'delivery' && (
                    <div>
                      <label className="block text-[11px] text-[#a3988d] mb-1">
                        Delivery Address / Landmark in Guntur
                      </label>
                      <textarea
                        rows={2}
                        required
                        value={deliveryAddress}
                        onChange={(e) => setDeliveryAddress(e.target.value)}
                        placeholder="e.g. Flat 302, Sri Krishna Apts, near 3rd Line, Brodipet, Guntur"
                        className="w-full px-3 py-2 bg-[#120f0d] border border-[#2b241e] rounded-lg text-xs text-[#f5ebd7] focus:outline-none focus:border-[#d4af37]"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-[11px] text-[#a3988d] mb-1.5">Payment Method</label>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('upi')}
                        className={`p-2 rounded-lg border text-left cursor-pointer ${
                          paymentMethod === 'upi'
                            ? 'bg-[#2b241e] border-[#d4af37] text-[#f5ebd7]'
                            : 'bg-[#120f0d] border-[#2b241e] text-[#8c8074]'
                        }`}
                      >
                        <div className="font-medium text-[#f5ebd7]">UPI / QR on Delivery</div>
                        <div className="text-[10px] text-[#8c8074]">GPay / PhonePe / Paytm</div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod('cod')}
                        className={`p-2 rounded-lg border text-left cursor-pointer ${
                          paymentMethod === 'cod'
                            ? 'bg-[#2b241e] border-[#d4af37] text-[#f5ebd7]'
                            : 'bg-[#120f0d] border-[#2b241e] text-[#8c8074]'
                        }`}
                      >
                        <div className="font-medium text-[#f5ebd7]">Cash on Delivery</div>
                        <div className="text-[10px] text-[#8c8074]">Pay cash when received</div>
                      </button>
                    </div>
                  </div>
                </form>
              </div>

              <div className="p-5 border-t border-[#29221b] bg-[#14100e] space-y-3">
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-[#8c8074]">
                    <span>Item Subtotal</span>
                    <span className="font-mono text-[#f5ebd7] tabular-nums">₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-[#8c8074]">
                    <span>GST (5%)</span>
                    <span className="font-mono text-[#f5ebd7] tabular-nums">₹{gst}</span>
                  </div>
                  <div className="flex justify-between text-[#8c8074]">
                    <span>Restaurant Packaging</span>
                    <span className="font-mono text-[#f5ebd7] tabular-nums">
                      {packagingFee === 0 ? 'FREE (Orders > ₹500)' : `₹${packagingFee}`}
                    </span>
                  </div>
                  {orderType === 'delivery' && (
                    <div className="flex justify-between text-[#8c8074]">
                      <span>Delivery Fee</span>
                      <span className="font-mono text-[#f5ebd7] tabular-nums">
                        {deliveryFee === 0 ? 'FREE (Orders ≥ ₹499)' : `₹${deliveryFee}`}
                      </span>
                    </div>
                  )}
                  <div className="pt-2 border-t border-[#251e18] flex justify-between text-sm font-semibold">
                    <span className="text-[#fcf9f2]">Total Amount</span>
                    <span className="font-mono text-base text-[#d4af37] tabular-nums">
                      ₹{grandTotal}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  form="checkout-form"
                  className="w-full py-3.5 text-xs font-semibold uppercase tracking-wider text-black bg-[#d4af37] hover:bg-[#e6c148] rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-md"
                >
                  <span>Place {orderType === 'delivery' ? 'Delivery' : 'Takeaway'} Order</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
