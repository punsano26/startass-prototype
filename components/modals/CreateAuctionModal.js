/**
 * ==========================================================================
 * COMPONENT: Create Auction Listing Modal (คอมโพเนนต์สร้างโพสต์ประมูลสินค้า)
 * File: components/modals/CreateAuctionModal.js
 * Description: Reusable modal component for creating new auction listings with
 *              multi-image dropzone, live image preview gallery, date pickers,
 *              reserve pricing, and category selection.
 * ==========================================================================
 */

(function (global) {
  'use strict';

  const CREATE_AUCTION_MODAL_HTML = `
  <div class="modal-backdrop" id="createModal" role="dialog" aria-modal="true" aria-labelledby="createModalTitle">
    <div class="modal-container modal-create-container">
      <div class="modal-header">
        <h3 class="modal-title" id="createModalTitle">
          <i class="fa-solid fa-plus-circle" style="color: var(--accent-gold);"></i> สร้างโพสต์ประมูลสินค้า
        </h3>
        <button type="button" class="modal-close" onclick="closeCreateModal()" aria-label="ปิดหน้าต่าง">&times;</button>
      </div>
      <form id="createAuctionForm" onsubmit="handleCreateAuction(event)">
        <div class="modal-body create-modal-body">
          <div class="create-modal-layout">

            <!-- LEFT SIDE: All Form Input Fields -->
            <div class="create-modal-left">
              <!-- Product Name -->
              <div class="form-group form-col-full">
                <label class="form-label" for="newProductName">
                  <i class="fa-solid fa-tag"></i> ชื่อสินค้า (Product Name)
                </label>
                <input type="text" id="newProductName" class="form-input" placeholder="เช่น 1969 Ford Mustang Boss 429" required maxlength="120">
              </div>

              <!-- Category Enum & Is Active Toggle -->
              <div class="form-grid-2">
                <div class="form-group">
                  <label class="form-label" for="newProductCategory">
                    <i class="fa-solid fa-layer-group"></i> หมวดหมู่สินค้า (Product Category)
                  </label>
                  <select id="newProductCategory" class="form-select" required>
                    <option value="cars">โมเดลรถยนต์ & ซูเปอร์คาร์ (Car Models)</option>
                    <option value="cards">การ์ดสะสมหายาก (Collectible Cards)</option>
                    <option value="tech">เทคโนโลยี & ซูเปอร์คอมพิวเตอร์ (Tech & Computing)</option>
                    <option value="trees">บอนไซ & ไม้ด่างหายาก (Rare Trees & Flora)</option>
                  </select>
                </div>

                <div class="form-group">
                  <label class="form-label">
                    <i class="fa-solid fa-toggle-on"></i> สถานะการเปิดประมูล (Status)
                  </label>
                  <div class="status-toggle-wrapper">
                    <label class="switch">
                      <input type="checkbox" id="newIsActive" checked onchange="toggleStatusLabel(this.checked)">
                      <span class="slider round"></span>
                    </label>
                    <span class="status-label active-status" id="statusToggleLabel">
                      <i class="fa-solid fa-circle-check"></i> เปิดประมูลทันที (Active)
                    </span>
                  </div>
                </div>
              </div>

              <!-- Start Price & Bid Increment -->
              <div class="form-grid-2">
                <div class="form-group">
                  <label class="form-label" for="newStartPrice">
                    <i class="fa-solid fa-tag"></i> ราคาเริ่มต้น (บาท - THB)
                  </label>
                  <div class="input-prefix-wrapper">
                    <span class="input-prefix">฿</span>
                    <input type="number" id="newStartPrice" class="form-input with-prefix" placeholder="1,500,000" min="1000" step="1000" required>
                  </div>
                </div>

                <div class="form-group">
                  <label class="form-label" for="newBidIncrement">
                    <i class="fa-solid fa-arrow-up-right-dots"></i> ก้าวราคาขั้นต่ำ (Bid Increments)
                  </label>
                  <select id="newBidIncrement" class="form-select" required>
                    <option value="500">+฿500 THB</option>
                    <option value="1000">+฿1,000 THB</option>
                    <option value="5000">+฿5,000 THB</option>
                    <option value="10000" selected>+฿10,000 THB (ค่าเริ่มต้นแนะนำ)</option>
                    <option value="50000">+฿50,000 THB</option>
                    <option value="100000">+฿100,000 THB</option>
                  </select>
                </div>
              </div>

              <!-- Start Date & End Date -->
              <div class="form-grid-2">
                <div class="form-group">
                  <label class="form-label" for="newStartDate">
                    <i class="fa-regular fa-calendar-check"></i> วันเวลาเริ่มต้นประมูล
                  </label>
                  <input type="datetime-local" id="newStartDate" class="form-input" required>
                </div>

                <div class="form-group">
                  <label class="form-label" for="newEndDate">
                    <i class="fa-regular fa-calendar-xmark"></i> วันเวลาสิ้นสุดประมูล
                  </label>
                  <input type="datetime-local" id="newEndDate" class="form-input" required>
                </div>
              </div>

              <!-- Product Descriptions -->
              <div class="form-group form-col-full">
                <label class="form-label" for="newProductDesc">
                  <i class="fa-solid fa-align-left"></i> รายละเอียดและคำอธิบายสินค้า
                </label>
                <textarea id="newProductDesc" class="form-textarea" rows="3" placeholder="ระบุรายละเอียด สภาพของสินค้า ประวัติความเป็นมา เอกสารการันตี หรือข้อมูลสำคัญสำหรับการประมูล..." required></textarea>
              </div>
            </div>

            <!-- RIGHT SIDE: Browse Images & Live Preview Display -->
            <div class="create-modal-right">
              <label class="form-label">
                <i class="fa-solid fa-images"></i> รูปภาพสินค้า (เลือกได้มากกว่า 1 รูป)
              </label>

              <!-- Drag & Drop / Click to Browse Box -->
              <div class="image-upload-zone" id="imageDropZone" onclick="document.getElementById('newProductImageFile').click()">
                <input type="file" id="newProductImageFile" accept="image/*" multiple class="file-input-hidden" onchange="handleImageFileSelect(event)">
                <div class="upload-prompt">
                  <i class="fa-solid fa-cloud-arrow-up upload-icon"></i>
                  <span class="upload-title">คลิกเพื่อเลือกไฟล์รูปภาพ หรือลากรูปมาวางที่นี่</span>
                  <span class="upload-hint">รองรับไฟล์ JPG, PNG, WEBP, GIF (เลือกพร้อมกันได้มากกว่า 1 รูป)</span>
                  <button type="button" class="btn-browse-file" onclick="event.stopPropagation(); document.getElementById('newProductImageFile').click();">
                    <i class="fa-solid fa-folder-open"></i> เลือกรูปภาพ (หลายรูป)
                  </button>
                </div>
              </div>

              <!-- Live Image Preview Display & Thumbnails -->
              <div class="create-image-preview-wrapper">
                <div class="create-image-preview" id="createImagePreviewBox">
                  <img id="createPreviewImg" src="" alt="Image Preview" style="display: none;">
                  <div class="image-placeholder" id="createPlaceholder">
                    <i class="fa-regular fa-image"></i>
                    <span>ยังไม่ได้เลือกรูปภาพ (เลือกได้มากกว่า 1 รูป)</span>
                  </div>
                  <div class="image-preview-badge" id="previewBadge" style="display: none;">
                    <i class="fa-solid fa-images"></i>
                    <span id="previewCounter">รูปที่ 1 จาก 1 รูป</span>
                  </div>
                  <button type="button" id="btnRemoveImage" class="btn-remove-preview" style="display: none;" onclick="removeActiveImage(event)" title="ลบรูปนี้">
                    <i class="fa-solid fa-trash-can"></i> ลบรูปนี้
                  </button>
                </div>

                <!-- Gallery Thumbnails Strip -->
                <div class="create-thumbnails-strip" id="createThumbnailsStrip" style="display: none;">
                  <!-- Dynamic thumbnails will appear here -->
                </div>
              </div>
            </div>

          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-view" onclick="closeCreateModal()">ยกเลิก</button>
          <button type="submit" class="btn btn-bid">
            <i class="fa-solid fa-cloud-arrow-up"></i> ยืนยันสร้างโพสต์ประมูล
          </button>
        </div>
      </form>
    </div>
  </div>
  `.trim();

  const CreateAuctionModal = {
    template: CREATE_AUCTION_MODAL_HTML,

    /**
     * Mounts the create auction modal into the DOM.
     * @param {HTMLElement|string} [target] - Optional target element or selector
     * @returns {HTMLElement|null} The mounted modal element
     */
    mount: function (target) {
      if (document.getElementById('createModal')) {
        this.initEvents();
        return document.getElementById('createModal');
      }

      let targetEl = null;
      if (typeof target === 'string') {
        targetEl = document.querySelector(target);
      } else if (target instanceof HTMLElement) {
        targetEl = target;
      }

      if (!targetEl) {
        targetEl = document.getElementById('createAuctionModalContainer') ||
                   document.querySelector('create-auction-modal');
      }

      if (targetEl) {
        targetEl.innerHTML = CREATE_AUCTION_MODAL_HTML;
      } else if (document.body) {
        const wrapper = document.createElement('div');
        wrapper.id = 'createAuctionModalContainer';
        wrapper.innerHTML = CREATE_AUCTION_MODAL_HTML;
        document.body.appendChild(wrapper);
      }

      this.initEvents();
      return document.getElementById('createModal');
    },

    /**
     * Sets up backdrop click & Escape keyboard listeners.
     */
    initEvents: function () {
      const modal = document.getElementById('createModal');
      if (!modal || modal.dataset.eventsBound === 'true') return;

      modal.addEventListener('click', function (e) {
        if (e.target === modal) {
          if (typeof global.closeCreateModal === 'function') {
            global.closeCreateModal();
          } else {
            modal.classList.remove('open');
          }
        }
      });

      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modal.classList.contains('open')) {
          if (typeof global.closeCreateModal === 'function') {
            global.closeCreateModal();
          } else {
            modal.classList.remove('open');
          }
        }
      });

      modal.dataset.eventsBound = 'true';
    },

    /**
     * Opens the create auction modal.
     */
    open: function () {
      if (!document.getElementById('createModal')) {
        this.mount();
      }
      if (typeof global.openCreateModal === 'function') {
        global.openCreateModal();
      } else {
        const modal = document.getElementById('createModal');
        if (modal) modal.classList.add('open');
      }
    },

    /**
     * Closes the create auction modal.
     */
    close: function () {
      if (typeof global.closeCreateModal === 'function') {
        global.closeCreateModal();
      } else {
        const modal = document.getElementById('createModal');
        if (modal) modal.classList.remove('open');
      }
    }
  };

  // Custom Web Component registration
  if (typeof customElements !== 'undefined' && !customElements.get('create-auction-modal')) {
    customElements.define('create-auction-modal', class extends HTMLElement {
      connectedCallback() {
        if (!this.innerHTML.trim()) {
          this.innerHTML = CREATE_AUCTION_MODAL_HTML;
          CreateAuctionModal.initEvents();
        }
      }
    });
  }

  // Auto-mount when DOM is ready
  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function () {
        CreateAuctionModal.mount();
      });
    } else {
      CreateAuctionModal.mount();
    }
  }

  global.CreateAuctionModal = CreateAuctionModal;

})(typeof window !== 'undefined' ? window : this);
