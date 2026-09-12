/**
 * STARTASS AUCTIONS - Main JavaScript Engine
 * Handles Top 10 Bids display, category filtering, live countdowns, and bidding modals.
 */

// Cache Invalidation for Version 3 (Top 10 High-Value Default & Seller Provenance in Detail Modal)
const APP_VERSION = 'startass_v3_top10';
if (localStorage.getItem('startass_version') !== APP_VERSION) {
  localStorage.removeItem('startass_auctions');
  localStorage.removeItem('startass_orders');
  localStorage.removeItem('startass_p2p_chats');
  localStorage.removeItem('startass_notifications');
  localStorage.setItem('startass_version', APP_VERSION);
}

// Default Top 10 Auction Items Data (ภาษาไทย / THB Currency)
const DEFAULT_AUCTION_ITEMS = [
  {
    id: 'auc-01',
    rank: 1,
    title: '1967 Shelby GT500 Fastback "Eleanor Edition"',
    category: 'cars',
    categoryLabel: 'โมเดลรถยนต์ & ซูเปอร์คาร์',
    image: 'https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'เครื่องยนต์ 428 Cobra Jet V8 แท้ดั้งเดิม เกียร์ธรรมดา 4 สปีด สี Pepper Gray คาดลาย Le Mans สีดำ บูรณะเต็มระบบพร้อมเอกสารรับรองจาก Shelby Registry',
    startPrice: 5200000,
    currentBid: 16800000,
    startDate: '28 ส.ค. 2026, 10:00',
    endDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000 + 4 * 3600 * 1000).toISOString(),
    bidsCount: 42,
    specs: ['เครื่องยนต์ 428ci Cobra Jet V8 แท้', 'เกียร์ธรรมดา 4 สปีด Toploader', 'สีพิเศษ Pepper Gray คาดเส้นดำ Le Mans', 'ลายเซ็นแท้ Carroll Shelby บนแผงคอนโซล'],
    seller: {
      nickname: 'ApexMotors_NY',
      name: 'Apex Classic Motoring LLC',
      rating: '4.9 ★',
      reviewsCount: 128,
      verified: true,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80'
    },
    bidHistory: [
      { user: 'Alexander Sterling (คุณ)', amount: 16800000, time: '12 นาทีที่แล้ว' },
      { user: 'ApexMotors_NY', amount: 16000000, time: '1 ชั่วโมงที่แล้ว' },
      { user: 'VintageVault', amount: 15200000, time: '3 ชั่วโมงที่แล้ว' }
    ]
  },
  {
    id: 'auc-02',
    rank: 2,
    title: '1st Edition Shadowless Charizard #4/102 (PSA 10 Gem Mint)',
    category: 'cards',
    categoryLabel: 'การ์ดสะสมหายาก',
    image: 'https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'จอกศักดิ์สิทธิ์แห่งวงการการ์ดสะสม โปเกมอนการ์ดปี 1999 Base Set รุ่น Shadowless ลิซาร์ดอน เกรดสูงสุด PSA 10 ไร้ตำหนิ ศูนย์กลางคมชัด ขอบและพื้นผิวระดับสมบูรณ์แบบ',
    startPrice: 3100000,
    currentBid: 12500000,
    startDate: '30 ส.ค. 2026, 14:00',
    endDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000 + 11 * 3600 * 1000).toISOString(),
    bidsCount: 58,
    specs: ['ระดับการประเมิน: PSA 10 Gem Mint', 'รหัสใบรับรอง: #4829104', 'การ์ดโฮโลแกรม Shadowless ไร้เงา', 'เคสอะคริลิกกันรังสี UV เกรดพิพิธภัณฑ์'],
    seller: {
      nickname: 'KyotoVault_Cards',
      name: 'Kyoto Rare Collectibles Japan',
      rating: '5.0 ★',
      reviewsCount: 94,
      verified: true,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80'
    },
    bidHistory: [
      { user: 'PokeInvestor99', amount: 12500000, time: '5 นาทีที่แล้ว' },
      { user: 'KyotoCollectibles', amount: 11900000, time: '45 นาทีที่แล้ว' },
      { user: 'BlueEyesTrader', amount: 11000000, time: '2 ชั่วโมงที่แล้ว' }
    ]
  },
  {
    id: 'auc-03',
    rank: 3,
    title: 'Porsche 911 GT3 RS Weissach Package (2024)',
    category: 'cars',
    categoryLabel: 'โมเดลรถยนต์ & ซูเปอร์คาร์',
    image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'แพ็กเกจน้ำหนักเบา Weissach แท้จากโรงงาน ฝากระโปรงและหลังคาคาร์บอนไฟเบอร์ ล้อแมกนีเซียม เบรกเซรามิกคอมโพสิต (PCCB) ไมล์ส่งมอบเพียง 45 ไมล์เท่านั้น',
    startPrice: 7500000,
    currentBid: 10900000,
    startDate: '25 ส.ค. 2026, 09:00',
    endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000 + 8 * 3600 * 1000).toISOString(),
    bidsCount: 29,
    specs: ['เครื่องยนต์ Flat-6 4.0 ลิตร ไร้ระบบอัดอากาศ (518 แรงม้า)', 'ระบบเบรกคาร์บอนเซรามิกคอมโพสิต (PCCB)', 'ชุดแต่งน้ำหนักเบาคาร์บอน Weissach Package', 'เลขไมล์สะสมเพียง 45 ไมล์'],
    seller: {
      nickname: 'StuttgartExclusive',
      name: 'Stuttgart Heritage Auto Haus',
      rating: '4.8 ★',
      reviewsCount: 67,
      verified: true,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80'
    },
    bidHistory: [
      { user: 'StuttgartFanatic', amount: 10900000, time: '25 นาทีที่แล้ว' },
      { user: 'TrackDayHero', amount: 10500000, time: '2 ชั่วโมงที่แล้ว' },
      { user: 'MonacoGarage', amount: 10000000, time: '5 ชั่วโมงที่แล้ว' }
    ]
  },
  {
    id: 'auc-04',
    rank: 4,
    title: 'บอนไซสนชิมปากุญี่ปุ่น อายุ 180 ปี (Imperial Shimpaku Juniper)',
    category: 'trees',
    categoryLabel: 'บอนไซ & ไม้ด่างหายาก',
    image: 'https://images.unsplash.com/photo-1512428813834-c702c7702b78?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1512428813834-c702c7702b78?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'สายพันธุ์แท้จากคอลเลกชันระดับปรมาจารย์แห่งหมู่บ้านบอนไซโอมิยะ ซากไม้ธรรมชาติจินและชาริสุดวิจิตร พุ่มใบเขียวขจีแน่นสวย ปลูกในกระถางโบราณโทโคนาเมะปั้นมือ',
    startPrice: 1400000,
    currentBid: 6800000,
    startDate: '27 ส.ค. 2026, 11:30',
    endDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000 + 16 * 3600 * 1000).toISOString(),
    bidsCount: 33,
    specs: ['อายุประมาณ 180 ปี (พร้อมเอกสารรับรอง)', 'สายพันธุ์: Juniperus chinensis var. sargentii', 'กระถางเซรามิกโบราณโทโคนาเมะ ศตวรรษที่ 19', 'ใบรับรองการส่งออกพืชพรรณทางการ'],
    seller: {
      nickname: 'ZenMasterBotanics',
      name: 'Omiya Master Bonsai Collection',
      rating: '4.9 ★',
      reviewsCount: 42,
      verified: true,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&q=80'
    },
    bidHistory: [
      { user: 'ZenBotanics_Tokyo', amount: 6800000, time: '18 นาทีที่แล้ว' },
      { user: 'BotanicalArboretum', amount: 6200000, time: '3 ชั่วโมงที่แล้ว' },
      { user: 'GreenHeritage', amount: 5700000, time: '6 ชั่วโมงที่แล้ว' }
    ]
  },
  {
    id: 'auc-05',
    rank: 5,
    title: 'ระบบคอมพิวเตอร์ Apple-1 ดั้งเดิม สภาพใช้งานได้สมบูรณ์ (1976)',
    category: 'tech',
    categoryLabel: 'เทคโนโลยี & ซูเปอร์คอมพิวเตอร์',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80'
    ],
    description: '1 ใน 63 บอร์ด Apple-1 ที่ยังคงหลงเหลืออยู่ในโลก ประกอบด้วยมือโดย Steve Wozniak และ Steve Jobs ใช้งานได้เต็มรูปแบบ ตรวจสอบโดย Corey Cohen พร้อมจอ Sanyo และคีย์บอร์ด Datanetics ยุคดั้งเดิม',
    startPrice: 2900000,
    currentBid: 6200000,
    startDate: '29 ส.ค. 2026, 08:00',
    endDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000 + 7 * 3600 * 1000).toISOString(),
    bidsCount: 38,
    specs: ['ไมโครโปรเซสเซอร์ MOS 6502 ทำงานที่ 1MHz', 'แรมออนบอร์ด 4KB (ขยายได้)', 'การ์ดเชื่อมต่อเทปคาสเซ็ต Apple Cassette Interface (ACI) ดั้งเดิม', 'จดหมายรับรองความแท้ดั้งเดิม'],
    seller: {
      nickname: 'SiliconHeritage_CA',
      name: 'Silicon Valley Artifacts Society',
      rating: '5.0 ★',
      reviewsCount: 88,
      verified: true,
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=120&q=80'
    },
    bidHistory: [
      { user: 'SiliconMuseum_SF', amount: 6200000, time: '30 นาทีที่แล้ว' },
      { user: 'TechPioneerVentures', amount: 5800000, time: '2 ชั่วโมงที่แล้ว' },
      { user: 'ByteHistorian', amount: 5200000, time: '4 ชั่วโมงที่แล้ว' }
    ]
  },
  {
    id: 'auc-06',
    rank: 6,
    title: 'Magic: The Gathering Alpha Black Lotus (BGS 9.5 Gem Mint)',
    category: 'cards',
    categoryLabel: 'การ์ดสะสมหายาก',
    image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'สุดยอดจุดสูงสุดแห่งประวัติศาสตร์ MTG การ์ดชุด Alpha ปี 1993 วาดภาพโดย Christopher Rush คะแนนย่อยสมบูรณ์แบบ: Centering 9.5, Corners 9.5, Edges 9.5, Surface 9.0',
    startPrice: 2400000,
    currentBid: 5600000,
    startDate: '26 ส.ค. 2026, 13:00',
    endDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000 + 19 * 3600 * 1000).toISOString(),
    bidsCount: 26,
    specs: ['การจัดเกรด Beckett: BGS 9.5 Gem Mint', 'รุ่น Alpha ปี 1993 ฉบับจำกัดจำนวน', 'คะแนนย่อย: 9.5 / 9.5 / 9.5 / 9.0', 'ศิลปินผู้วาด: Christopher Rush'],
    seller: {
      nickname: 'PlaneswalkerGuild',
      name: 'Planeswalker High-End Vault',
      rating: '4.9 ★',
      reviewsCount: 115,
      verified: true,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80'
    },
    bidHistory: [
      { user: 'ManaVaultCapital', amount: 5600000, time: '40 นาทีที่แล้ว' },
      { user: 'PlaneswalkerGuild', amount: 5300000, time: '1 ชั่วโมงที่แล้ว' },
      { user: 'SeattleCardRoom', amount: 4800000, time: '3 ชั่วโมงที่แล้ว' }
    ]
  },
  {
    id: 'auc-07',
    rank: 7,
    title: 'แร็กซูเปอร์คอมพิวเตอร์ Silicon Graphics Onyx2 Ultimate Reality',
    category: 'tech',
    categoryLabel: 'เทคโนโลยี & ซูเปอร์คอมพิวเตอร์',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'ตำนานซูเปอร์คอมพิวเตอร์ยุค 90s ใช้ในอุตสาหกรรมการบินและภาพยนตร์ฮอลลีวูด ตัวถังสีม่วงอันเป็นเอกลักษณ์ ขับเคลื่อนด้วยโปรเซสเซอร์ MIPS R10000 16 ตัว พร้อม RealityEngine 4 ไพป์ ติดตั้ง IRIX 6.5 บูรณะสมบูรณ์',
    startPrice: 1200000,
    currentBid: 4300000,
    startDate: '28 ส.ค. 2026, 15:00',
    endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000 + 12 * 3600 * 1000).toISOString(),
    bidsCount: 21,
    specs: ['โปรเซสเซอร์ MIPS R10000 ความเร็ว 250MHz จำนวน 16 คอร์', 'ระบบประมวลผลกราฟิก InfiniteReality3', 'ติดตั้งระบบปฏิบัติการ IRIX 6.5.30 พร้อมซอฟต์แวร์ Alias/Wavefront', 'สายเชื่อมต่อและคู่มือต้นฉบับปี 1998 ครบชุด'],
    seller: {
      nickname: 'RetroFoundry_Sys',
      name: 'Retro Supercomputing Heritage',
      rating: '4.7 ★',
      reviewsCount: 39,
      verified: true,
      avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=120&q=80'
    },
    bidHistory: [
      { user: 'HoloComputeLab', amount: 4300000, time: '55 นาทีที่แล้ว' },
      { user: 'RetroSiliconFoundry', amount: 3900000, time: '4 ชั่วโมงที่แล้ว' },
      { user: 'SupercomputeArch', amount: 3400000, time: '8 ชั่วโมงที่แล้ว' }
    ]
  },
  {
    id: 'auc-08',
    rank: 8,
    title: 'ชุดโครงซิมูเลเตอร์เทเลเมทรี McLaren F1 GTR 1994 พร้อมแชสซีคาร์บอนแท้',
    category: 'tech',
    categoryLabel: 'เทคโนโลยี & ซูเปอร์คอมพิวเตอร์',
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'ซิมูเลเตอร์มอเตอร์สปอร์ตคัสตอมระดับพรีเมียม สร้างบนโครงคาร์บอนคอมโพสิตน้ำหนักเบาแท้ พร้อมระบบไฮดรอลิกเคลื่อนไหวอุตสาหกรรม จอโค้งพาโนรามา Quad-4K และระบบเทเลเมทรี MoTeC แท้',
    startPrice: 1000000,
    currentBid: 3800000,
    startDate: '31 ส.ค. 2026, 10:00',
    endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000 + 2 * 3600 * 1000).toISOString(),
    bidsCount: 19,
    specs: ['แท่นไฮดรอลิก 6 ทิศทาง (6-DOF) ตอบสนองแรงสั่นสะเทือนสมจริง', 'ค็อกพิตโครงสร้างคาร์บอนไฟเบอร์โมโนค็อกแท้', 'หน้าปัด MoTeC แท้ และชุดแป้นเหยียบแข่ง Sparco', 'โหนดประมวลผลการจำลอง Dual RTX 4090'],
    seller: {
      nickname: 'SilverstoneRacer',
      name: 'Silverstone Motorsport Sim Lab',
      rating: '4.9 ★',
      reviewsCount: 52,
      verified: true,
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&q=80'
    },
    bidHistory: [
      { user: 'SilverstoneRacer', amount: 3800000, time: '1 ชั่วโมงที่แล้ว' },
      { user: 'SimDynamics_UK', amount: 3400000, time: '5 ชั่วโมงที่แล้ว' },
      { user: 'ProRacingGlobal', amount: 3100000, time: '1 วันที่แล้ว' }
    ]
  },
  {
    id: 'auc-09',
    rank: 9,
    title: 'บอนไซเมเปิ้ลญี่ปุ่นโบราณอายุ 95 ปี (Momiji Acer Palmatum)',
    category: 'trees',
    categoryLabel: 'บอนไซ & ไม้ด่างหายาก',
    image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512428813834-c702c7702b78?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'บอนไซเมเปิ้ลภูเขาญี่ปุ่นอายุ 95 ปีอันทรงคุณค่า ใบเปลี่ยนสีแดงเพลิงงดงามจับตาในฤดูใบไม้ร่วง ทรงพุ่มแบบไม้กวาดสมดุลสง่างาม พร้อมฐานรากเนบาริแผ่กว้างตระการตา',
    startPrice: 700000,
    currentBid: 3300000,
    startDate: '29 ส.ค. 2026, 09:30',
    endDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000 + 20 * 3600 * 1000).toISOString(),
    bidsCount: 24,
    specs: ['อายุประมาณ 95 ปี', 'รูปแบบทรงต้น: Hoki-dachi (ทรงไม้กวาด)', 'ความสูง 38 นิ้ว / ความกว้างฐานรากเนบาริ 14 นิ้ว', 'ผ่านการเพาะเลี้ยงปรับสภาพในเรือนกระจกมาตรฐานสูง'],
    seller: {
      nickname: 'BonsaiKyotoGarden',
      name: 'Kyoto Imperial Botanical Heritage',
      rating: '5.0 ★',
      reviewsCount: 63,
      verified: true,
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=120&q=80'
    },
    bidHistory: [
      { user: 'KyotoGardener', amount: 3300000, time: '2 ชั่วโมงที่แล้ว' },
      { user: 'BonsaiCollector_CH', amount: 3000000, time: '6 ชั่วโมงที่แล้ว' },
      { user: 'BotanicaLover', amount: 2700000, time: '12 ชั่วโมงที่แล้ว' }
    ]
  },
  {
    id: 'auc-10',
    rank: 10,
    title: '1970 Dodge Charger R/T 426 HEMI (สี B5 Blue Fire Metallic)',
    category: 'cars',
    categoryLabel: 'โมเดลรถยนต์ & ซูเปอร์คาร์',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'เครื่องยนต์ 426 HEMI V8 (425 แรงม้า) แท้จากโรงงาน เกียร์อัตโนมัติ Torqueflite ตัวถังสีน้ำเงิน B5 Blue Metallic หลังคาไวนิลสีดำ พร้อมแผ่นสูติบัตร Broadcast Sheet ดั้งเดิมและรายงานตรวจสภาพ Galen Govier',
    startPrice: 1500000,
    currentBid: 3200000,
    startDate: '27 ส.ค. 2026, 16:00',
    endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000 + 5 * 3600 * 1000).toISOString(),
    bidsCount: 31,
    specs: ['เครื่องยนต์ 426ci Street HEMI V8 ดั้งเดิม', 'คาร์บูเรเตอร์ Carter 4 บาร์เรลคู่', 'สีพิเศษ B5 Blue Fire Metallic ดั้งเดิม', 'ใบรับรอง Galen Govier เป็น 1 ใน 112 คันที่ผลิต'],
    seller: {
      nickname: 'DetroitMuscle_Classic',
      name: 'Detroit Auto Heritage Collectibles',
      rating: '4.8 ★',
      reviewsCount: 81,
      verified: true,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80'
    },
    bidHistory: [
      { user: 'MoparMuscleClub', amount: 3200000, time: '15 นาทีที่แล้ว' },
      { user: 'DetroitIron', amount: 3000000, time: '3 ชั่วโมงที่แล้ว' },
      { user: 'HighwayLegend', amount: 2700000, time: '7 ชั่วโมงที่แล้ว' }
    ]
  },
  {
    id: 'auc-11',
    rank: 11,
    title: '1969 Ford Mustang Boss 429 Fastback (Raven Black)',
    category: 'cars',
    categoryLabel: 'โมเดลรถยนต์ & ซูเปอร์คาร์',
    image: 'https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'เครื่องยนต์ Boss 429 V8 ขุมพลัง 375 แรงม้า เกียร์ธรรมดา 4 สปีด ตัวถังสีดำ Raven Black ผลิตจำนวนจำกัด สภาพอนุรักษ์สมบูรณ์ระดับประกวดงาน Concours d\'Elegance',
    startPrice: 1200000,
    currentBid: 2900000,
    startDate: '26 ส.ค. 2026, 11:00',
    endDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000 + 3 * 3600 * 1000).toISOString(),
    bidsCount: 22,
    specs: ['เครื่องยนต์ Boss 429ci NASCAR V8 ดั้งเดิม', 'ฝาสูบอะลูมิเนียม Semi-Hemi พิเศษ', 'ตัวถังประกอบมือโดย Kar Kraft (KK #1842)', 'สมุดประวัติและเอกสาร Marti Report ตัวจริง'],
    seller: {
      nickname: 'ApexMotors_NY',
      name: 'Apex Classic Motoring LLC',
      rating: '4.9 ★',
      reviewsCount: 128,
      verified: true,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80'
    },
    bidHistory: [
      { user: 'MustangClub_USA', amount: 2900000, time: '40 นาทีที่แล้ว' },
      { user: 'ClassicSpeedShop', amount: 2700000, time: '2 ชั่วโมงที่แล้ว' }
    ]
  },
  {
    id: 'auc-12',
    rank: 12,
    title: '1986 Fleer Michael Jordan #57 Rookie Card (PSA 9 Mint)',
    category: 'cards',
    categoryLabel: 'การ์ดสะสมหายาก',
    image: 'https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'การ์ดรุกกี้ตัวจริงของตำนานบาสเกตบอล Michael Jordan ชุด Fleer ปี 1986 ได้รับการจัดเกรดระดับ PSA 9 Mint ศูนย์กลางภาพสมดุล สีสันสดใส ขอบคมชัด ไร้รอยยับหรือริ้วรอย',
    startPrice: 1100000,
    currentBid: 2600000,
    startDate: '30 ส.ค. 2026, 12:00',
    endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000 + 1 * 3600 * 1000).toISOString(),
    bidsCount: 19,
    specs: ['การจัดเกรด: PSA 9 Mint', 'การ์ดรุกกี้ปี 1986 Fleer หมายเลข #57', 'เคสผนึกสุญญากาศกันรังสี UV พร้อมชิป NFC ตรวจสอบความแท้', 'ใบรับรองความแท้จากสถาบัน PSA'],
    seller: {
      nickname: 'KyotoVault_Cards',
      name: 'Kyoto Rare Collectibles Japan',
      rating: '5.0 ★',
      reviewsCount: 94,
      verified: true,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80'
    },
    bidHistory: [
      { user: 'BullsDynasty_Collector', amount: 2600000, time: '1 ชั่วโมงที่แล้ว' },
      { user: 'AirJordanVault', amount: 2400000, time: '4 ชั่วโมงที่แล้ว' }
    ]
  },
  {
    id: 'auc-13',
    rank: 13,
    title: 'โมดูลหน่วยความจำและวงจรลอจิก Cray-1 Supercomputer (1975)',
    category: 'tech',
    categoryLabel: 'เทคโนโลยี & ซูเปอร์คอมพิวเตอร์',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'แผงวงจรต้นฉบับของซูเปอร์คอมพิวเตอร์ Cray-1 ออกแบบโดย Seymour Cray เดินสายไวร์แรปด้วยมือ มีลายเซ็นวิศวกรต้นสังกัด พร้อมกล่องกระจกตั้งแสดงพิพิธภัณฑ์ระดับพรีเมียม',
    startPrice: 900000,
    currentBid: 2200000,
    startDate: '28 ส.ค. 2026, 17:00',
    endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000 + 9 * 3600 * 1000).toISOString(),
    bidsCount: 16,
    specs: ['แผงโมดูลลอจิก Cray Research หมายเลขซีเรียล SN-04', 'การเดินสายถักทองแดงความเร็วสูงระดับประวัติศาสตร์คอมพิวเตอร์', 'ตู้จัดแสดงอะคริลิกเกรดอนุรักษ์ พร้อมฐานไม้วอลนัตแท้', 'เอกสารรับรองจากพิพิธภัณฑ์ประวัติศาสตร์คอมพิวเตอร์'],
    seller: {
      nickname: 'RetroFoundry_Sys',
      name: 'Retro Supercomputing Heritage',
      rating: '4.7 ★',
      reviewsCount: 39,
      verified: true,
      avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=120&q=80'
    },
    bidHistory: [
      { user: 'TechCurator_MIT', amount: 2200000, time: '2 ชั่วโมงที่แล้ว' },
      { user: 'SiliconMuseum_SF', amount: 2000000, time: '6 ชั่วโมงที่แล้ว' }
    ]
  },
  {
    id: 'auc-14',
    rank: 14,
    title: 'บอนไซต้นสนดำญี่ปุ่น คุโรมัตสึ อายุ 120 ปี (Kuromatsu Black Pine)',
    category: 'trees',
    categoryLabel: 'บอนไซ & ไม้ด่างหายาก',
    image: 'https://images.unsplash.com/photo-1512428813834-c702c7702b78?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1512428813834-c702c7702b78?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'ต้นสนดำญี่ปุ่นเปลือกแตกลายเกล็ดเต่าธรรมชาติอันทรงเกียรติ พุ่มใบเข็มสั้นเขียวเข้มสง่างาม ผ่านการดัดทรง Moyogi (ทรงเอี้ยวสละสลวย) โดยช่างบอนไซรุ่นที่สามแห่งชิบะ',
    startPrice: 800000,
    currentBid: 1800000,
    startDate: '27 ส.ค. 2026, 14:00',
    endDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000 + 11 * 3600 * 1000).toISOString(),
    bidsCount: 14,
    specs: ['อายุประมาณ 120 ปี (Pinus thunbergii)', 'เปลือกไม้เกล็ดเต่าทรงพลัง (Kame-kō)', 'กระถางดินเผาอิบารากิโบราณแบบดั้งเดิม', 'เอกสารรับรองสุขอนามัยพืชสากล'],
    seller: {
      nickname: 'ZenMasterBotanics',
      name: 'Omiya Master Bonsai Collection',
      rating: '4.9 ★',
      reviewsCount: 42,
      verified: true,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&q=80'
    },
    bidHistory: [
      { user: 'KyotoArboretum', amount: 1800000, time: '3 ชั่วโมงที่แล้ว' },
      { user: 'ZenBotanics_Tokyo', amount: 1600000, time: '7 ชั่วโมงที่แล้ว' }
    ]
  }
];

// Helper to dynamically sort and calculate ranks across all items
function sortAndRankAuctions() {
  if (!Array.isArray(AUCTION_ITEMS)) return;
  AUCTION_ITEMS.sort((a, b) => b.currentBid - a.currentBid);
  AUCTION_ITEMS.forEach((item, index) => {
    item.rank = index + 1;
  });
}

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
        parsed.sort((a, b) => b.currentBid - a.currentBid);
        parsed.forEach((item, index) => {
          item.rank = index + 1;
        });
        return parsed;
      }
    } catch (e) {
      console.error('Failed to parse saved auctions:', e);
    }
  }
  const defaultItems = JSON.parse(JSON.stringify(DEFAULT_AUCTION_ITEMS));
  defaultItems.sort((a, b) => b.currentBid - a.currentBid);
  defaultItems.forEach((item, index) => {
    item.rank = index + 1;
  });
  return defaultItems;
}

function saveAuctions() {
  try {
    localStorage.setItem('startass_auctions', JSON.stringify(AUCTION_ITEMS));
  } catch (e) {
    console.error('Failed to save auctions to storage:', e);
  }
}

// ==========================================================================
// ORDER STATUS ENUM & LIFECYCLE CONSTANTS
// ==========================================================================
const ORDER_STATUS_ENUM = {
  PENDING_PAYMENT: 'PENDING_PAYMENT',
  WINNING: 'WINNING',
  OUTBID: 'OUTBID',
  WON: 'WON',
  PAID: 'PAID',
  SHIPPED: 'SHIPPED',
  COMPLETED: 'COMPLETED',
  ENDED: 'ENDED'
};

