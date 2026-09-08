/**
 * STARTASS AUCTIONS - Main JavaScript Engine
 * Handles Top 10 Bids display, category filtering, live countdowns, and bidding modals.
 */

// Default Top 10 Auction Items Data
const DEFAULT_AUCTION_ITEMS = [
  {
    id: 'auc-01',
    rank: 1,
    title: '1967 Shelby GT500 Fastback "Eleanor Edition"',
    category: 'cars',
    categoryLabel: 'Car Models',
    image: 'https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Fully restored numbers-matching 428 Cobra Jet V8, 4-speed manual transmission, finished in Pepper Gray with black Le Mans stripes. Verified Shelby registry documentation.',
    startPrice: 150000,
    currentBid: 485000,
    startDate: '2026-08-28 10:00 AM',
    endDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000 + 4 * 3600 * 1000).toISOString(),
    bidsCount: 42,
    specs: ['428ci Cobra Jet V8 Engine', '4-Speed Toploader Manual', 'Pepper Gray with Black Stripes', 'Carroll Shelby Signed Dashboard'],
    seller: {
      nickname: 'ApexMotors_NY',
      name: 'Apex Classic Motoring LLC',
      rating: '4.9 ★',
      reviewsCount: 128,
      verified: true,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80'
    },
    bidHistory: [
      { user: 'Alexander Sterling (You)', amount: 485000, time: '12 mins ago' },
      { user: 'ApexMotors_NY', amount: 470000, time: '1 hour ago' },
      { user: 'VintageVault', amount: 450000, time: '3 hours ago' }
    ]
  },
  {
    id: 'auc-02',
    rank: 2,
    title: '1st Edition Shadowless Charizard #4/102 (PSA 10 Gem Mint)',
    category: 'cards',
    categoryLabel: 'Collectible Cards',
    image: 'https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Holy Grail of collectible trading cards. 1999 Base Set 1st Edition Shadowless Charizard graded PSA 10 Gem Mint. Flawless centering, razor sharp corners, and crystal surface.',
    startPrice: 90000,
    currentBid: 360000,
    startDate: '2026-08-30 02:00 PM',
    endDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000 + 11 * 3600 * 1000).toISOString(),
    bidsCount: 58,
    specs: ['Graded: PSA 10 Gem Mint', 'Cert ID: #4829104', 'Shadowless Holographic', 'Museum Grade UV Acrylic Casing'],
    seller: {
      nickname: 'KyotoVault_Cards',
      name: 'Kyoto Rare Collectibles Japan',
      rating: '5.0 ★',
      reviewsCount: 94,
      verified: true,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80'
    },
    bidHistory: [
      { user: 'PokeInvestor99', amount: 360000, time: '5 mins ago' },
      { user: 'KyotoCollectibles', amount: 345000, time: '45 mins ago' },
      { user: 'BlueEyesTrader', amount: 320000, time: '2 hours ago' }
    ]
  },
  {
    id: 'auc-03',
    rank: 3,
    title: 'Porsche 911 GT3 RS Weissach Package (2024)',
    category: 'cars',
    categoryLabel: 'Car Models',
    image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Factory lightweight Weissach Package, exposed carbon fiber hood & roof, magnesium wheels, ceramic composite brakes (PCCB), and delivery mileage only (45 miles).',
    startPrice: 220000,
    currentBid: 315000,
    startDate: '2026-08-25 09:00 AM',
    endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000 + 8 * 3600 * 1000).toISOString(),
    bidsCount: 29,
    specs: ['4.0L Naturally Aspirated Flat-6 (518 HP)', 'Carbon-Ceramic Composite Brakes', 'Weissach Lightweight Carbon Package', 'Odo: 45 miles'],
    seller: {
      nickname: 'StuttgartExclusive',
      name: 'Stuttgart Heritage Auto Haus',
      rating: '4.8 ★',
      reviewsCount: 67,
      verified: true,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80'
    },
    bidHistory: [
      { user: 'StuttgartFanatic', amount: 315000, time: '25 mins ago' },
      { user: 'TrackDayHero', amount: 305000, time: '2 hours ago' },
      { user: 'MonacoGarage', amount: 290000, time: '5 hours ago' }
    ]
  },
  {
    id: 'auc-04',
    rank: 4,
    title: '180-Year-Old Imperial Japanese Shimpaku Juniper Bonsai',
    category: 'trees',
    categoryLabel: 'Rare Trees & Flora',
    image: 'https://images.unsplash.com/photo-1512428813834-c702c7702b78?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1512428813834-c702c7702b78?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Direct lineage from the Omiya Bonsai Village master collection. Exquisite jin and shari natural deadwood sculpture with vibrant compact foliage in antique handmade Tokoname pot.',
    startPrice: 40000,
    currentBid: 195000,
    startDate: '2026-08-27 11:30 AM',
    endDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000 + 16 * 3600 * 1000).toISOString(),
    bidsCount: 33,
    specs: ['Age: ~180 Years (Documented)', 'Species: Juniperus chinensis var. sargentii', 'Pot: Antique 19th Century Tokoname Ceramic', 'Includes Botanical Export Certificate'],
    seller: {
      nickname: 'ZenMasterBotanics',
      name: 'Omiya Master Bonsai Collection',
      rating: '4.9 ★',
      reviewsCount: 42,
      verified: true,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&q=80'
    },
    bidHistory: [
      { user: 'ZenBotanics_Tokyo', amount: 195000, time: '18 mins ago' },
      { user: 'BotanicalArboretum', amount: 180000, time: '3 hours ago' },
      { user: 'GreenHeritage', amount: 165000, time: '6 hours ago' }
    ]
  },
  {
    id: 'auc-05',
    rank: 5,
    title: 'Original Operational Apple-1 Computer System (1976)',
    category: 'tech',
    categoryLabel: 'Tech Computing',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'One of only 63 surviving Apple-1 motherboards hand-built by Steve Wozniak and Steve Jobs. Fully functional, authenticated by Corey Cohen, complete with period Sanyo monitor and Datanetics keyboard.',
    startPrice: 85000,
    currentBid: 178000,
    startDate: '2026-08-29 08:00 AM',
    endDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000 + 7 * 3600 * 1000).toISOString(),
    bidsCount: 38,
    specs: ['Operational MOS 6502 Microprocessor @ 1MHz', '4KB RAM Onboard (expandable)', 'Original Apple Cassette Interface (ACI)', 'Signed letter of authenticity'],
    seller: {
      nickname: 'SiliconHeritage_CA',
      name: 'Silicon Valley Artifacts Society',
      rating: '5.0 ★',
      reviewsCount: 88,
      verified: true,
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=120&q=80'
    },
    bidHistory: [
      { user: 'SiliconMuseum_SF', amount: 178000, time: '30 mins ago' },
      { user: 'TechPioneerVentures', amount: 165000, time: '2 hours ago' },
      { user: 'ByteHistorian', amount: 150000, time: '4 hours ago' }
    ]
  },
  {
    id: 'auc-06',
    rank: 6,
    title: 'Magic: The Gathering Alpha Black Lotus (BGS 9.5 Gem Mint)',
    category: 'cards',
    categoryLabel: 'Collectible Cards',
    image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'The pinnacle of Magic: The Gathering history. Original 1993 Alpha release illustrated by the late Christopher Rush. Pristine subgrades: Centering 9.5, Corners 9.5, Edges 9.5, Surface 9.0.',
    startPrice: 70000,
    currentBid: 162000,
    startDate: '2026-08-26 01:00 PM',
    endDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000 + 19 * 3600 * 1000).toISOString(),
    bidsCount: 26,
    specs: ['Beckett Grading: BGS 9.5 Gem Mint', '1993 Limited Edition Alpha', 'Subgrades: 9.5 / 9.5 / 9.5 / 9.0', 'Artist: Christopher Rush'],
    seller: {
      nickname: 'PlaneswalkerGuild',
      name: 'Planeswalker High-End Vault',
      rating: '4.9 ★',
      reviewsCount: 115,
      verified: true,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80'
    },
    bidHistory: [
      { user: 'ManaVaultCapital', amount: 162000, time: '40 mins ago' },
      { user: 'PlaneswalkerGuild', amount: 155000, time: '1 hour ago' },
      { user: 'SeattleCardRoom', amount: 140000, time: '3 hours ago' }
    ]
  },
  {
    id: 'auc-07',
    rank: 7,
    title: 'Silicon Graphics Onyx2 Ultimate Reality Visualization Rack',
    category: 'tech',
    categoryLabel: 'Tech Computing',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Legendary 1990s aerospace & CGI supercomputer rack in signature purple enclosure. Powered by 16 MIPS R10000 processors and 4 RealityEngine graphics pipes. Fully restored with IRIX 6.5.',
    startPrice: 35000,
    currentBid: 125000,
    startDate: '2026-08-28 03:00 PM',
    endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000 + 12 * 3600 * 1000).toISOString(),
    bidsCount: 21,
    specs: ['16x 250MHz MIPS R10000 Processors', 'InfiniteReality3 Graphics Subsystem', 'IRIX 6.5.30 Loaded with Alias/Wavefront', 'Original 1998 Documentation & Cables'],
    seller: {
      nickname: 'RetroFoundry_Sys',
      name: 'Retro Supercomputing Heritage',
      rating: '4.7 ★',
      reviewsCount: 39,
      verified: true,
      avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=120&q=80'
    },
    bidHistory: [
      { user: 'HoloComputeLab', amount: 125000, time: '55 mins ago' },
      { user: 'RetroSiliconFoundry', amount: 115000, time: '4 hours ago' },
      { user: 'SupercomputeArch', amount: 100000, time: '8 hours ago' }
    ]
  },
  {
    id: 'auc-08',
    rank: 8,
    title: '1994 McLaren F1 GTR Telemetry Simulation Rig & Chassis Frame',
    category: 'tech',
    categoryLabel: 'Tech Computing',
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Custom bespoke motorsport simulator built on a genuine lightweight carbon composite tub with industrial hydraulic motion actuators, quad-4K surround display, and authentic MoTeC telemetry systems.',
    startPrice: 30000,
    currentBid: 110000,
    startDate: '2026-08-31 10:00 AM',
    endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000 + 2 * 3600 * 1000).toISOString(),
    bidsCount: 19,
    specs: ['6-DOF Force-Feedback Hydraulic Platform', 'Full Carbon Fiber Monocoque Cockpit', 'Authentic MoTeC Display Unit & Sparco Pedals', 'Dual RTX 4090 Simulation Node'],
    seller: {
      nickname: 'SilverstoneRacer',
      name: 'Silverstone Motorsport Sim Lab',
      rating: '4.9 ★',
      reviewsCount: 52,
      verified: true,
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&q=80'
    },
    bidHistory: [
      { user: 'SilverstoneRacer', amount: 110000, time: '1 hour ago' },
      { user: 'SimDynamics_UK', amount: 98000, time: '5 hours ago' },
      { user: 'ProRacingGlobal', amount: 90000, time: '1 day ago' }
    ]
  },
  {
    id: 'auc-09',
    rank: 9,
    title: 'Ancient Mature Japanese Maple Bonsai (Momiji Acer Palmatum)',
    category: 'trees',
    categoryLabel: 'Rare Trees & Flora',
    image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512428813834-c702c7702b78?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Majestic 95-year-old Japanese Mountain Maple with breathtaking fiery autumn scarlet foliage. Balanced broom-style canopy with an impressive flared nebari root base.',
    startPrice: 20000,
    currentBid: 96000,
    startDate: '2026-08-29 09:30 AM',
    endDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000 + 20 * 3600 * 1000).toISOString(),
    bidsCount: 24,
    specs: ['Age: 95 Years', 'Style: Hoki-dachi (Broom Style)', 'Height: 38 inches / Nebari Width: 14 inches', 'Acclimated Greenhouse Specimen'],
    seller: {
      nickname: 'BonsaiKyotoGarden',
      name: 'Kyoto Imperial Botanical Heritage',
      rating: '5.0 ★',
      reviewsCount: 63,
      verified: true,
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=120&q=80'
    },
    bidHistory: [
      { user: 'KyotoGardener', amount: 96000, time: '2 hours ago' },
      { user: 'BonsaiCollector_CH', amount: 88000, time: '6 hours ago' },
      { user: 'BotanicaLover', amount: 80000, time: '12 hours ago' }
    ]
  },
  {
    id: 'auc-10',
    rank: 10,
    title: '1970 Dodge Charger R/T 426 HEMI (B5 Blue Fire Metallic)',
    category: 'cars',
    categoryLabel: 'Car Models',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Factory original 426 HEMI V8 (425 hp), Torqueflite automatic, pristine B5 Blue Metallic with black vinyl roof. Documented with original broadcast sheet and Galen Govier inspection report.',
    startPrice: 45000,
    currentBid: 92000,
    startDate: '2026-08-27 04:00 PM',
    endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000 + 5 * 3600 * 1000).toISOString(),
    bidsCount: 31,
    specs: ['Original 426ci Street HEMI V8', 'Dual 4-Barrel Carter Carburetors', 'B5 Blue Fire Metallic Paint', 'Galen Govier Authenticated 1 of 112'],
    seller: {
      nickname: 'DetroitMuscle_Classic',
      name: 'Detroit Auto Heritage Collectibles',
      rating: '4.8 ★',
      reviewsCount: 81,
      verified: true,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80'
    },
    bidHistory: [
      { user: 'MoparMuscleClub', amount: 92000, time: '15 mins ago' },
      { user: 'DetroitIron', amount: 86000, time: '3 hours ago' },
      { user: 'HighwayLegend', amount: 79000, time: '7 hours ago' }
    ]
  }
];

// LocalStorage Persistence Helpers
function loadAuctions() {
  const saved = localStorage.getItem('startass_auctions');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        // Backfill missing seller or images for backwards compatibility
        parsed.forEach(item => {
          if (!item.seller) {
            const def = DEFAULT_AUCTION_ITEMS.find(d => d.id === item.id);
            item.seller = def ? def.seller : {
              nickname: 'VerifiedSeller_Official',
              name: 'Verified Collector',
              rating: '4.9 ★',
              reviewsCount: 50,
              verified: true,
              avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80'
            };
          }
          if (!item.images || item.images.length === 0) {
            item.images = [item.image];
          }
        });
        return parsed;
      }
    } catch (e) {
      console.error('Failed to parse saved auctions:', e);
    }
  }
  return JSON.parse(JSON.stringify(DEFAULT_AUCTION_ITEMS));
}

function saveAuctions() {
  try {
    localStorage.setItem('startass_auctions', JSON.stringify(AUCTION_ITEMS));
  } catch (e) {
    console.error('Failed to save auctions to storage:', e);
  }
}

// LocalStorage Orders Management (Active Bids & Placed Orders)
function loadOrders() {
  const seedWonOrder = {
    orderId: 'ORD-AUC-02',
    itemId: 'auc-02',
    title: '1st Edition Shadowless Charizard #4/102 (PSA 10 Gem Mint)',
    category: 'cards',
    categoryLabel: 'Collectible Cards',
    image: 'https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1200&q=80'
    ],
    userBid: 360000,
    currentBid: 360000,
    startPrice: 90000,
    bidIncrement: 5000,
    status: 'WON', // ENUM: 'WINNING' | 'OUTBID' | 'WON' | 'ENDED'
    statusLabel: 'Auction Won (Pending Delivery)',
    placedAt: 'Sep 7, 2026, 14:15',
    updatedAt: 'Sep 8, 2026, 16:30',
    seller: {
      nickname: 'KyotoVault_Cards',
      name: 'Kyoto Rare Collectibles Japan',
      rating: '5.0 ★ (94 reviews)',
      verified: true,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80'
    },
    specs: ['Graded: PSA 10 Gem Mint', 'Cert ID: #4829104', 'Shadowless Holographic', 'Museum Grade UV Acrylic Casing'],
    description: 'Holy Grail of collectible trading cards. 1999 Base Set 1st Edition Shadowless Charizard graded PSA 10 Gem Mint. Flawless centering, razor sharp corners, and crystal surface.',
    endDate: new Date(Date.now() - 3600000).toISOString()
  };

  const seedWonOrder3 = {
    orderId: 'ORD-AUC-03',
    itemId: 'auc-03',
    title: 'Patek Philippe Grandmaster Chime 6300G-001 White Gold',
    category: 'tech',
    categoryLabel: 'Luxury Timepieces',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80'
    ],
    userBid: 4200000,
    currentBid: 4200000,
    startPrice: 2800000,
    bidIncrement: 50000,
    status: 'WON', // ENUM: 'WINNING' | 'OUTBID' | 'WON' | 'ENDED'
    statusLabel: 'Auction Won (Pending Delivery)',
    placedAt: 'Sep 6, 2026, 10:20',
    updatedAt: 'Sep 8, 2026, 11:45',
    seller: {
      nickname: 'GenevaVault_CH',
      name: 'Geneva Horology Antiquities SA',
      rating: '5.0 ★ (62 reviews)',
      verified: true,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80'
    },
    specs: ['Reversible Case in 18K White Gold', '20 Complications with 5 Chime Modes', 'Patek Philippe Certificate of Origin', 'White-Glove Armored Escort Included'],
    description: 'The most complicated Patek Philippe wristwatch ever made in regular production. Double-faced reversible case with guilloched hobnail pattern.',
    endDate: new Date(Date.now() - 7200000).toISOString()
  };

  const saved = localStorage.getItem('startass_orders');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        let changed = false;
        if (!parsed.some(o => o.orderId === 'ORD-AUC-02')) {
          parsed.push(seedWonOrder);
          changed = true;
        }
        if (!parsed.some(o => o.orderId === 'ORD-AUC-03')) {
          parsed.push(seedWonOrder3);
          changed = true;
        }
        if (changed) {
          saveOrders(parsed);
        }
        return parsed;
      }
    } catch (e) {
      console.error('Failed to parse saved orders:', e);
    }
  }

  // Seed with initial active order for auc-01 and won orders for auc-02, auc-03
  const seedOrders = [
    {
      orderId: 'ORD-AUC-01',
      itemId: 'auc-01',
      title: '1967 Shelby GT500 Fastback "Eleanor Edition"',
      category: 'cars',
      categoryLabel: 'Car Models',
      image: 'https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&fit=crop&w=1200&q=80',
      images: [
        'https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1200&q=80'
      ],
      userBid: 485000,
      currentBid: 485000,
      startPrice: 150000,
      bidIncrement: 1000,
      status: 'WINNING', // ENUM: 'WINNING' | 'OUTBID' | 'WON' | 'ENDED'
      statusLabel: 'Active Winning (Highest Bidder)',
      placedAt: 'Sep 8, 2026, 17:30',
      updatedAt: 'Sep 8, 2026, 18:45',
      seller: {
        nickname: 'ApexMotors_NY',
        name: 'Apex Classic Motoring LLC',
        rating: '4.9 ★ (128 reviews)',
        verified: true,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80'
      },
      specs: ['428ci Cobra Jet V8 Engine', '4-Speed Toploader Manual', 'Pepper Gray with Black Stripes', 'Carroll Shelby Signed Dashboard'],
      description: 'Fully restored numbers-matching 428 Cobra Jet V8, 4-speed manual transmission, finished in Pepper Gray with black Le Mans stripes. Verified Shelby registry documentation.',
      endDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000 + 4 * 3600 * 1000).toISOString()
    },
    seedWonOrder,
    seedWonOrder3
  ];
  saveOrders(seedOrders);
  return seedOrders;
}

