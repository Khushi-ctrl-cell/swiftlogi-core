# Logistics Operations Hub

Build a complete, production-style Logistics Management SaaS web application UI.

IMPORTANT:
This is NOT a landing page, marketing website, e-commerce website, CRM, or generic admin template.

The application must be designed specifically for a courier/logistics management business based on the approved functional requirements.

TECH STACK:
- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- Responsive desktop-first SaaS architecture
- Prepare clean API service structure for a future Node.js + Express.js + MySQL backend
- Use reusable components and modular page architecture

DESIGN DIRECTION:
Create a clean, elegant, senior-developer-quality enterprise SaaS interface.

Use the following visual direction:

- Light neutral overall background
- White cards and surfaces
- Dark navy/charcoal sidebar
- Very subtle blue accent for primary actions
- Muted green for successful/completed states
- Muted amber/orange for pending/warning states
- Muted red only for errors, NDR, RTO, failed states
- Avoid bright neon colors
- Avoid gradients
- Avoid excessive shadows
- Avoid excessive rounded cards
- Use medium/small border radius
- Thin subtle borders
- Clean spacing
- Professional typography
- Compact but readable tables
- Minimal icons
- Consistent iconography using Lucide/shadcn icons
- No decorative illustrations
- No unnecessary animations
- No flashy dashboard effects

The UI should feel like a mature enterprise product built by an experienced senior frontend engineer.

Do NOT make it look like a startup landing page.

LAYOUT:

Desktop layout:
- Fixed dark sidebar
- Top navigation/header
- Main content area
- Breadcrumbs where useful
- Page title + short description
- Primary action button on the right
- Search/filter/action row
- Data tables
- Pagination
- Drawer/modal for create/edit/view operations where appropriate

Sidebar should contain:

Dashboard

Orders
  - All Orders
  - B2C Orders
  - B2B Orders
  - Create Order
  - Shipment Tracking

Partners
  - All Partners
  - Add Partner
  - KYC & Documents
  - Bank Details
  - Assigned Rates
  - Partner Access

Wallets
  - Main Wallet
  - Partner Wallets
  - Transactions
  - Passbook

Shipping Rates
  - B2C Rates
  - B2B Rates
  - Rate Upload
  - Assigned Rates

Courier Charges
  - Charge Configuration
  - Weight Slabs
  - Zone Configuration

Couriers
  - Courier List
  - Courier Configuration
  - Credentials
  - Integration Status

COD / NDR / RTO
  - COD Remittances
  - COD Reconciliation
  - NDR
  - RTO

Billing & Finance
  - Billing
  - Invoices
  - Payments
  - Additional Charges
  - Taxes

Claims & Disputes
  - Disputes
  - Lost Claims
  - Damage Claims
  - Settlements

Reports
  - Order Reports
  - Shipment Reports
  - Wallet Reports
  - COD Reports
  - Partner Reports
  - Finance Reports

Master Data
  - Couriers
  - Partners
  - Zones
  - Weight Slabs
  - Charges
  - Statuses
  - NDR Reasons
  - RTO Reasons
  - Taxes
  - Services

Settings
  - Company Profile
  - Invoice Settings
  - Numbering
  - Notifications
  - Operational Configuration

Audit Logs


ADMIN DASHBOARD:

Create a professional operational dashboard.

Top KPI cards:
- Total Shipments
- B2C Shipments
- B2B Shipments
- Pending
- In Transit
- Delivered
- NDR
- RTO

Below KPIs:
- Shipment Overview chart
- Shipment Status chart
- Revenue/Finance overview
- Recent Orders
- Recent Activity
- Top Couriers
- Partner Statistics
- Wallet Summary

Use neutral realistic logistics terminology.

Do NOT create unrelated demo products, shopping products, sales products, marketing content, or fake e-commerce data.


ORDERS:

Create B2C and B2B order management.

B2C Orders table:
- Order ID
- Shipment ID
- Partner
- Courier
- Type
- Amount
- Payment Mode
- Status
- Date
- Actions

B2B Orders should have appropriate B2B shipment information.

Add:
- Search
- Date filter
- Status filter
- Courier filter
- Partner filter
- Pagination
- Export
- View
- Edit where applicable

Order detail page:
- Order information
- Customer information
- Pickup information
- Delivery information
- Package details
- Payment information
- Courier information
- Charges
- Shipment timeline
- Tracking events
- NDR/RTO history where applicable


PARTNERS:

Create complete partner management.

