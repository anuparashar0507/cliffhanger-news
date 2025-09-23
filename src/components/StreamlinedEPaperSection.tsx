import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, Eye, ArrowRight, Calendar, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

interface EPaperData {
  id: string;
  language: 'english' | 'hindi';
  date: string;
  pages: number;
  thumbnail: string;
  size: string;
  headlines: string[];
}

const StreamlinedEPaperSection: React.FC = () => {
  const todayEPapers: EPaperData[] = [
    {
      id: 'english-today',
      language: 'english',
      date: 'January 15, 2024',
      pages: 16,
      thumbnail: '/sample-pdfs/CondoLiving.pdf',
      size: '12.5 MB',
      headlines: [
        'Economic Growth Reaches New Heights',
        'Technology Innovation Awards Announced',
        'Sports Championship Finals This Weekend'
      ]
    },
    {
      id: 'hindi-today',
      language: 'hindi',
      date: '15 जनवरी, 2024',
      pages: 14,
      thumbnail: '/sample-pdfs/TheThreeMusketeers.pdf',
      size: '11.2 MB',
      headlines: [
        'आर्थिक विकास नई ऊंचाइयों पर',
        'तकनीकी नवाचार पुरस्कार घोषित',
        'खेल चैम्पियनशिप फाइनल इस सप्ताहांत'
      ]
    }
  ];

  const getLanguageStyle = (language: string) => {
    return language === 'english' 
      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
      : 'bg-primary/10 text-primary dark:bg-primary/20';
  };

  return (
    <section className="py-16 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-orange-950 dark:via-amber-950 dark:to-yellow-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            📰 Today's Digital Newspapers
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Read The Cliff News in English and Hindi - Fresh news delivered digitally every morning
          </p>
          <div className="w-20 h-1 bg-primary mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Today's Headlines */}
          <div className="lg:order-2">
            <Card className="h-full">
              <CardContent className="p-6">
                <div className="flex items-center mb-6">
                  <Calendar className="h-5 w-5 text-primary mr-2" />
                  <h3 className="text-xl font-bold text-foreground">Today's Headlines</h3>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Badge className="mb-3 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                      English Edition
                    </Badge>
                    <ul className="space-y-2">
                      {todayEPapers[0].headlines.map((headline, index) => (
                        <li key={index} className="flex items-start">
                          <span className="flex-shrink-0 w-2 h-2 bg-primary rounded-full mt-2 mr-3"></span>
                          <span className="text-sm text-muted-foreground">{headline}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="pt-4 border-t border-border">
                    <Badge className="mb-3 bg-primary/10 text-primary">
                      हिंदी संस्करण
                    </Badge>
                    <ul className="space-y-2">
                      {todayEPapers[1].headlines.map((headline, index) => (
                        <li key={index} className="flex items-start">
                          <span className="flex-shrink-0 w-2 h-2 bg-primary rounded-full mt-2 mr-3"></span>
                          <span className="text-sm text-muted-foreground">{headline}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* E-Papers */}
          <div className="lg:col-span-2 lg:order-1 space-y-6">
            {todayEPapers.map((epaper) => (
              <Card key={epaper.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    {/* Thumbnail */}
                    <div className="md:w-48 lg:w-56 flex-shrink-0">
                      <div className="h-64 md:h-full bg-muted flex items-center justify-center relative overflow-hidden">
                        <div className="bg-white dark:bg-gray-800 w-32 h-44 rounded shadow-lg border border-border flex items-center justify-center">
                          <div className="text-center p-4">
                            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                            <div className="text-xs text-muted-foreground">
                              The Cliff News
                            </div>
                            <div className="text-xs font-semibold text-foreground mt-1">
                              {epaper.language === 'english' ? 'English Edition' : 'हिंदी संस्करण'}
                            </div>
                          </div>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-xl font-bold text-foreground">
                              {epaper.language === 'english' ? 'English Edition' : 'हिंदी संस्करण'}
                            </h3>
                            <Badge className={getLanguageStyle(epaper.language)}>
                              {epaper.language === 'english' ? 'ENGLISH' : 'हिंदी'}
                            </Badge>
                          </div>
                          <p className="text-muted-foreground">{epaper.date}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4 mb-6 text-sm">
                        <div className="text-center p-3 bg-muted/50 rounded-lg">
                          <div className="font-semibold text-primary">{epaper.pages}</div>
                          <div className="text-muted-foreground">Pages</div>
                        </div>
                        <div className="text-center p-3 bg-muted/50 rounded-lg">
                          <div className="font-semibold text-primary">{epaper.size}</div>
                          <div className="text-muted-foreground">Size</div>
                        </div>
                        <div className="text-center p-3 bg-muted/50 rounded-lg">
                          <div className="font-semibold text-primary">PDF</div>
                          <div className="text-muted-foreground">Format</div>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3">
                        <Button className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground" asChild>
                          <Link to="/epaper">
                            <Eye className="h-4 w-4 mr-2" />
                            Read Now
                          </Link>
                        </Button>
                        <Button variant="outline" className="flex-1">
                          <Download className="h-4 w-4 mr-2" />
                          Download PDF
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* View Archive Button */}
        <div className="text-center mt-12">
          <Button variant="outline" className="group" asChild>
            <Link to="/epaper">
              View E-Paper Archive
              <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default StreamlinedEPaperSection;