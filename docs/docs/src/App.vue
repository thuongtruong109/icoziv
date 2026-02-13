<template>
  <div :class="{ dark: isDarkMode }">
    <div class="container">
      <header class="header">
        <div class="brand-group">
          <img
            src="https://raw.githubusercontent.com/thuongtruong109/icoziv/refs/heads/main/public/logo.png"
            alt="Logo"
          />
          <div class="brand">
            <h1 class="brand-text">Icoziv</h1>
            <p class="brand-tagline">Instantly flex your skills</p>
          </div>
        </div>
        <div class="header-right">
          <div class="controls">
            <a href="./about.html" class="action-button" aria-label="About">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                <path d="M12 17h.01" />
              </svg>
            </a>

            <a
              href="./contributors.html"
              target="_blank"
              class="action-button"
              aria-label="Contributors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M18 21a8 8 0 0 0-16 0" />
                <circle cx="10" cy="8" r="5" />
                <path d="M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3" />
              </svg>
            </a>

            <a
              href="https://github.com/thuongtruong109/icoziv"
              target="_blank"
              class="action-button github-button"
              aria-label="GitHub Repository"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 256 256"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M128.001 30C72.7791 30 28 74.7708 28 130.001C28 174.184 56.6533 211.668 96.3867 224.891C101.384 225.817 103.219 222.722 103.219 220.081C103.219 217.696 103.126 209.819 103.083 201.463C75.2631 207.512 69.3927 189.664 69.3927 189.664C64.8437 178.105 58.2894 175.032 58.2894 175.032C49.2163 168.825 58.9733 168.953 58.9733 168.953C69.0151 169.658 74.3026 179.258 74.3026 179.258C83.2217 194.546 97.6965 190.126 103.403 187.571C104.301 181.107 106.892 176.696 109.752 174.199C87.5405 171.67 64.1913 163.095 64.1913 124.778C64.1913 113.86 68.0977 104.939 74.4947 97.9362C73.4564 95.4175 70.0335 85.2465 75.4635 71.4722C75.4635 71.4722 83.8609 68.7845 102.971 81.7226C110.948 79.5069 119.502 78.3958 128.001 78.3577C136.499 78.3958 145.061 79.5069 153.052 81.7226C172.139 68.7845 180.525 71.4722 180.525 71.4722C185.968 85.2465 182.544 95.4175 181.505 97.9362C187.917 104.939 191.797 113.86 191.797 124.778C191.797 163.187 168.403 171.644 146.135 174.119C149.722 177.223 152.918 183.308 152.918 192.638C152.918 206.018 152.802 216.787 152.802 220.081C152.802 222.742 154.602 225.86 159.671 224.878C199.383 211.64 228 174.169 228 130.001C228 74.7708 183.227 30 128.001 30ZM65.4536 172.453C65.2333 172.95 64.4517 173.099 63.7396 172.758C63.0143 172.432 62.6069 171.754 62.8421 171.256C63.0574 170.744 63.8406 170.602 64.5643 170.945C65.2913 171.271 65.7053 171.955 65.4536 172.453ZM70.3725 176.842C69.8956 177.285 68.9633 177.079 68.3307 176.38C67.6766 175.683 67.554 174.751 68.0376 174.302C68.5294 173.86 69.4336 174.067 70.0893 174.764C70.7434 175.47 70.8709 176.395 70.3725 176.842ZM73.7471 182.458C73.1344 182.884 72.1325 182.485 71.5132 181.595C70.9004 180.706 70.9004 179.64 71.5264 179.212C72.1474 178.785 73.1344 179.169 73.762 180.052C74.373 180.956 74.373 182.023 73.7471 182.458ZM79.4542 188.962C78.9061 189.566 77.7386 189.404 76.8841 188.579C76.0098 187.773 75.7663 186.629 76.3161 186.024C76.8709 185.418 78.045 185.589 78.9061 186.407C79.7738 187.211 80.0387 188.364 79.4542 188.962ZM86.8301 191.157C86.5883 191.941 85.4639 192.297 84.3312 191.964C83.2002 191.621 82.46 190.704 82.6885 189.912C82.9237 189.124 84.053 188.753 85.194 189.109C86.3234 189.45 87.0652 190.361 86.8301 191.157ZM95.2242 192.089C95.2523 192.913 94.2919 193.597 93.1029 193.612C91.9073 193.639 90.9402 192.971 90.9269 192.16C90.9269 191.327 91.8659 190.65 93.0615 190.63C94.2505 190.607 95.2242 191.269 95.2242 192.089ZM103.47 191.773C103.613 192.577 102.787 193.404 101.606 193.624C100.445 193.836 99.3702 193.339 99.2229 192.541C99.0788 191.716 99.92 190.89 101.079 190.676C102.262 190.471 103.32 190.955 103.47 191.773Z"
                  fill="currentColor"
                />
              </svg>
            </a>

            <button
              class="action-button"
              @click="toggleDarkMode"
              aria-label="Toggle theme"
            >
              <svg
                v-if="!isDarkMode"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2" />
                <path d="M12 20v2" />
                <path d="m4.93 4.93 1.41 1.41" />
                <path d="m17.66 17.66 1.41 1.41" />
                <path d="M2 12h2" />
                <path d="M20 12h2" />
                <path d="m6.34 17.66-1.41 1.41" />
                <path d="m19.07 4.93-1.41 1.41" />
              </svg>
            </button>

            <button
              class="action-button"
              @click="openSettingsModal"
              aria-label="Settings"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path
                  d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"
                />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </button>
          </div>
          <div class="header-info">
            <span>{{ icons.length }} icons</span>
          </div>
        </div>
      </header>

      <div class="main-content">
        <aside class="cart-section" v-if="cartCount > 0">
          <div class="subheader">
            <h2 class="section-title">Your Stack ({{ cartCount }})</h2>
            <button class="clear-button" @click="clearCart">Clear</button>
          </div>
          <div class="icon-grid">
            <div
              v-for="icon in cart"
              :key="icon"
              class="icon-card in-cart-sidebar"
              @click="toggleCart(icon)"
              :data-tooltip="icon"
            >
              <div class="icon-preview-wrapper">
                <img
                  :src="`https://raw.githubusercontent.com/thuongtruong109/icoziv/main/icons/${icon}`"
                  :alt="icon"
                />
              </div>
            </div>
          </div>
          <div class="cart-footer">
            <button
              class="copy-button"
              @click="openCopyModal"
              :disabled="!cartCount"
            >
              Copy Stack
            </button>
          </div>
        </aside>

        <main class="icon-list-main">
          <div class="sticky-controls" :class="{ active: isSticky }">
            <div class="controls-row">
              <div class="search-wrapper">
                <svg
                  class="search-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
                <input
                  type="text"
                  v-model="searchQuery"
                  placeholder="Search icons..."
                />
              </div>
              <div class="controls-right">
                <div class="filter-wrapper">
                  <div
                    class="custom-dropdown"
                    :class="{ open: showCategoryDropdown }"
                  >
                    <button
                      class="action-button dropdown-button"
                      @click="toggleCategoryDropdown"
                    >
                      <span>{{
                        currentFilter === 'all'
                          ? 'All Categories'
                          : currentFilter.charAt(0).toUpperCase() +
                            currentFilter.slice(1)
                      }}</span>
                      <svg
                        class="dropdown-arrow"
                        :class="{ rotated: showCategoryDropdown }"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </button>
                    <div
                      class="dropdown-menu horizontal-dropdown"
                      v-show="showCategoryDropdown"
                    >
                      <div
                        class="dropdown-option"
                        :class="{ selected: currentFilter === 'all' }"
                        @click="setCategoryFilter('all')"
                      >
                        <span>All Categories</span>
                        <svg
                          v-if="currentFilter === 'all'"
                          class="check-icon"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <div
                        v-for="category in categories"
                        :key="category"
                        class="dropdown-option"
                        :class="{ selected: currentFilter === category }"
                        @click="setCategoryFilter(category)"
                      >
                        <span>{{
                          category.charAt(0).toUpperCase() + category.slice(1)
                        }}</span>
                        <svg
                          v-if="currentFilter === category"
                          class="check-icon"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="view-mode-section">
                  <div
                    class="custom-dropdown"
                    :class="{ open: showViewModeDropdown }"
                    @click="toggleViewModeDropdown"
                  >
                    <button class="action-button dropdown-button">
                      <span>{{
                        viewMode === 'pagination'
                          ? 'Pagination'
                          : 'Infinite Scroll'
                      }}</span>
                      <svg
                        class="dropdown-arrow"
                        :class="{ rotated: showViewModeDropdown }"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </button>
                    <div class="dropdown-menu" v-show="showViewModeDropdown">
                      <div
                        class="dropdown-option"
                        :class="{ selected: viewMode === 'pagination' }"
                        @click="setViewMode('pagination')"
                      >
                        <span>Pagination</span>
                        <svg
                          v-if="viewMode === 'pagination'"
                          class="check-icon"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <div
                        class="dropdown-option"
                        :class="{ selected: viewMode === 'infinite' }"
                        @click="setViewMode('infinite')"
                      >
                        <span>Infinite Scroll</span>
                        <svg
                          v-if="viewMode === 'infinite'"
                          class="check-icon"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-if="isLoading" class="loading-indicator">Loading icons...</div>
          <div v-else class="icon-grid">
            <div
              v-for="icon in displayedIcons"
              :key="icon"
              class="icon-card"
              :class="{ 'in-cart': cart.includes(icon) }"
              @click="toggleCart(icon)"
              :data-tooltip="icon"
            >
              <div class="icon-preview-wrapper">
                <img
                  :src="`https://raw.githubusercontent.com/thuongtruong109/icoziv/main/icons/${icon}`"
                  :alt="icon"
                />
                <span class="icon-name">{{ icon }}</span>
              </div>
              <div v-if="cart.includes(icon)" class="tick-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="3"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </div>
            </div>
          </div>

          <!-- Pagination Controls -->
          <div
            v-if="viewMode === 'pagination' && totalPages > 1"
            class="pagination-controls"
          >
            <div class="pagination-info">
              Showing {{ (currentPage - 1) * itemsPerPage + 1 }} -
              {{ Math.min(currentPage * itemsPerPage, filteredIcons.length) }}
              of {{ filteredIcons.length }} icons
            </div>
            <div class="pagination-buttons">
              <button
                class="pagination-btn"
                :disabled="!hasPrevPage"
                @click="prevPage"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M15 18l-6-6 6-6" />
                </svg>
                Previous
              </button>

              <div class="page-numbers">
                <button
                  v-for="page in Math.min(5, totalPages)"
                  :key="page"
                  class="page-number"
                  :class="{ active: page === currentPage }"
                  @click="goToPage(page)"
                >
                  {{ page }}
                </button>
                <span v-if="totalPages > 5" class="page-dots">...</span>
                <button
                  v-if="totalPages > 5"
                  class="page-number"
                  :class="{ active: totalPages === currentPage }"
                  @click="goToPage(totalPages)"
                >
                  {{ totalPages }}
                </button>
              </div>

              <button
                class="pagination-btn"
                :disabled="!hasNextPage"
                @click="nextPage"
              >
                Next
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>

    <!-- Copy Modal -->
    <div v-if="showCopyModal" class="modal-overlay" @click="closeCopyModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <div class="modal-title">Copy Picked Icons</div>
          <button class="modal-close" @click="closeCopyModal">&times;</button>
        </div>
        <div class="copy-field-group">
          <label class="copy-field-label">Copy image URL</label>
          <div class="copy-input-wrapper">
            <div class="copy-display">{{ generateImageUrl() }}</div>
            <button
              class="copy-action-btn"
              @click="copyToClipboard(generateImageUrl())"
            >
              Copy
            </button>
          </div>
        </div>
        <div class="copy-field-group">
          <label class="copy-field-label">Copy as Markdown</label>
          <div class="copy-input-wrapper">
            <div class="copy-display">{{ generateMarkdown() }}</div>
            <button
              class="copy-action-btn"
              @click="copyToClipboard(generateMarkdown())"
            >
              Copy
            </button>
          </div>
        </div>
        <div class="copy-field-group">
          <label class="copy-field-label">Copy as HTML</label>
          <div class="copy-input-wrapper">
            <div class="copy-display">{{ generateHtml() }}</div>
            <button
              class="copy-action-btn"
              @click="copyToClipboard(generateHtml())"
            >
              Copy
            </button>
          </div>
        </div>
        <div class="modal-actions">
          <button
            class="modal-copy-btn"
            @click="copyToClipboard(cart.join(','))"
          >
            Copy All Names
          </button>
        </div>
      </div>
    </div>

    <!-- Settings Modal -->
    <div
      v-if="showSettingsModal"
      class="modal-overlay"
      @click="closeSettingsModal"
    >
      <div class="modal-content settings-panel" @click.stop>
        <div class="modal-header">
          <div class="modal-title">Settings</div>
          <button class="modal-close" @click="closeSettingsModal">
            &times;
          </button>
        </div>

        <div class="settings-group">
          <div class="settings-label">
            <span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="12" cy="12" r="5" />
                <path d="M12 8a2 2 0 1 0 4 4" />
                <path d="M12 8a2 2 0 1 0 4 4" />
              </svg>
              Theme
            </span>
          </div>
          <div class="theme-toggle-group">
            <button
              class="theme-option"
              :class="{ active: themePreference === 'light' }"
              @click="setTheme('light')"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2" />
                <path d="M12 20v2" />
                <path d="m4.93 4.93 1.41 1.41" />
                <path d="m17.66 17.66 1.41 1.41" />
                <path d="M2 12h2" />
                <path d="M20 12h2" />
                <path d="m6.34 17.66-1.41 1.41" />
                <path d="m19.07 4.93-1.41 1.41" />
              </svg>
              <span>Light</span>
            </button>
            <button
              class="theme-option"
              :class="{ active: themePreference === 'dark' }"
              @click="setTheme('dark')"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
              </svg>
              <span>Dark</span>
            </button>
            <button
              class="theme-option active"
              :class="{ active: themePreference === 'auto' }"
              @click="setTheme('auto')"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="12" cy="12" r="4" />
                <path d="M12 8a2 2 0 1 0 4 4" />
              </svg>
              <span>Auto</span>
            </button>
          </div>
        </div>

        <div class="settings-group">
          <div class="settings-label">
            <span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              Display Name
            </span>
          </div>
          <div class="display-toggle-group">
            <button
              class="display-option active"
              :class="{ active: displayNameMode === 'tooltip' }"
              @click="setDisplayMode('tooltip')"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path
                  d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
                />
              </svg>
              <span>Tooltip</span>
            </button>
            <button
              class="display-option"
              :class="{ active: displayNameMode === 'inside' }"
              @click="setDisplayMode('inside')"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <rect width="18" height="18" x="3" y="3" rx="2" />
                <path d="M7 7h.01" />
                <path d="M7 12h10" />
                <path d="M7 17h10" />
              </svg>
              <span>Inside</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Toast -->
    <div class="toast" :class="{ show: showToast }">
      {{ toastMessage }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue';
import CryptoJS from 'crypto-js';

const icons = ref([]);
const cart = ref([]);
const searchQuery = ref('');
const isDarkMode = ref(localStorage.getItem('darkMode') === 'true');
const isSticky = ref(false);
const isLoading = ref(true);

// Additional reactive variables
const iconGroups = ref({});
const currentFilter = ref('all');
const viewMode = ref(localStorage.getItem('icoziv-view-mode') || 'pagination');
const currentPage = ref(1);
const itemsPerPage = ref(50);
const themePreference = ref(
  localStorage.getItem('icoziv-theme-preference') || 'auto',
);
const displayNameMode = ref(
  localStorage.getItem('icoziv-display-name-mode') || 'tooltip',
);
const showCopyModal = ref(false);
const showSettingsModal = ref(false);
const showToast = ref(false);
const toastMessage = ref('');
const showViewModeDropdown = ref(false);
const showCategoryDropdown = ref(false);

// Constants
const CACHE_KEY = 'icoziv_icons_cache';
const CACHE_EXPIRY_MS = 24 * 60 * 60 * 1000;
const base_url_prefix =
  'https://raw.githubusercontent.com/thuongtruong109/icoziv/main/icons';
const base_url = 'https://i.icoziv.workers.dev';
const iconDataBaseUrl = `https://raw.githubusercontent.com/thuongtruong109/icoziv/refs/heads/main/public/icoziv.json`;

// Icon categories for filtering
const iconCategories = {
  frameworks: [
    'react',
    'angular',
    'vue',
    'svelte',
    'next',
    'nuxt',
    'ember',
    'backbone',
    'jquery',
    'django',
    'flask',
    'laravel',
    'symfony',
    'rails',
    'spring',
    'express',
    'fastapi',
    'nestjs',
    'gatsby',
    'astro',
    'remix',
    'qwik',
    'solid',
    'preact',
    'alpine',
  ],
  languages: [
    'javascript',
    'typescript',
    'python',
    'java',
    'csharp',
    'cpp',
    'c',
    'go',
    'rust',
    'php',
    'ruby',
    'swift',
    'kotlin',
    'dart',
    'scala',
    'perl',
    'lua',
    'r',
    'julia',
    'elixir',
    'haskell',
    'clojure',
    'ocaml',
    'fsharp',
    'solidity',
    'zig',
    'nim',
    'crystal',
    'bash',
    'powershell',
    'shell',
  ],
  tools: [
    'git',
    'docker',
    'kubernetes',
    'jenkins',
    'github',
    'gitlab',
    'vscode',
    'vim',
    'neovim',
    'emacs',
    'sublime',
    'atom',
    'intellij',
    'webstorm',
    'pycharm',
    'webpack',
    'vite',
    'rollup',
    'parcel',
    'turbopack',
    'npm',
    'yarn',
    'pnpm',
    'bun',
    'babel',
    'eslint',
    'prettier',
    'jest',
    'mocha',
    'vitest',
    'cypress',
    'playwright',
    'selenium',
    'puppeteer',
    'storybook',
    'chromatic',
    'figma',
    'sketch',
    'adobe',
    'xd',
    'postman',
    'insomnia',
    'notion',
    'obsidian',
    'slack',
    'discord',
    'teams',
    'zoom',
    'jira',
    'trello',
    'asana',
    'confluence',
    'linear',
  ],
  databases: [
    'mongodb',
    'postgresql',
    'mysql',
    'redis',
    'sqlite',
    'mariadb',
    'oracle',
    'mssql',
    'dynamodb',
    'cassandra',
    'couchdb',
    'neo4j',
    'influxdb',
    'timescale',
    'firebase',
    'supabase',
    'appwrite',
    'pocketbase',
    'prisma',
    'sequelize',
    'typeorm',
    'drizzle',
    'graphql',
    'hasura',
    'apollo',
    'elasticsearch',
    'algolia',
    'meilisearch',
  ],
  cloud: [
    'aws',
    'azure',
    'gcp',
    'google',
    'cloud',
    'digitalocean',
    'heroku',
    'vercel',
    'netlify',
    'cloudflare',
    'railway',
    'render',
    'fly',
    'linode',
    'vultr',
    'oracle',
    'ibm',
    'alibaba',
    'terraform',
    'pulumi',
    'ansible',
    'vagrant',
    'cloudformation',
  ],
  mobile: [
    'android',
    'ios',
    'flutter',
    'reactnative',
    'react-native',
    'ionic',
    'cordova',
    'capacitor',
    'xamarin',
    'nativescript',
    'expo',
    'swift',
    'kotlin',
    'objective',
    'swiftui',
  ],
  css: [
    'css',
    'sass',
    'scss',
    'less',
    'stylus',
    'tailwind',
    'bootstrap',
    'bulma',
    'foundation',
    'materialize',
    'semantic',
    'ant',
    'antd',
    'chakra',
    'mui',
    'material',
    'mantine',
    'daisyui',
    'shadcn',
    'radix',
    'headless',
    'styled',
    'emotion',
    'stitches',
    'panda',
    'unocss',
    'windicss',
  ],
  testing: [
    'jest',
    'mocha',
    'jasmine',
    'vitest',
    'cypress',
    'playwright',
    'selenium',
    'puppeteer',
    'testing-library',
    'testcafe',
    'webdriverio',
    'karma',
    'ava',
    'tape',
    'chai',
    'sinon',
    'enzyme',
  ],
  devops: [
    'docker',
    'kubernetes',
    'jenkins',
    'circleci',
    'travis',
    'gitlab',
    'github',
    'actions',
    'bitbucket',
    'azure',
    'pipelines',
    'terraform',
    'ansible',
    'chef',
    'puppet',
    'vagrant',
    'packer',
    'consul',
    'vault',
    'nomad',
    'prometheus',
    'grafana',
    'datadog',
    'newrelic',
    'elk',
    'splunk',
    'nginx',
    'apache',
    'caddy',
    'traefik',
    'haproxy',
  ],
  cms: [
    'wordpress',
    'drupal',
    'joomla',
    'strapi',
    'contentful',
    'sanity',
    'ghost',
    'payload',
    'keystonejs',
    'directus',
    'cockpit',
    'butter',
    'prismic',
    'storyblok',
    'craft',
    'statamic',
    'tina',
  ],
  ecommerce: [
    'shopify',
    'woocommerce',
    'magento',
    'prestashop',
    'opencart',
    'bigcommerce',
    'commercejs',
    'saleor',
    'medusa',
    'vendure',
    'spree',
    'sylius',
  ],
  design: [
    'figma',
    'sketch',
    'adobe',
    'xd',
    'illustrator',
    'photoshop',
    'invision',
    'framer',
    'zeplin',
    'abstract',
    'marvel',
    'principle',
    'origami',
    'protopie',
    'axure',
    'balsamiq',
    'canva',
    'affinity',
    'gimp',
    'inkscape',
    'blender',
    'unity',
    'unreal',
    'godot',
  ],
  ai: [
    'tensorflow',
    'pytorch',
    'keras',
    'scikit',
    'pandas',
    'numpy',
    'jupyter',
    'anaconda',
    'opencv',
    'huggingface',
    'openai',
    'langchain',
    'anthropic',
    'cohere',
    'replicate',
    'stability',
    'midjourney',
    'dalle',
  ],
  blockchain: [
    'ethereum',
    'bitcoin',
    'solana',
    'polygon',
    'avalanche',
    'cardano',
    'polkadot',
    'cosmos',
    'near',
    'solidity',
    'web3',
    'metamask',
    'hardhat',
    'truffle',
    'ganache',
    'ethers',
    'wagmi',
    'rainbow',
    'walletconnect',
  ],
  os: [
    'windows',
    'linux',
    'ubuntu',
    'debian',
    'fedora',
    'arch',
    'centos',
    'redhat',
    'suse',
    'mint',
    'macos',
    'apple',
    'android',
    'ios',
    'freebsd',
    'unix',
  ],
  runtime: [
    'nodejs',
    'node',
    'deno',
    'bun',
    'npm',
    'yarn',
    'pnpm',
    'electron',
    'tauri',
    'nwjs',
    'cordova',
    'capacitor',
  ],
};

// Watchers
watch(isDarkMode, val => localStorage.setItem('darkMode', val));

watch(searchQuery, () => {
  currentPage.value = 1;
});

watch(currentFilter, () => {
  currentPage.value = 1;
});

// Click outside handler for dropdown
onMounted(() => {
  const handleClickOutside = event => {
    const viewModeDropdown = document.querySelector(
      '.view-mode-section .custom-dropdown',
    );
    const categoryDropdown = document.querySelector(
      '.filter-wrapper .custom-dropdown',
    );

    if (viewModeDropdown && !viewModeDropdown.contains(event.target)) {
      showViewModeDropdown.value = false;
    }

    if (categoryDropdown && !categoryDropdown.contains(event.target)) {
      showCategoryDropdown.value = false;
    }
  };
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});

// Computed properties
const filteredIcons = computed(() => {
  let filtered = icons.value;

  // Search filter
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(icon => icon.toLowerCase().includes(query));
  }

  // Category filter
  if (currentFilter.value !== 'all') {
    filtered = filtered.filter(icon => {
      // Get category from iconGroups
      const iconData = iconGroups.value[icon];
      return iconData && iconData.category === currentFilter.value;
    });
  }

  return filtered;
});

