/**
 * ==========================================================================
 * COMPONENT: Auction Item Detail Modal (คอมโพเนนต์รายละเอียดรายการประมูล)
 * File: components/modals/AuctionDetailModal.js
 * Description: Reusable, responsive modal component providing full product media
 *              inspection, multi-image gallery thumbnail switching, verified
 *              seller provenance, detailed specifications checklist, auction
 *              lifecycle dates, and dynamic bidding CTA guards.
 * ==========================================================================
 */

(function (global) {
  'use strict';

  // Standalone HTML template matching Startass luxury design system
  const AUCTION_DETAIL_MODAL_HTML = `
  <div class="modal-backdrop" id="detailModal" role="dialog" aria-modal="true" aria-labelledby="detailTitle">
    <div class="modal-container modal-detail-container">
      <div class="modal-header">
        <h3 class="modal-title" id="detailHeaderTitle">
          <i class="fa-solid fa-circle-info"></i> รายละเอียดรายการประมูล
        </h3>
        <button type="button" class="modal-close" onclick="closeDetailModal()" aria-label="ปิดหน้าต่าง">&times;</button>
      </div>
      <div class="modal-body">
        <!-- Media Preview & Zoom Display -->
        <div class="detail-modal-media">
          <img id="detailImg" src="" alt="Product Full View" class="detail-modal-img">
        </div>

        <!-- Multi-image Thumbnail Strip (Rendered dynamically if item has multiple images) -->
        <div class="detail-thumbnails-strip" id="detailThumbnailsStrip" style="display: none;"></div>

        <!-- Header Information: Category Tag, Title & Current Bid -->
        <div class="detail-header-flex">
          <div class="detail-title-col">
            <span id="detailCategory" class="category-tag">หมวดหมู่</span>
            <h2 id="detailTitle" class="detail-title-text">ชื่อรายการประมูล</h2>
          </div>
          <div class="detail-bid-col">
            <div class="detail-bid-label">ราคาเสนอสูงสุดปัจจุบัน</div>
            <div id="detailCurrentBid" class="detail-bid-value">฿0</div>
          </div>
        </div>

        <!-- Seller Profile & Provenance Verification Box -->
        <div class="detail-seller-box" id="detailSellerBox">
          <div class="detail-seller-left">
            <img id="detailSellerAvatar" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80" class="detail-seller-avatar" alt="Seller Avatar">
            <div class="detail-seller-info">
              <div class="detail-seller-name-row">
                <span id="detailSellerName" class="detail-seller-name">ผู้ขาย</span>
              </div>
              <div class="detail-seller-meta-row">
                <span id="detailSellerNick" class="detail-seller-nick">@nickname</span>
                <span class="detail-seller-dot">•</span>
                <span id="detailSellerRating" class="detail-seller-rating"><i class="fa-solid fa-star"></i> 5.0 ★</span>
              </div>
            </div>
          </div>
          <a id="detailSellerProfileLink" href="#" class="btn-detail-seller-profile" target="_blank" title="ดูข้อมูลและรายการประมูลของผู้ขาย">
            <i class="fa-solid fa-arrow-up-right-from-square"></i> ดูโปรไฟล์ผู้ขาย
          </a>
        </div>

        <!-- Detailed Product Description -->
        <p id="detailDesc" class="detail-description">
          คำอธิบายสินค้า
        </p>


        <!-- Timeline & Pricing Summary Box (Horizontal 3-Column Layout) -->
        <div class="detail-dates-box">
          <div class="date-row">
            <span class="label"><i class="fa-regular fa-calendar-check" style="color: #38bdf8;"></i> เริ่มเปิดการประมูล</span>
            <span class="value" id="detailStartDate">-</span>
          </div>
          <div class="date-row date-row-highlight">
            <span class="label"><i class="fa-solid fa-flag" style="color: var(--accent-gold);"></i> ราคาเริ่มต้นขั้นต่ำ</span>
            <span class="value" id="detailStartPrice">-</span>
          </div>
          <div class="date-row">
            <span class="label"><i class="fa-regular fa-calendar-xmark" style="color: #f43f5e;"></i> สิ้นสุดการประมูลวันที่</span>
            <span class="value" id="detailEndDate">-</span>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-view" onclick="closeDetailModal()">ปิดหน้าต่าง</button>
        <button type="button" class="btn btn-bid" id="detailModalBidBtn" onclick="switchFromDetailToBid()">
          <i class="fa-solid fa-gavel"></i> เข้าร่วมเสนอราคาประมูล
        </button>
      </div>
    </div>
  </div>
  `.trim();

  const AuctionDetailModal = {
    template: AUCTION_DETAIL_MODAL_HTML,

    /**
     * Mounts the modal into the DOM.
     * Searches in order:
     * 1. Target element passed as argument
     * 2. #auctionDetailModalContainer
     * 3. <auction-detail-modal>
     * 4. Appends new container to document.body
     *
     * @param {HTMLElement|string} [target] - Optional target container or selector
     * @returns {HTMLElement|null} The mounted modal element
     */
    mount: function (target) {
      // If modal already mounted anywhere in DOM, return it
      const existing = document.getElementById('detailModal');
      if (existing) {
        this.initEvents();
        return existing;
      }

      let targetEl = null;
      if (typeof target === 'string') {
        targetEl = document.querySelector(target);
      } else if (target instanceof HTMLElement) {
        targetEl = target;
      }

      if (!targetEl) {
        targetEl = document.getElementById('auctionDetailModalContainer') ||
                   document.querySelector('auction-detail-modal');
      }

      if (targetEl) {
        targetEl.innerHTML = AUCTION_DETAIL_MODAL_HTML;
      } else if (document.body) {
        const wrapper = document.createElement('div');
        wrapper.id = 'auctionDetailModalContainer';
        wrapper.innerHTML = AUCTION_DETAIL_MODAL_HTML;
        document.body.appendChild(wrapper);
      }

      this.initEvents();
      return document.getElementById('detailModal');
    },

    /**
     * Sets up backdrop click & Escape keyboard listeners.
     */
    initEvents: function () {
      const modal = document.getElementById('detailModal');
      if (!modal || modal.dataset.eventsBound === 'true') return;

      // Close on clicking backdrop outside container
      modal.addEventListener('click', function (e) {
        if (e.target === modal) {
          if (typeof global.closeDetailModal === 'function') {
            global.closeDetailModal();
          } else {
            modal.classList.remove('open');
          }
        }
      });

      // Close on pressing Escape
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modal.classList.contains('open')) {
          if (typeof global.closeDetailModal === 'function') {
            global.closeDetailModal();
          } else {
            modal.classList.remove('open');
          }
        }
      });

      modal.dataset.eventsBound = 'true';
    },

    /**
     * Opens the detail modal for an auction item ID.
     * @param {string} itemId
     */
    open: function (itemId) {
      if (!document.getElementById('detailModal')) {
        this.mount();
      }
      if (typeof global.openDetailModal === 'function') {
        global.openDetailModal(itemId);
      } else {
        const modal = document.getElementById('detailModal');
        if (modal) modal.classList.add('open');
      }
    },

    /**
     * Closes the detail modal.
     */
    close: function () {
      if (typeof global.closeDetailModal === 'function') {
        global.closeDetailModal();
      } else {
        const modal = document.getElementById('detailModal');
        if (modal) modal.classList.remove('open');
      }
    }
  };

  // Register Web Component <auction-detail-modal> if customElements API is available
  if (typeof customElements !== 'undefined' && !customElements.get('auction-detail-modal')) {
    class AuctionDetailModalElement extends HTMLElement {
      connectedCallback() {
        if (!this.querySelector('#detailModal')) {
          AuctionDetailModal.mount(this);
        }
      }
    }
    customElements.define('auction-detail-modal', AuctionDetailModalElement);
  }

  // Auto mount on document ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      AuctionDetailModal.mount();
    });
  } else {
    AuctionDetailModal.mount();
  }

  // Export globally
  global.AuctionDetailModal = AuctionDetailModal;

})(typeof window !== 'undefined' ? window : this);
