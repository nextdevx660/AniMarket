import { FacebookIcon, InstagramIcon, TwitterIcon } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-muted text-foreground py-12 px-6 mt-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-400" />
            <span className="text-xl font-bold">AniMarket</span>
          </div>
          <p className="text-muted-foreground">
            The ultimate marketplace for anime digital products. Find and download artwork, wallpapers, and more.
          </p>
        </div>

        {/* Shop Links */}
        <div>
          <h4 className="font-semibold mb-3">Shop</h4>
          <ul className="space-y-2 text-muted-foreground">
            <li><a href="/dashboard" className="hover:text-anime-purple">All Products</a></li>
            <li><a href="explore" className="hover:text-anime-purple">Categories</a></li>
          </ul>
        </div>

        {/* Info Links */}
        <div>
          <h4 className="font-semibold mb-3">Info</h4>
          <ul className="space-y-2 text-muted-foreground">
            <li><a href="#" className="hover:text-anime-purple">About Us</a></li>
            <li><a href="#" className="hover:text-anime-purple">FAQ</a></li>
            <li><a href="#" className="hover:text-anime-purple">Contact</a></li>
            <li><a href="#" className="hover:text-anime-purple">Terms of Service</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="font-semibold mb-3">Newsletter</h4>
          <p className="text-muted-foreground mb-4">Subscribe to get updates on new products and special offers.</p>
          <div className="space-y-3">
            <input
              type="email"
              placeholder="Your email"
              className="w-full px-5 py-2 rounded-full bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button className="w-full py-2 rounded-full bg-anime-purple text-white font-medium shadow-md hover:bg-opacity-90 transition-all">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-10 border-t border-border pt-6 flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground">
        <p>© 2025 AniMarket. All rights reserved.</p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a href="#" className="hover:text-anime-purple"><FacebookIcon /></a>
          <a href="#" className="hover:text-anime-purple"><TwitterIcon /></a>
          <a href="#" className="hover:text-anime-purple"><InstagramIcon /></a>
        </div>
      </div>
    </footer>
  );
}