const cartCount = computed(() => cart.value.length);

const categories = computed(() => {
  const cats = new Set(); // Don't include 'all' here
  Object.values(iconGroups.value).forEach(iconData => {
    if (iconData.category) {
      cats.add(iconData.category);
    }
  });
  return Array.from(cats).sort();
});

const paginatedIcons = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredIcons.value.slice(start, end);
});

const displayedIcons = computed(() => {
  return viewMode.value === 'pagination'
    ? paginatedIcons.value
    : filteredIcons.value;
});

const totalPages = computed(() => {
  return Math.ceil(filteredIcons.value.length / itemsPerPage.value);
});

const hasNextPage = computed(() => currentPage.value < totalPages.value);
const hasPrevPage = computed(() => currentPage.value > 1);

// Functions
function getCachedData() {
  const cached = localStorage.getItem(CACHE_KEY);
  if (!cached) return null;

  const { data, timestamp } = JSON.parse(cached);
  if (Date.now() - timestamp < CACHE_EXPIRY_MS) {
    return data;
  }
  localStorage.removeItem(CACHE_KEY);
  return null;
}

function setCachedData(data) {
  const cacheData = {
    data,
    timestamp: Date.now(),
  };
  localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
}

function processJsonData(jsonData) {
  const dataToProcess = Array.isArray(jsonData)
    ? jsonData
    : Object.keys(jsonData);
  const icons = {};

  for (const key of dataToProcess) {
    const filename = `${key}.svg`;
    icons[filename] = {
      filename: filename,
      displayName: key,
      category: 'other',
    };

    // Assign category based on predefined categories
    for (const [categoryName, categoryIcons] of Object.entries(
      iconCategories,
    )) {
      if (categoryIcons.includes(key.toLowerCase())) {
        icons[filename].category = categoryName;
        break;
      }
    }
  }

  return icons;
}

