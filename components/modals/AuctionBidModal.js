/**
 * ==========================================================================
 * COMPONENT: Auction Bid Modal (คอมโพเนนต์เสนอราคาประมูลสินค้า)
 * File: components/modals/AuctionBidModal.js
 * Description: Reusable, responsive modal component providing item preview,
 *              current highest bid comparison, minimum increment calculations,
 *              2x2 quick-increment tap buttons, and real-time live bid audit history.
 * ==========================================================================
 */

(function (global) {
  'use strict';

  // Standalone HTML template matching Startass luxury dark design system
  const AUCTION_BID_MODAL_HTML = `
  <div class="modal-backdrop" id="bidModal" role="dialog" aria-modal="true" aria-labelledby="bidModalTitle">
    <div class="modal-container modal-bid-container">
      <div class="modal-header">
        <h3 class="modal-title" id="bidModalTitle">
          <i class="fa-solid fa-gavel" style="color: var(--accent-gold);"></i> เสนอราคาประมูลสินค้า
        </h3>
        <button type="button" class="modal-close" onclick="closeBidModal()" aria-label="ปิดหน้าต่าง">&times;</button>
      </div>
      <div class="modal-body">
        <!-- Item Short Preview Header in Modal -->
        <div class="modal-item-preview">
          <img src="" id="modalPreviewImg" class="preview-img" alt="Auction Item Preview">
          <div class="preview-info">
            <span class="preview-badge" id="modalPreviewCategory">หมวดหมู่</span>
            <h4 id="modalPreviewTitle">ชื่อรายการประมูล</h4>
          </div>
        </div>

        <!-- Bidding Controls & Price Matrix -->
        <div class="bidding-box">
          <!-- Optional Bid Lock Notice (e.g., when holding highest bid or auction paused) -->
          <div id="modalBidLockNotice" class="modal-bid-lock-notice" style="display: none;"></div>

          <!-- Current Bid vs Minimum Next Bid Comparison -->
          <div class="bid-status-row">
            <div class="bid-status-col">
              <span>ราคาเสนอสูงสุดปัจจุบัน</span>
              <strong id="modalCurrentBid">฿0</strong>
            </div>
            <div class="bid-status-col" style="text-align: right;">
              <span>ราคาเสนอขั้นต่ำรอบถัดไป</span>
              <strong id="modalMinNextBid" style="color: var(--accent-gold);">฿0</strong>
            </div>
          </div>

          <!-- Bid Amount Input Group -->
          <label class="bid-input-label" for="bidAmountInput">ระบุราคาที่คุณต้องการเสนอ (บาท - THB)</label>
          <div class="bid-input-group">
            <span class="bid-currency">฿</span>
            <input type="number" id="bidAmountInput" class="bid-input" step="5000" placeholder="0">
          </div>

          <!-- 2x2 Quick Increment Buttons for Fast Mobile / Desktop Tapping -->
          <div class="quick-bids">
            <button type="button" class="btn-quick-bid" onclick="setQuickIncrement(5000)">+฿5,000</button>
            <button type="button" class="btn-quick-bid" onclick="setQuickIncrement(10000)">+฿10,000</button>
            <button type="button" class="btn-quick-bid" onclick="setQuickIncrement(50000)">+฿50,000</button>
            <button type="button" class="btn-quick-bid" onclick="setQuickIncrement(100000)">+฿100,000</button>
          </div>

          <!-- Recent Realtime Bids Audit History -->
          <div class="bid-history-title">
            <span><i class="fa-solid fa-clock-rotate-left"></i> ประวัติการเสนอราคาสดล่าสุด</span>
            <span style="font-size: 0.78rem; color: var(--text-muted);">อัปเดตแบบเรียลไทม์</span>
          </div>
          <ul class="bid-history-list" id="modalBidHistory">
            <!-- Populated dynamically via JS -->
          </ul>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-view" onclick="closeBidModal()">ยกเลิก</button>
        <button type="button" class="btn btn-bid" id="modalSubmitBidBtn" onclick="submitBid()">
          <i class="fa-solid fa-check"></i> ยืนยันการเสนอราคาประมูล
        </button>
      </div>
    </div>
  </div>
  `.trim();

  const AuctionBidModal = {
    template: AUCTION_BID_MODAL_HTML,

    /**
     * Mounts the bidding modal component into the DOM.
     * Searches in order:
     * 1. Target element passed as argument
     * 2. #auctionBidModalContainer
     * 3. <auction-bid-modal>
     * 4. Appends new container to document.body
     *
     * @param {HTMLElement|string} [target] - Optional target container or selector
     * @returns {HTMLElement|null} The mounted modal element
     */
    mount: function (target) {
      // If modal already mounted anywhere in DOM, return it
      const existing = document.getElementById('bidModal');
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
        targetEl = document.getElementById('auctionBidModalContainer') ||
                   document.querySelector('auction-bid-modal');
      }

      if (targetEl) {
        targetEl.innerHTML = AUCTION_BID_MODAL_HTML;
      } else if (document.body) {
        const wrapper = document.createElement('div');
        wrapper.id = 'auctionBidModalContainer';
        wrapper.innerHTML = AUCTION_BID_MODAL_HTML;
        document.body.appendChild(wrapper);
      }

      this.initEvents();
      return document.getElementById('bidModal');
    },

    /**
     * Sets up backdrop click & Escape keyboard listeners.
     */
    initEvents: function () {
      const modal = document.getElementById('bidModal');
      if (!modal || modal.dataset.eventsBound === 'true') return;

      // Close on clicking backdrop outside container
      modal.addEventListener('click', function (e) {
        if (e.target === modal) {
          if (typeof global.closeBidModal === 'function') {
            global.closeBidModal();
          } else {
            modal.classList.remove('open');
          }
        }
      });

      // Close on pressing Escape
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modal.classList.contains('open')) {
          if (typeof global.closeBidModal === 'function') {
            global.closeBidModal();
          } else {
            modal.classList.remove('open');
          }
        }
      });

      modal.dataset.eventsBound = 'true';
    },

    /**
     * Opens the bid submission modal for an auction item ID.
     * @param {string} itemId
     */
    open: function (itemId) {
      if (!document.getElementById('bidModal')) {
        this.mount();
      }
      if (typeof global.openBidModal === 'function') {
        global.openBidModal(itemId);
      } else {
        const modal = document.getElementById('bidModal');
        if (modal) modal.classList.add('open');
      }
    },

    /**
     * Closes the bid modal.
     */
    close: function () {
      if (typeof global.closeBidModal === 'function') {
        global.closeBidModal();
      } else {
        const modal = document.getElementById('bidModal');
        if (modal) modal.classList.remove('open');
      }
    },

    /**
     * Adds an increment to the current bid input field.
     * @param {number} increment
     */
    setIncrement: function (increment) {
      if (typeof global.setQuickIncrement === 'function') {
        global.setQuickIncrement(increment);
      }
    },

    /**
     * Submits the bid.
     */
    submit: function () {
      if (typeof global.submitBid === 'function') {
        global.submitBid();
      }
    }
  };

  // Register Web Component <auction-bid-modal> if customElements API is available
  if (typeof customElements !== 'undefined' && !customElements.get('auction-bid-modal')) {
    class AuctionBidModalElement extends HTMLElement {
      connectedCallback() {
        if (!this.querySelector('#bidModal')) {
          AuctionBidModal.mount(this);
        }
      }
    }
    customElements.define('auction-bid-modal', AuctionBidModalElement);
  }

  // Auto mount on document ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      AuctionBidModal.mount();
    });
  } else {
    AuctionBidModal.mount();
  }

  // Export globally
  global.AuctionBidModal = AuctionBidModal;

})(typeof window !== 'undefined' ? window : this);
