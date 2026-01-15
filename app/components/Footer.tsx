export default function Footer() {
  return (
    <footer className="bg-white text-black mt-20">
      <div className="mx-auto max-w-6xl px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        
        <div>
          <h2 className="text-2xl font-bold mb-3">
            <img
  src="/logo.png"
  alt="Foodi Logo"
  className="h-10 mb-3"
/>

          </h2>
          <p className="text-black/70 text-sm">
            Discover delicious food and order easily with our smart e-menu system.
          </p>
        </div>

        
        <div>
          <h3 className="font-semibold mb-3">Company</h3>
          <ul className="space-y-2 text-sm text-black/70">
            <li>About</li>
            <li>Careers</li>
            <li>Blog</li>
            <li>Contact</li>
          </ul>
        </div>

        
        <div>
          <h3 className="font-semibold mb-3">Support</h3>
          <ul className="space-y-2 text-sm text-black/70">
            <li>Help Center</li>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
            <li>FAQs</li>
          </ul>
        </div>

        
        <div>
          <h3 className="font-semibold mb-3">Follow Us</h3>
          <div className="flex gap-4">
            <div className="h-10 w-10 bg-black/10 rounded-full flex items-center justify-center">
              F
            </div>
            <div className="h-10 w-10 bg-black/10 rounded-full flex items-center justify-center">
              I
            </div>
            <div className="h-10 w-10 bg-black/10 rounded-full flex items-center justify-center">
              T
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-black/10 py-4 text-center text-sm text-black/50">
        © {new Date().getFullYear()} Foodi. All rights reserved.
      </div>
    </footer>
  );
}
