import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Product } from "@/lib/products"
import GlareHover from './GlareHover'

export function ProductSection({ title, products }: { title: string; products: Product[] }) {
  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-pretty mb-6">{title}</h2>
      <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
        {products.map((p, index) => (
          <Link href={`/product/${encodeURIComponent(p.name.toLowerCase().replace(/\s+/g, '-'))}`} key={index}>
            <GlareHover
              glareColor="#ffffff"
              glareOpacity={0.3}
              glareAngle={-30}
              glareSize={300}
              transitionDuration={800}
              playOnce={false}
              width="auto"
              height="auto"
              background="transparent"
              borderRadius="10px"
              borderColor="transparent"
              className="flex flex-col h-[528px] rounded-lg hover:shadow-lg transition-shadow cursor-pointer overflow-hidden"
            >
              <div className="p-0">
                <div className="aspect-square overflow-hidden rounded-t-lg">
                  <img
                    src={p.image || "/placeholder.svg?height=400&width=400&query=product"}
                    alt={p.name}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
              <div className="p-4 flex-1">
                <h3 className="text-base font-semibold">{p.name}</h3>
                <p className="mt-2 text-primary font-semibold">₹{p.price.toFixed(2)}</p>
              </div>
              <div className="p-4 pt-0">
                <Button className="w-full bg-primary text-primary-foreground hover:opacity-90">Add to Cart</Button>
              </div>
            </GlareHover>
          </Link>
        ))}
      </div>
    </div>
  )
}
