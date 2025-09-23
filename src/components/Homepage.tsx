import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "./Header";
import StockTicker from "./StockTicker";
import EnhancedHeroSection from "./EnhancedHeroSection";
import NewsCard from "./NewsCard";
import QuickReadCard from "./QuickReadCard";
import VideoByteCard from "./VideoByteCard";
import HorizontalVideoScroll from "./HorizontalVideoScroll";
import CategorySection from "./CategorySection";
import DualEPaperSection from "./DualEPaperSection";
import StreamlinedEPaperSection from "./StreamlinedEPaperSection";
import HighlightsSection from "./HighlightsSection";
import Footer from "./Footer";
import {
  useArticles,
  useInshorts,
  useBreakingNews,
  useTopStories,
} from "@/hooks";
import { useHighlights } from "@/hooks";
import { useYouTubeShorts } from "@/hooks";
import { useEffect } from "react";
import { updateDocumentHead } from "@/utils/seo";

const Homepage = () => {
  // Fetch data using React Query hooks
  const { data: articlesData, isLoading: articlesLoading } = useArticles({
    isFeatured: true,
    limit: 10,
  });
  const { data: quickReadsData, isLoading: quickReadsLoading } = useInshorts({
    limit: 5,
  });
  const { data: breakingNewsData, isLoading: breakingNewsLoading } =
    useBreakingNews(3);
  const { data: topStoriesData, isLoading: topStoriesLoading } =
    useTopStories(4);
  const { data: highlightsData, isLoading: highlightsLoading } = useHighlights({
    limit: 6,
  });
  const { data: videoBytesData, isLoading: videoBytesLoading } =
    useYouTubeShorts({ limit: 10 });

  // Set up SEO for homepage
  useEffect(() => {
    updateDocumentHead({
      title: "The Cliff News - Breaking News & Latest Updates",
      description:
        "Stay informed with the latest breaking news, in-depth analysis, and quick updates from The Cliff News. Your trusted source for reliable journalism.",
      type: "website",
    });
  }, []);

  // Filter articles by category
  const nationalNews =
    articlesData?.articles?.filter(
      (article) => article.category?.name === "National"
    ) || [];
  const sportsNews =
    articlesData?.articles?.filter(
      (article) => article.category?.name === "Sports"
    ) || [];
  const techNews =
    articlesData?.articles?.filter(
      (article) => article.category?.name === "Technology"
    ) || [];

  // Loading state
  if (
    articlesLoading ||
    quickReadsLoading ||
    breakingNewsLoading ||
    topStoriesLoading
  ) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading latest news...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Stock Market Ticker */}
      <StockTicker />

      {/* Enhanced Hero Section */}
      <EnhancedHeroSection featuredArticles={articlesData?.articles || []} />

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
            {topStoriesData?.topStories?.map((article) => (
              <NewsCard key={article.id} article={article} variant="featured" />
            ))}
          </div>
        </div>
      </section>

      {/* Streamlined E-Paper Section */}
      <StreamlinedEPaperSection />

      {/* Highlights Section */}
      <HighlightsSection />

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
            {quickReadsData?.inshorts?.map((item) => (
              <QuickReadCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* Video Bytes Preview - Horizontal Scroll */}
      <HorizontalVideoScroll
        videos={videoBytesData?.shorts || []}
        title="Video Bytes"
        subtitle="News in motion - quick video updates"
      />

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

      <Footer />
    </div>
  );
};

export default Homepage;