// LocalStorage Orders Management (Active Bids & Placed Orders)
function loadOrders() {
  const seedWonOrder = {
    orderId: 'ORD-AUC-02',
    itemId: 'auc-02',
    title: '1st Edition Shadowless Charizard #4/102 (PSA 10 Gem Mint)',
    category: 'cards',
    categoryLabel: 'การ์ดสะสมหายาก',
    image: 'https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1200&q=80'
    ],
    userBid: 12500000,
    currentBid: 12500000,
    startPrice: 3100000,
    bidIncrement: 50000,
    status: ORDER_STATUS_ENUM.PENDING_PAYMENT,
    statusLabel: 'กำลังรอชำระเงิน',
    paymentStatus: 'UNPAID',
    shippingStatus: 'UNPAID',
    placedAt: '7 ก.ย. 2026, 14:15',
    updatedAt: '8 ก.ย. 2026, 16:30',
    seller: {
      nickname: 'KyotoVault_Cards',
      name: 'Kyoto Rare Collectibles Japan',
      rating: '5.0 ★ (94 รีวิว)',
      verified: true,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80'
    },
    specs: ['ระดับการประเมิน: PSA 10 Gem Mint', 'รหัสใบรับรอง: #4829104', 'การ์ดโฮโลแกรม Shadowless ไร้เงา', 'เคสอะคริลิกกันรังสี UV เกรดพิพิธภัณฑ์'],
    description: 'จอกศักดิ์สิทธิ์แห่งวงการการ์ดสะสม โปเกมอนการ์ดปี 1999 Base Set รุ่น Shadowless ลิซาร์ดอน เกรดสูงสุด PSA 10 ไร้ตำหนิ ศูนย์กลางคมชัด ขอบและพื้นผิวระดับสมบูรณ์แบบ',
    endDate: new Date(Date.now() - 3600000).toISOString()
  };

  const seedWonOrder3 = {
    orderId: 'ORD-AUC-03',
    itemId: 'auc-03',
    title: 'Patek Philippe Grandmaster Chime 6300G-001 ทองคำขาว',
    category: 'tech',
    categoryLabel: 'นาฬิกาหรูระดับมาสเตอร์พีซ',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80'
    ],
    userBid: 145000000,
    currentBid: 145000000,
    startPrice: 98000000,
    bidIncrement: 1000000,
    status: ORDER_STATUS_ENUM.PAID,
    statusLabel: 'ชำระเงินแล้ว (รอผู้ขายจัดส่ง)',
    paymentStatus: 'PAID',
    shippingStatus: 'AWAITING_SHIPMENT',
    paidAmount: 145000000,
    paidAt: '8 ก.ย. 2026, 11:30',
    placedAt: '6 ก.ย. 2026, 10:20',
    updatedAt: '8 ก.ย. 2026, 11:45',
    seller: {
      nickname: 'GenevaVault_CH',
      name: 'Geneva Horology Antiquities SA',
      rating: '5.0 ★ (62 รีวิว)',
      verified: true,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80'
    },
    specs: ['ตัวเรือนพลิกสลับได้ 2 ด้าน ทำจากไวท์โกลด์ 18K', 'กลไกซับซ้อน 20 ฟังก์ชัน พร้อมโหมดตีระฆัง 5 รูปแบบ', 'ใบรับรองแหล่งกำเนิดแท้จาก Patek Philippe', 'บริการคุ้มกันส่งมอบระดับพรีเมียมพร้อมรถหุ้มเกราะ'],
    description: 'นาฬิกาข้อมือที่มีกลไกซับซ้อนที่สุดเท่าที่ Patek Philippe เคยผลิตในสายการผลิตปกติ ตัวเรือนสองหน้าหมุนพลิกได้พร้อมลวดลายกิโยเช่ Hobnail อันวิจิตร',
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
        // Ensure consistent order status according to architecture
        parsed.forEach(o => {
          if (o.orderId === 'ORD-AUC-02') {
            if (o.paymentStatus !== 'PAID') {
              o.status = ORDER_STATUS_ENUM.PENDING_PAYMENT;
              o.statusLabel = 'กำลังรอชำระเงิน';
              o.paymentStatus = 'UNPAID';
              changed = true;
            } else {
              o.status = ORDER_STATUS_ENUM.PAID;
              o.statusLabel = 'ชำระเงินแล้ว (รอผู้ขายจัดส่ง)';
              changed = true;
            }
          } else if (o.status === 'WON') {
            if (o.paymentStatus === 'PAID') {
              o.status = ORDER_STATUS_ENUM.PAID;
              o.statusLabel = 'ชำระเงินแล้ว (รอผู้ขายจัดส่ง)';
              changed = true;
            } else {
              o.status = ORDER_STATUS_ENUM.PENDING_PAYMENT;
              o.statusLabel = 'กำลังรอชำระเงิน';
              o.paymentStatus = 'UNPAID';
              changed = true;
            }
          }
        });
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
      categoryLabel: 'โมเดลรถยนต์ & ซูเปอร์คาร์',
      image: 'https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&fit=crop&w=1200&q=80',
      images: [
        'https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1200&q=80'
      ],
      userBid: 16800000,
      currentBid: 16800000,
      startPrice: 5200000,
      bidIncrement: 50000,
      status: ORDER_STATUS_ENUM.WINNING,
      statusLabel: 'กำลังนำการประมูล (ราคาสูงสุด)',
      placedAt: '8 ก.ย. 2026, 17:30',
      updatedAt: '8 ก.ย. 2026, 18:45',
      seller: {
        nickname: 'ApexMotors_NY',
        name: 'Apex Classic Motoring LLC',
        rating: '4.9 ★ (128 รีวิว)',
        verified: true,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80'
      },
      specs: ['เครื่องยนต์ 428ci Cobra Jet V8 แท้', 'เกียร์ธรรมดา 4 สปีด Toploader', 'สีพิเศษ Pepper Gray คาดเส้นดำ Le Mans', 'ลายเซ็นแท้ Carroll Shelby บนแผงคอนโซล'],
      description: 'เครื่องยนต์ 428 Cobra Jet V8 แท้ดั้งเดิม เกียร์ธรรมดา 4 สปีด สี Pepper Gray คาดลาย Le Mans สีดำ บูรณะเต็มระบบพร้อมเอกสารรับรองจาก Shelby Registry',
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
  const orders = loadOrders();
  const matched = orders.find(o => o.itemId === itemId || o.orderId === itemId);
  const targetId = matched ? matched.orderId : itemId;
  window.location.href = `chat.html?orderId=${encodeURIComponent(targetId)}`;
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
    if (topUser.includes('(you)') || topUser.includes('(คุณ)') || topUser.includes('alexander') || topUser.includes(currentUserName)) {
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
      title: 'แจ้งเตือน: มีผู้เสนอราคาแซงคุณแล้ว!',
      message: 'Collector_Viper เสนอราคาสูงกว่าที่ ฿17,500,000 ใน "1967 Shelby GT500 Fastback"',
      itemTitle: '1967 Shelby GT500 Fastback "Eleanor Edition"',
      newBid: 17500000,
      bidder: 'Collector_Viper',
      time: '12 นาทีที่แล้ว',
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
    ct.textContent = `${unreadCount} ข้อความใหม่`;
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
        <span>ไม่มีการแจ้งเตือนในขณะนี้</span>
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
              <i class="fa-solid fa-gavel"></i> เสนอราคาเพิ่ม
            </button>
            <a href="ordersdetail.html?id=${encodeURIComponent(n.itemId)}" class="notif-order-link" onclick="event.stopPropagation()">
              ดูคำสั่งซื้อ &rarr;
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
  showToast('อ่านการแจ้งเตือนทั้งหมดแล้ว');
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
  const increment = targetItem.bidIncrement || 50000;
  const newBidAmount = targetItem.currentBid + increment;

  // Update auction item
  targetItem.currentBid = newBidAmount;
  targetItem.bidsCount = (targetItem.bidsCount || 0) + 1;
  if (!targetItem.bidHistory) targetItem.bidHistory = [];
  targetItem.bidHistory.unshift({
    user: randomOutbidder,
    amount: newBidAmount,
    time: 'เมื่อสักครู่'
  });

  // Re-sort items by bid
  AUCTION_ITEMS.sort((a, b) => b.currentBid - a.currentBid);
  AUCTION_ITEMS.forEach((item, index) => { item.rank = index + 1; });
  saveAuctions();

  // Update order status to OUTBID
  if (targetOrder) {
    targetOrder.currentBid = newBidAmount;
    targetOrder.status = 'OUTBID';
    targetOrder.statusLabel = 'โดนแซงราคาแล้ว (ต้องเสนอราคาเพิ่ม)';
    targetOrder.updatedAt = new Date().toLocaleString('th-TH', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });
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
    title: 'แจ้งเตือน: มีผู้เสนอราคาแซงคุณแล้ว!',
    message: `${randomOutbidder} เสนอราคาสูงกว่าที่ ${formatCurrency(newBidAmount)} ในรายการ "${targetItem.title}"!`,
    itemTitle: targetItem.title,
    newBid: newBidAmount,
    bidder: randomOutbidder,
    time: 'เมื่อสักครู่',
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
          <i class="fa-solid fa-gavel"></i> เสนอราคาสู้ทันที
        </button>
        <a href="ordersdetail.html?id=${encodeURIComponent(notif.itemId)}" style="font-size:0.78rem; color:#34d399; text-decoration:none; font-weight:600;">
          ดูคำสั่งซื้อ &rarr;
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
      <strong style="display:block; font-size:0.95rem; color:#fbbf24;">คุณเป็นผู้นำการประมูล! (ราคาสูงสุดขณะนี้)</strong>
      <span style="font-size:0.84rem; color:#cbd5e1; display:block; margin: 3px 0 6px;">
        ข้อเสนอราคาของคุณอยู่ที่ <strong>${formatCurrency(item.currentBid)}</strong> สูงที่สุดในขณะนี้ คุณไม่สามารถเสนอราคาแข่งกับตัวเองได้จนกว่าจะมีผู้ประมูลอื่นเสนอราคาสูงกว่า
      </span>
      <div style="display:flex; gap:8px; align-items:center;">
        <a href="ordersdetail.html?id=${encodeURIComponent(item.id)}" style="font-size:0.8rem; color:#34d399; text-decoration:none; font-weight:700; display:inline-flex; align-items:center; gap:4px;">
          <i class="fa-solid fa-receipt"></i> ดูสถานะคำสั่งซื้อ &rarr;
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
    case 'cars': return 'โมเดลรถยนต์ & ซูเปอร์คาร์';
    case 'cards': return 'การ์ดสะสมหายาก';
    case 'tech': return 'เทคโนโลยี & ซูเปอร์คอมพิวเตอร์';
    case 'trees': return 'บอนไซ & ไม้ด่างหายาก';
    default: return 'ของสะสมพิเศษ';
  }
}

// State
let AUCTION_ITEMS = loadAuctions();
let currentCategory = 'top10';
let searchQuery = '';
let selectedItemForBid = null;
let selectedItemForDetail = null;

