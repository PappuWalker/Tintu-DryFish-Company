"use client";

import { Button } from "@/components/ui/button";

import { useState } from "react";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react"; // Keep Mail, Phone, MapPin for contact info
import { useLanguage } from "@/context/language-context";

export default function ContactPage() {
  const { t } = useLanguage();
  const [isHovered, setIsHovered] = useState(false);

  const whatsappLink = 'https://chat.whatsapp.com/KDn1mXcSfANFnlD5G2tMDq?mode=ems_copy_t';

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="max-w-3xl md:max-w-none">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">{t("contact.title", "Contact Us")}</h1>
        <p className="text-muted-foreground mb-8">{t("contact.subtitle", "We'd love to hear from you. Reach out and we'll respond as soon as we can.")}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 items-stretch gap-6 lg:gap-8">
        {/* Left: Contact Info */}
        <div className="lg:col-span-1 space-y-4">
          <div className="rounded-2xl border border-border bg-card/80 dark:bg-card/60 backdrop-blur p-5">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-primary/10 text-primary"><Mail className="w-5 h-5" /></div>
              <div>
                <p className="font-semibold">{t("contact.email", "Email")}</p>
                <p className="text-sm text-muted-foreground">tintucuts@gmail.com</p>
              </div>
            </div>
            <div className="mt-4 flex items-start gap-3">
              <div className="p-2 rounded-lg bg-primary/10 text-primary"><Phone className="w-5 h-5" /></div>
              <div>
                <p className="font-semibold">{t("contact.phone", "Phone")}</p>
                <p className="text-sm text-muted-foreground">+91 9962040219,  +91 6383115007</p>
              </div>
            </div>
            <div className="mt-4 flex items-start gap-3">
              <div className="p-2 rounded-lg bg-primary/10 text-primary"><MapPin className="w-5 h-5" /></div>
              <div>
                <p className="font-semibold">{t("contact.address", "Address")}</p>
                <p className="text-sm text-muted-foreground">{t("contact.address.text", "No: 4G, 1 Cross Street, Bhavani Nagar, Old Pallavaram, Chennai - 600117")}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Divider with "or" - Mobile (horizontal) */}
        <div className="lg:hidden flex items-center justify-center my-6">
          <div className="flex-grow border-t border-border" />
          <span className="mx-4 text-muted-foreground">{t("contact.or", "or")}</span>
          <div className="flex-grow border-t border-border" />
        </div>

        {/* Divider with "or" - Desktop (vertical) */}
        <div className="hidden lg:flex h-full flex-col items-center justify-center">
          <div className="flex-1 w-px bg-border" />
          <span className="my-2 text-muted-foreground">{t("contact.or", "or")}</span>
          <div className="flex-1 w-px bg-border" />
        </div>

        {/* Right: WhatsApp Support */}
        <div className="lg:col-span-1 flex flex-row lg:flex-col items-center lg:items-center justify-start lg:justify-center gap-4 p-5 md:p-6">
          {/* Mobile/Tablet image: always show hover image, sizes responsive, visible < lg */}
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="relative block w-[80px] h-[80px] md:w-[80px] md:h-[80px] lg:hidden flex-shrink-0"
            aria-label="WhatsApp Support"
          >
            <Image
              src="/images/whatsapp-icon-hover.png"
              alt="WhatsApp Icon"
              fill
              className="absolute inset-0 object-contain"
            />
          </a>

          {/* Desktop image: hover behavior retained, visible on lg+ */}
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative hidden lg:block w-[200px] h-[200px] transition-transform duration-200 hover:scale-105"
            aria-label="WhatsApp Support"
          >
            <Image
              src={isHovered ? "/images/whatsapp-icon-hover.png" : "/images/whatsapp-nonHover.png"}
              alt="WhatsApp Icon"
              fill
              className="absolute inset-0 object-contain"
            />
          </a>

          {/* Instruction text - Mobile/Tablet (without 'above') */}
          <p className="lg:hidden text-left text-muted-foreground max-w-md">
            {t("contact.whatsappInstructionMobile", "Click the WhatsApp icon and kindly reach out to us there with your inquiries.")}
          </p>
          {/* Instruction text - Desktop (with 'above') */}
          <p className="hidden lg:block text-left lg:text-center text-muted-foreground max-w-md">
            {t("contact.whatsappInstruction", "Click the WhatsApp icon above and kindly reach out to us there with your inquiries.")}
          </p>
        </div>
      </div>

      {/* Google Map */}
      <div className="mt-10">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4 text-center">{t("contact.mapTitle", "Find Us on the Map")}</h2>
        <div className="relative h-[400px] w-full overflow-hidden rounded-2xl border border-border shadow-xl">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.9957000000003!2d80.20900000000001!3d12.971599999999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525d2d2d2d2d2d%3A0x2d2d2d2d2d2d2d2d!2sNo%3A4G%2C1%20Cross%20Street%2CBhavani%20Nagar%2C%20Old%20Pallavaram%2CChennai-600117!5e0!3m2!1sen!2sin!4v1678912345678!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
