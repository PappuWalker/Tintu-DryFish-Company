"use client";

import React, { useState, useEffect } from "react";
import { ProductSection } from "@/components/product-section";
import { fetchProducts, Product } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { Star, Minus, Plus, ShoppingCart } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { useParams } from "next/navigation";

export default function ProductDetailPage() {
  const params = useParams<{ slug: string }>();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

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

  if (!product) {
    return <div className="container mx-auto px-4 py-10 text-center">Product not found.</div>;
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

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
            {product.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
          </span>
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <div className="flex items-center text-sm text-muted-foreground mb-4">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
            <span>4.5 · In Stock</span>
          </div>
          <p className="text-lg text-muted-foreground mb-6">
            Traditional sun-dried {product.name} with rich umami flavor.
          </p>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="border rounded-lg p-4">
              <p className="text-sm text-muted-foreground">Category</p>
              <p className="font-semibold capitalize">{product.category}</p>
            </div>
            <div className="border rounded-lg p-4">
              <p className="text-sm text-muted-foreground">Best For</p>
              <p className="font-semibold">Fry · Curry · Grill</p>
            </div>
          </div>

          <div className="flex items-center justify-between mb-6">
            <span className="text-2xl font-bold">Total ₹{(product.price * quantity).toFixed(2)}</span>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="icon" onClick={() => setQuantity(prev => Math.max(1, prev - 1))}>
                <Minus className="h-4 w-4" />
              </Button>
              <span className="text-lg font-semibold">{quantity}</span>
              <Button variant="outline" size="icon" onClick={() => setQuantity(prev => prev + 1)}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <Button className="w-full bg-primary text-primary-foreground hover:opacity-90" onClick={handleAddToCart}>
            <ShoppingCart className="h-5 w-5 mr-2" /> Add to Cart
          </Button>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <section className="mt-16">
          <ProductSection title="Related Products" products={relatedProducts} />
        </section>
      )}

      <div className="grid md:grid-cols-3 gap-8 mt-16 text-center">
        <div className="border rounded-lg p-6">
          <h3 className="font-semibold text-lg mb-2">Delivery</h3>
          <p className="text-muted-foreground">Same-day dispatch · 24-48h delivery window</p>
        </div>
        <div className="border rounded-lg p-6">
          <h3 className="font-semibold text-lg mb-2">Cleaning</h3>
          <p className="text-muted-foreground">Expertly cleaned and cut, minimal wastage</p>
        </div>
        <div className="border rounded-lg p-6">
          <h3 className="font-semibold text-lg mb-2">Guarantee</h3>
          <p className="text-muted-foreground">Freshness guaranteed or full refund</p>
        </div>
      </div>
    </div>
  );
}
