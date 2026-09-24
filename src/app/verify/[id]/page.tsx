import type { Metadata } from "next";
import { certificates } from "@/data/certificates";
import VerifyClient from "./VerifyClient";

type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  const ids = certificates.map((c) => ({ id: c.uniqueId }));
  if (ids.length === 0) ids.push({ id: "not-found" });
  return ids;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const cert = certificates.find((c) => c.uniqueId === id);

  return {
    title: cert
      ? `Certificate — ${cert.studentName}`
      : "Verify Certificate",
    description: cert
      ? `Course completion certificate for ${cert.studentName}`
      : "Verify a Study Czechia course completion certificate",
    alternates: { canonical: `/verify/${id}` },
  };
}

export default async function VerifyPage({ params }: Props) {
  const { id } = await params;
  const cert = certificates.find((c) => c.uniqueId === id) ?? null;

  return <VerifyClient id={id} cert={cert} />;
}
