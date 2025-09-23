import { ExternalLink, Share2, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Inshort } from "@/services";

interface InshortCardProps {
  item: Inshort;
}

const InshortCard = ({ item }: InshortCardProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="news-card p-0 max-w-sm mx-auto">
      <div className="relative">
        <img
          src={item.image}
          alt={item.headline}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 left-3">
          <span
            className={`category-badge ${
              item.category?.name?.toLowerCase() || "uncategorized"
            } text-xs`}
          >
            {item.category?.name || "Uncategorized"}
          </span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-bold text-lg leading-tight mb-3 font-serif">
          {item.headline}
        </h3>

        <p className="body-small text-muted-foreground mb-4 leading-relaxed">
          {item.summary}
        </p>

        <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
          <span className="font-medium">{item.source}</span>
          <span>{formatDate(item.publishedAt)}</span>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-border">
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <Share2 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Bookmark className="h-4 w-4" />
            </Button>
          </div>

          <Button variant="outline" size="sm" className="text-xs">
            <ExternalLink className="h-3 w-3 mr-1" />
            Read Full
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InshortCard;
