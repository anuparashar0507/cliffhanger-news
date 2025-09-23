import { Calendar, Download, Eye } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { epapersApi, EPaper } from "@/services";

const StreamlinedEPaperSection = () => {
  const [englishPaper, setEnglishPaper] = useState<EPaper | null>(null);
  const [hindiPaper, setHindiPaper] = useState<EPaper | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEPapers = async () => {
      try {
        setLoading(true);

        // Fetch English e-paper
        try {
          const englishData = await epapersApi.getTodayEPaper("english");
          if (englishData.success) {
            setEnglishPaper(englishData.data);
          }
        } catch (error) {
          console.log("No English e-paper found for today");
        }

        // Fetch Hindi e-paper
        try {
          const hindiData = await epapersApi.getTodayEPaper("hindi");
          if (hindiData.success) {
            setHindiPaper(hindiData.data);
          }
        } catch (error) {
          console.log("No Hindi e-paper found for today");
        }
      } catch (error) {
        console.error("Failed to fetch e-papers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEPapers();
  }, []);

  const handleEPaperClick = (paper: EPaper) => {
    // Open PDF in new tab
    window.open(paper.pdfUrl, "_blank");
  };

  const handleDownload = (paper: EPaper) => {
    // Trigger download
    const link = document.createElement("a");
    link.href = paper.pdfUrl;
    link.download = `${paper.title}.pdf`;
    link.click();
  };

  if (loading) {
    return (
      <section className="py-8 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading today's e-papers...</p>
          </div>
        </div>
      </section>
    );
  }

  if (!englishPaper && !hindiPaper) {
    return (
      <section className="py-8 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="headline-medium text-foreground mb-2">
              Today's Digital E-Paper
            </h2>
            <p className="text-muted-foreground">
              No e-papers available for today.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="headline-medium text-foreground mb-2">
            Today's Digital E-Paper
          </h2>
          <div className="w-12 h-1 bg-primary rounded-full mx-auto mb-4"></div>
          <p className="body-medium text-muted-foreground flex items-center justify-center">
            <Calendar className="h-4 w-4 mr-2" />
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>

        {/* E-Paper Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* English Edition */}
          {englishPaper && (
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="text-center">
                <h3 className="font-semibold text-xl text-foreground mb-2">
                  English Edition
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {englishPaper.title}
                </p>

                {/* Stats */}
                <div className="flex justify-center space-x-4 mb-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Eye className="h-4 w-4 mr-1" />
                    {englishPaper.viewCount} views
                  </div>
                  <div className="flex items-center">
                    <Download className="h-4 w-4 mr-1" />
                    {englishPaper.downloadCount} downloads
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-center space-x-3">
                  <Button
                    onClick={() => handleEPaperClick(englishPaper)}
                    className="flex items-center"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleDownload(englishPaper)}
                    className="flex items-center"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Hindi Edition */}
          {hindiPaper && (
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="text-center">
                <h3 className="font-semibold text-xl text-foreground mb-2">
                  हिंदी संस्करण
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {hindiPaper.title}
                </p>

                {/* Stats */}
                <div className="flex justify-center space-x-4 mb-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Eye className="h-4 w-4 mr-1" />
                    {hindiPaper.viewCount} views
                  </div>
                  <div className="flex items-center">
                    <Download className="h-4 w-4 mr-1" />
                    {hindiPaper.downloadCount} downloads
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-center space-x-3">
                  <Button
                    onClick={() => handleEPaperClick(hindiPaper)}
                    className="flex items-center"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleDownload(hindiPaper)}
                    className="flex items-center"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default StreamlinedEPaperSection;
