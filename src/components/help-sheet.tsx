"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { CheckCircle2, Clock, MessageCircle, ShieldCheck, X } from "lucide-react";
import { useTranslation } from "@/i18n/context";
import { checkoutLink } from "@/config/pricing";
import { FOUNDER_NAME, FOUNDER_NAME_AR, REFUND_COPY, whatsappWithContext } from "@/config/contact";
import { HELP_SERVICES, HELP_SHEET_COPY, type HelpService } from "@/data/help-services";
import { AFTER_PAYMENT } from "@/data/after-payment";
import { PriceTag } from "@/components/launch-offer";
import { track } from "@/components/umami";
import { cn } from "@/lib/utils";

/**
 * A link to one paid service that opens the help sheet instead of going
 * straight to Stripe: who helps, what you get, what happens after paying,
 * how long it takes and the refund rule, then the payment button.
 *
 * It is a real link to the Stripe page, so without JavaScript (or in a
 * browser without <dialog>) it still works. The sheet opens only on the
 * visitor's tap. See docs/JOURNEY.md, 2.3.
 */
export function HelpLink({
  service,
  source,
  className,
  children,
}: {
  service: HelpService;
  /** Where the visitor is, for analytics: "eligibility:documents", "stage:visa"… */
  source: string;
  className?: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const href = checkoutLink(HELP_SERVICES[service].product);

  return (
    <>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        data-source={source}
        aria-haspopup="dialog"
        className={className}
        onClick={(e) => {
          if (typeof HTMLDialogElement === "undefined") return;
          e.preventDefault();
          setOpen(true);
          track("help_sheet_open", { service, source });
        }}
      >
        {children}
      </a>
      {open && <HelpSheet service={service} source={source} onClose={() => setOpen(false)} />}
    </>
  );
}

function HelpSheet({ service, source, onClose }: { service: HelpService; source: string; onClose: () => void }) {
  const { locale } = useTranslation();
  const pathname = usePathname();
  const ref = useRef<HTMLDialogElement>(null);
  const cfg = HELP_SERVICES[service];
  const c = cfg[locale];
  const t = HELP_SHEET_COPY[locale];
  const steps = AFTER_PAYMENT[locale].products[cfg.product].steps.slice(0, 3);
  const refund = REFUND_COPY[locale].perService[cfg.refundKey];
  const titleId = `help-sheet-${service}`;

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    dialog.showModal();
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = previous;
    };
  }, []);

  return createPortal(
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      onClose={onClose}
      // A tap on the backdrop (the dialog box itself, outside the panel) closes it.
      onClick={(e) => e.target === e.currentTarget && ref.current?.close()}
      className={cn(
        "help-sheet fixed m-0 p-0 border-0 bg-transparent text-text-primary backdrop:bg-ink/60",
        "inset-x-0 bottom-0 top-auto w-full max-w-none max-h-[92dvh]",
        "md:inset-y-0 md:start-auto md:end-0 md:w-[440px] md:h-dvh md:max-h-none"
      )}
    >
      <div
        className="flex h-full max-h-[92dvh] md:max-h-none flex-col rounded-t-3xl md:rounded-none md:rounded-s-3xl bg-surface shadow-2xl"
        data-source={source}
      >
        <div className="flex items-center gap-3 px-5 pt-5 pb-4 border-b border-border-subtle">
          <Image
            src="/images/john.jpg"
            alt={locale === "ar" ? FOUNDER_NAME_AR : FOUNDER_NAME}
            width={48}
            height={48}
            sizes="48px"
            className="w-12 h-12 rounded-full object-cover shrink-0"
          />
          <p className="flex-1 text-sm text-text-secondary leading-snug">{t.johnLine}</p>
          <button
            type="button"
            onClick={() => ref.current?.close()}
            aria-label={t.closeLabel}
            className="p-2 -m-2 rounded-full text-text-muted hover:text-text-primary hover:bg-surface-hover"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Focusable so keyboard users can scroll it when the details are long. */}
        <div
          tabIndex={0}
          role="region"
          aria-labelledby={titleId}
          className="flex-1 overflow-y-auto px-5 py-5 space-y-5 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-brand"
        >
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h2 id={titleId} className="text-xl font-bold text-text-primary">
              {c.name}
            </h2>
            <PriceTag k={cfg.priceKey} locale={locale} className="text-xl font-bold text-brand" />
          </div>

          <section>
            <h3 className="text-sm font-semibold text-text-primary mb-2">{t.whatYouGet}</h3>
            <ul className="space-y-2">
              {c.bullets.map((b) => (
                <li key={b} className="flex gap-2 text-sm text-text-secondary leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-success shrink-0 mt-0.5" aria-hidden="true" />
                  {b}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-sm font-semibold text-text-primary mb-2">{t.afterPay}</h3>
            <ol className="space-y-1.5 list-decimal ps-5 text-sm text-text-secondary leading-relaxed">
              {steps.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ol>
          </section>

          <section className="flex gap-2">
            <Clock className="w-4 h-4 text-brand shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <h3 className="text-sm font-semibold text-text-primary">{t.time}</h3>
              <p className="text-sm text-text-secondary leading-relaxed">{c.time}</p>
            </div>
          </section>

          <section className="flex gap-2">
            <ShieldCheck className="w-4 h-4 text-success shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <h3 className="text-sm font-semibold text-text-primary">{t.refund}</h3>
              <p className="text-sm text-text-secondary leading-relaxed">{refund}</p>
            </div>
          </section>
        </div>

        <div className="px-5 pt-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] border-t border-border-subtle space-y-2.5">
          <a
            href={checkoutLink(cfg.product)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-vivid flex items-center justify-center gap-2 w-full min-h-12 px-5 py-3 rounded-xl font-semibold text-sm hover:bg-brand-hover transition-colors"
          >
            {t.pay}
          </a>
          <a
            href={whatsappWithContext(`${c.name} (${pathname})`, locale)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full min-h-12 px-5 py-3 rounded-xl border border-border-subtle text-text-primary font-medium text-sm hover:bg-surface-hover transition-colors"
          >
            <MessageCircle className="w-4 h-4 text-success" aria-hidden="true" />
            {t.ask}
          </a>
          <button
            type="button"
            onClick={() => ref.current?.close()}
            className="block w-full min-h-11 text-sm text-text-muted hover:text-text-primary"
          >
            {t.close}
          </button>
        </div>
      </div>
    </dialog>,
    document.body
  );
}
