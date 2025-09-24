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
import { useCategories } from "@/hooks";
import { Category } from "@/services";
import Link from "next/link";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { isDark, toggleTheme } = useTheme();
  const { data: categoriesData } = useCategories();
  const categories: Category[] =
    (categoriesData?.categories as Category[]) || [];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      {/* Breaking News Ticker */}
      <div className="bg-primary text-primary-foreground overflow-hidden">
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
            <Link
              href="/"
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Home
            </Link>

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
                  <DropdownMenuItem key={category.id} asChild>
                    <Link
                      href={`/category/${category.slug}`}
                      className="w-full cursor-pointer"
                    >
                      {category.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link
              href="/inshorts"
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Quick Reads
            </Link>
            <Link
              href="/videos"
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Videos
            </Link>
            <Link
              href="/highlights"
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Highlights
            </Link>
            <Link
              href="/nit"
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              NIT
            </Link>
            <Link
              href="/epaper"
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              E-Paper
            </Link>
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
                <Link
                  href="/"
                  className="text-foreground hover:text-primary transition-colors font-medium py-2"
                >
                  Home
                </Link>

                {/* Mobile Categories Section */}
                <div className="py-2">
                  <h3 className="text-sm font-semibold text-muted-foreground mb-2">
                    Categories
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {categories.map((category) => (
                      <Link
                        key={category.id}
                        href={`/category/${category.slug}`}
                        className="text-foreground hover:text-primary transition-colors font-medium py-1 text-sm"
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                </div>

                <Link
                  href="/inshorts"
                  className="text-foreground hover:text-primary transition-colors font-medium py-2"
                >
                  Quick Reads
                </Link>
                <Link
                  href="/videos"
                  className="text-foreground hover:text-primary transition-colors font-medium py-2"
                >
                  Videos
                </Link>
                <Link
                  href="/highlights"
                  className="text-foreground hover:text-primary transition-colors font-medium py-2"
                >
                  Highlights
                </Link>
                <Link
                  href="/nit"
                  className="text-foreground hover:text-primary transition-colors font-medium py-2"
                >
                  NIT
                </Link>
                <Link
                  href="/epaper"
                  className="text-foreground hover:text-primary transition-colors font-medium py-2"
                >
                  E-Paper
                </Link>
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
