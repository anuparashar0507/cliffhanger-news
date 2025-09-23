import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { inshortsApi, Inshort, InshortFilters, CreateInshortData, UpdateInshortData, GenerateInshortData } from '../services';

// Query keys
export const inshortKeys = {
    all: ['inshorts'] as const,
    lists: () => [...inshortKeys.all, 'list'] as const,
    list: (filters: InshortFilters) => [...inshortKeys.lists(), filters] as const,
    details: () => [...inshortKeys.all, 'detail'] as const,
    detail: (id: string) => [...inshortKeys.details(), id] as const,
    byArticle: (articleId: string) => [...inshortKeys.all, 'article', articleId] as const,
};

// Hooks for Inshorts
export const useInshorts = (filters?: InshortFilters) => {
    return useQuery({
        queryKey: inshortKeys.list(filters || {}),
        queryFn: () => inshortsApi.getInshorts(filters),
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};

export const useInshort = (id: string) => {
    return useQuery({
        queryKey: inshortKeys.detail(id),
        queryFn: () => inshortsApi.getInshort(id),
        enabled: !!id,
    });
};

export const useInshortsByArticle = (articleId: string) => {
    return useQuery({
        queryKey: inshortKeys.byArticle(articleId),
        queryFn: () => inshortsApi.getInshortsByArticle(articleId),
        enabled: !!articleId,
    });
};

// Mutations for Inshorts
export const useCreateInshort = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateInshortData) => inshortsApi.createInshort(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: inshortKeys.lists() });
        },
    });
};

export const useUpdateInshort = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: UpdateInshortData) => inshortsApi.updateInshort(data),
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({ queryKey: inshortKeys.lists() });
            queryClient.invalidateQueries({ queryKey: inshortKeys.detail(variables.id) });
        },
    });
};

export const useDeleteInshort = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => inshortsApi.deleteInshort(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: inshortKeys.lists() });
        },
    });
};

export const useGenerateInshort = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: GenerateInshortData) => inshortsApi.generateInshort(data),
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({ queryKey: inshortKeys.byArticle(variables.articleId) });
        },
    });
};

export const usePublishInshort = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => inshortsApi.publishInshort(id),
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({ queryKey: inshortKeys.detail(variables) });
            queryClient.invalidateQueries({ queryKey: inshortKeys.lists() });
        },
    });
};
