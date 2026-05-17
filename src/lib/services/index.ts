// ═══════════════════════════════════════════════════════════════════
// 🏗️ Service Content Index — Re-exports all service data modules
// Each service lives in its own file for fast editing & code-splitting
// ═══════════════════════════════════════════════════════════════════

export type { ServiceContentData } from "./types";

import { tarmeemContent } from "./tarmeem";
import { shboakContent } from "./shboak";
import { asphaltContent } from "./asphalt";
import { binaaContent } from "./binaa";
import { molahaqContent } from "./molahaq";
import { generalContent } from "./general";
import { hadmContent } from "./hadm";
import { hanagerContent } from "./hanager";
import { tashteebatContent } from "./tashteebat";
import { type ServiceContentData } from "./types";

export const SERVICE_CONTENT: Record<string, ServiceContentData> = {
  tarmeem: tarmeemContent,
  shboak: shboakContent,
  asphalt: asphaltContent,
  binaa: binaaContent,
  molahaq: molahaqContent,
  general: generalContent,
  hadm: hadmContent,
  hanager: hanagerContent,
  tashteebat: tashteebatContent,
};
