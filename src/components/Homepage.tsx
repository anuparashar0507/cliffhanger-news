import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "./Header";
import StockTicker from "./StockTicker";
import EnhancedHeroSection from "./EnhancedHeroSection";
import NewsCard from "./NewsCard";
import QuickReadCard from "./QuickReadCard";
import VideoByteCard from "./VideoByteCard";
import CategorySection from "./CategorySection";
import DualEPaperSection from "./DualEPaperSection";
import StreamlinedEPaperSection from "./StreamlinedEPaperSection";
import Footer from "./Footer";
import { articles, heroArticles, quickReads, videoBytes } from "@/data/sampleData";

const Homepage = () => {
  const topStories = articles.filter(article => article.isFeatured).slice(0, 3);
  const nationalNews = articles.filter(article => article.category === "National");
  const sportsNews = articles.filter(article => article.category === "Sports");
  const techNews = articles.filter(article => article.category === "Technology");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Stock Market Ticker */}
      <StockTicker />
      
      {/* Enhanced Hero Section */}
      <EnhancedHeroSection featuredArticles={heroArticles} />

      {/* Top Stories - Full Width */}
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

          {/* Full Width Top Stories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {topStories.concat(articles.filter(article => !article.isFeatured).slice(0, 1)).map((article) => (
              <NewsCard key={article.id} article={article} variant="featured" />
            ))}
          </div>
        </div>
      </section>

      {/* Streamlined E-Paper Section */}
      <StreamlinedEPaperSection />

      {/* Quick Reads Preview */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="headline-medium text-foreground mb-2">
                Quick Reads
              </h2>
              <div className="w-12 h-1 bg-primary rounded-full"></div>
              <p className="body-medium text-muted-foreground mt-2">
                Stay informed with bite-sized news updates
              </p>
            </div>
            
            <Button variant="outline" className="group">
              View All Quick Reads
              <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {quickReads.slice(0, 5).map((item) => (
              <QuickReadCard key={item.id} item={item} />
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

      {/* Dual E-Paper Section */}
      <DualEPaperSection />

      <Footer />
    </div>
  );
};

export default Homepage;