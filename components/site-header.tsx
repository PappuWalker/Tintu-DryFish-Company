"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Home, Store, Info, Phone, Menu, Search } from "lucide-react"
import { useCart } from "@/context/cart-context"
import { useEffect, useState } from "react"
import { ThemeToggle } from "@/components/theme-toggle"
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { CommandMenu, CommandButton } from "@/components/command-menu"
import { CartDrawer } from "@/components/cart-drawer"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useLanguage } from "@/context/language-context"
import { usePathname } from "next/navigation";
import { useDeviceType } from "@/hooks/use-device-type"; // Import the new hook

export function SiteHeader() {
  const { cartItemCount } = useCart();
  const [commandOpen, setCommandOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { lang, setLang, t } = useLanguage()
  const { isMobile, isTablet, isDesktop } = useDeviceType(); // Use the new hook
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const isAboutPage = pathname === "/about";
  const shouldAnimateLogo = isHomePage || isAboutPage; // Animation applies to home/about

  // Logo should be visible initially if it's NOT a tablet and NOT an animating page
  const [showTintyLogo, setShowTintyLogo] = useState(!isTablet && !shouldAnimateLogo);

  useEffect(() => {
    // If it's a tablet, the logo should never be shown.
    if (isTablet) {
      setShowTintyLogo(false);
      return;
    }

    // If it's not an animating page, the logo should be constantly visible.
    if (!shouldAnimateLogo) {
      setShowTintyLogo(true);
      return;
    }

    // Otherwise, it's an animating page (home/about) and not a tablet, so apply scroll effect.
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.8) { // Adjust threshold as needed
        setShowTintyLogo(true);
      } else {
        setShowTintyLogo(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isTablet, shouldAnimateLogo, pathname]);

  function LanguageToggle() {
    return (
      <div className="flex items-center gap-1 rounded-md p-0.5 bg-black/10 dark:bg-white/10">
        <Button
          variant={lang === "en" ? "secondary" : "ghost"}
          size="sm"
          className="h-7 px-2 text-xs"
          onClick={() => setLang("en")}
        >
          <span className={`${lang === "en" ? "text-black" : "text-white"} dark:text-white`}>EN</span>
        </Button>
        <Button
          variant={lang === "ta" ? "secondary" : "ghost"}
          size="sm"
          className="h-7 px-2 text-xs"
          onClick={() => setLang("ta")}
        >
          <span className={`${lang === "ta" ? "text-black" : "text-white"} dark:text-white`}>தமிழ்</span>
        </Button>
      </div>
    )
  }

  return (
    <header
      className="fixed top-0 z-40 w-full border-b border-white/20 backdrop-blur-md"
      style={{ background: 'linear-gradient(to right, #010907, #242e30)' }}
    >
      <div className="container flex h-16 items-center justify-between gap-4 px-4">
        {/* tinty.png with scroll effect for home/about on mobile/desktop, or constant on other mobile/desktop pages */}
        <AnimatePresence>
          {!isTablet && showTintyLogo && ( // Only render if NOT tablet and showTintyLogo is true
            <motion.div
              initial={shouldAnimateLogo ? { opacity: 0, x: -20 } : undefined}
              animate={{ opacity: 1, x: 0 }}
              exit={shouldAnimateLogo ? { opacity: 0, x: -20 } : undefined}
              transition={{ duration: 0.3 }}
              className="flex items-center mr-auto"
            >
              <Link href="/">
                <Image src="/images/tinty.png" alt="Tintu Cuts" width={32} height={32} className="h-8 w-8" />
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
        {/* Mobile: search bar (166x36), theme, hamburger */}
        <div className="ml-auto flex items-center md:hidden gap-2">
          <Button
            variant="ghost"
            size="icon"
            aria-label={t("search.open", "Open search")}
            onClick={() => setCommandOpen(true)}
            className="text-white hover:bg-white/20"
          >
            <Search className="h-5 w-5" />
          </Button>
          <ThemeToggle />
          <LanguageToggle />
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu" className="text-white hover:bg-white/20">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-80 max-w-[85vw] p-0 text-white bg-gradient-to-b from-[#0b1413] to-[#202a2b] border-l border-white/10"
            >
              <div className="px-3 pt-3 pb-2.5 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  {/* Removed tinty.png from mobile menu header */}
                  <img src="/images/tinty.png" alt="Tintu Cuts" className="h-6 w-6" />
                  <div className="flex flex-col leading-none">
                    <h3 className="text-base font-semibold text-white">Tintu Cuts</h3>
                    <p className="text-xs text-white/70">{t("nav.menu", "Menu")}</p>
                  </div>
                  {/* Removed LanguageToggle from inside the Sheet menu */}
                </div>
              </div>
              <nav className="pl-1 pr-2 py-2 grid gap-0.5">
                <Link
                  href="/"
                  className="flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-sm hover:bg-white/10 transition-colors"
                  onClick={() => setMenuOpen(false)}
                  aria-label={t("nav.home", "Home")}
                >
                  <Home className="h-5 w-5 text-white/80" />
                  <span>{t("nav.home", "Home")}</span>
                </Link>
                <Link
                  href="/shop"
                  className="flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-sm hover:bg-white/10 transition-colors"
                  onClick={() => setMenuOpen(false)}
                  aria-label={t("nav.shop", "Shop")}
                >
                  <Store className="h-5 w-5 text-white/80" />
                  <span>{t("nav.shop", "Shop")}</span>
                </Link>
                <Link
                  href="/about"
                  className="flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-sm hover:bg-white/10 transition-colors"
                  onClick={() => setMenuOpen(false)}
                  aria-label={t("nav.about", "About")}
                >
                  <Info className="h-5 w-5 text-white/80" />
                  <span>{t("nav.about", "About")}</span>
                </Link>
                <Link
                  href="/contact"
                  className="flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-sm hover:bg-white/10 transition-colors"
                  onClick={() => setMenuOpen(false)}
                  aria-label={t("nav.contact", "Contact")}
                >
                  <Phone className="h-5 w-5 text-white/80" />
                  <span>{t("nav.contact", "Contact")}</span>
                </Link>
                <div className="my-2 h-px bg-white/10" />
                <Button
                  className="mx-1.5 mt-0.5 flex items-center justify-center gap-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 text-sm py-1.5"
                  onClick={() => setCartOpen(true)}
                >
                  <ShoppingCart className="h-5 w-5" />
                  {t("cart.view", "View Cart")} {cartItemCount > 0 ? `(${cartItemCount})` : ''}
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        <nav className="hidden md:flex gap-4 md:gap-5 lg:gap-6 mx-auto">
          <Link
            href="/"
            className="flex items-center text-sm md:text-sm lg:text-base font-semibold text-white"
          >
            <Home className="mr-2 h-4 w-4" aria-hidden="true" />
            <span>{t("nav.home", "Home")}</span>
          </Link>
          <Link
            href="/shop"
            className="flex items-center text-sm md:text-sm lg:text-base font-semibold text-white"
          >
            <Store className="mr-2 h-4 w-4" aria-hidden="true" />
            <span>{t("nav.shop", "Shop")}</span>
          </Link>
          <Link
            href="/about"
            className="flex items-center text-sm md:text-sm lg:text-base font-semibold text-white"
          >
            <Info className="mr-2 h-4 w-4" aria-hidden="true" />
            <span>{t("nav.about", "About")}</span>
          </Link>
          <Link
            href="/contact"
            className="flex items-center text-sm md:text-sm lg:text-base font-semibold text-white"
          >
            <Phone className="mr-2 h-4 w-4" aria-hidden="true" />
            <span>{t("nav.contact", "Contact")}</span>
          </Link>
        </nav>
        <div className="hidden md:flex items-center gap-2">
          {lang === "ta" ? (
            <Button
              variant="ghost"
              size="icon"
              aria-label={t("search.open", "Open search")}
              onClick={() => setCommandOpen(true)}
              className="text-white hover:bg-white/20"
            >
              <Search className="h-5 w-5" />
            </Button>
          ) : (
            <CommandButton onClick={() => setCommandOpen(true)} />
          )}
          <ThemeToggle />
          <LanguageToggle />
          <Button variant="ghost" size="icon" className="relative text-white hover:bg-white/20" onClick={() => setCartOpen(true)}>
            <ShoppingCart className="h-5 w-5" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                {cartItemCount}
              </span>
            )}
            <span className="sr-only">{t("cart.label", "Cart")}</span>
          </Button>
        </div>
      </div>
      <CommandMenu open={commandOpen} onOpenChange={setCommandOpen} />
      <CartDrawer open={cartOpen} onOpenChange={setCartOpen} />
    </header>
  )
}
