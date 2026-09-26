# Logistics SaaS roadmap

## Final production cleanup pass
- [ ] Remove every demo/mock record, fake statistic, chart, activity feed and fake timeline
- [ ] Replace mock data with an empty, persistent application-state repository behind service interfaces
- [ ] Restructure admin navigation to the approved 9 areas; partner navigation to approved tools
- [ ] Dashboard KPIs computed from real state (13 admin, 9 partner) with zero states
- [ ] Orders: B2C/B2B courier summary (Delhivery only), clickable counts, order drawer, status workflow side effects
- [ ] Partners: small Add modal, detail drawer with 7 required sections and relationships
- [ ] Wallets: actions, transactions, ledger, low balance, audit
- [ ] Shipping rates B2C/B2B with upload popup; courier charges (24 contextual items); courier config/integration
- [ ] COD remittance, reconciliation, NDR reattempt, RTO, billing/invoices
- [ ] Claims & disputes lifecycle; reports with CSV/Excel/print; master data (9); settings (4); audit logs
- [ ] Partner workspace scoped to logged-in partner (orders, tracking, calculator, passbook, reports, warehouse, documents, bank, profile)
- [ ] Operational notifications; real account creation + sign-in (no prefilled credentials)
- [ ] Verify build, console, desktop/mobile
