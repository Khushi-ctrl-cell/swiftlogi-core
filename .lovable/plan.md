# Logistics Management SaaS

## Goal
Build a production-style logistics operations application with separate admin and partner experiences, secure sign-in, reusable operational screens, and a frontend service layer ready for future API integration.

## Build
- Create a compact responsive workspace with a collapsible dark sidebar, global search, notifications, profile menu, breadcrumbs, and separate admin/partner navigation.
- Add email/password and Google sign-in, password recovery, secure protected pages, profiles, and separate role records for admin and partner access.
- Build the admin dashboard with eight logistics KPIs, shipment/revenue charts, recent orders/activity, courier performance, partner statistics, and wallet summary.
- Build configuration-driven operational pages for orders, partners, wallets, rates, couriers, charges, COD/NDR/RTO, billing, claims, reports, master data, settings, and audit logs.
- Add rich representative workflows: order detail and tracking timeline, partner onboarding, courier charge tabs, rate upload, invoice detail, claim lifecycle, and operational reports.
- Build the separate partner dashboard, order creation flow, rate calculator, finance, support, warehouse, documents, and bank-detail views.
- Use reusable tables, filters, status badges, pagination, dialogs/drawers, upload areas, tabs, form sections, empty/loading/error states, and notifications.
- Keep realistic minimal logistics records in a replaceable mock service layer and define typed service modules matching the requested future API endpoints.

## Technical details
- TanStack Start/React 19 with file-based routes, Tailwind v4 semantic tokens, shadcn controls, Lucide icons, Recharts, React Hook Form, and Zod.
- Lovable Cloud stores user profiles and role assignments with row-level access rules; roles remain separate from profiles.
- Authenticated screens live behind the managed protected layout. Admin and partner visibility is role-aware in both navigation and protected data paths.
- Major modules use a shared route and page configuration model so every requested navigation destination is functional without duplicating layout code.
- Every content page receives route-specific social and search metadata.

## Verification
- Validate sign-in and recovery states, sidebar navigation, filters, dialogs, form validation, pagination, tracking timeline, and portal switching.
- Check desktop and mobile layouts, browser console/runtime signals, database access rules, and final preview health.
