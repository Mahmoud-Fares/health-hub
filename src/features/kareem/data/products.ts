
export interface ProductReview {
  id: string;
  userName: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
}

export interface ProductSpecification {
  name: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  subcategory: string;
  price: number;
  rating: number;
  reviewCount: number;
  imageSrc: string;
  description: string;
  features: string[];
  specifications: ProductSpecification[];
  reviews: ProductReview[];
  inStock: boolean;
  bestseller?: boolean;
  new?: boolean;
  discountPercentage?: number;
}

export const productCategories = [
  {
    id: "fitness-trackers",
    name: "Fitness Trackers",
  },
  {
    id: "smart-watches",
    name: "Smart Watches",
  },
  {
    id: "heart-rate-monitors",
    name: "Heart Rate Monitors",
  },
  {
    id: "scales",
    name: "Smart Scales",
  },
  {
    id: "workout-equipment",
    name: "Workout Equipment",
  },
];

export const brands = [
  { id: "fitbit", name: "Fitbit" },
  { id: "garmin", name: "Garmin" },
  { id: "apple", name: "Apple" },
  { id: "samsung", name: "Samsung" },
  { id: "xiaomi", name: "Xiaomi" },
  { id: "withings", name: "Withings" },
  { id: "polar", name: "Polar" },
  { id: "suunto", name: "Suunto" },
];

