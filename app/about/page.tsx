"use client";

import ProductGallery from '@/components/product-gallery';
import { useLanguage } from "@/context/language-context";

export default function AboutPage() {
  const { t } = useLanguage();
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Background image for mobile screens */}
        <img src="/images/mobile-about.jpg" alt="About Tintu Cuts Mobile Background" className="absolute inset-0 h-full w-full object-cover block md:hidden" />
        {/* Background image for medium and larger screens */}
        <img src="/images/about-bg.jpg" alt="About Tintu Cuts Background" className="absolute inset-0 h-full w-full object-cover hidden md:block" />
        {/* Foreground image (Fresh-fish.png) - remains as is, but ensure it's not conflicting with the background */}
        <img src="/images/Fresh-fish.png" alt="About Tintu Cuts" className="w-[375px] h-[250px] object-cover mx-auto md:w-full md:h-auto md:max-w-[1050px] md:max-h-[473px]" />
        <div className="container mx-auto px-4">
          <div className="relative -mt-20 md:-mt-24 bg-background/85 backdrop-blur rounded-2xl p-6 md:p-8 shadow-xl">
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground">{t("about.title", "About Tintu Cuts")}</h1>
            <p className="mt-3 text-sm md:text-base text-muted-foreground max-w-3xl">
              {t("about.subtitle", "Premium fresh-cut seafood, dry fish, and meat—prepared hygienically and delivered fast.")}
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="container mx-auto px-4 py-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-3">{t("about.ourMission", "Our Mission")}</h2>
            <p className="text-gray-700 dark:text-white leading-relaxed">
              {t("about.ourMission.text", "We source responsibly and prepare with care. Our mission is to make quality seafood and meats accessible, affordable, and consistently fresh—so your meals are always memorable.")}
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-2xl border border-border bg-card p-4 text-center">
              <p className="text-3xl font-extrabold text-foreground">10K+</p>
              <p className="text-xs text-muted-foreground">{t("about.stats.orders", "Orders Delivered")}</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-4 text-center">
              <p className="text-3xl font-extrabold text-foreground">4.6★</p>
              <p className="text-xs text-muted-foreground">{t("about.stats.rating", "Avg Rating")}</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-4 text-center">
              <p className="text-3xl font-extrabold text-foreground">100%</p>
              <p className="text-xs text-muted-foreground">{t("about.stats.hygiene", "Hygiene")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="container mx-auto px-4 pb-14">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">{t("about.values", "What We Value")}</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="font-semibold text-lg mb-2 text-foreground">{t("about.values.quality", "Quality")}</h3>
            <p className="text-sm text-muted-foreground">{t("about.values.quality.text", "Fresh sourcing, cold chain maintenance, and expert cuts.")}</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="font-semibold text-lg mb-2 text-foreground">{t("about.values.trust", "Trust")}</h3>
            <p className="text-sm text-muted-foreground">{t("about.values.trust.text", "Transparent processes and reliable delivery windows.")}</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="font-semibold text-lg mb-2 text-foreground">{t("about.values.care", "Care")}</h3>
            <p className="text-sm text-muted-foreground">{t("about.values.care.text", "Eco-conscious packaging and customer-first support.")}</p>
          </div>
        </div>
      </section>

      {/* Product Gallery */}
      <ProductGallery />
    </main>
  );
}
