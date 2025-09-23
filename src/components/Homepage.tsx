import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "./Header";
import StockTicker from "./StockTicker";
import EnhancedHeroSection from "./EnhancedHeroSection";
import NewsCard from "./NewsCard";
import QuickReadCard from "./QuickReadCard";
import VideoByteCard from "./VideoByteCard";
import HorizontalVideoScroll from "./HorizontalVideoScroll";
import EnhancedCategorySection from "./EnhancedCategorySection";
import CombinedCategorySection from "./CombinedCategorySection";
import DualEPaperSection from "./DualEPaperSection";
import StreamlinedEPaperSection from "./StreamlinedEPaperSection";
import HighlightsSection from "./HighlightsSection";
import HoroscopeSection from "./HoroscopeSection";
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
  const articles = (articlesData?.articles as any[]) || [];

  // Individual category sections
  const nationalNews = articles.filter(
    (article) => article.category?.name === "National"
  );
  const worldNews = articles.filter(
    (article) => article.category?.name === "World" || article.category?.name === "International"
  );
  const entertainmentNews = articles.filter(
    (article) => article.category?.name === "Entertainment"
  );
  const politicsNews = articles.filter(
    (article) => article.category?.name === "Politics"
  );

  // Combined sections
  const scienceTechNews = articles.filter(
    (article) =>
      article.category?.name === "Science" ||
      article.category?.name === "Technology" ||
      article.category?.name === "Tech"
  );
  const lifestyleTravelNews = articles.filter(
    (article) =>
      article.category?.name === "Lifestyle" ||
      article.category?.name === "Travel"
  );
  const sportsBusinessNews = articles.filter(
    (article) =>
      article.category?.name === "Sports" ||
      article.category?.name === "Business" ||
      article.category?.name === "Finance"
  );

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
      <EnhancedHeroSection featuredArticles={articles} />

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
            {((topStoriesData?.topStories as any[]) || []).map((article) => (
              <NewsCard key={article.id} article={article} variant="featured" />
            ))}
          </div>
        </div>
      </section>

      {/* Streamlined E-Paper Section */}
      <StreamlinedEPaperSection />

      {/* Daily Horoscope Section */}
      <HoroscopeSection />

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
            {((quickReadsData?.inshorts as any[]) || []).map((item) => (
              <QuickReadCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* Video Bytes Preview - Horizontal Scroll */}
      <HorizontalVideoScroll
        videos={((videoBytesData?.shorts as any[]) || [])}
        title="Video Bytes"
        subtitle="News in motion - quick video updates"
      />

      {/* Enhanced Category Sections */}

      {/* National News - Hero Layout */}
      <EnhancedCategorySection
        title="National News"
        articles={nationalNews}
        layout="hero"
        backgroundColor="default"
        maxArticles={5}
      />

      {/* World News - Featured Layout */}
      <EnhancedCategorySection
        title="World News"
        articles={worldNews}
        layout="featured"
        backgroundColor="muted"
        maxArticles={5}
      />

      {/* Entertainment - Grid Layout */}
      <EnhancedCategorySection
        title="Entertainment"
        articles={entertainmentNews}
        layout="grid"
        backgroundColor="default"
        maxArticles={4}
      />

      {/* Politics - Featured Layout */}
      <EnhancedCategorySection
        title="Politics"
        articles={politicsNews}
        layout="featured"
        backgroundColor="accent"
        maxArticles={5}
      />

      {/* Science & Technology Combined Section */}
      <CombinedCategorySection
        title="Science & Technology"
        subtitle="Exploring innovation, discoveries, and technological breakthroughs"
        backgroundColor="muted"
        maxArticlesPerCategory={3}
        categories={[
          {
            name: "Science",
            articles: scienceTechNews.filter(article =>
              article.category?.name === "Science"
            ),
            color: "bg-blue-500"
          },
          {
            name: "Technology",
            articles: scienceTechNews.filter(article =>
              article.category?.name === "Technology" || article.category?.name === "Tech"
            ),
            color: "bg-purple-500"
          }
        ]}
      />

      {/* Lifestyle & Travel Combined Section */}
      <CombinedCategorySection
        title="Lifestyle & Travel"
        subtitle="Discover culture, wellness, and wanderlust inspiration"
        backgroundColor="default"
        maxArticlesPerCategory={3}
        categories={[
          {
            name: "Lifestyle",
            articles: lifestyleTravelNews.filter(article =>
              article.category?.name === "Lifestyle"
            ),
            color: "bg-pink-500"
          },
          {
            name: "Travel",
            articles: lifestyleTravelNews.filter(article =>
              article.category?.name === "Travel"
            ),
            color: "bg-green-500"
          }
        ]}
      />

      {/* Sports & Business Combined Section */}
      <CombinedCategorySection
        title="Sports & Business"
        subtitle="Competition, markets, and economic insights"
        backgroundColor="muted"
        maxArticlesPerCategory={2}
        categories={[
          {
            name: "Sports",
            articles: sportsBusinessNews.filter(article =>
              article.category?.name === "Sports"
            ),
            color: "bg-orange-500"
          },
          {
            name: "Business",
            articles: sportsBusinessNews.filter(article =>
              article.category?.name === "Business" || article.category?.name === "Finance"
            ),
            color: "bg-emerald-500"
          }
        ]}
      />

      <Footer />
    </div>
  );
};

export default Homepage;
