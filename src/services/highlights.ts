import { apiClient, ApiResponse, PaginationParams } from './apiClient';

// Types for Highlights
export interface Highlight {
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
    interactionCount: number;
    createdAt: string;
    updatedAt: string;
}

export interface HighlightFilters extends PaginationParams {
    category?: string;
    isBreaking?: boolean;
    isFeatured?: boolean;
    search?: string;
    dateFrom?: string;
    dateTo?: string;
    [key: string]: unknown;
}

export interface CreateHighlightData {
    title: string;
    content: string;
    categoryId: string;
    image?: string;
    isBreaking?: boolean;
    isFeatured?: boolean;
}

export interface UpdateHighlightData extends Partial<CreateHighlightData> {
    id: string;
}

export interface HighlightAnalytics {
    id: string;
    viewCount: number;
    likeCount: number;
    shareCount: number;
    interactionCount: number;
    topSources: Array<{
        source: string;
        count: number;
    }>;
    dailyViews: Array<{
        date: string;
        views: number;
    }>;
}

// Highlight API functions
export const highlightsApi = {
    // Get all highlights with filters
    getHighlights: async (filters?: HighlightFilters): Promise<ApiResponse<Highlight[]>> => {
        return apiClient.get<Highlight[]>('/highlights', filters);
    },

    // Get highlight by ID
    getHighlight: async (id: string): Promise<ApiResponse<Highlight>> => {
        return apiClient.get<Highlight>(`/highlights/${id}`);
    },

    // Get recent highlights
    getRecentHighlights: async (limit?: number): Promise<ApiResponse<Highlight[]>> => {
        return apiClient.get<Highlight[]>('/highlights/recent', { limit });
    },

    // Get highlight categories
    getHighlightCategories: async (): Promise<ApiResponse<Array<{ id: string; name: string; slug: string }>>> => {
        return apiClient.get<Array<{ id: string; name: string; slug: string }>>('/highlights/categories');
    },

    // Get highlights by category
    getHighlightsByCategory: async (category: string, filters?: PaginationParams): Promise<ApiResponse<Highlight[]>> => {
        return apiClient.get<Highlight[]>(`/highlights/category/${category}`, filters);
    },

    // Track interaction
    trackInteraction: async (id: string, interactionType: 'view' | 'like' | 'share'): Promise<ApiResponse<void>> => {
        return apiClient.post<void>(`/highlights/${id}/interact`, { type: interactionType });
    },

    // Download highlight
    downloadHighlight: async (id: string): Promise<Blob> => {
        const response = await fetch(`${apiClient['baseURL']}/highlights/${id}/download`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
            },
        });
        return response.blob();
    },

    // Create new highlight
    createHighlight: async (data: CreateHighlightData): Promise<ApiResponse<Highlight>> => {
        return apiClient.post<Highlight>('/highlights', data);
    },

    // Update highlight
    updateHighlight: async (data: UpdateHighlightData): Promise<ApiResponse<Highlight>> => {
        return apiClient.put<Highlight>(`/highlights/${data.id}`, data);
    },

    // Delete highlight
    deleteHighlight: async (id: string): Promise<ApiResponse<void>> => {
        return apiClient.delete<void>(`/highlights/${id}`);
    },

    // Bulk operations
    bulkOperation: async (operation: 'delete' | 'publish' | 'archive', ids: string[]): Promise<ApiResponse<void>> => {
        return apiClient.post<void>('/highlights/bulk', { operation, ids });
    },

    // Get highlight analytics
    getHighlightAnalytics: async (id: string): Promise<ApiResponse<HighlightAnalytics>> => {
        return apiClient.get<HighlightAnalytics>(`/highlights/${id}/analytics`);
    },

    // Get highlights analytics overview
    getHighlightsAnalytics: async (): Promise<ApiResponse<Record<string, unknown>>> => {
        return apiClient.get<Record<string, unknown>>('/highlights/analytics/overview');
    },
};
