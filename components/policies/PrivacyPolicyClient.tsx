"use client"

import { useLanguage } from "@/context/language-context";

export default function PrivacyPolicyClient() {
  const { t } = useLanguage();
  return (
    <div className="min-h-[70vh]">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-transparent" />
        <div className="container mx-auto px-4 py-10 md:py-14 relative">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{t("policy.privacy.title", "Privacy Policy")}</h1>
          <p className="text-muted-foreground mt-2 max-w-2xl">{t("policy.privacy.subtitle", "How we collect, use, and protect your information.")}</p>
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
                <li><a className="hover:text-foreground text-muted-foreground" href="#overview">{t("policy.privacy.toc.overview", "Overview")}</a></li>
                <li><a className="hover:text-foreground text-muted-foreground" href="#collect">{t("policy.privacy.toc.collect", "Information We Collect")}</a></li>
                <li><a className="hover:text-foreground text-muted-foreground" href="#use">{t("policy.privacy.toc.use", "How We Use Information")}</a></li>
                <li><a className="hover:text-foreground text-muted-foreground" href="#security">{t("policy.privacy.toc.security", "Security")}</a></li>
                <li><a className="hover:text-foreground text-muted-foreground" href="#consent">{t("policy.privacy.toc.consent", "Your Consent")}</a></li>
                <li><a className="hover:text-foreground text-muted-foreground" href="#contact">{t("policy.privacy.toc.contact", "Contact")}</a></li>
              </ul>
            </div>
          </aside>

          <div className="lg:col-span-9">
            <div className="rounded-xl border border-border bg-card p-6 md:p-8 shadow-sm">
              <div className="prose prose-sm md:prose-base max-w-none prose-headings:scroll-mt-24">
                <h2 id="overview">{t("policy.privacy.toc.overview", "Overview")}</h2>
                <p>{t("policy.privacy.body.overview.1", "At Tintu Cuts, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website.")}</p>

                <div className="rounded-lg border border-emerald-300 bg-emerald-50 p-4 not-prose my-4">
                  <p className="text-emerald-900 text-sm">
                    {t("policy.privacy.body.callout", "We respect your privacy — we don't sell your data, and we only collect what is needed to fulfill your orders and provide support.")}
                  </p>
                </div>

                <h2 id="collect">{t("policy.privacy.toc.collect", "Information We Collect")}</h2>
                <p>{t("policy.privacy.body.collect.1", "We may collect personal information from you, such as your name, shipping address, email address, and phone number, when you place an order on our site. This information is used solely for the purpose of processing and delivering your order.")}</p>

                <h2 id="use">{t("policy.privacy.toc.use", "How We Use Information")}</h2>
                <p>{t("policy.privacy.body.use.1", "We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties. We are committed to ensuring that your information is secure and will not be shared with any third parties, except as required by law.")}</p>

                <h2 id="security">{t("policy.privacy.toc.security", "Security")}</h2>
                <p>{t("policy.privacy.body.security.1", "We implement a variety of security measures to maintain the safety of your personal information when you place an order. Your personal information is contained behind secured networks and is only accessible by a limited number of persons who have special access rights to such systems, and are required to keep the information confidential.")}</p>

                <h2 id="consent">{t("policy.privacy.toc.consent", "Your Consent")}</h2>
                <p>{t("policy.privacy.body.consent.1", "By using our site, you consent to our privacy policy.")}</p>

                <h2 id="contact">{t("policy.privacy.toc.contact", "Contact")}</h2>
                <p>{t("policy.privacy.body.contact.1", "If you have any questions about our Privacy Policy, please contact us:")}</p>
                <ul className="space-y-2">
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
