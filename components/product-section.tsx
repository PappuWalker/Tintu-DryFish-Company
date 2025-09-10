"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Product } from "@/lib/products"
import GlareHover from './GlareHover'
import { useCart } from "@/context/cart-context"
import { useCallback } from "react";
import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";

export function ProductSection({ title, products }: { title: string; products: Product[] }) {
  const { cart, addToCart, updateQuantity } = useCart();

  const handleAdd = useCallback((e: React.MouseEvent, p: Product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(p, 1);
  }, [addToCart]);

  const handleUpdateQuantity = useCallback((e: React.MouseEvent, p: Product, quantity: number) => {
    e.preventDefault();
    e.stopPropagation();
    updateQuantity(p.name, quantity);
  }, [updateQuantity]);

  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-pretty mb-6">{title}</h2>
      <div className="grid gap-4 grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
        {products.map((p, index) => {
          const cartItem = cart.find((item) => item.name === p.name);
          return (
            <Link href={`/product/${encodeURIComponent(p.name.toLowerCase().replace(/\s+/g, '-'))}`} key={index}>
              <GlareHover
                glareColor="#000000"
                glareOpacity={0.3}
                glareAngle={-30}
                glareSize={400}
                transitionDuration={600}
                playOnce={false}
                width="auto"
                height="auto"
                background="transparent"
                borderRadius="10px"
                borderColor="transparent"
                className="flex flex-col rounded-lg shadow-lg transition-shadow cursor-pointer overflow-hidden md:w-[300px] md:h-[450px] lg:w-auto lg:h-[528px] mx-auto"
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
                  {cartItem ? (
                    <div className="flex items-center justify-between rounded-md border border-primary text-primary w-[90px] h-[35px]">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => handleUpdateQuantity(e, p, cartItem.quantity - 1)}
                      >
                        <MinusIcon className="h-4 w-4" />
                      </Button>
                      <span className="text-sm font-medium">{cartItem.quantity}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => handleUpdateQuantity(e, p, cartItem.quantity + 1)}
                      >
                        <PlusIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <Button className="w-full bg-primary text-primary-foreground hover:opacity-90" onClick={(e) => handleAdd(e, p)}>
                      Add to Cart
                    </Button>
                  )}
                </div>
              </GlareHover>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
