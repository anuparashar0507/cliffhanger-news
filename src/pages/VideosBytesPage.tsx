import { useState } from "react";
import { Play, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import VideoByteCard from "@/components/VideoByteCard";
import { videoBytes, categories } from "@/data/sampleData";

const VideosBytesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredVideos = videoBytes.filter(video => {
    return selectedCategory === "All" || video.category === selectedCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Page Header */}
      <section className="py-12 bg-brand-navy text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-6">
              <Play className="h-8 w-8" />
            </div>
            <h1 className="headline-large mb-4">
              Video Bytes
            </h1>
            <p className="body-large opacity-90 mb-8">
              News in motion. Quick, engaging video updates on the stories that matter most.
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-6 border-b border-border bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-4 overflow-x-auto">
            <Button
              variant={selectedCategory === "All" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory("All")}
            >
              All Videos
            </Button>
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="whitespace-nowrap"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Videos Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {filteredVideos.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                No videos found in this category.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredVideos.map((video) => (
                <VideoByteCard key={video.id} video={video} />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default VideosBytesPage;