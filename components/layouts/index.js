/**
 * ==========================================================================
 * STARTASS Layout Components Package
 * File: components/layouts/index.js
 * Description: Barrel export for Startass layout components (Navbar, Sidebar).
 * ==========================================================================
 */

(function (global) {
  'use strict';

  const AppLayout = {
    /**
     * Initializes all layout components on the current page.
     * @param {Object} [options]
     * @param {Object} [options.navbar] - Navbar configuration options
     * @param {Object} [options.sidebar] - Sidebar configuration options
     */
    init: function (options) {
      const opts = options || {};

      if (global.Navbar && typeof global.Navbar.mount === 'function') {
        global.Navbar.mount(null, opts.navbar);
      }

      if (global.Sidebar && typeof global.Sidebar.mount === 'function') {
        global.Sidebar.mount(null, opts.sidebar);
      }
    }
  };

  global.AppLayout = AppLayout;

})(typeof window !== 'undefined' ? window : this);
