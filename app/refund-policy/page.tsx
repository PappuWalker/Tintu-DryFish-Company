import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund Policy",
};

const RefundPolicyPage = () => {
  return (
    <div className="min-h-[70vh]">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-transparent" />
        <div className="container mx-auto px-4 py-10 md:py-14 relative">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Refund Policy</h1>
              <p className="text-muted-foreground mt-2 max-w-2xl">
                Please read our policy carefully before making a purchase.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-medium border border-amber-200">
                  Important
                </span>
                <span className="px-2.5 py-1 rounded-full bg-muted text-foreground/80 text-xs">Updated {new Date().toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="container mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* TOC */}
          <aside className="lg:col-span-3 order-last lg:order-first">
            <div className="sticky top-24 rounded-lg border border-border bg-card/50 backdrop-blur p-4">
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">On this page</p>
              <ul className="space-y-1 text-sm">
                <li><a className="hover:text-foreground text-muted-foreground" href="#returns">Returns</a></li>
                <li><a className="hover:text-foreground text-muted-foreground" href="#upi">No Refunds for UPI</a></li>
                <li><a className="hover:text-foreground text-muted-foreground" href="#nonreturnable">Non-Returnable Items</a></li>
                <li><a className="hover:text-foreground text-muted-foreground" href="#process">Refund Process</a></li>
                <li><a className="hover:text-foreground text-muted-foreground" href="#contact">Contact Us</a></li>
              </ul>
            </div>
          </aside>

          {/* Main copy */}
          <div className="lg:col-span-9">
            <div className="rounded-xl border border-border bg-card p-6 md:p-8 shadow-sm">
              <div className="prose prose-sm md:prose-base max-w-none prose-headings:scroll-mt-24">
                <p>
                  At Tintu DryFish Company, we strive to provide you with the best
                  quality products and a seamless shopping experience. Please read our
                  refund policy carefully before making a purchase.
                </p>

                <h2 id="returns">Returns</h2>
                <p>
                  We accept returns only for products that are damaged during transit.
                  If you receive a damaged item, please contact us within 24 hours of
                  delivery with photographic evidence of the damage. We will arrange for
                  a replacement or a refund in such cases.
                </p>

                <h2 id="upi">No Refunds for UPI Payments</h2>
                <div className="rounded-lg border border-amber-300 bg-amber-50 p-4 not-prose">
                  <p className="text-amber-900 text-sm">
                    Please note that we <span className="font-semibold">do not offer refunds for payments made through UPI</span>.
                    This policy helps prevent fraudulent transactions and ensures the security of our payment process.
                  </p>
                </div>

                <h2 id="nonreturnable">Non-Returnable Items</h2>
                <ul>
                  <li>Perishable goods such as dry fish.</li>
                  <li>Items that have been opened or used.</li>
                  <li>Products without original packaging.</li>
                </ul>

                <h2 id="process">Refund Process</h2>
                <p>
                  Once your return is approved, we will initiate a refund to your
                  original method of payment, excluding UPI payments. You will receive
                  the credit within a certain amount of days, depending on your card
                  issuer's policies.
                </p>

                <h2 id="contact">Contact Us</h2>
                <p>
                  If you have any questions about our Refund Policy, please contact us:
                </p>
                <ul>
                  <li>By email: support@tintudryfish.com</li>
                  <li>By phone: +91 1234567890</li>
                </ul>
              </div>

              <div className="mt-6 flex justify-end">
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Back to top ↑</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RefundPolicyPage;