function saveOrders(orders) {
  try {
    localStorage.setItem('startass_orders', JSON.stringify(orders));
  } catch (e) {
    console.error('Failed to save orders to storage:', e);
  }
}

function getUserOrder(itemId) {
  const orders = loadOrders();
  return orders.find(o => o.itemId === itemId);
}

function navigateToOrderChat(itemId) {
  window.location.href = `ordersdetail.html?id=${encodeURIComponent(itemId)}&tab=chat`;
}

function isUserHighestBidder(itemId) {
  const item = AUCTION_ITEMS.find(i => i.id === itemId);
  if (!item) return false;

  // 1. Check user order if exists and user's placed bid equals or exceeds current bid
  const order = getUserOrder(itemId);
  if (order && Number(order.userBid) >= Number(item.currentBid)) {
    return true;
  }

  // 2. Check top of bid history for current user identifier
  if (item.bidHistory && item.bidHistory.length > 0) {
    const topBid = item.bidHistory[0];
    const topUser = (topBid.user || '').toLowerCase();
    const currentUserName = (typeof currentUser !== 'undefined' && currentUser && currentUser.fullName ? currentUser.fullName : 'Alexander Sterling').toLowerCase();
    if (topUser.includes('(you)') || topUser.includes('alexander') || topUser.includes(currentUserName)) {
      return true;
    }
  }

  return false;
}

function updateNavOrdersCount() {
  const orders = loadOrders();
  const badges = document.querySelectorAll('.orders-nav-badge, #navOrdersBadge');
  badges.forEach(b => {
    b.textContent = orders.length;
    b.style.display = orders.length > 0 ? 'inline-flex' : 'none';
  });
}

function navigateToOrder(itemId) {
  window.location.href = `ordersdetail.html?id=${encodeURIComponent(itemId)}`;
}

// ==========================================================================
// NOTIFICATIONS & OUTBID ALERT ENGINE
// ==========================================================================
function loadNotifications() {
  const saved = localStorage.getItem('startass_notifications');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) return parsed;
    } catch (e) {
      console.error('Failed to parse notifications:', e);
    }
  }

  // Seed with 1 initial notification alert
  const seedNotifications = [
    {
      id: 'notif-1',
      type: 'outbid',
      itemId: 'auc-01',
      orderId: 'ORD-AUC-01',
      title: "Outbid Alert: You've been outbid!",
      message: 'Collector_Viper placed a higher bid of $500,000 on "1967 Shelby GT500 Fastback"',
      itemTitle: '1967 Shelby GT500 Fastback "Eleanor Edition"',
      newBid: 500000,
      bidder: 'Collector_Viper',
      time: '12 mins ago',
      read: false,
      createdAt: new Date(Date.now() - 12 * 60 * 1000).toISOString()
    }
  ];
  saveNotifications(seedNotifications);
  return seedNotifications;
}

function saveNotifications(notifications) {
  try {
    localStorage.setItem('startass_notifications', JSON.stringify(notifications));
  } catch (e) {
    console.error('Failed to save notifications:', e);
  }
}

function updateNotificationBadge() {
  const notifications = loadNotifications();
  const unreadCount = notifications.filter(n => !n.read).length;
  const badges = document.querySelectorAll('.notification-badge, #notificationBadge');
  const countTags = document.querySelectorAll('.notification-count-tag, #notificationCountTag');
  const btns = document.querySelectorAll('.notification-btn, #notificationBtn');

  badges.forEach(b => {
    b.textContent = unreadCount;
    b.style.display = unreadCount > 0 ? 'inline-flex' : 'none';
  });

  countTags.forEach(ct => {
    ct.textContent = `${unreadCount} new`;
  });

  btns.forEach(btn => {
    btn.classList.toggle('has-unread', unreadCount > 0);
  });
}

function toggleNotificationDropdown(event) {
  if (event) event.stopPropagation();
  closeProfileDropdown();

  const menu = document.getElementById('notificationDropdownMenu');
  const btn = document.getElementById('notificationBtn');
  if (!menu || !btn) return;

  const isOpen = menu.classList.toggle('open');
  btn.classList.toggle('active', isOpen);
  btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');

  if (isOpen) {
    renderNotificationsList();
  }
}

function closeNotificationDropdown() {
  const menu = document.getElementById('notificationDropdownMenu');
  const btn = document.getElementById('notificationBtn');
  if (menu) menu.classList.remove('open');
  if (btn) {
    btn.classList.remove('active');
    btn.setAttribute('aria-expanded', 'false');
  }
}

function renderNotificationsList() {
  const listEl = document.getElementById('notificationList');
  if (!listEl) return;

  const notifications = loadNotifications();
  if (notifications.length === 0) {
    listEl.innerHTML = `
      <div class="notification-empty">
        <i class="fa-regular fa-bell-slash"></i>
        <span>No notifications at the moment</span>
      </div>
    `;
    return;
  }

  listEl.innerHTML = notifications.map(n => {
    const isUnread = !n.read;
    return `
      <div class="notification-item ${isUnread ? 'unread' : ''}" onclick="markNotificationRead('${n.id}')">
        <div class="notif-icon-box notif-icon-outbid">
          <i class="fa-solid fa-triangle-exclamation"></i>
        </div>
        <div class="notif-body">
          <div class="notif-title-row">
            <span class="notif-title outbid-title">${n.title}</span>
            <span class="notif-time">${n.time}</span>
          </div>
          <div class="notif-message">${n.message}</div>
          <div class="notif-actions">
            <button type="button" class="btn-notif-raise" onclick="handleNotifRaiseBid('${n.itemId}', '${n.id}', event)">
              <i class="fa-solid fa-gavel"></i> Raise Bid
            </button>
            <a href="ordersdetail.html?id=${encodeURIComponent(n.itemId)}" class="notif-order-link" onclick="event.stopPropagation()">
              View Order &rarr;
            </a>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function markNotificationRead(notifId) {
  const notifications = loadNotifications();
  const target = notifications.find(n => n.id === notifId);
  if (target && !target.read) {
    target.read = true;
    saveNotifications(notifications);
    updateNotificationBadge();
    renderNotificationsList();
  }
}

function markAllNotificationsRead(event) {
  if (event) event.stopPropagation();
  const notifications = loadNotifications();
  notifications.forEach(n => n.read = true);
  saveNotifications(notifications);
  updateNotificationBadge();
  renderNotificationsList();
  showToast('Marked all notifications as read');
}

function handleNotifRaiseBid(itemId, notifId, event) {
  if (event) event.stopPropagation();
  markNotificationRead(notifId);
  closeNotificationDropdown();
  openBidModal(itemId);
}

function simulateOutbid(event) {
  if (event) event.stopPropagation();

  // Find an active order or default to auc-01
  const orders = loadOrders();
  let targetItem = null;
  let targetOrder = null;

  if (orders.length > 0) {
    targetOrder = orders.find(o => o.status === 'WINNING') || orders[0];
    targetItem = AUCTION_ITEMS.find(i => i.id === targetOrder.itemId);
  }

  if (!targetItem) {
    targetItem = AUCTION_ITEMS[0];
  }

  const outbidders = ['Collector_Viper', 'CyberTitan_99', 'ApexMotors_NY', 'KyotoVault_Trader', 'VintageHunter_SG'];
  const randomOutbidder = outbidders[Math.floor(Math.random() * outbidders.length)];
  const increment = targetItem.bidIncrement || 5000;
  const newBidAmount = targetItem.currentBid + increment;

  // Update auction item
  targetItem.currentBid = newBidAmount;
  targetItem.bidsCount = (targetItem.bidsCount || 0) + 1;
  if (!targetItem.bidHistory) targetItem.bidHistory = [];
  targetItem.bidHistory.unshift({
    user: randomOutbidder,
    amount: newBidAmount,
    time: 'Just now'
  });

  // Re-sort items by bid
  AUCTION_ITEMS.sort((a, b) => b.currentBid - a.currentBid);
  AUCTION_ITEMS.forEach((item, index) => { item.rank = index + 1; });
  saveAuctions();

  // Update order status to OUTBID
  if (targetOrder) {
    targetOrder.currentBid = newBidAmount;
    targetOrder.status = 'OUTBID';
    targetOrder.statusLabel = 'Outbid (Action Needed)';
    targetOrder.updatedAt = new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    const orderIdx = orders.findIndex(o => o.orderId === targetOrder.orderId);
    if (orderIdx >= 0) {
      orders[orderIdx] = targetOrder;
      saveOrders(orders);
    }
  }

  // Create outbid notification
  const newNotif = {
    id: 'notif-' + Date.now(),
    type: 'outbid',
    itemId: targetItem.id,
    orderId: targetOrder ? targetOrder.orderId : 'ORD-' + targetItem.id.toUpperCase(),
    title: "Outbid Alert: You've been outbid!",
    message: `${randomOutbidder} placed a higher bid of ${formatCurrency(newBidAmount)} on "${targetItem.title}"!`,
    itemTitle: targetItem.title,
    newBid: newBidAmount,
    bidder: randomOutbidder,
    time: 'Just now',
    read: false,
    createdAt: new Date().toISOString()
  };

  const notifications = loadNotifications();
  notifications.unshift(newNotif);
  saveNotifications(notifications);

  // Update UI everywhere
  updateNotificationBadge();
  renderNotificationsList();
  updateStatsRibbon();
  if (document.getElementById('auctionGrid')) {
    renderCards();
  }
  if (document.getElementById('orderDetailContainer') && currentSelectedOrder) {
    renderOrderDetail(currentSelectedOrder.orderId);
  }

  // Trigger high-priority outbid alert toast with action button
  showOutbidAlertToast(newNotif);
}

function showOutbidAlertToast(notif) {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast toast-outbid';
  toast.innerHTML = `
    <i class="fa-solid fa-triangle-exclamation toast-icon"></i>
    <div style="flex: 1;">
      <strong style="display:block; font-size:0.95rem; color:#fca5a5;">${notif.title}</strong>
      <span style="font-size:0.84rem; color:#cbd5e1; display:block; margin: 2px 0 6px;">${notif.message}</span>
      <div style="display:flex; gap:8px; align-items:center;">
        <button type="button" class="btn-toast-raise" onclick="openBidModal('${notif.itemId}')">
          <i class="fa-solid fa-gavel"></i> Raise Bid Now
        </button>
        <a href="ordersdetail.html?id=${encodeURIComponent(notif.itemId)}" style="font-size:0.78rem; color:#34d399; text-decoration:none; font-weight:600;">
          View Order &rarr;
        </a>
      </div>
    </div>
  `;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 6500);
}

function showHighestBidderLockToast(item) {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast toast-locked';
  toast.innerHTML = `
    <i class="fa-solid fa-lock toast-icon" style="color: #f59e0b; font-size: 1.3rem;"></i>
    <div style="flex: 1;">
      <strong style="display:block; font-size:0.95rem; color:#fbbf24;">You Hold the Highest Bid! (คุณเป็นผู้นำการประมูล)</strong>
      <span style="font-size:0.84rem; color:#cbd5e1; display:block; margin: 3px 0 6px;">
        ข้อเสนอราคาของคุณอยู่ที่ <strong>${formatCurrency(item.currentBid)}</strong> สูงที่สุดในขณะนี้ คุณไม่สามารถเสนอราคาแข่งกับตัวเองได้จนกว่าจะมีผู้ประมูลอื่นเสนอราคาสูงกว่า
      </span>
      <div style="display:flex; gap:8px; align-items:center;">
        <a href="ordersdetail.html?id=${encodeURIComponent(item.id)}" style="font-size:0.8rem; color:#34d399; text-decoration:none; font-weight:700; display:inline-flex; align-items:center; gap:4px;">
          <i class="fa-solid fa-receipt"></i> ดูสถานะคำสั่งซื้อ (View Order) &rarr;
        </a>
      </div>
    </div>
  `;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 5000);
}

function getCategoryLabel(category) {
  switch (category) {
    case 'cars': return 'Car Models';
    case 'cards': return 'Collectible Cards';
    case 'tech': return 'Tech & Computing';
    case 'trees': return 'Rare Trees & Flora';
    default: return 'Special Collectible';
  }
}

// State
let AUCTION_ITEMS = loadAuctions();
let currentCategory = 'all';
let searchQuery = '';
let selectedItemForBid = null;
let selectedItemForDetail = null;

// Helpers
function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(amount);
}

function getTimeRemaining(endDateStr) {
  const total = Date.parse(endDateStr) - Date.now();
  if (total <= 0) {
    return { total, days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
  }
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  return { total, days, hours, minutes, seconds, expired: false };
}

// Render Top 10 Cards
function renderCards() {
  const grid = document.getElementById('auctionGrid');
  const emptyState = document.getElementById('emptyState');
  const itemsCountEl = document.getElementById('itemsCount');
  
  if (!grid) return;

  // Filter items
  const filtered = AUCTION_ITEMS.filter(item => {
    const matchesCategory = currentCategory === 'all' || item.category === currentCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (itemsCountEl) {
    itemsCountEl.textContent = `Showing ${filtered.length} of ${AUCTION_ITEMS.length} featured items`;
  }

  if (filtered.length === 0) {
    grid.innerHTML = '';
    if (emptyState) emptyState.style.display = 'block';
    return;
  }

  if (emptyState) emptyState.style.display = 'none';

  grid.innerHTML = filtered.map(item => {
    const time = getTimeRemaining(item.endDate);
    const isInactive = item.isActive === false;
    const userOrder = getUserOrder(item.id);
    const timeDisplay = isInactive
      ? 'แบบร่าง (ยังไม่เปิด)'
      : (time.expired 
        ? 'Auction Closed' 
        : `${time.days}d ${time.hours}h ${time.minutes}m ${time.seconds}s left`);

    const rankClass = item.rank === 1 ? 'top-1' : item.rank === 2 ? 'top-2' : item.rank === 3 ? 'top-3' : '';
    const draftTag = isInactive
      ? `<span class="category-tag" style="background: rgba(239, 68, 68, 0.25); color: #fca5a5; border-color: rgba(239, 68, 68, 0.4);"><i class="fa-solid fa-pause"></i> Draft</span>`
      : '';

    let bidButtonHtml;
    if (isInactive) {
      bidButtonHtml = `<button class="btn btn-bid" style="opacity: 0.6; cursor: not-allowed;" disabled title="สถานะแบบร่าง ยังไม่เปิดประมูล"><i class="fa-solid fa-lock"></i> ยังไม่เปิดประมูล</button>`;
    } else if (userOrder) {
      const isWon = userOrder.status === 'WON';
      const isHighest = isUserHighestBidder(item.id);
      if (isWon) {
        bidButtonHtml = `
          <div class="bid-active-group">
            <button class="btn btn-bid-active btn-won" onclick="navigateToOrderChat('${item.id}')" title="คุณชนะการประมูลรายการนี้แล้ว! คลิกเพื่อเปิดห้องแชต P2P กับผู้ขาย">
              <i class="fa-solid fa-trophy"></i>
              <span class="bid-active-text">Won: ${formatCurrency(userOrder.userBid)} <small>(P2P Chat)</small></span>
            </button>
            <button class="btn btn-raise-bid btn-p2p-open" onclick="navigateToOrderChat('${item.id}')" title="เปิดห้องสนทนากับผู้ขาย [@${userOrder.seller ? userOrder.seller.nickname : 'Seller'}]">
              <i class="fa-solid fa-comments"></i>
            </button>
          </div>
        `;
      } else if (isHighest) {
        bidButtonHtml = `
          <div class="bid-active-group">
            <button class="btn btn-bid-active btn-winning" onclick="navigateToOrder('${item.id}')" title="คุณเป็นผู้ให้ราคาสูงสุด (${formatCurrency(userOrder.userBid)}) - คลิกดูคำสั่งซื้อ">
              <i class="fa-solid fa-crown"></i>
              <span class="bid-active-text">Winning: ${formatCurrency(userOrder.userBid)} <small>(Highest Bidder)</small></span>
            </button>
            <button class="btn btn-raise-bid btn-bid-locked" disabled title="คุณเป็นผู้ให้ราคาสูงสุดแล้ว (${formatCurrency(item.currentBid)}) - ไม่สามารถเปิดเสนอราคาซ้ำจนกว่าจะมีผู้ประมูลอื่นเสนอราคาแข่ง">
              <i class="fa-solid fa-lock"></i>
            </button>
          </div>
        `;
      } else {
        bidButtonHtml = `
          <div class="bid-active-group">
            <button class="btn btn-bid-active btn-outbid" onclick="navigateToOrder('${item.id}')" title="คุณถูกเสนอราคาแซงแล้ว! คลิกดูหน้ารายละเอียดคำสั่งซื้อ">
              <i class="fa-solid fa-triangle-exclamation"></i>
              <span class="bid-active-text">Outbid: ${formatCurrency(userOrder.userBid)} <small>(Raise Now)</small></span>
            </button>
            <button class="btn btn-raise-bid btn-outbid-unlocked" onclick="openBidModal('${item.id}')" title="ปลดล็อกแล้ว! เสนอราคาเพิ่มเพื่อชิงตำแหน่งผู้นำ">
              <i class="fa-solid fa-arrow-trend-up"></i>
            </button>
          </div>
        `;
      }
    } else {
      bidButtonHtml = `<button class="btn btn-bid" onclick="openBidModal('${item.id}')"><i class="fa-solid fa-gavel"></i> Open Auction Bid</button>`;
    }

    return `
      <article class="auction-card" id="card-${item.id}">
        <!-- Media / Visual -->
        <div class="card-media">
          <img src="${item.image}" alt="${item.title}" class="card-img" loading="lazy" />
          
          <div class="card-overlay-top">
            <span class="rank-badge ${rankClass}">
              <i class="fa-solid fa-trophy"></i> #${item.rank} Highest Bid
            </span>
            <div style="display:flex; gap:6px; align-items:center;">
              ${draftTag}
              <span class="category-tag">${item.categoryLabel}</span>
            </div>
          </div>

          <div class="countdown-badge" data-end="${item.endDate}">
            <i class="fa-regular fa-clock"></i>
            <span class="timer-text">${timeDisplay}</span>
          </div>
        </div>

        <!-- Card Body Content -->
        <div class="card-content">
          <h2 class="card-title" title="${item.title}">${item.title}</h2>
          <p class="card-description">${item.description}</p>

          <!-- Price Information Box -->
          <div class="price-container">
            <div class="price-col price-col-start">
              <span class="price-label">
                <i class="fa-solid fa-flag"></i> Start Price
              </span>
              <span class="start-price">${formatCurrency(item.startPrice)}</span>
            </div>
            <div class="price-col price-col-current">
              <span class="price-label">
                <i class="fa-solid fa-gavel"></i> Current Bid (${item.bidsCount} bids)
              </span>
              <span class="current-bid">${formatCurrency(item.currentBid)}</span>
            </div>
          </div>

          <!-- Auction Start & End Dates -->
          <div class="auction-dates">
            <div class="date-row date-row-start">
              <span class="label"><i class="fa-regular fa-calendar-check"></i> Start Date</span>
              <span class="value">${item.startDate}</span>
            </div>
            <div class="date-row date-row-end">
              <span class="label"><i class="fa-regular fa-calendar-xmark"></i> End Date</span>
              <span class="value">${new Date(item.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="card-actions">
            ${bidButtonHtml}
            <button class="btn btn-view" onclick="openDetailModal('${item.id}')" title="View Details">
              <i class="fa-regular fa-eye"></i> View
            </button>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

// Live Countdown Updater (Ticks Every 1 Second)
function updateCountdowns() {
  const badges = document.querySelectorAll('.countdown-badge');
  badges.forEach(badge => {
    const endStr = badge.getAttribute('data-end');
    if (!endStr) return;
    const time = getTimeRemaining(endStr);
    const textEl = badge.querySelector('.timer-text');
    if (textEl) {
      if (time.expired) {
        textEl.textContent = 'Auction Closed';
        badge.style.color = '#ef4444';
      } else {
        textEl.textContent = `${time.days}d ${time.hours}h ${time.minutes}m ${time.seconds}s left`;
      }
    }
  });

  // Also update order detail countdown timer if present
  const orderTimerText = document.querySelector('.timer-countdown-text');
  if (orderTimerText && currentSelectedOrder && currentSelectedOrder.endDate) {
    const time = getTimeRemaining(currentSelectedOrder.endDate);
    if (time.expired) {
      orderTimerText.textContent = 'Auction Closed';
      orderTimerText.style.color = '#ef4444';
    } else {
      orderTimerText.textContent = `${time.days}d ${time.hours}h ${time.minutes}m ${time.seconds}s left`;
    }
  }
}

// Filter Categories
function setupCategoryFilters() {
  const buttons = document.querySelectorAll('.category-btn');
  const activeHint = document.getElementById('activeCategoryHint');
  const searchInput = document.getElementById('itemSearch');
  const clearBtn = document.getElementById('clearSearchBtn');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      currentCategory = btn.getAttribute('data-category');
      
      if (activeHint) {
        const labelText = btn.textContent.trim().replace(/[0-9]+$/, '').trim();
        activeHint.textContent = currentCategory === 'all' ? 'All Auctions' : labelText;
      }

      renderCards();
    });
  });

  // Search input & clear button
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim();
      if (clearBtn) {
        clearBtn.style.display = searchQuery.length > 0 ? 'flex' : 'none';
      }
      renderCards();
    });

    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        searchInput.value = '';
        searchQuery = '';
        clearBtn.style.display = 'none';
        searchInput.focus();
        renderCards();
      });
    }
  }

  // Update counts in filter badges
  updateCategoryCounts();
}

