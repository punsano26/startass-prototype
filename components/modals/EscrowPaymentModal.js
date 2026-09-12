/**
 * ==========================================================================
 * COMPONENT: Payment Modal (คอมโพเนนต์ชำระเงินค่าสินค้า [ Dealer ])
 * File: components/modals/EscrowPaymentModal.js
 * Description: Reusable, responsive modal component for auction winners (Dealer)
 *              to transfer winning funds into the STARTASS payment system.
 *              Complies with the platform decoupled modal component architecture.
 * ==========================================================================
 */

(function (global) {
  'use strict';

  let currentPayingOrderId = null;
  let currentSelectedMethod = 'promptpay';

  const ESCROW_PAYMENT_MODAL_HTML = `
  <div class="modal-backdrop" id="escrowPaymentModal" role="dialog" aria-modal="true" aria-labelledby="escrowPaymentModalTitle">
    <div class="modal-container modal-escrow-payment-container">
      <div class="modal-header">
        <h3 class="modal-title" id="escrowPaymentModalTitle">
          <i class="fa-solid fa-shield-halved" style="color: var(--accent-gold);"></i>
          <span>ชำระเงินค่าสินค้า <span class="role-badge-dealer">[ Dealer ]</span></span>
        </h3>
        <button type="button" class="modal-close" onclick="closeEscrowPaymentModal()" aria-label="ปิดหน้าต่าง">&times;</button>
      </div>

      <div class="modal-body escrow-payment-body">
        <!-- Item Summary Preview Header -->
        <div class="modal-item-preview escrow-item-preview">
          <img src="" id="escrowModalImg" class="preview-img" alt="Auction Item Preview">
          <div class="preview-info">
            <div class="escrow-modal-badges">
              <span class="preview-badge" id="escrowModalCategory">หมวดหมู่</span>
              <span class="escrow-order-pill" id="escrowModalOrderPill">#ORD-AUC-02</span>
              <span class="escrow-status-pill"><i class="fa-solid fa-trophy"></i> ชนะการประมูล</span>
            </div>
            <h4 id="escrowModalTitle" class="escrow-product-title">ชื่อรายการประมูล</h4>
            <div class="escrow-seller-tag">
              <i class="fa-solid fa-store"></i> ผู้ขาย: <span id="escrowModalSellerName">ผู้ขาย</span>
            </div>
          </div>
        </div>

        <!-- Security Banner -->
        <div class="escrow-vault-callout">
          <div class="vault-callout-icon">
            <i class="fa-solid fa-vault"></i>
          </div>
          <div class="vault-callout-content">
            <strong>ระบบคุ้มครองความปลอดภัยในการชำระเงิน STARTASS 100%</strong>
            <p>
              ยอดเงินของคุณจะถูกจัดเก็บรักษาอย่างปลอดภัยในระบบส่วนกลาง (ระบบชำระเงินปลอดภัย) 
              ผู้ขายจะยังไม่ได้รับเงินจนกว่าสินค้าจะจัดส่งถึงมือ และคุณได้ตรวจสอบสินค้าตรงปกภายใน <strong>10 วัน</strong>
            </p>
          </div>
        </div>

        <!-- Payment Amount Summary Card -->
        <div class="escrow-amount-card">
          <div class="amount-row-sub">
            <span>ยอดเคาะราคาชนะประมูลสุทธิ</span>
            <span class="text-muted" id="escrowModalWinningBid">฿0</span>
          </div>
          <div class="amount-row-sub">
            <span>ค่าบริการคุ้มครองการชำระเงิน (ฟรีโปรโมชั่น)</span>
            <span style="color: #34d399; font-weight: 600;">฿0 (ฟรี)</span>
          </div>
          <div class="amount-divider"></div>
          <div class="amount-row-total">
            <div class="total-label-col">
              <span class="total-label">ยอดที่ต้องชำระทั้งสิ้น</span>
              <span class="total-subhint">ตรวจสอบยอดเงินก่อนดำเนินการโอน</span>
            </div>
            <div class="total-value-col">
              <strong class="total-amount-val" id="escrowModalTotalAmount">฿0</strong>
              <span class="currency-tag">THB</span>
            </div>
          </div>
        </div>

        <!-- Payment Method Tabs -->
        <div class="escrow-method-section">
          <label class="escrow-section-label">
            <i class="fa-solid fa-credit-card"></i> เลือกช่องทางการชำระเงิน:
          </label>
          <div class="escrow-method-tabs">
            <button type="button" class="btn-method-tab active" data-method="promptpay" onclick="switchEscrowPaymentMethod('promptpay', this)">
              <i class="fa-solid fa-qrcode"></i>
              <span>PromptPay QR</span>
            </button>
            <button type="button" class="btn-method-tab" data-method="bank" onclick="switchEscrowPaymentMethod('bank', this)">
              <i class="fa-solid fa-building-columns"></i>
              <span>โอนผ่านธนาคาร</span>
            </button>
            <button type="button" class="btn-method-tab" data-method="wallet" onclick="switchEscrowPaymentMethod('wallet', this)">
              <i class="fa-solid fa-wallet"></i>
              <span>STARTASS Wallet</span>
            </button>
          </div>

          <!-- Method Detail 1: PromptPay QR -->
          <div class="method-detail-panel" id="methodPanelPromptPay" style="display: block;">
            <div class="promptpay-box">
              <div class="qr-code-wrapper">
                <div class="qr-mock-frame">
                  <svg viewBox="0 0 200 200" width="150" height="150" class="qr-svg">
                    <rect width="200" height="200" fill="#ffffff" rx="10"/>
                    <rect x="16" y="16" width="46" height="46" fill="#0f172a" rx="4"/>
                    <rect x="24" y="24" width="30" height="30" fill="#ffffff" rx="2"/>
                    <rect x="30" y="30" width="18" height="18" fill="#0f172a" rx="1"/>
                    <rect x="138" y="16" width="46" height="46" fill="#0f172a" rx="4"/>
                    <rect x="146" y="24" width="30" height="30" fill="#ffffff" rx="2"/>
                    <rect x="152" y="30" width="18" height="18" fill="#0f172a" rx="1"/>
                    <rect x="16" y="138" width="46" height="46" fill="#0f172a" rx="4"/>
                    <rect x="24" y="146" width="30" height="30" fill="#ffffff" rx="2"/>
                    <rect x="30" y="152" width="18" height="18" fill="#0f172a" rx="1"/>
                    <g fill="#0f172a">
                      <rect x="74" y="18" width="8" height="8"/><rect x="90" y="18" width="8" height="8"/><rect x="114" y="18" width="8" height="8"/>
                      <rect x="74" y="34" width="8" height="8"/><rect x="106" y="34" width="8" height="8"/><rect x="122" y="34" width="8" height="8"/>
                      <rect x="90" y="50" width="8" height="8"/><rect x="114" y="50" width="8" height="8"/>
                      <rect x="18" y="74" width="8" height="8"/><rect x="34" y="74" width="8" height="8"/><rect x="50" y="74" width="8" height="8"/>
                      <rect x="74" y="74" width="8" height="8"/><rect x="98" y="74" width="8" height="8"/><rect x="130" y="74" width="8" height="8"/><rect x="162" y="74" width="8" height="8"/>
                      <rect x="18" y="90" width="8" height="8"/><rect x="42" y="90" width="8" height="8"/><rect x="66" y="90" width="8" height="8"/>
                      <rect x="114" y="90" width="8" height="8"/><rect x="146" y="90" width="8" height="8"/><rect x="174" y="90" width="8" height="8"/>
                      <rect x="18" y="114" width="8" height="8"/><rect x="50" y="114" width="8" height="8"/><rect x="82" y="114" width="8" height="8"/>
                      <rect x="130" y="114" width="8" height="8"/><rect x="154" y="114" width="8" height="8"/>
                      <rect x="74" y="138" width="8" height="8"/><rect x="98" y="138" width="8" height="8"/><rect x="122" y="138" width="8" height="8"/><rect x="162" y="138" width="8" height="8"/>
                      <rect x="90" y="154" width="8" height="8"/><rect x="114" y="154" width="8" height="8"/><rect x="146" y="154" width="8" height="8"/><rect x="174" y="154" width="8" height="8"/>
                      <rect x="74" y="174" width="8" height="8"/><rect x="106" y="174" width="8" height="8"/><rect x="138" y="174" width="8" height="8"/>
                    </g>
                    <circle cx="100" cy="100" r="19" fill="#0f172a"/>
                    <circle cx="100" cy="100" r="16" fill="#f59e0b"/>
                    <path d="M100 89 L109 93 L109 101 C109 106 105 111 100 113 C95 111 91 106 91 101 L91 93 Z" fill="#0f172a"/>
                  </svg>
                </div>
                <div class="qr-info-col">
                  <span class="promptpay-badge"><i class="fa-solid fa-bolt"></i> พร้อมเพย์ (PromptPay) QR</span>
                  <span class="qr-scan-guide">เปิดแอปพลิเคชันธนาคารใดก็ได้ แล้วสแกนคิวอาร์โค้ดนี้เพื่อชำระเงิน</span>
                  <div class="qr-ref-box">
                    <div class="qr-ref-item">
                      <span>บัญชีปลายทาง:</span>
                      <strong>STARTASS PAYMENT TRUST (THAILAND)</strong>
                    </div>
                    <div class="qr-ref-item">
                      <span>หมายเลขอ้างอิง Ref 1:</span>
                      <strong id="escrowRef1">PAY-89241</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Method Detail 2: Bank Transfer -->
          <div class="method-detail-panel" id="methodPanelBank" style="display: none;">
            <div class="bank-account-card">
              <div class="bank-brand-row">
                <div class="bank-logo-badge kbank-logo">
                  <i class="fa-solid fa-building-columns"></i> KBANK
                </div>
                <span class="bank-title">ธนาคารกสิกรไทย (Kasikornbank)</span>
                <span class="bank-type-tag">บัญชีรับชำระเงินกลาง</span>
              </div>
              <div class="bank-acc-grid">
                <div class="bank-acc-field">
                  <span class="field-label">เลขที่บัญชีรับโอน:</span>
                  <div class="copy-input-row">
                    <strong class="acc-number" id="escrowBankAccNumber">089-2-94819-0</strong>
                    <button type="button" class="btn-copy-acc" onclick="copyEscrowAccountNumber(event)" title="คัดลอกเลขบัญชี">
                      <i class="fa-regular fa-copy"></i> คัดลอก
                    </button>
                  </div>
                </div>
                <div class="bank-acc-field">
                  <span class="field-label">ชื่อบัญชี:</span>
                  <strong class="acc-name">บจก. สตาร์ทาสส์ เพย์เมนต์ ทรัสต์ (STARTASS PAYMENT TRUST CO., LTD.)</strong>
                </div>
                <div class="bank-acc-field">
                  <span class="field-label">สาขา:</span>
                  <span>สำนักสีลม (Silom Main Branch)</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Method Detail 3: STARTASS Wallet -->
          <div class="method-detail-panel" id="methodPanelWallet" style="display: none;">
            <div class="wallet-balance-box">
              <div class="wallet-balance-header">
                <i class="fa-solid fa-wallet" style="color: var(--accent-gold); font-size: 1.5rem;"></i>
                <div>
                  <span class="wallet-sub">ยอดเงินใน STARTASS Wallet Balance:</span>
                  <strong class="wallet-val">฿180,000,000 THB</strong>
                </div>
              </div>
              <div class="wallet-status-ok">
                <i class="fa-solid fa-circle-check"></i>
                <span>ยอดเงินคงเหลือในวอลเล็ตเพียงพอสำหรับการชำระเงินอัตโนมัติทันที</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Slip Upload / Simulation Toggle -->
        <div class="escrow-slip-box">
          <label class="slip-toggle-label">
            <input type="checkbox" id="chkSimulateSlip" checked>
            <span class="toggle-custom"></span>
            <span class="slip-text">
              <i class="fa-solid fa-file-invoice-dollar" style="color: var(--accent-gold);"></i>
              <strong>จำลองการตรวจสอบสลิปโอนเงินสำเร็จทันที (Simulate Instant Payment Verification)</strong>
            </span>
          </label>
        </div>

        <!-- Flow Confirmation Checkbox -->
        <div class="escrow-terms-agree">
          <label class="terms-agree-label">
            <input type="checkbox" id="chkAgreeEscrowTerms" checked required>
            <span>
              ฉันเข้าใจและยินยอมให้ระบบพักเงินไว้ในระบบ <strong>ชำระเงิน</strong> และเงินจะถูกปล่อยให้ผู้ขาย <strong>[ Seller ]</strong> หลังจากที่ฉันได้รับสินค้าและตรวจรับสินค้าตรงปกภายใน 10 วัน ตามขั้นตอน Flowchart
            </span>
          </label>
        </div>

      </div>

      <!-- Modal Footer -->
      <div class="modal-footer escrow-modal-footer">
        <button type="button" class="btn btn-view" onclick="closeEscrowPaymentModal()">
          ยกเลิก
        </button>
        <button type="button" class="btn btn-bid btn-confirm-escrow-pay" id="btnConfirmEscrowPayment" onclick="submitEscrowPayment()">
          <i class="fa-solid fa-shield-halved"></i>
          <span>ยืนยันการชำระเงิน [ Dealer ]</span>
        </button>
      </div>
    </div>
  </div>
  `.trim();

  const EscrowPaymentModal = {
    template: ESCROW_PAYMENT_MODAL_HTML,

    mount: function (target) {
      const existing = document.getElementById('escrowPaymentModal');
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
        targetEl = document.getElementById('escrowPaymentModalContainer') ||
                   document.querySelector('escrow-payment-modal');
      }

      if (targetEl) {
        targetEl.innerHTML = ESCROW_PAYMENT_MODAL_HTML;
      } else if (document.body) {
        const wrapper = document.createElement('div');
        wrapper.id = 'escrowPaymentModalContainer';
        wrapper.innerHTML = ESCROW_PAYMENT_MODAL_HTML;
        document.body.appendChild(wrapper);
      }

      this.initEvents();
      return document.getElementById('escrowPaymentModal');
    },

    initEvents: function () {
      const modal = document.getElementById('escrowPaymentModal');
      if (!modal || modal.dataset.eventsBound === 'true') return;

      modal.addEventListener('click', function (e) {
        if (e.target === modal) {
          global.closeEscrowPaymentModal();
        }
      });

      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modal.classList.contains('open')) {
          global.closeEscrowPaymentModal();
        }
      });

      modal.dataset.eventsBound = 'true';
    },

    open: function (orderId) {
      if (!document.getElementById('escrowPaymentModal')) {
        this.mount();
      }

      const modal = document.getElementById('escrowPaymentModal');
      if (!modal) return;

      // Determine target order
      const targetOrderId = orderId || global.activeStandaloneChatOrderId || 'ORD-AUC-02';
      currentPayingOrderId = targetOrderId;

      const chats = typeof global.loadP2PChats === 'function' ? global.loadP2PChats() : {};
      const chat = chats[targetOrderId] || {
        orderId: targetOrderId,
        title: 'รายการประมูล',
        categoryLabel: 'ของสะสมพิเศษ',
        image: 'https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?auto=format&fit=crop&w=1200&q=80',
        winningBid: 12500000,
        seller: { name: 'ผู้ขาย' }
      };

      const formatFn = typeof global.formatCurrency === 'function' ? global.formatCurrency : (v => '฿' + Number(v).toLocaleString());
      const winBid = chat.winningBid || chat.latestBid || 12500000;

      // Populate elements
      const imgEl = document.getElementById('escrowModalImg');
      const catEl = document.getElementById('escrowModalCategory');
      const pillEl = document.getElementById('escrowModalOrderPill');
      const titleEl = document.getElementById('escrowModalTitle');
      const sellerEl = document.getElementById('escrowModalSellerName');
      const winBidEl = document.getElementById('escrowModalWinningBid');
      const totalAmountEl = document.getElementById('escrowModalTotalAmount');
      const refEl = document.getElementById('escrowRef1');

      if (imgEl) imgEl.src = chat.image || '';
      if (catEl) catEl.textContent = chat.categoryLabel || 'ของสะสมพิเศษ';
      if (pillEl) pillEl.textContent = `#${chat.orderId}`;
      if (titleEl) titleEl.textContent = chat.title || 'รายการประมูล';
      if (sellerEl) sellerEl.textContent = (chat.seller && (chat.seller.name || chat.seller.nickname)) || 'ผู้ขาย';
      if (winBidEl) winBidEl.textContent = formatFn(winBid);
      if (totalAmountEl) totalAmountEl.textContent = formatFn(winBid);
      if (refEl) refEl.textContent = 'PAY-' + (chat.orderId.replace(/[^0-9]/g, '') || '89241') + '-' + Math.floor(Math.random() * 899 + 100);

      // Reset tabs
      currentSelectedMethod = 'promptpay';
      const tabs = modal.querySelectorAll('.btn-method-tab');
      tabs.forEach(t => t.classList.remove('active'));
      const defaultTab = modal.querySelector('.btn-method-tab[data-method="promptpay"]');
      if (defaultTab) defaultTab.classList.add('active');

      const pPrompt = document.getElementById('methodPanelPromptPay');
      const pBank = document.getElementById('methodPanelBank');
      const pWallet = document.getElementById('methodPanelWallet');
      if (pPrompt) pPrompt.style.display = 'block';
      if (pBank) pBank.style.display = 'none';
      if (pWallet) pWallet.style.display = 'none';

      // Reset button
      const btn = document.getElementById('btnConfirmEscrowPayment');
      if (btn) {
        btn.disabled = false;
        btn.innerHTML = '<i class="fa-solid fa-shield-halved"></i> <span>ยืนยันการชำระเงิน [ Dealer ]</span>';
      }

      modal.classList.add('open');
      document.body.classList.add('modal-open');
    },

    close: function () {
      const modal = document.getElementById('escrowPaymentModal');
      if (modal) {
        modal.classList.remove('open');
      }
      document.body.classList.remove('modal-open');
    }
  };

  // Helper functions exposed globally
  global.openEscrowPaymentModal = function (orderId) {
    EscrowPaymentModal.open(orderId);
  };

  global.closeEscrowPaymentModal = function () {
    EscrowPaymentModal.close();
  };

  global.switchEscrowPaymentMethod = function (method, btnEl) {
    currentSelectedMethod = method;
    const modal = document.getElementById('escrowPaymentModal');
    if (!modal) return;

    modal.querySelectorAll('.btn-method-tab').forEach(b => b.classList.remove('active'));
    if (btnEl) btnEl.classList.add('active');

    const pPrompt = document.getElementById('methodPanelPromptPay');
    const pBank = document.getElementById('methodPanelBank');
    const pWallet = document.getElementById('methodPanelWallet');

    if (pPrompt) pPrompt.style.display = method === 'promptpay' ? 'block' : 'none';
    if (pBank) pBank.style.display = method === 'bank' ? 'block' : 'none';
    if (pWallet) pWallet.style.display = method === 'wallet' ? 'block' : 'none';
  };

  global.copyEscrowAccountNumber = function (event) {
    if (event) event.preventDefault();
    const accNumber = document.getElementById('escrowBankAccNumber');
    if (accNumber) {
      const text = accNumber.textContent.trim();
      navigator.clipboard.writeText(text).then(() => {
        if (typeof global.showToast === 'function') {
          global.showToast('📋 คัดลอกเลขบัญชีรับชำระเงิน (' + text + ') เรียบร้อยแล้ว');
        }
      }).catch(() => {
        if (typeof global.showToast === 'function') {
          global.showToast('📋 เลขที่บัญชีรับชำระเงิน: ' + text);
        }
      });
    }
  };

  global.submitEscrowPayment = function () {
    const agreeChk = document.getElementById('chkAgreeEscrowTerms');
    if (agreeChk && !agreeChk.checked) {
      if (typeof global.showToast === 'function') {
        global.showToast('⚠️ กรุณายอมรับเงื่อนไขการคุ้มครองการชำระเงินก่อนดำเนินการ');
      }
      return;
    }

    const btn = document.getElementById('btnConfirmEscrowPayment');
    if (btn) {
      btn.disabled = true;
      btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> <span>กำลังตรวจสอบการชำระเงิน...</span>';
    }

    // Realistic verification delay (800ms)
    setTimeout(() => {
      if (typeof global.confirmEscrowPayment === 'function') {
        const methodNames = {
          promptpay: 'PromptPay QR Code',
          bank: 'โอนผ่านธนาคารกสิกรไทย (KBANK)',
          wallet: 'STARTASS Wallet'
        };
        const methodLabel = methodNames[currentSelectedMethod] || 'PromptPay QR';
        global.confirmEscrowPayment(currentPayingOrderId, methodLabel);
      }
      EscrowPaymentModal.close();
    }, 850);
  };

  // Web Component registration
  if (typeof customElements !== 'undefined' && !customElements.get('escrow-payment-modal')) {
    class EscrowPaymentModalElement extends HTMLElement {
      connectedCallback() {
        if (!this.querySelector('#escrowPaymentModal')) {
          EscrowPaymentModal.mount(this);
        }
      }
    }
    customElements.define('escrow-payment-modal', EscrowPaymentModalElement);
  }

  // Auto mount on document load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      EscrowPaymentModal.mount();
    });
  } else {
    EscrowPaymentModal.mount();
  }

  global.EscrowPaymentModal = EscrowPaymentModal;

})(typeof window !== 'undefined' ? window : this);
