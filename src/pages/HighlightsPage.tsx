import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Download,
  Share2,
  X,
  Facebook,
  Twitter,
  Linkedin,
  Mail,
  Copy,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface Highlight {
  id: string;
  title: string;
  imageUrl: string;
  aspectRatio?: string;
}

const HighlightsPage: React.FC = () => {
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedHighlight, setSelectedHighlight] = useState<Highlight | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch highlights
  const loadHighlights = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/highlights?limit=100&isPublic=true");
      const data = await response.json();

      if (data.success) {
        setHighlights(data.highlights);
      }
    } catch (error) {
      console.error("Failed to load highlights:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHighlights();
  }, []);

  // Open image modal
  const openImageModal = (highlight: Highlight) => {
    setSelectedHighlight(highlight);
    setIsModalOpen(true);
  };

  // Close image modal
  const closeImageModal = () => {
    setIsModalOpen(false);
    setSelectedHighlight(null);
  };

  // Download image
  const downloadImage = async (highlight: Highlight) => {
    try {
      const response = await fetch(`/api/highlights/${highlight.id}/download`);
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${highlight.title || "highlight"}.jpg`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }
    } catch (error) {
      console.error("Failed to download image:", error);
    }
  };

  // Share to social media
  const shareToSocial = (platform: string, highlight: Highlight) => {
    const url = window.location.origin + `/highlights#${highlight.id}`;
    const title =
      highlight.title || "Check out this highlight from The Cliff News";
    const text = `Check out this highlight from The Cliff News`;

    let shareUrl = "";

    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          url
        )}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
          url
        )}&text=${encodeURIComponent(text)}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
          url
        )}`;
        break;
      case "email":
        shareUrl = `mailto:?subject=${encodeURIComponent(
          title
        )}&body=${encodeURIComponent(text + " " + url)}`;
        break;
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank", "width=600,height=400");
    }
  };

  // Copy link to clipboard
  const copyLink = async (highlight: Highlight) => {
    const url = window.location.origin + `/highlights#${highlight.id}`;
    try {
      await navigator.clipboard.writeText(url);
      // You could add a toast notification here
    } catch (error) {
      console.error("Failed to copy link:", error);
    }
  };

  // Calculate image dimensions for masonry layout
  const getImageDimensions = (highlight: Highlight) => {
    if (highlight.aspectRatio) {
      const [width, height] = highlight.aspectRatio.split(":").map(Number);
      const aspectRatio = height / width;
      const baseWidth = 300; // Base width for masonry
      return {
        width: baseWidth,
        height: baseWidth * aspectRatio,
      };
    }
    // Default dimensions if no aspect ratio
    return { width: 300, height: 200 };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-12">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading highlights...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Page Header */}
      <section className="py-12 bg-accent text-accent-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="headline-large mb-4">Highlights Gallery</h1>
            <p className="body-large opacity-90">
              Discover the most important moments captured in stunning visuals
            </p>
          </div>
        </div>
      </section>

      {/* Masonry Layout */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {highlights.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📸</div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No highlights found
              </h3>
              <p className="text-muted-foreground">
                Check back later for new highlights
              </p>
            </div>
          ) : (
            <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4 space-y-4">
              {highlights.map((highlight) => {
                const dimensions = getImageDimensions(highlight);
                return (
                  <div
                    key={highlight.id}
                    className="break-inside-avoid cursor-pointer group"
                    onClick={() => openImageModal(highlight)}
                  >
                    <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                      <img
                        src={highlight.imageUrl}
                        alt={highlight.title || "Highlight"}
                        className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                        style={{
                          width: `${dimensions.width}px`,
                          height: `${dimensions.height}px`,
                        }}
                      />

                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="secondary"
                            className="bg-white/90 hover:bg-white"
                            onClick={(e) => {
                              e.stopPropagation();
                              downloadImage(highlight);
                            }}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="secondary"
                            className="bg-white/90 hover:bg-white"
                            onClick={(e) => {
                              e.stopPropagation();
                              // Open share menu or copy link
                              copyLink(highlight);
                            }}
                          >
                            <Share2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Image Modal */}
      {isModalOpen && selectedHighlight && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-7xl max-h-full">
            {/* Close button */}
            <Button
              variant="secondary"
              size="sm"
              className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white"
              onClick={closeImageModal}
            >
              <X className="h-4 w-4" />
            </Button>

            {/* Image */}
            <img
              src={selectedHighlight.imageUrl}
              alt={selectedHighlight.title || "Highlight"}
              className="max-w-full max-h-full object-contain rounded-lg"
            />

            {/* Action buttons */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2 bg-black/70 rounded-full px-4 py-2">
              <Button
                size="sm"
                variant="secondary"
                className="bg-white/90 hover:bg-white"
                onClick={() => downloadImage(selectedHighlight)}
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>

              <Button
                size="sm"
                variant="secondary"
                className="bg-white/90 hover:bg-white"
                onClick={() => shareToSocial("facebook", selectedHighlight)}
              >
                <Facebook className="h-4 w-4" />
              </Button>

              <Button
                size="sm"
                variant="secondary"
                className="bg-white/90 hover:bg-white"
                onClick={() => shareToSocial("twitter", selectedHighlight)}
              >
                <Twitter className="h-4 w-4" />
              </Button>

              <Button
                size="sm"
                variant="secondary"
                className="bg-white/90 hover:bg-white"
                onClick={() => shareToSocial("linkedin", selectedHighlight)}
              >
                <Linkedin className="h-4 w-4" />
              </Button>

              <Button
                size="sm"
                variant="secondary"
                className="bg-white/90 hover:bg-white"
                onClick={() => shareToSocial("email", selectedHighlight)}
              >
                <Mail className="h-4 w-4" />
              </Button>

              <Button
                size="sm"
                variant="secondary"
                className="bg-white/90 hover:bg-white"
                onClick={() => copyLink(selectedHighlight)}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default HighlightsPage;
