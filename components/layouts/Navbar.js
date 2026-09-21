/**
 * ==========================================================================
 * COMPONENT: App Navbar (คอมโพเนนต์แถบเมนูด้านบนของแอปพลิเคชัน)
 * File: components/layouts/Navbar.js
 * Description: Modular, reusable top navigation component providing Startass branding,
 *              interactive search bar with category popup, orders and chat badges,
 *              auction creator CTA button, notification center, and user profile.
 * ==========================================================================
 */

(function (global) {
  'use strict';

  /**
   * Helper to detect current page context and folder location
   */
  function detectPageContext() {
    const path = (typeof window !== 'undefined' && window.location.pathname) ? window.location.pathname : '';
    const isRoot = !path.includes('/pages/') && (path.endsWith('index.html') || path.endsWith('/'));
    const basePath = isRoot ? '' : '../';
    const pagesPrefix = isRoot ? 'pages/' : '';

    let activePage = 'home';
    let showSearch = true;
    let showBackBtn = false;

    if (path.includes('ordersdetail.html')) {
      activePage = 'orders';
      showSearch = false;
      showBackBtn = true;
    } else if (path.includes('orders.html')) {
      activePage = 'orders';
      showSearch = false;
      showBackBtn = true;
    } else if (path.includes('Payment.html')) {
      activePage = 'orders';
      showSearch = false;
      showBackBtn = true;
    } else if (path.includes('chat.html')) {
      activePage = 'chat';
      showSearch = false;
      showBackBtn = false;
    } else if (path.includes('MyProfileDetails.html') || path.includes('OtherProfileDetail.html')) {
      activePage = 'profile';
      showSearch = false;
      showBackBtn = false;
    } else {
      activePage = 'home';
      showSearch = true;
      showBackBtn = false;
    }

    return {
      isRoot,
      basePath,
      pagesPrefix,
      activePage,
      showSearch,
      showBackBtn
    };
  }

  /**
   * Generates Navbar HTML markup tailored to options and page context.
   * @param {Object} [options]
   * @returns {string}
   */
  function generateNavbarHTML(options) {
    const ctx = detectPageContext();
    const opts = Object.assign({}, ctx, options || {});

    const homeHref = `${opts.pagesPrefix}HomePage.html`;
    const ordersHref = `${opts.pagesPrefix}orders.html`;
    const chatHref = `${opts.pagesPrefix}chat.html`;
    const profileHref = `${opts.pagesPrefix}MyProfileDetails.html`;
    const logoSrc = `${opts.basePath}images/logo.png`;

    const ordersActive = opts.activePage === 'orders' ? ' active' : '';
    const chatActive = opts.activePage === 'chat' ? ' active' : '';
    const searchDisplay = opts.showSearch ? 'style="display: block;"' : 'style="display: none;"';
    const backBtnDisplay = opts.showBackBtn ? 'style="display: inline-flex;"' : 'style="display: none;"';

    return `
<nav class="site-navbar" role="navigation" aria-label="แถบนำทางหลัก (Main Navigation)">
  <div class="navbar-container">
    <!-- Brand Logo -->
    <a href="${homeHref}" class="navbar-brand" title="STARTASS หน้าหลักการประมูล">
      <img src="${logoSrc}" alt="STARTASS Logo" class="navbar-logo-img">
      <span class="navbar-brand-name">STAR <span>TASS!</span></span>
    </a>

    <!-- Navbar Search with Interactive Category Dropdown Popover -->
    <div class="navbar-search-wrapper" id="navbarSearchWrapper" ${searchDisplay}>
      <div class="navbar-search-bar" id="navbarSearchBar">
        <i class="fa-solid fa-magnifying-glass search-icon" id="navbarSearchIcon" title="คลิกหรือกด Enter เพื่อค้นหา" style="cursor: pointer;"></i>
        <input type="text" id="itemSearch" placeholder="ค้นหาชื่อสินค้า, หมวดหมู่ หรือคำสำคัญ... (กด Enter เพื่อค้นหา)" autocomplete="off">
        <button type="button" id="clearSearchBtn" class="search-clear-btn" aria-label="ล้างการค้นหา" style="display: none;">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>

      <!-- Interactive Dropdown Popover on Focus/Click -->
      <div class="navbar-search-dropdown" id="navbarSearchDropdown" style="display: none;">
        <div class="search-dropdown-header">
          <span class="search-dropdown-title">
            <i class="fa-solid fa-sliders" style="color: var(--accent-gold);"></i> เลือกหมวดหมู่ที่ต้องการค้นหา:
          </span>
          <span class="search-dropdown-tip">คลิกเพื่อกรองสินค้า</span>
        </div>

        <div class="search-dropdown-categories">
          <button type="button" class="search-cat-chip" data-category="all" onclick="typeof handleNavbarCategorySelect === 'function' ? handleNavbarCategorySelect('all') : null">
            <i class="fa-solid fa-border-all"></i> ทุกหมวดหมู่
            <span class="search-cat-count" id="navCountAll">14</span>
          </button>
          <button type="button" class="search-cat-chip" data-category="cars" onclick="typeof handleNavbarCategorySelect === 'function' ? handleNavbarCategorySelect('cars') : null">
            <i class="fa-solid fa-car-side"></i> รถยนต์ & ซูเปอร์คาร์
            <span class="search-cat-count" id="navCountCars">4</span>
          </button>
          <button type="button" class="search-cat-chip" data-category="cards" onclick="typeof handleNavbarCategorySelect === 'function' ? handleNavbarCategorySelect('cards') : null">
            <i class="fa-solid fa-ticket"></i> การ์ดสะสมหายาก
            <span class="search-cat-count" id="navCountCards">3</span>
          </button>
          <button type="button" class="search-cat-chip" data-category="tech" onclick="typeof handleNavbarCategorySelect === 'function' ? handleNavbarCategorySelect('tech') : null">
            <i class="fa-solid fa-microchip"></i> เทคโนโลยี & คอมพิวเตอร์
            <span class="search-cat-count" id="navCountTech">4</span>
          </button>
          <button type="button" class="search-cat-chip" data-category="trees" onclick="typeof handleNavbarCategorySelect === 'function' ? handleNavbarCategorySelect('trees') : null">
            <i class="fa-solid fa-tree"></i> บอนไซ & ไม้ด่างหายาก
            <span class="search-cat-count" id="navCountTrees">3</span>
          </button>
        </div>

        <div class="search-dropdown-footer">
          <div class="trending-tags-title">
            <i class="fa-solid fa-fire" style="color: #f97316;"></i> แนะนำ:
          </div>
          <div class="trending-tags-list">
            <button type="button" class="trending-tag" onclick="typeof selectQuickSearch === 'function' ? selectQuickSearch('Porsche 911 GT3') : null">Porsche 911</button>
            <button type="button" class="trending-tag" onclick="typeof selectQuickSearch === 'function' ? selectQuickSearch('Pikachu Illustrator') : null">Pikachu</button>
            <button type="button" class="trending-tag" onclick="typeof selectQuickSearch === 'function' ? selectQuickSearch('Quantum Core') : null">Supercomputer</button>
            <button type="button" class="trending-tag" onclick="typeof selectQuickSearch === 'function' ? selectQuickSearch('บอนไซสนดำ') : null">บอนไซสนดำ</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Actions Section -->
    <div class="navbar-actions">
      <!-- Back to Auctions Link -->
      <a href="${homeHref}" class="btn btn-view" id="navBackToAuctionsBtn" title="กลับไปหน้ากระดานประมูลหลัก" ${backBtnDisplay}>
        <i class="fa-solid fa-arrow-left"></i>
        <span>กระดานประมูล</span>
      </a>

      <!-- My Orders Navigation Button -->
      <a href="${ordersHref}" class="btn-orders-nav${ordersActive}" id="navOrdersBtn" title="ดูรายการคำสั่งซื้อ / การประมูลของฉัน">
        <i class="fa-solid fa-receipt"></i>
        <span>คำสั่งซื้อของฉัน</span>
        <span class="orders-nav-badge" id="navOrdersBadge" style="display: none;">0</span>
      </a>

      <!-- Messages Navigation Button -->
      <a href="${chatHref}" class="btn-chat-nav${chatActive}" id="navChatBtn" title="ข้อความและการสนทนา P2P (Messages & P2P Chat)">
        <i class="fa-solid fa-comments"></i>
        <span>ข้อความ</span>
        <span class="chat-nav-badge" id="navChatBadge" style="display: none;">0</span>
      </a>

      <!-- Create Auction Button -->
      <button type="button" class="btn btn-create-auction" id="openCreateModalBtn" onclick="typeof openCreateModal === 'function' ? openCreateModal() : null">
        <i class="fa-solid fa-plus"></i>
        <span>สร้างโพสต์ประมูล</span>
      </button>

      <!-- Notification Bell Dropdown -->
      <div class="notification-dropdown-wrapper" id="notificationDropdownWrapper">
        <button type="button" class="notification-btn" id="notificationBtn" onclick="typeof toggleNotificationDropdown === 'function' ? toggleNotificationDropdown(event) : Navbar.toggleNotifications(event)" aria-expanded="false" aria-haspopup="true" title="การแจ้งเตือน (Notifications & Outbid Alerts)">
          <i class="fa-regular fa-bell"></i>
          <span class="notification-badge" id="notificationBadge" style="display: none;">0</span>
        </button>

        <!-- Notification Dropdown Menu -->
        <div class="notification-dropdown-menu" id="notificationDropdownMenu">
          <div class="notification-dropdown-header">
            <div class="notification-header-title">
              <i class="fa-solid fa-bell" style="color: var(--accent-gold);"></i>
              <span>การแจ้งเตือน</span>
              <span class="notification-count-tag" id="notificationCountTag">0 ข้อความใหม่</span>
            </div>
            <button type="button" class="btn-clear-notifications" onclick="typeof markAllNotificationsRead === 'function' ? markAllNotificationsRead(event) : null" title="ทำเครื่องหมายว่าอ่านแล้วทั้งหมด">
              <i class="fa-solid fa-check-double"></i> อ่านทั้งหมด
            </button>
          </div>

          <!-- Notification Items List -->
          <div class="notification-list" id="notificationList">
            <!-- Populated dynamically via JS -->
          </div>

          <div class="notification-dropdown-footer">
            <button type="button" class="btn-simulate-outbid" onclick="typeof simulateOutbid === 'function' ? simulateOutbid(event) : null" title="จำลองสถานการณ์เมื่อมีคนอื่นมาบิดแซงเรา">
              <i class="fa-solid fa-bolt"></i>
              <span>⚡ จำลองการโดนเสนอราคาแซง (Simulate Outbid)</span>
            </button>
            <button type="button" class="btn-simulate-outbid btn-simulate-won" onclick="typeof simulateAuctionWon === 'function' ? simulateAuctionWon(null, event) : null" title="จำลองสถานการณ์ชนะการประมูลเพื่อปลดล็อกสิทธิ์ P2P Chat กับผู้ขาย">
              <i class="fa-solid fa-trophy"></i>
              <span>⚡ จำลองการชนะประมูล & ปลดล็อกสิทธิ์แชต P2P</span>
            </button>
          </div>
        </div>
      </div>

      <!-- User Profile Dropdown -->
      <div class="profile-dropdown-wrapper" id="profileDropdownWrapper">
        <button type="button" class="profile-btn" id="profileBtn" onclick="typeof toggleProfileDropdown === 'function' ? toggleProfileDropdown(event) : Navbar.toggleProfile(event)" aria-expanded="false" aria-haspopup="true" title="ดูโปรไฟล์">
          <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80" alt="Profile" class="profile-avatar" id="navProfileAvatar">
        </button>

        <!-- Dropdown Menu Content -->
        <div class="profile-dropdown-menu" id="profileDropdownMenu">
          <div class="profile-dropdown-header">
            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80" alt="Avatar" class="dropdown-avatar-lg" id="menuProfileAvatar">
            <div class="profile-dropdown-user-info">
              <span class="profile-full-name-label">ชื่อผู้ใช้งาน</span>
              <span class="profile-full-name" id="userFullName">Alexander Sterling</span>
            </div>
          </div>

          <div class="profile-dropdown-divider"></div>

          <ul class="profile-menu-list">
            <li>
              <a href="${profileHref}" class="profile-menu-item" style="text-decoration: none;">
                <i class="fa-solid fa-user"></i>
                <span>โปรไฟล์ของฉัน (My Profile)</span>
              </a>
            </li>
            <li>
              <a href="${ordersHref}" class="profile-menu-item" style="text-decoration: none;">
                <i class="fa-solid fa-file-invoice-dollar"></i>
                <span>คำสั่งซื้อ & รายการประมูลของฉัน (My Orders)</span>
              </a>
            </li>
            <li>
              <a href="${chatHref}" class="profile-menu-item" style="text-decoration: none;">
                <i class="fa-solid fa-comments"></i>
                <span>กล่องข้อความ & แชต P2P กับผู้ขาย (Messages)</span>
              </a>
            </li>
            <li>
              <button type="button" class="profile-menu-item text-danger" onclick="typeof handleLogout === 'function' ? handleLogout() : null">
                <i class="fa-solid fa-arrow-right-from-bracket"></i>
                <span>ออกจากระบบ (Logout)</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</nav>
    `.trim();
  }

  const Navbar = {
    /**
     * Mounts the navbar component into the DOM.
     * Target search hierarchy:
     * 1. Target passed as argument
     * 2. <app-navbar> Web Component
     * 3. #appNavbarContainer or #navbarContainer
     * 4. Existing <nav class="site-navbar"> (replaces placeholder)
     * 5. Prepends to document.body
     *
     * @param {HTMLElement|string} [target]
     * @param {Object} [options]
     * @returns {HTMLElement|null}
     */
    mount: function (target, options) {
      let container = null;

      if (target) {
        container = typeof target === 'string' ? document.querySelector(target) : target;
      }

      if (!container) {
        container = document.querySelector('app-navbar') ||
                    document.getElementById('appNavbarContainer') ||
                    document.getElementById('navbarContainer');
      }

      const existingNav = document.querySelector('nav.site-navbar');
      // If already rendered inside container or DOM, do not re-render unless forced
      if (container && container.querySelector('nav.site-navbar')) {
        return container.querySelector('nav.site-navbar');
      }

      // If page already has an inline navbar and no dedicated container, leave intact or take over
      if (!container && existingNav && existingNav.innerHTML.trim().length > 50) {
        return existingNav;
      }

      // Read HTML data attributes if available on container
      const mergedOpts = Object.assign({}, options || {});
      if (container) {
        if (container.dataset.active) mergedOpts.activePage = container.dataset.active;
        if (container.dataset.showSearch !== undefined) mergedOpts.showSearch = container.dataset.showSearch === 'true';
        if (container.dataset.showBack !== undefined) mergedOpts.showBackBtn = container.dataset.showBack === 'true';
      }

      const html = generateNavbarHTML(mergedOpts);

      if (container) {
        container.innerHTML = html;
      } else if (existingNav) {
        existingNav.outerHTML = html;
      } else if (document.body) {
        const wrapper = document.createElement('div');
        wrapper.id = 'appNavbarContainer';
        wrapper.innerHTML = html;
        document.body.insertBefore(wrapper, document.body.firstChild);
        container = wrapper;
      }

      const mountedNav = document.querySelector('nav.site-navbar');
      this.bindEvents(mountedNav);
      return mountedNav;
    },

    /**
     * Binds search and dropdown events if not already handled by main.js
     * @param {HTMLElement} navEl
     */
    bindEvents: function (navEl) {
      if (!navEl || navEl.dataset.layoutBound === 'true') return;

      const searchInput = navEl.querySelector('#itemSearch');
      const searchDropdown = navEl.querySelector('#navbarSearchDropdown');
      const clearBtn = navEl.querySelector('#clearSearchBtn');
      const searchIcon = navEl.querySelector('#navbarSearchIcon');

      if (searchInput && searchDropdown) {
        searchInput.addEventListener('focus', function () {
          searchDropdown.style.display = 'block';
        });

        searchInput.addEventListener('input', function () {
          if (clearBtn) {
            clearBtn.style.display = this.value.trim() ? 'flex' : 'none';
          }
        });

        if (clearBtn) {
          clearBtn.addEventListener('click', function () {
            searchInput.value = '';
            clearBtn.style.display = 'none';
            searchInput.focus();
            if (typeof global.resetAllSearchFilters === 'function') {
              global.resetAllSearchFilters();
            }
          });
        }

        if (searchIcon) {
          searchIcon.addEventListener('click', function () {
            if (typeof global.executeNavbarSearch === 'function') {
              global.executeNavbarSearch();
            } else if (searchInput.value.trim()) {
              const term = encodeURIComponent(searchInput.value.trim());
              window.location.href = `HomePage.html?search=${term}`;
            }
          });
        }

        searchInput.addEventListener('keydown', function (e) {
          if (e.key === 'Enter') {
            e.preventDefault();
            if (typeof global.executeNavbarSearch === 'function') {
              global.executeNavbarSearch();
            } else if (this.value.trim()) {
              const term = encodeURIComponent(this.value.trim());
              window.location.href = `HomePage.html?search=${term}`;
            }
          } else if (e.key === 'Escape') {
            searchDropdown.style.display = 'none';
          }
        });

        document.addEventListener('click', function (e) {
          const wrapper = document.getElementById('navbarSearchWrapper');
          if (wrapper && !wrapper.contains(e.target) && searchDropdown) {
            searchDropdown.style.display = 'none';
          }
        });
      }

      navEl.dataset.layoutBound = 'true';
    },

    /**
     * Highlights the active page navigation item.
     * @param {'home'|'orders'|'chat'|'profile'} pageName
     */
    setActive: function (pageName) {
      const ordersBtn = document.getElementById('navOrdersBtn');
      const chatBtn = document.getElementById('navChatBtn');

      if (ordersBtn) ordersBtn.classList.toggle('active', pageName === 'orders');
      if (chatBtn) chatBtn.classList.toggle('active', pageName === 'chat');
    },

    /**
     * Programmatically sets the orders notification badge count.
     * @param {number} count
     */
    setOrdersBadge: function (count) {
      const badge = document.getElementById('navOrdersBadge');
      if (!badge) return;
      if (count > 0) {
        badge.textContent = count > 99 ? '99+' : count;
        badge.style.display = 'inline-flex';
      } else {
        badge.style.display = 'none';
      }
    },

    /**
     * Programmatically sets the chat unread badge count.
     * @param {number} count
     */
    setChatBadge: function (count) {
      const badge = document.getElementById('navChatBadge');
      if (!badge) return;
      if (count > 0) {
        badge.textContent = count > 99 ? '99+' : count;
        badge.style.display = 'inline-flex';
      } else {
        badge.style.display = 'none';
      }
    },

    /**
     * Programmatically sets the bell notification badge count.
     * @param {number} count
     */
    setNotificationBadge: function (count) {
      const badge = document.getElementById('notificationBadge');
      if (!badge) return;
      if (count > 0) {
        badge.textContent = count > 99 ? '99+' : count;
        badge.style.display = 'inline-flex';
      } else {
        badge.style.display = 'none';
      }
    },

    /**
     * Fallback toggle for profile dropdown
     */
    toggleProfile: function (event) {
      if (event) event.stopPropagation();
      const menu = document.getElementById('profileDropdownMenu');
      const btn = document.getElementById('profileBtn');
      if (menu && btn) {
        const isOpen = menu.classList.toggle('open');
        btn.classList.toggle('active', isOpen);
        btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      }
    },

    /**
     * Fallback close for profile dropdown
     */
    closeProfile: function () {
      const menu = document.getElementById('profileDropdownMenu');
      const btn = document.getElementById('profileBtn');
      if (menu) menu.classList.remove('open');
      if (btn) {
        btn.classList.remove('active');
        btn.setAttribute('aria-expanded', 'false');
      }
    },

    /**
     * Fallback toggle for notification dropdown
     */
    toggleNotifications: function (event) {
      if (event) event.stopPropagation();
      const menu = document.getElementById('notificationDropdownMenu');
      const btn = document.getElementById('notificationBtn');
      if (menu && btn) {
        const isOpen = menu.classList.toggle('open');
        btn.classList.toggle('active', isOpen);
        btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      }
    },

    /**
     * Fallback close for notification dropdown
     */
    closeNotifications: function () {
      const menu = document.getElementById('notificationDropdownMenu');
      const btn = document.getElementById('notificationBtn');
      if (menu) menu.classList.remove('open');
      if (btn) {
        btn.classList.remove('active');
        btn.setAttribute('aria-expanded', 'false');
      }
    }
  };

  // Register Web Component <app-navbar> if supported
  if (typeof customElements !== 'undefined' && !customElements.get('app-navbar')) {
    class AppNavbarElement extends HTMLElement {
      connectedCallback() {
        if (!this.querySelector('nav.site-navbar')) {
          Navbar.mount(this);
        }
      }
    }
    customElements.define('app-navbar', AppNavbarElement);
  }

  // Immediate mount if target container already parsed in DOM
  const immediateTarget = document.querySelector('app-navbar') ||
                          document.getElementById('appNavbarContainer') ||
                          document.getElementById('navbarContainer');
  if (immediateTarget && !immediateTarget.querySelector('nav.site-navbar')) {
    Navbar.mount(immediateTarget);
  }

  // Auto mount on document ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      Navbar.mount();
    });
  } else {
    Navbar.mount();
  }

  // Export globally
  global.Navbar = Navbar;
  global.AppNavbar = Navbar;

})(typeof window !== 'undefined' ? window : this);
