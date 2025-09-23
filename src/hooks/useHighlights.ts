import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { highlightsApi, Highlight, HighlightFilters, CreateHighlightData, UpdateHighlightData } from '../services';

// Query keys
export const highlightKeys = {
    all: ['highlights'] as const,
    lists: () => [...highlightKeys.all, 'list'] as const,
    list: (filters: HighlightFilters) => [...highlightKeys.lists(), filters] as const,
    details: () => [...highlightKeys.all, 'detail'] as const,
    detail: (id: string) => [...highlightKeys.details(), id] as const,
    recent: () => [...highlightKeys.all, 'recent'] as const,
    categories: () => [...highlightKeys.all, 'categories'] as const,
    byCategory: (category: string) => [...highlightKeys.all, 'category', category] as const,
    analytics: (id: string) => [...highlightKeys.all, 'analytics', id] as const,
    analyticsOverview: () => [...highlightKeys.all, 'analytics', 'overview'] as const,
};

// Hooks for Highlights
export const useHighlights = (filters?: HighlightFilters) => {
    return useQuery({
        queryKey: highlightKeys.list(filters || {}),
        queryFn: () => highlightsApi.getHighlights(filters),
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};

export const useHighlight = (id: string) => {
    return useQuery({
        queryKey: highlightKeys.detail(id),
        queryFn: () => highlightsApi.getHighlight(id),
        enabled: !!id,
    });
};

export const useRecentHighlights = (limit?: number) => {
    return useQuery({
        queryKey: [...highlightKeys.recent(), limit],
        queryFn: () => highlightsApi.getRecentHighlights(limit),
        staleTime: 10 * 60 * 1000, // 10 minutes
    });
};

export const useHighlightCategories = () => {
    return useQuery({
        queryKey: highlightKeys.categories(),
        queryFn: () => highlightsApi.getHighlightCategories(),
        staleTime: 30 * 60 * 1000, // 30 minutes
    });
};

export const useHighlightsByCategory = (category: string, filters?: Record<string, unknown>) => {
    return useQuery({
        queryKey: [...highlightKeys.byCategory(category), filters],
        queryFn: () => highlightsApi.getHighlightsByCategory(category, filters),
        enabled: !!category,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};

export const useHighlightAnalytics = (id: string) => {
    return useQuery({
        queryKey: highlightKeys.analytics(id),
        queryFn: () => highlightsApi.getHighlightAnalytics(id),
        enabled: !!id,
    });
};

export const useHighlightsAnalytics = () => {
    return useQuery({
        queryKey: highlightKeys.analyticsOverview(),
        queryFn: () => highlightsApi.getHighlightsAnalytics(),
    });
};

// Mutations for Highlights
export const useCreateHighlight = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateHighlightData) => highlightsApi.createHighlight(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: highlightKeys.lists() });
        },
    });
};

export const useUpdateHighlight = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: UpdateHighlightData) => highlightsApi.updateHighlight(data),
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({ queryKey: highlightKeys.lists() });
            queryClient.invalidateQueries({ queryKey: highlightKeys.detail(variables.id) });
        },
    });
};

export const useDeleteHighlight = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => highlightsApi.deleteHighlight(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: highlightKeys.lists() });
        },
    });
};

export const useBulkHighlightOperation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ operation, ids }: { operation: 'delete' | 'publish' | 'archive'; ids: string[] }) =>
            highlightsApi.bulkOperation(operation, ids),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: highlightKeys.lists() });
        },
    });
};

export const useTrackHighlightInteraction = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, type }: { id: string; type: 'view' | 'like' | 'share' }) =>
            highlightsApi.trackInteraction(id, type),
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({ queryKey: highlightKeys.detail(variables.id) });
        },
    });
};
