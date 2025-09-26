"use client"

import { useLanguage } from "@/context/language-context";

export default function RefundPolicyClient() {
  const { t } = useLanguage();
  return (
    <div className="min-h-[70vh]">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-transparent" />
        <div className="container mx-auto px-4 py-10 md:py-14 relative">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{t("policy.refund.title", "Refund Policy")}</h1>
              <p className="text-muted-foreground mt-2 max-w-2xl">{t("policy.refund.subtitle", "When and how refunds are issued.")}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="px-2.5 py-1 rounded-full bg-muted text-foreground/80 text-xs">{t("policy.updated", "Updated")} {new Date().toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <aside className="lg:col-span-3 order-last lg:order-first">
            <div className="sticky top-24 rounded-lg border border-border bg-card/50 backdrop-blur p-4">
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">{t("policy.toc", "On this page")}</p>
              <ul className="space-y-1 text-sm">
                <li><a className="hover:text-foreground text-muted-foreground" href="#overview">{t("policy.refund.toc.overview", "Overview")}</a></li>
                <li><a className="hover:text-foreground text-muted-foreground" href="#eligibility">{t("policy.refund.toc.eligibility", "Eligibility")}</a></li>
                <li><a className="hover:text-foreground text-muted-foreground" href="#process">{t("policy.refund.toc.process", "How to Request a Refund")}</a></li>
                <li><a className="hover:text-foreground text-muted-foreground" href="#contact">{t("policy.refund.toc.contact", "Contact")}</a></li>
              </ul>
            </div>
          </aside>

          <div className="lg:col-span-9">
            <div className="rounded-xl border border-border bg-card p-6 md:p-8 shadow-sm">
              <div className="prose prose-sm md:prose-base max-w-none prose-headings:scroll-mt-24">
                <h2 id="overview">{t("policy.refund.toc.overview", "Overview")}</h2>
                <p>{t("policy.refund.body.overview.1", "We aim for your complete satisfaction. If you receive a damaged, incorrect, or severely delayed order, you may be eligible for a refund as per the terms below.")}</p>

                <h2 id="eligibility">{t("policy.refund.toc.eligibility", "Eligibility")}</h2>
                <p>{t("policy.refund.body.eligibility.1", "Refunds are considered for products that are damaged on arrival, incorrectly delivered, or not delivered within the promised timeframe. Proof such as photos or videos may be required.")}</p>

                <h2 id="process">{t("policy.refund.toc.process", "How to Request a Refund")}</h2>
                <p>{t("policy.refund.body.process.1", "To request a refund, contact us within 24 hours of delivery with your order ID, a brief description of the issue, and any supporting images.")}</p>

                <div className="rounded-lg border border-amber-300 bg-amber-50 p-4 not-prose my-4">
                  <p className="text-amber-900 text-sm">
                    {t("policy.refund.body.delivery.1", "Return and replacement delivery time is 24 hours.")}
                  </p>
                </div>

                <h2 id="contact">{t("policy.refund.toc.contact", "Contact")}</h2>
                <p>{t("policy.refund.body.contact.1", "For refund requests or questions, please reach out:")}</p>
                <ul>
                  <li>By email: tintucuts@gmail.com</li>
                  <li>By phone: +91 9962040219,  +91 6383115007</li>
                  <li>By address: No: 4G, 1 Cross Street, Bhavani Nagar, Old Pallavaram, Chennai - 600117</li>
                </ul>
              </div>
              <div className="mt-6 flex justify-end">
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground">{t("policy.backToTop", "Back to top ↑")}</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
