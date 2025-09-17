import ScrollingTicker from "./ScrollingTicker";

const StockTicker = () => {
  return (
    <div className="bg-background text-foreground border-b border-border overflow-hidden relative w-full">
      {/* Live Markets Badge - Mobile Responsive */}
      <div className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 z-10">
        <div className="bg-primary text-primary-foreground px-2 sm:px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1">
          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="hidden sm:inline">LIVE</span>
          <span className="sm:hidden">●</span>
        </div>
      </div>

      {/* TradingView Ticker - Full Width */}
      <div className="w-full pl-12 sm:pl-20 pr-4">
        <ScrollingTicker />
      </div>
    </div>
  );
};

export default StockTicker;
