export interface MenuItem {
  id: string;
  name: string;
  description: string;
  ingredients?: string[];
  price: number;
  category: 'biryani' | 'starters-nonveg' | 'starters-veg' | 'curries' | 'breads' | 'beverages';
  isVeg: boolean;
  isVegan?: boolean;
  isGlutenFree?: boolean;
  spiceLevel: 'mild' | 'medium' | 'spicy';
  isChefSpecial?: boolean;
  isPopular?: boolean;
  portion: string;
  image?: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  avatarLetter: string;
  rating: number;
  timeAgo: string;
  source: string;
  reviewText: string;
  ratingsBreakdown: {
    food: number;
    service: number;
    atmosphere: number;
  };
  mealType?: string;
  pricePerPerson?: string;
  verified: boolean;
  highlightedDish?: string;
}

export const RESTAURANT_INFO = {
  name: "Signature Dine",
  alternateName: "Signature Dine New",
  tagline: "Authentic Dum Biryani, Coastal Prawns & Calm Family Dining",
  address: "3rd Line, Guntur, Andhra Pradesh, India",
  city: "Guntur",
  state: "Andhra Pradesh",
  country: "India",
  phone: "+91 863 223 8899",
  whatsapp: "+91 94901 88992",
  googleRating: 4.5,
  totalVotes: 1384,
  reviewCount: 321,
  cityRank: "#376 of 909 restaurants in Guntur",
  priceRange: "₹200 – ₹400 per person",
  hours: {
    regular: "12:00 PM – 11:00 PM (Daily)",
    lunch: "12:00 PM – 3:30 PM",
    dinner: "7:00 PM – 11:00 PM",
    openHour: 12,
    closeHour: 23,
  },
  amenities: [
    { name: "Credit Cards Accepted", icon: "credit-card", available: true },
    { name: "Online Delivery", icon: "truck", available: true },
    { name: "Takeaway Service", icon: "package", available: true },
    { name: "High-Speed Wi-Fi", icon: "wifi", available: true },
    { name: "Table & Private Dining Booking", icon: "calendar-check", available: true },
    { name: "Air Conditioned Dining", icon: "snowflake", available: true },
    { name: "Kids & Family Friendly", icon: "users", available: true },
    { name: "Not Wheelchair Accessible", icon: "info", available: false, note: "Staircase access on 3rd Line" }
  ]
};

export const MENU_ITEMS: MenuItem[] = [
  // Biryani & Rice
  {
    id: "biryani-01",
    name: "Signature Chicken Dum Biryani",
    description: "Fragrant long-grain aged basmati layered with succulent chicken pieces marinated in authentic herbs, saffron milk, served with mirchi ka salan and cooling raita.",
    ingredients: ["chicken", "aged basmati rice", "saffron", "fried onions", "mint", "desi ghee", "spices", "coriander"],
    price: 320,
    category: "biryani",
    isVeg: false,
    isVegan: false,
    isGlutenFree: true,
    spiceLevel: "medium",
    isChefSpecial: true,
    isPopular: true,
    portion: "Serves 1-2 (750g)",
    image: "/src/assets/images/hero_biryani_platter_1791001924016.jpg"
  },
  {
    id: "biryani-02",
    name: "Guntur Special Royyala (Prawns) Biryani",
    description: "Fresh coastal prawns slow-cooked with caramelized onions, roasted Guntur spices, mint and basmati rice. Most praised dish in our reviews.",
    ingredients: ["fresh prawns", "royyala", "seafood", "basmati rice", "curry leaves", "caramelized onions", "guntur red chili"],
    price: 410,
    category: "biryani",
    isVeg: false,
    isVegan: false,
    isGlutenFree: true,
    spiceLevel: "medium",
    isChefSpecial: true,
    isPopular: true,
    portion: "Serves 1-2",
    image: "/src/assets/images/dish_guntur_prawns_1791001935781.jpg"
  },
  {
    id: "biryani-03",
    name: "Royal Mutton Dum Biryani",
    description: "Tender spring mutton cuts slow-cooked on low flame (dum) with cardamom, mace, and royal fragrant basmati rice.",
    ingredients: ["tender mutton", "lamb", "basmati rice", "cardamom", "mace", "cinnamon", "mint", "ghee"],
    price: 440,
    category: "biryani",
    isVeg: false,
    isVegan: false,
    isGlutenFree: true,
    spiceLevel: "medium",
    isPopular: true,
    portion: "Serves 1-2",
    image: "/src/assets/images/dish_mutton_biryani_1791003330084.jpg"
  },
  {
    id: "biryani-04",
    name: "Special Paneer Tikka Dum Biryani",
    description: "Charcoal-grilled cottage cheese cubes simmered in spiced onion-tomato gravy, layered with mint and basmati rice.",
    ingredients: ["fresh paneer", "cottage cheese", "basmati rice", "bell peppers", "tomato", "mint", "yogurt"],
    price: 290,
    category: "biryani",
    isVeg: true,
    isVegan: false,
    isGlutenFree: true,
    spiceLevel: "mild",
    portion: "Serves 1-2",
    image: "/src/assets/images/dish_paneer_karivepaku_1791003342288.jpg"
  },
  {
    id: "biryani-05",
    name: "Kaju Jeera Rice & Dal Fry Combo",
    description: "Buttery cumin basmati rice topped with golden fried cashews, paired with homestyle garlic tadka dal.",
    ingredients: ["cashews", "kaju", "jeera cumin", "basmati rice", "yellow lentils dal", "garlic", "ghee"],
    price: 240,
    category: "biryani",
    isVeg: true,
    isVegan: true,
    isGlutenFree: true,
    spiceLevel: "mild",
    portion: "Serves 1-2",
    image: "/src/assets/images/dish_kaju_curry_1791003387982.jpg"
  },

  // Starters - Non-Veg & Seafood
  {
    id: "starters-nv-01",
    name: "Signature Crispy Guntur Prawns Roast",
    description: "Succulent sea prawns tossed with fresh curry leaves, crushed black peppercorns, roasted cashews, and regional red chilli flakes.",
    ingredients: ["jumbo sea prawns", "seafood", "fresh curry leaves", "black pepper", "roasted cashews", "guntur chili", "garlic"],
    price: 360,
    category: "starters-nonveg",
    isVeg: false,
    isVegan: false,
    isGlutenFree: true,
    spiceLevel: "spicy",
    isChefSpecial: true,
    isPopular: true,
    portion: "10-12 Jumbo Prawns",
    image: "/src/assets/images/dish_guntur_prawns_1791001935781.jpg"
  },
  {
    id: "starters-nv-02",
    name: "Guntur Pepper Chicken Dry",
    description: "Tender boneless chicken morsels sautéed with fresh ground black pepper, curry leaves, and green chillies in rustic Andhra style.",
    ingredients: ["boneless chicken", "black pepper", "curry leaves", "green chili", "shallots", "ginger", "garlic"],
    price: 310,
    category: "starters-nonveg",
    isVeg: false,
    isVegan: false,
    isGlutenFree: true,
    spiceLevel: "spicy",
    isPopular: true,
    portion: "8-10 Pieces",
    image: "/src/assets/images/dish_pepper_chicken_1791003401881.jpg"
  },
  {
    id: "starters-nv-03",
    name: "Murgh Malai Kebab (Mild)",
    description: "Melt-in-mouth chicken supreme marinated in creamy hung curd, cardamom, and cheese, roasted in tandoor. Ideal for kids.",
    ingredients: ["chicken breast", "hung curd", "cream cheese", "cardamom", "mild spices", "white pepper"],
    price: 320,
    category: "starters-nonveg",
    isVeg: false,
    isVegan: false,
    isGlutenFree: true,
    spiceLevel: "mild",
    portion: "6 Pieces",
    image: "/src/assets/images/dish_butter_chicken_1791003352616.jpg"
  },
  {
    id: "starters-nv-04",
    name: "Apollo Fish Fry",
    description: "Crispy boneless river fish strips tossed in mildly spiced yoghurt gravy with fresh curry leaves and garlic.",
    ingredients: ["boneless river fish", "seafood", "curry leaves", "garlic", "yogurt", "ginger", "green chilies"],
    price: 340,
    category: "starters-nonveg",
    isVeg: false,
    isVegan: false,
    isGlutenFree: true,
    spiceLevel: "medium",
    portion: "Platter",
    image: "/src/assets/images/dish_guntur_prawns_1791001935781.jpg"
  },
  {
    id: "starters-nv-05",
    name: "Kaju Chicken Pakoda",
    description: "Crunchy double-fried chicken nuggets coated in seasoned gram flour batter loaded with roasted whole cashews.",
    ingredients: ["chicken", "roasted cashews", "gram flour besan", "curry leaves", "garlic", "chili flakes"],
    price: 330,
    category: "starters-nonveg",
    isVeg: false,
    isVegan: false,
    isGlutenFree: true,
    spiceLevel: "medium",
    portion: "Sharable",
    image: "/src/assets/images/dish_pepper_chicken_1791003401881.jpg"
  },

  // Starters - Veg
  {
    id: "starters-v-01",
    name: "Paneer Karivepaku (Customer Favorite)",
    description: "Fresh cottage cheese cubes tossed in tempered fragrant curry leaves, garlic, roasted spices, and cashews. Celebrated in diner reviews!",
    ingredients: ["paneer", "cottage cheese", "curry leaves", "karivepaku", "garlic", "cashews", "green chilies", "roasted cumin"],
    price: 270,
    category: "starters-veg",
    isVeg: true,
    isVegan: false,
    isGlutenFree: true,
    spiceLevel: "medium",
    isChefSpecial: true,
    isPopular: true,
    portion: "10-12 Cubes",
    image: "/src/assets/images/dish_paneer_karivepaku_1791003342288.jpg"
  },
  {
    id: "starters-v-02",
    name: "Butter Creamy Garlic Mushroom",
    description: "Tender button mushrooms sautéed in rich garlic butter, cream, and freshly cracked black pepper.",
    ingredients: ["fresh button mushrooms", "roasted garlic", "butter", "fresh cream", "cracked black pepper", "parsley"],
    price: 260,
    category: "starters-veg",
    isVeg: true,
    isVegan: false,
    isGlutenFree: true,
    spiceLevel: "mild",
    portion: "Bowl",
    image: "/src/assets/images/dish_creamy_mushroom_1791003375981.jpg"
  },
  {
    id: "starters-v-03",
    name: "Crispy Corn & Water Chestnut Pepper Salt",
    description: "Golden fried sweet corn kernels tossed with diced scallions, pepper, and sea salt. A favorite with kids.",
    ingredients: ["sweet corn", "water chestnut", "spring onion scallions", "white pepper", "sea salt"],
    price: 240,
    category: "starters-veg",
    isVeg: true,
    isVegan: true,
    isGlutenFree: true,
    spiceLevel: "mild",
    portion: "Sharable",
    image: "/src/assets/images/dish_creamy_mushroom_1791003375981.jpg"
  },
  {
    id: "starters-v-04",
    name: "Gobi 65 Andhra Style",
    description: "Crispy batter-fried cauliflower florets tossed in tempered curry leaves and South Indian masala.",
    ingredients: ["cauliflower gobi", "curry leaves", "ginger", "garlic", "red chili paste", "cumin"],
    price: 220,
    category: "starters-veg",
    isVeg: true,
    isVegan: true,
    isGlutenFree: true,
    spiceLevel: "medium",
    portion: "Sharable",
    image: "/src/assets/images/dish_paneer_karivepaku_1791003342288.jpg"
  },

  // Main Course Curries
  {
    id: "curry-01",
    name: "Methi Chaman Special",
    description: "Kashmiri-inspired delicacy made with fresh fenugreek greens and delicate paneer cooked in aromatic mildly spiced cashew gravy.",
    ingredients: ["fresh methi fenugreek greens", "paneer cottage cheese", "cashew paste", "cardamom", "cream", "mild spices"],
    price: 280,
    category: "curries",
    isVeg: true,
    isVegan: false,
    isGlutenFree: true,
    spiceLevel: "mild",
    isChefSpecial: true,
    isPopular: true,
    portion: "Serves 2",
    image: "/src/assets/images/dish_methi_chaman_1791003415038.jpg"
  },
  {
    id: "curry-02",
    name: "Tomato Cashew Curry (Kaju Curry)",
    description: "Roasted whole cashews simmered in a tangy tomato-onion butter gravy with light whole spices.",
    ingredients: ["whole roasted cashews", "kaju", "ripe tomatoes", "onion", "butter", "garam masala"],
    price: 290,
    category: "curries",
    isVeg: true,
    isVegan: true,
    isGlutenFree: true,
    spiceLevel: "mild",
    isPopular: true,
    portion: "Serves 2",
    image: "/src/assets/images/dish_kaju_curry_1791003387982.jpg"
  },
  {
    id: "curry-03",
    name: "Classic Butter Chicken (Murgh Makhani)",
    description: "Tandoori grilled chicken shredded and simmered in a velvet tomato cream gravy with dried fenugreek leaves.",
    ingredients: ["tandoori chicken", "tomatoes", "butter", "fresh cream", "kasuri methi", "honey", "aromatic spices"],
    price: 330,
    category: "curries",
    isVeg: false,
    isVegan: false,
    isGlutenFree: true,
    spiceLevel: "mild",
    isPopular: true,
    portion: "Serves 2",
    image: "/src/assets/images/dish_butter_chicken_1791003352616.jpg"
  },
  {
    id: "curry-04",
    name: "Signature Guntur Chicken Curry",
    description: "Country-style Andhra chicken curry cooked with roasted coriander, cumin, poppy seeds, and fiery Guntur red chilies.",
    ingredients: ["country chicken", "guntur red chilies", "coriander seeds", "poppy seeds", "curry leaves", "onions"],
    price: 320,
    category: "curries",
    isVeg: false,
    isVegan: false,
    isGlutenFree: true,
    spiceLevel: "spicy",
    portion: "Serves 2",
    image: "/src/assets/images/dish_pepper_chicken_1791003401881.jpg"
  },
  {
    id: "curry-05",
    name: "Nellore Chapala Pulusu (Fish Curry)",
    description: "Tender fish steaks slow simmered in raw mango and tamarind gravy with fenugreek and mustard tadka.",
    ingredients: ["fresh sea fish", "raw mango", "tamarind pulusu", "fenugreek", "mustard seeds", "green chilies"],
    price: 350,
    category: "curries",
    isVeg: false,
    isVegan: false,
    isGlutenFree: true,
    spiceLevel: "spicy",
    portion: "Serves 2",
    image: "/src/assets/images/dish_guntur_prawns_1791001935781.jpg"
  },
  {
    id: "curry-06",
    name: "Dal Tadka Dhaba Style",
    description: "Yellow toor dal tempered with desi ghee, cumin, crushed garlic, and whole dried red chilies.",
    ingredients: ["toor dal yellow lentils", "garlic", "cumin", "dried red chili", "ghee", "tomatoes"],
    price: 190,
    category: "curries",
    isVeg: true,
    isVegan: true,
    isGlutenFree: true,
    spiceLevel: "mild",
    portion: "Serves 2",
    image: "/src/assets/images/dish_kaju_curry_1791003387982.jpg"
  },

  // Tandoor & Breads
  {
    id: "bread-01",
    name: "Crispy Butter Garlic Naan",
    description: "Soft leavened oven-baked flatbread topped with minced roasted garlic, fresh coriander, and melted butter.",
    ingredients: ["refined wheat flour", "minced garlic", "butter", "fresh coriander", "nigella seeds"],
    price: 65,
    category: "breads",
    isVeg: true,
    isVegan: false,
    isGlutenFree: false,
    spiceLevel: "mild",
    isPopular: true,
    portion: "1 Large Piece",
    image: "/src/assets/images/dish_garlic_naan_1791003364949.jpg"
  },
  {
    id: "bread-02",
    name: "Butter Naan",
    description: "Classic clay-oven baked bread generously brushed with churned butter.",
    ingredients: ["refined wheat flour", "butter", "milk", "yeast"],
    price: 55,
    category: "breads",
    isVeg: true,
    isVegan: false,
    isGlutenFree: false,
    spiceLevel: "mild",
    portion: "1 Piece",
    image: "/src/assets/images/dish_garlic_naan_1791003364949.jpg"
  },
  {
    id: "bread-03",
    name: "Tandoori Roti (Butter / Plain)",
    description: "Wholesome 100% whole wheat flatbread baked in traditional clay tandoor.",
    ingredients: ["100% whole wheat atta", "water", "butter or plain"],
    price: 35,
    category: "breads",
    isVeg: true,
    isVegan: true,
    isGlutenFree: false,
    spiceLevel: "mild",
    portion: "1 Piece",
    image: "/src/assets/images/dish_garlic_naan_1791003364949.jpg"
  },
  {
    id: "bread-04",
    name: "Paneer Stuffed Kulcha",
    description: "Oven-baked flatbread stuffed with spiced grated paneer, onion, and herbs.",
    ingredients: ["wheat flour", "grated paneer", "onions", "coriander", "anardana"],
    price: 85,
    category: "breads",
    isVeg: true,
    isVegan: false,
    isGlutenFree: false,
    spiceLevel: "mild",
    portion: "1 Piece",
    image: "/src/assets/images/dish_garlic_naan_1791003364949.jpg"
  },

  // Beverages & Desserts
  {
    id: "bev-01",
    name: "Royal Matka Kulfi with Pistachio",
    description: "Traditional slow-reduced milk kulfi infused with saffron, cardamom, and topped with toasted pistachios.",
    ingredients: ["full cream milk", "saffron", "pistachios", "cardamom", "cane sugar"],
    price: 110,
    category: "beverages",
    isVeg: true,
    isVegan: false,
    isGlutenFree: true,
    spiceLevel: "mild",
    portion: "1 Matka",
    image: "/src/assets/images/dish_gulab_jamun_1791003430003.jpg"
  },
  {
    id: "bev-02",
    name: "Gulab Jamun with Rabri (2 Pcs)",
    description: "Warm soft khoya dumplings soaked in rose syrup, paired with chilled thickened milk rabri.",
    ingredients: ["khoya", "milk solid", "rose syrup", "green cardamom", "thick rabri"],
    price: 130,
    category: "beverages",
    isVeg: true,
    isVegan: false,
    isGlutenFree: false,
    spiceLevel: "mild",
    portion: "Serves 1-2",
    image: "/src/assets/images/dish_gulab_jamun_1791003430003.jpg"
  },
  {
    id: "bev-03",
    name: "Fresh Guntur Spiced Majjiga (Buttermilk)",
    description: "Chilled churned yoghurt with crushed ginger, curry leaves, green chilies, and roasted cumin.",
    ingredients: ["curd yogurt", "ginger", "curry leaves", "green chili", "roasted cumin", "black salt"],
    price: 60,
    category: "beverages",
    isVeg: true,
    isVegan: false,
    isGlutenFree: true,
    spiceLevel: "mild",
    portion: "300ml",
    image: "/src/assets/images/dish_spiced_majjiga_1791003471059.jpg"
  },
  {
    id: "bev-04",
    name: "Fresh Lime Sweet & Salt Soda",
    description: "Freshly squeezed lime with effervescent soda and balanced sweetness.",
    ingredients: ["fresh lime juice", "sparkling club soda", "sugar syrup", "rock salt", "mint"],
    price: 70,
    category: "beverages",
    isVeg: true,
    isVegan: true,
    isGlutenFree: true,
    spiceLevel: "mild",
    portion: "350ml",
    image: "/src/assets/images/dish_spiced_majjiga_1791003471059.jpg"
  }
];

export const CUSTOMER_REVIEWS: ReviewItem[] = [
  {
    id: "rev-01",
    author: "sasank kanulla",
    avatarLetter: "S",
    rating: 5,
    timeAgo: "3 months ago",
    source: "Google Review",
    reviewText: "We had an amazing experience with family. They have managed to give a private place for us, kids enjoyed the privacy. We have been hosted by Sravani. She handled 13 people with patience. Took care of end to end experience. Felt special. Thank you for the wonderful dining experience.",
    ratingsBreakdown: {
      food: 5,
      service: 5,
      atmosphere: 5
    },
    mealType: "Family Dinner",
    pricePerPerson: "₹350 per person",
    verified: true,
    highlightedDish: "Family Private Dining & Biryani"
  },
  {
    id: "rev-02",
    author: "Niveditha Devathi",
    avatarLetter: "N",
    rating: 4.5,
    timeAgo: "3 months ago",
    source: "Google Review",
    reviewText: "Food was good, ambience was superb nd comfortable seating We ordered both veg nd non veg Spice levels are normal don't expect to spicy levels And kids love their starters with minimum spices Butter creamy garlic mushroom was so so Panner karvepaku was good in taste Tomato cashew curry also so so Methi chaman was good Biryanis nd non veg starters also good",
    ratingsBreakdown: {
      food: 4,
      service: 5,
      atmosphere: 5
    },
    mealType: "Dinner",
    pricePerPerson: "₹200–400",
    verified: true,
    highlightedDish: "Paneer Karivepaku & Methi Chaman"
  },
  {
    id: "rev-03",
    author: "Thə Risə",
    avatarLetter: "T",
    rating: 4.2,
    timeAgo: "5 months ago",
    source: "Google Review",
    reviewText: "Atmosphere is ok. Ambience is superb!!!! Too much waiting!!! Overall. Happy to dine at signature dine!!!! Gracious!!!!",
    ratingsBreakdown: {
      food: 4,
      service: 5,
      atmosphere: 4
    },
    mealType: "Lunch",
    pricePerPerson: "₹800–1,000",
    verified: true,
    highlightedDish: "Lunch Feast"
  },
  {
    id: "rev-04",
    author: "Kalyan Varma",
    avatarLetter: "K",
    rating: 5,
    timeAgo: "1 month ago",
    source: "Google Review",
    reviewText: "The Prawns Fry and Dum Biryani were top tier. Authentic Guntur flavor without being overwhelmingly burning hot. Very courteous staff and calm lighting.",
    ratingsBreakdown: {
      food: 5,
      service: 5,
      atmosphere: 5
    },
    mealType: "Dinner",
    pricePerPerson: "₹300–450",
    verified: true,
    highlightedDish: "Guntur Crispy Prawns"
  },
  {
    id: "rev-05",
    author: "Dr. Anusha Rao",
    avatarLetter: "A",
    rating: 5,
    timeAgo: "2 months ago",
    source: "Google Review",
    reviewText: "Celebrated my father's 60th birthday here. Reserved the private section beforehand. Sravani and team took great care of the elderly members and children. Truly the best dining experience in Guntur.",
    ratingsBreakdown: {
      food: 5,
      service: 5,
      atmosphere: 5
    },
    mealType: "Family Gathering",
    pricePerPerson: "₹400–500",
    verified: true,
    highlightedDish: "Private Celebration Dining"
  }
];

export const NEARBY_RESTAURANTS = [
  { name: "Signature Dine", rank: "#376 of 909", badge: "Current Restaurant", isCurrent: true },
  { name: "Sankranthi Multicuisine", rank: "#359 of 909", badge: "Nearby", isCurrent: false },
  { name: "Skays Restaurant", rank: "#366 of 909", badge: "Nearby", isCurrent: false },
  { name: "Momo Nation", rank: "#390 of 909", badge: "Nearby", isCurrent: false },
  { name: "The Shawarma Company", rank: "#125 of 330 fast food", badge: "Nearby", isCurrent: false },
];
