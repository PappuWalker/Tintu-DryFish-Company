"use client"

import { useLanguage } from "@/context/language-context";

export default function TermsPolicyClient() {
  const { t } = useLanguage();
  return (
    <div className="min-h-[70vh]">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-transparent" />
        <div className="container mx-auto px-4 py-10 md:py-14 relative">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{t("policy.terms.title", "Terms and Conditions")}</h1>
          <p className="text-muted-foreground mt-2 max-w-2xl">{t("policy.terms.subtitle", "Please read these terms carefully before using our website.")}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="px-2.5 py-1 rounded-full bg-muted text-foreground/80 text-xs">{t("policy.updated", "Updated")} {new Date().toLocaleDateString()}</span>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <aside className="lg:col-span-3 order-last lg:order-first">
            <div className="sticky top-24 rounded-lg border border-border bg-card/50 backdrop-blur p-4">
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">{t("policy.toc", "On this page")}</p>
              <ul className="space-y-1 text-sm">
                <li><a className="hover:text-foreground text-muted-foreground" href="#overview">{t("policy.terms.toc.overview", "Overview")}</a></li>
                <li><a className="hover:text-foreground text-muted-foreground" href="#use">{t("policy.terms.toc.use", "Use of Website")}</a></li>
                <li><a className="hover:text-foreground text-muted-foreground" href="#orders">{t("policy.terms.toc.orders", "Orders and Payments")}</a></li>
                <li><a className="hover:text-foreground text-muted-foreground" href="#liability">{t("policy.terms.toc.liability", "Liability")}</a></li>
                <li><a className="hover:text-foreground text-muted-foreground" href="#law">{t("policy.terms.toc.law", "Governing Law")}</a></li>
                <li><a className="hover:text-foreground text-muted-foreground" href="#contact">{t("policy.terms.toc.contact", "Contact")}</a></li>
              </ul>
            </div>
          </aside>

          <div className="lg:col-span-9">
            <div className="rounded-xl border border-border bg-card p-6 md:p-8 shadow-sm">
              <div className="prose prose-sm md:prose-base max-w-none prose-headings:scroll-mt-24">
                <h2 id="overview">{t("policy.terms.toc.overview", "Overview")}</h2>
                <p>{t("policy.terms.body.overview.1", "By accessing or using our website, you agree to be bound by these Terms and Conditions.")}</p>

                <h2 id="use">{t("policy.terms.toc.use", "Use of Website")}</h2>
                <p>{t("policy.terms.body.use.1", "You agree to use this site for lawful purposes only and not to engage in any conduct that may impair or damage the site.")}</p>

                <h2 id="orders">{t("policy.terms.toc.orders", "Orders and Payments")}</h2>
                <p>{t("policy.terms.body.orders.1", "All orders are subject to acceptance and availability. Prices and availability are subject to change without notice.")}</p>

                <h2 id="liability">{t("policy.terms.toc.liability", "Liability")}</h2>
                <p>{t("policy.terms.body.liability.1", "To the fullest extent permitted by law, we disclaim all liability for any indirect or consequential loss arising from your use of the site.")}</p>

                <h2 id="law">{t("policy.terms.toc.law", "Governing Law")}</h2>
                <p>{t("policy.terms.body.law.1", "These terms are governed by the laws of India. Any disputes will be subject to the exclusive jurisdiction of the courts in Chennai, Tamil Nadu.")}</p>

                <h2 id="contact">{t("policy.terms.toc.contact", "Contact")}</h2>
                <p>{t("policy.terms.body.contact.1", "If you have questions about these terms, please contact us:")}</p>
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
