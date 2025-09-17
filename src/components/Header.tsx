import { useState } from "react";
import { Search, Menu, X, Moon, Sun, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/contexts/ThemeContext";
import { categories } from "@/data/sampleData";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { isDark, toggleTheme } = useTheme();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      {/* Breaking News Ticker */}
      <div className="bg-breaking-news text-breaking-news-foreground py-1 overflow-hidden">
        <div className="breaking-ticker whitespace-nowrap">
          🔴 BREAKING: Revolutionary climate technology breakthrough announced •
          Championship finals draw record 150M+ viewers • Global markets surge
          following policy changes
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <img
              src={isDark ? "/dark-logo.png" : "/light-logo.png"}
              alt="The Cliff News"
              className="h-12 w-auto"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a
              href="/"
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Home
            </a>

            {/* Categories Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="text-foreground hover:text-primary transition-colors font-medium flex items-center space-x-1"
                >
                  <span>Categories</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48" align="start">
                {categories.map((category) => (
                  <DropdownMenuItem key={category} asChild>
                    <a
                      href={`/category/${category.toLowerCase()}`}
                      className="w-full cursor-pointer"
                    >
                      {category}
                    </a>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <a
              href="/inshorts"
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Quick Reads
            </a>
            <a
              href="/bytes"
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Bytes
            </a>
            <a
              href="/epaper"
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              E-Paper
            </a>
          </nav>

          {/* Search, Theme Toggle and Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="p-2"
            >
              {isDark ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>

            {/* Desktop Search */}
            <div className="hidden md:flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search news..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMenu}
              className="md:hidden"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border py-4">
            <div className="flex flex-col space-y-4">
              {/* Mobile Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search news..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Mobile Navigation */}
              <nav className="flex flex-col space-y-3">
                <a
                  href="/"
                  className="text-foreground hover:text-primary transition-colors font-medium py-2"
                >
                  Home
                </a>

                {/* Mobile Categories Section */}
                <div className="py-2">
                  <h3 className="text-sm font-semibold text-muted-foreground mb-2">
                    Categories
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {categories.map((category) => (
                      <a
                        key={category}
                        href={`/category/${category.toLowerCase()}`}
                        className="text-foreground hover:text-primary transition-colors font-medium py-1 text-sm"
                      >
                        {category}
                      </a>
                    ))}
                  </div>
                </div>

                <a
                  href="/inshorts"
                  className="text-foreground hover:text-primary transition-colors font-medium py-2"
                >
                  Quick Reads
                </a>
                <a
                  href="/bytes"
                  className="text-foreground hover:text-primary transition-colors font-medium py-2"
                >
                  Bytes
                </a>
                <a
                  href="/epaper"
                  className="text-foreground hover:text-primary transition-colors font-medium py-2"
                >
                  E-Paper
                </a>
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