export const products: Product[] = [
  {
    id: "fitness-watch-pro",
    name: "Fitness Watch Pro",
    brand: "Fitbit",
    category: "fitness-trackers",
    subcategory: "advanced",
    price: 199.99,
    rating: 4.7,
    reviewCount: 246,
    imageSrc: "../../public/img/61hlJBE612L._AC_UF894,1000_QL80_.jpg",
    description: "Advanced fitness tracker with GPS and heart rate monitoring.",
    features: [
      "Built-in GPS",
      "Heart rate monitoring",
      "Water resistant to 50m",
      "Sleep tracking",
      "7-day battery life",
    ],
    specifications: [
      { name: "Display", value: "1.4\" AMOLED" },
      { name: "Battery Life", value: "Up to 7 days" },
      { name: "Water Resistance", value: "5 ATM (50m)" },
      { name: "Sensors", value: "Heart rate, accelerometer, gyroscope, GPS" },
      { name: "Connectivity", value: "Bluetooth 5.0, WiFi" },
      { name: "Weight", value: "48g" },
    ],
    reviews: [
      {
        id: "r1",
        userName: "FitnessEnthusiast",
        rating: 5,
        date: "2025-03-15",
        title: "Best fitness tracker I've owned",
        comment: "The battery life is amazing and the heart rate monitor is very accurate!",
      },
      {
        id: "r2",
        userName: "JohnRunner",
        rating: 4,
        date: "2025-02-28",
        title: "Great GPS accuracy",
        comment: "I use it for my daily runs and the GPS tracking is spot on.",
      },
    ],
    inStock: true,
    bestseller: true,
  },
  {
    id: "smart-health-watch",
    name: "Smart Health Watch",
    brand: "Garmin",
    category: "smart-watches",
    subcategory: "premium",
    price: 299.99,
    rating: 4.8,
    reviewCount: 189,
    imageSrc: "../../public/img/Smart-watch-fits.webp",
    description: "Premium smartwatch with advanced health monitoring features.",
    features: [
      "ECG monitoring",
      "Blood oxygen monitoring",
      "Stress tracking",
      "GPS navigation",
      "10-day battery life",
    ],
    specifications: [
      { name: "Display", value: "1.3\" Transflective MIP" },
      { name: "Battery Life", value: "Up to 10 days" },
      { name: "Water Resistance", value: "10 ATM (100m)" },
      { name: "Sensors", value: "Heart rate, Pulse Ox, barometric altimeter, compass, gyroscope, accelerometer, thermometer" },
      { name: "Connectivity", value: "Bluetooth, ANT+, WiFi" },
      { name: "Weight", value: "52g" },
    ],
    reviews: [
      {
        id: "r3",
        userName: "HealthTracker",
        rating: 5,
        date: "2025-04-10",
        title: "Incredible health features",
        comment: "The ECG and blood oxygen monitoring have been game changers for me.",
      },
      {
        id: "r4",
        userName: "MountainHiker",
        rating: 5,
        date: "2025-03-22",
        title: "Perfect for outdoor activities",
        comment: "The battery life and durability are outstanding for hiking trips.",
      },
    ],
    inStock: true,
    new: true,
  },
  {
    id: "budget-fitness-band",
    name: "Budget Fitness Band",
    brand: "Xiaomi",
    category: "fitness-trackers",
    subcategory: "basic",
    price: 49.99,
    rating: 4.3,
    reviewCount: 512,
    imageSrc: "../../public/img/download (2).jpeg",
    description: "Affordable fitness band with essential tracking features.",
    features: [
      "Heart rate monitoring",
      "Step counting",
      "Sleep tracking",
      "Notification alerts",
      "14-day battery life",
    ],
    specifications: [
      { name: "Display", value: "0.95\" AMOLED" },
      { name: "Battery Life", value: "Up to 14 days" },
      { name: "Water Resistance", value: "5 ATM (50m)" },
      { name: "Sensors", value: "Heart rate, accelerometer" },
      { name: "Connectivity", value: "Bluetooth 5.0" },
      { name: "Weight", value: "22g" },
    ],
    reviews: [
      {
        id: "r5",
        userName: "BudgetBuyer",
        rating: 4,
        date: "2025-04-05",
        title: "Great value for money",
        comment: "Can't believe how many features this has for the price!",
      },
      {
        id: "r6",
        userName: "SimpleFitness",
        rating: 5,
        date: "2025-03-14",
        title: "Battery lasts forever",
        comment: "I only need to charge it once every two weeks. Amazing!",
      },
    ],
    inStock: true,
    discountPercentage: 20,
  },
  {
    id: "premium-smart-scale",
    name: "Premium Smart Scale",
    brand: "Withings",
    category: "scales",
    subcategory: "premium",
    price: 149.99,
    rating: 4.6,
    reviewCount: 128,
    imageSrc: "../../public/img/download (3).jpeg",
    description: "High-precision smart scale with comprehensive body composition analysis.",
    features: [
      "Weight measurement",
      "Body fat percentage",
      "Muscle mass",
      "Water percentage",
      "Bone mass",
      "Syncs with fitness apps",
    ],
    specifications: [
      { name: "Accuracy", value: "±0.1 kg" },
      { name: "Max Weight", value: "180 kg" },
      { name: "Power Source", value: "4 AAA batteries" },
      { name: "Connectivity", value: "Bluetooth, WiFi" },
      { name: "Dimensions", value: "32.7 x 32.7 cm" },
      { name: "User Recognition", value: "Up to 8 users" },
    ],
    reviews: [
      {
        id: "r7",
        userName: "WeightWatcher",
        rating: 4,
        date: "2025-04-12",
        title: "Very accurate measurements",
        comment: "Compared with my gym's professional scale and the readings match perfectly.",
      },
      {
        id: "r8",
        userName: "FitnessJourney",
        rating: 5,
        date: "2025-03-28",
        title: "Great for tracking progress",
        comment: "The app integration makes it easy to track my body composition changes over time.",
      },
    ],
    inStock: true,
  },
  {
    id: "heart-rate-chest-strap",
    name: "Heart Rate Chest Strap",
    brand: "Polar",
    category: "heart-rate-monitors",
    subcategory: "professional",
    price: 79.99,
    rating: 4.9,
    reviewCount: 86,
    imageSrc: "../../public/img/download (4).jpeg",
    description: "Professional-grade heart rate monitor with maximum accuracy.",
    features: [
      "ECG-accurate heart rate",
      "Bluetooth and ANT+ connectivity",
      "Waterproof design",
      "400-hour battery life",
      "Comfortable strap",
    ],
    specifications: [
      { name: "Battery Type", value: "CR2032" },
      { name: "Battery Life", value: "Up to 400 hours" },
      { name: "Water Resistance", value: "30m (swimming)" },
      { name: "Connectivity", value: "Bluetooth Smart, ANT+" },
      { name: "Weight", value: "39g" },
      { name: "Strap Material", value: "Soft textile, silicon grips" },
    ],
    reviews: [
      {
        id: "r9",
        userName: "TriathletePro",
        rating: 5,
        date: "2025-04-08",
        title: "Most accurate HRM available",
        comment: "As a professional athlete, I need reliable data and this delivers every time.",
      },
      {
        id: "r10",
        userName: "CardioTrainer",
        rating: 5,
        date: "2025-03-19",
        title: "Perfect for HIIT workouts",
        comment: "The quick response time is essential for interval training.",
      },
    ],
    inStock: true,
  },
  {
    id: "smart-rowing-machine",
    name: "Smart Rowing Machine",
    brand: "Hydrow",
    category: "workout-equipment",
    subcategory: "cardio",
    price: 1799.99,
    rating: 4.7,
    reviewCount: 42,
    imageSrc: "../../public/img/293569745223710.avif",
    description: "Interactive rowing machine with live and on-demand workouts.",
    features: [
      "22\" HD touchscreen",
      "Live workout classes",
      "Electromagnetic resistance",
      "Whisper-quiet operation",
      "Stores upright to save space",
    ],
    specifications: [
      { name: "Dimensions", value: "86\" L x 25\" W x 47\" H" },
      { name: "Weight", value: "145 lbs" },
      { name: "Weight Capacity", value: "375 lbs" },
      { name: "Display", value: "22\" 1080p HD" },
      { name: "Resistance Type", value: "Computer-controlled electromagnetic" },
      { name: "Connectivity", value: "WiFi, Bluetooth" },
    ],
    reviews: [
      {
        id: "r11",
        userName: "HomeGymEnthusiast",
        rating: 5,
        date: "2025-04-15",
        title: "Best home cardio equipment",
        comment: "The virtual classes make me forget I'm working out at home. Excellent machine!",
      },
      {
        id: "r12",
        userName: "FormerRower",
        rating: 4,
        date: "2025-03-25",
        title: "Almost like being on water",
        comment: "The resistance feels very natural. Great full-body workout.",
      },
    ],
    inStock: false,
  },
  {
    id: "multisport-gps-watch",
    name: "Multisport GPS Watch",
    brand: "Suunto",
    category: "smart-watches",
    subcategory: "outdoor",
    price: 349.99,
    rating: 4.5,
    reviewCount: 73,
    imageSrc: "../../public/img/download (1).jpeg",
    description: "Rugged outdoor watch with advanced navigation and activity tracking.",
    features: [
      "Over 80 sport modes",
      "Turn-by-turn navigation",
      "Barometric altimeter",
      "Weather insights and alerts",
      "30-day battery life in time mode",
    ],
    specifications: [
      { name: "Display", value: "1.4\" transflective color" },
      { name: "Battery Life", value: "Up to 30 days (time mode), 40 hours (GPS)" },
      { name: "Water Resistance", value: "100m" },
      { name: "Sensors", value: "GPS, GLONASS, Galileo, heart rate, barometric altimeter, compass" },
      { name: "Connectivity", value: "Bluetooth" },
      { name: "Materials", value: "Stainless steel bezel, silicone strap" },
    ],
    reviews: [
      {
        id: "r13",
        userName: "MountainClimber",
        rating: 5,
        date: "2025-04-02",
        title: "Reliable in extreme conditions",
        comment: "Took this to 14,000 feet and it performed flawlessly in freezing temperatures.",
      },
      {
        id: "r14",
        userName: "TrailRunner",
        rating: 4,
        date: "2025-03-11",
        title: "Great navigation features",
        comment: "The mapping and route tracking have saved me multiple times on long trail runs.",
      },
    ],
    inStock: true,
    new: true,
  },
  {
    id: "bluetooth-earbuds-sport",
    name: "Bluetooth Earbuds Sport",
    brand: "JBL",
    category: "accessories",
    subcategory: "audio",
    price: 99.99,
    rating: 4.2,
    reviewCount: 318,
    imageSrc: "../../public/img/download.jpeg",
    description: "Wireless earbuds designed specifically for intense workouts.",
    features: [
      "Sweat and waterproof (IPX7)",
      "8 hour battery life",
      "Secure ear hooks",
      "Built-in heart rate monitor",
      "Touch controls",
    ],
    specifications: [
      { name: "Battery Life", value: "8 hours, +16 with case" },
      { name: "Water Resistance", value: "IPX7" },
      { name: "Bluetooth Version", value: "5.2" },
      { name: "Driver Size", value: "10mm dynamic" },
      { name: "Charging", value: "USB-C, wireless" },
      { name: "Weight", value: "6.5g per earbud" },
    ],
    reviews: [
      {
        id: "r15",
        userName: "GymRat",
        rating: 4,
        date: "2025-04-18",
        title: "Stay put during intense workouts",
        comment: "Finally found earbuds that don't fall out when I'm doing burpees!",
      },
      {
        id: "r16",
        userName: "RunningSoundtrack",
        rating: 5,
        date: "2025-03-30",
        title: "Great sound quality",
        comment: "The bass is impressive for such small earbuds. Perfect for my running playlists.",
      },
    ],
    inStock: true,
    bestseller: true,
  },
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getRelatedProducts = (product: Product, limit = 4): Product[] => {
  return products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, limit);
};

export const getBestsellerProducts = (limit = 4): Product[] => {
  return products
    .filter(product => product.bestseller)
    .slice(0, limit);
};

export const getNewProducts = (limit = 4): Product[] => {
  return products
    .filter(product => product.new)
    .slice(0, limit);
};
