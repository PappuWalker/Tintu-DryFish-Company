import { CategoriesGrid } from "@/components/categories-grid"
import { Hero } from "@/components/hero"
import { HighlyRecommendedSection } from "@/components/highly-recommended-section"
import { ProductSection } from "@/components/product-section"
import { Reviews } from "@/components/reviews"
import StickyFooter from "@/components/ui/footer"
import { getRandomProducts } from "@/lib/products"
import { getHighlyRecommendedProducts } from "@/lib/highly-recommended-products"

export default function HomePage() {
  const featuredProducts = getRandomProducts(8);
  const highlyRecommendedProducts = getHighlyRecommendedProducts(8);

  return (
    <main className="min-h-screen">
      <Hero />

      <section id="categories" className="container mx-auto px-4 py-10">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-pretty mb-6">Shop by Category</h2>
        <CategoriesGrid />
      </section>

      <section className="container mx-auto px-4 py-10">
        <HighlyRecommendedSection />
      </section>

      <section className="container mx-auto px-4 py-10">
        <ProductSection
          title="Featured Products"
          products={featuredProducts}
        />
      </section>

      <section className="container mx-auto px-4 py-10">
        <Reviews />
      </section>

      <StickyFooter />
    </main>
  )
}
