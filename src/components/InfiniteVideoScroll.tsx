import { useState, useEffect, useRef, useCallback } from "react";
import YouTubeShortsCard from "./YouTubeShortsCard";
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

interface InfiniteVideoScrollProps {
  initialVideos: YouTubeVideoData[];
  fetchMoreVideos: () => Promise<YouTubeVideoData[]>;
  hasMore: boolean;
  isDesktop?: boolean;
}

const InfiniteVideoScroll = ({
  initialVideos,
  fetchMoreVideos,
  hasMore,
  isDesktop = false,
}: InfiniteVideoScrollProps) => {
  const [videos, setVideos] = useState<YouTubeVideoData[]>(initialVideos);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [playingVideoIndex, setPlayingVideoIndex] = useState<number | null>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLDivElement | null)[]>([]);

  const loadMoreVideos = useCallback(async () => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      const newVideos = await fetchMoreVideos();
      setVideos((prev) => [...prev, ...newVideos]);
    } catch (error) {
      console.error("Failed to load more videos:", error);
    } finally {
      setIsLoading(false);
    }
  }, [fetchMoreVideos, isLoading]);

  // Load more videos when scrolling near the end
  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current && hasMore && !isLoading) {
        const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
        if (scrollTop + clientHeight >= scrollHeight - 100) {
          loadMoreVideos();
        }
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [hasMore, isLoading, loadMoreVideos]);

  // Handle video end - move to next video
  const handleVideoEnd = useCallback(() => {
    if (currentIndex < videos.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setPlayingVideoIndex(currentIndex + 1);
    }
  }, [currentIndex, videos.length]);

  // Handle scroll to change video
  const handleScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      const container = e.currentTarget;
      const scrollTop = container.scrollTop;
      const containerHeight = container.clientHeight;
      const newIndex = Math.round(scrollTop / containerHeight);

      if (
        newIndex !== currentIndex &&
        newIndex >= 0 &&
        newIndex < videos.length
      ) {
        setCurrentIndex(newIndex);
        // Set the new video as playing, which automatically pauses others
        setPlayingVideoIndex(newIndex);
      }
    },
    [currentIndex, videos.length]
  );

  // Auto-scroll to current video and start playing
  useEffect(() => {
    if (containerRef.current && videoRefs.current[currentIndex]) {
      const targetElement = videoRefs.current[currentIndex];
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
    // Start playing the current video when it changes
    setPlayingVideoIndex(currentIndex);
  }, [currentIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp" && currentIndex > 0) {
        e.preventDefault();
        setCurrentIndex((prev) => prev - 1);
      } else if (e.key === "ArrowDown" && currentIndex < videos.length - 1) {
        e.preventDefault();
        setCurrentIndex((prev) => prev + 1);
      } else if (e.key === " ") {
        e.preventDefault();
        handleVideoClick(currentIndex);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, videos.length]);

  // Touch/swipe handling for mobile
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Handle video click to play/pause
  const handleVideoClick = (videoIndex: number) => {
    if (videoIndex === currentIndex) {
      if (playingVideoIndex === videoIndex) {
        setPlayingVideoIndex(null); // Pause current video
      } else {
        setPlayingVideoIndex(videoIndex); // Play current video
      }
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientY);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isUpSwipe = distance > 50;
    const isDownSwipe = distance < -50;

    if (isUpSwipe && currentIndex < videos.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else if (isDownSwipe && currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  if (videos.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center bg-black">
        <div className="text-center text-white">
          <h2 className="text-2xl font-bold mb-4">No Videos Available</h2>
          <p className="text-gray-400">Check back later for new content!</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-black relative ${isDesktop ? 'h-[calc(100vh-140px)]' : 'h-screen'}`}>
      {/* Desktop Navigation */}
      <div className="hidden md:flex absolute top-4 left-4 z-50 space-x-4">
        <button
          onClick={() => window.history.back()}
          className="bg-black/50 text-white p-3 rounded-full backdrop-blur-sm hover:bg-black/70 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={() => window.location.href = '/'}
          className="bg-black/50 text-white p-3 rounded-full backdrop-blur-sm hover:bg-black/70 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </button>
      </div>

      {/* Video Container */}
      <div
        ref={containerRef}
        className={`overflow-y-auto scrollbar-hide bg-black ${
          isDesktop
            ? 'h-full'
            : 'h-screen'
        }`}
        onScroll={handleScroll}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {videos.map((video, index) => (
          <div
            key={video.id}
            ref={(el) => (videoRefs.current[index] = el)}
            className={`flex-shrink-0 ${
              isDesktop
                ? 'h-full flex items-center justify-center'
                : 'h-screen'
            }`}
          >
            {isDesktop ? (
              // Desktop Layout: Video + Side Actions
              <div className="flex items-center justify-center w-full max-w-6xl mx-auto px-8 h-full">
                {/* Video Player */}
                <div className="w-auto h-[90vh] aspect-[9/16] max-w-md rounded-lg overflow-hidden shadow-2xl">
                  <YouTubeShortsCard
                    video={video}
                    isActive={index === currentIndex}
                    isPlaying={playingVideoIndex === index}
                    onVideoEnd={handleVideoEnd}
                    onPlayPause={() => handleVideoClick(index)}
                    showActions={false}
                  />
                </div>

                {/* Side Actions */}
                <div className="ml-8 flex flex-col items-center space-y-6">
                  {/* Like Button */}
                  <div className="flex flex-col items-center">
                    <button className="w-12 h-12 flex items-center justify-center hover:scale-105 transition-transform duration-200">
                      <svg className="h-7 w-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                    <span className="text-white text-xs font-medium mt-1">
                      {video.likeCount || 0}
                    </span>
                  </div>

                  {/* Comment Button */}
                  <div className="flex flex-col items-center">
                    <button className="w-12 h-12 flex items-center justify-center hover:scale-105 transition-transform duration-200">
                      <svg className="h-7 w-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </button>
                    <span className="text-white text-xs font-medium mt-1">0</span>
                  </div>

                  {/* Share Button */}
                  <div className="flex flex-col items-center">
                    <button className="w-12 h-12 flex items-center justify-center hover:scale-105 transition-transform duration-200">
                      <svg className="h-7 w-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                      </svg>
                    </button>
                  </div>

                  {/* Save Button */}
                  <button className="w-12 h-12 flex items-center justify-center hover:scale-105 transition-transform duration-200">
                    <svg className="h-7 w-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                  </button>
                </div>
              </div>
            ) : (
              // Mobile Layout: Full Screen
              <div className="w-full h-full">
                <YouTubeShortsCard
                  video={video}
                  isActive={index === currentIndex}
                  isPlaying={playingVideoIndex === index}
                  onVideoEnd={handleVideoEnd}
                  onPlayPause={() => handleVideoClick(index)}
                  showActions={true}
                />
              </div>
            )}
          </div>
        ))}

        {/* Load More Indicator */}
        {hasMore && (
          <div className="h-20 flex items-center justify-center">
            {isLoading ? (
              <div className="text-white">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
                <p>Loading more videos...</p>
              </div>
            ) : (
              <div className="text-white/60">
                <p>Scroll for more videos</p>
              </div>
            )}
          </div>
        )}

        {/* End of content */}
        {!hasMore && videos.length > 0 && (
          <div className="h-20 flex items-center justify-center text-white/60">
            <p>You've reached the end!</p>
          </div>
        )}
      </div>

      {/* Video Navigation Dots (Instagram style) */}
      <div className="absolute right-2 md:right-8 top-1/2 transform -translate-y-1/2 flex flex-col space-y-1 z-40">
        {videos.slice(0, 5).map((_, index) => (
          <button
            key={index}
            className={`w-1 transition-all duration-200 rounded-full ${
              index === currentIndex
                ? "bg-white h-6"
                : "bg-white/40 hover:bg-white/60 h-1"
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
        {videos.length > 5 && (
          <div className="text-white/60 text-[10px] text-center py-1">
            +{videos.length - 5}
          </div>
        )}
      </div>
    </div>
  );
};

export default InfiniteVideoScroll;
