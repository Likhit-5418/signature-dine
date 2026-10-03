import React, { useState, useMemo } from 'react';
import { Star, MessageSquarePlus, Search, CheckCircle } from 'lucide-react';
import { CUSTOMER_REVIEWS, ReviewItem, RESTAURANT_INFO } from '../data/restaurantData';

export const ReviewsSection: React.FC = () => {
  const [reviews, setReviews] = useState<ReviewItem[]>(CUSTOMER_REVIEWS);
  const [searchWord, setSearchWord] = useState('');
  const [activeTopic, setActiveTopic] = useState<string>('all');
  const [isAddReviewOpen, setIsAddReviewOpen] = useState(false);

  // Form state
  const [newAuthor, setNewAuthor] = useState('');
  const [newText, setNewText] = useState('');
  const [newFoodRating, setNewFoodRating] = useState(5);
  const [newServiceRating, setNewServiceRating] = useState(5);
  const [newAtmoRating, setNewAtmoRating] = useState(5);
  const [newMealType, setNewMealType] = useState('Dinner');
  const [newSpend, setNewSpend] = useState('₹200–400');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const topics = [
    { id: 'all', label: 'All Reviews (321)' },
    { id: 'biryani', label: 'Biryani' },
    { id: 'prawns', label: 'Prawns & Seafood' },
    { id: 'service', label: 'Staff & Hospitality' },
    { id: 'ambience', label: 'Ambience & Private Rooms' },
    { id: 'dinner', label: 'Dinner' },
    { id: 'lunch', label: 'Lunch' },
  ];

  const filteredReviews = useMemo(() => {
    return reviews.filter(rev => {
      if (activeTopic !== 'all') {
        const text = (rev.reviewText + ' ' + (rev.highlightedDish || '')).toLowerCase();
        if (activeTopic === 'biryani' && !text.includes('biryani')) return false;
        if (activeTopic === 'prawns' && !text.includes('prawn')) return false;
        if (activeTopic === 'service' && !text.includes('service') && !text.includes('host') && !text.includes('sravani') && !text.includes('staff')) return false;
        if (activeTopic === 'ambience' && !text.includes('ambience') && !text.includes('private') && !text.includes('atmosphere')) return false;
        if (activeTopic === 'dinner' && rev.mealType?.toLowerCase().includes('dinner') !== true) return false;
        if (activeTopic === 'lunch' && rev.mealType?.toLowerCase().includes('lunch') !== true) return false;
      }

      if (searchWord.trim()) {
        const query = searchWord.toLowerCase();
        const matchesAuthor = rev.author.toLowerCase().includes(query);
        const matchesText = rev.reviewText.toLowerCase().includes(query);
        const matchesDish = rev.highlightedDish?.toLowerCase().includes(query);
        if (!matchesAuthor && !matchesText && !matchesDish) return false;
      }
      return true;
    });
  }, [reviews, activeTopic, searchWord]);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newText.trim()) return;

    const overall = Number(((newFoodRating + newServiceRating + newAtmoRating) / 3).toFixed(1));
    const newEntry: ReviewItem = {
      id: `rev-${Date.now()}`,
      author: newAuthor.trim(),
      avatarLetter: newAuthor.trim().charAt(0).toUpperCase(),
      rating: overall,
      timeAgo: 'Just now',
      source: 'Verified Customer',
      reviewText: newText.trim(),
      ratingsBreakdown: {
        food: newFoodRating,
        service: newServiceRating,
        atmosphere: newAtmoRating,
      },
      mealType: newMealType,
      pricePerPerson: newSpend,
      verified: true,
      highlightedDish: 'Recent Dining Guest'
    };

    setReviews([newEntry, ...reviews]);
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setIsAddReviewOpen(false);
      setNewAuthor('');
      setNewText('');
    }, 1200);
  };

  return (
    <section id="reviews" className="py-16 sm:py-24 bg-[#14110f] border-b border-[#29221b]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold mb-2">
              Genuine Diner Testimonials
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#fcf9f2] tracking-tight">
              Ratings & Reviews from Google
            </h2>
            <p className="mt-2 text-sm text-[#a3988d]">
              Rated 4.5 out of 5 based on 1,384 independent customer reviews in Guntur.
            </p>
          </div>

          <button
            onClick={() => setIsAddReviewOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#f5ebd7] bg-[#221c17] hover:bg-[#2d251f] border border-[#42372c] rounded-lg transition-colors cursor-pointer self-start md:self-auto"
          >
            <MessageSquarePlus className="w-4 h-4 text-[#d4af37]" />
            <span>Add Your Review</span>
          </button>
        </div>

        {/* Rating Summary Card */}
        <div className="bg-[#1b1714] border border-[#332b23] rounded-2xl p-6 sm:p-8 mb-10 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Left Score Box */}
            <div className="md:col-span-4 text-center md:text-left md:border-r border-[#2d261f] md:pr-8">
              <div className="text-5xl font-serif font-bold text-[#fcf9f2] tabular-nums">
                4.5
              </div>
              <div className="flex items-center justify-center md:justify-start gap-1 my-2">
                {[1, 2, 3, 4].map(i => (
                  <Star key={i} className="w-5 h-5 fill-[#e5b340] text-[#e5b340]" />
                ))}
                <Star className="w-5 h-5 fill-[#e5b340]/50 text-[#e5b340]" />
              </div>
              <div className="text-xs text-[#a3988d]">
                1,384 Total Ratings on Google & Restaurant Guru
              </div>
              <div className="mt-3 text-xs text-[#8c8074]">
                “Visitors order perfectly cooked biryani, tasty prawns and enjoy calm ambience.”
              </div>
            </div>

            {/* Middle Breakdown */}
            <div className="md:col-span-5 space-y-2 text-xs">
              <div className="flex items-center gap-3">
                <span className="w-20 text-[#a3988d]">Food Quality</span>
                <div className="flex-1 bg-[#120f0d] h-2 rounded-full overflow-hidden">
                  <div className="bg-[#d4af37] h-full w-[92%]" />
                </div>
                <span className="font-mono text-[#f5ebd7] tabular-nums">4.7</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-20 text-[#a3988d]">Ambience</span>
                <div className="flex-1 bg-[#120f0d] h-2 rounded-full overflow-hidden">
                  <div className="bg-[#d4af37] h-full w-[90%]" />
                </div>
                <span className="font-mono text-[#f5ebd7] tabular-nums">4.6</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-20 text-[#a3988d]">Service Care</span>
                <div className="flex-1 bg-[#120f0d] h-2 rounded-full overflow-hidden">
                  <div className="bg-[#d4af37] h-full w-[86%]" />
                </div>
                <span className="font-mono text-[#f5ebd7] tabular-nums">4.4</span>
              </div>
            </div>

            {/* Right Spend & Value */}
            <div className="md:col-span-3 bg-[#120f0d] p-4 rounded-xl border border-[#2e261f] text-center md:text-left">
              <div className="text-xs text-[#8c8074] uppercase tracking-wider font-medium">
                Value Assessment
              </div>
              <div className="text-lg font-serif text-[#fcf9f2] font-semibold mt-1">
                Affordable & Generous
              </div>
              <p className="text-[12px] text-[#a3988d] mt-1">
                Typically ₹200 to ₹400 per person. Grand family spreads around ₹800.
              </p>
            </div>

          </div>
        </div>

        {/* Filter & Topic Chips */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 w-full sm:w-auto text-xs">
            {topics.map(t => (
              <button
                key={t.id}
                onClick={() => setActiveTopic(t.id)}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer shrink-0 font-medium ${
                  activeTopic === t.id
                    ? 'bg-[#d4af37] text-black font-semibold'
                    : 'bg-[#1b1714] text-[#a3988d] hover:bg-[#25201b] border border-[#2e261f]'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Search Reviews Input */}
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-[#8a7f73] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchWord}
              onChange={(e) => setSearchWord(e.target.value)}
              placeholder="Search reviews..."
              className="w-full pl-9 pr-3 py-1.5 bg-[#171310] border border-[#332b23] rounded-lg text-xs text-[#f5ebd7] placeholder-[#6e6358] focus:outline-none focus:border-[#d4af37]"
            />
          </div>
        </div>

        {/* Review Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map(rev => (
            <div
              key={rev.id}
              className="bg-[#191512] rounded-xl border border-[#2e261f] p-6 flex flex-col justify-between hover:border-[#42372c] transition-colors"
            >
              <div>
                {/* Author Info & Rating */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#29221b] border border-[#3d3227] flex items-center justify-center font-serif font-bold text-base text-[#d4af37]">
                      {rev.avatarLetter}
                    </div>
                    <div>
                      <div className="font-medium text-sm text-[#f5ebd7] leading-tight">
                        {rev.author}
                      </div>
                      <div className="text-[11px] text-[#8c8074] mt-0.5">
                        {rev.timeAgo} · {rev.source}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 bg-[#120f0d] px-2 py-1 rounded border border-[#2b241e] text-xs font-mono font-semibold text-[#e5b340]">
                    <Star className="w-3 h-3 fill-[#e5b340]" />
                    <span>{rev.rating}</span>
                  </div>
                </div>

                {/* Rating Criteria Mini Line */}
                <div className="flex items-center gap-3 text-[11px] text-[#8a7e72] mb-3 pb-2 border-b border-[#241d17]">
                  <span>Food: <strong className="text-[#d8cfc4]">{rev.ratingsBreakdown.food}</strong></span>
                  <span>·</span>
                  <span>Service: <strong className="text-[#d8cfc4]">{rev.ratingsBreakdown.service}</strong></span>
                  <span>·</span>
                  <span>Ambiance: <strong className="text-[#d8cfc4]">{rev.ratingsBreakdown.atmosphere}</strong></span>
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-[#b8aca0] leading-relaxed italic">
                  “{rev.reviewText}”
                </p>
              </div>

              {/* Card Footer Details */}
              <div className="mt-4 pt-3 border-t border-[#241d17] flex items-center justify-between text-[11px] text-[#8c8074]">
                <span>{rev.mealType || 'Dining'}</span>
                {rev.pricePerPerson && (
                  <span className="font-mono text-[#a3988d]">{rev.pricePerPerson}</span>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Add Review Modal */}
      {isAddReviewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#1c1714] border border-[#3d3227] rounded-2xl max-w-lg w-full p-6 shadow-2xl">
            <h3 className="text-xl font-serif text-[#fcf9f2] font-semibold">
              Share Your Dining Experience
            </h3>
            <p className="text-xs text-[#a3988d] mt-1 mb-5">
              Your honest feedback helps fellow food lovers in Guntur and guides our kitchen team.
            </p>

            {formSubmitted ? (
              <div className="py-8 text-center space-y-3">
                <CheckCircle className="w-12 h-12 text-[#d4af37] mx-auto animate-bounce" />
                <h4 className="text-base font-serif text-[#fcf9f2]">Review Submitted Successfully!</h4>
                <p className="text-xs text-[#a3988d]">Thank you for supporting Signature Dine.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-[#d8cfc4] mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    placeholder="e.g. Ramesh Kumar"
                    className="w-full px-3 py-2 bg-[#120f0d] border border-[#302820] rounded-lg text-xs text-[#f5ebd7] focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                {/* 3 Rating Selectors */}
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-medium text-[#a3988d] mb-1">
                      Food Rating (1-5)
                    </label>
                    <select
                      value={newFoodRating}
                      onChange={(e) => setNewFoodRating(Number(e.target.value))}
                      className="w-full px-2 py-1.5 bg-[#120f0d] border border-[#302820] rounded-lg text-xs text-[#f5ebd7]"
                    >
                      {[5, 4, 3, 2, 1].map(n => (
                        <option key={n} value={n}>{n} Stars</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-[#a3988d] mb-1">
                      Service (1-5)
                    </label>
                    <select
                      value={newServiceRating}
                      onChange={(e) => setNewServiceRating(Number(e.target.value))}
                      className="w-full px-2 py-1.5 bg-[#120f0d] border border-[#302820] rounded-lg text-xs text-[#f5ebd7]"
                    >
                      {[5, 4, 3, 2, 1].map(n => (
                        <option key={n} value={n}>{n} Stars</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-[#a3988d] mb-1">
                      Atmosphere (1-5)
                    </label>
                    <select
                      value={newAtmoRating}
                      onChange={(e) => setNewAtmoRating(Number(e.target.value))}
                      className="w-full px-2 py-1.5 bg-[#120f0d] border border-[#302820] rounded-lg text-xs text-[#f5ebd7]"
                    >
                      {[5, 4, 3, 2, 1].map(n => (
                        <option key={n} value={n}>{n} Stars</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-medium text-[#a3988d] mb-1">
                      Meal Type
                    </label>
                    <select
                      value={newMealType}
                      onChange={(e) => setNewMealType(e.target.value)}
                      className="w-full px-2 py-1.5 bg-[#120f0d] border border-[#302820] rounded-lg text-xs text-[#f5ebd7]"
                    >
                      <option value="Dinner">Dinner</option>
                      <option value="Lunch">Lunch</option>
                      <option value="Family Gathering">Family Gathering</option>
                      <option value="Takeaway Order">Takeaway Order</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-[#a3988d] mb-1">
                      Price per Person
                    </label>
                    <input
                      type="text"
                      value={newSpend}
                      onChange={(e) => setNewSpend(e.target.value)}
                      placeholder="₹200–400"
                      className="w-full px-2 py-1.5 bg-[#120f0d] border border-[#302820] rounded-lg text-xs text-[#f5ebd7]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#d8cfc4] mb-1">
                    Your Review & Favorite Dishes
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={newText}
                    onChange={(e) => setNewText(e.target.value)}
                    placeholder="Tell us about the biryani, prawns, ambience, or staff..."
                    className="w-full px-3 py-2 bg-[#120f0d] border border-[#302820] rounded-lg text-xs text-[#f5ebd7] focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#2e261f]">
                  <button
                    type="button"
                    onClick={() => setIsAddReviewOpen(false)}
                    className="px-4 py-2 text-xs font-medium text-[#a3988d] hover:text-[#f5ebd7] cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-semibold uppercase text-black bg-[#d4af37] hover:bg-[#e6c148] rounded-lg cursor-pointer"
                  >
                    Post Review
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}
    </section>
  );
};
