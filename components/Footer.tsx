export default function Footer() {
  return (
    <footer className="bg-black border-t border-zinc-800 mt-16 pt-10 pb-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 px-6 items-start">
        {/* Newsletter */}
        <div className="flex flex-col gap-2">
          <h3 className="text-xl mb-2 text-purple font-sans">Newsletter</h3>
          <p className="text-zinc-400 mb-3 text-base">
            Get exclusive offers & candle tips.
          </p>
          <form className="flex mt-1">
            <input
              type="email"
              placeholder="Your email"
              className="rounded-l px-3 py-2 border border-zinc-700 focus:outline-purple bg-zinc-900 text-white placeholder:text-zinc-500 text-sm"
            />
            <button
              type="submit"
              className="bg-purple text-white px-5 py-2 rounded-r font-semibold hover:bg-black hover:text-purple transition border border-purple border-l-0 text-sm"
            >
              Subscribe
            </button>
          </form>
        </div>
        {/* Links */}
        <div className="flex flex-col gap-2">
          <h3 className="text-xl mb-2 text-purple font-sans">About</h3>
          <ul className="space-y-2 text-zinc-400 text-base">
            <li>
              <a href="/about" className="hover:text-purple transition-colors">
                Our Story
              </a>
            </li>
            <li>
              <a
                href="/sustainability"
                className="hover:text-purple transition-colors"
              >
                Sustainability
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className="hover:text-purple transition-colors"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
        {/* Payment */}
        <div className="flex flex-col gap-2">
          <h3 className="text-xl mb-2 text-purple font-sans">We Accept</h3>
          <div className="flex gap-3 items-center mt-1 flex-wrap">
            <img src="/visa.svg" alt="Visa" className="h-6 w-auto" />
            <img
              src="/mastercard.svg"
              alt="Mastercard"
              className="h-6 w-auto"
            />
            <img src="/amex.svg" alt="Amex" className="h-6 w-auto" />
            <img src="/stripe.svg" alt="Stripe" className="h-6 w-auto" />
            <img src="/applepay.svg" alt="Apple Pay" className="h-6 w-auto" />
            <img src="/googlepay.svg" alt="Google Pay" className="h-6 w-auto" />
            <img src="/paypal.svg" alt="PayPal" className="h-6 w-auto" />
          </div>
        </div>
        {/* Contact */}
        <div className="flex flex-col gap-2">
          <h3 className="text-xl mb-2 text-purple font-sans">Contact</h3>
          <p className="text-zinc-400 text-base">hello@candlecommerce.com</p>
          <p className="text-zinc-400 text-base">123 Candle Lane, Aroma City</p>
        </div>
      </div>
      <div className="mt-10" />
      <div className="text-center text-xs text-zinc-500 mt-2 tracking-wide">
        &copy; {new Date().getFullYear()} CandleCommerce. All rights reserved.
      </div>
    </footer>
  );
}
