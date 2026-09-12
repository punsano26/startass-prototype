# STARTASS Modal Components (`components/modals/`)

This directory contains standardized, reusable, decoupled modal components for the STARTASS Auction platform prototype. Every modal is architected with a standalone HTML markup template (`.html`) and an accompanying JavaScript controller (`.js`) supporting automatic mounting, Web Component tags, and standard programmatic APIs.

---

## Catalog of Modals

| # | Modal Component | Component Container ID | Tag / Class | Primary Files |
|---|-----------------|------------------------|-------------|---------------|
| 1 | **AuctionDetailModal** | `#auctionDetailModalContainer` | `<auction-detail-modal>` | `AuctionDetailModal.html`, `AuctionDetailModal.js` |
| 2 | **AuctionBidModal** | `#auctionBidModalContainer` | `<auction-bid-modal>` | `AuctionBidModal.html`, `AuctionBidModal.js` |
| 3 | **EscrowPaymentModal** | `#escrowPaymentModalContainer` | `<escrow-payment-modal>` | `EscrowPaymentModal.html`, `EscrowPaymentModal.js` |
| 4 | **CreateAuctionModal** | `#createAuctionModalContainer` | `<create-auction-modal>` | `CreateAuctionModal.html`, `CreateAuctionModal.js` |
| 5 | **EditProfileModal** | `#editProfileModalContainer` | `<edit-profile-modal>` | `EditProfileModal.html`, `EditProfileModal.js` |
| 6 | **ManageBankModal** | `#manageBankModalContainer` | `<manage-bank-modal>` | `ManageBankModal.html`, `ManageBankModal.js` |
| 7 | **ReportUserModal** | `#reportUserModalContainer` | `<report-user-modal>` | `ReportUserModal.html`, `ReportUserModal.js` |

---

## 1. `AuctionDetailModal` (รายละเอียดรายการประมูล)

Reusable modal component for displaying auction item specifications, seller provenance, multi-image gallery thumbnail switching, horizontal pricing/timeline matrix, and bidding CTA guards.

### Files
- **`AuctionDetailModal.html`**: Clean, standalone HTML markup template (`#detailModal`).
- **`AuctionDetailModal.js`**: JavaScript component controller providing automatic mounting, Web Component `<auction-detail-modal>` support, image gallery switcher, and helper methods.

### How to Use
```html
<!-- COMPONENT: Auction Item Detail Modal -->
<div id="auctionDetailModalContainer"></div>

<!-- Modal Components -->
<script src="../components/modals/AuctionDetailModal.js"></script>
<script src="../js/main.js"></script>
```

---

## 2. `AuctionBidModal` (เสนอราคาประมูลสินค้า)

Reusable modal component for submitting live auction bids, checking current highest bid vs minimum next bid increment, tapping 2x2 quick-increment buttons, and viewing real-time bid history.

### Files
- **`AuctionBidModal.html`**: Clean, standalone HTML markup template (`#bidModal`).
- **`AuctionBidModal.js`**: JavaScript component controller providing automatic mounting, Web Component `<auction-bid-modal>` support, increment calculators, and validation guards.

### How to Use
```html
<!-- COMPONENT: Auction Bid Modal -->
<div id="auctionBidModalContainer"></div>

<!-- Modal Components -->
<script src="../components/modals/AuctionBidModal.js"></script>
<script src="../js/main.js"></script>
```

### JavaScript API
```javascript
// Open bid modal for an auction item
AuctionBidModal.open('AUC-001');

// Close bid modal
AuctionBidModal.close();

// Adjust quick increment (+฿10,000)
AuctionBidModal.setIncrement(10000);

// Submit current bid
AuctionBidModal.submit();
```

---

## 3. `EscrowPaymentModal` (ชำระเงินเข้า Escrow Vault [ Dealer ])

Reusable modal component for auction winners (Dealer) to transfer winning funds into the STARTASS Escrow Vault system, featuring 10-day inspection protection guarantee, PromptPay QR, Bank Transfer, and Wallet options.

### Files
- **`EscrowPaymentModal.html`**: Clean, standalone HTML markup template (`#escrowPaymentModal`).
- **`EscrowPaymentModal.js`**: JavaScript component controller providing automatic mounting, Web Component `<escrow-payment-modal>` support, payment method switching, and payment execution.

### How to Use
```html
<!-- COMPONENT: Escrow Payment Modal -->
<div id="escrowPaymentModalContainer"></div>

<!-- Modal Components -->
<script src="../components/modals/EscrowPaymentModal.js"></script>
<script src="../js/main.js"></script>
```

---

## 4. `CreateAuctionModal` (สร้างโพสต์ประมูลสินค้าใหม่)

Reusable modal component for creating new auction listings, featuring a 2-column layout with product metadata, starting price, minimum bid increment select, start/end dates, specifications, and a multi-image drag-and-drop upload zone with live thumbnail gallery.

