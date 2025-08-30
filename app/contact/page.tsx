export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
      <p className="text-lg mb-4">
        Have a question or want to get in touch? We'd love to hear from you!
      </p>
      <div className="space-y-4">
        <p className="text-lg">
          <strong>Email:</strong> info@tintudryfish.com
        </p>
        <p className="text-lg">
          <strong>Phone:</strong> +91 98765 43210
        </p>
        <p className="text-lg">
          <strong>Address:</strong> 123 Dry Fish Lane, Seafood City, India
        </p>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Send us a message</h2>
        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
            <textarea
              id="message"
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            ></textarea>
          </div>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
