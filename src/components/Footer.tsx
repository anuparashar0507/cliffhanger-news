import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { categories } from "@/data/sampleData";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-navy text-white">
      {/* Newsletter Signup */}
      <div className="border-b border-white/10">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="headline-medium mb-4">
              Stay Informed with The Cliff News
            </h3>
            <p className="body-medium mb-6 text-white/80">
              Get the latest breaking news, in-depth analysis, and exclusive stories delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
              />
              <Button className="bg-primary hover:bg-primary-hover">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold font-serif mb-4">The Cliff News</h3>
            <p className="text-white/80 mb-6">
              Your trusted source for professional journalism, breaking news, and in-depth analysis. 
              Delivering truth and transparency since day one.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm" className="text-white hover:text-primary hover:bg-white/10">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-white hover:text-primary hover:bg-white/10">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-white hover:text-primary hover:bg-white/10">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-white hover:text-primary hover:bg-white/10">
                <Youtube className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/" className="text-white/80 hover:text-white transition-colors">Home</a></li>
              <li><a href="/inshorts" className="text-white/80 hover:text-white transition-colors">Inshorts</a></li>
              <li><a href="/bytes" className="text-white/80 hover:text-white transition-colors">Video Bytes</a></li>
              <li><a href="/epaper" className="text-white/80 hover:text-white transition-colors">E-Paper</a></li>
              <li><a href="/about" className="text-white/80 hover:text-white transition-colors">About Us</a></li>
              <li><a href="/contact" className="text-white/80 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Categories</h4>
            <ul className="space-y-2">
              {categories.slice(0, 6).map((category) => (
                <li key={category}>
                  <a 
                    href={`/category/${category.toLowerCase()}`} 
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    {category}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-primary" />
                <span className="text-white/80">news@thecliffnews.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-primary" />
                <span className="text-white/80">+1 (555) 123-NEWS</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-primary mt-1" />
                <span className="text-white/80">
                  123 News Street<br />
                  Media City, MC 12345
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/60 text-sm mb-4 md:mb-0">
              © {currentYear} The Cliff News. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="/privacy" className="text-white/60 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="text-white/60 hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="/cookies" className="text-white/60 hover:text-white transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;