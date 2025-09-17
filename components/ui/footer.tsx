"use client"

import { motion, type Variants } from "motion/react"
import { Instagram, MessageCircle } from "lucide-react"; // Import social media icons

// Animation variants for reusability
const containerVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.1,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
}

const linkVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
}

const socialVariants: Variants = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 10,
    },
  },
}

const backgroundVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 2,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

// Footer data for better maintainability
const footerData = {
  sections: [
    {
      title: "Links",
      links: [
        { label: "Shop", href: "/shop" },
        { label: "Categories", href: "/category" },
        { label: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "Tintu Cuts", href: "/" },
        { label: "Our Mission", href: "/about" },
        { label: "Help Center", href: "/contact" },
      ],
    },
  ],
  social: [
    { href: "https://www.instagram.com/tintu_cuts?igsh=NTA4YTkxZDJiNW80&utm_source=qr", label: "Instagram", icon: <Instagram className="w-4 h-4" /> },
    { href: "https://chat.whatsapp.com/KDn1mXcSfANFnlD5G2tMDq?mode=ems_copy_t", label: "WhatsApp", icon: <MessageCircle className="w-4 h-4" /> },
  ],
  title: "Tintu Cuts",
  subtitle: "Premium seafood, fresh or frozen, delivered fast.",
  copyright: `©${new Date().getFullYear()} Tintu Cuts. All rights reserved.`,
}

// Reusable components
const NavSection = ({ title, links, index }: { title: string; links: { label: string; href: string }[]; index: number }) => (
  <motion.div variants={itemVariants} custom={index} className="flex flex-col gap-2">
    <motion.h3
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
      className="mb-2 uppercase text-muted-foreground text-xs font-semibold tracking-wider border-b border-border pb-1 hover:text-foreground transition-colors duration-300"
    >
      {title}
    </motion.h3>
    {links.map((link, linkIndex) => (
      <motion.a
        key={linkIndex}
        variants={linkVariants}
        custom={linkIndex}
        href={link.href}
        whileHover={{
          x: 8,
          transition: { type: "spring", stiffness: 300, damping: 20 },
        }}
        className="text-muted-foreground hover:text-foreground transition-colors duration-300 font-sans text-xs md:text-sm group relative"
      >
        <span className="relative">
          {link.label}
          <motion.span
            className="absolute bottom-0 left-0 h-0.5 bg-primary"
            initial={{ width: 0 }}
            whileHover={{ width: "100%" }}
            transition={{ duration: 0.3 }}
          />
        </span>
      </motion.a>
    ))}
  </motion.div>
)

const SocialLink = ({ href, label, icon, index }: { href: string; label: string; icon: React.ReactNode; index: number }) => (
  <motion.a
    variants={socialVariants}
    custom={index}
    href={href}
    whileHover={{
      scale: 1.2,
      rotate: 12,
      transition: { type: "spring", stiffness: 300, damping: 15 },
    }}
    whileTap={{ scale: 0.9 }}
    className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-muted hover:bg-gradient-to-r hover:from-primary hover:to-secondary flex items-center justify-center transition-colors duration-300 group"
    aria-label={label}
  >
    <motion.span
      className="text-muted-foreground group-hover:text-primary-foreground" // Removed font-bold and text-xs/sm as icon components handle their own sizing/styling
      whileHover={{ scale: 1.1 }}
    >
      {icon}
    </motion.span>
  </motion.a>
)

export default function StickyFooter() {
  return (
    <div className="relative h-[32vh]" style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}>
      <div className="relative h-[calc(100vh+32vh)] -top-[100vh]">
        <div className="h-[32vh] sticky top-[calc(100vh-32vh)]">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="bg-gradient-to-br from-card via-muted to-card/90 py-2 md:py-4 px-3 md:px-6 h-full w-full flex flex-col justify-between relative overflow-hidden"
          >
            {/* Animated Background Elements */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent pointer-events-none" />

            <motion.div
              variants={backgroundVariants}
              className="absolute top-0 right-0 w-32 h-32 md:w-64 md:h-64 bg-primary/5 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />

            <motion.div
              variants={backgroundVariants}
              className="absolute bottom-0 left-0 w-32 h-32 md:w-64 md:h-64 bg-secondary/5 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: 1,
              }}
            />

            {/* Navigation Section */}
            <motion.div variants={containerVariants} className="relative z-10">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 lg:gap-6">
                {footerData.sections.map((section, index) => (
                  <NavSection key={section.title} title={section.title} links={section.links} index={index} />
                ))}
              </div>
            </motion.div>

            {/* Footer Bottom Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
              className="flex flex-col md:flex-row justify-between items-start md:items-end relative z-10 gap-1.5 md:gap-2 mt-1"
            >
              <div className="flex-1">
                <motion.h1
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
                  whileHover={{
                    scale: 1.02,
                    transition: { type: "spring", stiffness: 300, damping: 20 },
                  }}
                  className="text-[8vw] md:text-[6vw] lg:text-[5vw] xl:text-[4vw] leading-[0.8] font-sans bg-gradient-to-r from-foreground via-muted-foreground to-foreground/60 bg-clip-text text-transparent cursor-default"
                >
                  {footerData.title}
                </motion.h1>

                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  transition={{ delay: 1.2, duration: 0.6 }}
                  className="flex items-center gap-3 md:gap-4 mt-3 md:mt-4"
                >
                  <motion.div
                    className="w-8 md:w-12 h-0.5 bg-gradient-to-r from-primary to-secondary"
                    animate={{
                      scaleX: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  />
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.4, duration: 0.5 }}
                    className="text-muted-foreground text-xs md:text-sm font-sans hover:text-foreground transition-colors duration-300"
                  >
                    {footerData.subtitle}
                  </motion.p>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.6, duration: 0.6 }}
                className="text-left md:text-right"
              >
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.8, duration: 0.5 }}
                  className="text-muted-foreground text-xs md:text-sm mb-2 md:mb-3 hover:text-foreground transition-colors duration-300"
                >
                  {footerData.copyright}
                </motion.p>

                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 2, staggerChildren: 0.1 }}
                  className="flex gap-2 md:gap-3"
                >
                  {footerData.social.map((social, index) => (
                    <SocialLink
                      key={social.label}
                      href={social.href}
                      label={social.label}
                      icon={social.icon}
                      index={index}
                    />
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
