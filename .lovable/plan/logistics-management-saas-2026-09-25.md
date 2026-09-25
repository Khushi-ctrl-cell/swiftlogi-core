# Logistics Management SaaS

## Goal
Build a production-style logistics operations frontend with separate admin and partner experiences, role-aware sign-in screens, reusable operational screens, and a service layer designed for a future Node.js, Express.js, and MySQL backend.

## Build
- Create a compact responsive workspace with a collapsible dark sidebar, global search, notifications, profile menu, breadcrumbs, and separate admin/partner navigation.
- Add email/password login screens, password recovery screens, protected-page behavior, profiles, and separate Admin/Partner roles. Google login remains optional and is not required by the interface.
- Build the admin dashboard with eight logistics KPIs, shipment/revenue charts, recent orders/activity, courier performance, partner statistics, and wallet summary.
- Build configuration-driven operational pages for orders, partners, wallets, rates, couriers, charges, COD/NDR/RTO, billing, claims, reports, master data, settings, and audit logs.
- Add rich representative workflows: order detail and tracking timeline, partner onboarding, courier charge tabs, rate upload, invoice detail, claim lifecycle, and operational reports.
- Build the separate partner dashboard, order creation flow, rate calculator, finance, support, warehouse, documents, and bank-detail views.
- Use reusable tables, filters, status badges, pagination, dialogs/drawers, upload areas, tabs, form sections, empty/loading/error states, and notifications.
- Keep realistic minimal logistics records in a replaceable mock service layer and define typed REST service modules matching the requested future Express.js API endpoints.

## Technical details
- React 19, TypeScript, Vite, Tailwind v4 semantic tokens, shadcn controls, Lucide icons, Recharts, React Hook Form, and Zod. The workspace's built-in routing runtime is used only to deliver the React/Vite frontend.
- No business records, profiles, or roles depend on Lovable Cloud. Production persistence and authentication contracts are defined for a future Node.js, Express.js, MySQL, and JWT backend.
- UI components never contain API calls or business rules. Typed repositories, service interfaces, mock adapters, and DTOs form the replacement boundary for future REST APIs.
- Protected screens, Admin/Partner permissions, profiles, and role-aware navigation are represented in the frontend architecture and mock session layer without presenting them as production security.
- Major modules use a shared route and page configuration model so every requested navigation destination is functional without duplicating layout code.
- Every content page receives route-specific social and search metadata.

## Verification
- Validate sign-in and recovery states, role-aware navigation, filters, dialogs, form validation, pagination, tracking timeline, and portal switching.
- Check desktop and mobile layouts, browser console/runtime signals, mock-service replacement boundaries, and final preview health.
