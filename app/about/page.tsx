export default function AboutPage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/20" />
        <img src="/images/Fresh-fish.png" alt="About Tintu Cuts" className="h-64 md:h-80 w-full object-cover" />
        <div className="container mx-auto px-4">
          <div className="relative -mt-20 md:-mt-24 bg-white/85 backdrop-blur rounded-2xl p-6 md:p-8 shadow-xl">
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">About Tintu Cuts</h1>
            <p className="mt-3 text-sm md:text-base text-gray-700 max-w-3xl">
              Premium fresh-cut seafood, dry fish, and meat—prepared hygienically and delivered fast.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="container mx-auto px-4 py-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed">
              We source responsibly and prepare with care. Our mission is to make quality seafood and meats
              accessible, affordable, and consistently fresh—so your meals are always memorable.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-2xl border bg-white p-4 text-center">
              <p className="text-3xl font-extrabold">10K+</p>
              <p className="text-xs text-gray-500">Orders Delivered</p>
            </div>
            <div className="rounded-2xl border bg-white p-4 text-center">
              <p className="text-3xl font-extrabold">4.9★</p>
              <p className="text-xs text-gray-500">Avg Rating</p>
            </div>
            <div className="rounded-2xl border bg-white p-4 text-center">
              <p className="text-3xl font-extrabold">100%</p>
              <p className="text-xs text-gray-500">Hygiene</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="container mx-auto px-4 pb-14">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">What We Value</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="rounded-2xl border bg-white p-6">
            <h3 className="font-semibold text-lg mb-2">Quality</h3>
            <p className="text-sm text-gray-700">Fresh sourcing, cold chain maintenance, and expert cuts.</p>
          </div>
          <div className="rounded-2xl border bg-white p-6">
            <h3 className="font-semibold text-lg mb-2">Trust</h3>
            <p className="text-sm text-gray-700">Transparent processes and reliable delivery windows.</p>
          </div>
          <div className="rounded-2xl border bg-white p-6">
            <h3 className="font-semibold text-lg mb-2">Care</h3>
            <p className="text-sm text-gray-700">Eco-conscious packaging and customer-first support.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
