import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shipping Policy",
};

const ShippingPolicyPage = () => {
  return (
    <div className="min-h-[70vh]">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-transparent" />
        <div className="container mx-auto px-4 py-10 md:py-14 relative">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Shipping Policy</h1>
          <p className="text-muted-foreground mt-2 max-w-2xl">Details on delivery timelines, charges, and tracking.</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="px-2.5 py-1 rounded-full bg-muted text-foreground/80 text-xs">Updated {new Date().toLocaleDateString()}</span>
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
                <li><a className="hover:text-foreground text-muted-foreground" href="#intro">Overview</a></li>
                <li><a className="hover:text-foreground text-muted-foreground" href="#charges">Shipping Charges</a></li>
                <li><a className="hover:text-foreground text-muted-foreground" href="#time">Delivery Time</a></li>
                <li><a className="hover:text-foreground text-muted-foreground" href="#tracking">Tracking</a></li>
                <li><a className="hover:text-foreground text-muted-foreground" href="#contact">Contact Us</a></li>
              </ul>
            </div>
          </aside>

          {/* Main copy */}
          <div className="lg:col-span-9">
            <div className="rounded-xl border border-border bg-card p-6 md:p-8 shadow-sm">
              <div className="prose prose-sm md:prose-base max-w-none prose-headings:scroll-mt-24">
                <h2 id="intro">Overview</h2>
                <p>
                  Thank you for shopping at Tintu DryFish Company. We are committed to
                  delivering your order with good quality packaging within the given
                  time frame. We ship throughout the week, except on Sundays and public
                  holidays.
                </p>

                <h2 id="charges">Shipping Charges</h2>
                <div className="rounded-lg border border-blue-300 bg-blue-50 p-4 not-prose">
                  <p className="text-blue-900 text-sm">
                    Delivery charges apply to all orders and are calculated based on the
                    distance from our location. You will be required to pay these charges
                    when your order is delivered. <span className="font-semibold">Spend ₹5,000 or more to get free delivery.</span>
                  </p>
                </div>

                <h2 id="time">Delivery Time</h2>
                <p>
                  Orders are dispatched within 3-5 working days. Most orders are
                  delivered within 7 to 10 working days. Delivery of all orders will be
                  duly done to the address as mentioned by you at the time of placing
                  the order.
                </p>

                <h2 id="tracking">Tracking</h2>
                <p>
                  Once your order is dispatched, you will receive an email with the
                  tracking details. You can track your order using the tracking number
                  provided.
                </p>

                <h2 id="contact">Contact Us</h2>
                <p>
                  If you have any questions about our Shipping Policy, please contact
                  us:
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

export default ShippingPolicyPage;
