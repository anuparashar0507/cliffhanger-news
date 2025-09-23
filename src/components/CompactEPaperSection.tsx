import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Calendar, Download, Eye, FileText, ChevronLeft, ChevronRight } from 'lucide-react';

interface EPaperItem {
  id: string;
  date: string;
  language: 'english' | 'hindi';
  pages: number;
  thumbnail: string;
  size: string;
  downloadUrl: string;
}

const CompactEPaperSection: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Generate sample e-papers for the last week
  const generateEPapers = (): EPaperItem[] => {
    const papers: EPaperItem[] = [];
    const today = new Date();
    
    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      const dateStr = date.toISOString().split('T')[0];
      const formattedDate = date.toLocaleDateString('en-US', { 
        month: 'long', 
        day: 'numeric', 
        year: 'numeric' 
      });
      const hindiDate = date.toLocaleDateString('hi-IN', { 
        month: 'long', 
        day: 'numeric', 
        year: 'numeric' 
      });

      papers.push(
        {
          id: `english-${dateStr}`,
          date: formattedDate,
          language: 'english',
          pages: Math.floor(Math.random() * 8) + 12,
          thumbnail: '/sample-pdfs/CondoLiving.pdf',
          size: `${(Math.random() * 5 + 8).toFixed(1)} MB`,
          downloadUrl: '/sample-pdfs/CondoLiving.pdf'
        },
        {
          id: `hindi-${dateStr}`,
          date: hindiDate,
          language: 'hindi',
          pages: Math.floor(Math.random() * 6) + 10,
          thumbnail: '/sample-pdfs/TheThreeMusketeers.pdf',
          size: `${(Math.random() * 4 + 7).toFixed(1)} MB`,
          downloadUrl: '/sample-pdfs/TheThreeMusketeers.pdf'
        }
      );
    }
    
    return papers;
  };

  const epapers = generateEPapers();
  const totalPages = Math.ceil(epapers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedPapers = epapers.slice(startIndex, startIndex + itemsPerPage);

  const getLanguageBadge = (language: string) => {
    return language === 'english' 
      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
      : 'bg-primary/10 text-primary dark:bg-primary/20';
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            📰 E-Paper Archive
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Access our digital newspaper archive in English and Hindi. Browse through past editions and download for offline reading.
          </p>
        </div>

        {/* Date Selector */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4 bg-muted/50 p-4 rounded-lg">
            <Calendar className="h-5 w-5 text-muted-foreground" />
            <label className="text-sm font-medium text-foreground">Select Date:</label>
            <Input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-auto"
            />
          </div>
        </div>

        {/* E-Papers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {displayedPapers.map((epaper) => (
            <Card key={epaper.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
              <div className="relative">
                {/* Thumbnail */}
                <div className="h-80 bg-muted flex items-center justify-center relative overflow-hidden">
                  <div className="bg-white dark:bg-gray-800 w-48 h-64 rounded-lg shadow-lg border border-border flex items-center justify-center transform group-hover:scale-105 transition-transform duration-300">
                    <div className="text-center p-6">
                      <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                      <div className="text-sm text-muted-foreground mb-2">
                        The Cliff News
                      </div>
                      <div className="text-sm font-bold text-foreground mb-1">
                        {epaper.language === 'english' ? 'English Edition' : 'हिंदी संस्करण'}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {epaper.date}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Language Badge */}
                <div className="absolute top-4 right-4">
                  <Badge className={getLanguageBadge(epaper.language)}>
                    {epaper.language === 'english' ? 'ENGLISH' : 'हिंदी'}
                  </Badge>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="mb-4">
                  <h3 className="font-bold text-lg text-foreground mb-2">
                    {epaper.language === 'english' ? 'English Edition' : 'हिंदी संस्करण'}
                  </h3>
                  <p className="text-muted-foreground text-sm">{epaper.date}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <div className="font-semibold text-primary">{epaper.pages}</div>
                    <div className="text-muted-foreground">Pages</div>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <div className="font-semibold text-primary">{epaper.size}</div>
                    <div className="text-muted-foreground">Size</div>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                    <Eye className="h-4 w-4 mr-2" />
                    Read Online
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center space-x-4">
            <Button
              variant="outline"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>
            
            <div className="flex space-x-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <Button
                  key={i + 1}
                  variant={currentPage === i + 1 ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(i + 1)}
                  className="w-10"
                >
                  {i + 1}
                </Button>
              ))}
            </div>
            
            <Button
              variant="outline"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompactEPaperSection;