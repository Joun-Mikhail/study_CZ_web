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
    | "České Budějovice";
  languages: ("English" | "Czech")[];
  fields: string[];
  tuitionEurPerYear: [number, number];
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
