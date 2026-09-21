/**
 * ==========================================================================
 * COMPONENT: Marketplace Filter Sidebar (คอมโพเนนต์แถบตัวกรองสินค้าด้านข้าง)
 * File: components/layouts/Sidebar.js
 * Description: Modular, responsive sidebar component providing Advice IT style
 *              faceted filtering for categories, auction status, price ranges,
 *              mobile drawer sliding behavior, and filter state resetters.
 * ==========================================================================
 */

(function (global) {
  'use strict';

  const SIDEBAR_HTML = `
<aside class="advice-filter-sidebar" id="adviceFilterSidebar" style="display: none;" aria-label="แถบตัวกรองการค้นหา">
  <!-- Mobile Drawer Backdrop -->
  <div class="advice-drawer-backdrop" onclick="typeof closeMobileSearchFilter === 'function' ? closeMobileSearchFilter() : Sidebar.closeMobile()"></div>

  <div class="advice-sidebar-scroll-pane">
    <!-- Mobile Drawer Header -->
    <div class="advice-drawer-header">
      <div class="advice-drawer-title">
        <i class="fa-solid fa-sliders" style="color: var(--accent-gold);"></i>
        <span>ตัวกรองการค้นหา (Filters)</span>
      </div>
      <button type="button" class="btn-close-drawer" onclick="typeof closeMobileSearchFilter === 'function' ? closeMobileSearchFilter() : Sidebar.closeMobile()" aria-label="ปิดตัวกรอง">
        <i class="fa-solid fa-xmark"></i>
      </button>
    </div>

    <!-- CARD 1: หมวดหมู่สินค้าที่ตรงกัน (Matched Categories) with Checkboxes -->
    <div class="advice-filter-card card-cat-filter">
      <div class="advice-card-header">
        <span class="advice-card-title">
          <i class="fa-solid fa-layer-group"></i> หมวดหมู่สินค้าที่ตรงกัน
        </span>
        <button type="button" class="btn-card-reset" onclick="typeof resetCategoryFilter === 'function' ? resetCategoryFilter() : Sidebar.resetCategory()" title="ล้างตัวกรองหมวดหมู่">
          <i class="fa-solid fa-arrow-rotate-right"></i> ล้างทั้งหมด
        </button>
      </div>
      <hr class="advice-card-line">
      <div class="advice-card-body">
        <div class="advice-subsearch-box">
          <input type="text" id="catSearchInput" placeholder="ค้นหาชื่อหมวดสินค้า..." oninput="typeof filterCategoryOptions === 'function' ? filterCategoryOptions(this.value) : null" autocomplete="off">
          <i class="fa-solid fa-magnifying-glass subsearch-icon"></i>
        </div>
        <div class="advice-checkbox-list" id="categoryCheckboxList">
          <!-- Dynamically injected with checkboxes and counts -->
        </div>
      </div>
    </div>

    <!-- CARD 2: ประเภทและสถานะการประมูล (Auction Status) -->
    <div class="advice-filter-card card-status-filter">
      <div class="advice-card-header">
        <span class="advice-card-title">
          <i class="fa-solid fa-bolt"></i> สถานะการประมูล
        </span>
        <button type="button" class="btn-card-reset" onclick="typeof resetStatusFilter === 'function' ? resetStatusFilter() : Sidebar.resetStatus()" title="ล้างตัวกรองสถานะ">
          <i class="fa-solid fa-arrow-rotate-right"></i> ล้างทั้งหมด
        </button>
      </div>
      <hr class="advice-card-line">
      <div class="advice-card-body">
        <div class="advice-checkbox-list" id="statusCheckboxList">
          <!-- Status checkboxes injected dynamically -->
        </div>
      </div>
    </div>

    <!-- CARD 3: ช่วงราคา (Price Range) -->
    <div class="advice-filter-card card-price-filter">
      <div class="advice-card-header">
        <span class="advice-card-title">
          <i class="fa-solid fa-tags"></i> ช่วงราคา (บาท)
        </span>
        <button type="button" class="btn-card-reset" onclick="typeof resetPriceFilter === 'function' ? resetPriceFilter() : Sidebar.resetPrice()" title="ล้างตัวกรองช่วงราคา">
          <i class="fa-solid fa-arrow-rotate-right"></i> ล้างทั้งหมด
        </button>
      </div>
      <hr class="advice-card-line">
      <div class="advice-card-body">
        <div class="advice-price-presets" id="pricePresetsList">
          <!-- Price range presets injected dynamically -->
        </div>
        <div class="advice-custom-price-group">
          <div class="custom-price-inputs">
            <input type="number" id="customPriceMin" placeholder="ต่ำสุด (฿)" class="price-field" min="0" step="100000">
            <span class="price-dash">-</span>
            <input type="number" id="customPriceMax" placeholder="สูงสุด (฿)" class="price-field" min="0" step="100000">
          </div>
          <button type="button" class="btn-apply-custom-price" onclick="typeof applyCustomPriceRange === 'function' ? applyCustomPriceRange() : null">
            <i class="fa-solid fa-check"></i> ตกลง
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Drawer Footer Actions -->
    <div class="advice-drawer-footer">
      <button type="button" class="btn-drawer-reset" onclick="typeof resetAllSearchFilters === 'function' ? resetAllSearchFilters() : Sidebar.resetAll()">
        <i class="fa-solid fa-rotate-left"></i> ล้างทั้งหมด
      </button>
      <button type="button" class="btn-drawer-apply" onclick="typeof closeMobileSearchFilter === 'function' ? closeMobileSearchFilter() : Sidebar.closeMobile()">
        ดูผลลัพธ์ (<span id="mobileApplyCount">0</span>)
      </button>
    </div>
  </div>
</aside>
  `.trim();

  const Sidebar = {
    template: SIDEBAR_HTML,

    /**
     * Mounts the sidebar component into the DOM.
     * Target search hierarchy:
     * 1. Target passed as argument
     * 2. <app-sidebar> Web Component
     * 3. #appSidebarContainer or #sidebarContainer
     * 4. Inside #marketplaceLayout (prepends before grid)
     * 5. Existing #adviceFilterSidebar (if placeholder)
     *
     * @param {HTMLElement|string} [target]
     * @returns {HTMLElement|null}
     */
    mount: function (target) {
      let container = null;

      if (target) {
        container = typeof target === 'string' ? document.querySelector(target) : target;
      }

      if (!container) {
        container = document.querySelector('app-sidebar') ||
                    document.getElementById('appSidebarContainer') ||
                    document.getElementById('sidebarContainer');
      }

      // If sidebar already exists and populated, return it
      const existingSidebar = document.getElementById('adviceFilterSidebar');
      if (container && container.querySelector('#adviceFilterSidebar')) {
        return container.querySelector('#adviceFilterSidebar');
      }

      if (!container && existingSidebar && existingSidebar.children.length > 0) {
        return existingSidebar;
      }

      if (container) {
        container.innerHTML = SIDEBAR_HTML;
      } else {
        const marketplaceLayout = document.getElementById('marketplaceLayout');
        if (marketplaceLayout) {
          const wrapper = document.createElement('div');
          wrapper.id = 'appSidebarContainer';
          wrapper.innerHTML = SIDEBAR_HTML;
          marketplaceLayout.insertBefore(wrapper, marketplaceLayout.firstChild);
          container = wrapper;
        } else if (existingSidebar) {
          existingSidebar.outerHTML = SIDEBAR_HTML;
        }
      }

      const mountedEl = document.getElementById('adviceFilterSidebar');
      return mountedEl;
    },

    /**
     * Opens the mobile filter drawer.
     */
    openMobile: function () {
      const sidebar = document.getElementById('adviceFilterSidebar');
      if (sidebar) {
        sidebar.classList.add('is-mobile-open');
        document.body.style.overflow = 'hidden';
      }
    },

    /**
     * Closes the mobile filter drawer.
     */
    closeMobile: function () {
      const sidebar = document.getElementById('adviceFilterSidebar');
      if (sidebar) {
        sidebar.classList.remove('is-mobile-open');
        document.body.style.overflow = '';
      }
    },

    /**
     * Shows the sidebar (in search/filter mode)
     */
    show: function () {
      const sidebar = document.getElementById('adviceFilterSidebar');
      if (sidebar) sidebar.style.display = 'block';
    },

    /**
     * Hides the sidebar (in normal top 10 mode)
     */
    hide: function () {
      const sidebar = document.getElementById('adviceFilterSidebar');
      if (sidebar) sidebar.style.display = 'none';
    },

    /**
     * Resets category filters
     */
    resetCategory: function () {
      if (typeof global.resetCategoryFilter === 'function') {
        global.resetCategoryFilter();
      }
    },

    /**
     * Resets status filters
     */
    resetStatus: function () {
      if (typeof global.resetStatusFilter === 'function') {
        global.resetStatusFilter();
      }
    },

    /**
     * Resets price filters
     */
    resetPrice: function () {
      if (typeof global.resetPriceFilter === 'function') {
        global.resetPriceFilter();
      }
    },

    /**
     * Resets all search and filter settings
     */
    resetAll: function () {
      if (typeof global.resetAllSearchFilters === 'function') {
        global.resetAllSearchFilters();
      }
    }
  };

  // Register Web Component <app-sidebar> if supported
  if (typeof customElements !== 'undefined' && !customElements.get('app-sidebar')) {
    class AppSidebarElement extends HTMLElement {
      connectedCallback() {
        if (!this.querySelector('#adviceFilterSidebar')) {
          Sidebar.mount(this);
        }
      }
    }
    customElements.define('app-sidebar', AppSidebarElement);
  }

  // Immediate mount if target container already parsed in DOM
  const immediateTarget = document.querySelector('app-sidebar') ||
                          document.getElementById('appSidebarContainer') ||
                          document.getElementById('sidebarContainer');
  if (immediateTarget && !immediateTarget.querySelector('#adviceFilterSidebar')) {
    Sidebar.mount(immediateTarget);
  }

  // Auto mount on document ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      Sidebar.mount();
    });
  } else {
    Sidebar.mount();
  }

  // Export globally
  global.Sidebar = Sidebar;
  global.AppSidebar = Sidebar;

})(typeof window !== 'undefined' ? window : this);
