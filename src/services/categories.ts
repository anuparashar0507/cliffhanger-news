import { apiClient, ApiResponse, PaginationParams } from './apiClient';

// Types for Categories
export interface Category {
    id: string;
    name: string;
    slug: string;
    description?: string;
    color?: string;
    icon?: string;
    isActive: boolean;
    articleCount: number;
    highlightCount: number;
    inshortCount: number;
    createdAt: string;
    updatedAt: string;
}

export interface CategoryFilters extends PaginationParams {
    isActive?: boolean;
    search?: string;
    [key: string]: unknown;
}

export interface CreateCategoryData {
    name: string;
    description?: string;
    color?: string;
    icon?: string;
    isActive?: boolean;
}

export interface UpdateCategoryData extends Partial<CreateCategoryData> {
    id: string;
}

export interface CategoryStats {
    totalCategories: number;
    activeCategories: number;
    totalArticles: number;
    totalHighlights: number;
    totalInshorts: number;
    categoryBreakdown: Array<{
        category: Category;
        articleCount: number;
        highlightCount: number;
        inshortCount: number;
    }>;
}

// Category API functions
export const categoriesApi = {
    // Get all categories with filters
    getCategories: async (filters?: CategoryFilters): Promise<ApiResponse<Category[]>> => {
        return apiClient.get<Category[]>('/categories', filters);
    },

    // Get category by ID
    getCategory: async (id: string): Promise<ApiResponse<Category>> => {
        return apiClient.get<Category>(`/categories/${id}`);
    },

    // Get category by slug
    getCategoryBySlug: async (slug: string): Promise<ApiResponse<Category>> => {
        return apiClient.get<Category>(`/categories/slug/${slug}`);
    },

    // Get category statistics
    getCategoriesStats: async (): Promise<ApiResponse<CategoryStats>> => {
        return apiClient.get<CategoryStats>('/categories/stats');
    },

    // Create new category
    createCategory: async (data: CreateCategoryData): Promise<ApiResponse<Category>> => {
        return apiClient.post<Category>('/categories', data);
    },

    // Update category
    updateCategory: async (data: UpdateCategoryData): Promise<ApiResponse<Category>> => {
        return apiClient.put<Category>(`/categories/${data.id}`, data);
    },

    // Delete category
    deleteCategory: async (id: string): Promise<ApiResponse<void>> => {
        return apiClient.delete<void>(`/categories/${id}`);
    },
};
