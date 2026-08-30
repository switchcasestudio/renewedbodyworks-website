import type { Metadata } from "next";
import { locations } from "@/lib/business";
import { pageMeta } from "@/lib/seo";
import LocationPage from "@/components/LocationPage";

const loc = locations.find((l) => l.key === "eugene")!;

export const metadata: Metadata = pageMeta({
  title: "Massage in Eugene, OR | Therapeutic & Deep Tissue",
  description:
    "Therapeutic, deep tissue, sports, and Swedish massage in downtown Eugene, Oregon at 767 Willamette St. Scott Hartzell, LMT. 60 min $120 / 90 min $165. Book online.",
  path: "/massage-eugene-or",
});

export default function EugenePage() {
  return <LocationPage loc={loc} />;
}