// Helpers
function formatCurrency(amount) {
  return new Intl.NumberFormat('th-TH', {
    style: 'currency',
    currency: 'THB',
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

// Render Cards (Default Top 10 vs All Categories & Filtered Views)
function renderCards() {
  const grid = document.getElementById('auctionGrid');
  const emptyState = document.getElementById('emptyState');
  const itemsCountEl = document.getElementById('itemsCount');
  
  if (!grid) return;

  // Always keep items sorted by highest current bid and rank updated
  sortAndRankAuctions();

  // Filter items based on current category
  let filtered = [];
  if (currentCategory === 'top10') {
    // Default mode: ONLY Top 10 highest-value auctions
    filtered = AUCTION_ITEMS.slice(0, 10);
  } else if (currentCategory === 'all') {
    // All categories: all items
    filtered = [...AUCTION_ITEMS];
  } else {
    // Specific category
    filtered = AUCTION_ITEMS.filter(item => item.category === currentCategory);
  }

  // Apply search query filter if user typed in search input
  if (searchQuery.trim() !== '') {
    const q = searchQuery.toLowerCase().trim();
    filtered = filtered.filter(item =>
      item.title.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      (item.categoryLabel && item.categoryLabel.toLowerCase().includes(q))
    );
  }

  if (itemsCountEl) {
    if (currentCategory === 'top10') {
      itemsCountEl.textContent = `แสดง ${filtered.length} จาก 10 อันดับการประมูลราคาสูงสุด`;
    } else if (currentCategory === 'all') {
      itemsCountEl.textContent = `แสดง ${filtered.length} จาก ${AUCTION_ITEMS.length} รายการทั้งหมด`;
    } else {
      const catCount = AUCTION_ITEMS.filter(item => item.category === currentCategory).length;
      itemsCountEl.textContent = `แสดง ${filtered.length} จาก ${catCount} รายการในหมวดหมู่นี้`;
    }
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
        ? 'สิ้นสุดการประมูลแล้ว' 
        : `${time.days} วัน ${time.hours} ชม. ${time.minutes} นาที ${time.seconds} วิ`);

    // Rank Badge logic: Only show badge for Top 10 items (item.rank <= 10)
    const showRankBadge = item.rank <= 10;
    const rankClass = item.rank === 1 ? 'top-1' : item.rank === 2 ? 'top-2' : item.rank === 3 ? 'top-3' : '';
    const rankBadgeHtml = showRankBadge
      ? `<span class="rank-badge ${rankClass}">
          <i class="fa-solid fa-trophy"></i> #${item.rank} ข้อเสนอสูงสุด
        </span>`
      : '';

    const draftTag = isInactive
      ? `<span class="category-tag" style="background: rgba(239, 68, 68, 0.25); color: #fca5a5; border-color: rgba(239, 68, 68, 0.4);"><i class="fa-solid fa-pause"></i> แบบร่าง</span>`
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
              <span class="bid-active-text">ชนะแล้ว: ${formatCurrency(userOrder.userBid)} <small>(แชต P2P)</small></span>
            </button>
            <button class="btn btn-raise-bid btn-p2p-open" onclick="navigateToOrderChat('${item.id}')" title="เปิดห้องสนทนากับผู้ขาย [@${userOrder.seller ? userOrder.seller.nickname : 'ผู้ขาย'}]">
              <i class="fa-solid fa-comments"></i>
            </button>
          </div>
        `;
      } else if (isHighest) {
        bidButtonHtml = `
          <div class="bid-active-group">
            <button class="btn btn-bid-active btn-winning" onclick="navigateToOrder('${item.id}')" title="คุณเป็นผู้ให้ราคาสูงสุด (${formatCurrency(userOrder.userBid)}) - คลิกดูคำสั่งซื้อ">
              <i class="fa-solid fa-crown"></i>
              <span class="bid-active-text">กำลังนำ: ${formatCurrency(userOrder.userBid)} <small>(ราคาสูงสุด)</small></span>
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
              <span class="bid-active-text">โดนแซง: ${formatCurrency(userOrder.userBid)} <small>(เคาะสู้เลย)</small></span>
            </button>
            <button class="btn btn-raise-bid btn-outbid-unlocked" onclick="openBidModal('${item.id}')" title="ปลดล็อกแล้ว! เสนอราคาเพิ่มเพื่อชิงตำแหน่งผู้นำ">
              <i class="fa-solid fa-arrow-trend-up"></i>
            </button>
          </div>
        `;
      }
    } else {
      bidButtonHtml = `<button class="btn btn-bid" onclick="openBidModal('${item.id}')"><i class="fa-solid fa-gavel"></i> เปิดเสนอราคาประมูล</button>`;
    }

    const isItemWon = Boolean(userOrder && userOrder.status === 'WON');

    return `
      <article class="auction-card ${isItemWon ? 'card-won-item' : ''}" id="card-${item.id}">
        <!-- Media / Visual -->
        <div class="card-media">
          <img src="${item.image}" alt="${item.title}" class="card-img" loading="lazy" />
          
          <div class="card-overlay-top">
            ${rankBadgeHtml}
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

        <!-- Card Body Content (Seller bar moved to Detail Modal) -->
        <div class="card-content">
          <h2 class="card-title" title="${item.title}">${item.title}</h2>
          <p class="card-description">${item.description}</p>

          <!-- Price Information Box -->
          <div class="price-container">
            <div class="price-col price-col-start">
              <span class="price-label">
                <i class="fa-solid fa-flag"></i> ราคาเริ่มต้น
              </span>
              <span class="start-price">${formatCurrency(item.startPrice)}</span>
            </div>
            <div class="price-col price-col-current">
              <span class="price-label">
                <i class="fa-solid fa-gavel"></i> ราคาเสนอสูงสุด (${item.bidsCount} เสนอ)
              </span>
              <span class="current-bid">${formatCurrency(item.currentBid)}</span>
            </div>
          </div>

          <!-- Auction Start & End Dates -->
          <div class="auction-dates">
            <div class="date-row date-row-start">
              <span class="label"><i class="fa-regular fa-calendar-check"></i> วันเริ่มต้น</span>
              <span class="value">${item.startDate}</span>
            </div>
            <div class="date-row date-row-end">
              <span class="label"><i class="fa-regular fa-calendar-xmark"></i> วันสิ้นสุด</span>
              <span class="value">${new Date(item.endDate).toLocaleDateString('th-TH', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          </div>

          <!-- Action Buttons (Won auctions do not show specs/view button) -->
          <div class="card-actions ${isItemWon ? 'card-actions-won' : ''}">
            ${bidButtonHtml}
            ${!isItemWon ? `
              <button class="btn btn-view" onclick="openDetailModal('${item.id}')" title="ดูรายละเอียด">
                <i class="fa-regular fa-eye"></i> ดูรายละเอียด
              </button>
            ` : ''}
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
        textEl.textContent = 'สิ้นสุดการประมูลแล้ว';
        badge.style.color = '#ef4444';
      } else {
        textEl.textContent = `${time.days} วัน ${time.hours} ชม. ${time.minutes} นาที ${time.seconds} วิ`;
      }
    }
  });

  // Also update order detail countdown timer if present
  const orderTimerText = document.querySelector('.timer-countdown-text');
  if (orderTimerText && currentSelectedOrder && currentSelectedOrder.endDate) {
    const time = getTimeRemaining(currentSelectedOrder.endDate);
    if (time.expired) {
      orderTimerText.textContent = 'สิ้นสุดการประมูลแล้ว';
      orderTimerText.style.color = '#ef4444';
    } else {
      orderTimerText.textContent = `${time.days} วัน ${time.hours} ชม. ${time.minutes} นาที ${time.seconds} วิ`;
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
        if (currentCategory === 'top10') {
          activeHint.textContent = '10 อันดับการประมูลราคาสูงสุด';
        } else if (currentCategory === 'all') {
          activeHint.textContent = 'ทุกหมวดหมู่ (รายการประมูลทั้งหมด)';
        } else {
          const labelText = btn.textContent.trim().replace(/[0-9]+$/, '').trim();
          activeHint.textContent = labelText;
        }
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
  const countTop10 = Math.min(10, AUCTION_ITEMS.length);
  const countAll = AUCTION_ITEMS.length;
  const countCars = AUCTION_ITEMS.filter(i => i.category === 'cars').length;
  const countCards = AUCTION_ITEMS.filter(i => i.category === 'cards').length;
  const countTech = AUCTION_ITEMS.filter(i => i.category === 'tech').length;
  const countTrees = AUCTION_ITEMS.filter(i => i.category === 'trees').length;

  const badgeTop10 = document.getElementById('count-top10');
  const badgeAll = document.getElementById('count-all');
  const badgeCars = document.getElementById('count-cars');
  const badgeCards = document.getElementById('count-cards');
  const badgeTech = document.getElementById('count-tech');
  const badgeTrees = document.getElementById('count-trees');

  if (badgeTop10) badgeTop10.textContent = countTop10;
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
  let modal = document.getElementById('bidModal');
  if (!modal && typeof AuctionBidModal !== 'undefined') {
    modal = AuctionBidModal.mount();
  }
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
    submitBtn.innerHTML = '<i class="fa-solid fa-check"></i> ยืนยันการเสนอราคาประมูล';
  }

  if (previewImg) previewImg.src = item.image;
  if (previewTitle) previewTitle.textContent = item.title;
  if (previewCategory) previewCategory.textContent = item.categoryLabel;
  if (currentBidEl) currentBidEl.textContent = formatCurrency(item.currentBid);

  const step = item.bidIncrement || 50000;
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
    alert(`ราคาเสนอของคุณต้องสูงกว่าราคาปัจจุบัน ${formatCurrency(selectedItemForBid.currentBid)}!`);
    return;
  }

  // Update item
  selectedItemForBid.currentBid = newAmount;
  selectedItemForBid.bidsCount = (selectedItemForBid.bidsCount || 0) + 1;
  if (!selectedItemForBid.bidHistory) selectedItemForBid.bidHistory = [];
  selectedItemForBid.bidHistory.unshift({
    user: 'Alexander Sterling (คุณ)',
    amount: newAmount,
    time: 'เมื่อสักครู่'
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
  const nowFormatted = new Date().toLocaleString('th-TH', {
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
    bidIncrement: selectedItemForBid.bidIncrement || 50000,
    status: 'WINNING',
    statusLabel: 'กำลังนำการประมูล (ราคาสูงสุด)',
    placedAt: existingIndex >= 0 ? orders[existingIndex].placedAt : nowFormatted,
    updatedAt: nowFormatted,
    seller: selectedItemForBid.seller || {
      nickname: 'ApexMotors_NY',
      name: 'Apex Classic Motoring LLC',
      rating: '4.9 ★ (128 รีวิว)',
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

  showToast(`เสนอราคาสำเร็จ: ${formatCurrency(newAmount)} สำหรับ ${selectedItemForBid.title}! อัปเดตคำสั่งซื้อ #${orderId} เรียบร้อยแล้ว`);
}

// Product Detail Modal Logic
function openDetailModal(itemId) {
  const item = AUCTION_ITEMS.find(i => i.id === itemId);
  if (!item) return;

  selectedItemForDetail = item;
  let modal = document.getElementById('detailModal');
  if (!modal && typeof AuctionDetailModal !== 'undefined') {
    modal = AuctionDetailModal.mount();
  }
  const img = document.getElementById('detailImg');
  const title = document.getElementById('detailTitle');
  const category = document.getElementById('detailCategory');
  const desc = document.getElementById('detailDesc');
  const startPrice = document.getElementById('detailStartPrice');
  const currentBid = document.getElementById('detailCurrentBid');
  const startDate = document.getElementById('detailStartDate');
  const endDate = document.getElementById('detailEndDate');
  const specsList = document.getElementById('detailSpecs');

  // Populate seller provenance in Detail Modal
  const sellerAvatar = document.getElementById('detailSellerAvatar');
  const sellerName = document.getElementById('detailSellerName');
  const sellerNick = document.getElementById('detailSellerNick');
  const sellerRating = document.getElementById('detailSellerRating');
  const sellerProfileLink = document.getElementById('detailSellerProfileLink');

  if (item.seller) {
    if (sellerAvatar) sellerAvatar.src = item.seller.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80';
    if (sellerName) sellerName.textContent = item.seller.name || 'ผู้ขาย';
    if (sellerNick) sellerNick.textContent = `@${item.seller.nickname || 'VerifiedSeller'}`;
    if (sellerRating) sellerRating.innerHTML = `<i class="fa-solid fa-star" style="color: #fbbf24;"></i> ${item.seller.rating || '5.0 ★'} (${item.seller.reviewsCount || 50} รีวิว)`;
    if (sellerProfileLink) {
      sellerProfileLink.href = `OtherProfileDetail.html?user=${encodeURIComponent(item.seller.nickname || 'ApexMotors_NY')}`;
      sellerProfileLink.title = `ดูโปรไฟล์ผู้ขาย [ @${item.seller.nickname} ]`;
    }
  }

  if (img) img.src = item.image;
  if (title) title.textContent = item.title;
  if (category) category.textContent = item.categoryLabel;
  if (desc) desc.textContent = item.description;
  if (startPrice) startPrice.textContent = formatCurrency(item.startPrice);
  if (currentBid) currentBid.textContent = formatCurrency(item.currentBid);
  if (startDate) startDate.textContent = item.startDate;
  if (endDate) endDate.textContent = new Date(item.endDate).toLocaleDateString('th-TH', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });

  // Multi-image gallery for detail view
  const detailThumbs = document.getElementById('detailThumbnailsStrip');
  const allImages = (item.images && item.images.length > 0) ? item.images : (item.image ? [item.image] : []);
  if (detailThumbs) {
    if (allImages.length > 1) {
      detailThumbs.style.display = 'flex';
      detailThumbs.innerHTML = allImages.map((u, i) => `
        <div class="thumb-item ${u === item.image ? 'active' : ''}" onclick="switchDetailImage('${u}', this)" title="ดูรูปที่ ${i + 1}">
          <img src="${u}" alt="รูปขนาดย่อ ${i + 1}">
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
      detailBidBtn.innerHTML = '<i class="fa-solid fa-comments"></i> เปิดแชต P2P กับผู้ขาย';
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
      detailBidBtn.innerHTML = '<i class="fa-solid fa-lock"></i> คุณเป็นผู้ให้ราคาสูงสุดแล้ว';
      detailBidBtn.onclick = switchFromDetailToBid;
    } else {
      detailBidBtn.disabled = false;
      detailBidBtn.className = 'btn btn-bid';
      detailBidBtn.title = 'เสนอราคาประมูลสินค้าชิ้นนี้';
      detailBidBtn.innerHTML = '<i class="fa-solid fa-gavel"></i> เสนอราคาประมูลตอนนี้';
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
  if (!modal) return;
  modal.classList.remove('open');
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
        <img src="${url}" alt="รูปขนาดย่อ ${idx + 1}">
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
  const bidIncrement = parseInt(incrementInput ? incrementInput.value : 50000, 10) || 50000;
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
    alert('ราคาเริ่มต้นการประมูลต้องมากกว่า ฿0!');
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
    startDate: new Date(startDateVal).toLocaleDateString('th-TH', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
    endDate: new Date(endDateVal).toISOString(),
    bidsCount: 0,
    specs: specs,
    seller: {
      nickname: (currentUser && currentUser.isLoggedIn) ? 'Alexander_Sterling' : 'Collector_Seller',
      name: (currentUser && currentUser.isLoggedIn) ? currentUser.fullName : 'ผู้สะสม STARTASS',
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
    if (statTotalItems) statTotalItems.textContent = `${AUCTION_ITEMS.length} รายการ`;
    const totalBids = AUCTION_ITEMS.reduce((sum, i) => sum + (i.bidsCount || 0), 0);
    if (statTotalBids) statTotalBids.textContent = `${totalBids} การเสนอราคา`;
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
      <strong style="display:block; font-size:0.95rem;">สำเร็จ!</strong>
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
// ==========================================================================
// USER PROFILE & REPUTATION ENGINE (MyProfileDetails & OtherProfileDetail)
// ==========================================================================
const THAI_BANKS = {
  kbank: {
    code: 'kbank',
    shortName: 'KBANK',
    name: 'ธนาคารกสิกรไทย (Kasikornbank)',
    color: '#00a950',
    textColor: '#ffffff'
  },
  scb: {
    code: 'scb',
    shortName: 'SCB',
    name: 'ธนาคารไทยพาณิชย์ (Siam Commercial Bank)',
    color: '#4e2a84',
    textColor: '#ffffff'
  },
  bbl: {
    code: 'bbl',
    shortName: 'BBL',
    name: 'ธนาคารกรุงเทพ (Bangkok Bank)',
    color: '#1e3a8a',
    textColor: '#ffffff'
  },
  ktb: {
    code: 'ktb',
    shortName: 'KTB',
    name: 'ธนาคารกรุงไทย (Krungthai Bank)',
    color: '#00a5e5',
    textColor: '#ffffff'
  },
  bay: {
    code: 'bay',
    shortName: 'BAY',
    name: 'ธนาคารกรุงศรีอยุธยา (Bank of Ayudhya)',
    color: '#d97706',
    textColor: '#ffffff'
  },
  ttb: {
    code: 'ttb',
    shortName: 'TTB',
    name: 'ธนาคารทหารไทยธนชาต (TMBThanachart)',
    color: '#002d63',
    textColor: '#ffffff'
  },
  gsb: {
    code: 'gsb',
    shortName: 'GSB',
    name: 'ธนาคารออมสิน (Government Savings Bank)',
    color: '#eb1985',
    textColor: '#ffffff'
  },
  baac: {
    code: 'baac',
    shortName: 'ธ.ก.ส.',
    name: 'ธนาคารเพื่อการเกษตรและสหกรณ์การเกษตร (BAAC)',
    color: '#006633',
    textColor: '#ffffff'
  },
  uob: {
    code: 'uob',
    shortName: 'UOB',
    name: 'ธนาคารยูโอบี (United Overseas Bank)',
    color: '#0b2559',
    textColor: '#ffffff'
  },
  cimb: {
    code: 'cimb',
    shortName: 'CIMB',
    name: 'ธนาคารซีไอเอ็มบี ไทย (CIMB Thai)',
    color: '#7d0000',
    textColor: '#ffffff'
  },
  kk: {
    code: 'kk',
    shortName: 'KKP',
    name: 'ธนาคารเกียรตินาคินภัทร (Kiatnakin Phatra)',
    color: '#695094',
    textColor: '#ffffff'
  },
  tisco: {
    code: 'tisco',
    shortName: 'TISCO',
    name: 'ธนาคารทิสโก้ (TISCO Bank)',
    color: '#00508e',
    textColor: '#ffffff'
  }
};

const DEFAULT_MY_PROFILE = {
  id: 'user-my-01',
  nickname: 'Alexander_Sterling',
  fullName: 'Alexander Sterling',
  winRate: 78.4,
  winRateRatio: 'ชนะ 38 จาก 48 รายการ',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
  bio: 'นักสะสมรถยนต์คลาสสิก อุปกรณ์เทคโนโลยียุคบุกเบิก และการ์ดระดับสะสม เข้าร่วมประมูลจริงในระบบชำระเงินปลอดภัย มีประวัติชำระเงินตรงเวลาสม่ำเสมอ',
  isLoggedIn: true,
  bankCode: 'kbank',
  bankName: 'ธนาคารกสิกรไทย (Kasikornbank)',
  accountNumber: '089-2-94819-0',
  accountName: 'Alexander Sterling'
};

function loadMyProfile() {
  const saved = localStorage.getItem('startass_my_profile');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      return {
        ...DEFAULT_MY_PROFILE,
        ...parsed,
        bankCode: parsed.bankCode || DEFAULT_MY_PROFILE.bankCode,
        bankName: parsed.bankName || DEFAULT_MY_PROFILE.bankName,
        accountNumber: parsed.accountNumber || DEFAULT_MY_PROFILE.accountNumber,
        accountName: parsed.accountName || parsed.fullName || DEFAULT_MY_PROFILE.accountName
      };
    } catch (e) {
      console.error('Failed to parse saved profile:', e);
    }
  }
  return { ...DEFAULT_MY_PROFILE };
}

function saveMyProfile(profileData) {
  try {
    currentUser = { ...currentUser, ...profileData };
    localStorage.setItem('startass_my_profile', JSON.stringify(currentUser));
    updateProfileUI();
  } catch (e) {
    console.error('Failed to save profile:', e);
  }
}

let currentUser = loadMyProfile();

// Other Profiles Directory (Sellers & Collectors)
const OTHER_USER_PROFILES = {
  'ApexMotors_NY': {
    id: 'user-seller-01',
    nickname: 'ApexMotors_NY',
    fullName: 'Apex Classic Motoring LLC',
    winRate: 84.5,
    winRateRatio: 'ชนะ 42 จาก 50 การประมูล',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    bio: 'ผู้เชี่ยวชาญด้านการจัดหาและบูรณะรถยนต์คลาสสิกระดับโลก รถทุกคันผ่านการตรวจสอบประวัติพร้อมเอกสารรับรองความแท้',
    itemsCount: 6
  },
  'KyotoVault_Cards': {
    id: 'user-seller-02',
    nickname: 'KyotoVault_Cards',
    fullName: 'Kyoto Rare Collectibles Japan',
    winRate: 91.2,
    winRateRatio: 'ชนะ 68 จาก 74 การประมูล',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    bio: 'ศูนย์รวมการ์ดสะสมเกรด PSA 10 และ Beckett BGS 9.5+ จัดเก็บในห้องควบคุมอุณหภูมิและความชื้นมาตรฐานระดับสากล ณ นครเกียวโต',
    itemsCount: 9
  },
  'GenevaVault_CH': {
    id: 'user-seller-03',
    nickname: 'GenevaVault_CH',
    fullName: 'Geneva Horology Antiquities SA',
    winRate: 92.8,
    winRateRatio: 'ชนะ 55 จาก 59 การประมูล',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    bio: 'เชี่ยวชาญการประมูลนาฬิกาข้อมือและนาฬิกาพกสวิสชั้นสูง Patek Philippe, Audemars Piguet และ Rolex วินเทจ พร้อมบริการขนส่ง Brinks Global',
    itemsCount: 4
  },
  'StuttgartExclusive': {
    id: 'user-seller-04',
    nickname: 'StuttgartExclusive',
    fullName: 'Stuttgart Heritage Auto Haus',
    winRate: 86.0,
    winRateRatio: 'ชนะ 37 จาก 43 การประมูล',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    bio: 'ผู้นำเข้ารถแข่งและปอร์เช่ GT3 RS ไมล์แท้ พร้อมใบเซอร์ติฟิเคตตรวจสภาพจากเยอรมนี',
    itemsCount: 5
  },
  'ZenMasterBotanics': {
    id: 'user-seller-05',
    nickname: 'ZenMasterBotanics',
    fullName: 'Omiya Master Bonsai Collection',
    winRate: 94.0,
    winRateRatio: 'ชนะ 47 จาก 50 การประมูล',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80',
    bio: 'สะสมและฟูมฟักบอนไซสนชิมปากุและไม้ด่างโบราณอายุกว่า 100-200 ปี ปลูกในกระถางโทโคนาเมะยุคเอโดะ',
    itemsCount: 7
  },
  'SiliconHeritage_CA': {
    id: 'user-seller-06',
    nickname: 'SiliconHeritage_CA',
    fullName: 'Silicon Valley Artifacts Society',
    winRate: 89.5,
    winRateRatio: 'ชนะ 34 จาก 38 การประมูล',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80',
    bio: 'รวบรวมคอมพิวเตอร์โบราณและอุปกรณ์ประวัติศาสตร์เทคโนโลยี Apple-1, Silicon Graphics และคอมไพเลอร์ยุคแรกเริ่ม',
    itemsCount: 4
  },
  'PlaneswalkerGuild': {
    id: 'user-seller-07',
    nickname: 'PlaneswalkerGuild',
    fullName: 'Planeswalker High-End Vault',
    winRate: 88.0,
    winRateRatio: 'ชนะ 51 จาก 58 การประมูล',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80',
    bio: 'ผู้เชี่ยวชาญการ์ดชุด Black Lotus, Power Nine และการ์ดหายากยุค 90s พร้อมผลเกรดระดับพิพิธภัณฑ์',
    itemsCount: 8
  },
  'RetroFoundry_Sys': {
    id: 'user-seller-08',
    nickname: 'RetroFoundry_Sys',
    fullName: 'Retro Supercomputing Heritage',
    winRate: 85.0,
    winRateRatio: 'ชนะ 28 จาก 33 การประมูล',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=300&q=80',
    bio: 'บูรณะ SGI Onyx2, Cray และเวิร์กสเตชันกราฟิกฮอลลีวูด สภาพใช้งานได้สมบูรณ์',
    itemsCount: 3
  }
};

function getUserProfile(nicknameOrId) {
  if (!nicknameOrId) return OTHER_USER_PROFILES['ApexMotors_NY'];
  const cleaned = nicknameOrId.replace(/^@/, '').replace(/^\[\s*@?/, '').replace(/\s*\]$/, '').trim();
  if (cleaned.toLowerCase() === 'alexander_sterling' || cleaned.toLowerCase() === 'alexander sterling') {
    return currentUser;
  }
  if (OTHER_USER_PROFILES[cleaned]) {
    return OTHER_USER_PROFILES[cleaned];
  }
  const foundKey = Object.keys(OTHER_USER_PROFILES).find(k => k.toLowerCase() === cleaned.toLowerCase());
  if (foundKey) {
    return OTHER_USER_PROFILES[foundKey];
  }
  // Search in AUCTION_ITEMS
  const matchedItem = AUCTION_ITEMS.find(i => i.seller && (i.seller.nickname === cleaned || i.seller.name === cleaned));
  if (matchedItem && matchedItem.seller) {
    return {
      id: 'user-' + cleaned,
      nickname: matchedItem.seller.nickname || cleaned,
      fullName: matchedItem.seller.name || cleaned,
      winRate: 85.0,
      winRateRatio: 'ชนะ 30 จาก 35 การประมูล',
      avatar: matchedItem.seller.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      bio: 'ผู้ขายและนักสะสมของหายากในระบบ STARTASS พร้อมรับประกันคุณภาพสินค้า',
      itemsCount: 3
    };
  }
  return OTHER_USER_PROFILES['ApexMotors_NY'];
}

// User Reports Storage
function loadUserReports() {
  const saved = localStorage.getItem('startass_user_reports');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) return parsed;
    } catch (e) {
      console.error('Failed to parse reports:', e);
    }
  }
  return [];
}

function saveUserReports(reports) {
  try {
    localStorage.setItem('startass_user_reports', JSON.stringify(reports));
  } catch (e) {
    console.error('Failed to save reports:', e);
  }
}

function toggleProfileDropdown(event) {
  if (event) event.stopPropagation();

  if (!currentUser.isLoggedIn) {
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
// MY PROFILE DETAILS PAGE (pages/MyProfileDetails.html)
// ==========================================================================
let myProfileActiveTab = 'all';
let myProfileSearchQuery = '';

function initMyProfilePage() {
  const container = document.getElementById('myProfileContainer');
  if (!container) return;

  currentUser = loadMyProfile();

  // Populate Identity Elements
  const avatarImg = document.getElementById('myProfileAvatarImg');
  const fullNameEl = document.getElementById('myProfileFullName');
  const nicknameEl = document.getElementById('myProfileNickname');
  const bioEl = document.getElementById('myProfileBio');

  if (avatarImg) avatarImg.src = currentUser.avatar;
  if (fullNameEl) fullNameEl.textContent = currentUser.fullName;
  if (nicknameEl) nicknameEl.textContent = `@${currentUser.nickname}`;
  if (bioEl) bioEl.textContent = currentUser.bio;

  // Calculate & Populate Stat Cards (Win Rate & Posted Auctions)
  const statWinRate = document.getElementById('statMyWinRate');
  const statWinRateMeta = document.getElementById('statMyWinRateMeta');
  const statWinRateFill = document.getElementById('statMyWinRateProgress');
  if (statWinRate) statWinRate.textContent = `${currentUser.winRate}%`;
  if (statWinRateMeta) statWinRateMeta.textContent = currentUser.winRateRatio;
  if (statWinRateFill) statWinRateFill.style.width = `${currentUser.winRate}%`;

  // Seed user posted items if not present
  ensureUserPostedAuctionsSeeded();

  // Render user auctions
  renderMyProfileAuctions();

  // Populate Bank Details on Profile Page
  renderProfileBankAccount();
}

function ensureUserPostedAuctionsSeeded() {
  const myAuctions = AUCTION_ITEMS.filter(i => isItemOwnedByCurrentUser(i));
  if (myAuctions.length === 0) {
    const seed1 = {
      id: 'auc-my-01',
      rank: 11,
      title: 'Ferrari 250 GTO 1962 โมเดลจำลองลิขสิทธิ์แท้ 1:18 งานหล่อเรซินพิเศษ',
      category: 'cars',
      categoryLabel: 'โมเดลรถยนต์ & ซูเปอร์คาร์',
      image: 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&w=1200&q=80',
      images: [
        'https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&fit=crop&w=1200&q=80'
      ],
      description: 'โมเดลประกอบมือจำลอง Ferrari 250 GTO หมายเลขแชสซี 3705GT รายละเอียดห้องโดยสารและเครื่องยนต์ V12 ครบถ้วน พร้อมตู้กระจกกันฝุ่นฐานไม้แท้',
      startPrice: 280000,
      currentBid: 650000,
      startDate: '1 ก.ย. 2026, 12:00',
      endDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000 + 6 * 3600 * 1000).toISOString(),
      bidsCount: 18,
      specs: ['ขนาดสเกล 1:18 ความแม่นยำสูง', 'งานหล่อเรซินและชิ้นส่วนโฟโตเอตช์โลหะ', 'กล่องหนังแท้พร้อมใบรับรอง Limited Edition #48/100', 'ไม่เคยแกะจัดแสดง สภาพไร้ตำหนิ'],
      seller: {
        nickname: currentUser.nickname,
        name: currentUser.fullName,
        rating: '5.0 ★',
        reviewsCount: 15,
        verified: true,
        avatar: currentUser.avatar
      },
      bidHistory: [
        { user: 'Collector_Viper', amount: 650000, time: '20 นาทีที่แล้ว' },
        { user: 'VintageVault', amount: 580000, time: '3 ชั่วโมงที่แล้ว' }
      ]
    };

    const seed2 = {
      id: 'auc-my-02',
      rank: 12,
      title: 'Rolex Cosmograph Daytona Ref. 6239 "Paul Newman" สภาพสะสม',
      category: 'tech',
      categoryLabel: 'นาฬิกาหรูระดับมาสเตอร์พีซ',
      image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1200&q=80',
      images: [
        'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1200&q=80'
      ],
      description: 'หน้าปัด Exotic Dial ดั้งเดิม ลวดลาย Art Deco อันเลื่องชื่อ กลไกไขลาน Valjoux 722 สภาพตัวเรือนและเข็มเดิม ไม่เคยผ่านการขัดแต่งหนัก พร้อมใบตรวจสอบจากผู้เชี่ยวชาญ',
      startPrice: 8500000,
      currentBid: 14200000,
      startDate: '3 ก.ย. 2026, 09:30',
      endDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000 + 14 * 3600 * 1000).toISOString(),
      bidsCount: 34,
      specs: ['รหัสอ้างอิง: Ref. 6239 ปี 1968', 'หน้าปัด Exotic "Paul Newman" แท้ 100%', 'กลไกไขลาน Calibre 722 ผ่านการล้างเครื่องโดยช่างนาฬิกาสวิส', 'พร้อมกล่องและเอกสารตรวจสอบความแท้'],
      seller: {
        nickname: currentUser.nickname,
        name: currentUser.fullName,
        rating: '5.0 ★',
        reviewsCount: 15,
        verified: true,
        avatar: currentUser.avatar
      },
      bidHistory: [
        { user: 'GenevaHorology', amount: 14200000, time: '1 ชั่วโมงที่แล้ว' },
        { user: 'StuttgartExclusive', amount: 13500000, time: '5 ชั่วโมงที่แล้ว' }
      ]
    };

    AUCTION_ITEMS.push(seed1, seed2);
    saveAuctions();
  }
}

function isItemOwnedByCurrentUser(item) {
  if (!item || !item.seller) return false;
  const sNick = (item.seller.nickname || '').toLowerCase();
  const sName = (item.seller.name || '').toLowerCase();
  const myNick = (currentUser.nickname || '').toLowerCase();
  const myName = (currentUser.fullName || '').toLowerCase();
  return sNick === myNick || sNick === 'alexander_sterling' || sName === myName || sName.includes('alexander');
}

function renderMyProfileAuctions() {
  const grid = document.getElementById('myAuctionsGrid');
  const emptyEl = document.getElementById('myAuctionsEmpty');
  const counterEl = document.getElementById('myAuctionsCounter');
  const statPosts = document.getElementById('statMyPosts');
  const statPostsMeta = document.getElementById('statMyPostsMeta');

  if (!grid) return;

  const myItems = AUCTION_ITEMS.filter(item => isItemOwnedByCurrentUser(item));

  if (statPosts) statPosts.textContent = `${myItems.length} รายการ`;
  if (statPostsMeta) {
    const activeCount = myItems.filter(i => {
      const t = getTimeRemaining(i.endDate);
      return !t.expired && i.isActive !== false;
    }).length;
    statPostsMeta.textContent = `เปิดประมูลสด ${activeCount} รายการ`;
  }

  // Filter according to Tab
  let filtered = myItems.filter(item => {
    const time = getTimeRemaining(item.endDate);
    if (myProfileActiveTab === 'active') {
      return !time.expired && item.isActive !== false;
    }
    if (myProfileActiveTab === 'ended') {
      return time.expired;
    }
    if (myProfileActiveTab === 'draft') {
      return item.isActive === false;
    }
    return true;
  });

  // Filter according to search query
  if (myProfileSearchQuery.trim() !== '') {
    const q = myProfileSearchQuery.toLowerCase().trim();
    filtered = filtered.filter(item =>
      item.title.toLowerCase().includes(q) ||
      (item.categoryLabel && item.categoryLabel.toLowerCase().includes(q)) ||
      (item.description && item.description.toLowerCase().includes(q))
    );
  }

  if (counterEl) counterEl.textContent = `${filtered.length} รายการ`;

  if (filtered.length === 0) {
    grid.innerHTML = '';
    if (emptyEl) emptyEl.style.display = 'block';
    return;
  }

  if (emptyEl) emptyEl.style.display = 'none';

  grid.innerHTML = filtered.map(item => {
    const time = getTimeRemaining(item.endDate);
    const isInactive = item.isActive === false;
    const timeDisplay = isInactive
      ? 'แบบร่าง (Draft)'
      : (time.expired ? 'สิ้นสุดการประมูลแล้ว' : `${time.days} วัน ${time.hours} ชม. ${time.minutes} นาที`);

    return `
      <article class="auction-card" id="my-card-${item.id}">
        <div class="card-media">
          <img src="${item.image}" alt="${item.title}" class="card-img" loading="lazy" />
          <div class="card-overlay-top">
            <span class="rank-badge ${item.rank <= 3 ? 'top-' + item.rank : ''}">
              <i class="fa-solid fa-box-archive"></i> โพสต์ของคุณ
            </span>
            <span class="category-tag">${item.categoryLabel || 'ของสะสม'}</span>
          </div>
          <div class="countdown-badge" data-end="${item.endDate}">
            <i class="fa-regular fa-clock"></i>
            <span class="timer-text">${timeDisplay}</span>
          </div>
        </div>

        <div class="card-content">
          <h2 class="card-title" title="${item.title}">${item.title}</h2>
          <p class="card-description">${item.description}</p>

          <div class="price-container">
            <div class="price-col price-col-start">
              <span class="price-label"><i class="fa-solid fa-flag"></i> ราคาตั้งต้น</span>
              <span class="start-price">${formatCurrency(item.startPrice)}</span>
            </div>
            <div class="price-col price-col-current">
              <span class="price-label"><i class="fa-solid fa-gavel"></i> ราคาสูงสุด (${item.bidsCount} เสนอ)</span>
              <span class="current-bid">${formatCurrency(item.currentBid)}</span>
            </div>
          </div>

          <div class="auction-dates">
            <div class="date-row date-row-start">
              <span class="label"><i class="fa-regular fa-calendar-check"></i> เริ่มเมื่อ</span>
              <span class="value">${item.startDate}</span>
            </div>
            <div class="date-row date-row-end">
              <span class="label"><i class="fa-regular fa-calendar-xmark"></i> สิ้นสุด</span>
              <span class="value">${new Date(item.endDate).toLocaleDateString('th-TH', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          </div>

          <div class="card-actions">
            <button class="btn btn-view" onclick="openDetailModal('${item.id}')" style="flex:1;">
              <i class="fa-regular fa-eye"></i> ดูรายละเอียด
            </button>
            <button class="btn btn-bid" onclick="showToast('โพสต์ #${item.id} กำลังทำงานในระบบประมูลสด')" style="background: rgba(16, 185, 129, 0.2); border: 1px solid #10b981; color: #34d399;">
              <i class="fa-solid fa-sliders"></i> จัดการโพสต์
            </button>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

function setMyProfileTab(tab) {
  myProfileActiveTab = tab;
  document.querySelectorAll('#myProfileFilterTabs .profile-tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-tab') === tab);
  });
  renderMyProfileAuctions();
}

function filterMyProfileAuctions(keyword) {
  myProfileSearchQuery = keyword || '';
  renderMyProfileAuctions();
}

// Edit Profile Modal Handling
// Edit Profile Modal Handling (Personal Info Only)
function openEditProfileModal() {
  const modal = document.getElementById('editProfileModal');
  if (!modal) return;

  currentUser = loadMyProfile();

  const fn = document.getElementById('editFullName');
  const nn = document.getElementById('editNickname');
  const av = document.getElementById('editAvatarUrl');
  const bio = document.getElementById('editBio');
  const previewImg = document.getElementById('editAvatarPreview');

  if (fn) fn.value = currentUser.fullName || '';
  if (nn) nn.value = currentUser.nickname || '';
  if (av) av.value = currentUser.avatar || '';
  if (bio) bio.value = currentUser.bio || '';
  if (previewImg) previewImg.src = currentUser.avatar || '';

  modal.classList.add('open');
}

function closeEditProfileModal() {
  const modal = document.getElementById('editProfileModal');
  if (modal) modal.classList.remove('open');
}

function handleSaveProfileForm(event) {
  if (event) event.preventDefault();

  const fn = document.getElementById('editFullName');
  const nn = document.getElementById('editNickname');
  const av = document.getElementById('editAvatarUrl');
  const bio = document.getElementById('editBio');

  const updated = {
    fullName: fn ? fn.value.trim() : currentUser.fullName,
    nickname: nn ? nn.value.trim().replace(/^@/, '') : currentUser.nickname,
    avatar: av ? av.value.trim() : currentUser.avatar,
    bio: bio ? bio.value.trim() : currentUser.bio
  };

  saveMyProfile(updated);
  initMyProfilePage();
  closeEditProfileModal();
  showToast('บันทึกข้อมูลโปรไฟล์ของคุณเรียบร้อยแล้ว!');
}

function previewAvatarFromInput(input) {
  const url = input.value.trim();
  const previewImg = document.getElementById('editAvatarPreview');
  if (previewImg && url) {
    previewImg.src = url;
  }
}

// ==========================================================================
// DEDICATED MANAGE BANK ACCOUNT MODAL (จัดการบัญชีธนาคาร)
// Only 3 Fields: ชื่อธนาคาร, เลขบัญชี, ชื่อ - นามสกุล
// ==========================================================================
function openManageBankModal() {
  const modal = document.getElementById('manageBankModal');
  if (!modal) return;

  currentUser = loadMyProfile();

  const sel = document.getElementById('bankModalSelect');
  const num = document.getElementById('bankModalAccNumber');
  const name = document.getElementById('bankModalAccName');

  const currentBankCode = currentUser.bankCode || 'kbank';
  const currentAccNum = currentUser.accountNumber || '';
  const currentAccName = currentUser.accountName || currentUser.fullName || '';

  if (sel) sel.value = currentBankCode;
  if (num) num.value = currentAccNum;
  if (name) name.value = currentAccName;

  handleBankModalChange(currentBankCode);
  updateVirtualCardAccNumber(currentAccNum);
  updateVirtualCardName(currentAccName);

  modal.classList.add('open');
  if (sel) {
    setTimeout(() => sel.focus(), 150);
  }
}

function closeManageBankModal() {
  const modal = document.getElementById('manageBankModal');
  if (modal) modal.classList.remove('open');
}

function handleBankModalChange(bankCodeVal) {
  const badge = document.getElementById('vCardBankBadge');
  const bName = document.getElementById('vCardBankName');
  const bank = THAI_BANKS[bankCodeVal] || THAI_BANKS['kbank'];

  if (badge && bank) {
    badge.textContent = bank.shortName;
    badge.style.backgroundColor = bank.color;
    badge.style.color = bank.textColor;
  }
  if (bName && bank) {
    bName.textContent = bank.shortName;
  }
}

function formatBankModalAccInput(input) {
  if (!input) return;
  let digits = input.value.replace(/\D/g, '');
  if (digits.length > 12) digits = digits.substring(0, 12);

  if (digits.length <= 3) {
    input.value = digits;
  } else if (digits.length <= 4) {
    input.value = `${digits.substring(0, 3)}-${digits.substring(3)}`;
  } else if (digits.length <= 9) {
    input.value = `${digits.substring(0, 3)}-${digits.substring(3, 4)}-${digits.substring(4)}`;
  } else if (digits.length <= 10) {
    input.value = `${digits.substring(0, 3)}-${digits.substring(3, 4)}-${digits.substring(4, 9)}-${digits.substring(9)}`;
  } else {
    // 11-12 digits (like GSB or BAAC)
    input.value = `${digits.substring(0, 3)}-${digits.substring(3, 6)}-${digits.substring(6, 10)}-${digits.substring(10)}`;
  }

  updateVirtualCardAccNumber(input.value);
}

function updateVirtualCardAccNumber(val) {
  const vNum = document.getElementById('vCardNumber');
  if (vNum) {
    vNum.textContent = (val && val.trim()) ? val.trim() : '•••• •••• ••••';
  }
}

function updateVirtualCardName(val) {
  const vName = document.getElementById('vCardHolderName');
  if (vName) {
    vName.textContent = ((val && val.trim()) ? val.trim() : (currentUser.accountName || currentUser.fullName || 'ชื่อเจ้าของบัญชี')).toUpperCase();
  }
}

function handleSaveBankForm(event) {
  if (event) event.preventDefault();

  const sel = document.getElementById('bankModalSelect');
  const num = document.getElementById('bankModalAccNumber');
  const name = document.getElementById('bankModalAccName');

  const bankCodeVal = (sel && sel.value) ? sel.value : 'kbank';
  const bank = THAI_BANKS[bankCodeVal] || THAI_BANKS['kbank'];

  const updated = {
    bankCode: bankCodeVal,
    bankName: bank.name,
    accountNumber: num ? num.value.trim() : (currentUser.accountNumber || ''),
    accountName: name ? name.value.trim() : (currentUser.accountName || currentUser.fullName || '')
  };

  saveMyProfile(updated);
  initMyProfilePage();
  closeManageBankModal();
  showToast('บันทึกข้อมูลบัญชีธนาคารเรียบร้อยแล้ว!');
}

function renderProfileBankAccount() {
  const bankLogoBadge = document.getElementById('profileBankLogoBadge');
  const bankDisplayName = document.getElementById('profileBankDisplayName');
  const bankAccNumber = document.getElementById('profileBankAccNumber');
  const bankAccountName = document.getElementById('profileBankAccountName');
  const bankPillText = document.getElementById('myProfileBankPillText');

  const currentBank = THAI_BANKS[currentUser.bankCode] || THAI_BANKS['kbank'];

  if (bankLogoBadge && currentBank) {
    bankLogoBadge.textContent = currentBank.shortName;
    bankLogoBadge.style.backgroundColor = currentBank.color;
    bankLogoBadge.style.color = currentBank.textColor;
  }
  if (bankDisplayName && currentBank) {
    bankDisplayName.textContent = currentUser.bankName || currentBank.name;
  }
  if (bankAccNumber) {
    bankAccNumber.textContent = currentUser.accountNumber || 'ยังไม่ได้ระบุ';
  }
  if (bankAccountName) {
    bankAccountName.textContent = currentUser.accountName || currentUser.fullName || 'ยังไม่ได้ระบุ';
  }
  if (bankPillText && currentBank) {
    bankPillText.textContent = `${currentBank.shortName}: ${currentUser.accountNumber || 'ระบุบัญชี'}`;
  }
}

function copyBankAccount(event) {
  if (event) {
    event.stopPropagation();
    event.preventDefault();
  }
  const acc = currentUser.accountNumber || '089-2-94819-0';
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(acc).then(() => {
      showToast('คัดลอกหมายเลขบัญชี ' + acc + ' เรียบร้อยแล้ว');
    }).catch(() => {
      copyFallbackAcc(acc);
    });
  } else {
    copyFallbackAcc(acc);
  }
}

function copyFallbackAcc(text) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  try {
    document.execCommand('copy');
    showToast('คัดลอกหมายเลขบัญชี ' + text + ' เรียบร้อยแล้ว');
  } catch (err) {
    showToast('หมายเลขบัญชี: ' + text);
  }
  document.body.removeChild(textarea);
}

// ==========================================================================
// OTHER USER PROFILE PAGE (pages/OtherProfileDetail.html)
// ==========================================================================
let otherProfileActiveTab = 'all';
let otherProfileSearchQuery = '';
let currentTargetProfile = null;

function initOtherProfilePage() {
  const container = document.getElementById('otherProfileContainer');
  if (!container) return;

  const urlParams = new URLSearchParams(window.location.search);
  const userParam = urlParams.get('user') || urlParams.get('id') || 'ApexMotors_NY';

  currentTargetProfile = getUserProfile(userParam);

  // Render Seller Switcher Chips so user can test multiple profiles
  renderSellerSwitcherChips(currentTargetProfile.nickname);

  // Bind Header Identity
  const avatarImg = document.getElementById('otherProfileAvatarImg');
  const fullNameEl = document.getElementById('otherProfileFullName');
  const nicknameEl = document.getElementById('otherProfileNickname');
  const bioEl = document.getElementById('otherProfileBio');

  if (avatarImg) avatarImg.src = currentTargetProfile.avatar;
  if (fullNameEl) fullNameEl.textContent = currentTargetProfile.fullName;
  if (nicknameEl) nicknameEl.textContent = `[ @${currentTargetProfile.nickname} ]`;
  if (bioEl) bioEl.textContent = currentTargetProfile.bio;

  const breadcrumbEl = document.getElementById('breadcrumbProfileName');
  if (breadcrumbEl) breadcrumbEl.textContent = currentTargetProfile.fullName;

  // Bind Stat Cards (Win Rate & Posted Auctions)
  const statWinRate = document.getElementById('statOtherWinRate');
  const statWinRateMeta = document.getElementById('statOtherWinRateMeta');
  const statWinRateFill = document.getElementById('statOtherWinRateProgress');
  if (statWinRate) statWinRate.textContent = `${currentTargetProfile.winRate}%`;
  if (statWinRateMeta) statWinRateMeta.textContent = currentTargetProfile.winRateRatio;
  if (statWinRateFill) statWinRateFill.style.width = `${currentTargetProfile.winRate}%`;

  // Render Auctions Posted by this user
  renderOtherProfileAuctions();
}

let bidderSwitcherInterval = null;

function stopBidderSwitcherInterval() {
  if (bidderSwitcherInterval) {
    clearInterval(bidderSwitcherInterval);
    bidderSwitcherInterval = null;
  }
}

function getRandomBidders(pool, count = 5) {
  if (!Array.isArray(pool) || pool.length === 0) return [];
  // If pool has <= count users, show all of them (no fake users added)
  if (pool.length <= count) {
    return [...pool];
  }
  // Shuffle a copy and pick exactly count
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

function renderSellerSwitcherChips(activeNickname) {
  const container = document.getElementById('sellerSwitchChips');
  if (!container) return;

  // Clear existing interval before starting a new one (prevent memory leak)
  stopBidderSwitcherInterval();

  // Initial render of 5 random bidders from existing pool
  renderBidderCardsHTML(container, activeNickname);

  // Setup 30-second interval to rotate and select new 5 random bidders
  bidderSwitcherInterval = setInterval(() => {
    rotateBidderCards(container, activeNickname);
  }, 30000);
}

function rotateBidderCards(container, activeNickname) {
  if (!container || !document.body.contains(container)) {
    stopBidderSwitcherInterval();
    return;
  }
  // Subtle smooth fade transition
  container.classList.add('fading');
  setTimeout(() => {
    renderBidderCardsHTML(container, activeNickname);
    container.classList.remove('fading');
  }, 220);
}

function renderBidderCardsHTML(container, activeNickname) {
  const pool = Object.values(OTHER_USER_PROFILES);
  const selectedBidders = getRandomBidders(pool, 5);

  container.innerHTML = selectedBidders.map(u => {
    const isActive = u.nickname.toLowerCase() === (activeNickname || '').toLowerCase();
    return `
      <a href="OtherProfileDetail.html?user=${encodeURIComponent(u.nickname)}"
         class="bidder-mini-item${isActive ? ' bidder-mini-active' : ''}"
         title="${isActive ? 'กำลังดูโปรไฟล์นี้' : u.fullName || u.nickname}">
        <div class="bidder-mini-avatar-wrap">
          <img src="${u.avatar}" alt="${u.nickname}" class="bidder-mini-avatar" loading="lazy">
          <span class="bidder-mini-online-dot"></span>
        </div>
        <span class="bidder-mini-username">@${u.nickname}</span>
        ${isActive ? '<span class="bidder-mini-active-dot" title="กำลังดูโปรไฟล์นี้"><i class="fa-solid fa-circle-check"></i></span>' : ''}
      </a>
    `;
  }).join('');
}

// Clean up interval on page unload / hide to prevent memory leaks
if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', stopBidderSwitcherInterval);
  window.addEventListener('pagehide', stopBidderSwitcherInterval);
}

function renderOtherProfileAuctions() {
  const grid = document.getElementById('otherAuctionsGrid');
  const emptyEl = document.getElementById('otherAuctionsEmpty');
  const counterEl = document.getElementById('otherAuctionsCounter');
  const statPosts = document.getElementById('statOtherPosts');
  const statPostsMeta = document.getElementById('statOtherPostsMeta');

  if (!grid || !currentTargetProfile) return;

  // Match items belonging to this seller
  let sellerItems = AUCTION_ITEMS.filter(item => {
    if (!item.seller) return false;
    const nick = (item.seller.nickname || '').toLowerCase();
    const name = (item.seller.name || '').toLowerCase();
    const targetNick = currentTargetProfile.nickname.toLowerCase();
    const targetName = currentTargetProfile.fullName.toLowerCase();
    return nick === targetNick || name === targetName || nick.includes(targetNick) || targetNick.includes(nick);
  });

  // If no items directly match, show related items from AUCTION_ITEMS
  if (sellerItems.length === 0) {
    sellerItems = AUCTION_ITEMS.slice(0, 3);
  }

  if (statPosts) statPosts.textContent = `${sellerItems.length} รายการ`;
  if (statPostsMeta) {
    statPostsMeta.textContent = `สินค้าประมูลพร้อมเสนอราคา`;
  }

  // Filter according to Tab
  let filtered = sellerItems.filter(item => {
    const time = getTimeRemaining(item.endDate);
    if (otherProfileActiveTab === 'active') {
      return !time.expired;
    }
    if (otherProfileActiveTab === 'ended') {
      return time.expired;
    }
    return true;
  });

  // Filter according to search
  if (otherProfileSearchQuery.trim() !== '') {
    const q = otherProfileSearchQuery.toLowerCase().trim();
    filtered = filtered.filter(item =>
      item.title.toLowerCase().includes(q) ||
      (item.categoryLabel && item.categoryLabel.toLowerCase().includes(q)) ||
      (item.description && item.description.toLowerCase().includes(q))
    );
  }

  if (counterEl) counterEl.textContent = `${filtered.length} รายการ`;

  if (filtered.length === 0) {
    grid.innerHTML = '';
    if (emptyEl) emptyEl.style.display = 'block';
    return;
  }

  if (emptyEl) emptyEl.style.display = 'none';

  grid.innerHTML = filtered.map(item => {
    const time = getTimeRemaining(item.endDate);
    const timeDisplay = time.expired
      ? 'สิ้นสุดการประมูลแล้ว'
      : `${time.days} วัน ${time.hours} ชม. ${time.minutes} นาที`;

    return `
      <article class="auction-card" id="other-card-${item.id}">
        <div class="card-media">
          <img src="${item.image}" alt="${item.title}" class="card-img" loading="lazy" />
          <div class="card-overlay-top">
            <span class="rank-badge ${item.rank <= 3 ? 'top-' + item.rank : ''}">
              <i class="fa-solid fa-trophy"></i> #${item.rank || 1}
            </span>
            <span class="category-tag">${item.categoryLabel || 'ของสะสม'}</span>
          </div>
          <div class="countdown-badge" data-end="${item.endDate}">
            <i class="fa-regular fa-clock"></i>
            <span class="timer-text">${timeDisplay}</span>
          </div>
        </div>

        <div class="card-content">
          <h2 class="card-title" title="${item.title}">${item.title}</h2>
          <p class="card-description">${item.description}</p>

          <div class="price-container">
            <div class="price-col price-col-start">
              <span class="price-label"><i class="fa-solid fa-flag"></i> ราคาตั้งต้น</span>
              <span class="start-price">${formatCurrency(item.startPrice)}</span>
            </div>
            <div class="price-col price-col-current">
              <span class="price-label"><i class="fa-solid fa-gavel"></i> ราคาสูงสุด (${item.bidsCount} เสนอ)</span>
              <span class="current-bid">${formatCurrency(item.currentBid)}</span>
            </div>
          </div>

          <div class="auction-dates">
            <div class="date-row date-row-start">
              <span class="label"><i class="fa-regular fa-calendar-check"></i> เริ่มต้น</span>
              <span class="value">${item.startDate}</span>
            </div>
            <div class="date-row date-row-end">
              <span class="label"><i class="fa-regular fa-calendar-xmark"></i> สิ้นสุด</span>
              <span class="value">${new Date(item.endDate).toLocaleDateString('th-TH', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          </div>

          <div class="card-actions">
            <button class="btn btn-bid" onclick="openBidModal('${item.id}')">
              <i class="fa-solid fa-gavel"></i> เสนอราคาประมูล
            </button>
            <button class="btn btn-view" onclick="openDetailModal('${item.id}')" title="ดูรายละเอียด">
              <i class="fa-regular fa-eye"></i> ดูรายละเอียด
            </button>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

function setOtherProfileTab(tab) {
  otherProfileActiveTab = tab;
  document.querySelectorAll('#otherProfileFilterTabs .profile-tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-tab') === tab);
  });
  renderOtherProfileAuctions();
}

function filterOtherProfileAuctions(keyword) {
  otherProfileSearchQuery = keyword || '';
  renderOtherProfileAuctions();
}

// Report User Modal Handling
function openReportUserModal() {
  if (!currentTargetProfile) return;

  const modal = document.getElementById('reportUserModal');
  if (!modal) return;

  const avatar = document.getElementById('reportTargetAvatar');
  const name = document.getElementById('reportTargetName');
  const nick = document.getElementById('reportTargetNick');

  if (avatar) avatar.src = currentTargetProfile.avatar;
  if (name) name.textContent = currentTargetProfile.fullName;
  if (nick) nick.textContent = `@${currentTargetProfile.nickname}`;

  modal.classList.add('open');
}

function closeReportUserModal() {
  const modal = document.getElementById('reportUserModal');
  if (modal) modal.classList.remove('open');
}

function handleSubmitReportUser(event) {
  if (event) event.preventDefault();

  if (!currentTargetProfile) return;

  const selectedReason = document.querySelector('input[name="reportReason"]:checked');
  const detailsEl = document.getElementById('reportDetails');

  const reason = selectedReason ? selectedReason.value : 'พฤติกรรมไม่เหมาะสมทั่วไป';
  const details = detailsEl ? detailsEl.value.trim() : '';

  const newReport = {
    id: 'rep-' + Date.now(),
    targetUserId: currentTargetProfile.id,
    targetNickname: currentTargetProfile.nickname,
    targetFullName: currentTargetProfile.fullName,
    reportedBy: currentUser.nickname,
    reason: reason,
    details: details,
    createdAt: new Date().toISOString(),
    status: 'PENDING_REVIEW'
  };

  const reports = loadUserReports();
  reports.unshift(newReport);
  saveUserReports(reports);

  closeReportUserModal();
  if (detailsEl) detailsEl.value = '';

  showToast(`ส่งรายงานผู้ใช้ [ @${currentTargetProfile.nickname} ] สำเร็จเรียบร้อย! ทีมงานความปลอดภัยจะดำเนินการตรวจสอบภายใน 24 ชม.`);
}

function handleOtherProfileChat() {
  if (!currentTargetProfile) return;

  // Check if current user has a WON order with this seller
  const orders = loadOrders();
  const wonOrder = orders.find(o => {
    if (o.status !== 'WON') return false;
    const sNick = o.seller ? (o.seller.nickname || '').toLowerCase() : '';
    return sNick === currentTargetProfile.nickname.toLowerCase();
  });

  if (wonOrder) {
    window.location.href = `chat.html?orderId=${encodeURIComponent(wonOrder.orderId)}`;
  } else {
    showToast(`สิทธิ์ห้องแชต P2P สงวนไว้เฉพาะผู้ชนะการประมูลของ [@${currentTargetProfile.nickname}] เท่านั้น สามารถกด "จำลองการชนะประมูล" ในแถบกระดิ่งเพื่อทดสอบได้ครับ`);
  }
}

// ==========================================================================
// ORDERS DETAIL PAGE ENGINE (ordersdetail.html)
// ==========================================================================
let currentSelectedOrder = null;
let activeOrderTab = 'current';

function getStatusClass(status) {
  switch ((status || '').toUpperCase()) {
    case 'PENDING_PAYMENT': return 'status-pending-payment';
    case 'WINNING': return 'status-winning';
    case 'OUTBID': return 'status-outbid';
    case 'WON': return 'status-won';
    case 'PAID': return 'status-paid';
    case 'SHIPPED': return 'status-shipped';
    case 'COMPLETED': return 'status-completed';
    default: return 'status-ended';
  }
}

function getStatusLabel(status) {
  switch ((status || '').toUpperCase()) {
    case 'PENDING_PAYMENT': return 'กำลังรอชำระเงิน';
    case 'WINNING': return 'กำลังนำการประมูล (ราคาสูงสุด)';
    case 'OUTBID': return 'โดนแซงราคาแล้ว (ต้องเสนอราคาเพิ่ม)';
    case 'WON': return 'ชนะการประมูลแล้ว';
    case 'PAID': return 'ชำระเงินแล้ว (รอผู้ขายจัดส่ง)';
    case 'SHIPPED': return 'จัดส่งสินค้าแล้ว';
    case 'COMPLETED': return 'ได้รับสินค้าแล้ว (ปิดคำสั่งซื้อ)';
    default: return 'สิ้นสุดการประมูลแล้ว';
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
    categoryLabel: 'การ์ดสะสมหายาก',
    image: 'https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?auto=format&fit=crop&w=1200&q=80',
    winningBid: 12500000,
    latestBid: 12500000,
    status: 'WON',
    paymentStatus: 'UNPAID',
    shippingStatus: 'AWAITING_PAYMENT',
    trackingNumber: '',
    carrier: '',
    seller: {
      nickname: 'KyotoVault_Cards',
      name: 'Kyoto Rare Collectibles Japan',
      rating: '5.0 ★ (94 รีวิว)',
      verified: true,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
      onlineStatus: 'ออนไลน์ขณะนี้'
    },
    unreadCount: 1,
    lastMessageSnippet: 'เรากำลังจัดเตรียมเคสอะคริลิกกันรังสี UV และเอกสารอนุญาตส่งออก รบกวนคุณ Alexander ยืนยันที่อยู่จัดส่ง...',
    lastMessageDate: '8 ก.ย. 2026',
    lastMessageTime: '14:20',
    lastMessageFull: '8 ก.ย. 2026 • 14:20',
    lastMessageIsRead: false,
    messages: [
      {
        id: 'msg-sys-1',
        sender: 'system',
        isOwner: false,
        text: '🏆 ขอแสดงความยินดีกับคุณ Alexander! คุณชนะการประมูลรายการนี้แล้ว ช่องทางสนทนาส่วนตัว P2P กับ [@KyotoVault_Cards] ปลดล็อกแล้วภายใต้ระบบคุ้มครองการชำระเงินของ STARTASS',
        date: '8 ก.ย. 2026',
        time: '14:15',
        fullTimestamp: '8 ก.ย. 2026, 14:15',
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
          categoryLabel: 'การ์ดสะสมหายาก',
          latestBid: 12500000,
          bidStatus: 'ราคาชนะการประมูล (ผู้ชนะการประมูล)'
        },
        text: 'สวัสดีครับคุณ Alexander! ขอแสดงความยินดีด้วยที่คุณชนะการประมูล Shadowless Charizard PSA 10 Gem Mint ขณะนี้การ์ดถูกเก็บรักษาอย่างปลอดภัยในห้องนิรภัยควบคุมอุณหภูมิระดับพิพิธภัณฑ์ของเราที่เกียวโต',
        date: '8 ก.ย. 2026',
        time: '14:18',
        fullTimestamp: '8 ก.ย. 2026, 14:18',
        isRead: true
      },
      {
        id: 'msg-s-2',
        sender: 'seller',
        isOwner: true,
        senderName: '[ @KyotoVault_Cards ]',
        senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
        text: 'เรากำลังจัดเตรียมเคสอะคริลิกกันรังสี UV และเอกสารอนุญาตส่งออก รบกวนคุณ Alexander ยืนยันที่อยู่จัดส่งและปลายทางรับมอบสำหรับบริการขนส่งด่วน DHL Express พร้อมประกันภัยด้วยครับ',
        date: '8 ก.ย. 2026',
        time: '14:20',
        fullTimestamp: '8 ก.ย. 2026, 14:20',
        isRead: false
      }
    ]
  },
  'ORD-AUC-03': {
    orderId: 'ORD-AUC-03',
    itemId: 'auc-03',
    title: 'Patek Philippe Grandmaster Chime 6300G-001 ทองคำขาว',
    category: 'tech',
    categoryLabel: 'นาฬิกาหรูระดับมาสเตอร์พีซ',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80',
    winningBid: 145000000,
    latestBid: 145000000,
    status: 'WON',
    paymentStatus: 'PAID',
    paidAmount: 145000000,
    paidAt: '8 ก.ย. 2026, 11:30',
    shippingStatus: 'SHIPPED',
    trackingNumber: 'BRINKS-GL-99201',
    carrier: 'Brinks Global Armored Logistics',
    shippedAt: '8 ก.ย. 2026, 11:45',
    seller: {
      nickname: 'GenevaVault_CH',
      name: 'Geneva Horology Antiquities SA',
      rating: '5.0 ★ (62 รีวิว)',
      verified: true,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
      onlineStatus: 'ออนไลน์เมื่อ 15 นาทีที่แล้ว'
    },
    unreadCount: 0,
    lastMessageSnippet: 'รถขนส่งนิรภัยหุ้มเกราะ Brinks Global มีกำหนดการเข้ารับสินค้าเพื่อเริ่มส่งมอบในวันพรุ่งนี้ช่วงเช้าครับ',
    lastMessageDate: '8 ก.ย. 2026',
    lastMessageTime: '11:45',
    lastMessageFull: '8 ก.ย. 2026 • 11:45',
    lastMessageIsRead: true,
    messages: [
      {
        id: 'msg-sys-3',
        sender: 'system',
        isOwner: false,
        text: '🏆 ขอแสดงความยินดีกับคุณ Alexander! คุณชนะการประมูล Patek Philippe Grandmaster Chime ได้รับการยืนยันยอดชำระเงินเรียบร้อยแล้วที่ ฿145,000,000',
        date: '8 ก.ย. 2026',
        time: '11:30',
        fullTimestamp: '8 ก.ย. 2026, 11:30',
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
          title: 'Patek Philippe Grandmaster Chime 6300G-001 ทองคำขาว',
          image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80',
          category: 'tech',
          categoryLabel: 'นาฬิกาหรูระดับมาสเตอร์พีซ',
          latestBid: 145000000,
          bidStatus: 'ราคาชนะการประมูล (ผู้ชนะการประมูล)'
        },
        text: 'สวัสดีครับคุณ Alexander! เราได้บรรจุนาฬิกาตัวเรือนสองหน้าลงในหีบนำเสนอพิเศษพร้อมสูติบัตรและใบรับรองแท้ดั้งเดิมจาก Patek Philippe เรียบร้อยแล้ว',
        date: '8 ก.ย. 2026',
        time: '11:40',
        fullTimestamp: '8 ก.ย. 2026, 11:40',
        isRead: true
      },
      {
        id: 'msg-s-4',
        sender: 'seller',
        isOwner: true,
        senderName: '[ @GenevaVault_CH ]',
        senderAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
        text: 'รถขนส่งนิรภัยหุ้มเกราะ Brinks Global มีกำหนดการเข้ารับสินค้าเพื่อเริ่มส่งมอบในวันพรุ่งนี้ช่วงเช้าครับ',
        date: '8 ก.ย. 2026',
        time: '11:45',
        fullTimestamp: '8 ก.ย. 2026, 11:45',
        isRead: true
      }
    ]
  },
  'ORD-AUC-01': {
    orderId: 'ORD-AUC-01',
    itemId: 'auc-01',
    title: '1967 Shelby GT500 Fastback "Eleanor Edition"',
    category: 'cars',
    categoryLabel: 'โมเดลรถยนต์ & ซูเปอร์คาร์',
    image: 'https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&fit=crop&w=1200&q=80',
    winningBid: 16800000,
    latestBid: 16800000,
    status: 'WON',
    paymentStatus: 'UNPAID',
    shippingStatus: 'AWAITING_PAYMENT',
    trackingNumber: '',
    carrier: '',
    seller: {
      nickname: 'ApexMotors_NY',
      name: 'Apex Classic Motoring LLC',
      rating: '4.9 ★ (128 รีวิว)',
      verified: true,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
      onlineStatus: 'ออนไลน์ขณะนี้'
    },
    unreadCount: 0,
    lastMessageSnippet: 'เราได้ตรวจสอบยอดชนะประมูลของคุณที่ ฿16,800,000 แล้ว เอกสารรับรองจาก Shelby Registry พร้อมส่งมอบแล้วครับ',
    lastMessageDate: '8 ก.ย. 2026',
    lastMessageTime: '09:15',
    lastMessageFull: '8 ก.ย. 2026 • 09:15',
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
          categoryLabel: 'โมเดลรถยนต์ & ซูเปอร์คาร์',
          latestBid: 16800000,
          bidStatus: 'ราคาชนะการประมูล (ผู้ชนะการประมูล)'
        },
        text: 'สวัสดีครับคุณ Alexander! ขอแสดงความยินดีที่คุณชนะการประมูลรายการ Eleanor GT500 เราได้ตรวจสอบยอดชนะประมูลของคุณที่ ฿16,800,000 เรียบร้อยแล้ว เอกสารรับรองจาก Carroll Shelby Registry ได้รับการจัดเตรียมไว้พร้อมแล้วครับ',
        date: '8 ก.ย. 2026',
        time: '09:15',
        fullTimestamp: '8 ก.ย. 2026, 09:15',
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
        for (const k in DEFAULT_P2P_CHATS) {
          if (!parsed[k] || !parsed[k].messages || parsed[k].messages.length === 0) {
            parsed[k] = JSON.parse(JSON.stringify(DEFAULT_P2P_CHATS[k]));
            needsSave = true;
          } else if (parsed[k].paymentStatus === undefined) {
            parsed[k].paymentStatus = DEFAULT_P2P_CHATS[k].paymentStatus || 'UNPAID';
            parsed[k].shippingStatus = DEFAULT_P2P_CHATS[k].shippingStatus || 'AWAITING_PAYMENT';
            parsed[k].trackingNumber = DEFAULT_P2P_CHATS[k].trackingNumber || '';
            parsed[k].carrier = DEFAULT_P2P_CHATS[k].carrier || '';
            needsSave = true;
          }
          if (parsed[k] && parsed[k].status !== 'WON') {
            parsed[k].status = 'WON';
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
      rating: '4.9 ★ (128 รีวิว)',
      verified: true,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
      onlineStatus: 'ออนไลน์ขณะนี้'
    };
    const todayDate = new Date().toLocaleDateString('th-TH', { month: 'short', day: 'numeric', year: 'numeric' });
    const nowTime = new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });
    const fullTs = `${todayDate}, ${nowTime}`;

    chats[order.orderId] = {
      orderId: order.orderId,
      itemId: order.itemId,
      title: order.title,
      category: order.category || 'collectibles',
      categoryLabel: order.categoryLabel || 'ของสะสมพิเศษ',
      image: order.image,
      winningBid: order.userBid,
      latestBid: order.currentBid || order.userBid,
      status: order.status || 'WON',
      paymentStatus: 'UNPAID',
      shippingStatus: 'AWAITING_PAYMENT',
      trackingNumber: '',
      carrier: '',
      seller: seller,
      unreadCount: 1,
      lastMessageSnippet: `สวัสดีครับคุณ Alexander! ขอแสดงความยินดีที่คุณชนะการประมูล "${order.title}"`,
      lastMessageDate: todayDate,
      lastMessageTime: nowTime,
      lastMessageFull: `${todayDate} • ${nowTime}`,
      lastMessageIsRead: false,
      messages: [
        {
          id: 'msg-sys-' + Date.now(),
          sender: 'system',
          isOwner: false,
          text: `🏆 ขอแสดงความยินดีกับคุณ Alexander! คุณชนะการประมูลรายการ "${order.title}" แล้ว ช่องทางสนทนาส่วนตัว P2P กับผู้ขายปลดล็อกแล้วภายใต้ระบบคุ้มครองการชำระเงินของ STARTASS`,
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
            categoryLabel: order.categoryLabel || 'ของสะสมพิเศษ',
            latestBid: order.userBid,
            bidStatus: 'ราคาชนะการประมูล (ผู้ชนะการประมูล)'
          },
          text: `สวัสดีครับคุณ Alexander! ขอแสดงความยินดีที่คุณชนะการประมูล "${order.title}" เราได้ตรวจสอบยอดชนะประมูลของคุณที่ ${formatCurrency(order.userBid)} เรียบร้อยแล้ว รบกวนแจ้งคำแนะนำการจัดส่งและวันเวลาที่สะดวกรับมอบสินค้าด้วยครับ`,
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
  window.location.href = `chat.html?orderId=${encodeURIComponent(orderId)}`;
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
      <strong style="display:block; font-size:0.95rem; color:#fbbf24;">สิทธิ์การสนทนา P2P ยังไม่เปิดใช้งาน</strong>
      <span style="font-size:0.84rem; color:#cbd5e1; display:block; margin: 3px 0 6px;">
        สิทธิ์การสนทนา P2P โดยตรงกับผู้ขาย [@${sellerNickname || 'ผู้ขาย'}] จะปลดล็อกเฉพาะผู้ที่ชนะการประมูล (Auction Won) เท่านั้นเพื่อความปลอดภัย
      </span>
      <div style="display:flex; gap:8px; align-items:center;">
        <button type="button" class="btn-toast-raise" onclick="simulateAuctionWon(null, event)">
          <i class="fa-solid fa-trophy"></i> ⚡ จำลองการชนะประมูลเพื่อทดสอบ P2P Chat
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

  const nowStr = new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });
  const newMsg = {
    id: 'msg-u-' + Date.now(),
    sender: 'user',
    text: text,
    time: nowStr
  };
  chat.messages.push(newMsg);
  chat.lastMessageTime = 'เมื่อสักครู่';
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

    const sellerName = currentChat.seller ? currentChat.seller.nickname : 'ผู้ขาย';
    const autoReplies = [
      `ขอบคุณสำหรับการยืนยันครับคุณ Alexander! ทีมงานฝ่ายจัดส่งของเรากำลังเตรียมเอกสารสำหรับ "${currentChat.title}" เราจะแจ้งหมายเลขติดตามรถขนส่ง White-Glove ภายใน 1 ชั่วโมงนี้ครับ`,
      `รับทราบเรียบร้อยครับ! เราได้บันทึกข้อมูลนี้ลงในระบบความปลอดภัยสำหรับการชำระเงิน สำหรับคำสั่งซื้อ #${orderId} แล้ว ใบรับรองและเอกสารทั้งหมดถูกบรรจุในซีลกันการปลอมแปลงเรียบร้อยครับ`,
      `เข้าใจแล้วครับคุณ Alexander ทางบริษัทขนส่งนิรภัยพร้อมประกันภัยเต็มวงเงินได้ยืนยันรอบเวลาการจัดส่งแล้ว เราจะส่งลิงก์ติดตามตำแหน่ง GPS แบบเรียลไทม์ให้ในห้องแชตนี้เร็วๆ นี้ครับ`,
      `รับทราบครับ! ขอบคุณสำหรับการประสานงานที่รวดเร็ว เรากำลังประสานงานโดยตรงกับฝ่ายชำระเงินของ STARTASS เพื่อยืนยันการส่งมอบครับ`
    ];
    const replyText = autoReplies[Math.floor(Math.random() * autoReplies.length)];

    currentChat.messages.push({
      id: 'msg-s-' + Date.now(),
      sender: 'seller',
      text: replyText,
      time: new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })
    });
    currentChat.lastMessageTime = 'เมื่อสักครู่';
    saveP2PChats(updatedChats);

    renderP2PActiveChatMessages(orderId);
    renderP2PConversationsList();
    scrollP2PChatToBottom();
    showToast(`ข้อความใหม่จาก [@${sellerName}]: "${replyText.slice(0, 48)}..."`);
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
    const senderName = isUser ? 'Alexander Sterling (คุณ)' : `[ @${selectedChat.seller ? selectedChat.seller.nickname : 'ผู้ขาย'} ]`;

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
  const wonOrders = orders.filter(o => o.status === 'WON' || o.status === ORDER_STATUS_ENUM.PENDING_PAYMENT || o.status === ORDER_STATUS_ENUM.PAID);
  const chats = loadP2PChats();

  container.innerHTML = wonOrders.map(o => {
    const chatData = chats[o.orderId] || initP2PChatForOrder(o);
    const isSel = o.orderId === selectedP2PChatOrderId;
    const lastMsg = chatData.messages && chatData.messages.length > 0
      ? chatData.messages[chatData.messages.length - 1].text
      : 'พร้อมเริ่มการสนทนา...';
    const lastTime = chatData.lastMessageTime || 'เมื่อสักครู่';
    const seller = o.seller || { nickname: 'ผู้ขาย', avatar: '' };

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

  targetOrder.status = ORDER_STATUS_ENUM.PENDING_PAYMENT;
  targetOrder.statusLabel = 'กำลังรอชำระเงิน';
  targetOrder.paymentStatus = 'UNPAID';
  targetOrder.shippingStatus = 'UNPAID';
  targetOrder.updatedAt = new Date().toLocaleString('th-TH', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });

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
    title: '🏆 คุณชนะการประมูลแล้ว! (กำลังรอชำระเงิน)',
    message: `ยินดีด้วย! คุณชนะการประมูล "${targetOrder.title}" ในราคา ${formatCurrency(targetOrder.userBid)} สถานะคำสั่งซื้อ: [กำลังรอชำระเงิน] กรุณาดำเนินการชำระเงินเพื่อดำเนินการจัดส่งสินค้า`,
    itemTitle: targetOrder.title,
    time: 'เมื่อสักครู่',
    read: false,
    createdAt: new Date().toISOString()
  };
  notifications.unshift(wonNotif);
  saveNotifications(notifications);

  updateNotificationBadge();
  renderNotificationsList();
  showToast(`🎉 ขอแสดงความยินดี! คุณชนะการประมูลคำสั่งซื้อ #${targetOrder.orderId}! (สถานะ: กำลังรอชำระเงิน)`);

  // Switch to chat tab or select standalone chat or re-render order view
  if (document.getElementById('standaloneChatContainer')) {
    selectStandaloneChat(targetOrder.orderId);
  } else if (document.getElementById('orderDetailContainer')) {
    if (typeof currentOrdersViewMode !== 'undefined' && currentOrdersViewMode === 'list') {
      renderOrdersList(currentOrdersFilterTab);
    } else {
      renderOrderDetail(targetOrder.orderId);
    }
  } else {
    openSellerP2PChat(targetOrder.orderId);
  }
}

function renderP2PSection(orderId) {
  const orders = loadOrders();
  const currentOrder = orders.find(o => o.orderId === orderId) || orders[0];
  if (!currentOrder) return '';

  const isWon = currentOrder.status === 'WON' || currentOrder.status === ORDER_STATUS_ENUM.PENDING_PAYMENT || currentOrder.status === ORDER_STATUS_ENUM.PAID;
  const wonOrders = orders.filter(o => o.status === 'WON' || o.status === ORDER_STATUS_ENUM.PENDING_PAYMENT || o.status === ORDER_STATUS_ENUM.PAID);
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
            <h3>สิทธิ์การสนทนา P2P ยังไม่เปิดใช้งาน</h3>
            <p>
              ห้องสนทนาส่วนตัวแบบ P2P ระหว่างผู้ซื้อและผู้ขาย <strong>[@${currentOrder.seller ? currentOrder.seller.nickname : 'ผู้ขาย'}]</strong> จะเปิดให้ใช้งาน <strong>เฉพาะผู้ชนะการประมูล</strong> เท่านั้น เพื่อความปลอดภัยของระบบชำระเงิน และการประสานงานจัดส่งระดับพรีเมียม White-Glove
            </p>
          </div>
        </div>

        <div class="p2p-locked-status-box">
          <div class="status-item">
            <span class="label">คำสั่งซื้อการประมูล:</span>
            <span class="val">#${currentOrder.orderId} (${currentOrder.title})</span>
          </div>
          <div class="status-item">
            <span class="label">สถานะการประมูลของคุณ:</span>
            <span class="val status-pill status-${currentOrder.status.toLowerCase()}">${currentOrder.statusLabel || currentOrder.status}</span>
          </div>
          <div class="status-item">
            <span class="label">สิทธิ์การเข้าถึงห้องแชต P2P:</span>
            <span class="val" style="color:#ef4444;"><i class="fa-solid fa-ban"></i> จำกัดสิทธิ์จนกว่าจะชนะการประมูล</span>
          </div>
        </div>

        <div class="p2p-locked-actions">
          <button type="button" class="btn btn-simulate-won-cta" onclick="simulateAuctionWon('${currentOrder.orderId}')">
            <i class="fa-solid fa-trophy"></i>
            <span>⚡ จำลองการชนะประมูลเพื่อปลดล็อก P2P ทันที</span>
          </button>
        </div>

        ${wonOrders.length > 0 ? `
          <div class="p2p-other-won-notice">
            <span><i class="fa-solid fa-circle-check" style="color:#10b981;"></i> คุณมีคำสั่งซื้ออื่นที่ชนะการประมูลแล้วและสามารถสนทนา P2P ได้:</span>
            <div class="p2p-won-chips">
              ${wonOrders.map(wo => `
                <button type="button" class="btn-p2p-chip" onclick="openSellerP2PChat('${wo.orderId}')">
                  <img src="${wo.image}" alt="${wo.title}">
                  <span>#${wo.orderId} - @${wo.seller ? wo.seller.nickname : 'ผู้ขาย'}</span>
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
      : 'พร้อมสำหรับการสนทนา...';
    const lastTime = chatData.lastMessageTime || 'เมื่อสักครู่';
    const seller = o.seller || { nickname: 'ผู้ขาย', avatar: '' };

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
    const senderName = isUser ? 'Alexander Sterling (คุณ)' : `[ @${selectedChat.seller ? selectedChat.seller.nickname : 'ผู้ขาย'} ]`;

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
            <span>รายการสนทนา</span>
          </div>
          <span class="p2p-won-badge"><i class="fa-solid fa-trophy"></i> ${wonOrders.length} ดีลที่ชนะ</span>
        </div>

        <div class="p2p-conv-search-box">
          <i class="fa-solid fa-magnifying-glass"></i>
          <input type="text" id="p2pSearchInput" placeholder="ค้นหาผู้ขายหรือสินค้า..." oninput="filterP2PConversations(this.value)">
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
              <img src="${selectedChat.seller ? selectedChat.seller.avatar : ''}" alt="รูปโปรไฟล์ผู้ขาย" class="p2p-header-avatar">
              <span class="p2p-online-indicator"></span>
            </div>
            <div>
              <div class="p2p-header-nickname">
                <strong style="font-size:1.05rem; color:#fff;">${selectedChat.seller ? selectedChat.seller.name : 'ผู้ขาย'}</strong>
                <span class="chat-header-username-small">@${selectedChat.seller ? selectedChat.seller.nickname : 'ผู้ขาย'}</span>
              </div>
              <div class="p2p-header-subtext">
                <span style="color:#10b981;"><i class="fa-solid fa-circle" style="font-size:0.5rem;"></i> ใช้งานอยู่</span>
              </div>
            </div>
          </div>

          <div class="p2p-chat-header-actions">
            <span class="p2p-escrow-pill">
              <i class="fa-solid fa-lock"></i> คุ้มครองความปลอดภัยในการชำระเงิน
            </span>
          </div>
        </header>

        <!-- Won Auction Product Reference Strip -->
        <div class="p2p-deal-product-strip">
          <img src="${selectedChat.image}" alt="${selectedChat.title}" class="p2p-strip-thumb">
          <div class="p2p-strip-meta">
            <span class="p2p-strip-won-tag"><i class="fa-solid fa-trophy"></i> ชนะการประมูล</span>
            <strong class="p2p-strip-title">${selectedChat.title}</strong>
            <span class="p2p-strip-price">ราคาชนะประมูล: <strong>${formatCurrency(selectedChat.winningBid)}</strong> (คำสั่งซื้อ #${selectedChat.orderId})</span>
          </div>
        </div>

        <!-- Chat Message Timeline -->
        <div class="p2p-messages-history" id="p2pMessagesHistory">
          ${messagesHtml}
        </div>

        <!-- Quick Prompt Chips -->
        <div class="p2p-quick-prompts-bar">
          <span class="quick-prompts-label"><i class="fa-solid fa-bolt"></i> เมนูลัด:</span>
          <div class="quick-prompts-scroll">
            <button type="button" class="btn-quick-prompt" onclick="handleQuickPrompt('${selectedChat.orderId}', '📍 ยืนยันที่อยู่จัดส่ง: 450 Lexington Ave, New York, NY 10017 พร้อมรับมอบสินค้าครับ')">
              📍 ยืนยันที่อยู่จัดส่ง
            </button>
            <button type="button" class="btn-quick-prompt" onclick="handleQuickPrompt('${selectedChat.orderId}', '📜 รบกวนส่งเอกสาร Certificate of Authenticity และผลตรวจสอบเบื้องต้นให้ดูทางนี้ด้วยครับ')">
              📜 ขอใบรับรอง COA
            </button>
            <button type="button" class="btn-quick-prompt" onclick="handleQuickPrompt('${selectedChat.orderId}', '🛡️ ยอดชำระเงินปลอดภัยเรียบร้อย พร้อมประสานงานปล่อยยอดเมื่อได้รับของครับ')">
              🛡️ ยืนยันการชำระเงิน
            </button>
            <button type="button" class="btn-quick-prompt" onclick="handleQuickPrompt('${selectedChat.orderId}', '🚚 รบกวนแจ้งเวลาที่รถขนส่ง White-Glove พร้อมเข้ามาส่งมอบด้วยครับ')">
              🚚 นัดหมายเวลาจัดส่ง
            </button>
          </div>
        </div>

        <!-- Message Composer Input Bar -->
        <form class="p2p-chat-input-bar" onsubmit="handleSendP2PMessage(event, '${selectedChat.orderId}')">
          <input type="text" id="p2pMessageInput" class="p2p-message-input" placeholder="พิมพ์ข้อความถึง [ @${selectedChat.seller ? selectedChat.seller.nickname : 'ผู้ขาย'} ]..." autocomplete="off" required>
          <button type="submit" class="btn-chat-send" title="ส่งข้อความ">
            <i class="fa-solid fa-paper-plane"></i>
            <span>ส่ง</span>
          </button>
        </form>

      </main>

    </div>
  `;
}

function navigateToOrderChat(itemId) {
  const orders = loadOrders();
  const matched = orders.find(o => o.itemId === itemId || o.orderId === itemId);
  const targetId = matched ? matched.orderId : itemId;
  window.location.href = `chat.html?orderId=${encodeURIComponent(targetId)}`;
}

let currentOrdersViewMode = 'list'; // 'list' | 'detail'
let currentOrdersFilterTab = 'all'; // 'all' | 'pending' | 'paid' | 'bidding'

function initOrderDetailPage() {
  const container = document.getElementById('orderDetailContainer');
  if (!container) return;

  const urlParams = new URLSearchParams(window.location.search);
  const targetId = urlParams.get('id') || urlParams.get('orderId');
  const targetTab = urlParams.get('tab');
  const targetView = urlParams.get('view');

  if (targetTab === 'chat') {
    window.location.href = `chat.html?orderId=${encodeURIComponent(targetId || 'ORD-AUC-02')}`;
    return;
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

  // If a specific ID is present and view is not explicitly forced to 'list', show detail
  if (targetId && targetView !== 'list') {
    currentOrdersViewMode = 'detail';
    renderOrderDetail(targetId);
  } else {
    currentOrdersViewMode = 'list';
    renderOrdersList(currentOrdersFilterTab);
  }

  if (urlParams.get('payment') === 'success' || urlParams.get('paid') === '1') {
    setTimeout(() => {
      showToast('🎉 ดำเนินการชำระเงินสำเร็จ! เงินเข้าสู่ระบบคุ้มครอง Escrow ปลอดภัย 100%');
    }, 450);
  }
}

// Global popstate listener for back/forward browser buttons
if (typeof window !== 'undefined') {
  window.addEventListener('popstate', (event) => {
    const container = document.getElementById('orderDetailContainer');
    if (!container) return;

    const urlParams = new URLSearchParams(window.location.search);
    const targetId = urlParams.get('id') || urlParams.get('orderId');
    if (targetId && urlParams.get('view') !== 'list') {
      currentOrdersViewMode = 'detail';
      renderOrderDetail(targetId);
    } else {
      currentOrdersViewMode = 'list';
      renderOrdersList(currentOrdersFilterTab);
    }
  });
}

function switchOrdersView(mode, orderId) {
  currentOrdersViewMode = mode;
  if (mode === 'detail' && orderId) {
    try {
      const newUrl = `${window.location.pathname}?id=${encodeURIComponent(orderId)}`;
      window.history.pushState({ orderId, view: 'detail' }, '', newUrl);
    } catch (e) {}
    renderOrderDetail(orderId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    try {
      const newUrl = window.location.pathname;
      window.history.pushState({ view: 'list' }, '', newUrl);
    } catch (e) {}
    renderOrdersList(currentOrdersFilterTab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

function filterOrdersTab(tab) {
  currentOrdersFilterTab = tab;
  renderOrdersList(tab);
}

function renderOrdersList(filterTab = 'all') {
  const container = document.getElementById('orderDetailContainer');
  if (!container) return;

  currentOrdersViewMode = 'list';
  currentOrdersFilterTab = filterTab;

  const orders = loadOrders();

  // Counts for tabs
  const pendingOrders = orders.filter(o => o.status === ORDER_STATUS_ENUM.PENDING_PAYMENT || (o.status === 'WON' && o.paymentStatus !== 'PAID'));
  const paidOrders = orders.filter(o => o.status === ORDER_STATUS_ENUM.PAID || o.paymentStatus === 'PAID');
  const biddingOrders = orders.filter(o => o.status === ORDER_STATUS_ENUM.WINNING || o.status === ORDER_STATUS_ENUM.OUTBID);

  let filteredOrders = orders;
  if (filterTab === 'pending') {
    filteredOrders = pendingOrders;
  } else if (filterTab === 'paid') {
    filteredOrders = paidOrders;
  } else if (filterTab === 'bidding') {
    filteredOrders = biddingOrders;
  }

  const cardsHtml = filteredOrders.length > 0
    ? filteredOrders.map(o => renderSingleOrderCardHTML(o)).join('')
    : `
      <div class="orders-empty-filter-state" style="grid-column: 1 / -1;">
        <i class="fa-solid fa-inbox"></i>
        <h3 style="font-size: 1.25rem; color: #fff; margin: 0;">ไม่พบรายการคำสั่งซื้อในหมวดหมู่นี้</h3>
        <p style="margin: 0; font-size: 0.88rem;">ไม่มีคำสั่งซื้อที่ตรงกับตัวกรองที่คุณเลือกในขณะนี้</p>
        <button type="button" class="btn btn-view" onclick="filterOrdersTab('all')" style="margin-top: 8px;">
          <i class="fa-solid fa-list-ul"></i> ดูคำสั่งซื้อทั้งหมด (${orders.length})
        </button>
      </div>
    `;

  container.innerHTML = `
    <!-- Breadcrumbs -->
    <nav class="order-breadcrumbs" aria-label="Breadcrumb">
      <a href="HomePage.html"><i class="fa-solid fa-house"></i> หน้าแรก</a>
      <span class="crumb-sep">/</span>
      <span class="crumb-active"><i class="fa-solid fa-receipt"></i> คำสั่งซื้อของฉัน</span>
    </nav>

    <!-- Orders List Hero Card -->
    <div class="orders-list-hero-card">
      <div class="orders-hero-content">
        <div class="orders-hero-pill">
          <i class="fa-solid fa-shield-halved"></i> STARTASS Escrow Protection
        </div>
        <h1 class="orders-hero-title">คำสั่งซื้อของฉัน <span>(My Orders)</span></h1>
        <p class="orders-hero-sub">
          ตรวจสอบและจัดการรายการคำสั่งซื้อที่ชนะการประมูล ชำระเงินค่าสินค้าผ่านระบบคุ้มครอง Escrow ปลอดภัย 100% และประสานงานจัดส่งแบบ White-Glove
        </p>
      </div>

      <div class="orders-hero-stats">
        <div class="orders-stat-badge stat-pending" onclick="filterOrdersTab('pending')" title="คลิกเพื่อกรองคำสั่งซื้อที่กำลังรอชำระเงิน" style="cursor: pointer;">
          <span class="stat-num">${pendingOrders.length}</span>
          <span class="stat-lbl">กำลังรอชำระเงิน</span>
        </div>
        <div class="orders-stat-badge stat-paid" onclick="filterOrdersTab('paid')" title="คลิกเพื่อกรองคำสั่งซื้อที่ชำระเงินแล้ว" style="cursor: pointer;">
          <span class="stat-num">${paidOrders.length}</span>
          <span class="stat-lbl">ชำระเงินแล้ว</span>
        </div>
      </div>
    </div>

    <!-- Filter Tabs Bar -->
    <div class="orders-filter-bar" role="tablist">
      <button type="button" class="btn-orders-tab ${filterTab === 'all' ? 'active' : ''}" onclick="filterOrdersTab('all')">
        <i class="fa-solid fa-list-ul"></i>
        <span>ทั้งหมด</span>
        <span class="tab-count-pill">${orders.length}</span>
      </button>

      <button type="button" class="btn-orders-tab ${filterTab === 'pending' ? 'active' : ''}" onclick="filterOrdersTab('pending')">
        <span class="status-pulse-dot" style="background: #fbbf24;"></span>
        <span>กำลังรอชำระเงิน</span>
        <span class="tab-count-pill pill-amber">${pendingOrders.length}</span>
      </button>

      <button type="button" class="btn-orders-tab ${filterTab === 'paid' ? 'active' : ''}" onclick="filterOrdersTab('paid')">
        <span class="status-pulse-dot" style="background: #10b981;"></span>
        <span>ชำระเงินแล้ว</span>
        <span class="tab-count-pill pill-green">${paidOrders.length}</span>
      </button>

      <button type="button" class="btn-orders-tab ${filterTab === 'bidding' ? 'active' : ''}" onclick="filterOrdersTab('bidding')">
        <i class="fa-solid fa-gavel"></i>
        <span>กำลังร่วมประมูล</span>
        <span class="tab-count-pill">${biddingOrders.length}</span>
      </button>
    </div>

    <!-- Orders Grid -->
    <div class="my-orders-grid">
      ${cardsHtml}
    </div>
  `;
}

function renderSingleOrderCardHTML(order) {
  const isPaid = order.status === ORDER_STATUS_ENUM.PAID || order.paymentStatus === 'PAID';
  const isPending = !isPaid && (order.status === ORDER_STATUS_ENUM.PENDING_PAYMENT || order.status === 'WON');
  const isWon = isPaid || isPending || order.status === 'WON';
  const isWinning = !isWon && isUserHighestBidder(order.itemId);

  let currentStatus = isWon 
    ? (isPaid ? ORDER_STATUS_ENUM.PAID : ORDER_STATUS_ENUM.PENDING_PAYMENT)
    : (isWinning ? ORDER_STATUS_ENUM.WINNING : ORDER_STATUS_ENUM.OUTBID);

  const statusClass = getStatusClass(currentStatus);
  const statusLabel = getStatusLabel(currentStatus);
  const seller = order.seller || { nickname: 'seller', name: 'Apex Classic Motoring' };
  const cardExtraClass = isPending ? 'card-pending-payment' : '';

  // Determine pricing display
  let priceRowHtml = '';
  if (isPending) {
    priceRowHtml = `
      <div class="my-order-price-row">
        <span class="price-title">ยอดที่ต้องชำระ:</span>
        <span class="price-val price-amber">${formatCurrency(order.userBid)}</span>
      </div>
    `;
  } else if (isPaid) {
    priceRowHtml = `
      <div class="my-order-price-row">
        <span class="price-title">ยอดชำระแล้ว:</span>
        <span class="price-val">${formatCurrency(order.paidAmount || order.userBid)}</span>
      </div>
    `;
  } else {
    priceRowHtml = `
      <div class="my-order-price-row">
        <span class="price-title">ราคาที่คุณเสนอ:</span>
        <span class="price-val" style="color: #38bdf8;">${formatCurrency(order.userBid)}</span>
      </div>
    `;
  }

  // Determine action buttons
  let actionsHtml = '';
  if (isPending) {
    actionsHtml = `
      <a href="Payment.html?orderId=${encodeURIComponent(order.orderId)}" class="btn-order-action-pay" title="คลิกเพื่อไปชำระเงินค่าสินค้า">
        <i class="fa-solid fa-credit-card"></i>
        <span>ชำระเงิน</span>
      </a>
      <button type="button" class="btn-order-action-detail" onclick="switchOrdersView('detail', '${order.orderId}')" title="ดูรายละเอียดคำสั่งซื้อ">
        <i class="fa-solid fa-file-invoice"></i> รายละเอียด
      </button>
    `;
  } else if (isPaid) {
    actionsHtml = `
      <button type="button" class="btn-order-action-p2p" onclick="openSellerP2PChat('${order.orderId}')" title="เปิดห้องแชตคุยกับผู้ขายโดยตรง">
        <i class="fa-solid fa-comments"></i> แชตกับผู้ขาย
      </button>
      <button type="button" class="btn-order-action-detail" onclick="switchOrdersView('detail', '${order.orderId}')" title="ดูรายละเอียดคำสั่งซื้อ">
        <i class="fa-solid fa-file-lines"></i> รายละเอียด
      </button>
    `;
  } else if (isWinning) {
    actionsHtml = `
      <button type="button" class="btn-order-action-detail btn-full" onclick="switchOrdersView('detail', '${order.orderId}')" title="ดูสถานะการประมูล">
        <i class="fa-solid fa-shield-halved"></i> ผู้นำราคา (ดูรายละเอียด)
      </button>
    `;
  } else {
    actionsHtml = `
      <button type="button" class="btn-order-action-raise" onclick="openBidModal('${order.itemId}')" title="คุณโดนแซงราคา! เสนอราคาเพิ่มเพื่อกลับมาเป็นผู้นำ">
        <i class="fa-solid fa-arrow-trend-up"></i> เสนอราคาเพิ่ม
      </button>
      <button type="button" class="btn-order-action-detail" onclick="switchOrdersView('detail', '${order.orderId}')" title="ดูรายละเอียด">
        <i class="fa-solid fa-file-lines"></i> รายละเอียด
      </button>
    `;
  }

  return `
    <div class="my-order-card ${cardExtraClass}" id="orderCard_${order.orderId}">
      <div class="my-order-card-header">
        <div class="my-order-id-wrap">
          <span class="my-order-id-label">คำสั่งซื้อ</span>
          <span class="my-order-id">#${order.orderId}</span>
        </div>
        <span class="order-status-badge ${statusClass}">
          <span class="status-pulse-dot"></span>
          ${statusLabel}
        </span>
      </div>

      <div class="my-order-card-body">
        <div class="my-order-thumb-wrap">
          <img src="${order.image}" alt="${order.title}" class="my-order-thumb">
          <span class="my-order-cat-tag">${order.categoryLabel || 'ของสะสม'}</span>
        </div>

        <div class="my-order-details">
          <h3 class="my-order-title" title="${order.title}">${order.title}</h3>
          <div class="my-order-seller-row">
            <i class="fa-solid fa-store"></i>
            <span>ผู้ขาย: <strong>@${seller.nickname || 'ApexMotors_NY'}</strong></span>
          </div>
          ${priceRowHtml}
        </div>
      </div>

      <div class="my-order-card-footer">
        ${actionsHtml}
      </div>
    </div>
  `;
}

function renderOrderDetail(orderId) {
  const container = document.getElementById('orderDetailContainer');
  if (!container) return;

  const orders = loadOrders();
  const order = orders.find(o => o.orderId === orderId || o.itemId === orderId) || orders[0];
  if (!order) return;
  currentSelectedOrder = order;

  // Find latest auction item data for live synchronization
  const liveItem = AUCTION_ITEMS.find(i => i.id === order.itemId);
  const currentBidAmount = liveItem ? liveItem.currentBid : order.currentBid;
  const bidsCount = liveItem ? (liveItem.bidsCount || 42) : 42;
  const bidHistory = (liveItem && liveItem.bidHistory && liveItem.bidHistory.length > 0) ? liveItem.bidHistory : [
    { user: 'Alexander Sterling (คุณ)', amount: order.userBid, time: 'เมื่อสักครู่' },
    { user: order.seller ? order.seller.nickname : 'ApexMotors_NY', amount: order.startPrice, time: '2 ชั่วโมงที่แล้ว' }
  ];

  // Check if auction is won or winning
  const isWon = order.status === ORDER_STATUS_ENUM.WON || order.status === ORDER_STATUS_ENUM.PENDING_PAYMENT || order.status === ORDER_STATUS_ENUM.PAID;
  const isPaid = order.status === ORDER_STATUS_ENUM.PAID || order.paymentStatus === 'PAID';
  const isPendingPayment = !isPaid && (order.status === ORDER_STATUS_ENUM.PENDING_PAYMENT || isWon);
  const isWinning = !isWon && isUserHighestBidder(order.itemId);
  const currentStatus = isWon 
    ? (isPaid ? ORDER_STATUS_ENUM.PAID : ORDER_STATUS_ENUM.PENDING_PAYMENT)
    : (isWinning ? ORDER_STATUS_ENUM.WINNING : ORDER_STATUS_ENUM.OUTBID);
  const statusClass = getStatusClass(currentStatus);
  const statusLabel = isWon
    ? (isPaid ? 'ชำระเงินแล้ว (รอผู้ขายจัดส่ง)' : 'กำลังรอชำระเงิน')
    : (isWinning ? 'กำลังนำการประมูล (ราคาสูงสุด)' : 'โดนแซงราคาแล้ว (ต้องเสนอราคาเพิ่ม)');

  const images = (order.images && order.images.length > 0) ? order.images : [order.image];
  const seller = order.seller || {
    nickname: 'ApexMotors_NY',
    name: 'Apex Classic Motoring LLC',
    rating: '4.9 ★ (รีวิว 128 รายการ)',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80'
  };

  const time = getTimeRemaining(order.endDate || new Date(Date.now() + 2 * 86400000).toISOString());
  const timerText = isWon
    ? (isPaid ? 'ชนะแล้ว (ชำระเงินเรียบร้อย)' : 'ชนะการประมูลแล้ว (กำลังรอชำระเงิน)')
    : (time.expired ? 'ปิดการประมูลแล้ว' : `${time.days} วัน ${time.hours} ชม. ${time.minutes} นาที ${time.seconds} วิ`);

  // Order Switcher Chips HTML
  const chipsHtml = orders.map(o => {
    const isAct = o.orderId === order.orderId;
    const isWonItem = o.status === ORDER_STATUS_ENUM.WON || o.status === ORDER_STATUS_ENUM.PENDING_PAYMENT || o.status === ORDER_STATUS_ENUM.PAID;
    const isPaidItem = isWonItem && (o.status === ORDER_STATUS_ENUM.PAID || o.paymentStatus === 'PAID');
    const isPendingItem = isWonItem && !isPaidItem;
    const oWinning = !isWonItem && isUserHighestBidder(o.itemId);
    const badgeClass = isPaidItem ? 'status-paid' : (isPendingItem ? 'status-pending-payment' : (oWinning ? 'status-winning' : 'status-outbid'));
    const badgeText = isPaidItem ? 'ชำระแล้ว' : (isPendingItem ? 'รอชำระ' : (oWinning ? 'กำลังนำ' : 'โดนแซง'));
    return `
      <div class="order-chip ${isAct ? 'active' : ''}" onclick="switchOrdersView('detail', '${o.orderId}')" title="${o.title}">
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
    const isUser = b.user.includes('Alexander') || b.user.includes('You') || b.user.includes('คุณ');
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
              ${isUser ? '<span class="bidder-tag-user">ราคาเสนอของคุณ</span>' : ''}
              ${isHighest ? '<span class="bidder-tag-highest"><i class="fa-solid fa-trophy"></i> ราคาสูงสุด</span>' : ''}
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
      <a href="HomePage.html"><i class="fa-solid fa-house"></i> หน้าแรก</a>
      <span class="crumb-sep">/</span>
      <button type="button" class="breadcrumb-link-btn" onclick="switchOrdersView('list')"><i class="fa-solid fa-receipt"></i> คำสั่งซื้อของฉัน</button>
      <span class="crumb-sep">/</span>
      <span class="crumb-active">คำสั่งซื้อ #${order.orderId}</span>
    </nav>

    <!-- Orders Switcher Strip -->
    <div class="order-switcher-container">
      <div class="order-switcher-header">
        <span class="order-switcher-title">
          <i class="fa-solid fa-layer-group"></i> รายการคำสั่งซื้อของคุณ (${orders.length})
        </span>
        <button type="button" class="btn-back-to-list" onclick="switchOrdersView('list')" title="กลับไปดูมุมมองรายการคำสั่งซื้อทั้งหมด">
          <i class="fa-solid fa-table-cells-large"></i> ดูแบบรายการทั้งหมด
        </button>
      </div>
      <div class="order-chips-scroll">
        ${chipsHtml}
      </div>
    </div>

    <!-- Header Status Banner -->
    <section class="order-header-banner">
      <div class="order-header-main">
        <div class="order-meta-row">
          <span class="order-id-badge">คำสั่งซื้อ #${order.orderId}</span>
          <span class="order-status-badge ${statusClass}">
            <span class="status-pulse-dot"></span>
            ${statusLabel}
          </span>
        </div>
        <div class="order-timestamps">
          <span><i class="fa-regular fa-calendar-check"></i> เสนอราคาเมื่อ: <strong>${order.placedAt || '8 ก.ย. 2026, 17:30'}</strong></span>
          <span><i class="fa-regular fa-clock"></i> อัปเดตล่าสุด: <strong>${order.updatedAt || '8 ก.ย. 2026, 18:45'}</strong></span>
        </div>
      </div>
      <div class="order-header-actions">
        <button type="button" class="btn btn-back-to-list" onclick="switchOrdersView('list')" title="กลับไปดูรายการคำสั่งซื้อทั้งหมด">
          <i class="fa-solid fa-arrow-left"></i> รายการคำสั่งซื้อทั้งหมด
        </button>
        ${isWon ? `
          ${isPendingPayment ? `
            <a href="Payment.html?orderId=${encodeURIComponent(order.orderId)}" class="btn btn-order-action-pay" style="padding: 8px 16px;" title="คลิกเพื่อดำเนินการชำระเงินค่าสินค้า">
              <i class="fa-solid fa-credit-card"></i> <span>ชำระเงิน</span>
            </a>
          ` : `
            <span class="order-escrow-paid-badge" title="ชำระเงินสำเร็จแล้ว">
              <i class="fa-solid fa-circle-check"></i> <span>ชำระเงินแล้ว</span>
            </span>
          `}
          <button type="button" class="btn btn-order-p2p" onclick="openSellerP2PChat('${order.orderId}')" title="เปิดห้องแชตคุยกับผู้ขายโดยตรง">
            <i class="fa-solid fa-comments"></i> แชต P2P กับผู้ขาย
          </button>
        ` : `
          <button type="button" class="btn btn-simulate-won-cta-mini" onclick="simulateAuctionWon('${order.orderId}', event)" title="จำลองการชนะประมูลเพื่อเปลี่ยนสถานะเป็นกำลังรอชำระเงิน">
            <i class="fa-solid fa-trophy"></i> ⚡ จำลองชนะประมูล
          </button>
          ${isWinning ? `
            <button type="button" class="btn btn-order-raise btn-bid-locked" disabled title="คุณเป็นผู้ให้ราคาสูงสุดแล้ว (${formatCurrency(order.userBid)}) ไม่สามารถเสนอราคาซ้ำจนกว่าจะมีผู้ประมูลอื่นเสนอราคาแข่ง">
              <i class="fa-solid fa-lock"></i> ผู้นำประมูล (ล็อก)
            </button>
          ` : `
            <button type="button" class="btn btn-order-raise btn-outbid-pulse" onclick="openBidModal('${order.itemId}')" title="คุณถูกเสนอราคาแซงแล้ว! คลิกเพื่อเสนอราคาเพิ่ม">
              <i class="fa-solid fa-arrow-trend-up"></i> เสนอราคาเพิ่มทันที
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
                <span class="status-pulse-dot"></span> ${statusLabel}
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
              <i class="fa-solid fa-store"></i> ข้อมูลผู้ขาย
            </span>
            <span class="seller-verified-pill">
              <i class="fa-solid fa-box-archive"></i> ผู้ขายในระบบ STARTASS
            </span>
          </div>

          <div class="seller-profile-row">
            <a href="OtherProfileDetail.html?user=${encodeURIComponent(seller.nickname || 'ApexMotors_NY')}" title="คลิกเพื่อดูโปรไฟล์ผู้ขาย" style="text-decoration: none;">
              <img src="${seller.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80'}" alt="${seller.nickname}" class="seller-avatar-img">
            </a>
            <div class="seller-details">
              <div class="seller-nickname">
                <span class="bracket">[</span>
                <a href="OtherProfileDetail.html?user=${encodeURIComponent(seller.nickname || 'ApexMotors_NY')}" style="color: #f59e0b; text-decoration: none;" title="คลิกเพื่อดูโปรไฟล์ผู้ขาย">@${seller.nickname || 'ApexMotors_NY'}</a>
                <span class="bracket">]</span>
              </div>
              <div class="seller-company-name">${seller.name || 'Apex Classic Motoring LLC'}</div>
              <div class="seller-stats-strip">
                <span class="seller-stat-pill"><i class="fa-solid fa-star"></i> ${seller.rating || '4.9 ★'}</span>
                <span>•</span>
                <span>ขายสำเร็จ ${seller.reviewsCount || 128} รายการ</span>
                <span>•</span>
                <span style="color: #34d399;"><i class="fa-solid fa-lock"></i> คุ้มครองการชำระเงิน</span>
              </div>
            </div>
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
                  <i class="fa-solid fa-trophy"></i> ราคาเสนอสูงสุดปัจจุบัน
                </span>
                <span class="price-box-val-emerald">${formatCurrency(currentBidAmount)}</span>
                <span style="font-size: 0.8rem; color: #94a3b8;">เสนอราคาทั้งหมด ${bidsCount} ครั้ง</span>
              </div>

              <div class="price-box-item">
                <span class="price-box-label">
                  <i class="fa-solid fa-user-tag"></i> ราคาที่คุณเสนอ
                </span>
                <span class="price-box-val-gold">${formatCurrency(order.userBid)}</span>
                ${isWon 
                  ? (isPaid 
                    ? `<span class="price-user-callout" style="background: rgba(16, 185, 129, 0.2); color: #34d399; border-color: rgba(16, 185, 129, 0.4);"><i class="fa-solid fa-circle-check"></i> ชนะประมูล & ชำระเงินแล้ว</span>`
                    : `<span class="price-user-callout" style="background: rgba(245, 158, 11, 0.2); color: #fbbf24; border-color: rgba(245, 158, 11, 0.4);"><i class="fa-solid fa-clock"></i> ชนะการประมูล - กำลังรอชำระเงิน</span>`)
                  : (isWinning 
                    ? `<span class="price-user-callout"><i class="fa-solid fa-crown"></i> คุณเป็นผู้นำการประมูล</span>` 
                    : `<span class="price-user-callout" style="background: rgba(239, 68, 68, 0.15); color: #fca5a5;"><i class="fa-solid fa-triangle-exclamation"></i> โดนแซงราคา - เสนอเพิ่มเพื่อชนะ</span>`)}
              </div>
            </div>

            <div class="matrix-secondary-row">
              <div class="matrix-sub-item">
                <span class="label">ราคาเริ่มต้น</span>
                <span class="value">${formatCurrency(order.startPrice)}</span>
              </div>
              <div class="matrix-sub-item">
                <span class="label">ขั้นต่ำการเสนอราคา</span>
                <span class="value">+${formatCurrency(order.bidIncrement || 1000)}</span>
              </div>
              <div class="matrix-sub-item">
                <span class="label">สถานะคำสั่งซื้อ</span>
                <span class="value" style="color: ${isWon ? (isPaid ? '#10b981' : '#f59e0b') : (isWinning ? '#34d399' : '#fb923c')}; font-weight: 700;">${isWon ? (isPaid ? 'ชำระเงินแล้ว' : 'กำลังรอชำระเงิน') : (isWinning ? 'ผู้นำประมูล' : 'โดนแซงราคา')}</span>
              </div>
            </div>
          </div>

          <!-- Countdown Box -->
          <div class="order-timer-card ${isWon ? 'order-timer-won' : ''}">
            <div class="timer-label-box">
              <i class="${isWon ? (isPaid ? 'fa-solid fa-shield-halved' : 'fa-solid fa-clock') : 'fa-regular fa-clock'}" style="${isWon ? (isPaid ? 'color: #10b981;' : 'color: #f59e0b;') : ''}"></i>
              <div>
                <strong style="display: block; font-size: 0.88rem; color: #fff;">${isWon ? (isPaid ? 'การประมูลสิ้นสุด (ชำระเงินสำเร็จ)' : 'การประมูลสิ้นสุด (กำลังรอชำระเงิน)') : 'เวลาประมูลคงเหลือ'}</strong>
                <span style="font-size: 0.78rem; color: #94a3b8;">${isWon ? (isPaid ? 'คุ้มครองผ่านระบบ Escrow เรียบร้อย' : 'กรุณาชำระเงินเพื่อดำเนินการจัดส่งสินค้า') : `สิ้นสุด: ${new Date(order.endDate).toLocaleDateString('th-TH', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}`}</span>
              </div>
            </div>
            <span class="timer-countdown-text" style="${isWon ? (isPaid ? 'color: #10b981;' : 'color: #fbbf24;') : ''}">${isWon ? (isPaid ? '<i class="fa-solid fa-shield-halved"></i> ชำระเงินแล้ว' : '<i class="fa-solid fa-clock"></i> กำลังรอชำระเงิน') : timerText}</span>
          </div>

          <!-- CTA Buttons & Action Controls -->
          <div class="order-cta-group">
            ${isWon ? `
              ${isPendingPayment ? `
                <a href="Payment.html?orderId=${encodeURIComponent(order.orderId)}" class="btn btn-order-pay-cta" title="ดำเนินการชำระเงินค่าสินค้า">
                  <div class="btn-pay-content-wrap">
                    <i class="fa-solid fa-credit-card"></i>
                    <span>ชำระเงิน</span>
                  </div>
                  <span class="btn-pay-price-tag">${formatCurrency(order.userBid)}</span>
                </a>
                <button type="button" class="btn btn-order-secondary" onclick="openSellerP2PChat('${order.orderId}')">
                  <i class="fa-solid fa-comments"></i> ติดต่อผู้ขาย (P2P Chat)
                </button>
              ` : `
                <button type="button" class="btn btn-order-p2p-cta" onclick="openSellerP2PChat('${order.orderId}')">
                  <i class="fa-solid fa-comments"></i> เปิดห้องแชต P2P กับผู้ขาย
                </button>
                <a href="Payment.html?orderId=${encodeURIComponent(order.orderId)}" class="btn btn-order-secondary" title="ดูรายละเอียดการชำระเงิน">
                  <i class="fa-solid fa-file-invoice-dollar"></i> ดูหลักฐานการชำระเงิน
                </a>
              `}
            ` : (isWinning ? `
              <button type="button" class="btn btn-order-raise btn-bid-locked" disabled title="คุณเป็นผู้ให้ราคาสูงสุดแล้ว (${formatCurrency(order.userBid)}) ไม่สามารถเสนอราคาซ้ำจนกว่าจะมีผู้ประมูลอื่นเสนอราคาแข่ง">
                <i class="fa-solid fa-lock"></i> คุณเป็นผู้นำการประมูล (รอผู้ประมูลอื่น)
              </button>
            ` : `
              <button type="button" class="btn btn-order-raise btn-outbid-pulse" onclick="openBidModal('${order.itemId}')">
                <i class="fa-solid fa-gavel"></i> เสนอราคาเพิ่ม (Raise Bid)
              </button>
            `)}
          </div>

          <!-- Informative Lock or Outbid or Won Banner -->
          ${isWon ? `
            ${isPendingPayment ? `
              <div class="order-won-banner order-won-payment-pending">
                <div class="won-banner-icon"><i class="fa-solid fa-credit-card"></i></div>
                <div class="won-banner-info">
                  <div class="won-banner-title-row">
                    <strong>คุณชนะการประมูล — สถานะ: กำลังรอชำระเงิน</strong>
                    <span class="won-pending-pill"><i class="fa-solid fa-clock"></i> กำลังรอชำระเงิน</span>
                  </div>
                  <span>คุณชนะการประมูลรายการนี้ในราคา <strong>${formatCurrency(order.userBid)}</strong> กรุณาดำเนินการชำระเงิน เพื่อให้ผู้ขายเตรียมแพ็คและจัดส่งสินค้า โดยยอดเงินของคุณจะถูกคุ้มครองปลอดภัย 100% ในระบบ Escrow จนกว่าจะได้รับสินค้าและตรวจรับตรงปกภายใน 10 วัน</span>
                </div>
              </div>
            ` : `
              <div class="order-won-banner order-won-paid">
                <div class="won-banner-icon won-icon-success"><i class="fa-solid fa-shield-halved"></i></div>
                <div class="won-banner-info">
                  <div class="won-banner-title-row">
                    <strong style="color: #34d399;">ชำระเงินสำเร็จเรียบร้อยแล้ว</strong>
                    <span class="won-paid-pill"><i class="fa-solid fa-lock"></i> ชำระเงินปลอดภัย 100%</span>
                  </div>
                  <span>ยอดเงินจำนวน <strong>${formatCurrency(order.paidAmount || order.userBid)}</strong> ได้รับการยืนยันเข้าสู่ระบบชำระเงิน STARTASS แล้ว (${order.paidAt || 'เรียบร้อยแล้ว'}) ผู้ขายได้รับแจ้งเตือนและกำลังดำเนินการแพ็คจัดส่งสินค้าแบบ White-Glove พร้อมประกันภัย</span>
                </div>
              </div>
            `}
          ` : (isWinning ? `
            <div class="order-bid-lock-banner">
              <div class="bid-lock-icon"><i class="fa-solid fa-shield-halved"></i></div>
              <div class="bid-lock-info">
                <strong>ระบบล็อกการเสนอราคา — คุณเป็นผู้นำการประมูลอยู่แล้ว</strong>
                <span>คุณได้เสนอราคาสูงสุดไว้ที่ <strong>${formatCurrency(order.userBid)}</strong> ขณะนี้คุณเป็นผู้นำการประมูล ระบบจะล็อกไม่ให้เสนอราคาซ้ำจนกว่าจะมีผู้ประมูลรายอื่นเสนอราคาสูงกว่าคุณ</span>
              </div>
            </div>
          ` : `
            <div class="order-bid-outbid-banner">
              <div class="bid-outbid-icon"><i class="fa-solid fa-triangle-exclamation"></i></div>
              <div class="bid-outbid-info">
                <strong>ปลดล็อกการเสนอราคา — คุณถูกเสนอราคาแซงแล้ว!</strong>
                <span>มีผู้เสนอราคาสูงกว่าคุณที่ <strong>${formatCurrency(currentBidAmount)}</strong> ขณะนี้ระบบปลดล็อกให้คุณสามารถเสนอราคาเพิ่ม (Raise Bid) เพื่อกลับมาเป็นผู้นำได้ทันที!</span>
              </div>
            </div>
          `)}
        </div>
      </div>

    </div>

    <!-- TOGGLE SECTION: History vs Current Views -->
    <section class="order-toggle-section">
      <!-- Tabs Switcher -->
      <div class="order-toggle-tabs" role="tablist">
        <button type="button" class="order-tab-btn ${activeOrderTab === 'current' ? 'active' : ''}" id="tabBtnCurrent" onclick="switchOrderTab('current')">
          <i class="fa-solid fa-chart-pie"></i>
          <span>ภาพรวมคำสั่งซื้อ</span>
        </button>
        <button type="button" class="order-tab-btn ${activeOrderTab === 'history' ? 'active' : ''}" id="tabBtnHistory" onclick="switchOrderTab('history')">
          <i class="fa-solid fa-clock-rotate-left"></i>
          <span>ประวัติการเสนอราคา</span>
          <span class="order-tab-badge">${bidHistory.length}</span>
        </button>
      </div>

      <!-- Tab Content Area -->
      <div class="order-tab-content">
        
        <!-- PANE 1: Current View -->
        <div class="tab-pane ${activeOrderTab === 'current' ? 'active' : ''}" id="paneCurrent">
          <div class="current-view-grid">
            
            <!-- Specifications & Features -->
            <div class="info-box-card">
              <h4><i class="fa-solid fa-certificate"></i> คุณสมบัติและสเปกที่ได้รับการรับรอง</h4>
              <ul class="order-spec-list">
                ${specsHtml}
              </ul>
            </div>

            <!-- Payment & Buyer Protection Terms -->
            <div class="info-box-card">
              <h4><i class="fa-solid fa-shield-halved"></i> ระบบชำระเงินและการคุ้มครองผู้ซื้อ</h4>
              
              <div class="escrow-feature-item">
                <div class="escrow-icon"><i class="fa-solid fa-vault"></i></div>
                <div class="escrow-text">
                  <strong>ระบบคุ้มครองการชำระเงิน STARTASS</strong>
                  <span>เงินประกันของคุณจะถูกจัดเก็บในระบบชำระเงินอย่างปลอดภัย 100% จนกว่าการประมูลจะสิ้นสุดและคุณได้รับสินค้า</span>
                </div>
              </div>

              <div class="escrow-feature-item">
                <div class="escrow-icon"><i class="fa-solid fa-truck-fast"></i></div>
                <div class="escrow-text">
                  <strong>บริการจัดส่ง White-Glove พร้อมประกันภัย</strong>
                  <span>ขนส่งพร้อมประกันภัยเต็มมูลค่า พร้อมเจ้าหน้าที่ตรวจสอบความถูกต้องก่อนส่งมอบ</span>
                </div>
              </div>

              <div class="escrow-feature-item" style="margin-bottom: 0;">
                <div class="escrow-icon"><i class="fa-solid fa-handshake"></i></div>
                <div class="escrow-text">
                  <strong>การันตีของแท้ 100% โดยผู้ขาย</strong>
                  <span>ผู้ขาย [@${seller.nickname || 'ApexMotors_NY'}] การันตีของสะสมแท้ 100%</span>
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
                <i class="fa-solid fa-list-ol"></i> บันทึกไทม์ไลน์การเสนอราคา (Bidding Audit Log)
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

      </div>
    </section>
  `;
}

function switchOrderTab(tabName) {
  if (tabName !== 'current' && tabName !== 'history') {
    tabName = 'current';
  }
  activeOrderTab = tabName;
  const btnCurrent = document.getElementById('tabBtnCurrent');
  const btnHistory = document.getElementById('tabBtnHistory');
  const paneCurrent = document.getElementById('paneCurrent');
  const paneHistory = document.getElementById('paneHistory');

  if (btnCurrent) btnCurrent.classList.toggle('active', tabName === 'current');
  if (btnHistory) btnHistory.classList.toggle('active', tabName === 'history');
  if (paneCurrent) paneCurrent.classList.toggle('active', tabName === 'current');
  if (paneHistory) paneHistory.classList.toggle('active', tabName === 'history');
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

  let chats = loadP2PChats();
  if (targetOrderId && !chats[targetOrderId]) {
    const orders = loadOrders();
    const matchedOrder = orders.find(o => o.orderId === targetOrderId || o.itemId === targetOrderId);
    if (matchedOrder) {
      initP2PChatForOrder(matchedOrder);
      chats = loadP2PChats();
    }
  }

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
  }

  const badgeCount = document.getElementById('chatConvCountBadge');
  if (badgeCount) {
    badgeCount.textContent = `${chatList.length} บทสนทนา`;
  }

  if (chatList.length === 0) {
    listContainer.innerHTML = `
      <div class="chat-conv-empty">
        <i class="fa-regular fa-comment-dots" style="font-size:2rem; color:#64748b; margin-bottom:8px;"></i>
        <span style="color:#94a3b8; font-size:0.86rem;">ไม่พบบทสนทนาในตัวกรองนี้</span>
      </div>
    `;
    return;
  }

  listContainer.innerHTML = chatList.map(chat => {
    const isAct = chat.orderId === activeStandaloneChatOrderId;
    const seller = chat.seller || { nickname: 'ผู้ขาย', avatar: '', name: 'ผู้ขาย' };
    const hasUnread = (chat.unreadCount > 0) || (chat.lastMessageIsRead === false);
    const lastMsgDate = chat.lastMessageDate || 'วันนี้';
    const lastMsgTime = chat.lastMessageTime || 'เมื่อสักครู่';
    const snippet = chat.lastMessageSnippet || (chat.messages && chat.messages.length > 0 ? chat.messages[chat.messages.length - 1].text : 'พร้อมสำหรับการสนทนา...');

    return `
      <div class="chat-conv-item ${isAct ? 'active' : ''} ${hasUnread ? 'unread-item' : ''}" onclick="selectStandaloneChat('${chat.orderId}')" title="${chat.title}">
        <div class="conv-avatar-wrapper">
          <img src="${seller.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80'}" alt="${seller.nickname}" class="conv-avatar-img">
          <span class="conv-online-dot"></span>
        </div>

        <div class="conv-content-col">
          <div class="conv-top-line">
            <span class="conv-fullname" title="${seller.name || seller.nickname}">${seller.name || seller.nickname}</span>
            <span class="conv-timestamp">
              <i class="fa-regular fa-clock" style="font-size:0.65rem;"></i> ${lastMsgTime}
            </span>
          </div>

          <div class="conv-sub-line">
            <span class="conv-username-small">@${seller.nickname}</span>
            <span class="conv-order-pill">#${chat.orderId}</span>
          </div>

          <div class="conv-preview-row">
            <p class="conv-msg-preview">${snippet}</p>
            <div class="conv-status-pills">
              ${hasUnread ? `
                <span class="badge-read-status unread">
                  <span class="unread-pulse-dot"></span>
                  <span>ยังไม่อ่าน</span>
                </span>
                ${chat.unreadCount > 0 ? `<span class="conv-unread-number-badge">${chat.unreadCount}</span>` : ''}
              ` : `
                <span class="badge-read-status read">
                  <i class="fa-solid fa-check-double"></i>
                  <span>อ่านแล้ว</span>
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
    nickname: 'ผู้ขาย',
    name: 'ผู้ขาย',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
    rating: '5.0 ★',
    onlineStatus: 'ใช้งานอยู่'
  };

  // 1. Render Header (Spacious, No Verified Badge, FullName as Title, Small Username)
  headerEl.innerHTML = `
    <div class="chat-header-profile-row">
      <button type="button" class="btn-chat-mobile-back" onclick="toggleStandaloneMobileSidebar()" title="กลับสู่รายการสนทนา">
        <i class="fa-solid fa-arrow-left"></i>
      </button>

      <a href="OtherProfileDetail.html?user=${encodeURIComponent(seller.nickname)}" class="chat-header-avatar-wrap" title="ดูโปรไฟล์ผู้ขาย" style="text-decoration:none;">
        <img src="${seller.avatar}" alt="${seller.nickname}" class="chat-header-avatar">
        <span class="chat-header-online-dot"></span>
      </a>

      <div class="chat-header-user-meta">
        <div class="chat-header-name-row">
          <a href="OtherProfileDetail.html?user=${encodeURIComponent(seller.nickname)}" style="text-decoration:none; color:inherit;" title="ดูโปรไฟล์ผู้ขาย">
            <h3 class="chat-header-fullname">${seller.name}</h3>
          </a>
          <a href="OtherProfileDetail.html?user=${encodeURIComponent(seller.nickname)}" class="chat-header-username-small" style="text-decoration:none;" title="ดูโปรไฟล์ผู้ขาย">@${seller.nickname}</a>
        </div>
        <div class="chat-header-subinfo">
          <span class="chat-online-status-pill"><i class="fa-solid fa-circle"></i> ${seller.onlineStatus || 'ใช้งานอยู่'}</span>
          <span>•</span>
          <span class="seller-rating-pill"><i class="fa-solid fa-star"></i> ${seller.rating || '5.0 ★'}</span>
        </div>
      </div>
    </div>

    <div class="chat-header-action-group">
      <a href="ordersdetail.html?orderId=${chat.orderId}" class="btn-view-order-link" title="เปิดดูรายละเอียดคำสั่งซื้อ #${chat.orderId}">
        <i class="fa-solid fa-receipt"></i>
        <span>คำสั่งซื้อ #${chat.orderId}</span>
      </a>
    </div>
  `;

  // 2. Render Live Deal Strip (Clean & Compact)
  dealStripEl.innerHTML = `
    <div class="deal-strip-product-info">
      <img src="${chat.image}" alt="${chat.title}" class="deal-strip-img">
      <div class="deal-strip-titles">
        <div class="deal-strip-badge-row">
          <span class="deal-status-pill won">
            <i class="fa-solid fa-trophy"></i>
            ชนะประมูล
          </span>
          <span class="deal-category-pill">${chat.categoryLabel || 'ของสะสมหายาก'}</span>
          <span class="deal-order-tag">คำสั่งซื้อ #${chat.orderId}</span>
        </div>
        <h4 class="deal-strip-product-title" title="${chat.title}">${chat.title}</h4>
      </div>
    </div>

    <div class="deal-strip-price-matrix">
      <span class="deal-price-label"><i class="fa-solid fa-trophy"></i> ราคาเคาะชนะ:</span>
      <span class="deal-price-amount">${formatCurrency(chat.latestBid || chat.winningBid)}</span>
    </div>
  `;

  // Render Escrow Action Bar (Button for payment [ dealer ] & input tracking number [ seller ])
  renderChatEscrowActionBar(orderId);

  // 3. Render Messages Timeline
  let sellerProductCardShown = false;
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
            <i class="fa-regular fa-clock"></i> ${m.date || '8 ก.ย. 2026'}, ${m.time || '12:00'}
          </span>
        </div>
      `;
    }

    const isUser = m.sender === 'user';
    const isOwner = m.sender === 'seller' || m.isOwner;
    const avatar = isUser
      ? (currentUser && currentUser.avatar ? currentUser.avatar : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80')
      : (seller.avatar);
    const senderLabel = isUser 
      ? '<span class="chat-msg-sender-fullname">Alexander Sterling</span> <span class="chat-msg-sender-handle">(คุณ)</span>' 
      : `<span class="chat-msg-sender-fullname">${seller.name}</span> <span class="chat-msg-sender-handle">@${seller.nickname}</span>`;

    // IF PART OWNER MESSAGES: SHOW PRODUCT AND PRICE BIDS LATEST
    // Only show once on the first seller message in the thread to keep layout compact and clean
    let ownerProductCardHtml = '';
    if (isOwner && !sellerProductCardShown) {
      sellerProductCardShown = true;
      const prod = m.product || {
        id: chat.itemId,
        orderId: chat.orderId,
        title: chat.title,
        image: chat.image,
        category: chat.category,
        categoryLabel: chat.categoryLabel,
        latestBid: chat.latestBid || chat.winningBid,
        bidStatus: chat.status === 'WON' ? 'ชนะการประมูลแล้ว' : 'ราคาสูงสุดขณะนี้'
      };

      ownerProductCardHtml = `
        <div class="owner-product-bids-card">
          <div class="owner-card-top-bar">
            <span class="owner-card-tag"><i class="fa-solid fa-store"></i> รายการประมูลของเจ้าของโพสต์</span>
            <span class="owner-card-order-id">คำสั่งซื้อ #${prod.orderId || chat.orderId}</span>
          </div>
          <div class="owner-card-main-content">
            <img src="${prod.image || chat.image}" alt="${prod.title || chat.title}" class="owner-card-thumb">
            <div class="owner-card-meta">
              <span class="owner-card-category"><i class="fa-solid fa-layer-group"></i> ${prod.categoryLabel || 'ของสะสมระดับพรีเมียม'}</span>
              <h5 class="owner-card-title">${prod.title || chat.title}</h5>
              <div class="owner-card-bids-strip">
                <span class="owner-bid-label"><i class="fa-solid fa-gavel"></i> ราคาเสนอประมูลล่าสุด:</span>
                <span class="owner-bid-val">${formatCurrency(prod.latestBid || chat.winningBid)}</span>
                <span class="owner-bid-badge">${prod.bidStatus || 'ชนะการประมูลแล้ว'}</span>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    const msgDate = m.date || '8 ก.ย. 2026';
    const msgTime = m.time || '12:00';
    const isRead = m.isRead !== false; // true unless explicitly false

    return `
      <div class="chat-msg-row ${isUser ? 'msg-row-user' : 'msg-row-owner'}">
        <img src="${avatar}" alt="Avatar" class="chat-msg-avatar">

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
                ? '<i class="fa-solid fa-check-double"></i> อ่านแล้ว' 
                : '<i class="fa-solid fa-check"></i> ส่งแล้ว'}
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
    breadcrumb.textContent = `แชต: ${seller.name} (@${seller.nickname}) - #${chat.orderId}`;
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

let activeTypingSimulationTimer = null;

function showSellerTypingIndicator(seller) {
  const typingRow = document.getElementById('chatTypingIndicator');
  const avatarEl = document.getElementById('typingSellerAvatar');
  const nameEl = document.getElementById('typingSellerName');
  if (typingRow) {
    if (avatarEl && seller && seller.avatar) avatarEl.src = seller.avatar;
    if (nameEl && seller && seller.name) nameEl.textContent = seller.name;
    typingRow.style.display = 'flex';
  }

  const onlinePill = document.querySelector('.chat-online-status-pill');
  if (onlinePill) {
    onlinePill.innerHTML = '<i class="fa-solid fa-pencil fa-bounce" style="color:#f59e0b;"></i> <span style="color:#fbbf24; font-weight:700;">กำลังพิมพ์...</span>';
  }

  scrollStandaloneChatToBottom();
}

function hideSellerTypingIndicator(seller) {
  const typingRow = document.getElementById('chatTypingIndicator');
  if (typingRow) {
    typingRow.style.display = 'none';
  }

  const onlinePill = document.querySelector('.chat-online-status-pill');
  if (onlinePill) {
    onlinePill.innerHTML = `<i class="fa-solid fa-circle"></i> ${seller && seller.onlineStatus ? seller.onlineStatus : 'ใช้งานอยู่'}`;
  }
}

function simulateTypingPrompt(text, autoSend = true) {
  const input = document.getElementById('standaloneMessageInput');
  if (!input) return;

  if (activeTypingSimulationTimer) {
    clearInterval(activeTypingSimulationTimer);
    activeTypingSimulationTimer = null;
  }

  input.value = '';
  input.classList.add('is-typing');
  input.focus();

  let charIndex = 0;
  const speed = Math.max(16, Math.min(32, Math.floor(800 / text.length)));

  activeTypingSimulationTimer = setInterval(() => {
    if (charIndex < text.length) {
      input.value += text.charAt(charIndex);
      charIndex++;
      input.scrollLeft = input.scrollWidth;
    } else {
      clearInterval(activeTypingSimulationTimer);
      activeTypingSimulationTimer = null;
      input.classList.remove('is-typing');

      if (autoSend) {
        setTimeout(() => {
          handleSendStandaloneChatMessage(null);
        }, 350);
      }
    }
  }, speed);
}

function simulateRandomBuyerTyping() {
  const samplePrompts = [
    '📍 ยืนยันที่อยู่จัดส่งเรียบร้อย พร้อมประสานงานรับมอบสินค้าครับ',
    '📜 รบกวนขอใบรับรอง Certificate of Authenticity (COA) เพิ่มเติมด้วยครับ',
    '🛡️ ยอดชำระเงินเรียบร้อยแล้วครับ',
    '🚚 สะดวกรับสินค้าช่วงวันเสาร์นี้ ทางผู้ให้บริการขนส่งสะดวกเวลาไหนครับ',
    '✨ ได้รับรายละเอียดเรียบร้อย ยืนยันคำสั่งซื้อเพื่อดำเนินการขั้นตอนถัดไปครับ'
  ];
  const chosen = samplePrompts[Math.floor(Math.random() * samplePrompts.length)];
  simulateTypingPrompt(chosen, true);
}

function simulateSellerResponseDirect() {
  const chats = loadP2PChats();
  const activeChat = chats[activeStandaloneChatOrderId];
  if (!activeChat) return;

  const seller = activeChat.seller || { nickname: 'ผู้ขาย', avatar: '', name: 'ผู้ขาย' };
  showSellerTypingIndicator(seller);
  showToast(`⚡ จำลองผู้ขาย [${seller.name}] กำลังพิมพ์ข้อความตอบกลับ...`);

  setTimeout(() => {
    hideSellerTypingIndicator(seller);

    const replyReplies = [
      `สวัสดีครับคุณ Alexander! ทางเราได้ตรวจสอบความสมบูรณ์ของ "${activeChat.title}" ในห้องนิรภัยเรียบร้อย พร้อมออกใบกำกับและซีลรักษาความปลอดภัยแล้วครับ`,
      `รับทราบคำขอครับคุณ Alexander! ระบบการชำระเงินได้รับการตรวจสอบและบันทึกในระบบ STARTASS เรียบร้อย เราพร้อมปล่อยสินค้าให้ทีมขนส่งความปลอดภัยสูงทันทีครับ`,
      `เอกสาร Certificate of Authenticity (COA) พร้อมตราประทับตรวจสภาพจากผู้เชี่ยวชาญได้รับการบรรจุลงในกล่องนิรภัยเรียบร้อยแล้วครับ`,
      `สวัสดีครับ ทีมประสานงานฝ่ายจัดส่ง White-Glove ได้กำหนดรอบรถขนส่งพิเศษเรียบร้อยแล้ว จะแจ้งพิกัดการเดินทางแบบเรียลไทม์ให้ทราบทางนี้ครับ`
    ];
    const replyText = replyReplies[Math.floor(Math.random() * replyReplies.length)];
    const replyDate = new Date().toLocaleDateString('th-TH', { month: 'short', day: 'numeric', year: 'numeric' });
    const replyTime = new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });

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
        bidStatus: activeChat.status === 'WON' ? 'ชนะการประมูลแล้ว' : 'ราคาสูงสุดขณะนี้'
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
    saveP2PChats(chats);

    renderStandaloneCurrentChat(activeStandaloneChatOrderId);
    renderStandaloneChatConversations(activeStandaloneChatFilter);
    scrollStandaloneChatToBottom();
    showToast(`💬 ได้รับข้อความตอบกลับจาก [${seller.name}]: "${replyText.slice(0, 42)}..."`);
  }, 1800);
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

  const todayDate = new Date().toLocaleDateString('th-TH', { month: 'short', day: 'numeric', year: 'numeric' });
  const nowTime = new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });
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

  // Read receipt simulation after 1.0s
  setTimeout(() => {
    newMsg.isRead = true;
    saveP2PChats(chats);
    renderStandaloneCurrentChat(activeStandaloneChatOrderId);
  }, 1000);

  // Seller typing simulation starts at 450ms
  setTimeout(() => {
    const updatedChats = loadP2PChats();
    const activeChat = updatedChats[activeStandaloneChatOrderId];
    if (activeChat) {
      showSellerTypingIndicator(activeChat.seller);
    }
  }, 450);

  // Automated realistic reply from Owner after 2.2s
  setTimeout(() => {
    const updatedChats = loadP2PChats();
    const activeChat = updatedChats[activeStandaloneChatOrderId];
    if (!activeChat) return;

    const seller = activeChat.seller || { nickname: 'ผู้ขาย', avatar: '', name: 'ผู้ขาย' };
    hideSellerTypingIndicator(seller);

    const replyReplies = [
      `ขอบคุณที่ยืนยันข้อมูลครับคุณ Alexander! ทีมผู้เชี่ยวชาญของเราบันทึกข้อมูลสำหรับ "${activeChat.title}" เรียบร้อย เอกสาร Certificate of Authenticity (COA) ฉบับจริงและบรรจุภัณฑ์ซีลนิรภัยเตรียมพร้อมแล้วครับ`,
      `รับทราบเรียบร้อยครับคุณ Alexander! ระบบการชำระเงินได้รับการตรวจสอบและยืนยันยอดจาก STARTASS แล้ว ขณะนี้กำลังเตรียมรถขนส่ง White-Glove พร้อมประกันภัยเต็มวงเงินครับ`,
      `เข้าใจเรียบร้อยครับคุณ Alexander สำหรับคำสั่งซื้อ #${activeChat.orderId} เราได้จัดเก็บในกล่องควบคุมอุณหภูมิและป้องกัน UV มาตรฐานพิพิธภัณฑ์เพื่อความปลอดภัยสูงสุดในการขนส่งครับ`,
      `เรียบร้อยครับ! ขอบคุณสำหรับการประสานงานอย่างรวดเร็ว ข้อมูลคนขับและระบบติดตามพิกัด GPS จะส่งให้ในช่องแชต P2P นี้ทันทีเมื่อเริ่มออกเดินทางครับ`
    ];
    const replyText = replyReplies[Math.floor(Math.random() * replyReplies.length)];

    const replyDate = new Date().toLocaleDateString('th-TH', { month: 'short', day: 'numeric', year: 'numeric' });
    const replyTime = new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });

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
        bidStatus: activeChat.status === 'WON' ? 'ชนะการประมูลแล้ว' : 'ราคาสูงสุดขณะนี้'
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
    showToast(`💬 ข้อความใหม่จาก [ @${seller.nickname} ]: "${replyText.slice(0, 48)}..."`);
  }, 2200);
}

function handleStandaloneQuickPrompt(text) {
  simulateTypingPrompt(text, true);
}

// ==========================================================================
// P2P PAYMENT LIFECYCLE & TRACKING NUMBER ENGINE
// Flowchart: ชนะประมูล -> ชำระเงินค่าสินค้า [Dealer] -> กรอกเลขพัสดุ [Seller] -> ตรวจรับ 10 วัน
// ==========================================================================
let activeChatViewRole = 'dealer'; // 'dealer' | 'seller'

function toggleChatViewRole() {
  setChatViewRole(activeChatViewRole === 'dealer' ? 'seller' : 'dealer');
}

function setChatViewRole(role) {
  activeChatViewRole = role;
  renderChatEscrowActionBar(activeStandaloneChatOrderId);
  const roleLabel = role === 'dealer' ? '👤 Dealer (ผู้ชนะการประมูล)' : '🏪 Seller (ผู้ขาย)';
  if (typeof showToast === 'function') {
    showToast(`สลับมุมมองเป็น [ ${roleLabel} ] เรียบร้อย`);
  }
}

function focusSellerTrackingInput() {
  const chats = loadP2PChats();
  const chat = chats[activeStandaloneChatOrderId];
  if (!chat) return;

  if (chat.paymentStatus !== 'PAID') {
    if (typeof showToast === 'function') {
      showToast('⚠️ รอลูกค้า (Dealer) ชำระเงินก่อน จึงจะสามารถกรอกหมายเลขพัสดุได้');
    }
    setChatViewRole('dealer');
    window.location.href = `Payment.html?orderId=${encodeURIComponent(activeStandaloneChatOrderId)}`;
    return;
  }

  setChatViewRole('seller');
  setTimeout(() => {
    const input = document.getElementById('sellerTrackingInput');
    if (input) {
      input.focus();
      input.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, 100);
}

function fillSampleTrackingNumber() {
  const samples = [
    'WG-98402194-TH',
    'KRY-TH-82019482',
    'FLASH-EX-7391024',
    'EMS-TH-482019482',
    'DHL-EXP-91823019'
  ];
  const chosen = samples[Math.floor(Math.random() * samples.length)];
  const input = document.getElementById('sellerTrackingInput');
  if (input) {
    input.value = chosen;
    input.focus();
    if (typeof showToast === 'function') {
      showToast(`⚡ กรอกหมายเลขพัสดุตัวอย่าง [ ${chosen} ] เรียบร้อย`);
    }
  }
}

function renderChatEscrowActionBar(orderId) {
  const barEl = document.getElementById('chatEscrowActionBar');
  if (barEl) {
    barEl.innerHTML = '';
    barEl.style.display = 'none';
  }
}

let isChatPaymentDrawerOpen = false;

function toggleChatPaymentDrawer(forceState) {
  isChatPaymentDrawerOpen = false;
}

function confirmEscrowPayment(orderId, paymentMethod = 'PromptPay QR') {
  const targetOrderId = orderId || activeStandaloneChatOrderId || 'ORD-AUC-02';
  const todayDate = new Date().toLocaleDateString('th-TH', { month: 'short', day: 'numeric', year: 'numeric' });
  const nowTime = new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });
  const fullTs = `${todayDate}, ${nowTime}`;

  // 1. Synchronize order state in localStorage FIRST
  const orders = loadOrders();
  const order = orders.find(o => o.orderId === targetOrderId || o.itemId === targetOrderId);
  const winBidVal = order ? (order.userBid || order.currentBid || 12500000) : 12500000;
  const winBidFormatted = formatCurrency(winBidVal);

  if (order) {
    order.status = ORDER_STATUS_ENUM.PAID;
    order.statusLabel = 'ชำระเงินแล้ว (รอผู้ขายจัดส่ง)';
    order.paymentStatus = 'PAID';
    order.paidAmount = winBidVal;
    order.paidAt = fullTs;
    order.shippingStatus = 'AWAITING_SHIPMENT';
    order.updatedAt = fullTs;
    saveOrders(orders);
  }

  // 2. Synchronize or initialize chat room for this order
  let chats = loadP2PChats();
  let chat = chats[targetOrderId];
  if (!chat && order) {
    initP2PChatForOrder(order);
    chats = loadP2PChats();
    chat = chats[targetOrderId];
  }

  if (chat) {
    const seller = chat.seller || (order && order.seller) || { name: 'ผู้ขาย', nickname: 'seller', avatar: '' };

    // Update chat state
    chat.paymentStatus = 'PAID';
    chat.paidAmount = winBidVal;
    chat.paidAt = fullTs;
    chat.shippingStatus = 'AWAITING_SHIPMENT';

    // System notification message
    const sysMsg = {
      id: 'msg-sys-pay-' + Date.now(),
      sender: 'system',
      isOwner: false,
      text: `🛡️ [ระบบชำระเงิน] การชำระเงินสำเร็จ! ลูกค้า (Dealer: Alexander Sterling) ได้โอนเงินจำนวน ${winBidFormatted} เข้าสู่ระบบคุ้มครอง STARTASS เรียบร้อยแล้ว (ผ่าน ${paymentMethod}) ยอดเงินปลอดภัย 100% — ระบบได้แจ้งเตือนผู้ขาย [@${seller.nickname}] ให้จัดส่งสินค้าและกรอกหมายเลขพัสดุ (Tracking Number)`,
      date: todayDate,
      time: nowTime,
      fullTimestamp: fullTs,
      isRead: true
    };
    chat.messages.push(sysMsg);

    // Automated Seller acknowledgement reply
    const sellerMsg = {
      id: 'msg-s-pay-' + (Date.now() + 1),
      sender: 'seller',
      isOwner: true,
      senderName: `[ @${seller.nickname} ]`,
      senderAvatar: seller.avatar,
      text: `ได้รับแจ้งยอดชำระเงินจำนวน ${winBidFormatted} เรียบร้อยแล้วครับคุณ Alexander! ทางเรากำลังทำการแพ็คสินค้า "${chat.title}" อย่างแน่นหนาตามมาตรฐานความปลอดภัยสูง และเตรียมนำส่งมอบให้บริษัทขนส่ง จะนำหมายเลขพัสดุ (Tracking Number) มากดบันทึกให้ทราบในระบบทันทีครับ`,
      date: todayDate,
      time: nowTime,
      fullTimestamp: fullTs,
      isRead: true
    };
    chat.messages.push(sellerMsg);

    chat.lastMessageSnippet = `ได้รับแจ้งยอดชำระเงินจำนวน ${winBidFormatted} เรียบร้อยแล้วครับ...`;
    chat.lastMessageDate = todayDate;
    chat.lastMessageTime = nowTime;
    chat.lastMessageFull = `${todayDate} • ${nowTime}`;
    chat.lastMessageIsRead = true;
    saveP2PChats(chats);
  }

  // Create Escrow Payment confirmation notification
  const notifications = loadNotifications();
  notifications.unshift({
    id: 'notif-pay-' + Date.now(),
    type: 'won',
    itemId: order ? order.itemId : (chat ? chat.itemId : 'auc-02'),
    orderId: targetOrderId,
    title: '🛡️ ยืนยันการชำระเงินสำเร็จ',
    message: `คุณได้ชำระเงิน ${winBidFormatted} สำหรับคำสั่งซื้อ #${targetOrderId} ผ่านระบบชำระเงิน STARTASS เรียบร้อยแล้ว ยอดเงินปลอดภัย 100%`,
    itemTitle: order ? order.title : (chat ? chat.title : 'รายการประมูล'),
    time: 'เมื่อสักครู่',
    read: false,
    createdAt: new Date().toISOString()
  });
  saveNotifications(notifications);
  updateNotificationBadge();
  renderNotificationsList();

  // Switch role to seller so user immediately sees the input tracking number unlocked if in chat
  activeChatViewRole = 'seller';

  if (document.getElementById('standaloneChatContainer')) {
    renderStandaloneCurrentChat(targetOrderId);
    renderStandaloneChatConversations(activeStandaloneChatFilter);
    scrollStandaloneChatToBottom();
  }

  if (typeof showToast === 'function') {
    showToast(`✅ ชำระเงินสำเร็จ! ยอดเงินได้รับการคุ้มครองในระบบอย่างปลอดภัย 100%`);
  }
}

// ==========================================================================
// DEDICATED ESCROW PAYMENT CHECKOUT PAGE ENGINE (pages/Payment.html)
// ==========================================================================
const PAYMENT_STATUS_ENUM = {
  WAITING_FOR_PAYMENT: 'WAITING_FOR_PAYMENT',
  PAYMENT_DETECTED: 'PAYMENT_DETECTED',
  PAYMENT_VERIFIED: 'PAYMENT_VERIFIED',
  ESCROW_FUNDED: 'ESCROW_FUNDED'
};

const PAYMENT_CONFIG = {
  // In prototype / dev environment, mock mode is active by default.
  // In production, set window.__STARTASS_MOCK_PAYMENT_MODE__ = false or window.__STARTASS_ENV__ = 'production'
  isMockMode: typeof window !== 'undefined' && typeof window.__STARTASS_MOCK_PAYMENT_MODE__ !== 'undefined'
    ? Boolean(window.__STARTASS_MOCK_PAYMENT_MODE__)
    : true,
};

let currentCheckoutOrderId = null;
let currentPaymentStatus = PAYMENT_STATUS_ENUM.WAITING_FOR_PAYMENT;
let paymentBroadcastChannel = null;
let isPaymentSimulationRunning = false;
let paymentSimulationTimeouts = [];
const processedPaymentTransactions = new Set();
let paymentRedirectInterval = null;
let currentMockTransactionId = null;

function isMockPaymentActive() {
  if (typeof window !== 'undefined') {
    if (window.__STARTASS_ENV__ === 'production' || window.__STARTASS_IS_PROD__ === true) {
      return false;
    }
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('mode') === 'real' || urlParams.get('mock') === 'false') {
      return false;
    }
  }
  return PAYMENT_CONFIG.isMockMode;
}

function clearPaymentSimulationTimeouts() {
  paymentSimulationTimeouts.forEach(id => clearTimeout(id));
  paymentSimulationTimeouts = [];
}

function generateNextMockTransactionId() {
  let count = parseInt(sessionStorage.getItem('startass_mock_tx_counter') || localStorage.getItem('startass_mock_tx_counter') || '0', 10);
  count += 1;
  try {
    sessionStorage.setItem('startass_mock_tx_counter', count.toString());
    localStorage.setItem('startass_mock_tx_counter', count.toString());
  } catch (e) {}
  const formatted = String(count).padStart(3, '0');
  return `MOCK-PAYMENT-${formatted}`;
}

function getActiveMockTransactionId() {
  if (!currentMockTransactionId) {
    let count = parseInt(sessionStorage.getItem('startass_mock_tx_counter') || localStorage.getItem('startass_mock_tx_counter') || '0', 10);
    if (count <= 0) count = 1;
    const formatted = String(count).padStart(3, '0');
    currentMockTransactionId = `MOCK-PAYMENT-${formatted}`;
  }
  return currentMockTransactionId;
}

function resetMockOrderState(orderId) {
  if (!isMockPaymentActive()) return;
  try {
    const orders = loadOrders();
    const order = orders.find(o => o.orderId === orderId || o.itemId === orderId);
    if (order) {
      order.status = ORDER_STATUS_ENUM.PENDING_PAYMENT;
      order.statusLabel = 'กำลังรอชำระเงิน';
      order.paymentStatus = 'UNPAID';
      order.paidAmount = null;
      order.paidAt = null;
      order.shippingStatus = 'UNPAID';
      order.updatedAt = new Date().toLocaleString('th-TH', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });
      saveOrders(orders);
    }
    const chats = loadP2PChats();
    const chat = chats[orderId];
    if (chat) {
      chat.paymentStatus = 'UNPAID';
      chat.paidAmount = null;
      chat.paidAt = null;
      chat.shippingStatus = 'UNPAID';
      saveP2PChats(chats);
    }
  } catch (e) {
    console.error('Failed to reset mock order state', e);
  }
}

function initPaymentCheckoutPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const targetId = urlParams.get('orderId') || urlParams.get('id') || 'ORD-AUC-02';

  const orders = loadOrders();
  let order = orders.find(o => o.orderId === targetId || o.itemId === targetId);
  if (!order) {
    order = orders.find(o => o.status === ORDER_STATUS_ENUM.PENDING_PAYMENT || o.status === 'WON') || orders[0];
  }
  if (!order) return;

  currentCheckoutOrderId = order.orderId;

  // Check if Mock Payment Mode is active
  const isMock = isMockPaymentActive();

  if (isMock) {
    // In Mock Mode: ALWAYS start fresh with an incremented Mock Transaction ID on open/reload
    currentMockTransactionId = generateNextMockTransactionId();
    resetMockOrderState(order.orderId);
    clearPaymentSimulationTimeouts();
    isPaymentSimulationRunning = false;
    if (paymentRedirectInterval) {
      clearInterval(paymentRedirectInterval);
      paymentRedirectInterval = null;
    }
  }

  // Check paid status (in Real Mode, this reflects genuine backend order status)
  const isPaid = !isMock && order.paymentStatus === 'PAID';

  const winBidVal = order.userBid || order.currentBid || 12500000;
  const winBidFormatted = formatCurrency(winBidVal);
  const seller = order.seller || {
    name: 'Kyoto Rare Collectibles Japan',
    nickname: 'KyotoVault_Cards',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80'
  };

  // Bind order identification
  const orderIdDisplay = document.getElementById('paymentOrderIdDisplay');
  const orderIdBadge = document.getElementById('paymentOrderIdBadge');
  const itemImg = document.getElementById('paymentItemImg');
  const itemTitle = document.getElementById('paymentItemTitle');
  const itemCategory = document.getElementById('paymentItemCategory');
  const sellerName = document.getElementById('paymentSellerName');
  const sellerNickname = document.getElementById('paymentSellerNickname');
  const sellerAvatar = document.getElementById('paymentSellerAvatar');
  const winBidEl = document.getElementById('paymentWinningBidVal');
  const totalAmountEl = document.getElementById('paymentTotalAmountVal');
  const qrAmountDisplay = document.getElementById('qrAmountDisplay');
  const qrRef1 = document.getElementById('qrRef1');
  const btnBackToOrder = document.getElementById('btnBackToOrder');
  const btnCancelPayment = document.getElementById('btnCancelPayment');

  if (orderIdDisplay) orderIdDisplay.textContent = `#${order.orderId}`;
  if (orderIdBadge) orderIdBadge.textContent = `#${order.orderId}`;
  if (itemImg) itemImg.src = order.image;
  if (itemTitle) itemTitle.textContent = order.title;
  if (itemCategory) itemCategory.textContent = order.categoryLabel || 'ของสะสมพิเศษ';
  if (sellerName) sellerName.textContent = seller.name || 'ผู้ขาย';
  if (sellerNickname) sellerNickname.textContent = `@${seller.nickname || 'seller'}`;
  if (sellerAvatar) sellerAvatar.src = seller.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80';
  if (winBidEl) winBidEl.textContent = winBidFormatted;
  if (totalAmountEl) totalAmountEl.textContent = winBidFormatted;
  if (qrAmountDisplay) qrAmountDisplay.textContent = `${winBidFormatted} THB`;

  const numOnly = order.orderId.replace(/[^0-9]/g, '') || '02';
  if (qrRef1) {
    if (isMock) {
      qrRef1.textContent = `PAY-${numOnly}-${currentMockTransactionId}`;
    } else {
      qrRef1.textContent = `PAY-${numOnly}-${Math.floor(Math.random() * 899 + 100)}`;
    }
  }

  const returnUrl = `ordersdetail.html?id=${encodeURIComponent(order.orderId)}`;
  if (btnBackToOrder) btnBackToOrder.href = returnUrl;
  if (btnCancelPayment) btnCancelPayment.href = returnUrl;

  // Initialize Real-time Status and Listeners
  if (isPaid) {
    updatePaymentUIState(PAYMENT_STATUS_ENUM.ESCROW_FUNDED, {
      orderId: order.orderId,
      txId: order.transactionId || ('TX-' + Math.floor(100000000 + Math.random() * 900000000)),
      amount: winBidFormatted,
      isExisting: true
    });
  } else {
    updatePaymentUIState(PAYMENT_STATUS_ENUM.WAITING_FOR_PAYMENT, {
      orderId: order.orderId,
      txId: isMock ? currentMockTransactionId : undefined
    });
    initPaymentRealtimeListeners(order.orderId);
  }

  renderMockControlUI(isMock);
}

function updatePaymentUIState(status, meta = {}) {
  currentPaymentStatus = status;

  const codeEl = document.getElementById('paymentStatusCode');
  const labelEl = document.getElementById('paymentStateLabel');
  const descEl = document.getElementById('paymentStatusDescription');
  const radarDot = document.getElementById('liveRadarDot');
  const spinnerIcon = document.getElementById('statusSpinner');
  const statusPill = document.getElementById('paymentStatusPill');

  const stepWaiting = document.getElementById('stepWaiting');
  const conn1 = document.getElementById('conn1');
  const stepDetected = document.getElementById('stepDetected');
  const conn2 = document.getElementById('conn2');
  const stepVerified = document.getElementById('stepVerified');
  const conn3 = document.getElementById('conn3');
  const stepEscrow = document.getElementById('stepEscrow');

  // Reset tracker state
  const steps = [stepWaiting, stepDetected, stepVerified, stepEscrow];
  steps.forEach(el => {
    if (el) el.classList.remove('step-active', 'step-done');
  });
  [conn1, conn2, conn3].forEach(el => {
    if (el) el.classList.remove('conn-active');
  });

  switch (status) {
    case PAYMENT_STATUS_ENUM.WAITING_FOR_PAYMENT:
      if (codeEl) {
        codeEl.textContent = 'WAITING_FOR_PAYMENT';
        codeEl.className = 'status-code-tag tag-waiting';
      }
      if (labelEl) labelEl.textContent = 'กำลังรอการชำระเงิน (Waiting for Payment)';
      if (descEl) {
        descEl.innerHTML = '<span class="status-desc-primary">ระบบกำลังรอสัญญาณการชำระเงินจาก Mobile Banking แบบ Real-time</span><span class="status-desc-secondary">กรุณาสแกน QR Code เพื่อทำรายการ</span>';
      }
      if (radarDot) radarDot.className = 'pulse-radar-dot radar-gold';
      if (spinnerIcon) spinnerIcon.className = 'fa-solid fa-circle-notch fa-spin status-spinner-icon';
      if (stepWaiting) stepWaiting.classList.add('step-active');
      break;

    case PAYMENT_STATUS_ENUM.PAYMENT_DETECTED:
      if (codeEl) {
        codeEl.textContent = 'PAYMENT_DETECTED';
        codeEl.className = 'status-code-tag tag-detected';
      }
      if (labelEl) labelEl.textContent = 'ตรวจพบยอดเงินชำระแล้ว (Payment Detected)';
      if (descEl) {
        descEl.innerHTML = '<span class="status-desc-primary">ตรวจพบสัญญาณเงินเข้าจากเครือข่ายพร้อมเพย์</span><span class="status-desc-secondary">กำลังตรวจสอบลายเซ็นดิจิทัลกับระบบธนาคาร...</span>';
      }
      if (radarDot) radarDot.className = 'pulse-radar-dot radar-cyan';
      if (spinnerIcon) spinnerIcon.className = 'fa-solid fa-satellite-dish fa-beat-fade status-spinner-icon text-cyan';
      if (stepWaiting) stepWaiting.classList.add('step-done');
      if (conn1) conn1.classList.add('conn-active');
      if (stepDetected) stepDetected.classList.add('step-active');
      break;

    case PAYMENT_STATUS_ENUM.PAYMENT_VERIFIED:
      if (codeEl) {
        codeEl.textContent = 'PAYMENT_VERIFIED';
        codeEl.className = 'status-code-tag tag-verified';
      }
      if (labelEl) labelEl.textContent = 'ยืนยันยอดเงินสำเร็จ (Payment Verified)';
      if (descEl) {
        descEl.innerHTML = '<span class="status-desc-primary">ระบบธนาคารยืนยันความถูกต้องของยอดเงินเรียบร้อยแล้ว</span><span class="status-desc-secondary">กำลังนำยอดเงินเข้าฝากในระบบ Escrow คุ้มครองผู้ซื้อ...</span>';
      }
      if (radarDot) radarDot.className = 'pulse-radar-dot radar-emerald';
      if (spinnerIcon) spinnerIcon.className = 'fa-solid fa-circle-check status-spinner-icon text-emerald';
      if (stepWaiting) stepWaiting.classList.add('step-done');
      if (conn1) conn1.classList.add('conn-active');
      if (stepDetected) stepDetected.classList.add('step-done');
      if (conn2) conn2.classList.add('conn-active');
      if (stepVerified) stepVerified.classList.add('step-active');
      break;

    case PAYMENT_STATUS_ENUM.ESCROW_FUNDED:
      if (codeEl) {
        codeEl.textContent = 'ESCROW_FUNDED';
        codeEl.className = 'status-code-tag tag-funded';
      }
      if (labelEl) labelEl.textContent = 'เงินเข้าสู่ระบบ Escrow เรียบร้อย (Escrow Funded)';
      if (descEl) {
        descEl.innerHTML = '<span class="status-desc-primary">ยอดเงินถูกคุ้มครองในระบบ Escrow ปลอดภัย 100% เรียบร้อยแล้ว</span><span class="status-desc-secondary">ระบบกำลังแจ้งเตือนผู้ขายเพื่อเตรียมการจัดส่ง</span>';
      }
      if (radarDot) radarDot.className = 'pulse-radar-dot radar-success-solid';
      if (spinnerIcon) spinnerIcon.className = 'fa-solid fa-shield-halved status-spinner-icon text-gold';
      if (statusPill) {
        statusPill.innerHTML = '<i class="fa-solid fa-circle-check"></i> ชำระเงินเรียบร้อยแล้ว (คุ้มครองใน Escrow)';
        statusPill.style.background = 'rgba(16, 185, 129, 0.2)';
        statusPill.style.color = '#34d399';
        statusPill.style.borderColor = 'rgba(16, 185, 129, 0.4)';
      }

      if (stepWaiting) stepWaiting.classList.add('step-done');
      if (conn1) conn1.classList.add('conn-active');
      if (stepDetected) stepDetected.classList.add('step-done');
      if (conn2) conn2.classList.add('conn-active');
      if (stepVerified) stepVerified.classList.add('step-done');
      if (conn3) conn3.classList.add('conn-active');
      if (stepEscrow) stepEscrow.classList.add('step-done');

      // If this is an active live transition
      if (!meta.isExisting) {
        executeEscrowFundingSuccess(meta);
      }
      break;
  }
}

function executeEscrowFundingSuccess(meta = {}) {
  const targetOrderId = meta.orderId || currentCheckoutOrderId || 'ORD-AUC-02';
  const txId = meta.txId || (isMockPaymentActive() ? getActiveMockTransactionId() : ('TX-' + Math.floor(100000000 + Math.random() * 900000000)));

  // Guard against duplicate execution for this transaction ID
  if (processedPaymentTransactions.has(txId)) {
    return;
  }
  processedPaymentTransactions.add(txId);

  // Fund Escrow and synchronize state across orders, chat, and notifications
  confirmEscrowPayment(targetOrderId, 'PromptPay QR Code');

  // Populate Success Modal
  const orders = loadOrders();
  const order = orders.find(o => o.orderId === targetOrderId);
  const winBidVal = order ? (order.userBid || order.currentBid || 12500000) : 12500000;
  const winBidFormatted = formatCurrency(winBidVal);
  const nowTimeStr = new Date().toLocaleString('th-TH', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });

  const overlay = document.getElementById('paymentSuccessOverlay');
  const amountText = document.getElementById('successAmountText');
  const orderIdText = document.getElementById('successOrderId');
  const txIdText = document.getElementById('successTxId');
  const methodText = document.getElementById('successMethodText');
  const timestampText = document.getElementById('successTimestamp');

  if (amountText) amountText.textContent = winBidFormatted;
  if (orderIdText) orderIdText.textContent = `#${targetOrderId}`;
  if (txIdText) txIdText.textContent = txId;
  if (methodText) methodText.textContent = 'PromptPay QR Code';
  if (timestampText) timestampText.textContent = nowTimeStr;

  if (overlay) {
    overlay.style.display = 'flex';
  }

  // 4-second automatic redirect giving ample time for developer to Reset or let redirect
  let secondsLeft = 4;
  const countdownEl = document.getElementById('redirectCountdown');
  if (countdownEl) countdownEl.textContent = secondsLeft;

  if (paymentRedirectInterval) clearInterval(paymentRedirectInterval);
  paymentRedirectInterval = setInterval(() => {
    secondsLeft--;
    if (countdownEl) countdownEl.textContent = secondsLeft;
    if (secondsLeft <= 0) {
      clearInterval(paymentRedirectInterval);
      redirectNowToOrderDetail();
    }
  }, 1000);
}

