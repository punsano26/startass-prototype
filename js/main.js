/**
 * STARTASS AUCTIONS - Main JavaScript Engine
 * Handles Top 10 Bids display, category filtering, live countdowns, and bidding modals.
 */

// Top 10 Auction Items Data with Highest Current Bids
const AUCTION_ITEMS = [
  {
    id: 'auc-01',
    rank: 1,
    title: '1967 Shelby GT500 Fastback "Eleanor Edition"',
    category: 'cars',
    categoryLabel: 'Car Models',
    image: 'https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&fit=crop&w=1200&q=80',
    description: 'Fully restored numbers-matching 428 Cobra Jet V8, 4-speed manual transmission, finished in Pepper Gray with black Le Mans stripes. Verified Shelby registry documentation.',
    startPrice: 150000,
    currentBid: 485000,
    startDate: '2026-08-28 10:00 AM',
    endDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000 + 4 * 3600 * 1000).toISOString(),
    bidsCount: 42,
    specs: ['428ci Cobra Jet V8 Engine', '4-Speed Toploader Manual', 'Pepper Gray with Black Stripes', 'Carroll Shelby Signed Dashboard'],
    bidHistory: [
      { user: 'Collector_Viper', amount: 485000, time: '12 mins ago' },
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
    description: 'Holy Grail of collectible trading cards. 1999 Base Set 1st Edition Shadowless Charizard graded PSA 10 Gem Mint. Flawless centering, razor sharp corners, and crystal surface.',
    startPrice: 90000,
    currentBid: 360000,
    startDate: '2026-08-30 02:00 PM',
    endDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000 + 11 * 3600 * 1000).toISOString(),
    bidsCount: 58,
    specs: ['Graded: PSA 10 Gem Mint', 'Cert ID: #4829104', 'Shadowless Holographic', 'Museum Grade UV Acrylic Casing'],
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
    description: 'Factory lightweight Weissach Package, exposed carbon fiber hood & roof, magnesium wheels, ceramic composite brakes (PCCB), and delivery mileage only (45 miles).',
    startPrice: 220000,
    currentBid: 315000,
    startDate: '2026-08-25 09:00 AM',
    endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000 + 8 * 3600 * 1000).toISOString(),
    bidsCount: 29,
    specs: ['4.0L Naturally Aspirated Flat-6 (518 HP)', 'Carbon-Ceramic Composite Brakes', 'Weissach Lightweight Carbon Package', 'Odo: 45 miles'],
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
    description: 'Direct lineage from the Omiya Bonsai Village master collection. Exquisite jin and shari natural deadwood sculpture with vibrant compact foliage in antique handmade Tokoname pot.',
    startPrice: 40000,
    currentBid: 195000,
    startDate: '2026-08-27 11:30 AM',
    endDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000 + 16 * 3600 * 1000).toISOString(),
    bidsCount: 33,
    specs: ['Age: ~180 Years (Documented)', 'Species: Juniperus chinensis var. sargentii', 'Pot: Antique 19th Century Tokoname Ceramic', 'Includes Botanical Export Certificate'],
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
    description: 'One of only 63 surviving Apple-1 motherboards hand-built by Steve Wozniak and Steve Jobs. Fully functional, authenticated by Corey Cohen, complete with period Sanyo monitor and Datanetics keyboard.',
    startPrice: 85000,
    currentBid: 178000,
    startDate: '2026-08-29 08:00 AM',
    endDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000 + 7 * 3600 * 1000).toISOString(),
    bidsCount: 38,
    specs: ['Operational MOS 6502 Microprocessor @ 1MHz', '4KB RAM Onboard (expandable)', 'Original Apple Cassette Interface (ACI)', 'Signed letter of authenticity'],
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
    description: 'The pinnacle of Magic: The Gathering history. Original 1993 Alpha release illustrated by the late Christopher Rush. Pristine subgrades: Centering 9.5, Corners 9.5, Edges 9.5, Surface 9.0.',
    startPrice: 70000,
    currentBid: 162000,
    startDate: '2026-08-26 01:00 PM',
    endDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000 + 19 * 3600 * 1000).toISOString(),
    bidsCount: 26,
    specs: ['Beckett Grading: BGS 9.5 Gem Mint', '1993 Limited Edition Alpha', 'Subgrades: 9.5 / 9.5 / 9.5 / 9.0', 'Artist: Christopher Rush'],
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
    description: 'Legendary 1990s aerospace & CGI supercomputer rack in signature purple enclosure. Powered by 16 MIPS R10000 processors and 4 RealityEngine graphics pipes. Fully restored with IRIX 6.5.',
    startPrice: 35000,
    currentBid: 125000,
    startDate: '2026-08-28 03:00 PM',
    endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000 + 12 * 3600 * 1000).toISOString(),
    bidsCount: 21,
    specs: ['16x 250MHz MIPS R10000 Processors', 'InfiniteReality3 Graphics Subsystem', 'IRIX 6.5.30 Loaded with Alias/Wavefront', 'Original 1998 Documentation & Cables'],
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
    description: 'Custom bespoke motorsport simulator built on a genuine lightweight carbon composite tub with industrial hydraulic motion actuators, quad-4K surround display, and authentic MoTeC telemetry systems.',
    startPrice: 30000,
    currentBid: 110000,
    startDate: '2026-08-31 10:00 AM',
    endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000 + 2 * 3600 * 1000).toISOString(),
    bidsCount: 19,
    specs: ['6-DOF Force-Feedback Hydraulic Platform', 'Full Carbon Fiber Monocoque Cockpit', 'Authentic MoTeC Display Unit & Sparco Pedals', 'Dual RTX 4090 Simulation Node'],
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
    description: 'Majestic 95-year-old Japanese Mountain Maple with breathtaking fiery autumn scarlet foliage. Balanced broom-style canopy with an impressive flared nebari root base.',
    startPrice: 20000,
    currentBid: 96000,
    startDate: '2026-08-29 09:30 AM',
    endDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000 + 20 * 3600 * 1000).toISOString(),
    bidsCount: 24,
    specs: ['Age: 95 Years', 'Style: Hoki-dachi (Broom Style)', 'Height: 38 inches / Nebari Width: 14 inches', 'Acclimated Greenhouse Specimen'],
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
    description: 'Factory original 426 HEMI V8 (425 hp), Torqueflite automatic, pristine B5 Blue Metallic with black vinyl roof. Documented with original broadcast sheet and Galen Govier inspection report.',
    startPrice: 45000,
    currentBid: 92000,
    startDate: '2026-08-27 04:00 PM',
    endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000 + 5 * 3600 * 1000).toISOString(),
    bidsCount: 31,
    specs: ['Original 426ci Street HEMI V8', 'Dual 4-Barrel Carter Carburetors', 'B5 Blue Fire Metallic Paint', 'Galen Govier Authenticated 1 of 112'],
    bidHistory: [
      { user: 'MoparMuscleClub', amount: 92000, time: '15 mins ago' },
      { user: 'DetroitIron', amount: 86000, time: '3 hours ago' },
      { user: 'HighwayLegend', amount: 79000, time: '7 hours ago' }
    ]
  }
];

