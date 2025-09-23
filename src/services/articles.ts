import { apiClient, ApiResponse, PaginationParams } from './apiClient';

// Types for Articles
export interface Article {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    author: {
        id: string;
        name: string;
        avatar?: string;
    };
    category: {
        id: string;
        name: string;
        slug: string;
    };
    publishedAt: string;
    featuredImage?: string;
    readTime: number;
    isBreaking: boolean;
    isFeatured: boolean;
    seoTitle?: string;
    seoDescription?: string;
    seoKeywords?: string[];
    tags?: string[];
    status: 'draft' | 'published' | 'archived';
    viewCount: number;
    likeCount: number;
    shareCount: number;
    createdAt: string;
    updatedAt: string;
}

export interface ArticleFilters extends PaginationParams {
    category?: string;
    author?: string;
    status?: string;
    isBreaking?: boolean;
    isFeatured?: boolean;
    search?: string;
    dateFrom?: string;
    dateTo?: string;
    [key: string]: unknown;
}

export interface CreateArticleData {
    title: string;
    excerpt: string;
    content: string;
    categoryId: string;
    featuredImage?: string;
    isBreaking?: boolean;
    isFeatured?: boolean;
    seoTitle?: string;
    seoDescription?: string;
    seoKeywords?: string[];
    tags?: string[];
    status?: 'draft' | 'published';
}

export interface UpdateArticleData extends Partial<CreateArticleData> {
    id: string;
}

// Article API functions
export const articlesApi = {
    // Get all articles with filters
    getArticles: async (filters?: ArticleFilters): Promise<ApiResponse<Article[]>> => {
        return apiClient.get<Article[]>('/articles', filters);
    },

    // Get article by ID
    getArticle: async (id: string): Promise<ApiResponse<Article>> => {
        return apiClient.get<Article>(`/articles/${id}`);
    },

    // Get article by slug
    getArticleBySlug: async (slug: string): Promise<ApiResponse<Article>> => {
        return apiClient.get<Article>(`/articles/slug/${slug}`);
    },

    // Get quick reads (short articles)
    getQuickReads: async (limit?: number): Promise<ApiResponse<Article[]>> => {
        return apiClient.get<Article[]>('/articles/quick-reads', { limit });
    },

    // Get breaking news
    getBreakingNews: async (limit?: number): Promise<ApiResponse<Article[]>> => {
        return apiClient.get<Article[]>('/articles/breaking', { limit });
    },

    // Get top stories
    getTopStories: async (limit?: number): Promise<ApiResponse<Article[]>> => {
        return apiClient.get<Article[]>('/articles/top-stories', { limit });
    },

    // Create new article
    createArticle: async (data: CreateArticleData): Promise<ApiResponse<Article>> => {
        return apiClient.post<Article>('/articles', data);
    },

    // Update article
    updateArticle: async (data: UpdateArticleData): Promise<ApiResponse<Article>> => {
        return apiClient.put<Article>(`/articles/${data.id}`, data);
    },

    // Delete article
    deleteArticle: async (id: string): Promise<ApiResponse<void>> => {
        return apiClient.delete<void>(`/articles/${id}`);
    },

    // Generate news from content
    generateNewsFromContent: async (content: string, options?: Record<string, unknown>): Promise<ApiResponse<Article>> => {
        return apiClient.post<Article>('/articles/generate-from-content', { content, ...options });
    },

    // Generate SEO only
    generateSEOOnly: async (articleId: string, content: string): Promise<ApiResponse<Record<string, unknown>>> => {
        return apiClient.post<Record<string, unknown>>('/articles/generate-seo', { articleId, content });
    },

    // Regenerate with feedback
    regenerateWithFeedback: async (articleId: string, feedback: string): Promise<ApiResponse<Article>> => {
        return apiClient.post<Article>('/articles/regenerate-with-feedback', { articleId, feedback });
    },

    // Translate content
    translateContent: async (articleId: string, targetLanguage: string): Promise<ApiResponse<Article>> => {
        return apiClient.post<Article>('/articles/translate', { articleId, targetLanguage });
    },
};
