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
                <p className="text-sm text-muted-foreground">Tintucuts@gmail.com</p>
              </div>
            </div>
            <div className="mt-4 flex items-start gap-3">
              <div className="p-2 rounded-lg bg-primary/10 text-primary"><Phone className="w-5 h-5" /></div>
              <div>
                <p className="font-semibold">Phone</p>
                <p className="text-sm text-muted-foreground">+91 9962040219,  +91 6383115007</p>
              </div>
            </div>
            <div className="mt-4 flex items-start gap-3">
              <div className="p-2 rounded-lg bg-primary/10 text-primary"><MapPin className="w-5 h-5" /></div>
              <div>
                <p className="font-semibold">Address</p>
                <p className="text-sm text-muted-foreground">No: 4G, 1 Cross Street,Bhavani Nagar, Old Pallavaram, Chennai-600117</p>
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

      {/* Google Map */}
      <div className="mt-10">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4 text-center">Find Us on the Map</h2>
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