async function initData() {
  try {
    const cachedData = getCachedData();
    if (cachedData) {
      iconGroups.value = processJsonData(cachedData);
      icons.value = Object.keys(iconGroups.value);
      return;
    }

    const response = await fetch(iconDataBaseUrl);
    if (!response.ok) {
      throw new Error(
        `Failed to load ${iconDataBaseUrl} | Status: ${response.status}`,
      );
    }

    const data = await response.json();
    let decryptedData = [];

    if (!Array.isArray(data)) {
      for (const keyHex in data) {
        const cipherBase64 = data[keyHex];
        const keyWordArray = CryptoJS.enc.Hex.parse(keyHex);
        const cipherWords = CryptoJS.enc.Base64.parse(cipherBase64);

        const decrypted = CryptoJS.AES.decrypt(
          { ciphertext: cipherWords },
          keyWordArray,
          {
            iv: CryptoJS.enc.Hex.parse('00000000000000000000000000000000'),
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
          },
        );

        const plain = decrypted.toString(CryptoJS.enc.Utf8);
        try {
          decryptedData = decryptedData.concat(JSON.parse(plain));
        } catch (parseError) {
          console.error(
            `Error parsing decrypted JSON for key ${keyHex}:`,
            parseError,
          );
        }
      }
    } else {
      decryptedData = data;
    }

    setCachedData(decryptedData);
    iconGroups.value = processJsonData(decryptedData);
    icons.value = Object.keys(iconGroups.value);
  } catch (err) {
    console.error('Error loading icons:', err);
    icons.value = [];
  } finally {
    isLoading.value = false;
  }
}

