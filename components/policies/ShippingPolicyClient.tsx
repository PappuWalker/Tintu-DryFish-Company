"use client"

import { useLanguage } from "@/context/language-context";

export default function ShippingPolicyClient() {
  const { t } = useLanguage();
  return (
    <div className="min-h-[70vh]">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-transparent" />
        <div className="container mx-auto px-4 py-10 md:py-14 relative">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{t("policy.shipping.title", "Shipping Policy")}</h1>
          <p className="text-muted-foreground mt-2 max-w-2xl">{t("policy.shipping.subtitle", "Details on delivery timelines, charges, and tracking.")}</p>
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
                <li><a className="hover:text-foreground text-muted-foreground" href="#intro">{t("policy.shipping.toc.overview", "Overview")}</a></li>
                <li><a className="hover:text-foreground text-muted-foreground" href="#charges">{t("policy.shipping.toc.charges", "Shipping Charges")}</a></li>
                <li><a className="hover:text-foreground text-muted-foreground" href="#time">{t("policy.shipping.toc.time", "Delivery Time")}</a></li>
                <li><a className="hover:text-foreground text-muted-foreground" href="#damaged">{t("policy.shipping.toc.damaged", "Damaged or Defective Items")}</a></li>
                <li><a className="hover:text-foreground text-muted-foreground" href="#tracking">{t("policy.shipping.toc.tracking", "Tracking")}</a></li>
                <li><a className="hover:text-foreground text-muted-foreground" href="#contact">{t("policy.shipping.toc.contact", "Contact Us")}</a></li>
              </ul>
            </div>
          </aside>

          <div className="lg:col-span-9">
            <div className="rounded-xl border border-border bg-card p-6 md:p-8 shadow-sm">
              <div className="prose prose-sm md:prose-base max-w-none prose-headings:scroll-mt-24">
                <h2 id="intro">{t("policy.shipping.toc.overview", "Overview")}</h2>
                <p>{t("policy.shipping.body.overview.1", "Thank you for shopping at Tintu Cuts. We are committed to delivering your order with good quality packaging within the given time frame. We ship throughout the week, except on Sundays and public holidays.")}</p>

                <h2 id="charges">{t("policy.shipping.toc.charges", "Shipping Charges")}</h2>
                <div className="rounded-lg border border-blue-300 bg-blue-50 p-4 not-prose">
                  <p className="text-blue-900 text-sm">
                    {t("policy.shipping.body.charges.callout", "Delivery charges apply to all orders and are calculated based on the distance from our location. You will be required to pay these charges when your order is delivered.")}
                    {" "}
                    <span className="font-semibold">{t("policy.shipping.body.charges.free", "Spend ₹5,000 or more to get free delivery.")}</span>
                  </p>
                </div>

                <h2 id="time">{t("policy.shipping.toc.time", "Delivery Time")}</h2>
                <p>{t("policy.shipping.body.time.1", "Orders are dispatched within 24 hours. Delivery of all orders will be duly done to the address as mentioned by you at the time of placing the order.")}</p>

                <h2 id="damaged">{t("policy.shipping.toc.damaged", "Damaged or Defective Items")}</h2>
                <p>{t("policy.shipping.body.damaged.1", "If you receive a damaged or defective product, we will arrange a replacement to be delivered within 24 hours.")}</p>

                <h2 id="tracking">{t("policy.shipping.toc.tracking", "Tracking")}</h2>
                <p>{t("policy.shipping.body.tracking.1", "Once your order is dispatched, you will receive an email with the tracking details. You can track your order using the tracking number provided.")}</p>

                <h2 id="contact">{t("policy.shipping.toc.contact", "Contact Us")}</h2>
                <p>{t("policy.shipping.body.contact.1", "If you have any questions about our Shipping Policy, please contact us:")}</p>
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
