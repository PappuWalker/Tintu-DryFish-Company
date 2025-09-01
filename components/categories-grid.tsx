import Link from "next/link"
import { CustomButton } from "@/components/ui/custom-button"
import { products } from "@/lib/products"
import GlareHover from './GlareHover'

const categoryIcons: { [key: string]: string } = {
  "Dry fish": "/images/dry-fish.png",
  "Fresh cut": "/images/Fresh-fish.png",
  "Frozen": "/images/frozen-meat.png",
  "Non frozen": "/images/non-meat.png",
};

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
          >
            <div className="rounded-lg hover:shadow-lg transition-shadow cursor-pointer relative overflow-hidden">
              <img
                src={cat.image}
                alt={`${cat.label} category`}
                className="w-[364px] h-[498px] object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center translate-y-42">
                <CustomButton
                  icon={<img src={categoryIcons[cat.label]} alt={cat.label} className="w-12 h-12 object-contain" />}
                  title={cat.label}
                  size="md"
                  className="bg-white text-black hover:bg-white"
                />
              </div>
            </div>
          </GlareHover>
        </Link>
      ))}
    </div>
  )
}
