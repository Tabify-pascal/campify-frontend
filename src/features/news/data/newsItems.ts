
import type { NewsItem } from "../types/NewsItem";

export const newsItems: NewsItem[] = [
  {
    id: "1",
    title: "Nieuw sanitairgebouw geopend",
    excerpt: "Ons vernieuwde sanitairgebouw is klaar voor het nieuwe seizoen.",
    content:
      "We hebben de afgelopen maanden hard gewerkt aan een compleet vernieuwd sanitairgebouw met moderne douches, ruime wascabines en extra familieruimtes.",
    date: "2026-06-01",
    imageUrl: "/images/news/sanitair",
  },
  {
    id: "2",
    title: "Zomeractiviteiten voor kinderen",
    excerpt: "Deze zomer organiseren we extra activiteiten voor jonge kampeerders.",
    content:
      "Van speurtochten tot knutselmiddagen en kampvuuravonden: er is deze zomer genoeg te beleven voor kinderen.",
    date: "2026-06-10",
    imageUrl: "/images/news/zomeractiviteit"
  },
];