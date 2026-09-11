# STARTASS Modal Components (`components/modals/`)

This directory contains standardized, reusable modal components for the STARTASS Auction platform prototype.

---

## 1. `AuctionDetailModal` (รายละเอียดรายการประมูล)

Reusable modal component for displaying auction item specifications, verified seller provenance, multi-image gallery thumbnail switching, pricing matrix, and bidding CTA guards.

### Files

- **`AuctionDetailModal.html`**: Clean, standalone HTML markup template.
- **`AuctionDetailModal.js`**: JavaScript component controller providing automatic mounting, Web Component `<auction-detail-modal>` support, event handling, and helper methods.

### How to Use

#### Method A: Component Mount Container (Recommended)

In your HTML page, add the mount container placeholder where you want the component to reside:

```html
<!-- COMPONENT: Auction Item Detail Modal -->
<div id="auctionDetailModalContainer"></div>

<!-- Modal Components -->
<script src="../components/modals/AuctionDetailModal.js"></script>
<script src="../js/main.js"></script>
```

#### Method B: Web Component Tag

```html
<!-- Web Component -->
<auction-detail-modal></auction-detail-modal>

<!-- Modal Components -->
<script src="../components/modals/AuctionDetailModal.js"></script>
<script src="../js/main.js"></script>
```

#### Method C: Automatic Body Mounting

Simply load the script before `main.js`. If neither container exists, the component will automatically mount to `document.body`:

```html
<script src="../components/modals/AuctionDetailModal.js"></script>
<script src="../js/main.js"></script>
```

### JavaScript API

```javascript
// Programmatically open modal for an auction item ID
AuctionDetailModal.open('AUC-001');

// Programmatically close modal
AuctionDetailModal.close();

// Mount into a custom DOM target
AuctionDetailModal.mount('#customContainer');
```

---

## 2. DOM Elements & Bindings

The component mounts `#detailModal` with the following key sub-elements:

| Element ID | Description |
| :--- | :--- |
| `#detailModal` | Modal backdrop container with `.modal-backdrop` |
| `#detailImg` | Main preview image element |
| `#detailThumbnailsStrip` | Multi-image thumbnail gallery strip |
| `#detailCategory` | Category badge tag |
| `#detailTitle` | Auction item title heading |
| `#detailCurrentBid` | Current highest bid display (emerald green) |
| `#detailSellerBox` | Verified seller provenance card |
| `#detailSellerAvatar` | Seller avatar image |
| `#detailSellerName` | Seller display name |
| `#detailSellerNick` | Seller `@nickname` pill |
| `#detailSellerRating` | Seller star rating & reviews count |
| `#detailSellerProfileLink`| Link to seller profile page (`OtherProfileDetail.html`) |
| `#detailDesc` | Full item description |
| `#detailSpecs` | Authenticated checklist bullet points |
| `#detailStartDate` | Auction start date/time |
| `#detailStartPrice` | Minimum reserve starting price |
| `#detailEndDate` | Auction conclusion date/time |
| `#detailModalBidBtn` | Dynamic bidding CTA with lock guards |