function initPaymentRealtimeListeners(orderId) {
  // 1. CustomEvent listener for same-window / simulated backend dispatch
  window.addEventListener('startass:payment_event', (event) => {
    if (event && event.detail) {
      handleIncomingPaymentPayload(event.detail);
    }
  });

  // 2. BroadcastChannel listener for multi-tab / mock gateway notifications
  if (typeof BroadcastChannel !== 'undefined') {
    try {
      paymentBroadcastChannel = new BroadcastChannel('startass_payment_channel');
      paymentBroadcastChannel.onmessage = (event) => {
        if (event && event.data) {
          handleIncomingPaymentPayload(event.data);
        }
      };
    } catch (e) {
      console.warn('BroadcastChannel not supported in this environment', e);
    }
  }

  // 3. Storage Event listener as cross-tab fallback
  window.addEventListener('storage', (e) => {
    if (e.key === 'startass_last_payment_event' && e.newValue) {
      try {
        const payload = JSON.parse(e.newValue);
        handleIncomingPaymentPayload(payload);
      } catch (err) {
        console.error('Failed to parse payment storage event', err);
      }
    }
  });
}

function handleIncomingPaymentPayload(payload) {
  if (!payload || !payload.orderId) return;
  if (payload.orderId !== currentCheckoutOrderId) return;

  const { status, txId, amount } = payload;
  if (status && PAYMENT_STATUS_ENUM[status]) {
    updatePaymentUIState(status, { orderId: payload.orderId, txId, amount });
  }
}

