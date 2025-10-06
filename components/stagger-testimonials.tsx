"use client"

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const SQRT_5000 = Math.sqrt(5000);

const testimonials = [
  { tempId: 0, testimonial: "Super fresh and neatly cleaned. The pomfret fry came out perfect!", by: "Anita, Chennai", imgSrc: "https://plus.unsplash.com/premium_photo-1723568666044-1b066e26b1fb?q=80&w=721&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { tempId: 1, testimonial: "Quick delivery and great packing. The prawns were so juicy.", by: "Rahul, Bengaluru", imgSrc: "https://wallpapers.com/images/high/ms-dhoni-dark-blue-sunglasses-fva21cjtsrgvv6p8.webp" },
  { tempId: 2, testimonial: "Loved the dry fish selection—authentic taste just like home.", by: "Meera, Coimbatore", imgSrc: "https://images.unsplash.com/photo-1622782262026-6a327a45014f?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { tempId: 3, testimonial: "Consistent quality. The seer fish was fresh and firm.", by: "Suresh, Hyderabad", imgSrc: "https://images.unsplash.com/photo-1598096969068-7f52cac10c83?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { tempId: 4, testimonial: "Very hygienic cuts and minimal wastage. Value for money!", by: "Deepa, Chennai", imgSrc: "https://images.unsplash.com/photo-1706943262117-b35de4ba50b4?q=80&w=701&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { tempId: 5, testimonial: "Their vanjaram slices were perfect for grilling. Family loved it.", by: "Arjun, Kochi", imgSrc: "https://i0.wp.com/sportytell.com/wp-content/uploads/2018/12/Lionel-Messi-of-FC-Barcelona.jpg?fit=1920%2C1080&ssl=1" },
  { tempId: 6, testimonial: "Non-frozen mutton was tender and clean. Cooking was a breeze.", by: "Priya, Chennai", imgSrc: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2F9%2F9f%2FBeautiful_Red_Rose.jpg&f=1&nofb=1&ipt=89bcb4c4450fe8720ec04097cbde50388753e00994281774486cd187282de9bf" },
  { tempId: 7, testimonial: "Fish curry tasted amazing. Fresh cuts make all the difference.", by: "Kavya, Madurai", imgSrc: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fsuperstarsbio.com%2Fwp-content%2Fuploads%2F2019%2F09%2Fzayn-malik-facts.jpg&f=1&nofb=1&ipt=63091b4602788dce791c5084965be1fb3f6ed7d5e6c920b8f347634d166d4c75" },
  { tempId: 8, testimonial: "On-time delivery and courteous support on WhatsApp.", by: "Vikram, Tirunelveli", imgSrc: "https://images.unsplash.com/photo-1729157661483-ed21901ed892?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { tempId: 9, testimonial: "Dry fish was clean, low salt, and very flavorful.", by: "Latha, Puducherry", imgSrc: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%2Fid%2FOIP.lFPGmh3TqTLg-pxFtjW-KgHaLH%3Fcb%3D12%26pid%3DApi&f=1&ipt=66023752adc850d9daac73c871c0160e4f1bccebb349bc38cf97fb485c19ccf6" },
  { tempId: 10, testimonial: "Crab was fresh and neatly cleaned—no mess in the kitchen!", by: "Naveen, Chennai", imgSrc: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages.hdqwalls.com%2Fwallpapers%2Fcristiano-ronaldo-fifa-world-cup-qatar-4k-dx.jpg&f=1&nofb=1&ipt=7bd4e57c55cda72644181f2c719c3ef3d222dad194a7098ad15390417608a1ce" },
  { tempId: 11, testimonial: "Quality is top-notch every single time. Highly recommend.", by: "Aparna, Trichy", imgSrc: "https://images.unsplash.com/photo-1617009762269-c062aaf6b3a0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fGluZGlhbiUyMGdpcmx8ZW58MHx8MHx8fDA%3D" },
  { tempId: 12, testimonial: "Great for weekly meal prep. Cuts are uniform and clean.", by: "Karthik, Salem", imgSrc: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpicjumbo.com%2Fwp-content%2Fuploads%2Fbeautiful-nature-scenery-free-photo-2210x1473.jpg&f=1&nofb=1&ipt=37d619cfb3f86470485184e3c9cd5835d45ab60d85c696b12e4c1962648ba7c3" },
  { tempId: 13, testimonial: "Best place for seafood lovers. Freshness guaranteed.", by: "Sneha, Erode", imgSrc: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftudosobrecabelos.com.br%2Fwp-content%2Fuploads%2F2023%2F06%2Fbuque-de-rosas-line.jpg&f=1&nofb=1&ipt=231831e6027ddc394d05e7e3434998513ff0b8ab89d8858641f7a1925bea6a25" },
  { tempId: 14, testimonial: "Reasonable prices and premium quality. Go-to for weekends.", by: "Manoj, Vellore", imgSrc: "https://images.unsplash.com/photo-1688622302529-a31da3b9eedd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fHRhbWlsJTIwZ3V5fGVufDB8fDB8fHww" },
  { tempId: 15, testimonial: "Frozen prawns were deveined perfectly. So convenient.", by: "Ritu, Bengaluru", imgSrc: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.pixelstalk.net%2Fwp-content%2Fuploads%2F2016%2F07%2FColorful-Nature-HD-Pictures.jpg&f=1&nofb=1&ipt=7a0e216dd8a5d629144fd656ad53ab6f4e201407132d8fb11dae58cd439c2d91" },
  { tempId: 16, testimonial: "Clean packaging and no smell. Arrived well-chilled.", by: "Gautam, Chennai", imgSrc: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcomicvine.gamespot.com%2Fa%2Fuploads%2Foriginal%2F11125%2F111253442%2F4897645-batman.jpg&f=1&nofb=1&ipt=f5327d7d454bbc2a342d288a3d9af34b145a9797c3ab89488238b1b2f6c65d99" },
  { tempId: 17, testimonial: "Their customer service is prompt and helpful.", by: "Vaishnavi, Hosur", imgSrc: "https://plus.unsplash.com/premium_photo-1681483539443-50ced66c7f56?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjF8fGluZGlhbiUyMGdpcmx8ZW58MHx8MHx8fDA%3D" },
  { tempId: 18, testimonial: "Perfect cuts for fry, curry, and grill—exactly as described.", by: "Harish, Chennai", imgSrc: "https://images.unsplash.com/photo-1694871420544-e13a86f35772?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fGluZGlhbiUyMG1hbnxlbnwwfHwwfHx8MA%3D%3D" },
  { tempId: 19, testimonial: "The ribbon fish dry variety was outstanding and fresh.", by: "Fathima, Kanyakumari", imgSrc: "https://images.unsplash.com/photo-1609091289242-735df7a2207a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bXVzbGltJTIwd29tZW58ZW58MHx8MHx8fDA%3D" }
];

interface TestimonialCardProps {
  position: number;
  testimonial: typeof testimonials[0];
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

export const StaggerTestimonials: React.FC = () => {
  const [cardSize, setCardSize] = useState(365);
  const [testimonialsList, setTestimonialsList] = useState(testimonials);

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

  // Using custom image URLs per reviewer. No auto-override needed.

  return (
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
  );
};