import type { Metadata } from "next";
import { locations } from "@/lib/business";
import { pageMeta } from "@/lib/seo";
import LocationPage from "@/components/LocationPage";

const loc = locations.find((l) => l.key === "portland")!;

export const metadata: Metadata = pageMeta({
  title: "Massage in Portland, OR | Therapeutic & Deep Tissue",
  description:
    "Therapeutic, deep tissue, sports, and Swedish massage in Portland, Oregon at 2005 N Williams Ave. Scott Hartzell, LMT. Rated 5.0 on Google. 60 min $120. Book online.",
  path: "/massage-portland-or",
});

export default function PortlandPage() {
  return <LocationPage loc={loc} />;
}
