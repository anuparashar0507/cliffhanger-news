import React, { useEffect } from 'react';

const ScrollingTicker = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      "symbols": [
        {"proName": "BSE:SENSEX", "title": "SENSEX"},
        {"proName": "NSE:NIFTY", "title": "NIFTY 50"},
        {"proName": "BSE:RELIANCE", "title": "Reliance"},
        {"proName": "BSE:TCS", "title": "TCS"},
        {"proName": "BSE:HDFCBANK", "title": "HDFC Bank"},
        {"proName": "BSE:INFY", "title": "Infosys"},
        {"proName": "BSE:ITC", "title": "ITC"},
        {"proName": "BSE:HINDUNILVR", "title": "HUL"},
        {"proName": "FOREXCOM:USDINR", "title": "USD/INR"},
        {"proName": "TVC:GOLD", "title": "Gold"},
        {"proName": "TVC:SILVER", "title": "Silver"}
      ],
      "showSymbolLogo": true,
      "colorTheme": "light",
      "isTransparent": false,
      "displayMode": "adaptive",
      "locale": "in"
    });

    const container = document.getElementById("tradingview-ticker");
    if (container) {
      container.appendChild(script);
    }

    return () => {
      const existingScript = document.getElementById("tradingview-ticker")?.querySelector('script');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return (
    <div 
      id="tradingview-ticker" 
      className="tradingview-widget-container w-full h-10"
      style={{ height: '40px' }}
    >
      <div className="tradingview-widget-container__widget w-full h-full"></div>
    </div>
  );
};

export default ScrollingTicker;