function simulateBackendPaymentWebhook(orderId) {
  if (!isMockPaymentActive()) {
    console.warn('Simulation webhook is not permitted in Real / Production Mode.');
    return;
  }

  const targetId = orderId || currentCheckoutOrderId || 'ORD-AUC-02';
  if (isPaymentSimulationRunning) {
    showToast('⚠️ ระบบกำลังจำลอง Webhook อยู่ กรุณารอสักครู่');
    return;
  }
  isPaymentSimulationRunning = true;

  const btnSim = document.getElementById('btnSimulateWebhook');
  if (btnSim) {
    btnSim.disabled = true;
    btnSim.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> <span>กำลังรับส่ง Webhook จาก Gateway...</span>';
  }

  const generatedTxId = getActiveMockTransactionId();
  showToast(`⚡ ได้รับสัญญาณ Webhook จำลองจาก Payment Gateway [${generatedTxId}]`);

  clearPaymentSimulationTimeouts();

  // Step 1: PAYMENT_DETECTED
  dispatchPaymentWebhookEvent({
    orderId: targetId,
    status: PAYMENT_STATUS_ENUM.PAYMENT_DETECTED,
    txId: generatedTxId,
    timestamp: Date.now()
  });

  // Step 2: PAYMENT_VERIFIED after 1200ms
  const t1 = setTimeout(() => {
    dispatchPaymentWebhookEvent({
      orderId: targetId,
      status: PAYMENT_STATUS_ENUM.PAYMENT_VERIFIED,
      txId: generatedTxId,
      timestamp: Date.now()
    });
  }, 1200);
  paymentSimulationTimeouts.push(t1);

  // Step 3: ESCROW_FUNDED after 2400ms
  const t2 = setTimeout(() => {
    dispatchPaymentWebhookEvent({
      orderId: targetId,
      status: PAYMENT_STATUS_ENUM.ESCROW_FUNDED,
      txId: generatedTxId,
      timestamp: Date.now()
    });
    isPaymentSimulationRunning = false;
  }, 2400);
  paymentSimulationTimeouts.push(t2);
}

