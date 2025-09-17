import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "./Header";
import HeroSection from "./HeroSection";
import NewsCard from "./NewsCard";
import InshortCard from "./InshortCard";
import VideoByteCard from "./VideoByteCard";
import CategorySection from "./CategorySection";
import Footer from "./Footer";
import { articles, inshorts, videoBytes } from "@/data/sampleData";

const Homepage = () => {
  const featuredArticle = articles.find(article => article.isFeatured) || articles[0];
  const topStories = articles.filter(article => article.isFeatured).slice(0, 3);
  const nationalNews = articles.filter(article => article.category === "National");
  const sportsNews = articles.filter(article => article.category === "Sports");
  const techNews = articles.filter(article => article.category === "Technology");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <HeroSection featuredArticle={featuredArticle} />

      {/* Top Stories */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="headline-medium text-brand-navy mb-2">
                Top Stories
              </h2>
              <div className="w-12 h-1 bg-primary rounded-full"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {topStories.map((article) => (
              <NewsCard key={article.id} article={article} variant="featured" />
            ))}
          </div>
        </div>
      </section>

      {/* Inshorts Preview */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="headline-medium text-brand-navy mb-2">
                Quick Updates
              </h2>
              <div className="w-12 h-1 bg-primary rounded-full"></div>
              <p className="body-medium text-muted-foreground mt-2">
                Stay informed with bite-sized news updates
              </p>
            </div>
            
            <Button variant="outline" className="group">
              View All Inshorts
              <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {inshorts.slice(0, 5).map((item) => (
              <InshortCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* Video Bytes Preview */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="headline-medium text-brand-navy mb-2">
                Video Bytes
              </h2>
              <div className="w-12 h-1 bg-primary rounded-full"></div>
              <p className="body-medium text-muted-foreground mt-2">
                News in motion - quick video updates
              </p>
            </div>
            
            <Button variant="outline" className="group">
              Watch All Videos
              <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videoBytes.map((video) => (
              <VideoByteCard key={video.id} video={video} />
            ))}
          </div>
        </div>
      </section>

      {/* Category Sections */}
      {nationalNews.length > 0 && (
        <CategorySection title="National News" articles={nationalNews} />
      )}
      
      {sportsNews.length > 0 && (
        <div className="bg-muted/30">
          <CategorySection title="Sports" articles={sportsNews} />
        </div>
      )}
      
      {techNews.length > 0 && (
        <CategorySection title="Technology" articles={techNews} />
      )}

      {/* E-Paper Spotlight */}
      <section className="py-12 bg-accent text-accent-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="headline-medium mb-4">
              Today's Digital Newspaper
            </h2>
            <p className="body-large mb-8 opacity-90">
              Experience traditional journalism in a digital format. Read today's complete newspaper with all sections and supplements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary">
                Read E-Paper
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-accent">
                Download PDF
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Homepage;