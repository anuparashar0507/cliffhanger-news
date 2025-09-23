import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { epapersApi, EPaper, EPaperFilters, CreateEPaperData, UpdateEPaperData } from '../services';

// Query keys
export const epaperKeys = {
    all: ['epapers'] as const,
    lists: () => [...epaperKeys.all, 'list'] as const,
    list: (filters: EPaperFilters) => [...epaperKeys.lists(), filters] as const,
    details: () => [...epaperKeys.all, 'detail'] as const,
    detail: (id: string) => [...epaperKeys.details(), id] as const,
    today: (language?: string) => [...epaperKeys.all, 'today', language] as const,
    calendar: (month?: string, year?: string) => [...epaperKeys.all, 'calendar', month, year] as const,
    byDate: (date: string, language: string) => [...epaperKeys.all, 'date', date, language] as const,
    analytics: () => [...epaperKeys.all, 'analytics'] as const,
};

// Hooks for E-Papers
export const useEPapers = (filters?: EPaperFilters) => {
    return useQuery({
        queryKey: epaperKeys.list(filters || {}),
        queryFn: () => epapersApi.getEPapers(filters),
        staleTime: 10 * 60 * 1000, // 10 minutes
    });
};

export const useEPaper = (id: string) => {
    return useQuery({
        queryKey: epaperKeys.detail(id),
        queryFn: () => epapersApi.getEPaper(id),
        enabled: !!id,
    });
};

export const useTodayEPaper = (language?: 'english' | 'hindi') => {
    return useQuery({
        queryKey: epaperKeys.today(language),
        queryFn: () => epapersApi.getTodayEPaper(language),
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};

export const useEPapersCalendar = (month?: string, year?: string) => {
    return useQuery({
        queryKey: epaperKeys.calendar(month, year),
        queryFn: () => epapersApi.getEPapersCalendar(month, year),
        staleTime: 30 * 60 * 1000, // 30 minutes
    });
};

export const useEPaperByDate = (date: string, language: 'english' | 'hindi') => {
    return useQuery({
        queryKey: epaperKeys.byDate(date, language),
        queryFn: () => epapersApi.getEPaperByDate(date, language),
        enabled: !!date && !!language,
    });
};

export const useEPaperAnalytics = () => {
    return useQuery({
        queryKey: epaperKeys.analytics(),
        queryFn: () => epapersApi.getEPaperAnalytics(),
    });
};

// Mutations for E-Papers
export const useCreateEPaper = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateEPaperData) => epapersApi.createEPaper(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: epaperKeys.lists() });
            queryClient.invalidateQueries({ queryKey: epaperKeys.today() });
            queryClient.invalidateQueries({ queryKey: epaperKeys.calendar() });
        },
    });
};

export const useUpdateEPaper = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: UpdateEPaperData) => epapersApi.updateEPaper(data),
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({ queryKey: epaperKeys.lists() });
            queryClient.invalidateQueries({ queryKey: epaperKeys.detail(variables.id) });
        },
    });
};

export const useDeleteEPaper = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => epapersApi.deleteEPaper(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: epaperKeys.lists() });
            queryClient.invalidateQueries({ queryKey: epaperKeys.today() });
            queryClient.invalidateQueries({ queryKey: epaperKeys.calendar() });
        },
    });
};