function updateCategoryCounts() {
  const countAll = AUCTION_ITEMS.length;
  const countCars = AUCTION_ITEMS.filter(i => i.category === 'cars').length;
  const countCards = AUCTION_ITEMS.filter(i => i.category === 'cards').length;
  const countTech = AUCTION_ITEMS.filter(i => i.category === 'tech').length;
  const countTrees = AUCTION_ITEMS.filter(i => i.category === 'trees').length;

  const badgeAll = document.getElementById('count-all');
  const badgeCars = document.getElementById('count-cars');
  const badgeCards = document.getElementById('count-cards');
  const badgeTech = document.getElementById('count-tech');
  const badgeTrees = document.getElementById('count-trees');

  if (badgeAll) badgeAll.textContent = countAll;
  if (badgeCars) badgeCars.textContent = countCars;
  if (badgeCards) badgeCards.textContent = countCards;
  if (badgeTech) badgeTech.textContent = countTech;
  if (badgeTrees) badgeTrees.textContent = countTrees;
}

// Bidding Modal Logic
function openBidModal(itemId) {
  const item = AUCTION_ITEMS.find(i => i.id === itemId);
  if (!item) return;

  if (item.isActive === false) {
    alert('สินค้านี้อยู่ในสถานะแบบร่าง (Draft) ยังไม่เปิดให้เริ่มเสนอราคา');
    return;
  }

  // Guard: If user currently holds highest bid, bidding is locked against self-outbidding
  if (isUserHighestBidder(itemId)) {
    showHighestBidderLockToast(item);
    return;
  }

  selectedItemForBid = item;
  const modal = document.getElementById('bidModal');
  const previewImg = document.getElementById('modalPreviewImg');
  const previewTitle = document.getElementById('modalPreviewTitle');
  const previewCategory = document.getElementById('modalPreviewCategory');
  const currentBidEl = document.getElementById('modalCurrentBid');
  const minNextBidEl = document.getElementById('modalMinNextBid');
  const bidInput = document.getElementById('bidAmountInput');
  const historyList = document.getElementById('modalBidHistory');
  const lockNotice = document.getElementById('modalBidLockNotice');
  const submitBtn = document.getElementById('modalSubmitBidBtn');

  if (lockNotice) lockNotice.style.display = 'none';
  if (submitBtn) {
    submitBtn.disabled = false;
    submitBtn.className = 'btn btn-bid';
    submitBtn.innerHTML = '<i class="fa-solid fa-check"></i> Confirm & Submit Bid';
  }

  if (previewImg) previewImg.src = item.image;
  if (previewTitle) previewTitle.textContent = item.title;
  if (previewCategory) previewCategory.textContent = item.categoryLabel;
  if (currentBidEl) currentBidEl.textContent = formatCurrency(item.currentBid);

  const step = item.bidIncrement || 1000;
  const minNext = item.currentBid + step;
  if (minNextBidEl) minNextBidEl.textContent = formatCurrency(minNext);
  if (bidInput) {
    bidInput.value = minNext;
    bidInput.min = minNext;
    bidInput.step = step;
  }

  // Populate history
  if (historyList) {
    historyList.innerHTML = (item.bidHistory || []).map(b => `
      <li class="bid-history-item">
        <span class="bidder-name"><i class="fa-solid fa-user-circle"></i> ${b.user}</span>
        <span class="bidder-amount">${formatCurrency(b.amount)} <small style="color:#64748b; font-weight: normal; margin-left: 8px;">${b.time}</small></span>
      </li>
    `).join('');
  }

  if (modal) modal.classList.add('open');
}

function closeBidModal() {
  const modal = document.getElementById('bidModal');
  if (modal) modal.classList.remove('open');
  selectedItemForBid = null;
}

function setQuickIncrement(increment) {
  const bidInput = document.getElementById('bidAmountInput');
  if (!bidInput || !selectedItemForBid) return;
  const currentVal = parseInt(bidInput.value, 10) || selectedItemForBid.currentBid;
  bidInput.value = currentVal + increment;
}

function submitBid() {
  if (!selectedItemForBid) return;

  // Guard against self-bidding when user holds highest bid
  if (isUserHighestBidder(selectedItemForBid.id)) {
    showHighestBidderLockToast(selectedItemForBid);
    return;
  }

  const bidInput = document.getElementById('bidAmountInput');
  const newAmount = parseInt(bidInput.value, 10);

  if (isNaN(newAmount) || newAmount <= selectedItemForBid.currentBid) {
    alert(`Your bid must be higher than current bid of ${formatCurrency(selectedItemForBid.currentBid)}!`);
    return;
  }

  // Update item
  selectedItemForBid.currentBid = newAmount;
  selectedItemForBid.bidsCount = (selectedItemForBid.bidsCount || 0) + 1;
  if (!selectedItemForBid.bidHistory) selectedItemForBid.bidHistory = [];
  selectedItemForBid.bidHistory.unshift({
    user: 'Alexander Sterling (You)',
    amount: newAmount,
    time: 'Just now'
  });

  // Re-sort Top items by currentBid descending and update ranks
  AUCTION_ITEMS.sort((a, b) => b.currentBid - a.currentBid);
  AUCTION_ITEMS.forEach((item, index) => {
    item.rank = index + 1;
  });

  saveAuctions();

  // Create or Update Order in localStorage startass_orders
  const orders = loadOrders();
  const existingIndex = orders.findIndex(o => o.itemId === selectedItemForBid.id);
  const nowFormatted = new Date().toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
  const orderId = existingIndex >= 0 ? orders[existingIndex].orderId : 'ORD-' + selectedItemForBid.id.toUpperCase();

  const orderData = {
    orderId: orderId,
    itemId: selectedItemForBid.id,
    title: selectedItemForBid.title,
    category: selectedItemForBid.category,
    categoryLabel: selectedItemForBid.categoryLabel,
    image: selectedItemForBid.image,
    images: (selectedItemForBid.images && selectedItemForBid.images.length > 0) ? selectedItemForBid.images : [selectedItemForBid.image],
    userBid: newAmount,
    currentBid: newAmount,
    startPrice: selectedItemForBid.startPrice,
    bidIncrement: selectedItemForBid.bidIncrement || 1000,
    status: 'WINNING',
    statusLabel: 'Active Winning (Highest Bidder)',
    placedAt: existingIndex >= 0 ? orders[existingIndex].placedAt : nowFormatted,
    updatedAt: nowFormatted,
    seller: selectedItemForBid.seller || {
      nickname: 'ApexMotors_NY',
      name: 'Apex Classic Motoring LLC',
      rating: '4.9 ★ (128 reviews)',
      verified: true,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80'
    },
    specs: selectedItemForBid.specs || [],
    description: selectedItemForBid.description,
    endDate: selectedItemForBid.endDate
  };

  if (existingIndex >= 0) {
    orders[existingIndex] = orderData;
  } else {
    orders.unshift(orderData);
  }
  saveOrders(orders);

  updateStatsRibbon();
  updateNavOrdersCount();
  closeBidModal();
  renderCards();

  // If on ordersdetail.html, refresh view immediately
  if (document.getElementById('orderDetailContainer')) {
    renderOrderDetail(orderId);
  }

  showToast(`Bid Placed: ${formatCurrency(newAmount)} on ${selectedItemForBid.title}! Order #${orderId} updated.`);
}

// Product Detail Modal Logic
function openDetailModal(itemId) {
  const item = AUCTION_ITEMS.find(i => i.id === itemId);
  if (!item) return;

  selectedItemForDetail = item;
  const modal = document.getElementById('detailModal');
  const img = document.getElementById('detailImg');
  const title = document.getElementById('detailTitle');
  const category = document.getElementById('detailCategory');
  const desc = document.getElementById('detailDesc');
  const startPrice = document.getElementById('detailStartPrice');
  const currentBid = document.getElementById('detailCurrentBid');
  const startDate = document.getElementById('detailStartDate');
  const endDate = document.getElementById('detailEndDate');
  const specsList = document.getElementById('detailSpecs');

  if (img) img.src = item.image;
  if (title) title.textContent = item.title;
  if (category) category.textContent = item.categoryLabel;
  if (desc) desc.textContent = item.description;
  if (startPrice) startPrice.textContent = formatCurrency(item.startPrice);
  if (currentBid) currentBid.textContent = formatCurrency(item.currentBid);
  if (startDate) startDate.textContent = item.startDate;
  if (endDate) endDate.textContent = new Date(item.endDate).toLocaleString();

  // Multi-image gallery for detail view
  const detailThumbs = document.getElementById('detailThumbnailsStrip');
  const allImages = (item.images && item.images.length > 0) ? item.images : (item.image ? [item.image] : []);
  if (detailThumbs) {
    if (allImages.length > 1) {
      detailThumbs.style.display = 'flex';
      detailThumbs.innerHTML = allImages.map((u, i) => `
        <div class="thumb-item ${u === item.image ? 'active' : ''}" onclick="switchDetailImage('${u}', this)" title="ดูรูปที่ ${i + 1}">
          <img src="${u}" alt="Thumbnail ${i + 1}">
        </div>
      `).join('');
    } else {
      detailThumbs.style.display = 'none';
      detailThumbs.innerHTML = '';
    }
  }

  if (specsList) {
    specsList.innerHTML = (item.specs || []).map(spec => `
      <li class="detail-spec-item">
        <i class="fa-solid fa-check spec-icon"></i>
        <span>${spec}</span>
      </li>
    `).join('');
  }

  // Update Detail Modal CTA button according to bid lock & won state
  const detailBidBtn = document.getElementById('detailModalBidBtn');
  const orderForDetail = getUserOrder(item.id);
  if (detailBidBtn) {
    if (orderForDetail && orderForDetail.status === 'WON') {
      detailBidBtn.disabled = false;
      detailBidBtn.className = 'btn btn-bid btn-won-cta';
      detailBidBtn.title = 'คุณชนะการประมูลรายการนี้! คลิกเพื่อเปิดห้องแชต P2P กับผู้ขาย';
      detailBidBtn.innerHTML = '<i class="fa-solid fa-comments"></i> Open P2P Chat with Seller';
      detailBidBtn.onclick = () => {
        closeDetailModal();
        navigateToOrderChat(item.id);
      };
    } else if (item.isActive === false) {
      detailBidBtn.disabled = true;
      detailBidBtn.className = 'btn btn-bid btn-bid-locked';
      detailBidBtn.title = 'สินค้านี้อยู่ในสถานะแบบร่าง (Draft) ยังไม่เปิดให้เริ่มเสนอราคา';
      detailBidBtn.innerHTML = '<i class="fa-solid fa-lock"></i> แบบร่าง (ยังไม่เปิด)';
      detailBidBtn.onclick = switchFromDetailToBid;
    } else if (isUserHighestBidder(item.id)) {
      detailBidBtn.disabled = true;
      detailBidBtn.className = 'btn btn-bid btn-bid-locked';
      detailBidBtn.title = `คุณเป็นผู้ให้ราคาสูงสุดแล้ว (${formatCurrency(item.currentBid)}) - ไม่สามารถเปิดบิดซ้ำจนกว่าจะมีผู้ประมูลอื่นเสนอราคา`;
      detailBidBtn.innerHTML = '<i class="fa-solid fa-lock"></i> You Hold Highest Bid';
      detailBidBtn.onclick = switchFromDetailToBid;
    } else {
      detailBidBtn.disabled = false;
      detailBidBtn.className = 'btn btn-bid';
      detailBidBtn.title = 'เสนอราคาประมูลสินค้าชิ้นนี้';
      detailBidBtn.innerHTML = '<i class="fa-solid fa-gavel"></i> Place Bid Now';
      detailBidBtn.onclick = switchFromDetailToBid;
    }
  }

  if (modal) modal.classList.add('open');
}

function switchDetailImage(url, thumbEl) {
  const img = document.getElementById('detailImg');
  if (img) img.src = url;
  if (thumbEl && thumbEl.parentElement) {
    thumbEl.parentElement.querySelectorAll('.thumb-item').forEach(t => t.classList.remove('active'));
    thumbEl.classList.add('active');
  }
}

function closeDetailModal() {
  const modal = document.getElementById('detailModal');
  if (modal) modal.classList.remove('open');
  selectedItemForDetail = null;
}

function switchFromDetailToBid() {
  if (selectedItemForDetail) {
    if (selectedItemForDetail.isActive === false) {
      alert('สินค้านี้อยู่ในสถานะแบบร่าง (Draft) ยังไม่เปิดให้เริ่มเสนอราคา');
      return;
    }
    if (isUserHighestBidder(selectedItemForDetail.id)) {
      showHighestBidderLockToast(selectedItemForDetail);
      return;
    }
    const id = selectedItemForDetail.id;
    closeDetailModal();
    openBidModal(id);
  }
}

// ==========================================================================
// CREATE AUCTION MODAL & LISTING ENGINE
// ==========================================================================
// ==========================================================================
// CREATE AUCTION MODAL & LISTING ENGINE (MULTI-IMAGE BROWSE & PREVIEW)
// ==========================================================================
let uploadedImagesList = [];
let activePreviewIndex = 0;

function openCreateModal() {
  const modal = document.getElementById('createModal');
  if (!modal) return;

  // Set default start date to now (local timezone)
  const now = new Date();
  const offset = now.getTimezoneOffset() * 60000;
  const localStart = new Date(now.getTime() - offset).toISOString().slice(0, 16);
  const startInput = document.getElementById('newStartDate');
  if (startInput) startInput.value = localStart;

  // Set default end date to 3 days from now
  const later = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000 - offset);
  const localEnd = later.toISOString().slice(0, 16);
  const endInput = document.getElementById('newEndDate');
  if (endInput) endInput.value = localEnd;

  clearSelectedImage();
  modal.classList.add('open');
}

function closeCreateModal() {
  const modal = document.getElementById('createModal');
  if (modal) modal.classList.remove('open');
  clearSelectedImage();
}

async function handleImageFileSelect(event) {
  const rawFiles = event.target.files;
  if (!rawFiles || rawFiles.length === 0) return;

  const validFiles = Array.from(rawFiles).filter(file => {
    if (!file.type.startsWith('image/')) {
      alert(`ไฟล์ "${file.name}" ไม่ใช่รูปภาพที่รองรับ`);
      return false;
    }
    if (file.size > 10 * 1024 * 1024) {
      alert(`ไฟล์ "${file.name}" มีขนาดเกิน 10MB`);
      return false;
    }
    return true;
  });

  if (validFiles.length === 0) {
    if (event.target) event.target.value = '';
    return;
  }

  const readPromises = validFiles.map(file => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(file);
    });
  });

  const results = await Promise.all(readPromises);
  const newImages = results.filter(Boolean);

  if (newImages.length > 0) {
    const prevCount = uploadedImagesList.length;
    uploadedImagesList = uploadedImagesList.concat(newImages);
    activePreviewIndex = prevCount; // focus on the first newly added image
    renderImagePreviews();
  }

  if (event.target) event.target.value = '';
}

