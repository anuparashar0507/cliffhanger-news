import { Calendar, Download, ZoomIn, ZoomOut, RotateCw, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const EPaperPage = () => {
  const currentDate = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Page Header */}
      <section className="py-12 bg-accent text-accent-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="headline-large mb-4">
              Digital Newspaper
            </h1>
            <p className="body-large opacity-90 mb-6">
              Experience traditional journalism in digital format. Today's complete newspaper with all sections.
            </p>
            <p className="body-medium opacity-80">
              {currentDate}
            </p>
          </div>
        </div>
      </section>

      {/* Toolbar */}
      <section className="py-4 bg-muted/30 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                Select Date
              </Button>
              <span className="text-sm text-muted-foreground">
                Page 1 of 24
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <ZoomOut className="h-4 w-4" />
              </Button>
              <span className="text-sm px-2">100%</span>
              <Button variant="ghost" size="sm">
                <ZoomIn className="h-4 w-4" />
              </Button>
              <div className="h-4 w-px bg-border mx-2" />
              <Button variant="ghost" size="sm">
                <RotateCw className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Share2 className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* E-Paper Viewer */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Placeholder for PDF Viewer */}
            <div className="bg-white border border-border rounded-lg shadow-lg overflow-hidden">
              <div className="aspect-[8.5/11] bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="headline-small mb-2">
                    Digital Newspaper Preview
                  </h3>
                  <p className="body-medium text-muted-foreground mb-6">
                    Interactive PDF viewer would be integrated here with full page navigation, zoom controls, and download capabilities.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button>
                      View Full Paper
                    </Button>
                    <Button variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Download PDF
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Page Navigation */}
            <div className="flex items-center justify-center space-x-4 mt-6">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <div className="flex items-center space-x-2">
                {[1, 2, 3, 4, 5].map((page) => (
                  <Button
                    key={page}
                    variant={page === 1 ? "default" : "ghost"} 
                    size="sm"
                    className="w-8 h-8 p-0"
                  >
                    {page}
                  </Button>
                ))}
                <span className="text-sm text-muted-foreground">...</span>
                <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                  24
                </Button>
              </div>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="headline-medium text-center text-brand-navy mb-8">
              Digital Reading Experience
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ZoomIn className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">High Resolution</h3>
                <p className="text-muted-foreground">
                  Crystal clear text and images with zoom functionality for comfortable reading.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Download className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Offline Reading</h3>
                <p className="text-muted-foreground">
                  Download and save newspapers for offline reading anytime, anywhere.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Archive Access</h3>
                <p className="text-muted-foreground">
                  Access previous editions and build your personal newspaper archive.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default EPaperPage;