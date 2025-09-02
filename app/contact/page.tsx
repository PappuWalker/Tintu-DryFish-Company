import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="max-w-3xl md:max-w-none">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Contact Us</h1>
        <p className="text-muted-foreground mb-8">We'd love to hear from you. Reach out and we'll respond as soon as we can.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Left: Contact Info */}
        <div className="lg:col-span-1 space-y-4">
          <div className="rounded-2xl border bg-white/70 backdrop-blur p-5">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-primary/10 text-primary"><Mail className="w-5 h-5" /></div>
              <div>
                <p className="font-semibold">Email</p>
                <p className="text-sm text-muted-foreground">info@tintudryfish.com</p>
              </div>
            </div>
            <div className="mt-4 flex items-start gap-3">
              <div className="p-2 rounded-lg bg-primary/10 text-primary"><Phone className="w-5 h-5" /></div>
              <div>
                <p className="font-semibold">Phone</p>
                <p className="text-sm text-muted-foreground">+91 98765 43210</p>
              </div>
            </div>
            <div className="mt-4 flex items-start gap-3">
              <div className="p-2 rounded-lg bg-primary/10 text-primary"><MapPin className="w-5 h-5" /></div>
              <div>
                <p className="font-semibold">Address</p>
                <p className="text-sm text-muted-foreground">123 Dry Fish Lane, Seafood City, India</p>
              </div>
            </div>
            <div className="mt-4 flex items-start gap-3">
              <div className="p-2 rounded-lg bg-primary/10 text-primary"><Clock className="w-5 h-5" /></div>
              <div>
                <p className="font-semibold">Hours</p>
                <p className="text-sm text-muted-foreground">Mon - Sat: 9:00 AM - 7:00 PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Form */}
        <div className="lg:col-span-2">
          <div className="rounded-2xl border bg-white/70 backdrop-blur p-5 md:p-6">
            <h2 className="text-xl md:text-2xl font-semibold mb-4">Send us a message</h2>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                <Input type="text" id="name" placeholder="John Doe" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <Input type="email" id="email" placeholder="you@example.com" />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
                <Input type="text" id="subject" placeholder="How can we help?" />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                <textarea id="message" rows={5} className="mt-1 w-full rounded-md border border-gray-300 shadow-sm focus:border-primary focus:ring-primary p-2 text-sm" placeholder="Write your message here..." />
              </div>
              <div className="md:col-span-2 flex justify-end pt-2">
                <Button className="bg-primary text-primary-foreground hover:opacity-90">Submit</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
