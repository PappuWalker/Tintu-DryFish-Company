  "use client"

import { Button } from "@/components/ui/button"
import RotatingText from './RotatingText'

export function Hero() {
  return (
    <header
      className="relative bg-cover bg-center bg-no-repeat min-h-screen flex items-center"
      style={{ backgroundImage: `url('/images/hero-banner.png')` }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div> {/* Overlay for text readability */}
      <div className="container mx-auto px-4 relative z-10 -mt-32"> {/* Adjusted negative margin-top to move content further up */}
        <div className="grid md:grid-cols-2 gap-8 items-center text-white">
          <div>
            <div className="flex items-center gap-2">
              <img src="/images/tinty.png" alt="Tintu Cuts Logo" className="h-15 w-15 md:h-17 md:w-17" />
              <h1 className="text-3xl md:text-7xl font-bold tracking-tight text-pretty">Tintu Cuts</h1>
            </div>
            <h2 className="mt-4 text-white leading-relaxed max-w-prose flex items-center gap-2 ml-4">
              <span className="text-3xl font-bold">We deliver</span>
              <RotatingText
                texts={["fresh-cut", "dry-fish", "frozen-meat", "non-frozen meat"]}
                mainClassName="inline-block bg-[#d50b17] text-white rounded-lg px-2 py-1 transition-all duration-300 ease-in-out"
                staggerFrom={"last"}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-120%" }}
                staggerDuration={0.025}
                splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                elementLevelClassName="font-bold text-3xl"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                rotationInterval={2000}
              />
            </h2>
            <h3 className="mt-4 text-white leading-relaxed max-w-prose ml-4 text-xl font-bold">
              Dive into a world of exquisite seafood. Freshness guaranteed, taste perfected, delivered right to your table.
            </h3>
            <div className="mt-6 flex items-center gap-3 ml-4">
              <Button  className="bg-[#f9bb10] text-black hover:opacity-90"><a href="shop">Shop Now</a></Button>
              <a href="#categories">
                <Button variant="secondary" className="border border-border text-black hover:bg-white hover:text-black">
                  Explore Categories
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
      <img
        src="/images/no-bg-image.png"
        alt="Decorative fish image"
        className="absolute right-40 top-1/2 -translate-y-1/2 h-7/10 object-contain animate-fade-in-right brightness-80"
      />
    </header>
  )
}