function renderImagePreviews() {
  const previewImg = document.getElementById('createPreviewImg');
  const placeholder = document.getElementById('createPlaceholder');
  const previewBadge = document.getElementById('previewBadge');
  const previewCounter = document.getElementById('previewCounter');
  const removeBtn = document.getElementById('btnRemoveImage');
  const thumbnailsStrip = document.getElementById('createThumbnailsStrip');

  if (uploadedImagesList.length === 0) {
    if (previewImg) {
      previewImg.src = '';
      previewImg.style.display = 'none';
    }
    if (placeholder) placeholder.style.display = 'flex';
    if (previewBadge) previewBadge.style.display = 'none';
    if (removeBtn) removeBtn.style.display = 'none';
    if (thumbnailsStrip) {
      thumbnailsStrip.style.display = 'none';
      thumbnailsStrip.innerHTML = '';
    }
    activePreviewIndex = 0;
    return;
  }

  // Bound active index
  if (activePreviewIndex >= uploadedImagesList.length) {
    activePreviewIndex = Math.max(0, uploadedImagesList.length - 1);
  }

  if (previewImg) {
    previewImg.src = uploadedImagesList[activePreviewIndex];
    previewImg.style.display = 'block';
  }
  if (placeholder) placeholder.style.display = 'none';
  if (previewBadge) previewBadge.style.display = 'flex';
  if (previewCounter) {
    previewCounter.textContent = `รูปที่ ${activePreviewIndex + 1} จาก ${uploadedImagesList.length} รูป`;
  }
  if (removeBtn) removeBtn.style.display = 'flex';

  if (thumbnailsStrip) {
    thumbnailsStrip.style.display = 'flex';
    thumbnailsStrip.innerHTML = uploadedImagesList.map((url, idx) => `
      <div class="thumb-item ${idx === activePreviewIndex ? 'active' : ''}" onclick="selectPreviewImage(${idx})" title="คลิกเพื่อดูรูปที่ ${idx + 1}">
        <img src="${url}" alt="Thumbnail ${idx + 1}">
        <button type="button" class="btn-thumb-remove" onclick="removeImageAtIndex(event, ${idx})" title="ลบรูปนี้">&times;</button>
      </div>
    `).join('');
  }
}

function selectPreviewImage(index) {
  if (index >= 0 && index < uploadedImagesList.length) {
    activePreviewIndex = index;
    renderImagePreviews();
  }
}

function removeImageAtIndex(event, index) {
  if (event) event.stopPropagation();
  if (index >= 0 && index < uploadedImagesList.length) {
    uploadedImagesList.splice(index, 1);
    if (activePreviewIndex >= uploadedImagesList.length) {
      activePreviewIndex = Math.max(0, uploadedImagesList.length - 1);
    }
    renderImagePreviews();
  }
}

function removeActiveImage(event) {
  if (event) event.stopPropagation();
  removeImageAtIndex(null, activePreviewIndex);
}

function clearSelectedImage(event) {
  if (event) event.stopPropagation();
  uploadedImagesList = [];
  activePreviewIndex = 0;
  const fileInput = document.getElementById('newProductImageFile');
  if (fileInput) fileInput.value = '';
  renderImagePreviews();
}

function setupImageDropZone() {
  const dropZone = document.getElementById('imageDropZone');
  if (!dropZone) return;

  ['dragenter', 'dragover'].forEach(eventName => {
    dropZone.addEventListener(eventName, (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropZone.classList.add('dragover');
    }, false);
  });

  ['dragleave', 'drop'].forEach(eventName => {
    dropZone.addEventListener(eventName, (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropZone.classList.remove('dragover');
    }, false);
  });

  dropZone.addEventListener('drop', (e) => {
    const dt = e.dataTransfer;
    const files = dt && dt.files;
    if (files && files.length > 0) {
      handleImageFileSelect({ target: { files: files, value: '' } });
    }
  }, false);
}

function toggleStatusLabel(isChecked) {
  const label = document.getElementById('statusToggleLabel');
  if (!label) return;
  if (isChecked) {
    label.className = 'status-label active-status';
    label.innerHTML = '<i class="fa-solid fa-circle-check"></i> Active (เปิดประมูลทันที)';
  } else {
    label.className = 'status-label draft-status';
    label.innerHTML = '<i class="fa-solid fa-pause"></i> Draft (แบบร่าง / ยังไม่เปิด)';
  }
}

function handleCreateAuction(event) {
  event.preventDefault();

  const nameInput = document.getElementById('newProductName');
  const catInput = document.getElementById('newProductCategory');
  const priceInput = document.getElementById('newStartPrice');
  const incrementInput = document.getElementById('newBidIncrement');
  const activeInput = document.getElementById('newIsActive');
  const startInput = document.getElementById('newStartDate');
  const endInput = document.getElementById('newEndDate');
  const descInput = document.getElementById('newProductDesc');

  const title = nameInput ? nameInput.value.trim() : '';
  const category = catInput ? catInput.value : 'cars';
  const categoryLabel = getCategoryLabel(category);
  
  const primaryImage = uploadedImagesList.length > 0 
    ? uploadedImagesList[0] 
    : 'https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&fit=crop&w=1200&q=80';
  const allImages = uploadedImagesList.length > 0 ? [...uploadedImagesList] : [primaryImage];

  const startPrice = parseFloat(priceInput ? priceInput.value : 0) || 0;
  const bidIncrement = parseInt(incrementInput ? incrementInput.value : 1000, 10) || 1000;
  const isActive = activeInput ? activeInput.checked : true;
  const startDateVal = startInput && startInput.value ? startInput.value : new Date().toISOString();
  const endDateVal = endInput && endInput.value ? endInput.value : new Date(Date.now() + 3 * 24 * 3600 * 1000).toISOString();
  const desc = descInput ? descInput.value.trim() : '';
  const specs = ['ของแท้ 100% พร้อมการรับรอง', 'สภาพสมบูรณ์ตรงตามภาพ'];

  if (new Date(endDateVal) <= new Date(startDateVal)) {
    alert('วันเวลาสิ้นสุดการประมูล (End Date) ต้องอยู่หลังจากวันเวลาเริ่มต้น (Start Date)!');
    return;
  }

  if (startPrice <= 0) {
    alert('ราคาเริ่มต้นการประมูลต้องมากกว่า $0!');
    return;
  }

  const newItem = {
    id: 'auc-' + Date.now(),
    rank: 0,
    title: title,
    category: category,
    categoryLabel: categoryLabel,
    image: primaryImage,
    images: allImages,
    description: desc,
    startPrice: startPrice,
    currentBid: startPrice,
    bidIncrement: bidIncrement,
    isActive: isActive,
    startDate: new Date(startDateVal).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
    endDate: new Date(endDateVal).toISOString(),
    bidsCount: 0,
    specs: specs,
    seller: {
      nickname: (currentUser && currentUser.isLoggedIn) ? 'Alexander_Sterling' : 'Collector_Seller',
      name: (currentUser && currentUser.isLoggedIn) ? currentUser.fullName : 'Verified Collector',
      rating: '5.0 ★',
      reviewsCount: 1,
      verified: true,
      avatar: (currentUser && currentUser.isLoggedIn) ? currentUser.avatar : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80'
    },
    bidHistory: [
      { user: 'ระบบ (ราคาตั้งต้น)', amount: startPrice, time: 'เพิ่งเปิดประมูล' }
    ]
  };

  // Prepend and sort by highest current bid
  AUCTION_ITEMS.unshift(newItem);
  AUCTION_ITEMS.sort((a, b) => b.currentBid - a.currentBid);
  AUCTION_ITEMS.forEach((item, index) => {
    item.rank = index + 1;
  });

  saveAuctions();
  updateCategoryCounts();
  updateStatsRibbon();
  renderCards();

  closeCreateModal();
  document.getElementById('createAuctionForm').reset();
  clearSelectedImage();

  showToast(`สร้างโพสต์ประมูล "${title}" (รูปภาพ ${allImages.length} รูป) สำเร็จเรียบร้อย!`);
}

// Update Key Stats in Header Ribbon
function updateStatsRibbon() {
  const statHighestBid = document.getElementById('statHighestBid');
  const statTotalItems = document.getElementById('statTotalItems');
  const statTotalBids = document.getElementById('statTotalBids');

  if (AUCTION_ITEMS.length > 0) {
    const highestBid = Math.max(...AUCTION_ITEMS.map(i => i.currentBid));
    if (statHighestBid) statHighestBid.textContent = formatCurrency(highestBid);
    if (statTotalItems) statTotalItems.textContent = `${AUCTION_ITEMS.length} Items`;
    const totalBids = AUCTION_ITEMS.reduce((sum, i) => sum + (i.bidsCount || 0), 0);
    if (statTotalBids) statTotalBids.textContent = `${totalBids} Total Bids`;
  }
}

