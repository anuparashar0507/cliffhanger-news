'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ArrowLeft, Clock, User, Share2, Bookmark, Heart, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import NewsCard from '@/components/NewsCard';
import { useArticles } from '@/hooks';
import { Article } from '@/services';

interface ArticleClientProps {
  articleId: string;
  initialArticle: Article;
}

const ArticleClient = ({ articleId, initialArticle }: ArticleClientProps) => {
  const router = useRouter();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  // Fetch related articles
  const { data: relatedArticlesData } = useArticles({
    limit: 4,
    excludeId: articleId,
  });

  const article = initialArticle;
  const relatedArticles = (relatedArticlesData?.articles as Article[]) || [];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
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
        navigator.clipboard.writeText(window.location.href);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <article className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="mb-6 group"
            >
              <ArrowLeft className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1" />
              Back
            </Button>

            <header className="mb-8">
              {article.category && (
                <div className="mb-4">
                  <span
                    className={`category-badge ${
                      article.category.name?.toLowerCase() || 'uncategorized'
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

              <h1 className="headline-xl text-foreground mb-6 leading-tight">
                {article.title}
              </h1>

              {article.excerpt && (
                <p className="body-large text-muted-foreground mb-6 leading-relaxed">
                  {article.excerpt}
                </p>
              )}

              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-6">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>{article.author?.name || 'Unknown Author'}</span>
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

              <div className="flex items-center gap-4 pb-6 border-b border-border">
                <Button variant="outline" size="sm" onClick={handleLike} className="group">
                  <Heart className={`h-4 w-4 mr-2 ${isLiked ? 'fill-current text-red-500' : ''}`} />
                  {isLiked ? 'Liked' : 'Like'}
                </Button>
                <Button variant="outline" size="sm" onClick={handleBookmark} className="group">
                  <Bookmark className={`h-4 w-4 mr-2 ${isBookmarked ? 'fill-current text-blue-500' : ''}`} />
                  {isBookmarked ? 'Saved' : 'Save'}
                </Button>
                <Button variant="outline" size="sm" onClick={handleShare} className="group">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </header>

            {article.featuredImage && (
              <div className="mb-8">
                <img
                  src={article.featuredImage}
                  alt={article.title}
                  className="w-full h-64 md:h-96 object-cover rounded-lg"
                />
              </div>
            )}

            <div className="prose prose-lg max-w-none mb-12">
              {article.content ? (
                <div
                  className="article-content"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />
              ) : (
                <div className="space-y-4 text-foreground leading-relaxed">
                  <p>
                    {article.excerpt || 'This article content is not available at the moment.'}
                  </p>
                </div>
              )}
            </div>

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

export default ArticleClient;