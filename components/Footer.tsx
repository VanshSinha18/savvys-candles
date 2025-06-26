export default function Footer() {
  return (
    <footer className="bg-black border-t border-zinc-800 mt-16 py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4">
        {/* Newsletter */}
        <div>
          <h3 className="font-heading text-lg mb-2 text-white">Newsletter</h3>
          <p className="text-zinc-400 mb-3">
            Get exclusive offers & candle tips.
          </p>
          <form className="flex">
            <input
              type="email"
              placeholder="Your email"
              className="rounded-l px-3 py-2 border border-zinc-700 focus:outline-gold bg-zinc-900 text-white placeholder:text-zinc-500"
            />
            <button
              type="submit"
              className="bg-gold text-white px-4 py-2 rounded-r font-medium hover:bg-black hover:text-gold transition border border-gold border-l-0"
            >
              Subscribe
            </button>
          </form>
        </div>
        {/* Links */}
        <div>
          <h3 className="font-heading text-lg mb-2 text-white">About</h3>
          <ul className="space-y-2 text-zinc-400">
            <li>
              <a href="/about" className="hover:text-gold">
                Our Story
              </a>
            </li>
            <li>
              <a href="/sustainability" className="hover:text-gold">
                Sustainability
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-gold">
                Contact
              </a>
            </li>
          </ul>
        </div>
        {/* Payment */}
        <div>
          <h3 className="font-heading text-lg mb-2 text-white">We Accept</h3>
          <div className="flex gap-2 mt-2">
            <img src="/visa.svg" alt="Visa" className="h-6" />
            <img src="/mastercard.svg" alt="Mastercard" className="h-6" />
            <img src="/amex.svg" alt="Amex" className="h-6" />
            <img src="/stripe.svg" alt="Stripe" className="h-6" />
          </div>
        </div>
        {/* Contact */}
        <div>
          <h3 className="font-heading text-lg mb-2 text-white">Contact</h3>
          <p className="text-zinc-400">hello@candlecommerce.com</p>
          <p className="text-zinc-400">123 Candle Lane, Aroma City</p>
        </div>
      </div>
      <div className="text-center text-xs text-zinc-500 mt-8">
        &copy; {new Date().getFullYear()} CandleCommerce. All rights reserved.
      </div>
    </footer>
  );
}
