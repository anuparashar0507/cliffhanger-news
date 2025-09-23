import { useState, useCallback, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import VideoByteCard from "@/components/VideoByteCard";
import InfiniteVideoScroll from "@/components/InfiniteVideoScroll";
import { useYouTubeShorts } from "@/hooks";
import { usePageSEO } from "@/hooks/useSEO";
import { YouTubeShort } from "@/services";

// Interface for the actual API response
interface YouTubeVideoData {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
  viewCount: number;
  likeCount: number;
  duration: string;
  hashtags: string[];
  youtubeUrl: string;
  channelName?: string;
}

const VideosBytesPage = () => {
  const [viewMode, setViewMode] = useState<"grid" | "shorts">("shorts");
  const [isDesktop, setIsDesktop] = useState(false);

  // Check if it's desktop on mount and window resize
  useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    checkIsDesktop();
    window.addEventListener('resize', checkIsDesktop);
    return () => window.removeEventListener('resize', checkIsDesktop);
  }, []);

  // Fetch data using React Query hooks
  const { data: videosData, isLoading: videosLoading } = useYouTubeShorts({
    limit: 20,
  });

  // Set up SEO
  usePageSEO(
    "Video Bytes - The Cliff News",
    "News in motion. Quick, engaging video updates on the stories that matter most."
  );

  const videos: YouTubeVideoData[] =
    (videosData?.shorts as YouTubeVideoData[]) || [];

  // Function to fetch more videos for infinite scroll
  const fetchMoreVideos = useCallback(async (): Promise<YouTubeVideoData[]> => {
    // This would typically make an API call to get more videos
    // For now, we'll return an empty array as the initial load gets all videos
    return [];
  }, []);

  const hasMoreVideos = false; // Set to true if you implement pagination

  // Loading state
  if (videosLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading videos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Show header only on desktop or when not in shorts mode */}
      {(viewMode === "grid" || isDesktop) && <Header />}


      {/* Videos Content */}
      {videos.length === 0 ? (
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                No videos found in this category.
              </p>
            </div>
          </div>
        </section>
      ) : viewMode === "shorts" ? (
        <InfiniteVideoScroll
          initialVideos={videos}
          fetchMoreVideos={fetchMoreVideos}
          hasMore={hasMoreVideos}
          isDesktop={isDesktop}
        />
      ) : (
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {videos.map((video) => {
                // Convert YouTubeVideoData to YouTubeShort format for VideoByteCard
                const convertedVideo: YouTubeShort = {
                  id: video.id,
                  title: video.title,
                  description: video.description,
                  videoUrl: video.youtubeUrl,
                  thumbnail: video.thumbnail,
                  duration:
                    typeof video.duration === "string"
                      ? parseInt(video.duration.match(/PT(\d+)S/)?.[1] || "0")
                      : video.duration,
                  category: { id: "1", name: "News", slug: "news" },
                  likes: video.likeCount,
                  views: video.viewCount,
                  publishedAt: video.publishedAt,
                  channelName: video.channelName || "Unknown Channel",
                  channelUrl: "",
                  tags: video.hashtags,
                  isFeatured: false,
                  createdAt: video.publishedAt,
                  updatedAt: video.publishedAt,
                };
                return <VideoByteCard key={video.id} video={convertedVideo} />;
              })}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default VideosBytesPage;
