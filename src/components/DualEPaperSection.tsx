import { Calendar, Download, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EPaper {
  language: string;
  date: string;
  pages: number;
  thumbnail: string;
  description: string;
  downloadUrl: string;
}

interface TodayHighlight {
  id: string;
  title: string;
  category: string;
}

const DualEPaperSection = () => {
  const englishPaper: EPaper = {
    language: "English",
    date: new Date().toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }),
    pages: 24,
    thumbnail: "/api/placeholder/200/280",
    description: "Today's top stories covering national and international news, business updates, and sports highlights.",
    downloadUrl: "#"
  };

  const hindiPaper: EPaper = {
    language: "हिंदी",
    date: new Date().toLocaleDateString('hi-IN', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }),
    pages: 20,
    thumbnail: "/api/placeholder/200/280",
    description: "आज की मुख्य खबरें राष्ट्रीय और अंतर्राष्ट्रीय समाचार, व्यापार अपडेट और खेल हाइलाइट्स के साथ।",
    downloadUrl: "#"
  };

  const todayHighlights: TodayHighlight[] = [
    { id: "1", title: "Climate Tech Breakthrough Announced", category: "Technology" },
    { id: "2", title: "Markets Surge Following Policy Changes", category: "Business" },
    { id: "3", title: "Championship Finals Draw Record Viewers", category: "Sports" },
    { id: "4", title: "Medical Research Shows Promising Results", category: "Health" },
    { id: "5", title: "International Summit Begins Today", category: "World" }
  ];

  return (
    <section className="bg-gradient-to-br from-accent/5 to-accent/10 dark:from-accent/10 dark:to-accent/5 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="headline-medium text-foreground mb-4">
            Today's Digital Newspapers
          </h2>
          <p className="body-large text-muted-foreground max-w-2xl mx-auto">
            Experience The Cliff News in both English and Hindi. Complete digital editions with all sections and supplements.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left side - Today's Headlines */}
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <h3 className="headline-small text-foreground">Today's Headlines</h3>
            </div>
            
            <div className="space-y-4">
              {todayHighlights.map((item, index) => (
                <div key={item.id} className="flex items-start space-x-3 group cursor-pointer">
                  <span className="flex-shrink-0 w-6 h-6 bg-primary/10 text-primary rounded-full text-xs font-bold flex items-center justify-center mt-0.5">
                    {index + 1}
                  </span>
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors leading-tight mb-1">
                      {item.title}
                    </h4>
                    <p className="text-xs text-muted-foreground font-medium">
                      {item.category}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Button variant="outline" className="w-full mt-6">
              <Eye className="h-4 w-4 mr-2" />
              View All Headlines
            </Button>
          </div>
          
          {/* Right side - Dual E-Papers */}
          <div className="lg:col-span-2 space-y-6">
            {/* English Paper */}
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="headline-small text-foreground mb-2">English Edition</h3>
                  <p className="text-sm text-muted-foreground flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>{englishPaper.date} • {englishPaper.pages} pages</span>
                  </p>
                </div>
                <span className="bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-300 px-3 py-1 rounded-full text-sm font-bold border border-blue-200 dark:border-blue-700">
                  ENGLISH
                </span>
              </div>
              
              <div className="flex items-center space-x-6">
                <div className="flex-shrink-0">
                  <img 
                    src={englishPaper.thumbnail} 
                    alt="English E-Paper Preview"
                    className="w-24 h-32 object-cover rounded-lg border border-border shadow-sm hover:shadow-md transition-shadow"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {englishPaper.description}
                  </p>
                  <div className="flex space-x-3">
                    <Button className="bg-primary hover:bg-primary-hover text-primary-foreground">
                      <Eye className="h-4 w-4 mr-2" />
                      Read Now
                    </Button>
                    <Button variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Hindi Paper */}
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="headline-small text-foreground mb-2">Hindi Edition</h3>
                  <p className="text-sm text-muted-foreground flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>{hindiPaper.date} • {hindiPaper.pages} पृष्ठ</span>
                  </p>
                </div>
                <span className="bg-orange-50 text-orange-700 dark:bg-orange-900 dark:text-orange-300 px-3 py-1 rounded-full text-sm font-bold border border-orange-200 dark:border-orange-700">
                  हिंदी
                </span>
              </div>
              
              <div className="flex items-center space-x-6">
                <div className="flex-shrink-0">
                  <img 
                    src={hindiPaper.thumbnail} 
                    alt="Hindi E-Paper Preview"
                    className="w-24 h-32 object-cover rounded-lg border border-border shadow-sm hover:shadow-md transition-shadow"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {hindiPaper.description}
                  </p>
                  <div className="flex space-x-3">
                    <Button className="bg-primary hover:bg-primary-hover text-primary-foreground">
                      <Eye className="h-4 w-4 mr-2" />
                      अभी पढ़ें
                    </Button>
                    <Button variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      डाउनलोड
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Archive Access */}
        <div className="text-center mt-12">
          <div className="bg-card border border-border rounded-xl p-8 max-w-2xl mx-auto shadow-sm">
            <h3 className="headline-small text-foreground mb-4">
              E-Paper Archive
            </h3>
            <p className="text-muted-foreground mb-6">
              Access previous editions and build your personal newspaper archive. Available in both English and Hindi.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" size="lg">
                <Calendar className="h-5 w-5 mr-2" />
                Browse Archive
              </Button>
              <Button variant="outline" size="lg">
                📧 Subscribe to Daily Edition
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DualEPaperSection;