function toggleCart(icon) {
  const idx = cart.value.indexOf(icon);
  if (idx === -1) {
    cart.value.push(icon);
    showToastMessage(`+ Added ${icon}`);
  } else {
    cart.value.splice(idx, 1);
    showToastMessage(`- Removed ${icon}`);
  }
}

function clearCart() {
  if (cart.value.length === 0) {
    showToastMessage('Cart is already empty');
    return;
  }
  cart.value = [];
  showToastMessage('Cleared all picked icons');
}

function copyStack() {
  if (cart.value.length === 0) {
    showToastMessage('Cart is empty. Nothing to copy.');
    return;
  }

  const stackText = cart.value.join(',');
  navigator.clipboard
    .writeText(stackText)
    .then(() => {
      showToastMessage('Copied to clipboard!');
    })
    .catch(() => {
      showToastMessage('Failed to copy text.');
    });
}

function showToastMessage(message) {
  toastMessage.value = message;
  showToast.value = true;
  setTimeout(() => {
    showToast.value = false;
  }, 2000);
}

function toggleDarkMode() {
  isDarkMode.value = !isDarkMode.value;
}

function openSettingsModal() {
  showSettingsModal.value = true;
}

function closeSettingsModal() {
  showSettingsModal.value = false;
}

function toggleViewModeDropdown() {
  showViewModeDropdown.value = !showViewModeDropdown.value;
}

function setViewMode(mode) {
  viewMode.value = mode;
  showViewModeDropdown.value = false;
  localStorage.setItem('icoziv-view-mode', mode);
  if (mode === 'infinite') {
    currentPage.value = 1;
  }
  showToastMessage(
    `View mode set to ${mode === 'pagination' ? 'Pagination' : 'Infinite Scroll'}`,
  );
}

function toggleCategoryDropdown() {
  showCategoryDropdown.value = !showCategoryDropdown.value;
}

function setCategoryFilter(category) {
  currentFilter.value = category;
  showCategoryDropdown.value = false;
  showToastMessage(
    `Category filter set to ${category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}`,
  );
}

function openCopyModal() {
  if (cart.value.length === 0) {
    showToastMessage('Cart is empty. Nothing to copy.');
    return;
  }
  showCopyModal.value = true;
}

function setTheme(theme) {
  themePreference.value = theme;
  localStorage.setItem('icoziv-theme-preference', theme);

  if (theme === 'auto') {
    isDarkMode.value = window.matchMedia(
      '(prefers-color-scheme: dark)',
    ).matches;
  } else {
    isDarkMode.value = theme === 'dark';
  }
}

function setDisplayMode(mode) {
  displayNameMode.value = mode;
  localStorage.setItem('icoziv-display-name-mode', mode);
  showToastMessage(`Display mode set to ${mode}`);
}

function generateImageUrl() {
  if (cart.value.length === 0) return '';
  const themeQuery = isDarkMode.value ? '' : '&t=light';
  return `${base_url}/icons?i=${cart.value.join(',')}${themeQuery}`;
}

function generateMarkdown() {
  const imageUrl = generateImageUrl();
  return imageUrl ? `[![Icoziv-icons](${imageUrl})](${base_url})` : '';
}

function generateHtml() {
  const imageUrl = generateImageUrl();
  return imageUrl
    ? `<a href="${base_url}" title="Open Icoziv"><img src="${imageUrl}" alt="Icoziv-icons"></a>`
    : '';
}

async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    showToastMessage('Copied to clipboard!');
    closeCopyModal();
  } catch (err) {
    console.error('Failed to copy: ', err);
    showToastMessage('Failed to copy text.');
  }
}

function closeCopyModal() {
  showCopyModal.value = false;
}

function nextPage() {
  if (hasNextPage.value) {
    currentPage.value++;
  }
}

function prevPage() {
  if (hasPrevPage.value) {
    currentPage.value--;
  }
}

function goToPage(page) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
}

function resetPagination() {
  currentPage.value = 1;
}

// Lifecycle
onMounted(async () => {
  await initData();

  // Setup scroll handler
  window.onscroll = () => {
    isSticky.value = window.scrollY > 100;
  };
});
</script>

<style>
/* Đừng quên thêm CSS gốc của bạn vào đây, lưu ý đổi selector body.dark thành .dark */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  scroll-behavior: smooth;
}

::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

::-webkit-scrollbar-track {
  background: rgba(226, 232, 240, 0.3);
  border-radius: 10px;
}

.dark ::-webkit-scrollbar-track {
  background: rgba(39, 39, 42, 0.3);
}

::-webkit-scrollbar-thumb {
  background: rgba(148, 163, 184, 0.5);
  border-radius: 10px;
  transition: all 0.3s ease;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(99, 102, 241, 0.6);
}

.dark ::-webkit-scrollbar-thumb {
  background: rgba(113, 113, 122, 0.5);
}

.dark ::-webkit-scrollbar-thumb:hover {
  background: rgba(168, 85, 247, 0.6);
}

/* Firefox scrollbar */
* {
  scrollbar-width: thin;
  scrollbar-color: rgba(148, 163, 184, 0.5) rgba(226, 232, 240, 0.3);
}

.dark * {
  scrollbar-color: rgba(113, 113, 122, 0.5) rgba(39, 39, 42, 0.3);
}

body {
  font-family:
    'Inter',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    'Roboto',
    'Oxygen',
    'Ubuntu',
    sans-serif;
  background: #fafafa;
  color: #09090b;
  transition:
    background 0.3s ease,
    color 0.3s ease;
  line-height: 1.5;
  min-height: 100vh;
  position: relative;
}
body::after {
  content: '';
  width: 100%;
  height: 25vh;
  position: absolute;
  display: block;
  top: 0px;
  z-index: -1;
  background-image: linear-gradient(rgba(199, 246, 218, 0.63), #fafafa);
}
.dark::after {
  background-image: linear-gradient(rgba(24, 24, 27, 0.8), #0a0a0a);
}
.dark {
  background: #0a0a0a;
  color: #fafafa;
}

@keyframes shimmer {
  0% {
    background-position: -200% center;
  }
  100% {
    background-position: 200% center;
  }
}
@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
    opacity: 0.9;
  }
  50% {
    transform: scale(1.05);
    opacity: 1;
  }
}
.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 1.5rem;
}
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 3rem;
  gap: 1.5rem;
  flex-wrap: wrap;
}
.brand-group {
  display: flex;
  align-items: flex-center;
}

