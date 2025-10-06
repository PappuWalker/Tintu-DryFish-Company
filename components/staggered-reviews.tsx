"use client"

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from "@/context/language-context";

const SQRT_5000 = Math.sqrt(5000);

// Dummy review data (English)
const reviewsDataEn = [
  { id: "r1", name: "Anita", text: "Super fresh and quick delivery. The salmon was perfect for grilling!", rating: 5, imgSrc: "https://plus.unsplash.com/premium_photo-1723568666044-1b066e26b1fb?q=80&w=721&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { id: "r2", name: "Rahul", text: "Great selection of dry fish and frozen prawns. Will order again.", rating: 4, imgSrc: "https://wallpapers.com/images/high/ms-dhoni-dark-blue-sunglasses-fva21cjtsrgvv6p8.webp" },
  { id: "r3", name: "Meera", text: "Loved the fresh cuts—cleaned and ready to cook. Highly recommend Tintu Cuts.", rating: 5, imgSrc: "https://images.unsplash.com/photo-1622782262026-6a327a45014f?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { id: "r4", name: "Priya", text: "The quality of the fish is consistently excellent. Always fresh!", rating: 5, imgSrc: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2F9%2F9f%2FBeautiful_Red_Rose.jpg&f=1&nofb=1&ipt=89bcb4c4450fe8720ec04097cbde50388753e00994281774486cd187282de9bf" },
  { id: "r5", name: "Suresh", text: "Fast delivery and well-packaged. The prawns were delicious.", rating: 4, imgSrc: "https://images.unsplash.com/photo-1598096969068-7f52cac10c83?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { id: "r6", name: "Deepa", text: "Tintu Cuts has become my go-to for seafood. Never disappointed.", rating: 5, imgSrc: "https://images.unsplash.com/photo-1706943262117-b35de4ba50b4?q=80&w=701&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { id: "r7", name: "Arjun", text: "Excellent service and fresh products. Highly satisfied!", rating: 5, imgSrc: "https://plus.unsplash.com/premium_photo-1661963991154-cecd5254a979?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { id: "r8", name: "Kavya", text: "The dry fish selection is amazing. Authentic taste.", rating: 4, imgSrc: "https://images.unsplash.com/photo-1611407940821-896e88707f70?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTl8fGluZGlhbiUyMGdpcmx8ZW58MHx8MHx8fDA%3D" },
];

// Dummy review data (Tamil)
const reviewsDataTa = [
  { id: "r1", name: "அனிதா", text: "மிகவும் புது மீன் மற்றும் வேகமான டெலிவரி. சால்மன் கிரில்லுக்கு சரியானது!", rating: 5, imgSrc: "https://plus.unsplash.com/premium_photo-1723568666044-1b066e26b1fb?q=80&w=721&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { id: "r2", name: "ராகுல்", text: "உலர் மீன் மற்றும் உறைந்த இறால் வகைகள் அருமை. மீண்டும் ஆர்டர் செய்வேன்.", rating: 4, imgSrc: "https://wallpapers.com/images/high/ms-dhoni-dark-blue-sunglasses-fva21cjtsrgvv6p8.webp" },
  { id: "r3", name: "மீரா", text: "புதிய வெட்டுகள்—சுத்தமாகவும் உடனே சமைக்க தயாராகவும். டிண்டு கட்ட்ஸை பரிந்துரைக்கிறேன்.", rating: 5, imgSrc: "https://images.unsplash.com/photo-1622782262026-6a327a45014f?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { id: "r4", name: "பிரியா", text: "மீனின் தரம் எப்போதும் சிறந்தது. எப்போதும் புது!", rating: 5, imgSrc: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2F9%2F9f%2FBeautiful_Red_Rose.jpg&f=1&nofb=1&ipt=89bcb4c4450fe8720ec04097cbde50388753e00994281774486cd187282de9bf" },
  { id: "r5", name: "சுரேஷ்", text: "வேகமான டெலிவரி மற்றும் நன்றாக பேக் செய்யப்பட்டது. இறால் ருசியாக இருந்தது.", rating: 4, imgSrc: "https://images.unsplash.com/photo-1598096969068-7f52cac10c83?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { id: "r6", name: "தீபா", text: "டிண்டு கட்ட்ஸ் என் கடலுணவுக்கான முதன்மை தேர்வாகிவிட்டது. ஒருபோதும் ஏமாற்றவில்லை.", rating: 5, imgSrc: "https://images.unsplash.com/photo-1706943262117-b35de4ba50b4?q=80&w=701&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { id: "r7", name: "அர்ஜுன்", text: "சிறந்த சேவை மற்றும் புது தயாருப்புகள். மிகவும் திருப்தி!", rating: 5, imgSrc: "https://plus.unsplash.com/premium_photo-1661963991154-cecd5254a979?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { id: "r8", name: "கவ்யா", text: "உலர் மீன் வகைகள் அற்புதம். இயல்பான சுவை.", rating: 4, imgSrc: "https://images.unsplash.com/photo-1611407940821-896e88707f70?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTl8fGluZGlhbiUyMGdpcmx8ZW58MHx8MHx8fDA%3D" },
];

const mapReviews = (data: typeof reviewsDataEn) => data.map(review => ({
  tempId: Math.random(),
  testimonial: review.text,
  by: `${review.name}, ${review.rating} ★`,
  imgSrc: review.imgSrc, // Use the imgSrc from the data directly
}));

type Testimonial = {
  tempId: number;
  testimonial: string;
  by: string;
  imgSrc: string;
};

interface TestimonialCardProps {
  position: number;
  testimonial: Testimonial;
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
        className="mb-4 h-16 w-16 rounded-full bg-muted object-cover object-center border border-border"
        loading="lazy"
        referrerPolicy="no-referrer"
        onError={(e) => {
          const name = (testimonial.by?.split(',')[0] || 'User').trim();
          const fallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&size=64&background=E5E7EB&color=111827`;
          const img = e.currentTarget as HTMLImageElement;
          if (img.src !== fallback) {
            img.src = fallback;
          }
        }}
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
  const { t, lang } = useLanguage();
  const [testimonialsList, setTestimonialsList] = useState(mapReviews(lang === 'ta' ? reviewsDataTa : reviewsDataEn));

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

  // Switch data when language changes
  useEffect(() => {
    setTestimonialsList(mapReviews(lang === 'ta' ? reviewsDataTa : reviewsDataEn));
  }, [lang]);

  // No runtime fetch needed for static stock images (Unsplash Source)

  useEffect(() => {
    const interval = setInterval(() => {
      handleMove(1);
    }, 3000); // Scroll every 3 seconds

    return () => clearInterval(interval);
  }, [testimonialsList]); // Re-run effect when testimonialsList changes to keep the interval active


  return (
    <section className="container mx-auto px-4 py-10">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">{t("reviews.title", "What Our Customers Say")}</h2>
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
            aria-label={t("reviews.prev", "Previous testimonial")}
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
            aria-label={t("reviews.next", "Next testimonial")}
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
};
