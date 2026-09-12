/**
 * ==========================================================================
 * COMPONENT: Report User Modal (คอมโพเนนต์รายงานผู้ใช้งาน)
 * File: components/modals/ReportUserModal.js
 * Description: Reusable modal component for reporting suspicious or fraudulent
 *              sellers and users, shill bidding, impersonation, or payment violations.
 * ==========================================================================
 */

(function (global) {
  'use strict';

  const REPORT_USER_MODAL_HTML = `
  <div class="modal-backdrop" id="reportUserModal" role="dialog" aria-modal="true" aria-labelledby="reportUserTitle">
    <div class="modal-container modal-report-container">
      <div class="modal-header">
        <h3 class="modal-title" id="reportUserTitle" style="color: #ef4444;">
          <i class="fa-solid fa-triangle-exclamation"></i> รายงานผู้ใช้งาน (Report User)
        </h3>
        <button type="button" class="modal-close" onclick="closeReportUserModal()" aria-label="ปิดหน้าต่าง">&times;</button>
      </div>

      <form id="reportUserForm" onsubmit="handleSubmitReportUser(event)">
        <div class="modal-body">
          <!-- Target User Summary Box -->
          <div class="report-target-summary">
            <img id="reportTargetAvatar" src="" alt="Target User" class="report-target-avatar">
            <div>
              <div style="font-size: 0.8rem; color: #fca5a5; font-weight: 600;">กำลังรายงานผู้ใช้งาน:</div>
              <strong id="reportTargetName" style="font-size: 1.05rem; color: #fff; display: block;">Apex Classic Motoring LLC</strong>
              <span id="reportTargetNick" style="font-size: 0.85rem; color: var(--accent-gold);">@ApexMotors_NY</span>
            </div>
          </div>

          <p style="font-size: 0.88rem; color: var(--text-secondary); margin-bottom: 14px;">
            กรุณาเลือกสาเหตุที่คุณต้องการรายงาน เพื่อให้ทีมงานความปลอดภัยและตรวจสอบการชำระเงินดำเนินการตรวจสอบ:
          </p>

          <!-- Report Reasons Radio Options -->
          <div class="report-reasons-list">
            <div class="report-reason-card">
              <input type="radio" id="reason1" name="reportReason" value="สินค้าไม่ตรงตามสเปก / ต้องสงสัยเป็นของปลอม" checked>
              <label for="reason1">
                <strong>สินค้าไม่ตรงตามสเปก / ต้องสงสัยเป็นของปลอม</strong>
                <span style="display:block; font-size:0.78rem; color:var(--text-muted);">ข้อมูลสินค้า รูปภาพ หรือเอกสารรับรองมีความคลาดเคลื่อนหรือน่าสงสัย</span>
              </label>
            </div>

            <div class="report-reason-card">
              <input type="radio" id="reason2" name="reportReason" value="พฤติกรรมปั่นราคาประมูล (Shill Bidding)">
              <label for="reason2">
                <strong>พฤติกรรมปั่นราคาประมูล (Shill Bidding)</strong>
                <span style="display:block; font-size:0.78rem; color:var(--text-muted);">มีบัญชีน่าสงสัยเคาะเสนอราคาเพื่อดันราคาสินค้าขึ้นอย่างผิดธรรมชาติ</span>
              </label>
            </div>

            <div class="report-reason-card">
              <input type="radio" id="reason3" name="reportReason" value="ข้อมูลโปรไฟล์หรือตัวตนเป็นเท็จ (Fake Profile)">
              <label for="reason3">
                <strong>ข้อมูลโปรไฟล์หรือตัวตนเป็นเท็จ (Impersonation)</strong>
                <span style="display:block; font-size:0.78rem; color:var(--text-muted);">แอบอ้างเป็นบุคคลหรือบริษัทอื่น หรือแสดงใบอนุญาตที่ไม่ถูกต้อง</span>
              </label>
            </div>

            <div class="report-reason-card">
              <input type="radio" id="reason4" name="reportReason" value="ละเมิดข้อตกลงการชำระเงินหรือปฏิเสธการส่งมอบ">
              <label for="reason4">
                <strong>ละเมิดข้อตกลงการชำระเงินหรือปฏิเสธการส่งมอบ</strong>
                <span style="display:block; font-size:0.78rem; color:var(--text-muted);">ผู้ขายไม่ยอมปฏิบัติตามขั้นตอนส่งมอบสินค้าหลังจากชนะการประมูล</span>
              </label>
            </div>

            <div class="report-reason-card">
              <input type="radio" id="reason5" name="reportReason" value="การใช้ถ้อยคำไม่สุภาพ / คุกคาม (Harassment)">
              <label for="reason5">
                <strong>การใช้ถ้อยคำไม่สุภาพ / คุกคาม (Harassment)</strong>
                <span style="display:block; font-size:0.78rem; color:var(--text-muted);">การสื่อสารในช่องทางสนทนาเข้าข่ายคุกคาม ข่มขู่ หรือหลอกลวง</span>
              </label>
            </div>

            <div class="report-reason-card">
              <input type="radio" id="reason6" name="reportReason" value="สาเหตุอื่นๆ">
              <label for="reason6">
                <strong>สาเหตุอื่นๆ (Other Reason)</strong>
                <span style="display:block; font-size:0.78rem; color:var(--text-muted);">ระบุรายละเอียดเพิ่มเติมด้านล่าง</span>
              </label>
            </div>
          </div>

          <!-- Additional Details Textarea -->
          <div class="form-group">
            <label for="reportDetails" style="display:block; font-size:0.88rem; color:var(--text-secondary); margin-bottom:6px;">
              รายละเอียดเพิ่มเติมหรือข้อมูลหลักฐานประกอบ (ถ้ามี):
            </label>
            <textarea id="reportDetails" class="report-textarea" rows="3" placeholder="ระบุเลขที่คำสั่งซื้อ เวลาที่เกิดเหตุการณ์ หรือหลักฐานข้อความ..."></textarea>
          </div>
        </div>

        <div class="modal-footer" style="padding:16px 24px; border-top:1px solid var(--border-subtle); display:flex; justify-content:flex-end; gap:12px;">
          <button type="button" class="btn btn-view" onclick="closeReportUserModal()">ยกเลิก</button>
          <button type="submit" class="btn btn-report-submit">
            <i class="fa-solid fa-paper-plane"></i> ส่งรายงานผู้ใช้งาน
          </button>
        </div>
      </form>
    </div>
  </div>
  `.trim();

  const ReportUserModal = {
    template: REPORT_USER_MODAL_HTML,

    /**
     * Mounts the report user modal into the DOM.
     * @param {HTMLElement|string} [target] - Optional target container or selector
     * @returns {HTMLElement|null} The mounted modal element
     */
    mount: function (target) {
      if (document.getElementById('reportUserModal')) {
        this.initEvents();
        return document.getElementById('reportUserModal');
      }

      let targetEl = null;
      if (typeof target === 'string') {
        targetEl = document.querySelector(target);
      } else if (target instanceof HTMLElement) {
        targetEl = target;
      }

      if (!targetEl) {
        targetEl = document.getElementById('reportUserModalContainer') ||
                   document.querySelector('report-user-modal');
      }

      if (targetEl) {
        targetEl.innerHTML = REPORT_USER_MODAL_HTML;
      } else if (document.body) {
        const wrapper = document.createElement('div');
        wrapper.id = 'reportUserModalContainer';
        wrapper.innerHTML = REPORT_USER_MODAL_HTML;
        document.body.appendChild(wrapper);
      }

      this.initEvents();
      return document.getElementById('reportUserModal');
    },

    /**
     * Sets up backdrop click & Escape keyboard listeners.
     */
    initEvents: function () {
      const modal = document.getElementById('reportUserModal');
      if (!modal || modal.dataset.eventsBound === 'true') return;

      modal.addEventListener('click', function (e) {
        if (e.target === modal) {
          if (typeof global.closeReportUserModal === 'function') {
            global.closeReportUserModal();
          } else {
            modal.classList.remove('open');
          }
        }
      });

      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modal.classList.contains('open')) {
          if (typeof global.closeReportUserModal === 'function') {
            global.closeReportUserModal();
          } else {
            modal.classList.remove('open');
          }
        }
      });

      modal.dataset.eventsBound = 'true';
    },

    /**
     * Opens the report user modal.
     * @param {Object|string} [targetUser] - Target user object or nickname
     */
    open: function (targetUser) {
      if (!document.getElementById('reportUserModal')) {
        this.mount();
      }
      if (typeof global.openReportUserModal === 'function') {
        global.openReportUserModal(targetUser);
      } else {
        const modal = document.getElementById('reportUserModal');
        if (modal) modal.classList.add('open');
      }
    },

    /**
     * Closes the report user modal.
     */
    close: function () {
      if (typeof global.closeReportUserModal === 'function') {
        global.closeReportUserModal();
      } else {
        const modal = document.getElementById('reportUserModal');
        if (modal) modal.classList.remove('open');
      }
    }
  };

  // Custom Web Component registration
  if (typeof customElements !== 'undefined' && !customElements.get('report-user-modal')) {
    customElements.define('report-user-modal', class extends HTMLElement {
      connectedCallback() {
        if (!this.innerHTML.trim()) {
          this.innerHTML = REPORT_USER_MODAL_HTML;
          ReportUserModal.initEvents();
        }
      }
    });
  }

  // Auto-mount when DOM is ready
  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function () {
        ReportUserModal.mount();
      });
    } else {
      ReportUserModal.mount();
    }
  }

  global.ReportUserModal = ReportUserModal;

})(typeof window !== 'undefined' ? window : this);