Partner list:
- Partner Code
- Company Name
- Contact Person
- Contact Information
- KYC Status
- Account Status
- Wallet Balance
- Assigned Services
- Actions

Partner onboarding should include:
- Company/basic information
- Contact details
- GST
- PAN
- KYC documents
- Other supporting documents
- Bank details
- Partner code
- Login/access status
- Roles and permissions
- Assigned services
- Assigned rates

Create clean multi-section forms with validation.


WALLETS:

Create:
- Main Wallet
- Partner Wallets
- Transactions
- Passbook/Ledger

Support UI for:
- Credit
- Debit
- Recharge
- Refund
- Adjustment
- Transaction history
- Balance
- Low balance indicator

Wallet transaction table:
- Transaction ID
- Partner
- Type
- Amount
- Balance
- Reference
- Status
- Date

Make the financial UI precise and professional.


SHIPPING RATES:

Create separate B2C and B2B rate management.

B2C Rates:
- Courier Name
- Client Code
- Upload File
- Weight Slab
- Zone A
- Zone B
- Zone C
- Zone D
- Zone E
- COD Charges
- COD Percentage
- Status
- Actions

B2B Rates:
- Courier Name
- Client Code
- Upload File
- Weight Slab
- N1
- N2
- E
- NE
- W1
- W2
- S1
- S2
- Central
- Status
- Actions

Create rate upload UI with file selection, validation and upload status.

Do not invent unrelated pricing structures.


COURIER CHARGES CONFIGURATION:

Create a professional configuration page with grouped sections/tabs.

Sections:

Basic Charges
- Processing Charge / LR
- FSC percentage / per kg

COD & ROV
- Owner's Risk ROV
- Carrier's Risk ROV
- Minimum ROV
- Liability limit

Volumetric Weight
- Length
- Breadth
- Height
- Divisor
- CFT
- Default divisor 4500

Handling & Demurrage
- Handling by weight slab
- Demurrage per kg
- Demurrage per LR
- Free store period

Delivery Charges
- Floor delivery
- Mall delivery
- CSD / Army delivery
- Re-attempt
- Sunday / Holiday delivery

Operational Charges
- FM cost
- LM cost
- To Pay
- Cheque handling
- Cash handling
- Appointment handling

Other Charges
- Minimum charged weight
- Green tax
- Minimum LR charge
- Round-off

Make this configuration UI easy to understand and maintain.


COURIERS:

Create:
- Courier list
- Courier configuration
- Credentials
- Enable/Disable
- Integration status
- Service configuration

Courier detail page should show:
- Courier information
- API configuration
- Credentials fields
- Enabled services
- Integration status
- Last synchronization
- Actions


SHIPMENT OPERATIONS:

Create complete shipment workflow UI:

Order Creation
→ Courier Allocation
→ Shipment Creation
→ Pickup
→ In Transit
→ Out for Delivery
→ Delivered

Also support:
- NDR
- Reattempt
- RTO
- Reverse shipment

Create shipment tracking timeline with timestamps and status history.


NDR / RTO:

NDR page:
- Shipment
- Partner
- Courier
- NDR reason
- Attempt count
- Date
- Response
- Reattempt status
- RTO status
- Actions

Create NDR detail page with:
- Reason
- Customer response
- Reattempt
- Follow-up
- RTO processing

RTO page:
- Shipment details
- RTO reason
- Status
- Courier
- Return tracking
- Return timeline


COD / REMITTANCE:

Create:
- COD remittance list
- Remittance details
- Remittance status
- Payment reference
- Collection amount
- Remitted amount
- Pending amount
- Reconciliation

Include filters:
- Partner
- Courier
- Date
- Status


BILLING & FINANCE:

Create:
- Billing dashboard
- Invoice list
- Invoice detail
- Partner billing
- Freight charges
- Additional charges
- Taxes
- Discounts where applicable
- Wallet impact
- Payment history

Invoice UI should look professional and printable.


CLAIMS & DISPUTES:

Create:
- Dispute list
- Lost shipment claims
- Damage claims
- Claim creation
- Evidence/document upload
- Claim amount
- Status
- Admin decision
- Settlement
- Closure
- Complete history

Use a clear claim lifecycle.


REPORTS:

Create a professional reports module.

Reports:
- Orders
- Shipments
- Courier performance
- Partner performance
- Wallet
- COD
- Finance
- NDR
- RTO
- Claims

Every report should support:
- Date filter
- Status filter
- Courier filter
- Partner filter
- Search
- Export CSV/Excel
- Print/PDF action where applicable

Do not create random charts just for decoration.


MASTER DATA:

