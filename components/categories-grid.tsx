import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { products } from "@/lib/products"

export function CategoriesGrid() {
  const uniqueCategories = Array.from(new Set(products.map(p => p.category))).map(category => {
    const product = products.find(p => p.category === category);
    return {
      key: category,
      label: category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
      image: product?.image || "/placeholder.svg?height=400&width=400&query=category"
    };
  });

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {uniqueCategories.map((cat) => (
        <Link href={`/category/${encodeURIComponent(cat.key.replace(/\s+/g, '-'))}`} key={cat.key}>
          <Card className="rounded-lg hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="p-0">
              <div className="aspect-square overflow-hidden rounded-t-lg">
                <img
                  src={cat.image}
                  alt={`${cat.label} category`}
                  className="h-full w-full object-cover"
                />
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <CardTitle className="text-center text-base">{cat.label}</CardTitle>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
