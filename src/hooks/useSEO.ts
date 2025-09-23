import { useEffect } from 'react';
import { updateDocumentHead } from '@/utils/seo';
import { SEOData } from '@/utils/seo';

export const useSEO = (seoData: SEOData) => {
    useEffect(() => {
        updateDocumentHead(seoData);
    }, [seoData]);
};

export const useArticleSEO = (article: any) => {
    useEffect(() => {
        if (!article) return;

        const seoData: SEOData = {
            title: article.seoTitle || article.title,
            description: article.seoDescription || article.excerpt,
            keywords: article.seoKeywords || [],
            image: article.featuredImage,
            url: `${window.location.origin}/articles/${article.slug}`,
            type: 'article',
            publishedTime: article.publishedAt,
            modifiedTime: article.updatedAt,
            author: article.author?.name,
            section: article.category?.name,
            tags: article.tags || [],
        };

        updateDocumentHead(seoData);
    }, [article]);
};

export const usePageSEO = (title: string, description?: string, image?: string) => {
    useEffect(() => {
        const seoData: SEOData = {
            title,
            description,
            image,
            type: 'website',
        };

        updateDocumentHead(seoData);
    }, [title, description, image]);
};
