"use client"

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

const SQRT_5000 = Math.sqrt(5000);

// Dummy review data, adapted from components/reviews.tsx
const reviewsData = [
  {
    id: "r1",
    name: "Anita",
    text: "Super fresh and quick delivery. The salmon was perfect for grilling!",
    rating: 5,
    imgSrc: "https://i.pravatar.cc/150?img=1" // Placeholder image
  },
  {
    id: "r2",
    name: "Rahul",
    text: "Great selection of dry fish and frozen prawns. Will order again.",
    rating: 4,
    imgSrc: "https://i.pravatar.cc/150?img=2" // Placeholder image
  },
  {
    id: "r3",
    name: "Meera",
    text: "Loved the fresh cuts—cleaned and ready to cook. Highly recommend Tintu Cuts.",
    rating: 5,
    imgSrc: "https://i.pravatar.cc/150?img=3" // Placeholder image
  },
  {
    id: "r4",
    name: "Priya",
    text: "The quality of the fish is consistently excellent. Always fresh!",
    rating: 5,
    imgSrc: "https://i.pravatar.cc/150?img=4"
  },
  {
    id: "r5",
    name: "Suresh",
    text: "Fast delivery and well-packaged. The prawns were delicious.",
    rating: 4,
    imgSrc: "https://i.pravatar.cc/150?img=5"
  },
  {
    id: "r6",
    name: "Deepa",
    text: "Tintu Cuts has become my go-to for seafood. Never disappointed.",
    rating: 5,
    imgSrc: "https://i.pravatar.cc/150?img=6"
  },
  {
    id: "r7",
    name: "Arjun",
    text: "Excellent service and fresh products. Highly satisfied!",
    rating: 5,
    imgSrc: "https://i.pravatar.cc/150?img=7"
  },
  {
    id: "r8",
    name: "Kavya",
    text: "The dry fish selection is amazing. Authentic taste.",
    rating: 4,
    imgSrc: "https://i.pravatar.cc/150?img=8"
  },
];

// Map reviewsData to the format expected by StaggerTestimonials
const mappedTestimonials = reviewsData.map(review => ({
  tempId: Math.random(), // StaggerTestimonials uses tempId, so generate one
  testimonial: review.text,
  by: `${review.name}, ${review.rating} Stars`, // Combine name and rating for 'by' field
  imgSrc: review.imgSrc,
}));

interface TestimonialCardProps {
  position: number;
  testimonial: typeof mappedTestimonials[0];
  handleMove: (steps: number) => void;
  cardSize: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ 
  position, 
  testimonial, 
  handleMove, 
  cardSize 
}) => {
  const isCenter = position === 0;

  return (
    <div
      onClick={() => handleMove(position)}
      className={cn(
        "absolute left-1/2 top-1/2 cursor-pointer border-2 p-8 transition-all duration-500 ease-in-out",
        isCenter 
          ? "z-10 bg-primary text-primary-foreground border-primary" 
          : "z-0 bg-card text-card-foreground border-border hover:border-primary/50"
      )}
      style={{
        width: cardSize,
        height: cardSize,
        clipPath: `polygon(50px 0%, calc(100% - 50px) 0%, 100% 50px, 100% 100%, calc(100% - 50px) 100%, 50px 100%, 0 100%, 0 0)`,
        transform: `
          translate(-50%, -50%) 
          translateX(${(cardSize / 1.5) * position}px)
          translateY(${isCenter ? -65 : position % 2 ? 15 : -15}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
        `,
        boxShadow: isCenter ? "0px 8px 0px 4px hsl(var(--border))" : "0px 0px 0px 0px transparent"
      }}
    >
      <span
        className="absolute block origin-top-right rotate-45 bg-border"
        style={{
          right: -2,
          top: 48,
          width: SQRT_5000,
          height: 2
        }}
      />
      <img
        src={testimonial.imgSrc}
        alt={`${testimonial.by.split(',')[0]}`}
        className="mb-4 h-14 w-12 bg-muted object-cover object-top"
        style={{
          boxShadow: "3px 3px 0px hsl(var(--background))"
        }}
      />
      <h3 className={cn(
        "text-base sm:text-xl font-medium",
        isCenter ? "text-primary-foreground" : "text-foreground"
      )}>
        "{testimonial.testimonial}"
      </h3>
      <p className={cn(
        "absolute bottom-8 left-8 right-8 mt-2 text-sm italic",
        isCenter ? "text-primary-foreground/80" : "text-muted-foreground"
      )}>
        - {testimonial.by}
      </p>
    </div>
  );
};


export const StaggeredReviews: React.FC = () => {
  const [cardSize, setCardSize] = useState(365);
  const [testimonialsList, setTestimonialsList] = useState(mappedTestimonials);

  const handleMove = (steps: number) => {
    const newList = [...testimonialsList];
    if (steps > 0) {
      for (let i = steps; i > 0; i--) {
        const item = newList.shift();
        if (!item) return;
        newList.push({ ...item, tempId: Math.random() });
      }
    } else {
      for (let i = steps; i < 0; i++) {
        const item = newList.pop();
        if (!item) return;
        newList.unshift({ ...item, tempId: Math.random() });
      }
    }
    setTestimonialsList(newList);
  };

  useEffect(() => {
    const updateSize = () => {
      const { matches } = window.matchMedia("(min-width: 640px)");
      setCardSize(matches ? 365 : 290);
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      handleMove(1);
    }, 3000); // Scroll every 3 seconds

    return () => clearInterval(interval);
  }, [testimonialsList]); // Re-run effect when testimonialsList changes to keep the interval active


  return (
    <section className="container mx-auto px-4 py-10">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">What Our Customers Say</h2>
      <div
        className="relative w-full overflow-hidden bg-muted/30"
        style={{ height: 600 }}
      >
        {testimonialsList.map((testimonial, index) => {
          const position = testimonialsList.length % 2
            ? index - (testimonialsList.length + 1) / 2
            : index - testimonialsList.length / 2;
          return (
            <TestimonialCard
              key={testimonial.tempId}
              testimonial={testimonial}
              handleMove={handleMove}
              position={position}
              cardSize={cardSize}
            />
          );
        })}
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
          <button
            onClick={() => handleMove(-1)}
            className={cn(
              "flex h-14 w-14 items-center justify-center text-2xl transition-colors",
              "bg-background border-2 border-border hover:bg-primary hover:text-primary-foreground",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            )}
            aria-label="Previous testimonial"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={() => handleMove(1)}
            className={cn(
              "flex h-14 w-14 items-center justify-center text-2xl transition-colors",
              "bg-background border-2 border-border hover:bg-primary hover:text-primary-foreground",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            )}
            aria-label="Next testimonial"
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
};
