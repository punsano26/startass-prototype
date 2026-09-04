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
