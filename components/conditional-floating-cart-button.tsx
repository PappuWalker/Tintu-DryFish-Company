"use client";

import { usePathname } from "next/navigation";
import { FloatingCartButton } from "./floating-cart-button";
import React from "react";

export function ConditionalFloatingCartButton() {
  const pathname = usePathname();
  const isCheckoutPage = pathname === "/checkout";

  if (isCheckoutPage) {
    return null;
  }

  return <FloatingCartButton />;
}
