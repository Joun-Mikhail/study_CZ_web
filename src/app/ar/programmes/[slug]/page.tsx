// @custom-ar — Arabic twin of /programmes/[slug]/.
import type { Metadata } from "next";
import { generateMetadata as en } from "@/app/programmes/[slug]/page";
import { arabicMetadata, CITY_AR, DEGREE_AR } from "@/i18n/ar-metadata";
import { getProgrammeById } from "@/data/programmes";
import { universitiesV2 } from "@/data/universities-v2";
export { default, generateStaticParams } from "@/app/programmes/[slug]/page";

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await props.params;
  const base = await en(props);
  const prog = getProgrammeById(slug);
  if (!prog) return arabicMetadata(`/programmes/${slug}/`, base);
  const uni = universitiesV2.find((u) => u.id === prog.universityId);
  const name = prog.name.ar || prog.name.en;
  const city = uni ? CITY_AR[uni.city] ?? uni.city : "التشيك";
  const degree = DEGREE_AR[prog.degree] ?? prog.degree;
  return arabicMetadata(`/programmes/${slug}/`, base, {
    title: `${name} | ${uni?.name ?? ""}`,
    description: `${degree} في ${name} في ${uni?.name ?? ""}، ${city}. مدة الدراسة ${prog.durationYears} سنوات، والرسوم نحو ${prog.tuitionEurPerYear.toLocaleString("en-US")}€ في السنة.`,
  });
}
