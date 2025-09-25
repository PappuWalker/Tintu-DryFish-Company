import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-[70vh]">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-transparent" />
        <div className="container mx-auto px-4 py-10 md:py-14 relative">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Privacy Policy</h1>
          <p className="text-muted-foreground mt-2 max-w-2xl">How we collect, use, and protect your information.</p>
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
                <li><a className="hover:text-foreground text-muted-foreground" href="#overview">Overview</a></li>
                <li><a className="hover:text-foreground text-muted-foreground" href="#collect">Information We Collect</a></li>
                <li><a className="hover:text-foreground text-muted-foreground" href="#use">How We Use Information</a></li>
                <li><a className="hover:text-foreground text-muted-foreground" href="#security">Security</a></li>
                <li><a className="hover:text-foreground text-muted-foreground" href="#consent">Your Consent</a></li>
                <li><a className="hover:text-foreground text-muted-foreground" href="#contact">Contact</a></li>
              </ul>
            </div>
          </aside>

          {/* Main copy */}
          <div className="lg:col-span-9">
            <div className="rounded-xl border border-border bg-card p-6 md:p-8 shadow-sm">
              <div className="prose prose-sm md:prose-base max-w-none prose-headings:scroll-mt-24">
                <h2 id="overview">Overview</h2>
                <p>
                  At Tintu DryFish Company, we are committed to protecting your
                  privacy. This Privacy Policy explains how we collect, use, and
                  safeguard your information when you visit our website.
                </p>

                <div className="rounded-lg border border-emerald-300 bg-emerald-50 p-4 not-prose my-4">
                  <p className="text-emerald-900 text-sm">
                    We respect your privacy — we don't sell your data, and we only collect what is needed to fulfill your orders and provide support.
                  </p>
                </div>

                <h2 id="collect">Information We Collect</h2>
                <p>
                  We may collect personal information from you, such as your name,
                  shipping address, email address, and phone number, when you place an
                  order on our site. This information is used solely for the purpose of
                  processing and delivering your order.
                </p>

                <h2 id="use">How We Use Your Information</h2>
                <p>
                  We do not sell, trade, or otherwise transfer your personally
                  identifiable information to outside parties. We are committed to
                  ensuring that your information is secure and will not be shared with
                  any third parties, except as required by law.
                </p>

                <h2 id="security">Security</h2>
                <p>
                  We implement a variety of security measures to maintain the safety of
                  your personal information when you place an order. Your personal
                  information is contained behind secured networks and is only
                  accessible by a limited number of persons who have special access
                  rights to such systems, and are required to keep the information
                  confidential.
                </p>

                <h2 id="consent">Your Consent</h2>
                <p>By using our site, you consent to our privacy policy.</p>

                <h2 id="contact">Contact Us</h2>
                <p>If you have any questions about our Privacy Policy, please contact us:</p>
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

export default PrivacyPolicyPage;