### Files
- **`CreateAuctionModal.html`**: Clean, standalone HTML markup template (`#createModal`).
- **`CreateAuctionModal.js`**: JavaScript component controller providing automatic mounting, Web Component `<create-auction-modal>` support, multi-image upload dropzone, live thumbnails, and form submission.

### How to Use
```html
<!-- COMPONENT: Create Auction Listing Modal -->
<div id="createAuctionModalContainer"></div>

<!-- Modal Components -->
<script src="../components/modals/CreateAuctionModal.js"></script>
<script src="../js/main.js"></script>
```

### JavaScript API
```javascript
// Open modal
CreateAuctionModal.open();

// Close modal
CreateAuctionModal.close();

// Reset form & uploaded files
CreateAuctionModal.reset();
```

---

## 5. `EditProfileModal` (แก้ไขข้อมูลโปรไฟล์ส่วนตัว)

Reusable modal component for editing user profile information, including profile avatar URL with real-time preview, full name, nickname/pseudonym, and bio/collector description.

### Files
- **`EditProfileModal.html`**: Clean, standalone HTML markup template (`#editProfileModal`).
- **`EditProfileModal.js`**: JavaScript component controller providing automatic mounting, Web Component `<edit-profile-modal>` support, image preview handler, and profile update sync.

### How to Use
```html
<!-- COMPONENT: Edit Profile Modal -->
<div id="editProfileModalContainer"></div>

<!-- Modal Components -->
<script src="../components/modals/EditProfileModal.js"></script>
<script src="../js/main.js"></script>
```

### JavaScript API
```javascript
// Open modal with current profile data
EditProfileModal.open();

// Close modal
EditProfileModal.close();

// Save profile updates
EditProfileModal.save(event);
```

---

## 6. `ManageBankModal` (จัดการบัญชีธนาคาร)

Reusable modal component for managing payout bank accounts, featuring an interactive luxury virtual bank card preview with dynamic chip/wifi badges, Thai commercial bank selection, account number auto-formatting, and account holder verification.

### Files
- **`ManageBankModal.html`**: Clean, standalone HTML markup template (`#manageBankModal`).
- **`ManageBankModal.js`**: JavaScript component controller providing automatic mounting, Web Component `<manage-bank-modal>` support, bank card theme switcher, and input formatting.

### How to Use
```html
<!-- COMPONENT: Manage Bank Account Modal -->
<div id="manageBankModalContainer"></div>

<!-- Modal Components -->
<script src="../components/modals/ManageBankModal.js"></script>
<script src="../js/main.js"></script>
```

### JavaScript API
```javascript
// Open modal with prefilled bank data
ManageBankModal.open();

// Close modal
ManageBankModal.close();

// Select bank by code (e.g. 'kbank', 'scb', 'bbl')
ManageBankModal.setBank('kbank');
```

---

## 7. `ReportUserModal` (รายงานผู้ใช้งาน)

Reusable modal component for submitting user misconduct or security reports to the STARTASS Trust & Safety team. Includes target user summary banner, categorized radio reasons (counterfeit, shill bidding, fake profile, refusal to deliver, harassment, other), and detailed evidence textarea.

### Files
- **`ReportUserModal.html`**: Clean, standalone HTML markup template (`#reportUserModal`).
- **`ReportUserModal.js`**: JavaScript component controller providing automatic mounting, Web Component `<report-user-modal>` support, target user data injection, and report submission.

### How to Use
```html
<!-- COMPONENT: Report User Modal -->
<div id="reportUserModalContainer"></div>

<!-- Modal Components -->
<script src="../components/modals/ReportUserModal.js"></script>
<script src="../js/main.js"></script>
```

### JavaScript API
```javascript
// Open report modal for a specific user
ReportUserModal.open({
  name: 'Apex Classic Motoring LLC',
  nick: '@ApexMotors_NY',
  avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&q=80'
});

// Close modal
ReportUserModal.close();

// Submit report
ReportUserModal.submit(event);
```

---

## DOM Elements & Bindings Summary

### `AuctionDetailModal` Elements (`#detailModal`)
| Element ID | Description |
| :--- | :--- |
| `#detailModal` | Modal backdrop container with `.modal-backdrop` |
| `#detailImg` | Main preview image element |
| `#detailThumbnailsStrip` | Multi-image thumbnail gallery strip |
| `#detailCategory` | Category badge tag |
| `#detailTitle` | Auction item title heading |
| `#detailCurrentBid` | Current highest bid display (emerald green) |
| `#detailSellerBox` | Seller provenance card |
| `#detailSellerAvatar` | Seller avatar image |
| `#detailSellerName` | Seller display name |
| `#detailSellerNick` | Seller `@nickname` pill |
| `#detailSellerRating` | Seller star rating & reviews count |
| `#detailSellerProfileLink`| Link to seller profile page (`OtherProfileDetail.html`) |
| `#detailDesc` | Full item description |
| `#detailStartDate` | Auction start date/time |
| `#detailStartPrice` | Minimum reserve starting price (highlighted) |
| `#detailEndDate` | Auction conclusion date/time |
| `#detailModalBidBtn` | Dynamic bidding CTA with lock guards |

