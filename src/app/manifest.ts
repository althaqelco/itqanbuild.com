import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE.name} — مقاول جدة المعتمد`,
    short_name: SITE.name,
    description: `مقاول جدة المرخص — بناء · ترميم · شبوك · أسفلت · ملاحق · هناجر · تشطيبات`,
    start_url: "/",
    display: "standalone",
    background_color: "#0A192F",
    theme_color: "#0A192F",
    lang: "ar",
    dir: "rtl",
    categories: ["business", "construction"],
    icons: [
      { src: "/icon.png", sizes: "any", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
