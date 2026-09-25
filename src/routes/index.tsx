import { createFileRoute } from "@tanstack/react-router";
import { LogisticsApp } from "@/features/logistics/LogisticsApp";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LogiTrack — Logistics Operations" },
      { name: "description", content: "Manage shipments, partners, couriers, billing, NDR, RTO and logistics finance from one operational workspace." },
      { property: "og:title", content: "LogiTrack — Logistics Operations" },
      { property: "og:description", content: "A complete admin and partner logistics management workspace." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return <LogisticsApp />;
}
