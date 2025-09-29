"use client";

import React from "react";
import { useLanguage } from "@/context/language-context";

export default function LangText({ en, ta }: { en: React.ReactNode; ta: React.ReactNode }) {
  const { lang } = useLanguage();
  return <>{lang === "ta" ? ta : en}</>;
}
