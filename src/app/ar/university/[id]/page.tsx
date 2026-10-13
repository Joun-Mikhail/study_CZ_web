// @custom-ar — Arabic twin of /university/[id]/.
import type { Metadata } from "next";
import { generateMetadata as en } from "@/app/university/[id]/page";
import { arabicMetadata, CITY_AR } from "@/i18n/ar-metadata";
import { universities } from "@/data/universities";
import { universitiesV2 } from "@/data/universities-v2";
export { default, generateStaticParams } from "@/app/university/[id]/page";

export async function generateMetadata(props: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await props.params;
  const base = await en(props);
  const uni = universities.find((u) => u.id === id);
  if (!uni) return arabicMetadata(`/university/${id}/`, base);
  const city = CITY_AR[uni.city] ?? uni.city;
  const nameAr = universitiesV2.find((u) => u.id === id)?.nameAr;
  return arabicMetadata(`/university/${id}/`, base, {
    title: `${nameAr ?? uni.name} — البرامج والرسوم`,
    description: uni.blurb?.ar || `معلومات عن ${uni.name} في ${city}، التشيك: البرامج الإنجليزية والرسوم والقبول.`,
  });
}
