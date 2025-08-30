export function SiteFooter() {
  return (
    <footer className="mt-12 border-t border-border bg-card">
      <div className="container mx-auto px-4 py-8 grid gap-6 md:grid-cols-3">
        <div>
          <h3 className="font-semibold tracking-tight">Tintu Cuts</h3>
          <p className="text-sm text-muted-foreground mt-2">Premium seafood, fresh or frozen, delivered fast.</p>
        </div>
        <div>
          <h4 className="font-medium">Links</h4>
          <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
            <li>
              <a href="#" className="hover:text-foreground">
                Shop
              </a>
            </li>
            <li>
              <a href="#categories" className="hover:text-foreground">
                Categories
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-foreground">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-medium">Stay Updated</h4>
          <p className="mt-2 text-sm text-muted-foreground">Get the latest arrivals and offers.</p>
          <form className="mt-3 flex gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
              aria-label="Email address"
            />
            <button type="submit" className="rounded-md bg-accent px-4 py-2 text-accent-foreground text-sm">
              Subscribe
            </button>
          </form>
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
