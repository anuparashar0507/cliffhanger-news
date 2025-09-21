import { Calendar } from "lucide-react";
import PDFThumbnailGenerator from "./PDFThumbnailGenerator";

interface EPaper {
  language: string;
  pdfUrl: string;
}

const StreamlinedEPaperSection = () => {
  const today = new Date();

  const englishPaper: EPaper = {
    language: "English",
    pdfUrl: "CondoLiving.pdf"
  };

  const hindiPaper: EPaper = {
    language: "हिंदी",
    pdfUrl: "TheThreeMusketeers.pdf"
  };

  const handleEPaperClick = (paper: EPaper) => {
    const lang = paper.language === "English" ? "english" : "hindi";
    window.location.href = `/flipbook?pdf=${paper.pdfUrl}&lang=${lang}`;
  };


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
            {today.toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'long',
              day: 'numeric',
              year: 'numeric'
            })}
          </p>
        </div>

        {/* E-Paper Thumbnails */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-3xl mx-auto">
          {/* English Edition */}
          <div
            className="group cursor-pointer text-center"
            onClick={() => handleEPaperClick(englishPaper)}
          >
            {/* Edition Text */}
            <h3 className="font-semibold text-lg text-foreground mb-4 group-hover:text-primary transition-colors">
              English Edition
            </h3>

            {/* Thumbnail */}
            <div className="flex justify-center">
              <div className="group-hover:scale-105 transition-transform duration-300">
                <PDFThumbnailGenerator
                  pdfUrl={`/sample-pdfs/${englishPaper.pdfUrl}`}
                  width={180}
                  height={240}
                  className="rounded-lg shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                  alt="English E-Paper Thumbnail"
                />
              </div>
            </div>
          </div>

          {/* Hindi Edition */}
          <div
            className="group cursor-pointer text-center"
            onClick={() => handleEPaperClick(hindiPaper)}
          >
            {/* Edition Text */}
            <h3 className="font-semibold text-lg text-foreground mb-4 group-hover:text-primary transition-colors">
              हिंदी संस्करण
            </h3>

            {/* Thumbnail */}
            <div className="flex justify-center">
              <div className="group-hover:scale-105 transition-transform duration-300">
                <PDFThumbnailGenerator
                  pdfUrl={`/sample-pdfs/${hindiPaper.pdfUrl}`}
                  width={180}
                  height={240}
                  className="rounded-lg shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                  alt="Hindi E-Paper Thumbnail"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StreamlinedEPaperSection;