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
   - Top overlay: `.rank-badge` (`#1 Highest Bid`, etc.) and `.category-tag`.
   - Bottom overlay: `.countdown-badge` displaying real-time remaining time (`02d 14h 22m 10s left`).
2. **Body Content**:
   - Title: 2-line clamp with hover highlight.
   - Description: 2-to-3-line clamp with muted secondary color.
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
   - Current highest bid vs minimum next bid (+ $1,000 or custom step).
   - 2x2 quick increment buttons for fast mobile tapping.
   - Verified bidder activity log (recent bids timeline).
   - Instant validation and real-time leaderboard re-sort on successful submission.
2. **Detail Modal**:
   - Full product media preview.
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

### A. Auction Won Rights Enforcement
- **Exclusive Access**: Direct peer-to-peer (P2P) communication with the seller `[ @SellerNickname ]` is an exclusive right reserved strictly for winning bidders (`order.status === 'WON'`).
- **Active / Outbid Locked State**: If the auction is still ongoing (`WINNING`, `OUTBID`), P2P chat remains locked:
  - Tab 3 displays `<span class="order-tab-badge badge-p2p-locked"><i class="fa-solid fa-lock"></i> Locked</span>`.
  - The chat pane renders `.p2p-locked-card` explaining that P2P direct chat unlocks once the auction is won under Escrow protection, providing a `⚡ Simulate Auction Won` trigger.
  - The Seller Card displays `.btn-p2p-locked` which triggers `showP2PLockNotice()`.
- **Won State Unlocked**: Once won:
  - Tab 3 displays `<span class="order-tab-badge badge-p2p-unlocked"><i class="fa-solid fa-lock-open"></i> P2P Active</span>`.
  - Seller card displays `.btn-p2p-direct` (`💬 Direct P2P Chat with [ @SellerNickname ]`).
  - Right column displays `.order-won-banner` and primary CTA `Open P2P Chat with Seller`.

### B. Part Conversations ("Conversations List")
- Located in `.p2p-conversations-sidebar`:
  - **Header**: Displays total count of won deals with conversation rights (`.p2p-won-badge`).
  - **Search Bar (`#p2pSearchInput`)**: Real-time filtering across seller nicknames and auction titles.
  - **Item Row (`.p2p-conv-item`)**:
    - Seller avatar with green online presence indicator (`.p2p-online-badge`).
    - Seller nickname formatted in brackets: `[ @SellerNickname ]`.
    - Won item title and last message snippet with relative timestamp.
    - Unread message badge (`.p2p-conv-unread-pill`).
    - Active selection highlight with gold accent border.

### C. Selected Chat / Current Chat Window
- Located in `.p2p-current-chat-window`:
  - **Header**: Seller avatar, verified checkmark, company name, and STARTASS Escrow Protection guarantee badge.
  - **Won Product Strip (`.p2p-deal-product-strip`)**: Sticky summary with item photo, won tag, winning bid price, and order ID.
  - **Message Timeline (`.p2p-messages-history`)**:
    - System Escrow guarantee notices.
    - Seller messages (`.msg-seller`) with seller avatar and dark-slate speech bubbles.
    - Buyer messages (`.msg-user`) with emerald speech bubbles and read checkmarks.
  - **Quick Action Prompt Chips (`.p2p-quick-prompts-bar`)**:
    - Fast one-tap chips: `📍 Confirm Address`, `📜 Request Certificate`, `🛡️ Escrow Verified`, `🚚 Delivery Schedule`.
  - **Message Composer (`.p2p-chat-input-bar`)**:
    - Attachment button with toast feedback.
    - Dynamic text input (`#p2pMessageInput`).
    - Send button with paper-plane icon.
    - Automated realistic seller replies simulated after 1.5 seconds to provide engaging paired interaction.

### D. Cross-Page Navigation & Simulation Triggers
- **Homepage Card**: For won auctions, primary button becomes `.btn-bid-active.btn-won` (`Won: $XX,XXX (P2P Chat)`), linking directly to `ordersdetail.html?id=<itemId>&tab=chat`.
- **Detail Modal**: For won items, CTA changes to `.btn-won-cta` (`Open P2P Chat with Seller`).
- **Navbar Bell Dropdown**: Footer contains `⚡ Simulate Won Auction` alongside `⚡ Simulate Outbid Alert` for instant testing from any page.

---

## 10. Standalone P2P Chat & Messages Architecture (`pages/chat.html`)

### A. Core Architecture & Route
- **Dedicated Standalone Page**: `pages/chat.html` provides a persistent, full-screen direct messaging center for managing all peer-to-peer dialogues across won deals and active negotiations.
- **Global Navbar Integration**:
  - All views (`HomePage.html`, `ordersdetail.html`, `chat.html`) feature `.btn-chat-nav` (`#navChatBtn`) displaying real-time unread message counts in an animated emerald pill badge (`#navChatBadge`).
  - User profile dropdown menu includes a direct link: `Messages / P2P Chat`.

### B. Part 1: Conversation History (Left Sidebar)
- **Container (`.standalone-chat-sidebar`)**:
  - **Header (`.chat-sidebar-header`)**: Title with active conversation count pill badge (`#chatConvCountBadge`).
  - **Filter Chips Strip (`.chat-filter-chips-strip`)**: 1-click filter switches for `All`, `Unread` (with green status dot), and `Won Deals` (with gold trophy icon).
  - **Search Bar (`.chat-search-box`)**: Real-time filtering across seller nicknames, order numbers, and item titles with instant tap-to-clear button (`#chatSearchClearBtn`).
  - **Conversation Item (`.chat-conv-item`)**:
    - **Image Profile**: Partner/seller avatar with active online presence indicator (`.conv-online-dot`).
    - **User Name**: Prominently rendered in brackets: `[ @SellerNickname ]` in high-contrast gold.
    - **Item Tag**: Order reference and item title `#ORD-AUC-XX • Title`.
    - **Latest Message Snippet**: Truncated preview of the most recent exchange.
    - **Time & Date**: Clear timestamp format: `Sep 8, 2026 • 02:20 PM`.
    - **Is Read or Not Read Indicator**:
      - Unread: `<span class="badge-read-status unread"><span class="unread-pulse-dot"></span> Unread</span>` + unread counter pill (`.conv-unread-number-badge`).
      - Read: `<span class="badge-read-status read"><i class="fa-solid fa-check-double"></i> Read (อ่านแล้ว)</span>`.

### C. Part 2: Current Chat Window (Right Main Panel)
- **Container (`.standalone-chat-main`)**:
  - **Header (`.chat-main-header`)**:
    - Partner Profile Avatar + User Name: `[ @SellerNickname ]`.
    - Verification and trust badges: `Verified Seller`, `Escrow Protected Deal`, online status (`Active now`).
    - Direct CTA link to full auction order: `Order #ORD-AUC-XX`.
  - **Sticky Live Deal Strip (`.chat-live-deal-strip`)**:
    - High-res product thumbnail + category badge.
    - Product title and Order ID.
    - **Price Bids Latest**: Prominent display of `Price Bids Latest: $XXX,XXX` (`Winning Final Bid` or `Highest Placed Bid`).
  - **All Messages Timeline (`.chat-messages-timeline`)**:
    - System escrow audit notices.
    - Buyer messages (`.msg-row-user`) right-aligned in emerald gradient bubbles.
    - Owner/Seller messages (`.msg-row-owner`) left-aligned in dark slate bubbles.
    - **Full Time & Date on Every Message**: `Sep 8, 2026, 02:20 PM`.
    - **Is Read or Not Read Status on Every Message**:
      - `Read (อ่านแล้ว)` with double checkmarks `✓✓`.
      - `Sent (ส่งแล้ว)` with single checkmark `✓`.
  - **Owner Messages Special Card ("If Part Owner Messages Show Product and Price Bids Latest")**:
    - Whenever a message is sent by the listing owner/seller, an embedded `.owner-product-bids-card` is rendered directly within the message bubble block displaying:
      - `Owner Auction Listing` badge + `Order #ORD-AUC-XX`.
      - Product thumbnail photo.
      - Category badge and full product title.
      - High-contrast gold/emerald `Price Bids Latest: $XXX,XXX (Winning Bid)`.
  - **Quick Action Prompts (`.chat-quick-actions-bar`)**:
    - Fast one-tap prompt chips: `📍 Confirm Address`, `📜 Request Certificate`, `🛡️ Escrow Verified`, `🚚 Delivery Schedule`.
  - **Composer Bar (`.chat-composer-bar`)**:
    - Attachment button with Escrow COA proof toast.
    - Text input (`#standaloneMessageInput`) and Send button.
    - Simulated read receipt transitions (1.2s) and realistic owner replies (2.0s) with owner product deal cards.

### D. Responsive Mobile Standard
- **Desktop (`> 768px`)**: Side-by-side 2-column layout (360px sidebar + 1fr chat window).
- **Mobile (`<= 768px`)**:
  - Automatically switches between conversation list and active chat view using `.mobile-chat-active` state.
  - Back button (`.btn-chat-mobile-back`) appears in chat header to return to conversation list.
  - Input composer and deal strip scale for compact screens without horizontal overflow.






