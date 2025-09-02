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
    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {uniqueCategories.map((cat) => (
        <Link href={`/category/${encodeURIComponent(cat.key.replace(/\s+/g, '-'))}`} key={cat.key}>
          <GlareHover
            glareColor="#ffffff"
            glareOpacity={10.3}
            glareAngle={-30}
            glareSize={700}
            transitionDuration={800}
            playOnce={false}
            width="auto"
            height="auto"
            background="transparent"
            borderRadius="10px"
            borderColor="transparent"
          >
            <div className="rounded-lg shadow-lg transition-shadow cursor-pointer relative overflow-hidden w-[170px] h-[270px] md:w-[300px] md:h-[450px] lg:w-auto lg:h-auto mx-auto">
              <img
                src={cat.image}
                alt={`${cat.label} category`}
                className="object-cover w-[170px] h-[270px] sm:w-[260px] sm:h-[360px] md:w-[300px] md:h-[450px] lg:w-[364px] lg:h-[498px]"
              />
              <div className="absolute inset-0 flex items-center justify-center translate-y-24 md:translate-y-42">
                {/* Mobile: keep current small size */}
                <CustomButton
                  icon={<img src={categoryIcons[cat.label]} alt={cat.label} className="w-11 h-11 object-contain" />}
                  title={cat.label}
                  size="xs"
                  className="bg-white text-black hover:bg-white scale-100 md:hidden"
                />
                {/* md+ : larger button for iPad/PC */}
                <CustomButton
                  icon={<img src={categoryIcons[cat.label]} alt={cat.label} className="w-12 h-12 lg:w-14 lg:h-14 object-contain" />}
                  title={cat.label}
                  size="sm"
                  className="hidden md:inline-flex bg-white text-black hover:bg-white md:scale-110 lg:scale-125 xl:scale-150"
                />
              </div>
            </div>
          </GlareHover>
        </Link>
      ))}
    </div>
  )
}