Create CRUD-style management screens for:
- Couriers
- Partners
- Zones
- Weight Slabs
- Charges
- Statuses
- NDR Reasons
- RTO Reasons
- Taxes
- Services

Use reusable table + form patterns.


SETTINGS:

Create:
- Company Profile
- Invoice Settings
- Invoice Numbering
- Notification Settings
- Operational Configuration

Use proper settings navigation.


AUDIT LOGS:

Create an audit log screen showing:
- User
- Action
- Module
- Record
- Previous value
- New value
- Timestamp
- IP/device information where applicable

Include filters and search.


PARTNER PORTAL:

Create a completely separate partner-facing dashboard/navigation.

Partner sidebar:

Dashboard

Orders
- All Orders
- Forward
- Reverse
- Create Order

Pickup / NDR
- Pickup Requests
- NDR

Finance
- Wallet
- Remittances

Support
- Disputes
- Lost/Damage Claims

Partner Tools
- Rate Calculator
- Passbook
- Reports
- Manage Warehouse
- Manage Documents
- Bank Details

Partner dashboard should show:
- Total Orders
- Forward Orders
- Reverse Orders
- Delivered
- In Transit
- NDR
- RTO
- Wallet Balance
- Pending Remittance

Create partner order creation flow with:
- Pickup details
- Delivery details
- Package details
- Payment details
- Courier/service selection
- Charges
- Review
- Create order


RATE CALCULATOR:

Create a professional rate calculator.

Inputs:
- Partner
- Courier
- Origin
- Destination
- Shipment type
- Weight
- Length
- Breadth
- Height
- Payment mode
- COD amount where applicable

Show:
- Actual weight
- Volumetric weight
- Charged weight
- Base freight
- FSC
- COD
- ROV
- Additional charges
- Tax
- Total estimated charge

Keep calculation architecture ready to connect with backend business logic.


GLOBAL UX:

Implement:
- Loading states
- Skeleton loaders
- Empty states
- Error states
- Success states
- Confirmation dialogs
- Toast notifications
- Form validation
- Required field indicators
- Search
- Filters
- Pagination
- Sorting
- Responsive tables
- Mobile-friendly layout where practical

Use realistic logistics terminology only.

IMPORTANT DATA RULE:

Do NOT fill the UI with irrelevant fake "demo products", e-commerce products, marketing text, or unrelated sample content.

If mock data is necessary only to demonstrate table/chart structure, use neutral logistics records such as:
- Shipment
- Order
- Partner
- Courier
- Wallet transaction
- Invoice
- Claim

Keep mock data minimal and clearly replaceable through API services.


COMPONENT ARCHITECTURE:

Create reusable components for:
- DataTable
- SearchBar
- FilterBar
- StatusBadge
- KPI Card
- Modal
- Drawer
- Form sections
- File Upload
- Date Range Picker
- Pagination
- Empty State
- Loading State
- Confirmation Dialog
- Timeline
- Tabs

Avoid duplicated UI code.


API ARCHITECTURE:

Create a clean frontend service structure ready for:

/api/auth
/api/dashboard
/api/orders
/api/partners
/api/wallets
/api/rates
/api/couriers
/api/charges
/api/shipments
/api/ndr
/api/rto
/api/cod
/api/remittances
/api/billing
/api/invoices
/api/claims
/api/disputes
/api/reports
/api/master-data
/api/settings
/api/audit-logs
/api/notifications

Do not hard-code business logic inside UI components.

Keep API calls separated into service modules.


AUTHENTICATION:

Prepare UI and routing for:
- Admin login
- Partner login
- JWT authentication
- Role-based access
- Protected routes
- Logout
- Session handling

Admin and Partner portals must have separate navigation and permissions.


FINAL QUALITY REQUIREMENTS:

The final UI should look like a real logistics operations product that could be shown to a business client.

Prioritize:
1. Clean information hierarchy
2. Professional tables
3. Clear navigation
4. Consistent spacing
5. Neutral enterprise colors
6. Practical forms
7. Operational workflows
8. Reusable components
9. Maintainable React/TypeScript architecture
10. No unnecessary visual decoration

DO NOT:
- Create a landing page
- Create pricing/marketing pages
- Add e-commerce functionality
- Add unrelated CRM modules
- Add unnecessary animations
- Add colorful gradients
- Add fake product catalogs
- Add unrelated demo content
- Change the approved logistics scope

Build the complete frontend structure and all required screens in one generation.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://swiftlogi-core.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/1827f268-2283-49e9-b965-9070aef485c5).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
