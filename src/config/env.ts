// Environment configuration
export const config = {
    api: {
        baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
    },
    app: {
        name: import.meta.env.VITE_APP_NAME || 'The Cliff News',
        description: import.meta.env.VITE_APP_DESCRIPTION || 'Your trusted source for breaking news and in-depth analysis',
        url: import.meta.env.VITE_APP_URL || 'https://thecliffnews.com',
    },
    seo: {
        defaultOgImage: import.meta.env.VITE_DEFAULT_OG_IMAGE || '/og-image.jpg',
        defaultTwitterCard: import.meta.env.VITE_DEFAULT_TWITTER_CARD || 'summary_large_image',
    },
};
