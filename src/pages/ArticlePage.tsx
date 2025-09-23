import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowLeft, Clock, User, Share2, Bookmark, Heart, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NewsCard from "@/components/NewsCard";
import { useArticle, useArticles } from "@/hooks";
import { Article } from "@/services";

const ArticlePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  // Fetch the main article
  const { data: articleData, isLoading, error } = useArticle(id || "");

  // Fetch related articles
  const { data: relatedArticlesData } = useArticles({
    limit: 4,
    excludeId: id,
  });

  const article = articleData?.article as Article;
  const relatedArticles = (relatedArticlesData?.articles as Article[]) || [];

  // SEO setup
  useEffect(() => {
    if (article) {
      document.title = `${article.title} - The Cliff News`;

      // Update meta description
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', article.excerpt || article.title);
      }

      // Update Open Graph tags
      const ogTitle = document.querySelector('meta[property="og:title"]');
      const ogDescription = document.querySelector('meta[property="og:description"]');
      const ogImage = document.querySelector('meta[property="og:image"]');

      if (ogTitle) ogTitle.setAttribute('content', article.title);
      if (ogDescription) ogDescription.setAttribute('content', article.excerpt || article.title);
      if (ogImage && article.featuredImage) ogImage.setAttribute('content', article.featuredImage);
    }
  }, [article]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleShare = async () => {
    if (navigator.share && article) {
      try {
        await navigator.share({
          title: article.title,
          text: article.excerpt,
          url: window.location.href,
        });
      } catch (error) {
        // Fallback to clipboard
        navigator.clipboard.writeText(window.location.href);
      }
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    // TODO: Implement actual bookmark functionality
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    // TODO: Implement actual like functionality
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse">
              <div className="h-8 bg-muted rounded w-3/4 mb-4"></div>
              <div className="h-64 bg-muted rounded mb-6"></div>
              <div className="space-y-3">
                <div className="h-4 bg-muted rounded"></div>
                <div className="h-4 bg-muted rounded w-5/6"></div>
                <div className="h-4 bg-muted rounded w-4/6"></div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="headline-large text-foreground mb-4">Article Not Found</h1>
            <p className="body-large text-muted-foreground mb-8">
              The article you're looking for doesn't exist or has been moved.
            </p>
            <Button onClick={() => navigate("/")} className="group">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Homepage
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Article Content */}
      <article className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="mb-6 group"
            >
              <ArrowLeft className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1" />
              Back
            </Button>

            {/* Article Header */}
            <header className="mb-8">
              {/* Category Badge */}
              {article.category && (
                <div className="mb-4">
                  <span
                    className={`category-badge ${
                      article.category.name?.toLowerCase() || "uncategorized"
                    }`}
                  >
                    {article.category.name}
                  </span>
                  {article.isBreaking && (
                    <span className="category-badge breaking ml-2 animate-pulse">
                      🔴 BREAKING
                    </span>
                  )}
                </div>
              )}

              {/* Title */}
              <h1 className="headline-xl text-foreground mb-6 leading-tight">
                {article.title}
              </h1>

              {/* Excerpt */}
              {article.excerpt && (
                <p className="body-large text-muted-foreground mb-6 leading-relaxed">
                  {article.excerpt}
                </p>
              )}

              {/* Article Meta */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-6">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>{article.author?.name || "Unknown Author"}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>
                    {formatDate(article.publishedAt)} at {formatTime(article.publishedAt)}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Eye className="h-4 w-4" />
                  <span>{article.readTime} min read</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-4 pb-6 border-b border-border">
                <Button variant="outline" size="sm" onClick={handleLike} className="group">
                  <Heart className={`h-4 w-4 mr-2 ${isLiked ? "fill-current text-red-500" : ""}`} />
                  {isLiked ? "Liked" : "Like"}
                </Button>
                <Button variant="outline" size="sm" onClick={handleBookmark} className="group">
                  <Bookmark className={`h-4 w-4 mr-2 ${isBookmarked ? "fill-current text-blue-500" : ""}`} />
                  {isBookmarked ? "Saved" : "Save"}
                </Button>
                <Button variant="outline" size="sm" onClick={handleShare} className="group">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </header>

            {/* Featured Image */}
            {article.featuredImage && (
              <div className="mb-8">
                <img
                  src={article.featuredImage}
                  alt={article.title}
                  className="w-full h-64 md:h-96 object-cover rounded-lg"
                />
              </div>
            )}

            {/* Article Content */}
            <div className="prose prose-lg max-w-none mb-12">
              {article.content ? (
                <div
                  className="article-content"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />
              ) : (
                <div className="space-y-4 text-foreground leading-relaxed">
                  <p>
                    {article.excerpt || "This article content is not available at the moment."}
                  </p>
                </div>
              )}
            </div>

            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
              <div className="mb-12">
                <h3 className="font-semibold text-foreground mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-muted text-muted-foreground text-sm rounded-full hover:bg-primary/10 transition-colors cursor-pointer"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </article>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="mb-8">
                <h2 className="headline-medium text-foreground mb-2">Related Articles</h2>
                <div className="w-12 h-1 bg-primary rounded-full"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedArticles.map((relatedArticle) => (
                  <NewsCard key={relatedArticle.id} article={relatedArticle} />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default ArticlePage;