function resetMockPaymentFlow() {
  if (!isMockPaymentActive()) {
    console.warn('Mock payment reset is only allowed in Mock / Development Mode.');
    return;
  }

  // 1. Cancel any active simulation & timeouts
  clearPaymentSimulationTimeouts();
  isPaymentSimulationRunning = false;

  // 2. Clear any active redirect interval
  if (paymentRedirectInterval) {
    clearInterval(paymentRedirectInterval);
    paymentRedirectInterval = null;
  }

  // 3. Hide the success modal if visible
  const overlay = document.getElementById('paymentSuccessOverlay');
  if (overlay) {
    overlay.style.display = 'none';
  }

  // 4. Generate NEW Mock Transaction ID (e.g. MOCK-PAYMENT-002)
  currentMockTransactionId = generateNextMockTransactionId();

  // 5. Clean up mock order state in localStorage so it's not locked to PAID
  const targetId = currentCheckoutOrderId || 'ORD-AUC-02';
  resetMockOrderState(targetId);

  // 6. Reset promptpay ref 1 display
  const qrRef1 = document.getElementById('qrRef1');
  const numOnly = (targetId || '89241').replace(/[^0-9]/g, '') || '02';
  if (qrRef1) {
    qrRef1.textContent = `PAY-${numOnly}-${currentMockTransactionId}`;
  }

  // 7. Reset developer simulation button
  const btnSim = document.getElementById('btnSimulateWebhook');
  if (btnSim) {
    btnSim.disabled = false;
    btnSim.innerHTML = '<i class="fa-solid fa-bolt"></i> <span>⚡ จำลอง Webhook จาก Backend (สำหรับทดสอบ)</span>';
  }

  // 8. Clear processed transactions for mock IDs
  processedPaymentTransactions.delete(currentMockTransactionId);

  // 9. Remove last payment event from localStorage
  try {
    localStorage.removeItem('startass_last_payment_event');
  } catch (e) {}

  // 10. Reset UI state to WAITING_FOR_PAYMENT
  updatePaymentUIState(PAYMENT_STATUS_ENUM.WAITING_FOR_PAYMENT, {
    orderId: targetId,
    txId: currentMockTransactionId
  });

  // 11. Ensure real-time listeners are active
  initPaymentRealtimeListeners(targetId);

  if (typeof showToast === 'function') {
    showToast(`🔄 รีเซ็ต Mock Flow เรียบร้อย — เริ่ม Mock Transaction ใหม่ [${currentMockTransactionId}]`);
  }
}

