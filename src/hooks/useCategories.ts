import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { categoriesApi, Category, CategoryFilters, CreateCategoryData, UpdateCategoryData } from '../services';

// Query keys
export const categoryKeys = {
    all: ['categories'] as const,
    lists: () => [...categoryKeys.all, 'list'] as const,
    list: (filters: CategoryFilters) => [...categoryKeys.lists(), filters] as const,
    details: () => [...categoryKeys.all, 'detail'] as const,
    detail: (id: string) => [...categoryKeys.details(), id] as const,
    bySlug: (slug: string) => [...categoryKeys.details(), 'slug', slug] as const,
    stats: () => [...categoryKeys.all, 'stats'] as const,
};

// Hooks for Categories
export const useCategories = (filters?: CategoryFilters) => {
    return useQuery({
        queryKey: categoryKeys.list(filters || {}),
        queryFn: () => categoriesApi.getCategories(filters),
        staleTime: 30 * 60 * 1000, // 30 minutes
    });
};

export const useCategory = (id: string) => {
    return useQuery({
        queryKey: categoryKeys.detail(id),
        queryFn: () => categoriesApi.getCategory(id),
        enabled: !!id,
    });
};

export const useCategoryBySlug = (slug: string) => {
    return useQuery({
        queryKey: categoryKeys.bySlug(slug),
        queryFn: () => categoriesApi.getCategoryBySlug(slug),
        enabled: !!slug,
    });
};

export const useCategoriesStats = () => {
    return useQuery({
        queryKey: categoryKeys.stats(),
        queryFn: () => categoriesApi.getCategoriesStats(),
        staleTime: 10 * 60 * 1000, // 10 minutes
    });
};

// Mutations for Categories
export const useCreateCategory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateCategoryData) => categoriesApi.createCategory(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: categoryKeys.lists() });
            queryClient.invalidateQueries({ queryKey: categoryKeys.stats() });
        },
    });
};

export const useUpdateCategory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: UpdateCategoryData) => categoriesApi.updateCategory(data),
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({ queryKey: categoryKeys.lists() });
            queryClient.invalidateQueries({ queryKey: categoryKeys.detail(variables.id) });
            queryClient.invalidateQueries({ queryKey: categoryKeys.stats() });
        },
    });
};

export const useDeleteCategory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => categoriesApi.deleteCategory(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: categoryKeys.lists() });
            queryClient.invalidateQueries({ queryKey: categoryKeys.stats() });
        },
    });
};
