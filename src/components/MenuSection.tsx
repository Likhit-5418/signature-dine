import React, { useState, useMemo } from 'react';
import { Search, Plus, Check, Flame, Info, Leaf, ArrowUpDown, ChevronDown } from 'lucide-react';
import { MENU_ITEMS, MenuItem } from '../data/restaurantData';
import { useCart } from '../context/CartContext';

type CategoryFilter = 'all' | 'biryani' | 'starters-nonveg' | 'starters-veg' | 'curries' | 'breads' | 'beverages';
type SortOption = 'featured' | 'price-asc' | 'price-desc';

export const MenuSection: React.FC = () => {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  
  // Dietary toggle state: allows individual or combined toggling of Vegetarian, Vegan, and Gluten-Free
  const [dietaryToggles, setDietaryToggles] = useState<{
    vegetarian: boolean;
    vegan: boolean;
    glutenFree: boolean;
  }>({
    vegetarian: false,
    vegan: false,
    glutenFree: false,
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [addedItemId, setAddedItemId] = useState<string | null>(null);

  // Customization modal state
  const [customizingItem, setCustomizingItem] = useState<MenuItem | null>(null);
  const [customSpice, setCustomSpice] = useState<'mild' | 'medium' | 'spicy'>('medium');
  const [customNote, setCustomNote] = useState('');

  const categories = [
    { id: 'all', label: 'All Dishes' },
    { id: 'biryani', label: 'Biryanis & Rice' },
    { id: 'starters-nonveg', label: 'Seafood & Poultry' },
    { id: 'starters-veg', label: 'Veg Starters' },
    { id: 'curries', label: 'Rich Curries' },
    { id: 'breads', label: 'Tandoor Breads' },
    { id: 'beverages', label: 'Desserts & Drinks' },
  ];

  const toggleDietary = (key: 'vegetarian' | 'vegan' | 'glutenFree') => {
    setDietaryToggles(prev => {
      // If toggling vegan on, vegetarian is inherently implied
      if (key === 'vegan' && !prev.vegan) {
        return { ...prev, vegan: true, vegetarian: true };
      }
      // If unchecking vegetarian while vegan is checked, also uncheck vegan
      if (key === 'vegetarian' && prev.vegetarian && prev.vegan) {
        return { ...prev, vegetarian: false, vegan: false };
      }
      return {
        ...prev,
        [key]: !prev[key],
      };
    });
  };

  const clearAllDietaryToggles = () => {
    setDietaryToggles({
      vegetarian: false,
      vegan: false,
      glutenFree: false,
    });
  };

  const isAnyDietaryActive = dietaryToggles.vegetarian || dietaryToggles.vegan || dietaryToggles.glutenFree;

  // Counts for preview
  const counts = useMemo(() => {
    return {
      all: MENU_ITEMS.length,
      vegetarian: MENU_ITEMS.filter(i => i.isVeg).length,
      vegan: MENU_ITEMS.filter(i => i.isVegan).length,
      glutenFree: MENU_ITEMS.filter(i => i.isGlutenFree).length,
    };
  }, []);

  const filteredItems = useMemo(() => {
    const list = MENU_ITEMS.filter(item => {
      // Category match
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      // Dietary filters (combines filters if multiple toggled)
      if (dietaryToggles.vegetarian && !item.isVeg) {
        return false;
      }
      if (dietaryToggles.vegan && !item.isVegan) {
        return false;
      }
      if (dietaryToggles.glutenFree && !item.isGlutenFree) {
        return false;
      }
      // Search match by name, description, category, or ingredients
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        const matchesCategory = item.category.toLowerCase().includes(q);
        const matchesIngredients = item.ingredients?.some(ing => ing.toLowerCase().includes(q)) ?? false;
        if (!matchesName && !matchesDesc && !matchesCategory && !matchesIngredients) return false;
      }
      return true;
    });

    // Apply sorting
    if (sortBy === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    }

    return list;
  }, [selectedCategory, dietaryToggles, searchQuery, sortBy]);

  const handleQuickAdd = (item: MenuItem) => {
    addToCart(item, item.spiceLevel);
    setAddedItemId(item.id);
    setTimeout(() => setAddedItemId(null), 1400);
  };

  const openCustomizeModal = (item: MenuItem) => {
    setCustomizingItem(item);
    setCustomSpice(item.spiceLevel);
    setCustomNote('');
  };

  const handleSaveCustomization = () => {
    if (customizingItem) {
      addToCart(customizingItem, customSpice, customNote);
      setCustomizingItem(null);
      setAddedItemId(customizingItem.id);
      setTimeout(() => setAddedItemId(null), 1400);
    }
  };

  return (
    <section id="menu" className="py-16 sm:py-24 bg-[#14110f] border-b border-[#29221b]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold mb-2">
            Authentic Flavors of Guntur & Coastal Andhra
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#fcf9f2] tracking-tight">
            Our Handcrafted Dining Menu
          </h2>
          <p className="mt-3 text-[#b5aba0] text-sm sm:text-base leading-relaxed">
            Prepared with fresh coastal catch, aged fragrant basmati, hand-ground masalas, and genuine culinary care. Filter by dietary choices or customize spice levels.
          </p>
        </div>

        {/* Filter & Search Bar Controls */}
        <div className="bg-[#1b1714] border border-[#332b23] rounded-xl p-4 sm:p-5 mb-10 shadow-lg space-y-4">
          
          {/* Dedicated Search Bar Row */}
          <div className="space-y-2.5">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-[#d4af37] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search dishes by name or ingredients (e.g. biryani, prawns, paneer, garlic, cashew, mushroom, mutton)..."
                className="w-full pl-10 pr-10 py-3 bg-[#120f0d] border border-[#332a22] focus:border-[#d4af37] rounded-xl text-sm text-[#f5ebd7] placeholder-[#786c5e] focus:outline-none transition-colors shadow-inner"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-xs text-[#8a7f73] hover:text-[#f5ebd7] bg-[#221c17] rounded-md transition-colors cursor-pointer"
                  title="Clear search"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Popular Ingredient Shortcuts */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs pt-0.5">
              <span className="text-[#8c8074] text-[11px] font-medium mr-1">
                Quick Ingredients:
              </span>
              {[
                { label: 'Biryani', q: 'biryani' },
                { label: 'Prawns', q: 'prawns' },
                { label: 'Paneer', q: 'paneer' },
                { label: 'Garlic', q: 'garlic' },
                { label: 'Cashew (Kaju)', q: 'cashew' },
                { label: 'Mushroom', q: 'mushroom' },
                { label: 'Chicken', q: 'chicken' },
                { label: 'Mutton', q: 'mutton' },
              ].map(tag => (
                <button
                  key={tag.q}
                  type="button"
                  onClick={() => setSearchQuery(searchQuery.toLowerCase() === tag.q ? '' : tag.q)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors cursor-pointer border ${
                    searchQuery.toLowerCase() === tag.q
                      ? 'bg-[#d4af37] text-black border-[#d4af37] font-semibold'
                      : 'bg-[#120f0d] text-[#a3988d] border-[#29221b] hover:border-[#4a3b2e] hover:text-[#f5ebd7]'
                  }`}
                >
                  {tag.label}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-[#26201a] flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
            {/* Dietary Filter Buttons */}
            <div className="flex flex-wrap items-center gap-1.5 flex-1">
              <span className="text-xs text-[#8c8074] uppercase tracking-wider font-medium hidden sm:inline mr-1">
                Dietary:
              </span>

              {/* All Dishes Toggle */}
              <button
                type="button"
                onClick={clearAllDietaryToggles}
                className={`px-2.5 py-1.5 text-xs font-medium rounded-lg border transition-colors cursor-pointer whitespace-nowrap ${
                  !isAnyDietaryActive
                    ? 'bg-[#2b241e] text-[#f5ebd7] border-[#4a3b2f] shadow-sm'
                    : 'bg-[#120f0d] text-[#8c8074] border-[#2b241e] hover:text-[#d8cfc4]'
                }`}
                title="Show all dishes without dietary restrictions"
              >
                All ({counts.all})
              </button>

              {/* Vegetarian Toggle Button */}
              <button
                type="button"
                onClick={() => toggleDietary('vegetarian')}
                aria-pressed={dietaryToggles.vegetarian}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg border transition-all cursor-pointer whitespace-nowrap ${
                  dietaryToggles.vegetarian
                    ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 shadow-sm ring-1 ring-emerald-500/30'
                    : 'bg-[#120f0d] border-[#2b241e] text-[#9e9285] hover:border-emerald-800/60 hover:text-emerald-300'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${dietaryToggles.vegetarian ? 'bg-emerald-400' : 'bg-emerald-600'}`} />
                <span>Vegetarian</span>
                <span className="font-mono text-[10px] opacity-75">({counts.vegetarian})</span>
              </button>

              {/* Vegan Toggle Button */}
              <button
                type="button"
                onClick={() => toggleDietary('vegan')}
                aria-pressed={dietaryToggles.vegan}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg border transition-all cursor-pointer whitespace-nowrap ${
                  dietaryToggles.vegan
                    ? 'bg-teal-950/80 border-teal-400 text-teal-200 shadow-sm ring-1 ring-teal-400/30'
                    : 'bg-[#120f0d] border-[#2b241e] text-[#9e9285] hover:border-teal-800/60 hover:text-teal-300'
                }`}
              >
                <Leaf className="w-3 h-3 text-teal-400" />
                <span>Vegan</span>
                <span className="font-mono text-[10px] opacity-75">({counts.vegan})</span>
              </button>

              {/* Gluten-Free Toggle Button */}
              <button
                type="button"
                onClick={() => toggleDietary('glutenFree')}
                aria-pressed={dietaryToggles.glutenFree}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg border transition-all cursor-pointer whitespace-nowrap ${
                  dietaryToggles.glutenFree
                    ? 'bg-amber-950/80 border-[#d4af37] text-amber-200 shadow-sm ring-1 ring-[#d4af37]/30'
                    : 'bg-[#120f0d] border-[#2b241e] text-[#9e9285] hover:border-[#d4af37]/50 hover:text-[#d4af37]'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span>Gluten-Free</span>
                <span className="font-mono text-[10px] opacity-75">({counts.glutenFree})</span>
              </button>

              {/* Quick Reset if filters applied */}
              {isAnyDietaryActive && (
                <button
                  type="button"
                  onClick={clearAllDietaryToggles}
                  className="text-[11px] text-[#a3988d] hover:text-[#d4af37] underline underline-offset-2 ml-1 cursor-pointer"
                >
                  Reset
                </button>
              )}
            </div>

            {/* Price Sorting Dropdown */}
            <div className="flex items-center gap-2 shrink-0">
              <label htmlFor="price-sort-select" className="text-xs text-[#8c8074] uppercase tracking-wider font-medium flex items-center gap-1.5">
                <ArrowUpDown className="w-3.5 h-3.5 text-[#d4af37]" />
                <span className="hidden sm:inline">Sort:</span>
              </label>
              <div className="relative">
                <select
                  id="price-sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="pl-3 pr-8 py-1.5 bg-[#120f0d] border border-[#2b241e] hover:border-[#42372c] focus:border-[#d4af37] text-xs text-[#f5ebd7] rounded-lg transition-colors cursor-pointer focus:outline-none appearance-none font-medium"
                >
                  <option value="featured">Featured / Recommended</option>
                  <option value="price-asc">Price: Low to High (₹)</option>
                  <option value="price-desc">Price: High to Low (₹)</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-[#8a7f73] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 text-xs">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as CategoryFilter)}
                className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors cursor-pointer shrink-0 ${
                  selectedCategory === cat.id
                    ? 'bg-[#d4af37] text-black font-semibold'
                    : 'bg-[#120f0d] text-[#b3a79a] hover:bg-[#25201b] border border-[#2b241e]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

        </div>

        {/* Active Filter Notice Banner if active or sorted */}
        {(isAnyDietaryActive || sortBy !== 'featured') && (
          <div className="mb-6 flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 rounded-lg bg-[#181411] border border-[#2e261f] text-xs text-[#b8aca0]">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[#d4af37] font-medium">Applied:</span>
              <div className="flex flex-wrap items-center gap-1.5">
                {dietaryToggles.vegetarian && (
                  <span className="px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-800/40 text-emerald-300 text-[11px]">
                    Vegetarian
                  </span>
                )}
                {dietaryToggles.vegan && (
                  <span className="px-2 py-0.5 rounded bg-teal-950/60 border border-teal-800/40 text-teal-300 text-[11px]">
                    Vegan (Dairy-Free)
                  </span>
                )}
                {dietaryToggles.glutenFree && (
                  <span className="px-2 py-0.5 rounded bg-amber-950/60 border border-amber-800/40 text-amber-300 text-[11px]">
                    Gluten-Free (Wheat-Free)
                  </span>
                )}
                {sortBy === 'price-asc' && (
                  <span className="px-2 py-0.5 rounded bg-[#2b241e] border border-[#42372c] text-[#f5ebd7] text-[11px] font-mono">
                    Price: Low → High
                  </span>
                )}
                {sortBy === 'price-desc' && (
                  <span className="px-2 py-0.5 rounded bg-[#2b241e] border border-[#42372c] text-[#f5ebd7] text-[11px] font-mono">
                    Price: High → Low
                  </span>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="text-[#8c8074] font-mono tabular-nums">
                {filteredItems.length} {filteredItems.length === 1 ? 'dish' : 'dishes'}
              </span>
              <button
                type="button"
                onClick={() => {
                  clearAllDietaryToggles();
                  setSortBy('featured');
                }}
                className="text-[11px] text-[#d4af37] hover:underline cursor-pointer"
              >
                Clear Filters & Sorting
              </button>
            </div>
          </div>
        )}

        {/* Dishes Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-[#181412] rounded-2xl border border-[#2d251f] p-8">
            <Info className="w-8 h-8 text-[#8a7f73] mx-auto mb-3" />
            <h3 className="text-lg font-serif text-[#f5ebd7]">No matching culinary creations</h3>
            <p className="text-sm text-[#9c9085] mt-1">
              Try adjusting your dietary category toggles, sorting, or search keyword.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                clearAllDietaryToggles();
                setSortBy('featured');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 text-xs font-semibold uppercase text-black bg-[#d4af37] rounded-lg cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map(item => {
              const isAdded = addedItemId === item.id;

              return (
                <div
                  key={item.id}
                  className="bg-[#191512] rounded-xl border border-[#2e261f] overflow-hidden flex flex-col justify-between hover:border-[#4d3e30] transition-colors group shadow-md"
                >
                  <div>
                    {/* Item Image / Fallback Container */}
                    <div className="relative aspect-[16/10] bg-[#221c17] overflow-hidden">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#241d18] to-[#161210] flex items-center justify-center p-4">
                          <span className="text-2xl font-serif text-[#6e5d48]/60 text-center">
                            Signature Dine
                          </span>
                        </div>
                      )}

                      {/* Dietary Badges in top corner */}
                      <div className="absolute top-3 left-3 flex flex-wrap gap-1 items-center">
                        <div className="bg-[#120f0d]/90 backdrop-blur-sm px-2 py-0.5 rounded border border-[#332a22] flex items-center gap-1.5 text-[11px]">
                          <span
                            className={`w-2 h-2 rounded-full ${
                              item.isVeg ? 'bg-emerald-500' : 'bg-red-500'
                            }`}
                          />
                          <span className="text-[#d8cfc4]">{item.isVeg ? 'Veg' : 'Non-Veg'}</span>
                        </div>

                        {item.isVegan && (
                          <div className="bg-teal-950/85 backdrop-blur-sm px-1.5 py-0.5 rounded border border-teal-700/50 text-[10px] text-teal-300 font-medium">
                            Vegan
                          </div>
                        )}

                        {item.isGlutenFree && (
                          <div className="bg-amber-950/85 backdrop-blur-sm px-1.5 py-0.5 rounded border border-amber-700/50 text-[10px] text-amber-300 font-medium">
                            Gluten-Free
                          </div>
                        )}
                      </div>

                      {item.isChefSpecial && (
                        <div className="absolute top-3 right-3 bg-[#d4af37] text-black font-bold text-[10px] uppercase px-2 py-0.5 rounded shadow-sm">
                          Chef's Pick
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-lg font-serif font-semibold text-[#f5ebd7] leading-snug group-hover:text-[#d4af37] transition-colors">
                          {item.name}
                        </h3>
                        <span className="font-mono text-base font-semibold text-[#fcf9f2] tabular-nums shrink-0">
                          ₹{item.price}
                        </span>
                      </div>

                      <p className="mt-2 text-xs sm:text-sm text-[#a3988d] line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>

                      <div className="mt-3.5 flex flex-wrap items-center gap-2 text-xs text-[#8c8074]">
                        <span className="capitalize">{item.portion}</span>
                        <span aria-hidden="true">·</span>
                        <span className="flex items-center gap-1 capitalize">
                          <Flame className="w-3 h-3 text-[#d4af37]" />
                          <span>{item.spiceLevel} spice</span>
                        </span>
                        {item.isGlutenFree && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span className="text-[#c99742]">Gluten-Free</span>
                          </>
                        )}
                        {item.isVegan && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span className="text-emerald-400">Vegan</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom Actions */}
                  <div className="px-5 pb-5 pt-1 border-t border-[#251e18] flex items-center justify-between gap-3">
                    <button
                      onClick={() => openCustomizeModal(item)}
                      className="text-xs text-[#b8aca0] hover:text-[#d4af37] underline underline-offset-4 cursor-pointer"
                    >
                      Spice Options
                    </button>

                    <button
                      onClick={() => handleQuickAdd(item)}
                      className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold tracking-wide uppercase rounded-lg transition-colors cursor-pointer ${
                        isAdded
                          ? 'bg-emerald-600 text-white'
                          : 'bg-[#29221b] hover:bg-[#d4af37] text-[#f5ebd7] hover:text-black border border-[#42372c] hover:border-[#d4af37]'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add to Order</span>
                        </>
                      )}
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* Spice & Customization Modal */}
      {customizingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#1c1714] border border-[#3d3227] rounded-2xl max-w-md w-full overflow-hidden shadow-2xl space-y-5">
            {customizingItem.image && (
              <div className="relative aspect-[16/9] w-full bg-[#181310] overflow-hidden">
                <img
                  src={customizingItem.image}
                  alt={customizingItem.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1c1714] via-transparent to-black/30" />
                <button
                  type="button"
                  onClick={() => setCustomizingItem(null)}
                  className="absolute top-3 right-3 p-1.5 rounded-full bg-black/60 text-[#f5ebd7] hover:bg-black transition-colors"
                >
                  ✕
                </button>
              </div>
            )}
            <div className="p-6 pt-0 space-y-5">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-[#d4af37]">
                  Customize Preparation
                </div>
                <h3 className="text-xl font-serif text-[#fcf9f2] font-semibold mt-1">
                  {customizingItem.name}
                </h3>
                <p className="text-xs text-[#a3988d] mt-1">{customizingItem.description}</p>
                
                {/* Dietary indicator badges in modal */}
                <div className="flex flex-wrap gap-1.5 mt-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] ${customizingItem.isVeg ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-red-950 text-red-300 border border-red-800'}`}>
                    {customizingItem.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
                  </span>
                  {customizingItem.isVegan && (
                    <span className="px-2 py-0.5 rounded text-[10px] bg-teal-950 text-teal-300 border border-teal-800">
                      Vegan Friendly
                    </span>
                  )}
                  {customizingItem.isGlutenFree && (
                    <span className="px-2 py-0.5 rounded text-[10px] bg-amber-950 text-amber-300 border border-amber-800">
                      Gluten-Free
                    </span>
                  )}
                </div>
              </div>

            <div>
              <label className="block text-xs font-medium text-[#d8cfc4] mb-2">
                Select Spice Level:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['mild', 'medium', 'spicy'] as const).map(lvl => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setCustomSpice(lvl)}
                    className={`py-2 px-3 rounded-lg text-xs font-medium capitalize border transition-colors cursor-pointer ${
                      customSpice === lvl
                        ? 'bg-[#d4af37] text-black font-semibold border-[#d4af37]'
                        : 'bg-[#120f0d] text-[#b3a79a] border-[#302820] hover:border-[#524436]'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-[#8c8074] mt-1.5">
                {customSpice === 'mild' && 'Low chili spices, great for young kids & sensitive palates.'}
                {customSpice === 'medium' && 'Balanced classic aromatic spices, standard restaurant style.'}
                {customSpice === 'spicy' && 'Authentic Guntur heat with roasted red chilies & pepper.'}
              </p>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#d8cfc4] mb-1.5">
                Special Kitchen Instructions (Optional):
              </label>
              <input
                type="text"
                value={customNote}
                onChange={(e) => setCustomNote(e.target.value)}
                placeholder="e.g. Extra onions, less oil, separate gravy..."
                className="w-full px-3 py-2 bg-[#120f0d] border border-[#302820] rounded-lg text-xs text-[#f5ebd7] focus:outline-none focus:border-[#d4af37]"
              />
            </div>

            <div className="pt-3 border-t border-[#2e261f] flex items-center justify-between">
              <div>
                <span className="text-xs text-[#8c8074] block">Price</span>
                <span className="font-mono text-lg font-bold text-[#fcf9f2]">
                  ₹{customizingItem.price}
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setCustomizingItem(null)}
                  className="px-4 py-2 text-xs font-medium text-[#a3988d] hover:text-[#f5ebd7] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveCustomization}
                  className="px-5 py-2 text-xs font-semibold uppercase text-black bg-[#d4af37] hover:bg-[#e6c148] rounded-lg cursor-pointer"
                >
                  Add with Preferences
                </button>
              </div>
            </div>

            </div>
          </div>
        </div>
      )}
    </section>
  );
};