.brand-group > img {
  width: 48px;
  height: 48px;
  position: relative;
}
.brand-group > img::before {
  content: '';
  position: absolute;
  inset: 2px;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.25) 0%,
    rgba(255, 255, 255, 0) 100%
  );
  pointer-events: none;
}
.brand-group > img::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.25),
    transparent
  );
  background-size: 200% 100%;
  animation: shimmer 3s ease-in-out infinite;
  pointer-events: none;
}
.brand {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 48px;
  margin-left: 1rem;
}
.brand-text {
  font-size: 1.7rem;
  font-weight: 700;
  background: linear-gradient(135deg, #0ef1a6 0%, #3babf6 70%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 1px 2px 2px rgba(99, 102, 241, 0.25);
  transition: all 0.3s ease;
  font-family: 'Urbanist', 'Poppins', 'Inter', sans-serif;
}
.brand-tagline {
  font-size: 0.65rem;
  font-weight: 500;
  color: #5898c4e8;
  letter-spacing: 0.2px;
}
.controls {
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
}
.header-right {
  display: flex;
  flex-direction: column;
}
.header-info {
  display: flex;
  justify-content: flex-end;
  font-size: 0.75rem;
  margin-top: 0.5rem;
}
.header-info span {
  color: #71717ad5;
  margin: 0 0.25rem;
}
.search-wrapper {
  position: relative;
  width: 18rem;
  display: block;
}

.search-wrapper input {
  width: 100%;
  padding: 0.5rem 1rem 0.5rem 2.5rem;
  border: 1px solid #d1d5db;
  background: white;
  color: #374151;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  transition: all 0.2s ease;
}

.dark .search-wrapper input {
  border-color: #4b5563;
  background: #1f2937;
  color: #d1d5db;
}

.search-wrapper input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.dark .search-wrapper input:focus {
  border-color: #60a5fa;
  box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.1);
}

.search-wrapper input::placeholder {
  color: #9ca3af;
}

.dark .search-wrapper input::placeholder {
  color: #6b7280;
}
.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #64748b;
  pointer-events: none;
  transition: all 0.3s ease;
  width: 1.125rem;
  height: 1.125rem;
  z-index: 10;
}
.sticky-controls:focus-within .search-icon {
  color: #3b82f6;
}
/* Filter Dropdown Styles */
.filter-dropdown {
  position: relative;
  margin-right: 0.75rem;
}
.filter-button {
  padding: 0.75rem 2.5rem 0.75rem 1rem;
  border: none;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px);
  color: #1e293b;
  font-size: 0.9rem;
  font-family:
    'Inter',
    -apple-system,
    BlinkMacSystemFont,
    sans-serif;
  font-weight: 500;
  min-width: 140px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: left;
  gap: 0.75rem;
}
.dark .filter-button {
  background: rgba(24, 24, 27, 0.7);
  color: #fafafa;
}
.filter-button:hover {
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
}
.dark .filter-button:hover {
  background: rgba(39, 39, 42, 0.9);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}
.filter-dropdown.open .dropdown-arrow {
  transform: rotate(180deg);
}
.filter-menu {
  position: absolute;
  top: calc(100% + 0.5rem);
  left: 0;
  min-width: 220px;
  max-height: 400px;
  overflow-y: auto;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1000;
}
.dark .filter-menu {
  background: rgba(24, 24, 27, 0.95);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}
.filter-dropdown.open .filter-menu {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}
/* Custom scrollbar for filter menu */
.filter-menu::-webkit-scrollbar {
  width: 6px;
}
.filter-menu::-webkit-scrollbar-track {
  background: rgba(226, 232, 240, 0.3);
  border-radius: 10px;
}
.dark .filter-menu::-webkit-scrollbar-track {
  background: rgba(39, 39, 42, 0.3);
}
.filter-menu::-webkit-scrollbar-thumb {
  background: rgba(148, 163, 184, 0.5);
  border-radius: 10px;
}
.filter-menu::-webkit-scrollbar-thumb:hover {
  background: rgba(99, 102, 241, 0.6);
}
.dark .filter-menu::-webkit-scrollbar-thumb {
  background: rgba(113, 113, 122, 0.5);
}
.dark .filter-menu::-webkit-scrollbar-thumb:hover {
  background: rgba(168, 85, 247, 0.6);
}
.filter-option {
  padding: 0.75rem 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #475569;
  font-size: 0.9rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.75rem;
}
.dark .filter-option {
  color: #94a3b8;
}
.filter-option:hover {
  background: rgba(59, 130, 246, 0.1);
  color: #3b82f6;
}
.dark .filter-option:hover {
  background: rgba(59, 130, 246, 0.15);
  color: #3b82f6;
}
.filter-option.selected {
  background: rgba(59, 130, 246, 0.1);
  color: #3b82f6;
  font-weight: 600;
}
.dark .filter-option.selected {
  background: rgba(59, 130, 246, 0.15);
}
.filter-option .check-icon {
  width: 1rem;
  height: 1rem;
  color: #3b82f6;
  opacity: 0;
  transition: opacity 0.2s ease;
  margin-left: auto;
}
.filter-icon-wrapper {
  width: 24px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.filter-option.selected .check-icon {
  opacity: 1;
}
input[type='text'] {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.75rem;
  border: none;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px);
  color: #1e293b;
  font-size: 0.9rem;
  font-family:
    'Inter',
    -apple-system,
    BlinkMacSystemFont,
    sans-serif;
  outline: none;
  transition: all 0.3s ease;
  font-weight: 500;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
}
.dark input[type='text'] {
  background: rgba(24, 24, 27, 0.7);
  color: #fafafa;
}
input[type='text']:focus {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
  background: rgba(255, 255, 255, 0.9);
}
.dark input[type='text']:focus {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  background: rgba(24, 24, 27, 0.9);
}
input[type='text']::placeholder {
  color: #94a3b8;
}
.action-button {
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px);
  color: #64748b;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  font-size: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
}
.dark .action-button {
  background: rgba(24, 24, 27, 0.7);
  color: #a1a1aa;
}
.action-button:hover {
  background: rgba(255, 255, 255, 0.9);
  color: #3b82f6;
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
}
.dark .action-button:hover {
  background: rgba(39, 39, 42, 0.9);
  color: #3b82f6;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}
.github-button {
  text-decoration: none;
}

.main-content {
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;
}

.cart-section {
  width: 280px;
  flex-shrink: 0;
  position: sticky;
  top: 0;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px);
  border: none;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
  align-self: flex-start;
}

.dark .cart-section {
  background: rgba(24, 24, 27, 0.7);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.icon-list-main {
  flex-grow: 1;
  min-width: 0;
}

.sticky-controls {
  position: sticky;
  top: 0;
  z-index: 50;
  padding-bottom: 1rem;
  margin: 0;
  transition: background 0.3s ease;
}
.sticky-controls.active {
  background: #fafafa;
}
.dark .sticky-controls.active {
  background: #0a0a0a;
}

.controls-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
}

.controls-right {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-shrink: 0;
}

.icon-list-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1rem;
  padding-top: 0.5rem;
}

.subheader {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.75rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e4e4e7;
}
.dark .subheader {
  border-color: #27272a;
}
.section-title {
  font-size: 0.9375rem;
  font-weight: 600;
  color: #09090b;
  letter-spacing: -0.01em;
}
.dark .section-title {
  color: #fafafa;
}
.cart-controls {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
#loadingIndicator {
  font-size: 1.1rem;
  font-weight: 500;
  animation: pulse 1.5s infinite;
}

