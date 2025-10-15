"use client";

import React, { useState, useEffect } from "react";
import { ProductSection } from "@/components/product-section";
import { fetchProducts, Product } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { Star, Minus, Plus, ShoppingCart } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { useParams } from "next/navigation";
import { useLanguage } from "@/context/language-context";
import { useIsMobile } from "@/hooks/use-mobile";

export default function ProductDetailPage() {
  const params = useParams<{ slug: string }>();
  const { addToCart, cart } = useCart();
  const { t, lang } = useLanguage() as any;
  const isMobile = useIsMobile();
  const [quantity, setQuantity] = useState(1);
  const [weightKg, setWeightKg] = useState<0.25 | 0.5 | 1 | 1.5 | 2>(1);
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [justAdded, setJustAdded] = useState(false);

  const slug = decodeURIComponent(String(params.slug));

  useEffect(() => {
    const loadProduct = async () => {
      const allProducts = await fetchProducts();
      const foundProduct = allProducts.find(p => p.name.toLowerCase().replace(/\s+/g, '-') === decodeURIComponent(slug));
      setProduct(foundProduct || null);

      if (foundProduct) {
        const related = allProducts.filter(p => p.category === foundProduct.category && p.name !== foundProduct.name).slice(0, 4);
        setRelatedProducts(related);
      }
    };
    loadProduct();
  }, [slug]);

  // Reset quantity to 1 when switching weight to keep pricing intuitive
  useEffect(() => {
    setQuantity(1);
  }, [weightKg]);

  if (!product) {
    return <div className="container mx-auto px-4 py-10 text-center">{t("product.notFound", "Product not found.")}</div>;
  }

  const handleAddToCart = () => {
    addToCart(product, quantity, weightKg);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  const localizeCategory = (categoryKey: string) => {
    const c = categoryKey.toLowerCase();
    if (c.includes("dry")) return t("category.dryFish", "Dry Fish");
    if (c.includes("fresh")) return t("category.freshCut", "Fresh Cut");
    if (c.includes("frozen")) return t("category.frozen", "Frozen");
    if (c.includes("non frozen") || c.includes("non-frozen") || c.includes("non")) return t("category.nonFrozen", "Non Frozen");
    // Fallback: prettify original
    return categoryKey.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  };

  const inCart = product ? cart.some((item) => item.name === product.name) : false;
  const outOfStock = product && typeof product.inventory === 'number' ? product.inventory <= 0 : false;
  const displayName = product ? ((lang === 'ta' && product.name_ta) ? product.name_ta : product.name) : "";

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-auto object-cover rounded-lg"
          />
          <span className="absolute top-4 left-4 bg-primary text-primary-foreground text-xs font-semibold px-2.5 py-0.5 rounded">
            {localizeCategory(product.category)}
          </span>
          {/* On-sale badge removed as sale flags/prices are no longer used */}
          {outOfStock && (
            <span
              className="absolute top-12 right-4 text-white text-sm font-semibold px-3 py-1 rounded"
              style={{ backgroundColor: '#d30c19' }}
            >
              {t('badge.outOfStock', 'Out of Stock')}
            </span>
          )}
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-2">{displayName}</h1>
          <div className="flex items-center text-sm text-muted-foreground mb-4">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
            <span>{(product.rating ?? 4.5).toFixed(1)} · {!outOfStock ? t("product.inStock", "In Stock") : t('badge.outOfStock', 'Out of Stock')}</span>
          </div>
          <p className="text-lg text-muted-foreground mb-6">
            {product.description && product.description.trim().length > 0
              ? product.description
              : (<>
                  {t("product.desc.prefix", "Traditional sun-dried")} {product.name} {t("product.desc.suffix", "with rich umami flavor.")}
                </>)}
          </p>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="border rounded-lg p-4">
              <p className="text-sm text-muted-foreground">{t("product.category", "Category")}</p>
              <p className="font-semibold">{localizeCategory(product.category)}</p>
            </div>
            <div className="border rounded-lg p-4">
              <p className="text-sm text-muted-foreground">{t("product.bestFor", "Best For")}</p>
              <p className="font-semibold">{t("product.bestFor.values", "Fry · Curry · Grill")}</p>
            </div>
            {typeof product.inventory === 'number' && (
              <div className="border rounded-lg p-4 col-span-2">
                <p className="text-sm text-muted-foreground">{t('product.stock', 'Stock')}</p>
                <p className="font-semibold">{product.inventory}</p>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between mb-2">
            <span className="text-2xl font-bold">
              {t("product.price", "Price")} ₹{(product.price * weightKg).toFixed(2)}
            </span>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="icon" onClick={() => setQuantity(prev => Math.max(1, prev - 1))}>
                <Minus className="h-4 w-4" />
              </Button>
              <span className="text-lg font-semibold">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                disabled={typeof product.inventory === 'number' ? quantity >= product.inventory : false}
                onClick={() => setQuantity(prev => {
                  const stock = typeof product.inventory === 'number' ? product.inventory : Infinity;
                  return Math.min(stock, prev + 1);
                })}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="mb-6 text-sm text-muted-foreground">
            {t("product.total", "Total")}: ₹{((product.price * weightKg) * quantity).toFixed(2)}
          </div>
          {/* Weight selector */}
          <div className="flex items-center gap-2 mb-6">
            <span className="text-sm text-muted-foreground">Weight</span>
            <div className="flex items-center gap-2">
              <Button
                variant={weightKg === 0.25 ? "default" : "outline"}
                size={isMobile ? "sm" : "default"}
                onClick={() => setWeightKg(0.25)}
              >
                250 g
              </Button>
              <Button
                variant={weightKg === 0.5 ? "default" : "outline"}
                size={isMobile ? "sm" : "default"}
                onClick={() => setWeightKg(0.5)}
              >
                500 g
              </Button>
              <Button
                variant={weightKg === 1 ? "default" : "outline"}
                size={isMobile ? "sm" : "default"}
                onClick={() => setWeightKg(1)}
              >
                1 kg
              </Button>
              <Button
                variant={weightKg === 1.5 ? "default" : "outline"}
                size={isMobile ? "sm" : "default"}
                onClick={() => setWeightKg(1.5)}
              >
                1.5 kg
              </Button>
              <Button
                variant={weightKg === 2 ? "default" : "outline"}
                size={isMobile ? "sm" : "default"}
                onClick={() => setWeightKg(2)}
              >
                2 kg
              </Button>
            </div>
          </div>
          <Button
            className="w-full bg-primary text-primary-foreground hover:opacity-90 disabled:opacity-70"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-5 w-5 mr-2" /> {justAdded ? t("product.addedToCart", "Added to Cart") : (isMobile ? t("product.addCart", "add cart") : t("product.addToCart", "add to cart"))}
          </Button>
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-8 mt-16 text-center">
      <div className="border rounded-lg p-6">
        <h3 className="font-semibold text-lg mb-2">{t("product.delivery", "Delivery")}</h3>
        <p className="text-muted-foreground">{t("product.delivery.text", "Same-day dispatch · 24-48h delivery window")}</p>
      </div>
      <div className="border rounded-lg p-6">
        <div className="container mx-auto p-4">
          <h3 className="font-semibold text-lg mb-2">{t("product.cleaning", "Cleaning")}</h3>
          <p className="text-muted-foreground">{t("product.cleaning.text", "Expertly cleaned and cut, minimal wastage")}</p>
        </div>
      </div>
      <div className="border rounded-lg p-6">
        <h3 className="font-semibold text-lg mb-2">{t("product.guarantee", "Guarantee")}</h3>
        <p className="text-muted-foreground">{t("product.guarantee.text", "Freshness guaranteed or full refund")}</p>
      </div>
    </div>

    {relatedProducts.length > 0 && (
      <div className="mt-16">
        <ProductSection title={t("product.related", "Related Products")} products={relatedProducts} />
      </div>
    )}
  </div>
  );
}
