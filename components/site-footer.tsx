export function SiteFooter() {
  return (
    <footer className="mt-12 border-t border-border bg-card">
      <div className="container mx-auto px-4 py-8 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <div>
          <h3 className="font-semibold tracking-tight">Tintu Cuts</h3>
          <p className="text-sm text-muted-foreground mt-2">Premium seafood, fresh or frozen, delivered fast.</p>
        </div>
        <div>
          <h4 className="font-medium">Links</h4>
          <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
            <li>
              <a href="/shop" className="hover:text-foreground">
                Shop
              </a>
            </li>
            <li>
              <a href="/category" className="hover:text-foreground">
                Categories
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-foreground">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-medium">Company</h4>
          <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
            <li>
              <a href="/" className="hover:text-foreground">
                Tintu Cuts
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-foreground">
                Our Mission
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-foreground">
                Help Center
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container mx-auto px-4 py-4 text-xs text-muted-foreground">
          © {new Date().getFullYear()} Tintu Cuts. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