.dark #loadingIndicator {
  color: #a1a1aa;
}
.copy-button {
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: #ffffff;
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.15);
  height: auto;
}
.copy-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(59, 130, 246, 0.25);
}
.copy-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.1);
}
.dark .copy-button {
  background: linear-gradient(135deg, #a855f7, #9333ea);
  box-shadow: 0 2px 8px rgba(168, 85, 247, 0.15);
}
.dark .copy-button:hover {
  box-shadow: 0 4px 16px rgba(168, 85, 247, 0.25);
}
.dark .copy-button:disabled {
  box-shadow: 0 2px 8px rgba(168, 85, 247, 0.1);
}
.icon-grid {
  grid-template-columns: repeat(auto-fill, minmax(55px, 1fr));
  gap: 0.5rem;
  display: grid;
  padding-top: 0.5rem;
}
#cartGrid {
  grid-template-columns: repeat(auto-fill, minmax(35px, 1fr));
  gap: 0.35rem;
  padding: 0;
}
.icon-card {
  background: #ffffff;
  border: 2px solid transparent;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: visible;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
  padding-top: 100%;
  width: 100%;
  height: 0;
  isolation: isolate;
}
.dark .icon-card {
  background: #18181b;
  border-color: transparent;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
}
.icon-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  z-index: 100;
  border: 1px solid transparent;
  background-image:
    linear-gradient(#ffffff, #ffffff),
    linear-gradient(135deg, #6366f1, #a855f7, #ec4899);
  background-origin: border-box;
  background-clip: padding-box, border-box;
}
.dark .icon-card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  background-image:
    linear-gradient(#18181b, #18181b),
    linear-gradient(135deg, #6366f1, #a855f7, #ec4899);
}

/* Custom Tooltip */
.icon-card::before {
  content: attr(data-tooltip);
  position: absolute;
  bottom: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%) translateY(-5px);
  background: rgba(0, 0, 0, 0.9);
  color: #ffffff;
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  pointer-events: none;
  z-index: 99999;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.icon-card:hover::before {
  opacity: 1;
  visibility: visible;
  transform: translateX(-50%) translateY(0);
}

.dark .icon-card::before {
  background: rgba(250, 250, 250, 0.95);
  color: #09090b;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
}

.icon-preview-wrapper,
.icon-info {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}
.icon-preview-wrapper {
  top: 0;
  bottom: 0;
  padding: 0.5rem;
  background: transparent;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 10px;
}
.icon-card.show-name-inside .icon-preview-wrapper {
  flex-direction: column;
  justify-content: center;
  gap: 0.25rem;
  padding: 0.375rem;
}
.dark .icon-preview-wrapper {
  background: transparent;
}
.icon-card:hover .icon-preview-wrapper {
  background: transparent;
}
.icon-preview {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transform: translateY(0);
}
.icon-card.show-name-inside .icon-preview {
  width: 16px;
  height: 16px;
}
.icon-preview img {
  max-width: 20%;
  max-height: 20%;
  margin: 0.25rem;
  transition: all 0.25s ease;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.08));
}
.icon-card:hover .icon-preview img {
  transform: scale(1.15) rotate(-5deg);
}
/* Icon info - hidden, using tooltip instead */
.icon-info {
  display: none;
}
.icon-name {
  display: none;
  font-size: 0.7rem;
  font-weight: 500;
  color: #52525b;
  text-align: center;
  padding: 0 0.25rem;
  margin-top: 0.125rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
}
.dark .icon-name {
  color: #a1a1aa;
}
.icon-card.show-name-inside .icon-name {
  display: block;
}
.icon-card.show-name-inside::before {
  display: none;
}
.icon-card.in-cart .icon-preview-wrapper::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 12px;
  background: rgba(99, 102, 241, 0.1);
  z-index: 10;
  transition: background 0.2s ease;
}
.dark .icon-card.in-cart .icon-preview-wrapper::before {
  background: rgba(168, 85, 247, 0.1);
}
.view-mode-section {
  display: flex;
  flex-direction: row;
  gap: 0;
  padding: 0;
  margin: 0;
  align-items: center;
  position: relative;
}

.view-mode-section label {
  display: none;
}

.view-mode-section select {
  display: none;
}

.custom-dropdown {
  position: relative;
  width: 175px;
}

.dropdown-button {
  width: auto;
  min-width: 120px;
  height: 40px;
  padding: 0.75rem 1rem;
  justify-content: space-between;
  text-align: left;
}

.dropdown-arrow {
  width: 1rem;
  height: 1rem;
  transition: transform 0.3s ease;
  color: #64748b;
  flex-shrink: 0;
  margin-left: auto;
}

.dark .dropdown-arrow {
  color: #94a3b8;
}

.custom-dropdown.open .dropdown-arrow {
  transform: rotate(180deg);
}

.dropdown-menu {
  position: absolute;
  top: calc(100% + 0.5rem);
  left: 50%;
  transform: translateX(-50%) translateY(-10px);
  min-width: 200px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1000;
}

.horizontal-dropdown {
  min-width: 280px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 0;
}

.dark .dropdown-menu {
  background: rgba(24, 24, 27, 0.95);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.custom-dropdown.open .dropdown-menu {
  opacity: 1;
  visibility: visible;
  transform: translateX(-50%) translateY(0);
}

.dropdown-option {
  padding: 0.75rem 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #475569;
  font-size: 0.85rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  border-radius: 0;
  min-height: 44px;
  position: relative;
}

.dropdown-option .check-icon {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 16px;
  height: 16px;
}

.dark .dropdown-option {
  color: #94a3b8;
}

.dropdown-option:hover {
  background: rgba(59, 130, 246, 0.1);
  color: #3b82f6;
}

.dark .dropdown-option:hover {
  background: rgba(59, 130, 246, 0.15);
  color: #3b82f6;
}

.dropdown-option.selected {
  background: rgba(59, 130, 246, 0.1);
  color: #3b82f6;
  font-weight: 600;
}

.dark .dropdown-option.selected {
  background: rgba(59, 130, 246, 0.15);
}

.dropdown-option .check-icon {
  width: 1rem;
  height: 1rem;
  color: #3b82f6;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.dropdown-option.selected .check-icon {
  opacity: 1;
}
#paginationControls {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin: 0;
}

#paginationControls button {
  padding: 0.625rem;
  border: none;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px);
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  font-family:
    'Inter',
    -apple-system,
    BlinkMacSystemFont,
    sans-serif;
  color: #475569;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
  outline: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-width: 38px;
  height: 38px;
  justify-content: center;
}

.dark #paginationControls button {
  background: rgba(24, 24, 27, 0.7);
  color: #94a3b8;
}

#paginationControls button svg {
  width: 1rem;
  height: 1rem;
}

#paginationControls button:hover:not(:disabled) {
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: #ffffff;
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 6px 20px rgba(59, 130, 246, 0.25);
}

.dark #paginationControls button:hover:not(:disabled) {
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  box-shadow: 0 6px 20px rgba(59, 130, 246, 0.35);
}

#paginationControls button:disabled {
  cursor: not-allowed;
  opacity: 0.3;
  background: rgba(226, 232, 240, 0.3);
  color: #94a3b8;
  transform: none;
  box-shadow: none;
}

.dark #paginationControls button:disabled {
  background: rgba(39, 39, 42, 0.3);
  color: #52525b;
}

#paginationControls .page-info {
  font-size: 0.875rem;
  font-weight: 600;
  color: #475569;
  padding: 0.625rem 1rem;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px);
  border: none;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
  min-width: 80px;
  text-align: center;
}

.dark #paginationControls .page-info {
  background: rgba(24, 24, 27, 0.7);
  color: #94a3b8;
}

