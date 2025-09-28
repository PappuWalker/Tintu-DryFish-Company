"use client";

import React from "react";
import { Button } from "@/components/ui/button";

export default function GoBackButton({ children }: { children: React.ReactNode }) {
  return (
    <Button variant="outline" onClick={() => window.history.back()}>
      {children}
    </Button>
  );
}
