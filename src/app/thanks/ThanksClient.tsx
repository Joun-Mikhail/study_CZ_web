"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "@/i18n/context";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { GlassCard } from "@/components/ui/glass-card";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { track } from "@/components/umami";
import { CONTACT_EMAIL, REFUND_COPY, WHATSAPP_URL } from "@/config/contact";
import { CheckCircle2, MessageCircle, Mail } from "lucide-react";
import { AFTER_PAYMENT, PAID_PRODUCTS, type PaidProduct } from "@/data/after-payment";

/**
 * Stripe sends service buyers here after paying:
 *   /thanks/?p=<consultation|documentReview|interviewPrep|arrivalSupport|fullPackageStep1>&session_id={CHECKOUT_SESSION_ID}
 * Visitors who chose Arabic before are moved to /ar/thanks/ by the
 * TranslationProvider, keeping the query string.
 */
type Product = PaidProduct;
const PRODUCTS = PAID_PRODUCTS;

export default function ThanksClient() {
  const { locale } = useTranslation();
  const t = AFTER_PAYMENT[locale];
  const [product, setProduct] = useState<Product | null>(null);
  const [ref, setRef] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const p = params.get("p") as Product | null;
    const session = params.get("session_id") ?? "";
    const known = p && PRODUCTS.includes(p) ? p : null;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reads the URL after mount (static export has no request)
    setProduct(known);
    setRef(/^cs_(live|test)_[A-Za-z0-9]+$/.test(session) ? session.slice(-6) : "");
    setReady(true);
    if (known) track("purchase", { product: known });
  }, []);

  const c = product ? t.products[product] : null;
  const whatsapp = c ? `${WHATSAPP_URL}?text=${encodeURIComponent(c.whatsappText + (ref ? ` (${t.refLabel} ${ref})` : ""))}` : WHATSAPP_URL;
  const refund = product ? REFUND_COPY[locale].perService[product === "fullPackageStep1" ? "fullPackage" : product] : null;

  return (
    <div className="relative min-h-screen">
      <Navbar />
      <main id="main-content" className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mx-auto">
          <GlassCard>
            <div className="space-y-5">
              <div className="text-center">
                <CheckCircle2 className="w-12 h-12 text-success mx-auto mb-3" aria-hidden="true" />
                <h1 className="text-2xl font-bold text-text-primary">{t.title}</h1>
                {c && <p className="text-sm text-text-secondary mt-2">{c.name}</p>}
                {ref && (
                  <p className="text-xs text-text-muted mt-1" dir="ltr">
                    {t.refLabel} {ref}
                  </p>
                )}
              </div>

              {ready && c && (
                <>
                  <div>
                    <h2 className="text-base font-semibold text-text-primary mb-2">{t.nextStep}</h2>
                    <ol className="space-y-2 list-decimal ps-5 text-sm text-text-secondary leading-relaxed">
                      {c.steps.map((s) => (
                        <li key={s}>{s}</li>
                      ))}
                    </ol>
                  </div>
                  <MagneticButton variant="primary" href={whatsapp} className="w-full">
                    <MessageCircle className="w-4 h-4" />
                    {c.button}
                  </MagneticButton>
                  {product === "documentReview" && (
                    <a href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`Document review${ref ? ` ${ref}` : ""}`)}`} className="flex items-center justify-center gap-2 text-sm text-brand hover:underline">
                      <Mail className="w-4 h-4" />
                      {t.orEmail} {CONTACT_EMAIL}
                    </a>
                  )}
                  {refund && <p className="text-xs text-text-muted text-center">{refund}</p>}
                </>
              )}

              {ready && !c && (
                <>
                  <p className="text-sm text-text-secondary text-center">{t.generic}</p>
                  <MagneticButton variant="primary" href={whatsapp} className="w-full">
                    <MessageCircle className="w-4 h-4" />
                    {t.genericButton}
                  </MagneticButton>
                </>
              )}
            </div>
          </GlassCard>
        </div>
      </main>
      <Footer />
    </div>
  );
}
