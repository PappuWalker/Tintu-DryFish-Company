import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Product } from "@/lib/products"

export function ProductSection({ title, products }: { title: string; products: Product[] }) {
  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-pretty mb-6">{title}</h2>
      <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
        {products.map((p, index) => (
          <Link href={`/product/${encodeURIComponent(p.name.toLowerCase().replace(/\s+/g, '-'))}`} key={index}>
            <Card className="flex flex-col h-full">
              <CardHeader className="p-0">
                <div className="aspect-[4/3] overflow-hidden rounded-t-lg">
                  <img
                    src={p.image || "/placeholder.svg?height=400&width=533&query=product"}
                    alt={p.name}
                    className="h-full w-full object-cover"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-4 flex-1">
                <CardTitle className="text-base">{p.name}</CardTitle>
                <p className="mt-2 text-primary font-semibold">₹{p.price.toFixed(2)}</p>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button className="w-full bg-primary text-primary-foreground hover:opacity-90">Add to Cart</Button>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
