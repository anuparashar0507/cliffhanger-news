import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { nitApi, NIT, NITFilters, CreateNITData, UpdateNITData } from '../services';

// Query keys
export const nitKeys = {
    all: ['nit'] as const,
    lists: () => [...nitKeys.all, 'list'] as const,
    list: (filters: NITFilters) => [...nitKeys.lists(), filters] as const,
    details: () => [...nitKeys.all, 'detail'] as const,
    detail: (id: string) => [...nitKeys.details(), id] as const,
};

// Hooks for NIT
export const useNITs = (filters?: NITFilters) => {
    return useQuery({
        queryKey: nitKeys.list(filters || {}),
        queryFn: () => nitApi.getNITs(filters),
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};

export const useNIT = (id: string) => {
    return useQuery({
        queryKey: nitKeys.detail(id),
        queryFn: () => nitApi.getNIT(id),
        enabled: !!id,
    });
};

// Mutations for NIT
export const useCreateNIT = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateNITData) => nitApi.createNIT(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: nitKeys.lists() });
        },
    });
};

export const useUpdateNIT = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: UpdateNITData) => nitApi.updateNIT(data),
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({ queryKey: nitKeys.lists() });
            queryClient.invalidateQueries({ queryKey: nitKeys.detail(variables.id) });
        },
    });
};

export const useDeleteNIT = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => nitApi.deleteNIT(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: nitKeys.lists() });
        },
    });
};
