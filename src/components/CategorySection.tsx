import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import NewsCard from "./NewsCard";
import { Article } from "@/services";

interface CategorySectionProps {
  title: string;
  articles: Article[];
  showViewAll?: boolean;
  categorySlug?: string;
}

const CategorySection = ({
  title,
  articles,
  showViewAll = true,
  categorySlug,
}: CategorySectionProps) => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="headline-medium text-brand-navy mb-2">{title}</h2>
            <div className="w-12 h-1 bg-primary rounded-full"></div>
          </div>

          {showViewAll && (
            <Link to={`/category/${categorySlug || title.toLowerCase()}`}>
              <Button variant="outline" className="group">
                View All
                <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          )}
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.slice(0, 3).map((article) => (
            <NewsCard key={article.id} article={article} />
          ))}
        </div>

        {/* Show more button on mobile */}
        {showViewAll && (
          <div className="flex justify-center mt-8 md:hidden">
            <Link to={`/category/${categorySlug || title.toLowerCase()}`}>
              <Button variant="outline" className="group">
                View All {title}
                <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default CategorySection;
