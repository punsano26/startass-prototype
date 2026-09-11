# STARTASS Modal Components (`components/modals/`)

This directory contains standardized, reusable modal components for the STARTASS Auction platform prototype.

---

## 1. `AuctionDetailModal` (รายละเอียดรายการประมูล)

Reusable modal component for displaying auction item specifications, seller provenance, multi-image gallery thumbnail switching, horizontal pricing/timeline matrix, and bidding CTA guards.

### Files

- **`AuctionDetailModal.html`**: Clean, standalone HTML markup template.
- **`AuctionDetailModal.js`**: JavaScript component controller providing automatic mounting, Web Component `<auction-detail-modal>` support, event handling, and helper methods.

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

- **`AuctionBidModal.html`**: Clean, standalone HTML markup template.
- **`AuctionBidModal.js`**: JavaScript component controller providing automatic mounting, Web Component `<auction-bid-modal>` support, event handling, and helper methods.

### How to Use

#### Method A: Component Mount Container (Recommended)

```html
<!-- COMPONENT: Auction Bid Modal -->
<div id="auctionBidModalContainer"></div>

<!-- Modal Components -->
<script src="../components/modals/AuctionBidModal.js"></script>
<script src="../js/main.js"></script>
```

#### Method B: Web Component Tag

```html
<!-- Web Component -->
<auction-bid-modal></auction-bid-modal>

<!-- Modal Components -->
<script src="../components/modals/AuctionBidModal.js"></script>
<script src="../js/main.js"></script>
```

#### Method C: Automatic Body Mounting

Load the script before `main.js`. If neither container exists, the component will automatically mount to `document.body`:

```html
<script src="../components/modals/AuctionBidModal.js"></script>
<script src="../js/main.js"></script>
```

### JavaScript API

```javascript
// Programmatically open bid modal for an auction item ID
AuctionBidModal.open('AUC-001');

// Programmatically close bid modal
AuctionBidModal.close();

// Adjust quick increment (+฿10,000)
AuctionBidModal.setIncrement(10000);

// Submit current bid
AuctionBidModal.submit();
```

---

## 3. DOM Elements & Bindings Summary

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

---

## 3. `EscrowPaymentModal` (ชำระเงินเข้า Escrow Vault [ Dealer ])

Reusable modal component for auction winners (Dealer) to transfer winning funds into the STARTASS Escrow Vault system, with 10-day inspection protection guarantee, PromptPay QR, Bank Transfer, and Wallet options.

### Files

- **`EscrowPaymentModal.html`**: Clean, standalone HTML markup template.
- **`EscrowPaymentModal.js`**: JavaScript component controller providing automatic mounting, Web Component `<escrow-payment-modal>` support, payment method switching, and payment execution.

### How to Use

```html
<!-- COMPONENT: Escrow Payment Modal -->
<div id="escrowPaymentModalContainer"></div>

<!-- Modal Components -->
<script src="../components/modals/EscrowPaymentModal.js"></script>
<script src="../js/main.js"></script>
```

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
