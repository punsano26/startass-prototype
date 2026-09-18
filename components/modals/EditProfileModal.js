/**
 * ==========================================================================
 * COMPONENT: Edit Profile Modal (คอมโพเนนต์แก้ไขข้อมูลโปรไฟล์)
 * File: components/modals/EditProfileModal.js
 * Description: Reusable modal component for editing user profile information,
 *              avatar image URL, full name, nickname, and personal bio.
 * ==========================================================================
 */

(function (global) {
  'use strict';

  const EDIT_PROFILE_MODAL_HTML = `
  <div class="modal-backdrop" id="editProfileModal" role="dialog" aria-modal="true" aria-labelledby="editProfileTitle">
    <div class="modal-container modal-edit-profile-container">
      <div class="modal-header">
        <h3 class="modal-title" id="editProfileTitle">
          <i class="fa-solid fa-user-pen" style="color: var(--accent-gold);"></i> แก้ไขข้อมูลโปรไฟล์ส่วนตัว
        </h3>
        <button type="button" class="modal-close" onclick="closeEditProfileModal()" aria-label="ปิดหน้าต่าง">&times;</button>
      </div>
      
      <form id="editProfileForm" onsubmit="handleSaveProfileForm(event)">
        <div class="modal-body">
          <!-- Avatar Selection Section (เลือกรูปภาพจากเครื่อง หรือเลือกรูปโปรไฟล์เริ่มต้น) -->
          <div class="edit-profile-avatar-preview-box">
            <div class="edit-avatar-preview-wrap" style="position:relative; width:76px; height:76px; flex-shrink:0;">
              <img id="editAvatarPreview" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80" alt="Avatar Preview" class="edit-avatar-img" style="cursor:pointer;" onclick="document.getElementById('editAvatarFileInput').click()" title="คลิกเพื่อเลือกรูปภาพ">
              <button type="button" class="edit-avatar-camera-btn" onclick="document.getElementById('editAvatarFileInput').click()" title="เลือกรูปภาพใหม่" style="position:absolute; bottom:0; right:0; width:26px; height:26px; border-radius:50%; background:var(--accent-gold); border:2px solid var(--bg-card); color:#000; display:flex; align-items:center; justify-content:center; cursor:pointer; font-size:0.75rem;">
                <i class="fa-solid fa-camera"></i>
              </button>
            </div>
            <div class="edit-avatar-inputs">
              <!-- Hidden input to store chosen avatar image (data URL or preset URL) -->
              <input type="hidden" id="editAvatarUrl" value="">
              <input type="file" id="editAvatarFileInput" accept="image/*" style="display:none;" onchange="handleAvatarFileSelect(event)">
              
              <div style="display:flex; flex-wrap:wrap; align-items:center; gap:8px; margin-bottom:10px;">
                <button type="button" class="btn btn-sm btn-profile-primary" onclick="document.getElementById('editAvatarFileInput').click()" style="display:inline-flex; align-items:center; gap:6px; font-size:0.82rem; padding:6px 14px; border-radius:var(--radius-sm); cursor:pointer;">
                  <i class="fa-solid fa-cloud-arrow-up"></i> เลือกรูปภาพจากเครื่อง
                </button>
                <span style="font-size:0.75rem; color:var(--text-muted);">รองรับไฟล์ JPG, PNG, WebP (สูงสุด 5MB)</span>
              </div>

              <!-- Preset Avatars -->
              <div class="edit-preset-avatars-box">
                <span style="font-size:0.75rem; color:var(--text-secondary); display:block; margin-bottom:6px;">หรือเลือกจากรูปโปรไฟล์เริ่มต้น:</span>
                <div class="preset-avatar-list">
                  <button type="button" class="preset-avatar-btn" data-url="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80" onclick="selectPresetAvatar(this.getAttribute('data-url'), this)" title="โปรไฟล์ 1">
                    <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80" alt="Preset 1">
                  </button>
                  <button type="button" class="preset-avatar-btn" data-url="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80" onclick="selectPresetAvatar(this.getAttribute('data-url'), this)" title="โปรไฟล์ 2">
                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80" alt="Preset 2">
                  </button>
                  <button type="button" class="preset-avatar-btn" data-url="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80" onclick="selectPresetAvatar(this.getAttribute('data-url'), this)" title="โปรไฟล์ 3">
                    <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80" alt="Preset 3">
                  </button>
                  <button type="button" class="preset-avatar-btn" data-url="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80" onclick="selectPresetAvatar(this.getAttribute('data-url'), this)" title="โปรไฟล์ 4">
                    <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80" alt="Preset 4">
                  </button>
                  <button type="button" class="preset-avatar-btn" data-url="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80" onclick="selectPresetAvatar(this.getAttribute('data-url'), this)" title="โปรไฟล์ 5">
                    <img src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=120&q=80" alt="Preset 5">
                  </button>
                  <button type="button" class="preset-avatar-btn" data-url="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80" onclick="selectPresetAvatar(this.getAttribute('data-url'), this)" title="โปรไฟล์ 6">
                    <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&q=80" alt="Preset 6">
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- 2-Column Form Grid -->
          <div class="edit-grid-2col">
            <div class="form-group">
              <label for="editFullName" style="display:block; font-size:0.88rem; color:var(--text-secondary); margin-bottom:6px;">
                ชื่อ-นามสกุลจริง (Full Name):
              </label>
              <input type="text" id="editFullName" class="composer-input" style="width:100%; border-radius:var(--radius-sm);" required>
            </div>

            <div class="form-group">
              <label for="editNickname" style="display:block; font-size:0.88rem; color:var(--text-secondary); margin-bottom:6px;">
                ชื่อเล่น / นามแฝงในตลาด (Nickname):
              </label>
              <input type="text" id="editNickname" class="composer-input" style="width:100%; border-radius:var(--radius-sm);" required>
            </div>
          </div>

          <div class="form-group">
            <label for="editBio" style="display:block; font-size:0.88rem; color:var(--text-secondary); margin-bottom:6px;">
              คำแนะนำตัว / คำอธิบายประวัติการสะสม (Bio):
            </label>
            <textarea id="editBio" class="report-textarea" rows="3" placeholder="เขียนคำแนะนำตัวสั้นๆ เกี่ยวกับตัวคุณ..."></textarea>
          </div>
        </div>

        <div class="modal-footer" style="padding:16px 24px; border-top:1px solid var(--border-subtle); display:flex; justify-content:flex-end; gap:12px;">
          <button type="button" class="btn btn-view" onclick="closeEditProfileModal()">ยกเลิก</button>
          <button type="submit" class="btn btn-profile-primary btn-profile-edit">
            <i class="fa-solid fa-floppy-disk"></i> บันทึกการเปลี่ยนแปลง
          </button>
        </div>
      </form>
    </div>
  </div>
  `.trim();

  const EditProfileModal = {
    template: EDIT_PROFILE_MODAL_HTML,

    /**
     * Mounts the edit profile modal into the DOM.
     * @param {HTMLElement|string} [target] - Optional target container or selector
     * @returns {HTMLElement|null} The mounted modal element
     */
    mount: function (target) {
      if (document.getElementById('editProfileModal')) {
        this.initEvents();
        return document.getElementById('editProfileModal');
      }

      let targetEl = null;
      if (typeof target === 'string') {
        targetEl = document.querySelector(target);
      } else if (target instanceof HTMLElement) {
        targetEl = target;
      }

      if (!targetEl) {
        targetEl = document.getElementById('editProfileModalContainer') ||
                   document.querySelector('edit-profile-modal');
      }

      if (targetEl) {
        targetEl.innerHTML = EDIT_PROFILE_MODAL_HTML;
      } else if (document.body) {
        const wrapper = document.createElement('div');
        wrapper.id = 'editProfileModalContainer';
        wrapper.innerHTML = EDIT_PROFILE_MODAL_HTML;
        document.body.appendChild(wrapper);
      }

      this.initEvents();
      return document.getElementById('editProfileModal');
    },

    /**
     * Sets up backdrop click & Escape keyboard listeners.
     */
    initEvents: function () {
      const modal = document.getElementById('editProfileModal');
      if (!modal || modal.dataset.eventsBound === 'true') return;

      modal.addEventListener('click', function (e) {
        if (e.target === modal) {
          if (typeof global.closeEditProfileModal === 'function') {
            global.closeEditProfileModal();
          } else {
            modal.classList.remove('open');
          }
        }
      });

      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modal.classList.contains('open')) {
          if (typeof global.closeEditProfileModal === 'function') {
            global.closeEditProfileModal();
          } else {
            modal.classList.remove('open');
          }
        }
      });

      modal.dataset.eventsBound = 'true';
    },

    /**
     * Opens the edit profile modal.
     */
    open: function () {
      if (!document.getElementById('editProfileModal')) {
        this.mount();
      }
      if (typeof global.openEditProfileModal === 'function') {
        global.openEditProfileModal();
      } else {
        const modal = document.getElementById('editProfileModal');
        if (modal) modal.classList.add('open');
      }
    },

    /**
     * Closes the edit profile modal.
     */
    close: function () {
      if (typeof global.closeEditProfileModal === 'function') {
        global.closeEditProfileModal();
      } else {
        const modal = document.getElementById('editProfileModal');
        if (modal) modal.classList.remove('open');
      }
    },

    handleAvatarFileSelect: handleAvatarFileSelect,
    selectPresetAvatar: selectPresetAvatar,
    updatePresetAvatarSelection: updatePresetAvatarSelection
  };

  /**
   * Handles user selecting an avatar image file from their device.
   */
  function handleAvatarFileSelect(event) {
    const file = event && event.target && event.target.files && event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('กรุณาเลือกไฟล์รูปภาพที่ถูกต้อง (JPG, PNG, WebP, GIF)');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert('ขนาดไฟล์รูปภาพต้องไม่เกิน 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
      const dataUrl = e.target.result;
      const previewImg = document.getElementById('editAvatarPreview');
      const avInput = document.getElementById('editAvatarUrl');
      if (previewImg) previewImg.src = dataUrl;
      if (avInput) avInput.value = dataUrl;

      // Deselect preset buttons
      const presetBtns = document.querySelectorAll('.preset-avatar-btn');
      presetBtns.forEach(function (btn) {
        btn.classList.remove('selected');
      });
    };
    reader.readAsDataURL(file);
  }

  /**
   * Handles user clicking one of the preset avatars.
   */
  function selectPresetAvatar(url, el) {
    if (!url) return;
    const previewImg = document.getElementById('editAvatarPreview');
    const avInput = document.getElementById('editAvatarUrl');
    if (previewImg) previewImg.src = url;
    if (avInput) avInput.value = url;

    const fileInput = document.getElementById('editAvatarFileInput');
    if (fileInput) fileInput.value = '';

    const presetBtns = document.querySelectorAll('.preset-avatar-btn');
    presetBtns.forEach(function (btn) {
      btn.classList.remove('selected');
    });
    if (el) el.classList.add('selected');
  }

  /**
   * Updates preset avatar active state highlight.
   */
  function updatePresetAvatarSelection(currentUrl) {
    const presetBtns = document.querySelectorAll('.preset-avatar-btn');
    presetBtns.forEach(function (btn) {
      if (btn.getAttribute('data-url') === currentUrl) {
        btn.classList.add('selected');
      } else {
        btn.classList.remove('selected');
      }
    });
  }

  // Global exports for inline HTML event handlers
  global.handleAvatarFileSelect = handleAvatarFileSelect;
  global.selectPresetAvatar = selectPresetAvatar;
  global.updatePresetAvatarSelection = updatePresetAvatarSelection;

  // Custom Web Component registration
  if (typeof customElements !== 'undefined' && !customElements.get('edit-profile-modal')) {
    customElements.define('edit-profile-modal', class extends HTMLElement {
      connectedCallback() {
        if (!this.innerHTML.trim()) {
          this.innerHTML = EDIT_PROFILE_MODAL_HTML;
          EditProfileModal.initEvents();
        }
      }
    });
  }

  // Auto-mount when DOM is ready
  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function () {
        EditProfileModal.mount();
      });
    } else {
      EditProfileModal.mount();
    }
  }

  global.EditProfileModal = EditProfileModal;

})(typeof window !== 'undefined' ? window : this);

