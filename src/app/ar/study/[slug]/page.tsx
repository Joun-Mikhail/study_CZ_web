// @custom-ar — Arabic twin of /study/[slug]/ with Arabic search titles.
import type { Metadata } from "next";
import { generateMetadata as en } from "@/app/study/[slug]/page";
import { arabicMetadata, CITY_AR, DEGREE_AR, FIELD_AR } from "@/i18n/ar-metadata";
import { slugToCity, slugToDegree, slugToField } from "@/lib/seo-utils";
export { default, generateStaticParams } from "@/app/study/[slug]/page";

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await props.params;
  const base = await en(props);
  const field = slugToField(slug);
  const city = slugToCity(slug);
  const degree = slugToDegree(slug);
  let override: { title: string; description: string } | undefined;
  if (field) {
    const f = FIELD_AR[field] ?? field;
    override = {
      title: `دراسة ${f} في التشيك`,
      description: `برامج ${f} باللغة الإنجليزية في الجامعات التشيكية: الرسوم الدراسية، ومواعيد التقديم، وشروط القبول، مع روابط للمصادر الرسمية.`,
    };
  } else if (city) {
    const c = CITY_AR[city] ?? city;
    override = {
      title: `الدراسة في ${c}، التشيك`,
      description: `البرامج الإنجليزية في جامعات ${c}: الرسوم الدراسية، ومواعيد التقديم، ومعلومات القبول.`,
    };
  } else if (degree) {
    const d = DEGREE_AR[degree] ?? degree;
    override = {
      title: `برامج ${d} في التشيك`,
      description: `برامج ${d} باللغة الإنجليزية في الجامعات التشيكية: قارن الرسوم ومواعيد التقديم وشروط القبول.`,
    };
  }
  return arabicMetadata(`/study/${slug}/`, base, override);
}