.icon-card.in-cart .tick-icon {
  display: flex;
  position: absolute;
  top: 0.3rem;
  right: 0.3rem;
  z-index: 10;
  width: 1rem;
  height: 1rem;
  background: #6366f1;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}
.icon-card.in-cart .tick-icon svg {
  width: 0.65rem;
  height: 0.65rem;
  color: #ffffff;
}
/* START: MODIFICATION 2 - Cart Item Styling Changes */
.icon-card.in-cart-sidebar {
  border: none;
  box-shadow: none;
  background: transparent;
  padding-top: 100%;
}
.dark .icon-card.in-cart-sidebar {
  background: transparent;
  border: none;
  box-shadow: none;
}
.icon-card.in-cart-sidebar:hover {
  transform: none;
  box-shadow: none;
  background-image: none;
}

/* Tooltip for cart items - show at bottom */
.icon-card.in-cart-sidebar::before {
  bottom: auto;
  top: calc(100% + 8px);
  transform: translateX(-50%);
}

.icon-card.in-cart-sidebar:hover::before {
  transform: translateX(-50%);
}

.icon-card.in-cart-sidebar .icon-preview-wrapper {
  bottom: 0;
  padding: 0.1875rem;
  background: transparent;
}
.icon-card.in-cart-sidebar .icon-preview {
  width: 24px;
  height: 24px;
}
.icon-card.in-cart-sidebar:hover .icon-preview img {
  transform: scale(1.05);
}
/* END: MODIFICATION 2 */

.empty-state {
  text-align: center;
  padding: 4rem 1rem;
  color: #71717a;
}
.empty-icon {
  width: 64px;
  height: 64px;
  margin: 0 auto 1.25rem;
  opacity: 0.4;
}
.empty-icon svg {
  width: 100%;
  height: 100%;
  display: block;
}
.empty-text {
  font-size: 1rem;
  font-weight: 500;
}
.toast {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background: #18181b;
  color: #fafafa;
  padding: 0.875rem 1.25rem;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  opacity: 0;
  transform: translateY(10px) scale(0.95);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  pointer-events: none;
  z-index: 1000;
  border: 1px solid #27272a;
}
.dark .toast {
  background: #fafafa;
  color: #18181b;
  border-color: #e4e4e7;
}
.toast.show {
  opacity: 1;
  transform: translateY(0) scale(1);
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  visibility: hidden;
  transition:
    opacity 0.3s ease,
    visibility 0.3s ease;
  z-index: 2000;
}
.modal-overlay.open {
  opacity: 1;
  visibility: visible;
}
.modal-content {
  background: #ffffff;
  border-radius: 12px;
  padding: 1.25rem;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  transform: scale(0.9);
  transition: transform 0.3s ease;
}
.modal-overlay.open .modal-content {
  transform: scale(1);
}
.dark .modal-content {
  background: #18181b;
  border: 1px solid #27272a;
}
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #e4e4e7;
}
.dark .modal-header {
  border-color: #27272a;
}
.modal-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #09090b;
}
.dark .modal-title {
  color: #fafafa;
}
.modal-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #71717a;
  cursor: pointer;
  transition: color 0.2s;
}
.modal-close:hover {
  color: #ef4444;
}
.copy-field-group {
  margin-bottom: 1rem;
}
.copy-field-label {
  display: block;
  font-size: 0.75rem;
  font-weight: 600;
  color: #3f3f46;
  margin-bottom: 0.25rem;
}
.dark .copy-field-label {
  color: #d4d4d8;
}
.copy-input-wrapper {
  display: flex;
  border: 1px solid #e4e4e7;
  border-radius: 6px;
  overflow: hidden;
  background: #ffffff;
}
.dark .copy-input-wrapper {
  background: #0a0a0a;
  border-color: #27272a;
}
.copy-display {
  flex-grow: 1;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  line-height: 1.2;
  color: #52525b;
  background: transparent;
  border: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-family:
    'Noto Sans',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
}
.dark .copy-display {
  color: #e4e4e7;
}
.copy-action-btn {
  padding: 0.5rem 1rem;
  background: #e5e7eb;
  color: #374151;
  border: none;
  border-left: 1px solid #e4e4e7;
  cursor: pointer;
  font-weight: 500;
  transition:
    background 0.2s,
    color 0.2s;
  flex-shrink: 0;
}
.dark .copy-action-btn {
  background: #27272a;
  color: #a1a1aa;
  border-color: #3f3f46;
}
.copy-action-btn:hover {
  background: #d1d5db;
}
.dark .copy-action-btn:hover {
  background: #3f3f46;
  color: #fafafa;
}
.modal-actions {
  margin-top: 1.5rem;
  display: flex;
  justify-content: flex-end;
}
.cart-footer {
  margin-top: 0.75rem;
  display: flex;
  justify-content: flex-end;
}
.clear-button {
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: #ef4444;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px);
  border: 1.5px solid rgba(239, 68, 68, 0.2);
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  box-shadow: 0 2px 8px rgba(239, 68, 68, 0.05);
}
.clear-button:hover:not(:disabled) {
  background: rgba(239, 68, 68, 0.1);
  border-color: rgba(239, 68, 68, 0.4);
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(239, 68, 68, 0.15);
}
.clear-button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
  border-color: rgba(239, 68, 68, 0.1);
}
.dark .clear-button {
  background: rgba(24, 24, 27, 0.7);
  color: #fca5a5;
  border-color: rgba(239, 68, 68, 0.3);
}
.dark .clear-button:hover:not(:disabled) {
  background: rgba(239, 68, 68, 0.15);
  border-color: rgba(239, 68, 68, 0.5);
  box-shadow: 0 4px 16px rgba(239, 68, 68, 0.2);
}
.modal-list {
  display: none;
}
.modal-copy-btn {
  display: none;
}

/* Settings Panel Styles */
.settings-panel {
  max-width: 480px;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.95),
    rgba(248, 250, 252, 0.95)
  );
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 24px;
  box-shadow:
    0 25px 50px -12px rgba(0, 0, 0, 0.15),
    0 0 0 1px rgba(255, 255, 255, 0.05);
  animation: modalSlideIn 0.3s ease-out;
  padding: 0.5rem;
}

@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: translateY(-20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.dark .settings-panel {
  background: linear-gradient(
    135deg,
    rgba(24, 24, 27, 0.95),
    rgba(39, 39, 42, 0.95)
  );
  border-color: rgba(255, 255, 255, 0.1);
}

.modal-header {
  padding: 1rem 1.25rem 0.75rem;
  border-bottom: 1px solid rgba(148, 163, 184, 0.1);
  background: linear-gradient(
    135deg,
    rgba(99, 102, 241, 0.05),
    rgba(168, 85, 247, 0.05)
  );
  border-radius: 24px 24px 0 0;
  position: relative;
  overflow: hidden;
}

.modal-header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(99, 102, 241, 0.03),
    rgba(168, 85, 247, 0.03)
  );
  pointer-events: none;
}

.dark .modal-header {
  border-color: rgba(148, 163, 184, 0.2);
  background: linear-gradient(
    135deg,
    rgba(99, 102, 241, 0.1),
    rgba(168, 85, 247, 0.1)
  );
}

