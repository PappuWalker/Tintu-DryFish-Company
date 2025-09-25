import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions",
};

const TermsAndConditionsPage = () => {
  return (
    <div className="min-h-[70vh]">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-transparent" />
        <div className="container mx-auto px-4 py-10 md:py-14 relative">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Terms and Conditions</h1>
          <p className="text-muted-foreground mt-2 max-w-2xl">Please read these terms carefully before using our website or placing an order.</p>
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
                <li><a className="hover:text-foreground text-muted-foreground" href="#intro">Introduction</a></li>
                <li><a className="hover:text-foreground text-muted-foreground" href="#ipr">Intellectual Property</a></li>
                <li><a className="hover:text-foreground text-muted-foreground" href="#restrictions">Restrictions</a></li>
                <li><a className="hover:text-foreground text-muted-foreground" href="#content">Your Content</a></li>
                <li><a className="hover:text-foreground text-muted-foreground" href="#warranty">No Warranties</a></li>
                <li><a className="hover:text-foreground text-muted-foreground" href="#liability">Limitation of Liability</a></li>
                <li><a className="hover:text-foreground text-muted-foreground" href="#law">Governing Law</a></li>
              </ul>
            </div>
          </aside>

          {/* Main copy */}
          <div className="lg:col-span-9">
            <div className="rounded-xl border border-border bg-card p-6 md:p-8 shadow-sm">
              <div className="prose prose-sm md:prose-base max-w-none prose-headings:scroll-mt-24">
                <p>
                  Welcome to Tintu DryFish Company. These terms and conditions outline
                  the rules and regulations for the use of our website and the purchase
                  of our products.
                </p>

                <h2 id="intro">1. Introduction</h2>
                <p>
                  By accessing this website, we assume you accept these terms and
                  conditions. Do not continue to use Tintu DryFish Company if you do not
                  agree to all of the terms and conditions stated on this page.
                </p>

                <h2 id="ipr">2. Intellectual Property Rights</h2>
                <p>
                  Other than the content you own, under these terms, Tintu DryFish
                  Company and/or its licensors own all the intellectual property rights
                  and materials contained in this website.
                </p>

                <h2 id="restrictions">3. Restrictions</h2>
                <p>You are specifically restricted from all of the following:</p>
                <ul>
                  <li>Publishing any website material in any other media.</li>
                  <li>Selling, sublicensing, and/or otherwise commercializing any website material.</li>
                  <li>Publicly performing and/or showing any website material.</li>
                  <li>Using this website in any way that is or may be damaging to this website.</li>
                  <li>Using this website in any way that impacts user access to this website.</li>
                </ul>

                <h2 id="content">4. Your Content</h2>
                <p>
                  In these terms and conditions, “Your Content” shall mean any audio,
                  video text, images, or other material you choose to display on this
                  website. By displaying Your Content, you grant Tintu DryFish Company a
                  non-exclusive, worldwide irrevocable, sub-licensable license to use,
                  reproduce, adapt, publish, translate, and distribute it in any and
                  all media.
                </p>

                <h2 id="warranty">5. No warranties</h2>
                <p>
                  This website is provided “as is,” with all faults, and Tintu DryFish
                  Company expresses no representations or warranties, of any kind
                  related to this website or the materials contained on this website.
                </p>

                <h2 id="liability">6. Limitation of liability</h2>
                <p>
                  In no event shall Tintu DryFish Company, nor any of its officers,
                  directors, and employees, be held liable for anything arising out of
                  or in any way connected with your use of this website whether such
                  liability is under contract. Tintu DryFish Company, including its
                  officers, directors, and employees shall not be held liable for any
                  indirect, consequential, or special liability arising out of or in
                  any way related to your use of this website.
                </p>

                <h2 id="law">7. Governing Law & Jurisdiction</h2>
                <p>
                  These terms will be governed by and interpreted in accordance with
                  the laws of India, and you submit to the non-exclusive jurisdiction
                  of the state and federal courts located in India for the resolution
                  of any disputes.
                </p>
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

export default TermsAndConditionsPage;
