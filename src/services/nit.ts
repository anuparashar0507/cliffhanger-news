import { apiClient, ApiResponse, PaginationParams } from './apiClient';

// Types for NIT (News in Time)
export interface NIT {
    id: string;
    title: string;
    content: string;
    image?: string;
    category: {
        id: string;
        name: string;
        slug: string;
    };
    isBreaking: boolean;
    isFeatured: boolean;
    publishedAt: string;
    viewCount: number;
    likeCount: number;
    shareCount: number;
    createdAt: string;
    updatedAt: string;
}

export interface NITFilters extends PaginationParams {
    category?: string;
    isBreaking?: boolean;
    isFeatured?: boolean;
    search?: string;
    dateFrom?: string;
    dateTo?: string;
    [key: string]: unknown;
}

export interface CreateNITData {
    title: string;
    content: string;
    categoryId: string;
    image?: string;
    isBreaking?: boolean;
    isFeatured?: boolean;
}

export interface UpdateNITData extends Partial<CreateNITData> {
    id: string;
}

// NIT API functions
export const nitApi = {
    // Get all NITs with filters
    getNITs: async (filters?: NITFilters): Promise<ApiResponse<NIT[]>> => {
        return apiClient.get<NIT[]>('/nit', filters);
    },

    // Get NIT by ID
    getNIT: async (id: string): Promise<ApiResponse<NIT>> => {
        return apiClient.get<NIT>(`/nit/${id}`);
    },

    // Create new NIT
    createNIT: async (data: CreateNITData): Promise<ApiResponse<NIT>> => {
        return apiClient.post<NIT>('/nit', data);
    },

    // Update NIT
    updateNIT: async (data: UpdateNITData): Promise<ApiResponse<NIT>> => {
        return apiClient.put<NIT>(`/nit/${data.id}`, data);
    },

    // Delete NIT
    deleteNIT: async (id: string): Promise<ApiResponse<void>> => {
        return apiClient.delete<void>(`/nit/${id}`);
    },
};