function renderMockControlUI(isMock) {
  const devGroup = document.getElementById('mockDevControlsGroup');
  const btnResetOverlay = document.getElementById('btnResetMockOverlay');

  if (isMock) {
    if (devGroup) devGroup.style.display = 'flex';
    if (btnResetOverlay) btnResetOverlay.style.display = 'inline-flex';
  } else {
    if (devGroup) devGroup.style.display = 'none';
    if (btnResetOverlay) btnResetOverlay.style.display = 'none';
  }
}

function dispatchPaymentWebhookEvent(payload) {
  if (paymentBroadcastChannel) {
    paymentBroadcastChannel.postMessage(payload);
  }
  try {
    localStorage.setItem('startass_last_payment_event', JSON.stringify(payload));
  } catch (e) {}

  window.dispatchEvent(new CustomEvent('startass:payment_event', { detail: payload }));
}

function handleTriggerSimulationWebhook() {
  const agreeChk = document.getElementById('chkEscrowTermsAgree');
  if (agreeChk && !agreeChk.checked) {
    showToast('⚠️ กรุณาทำเครื่องหมายยินยอมเงื่อนไขการคุ้มครองการชำระเงินก่อน');
    agreeChk.focus();
    return;
  }
  simulateBackendPaymentWebhook(currentCheckoutOrderId);
}

