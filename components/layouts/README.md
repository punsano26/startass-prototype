# STARTASS Layout Components (`components/layouts/`)

This directory contains standardized, reusable, decoupled layout components for the STARTASS Auction platform prototype. Every layout component is architected with a standalone HTML markup template (`.html`) and an accompanying JavaScript controller (`.js`) supporting automatic mounting, Web Component tags, and standard programmatic APIs.

---

## Catalog of Layout Components

| # | Layout Component | Container ID / Tag | Primary Files | Description |
|---|------------------|--------------------|---------------|-------------|
| 1 | **Navbar** | `#appNavbarContainer` / `<app-navbar>` | `Navbar.html`, `Navbar.js` | Top navigation bar with branding, interactive category search dropdown, order/chat badges, auction creator CTA, notification center, and user profile dropdown. |
| 2 | **Sidebar** | `#appSidebarContainer` / `<app-sidebar>` | `Sidebar.html`, `Sidebar.js` | Faceted marketplace filter sidebar (Advice IT style) with category search, status checkboxes, price presets, and responsive mobile sliding drawer. |

---

## 1. `Navbar` (แถบเมนูด้านบนของระบบ)

Reusable top navigation bar providing Startass branding, live search bar with category popup, orders and chat badges, auction creator button, notification center, and user profile management.

### Files
- **`Navbar.html`**: Clean, standalone semantic HTML markup template (`.site-navbar`).
- **`Navbar.js`**: JavaScript component controller providing automatic mounting, Web Component `<app-navbar>` support, active page highlighting, badge controllers, and dropdown fallbacks.

### How to Use

#### Option A: HTML Container + Script
```html
<!-- COMPONENT: Top Navbar Layout -->
<div id="appNavbarContainer"></div>

<!-- Layout Components -->
<script src="../components/layouts/Navbar.js"></script>
```

#### Option B: Web Component Tag
```html
<!-- Custom Web Component -->
<app-navbar active="orders" data-show-search="false" data-show-back="true"></app-navbar>

<script src="../components/layouts/Navbar.js"></script>
```

### JavaScript API
```javascript
// Mount into custom container
Navbar.mount('#customNavbar', { activePage: 'orders', showSearch: false, showBackBtn: true });

// Programmatically set active navigation tab
Navbar.setActive('chat'); // 'home' | 'orders' | 'chat' | 'profile'

// Update badge numbers
Navbar.setOrdersBadge(3);
Navbar.setChatBadge(1);
Navbar.setNotificationBadge(5);

// Dropdown controls
Navbar.toggleProfile();
Navbar.closeProfile();
Navbar.toggleNotifications();
Navbar.closeNotifications();
```

---

## 2. `Sidebar` (แถบตัวกรองการค้นหาด้านข้าง)

Reusable marketplace filter sidebar (Advice IT style) supporting category search with checklist, auction status checkboxes, price range preset pills with custom min/max inputs, and mobile drawer mode.

### Files
- **`Sidebar.html`**: Clean, standalone HTML markup template (`#adviceFilterSidebar`).
- **`Sidebar.js`**: JavaScript component controller providing automatic mounting, Web Component `<app-sidebar>` support, mobile drawer toggle actions, and filter resetters.

### How to Use

#### Option A: HTML Container + Script
```html
<!-- Marketplace Layout -->
<div class="marketplace-layout" id="marketplaceLayout">
  <!-- COMPONENT: Filter Sidebar Layout -->
  <div id="appSidebarContainer"></div>

  <!-- Marketplace Products Column -->
  <div class="marketplace-main-col">
    <main class="auction-grid" id="auctionGrid"></main>
  </div>
</div>

<!-- Layout Components -->
<script src="../components/layouts/Sidebar.js"></script>
```

#### Option B: Web Component Tag
```html
<app-sidebar></app-sidebar>
<script src="../components/layouts/Sidebar.js"></script>
```

### JavaScript API
```javascript
// Mount manually into target
Sidebar.mount('#customSidebar');

// Open / Close mobile sliding drawer
Sidebar.openMobile();
Sidebar.closeMobile();

// Toggle visibility
Sidebar.show();
Sidebar.hide();

// Reset filter state
Sidebar.resetCategory();
Sidebar.resetStatus();
Sidebar.resetPrice();
Sidebar.resetAll();
```
