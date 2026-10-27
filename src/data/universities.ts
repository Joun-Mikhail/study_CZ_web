import { getAllUniversitiesV1 } from "./compat";

export type University = {
  id: string;
  name: string;
  city:
    | "Prague"
    | "Brno"
    | "Olomouc"
    | "Zlín"
    | "Ostrava"
    | "Plzeň"
    | "Hradec Králové"
    | "Liberec"
    | "Mladá Boleslav"
    | "Ústí nad Labem"
    | "Pardubice"
    | "České Budějovice"
    | "Opava"
    | "Jihlava"
    | "Přerov";
  languages: ("English" | "Czech")[];
  fields: string[];
  /** [min, max] over the listed programmes; null when none is listed yet. */
  tuitionEurPerYear: [number, number] | null;
  degreeLevels: ("Bachelor" | "Master")[];
  blurb: { en: string; ar: string };
  founded?: number;
  website?: string;
  contactEmail?: string;
  programs?: { name: { en: string; ar?: string }; degree: "Bachelor" | "Master"; language: "English" | "Czech" }[];
  englishProgramCount?: number;
  ranking?: string;
};

export const universities: University[] = getAllUniversitiesV1();
