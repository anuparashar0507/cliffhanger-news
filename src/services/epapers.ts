import { apiClient, ApiResponse, PaginationParams } from './apiClient';

// Types for E-Papers
export interface EPaper {
    id: string;
    title: string;
    language: 'english' | 'hindi';
    date: string;
    pdfUrl: string;
    thumbnailUrl?: string;
    pageCount: number;
    isPublished: boolean;
    viewCount: number;
    downloadCount: number;
    createdAt: string;
    updatedAt: string;
}

export interface EPaperFilters extends PaginationParams {
    language?: 'english' | 'hindi';
    dateFrom?: string;
    dateTo?: string;
    isPublished?: boolean;
    [key: string]: unknown;
}

export interface CreateEPaperData {
    title: string;
    language: 'english' | 'hindi';
    date: string;
    pdfFile: File;
}

export interface UpdateEPaperData extends Partial<Omit<CreateEPaperData, 'pdfFile'>> {
    id: string;
}

export interface EPaperAnalytics {
    totalViews: number;
    totalDownloads: number;
    dailyViews: Array<{
        date: string;
        views: number;
    }>;
    languageBreakdown: Array<{
        language: string;
        count: number;
    }>;
    topPages: Array<{
        pageNumber: number;
        views: number;
    }>;
}

export interface EPaperCalendar {
    date: string;
    hasEnglish: boolean;
    hasHindi: boolean;
    totalViews: number;
}

// E-Paper API functions
export const epapersApi = {
    // Get all e-papers with filters
    getEPapers: async (filters?: EPaperFilters): Promise<ApiResponse<EPaper[]>> => {
        return apiClient.get<EPaper[]>('/epapers', filters);
    },

    // Get e-paper by ID
    getEPaper: async (id: string): Promise<ApiResponse<EPaper>> => {
        return apiClient.get<EPaper>(`/epapers/${id}`);
    },

    // Get today's e-paper
    getTodayEPaper: async (language?: 'english' | 'hindi'): Promise<ApiResponse<EPaper>> => {
        const languageParam = language ? language.toUpperCase() : 'ENGLISH';
        return apiClient.get<EPaper>('/epapers/today', { language: languageParam });
    },

    // Get e-paper calendar
    getEPapersCalendar: async (month?: string, year?: string): Promise<ApiResponse<EPaperCalendar[]>> => {
        return apiClient.get<EPaperCalendar[]>('/epapers/calendar', { month, year });
    },

    // Get e-paper by date and language
    getEPaperByDate: async (date: string, language: 'english' | 'hindi'): Promise<ApiResponse<EPaper>> => {
        return apiClient.get<EPaper>(`/epapers/date/${date}/${language}`);
    },

    // Get e-paper analytics
    getEPaperAnalytics: async (): Promise<ApiResponse<EPaperAnalytics>> => {
        return apiClient.get<EPaperAnalytics>('/epapers/analytics');
    },

    // Create new e-paper
    createEPaper: async (data: CreateEPaperData): Promise<ApiResponse<EPaper>> => {
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('language', data.language);
        formData.append('date', data.date);
        formData.append('pdfFile', data.pdfFile);

        return apiClient.post<EPaper>('/epapers', formData);
    },

    // Update e-paper
    updateEPaper: async (data: UpdateEPaperData): Promise<ApiResponse<EPaper>> => {
        return apiClient.put<EPaper>(`/epapers/${data.id}`, data);
    },

    // Delete e-paper
    deleteEPaper: async (id: string): Promise<ApiResponse<void>> => {
        return apiClient.delete<void>(`/epapers/${id}`);
    },

    // Download e-paper
    downloadEPaper: async (id: string): Promise<Blob> => {
        const response = await fetch(`${apiClient['baseURL']}/epapers/${id}/download`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
            },
        });
        return response.blob();
    },
};