.modal-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
  position: relative;
  z-index: 1;
  background: linear-gradient(135deg, #6366f1, #a855f7);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.dark .modal-title {
  color: #f1f5f9;
  background: linear-gradient(135deg, #a855f7, #ec4899);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 2rem;
  height: 2rem;
  border: none;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  color: #64748b;
  font-size: 1.125rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.modal-close:hover {
  background: rgba(255, 255, 255, 0.9);
  color: #334155;
  transform: scale(1.05);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
}

.dark .modal-close {
  background: rgba(39, 39, 42, 0.8);
  color: #94a3b8;
}

.dark .modal-close:hover {
  background: rgba(39, 39, 42, 0.9);
  color: #cbd5e1;
}

.settings-group {
  padding: 0.5rem 1rem;
  border-bottom: 1px solid rgba(148, 163, 184, 0.08);
  transition: all 0.2s ease;
  position: relative;
}

.settings-group:last-child {
  border-bottom: none;
  padding-bottom: 1.5rem;
}

.settings-group:hover {
  background: rgba(99, 102, 241, 0.02);
}

.dark .settings-group:hover {
  background: rgba(168, 85, 247, 0.05);
}

.settings-label {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.875rem;
  font-weight: 600;
  color: #334155;
  margin-bottom: 1rem;
  gap: 0.75rem;
}

.settings-label span:first-child svg {
  width: 1rem;
  height: 1rem;
  flex-shrink: 0;
}

.dark .settings-label {
  color: #e2e8f0;
}

.settings-value {
  font-size: 0.75rem;
  color: #6366f1;
  font-weight: 700;
  background: rgba(99, 102, 241, 0.1);
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  min-width: 2.5rem;
  text-align: center;
  transition: all 0.2s ease;
}

.dark .settings-value {
  color: #a855f7;
  background: rgba(168, 85, 247, 0.15);
}

.settings-slider {
  width: 100%;
  height: 8px;
  border-radius: 12px;
  background: linear-gradient(90deg, #e2e8f0, #f1f5f9);
  outline: none;
  -webkit-appearance: none;
  appearance: none;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
}

.settings-slider:hover {
  background: linear-gradient(90deg, #cbd5e1, #e2e8f0);
}

.dark .settings-slider {
  background: linear-gradient(90deg, #374151, #4b5563);
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.3);
}

.dark .settings-slider:hover {
  background: linear-gradient(90deg, #4b5563, #6b7280);
}

.settings-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: linear-gradient(135deg, #6366f1, #a855f7);
  cursor: pointer;
  box-shadow:
    0 2px 8px rgba(99, 102, 241, 0.3),
    0 0 0 2px rgba(255, 255, 255, 0.8);
  transition: all 0.2s ease;
  position: relative;
}

.settings-slider::-webkit-slider-thumb:hover {
  transform: scale(1.1);
  box-shadow:
    0 4px 12px rgba(99, 102, 241, 0.4),
    0 0 0 3px rgba(255, 255, 255, 0.9);
}

.dark .settings-slider::-webkit-slider-thumb {
  background: linear-gradient(135deg, #a855f7, #ec4899);
  box-shadow:
    0 2px 8px rgba(168, 85, 247, 0.3),
    0 0 0 2px rgba(24, 24, 27, 0.8);
}

.dark .settings-slider::-webkit-slider-thumb:hover {
  box-shadow:
    0 4px 12px rgba(168, 85, 247, 0.4),
    0 0 0 3px rgba(24, 24, 27, 0.9);
}

.settings-slider::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: linear-gradient(135deg, #6366f1, #a855f7);
  cursor: pointer;
  border: 2px solid rgba(255, 255, 255, 0.8);
  box-shadow: 0 2px 8px rgba(99, 102, 241, 0.3);
  transition: all 0.2s ease;
}

.settings-slider::-moz-range-thumb:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
}

.dark .settings-slider::-moz-range-thumb {
  background: linear-gradient(135deg, #a855f7, #ec4899);
  border-color: rgba(24, 24, 27, 0.8);
  box-shadow: 0 2px 8px rgba(168, 85, 247, 0.3);
}

.dark .settings-slider::-moz-range-thumb:hover {
  box-shadow: 0 4px 12px rgba(168, 85, 247, 0.4);
}

.theme-toggle-group,
.display-toggle-group {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(70px, 1fr));
  gap: 0.75rem;
  align-items: stretch;
  justify-items: center;
}

.theme-option,
.display-option {
  padding: 0.25rem 0.75rem;
  border: 2px solid rgba(148, 163, 184, 0.1);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(10px);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  text-align: center;
  font-size: 0.75rem;
  font-weight: 600;
  color: #475569;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  min-height: 40px;
  width: 100%;
  position: relative;
  overflow: hidden;
}

.theme-option::before,
.display-option::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(99, 102, 241, 0.05),
    rgba(168, 85, 247, 0.05)
  );
  opacity: 0;
  transition: opacity 0.3s ease;
}

.theme-option:hover,
.display-option:hover {
  border-color: rgba(99, 102, 241, 0.4);
  background: rgba(255, 255, 255, 0.8);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(99, 102, 241, 0.15);
}

.theme-option:hover::before,
.display-option:hover::before {
  opacity: 1;
}

.theme-option.active,
.display-option.active {
  background: linear-gradient(135deg, #6366f1, #a855f7);
  border-color: #6366f1;
  color: #ffffff;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

.theme-option.active::before,
.display-option.active::before {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.1),
    rgba(255, 255, 255, 0.05)
  );
  opacity: 1;
}

.dark .theme-option,
.dark .display-option {
  background: rgba(39, 39, 42, 0.6);
  border-color: rgba(148, 163, 184, 0.3);
  color: #94a3b8;
}

.dark .theme-option:hover,
.dark .display-option:hover {
  background: rgba(39, 39, 42, 0.8);
  border-color: rgba(168, 85, 247, 0.4);
  box-shadow: 0 8px 25px rgba(168, 85, 247, 0.15);
}

.dark .theme-option.active,
.dark .display-option.active {
  background: linear-gradient(135deg, #a855f7, #ec4899);
  border-color: #a855f7;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

.theme-option svg,
.display-option svg {
  width: 1rem;
  height: 1rem;
  transition: all 0.2s ease;
}

.theme-option.active svg,
.display-option.active svg {
  transform: scale(1.1);
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
}

.theme-option span,
.display-option span {
  font-size: 0.6875rem;
  font-weight: 500;
  letter-spacing: 0.025em;
}
@media (max-width: 768px) {
  .container {
    padding: 1.5rem 1rem;
  }
  .header {
    flex-direction: column;
    align-items: stretch;
    margin-bottom: 2rem;
  }
  .brand-group {
    align-items: center;
  }
  .brand {
    justify-content: center;
  }
  .brand-icon {
    width: 40px;
    height: 40px;
  }
  .sparkle {
    font-size: 22px;
  }
  .brand-text {
    font-size: 28px;
  }
  .brand-tagline {
    margin-left: 54px;
    text-align: center;
    font-size: 13px;
  }
  .search-wrapper {
    width: 100%;
  }
  .controls {
    width: 100%;
  }
  #loadingIndicator {
    font-size: 1.1rem;
    font-weight: 500;
    animation: pulse 1.5s infinite;
  }

  .dark #loadingIndicator {
    color: #a1a1aa;
  }
  .main-content {
    flex-direction: column;
    gap: 2rem;
  }

  .cart-section {
    width: 100%;
    position: relative;
    top: 0;
    padding: 0.75rem;
  }

  .icon-list-main {
    width: 100%;
  }

  .sticky-controls {
    padding: 0.5rem 0 0.5rem;
    margin: -1rem 0 0;
  }

  .icon-list-header {
    margin-bottom: 0.5rem;
  }

  .icon-grid {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 0.75rem;
  }
  #cartGrid {
    grid-template-columns: repeat(auto-fill, minmax(60px, 1fr));
    gap: 0.2rem;
  }
  .icon-preview {
    width: 48px;
    height: 48px;
    transform: none;
  }
  .icon-info {
    display: none;
  }
  .icon-name {
    display: none;
  }
  .empty-state {
    padding: 2rem 1rem;
  }
  .copy-button {
    padding: 0.3rem 0.6rem;
  }
}
#backToTopBtn {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 3rem;
  height: 3rem;
  z-index: 999;
  display: none;
  opacity: 0;
  visibility: hidden;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px);
  color: #64748b;
  cursor: pointer;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}
.dark #backToTopBtn {
  background: rgba(24, 24, 27, 0.7);
  color: #a1a1aa;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
}
#backToTopBtn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  background: rgba(255, 255, 255, 0.9);
}
.dark #backToTopBtn:hover {
  background: rgba(24, 24, 27, 0.9);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
}
#backToTopBtn.show {
  display: flex;
  opacity: 1;
  visibility: visible;
}

/* Pagination Styles */
.pagination-controls {
  margin-top: 2rem;
  padding: 1.5rem 0;
  border-top: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.dark .pagination-controls {
  border-top-color: #374151;
}

.pagination-info {
  font-size: 0.875rem;
  color: #64748b;
  font-weight: 500;
}

.dark .pagination-info {
  color: #9ca3af;
}

.pagination-buttons {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.pagination-btn {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px);
  color: #64748b;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
}

.dark .pagination-btn {
  background: rgba(24, 24, 27, 0.7);
  color: #a1a1aa;
}

.pagination-btn:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.9);
  color: #3b82f6;
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
}

.dark .pagination-btn:hover:not(:disabled) {
  background: rgba(39, 39, 42, 0.9);
  color: #3b82f6;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.page-numbers {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin: 0 1rem;
}

.page-number {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border: none;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px);
  color: #64748b;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
}

.dark .page-number {
  background: rgba(24, 24, 27, 0.7);
  color: #a1a1aa;
}

.page-number:hover {
  background: rgba(255, 255, 255, 0.9);
  color: #3b82f6;
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
}

.dark .page-number:hover {
  background: rgba(39, 39, 42, 0.9);
  color: #3b82f6;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.page-number.active {
  background: #3b82f6;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(59, 130, 246, 0.3);
}

.dark .page-number.active {
  background: #60a5fa;
  color: #1f2937;
  box-shadow: 0 4px 16px rgba(96, 165, 250, 0.3);
}

.page-dots {
  color: #9ca3af;
  font-weight: 500;
  user-select: none;
}

.dark .page-dots {
  color: #6b7280;
}

/* Responsive pagination */
@media (max-width: 640px) {
  .pagination-controls {
    padding: 1rem 0;
  }

  .pagination-buttons {
    flex-wrap: wrap;
    justify-content: center;
  }

  .page-numbers {
    margin: 0.5rem 0;
    order: -1;
    width: 100%;
    justify-content: center;
  }

  .pagination-btn {
    padding: 0.375rem 0.75rem;
    font-size: 0.8125rem;
  }
}

/* View Mode Selector Styles */
.filter-wrapper {
  display: flex;
  align-items: center;
}

.view-mode-section {
  display: flex;
  align-items: center;
}

.custom-dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-arrow {
  width: 16px;
  height: 16px;
  transition: transform 0.2s ease;
}

.dropdown-arrow.rotated {
  transform: rotate(180deg);
}

.dropdown-menu {
  position: absolute;
  top: calc(100% + 0.5rem);
  left: 50%;
  transform: translateX(-50%) translateY(-10px);
  min-width: 200px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1000;
}

.horizontal-dropdown {
  min-width: 280px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 0;
}

.dark .dropdown-menu {
  background: #1f2937;
  border-color: #4b5563;
  box-shadow:
    0 10px 15px -3px rgba(0, 0, 0, 0.3),
    0 4px 6px -2px rgba(0, 0, 0, 0.2);
}

.dropdown-option {
  padding: 0.75rem 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #475569;
  font-size: 0.85rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  border-radius: 0;
  min-height: 44px;
  position: relative;
}

.dropdown-option .check-icon {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 16px;
  height: 16px;
}

.dropdown-option:hover {
  background: rgba(59, 130, 246, 0.1);
  color: #3b82f6;
}

.dark .dropdown-option:hover {
  background: rgba(59, 130, 246, 0.2);
  color: #60a5fa;
}

.dropdown-option.selected {
  background: #eff6ff;
  color: #1d4ed8;
}

.dark .dropdown-option.selected {
  background: #1e3a8a;
  color: #60a5fa;
}

.check-icon {
  width: 16px;
  height: 16px;
  color: #1d4ed8;
}

.dark .check-icon {
  color: #60a5fa;
}
</style>
