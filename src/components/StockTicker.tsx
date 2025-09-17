import { useEffect, useState } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

interface StockData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
}

const StockTicker = () => {
  const [stocks] = useState<StockData[]>([
    { symbol: "SENSEX", name: "BSE SENSEX", price: 72847.52, change: 445.87, changePercent: 0.62 },
    { symbol: "NIFTY", name: "NIFTY 50", price: 22055.20, change: 131.35, changePercent: 0.60 },
    { symbol: "RELIANCE", name: "Reliance", price: 2847.65, change: -12.45, changePercent: -0.43 },
    { symbol: "TCS", name: "TCS", price: 4156.80, change: 28.90, changePercent: 0.70 },
    { symbol: "HDFCBANK", name: "HDFC Bank", price: 1678.45, change: 15.20, changePercent: 0.91 },
    { symbol: "INFY", name: "Infosys", price: 1789.30, change: -8.75, changePercent: -0.49 },
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % stocks.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [stocks.length]);

  return (
    <div className="bg-accent text-accent-foreground py-2 border-b border-border overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">📈 LIVE MARKETS</span>
          
          <div className="flex-1 mx-4 overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {stocks.map((stock, index) => (
                <div key={stock.symbol} className="flex-shrink-0 w-full">
                  <div className="flex items-center justify-center space-x-6 text-sm">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{stock.symbol}</span>
                      <span>₹{stock.price.toLocaleString()}</span>
                      <div className={`flex items-center space-x-1 ${
                        stock.change >= 0 ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {stock.change >= 0 ? (
                          <TrendingUp className="h-3 w-3" />
                        ) : (
                          <TrendingDown className="h-3 w-3" />
                        )}
                        <span>
                          {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)} 
                          ({stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex space-x-1">
            {stocks.map((_, index) => (
              <div
                key={index}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  index === currentIndex ? 'bg-white' : 'bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockTicker;