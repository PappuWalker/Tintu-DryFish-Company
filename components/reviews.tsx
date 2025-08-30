import { Star } from "lucide-react"

const reviews = [
  { id: "r1", name: "Anita", text: "Super fresh and quick delivery. The salmon was perfect for grilling!", rating: 5 },
  { id: "r2", name: "Rahul", text: "Great selection of dry fish and frozen prawns. Will order again.", rating: 4 },
  {
    id: "r3",
    name: "Meera",
    text: "Loved the fresh cuts—cleaned and ready to cook. Highly recommend Tintu Cuts.",
    rating: 5,
  },
]

export function Reviews() {
  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-pretty mb-6">What Our Customers Say</h2>
      <ul className="grid gap-4 md:grid-cols-3">
        {reviews.map((r) => (
          <li key={r.id} className="rounded-lg border border-border p-5 bg-card shadow-sm">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-full bg-secondary" aria-hidden />
              <div>
                <p className="font-medium">{r.name}</p>
                <div className="flex items-center gap-1 text-accent" aria-label={`${r.rating} out of 5 stars`}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < r.rating ? "fill-accent text-accent" : "text-muted-foreground"}
                    />
                  ))}
                </div>
              </div>
            </div>
            <p className="mt-3 text-muted-foreground leading-relaxed">{r.text}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
