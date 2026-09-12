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
          <!-- Avatar Preview & Input -->
          <div class="edit-profile-avatar-preview-box">
            <img id="editAvatarPreview" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80" alt="Avatar Preview" class="edit-avatar-img">
            <div class="edit-avatar-inputs">
              <label for="editAvatarUrl" style="display:block; font-size:0.85rem; color:var(--text-secondary); margin-bottom:6px;">
                ลิงก์รูปโปรไฟล์ (Avatar Image URL):
              </label>
              <input type="url" id="editAvatarUrl" class="composer-input" placeholder="https://..." oninput="previewAvatarFromInput(this)" style="width:100%; border-radius:var(--radius-sm);">
              <small style="color:var(--text-muted); font-size:0.75rem; margin-top:4px; display:block;">รองรับลิงก์รูปภาพ Unsplash หรือ Image CDN</small>
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
    }
  };

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
