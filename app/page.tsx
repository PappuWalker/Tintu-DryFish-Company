import { CategoriesGrid } from "@/components/categories-grid"
import { Hero } from "@/components/hero"
import { ProductSection } from "@/components/product-section"
import { Reviews } from "@/components/reviews"
import { SiteFooter } from "@/components/site-footer"
import { products } from "@/lib/products"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Hero />

      <section id="categories" className="container mx-auto px-4 py-10">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-pretty mb-6">Shop by Category</h2>
        <CategoriesGrid />
      </section>

      <section className="container mx-auto px-4 py-10">
        <ProductSection
          title="Featured Products"
          products={products.slice(0, 8)}
        />
      </section>

      <section className="container mx-auto px-4 py-10">
        <Reviews />
      </section>

      <SiteFooter />
    </main>
  )
}
