// Export all API services
export { apiClient } from './apiClient';
export type { ApiResponse, PaginationParams, ApiError } from './apiClient';
export { articlesApi } from './articles';
export { highlightsApi } from './highlights';
export { inshortsApi } from './inshorts';
export { categoriesApi } from './categories';
export { epapersApi } from './epapers';
export { nitApi } from './nit';
export { youtubeApi } from './youtube';

// Export types
export type { Article, ArticleFilters, CreateArticleData, UpdateArticleData } from './articles';
export type { Highlight, HighlightFilters, CreateHighlightData, UpdateHighlightData, HighlightAnalytics } from './highlights';
export type { Inshort, InshortFilters, CreateInshortData, UpdateInshortData, GenerateInshortData } from './inshorts';
export type { Category, CategoryFilters, CreateCategoryData, UpdateCategoryData, CategoryStats } from './categories';
export type { EPaper, EPaperFilters, CreateEPaperData, UpdateEPaperData, EPaperAnalytics, EPaperCalendar } from './epapers';
export type { NIT, NITFilters, CreateNITData, UpdateNITData } from './nit';
export type { YouTubeShort, YouTubeFilters, CreateYouTubeShortData, UpdateYouTubeShortData } from './youtube';
