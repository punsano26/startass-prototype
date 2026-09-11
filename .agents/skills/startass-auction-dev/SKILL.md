---
name: startass-auction-dev
description: >-
  Use this skill when developing, expanding, or modifying pages, components, and
  features for the Startass Auction prototype. It provides design patterns for
  auction cards, countdown timers, bidding/detail modals, and mobile-first
  responsive layout standards.
---

# Startass Auction Development & Mobile Standards

This skill provides guidelines and patterns for building and maintaining the Startass Auction platform prototype.

## 1. Project Structure & Asset Conventions

- **Pages**: Store standalone HTML views inside `pages/` (e.g., `pages/HomePage.html`).
- **Components**: Reusable modular HTML/JS components inside `components/` (e.g., `components/modals/AuctionDetailModal.html` and `components/modals/AuctionDetailModal.js`).
- **Styles**: Centralized luxury dark-theme CSS in `css/style.css`.
- **Scripts**: Interactive auction logic, countdown timers, and modal handling in `js/main.js`.
- **Images**: High-resolution free Unsplash URLs or local assets in `images/`.

---

## 2. Mobile-First Responsive Guidelines

### A. Preventing Flexbox Viewport Blowouts
- **The Issue**: By default, flex items have `min-width: auto;`. When flex items contain unwrapable buttons or long strings, they can refuse to shrink below their content size, forcing the entire page into horizontal overflow on mobile viewports (< 450px).
- **Rule**: Always specify `min-width: 0; max-width: 100%; width: 100%;` on flex children that wrap text, chips, or inputs.

### B. Search & Category Filter Architecture
- Keep Search and Category Filters in separate containers:
  - `.search-bar-wrapper`: Standalone full-width container with search icon, input, and tap-to-clear button (`#clearSearchBtn`).
  - `.category-filters-container`: Dedicated card with category title and active filter hint.
  - `.category-filters`: Use `flex-wrap: wrap; gap: 8px; width: 100%; min-width: 0;` so chips flow into 2 neat rows on mobile screens rather than breaking horizontally.

### C. Breakpoint Matrix
- **`<= 1024px`**: Grid transitions to responsive multi-column.
- **`<= 768px`**: Single-column auction card grid, stats ribbon becomes a 2x2 grid, category filters wrap neatly.
- **`<= 640px`**: Card media height scales to 215px, modal behaves as a bottom-sheet with 2x2 quick increment bid buttons (`+$500`, `+$1,000`, etc.).
- **`<= 380px` (iPhone SE / compact foldables)**: Date rows stack vertically (`grid-template-columns: 1fr;`), buttons remain touch-friendly (≥ 40px height).

---

## 3. Auction Card Pattern

Every auction item card must incorporate:
1. **Media Container**:
   - High-res image with zoom transition.
   - Top overlay: `.rank-badge` (`#1 ข้อเสนอสูงสุด`, `#2...`, only displayed for Top 10 ranked items; items > 10 do not show a rank badge) and `.category-tag`.
   - Bottom overlay: `.countdown-badge` displaying real-time remaining time (`02d 14h 22m 10s left`).
2. **Body Content**:
   - Title: 2-line clamp with hover highlight.
   - Description: 2-to-3-line clamp with muted secondary color.
   - *(Note: Seller profile info is omitted from the card face to prevent clutter and is cleanly hosted in the Detail Modal)*.
3. **Price Container**:
   - Left: Start Price (reserve).
   - Right: Current Bid (emerald green, highlighted with total bids count).
4. **Dates Box**:
   - Start Date & End Date with semantic calendar icons.
5. **Actions**:
   - Primary: "Open Auction Bid" button (`btn-bid`) opening the bid submission modal.
   - Secondary: "View" button (`btn-view`) opening the specifications modal.

---

## 4. Modal Standards

1. **Bidding Modal**:
   - Current highest bid vs minimum next bid (+ ฿50,000 or custom step).
   - 2x2 quick increment buttons for fast mobile tapping.
   - Verified bidder activity log (recent bids timeline).
   - Instant validation and real-time leaderboard re-sort on successful submission.
2. **Detail Modal**:
   - Full product media preview with multi-image thumbnail strip.
   - Seller provenance box (`.detail-seller-box`) showing seller avatar, name, `@nickname`, verified shield badge, rating, and link to seller profile (`OtherProfileDetail.html`).
   - Specification bullet points with gold checkmarks (`.detail-spec-item`).
   - Direct CTA transition to "Place Bid Now".

---

## 5. Create Auction Modal & Multi-Image Upload Standards

### A. Form Architecture (2-Column Responsive Layout)
- **Container**: Set modal container width to `max-width: 960px; width: 95%;` on desktop viewports.
- **Layout Structure (`.create-modal-layout`)**:
  - **Left Hand (`.create-modal-left`)**: Group all product metadata inputs:
    - Product Name (Title)
    - Category dropdown & Status toggle (Active vs. Draft) in a 2-col grid
    - Start Price (with currency prefix `$`) & Bid Increment select
    - Start Date & End Date datetime-local pickers
    - Full Product Description textarea
  - **Right Hand (`.create-modal-right`)**: Dedicated media management panel:
    - Image dropzone (`.image-upload-zone`) with dashed gold border and drag-and-drop support.
    - Live preview display (`.create-image-preview`) with centered placeholder when empty.
    - Real-time image counter badge (`.image-preview-badge`, e.g. "รูปที่ 1 จาก 3 รูป").
    - Quick-action remove button (`.btn-remove-preview`) for the active preview image.
    - Thumbnail gallery strip (`.create-thumbnails-strip`) with active border highlights and individual thumbnail removal (`.btn-thumb-remove`).
- **Mobile Adaptability (`<= 860px`)**:
  - Collapse `.create-modal-layout` to a single column (`grid-template-columns: 1fr; gap: 18px;`).
  - Ensure full touch-targets for thumbnail items (minimum 56x56px) with horizontal scrolling.

### B. Multi-Image State & Data Engine
- **Input Config**: Always set `multiple` and `accept="image/*"` on `<input type="file">`.
- **Asynchronous Reading**: Process selected files concurrently using `FileReader` wrapped in `Promise.all` to convert raw files to DataURLs without external server dependencies.
- **Data Model Invariants**:
  - `item.image`: Primary cover image (first image in the upload list or fallback Unsplash URL).
  - `item.images`: Array of all uploaded image DataURLs.
- **Detail Modal Gallery Sync**: When opening detail views (`openDetailModal`), check `item.images.length > 1` and render `.detail-thumbnails-strip` so bidders can switch the primary inspection photo seamlessly.

---

## 6. Orders Detail Page & Bidding Flow Standards

### A. Bid Button Transition & Active Bid State
- When a user submits a bid on an auction card on `HomePage.html`:
  - The card's primary action button changes to an emerald-highlighted active bid button (`.btn-bid-active`), displaying:
    `<i class="fa-solid fa-circle-check"></i> Bid Active: $XX,XXX <small>(View Order)</small>`
  - Alongside it, an icon button (`.btn-raise-bid`) is provided so users can increase their bid at any time.
  - Clicking `.btn-bid-active` routes directly to `pages/ordersdetail.html?id=<itemId>`.

### B. Orders Detail Page Architecture (`pages/ordersdetail.html`)
- **Order Switcher**: Header strip (`.order-switcher-container`) allowing bidders with multiple bids/orders to switch active inspection views with 1-click chips (`.order-chip`).
- **Header Status Banner**: Displays Order ID, Status Enum Badge (`WINNING`, `OUTBID`, `WON`, `ENDED`), and timestamps (`Placed at` and `Updated at`).
- **Product Gallery**: Main image preview (`#orderMainImg`) with clickable thumbnail gallery (`.order-gallery-thumb`) for switching photos.
- **Seller Card**: Displays seller verified badge, trust rating, and Seller Nickname formatted with brackets: `[ @SellerNickname ]`.
- **Pricing Matrix**: Clear comparison between Current Highest Bid, User's Placed Bid, Reserve Starting Price, and Minimum Increment.
- **Toggle between History and Current Views (`.order-toggle-section`)**:
  - **Current View**: Displays item certified specifications, STARTASS Escrow Vault protection terms, and white-glove insured delivery guarantees.
  - **History View**: Chronological audit timeline of all bids (`.bid-timeline-list`), highlighting user bids with gold tags and highest bids with trophies.

---

## 7. Outbid Notification & Navbar Bell Standards

### A. Navbar Notification Bell (`.notification-dropdown-wrapper`)
- Integrated in the platform navbar on all views (`HomePage.html`, `ordersdetail.html`).
- **Bell Button (`.notification-btn`)**: Touch-friendly 42x42px icon button with hover glow and dynamic ringing animation (`@keyframes bellWiggle`) when unread alerts exist.
- **Pulsing Badge (`.notification-badge`)**: Displays unread count with high-contrast red gradient (`#ef4444` to `#dc2626`) and soft pulse animation.
- **Dropdown Architecture (`.notification-dropdown-menu`)**:
  - Header with unread count tag and 1-click "Mark read" button (`.btn-clear-notifications`).
  - Scrollable notification list (`.notification-list`) with item-level unread indicators.
  - Outbid items highlight rival bidder nickname, new outbid price, and provide direct "Raise Bid" CTA + "View Order" link.
  - Interactive simulator CTA (`.btn-simulate-outbid`) in footer to test real-time outbid flows.

### B. Outbid Flow & Real-Time Sync
- When an outbid event occurs (either organically or via `simulateOutbid()`):
  - User's order status transitions from `WINNING` to `OUTBID` (`statusLabel: 'Outbid (Action Needed)'`).
  - A persistent notification is appended to `startass_notifications` in `localStorage`.
  - A prominent toast alert (`.toast-outbid`) triggers with an urgent red/amber glow and direct "Raise Bid Now" CTA button.
  - Both the homepage cards and `ordersdetail.html` status matrix immediately update to reflect the new highest bid and outbid state.

---

## 8. Highest Bidder Bidding Lock & Unlock on Outbid Standard

### A. Core Rule: No Self-Bidding
- If the user's placed bid is currently the highest bid (`isUserHighestBidder(itemId)` evaluates to `true`), the user **must NOT be able to open bids or place higher bids** on that item until another user outbids them ("Until someone places a bid on your behalf").

### B. UI Component States
1. **Auction Cards (`HomePage.html`)**:
   - When user is highest bidder (`isHighest === true`):
     - Active bid button shows emerald winning style: `.btn-bid-active.btn-winning` (`<i class="fa-solid fa-crown"></i> Winning: $XX,XXX (Highest Bidder)`).
     - The raise button is locked: `.btn-raise-bid.btn-bid-locked` with `disabled`, `<i class="fa-solid fa-lock"></i>`, and an explanatory title tooltip.
   - When user is outbid (`isHighest === false`):
     - Active bid button shifts to warning style: `.btn-bid-active.btn-outbid` (`<i class="fa-solid fa-triangle-exclamation"></i> Outbid: $XX,XXX (Raise Now)`).
     - The raise button unlocks: `.btn-raise-bid.btn-outbid-unlocked` with `<i class="fa-solid fa-arrow-trend-up"></i>`, pulsing amber glow animation, and active click handler `openBidModal(item.id)`.

2. **Orders Detail View (`pages/ordersdetail.html`)**:
   - Header action button:
     - Winning: `<button class="btn btn-order-raise btn-bid-locked" disabled><i class="fa-solid fa-lock"></i> Highest Bidder (Locked)</button>`
     - Outbid: `<button class="btn btn-order-raise btn-outbid-pulse" onclick="openBidModal(...)"><i class="fa-solid fa-arrow-trend-up"></i> Raise Bid Now</button>`
   - Pricing CTA Group:
     - Winning: Displays disabled locked CTA + `.order-bid-lock-banner` explaining that user currently leads and bidding is locked against self-bidding.
     - Outbid: Displays pulsing amber CTA + `.order-bid-outbid-banner` explaining that user was outbid and prompting them to raise their bid.

3. **Bidding Modal & Detail Modal Guards**:
   - `openBidModal(itemId)`: Immediately verifies `!isUserHighestBidder(itemId)`. If true, rejects opening and triggers `showHighestBidderLockToast(item)`.
   - `submitBid()`: Strict validation guard rejecting any bid attempts while holding highest bid.
   - `openDetailModal(itemId)` & `switchFromDetailToBid()`: Detail view CTA switches dynamically between "Place Bid Now" and disabled "You Hold Highest Bid (Locked)".

---

## 9. P2P Seller Chat & Won Auction Rights Architecture

### A. Auction Won Rights & Centralized Chat Architecture
- **Centralized Messaging Hub**: All P2P conversations are centralized exclusively inside `pages/chat.html`. Do NOT embed duplicate chat panels or chat tabs inside `pages/ordersdetail.html`.
- **Exclusive Access**: Direct peer-to-peer (P2P) communication with the seller is an exclusive right reserved strictly for winning bidders (`order.status === 'WON'`).
- **Orders Detail View (`pages/ordersdetail.html`)**:
  - Maintains strictly 2 tabs: `ภาพรวมคำสั่งซื้อ (Overview)` and `ประวัติการเสนอราคา (Bid History)`.
  - When won, all chat CTA buttons (`.btn-order-p2p` in header and `.btn-order-p2p-cta` in pricing card) route directly to `pages/chat.html?orderId=<orderId>`. Redundant middle buttons inside the seller card have been removed to prevent button clutter.
  - If a URL query parameter `tab=chat` is encountered on `ordersdetail.html`, `initOrderDetailPage()` automatically redirects to `chat.html?orderId=<orderId>`.
- **Active / Ongoing Auction Locked State**: If the auction is still ongoing (`WINNING`, `OUTBID`), direct messaging remains locked and calls `showP2PLockNotice()`.

### B. Part Conversations ("Conversations List")
- Located in `.standalone-chat-sidebar`:
  - **Header**: Displays total conversation count badge (`#chatConvCountBadge`).
  - **Search Bar (`#chatSearchInput`)**: Real-time filtering across seller nicknames, names, and auction titles.
  - **Item Row (`.chat-conv-item`)**:
    - Partner avatar with green online presence dot (`.conv-online-dot`).
    - FullName rendered prominently in bold (`.conv-fullname`), paired with subtle username pill (`.conv-username-small`, `@nickname`).
    - Won item title and last message snippet with relative timestamp (`.conv-timestamp`).
    - Unread message badge (`.conv-unread-number-badge`).
    - Active selection highlight with gold accent border.

### C. Cross-Page Navigation & Simulation Triggers
- **Homepage Card**: For won auctions, primary button links directly to `chat.html?orderId=<orderId>`.
- **Orders Detail**: Won action buttons open `chat.html?orderId=<orderId>`.
- **Navbar Bell Dropdown**: Footer contains `⚡ Simulate Won Auction` alongside `⚡ Simulate Outbid Alert` for instant testing across all views.

---

## 10. Standalone P2P Chat & Messages Architecture (`pages/chat.html`)

### A. Core Architecture & Route
- **Dedicated Standalone Page**: `pages/chat.html` provides a persistent, full-screen direct messaging center for managing all peer-to-peer dialogues across won deals.
- **Global Navbar Integration**:
  - All views feature `.btn-chat-nav` (`#navChatBtn`) displaying real-time unread message counts in an animated emerald pill badge (`#navChatBadge`).
  - User profile dropdown menu includes a direct link: `Messages / P2P Chat`.

### B. Spacious Layout & Viewport Containment Standards
- **Viewport Containment**: Set `body:has(.chat-page-wrapper) { height: 100vh; height: 100dvh; overflow: hidden; }` and `.chat-page-wrapper { height: calc(100vh - 68px); height: calc(100dvh - 68px); display: flex; flex-direction: column; overflow: hidden; }` so the browser outer window never scrolls.
- **Container Sizing**: Set `.container.chat-page-wrapper` to `max-width: 1720px !important; width: 96% !important;` to ensure wide displays have an expansive, breathable UI.
- **Grid Ratio**: Desktop layout uses `grid-template-columns: 330px 1fr` (sidebar + expansive conversation pane) with `flex: 1 1 0%; height: 100%; min-height: 0; overflow: hidden;`.
- **Sidebar 3-Line Layout**: Avoid name truncation by splitting metadata into 3 rows:
  - Row 1 (`.conv-top-line`): FullName (`.conv-fullname`) + Timestamp (`.conv-timestamp`).
  - Row 2 (`.conv-sub-line`): Small username badge (`.conv-username-small`, `@nickname`) + Order badge (`#ORD-AUC-XX`).
  - Row 3 (`.conv-preview-row`): Message snippet + Read/Unread status badge.
- **No Verification Badges in Chat**: Do not display "ยืนยันตัวตนแล้ว" / `.chat-seller-verified-badge` in the chat UI to maintain a minimalist, clutter-free header.
- **Name Display Hierarchy**:
  - **FullName**: Render as the primary bold heading (`.chat-header-fullname`, `.conv-fullname`, `.chat-msg-sender-fullname`).
  - **Username**: Render as a small, subtle sub-tag (`@nickname`, `.chat-header-username-small`, `.conv-username-small`).

### C. Selected Chat / Current Chat Window & Strict Flexbox Pinning
- **Container (`.standalone-chat-main`)**:
  - Requires `display: flex; flex-direction: column; height: 100%; min-height: 0; max-height: 100%; overflow: hidden;`.
  - **Pinned Top Bars (`flex-shrink: 0;`)**:
    - `.chat-main-header`: Profile avatar, FullName heading (`.chat-header-fullname`), small username pill, online dot, rating, and Escrow badge.
    - `.chat-live-deal-strip`: High-res product thumbnail, title, Order ID, and latest bid amount.
  - **Scrollable Middle Timeline (`flex: 1 1 0%; min-height: 0; overflow-y: auto;`)**:
    - `.chat-messages-timeline`: Only this element scrolls. Its `min-height: 0` prevents large message cards from stretching the flex container.
    - Full Time & Date on every message with read receipt checkmarks.
  - **Owner Messages Deal Card**:
    - When an owner/seller message is sent, an embedded compact `.owner-product-bids-card` (max-width: 440px, 48px thumb) is rendered only on the **first** seller message in the thread to prevent redundant clutter.
  - **Pinned Bottom Bars (`flex-shrink: 0;`)**:
    - `.chat-typing-indicator-row`: Seller typing animation banner (`flex-shrink: 0;`).
    - `.chat-quick-actions-bar`: 1-tap quick action prompt chips with hidden scrollbars (`flex-shrink: 0;`).
    - `.chat-composer-bar`: File attachment button, `#standaloneMessageInput` text field, mini typing simulation button, and submit send button permanently anchored at the bottom.

### D. Interactive Typing Simulator & Typing Indicator Standards
- **Buyer Typewriter Simulation (`simulateTypingPrompt`)**:
  - Automatically types text into `#standaloneMessageInput` character-by-character with realistic keypress delays (16–32ms).
  - While typing, applies `.is-typing` class with active glow animation (`@keyframes typingInputGlow`).
  - Mini simulator button (`.btn-composer-simulate-mini`) placed inside the input wrapper (`[ ⚡ จำลองพิมพ์ ]`) for 1-click auto-typing.
  - Quick action chips (`.btn-chip-sim`) trigger typewriter simulation before sending.
- **Seller Typing Indicator (`#chatTypingIndicator`)**:
  - When waiting for seller replies, display an animated 3-dot bouncing bubble (`.typing-dots` with `@keyframes typingDotBounce`).
  - Temporarily update header online presence pill to `<i class="fa-solid fa-pencil fa-bounce"></i> กำลังพิมพ์...`.
  - Automatically dissolve typing indicator when the incoming seller message bubble is rendered.
- **On-Demand Seller Simulator (`simulateSellerResponseDirect`)**:
  - Dedicated trigger button (`[ 🤖 ⚡ จำลองผู้ขายตอบกลับ ]`) to test the seller typing indicator and realistic response flows on demand.

### E. Responsive Mobile Standard
- **Desktop (`> 768px`)**: Side-by-side 2-column layout (330px sidebar + 1fr chat window).
- **Mobile (`<= 768px`)**:
  - Automatically switches between conversation list and active chat view using `.mobile-chat-active` state.
  - Back button (`.btn-chat-mobile-back`) appears in chat header to return to conversation list.
  - Composer input wrapper scales smoothly; mini simulation button collapses to icon on compact phones (< 480px) and buttons maintain touch targets >= 40px. Safe area insets supported.

---

## 11. User Profile & Reputation Architecture (`pages/MyProfileDetails.html` & `pages/OtherProfileDetail.html`)

### A. My Profile Standards (`pages/MyProfileDetails.html`)
- **Profile Header**: Clean Avatar-only header (`.profile-avatar-xl` with online presence indicator dot and 1-click change avatar trigger). No cover banner hero, and no verification badges (unverified/no KYC badges in Startass project scope).
- **Identity Details**: FullName (`Alexander Sterling`), Nickname pill (`@Alexander_Sterling`), and personal bio.
- **Action Buttons**:
  - `แก้ไขข้อมูลโปรไฟล์ (Edit Profile)`: Opens interactive modal allowing real-time edits to name, nickname, avatar URL, and bio with persistence in `localStorage` (`startass_my_profile`).
  - `สร้างโพสต์ประมูลใหม่ (Create Post)`: Opens standard 2-column multi-image auction creation modal.
- **2-Card Key Performance Indicators (KPIs) Grid**:
  - **Win Rate Card**: Win percentage + ratio (e.g. `78.4%` / `ชนะ 38 จาก 48 รายการ`) with visual progress bar.
  - **Auctions Posted Card**: Dynamic count of user's created auctions and live active auctions.
  - *(Note: Age card and Auction % card are omitted per user specifications)*.
- **My Posted Auctions Section**:
  - Filter tabs: `ทั้งหมด (All)`, `กำลังเปิดประมูล (Active)`, `จบการประมูลแล้ว (Ended)`, `แบบร่าง (Draft)`.
  - Search input with real-time filtering across titles and categories.
  - Standard auction cards with "ดูรายละเอียด (View Details)" and "จัดการโพสต์ (Manage)".

### B. Other User / Seller Profile Standards (`pages/OtherProfileDetail.html`)
- **Dynamic Routing**: Driven by URL query parameter `?user=<nickname>` or `?id=<userId>` (e.g., `?user=ApexMotors_NY`, `?user=KyotoVault_Cards`, `?user=GenevaVault_CH`), defaulting to `ApexMotors_NY`.
- **Clean Avatar-Only Header**: Avatar with online status, FullName, and `@nickname` pill without banner or verification badges.
- **Quick Switcher Strip (`.seller-switcher-card`)**: Allows 1-click preview switching between different registered sellers.
- **Profile Actions**:
  - `รายงานผู้ใช้ (Report User)`: Opens report modal with 6 categorical violation options (counterfeit/misleading specs, shill bidding, fake profile, escrow violations, harassment, and other) + details textarea, saving reports to `localStorage` (`startass_user_reports`).
  - `แชต P2P กับผู้ขาย`: Checks won auction rights; routes to `chat.html?orderId=...` if won, or triggers informative notice if auction is ongoing.
  - `กลับสู่ตลาดประมูล`: Direct route back to `HomePage.html`.
- **2-Card KPIs Grid**: Win Rate and Posted Auctions count matching the clean 2-column layout.
- **Seller Posted Auctions Section**:
  - Filter tabs: `ทั้งหมด (All)`, `กำลังเปิดประมูลสด (Active Live)`, `ปิดการประมูลแล้ว (Ended / Sold)`.
  - Each item card allows instant bidding (`openBidModal`) or detail inspection (`openDetailModal`).






