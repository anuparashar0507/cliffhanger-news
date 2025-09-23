import { apiClient, ApiResponse, PaginationParams } from './apiClient';

// Types for Inshorts
export interface Inshort {
    id: string;
    headline: string;
    summary: string;
    image?: string;
    source: string;
    category: {
        id: string;
        name: string;
        slug: string;
    };
    publishedAt: string;
    sourceUrl?: string;
    articleId?: string;
    status: 'draft' | 'published' | 'archived';
    viewCount: number;
    likeCount: number;
    shareCount: number;
    createdAt: string;
    updatedAt: string;
}

export interface InshortFilters extends PaginationParams {
    category?: string;
    status?: string;
    search?: string;
    dateFrom?: string;
    dateTo?: string;
    [key: string]: unknown;
}

export interface CreateInshortData {
    headline: string;
    summary: string;
    image?: string;
    source: string;
    categoryId: string;
    sourceUrl?: string;
    articleId?: string;
    status?: 'draft' | 'published';
}

export interface UpdateInshortData extends Partial<CreateInshortData> {
    id: string;
}

export interface GenerateInshortData {
    articleId: string;
    style?: 'formal' | 'casual' | 'breaking';
    length?: 'short' | 'medium' | 'long';
}

// Inshort API functions
export const inshortsApi = {
    // Get all inshorts with filters
    getInshorts: async (filters?: InshortFilters): Promise<ApiResponse<Inshort[]>> => {
        return apiClient.get<Inshort[]>('/inshorts', filters);
    },

    // Get inshort by ID
    getInshort: async (id: string): Promise<ApiResponse<Inshort>> => {
        return apiClient.get<Inshort>(`/inshorts/${id}`);
    },

    // Get inshorts by article
    getInshortsByArticle: async (articleId: string): Promise<ApiResponse<Inshort[]>> => {
        return apiClient.get<Inshort[]>(`/inshorts/article/${articleId}`);
    },

    // Generate inshort from article
    generateInshort: async (data: GenerateInshortData): Promise<ApiResponse<Inshort>> => {
        return apiClient.post<Inshort>(`/inshorts/generate/${data.articleId}`, data);
    },

    // Create new inshort
    createInshort: async (data: CreateInshortData): Promise<ApiResponse<Inshort>> => {
        return apiClient.post<Inshort>('/inshorts', data);
    },

    // Update inshort
    updateInshort: async (data: UpdateInshortData): Promise<ApiResponse<Inshort>> => {
        return apiClient.put<Inshort>(`/inshorts/${data.id}`, data);
    },

    // Delete inshort
    deleteInshort: async (id: string): Promise<ApiResponse<void>> => {
        return apiClient.delete<void>(`/inshorts/${id}`);
    },

    // Publish inshort
    publishInshort: async (id: string): Promise<ApiResponse<Inshort>> => {
        return apiClient.post<Inshort>(`/inshorts/${id}/publish`);
    },
};
