import { Calendar, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import PDFThumbnailGenerator from "./PDFThumbnailGenerator";

interface EPaper {
  language: string;
  date: string;
  title: string;
  pdfUrl: string;
}

const CompactEPaperSection = () => {
  const today = new Date();

  const englishPaper: EPaper = {
    language: "English",
    date: today.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    }),
    title: "The Cliff News",
    pdfUrl: "CondoLiving.pdf" // PDF filename
  };

  const hindiPaper: EPaper = {
    language: "हिंदी",
    date: today.toLocaleDateString('hi-IN', {
      month: 'short',
      day: 'numeric'
    }),
    title: "द क्लिफ न्यूज़",
    pdfUrl: "TheThreeMusketeers.pdf" // PDF filename
  };

  const handleEPaperClick = (paper: EPaper) => {
    const lang = paper.language === "English" ? "english" : "hindi";
    window.location.href = `/flipbook?pdf=${paper.pdfUrl}&lang=${lang}`;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-foreground mb-1">
            Read E-paper
          </h3>
          <p className="text-sm text-muted-foreground flex items-center">
            <Calendar className="h-3 w-3 mr-1" />
            {today.toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>
      </div>

      {/* E-Paper Thumbnails */}
      <div className="space-y-4">
        {/* English Edition */}
        <div
          className="group cursor-pointer"
          onClick={() => handleEPaperClick(englishPaper)}
        >
          <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
            <div className="flex-shrink-0">
              <PDFThumbnailGenerator
                pdfUrl={`/sample-pdfs/${englishPaper.pdfUrl}`}
                width={64}
                height={80}
                className="group-hover:shadow-md transition-shadow"
                alt="English E-Paper Thumbnail"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                {englishPaper.title}
              </h4>
              <p className="text-xs text-muted-foreground mb-2">
                {englishPaper.language} Edition
              </p>
              <div className="flex items-center space-x-2">
                <Button size="sm" variant="outline" className="h-7 text-xs">
                  <Eye className="h-3 w-3 mr-1" />
                  Read Now
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Hindi Edition */}
        <div
          className="group cursor-pointer"
          onClick={() => handleEPaperClick(hindiPaper)}
        >
          <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
            <div className="flex-shrink-0">
              <PDFThumbnailGenerator
                pdfUrl={`/sample-pdfs/${hindiPaper.pdfUrl}`}
                width={64}
                height={80}
                className="group-hover:shadow-md transition-shadow"
                alt="Hindi E-Paper Thumbnail"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                {hindiPaper.title}
              </h4>
              <p className="text-xs text-muted-foreground mb-2">
                {hindiPaper.language} Edition
              </p>
              <div className="flex items-center space-x-2">
                <Button size="sm" variant="outline" className="h-7 text-xs">
                  <Eye className="h-3 w-3 mr-1" />
                  अभी पढ़ें
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Archive Link */}
      <div className="mt-4 pt-4 border-t border-border">
        <Button
          variant="ghost"
          size="sm"
          className="w-full text-xs"
          onClick={() => window.location.href = '/epaper'}
        >
          <Calendar className="h-3 w-3 mr-2" />
          Browse Archive
        </Button>
      </div>

    </div>
  );
};

export default CompactEPaperSection;