  "use client"

import { Button } from "@/components/ui/button"
import RotatingText from './RotatingText'
import { useLanguage } from "@/context/language-context"

export function Hero() {
  const { t } = useLanguage()
  return (
    <header
      className="relative bg-cover bg-center bg-no-repeat min-h-screen flex items-center hero-root"
      style={{ backgroundImage: `url('/images/hero-banner.png')` }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div> {/* Overlay for text readability */}
      <div className="container mx-auto px-4 relative z-10 mt-1 pb-6 md:mt-0 md:pb-0 lg:-mt-32"> {/* Adjust margins: lower text on mobile only */}
        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8 items-center text-white">
          <div>
            <div className="md:mt-14">
              <div className="flex items-center gap-2">
                <img src="/images/tinty.png" alt="Tintu Cuts Logo" className="h-15 w-15 md:h-17 md:w-17" />
                <h1 className="text-4xl md:text-7xl font-bold tracking-tight text-pretty hero-title">{t("hero.brand", "Tintu Cuts")}</h1>
              </div>
              <h2 className="mt-4 text-white leading-relaxed max-w-prose flex flex-col md:flex-row items-start md:items-center gap-2 ml-4 hero-tagline">
                <span className="text-3xl md:text-3xl font-bold">{t("hero.tagline.leading", "We deliver")}</span>
                <RotatingText
                  texts={[
                    t("hero.rotating.1", "fresh-cut"),
                    t("hero.rotating.2", "dry-fish"),
                    t("hero.rotating.3", "frozen-meat"),
                    t("hero.rotating.4", "non-frozen meat"),
                  ]}
                  mainClassName="inline-block bg-[#d50b17] text-white rounded-lg px-3 py-1.5 transition-all duration-300 ease-in-out rotating-text"
                  staggerFrom={"last"}
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "-120%" }}
                  staggerDuration={0.025}
                  splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                  elementLevelClassName="font-bold text-3xl md:text-4xl"
                  transition={{ type: "spring", damping: 30, stiffness: 400 }}
                  rotationInterval={2000}
                />
              </h2>
              <h3 className="mt-4 text-white leading-relaxed max-w-prose ml-4 text-lg md:text-xl font-bold">
                {t("hero.subtitle", "Dive into a world of exquisite seafood. Freshness guaranteed, taste perfected, delivered right to your table.")}
              </h3>
              <div className="mt-6 flex items-center gap-3 ml-4 hero-cta">
                <Button  className="bg-[#f9bb10] text-black hover:opacity-90"><a href="shop">{t("btn.shopNow", "Shop Now")}</a></Button>
                <a href="#categories">
                  <Button className="bg-white text-black border border-border hover:bg-white/90">
                    {t("btn.exploreCategories", "Explore Categories")}
                  </Button>
                </a>
              </div>
            </div>
            {/* iPad (md) image below text */}
            <div className="mt-8 md:mt-4 md:block lg:hidden">
              <img
                src="/images/no-bg-image.png"
                alt="Decorative fish image"
                className="mx-auto max-h-[60vh] object-contain animate-fade-in-right brightness-80"
              />
            </div>
          </div>
        </div>
      </div>
      {/* Absolute image for large screens */}
      <img
        src="/images/no-bg-image.png"
        alt="Decorative fish image"
        className="hidden lg:block absolute right-40 top-1/2 -translate-y-1/2 h-7/10 object-contain animate-fade-in-right brightness-80"
      />
    </header>
  )
}
