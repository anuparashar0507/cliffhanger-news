import { config } from '../config/env';

export interface SEOData {
    title?: string;
    description?: string;
    keywords?: string[];
    image?: string;
    url?: string;
    type?: 'article' | 'website';
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    section?: string;
    tags?: string[];
}

export const generateSEOTags = (seoData: SEOData) => {
    const {
        title,
        description,
        keywords,
        image,
        url,
        type = 'website',
        publishedTime,
        modifiedTime,
        author,
        section,
        tags,
    } = seoData;

    const fullTitle = title ? `${title} | ${config.app.name}` : config.app.name;
    const fullDescription = description || config.app.description;
    const fullImage = image || config.seo.defaultOgImage;
    const fullUrl = url || config.app.url;

    return {
        // Basic meta tags
        title: fullTitle,
        description: fullDescription,
        keywords: keywords?.join(', '),

        // Open Graph tags
        'og:title': fullTitle,
        'og:description': fullDescription,
        'og:image': fullImage,
        'og:url': fullUrl,
        'og:type': type,
        'og:site_name': config.app.name,

        // Twitter Card tags
        'twitter:card': config.seo.defaultTwitterCard,
        'twitter:title': fullTitle,
        'twitter:description': fullDescription,
        'twitter:image': fullImage,

        // Article specific tags
        ...(type === 'article' && {
            'article:author': author,
            'article:section': section,
            'article:tag': tags?.join(', '),
            'article:published_time': publishedTime,
            'article:modified_time': modifiedTime,
        }),
    };
};

export const generateStructuredData = (seoData: SEOData) => {
    const {
        title,
        description,
        image,
        url,
        type = 'website',
        publishedTime,
        modifiedTime,
        author,
    } = seoData;

    const baseStructuredData = {
        '@context': 'https://schema.org',
        '@type': type === 'article' ? 'Article' : 'WebSite',
        name: title || config.app.name,
        description: description || config.app.description,
        url: url || config.app.url,
        ...(image && { image }),
    };

    if (type === 'article') {
        return {
            ...baseStructuredData,
            '@type': 'Article',
            headline: title,
            ...(author && { author: { '@type': 'Person', name: author } }),
            ...(publishedTime && { datePublished: publishedTime }),
            ...(modifiedTime && { dateModified: modifiedTime }),
            publisher: {
                '@type': 'Organization',
                name: config.app.name,
                url: config.app.url,
            },
        };
    }

    return baseStructuredData;
};

export const updateDocumentHead = (seoData: SEOData) => {
    const tags = generateSEOTags(seoData);

    // Update title
    document.title = tags.title;

    // Update or create meta tags
    Object.entries(tags).forEach(([name, content]) => {
        if (!content) return;

        let selector = `meta[name="${name}"]`;
        if (name.startsWith('og:') || name.startsWith('twitter:') || name.startsWith('article:')) {
            selector = `meta[property="${name}"]`;
        }

        let meta = document.querySelector(selector) as HTMLMetaElement;
        if (!meta) {
            meta = document.createElement('meta');
            if (name.startsWith('og:') || name.startsWith('twitter:') || name.startsWith('article:')) {
                meta.setAttribute('property', name);
            } else {
                meta.setAttribute('name', name);
            }
            document.head.appendChild(meta);
        }
        meta.setAttribute('content', content);
    });

    // Add structured data
    const structuredData = generateStructuredData(seoData);
    let script = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement;
    if (!script) {
        script = document.createElement('script');
        script.type = 'application/ld+json';
        document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(structuredData);
};
