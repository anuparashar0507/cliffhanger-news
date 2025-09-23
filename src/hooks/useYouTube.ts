import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { youtubeApi, YouTubeShort, YouTubeFilters, CreateYouTubeShortData, UpdateYouTubeShortData } from '../services';

// Query keys
export const youtubeKeys = {
    all: ['youtube'] as const,
    lists: () => [...youtubeKeys.all, 'list'] as const,
    list: (filters: YouTubeFilters) => [...youtubeKeys.lists(), filters] as const,
    details: () => [...youtubeKeys.all, 'detail'] as const,
    detail: (id: string) => [...youtubeKeys.details(), id] as const,
    shorts: () => [...youtubeKeys.all, 'shorts'] as const,
};

// Hooks for YouTube
export const useYouTubeShorts = (filters?: YouTubeFilters) => {
    return useQuery({
        queryKey: youtubeKeys.list(filters || {}),
        queryFn: () => youtubeApi.getShorts(filters),
        staleTime: 10 * 60 * 1000, // 10 minutes
    });
};

export const useYouTubeShort = (id: string) => {
    return useQuery({
        queryKey: youtubeKeys.detail(id),
        queryFn: () => youtubeApi.getShort(id),
        enabled: !!id,
    });
};

// Mutations for YouTube
export const useCreateYouTubeShort = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateYouTubeShortData) => youtubeApi.createShort(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: youtubeKeys.lists() });
        },
    });
};

export const useUpdateYouTubeShort = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: UpdateYouTubeShortData) => youtubeApi.updateShort(data),
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({ queryKey: youtubeKeys.lists() });
            queryClient.invalidateQueries({ queryKey: youtubeKeys.detail(variables.id) });
        },
    });
};

export const useDeleteYouTubeShort = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => youtubeApi.deleteShort(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: youtubeKeys.lists() });
        },
    });
};
