import { useState } from "react";
import { Filter, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuickReadCard from "@/components/QuickReadCard";
import { quickReads, categories } from "@/data/sampleData";

const InshortsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredQuickReads = quickReads.filter(item => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch = item.headline.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Page Header */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="headline-large text-foreground mb-4">
              Quick Reads
            </h1>
            <p className="body-large text-muted-foreground mb-8">
              Stay informed with bite-sized news stories. All the important updates in under 100 words.
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search quick reads..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-6 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-4 overflow-x-auto">
            <Button
              variant={selectedCategory === "All" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory("All")}
            >
              All
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

      {/* Quick Reads Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {filteredQuickReads.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                No stories found matching your criteria.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredQuickReads.map((item) => (
                <QuickReadCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default InshortsPage;