# Frontend-Backend Integration

This document outlines the integration between the frontend React application and the backend API.

## API Services

The frontend now uses a modular API service architecture with the following structure:

### Services

- `apiClient.ts` - Base API client with error handling
- `articles.ts` - Article management API
- `highlights.ts` - Highlights/visual content API
- `inshorts.ts` - Quick reads/inshorts API
- `categories.ts` - Category management API
- `epapers.ts` - E-paper management API
- `nit.ts` - NIT (News in Time) API
- `youtube.ts` - YouTube shorts API

### React Query Hooks

- `useArticles.ts` - Article data fetching and mutations
- `useHighlights.ts` - Highlights data fetching and mutations
- `useInshorts.ts` - Inshorts data fetching and mutations
- `useCategories.ts` - Categories data fetching and mutations
- `useEPapers.ts` - E-papers data fetching and mutations
- `useNIT.ts` - NIT data fetching and mutations
- `useYouTube.ts` - YouTube shorts data fetching and mutations
- `useSEO.ts` - SEO management hooks

## Environment Configuration

Create a `.env` file in the root directory with:

```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_APP_NAME=The Cliff News
VITE_APP_DESCRIPTION=Your trusted source for breaking news and in-depth analysis
VITE_APP_URL=https://thecliffnews.com
VITE_DEFAULT_OG_IMAGE=https://thecliffnews.com/og-image.jpg
VITE_DEFAULT_TWITTER_CARD=summary_large_image
```

## Key Features

### 1. React Query Integration

- Automatic caching and background updates
- Loading states and error handling
- Optimistic updates for mutations
- Query invalidation for data consistency

### 2. SEO Optimization

- Dynamic meta tags based on content
- Structured data for articles
- Open Graph and Twitter Card support
- Automatic SEO updates on route changes

### 3. Type Safety

- Full TypeScript integration
- API response type definitions
- Component prop type safety
- Error handling with typed errors

### 4. Modular Architecture

- Separate service files for each domain
- Reusable React Query hooks
- Centralized API client configuration
- Easy to extend and maintain

## Usage Examples

### Fetching Articles

```typescript
import { useArticles } from "@/hooks";

const MyComponent = () => {
  const { data, isLoading, error } = useArticles({
    category: "Technology",
    limit: 10,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {data?.data?.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
};
```

### SEO Management

```typescript
import { useArticleSEO } from "@/hooks/useSEO";

const ArticlePage = ({ article }) => {
  useArticleSEO(article);

  return <div>{article.title}</div>;
};
```

### Mutations

```typescript
import { useCreateArticle } from "@/hooks";

const CreateArticleForm = () => {
  const createArticle = useCreateArticle();

  const handleSubmit = async (data) => {
    try {
      await createArticle.mutateAsync(data);
      // Success handling
    } catch (error) {
      // Error handling
    }
  };

  return <form onSubmit={handleSubmit}>...</form>;
};
```

## Backend API Endpoints

The frontend expects the following API structure:

- `GET /api/articles` - List articles with filters
- `GET /api/articles/:id` - Get single article
- `GET /api/articles/slug/:slug` - Get article by slug
- `GET /api/articles/quick-reads` - Get quick reads
- `GET /api/articles/breaking` - Get breaking news
- `GET /api/articles/top-stories` - Get top stories
- `POST /api/articles` - Create article
- `PUT /api/articles/:id` - Update article
- `DELETE /api/articles/:id` - Delete article

Similar patterns for highlights, inshorts, categories, epapers, nit, and youtube endpoints.

## Error Handling

The API client includes comprehensive error handling:

- Network errors
- HTTP status errors
- API response errors
- Automatic retry logic
- User-friendly error messages

## Performance Optimizations

- Query caching with configurable stale times
- Background refetching
- Pagination support
- Lazy loading
- Image optimization
- SEO preloading

## Development

1. Start the backend server on port 3000
2. Set up the environment variables
3. Run `npm run dev` to start the frontend
4. The frontend will automatically connect to the backend API

## Production Deployment

1. Update environment variables for production
2. Build the frontend: `npm run build`
3. Deploy to your hosting platform
4. Ensure backend API is accessible from the frontend domain