### `AuctionBidModal` Elements (`#bidModal`)
| Element ID | Description |
| :--- | :--- |
| `#bidModal` | Modal backdrop container with `.modal-backdrop` |
| `#bidModalTitle` | Modal title heading (`เสนอราคาประมูลสินค้า`) |
| `#modalPreviewImg` | Compact item thumbnail preview |
| `#modalPreviewCategory` | Item category badge |
| `#modalPreviewTitle` | Item title heading |
| `#modalBidLockNotice` | Notice banner when bidding is locked (e.g. self-bid) |
| `#modalCurrentBid` | Current highest bid display (emerald green) |
| `#modalMinNextBid` | Minimum next required bid (gold accent) |
| `#bidAmountInput` | Numeric bid input field |
| `#modalBidHistory` | Real-time recent bids list |
| `#modalSubmitBidBtn` | Submit bid button with validation guards |

### `EscrowPaymentModal` Elements (`#escrowPaymentModal`)
| Element ID | Description |
| :--- | :--- |
| `#escrowPaymentModal` | Modal backdrop container with `.modal-backdrop` |
| `#escrowModalImg` | Won auction item thumbnail preview |
| `#escrowModalCategory` | Item category badge |
| `#escrowModalTitle` | Item title heading |
| `#escrowModalSellerName` | Seller name |
| `#escrowModalWinningBid` | Net winning bid amount |
| `#escrowModalTotalAmount` | Total required payment to Escrow |
| `#methodPanelPromptPay` | PromptPay QR code display panel |
| `#methodPanelBank` | Bank transfer details (Kasikornbank Escrow Vault) |
| `#methodPanelWallet` | STARTASS Escrow Wallet balance panel |
| `#btnConfirmEscrowPayment` | Confirm payment button with verification simulation |

### `CreateAuctionModal` Elements (`#createModal`)
| Element ID | Description |
| :--- | :--- |
| `#createModal` | Modal backdrop container with `.modal-backdrop` |
| `#createAuctionForm` | Listing creation form |
| `#createTitle` | Product title input |
| `#createCategory` | Product category select |
| `#createStatus` | Post status (active/draft) |
| `#createStartPrice` | Starting bid price input |
| `#createBidIncrement` | Minimum bid increment select |
| `#createStartDate` / `#createEndDate` | Auction schedule datetime-local inputs |
| `#createSpecs` | Specifications / highlights input |
| `#createDescription` | Detailed product description textarea |
| `#imageDropZone` | Drag-and-drop file upload zone |
| `#createImageFile` | Hidden multiple file input |
| `#createImagePreview` / `#previewImg` | Active image preview display |
| `#createThumbnailsStrip` | Multi-image thumbnail gallery strip |
| `#createImageUrl` | Direct image URL fallback input |

### `EditProfileModal` Elements (`#editProfileModal`)
| Element ID | Description |
| :--- | :--- |
| `#editProfileModal` | Modal backdrop container with `.modal-backdrop` |
| `#editProfileForm` | Profile edit form |
| `#editAvatarPreview` | Live avatar image preview |
| `#editAvatarUrl` | Avatar image URL input |
| `#editFullName` | Full name input |
| `#editNickname` | Market nickname / handle input |
| `#editBio` | Bio / collector description textarea |

### `ManageBankModal` Elements (`#manageBankModal`)
| Element ID | Description |
| :--- | :--- |
| `#manageBankModal` | Modal backdrop container with `.modal-backdrop` |
| `#virtualBankCard` | Luxury interactive card preview with dynamic bank skin |
| `#vCardBankBadge` | Bank badge logo text |
| `#vCardNumber` | Formatted card account number preview |
| `#vCardHolderName` | Card holder name preview |
| `#vCardBankName` | Selected bank full name preview |
| `#manageBankForm` | Bank account form |
| `#bankModalSelect` | Thai commercial bank select dropdown |
| `#bankModalAccNumber` | Account number input with automatic formatting |
| `#bankModalAccName` | Account holder name input |

### `ReportUserModal` Elements (`#reportUserModal`)
| Element ID | Description |
| :--- | :--- |
| `#reportUserModal` | Modal backdrop container with `.modal-backdrop` |
| `#reportUserForm` | Report submission form |
| `#reportTargetAvatar` | Avatar of the user being reported |
| `#reportTargetName` | Display name of the user being reported |
| `#reportTargetNick` | Handle / nickname of the user being reported |
| `input[name="reportReason"]` | Radio options for report violation category |
| `#reportDetails` | Additional details and evidence textarea |