// Toast notification
function showToast(message) {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <i class="fa-solid fa-circle-check toast-icon"></i>
    <div>
      <strong style="display:block; font-size:0.95rem;">Success!</strong>
      <span style="font-size:0.85rem; color:#cbd5e1;">${message}</span>
    </div>
  `;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// ==========================================================================
// USER PROFILE & DROPDOWN ENGINE
// ==========================================================================
let currentUser = {
  fullName: 'Alexander Sterling',
  role: 'Verified Collector',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
  isLoggedIn: true
};

function toggleProfileDropdown(event) {
  if (event) event.stopPropagation();

  if (!currentUser.isLoggedIn) {
    // Log back in
    currentUser.isLoggedIn = true;
    updateProfileUI();
    showToast('เข้าสู่ระบบสำเร็จ! ยินดีต้อนรับกลับมา ' + currentUser.fullName);
    return;
  }

  const menu = document.getElementById('profileDropdownMenu');
  const btn = document.getElementById('profileBtn');
  if (menu && btn) {
    const isOpen = menu.classList.toggle('open');
    btn.classList.toggle('active', isOpen);
    btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  }
}

function closeProfileDropdown() {
  const menu = document.getElementById('profileDropdownMenu');
  const btn = document.getElementById('profileBtn');
  if (menu) menu.classList.remove('open');
  if (btn) {
    btn.classList.remove('active');
    btn.setAttribute('aria-expanded', 'false');
  }
}

function handleLogout() {
  closeProfileDropdown();
  currentUser.isLoggedIn = false;
  updateProfileUI();
  showToast('ออกจากระบบ (Logout) เรียบร้อยแล้ว');
}

function updateProfileUI() {
  const fullNameEl = document.getElementById('userFullName');
  const navAvatar = document.getElementById('navProfileAvatar');
  const menuAvatar = document.getElementById('menuProfileAvatar');
  const profileBtn = document.getElementById('profileBtn');

  if (currentUser.isLoggedIn) {
    if (fullNameEl) fullNameEl.textContent = currentUser.fullName;
    if (navAvatar) navAvatar.src = currentUser.avatar;
    if (menuAvatar) menuAvatar.src = currentUser.avatar;
    if (profileBtn) profileBtn.title = `ดูโปรไฟล์ (${currentUser.fullName})`;
  } else {
    if (fullNameEl) fullNameEl.textContent = 'Guest (ผู้เยี่ยมชม)';
    if (navAvatar) navAvatar.src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80';
    if (menuAvatar) menuAvatar.src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80';
    if (profileBtn) profileBtn.title = 'คลิกเพื่อเข้าสู่ระบบ (Sign In)';
  }
}

// ==========================================================================
// ORDERS DETAIL PAGE ENGINE (ordersdetail.html)
// ==========================================================================
let currentSelectedOrder = null;
let activeOrderTab = 'current';

function getStatusClass(status) {
  switch ((status || '').toUpperCase()) {
    case 'WINNING': return 'status-winning';
    case 'OUTBID': return 'status-outbid';
    case 'WON': return 'status-won';
    default: return 'status-ended';
  }
}

function getStatusLabel(status) {
  switch ((status || '').toUpperCase()) {
    case 'WINNING': return 'Active Winning (Highest Bidder)';
    case 'OUTBID': return 'Outbid (Action Needed)';
    case 'WON': return 'Auction Won (Pending Checkout)';
    default: return 'Auction Closed';
  }
}

function getCategoryIcon(category) {
  switch (category) {
    case 'cars': return 'fa-solid fa-car-side';
    case 'cards': return 'fa-solid fa-id-card-clip';
    case 'tech': return 'fa-solid fa-microchip';
    case 'trees': return 'fa-solid fa-seedling';
    default: return 'fa-solid fa-gem';
  }
}

// ==========================================================================
// P2P SELLER CHAT ENGINE (WON AUCTION RIGHTS & CONVERSATIONS)
// ==========================================================================
let selectedP2PChatOrderId = null;

const DEFAULT_P2P_CHATS = {
  'ORD-AUC-02': {
    orderId: 'ORD-AUC-02',
    itemId: 'auc-02',
    title: '1st Edition Shadowless Charizard #4/102 (PSA 10 Gem Mint)',
    category: 'cards',
    categoryLabel: 'Collectible Cards',
    image: 'https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?auto=format&fit=crop&w=1200&q=80',
    winningBid: 360000,
    latestBid: 360000,
    status: 'WON',
    seller: {
      nickname: 'KyotoVault_Cards',
      name: 'Kyoto Rare Collectibles Japan',
      rating: '5.0 ★ (94 reviews)',
      verified: true,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
      onlineStatus: 'Active now'
    },
    unreadCount: 1,
    lastMessageSnippet: 'We are preparing the UV-acrylic display case and botanical export clearance. Could you please verify...',
    lastMessageDate: 'Sep 8, 2026',
    lastMessageTime: '02:20 PM',
    lastMessageFull: 'Sep 8, 2026 • 02:20 PM',
    lastMessageIsRead: false,
    messages: [
      {
        id: 'msg-sys-1',
        sender: 'system',
        isOwner: false,
        text: '🏆 Congratulations Alexander! You won this auction. Direct P2P communication with [@KyotoVault_Cards] is now unlocked under STARTASS Escrow Vault protection.',
        date: 'Sep 8, 2026',
        time: '02:15 PM',
        fullTimestamp: 'Sep 8, 2026, 02:15 PM',
        isRead: true
      },
      {
        id: 'msg-s-1',
        sender: 'seller',
        isOwner: true,
        senderName: '[ @KyotoVault_Cards ]',
        senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
        product: {
          id: 'auc-02',
          orderId: 'ORD-AUC-02',
          title: '1st Edition Shadowless Charizard #4/102 (PSA 10 Gem Mint)',
          image: 'https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?auto=format&fit=crop&w=1200&q=80',
          category: 'cards',
          categoryLabel: 'Collectible Cards',
          latestBid: 360000,
          bidStatus: 'Winning Bid (ผู้ชนะการประมูล)'
        },
        text: 'Konnichiwa Alexander! Congratulations on winning the Shadowless Charizard PSA 10 Gem Mint. The card is currently safely stored in our museum-grade climate vault in Kyoto.',
        date: 'Sep 8, 2026',
        time: '02:18 PM',
        fullTimestamp: 'Sep 8, 2026, 02:18 PM',
        isRead: true
      },
      {
        id: 'msg-s-2',
        sender: 'seller',
        isOwner: true,
        senderName: '[ @KyotoVault_Cards ]',
        senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
        product: {
          id: 'auc-02',
          orderId: 'ORD-AUC-02',
          title: '1st Edition Shadowless Charizard #4/102 (PSA 10 Gem Mint)',
          image: 'https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?auto=format&fit=crop&w=1200&q=80',
          category: 'cards',
          categoryLabel: 'Collectible Cards',
          latestBid: 360000,
          bidStatus: 'Winning Bid (ผู้ชนะการประมูล)'
        },
        text: 'We are preparing the UV-acrylic display case and botanical export clearance. Could you please verify your preferred delivery address and DHL Express Insured destination?',
        date: 'Sep 8, 2026',
        time: '02:20 PM',
        fullTimestamp: 'Sep 8, 2026, 02:20 PM',
        isRead: false
      }
    ]
  },
  'ORD-AUC-03': {
    orderId: 'ORD-AUC-03',
    itemId: 'auc-03',
    title: 'Patek Philippe Grandmaster Chime 6300G-001 White Gold',
    category: 'tech',
    categoryLabel: 'Luxury Timepieces',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80',
    winningBid: 4200000,
    latestBid: 4200000,
    status: 'WON',
    seller: {
      nickname: 'GenevaVault_CH',
      name: 'Geneva Horology Antiquities SA',
      rating: '5.0 ★ (62 reviews)',
      verified: true,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
      onlineStatus: 'Active 15m ago'
    },
    unreadCount: 0,
    lastMessageSnippet: 'The armored transit has been scheduled with Brinks Global for tomorrow morning.',
    lastMessageDate: 'Sep 8, 2026',
    lastMessageTime: '11:45 AM',
    lastMessageFull: 'Sep 8, 2026 • 11:45 AM',
    lastMessageIsRead: true,
    messages: [
      {
        id: 'msg-sys-3',
        sender: 'system',
        isOwner: false,
        text: '🏆 Congratulations Alexander! You won the Patek Philippe Grandmaster Chime. Escrow vault hold confirmed for $4,200,000.',
        date: 'Sep 8, 2026',
        time: '11:30 AM',
        fullTimestamp: 'Sep 8, 2026, 11:30 AM',
        isRead: true
      },
      {
        id: 'msg-s-3',
        sender: 'seller',
        isOwner: true,
        senderName: '[ @GenevaVault_CH ]',
        senderAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
        product: {
          id: 'auc-03',
          orderId: 'ORD-AUC-03',
          title: 'Patek Philippe Grandmaster Chime 6300G-001 White Gold',
          image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80',
          category: 'tech',
          categoryLabel: 'Luxury Timepieces',
          latestBid: 4200000,
          bidStatus: 'Winning Bid (ผู้ชนะการประมูล)'
        },
        text: 'Bonjour Alexander! We have sealed the double-faced timepiece in the presentation chest alongside the original Certificate of Origin.',
        date: 'Sep 8, 2026',
        time: '11:40 AM',
        fullTimestamp: 'Sep 8, 2026, 11:40 AM',
        isRead: true
      },
      {
        id: 'msg-s-4',
        sender: 'seller',
        isOwner: true,
        senderName: '[ @GenevaVault_CH ]',
        senderAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
        product: {
          id: 'auc-03',
          orderId: 'ORD-AUC-03',
          title: 'Patek Philippe Grandmaster Chime 6300G-001 White Gold',
          image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80',
          category: 'tech',
          categoryLabel: 'Luxury Timepieces',
          latestBid: 4200000,
          bidStatus: 'Winning Bid (ผู้ชนะการประมูล)'
        },
        text: 'The armored transit has been scheduled with Brinks Global for tomorrow morning.',
        date: 'Sep 8, 2026',
        time: '11:45 AM',
        fullTimestamp: 'Sep 8, 2026, 11:45 AM',
        isRead: true
      }
    ]
  },
  'ORD-AUC-01': {
    orderId: 'ORD-AUC-01',
    itemId: 'auc-01',
    title: '1967 Shelby GT500 Fastback "Eleanor Edition"',
    category: 'cars',
    categoryLabel: 'Car Models',
    image: 'https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&fit=crop&w=1200&q=80',
    winningBid: 485000,
    latestBid: 485000,
    status: 'WINNING',
    seller: {
      nickname: 'ApexMotors_NY',
      name: 'Apex Classic Motoring LLC',
      rating: '4.9 ★ (128 reviews)',
      verified: true,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
      onlineStatus: 'Active now'
    },
    unreadCount: 0,
    lastMessageSnippet: 'We have verified your latest bid of $485,000. Carroll Shelby registry documentation is staged.',
    lastMessageDate: 'Sep 8, 2026',
    lastMessageTime: '09:15 AM',
    lastMessageFull: 'Sep 8, 2026 • 09:15 AM',
    lastMessageIsRead: true,
    messages: [
      {
        id: 'msg-s-0',
        sender: 'seller',
        isOwner: true,
        senderName: '[ @ApexMotors_NY ]',
        senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
        product: {
          id: 'auc-01',
          orderId: 'ORD-AUC-01',
          title: '1967 Shelby GT500 Fastback "Eleanor Edition"',
          image: 'https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&fit=crop&w=1200&q=80',
          category: 'cars',
          categoryLabel: 'Car Models',
          latestBid: 485000,
          bidStatus: 'Highest Current Bid (ราคาสูงสุดขณะนี้)'
        },
        text: 'Hello Alexander! We have verified your latest bid of $485,000 on the Eleanor GT500. Carroll Shelby registry documentation is staged.',
        date: 'Sep 8, 2026',
        time: '09:15 AM',
        fullTimestamp: 'Sep 8, 2026, 09:15 AM',
        isRead: true
      }
    ]
  }
};

function loadP2PChats() {
  const saved = localStorage.getItem('startass_p2p_chats');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (typeof parsed === 'object' && parsed !== null) {
        let needsSave = false;
        if (!parsed['ORD-AUC-03']) {
          parsed['ORD-AUC-03'] = JSON.parse(JSON.stringify(DEFAULT_P2P_CHATS['ORD-AUC-03']));
          needsSave = true;
        }
        for (const k in DEFAULT_P2P_CHATS) {
          if (!parsed[k]) {
            parsed[k] = JSON.parse(JSON.stringify(DEFAULT_P2P_CHATS[k]));
            needsSave = true;
          } else if (parsed[k].messages && parsed[k].messages.some(m => m.sender === 'seller' && !m.product)) {
            parsed[k] = JSON.parse(JSON.stringify(DEFAULT_P2P_CHATS[k]));
            needsSave = true;
          }
        }
        if (needsSave) {
          saveP2PChats(parsed);
        }
        return parsed;
      }
    } catch (e) {
      console.error('Failed to parse P2P chats:', e);
    }
  }
  saveP2PChats(DEFAULT_P2P_CHATS);
  return JSON.parse(JSON.stringify(DEFAULT_P2P_CHATS));
}

function saveP2PChats(chats) {
  try {
    localStorage.setItem('startass_p2p_chats', JSON.stringify(chats));
  } catch (e) {
    console.error('Failed to save P2P chats:', e);
  }
}

function initP2PChatForOrder(order) {
  const chats = loadP2PChats();
  if (!chats[order.orderId]) {
    const seller = order.seller || {
      nickname: 'ApexMotors_NY',
      name: 'Apex Classic Motoring LLC',
      rating: '4.9 ★ (128 reviews)',
      verified: true,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
      onlineStatus: 'Active now'
    };
    const todayDate = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const nowTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    const fullTs = `${todayDate}, ${nowTime}`;

    chats[order.orderId] = {
      orderId: order.orderId,
      itemId: order.itemId,
      title: order.title,
      category: order.category || 'collectibles',
      categoryLabel: order.categoryLabel || 'Exclusive Items',
      image: order.image,
      winningBid: order.userBid,
      latestBid: order.currentBid || order.userBid,
      status: order.status || 'WON',
      seller: seller,
      unreadCount: 1,
      lastMessageSnippet: `Hello Alexander! Congratulations on winning "${order.title}".`,
      lastMessageDate: todayDate,
      lastMessageTime: nowTime,
      lastMessageFull: `${todayDate} • ${nowTime}`,
      lastMessageIsRead: false,
      messages: [
        {
          id: 'msg-sys-' + Date.now(),
          sender: 'system',
          isOwner: false,
          text: `🏆 Congratulations Alexander! You won this auction for "${order.title}". Direct P2P Seller Chat is now unlocked under STARTASS Escrow Vault protection.`,
          date: todayDate,
          time: nowTime,
          fullTimestamp: fullTs,
          isRead: true
        },
        {
          id: 'msg-s-' + (Date.now() + 1),
          sender: 'seller',
          isOwner: true,
          senderName: `[ @${seller.nickname} ]`,
          senderAvatar: seller.avatar,
          product: {
            id: order.itemId,
            orderId: order.orderId,
            title: order.title,
            image: order.image,
            category: order.category || 'collectibles',
            categoryLabel: order.categoryLabel || 'Exclusive Items',
            latestBid: order.userBid,
            bidStatus: 'Winning Bid (ผู้ชนะการประมูล)'
          },
          text: `Hello Alexander! Congratulations on winning "${order.title}". We have verified your winning bid of ${formatCurrency(order.userBid)}. Please share your delivery instructions and preferred schedule.`,
          date: todayDate,
          time: nowTime,
          fullTimestamp: fullTs,
          isRead: false
        }
      ]
    };
    saveP2PChats(chats);
  }
  return chats[order.orderId];
}

function openSellerP2PChat(orderId) {
  selectedP2PChatOrderId = orderId;
  activeOrderTab = 'chat';
  renderOrderDetail(orderId);
  setTimeout(() => {
    const chatPane = document.getElementById('paneChat');
    if (chatPane) {
      chatPane.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    scrollP2PChatToBottom();
  }, 100);
}

function showP2PLockNotice(sellerNickname) {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast toast-locked';
  toast.innerHTML = `
    <i class="fa-solid fa-lock toast-icon" style="color: #f59e0b; font-size: 1.3rem;"></i>
    <div style="flex: 1;">
      <strong style="display:block; font-size:0.95rem; color:#fbbf24;">P2P Seller Chat Rights Locked</strong>
      <span style="font-size:0.84rem; color:#cbd5e1; display:block; margin: 3px 0 6px;">
        สิทธิ์การสนทนา P2P โดยตรงกับผู้ขาย [@${sellerNickname || 'Seller'}] จะปลดล็อกเฉพาะผู้ที่ชนะการประมูล (Auction Won) เท่านั้นเพื่อความปลอดภัย
      </span>
      <div style="display:flex; gap:8px; align-items:center;">
        <button type="button" class="btn-toast-raise" onclick="simulateAuctionWon(null, event)">
          <i class="fa-solid fa-trophy"></i> ⚡ Simulate Won เพื่อทดสอบ P2P Chat
        </button>
      </div>
    </div>
  `;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 5000);
}

function selectP2PChat(orderId) {
  selectedP2PChatOrderId = orderId;
  const chats = loadP2PChats();
  if (chats[orderId]) {
    chats[orderId].unreadCount = 0;
    saveP2PChats(chats);
  }
  renderOrderDetail(orderId);
  setTimeout(scrollP2PChatToBottom, 50);
}

function handleSendP2PMessage(event, orderId) {
  if (event) event.preventDefault();
  const input = document.getElementById('p2pMessageInput');
  if (!input) return;
  const text = input.value.trim();
  if (!text) return;

  const chats = loadP2PChats();
  const chat = chats[orderId] || initP2PChatForOrder(currentSelectedOrder);
  if (!chat) return;

  const nowStr = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  const newMsg = {
    id: 'msg-u-' + Date.now(),
    sender: 'user',
    text: text,
    time: nowStr
  };
  chat.messages.push(newMsg);
  chat.lastMessageTime = 'Just now';
  saveP2PChats(chats);

  input.value = '';
  renderP2PActiveChatMessages(orderId);
  renderP2PConversationsList();
  scrollP2PChatToBottom();

  // Automated realistic response from seller after 1.5 seconds
  setTimeout(() => {
    const updatedChats = loadP2PChats();
    const currentChat = updatedChats[orderId];
    if (!currentChat) return;

    const sellerName = currentChat.seller ? currentChat.seller.nickname : 'Seller';
    const autoReplies = [
      `Thank you for confirming, Alexander! Our dispatch team is preparing the paperwork for "${currentChat.title}". We will update the white-glove transport tracking number within the hour.`,
      `Received! We have recorded this in your Escrow security file for order #${orderId}. All certificates of authenticity and documentation are packed in tamper-proof casings.`,
      `Understood, Alexander. The insured transport courier has confirmed the delivery slot. We will dispatch the live GPS telemetry tracking link shortly.`,
      `Got it! Thank you for the quick communication. We are in direct coordination with STARTASS Escrow to confirm authorization.`
    ];
    const replyText = autoReplies[Math.floor(Math.random() * autoReplies.length)];

    currentChat.messages.push({
      id: 'msg-s-' + Date.now(),
      sender: 'seller',
      text: replyText,
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    });
    currentChat.lastMessageTime = 'Just now';
    saveP2PChats(updatedChats);

    renderP2PActiveChatMessages(orderId);
    renderP2PConversationsList();
    scrollP2PChatToBottom();
    showToast(`New message from [@${sellerName}]: "${replyText.slice(0, 48)}..."`);
  }, 1500);
}

function handleQuickPrompt(orderId, text) {
  const input = document.getElementById('p2pMessageInput');
  if (input) {
    input.value = text;
    handleSendP2PMessage(null, orderId);
  }
}

function scrollP2PChatToBottom() {
  const historyEl = document.getElementById('p2pMessagesHistory');
  if (historyEl) {
    historyEl.scrollTop = historyEl.scrollHeight;
  }
}

