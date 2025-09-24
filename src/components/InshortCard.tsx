import { ExternalLink, Share2, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Inshort } from "@/services";

interface InshortCardProps {
  inshort: Inshort;
}

const InshortCard = ({ inshort }: InshortCardProps) => {
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
          src={inshort.image}
          alt={inshort.headline}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 left-3">
          <span
            className={`category-badge ${
              inshort.category?.name?.toLowerCase() || "uncategorized"
            } text-xs`}
          >
            {inshort.category?.name || "Uncategorized"}
          </span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-bold text-lg leading-tight mb-3 font-serif">
          {inshort.headline}
        </h3>

        <p className="body-small text-muted-foreground mb-4 leading-relaxed">
          {inshort.summary}
        </p>

        <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
          <span className="font-medium">{inshort.source}</span>
          <span>{formatDate(inshort.publishedAt)}</span>
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

          {inshort.sourceUrl && (
            <Link href={inshort.sourceUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm" className="text-xs">
                <ExternalLink className="h-3 w-3 mr-1" />
                Read Full
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default InshortCard;