// State
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
    const timeDisplay = time.expired 
      ? 'Auction Closed' 
      : `${time.days}d ${time.hours}h ${time.minutes}m ${time.seconds}s left`;

    const rankClass = item.rank === 1 ? 'top-1' : item.rank === 2 ? 'top-2' : item.rank === 3 ? 'top-3' : '';

    return `
      <article class="auction-card" id="card-${item.id}">
        <!-- Media / Visual -->
        <div class="card-media">
          <img src="${item.image}" alt="${item.title}" class="card-img" loading="lazy" />
          
          <div class="card-overlay-top">
            <span class="rank-badge ${rankClass}">
              <i class="fa-solid fa-trophy"></i> #${item.rank} Highest Bid
            </span>
            <span class="category-tag">${item.categoryLabel}</span>
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
            <button class="btn btn-bid" onclick="openBidModal('${item.id}')">
              <i class="fa-solid fa-gavel"></i> Open Auction Bid
            </button>
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

  selectedItemForBid = item;
  const modal = document.getElementById('bidModal');
  const previewImg = document.getElementById('modalPreviewImg');
  const previewTitle = document.getElementById('modalPreviewTitle');
  const previewCategory = document.getElementById('modalPreviewCategory');
  const currentBidEl = document.getElementById('modalCurrentBid');
  const minNextBidEl = document.getElementById('modalMinNextBid');
  const bidInput = document.getElementById('bidAmountInput');
  const historyList = document.getElementById('modalBidHistory');

  if (previewImg) previewImg.src = item.image;
  if (previewTitle) previewTitle.textContent = item.title;
  if (previewCategory) previewCategory.textContent = item.categoryLabel;
  if (currentBidEl) currentBidEl.textContent = formatCurrency(item.currentBid);

  const minNext = item.currentBid + 1000;
  if (minNextBidEl) minNextBidEl.textContent = formatCurrency(minNext);
  if (bidInput) {
    bidInput.value = minNext;
    bidInput.min = minNext;
  }

  // Populate history
  if (historyList) {
    historyList.innerHTML = item.bidHistory.map(b => `
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

  const bidInput = document.getElementById('bidAmountInput');
  const newAmount = parseInt(bidInput.value, 10);

  if (isNaN(newAmount) || newAmount <= selectedItemForBid.currentBid) {
    alert(`Your bid must be higher than current bid of ${formatCurrency(selectedItemForBid.currentBid)}!`);
    return;
  }

  // Update item
  selectedItemForBid.currentBid = newAmount;
  selectedItemForBid.bidsCount += 1;
  selectedItemForBid.bidHistory.unshift({
    user: 'You (Online Bidder)',
    amount: newAmount,
    time: 'Just now'
  });

  // Re-sort Top 10 by currentBid descending and update ranks
  AUCTION_ITEMS.sort((a, b) => b.currentBid - a.currentBid);
  AUCTION_ITEMS.forEach((item, index) => {
    item.rank = index + 1;
  });

  closeBidModal();
  renderCards();
  showToast(`Bid Placed: ${formatCurrency(newAmount)} on ${selectedItemForBid.title}!`);
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

  if (specsList) {
    specsList.innerHTML = item.specs.map(spec => `
      <li class="detail-spec-item">
        <i class="fa-solid fa-check spec-icon"></i>
        <span>${spec}</span>
      </li>
    `).join('');
  }

  if (modal) modal.classList.add('open');
}

function closeDetailModal() {
  const modal = document.getElementById('detailModal');
  if (modal) modal.classList.remove('open');
  selectedItemForDetail = null;
}

function switchFromDetailToBid() {
  if (selectedItemForDetail) {
    const id = selectedItemForDetail.id;
    closeDetailModal();
    openBidModal(id);
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

// Initialization on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  renderCards();
  setupCategoryFilters();
  setInterval(updateCountdowns, 1000);

  // Close modals on clicking backdrop
  document.querySelectorAll('.modal-backdrop').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('open');
      }
    });
  });
});
