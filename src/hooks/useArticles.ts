import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { articlesApi, Article, ArticleFilters, CreateArticleData, UpdateArticleData } from '../services';

// Query keys
export const articleKeys = {
    all: ['articles'] as const,
    lists: () => [...articleKeys.all, 'list'] as const,
    list: (filters: ArticleFilters) => [...articleKeys.lists(), filters] as const,
    details: () => [...articleKeys.all, 'detail'] as const,
    detail: (id: string) => [...articleKeys.details(), id] as const,
    bySlug: (slug: string) => [...articleKeys.details(), 'slug', slug] as const,
    quickReads: () => [...articleKeys.all, 'quick-reads'] as const,
    breaking: () => [...articleKeys.all, 'breaking'] as const,
    topStories: () => [...articleKeys.all, 'top-stories'] as const,
};

// Hooks for Articles
export const useArticles = (filters?: ArticleFilters) => {
    return useQuery({
        queryKey: articleKeys.list(filters || {}),
        queryFn: () => articlesApi.getArticles(filters),
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};

export const useArticle = (id: string) => {
    return useQuery({
        queryKey: articleKeys.detail(id),
        queryFn: () => articlesApi.getArticle(id),
        enabled: !!id,
    });
};

export const useArticleBySlug = (slug: string) => {
    return useQuery({
        queryKey: articleKeys.bySlug(slug),
        queryFn: () => articlesApi.getArticleBySlug(slug),
        enabled: !!slug,
    });
};

export const useQuickReads = (limit?: number) => {
    return useQuery({
        queryKey: [...articleKeys.quickReads(), limit],
        queryFn: () => articlesApi.getQuickReads(limit),
        staleTime: 10 * 60 * 1000, // 10 minutes
    });
};

export const useBreakingNews = (limit?: number) => {
    return useQuery({
        queryKey: [...articleKeys.breaking(), limit],
        queryFn: () => articlesApi.getBreakingNews(limit),
        staleTime: 2 * 60 * 1000, // 2 minutes
    });
};

export const useTopStories = (limit?: number) => {
    return useQuery({
        queryKey: [...articleKeys.topStories(), limit],
        queryFn: () => articlesApi.getTopStories(limit),
        staleTime: 10 * 60 * 1000, // 10 minutes
    });
};

// Mutations for Articles
export const useCreateArticle = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateArticleData) => articlesApi.createArticle(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: articleKeys.lists() });
        },
    });
};

export const useUpdateArticle = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: UpdateArticleData) => articlesApi.updateArticle(data),
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({ queryKey: articleKeys.lists() });
            queryClient.invalidateQueries({ queryKey: articleKeys.detail(variables.id) });
        },
    });
};

export const useDeleteArticle = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => articlesApi.deleteArticle(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: articleKeys.lists() });
        },
    });
};

export const useGenerateNewsFromContent = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ content, options }: { content: string; options?: Record<string, unknown> }) =>
            articlesApi.generateNewsFromContent(content, options),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: articleKeys.lists() });
        },
    });
};

export const useGenerateSEO = () => {
    return useMutation({
        mutationFn: ({ articleId, content }: { articleId: string; content: string }) =>
            articlesApi.generateSEOOnly(articleId, content),
    });
};

export const useRegenerateWithFeedback = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ articleId, feedback }: { articleId: string; feedback: string }) =>
            articlesApi.regenerateWithFeedback(articleId, feedback),
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({ queryKey: articleKeys.detail(variables.articleId) });
        },
    });
};

export const useTranslateContent = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ articleId, targetLanguage }: { articleId: string; targetLanguage: string }) =>
            articlesApi.translateContent(articleId, targetLanguage),
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({ queryKey: articleKeys.detail(variables.articleId) });
        },
    });
};