function handleCopyQRRef() {
  const refEl = document.getElementById('qrRef1');
  const ref = refEl ? refEl.textContent.trim() : 'PAY-89241';
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(ref).then(() => {
      showToast('📋 คัดลอกหมายเลขอ้างอิง Ref 1 (' + ref + ') เรียบร้อยแล้ว');
    }).catch(() => {
      showToast('หมายเลขอ้างอิง: ' + ref);
    });
  } else {
    showToast('หมายเลขอ้างอิง: ' + ref);
  }
}

function handleDownloadQR() {
  showToast('📥 บันทึกภาพคิวอาร์โค้ด PromptPay สำเร็จ พร้อมเปิดแอปธนาคารเพื่อสแกนจ่าย');
}

function redirectNowToOrderDetail() {
  if (paymentRedirectInterval) clearInterval(paymentRedirectInterval);
  const targetOrderId = currentCheckoutOrderId || 'ORD-AUC-02';
  window.location.href = `ordersdetail.html?id=${encodeURIComponent(targetOrderId)}&payment=success`;
}

function handleChatGoToPayment() {
  const targetId = activeStandaloneChatOrderId || 'ORD-AUC-02';
  window.location.href = `Payment.html?orderId=${encodeURIComponent(targetId)}`;
}

function handleSellerSubmitTracking(event, orderId) {
  if (event) event.preventDefault();

  const targetOrderId = orderId || activeStandaloneChatOrderId;
  const chats = loadP2PChats();
  const chat = chats[targetOrderId];
  if (!chat) return;

  const trackingInput = document.getElementById('sellerTrackingInput');
  const carrierSelect = document.getElementById('sellerCarrierSelect');

  const trackingNumber = trackingInput ? trackingInput.value.trim() : 'WG-98402194-TH';
  const carrier = carrierSelect ? carrierSelect.value : 'White-Glove VIP Delivery';

  if (!trackingNumber) {
    if (typeof showToast === 'function') {
      showToast('⚠️ กรุณาระบุหมายเลขพัสดุ');
    }
    return;
  }

  const todayDate = new Date().toLocaleDateString('th-TH', { month: 'short', day: 'numeric', year: 'numeric' });
  const nowTime = new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });
  const fullTs = `${todayDate}, ${nowTime}`;
  const seller = chat.seller || { name: 'ผู้ขาย', nickname: 'seller', avatar: '' };

  // Update chat state
  chat.trackingNumber = trackingNumber;
  chat.carrier = carrier;
  chat.shippedAt = fullTs;
  chat.shippingStatus = 'SHIPPED';
  chat.inspectionDeadline = Date.now() + 10 * 24 * 60 * 60 * 1000; // 10 days

  // System notification message
  const sysMsg = {
    id: 'msg-sys-track-' + Date.now(),
    sender: 'system',
    isOwner: false,
    text: `🚚 [ระบบบันทึกหมายเลขพัสดุ] ผู้ขาย [@${seller.nickname}] ได้จัดส่งสินค้าและบันทึกหมายเลขพัสดุเรียบร้อยแล้ว: [${trackingNumber}] ขนส่งโดย ${carrier} — ระบบเริ่มนับระยะเวลาตรวจสอบสินค้า 10 วันตามขั้นตอนคุ้มครองการชำระเงิน`,
    date: todayDate,
    time: nowTime,
    fullTimestamp: fullTs,
    isRead: true
  };
  chat.messages.push(sysMsg);

  // Seller notification message
  const sellerMsg = {
    id: 'msg-s-track-' + (Date.now() + 1),
    sender: 'seller',
    isOwner: true,
    senderName: `[ @${seller.nickname} ]`,
    senderAvatar: seller.avatar,
    text: `พัสดุของคุณได้รับการจัดส่งเรียบร้อยแล้วครับ! หมายเลขติดตามพัสดุ: [${trackingNumber}] ขนส่งโดย ${carrier} สามารถนำรหัสนี้ไปตรวจสอบสถานะได้ตลอดเวลา เมื่อได้รับสินค้าแล้วรบกวนตรวจสอบและกดยืนยันรับสินค้าตรงปกในระบบด้วยนะครับ ขอบคุณมากครับ!`,
    date: todayDate,
    time: nowTime,
    fullTimestamp: fullTs,
    isRead: true
  };
  chat.messages.push(sellerMsg);

  chat.lastMessageSnippet = `พัสดุได้รับการจัดส่งเรียบร้อยแล้ว หมายเลข [${trackingNumber}]...`;
  chat.lastMessageDate = todayDate;
  chat.lastMessageTime = nowTime;
  chat.lastMessageFull = `${todayDate} • ${nowTime}`;
  chat.lastMessageIsRead = true;
  saveP2PChats(chats);

  // Synchronize orders in localStorage
  const orders = loadOrders();
  const order = orders.find(o => o.orderId === chat.orderId || o.itemId === chat.itemId);
  if (order) {
    order.trackingNumber = trackingNumber;
    order.carrier = carrier;
    order.shippingStatus = 'SHIPPED';
    order.statusLabel = `จัดส่งสินค้าแล้ว (${carrier}: ${trackingNumber})`;
    saveOrders(orders);
  }

  // Switch to dealer view to observe the tracking badge & 10 days timer
  activeChatViewRole = 'dealer';

  renderStandaloneCurrentChat(chat.orderId);
  renderStandaloneChatConversations(activeStandaloneChatFilter);
  scrollStandaloneChatToBottom();

  if (typeof showToast === 'function') {
    showToast(`📦 บันทึกหมายเลขพัสดุ [ ${trackingNumber} ] สำเร็จ! เริ่มนับระยะเวลาตรวจสอบ 10 วัน`);
  }
}

function copyChatTrackingNumber(trackingNum, event) {
  if (event) event.preventDefault();
  navigator.clipboard.writeText(trackingNum).then(() => {
    if (typeof showToast === 'function') {
      showToast(`📋 คัดลอกหมายเลขพัสดุ [ ${trackingNum} ] แล้ว`);
    }
  }).catch(() => {
    if (typeof showToast === 'function') {
      showToast(`หมายเลขพัสดุ: ${trackingNum}`);
    }
  });
}

function confirmItemReceipt(orderId) {
  const targetOrderId = orderId || activeStandaloneChatOrderId;
  const chats = loadP2PChats();
  const chat = chats[targetOrderId];
  if (!chat) return;

  const todayDate = new Date().toLocaleDateString('th-TH', { month: 'short', day: 'numeric', year: 'numeric' });
  const nowTime = new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });
  const fullTs = `${todayDate}, ${nowTime}`;
  const winBidFormatted = formatCurrency(chat.paidAmount || chat.winningBid || 12500000);
  const seller = chat.seller || { name: 'ผู้ขาย', nickname: 'seller' };

  chat.shippingStatus = 'COMPLETED';

  const sysMsg = {
    id: 'msg-sys-ok-' + Date.now(),
    sender: 'system',
    isOwner: false,
    text: `🎉 [สิ้นสุดคำสั่งซื้อ] ผู้ซื้อกดยืนยันได้รับสินค้าถูกต้องตรงปกแล้ว! ระบบได้ดำเนินการโอนเงินจำนวน ${winBidFormatted} เข้าสู่บัญชีผู้ขาย [@${seller.nickname}] เรียบร้อยแล้ว ปิดคำสั่งซื้อ #${chat.orderId} อย่างสมบูรณ์แบบ`,
    date: todayDate,
    time: nowTime,
    fullTimestamp: fullTs,
    isRead: true
  };
  chat.messages.push(sysMsg);
  chat.lastMessageSnippet = `🎉 ผู้ซื้อกดยืนยันได้รับสินค้าถูกต้องตรงปก โอนเงินให้ผู้ขายเรียบร้อย`;
  chat.lastMessageDate = todayDate;
  chat.lastMessageTime = nowTime;
  chat.lastMessageFull = `${todayDate} • ${nowTime}`;
  chat.lastMessageIsRead = true;
  saveP2PChats(chats);

  const orders = loadOrders();
  const order = orders.find(o => o.orderId === chat.orderId || o.itemId === chat.itemId);
  if (order) {
    order.shippingStatus = 'COMPLETED';
    order.statusLabel = 'ได้รับสินค้าตรงปกแล้ว (ปิดคำสั่งซื้อ)';
    saveOrders(orders);
  }

  renderStandaloneCurrentChat(chat.orderId);
  renderStandaloneChatConversations(activeStandaloneChatFilter);
  scrollStandaloneChatToBottom();

  if (typeof showToast === 'function') {
    showToast(`🎉 ยืนยันสินค้าตรงปกสำเร็จ! ระบบโอนเงินให้ผู้ขายและปิดคำสั่งซื้อแล้ว`);
  }
}

function requestItemReturn(orderId) {
  const targetOrderId = orderId || activeStandaloneChatOrderId;
  const chats = loadP2PChats();
  const chat = chats[targetOrderId];
  if (!chat) return;

  const todayDate = new Date().toLocaleDateString('th-TH', { month: 'short', day: 'numeric', year: 'numeric' });
  const nowTime = new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });
  const fullTs = `${todayDate}, ${nowTime}`;
  const seller = chat.seller || { name: 'ผู้ขาย', nickname: 'seller' };

  chat.shippingStatus = 'RETURN_REQUESTED';

  const sysMsg = {
    id: 'msg-sys-ret-' + Date.now(),
    sender: 'system',
    isOwner: false,
    text: `⚠️ [แจ้งขอคืนสินค้า / ไม่ตรงปก] ผู้ซื้อได้ส่งคำขอคืนสินค้าเนื่องจากสินค้าไม่เป็นไปตามข้อตกลง ยอดเงินถูกระงับการโอนเพื่อความปลอดภัย โปรดติดต่อประสานงานส่งสินค้าคืนผู้ขาย [@${seller.nickname}]`,
    date: todayDate,
    time: nowTime,
    fullTimestamp: fullTs,
    isRead: true
  };
  chat.messages.push(sysMsg);
  chat.lastMessageSnippet = `⚠️ ผู้ซื้อส่งคำขอคืนสินค้า (ไม่ตรงปก) ยอดเงินถูกระงับ...`;
  chat.lastMessageDate = todayDate;
  chat.lastMessageTime = nowTime;
  chat.lastMessageFull = `${todayDate} • ${nowTime}`;
  chat.lastMessageIsRead = true;
  saveP2PChats(chats);

  const orders = loadOrders();
  const order = orders.find(o => o.orderId === chat.orderId || o.itemId === chat.itemId);
  if (order) {
    order.shippingStatus = 'RETURN_REQUESTED';
    order.statusLabel = 'ขอคืนสินค้า (ไม่ตรงปก)';
    saveOrders(orders);
  }

  renderStandaloneCurrentChat(chat.orderId);
  renderStandaloneChatConversations(activeStandaloneChatFilter);
  scrollStandaloneChatToBottom();

  if (typeof showToast === 'function') {
    showToast(`⚠️ บันทึกคำขอคืนสินค้าเรียบร้อย ยอดเงินถูกระงับตามขั้นตอน`);
  }
}

function resetChatEscrowDemo(orderId) {
  const targetOrderId = orderId || activeStandaloneChatOrderId;
  const chats = loadP2PChats();
  const chat = chats[targetOrderId];
  if (!chat) return;

  chat.paymentStatus = 'UNPAID';
  chat.shippingStatus = 'AWAITING_PAYMENT';
  chat.trackingNumber = '';
  chat.carrier = '';
  delete chat.paidAmount;
  delete chat.paidAt;
  delete chat.shippedAt;
  delete chat.inspectionDeadline;

  // Filter out pay/track system messages
  chat.messages = (chat.messages || []).filter(m => !m.id || (!m.id.startsWith('msg-sys-pay') && !m.id.startsWith('msg-s-pay') && !m.id.startsWith('msg-sys-track') && !m.id.startsWith('msg-s-track') && !m.id.startsWith('msg-sys-ok') && !m.id.startsWith('msg-sys-ret')));

  chat.lastMessageSnippet = 'เรากำลังจัดเตรียมเคสอะคริลิกกันรังสี UV และเอกสารอนุญาตส่งออก รบกวนคุณ Alexander ยืนยันที่อยู่จัดส่ง...';
  saveP2PChats(chats);

  const orders = loadOrders();
  const order = orders.find(o => o.orderId === chat.orderId || o.itemId === chat.itemId);
  if (order) {
    order.paymentStatus = 'UNPAID';
    order.shippingStatus = 'AWAITING_PAYMENT';
    order.trackingNumber = '';
    order.carrier = '';
    order.statusLabel = 'ชนะการประมูลแล้ว (รอประสานงานจัดส่ง)';
    saveOrders(orders);
  }

  activeChatViewRole = 'dealer';

  renderStandaloneCurrentChat(chat.orderId);
  renderStandaloneChatConversations(activeStandaloneChatFilter);
  scrollStandaloneChatToBottom();

  if (typeof showToast === 'function') {
    showToast(`🔄 รีเซ็ตสถานะคำสั่งซื้อเป็น [ รอชำระเงิน ] เรียบร้อย พร้อมทดสอบใหม่`);
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

  if (document.getElementById('myProfileContainer')) {
    initMyProfilePage();
  }

  if (document.getElementById('otherProfileContainer')) {
    initOtherProfilePage();
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
