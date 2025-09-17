import { Clock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Article } from "@/data/sampleData";

interface HeroSectionProps {
  featuredArticle: Article;
}

const HeroSection = ({ featuredArticle }: HeroSectionProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={featuredArticle.featuredImage}
          alt={featuredArticle.title}
          className="w-full h-full object-cover"
        />
        <div className="hero-overlay absolute inset-0" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 h-full flex items-end pb-12">
        <div className="max-w-4xl">
          {/* Breaking News Badge */}
          {featuredArticle.isBreaking && (
            <div className="inline-flex items-center mb-4">
              <span className="category-badge breaking animate-pulse">
                🔴 BREAKING NEWS
              </span>
            </div>
          )}

          {/* Category Badge */}
          <div className="mb-4">
            <span className={`category-badge ${featuredArticle.category.toLowerCase()}`}>
              {featuredArticle.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="headline-large text-white mb-4 max-w-3xl animate-fade-in-up">
            {featuredArticle.title}
          </h1>

          {/* Excerpt */}
          <p className="body-large text-white/90 mb-6 max-w-2xl animate-fade-in-up">
            {featuredArticle.excerpt}
          </p>

          {/* Meta Information */}
          <div className="flex items-center space-x-6 mb-6 text-white/80 animate-fade-in-up">
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span className="text-sm font-medium">{featuredArticle.author.name}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span className="text-sm">{formatDate(featuredArticle.publishedAt)}</span>
            </div>
            <div className="text-sm">
              {featuredArticle.readTime} min read
            </div>
          </div>

          {/* CTA Button */}
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary-hover text-primary-foreground font-medium animate-fade-in-up"
          >
            Read Full Story
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;