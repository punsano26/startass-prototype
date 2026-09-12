/**
 * ==========================================================================
 * COMPONENT: Manage Bank Account Modal (คอมโพเนนต์จัดการบัญชีธนาคาร)
 * File: components/modals/ManageBankModal.js
 * Description: Reusable modal component for managing user/seller payout bank accounts
 *              with interactive luxury virtual card preview, bank selector,
 *              account number auto-formatting, and account holder validation.
 * ==========================================================================
 */

(function (global) {
  'use strict';

  const MANAGE_BANK_MODAL_HTML = `
  <div class="modal-backdrop" id="manageBankModal" role="dialog" aria-modal="true" aria-labelledby="manageBankTitle" onclick="if (event.target === this) closeManageBankModal()">
    <div class="modal-container modal-manage-bank-container">
      <div class="modal-header">
        <h3 class="modal-title" id="manageBankTitle">
          <i class="fa-solid fa-building-columns" style="color: var(--accent-gold);"></i> จัดการบัญชีธนาคาร
        </h3>
        <button type="button" class="modal-close" onclick="closeManageBankModal()" aria-label="ปิดหน้าต่าง">&times;</button>
      </div>

      <div class="modal-body" style="padding: 24px 28px;">
        <!-- Luxury Virtual Bank Card Preview -->
        <div class="virtual-bank-card" id="virtualBankCard">
          <div class="v-card-shine"></div>
          <div class="v-card-top">
            <div class="v-card-chip-box">
              <i class="fa-solid fa-microchip v-card-chip-icon"></i>
              <i class="fa-solid fa-wifi v-card-wifi-icon"></i>
            </div>
            <div class="v-card-bank-badge" id="vCardBankBadge">KBANK</div>
          </div>
          <div class="v-card-number-row">
            <span class="v-card-number" id="vCardNumber">089-2-94819-0</span>
          </div>
          <div class="v-card-bottom">
            <div class="v-card-col">
              <span class="v-card-label">ชื่อ - นามสกุลเจ้าของบัญชี</span>
              <span class="v-card-val" id="vCardHolderName">ALEXANDER STERLING</span>
            </div>
            <div class="v-card-col v-card-col-right">
              <span class="v-card-label">ธนาคาร</span>
              <span class="v-card-val" id="vCardBankName">KASIKORNBANK</span>
            </div>
          </div>
        </div>

        <form id="manageBankForm" onsubmit="handleSaveBankForm(event)">
          <!-- 1. ชื่อธนาคาร -->
          <div class="form-group bank-modal-field">
            <label for="bankModalSelect" class="form-label-gold">
              <i class="fa-solid fa-building-columns"></i> ชื่อธนาคาร <span class="required" style="color:#ef4444;">*</span>
            </label>
            <select id="bankModalSelect" class="composer-input form-select-custom bank-field-input" onchange="handleBankModalChange(this.value)" required>
              <option value="">-- กรุณาเลือกธนาคารไทย --</option>
              <option value="kbank">ธนาคารกสิกรไทย (KBANK - Kasikornbank)</option>
              <option value="scb">ธนาคารไทยพาณิชย์ (SCB - Siam Commercial Bank)</option>
              <option value="bbl">ธนาคารกรุงเทพ (BBL - Bangkok Bank)</option>
              <option value="ktb">ธนาคารกรุงไทย (KTB - Krungthai Bank)</option>
              <option value="bay">ธนาคารกรุงศรีอยุธยา (BAY - Bank of Ayudhya)</option>
              <option value="ttb">ธนาคารทหารไทยธนชาต (TTB - TMBThanachart)</option>
              <option value="gsb">ธนาคารออมสิน (GSB - Government Savings Bank)</option>
              <option value="baac">ธนาคารเพื่อการเกษตรและสหกรณ์การเกษตร (ธ.ก.ส. / BAAC)</option>
              <option value="uob">ธนาคารยูโอบี (UOB - United Overseas Bank)</option>
              <option value="cimb">ธนาคารซีไอเอ็มบี ไทย (CIMB Thai)</option>
              <option value="kk">ธนาคารเกียรตินาคินภัทร (KKP - Kiatnakin Phatra)</option>
              <option value="tisco">ธนาคารทิสโก้ (TISCO Bank)</option>
            </select>
          </div>

          <!-- 2. หมายเลขบัญชี -->
          <div class="form-group bank-modal-field">
            <label for="bankModalAccNumber" class="form-label-gold">
              <i class="fa-solid fa-money-check-dollar"></i> เลขบัญชี <span class="required" style="color:#ef4444;">*</span>
            </label>
            <div class="bank-input-with-icon">
              <i class="fa-solid fa-credit-card bank-input-icon"></i>
              <input type="text" id="bankModalAccNumber" class="composer-input bank-acc-input" placeholder="000-0-00000-0" maxlength="20" oninput="formatBankModalAccInput(this)" required>
            </div>
            <small class="form-helper-text">กรอกเฉพาะตัวเลข 10-12 หลัก (ระบบจัดรูปแบบให้อัตโนมัติ)</small>
          </div>

          <!-- 3. ชื่อ - นามสกุล -->
          <div class="form-group bank-modal-field" style="margin-bottom: 24px;">
            <label for="bankModalAccName" class="form-label-gold">
              <i class="fa-solid fa-user"></i> ชื่อ - นามสกุล <span class="required" style="color:#ef4444;">*</span>
            </label>
            <div class="bank-input-with-icon">
              <i class="fa-solid fa-user bank-input-icon"></i>
              <input type="text" id="bankModalAccName" class="composer-input" placeholder="ชื่อและนามสกุลจริงเจ้าของบัญชี" oninput="updateVirtualCardName(this.value)" required>
            </div>
            <small class="form-helper-text">โปรดระบุชื่อ-นามสกุลจริงให้ตรงกับหน้าสมุดบัญชี</small>
          </div>

          <div class="modal-footer bank-modal-footer">
            <button type="button" class="btn btn-view" onclick="closeManageBankModal()">ยกเลิก</button>
            <button type="submit" class="btn btn-profile-primary btn-profile-edit">
              <i class="fa-solid fa-floppy-disk"></i> บันทึกข้อมูลบัญชี
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  `.trim();

  const ManageBankModal = {
    template: MANAGE_BANK_MODAL_HTML,

    /**
     * Mounts the manage bank modal into the DOM.
     * @param {HTMLElement|string} [target] - Optional target container or selector
     * @returns {HTMLElement|null} The mounted modal element
     */
    mount: function (target) {
      if (document.getElementById('manageBankModal')) {
        this.initEvents();
        return document.getElementById('manageBankModal');
      }

      let targetEl = null;
      if (typeof target === 'string') {
        targetEl = document.querySelector(target);
      } else if (target instanceof HTMLElement) {
        targetEl = target;
      }

      if (!targetEl) {
        targetEl = document.getElementById('manageBankModalContainer') ||
                   document.querySelector('manage-bank-modal');
      }

      if (targetEl) {
        targetEl.innerHTML = MANAGE_BANK_MODAL_HTML;
      } else if (document.body) {
        const wrapper = document.createElement('div');
        wrapper.id = 'manageBankModalContainer';
        wrapper.innerHTML = MANAGE_BANK_MODAL_HTML;
        document.body.appendChild(wrapper);
      }

      this.initEvents();
      return document.getElementById('manageBankModal');
    },

    /**
     * Sets up backdrop click & Escape keyboard listeners.
     */
    initEvents: function () {
      const modal = document.getElementById('manageBankModal');
      if (!modal || modal.dataset.eventsBound === 'true') return;

      modal.addEventListener('click', function (e) {
        if (e.target === modal) {
          if (typeof global.closeManageBankModal === 'function') {
            global.closeManageBankModal();
          } else {
            modal.classList.remove('open');
          }
        }
      });

      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modal.classList.contains('open')) {
          if (typeof global.closeManageBankModal === 'function') {
            global.closeManageBankModal();
          } else {
            modal.classList.remove('open');
          }
        }
      });

      modal.dataset.eventsBound = 'true';
    },

    /**
     * Opens the manage bank modal.
     */
    open: function () {
      if (!document.getElementById('manageBankModal')) {
        this.mount();
      }
      if (typeof global.openManageBankModal === 'function') {
        global.openManageBankModal();
      } else {
        const modal = document.getElementById('manageBankModal');
        if (modal) modal.classList.add('open');
      }
    },

    /**
     * Closes the manage bank modal.
     */
    close: function () {
      if (typeof global.closeManageBankModal === 'function') {
        global.closeManageBankModal();
      } else {
        const modal = document.getElementById('manageBankModal');
        if (modal) modal.classList.remove('open');
      }
    }
  };

  // Custom Web Component registration
  if (typeof customElements !== 'undefined' && !customElements.get('manage-bank-modal')) {
    customElements.define('manage-bank-modal', class extends HTMLElement {
      connectedCallback() {
        if (!this.innerHTML.trim()) {
          this.innerHTML = MANAGE_BANK_MODAL_HTML;
          ManageBankModal.initEvents();
        }
      }
    });
  }

  // Auto-mount when DOM is ready
  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function () {
        ManageBankModal.mount();
      });
    } else {
      ManageBankModal.mount();
    }
  }

  global.ManageBankModal = ManageBankModal;

})(typeof window !== 'undefined' ? window : this);
