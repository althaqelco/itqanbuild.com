import { type ServiceKey } from "../constants";

export interface ServiceContentData {
  intro: string;
  detailedContent?: string[];
  scopes: { title: string; desc: string }[];
  process?: { step: string; desc: string }[];
  safetyNotes?: string[];
  standards?: string[];
  faqs: { question: string; answer: string }[];
  relatedKeys: ServiceKey[];
  projectImage?: string;
}
