import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ArticleClient from './article-client';
import { articlesApi } from '@/services/articles';

interface PageProps {
  params: { id: string };
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const response = await articlesApi.getArticle(params.id);
    const article = response.data;

    if (!article) {
      return {
        title: 'Article Not Found',
        description: 'The requested article could not be found.',
      };
    }

    return {
      title: article.seoTitle || article.title,
      description: article.seoDescription || article.excerpt || article.title,
      keywords: article.tags?.join(', '),
      authors: article.author ? [{ name: article.author.name }] : undefined,
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      openGraph: {
        title: article.title,
        description: article.excerpt || article.title,
        type: 'article',
        publishedTime: article.publishedAt,
        modifiedTime: article.updatedAt,
        authors: article.author ? [article.author.name] : undefined,
        tags: article.tags,
        images: article.featuredImage ? [
          {
            url: article.featuredImage,
            width: 1200,
            height: 630,
            alt: article.title,
          }
        ] : undefined,
      },
      twitter: {
        card: 'summary_large_image',
        title: article.title,
        description: article.excerpt || article.title,
        images: article.featuredImage ? [article.featuredImage] : undefined,
      },
    };
  } catch (error) {
    return {
      title: 'Article Not Found',
      description: 'The requested article could not be found.',
    };
  }
}

export default async function ArticlePage({ params }: PageProps) {
  try {
    // Server-side data fetching for SEO
    const response = await articlesApi.getArticle(params.id);
    const article = response.data;

    if (!article) {
      notFound();
    }

    // Pass initial data to client component
    return <ArticleClient articleId={params.id} initialArticle={article} />;
  } catch (error) {
    notFound();
  }
}