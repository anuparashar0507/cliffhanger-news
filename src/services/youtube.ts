import { apiClient, ApiResponse, PaginationParams } from './apiClient';

// Types for YouTube Shorts
export interface YouTubeShort {
    id: string;
    title: string;
    description: string;
    videoUrl: string;
    thumbnail: string;
    duration: number;
    category: {
        id: string;
        name: string;
        slug: string;
    };
    likes: number;
    views: number;
    publishedAt: string;
    channelName: string;
    channelUrl: string;
    tags: string[];
    isFeatured: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface YouTubeFilters extends PaginationParams {
    category?: string;
    isFeatured?: boolean;
    search?: string;
    dateFrom?: string;
    dateTo?: string;
    [key: string]: unknown;
}

export interface CreateYouTubeShortData {
    title: string;
    description: string;
    videoUrl: string;
    thumbnail: string;
    duration: number;
    categoryId: string;
    channelName: string;
    channelUrl: string;
    tags: string[];
    isFeatured?: boolean;
}

export interface UpdateYouTubeShortData extends Partial<CreateYouTubeShortData> {
    id: string;
}

// YouTube API functions
export const youtubeApi = {
    // Get all YouTube shorts with filters
    getShorts: async (filters?: YouTubeFilters): Promise<ApiResponse<YouTubeShort[]>> => {
        return apiClient.get<YouTubeShort[]>('/youtube/shorts', filters);
    },

    // Get YouTube short by ID
    getShort: async (id: string): Promise<ApiResponse<YouTubeShort>> => {
        return apiClient.get<YouTubeShort>(`/youtube/shorts/${id}`);
    },

    // Create new YouTube short
    createShort: async (data: CreateYouTubeShortData): Promise<ApiResponse<YouTubeShort>> => {
        return apiClient.post<YouTubeShort>('/youtube/shorts', data);
    },

    // Update YouTube short
    updateShort: async (data: UpdateYouTubeShortData): Promise<ApiResponse<YouTubeShort>> => {
        return apiClient.put<YouTubeShort>(`/youtube/shorts/${data.id}`, data);
    },

    // Delete YouTube short
    deleteShort: async (id: string): Promise<ApiResponse<void>> => {
        return apiClient.delete<void>(`/youtube/shorts/${id}`);
    },
};