function renderP2PActiveChatMessages(orderId) {
  const container = document.getElementById('p2pMessagesHistory');
  if (!container) return;

  const chats = loadP2PChats();
  const selectedChat = chats[orderId];
  if (!selectedChat) return;

  container.innerHTML = (selectedChat.messages || []).map(m => {
    if (m.sender === 'system') {
      return `
        <div class="p2p-msg-system">
          <div class="system-pill">
            <i class="fa-solid fa-shield-halved"></i>
            <span>${m.text}</span>
          </div>
          <span class="system-time">${m.time}</span>
        </div>
      `;
    }

    const isUser = m.sender === 'user';
    const avatar = isUser
      ? (currentUser && currentUser.avatar ? currentUser.avatar : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80')
      : (selectedChat.seller ? selectedChat.seller.avatar : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80');
    const senderName = isUser ? 'Alexander Sterling (You)' : `[ @${selectedChat.seller ? selectedChat.seller.nickname : 'Seller'} ]`;

    return `
      <div class="p2p-msg-row ${isUser ? 'msg-user' : 'msg-seller'}">
        <img src="${avatar}" alt="${senderName}" class="p2p-msg-avatar">
        <div class="p2p-msg-bubble-wrap">
          <div class="p2p-msg-sender">${senderName}</div>
          <div class="p2p-msg-bubble">
            ${m.text}
          </div>
          <div class="p2p-msg-time">
            <span>${m.time}</span>
            ${isUser ? '<i class="fa-solid fa-check-double msg-check-read"></i>' : ''}
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function renderP2PConversationsList() {
  const container = document.getElementById('p2pConversationsList');
  if (!container) return;

  const orders = loadOrders();
  const wonOrders = orders.filter(o => o.status === 'WON');
  const chats = loadP2PChats();

  container.innerHTML = wonOrders.map(o => {
    const chatData = chats[o.orderId] || initP2PChatForOrder(o);
    const isSel = o.orderId === selectedP2PChatOrderId;
    const lastMsg = chatData.messages && chatData.messages.length > 0
      ? chatData.messages[chatData.messages.length - 1].text
      : 'Ready for conversation...';
    const lastTime = chatData.lastMessageTime || 'Just now';
    const seller = o.seller || { nickname: 'Seller', avatar: '' };

    return `
      <div class="p2p-conv-item ${isSel ? 'active' : ''}" onclick="selectP2PChat('${o.orderId}')" title="${o.title}">
        <div class="p2p-conv-avatar-box">
          <img src="${seller.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80'}" alt="${seller.nickname}" class="p2p-conv-avatar">
          <span class="p2p-online-badge"></span>
        </div>
        <div class="p2p-conv-meta">
          <div class="p2p-conv-top-row">
            <span class="p2p-conv-seller-name">[ @${seller.nickname} ]</span>
            <span class="p2p-conv-time">${lastTime}</span>
          </div>
          <div class="p2p-conv-item-title">${o.title}</div>
          <div class="p2p-conv-last-msg">${lastMsg}</div>
        </div>
        ${chatData.unreadCount > 0 ? `<span class="p2p-conv-unread-pill">${chatData.unreadCount}</span>` : ''}
      </div>
    `;
  }).join('');
}

function filterP2PConversations(keyword) {
  const query = (keyword || '').toLowerCase().trim();
  const items = document.querySelectorAll('.p2p-conv-item');
  items.forEach(el => {
    const text = el.textContent.toLowerCase();
    el.style.display = text.includes(query) ? 'flex' : 'none';
  });
}

function simulateAuctionWon(orderId, event) {
  if (event) event.stopPropagation();

  const orders = loadOrders();
  const targetId = orderId || (currentSelectedOrder ? currentSelectedOrder.orderId : 'ORD-AUC-01');
  let targetOrder = orders.find(o => o.orderId === targetId);

  if (!targetOrder) {
    targetOrder = orders[0];
  }

  targetOrder.status = 'WON';
  targetOrder.statusLabel = 'Auction Won (Pending Delivery)';
  targetOrder.updatedAt = new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });

  // Update auction item endDate to past to mark as closed
  const targetItem = AUCTION_ITEMS.find(i => i.id === targetOrder.itemId);
  if (targetItem) {
    targetItem.endDate = new Date(Date.now() - 3600000).toISOString();
    saveAuctions();
  }

  saveOrders(orders);

  // Initialize chat room
  initP2PChatForOrder(targetOrder);

  // Send notification
  const notifications = loadNotifications();
  const wonNotif = {
    id: 'notif-won-' + Date.now(),
    type: 'won',
    itemId: targetOrder.itemId,
    orderId: targetOrder.orderId,
    title: '🏆 You Won the Auction!',
    message: `Congratulations! You won "${targetOrder.title}" for ${formatCurrency(targetOrder.userBid)}. P2P Seller Chat is now unlocked!`,
    itemTitle: targetOrder.title,
    time: 'Just now',
    read: false,
    createdAt: new Date().toISOString()
  };
  notifications.unshift(wonNotif);
  saveNotifications(notifications);

  updateNotificationBadge();
  renderNotificationsList();
  showToast(`🎉 Congratulations! You won auction #${targetOrder.orderId}! P2P Direct Chat with [@${targetOrder.seller ? targetOrder.seller.nickname : 'Seller'}] is now unlocked!`);

  // Switch to chat tab or select standalone chat
  if (document.getElementById('standaloneChatContainer')) {
    selectStandaloneChat(targetOrder.orderId);
  } else {
    openSellerP2PChat(targetOrder.orderId);
  }
}

function renderP2PSection(orderId) {
  const orders = loadOrders();
  const currentOrder = orders.find(o => o.orderId === orderId) || orders[0];
  if (!currentOrder) return '';

  const isWon = currentOrder.status === 'WON';
  const wonOrders = orders.filter(o => o.status === 'WON');
  const chats = loadP2PChats();

  if (isWon) {
    initP2PChatForOrder(currentOrder);
  }

  if (!selectedP2PChatOrderId || !chats[selectedP2PChatOrderId]) {
    if (isWon) {
      selectedP2PChatOrderId = currentOrder.orderId;
    } else if (wonOrders.length > 0) {
      selectedP2PChatOrderId = wonOrders[0].orderId;
    }
  }

  // IF CURRENT ORDER IS NOT WON: Display P2P Rights Locked Notice
  if (!isWon) {
    return `
      <div class="p2p-locked-card">
        <div class="p2p-locked-header">
          <div class="p2p-locked-icon">
            <i class="fa-solid fa-lock"></i>
          </div>
          <div class="p2p-locked-titles">
            <h3>P2P Seller Chat Rights Locked (สิทธิ์การสนทนา P2P ยังไม่เปิด)</h3>
            <p>
              ห้องสนทนาส่วนตัวแบบ P2P ระหว่างผู้ซื้อและผู้ขาย <strong>[@${currentOrder.seller ? currentOrder.seller.nickname : 'Seller'}]</strong> จะเปิดให้ใช้งาน <strong>เฉพาะผู้ชนะการประมูล (Auction Won)</strong> เท่านั้น เพื่อความปลอดภัยของระบบ Escrow และการประสานงานจัดส่งระดับ White-Glove
            </p>
          </div>
        </div>

        <div class="p2p-locked-status-box">
          <div class="status-item">
            <span class="label">Current Auction Order:</span>
            <span class="val">#${currentOrder.orderId} (${currentOrder.title})</span>
          </div>
          <div class="status-item">
            <span class="label">Your Auction Status:</span>
            <span class="val status-pill status-${currentOrder.status.toLowerCase()}">${currentOrder.statusLabel || currentOrder.status}</span>
          </div>
          <div class="status-item">
            <span class="label">P2P Channel Access:</span>
            <span class="val" style="color:#ef4444;"><i class="fa-solid fa-ban"></i> Restricted until Auction Won</span>
          </div>
        </div>

        <div class="p2p-locked-actions">
          <button type="button" class="btn btn-simulate-won-cta" onclick="simulateAuctionWon('${currentOrder.orderId}')">
            <i class="fa-solid fa-trophy"></i>
            <span>⚡ Simulate Auction Won (จำลองการชนะประมูลเพื่อปลดล็อก P2P ทันที)</span>
          </button>
        </div>

        ${wonOrders.length > 0 ? `
          <div class="p2p-other-won-notice">
            <span><i class="fa-solid fa-circle-check" style="color:#10b981;"></i> คุณมีคำสั่งซื้ออื่นที่ชนะการประมูลแล้วและมีสิทธิ์สนทนา P2P:</span>
            <div class="p2p-won-chips">
              ${wonOrders.map(wo => `
                <button type="button" class="btn-p2p-chip" onclick="openSellerP2PChat('${wo.orderId}')">
                  <img src="${wo.image}" alt="${wo.title}">
                  <span>#${wo.orderId} - @${wo.seller ? wo.seller.nickname : 'Seller'}</span>
                  <i class="fa-solid fa-arrow-right"></i>
                </button>
              `).join('')}
            </div>
          </div>
        ` : ''}
      </div>
    `;
  }

  // CURRENT ORDER IS WON - RENDER FULL P2P CHAT WITH PART CONVERSATIONS & CURRENT CHAT
  const selectedChat = chats[selectedP2PChatOrderId] || chats[currentOrder.orderId];

  // Conversations List HTML ("Part Conversations")
  const conversationsListHtml = wonOrders.map(o => {
    const chatData = chats[o.orderId] || initP2PChatForOrder(o);
    const isSel = o.orderId === selectedChat.orderId;
    const lastMsg = chatData.messages && chatData.messages.length > 0
      ? chatData.messages[chatData.messages.length - 1].text
      : 'Ready for conversation...';
    const lastTime = chatData.lastMessageTime || 'Just now';
    const seller = o.seller || { nickname: 'Seller', avatar: '' };

    return `
      <div class="p2p-conv-item ${isSel ? 'active' : ''}" onclick="selectP2PChat('${o.orderId}')" title="${o.title}">
        <div class="p2p-conv-avatar-box">
          <img src="${seller.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80'}" alt="${seller.nickname}" class="p2p-conv-avatar">
          <span class="p2p-online-badge"></span>
        </div>
        <div class="p2p-conv-meta">
          <div class="p2p-conv-top-row">
            <span class="p2p-conv-seller-name">[ @${seller.nickname} ]</span>
            <span class="p2p-conv-time">${lastTime}</span>
          </div>
          <div class="p2p-conv-item-title">${o.title}</div>
          <div class="p2p-conv-last-msg">${lastMsg}</div>
        </div>
        ${chatData.unreadCount > 0 ? `<span class="p2p-conv-unread-pill">${chatData.unreadCount}</span>` : ''}
      </div>
    `;
  }).join('');

  // Selected Chat Messages HTML ("Current Chat")
  const messagesHtml = (selectedChat.messages || []).map(m => {
    if (m.sender === 'system') {
      return `
        <div class="p2p-msg-system">
          <div class="system-pill">
            <i class="fa-solid fa-shield-halved"></i>
            <span>${m.text}</span>
          </div>
          <span class="system-time">${m.time}</span>
        </div>
      `;
    }

    const isUser = m.sender === 'user';
    const avatar = isUser
      ? (currentUser && currentUser.avatar ? currentUser.avatar : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80')
      : (selectedChat.seller ? selectedChat.seller.avatar : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80');
    const senderName = isUser ? 'Alexander Sterling (You)' : `[ @${selectedChat.seller ? selectedChat.seller.nickname : 'Seller'} ]`;

    return `
      <div class="p2p-msg-row ${isUser ? 'msg-user' : 'msg-seller'}">
        <img src="${avatar}" alt="${senderName}" class="p2p-msg-avatar">
        <div class="p2p-msg-bubble-wrap">
          <div class="p2p-msg-sender">${senderName}</div>
          <div class="p2p-msg-bubble">
            ${m.text}
          </div>
          <div class="p2p-msg-time">
            <span>${m.time}</span>
            ${isUser ? '<i class="fa-solid fa-check-double msg-check-read"></i>' : ''}
          </div>
        </div>
      </div>
    `;
  }).join('');

  return `
    <div class="p2p-chat-container">
      
      <!-- LEFT PART: Conversations List (Part Conversations) -->
      <aside class="p2p-conversations-sidebar">
        <div class="p2p-conv-header">
          <div class="p2p-conv-heading">
            <i class="fa-solid fa-comments"></i>
            <span>Conversations</span>
          </div>
          <span class="p2p-won-badge"><i class="fa-solid fa-trophy"></i> ${wonOrders.length} Won Deals</span>
        </div>

        <div class="p2p-conv-search-box">
          <i class="fa-solid fa-magnifying-glass"></i>
          <input type="text" id="p2pSearchInput" placeholder="Search seller or item..." oninput="filterP2PConversations(this.value)">
        </div>

        <div class="p2p-conversations-list" id="p2pConversationsList">
          ${conversationsListHtml}
        </div>
      </aside>

      <!-- RIGHT PART: Current Chat / Selected Chat -->
      <main class="p2p-current-chat-window">
        
        <!-- Current Chat Header -->
        <header class="p2p-chat-header">
          <div class="p2p-chat-seller-info">
            <div class="p2p-header-avatar-box">
              <img src="${selectedChat.seller ? selectedChat.seller.avatar : ''}" alt="Seller Avatar" class="p2p-header-avatar">
              <span class="p2p-online-indicator"></span>
            </div>
            <div>
              <div class="p2p-header-nickname">
                <span>[ @${selectedChat.seller ? selectedChat.seller.nickname : 'Seller'} ]</span>
                <span class="seller-verified-mini"><i class="fa-solid fa-shield-check"></i> Verified</span>
              </div>
              <div class="p2p-header-subtext">
                <span>${selectedChat.seller ? selectedChat.seller.name : 'Verified Seller'}</span>
                <span>•</span>
                <span style="color:#10b981;"><i class="fa-solid fa-circle" style="font-size:0.5rem;"></i> Active now</span>
              </div>
            </div>
          </div>

          <div class="p2p-chat-header-actions">
            <span class="p2p-escrow-pill">
              <i class="fa-solid fa-lock"></i> Escrow Deal Protected
            </span>
          </div>
        </header>

        <!-- Won Auction Product Reference Strip -->
        <div class="p2p-deal-product-strip">
          <img src="${selectedChat.image}" alt="${selectedChat.title}" class="p2p-strip-thumb">
          <div class="p2p-strip-meta">
            <span class="p2p-strip-won-tag"><i class="fa-solid fa-trophy"></i> Won Auction</span>
            <strong class="p2p-strip-title">${selectedChat.title}</strong>
            <span class="p2p-strip-price">Winning Bid: <strong>${formatCurrency(selectedChat.winningBid)}</strong> (Order #${selectedChat.orderId})</span>
          </div>
        </div>

        <!-- Chat Message Timeline -->
        <div class="p2p-messages-history" id="p2pMessagesHistory">
          ${messagesHtml}
        </div>

        <!-- Quick Prompt Chips -->
        <div class="p2p-quick-prompts-bar">
          <span class="quick-prompts-label"><i class="fa-solid fa-bolt"></i> Quick Actions:</span>
          <div class="quick-prompts-scroll">
            <button type="button" class="btn-quick-prompt" onclick="handleQuickPrompt('${selectedChat.orderId}', '📍 ยืนยันที่อยู่จัดส่ง: 450 Lexington Ave, New York, NY 10017 พร้อมรับมอบสินค้าครับ')">
              📍 Confirm Address
            </button>
            <button type="button" class="btn-quick-prompt" onclick="handleQuickPrompt('${selectedChat.orderId}', '📜 รบกวนส่งเอกสาร Certificate of Authenticity และผลตรวจสอบเบื้องต้นให้ดูทางนี้ด้วยครับ')">
              📜 Request Certificate
            </button>
            <button type="button" class="btn-quick-prompt" onclick="handleQuickPrompt('${selectedChat.orderId}', '🛡️ เงินมัดจำ Escrow ปลอดภัยเรียบร้อย พร้อมประสานงานปล่อยยอดเมื่อได้รับของครับ')">
              🛡️ Escrow Verified
            </button>
            <button type="button" class="btn-quick-prompt" onclick="handleQuickPrompt('${selectedChat.orderId}', '🚚 รบกวนแจ้งเวลาที่รถขนส่ง White-Glove พร้อมเข้ามาส่งมอบด้วยครับ')">
              🚚 Delivery Schedule
            </button>
          </div>
        </div>

        <!-- Message Composer Input Bar -->
        <form class="p2p-chat-input-bar" onsubmit="handleSendP2PMessage(event, '${selectedChat.orderId}')">
          <button type="button" class="btn-chat-attach" title="แนบเอกสารหรือรูปภาพ (Attach File)" onclick="showToast('ระบบแนบไฟล์สำหรับส่งหลักฐาน Escrow พร้อมใช้งาน')">
            <i class="fa-solid fa-paperclip"></i>
          </button>
          <input type="text" id="p2pMessageInput" class="p2p-message-input" placeholder="Type message to [ @${selectedChat.seller ? selectedChat.seller.nickname : 'Seller'} ]..." autocomplete="off" required>
          <button type="submit" class="btn-chat-send" title="ส่งข้อความ (Send)">
            <i class="fa-solid fa-paper-plane"></i>
            <span>Send</span>
          </button>
        </form>

      </main>

    </div>
  `;
}

function navigateToOrderChat(itemId) {
  window.location.href = `ordersdetail.html?id=${encodeURIComponent(itemId)}&tab=chat`;
}

function initOrderDetailPage() {
  const container = document.getElementById('orderDetailContainer');
  if (!container) return;

  const urlParams = new URLSearchParams(window.location.search);
  const targetId = urlParams.get('id') || urlParams.get('orderId');
  const targetTab = urlParams.get('tab');
  if (targetTab === 'chat') {
    activeOrderTab = 'chat';
  }

  const orders = loadOrders();
  if (orders.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="display:block; padding: 80px 20px; text-align: center;">
        <i class="fa-solid fa-receipt" style="font-size: 3.5rem; color: #f59e0b; margin-bottom: 20px;"></i>
        <h3 style="font-size: 1.5rem; margin-bottom: 10px;">ยังไม่มีคำสั่งซื้อหรือรายการเสนอราคาของคุณ</h3>
        <p style="color: #94a3b8; max-width: 500px; margin: 0 auto 24px;">คุณยังไม่ได้ร่วมประมูลในรายการใด ลองเลือกชมสินค้าและเริ่มวางข้อเสนอราคาเพื่อดูสถานะคำสั่งซื้อที่นี่</p>
        <a href="HomePage.html" class="btn btn-order-raise" style="display: inline-flex; align-items: center; gap: 8px; width: auto;">
          <i class="fa-solid fa-arrow-left"></i> ไปยังหน้าประมูลหลัก (Explore Auctions)
        </a>
      </div>
    `;
    return;
  }

  let selectedOrder = null;
  if (targetId) {
    selectedOrder = orders.find(o => o.itemId === targetId || o.orderId.toLowerCase() === targetId.toLowerCase());
  }
  if (!selectedOrder) {
    selectedOrder = orders[0];
  }

  renderOrderDetail(selectedOrder.orderId);
}

function renderOrderDetail(orderId) {
  const container = document.getElementById('orderDetailContainer');
  if (!container) return;

  const orders = loadOrders();
  const order = orders.find(o => o.orderId === orderId) || orders[0];
  if (!order) return;
  currentSelectedOrder = order;

  // Find latest auction item data for live synchronization
  const liveItem = AUCTION_ITEMS.find(i => i.id === order.itemId);
  const currentBidAmount = liveItem ? liveItem.currentBid : order.currentBid;
  const bidsCount = liveItem ? (liveItem.bidsCount || 42) : 42;
  const bidHistory = (liveItem && liveItem.bidHistory && liveItem.bidHistory.length > 0) ? liveItem.bidHistory : [
    { user: 'Alexander Sterling (You)', amount: order.userBid, time: 'Just now' },
    { user: order.seller ? order.seller.nickname : 'ApexMotors_NY', amount: order.startPrice, time: '2 hours ago' }
  ];

  // Check if auction is won or winning
  const isWon = order.status === 'WON';
  const isWinning = !isWon && isUserHighestBidder(order.itemId);
  const currentStatus = isWon ? 'WON' : (isWinning ? 'WINNING' : 'OUTBID');
  const statusClass = getStatusClass(currentStatus);
  const statusLabel = isWon
    ? (order.statusLabel || 'Auction Won (Pending Delivery)')
    : (isWinning ? 'Active Winning (Highest Bidder)' : 'Outbid (Action Needed)');

  const images = (order.images && order.images.length > 0) ? order.images : [order.image];
  const seller = order.seller || {
    nickname: 'ApexMotors_NY',
    name: 'Apex Classic Motoring LLC',
    rating: '4.9 ★ (128 reviews)',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80'
  };

  const time = getTimeRemaining(order.endDate || new Date(Date.now() + 2 * 86400000).toISOString());
  const timerText = isWon
    ? 'Auction Won'
    : (time.expired ? 'Auction Closed' : `${time.days}d ${time.hours}h ${time.minutes}m ${time.seconds}s left`);

  // Order Switcher Chips HTML
  const chipsHtml = orders.map(o => {
    const isAct = o.orderId === order.orderId;
    const isWonItem = o.status === 'WON';
    const oWinning = !isWonItem && isUserHighestBidder(o.itemId);
    const badgeClass = isWonItem ? 'status-won' : (oWinning ? 'status-winning' : 'status-outbid');
    const badgeText = isWonItem ? 'WON' : (oWinning ? 'WINNING' : 'OUTBID');
    return `
      <div class="order-chip ${isAct ? 'active' : ''}" onclick="renderOrderDetail('${o.orderId}')" title="${o.title}">
        <img src="${o.image}" alt="${o.title}" class="order-chip-thumb">
        <span style="font-weight:700;">#${o.orderId}</span>
        <span class="order-chip-bid">${formatCurrency(o.userBid)}</span>
        <span class="order-status-badge ${badgeClass}" style="padding: 2px 7px; font-size: 0.68rem;">${badgeText}</span>
      </div>
    `;
  }).join('');

  // Thumbnails Strip HTML
  const thumbsHtml = images.map((imgUrl, idx) => `
    <div class="order-gallery-thumb ${idx === 0 ? 'active' : ''}" onclick="switchOrderMainImage('${imgUrl}', this)" title="ดูรูปที่ ${idx + 1}">
      <img src="${imgUrl}" alt="Thumbnail ${idx + 1}">
    </div>
  `).join('');

  // Timeline entries HTML for History View
  const historyHtml = bidHistory.map((b, idx) => {
    const isUser = b.user.includes('Alexander') || b.user.includes('You');
    const isHighest = idx === 0;
    const itemClass = isHighest ? 'highest' : (isUser ? 'user-bid' : '');
    return `
      <div class="timeline-item-entry ${itemClass}">
        <div class="timeline-dot"></div>
        <div class="timeline-body-box">
          <div class="bidder-info-cell">
            <i class="fa-solid fa-circle-user"></i>
            <div>
              <span class="bidder-name-text">${b.user}</span>
              ${isUser ? '<span class="bidder-tag-user">Your Bid</span>' : ''}
              ${isHighest ? '<span class="bidder-tag-highest"><i class="fa-solid fa-trophy"></i> Highest</span>' : ''}
            </div>
          </div>
          <div class="timeline-amount-cell">
            <span class="timeline-bid-value">${formatCurrency(b.amount)}</span>
            <span class="timeline-time-text"><i class="fa-regular fa-clock"></i> ${b.time}</span>
          </div>
        </div>
      </div>
    `;
  }).join('');

  // Specifications HTML
  const specsHtml = (order.specs || ['ของแท้ 100% พร้อมการรับรอง', 'สภาพสมบูรณ์ตรงตามภาพ']).map(s => `
    <li class="order-spec-item">
      <i class="fa-solid fa-circle-check"></i>
      <span>${s}</span>
    </li>
  `).join('');

  container.innerHTML = `
    <!-- Breadcrumbs -->
    <nav class="order-breadcrumbs" aria-label="Breadcrumb">
      <a href="HomePage.html"><i class="fa-solid fa-house"></i> Home</a>
      <span class="crumb-sep">/</span>
      <a href="HomePage.html">Auctions</a>
      <span class="crumb-sep">/</span>
      <span class="crumb-active">Order Details #${order.orderId}</span>
    </nav>

    <!-- Orders Switcher Strip -->
    <div class="order-switcher-container">
      <div class="order-switcher-header">
        <span class="order-switcher-title">
          <i class="fa-solid fa-layer-group"></i> Your Active Auction Orders (${orders.length})
        </span>
        <small style="color: #64748b;">คลิกเพื่อสลับดูคำสั่งซื้ออื่น</small>
      </div>
      <div class="order-chips-scroll">
        ${chipsHtml}
      </div>
    </div>

    <!-- Header Status Banner -->
    <section class="order-header-banner">
      <div class="order-header-main">
        <div class="order-meta-row">
          <span class="order-id-badge">ORDER #${order.orderId}</span>
          <span class="order-status-badge ${statusClass}">
            <span class="status-pulse-dot"></span>
            ${statusLabel}
          </span>
        </div>
        <div class="order-timestamps">
          <span><i class="fa-regular fa-calendar-check"></i> Placed: <strong>${order.placedAt || 'Sep 8, 2026, 17:30'}</strong></span>
          <span><i class="fa-regular fa-clock"></i> Updated: <strong>${order.updatedAt || 'Sep 8, 2026, 18:45'}</strong></span>
        </div>
      </div>
      <div class="order-header-actions">
        <a href="HomePage.html" class="btn btn-view" title="กลับไปหน้าหลัก">
          <i class="fa-solid fa-arrow-left"></i> All Auctions
        </a>
        ${isWon ? `
          <button type="button" class="btn btn-order-p2p" onclick="openSellerP2PChat('${order.orderId}')" title="เปิดห้องแชตคุยกับผู้ขายโดยตรง">
            <i class="fa-solid fa-comments"></i> P2P Chat with Seller
          </button>
        ` : `
          <button type="button" class="btn btn-simulate-won-cta-mini" onclick="simulateAuctionWon('${order.orderId}', event)" title="จำลองการชนะประมูลเพื่อปลดล็อกสิทธิ์ P2P Chat">
            <i class="fa-solid fa-trophy"></i> ⚡ Simulate Won
          </button>
          ${isWinning ? `
            <button type="button" class="btn btn-order-raise btn-bid-locked" disabled title="คุณเป็นผู้ให้ราคาสูงสุดแล้ว (${formatCurrency(order.userBid)}) ไม่สามารถเปิดบิดซ้ำจนกว่าจะมีผู้ประมูลอื่นเสนอราคาแข่ง">
              <i class="fa-solid fa-lock"></i> Highest Bidder (Locked)
            </button>
          ` : `
            <button type="button" class="btn btn-order-raise btn-outbid-pulse" onclick="openBidModal('${order.itemId}')" title="คุณถูกเสนอราคาแซงแล้ว! คลิกเพื่อเสนอราคาเพิ่ม">
              <i class="fa-solid fa-arrow-trend-up"></i> Raise Bid Now
            </button>
          `}
        `}
      </div>
    </section>

    <!-- Main Two-Column Layout -->
    <div class="order-main-grid">
      
      <!-- LEFT COLUMN: Images, Gallery, Category & Seller Card -->
      <div class="order-left-column">
        
        <!-- Product Media Card -->
        <div class="order-media-card">
          <div class="order-main-preview">
            <img id="orderMainImg" src="${images[0]}" alt="${order.title}">
            <div class="order-preview-tags">
              <span class="category-badge-enum cat-${order.category}">
                <i class="${getCategoryIcon(order.category)}"></i> ${order.categoryLabel}
              </span>
              <span class="order-status-badge ${statusClass}" style="background: rgba(11, 15, 25, 0.75); backdrop-filter: blur(8px);">
                <span class="status-pulse-dot"></span> ${currentStatus}
              </span>
            </div>
          </div>

          <!-- Thumbnails Strip -->
          ${images.length > 1 ? `<div class="order-gallery-strip">${thumbsHtml}</div>` : ''}
        </div>

        <!-- Seller Card: Nickname [ seller ] with P2P Rights Status -->
        <div class="order-seller-card">
          <div class="seller-header-row">
            <span class="seller-title-label">
              <i class="fa-solid fa-store"></i> Seller Information (ข้อมูลผู้ขาย)
            </span>
            <span class="seller-verified-pill">
              <i class="fa-solid fa-shield-halved"></i> Verified Seller
            </span>
          </div>

          <div class="seller-profile-row">
            <img src="${seller.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80'}" alt="${seller.nickname}" class="seller-avatar-img">
            <div class="seller-details">
              <div class="seller-nickname">
                <span class="bracket">[</span>
                <span style="color: #f59e0b;">@${seller.nickname || 'ApexMotors_NY'}</span>
                <span class="bracket">]</span>
              </div>
              <div class="seller-company-name">${seller.name || 'Apex Classic Motoring LLC'}</div>
              <div class="seller-stats-strip">
                <span class="seller-stat-pill"><i class="fa-solid fa-star"></i> ${seller.rating || '4.9 ★'}</span>
                <span>•</span>
                <span>${seller.reviewsCount || 128} Verified Sales</span>
                <span>•</span>
                <span style="color: #34d399;"><i class="fa-solid fa-lock"></i> Escrow Protected</span>
              </div>
            </div>
          </div>

          <!-- P2P Direct Communication CTA Box -->
          <div class="seller-p2p-cta-box">
            ${isWon ? `
              <div class="p2p-unlocked-notice">
                <div class="p2p-notice-text">
                  <i class="fa-solid fa-circle-check" style="color: #10b981;"></i>
                  <span><strong>สิทธิ์การสนทนา P2P ปลดล็อกแล้ว:</strong> คุณชนะการประมูลรายการนี้ สามารถติดต่อผู้ขาย [ @${seller.nickname || 'Seller'} ] เพื่อประสานงานจัดส่ง</span>
                </div>
                <button type="button" class="btn btn-p2p-direct" onclick="openSellerP2PChat('${order.orderId}')">
                  <i class="fa-solid fa-comments"></i>
                  <span>💬 Direct P2P Chat with [ @${seller.nickname || 'Seller'} ]</span>
                </button>
              </div>
            ` : `
              <div class="p2p-locked-notice">
                <div class="p2p-notice-text">
                  <i class="fa-solid fa-lock" style="color: #f59e0b;"></i>
                  <span><strong>P2P Direct Chat Locked:</strong> สงวนสิทธิ์การแชตกับ [ @${seller.nickname || 'Seller'} ] เฉพาะผู้ชนะประมูลเท่านั้น</span>
                </div>
                <button type="button" class="btn btn-p2p-locked" onclick="showP2PLockNotice('${seller.nickname || 'Seller'}')">
                  <i class="fa-solid fa-lock"></i>
                  <span>P2P Chat Locked (Requires Auction Win)</span>
                </button>
              </div>
            `}
          </div>
        </div>

      </div>

      <!-- RIGHT COLUMN: Pricing Matrix, Countdown, Action CTA & Product Overview -->
      <div class="order-right-column">
        <div class="order-info-card">
          <h1 class="order-product-title">${order.title}</h1>
          <p class="order-product-desc">${order.description}</p>

          <!-- Pricing & Bids Matrix -->
          <div class="order-bidding-matrix">
            <div class="matrix-main-prices">
              <div class="price-box-item">
                <span class="price-box-label">
                  <i class="fa-solid fa-trophy"></i> Highest Current Bid
                </span>
                <span class="price-box-val-emerald">${formatCurrency(currentBidAmount)}</span>
                <span style="font-size: 0.8rem; color: #94a3b8;">${bidsCount} total bids placed</span>
              </div>

              <div class="price-box-item">
                <span class="price-box-label">
                  <i class="fa-solid fa-user-tag"></i> Your Placed Bid
                </span>
                <span class="price-box-val-gold">${formatCurrency(order.userBid)}</span>
                ${isWon 
                  ? `<span class="price-user-callout" style="background: rgba(16, 185, 129, 0.2); color: #34d399; border-color: rgba(16, 185, 129, 0.4);"><i class="fa-solid fa-trophy"></i> Won - P2P Rights Unlocked</span>`
                  : (isWinning 
                    ? `<span class="price-user-callout"><i class="fa-solid fa-crown"></i> You are highest bidder</span>` 
                    : `<span class="price-user-callout" style="background: rgba(239, 68, 68, 0.15); color: #fca5a5;"><i class="fa-solid fa-triangle-exclamation"></i> Outbid - Raise to win</span>`)}
              </div>
            </div>

            <div class="matrix-secondary-row">
              <div class="matrix-sub-item">
                <span class="label">Start Price</span>
                <span class="value">${formatCurrency(order.startPrice)}</span>
              </div>
              <div class="matrix-sub-item">
                <span class="label">Min. Increment</span>
                <span class="value">+${formatCurrency(order.bidIncrement || 1000)}</span>
              </div>
              <div class="matrix-sub-item">
                <span class="label">Order Status</span>
                <span class="value" style="color: ${isWon ? '#10b981' : (isWinning ? '#34d399' : '#fb923c')}; font-weight: 700;">${currentStatus}</span>
              </div>
            </div>
          </div>

          <!-- Countdown Box -->
          <div class="order-timer-card ${isWon ? 'order-timer-won' : ''}">
            <div class="timer-label-box">
              <i class="${isWon ? 'fa-solid fa-trophy' : 'fa-regular fa-clock'}" style="${isWon ? 'color: #f59e0b;' : ''}"></i>
              <div>
                <strong style="display: block; font-size: 0.88rem; color: #fff;">${isWon ? 'Auction Concluded (การประมูลสิ้นสุดแล้ว)' : 'Time Remaining (เวลาประมูลคงเหลือ)'}</strong>
                <span style="font-size: 0.78rem; color: #94a3b8;">${isWon ? 'คุณเป็นผู้ชนะการประมูลอันดับ 1' : `สิ้นสุด: ${new Date(order.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}`}</span>
              </div>
            </div>
            <span class="timer-countdown-text" style="${isWon ? 'color: #10b981;' : ''}">${isWon ? '<i class="fa-solid fa-circle-check"></i> Won' : timerText}</span>
          </div>

          <!-- CTA Buttons & Lock Notice -->
          <div class="order-cta-group">
            ${isWon ? `
              <button type="button" class="btn btn-order-p2p-cta" onclick="openSellerP2PChat('${order.orderId}')">
                <i class="fa-solid fa-comments"></i> Open P2P Chat with Seller
              </button>
            ` : (isWinning ? `
              <button type="button" class="btn btn-order-raise btn-bid-locked" disabled title="คุณเป็นผู้ให้ราคาสูงสุดแล้ว (${formatCurrency(order.userBid)}) ไม่สามารถเปิดบิดซ้ำจนกว่าจะมีผู้ประมูลอื่นเสนอราคาแข่ง">
                <i class="fa-solid fa-lock"></i> You Hold Highest Bid (รอผู้ประมูลอื่น)
              </button>
            ` : `
              <button type="button" class="btn btn-order-raise btn-outbid-pulse" onclick="openBidModal('${order.itemId}')">
                <i class="fa-solid fa-gavel"></i> Raise Bid (เสนอราคาเพิ่ม)
              </button>
            `)}
            <button type="button" class="btn btn-order-secondary" onclick="openDetailModal('${order.itemId}')">
              <i class="fa-regular fa-file-lines"></i> View Full Specs
            </button>
          </div>

          <!-- Informative Lock or Outbid or Won Banner -->
          ${isWon ? `
            <div class="order-won-banner">
              <div class="won-banner-icon"><i class="fa-solid fa-trophy"></i></div>
              <div class="won-banner-info">
                <strong>Auction Won — Escrow & P2P Rights Active!</strong>
                <span>ยินดีด้วย! คุณชนะการประมูลรายการนี้ในราคา <strong>${formatCurrency(order.userBid)}</strong> สิทธิ์การสนทนาส่วนตัว (P2P Chat) กับผู้ขาย [@${seller.nickname}] เปิดใช้งานแล้ว พร้อมระบบ STARTASS Escrow คุ้มครองความปลอดภัย 100%</span>
              </div>
            </div>
          ` : (isWinning ? `
            <div class="order-bid-lock-banner">
              <div class="bid-lock-icon"><i class="fa-solid fa-shield-halved"></i></div>
              <div class="bid-lock-info">
                <strong>Bidding Locked — You Hold the Highest Bid</strong>
                <span>คุณได้เสนอราคาสูงสุดไว้ที่ <strong>${formatCurrency(order.userBid)}</strong> ขณะนี้คุณเป็นผู้นำการประมูล ระบบจะล็อกไม่ให้เสนอราคาซ้ำจนกว่าจะมีผู้ประมูลรายอื่นเสนอราคาสูงกว่าคุณ</span>
              </div>
            </div>
          ` : `
            <div class="order-bid-outbid-banner">
              <div class="bid-outbid-icon"><i class="fa-solid fa-triangle-exclamation"></i></div>
              <div class="bid-outbid-info">
                <strong>Bidding Unlocked — You Have Been Outbid!</strong>
                <span>มีผู้เสนอราคาสูงกว่าคุณที่ <strong>${formatCurrency(currentBidAmount)}</strong> ขณะนี้ระบบปลดล็อกให้คุณสามารถเสนอราคาเพิ่ม (Raise Bid) เพื่อกลับมาเป็นผู้นำได้ทันที!</span>
              </div>
            </div>
          `)}
        </div>
      </div>

    </div>

    <!-- TOGGLE SECTION: History vs Current Views vs P2P Seller Chat -->
    <section class="order-toggle-section">
      <!-- Tabs Switcher -->
      <div class="order-toggle-tabs" role="tablist">
        <button type="button" class="order-tab-btn ${activeOrderTab === 'current' ? 'active' : ''}" id="tabBtnCurrent" onclick="switchOrderTab('current')">
          <i class="fa-solid fa-chart-pie"></i>
          <span>Current View (ภาพรวมคำสั่งซื้อปัจจุบัน)</span>
        </button>
        <button type="button" class="order-tab-btn ${activeOrderTab === 'history' ? 'active' : ''}" id="tabBtnHistory" onclick="switchOrderTab('history')">
          <i class="fa-solid fa-clock-rotate-left"></i>
          <span>History View (ประวัติการเสนอราคาทั้งหมด)</span>
          <span class="order-tab-badge">${bidHistory.length}</span>
        </button>
        <button type="button" class="order-tab-btn ${activeOrderTab === 'chat' ? 'active' : ''}" id="tabBtnChat" onclick="switchOrderTab('chat')">
          <i class="fa-solid fa-comments"></i>
          <span>P2P Seller Chat (สนทนากับผู้ขาย)</span>
          ${isWon 
            ? `<span class="order-tab-badge badge-p2p-unlocked"><i class="fa-solid fa-lock-open"></i> P2P Active</span>` 
            : `<span class="order-tab-badge badge-p2p-locked"><i class="fa-solid fa-lock"></i> Locked</span>`}
        </button>
      </div>

      <!-- Tab Content Area -->
      <div class="order-tab-content">
        
        <!-- PANE 1: Current View -->
        <div class="tab-pane ${activeOrderTab === 'current' ? 'active' : ''}" id="paneCurrent">
          <div class="current-view-grid">
            
            <!-- Specifications & Features -->
            <div class="info-box-card">
              <h4><i class="fa-solid fa-certificate"></i> Certified Specifications (คุณสมบัติและสเปก)</h4>
              <ul class="order-spec-list">
                ${specsHtml}
              </ul>
            </div>

            <!-- Escrow & Buyer Protection Terms -->
            <div class="info-box-card">
              <h4><i class="fa-solid fa-shield-check"></i> Escrow & Buyer Guarantee (การคุ้มครองผู้ซื้อ)</h4>
              
              <div class="escrow-feature-item">
                <div class="escrow-icon"><i class="fa-solid fa-vault"></i></div>
                <div class="escrow-text">
                  <strong>STARTASS Escrow Vault</strong>
                  <span>เงินประกันของคุณจะถูกจัดเก็บในระบบ Escrow ปลอดภัย 100% จนกว่าการประมูลจะสิ้นสุดและคุณได้รับสินค้า</span>
                </div>
              </div>

              <div class="escrow-feature-item">
                <div class="escrow-icon"><i class="fa-solid fa-truck-fast"></i></div>
                <div class="escrow-text">
                  <strong>White-Glove Insured Delivery</strong>
                  <span>ขนส่งพร้อมประกันภัยเต็มมูลค่า พร้อมเจ้าหน้าที่ตรวจสอบความถูกต้องก่อนส่งมอบ</span>
                </div>
              </div>

              <div class="escrow-feature-item" style="margin-bottom: 0;">
                <div class="escrow-icon"><i class="fa-solid fa-handshake"></i></div>
                <div class="escrow-text">
                  <strong>Seller Authenticity Bond</strong>
                  <span>ผู้ขาย [@${seller.nickname || 'ApexMotors_NY'}] ผ่านการยืนยันตัวตนและการันตีของแท้ 100%</span>
                </div>
              </div>

            </div>

          </div>
        </div>

        <!-- PANE 2: History View -->
        <div class="tab-pane ${activeOrderTab === 'history' ? 'active' : ''}" id="paneHistory">
          <div class="history-timeline-container">
            <div class="history-timeline-header">
              <span class="history-timeline-title">
                <i class="fa-solid fa-list-ol"></i> Bidding Audit Log (บันทึกไทม์ไลน์การเสนอราคาทั้งหมด)
              </span>
              <span style="font-size: 0.84rem; color: #94a3b8;">
                อัปเดตล่าสุด: ${order.updatedAt || 'เมื่อสักครู่'}
              </span>
            </div>

            <!-- Bid History Timeline -->
            <div class="bid-timeline-list">
              ${historyHtml}
            </div>
          </div>
        </div>

        <!-- PANE 3: P2P Seller Chat -->
        <div class="tab-pane ${activeOrderTab === 'chat' ? 'active' : ''}" id="paneChat">
          ${renderP2PSection(order.orderId)}
        </div>

      </div>
    </section>
  `;
}

function switchOrderTab(tabName) {
  activeOrderTab = tabName;
  const btnCurrent = document.getElementById('tabBtnCurrent');
  const btnHistory = document.getElementById('tabBtnHistory');
  const btnChat = document.getElementById('tabBtnChat');
  const paneCurrent = document.getElementById('paneCurrent');
  const paneHistory = document.getElementById('paneHistory');
  const paneChat = document.getElementById('paneChat');

  if (btnCurrent) btnCurrent.classList.toggle('active', tabName === 'current');
  if (btnHistory) btnHistory.classList.toggle('active', tabName === 'history');
  if (btnChat) btnChat.classList.toggle('active', tabName === 'chat');
  if (paneCurrent) paneCurrent.classList.toggle('active', tabName === 'current');
  if (paneHistory) paneHistory.classList.toggle('active', tabName === 'history');
  if (paneChat) paneChat.classList.toggle('active', tabName === 'chat');

  if (tabName === 'chat') {
    setTimeout(scrollP2PChatToBottom, 100);
  }
}

function switchOrderMainImage(url, thumbEl) {
  const mainImg = document.getElementById('orderMainImg');
  if (mainImg) mainImg.src = url;
  if (thumbEl && thumbEl.parentElement) {
    thumbEl.parentElement.querySelectorAll('.order-gallery-thumb').forEach(t => t.classList.remove('active'));
    thumbEl.classList.add('active');
  }
}

// ==========================================================================
// STANDALONE P2P CHAT ENGINE (pages/chat.html)
// Conversation History, Current Chat, Timestamps, Read Receipts & Owner Deal Card
// ==========================================================================
let activeStandaloneChatOrderId = 'ORD-AUC-02';
let activeStandaloneChatFilter = 'all';

function initChatPage() {
  const container = document.getElementById('standaloneChatContainer');
  if (!container) return;

  const urlParams = new URLSearchParams(window.location.search);
  const targetOrderId = urlParams.get('orderId') || urlParams.get('id');

  const chats = loadP2PChats();
  const chatKeys = Object.keys(chats);

  if (targetOrderId && chats[targetOrderId]) {
    activeStandaloneChatOrderId = targetOrderId;
  } else if (!chats[activeStandaloneChatOrderId] && chatKeys.length > 0) {
    activeStandaloneChatOrderId = chatKeys[0];
  }

  // Mark current conversation as read
  if (chats[activeStandaloneChatOrderId]) {
    chats[activeStandaloneChatOrderId].unreadCount = 0;
    chats[activeStandaloneChatOrderId].lastMessageIsRead = true;
    (chats[activeStandaloneChatOrderId].messages || []).forEach(m => {
      m.isRead = true;
    });
    saveP2PChats(chats);
  }

  renderStandaloneChatConversations(activeStandaloneChatFilter);
  renderStandaloneCurrentChat(activeStandaloneChatOrderId);
  updateNavChatBadge();
}

function updateNavChatBadge() {
  const chats = loadP2PChats();
  let totalUnread = 0;
  Object.values(chats).forEach(c => {
    totalUnread += (c.unreadCount || 0);
  });

  const badges = document.querySelectorAll('.chat-nav-badge, #navChatBadge');
  badges.forEach(b => {
    b.textContent = totalUnread;
    b.style.display = totalUnread > 0 ? 'inline-flex' : 'none';
  });
}

function setChatFilter(filterType, btnEl) {
  activeStandaloneChatFilter = filterType;
  const filterBtns = document.querySelectorAll('.btn-chat-filter');
  filterBtns.forEach(b => b.classList.remove('active'));
  if (btnEl) btnEl.classList.add('active');

  renderStandaloneChatConversations(filterType);
}

function filterStandaloneChatList(query) {
  const q = (query || '').toLowerCase().trim();
  const clearBtn = document.getElementById('chatSearchClearBtn');
  if (clearBtn) {
    clearBtn.style.display = q.length > 0 ? 'flex' : 'none';
  }

  const items = document.querySelectorAll('.chat-conv-item');
  items.forEach(el => {
    const text = el.textContent.toLowerCase();
    el.style.display = text.includes(q) ? 'flex' : 'none';
  });
}

function clearStandaloneChatSearch() {
  const input = document.getElementById('chatSearchInput');
  const clearBtn = document.getElementById('chatSearchClearBtn');
  if (input) input.value = '';
  if (clearBtn) clearBtn.style.display = 'none';
  filterStandaloneChatList('');
}

function renderStandaloneChatConversations(filterType = 'all') {
  const listContainer = document.getElementById('chatConversationsList');
  if (!listContainer) return;

  const chats = loadP2PChats();
  let chatList = Object.values(chats);

  // Apply filters
  if (filterType === 'unread') {
    chatList = chatList.filter(c => (c.unreadCount > 0) || (c.lastMessageIsRead === false));
  } else if (filterType === 'won') {
    chatList = chatList.filter(c => c.status === 'WON');
  }

  const badgeCount = document.getElementById('chatConvCountBadge');
  if (badgeCount) {
    badgeCount.textContent = `${chatList.length} Active`;
  }

  if (chatList.length === 0) {
    listContainer.innerHTML = `
      <div class="chat-conv-empty">
        <i class="fa-regular fa-comment-dots" style="font-size:2rem; color:#64748b; margin-bottom:8px;"></i>
        <span style="color:#94a3b8; font-size:0.86rem;">No conversations found in this filter</span>
      </div>
    `;
    return;
  }

  listContainer.innerHTML = chatList.map(chat => {
    const isAct = chat.orderId === activeStandaloneChatOrderId;
    const seller = chat.seller || { nickname: 'Seller', avatar: '', name: 'Verified Seller' };
    const hasUnread = (chat.unreadCount > 0) || (chat.lastMessageIsRead === false);
    const lastMsgDate = chat.lastMessageDate || 'Today';
    const lastMsgTime = chat.lastMessageTime || 'Just now';
    const snippet = chat.lastMessageSnippet || (chat.messages && chat.messages.length > 0 ? chat.messages[chat.messages.length - 1].text : 'Ready for conversation...');

    return `
      <div class="chat-conv-item ${isAct ? 'active' : ''} ${hasUnread ? 'unread-item' : ''}" onclick="selectStandaloneChat('${chat.orderId}')" title="${chat.title}">
        <div class="conv-avatar-wrapper">
          <img src="${seller.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80'}" alt="${seller.nickname}" class="conv-avatar-img">
          <span class="conv-online-dot"></span>
        </div>

        <div class="conv-content-col">
          <div class="conv-top-line">
            <span class="conv-user-name">[ @${seller.nickname} ]</span>
            <span class="conv-timestamp">
              <i class="fa-regular fa-calendar-check" style="font-size:0.68rem;"></i> ${lastMsgDate} • ${lastMsgTime}
            </span>
          </div>

          <div class="conv-product-tag">
            <i class="fa-solid fa-tag"></i>
            <span>#${chat.orderId} • ${chat.title}</span>
          </div>

          <div class="conv-preview-row">
            <p class="conv-msg-preview">${snippet}</p>
            <div class="conv-status-pills">
              ${hasUnread ? `
                <span class="badge-read-status unread">
                  <span class="unread-pulse-dot"></span>
                  <span>Unread</span>
                </span>
                ${chat.unreadCount > 0 ? `<span class="conv-unread-number-badge">${chat.unreadCount}</span>` : ''}
              ` : `
                <span class="badge-read-status read">
                  <i class="fa-solid fa-check-double"></i>
                  <span>Read (อ่านแล้ว)</span>
                </span>
              `}
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function renderStandaloneCurrentChat(orderId) {
  const headerEl = document.getElementById('chatCurrentHeader');
  const dealStripEl = document.getElementById('chatLiveDealStrip');
  const timelineEl = document.getElementById('chatMessagesTimeline');
  if (!headerEl || !dealStripEl || !timelineEl) return;

  const chats = loadP2PChats();
  const chat = chats[orderId];
  if (!chat) return;

  const seller = chat.seller || {
    nickname: 'Seller',
    name: 'Verified Seller',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
    rating: '5.0 ★',
    verified: true,
    onlineStatus: 'Active now'
  };

  // 1. Render Header
  headerEl.innerHTML = `
    <div class="chat-header-profile-row">
      <button type="button" class="btn-chat-mobile-back" onclick="toggleStandaloneMobileSidebar()" title="Back to conversations">
        <i class="fa-solid fa-arrow-left"></i>
      </button>

      <div class="chat-header-avatar-wrap">
        <img src="${seller.avatar}" alt="${seller.nickname}" class="chat-header-avatar">
        <span class="chat-header-online-dot"></span>
      </div>

      <div class="chat-header-user-meta">
        <div class="chat-header-name-row">
          <span class="chat-header-username">[ @${seller.nickname} ]</span>
          <span class="chat-seller-verified-badge"><i class="fa-solid fa-shield-check"></i> Verified Seller</span>
          <span class="chat-escrow-badge"><i class="fa-solid fa-lock"></i> Escrow Deal</span>
        </div>
        <div class="chat-header-subinfo">
          <span>${seller.name}</span>
          <span>•</span>
          <span class="seller-rating-pill"><i class="fa-solid fa-star"></i> ${seller.rating || '5.0 ★'}</span>
          <span>•</span>
          <span style="color:#10b981;"><i class="fa-solid fa-circle" style="font-size:0.45rem;"></i> ${seller.onlineStatus || 'Active now'}</span>
        </div>
      </div>
    </div>

    <div class="chat-header-action-group">
      <a href="ordersdetail.html?orderId=${chat.orderId}" class="btn-view-order-link" title="เปิดหน้าดูคำสั่งซื้อแบบละเอียด">
        <i class="fa-solid fa-receipt"></i>
        <span>Order #${chat.orderId}</span>
      </a>
      <span class="chat-rights-pill">
        <i class="fa-solid fa-certificate"></i> P2P Rights Unlocked
      </span>
    </div>
  `;

  // 2. Render Live Deal Strip
  dealStripEl.innerHTML = `
    <div class="deal-strip-product-info">
      <img src="${chat.image}" alt="${chat.title}" class="deal-strip-img">
      <div class="deal-strip-titles">
        <div class="deal-strip-badge-row">
          <span class="deal-status-pill ${chat.status === 'WON' ? 'won' : 'active'}">
            <i class="${chat.status === 'WON' ? 'fa-solid fa-trophy' : 'fa-solid fa-gavel'}"></i>
            ${chat.status === 'WON' ? 'Won Auction' : 'Active Winning'}
          </span>
          <span class="deal-category-pill">${chat.categoryLabel || 'Exclusive Collectible'}</span>
          <span class="deal-order-tag">Order #${chat.orderId}</span>
        </div>
        <h4 class="deal-strip-product-title">${chat.title}</h4>
      </div>
    </div>

    <div class="deal-strip-price-matrix">
      <span class="deal-price-label"><i class="fa-solid fa-trophy"></i> Price Bids Latest:</span>
      <span class="deal-price-amount">${formatCurrency(chat.latestBid || chat.winningBid)}</span>
      <span class="deal-price-subtitle">${chat.status === 'WON' ? 'Winning Final Bid' : 'Highest Placed Bid'}</span>
    </div>
  `;

  // 3. Render Messages Timeline
  const messagesHtml = (chat.messages || []).map(m => {
    // System message
    if (m.sender === 'system') {
      return `
        <div class="chat-msg-system-row">
          <div class="chat-system-pill">
            <i class="fa-solid fa-shield-halved"></i>
            <span>${m.text}</span>
          </div>
          <span class="chat-system-timestamp">
            <i class="fa-regular fa-clock"></i> ${m.date || 'Sep 8, 2026'}, ${m.time || '12:00 PM'}
          </span>
        </div>
      `;
    }

    const isUser = m.sender === 'user';
    const isOwner = m.sender === 'seller' || m.isOwner;
    const avatar = isUser
      ? (currentUser && currentUser.avatar ? currentUser.avatar : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80')
      : (seller.avatar);
    const senderLabel = isUser ? 'Alexander Sterling (You)' : `[ @${seller.nickname} ] (Owner / Seller)`;

    // IF PART OWNER MESSAGES: SHOW PRODUCT AND PRICE BIDS LATEST
    let ownerProductCardHtml = '';
    if (isOwner) {
      const prod = m.product || {
        id: chat.itemId,
        orderId: chat.orderId,
        title: chat.title,
        image: chat.image,
        category: chat.category,
        categoryLabel: chat.categoryLabel,
        latestBid: chat.latestBid || chat.winningBid,
        bidStatus: chat.status === 'WON' ? 'Winning Bid (ผู้ชนะการประมูล)' : 'Highest Current Bid'
      };

      ownerProductCardHtml = `
        <div class="owner-product-bids-card">
          <div class="owner-card-top-bar">
            <span class="owner-card-tag"><i class="fa-solid fa-store"></i> Owner Auction Listing</span>
            <span class="owner-card-order-id">Order #${prod.orderId || chat.orderId}</span>
          </div>
          <div class="owner-card-main-content">
            <img src="${prod.image || chat.image}" alt="${prod.title || chat.title}" class="owner-card-thumb">
            <div class="owner-card-meta">
              <span class="owner-card-category"><i class="fa-solid fa-layer-group"></i> ${prod.categoryLabel || 'Exclusive Collectible'}</span>
              <h5 class="owner-card-title">${prod.title || chat.title}</h5>
              <div class="owner-card-bids-strip">
                <span class="owner-bid-label"><i class="fa-solid fa-gavel"></i> Price Bids Latest:</span>
                <span class="owner-bid-val">${formatCurrency(prod.latestBid || chat.winningBid)}</span>
                <span class="owner-bid-badge">${prod.bidStatus || 'Winning Bid'}</span>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    const msgDate = m.date || 'Sep 8, 2026';
    const msgTime = m.time || '12:00 PM';
    const isRead = m.isRead !== false; // true unless explicitly false

    return `
      <div class="chat-msg-row ${isUser ? 'msg-row-user' : 'msg-row-owner'}">
        <img src="${avatar}" alt="${senderLabel}" class="chat-msg-avatar" title="${senderLabel}">

        <div class="chat-msg-content-block">
          <div class="chat-msg-sender-name">${senderLabel}</div>

          <!-- If Owner Message: Show Product and Price Bids Latest -->
          ${ownerProductCardHtml}

          <!-- Message Speech Bubble -->
          <div class="chat-msg-bubble ${isUser ? 'bubble-user' : 'bubble-owner'}">
            ${m.text}
          </div>

          <!-- Message Time Date & Read/Not Read Status -->
          <div class="chat-msg-footer-meta">
            <span class="msg-datetime">
              <i class="fa-regular fa-calendar-check" style="font-size:0.68rem;"></i> ${msgDate}, ${msgTime}
            </span>
            <span class="msg-read-status ${isRead ? 'read' : 'sent'}">
              ${isRead 
                ? '<i class="fa-solid fa-check-double"></i> Read (อ่านแล้ว)' 
                : '<i class="fa-solid fa-check"></i> Sent (ส่งแล้ว)'}
            </span>
          </div>
        </div>
      </div>
    `;
  }).join('');

  timelineEl.innerHTML = messagesHtml;
  setTimeout(scrollStandaloneChatToBottom, 40);

  // Update Breadcrumb Current
  const breadcrumb = document.getElementById('chatBreadcrumbCurrent');
  if (breadcrumb) {
    breadcrumb.textContent = `P2P Chat: [ @${seller.nickname} ] - #${chat.orderId}`;
  }
}

function selectStandaloneChat(orderId) {
  activeStandaloneChatOrderId = orderId;
  const chats = loadP2PChats();
  if (chats[orderId]) {
    chats[orderId].unreadCount = 0;
    chats[orderId].lastMessageIsRead = true;
    (chats[orderId].messages || []).forEach(m => {
      m.isRead = true;
    });
    saveP2PChats(chats);
  }

  renderStandaloneChatConversations(activeStandaloneChatFilter);
  renderStandaloneCurrentChat(orderId);
  updateNavChatBadge();

  // On Mobile: hide sidebar and show chat window
  const container = document.getElementById('standaloneChatContainer');
  if (container && window.innerWidth <= 768) {
    container.classList.add('mobile-chat-active');
  }
}

function toggleStandaloneMobileSidebar() {
  const container = document.getElementById('standaloneChatContainer');
  if (container) {
    container.classList.toggle('mobile-chat-active');
  }
}

function scrollStandaloneChatToBottom() {
  const timelineEl = document.getElementById('chatMessagesTimeline');
  if (timelineEl) {
    timelineEl.scrollTop = timelineEl.scrollHeight;
  }
}

function handleSendStandaloneChatMessage(event) {
  if (event) event.preventDefault();
  const input = document.getElementById('standaloneMessageInput');
  if (!input) return;
  const text = input.value.trim();
  if (!text) return;

  const chats = loadP2PChats();
  const chat = chats[activeStandaloneChatOrderId];
  if (!chat) return;

  const todayDate = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const nowTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  const fullTs = `${todayDate}, ${nowTime}`;

  const newMsg = {
    id: 'msg-u-' + Date.now(),
    sender: 'user',
    isOwner: false,
    text: text,
    date: todayDate,
    time: nowTime,
    fullTimestamp: fullTs,
    isRead: false // Initially sent
  };

  chat.messages.push(newMsg);
  chat.lastMessageSnippet = text;
  chat.lastMessageDate = todayDate;
  chat.lastMessageTime = nowTime;
  chat.lastMessageFull = `${todayDate} • ${nowTime}`;
  chat.lastMessageIsRead = true;
  saveP2PChats(chats);

  input.value = '';
  renderStandaloneCurrentChat(activeStandaloneChatOrderId);
  renderStandaloneChatConversations(activeStandaloneChatFilter);
  scrollStandaloneChatToBottom();

  // Read receipt simulation after 1.2s
  setTimeout(() => {
    newMsg.isRead = true;
    saveP2PChats(chats);
    renderStandaloneCurrentChat(activeStandaloneChatOrderId);
  }, 1200);

  // Automated realistic reply from Owner after 2.0s
  setTimeout(() => {
    const updatedChats = loadP2PChats();
    const activeChat = updatedChats[activeStandaloneChatOrderId];
    if (!activeChat) return;

    const seller = activeChat.seller || { nickname: 'Seller', avatar: '', name: 'Verified Seller' };
    const replyReplies = [
      `Thank you for confirming, Alexander! Our curator team has logged your instructions for "${activeChat.title}". All original Certificates of Authenticity (COA) and security-sealed packaging are completed.`,
      `Received loud and clear, Alexander! Escrow disbursement clearance has been verified with STARTASS Vault. White-glove insured carrier dispatch is being arranged.`,
      `Understood, Alexander. We have securely prepped order #${activeChat.orderId} with museum UV-proof casing and climate stabilization for safe transport.`,
      `Got it! Thank you for the quick follow-up. Tracking telemetry and driver contact details will be shared directly in this P2P channel.`
    ];
    const replyText = replyReplies[Math.floor(Math.random() * replyReplies.length)];

    const replyDate = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const replyTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    const ownerReplyMsg = {
      id: 'msg-s-' + Date.now(),
      sender: 'seller',
      isOwner: true,
      senderName: `[ @${seller.nickname} ]`,
      senderAvatar: seller.avatar,
      product: {
        id: activeChat.itemId,
        orderId: activeChat.orderId,
        title: activeChat.title,
        image: activeChat.image,
        category: activeChat.category,
        categoryLabel: activeChat.categoryLabel,
        latestBid: activeChat.latestBid || activeChat.winningBid,
        bidStatus: activeChat.status === 'WON' ? 'Winning Bid (ผู้ชนะการประมูล)' : 'Highest Current Bid'
      },
      text: replyText,
      date: replyDate,
      time: replyTime,
      fullTimestamp: `${replyDate}, ${replyTime}`,
      isRead: true
    };

    activeChat.messages.push(ownerReplyMsg);
    activeChat.lastMessageSnippet = replyText;
    activeChat.lastMessageDate = replyDate;
    activeChat.lastMessageTime = replyTime;
    activeChat.lastMessageFull = `${replyDate} • ${replyTime}`;
    activeChat.lastMessageIsRead = true;
    saveP2PChats(updatedChats);

    renderStandaloneCurrentChat(activeStandaloneChatOrderId);
    renderStandaloneChatConversations(activeStandaloneChatFilter);
    scrollStandaloneChatToBottom();
    showToast(`💬 New reply from [ @${seller.nickname} ]: "${replyText.slice(0, 48)}..."`);
  }, 2000);
}

function handleStandaloneQuickPrompt(text) {
  const input = document.getElementById('standaloneMessageInput');
  if (input) {
    input.value = text;
    handleSendStandaloneChatMessage(null);
  }
}

// Initialization on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('auctionGrid')) {
    renderCards();
    setupCategoryFilters();
    updateStatsRibbon();
    setupImageDropZone();
  }

  if (document.getElementById('orderDetailContainer')) {
    initOrderDetailPage();
  }

  if (document.getElementById('standaloneChatContainer')) {
    initChatPage();
  }

  updateNavOrdersCount();
  updateNavChatBadge();
  updateNotificationBadge();
  renderNotificationsList();
  updateProfileUI();
  setInterval(updateCountdowns, 1000);

  // Close modals on clicking backdrop
  document.querySelectorAll('.modal-backdrop').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('open');
      }
    });
  });

  // Close profile and notification dropdowns when clicking outside
  document.addEventListener('click', (e) => {
    const wrapper = document.getElementById('profileDropdownWrapper');
    if (wrapper && !wrapper.contains(e.target)) {
      closeProfileDropdown();
    }
    const notifWrapper = document.getElementById('notificationDropdownWrapper');
    if (notifWrapper && !notifWrapper.contains(e.target)) {
      closeNotificationDropdown();
    }
  });
});
