import React, { useEffect, useRef, memo } from "react";
import { useTheme } from "@/contexts/ThemeContext";

function ScrollingTicker() {
  const { isDark } = useTheme();
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (container.current) {
      // Clear previous content to prevent duplicates
      container.current.innerHTML = "";

      const script = document.createElement("script");
      script.src =
        "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = `
        {
          "symbols": [
            {
              "proName": "BSE:SENSEX",
              "title": "BSE SENSEX"
            },
            {
              "proName": "BSE:RELIANCE",
              "title": "RELIANCE"
            },
            {
              "proName": "BSE:TCS",
              "title": "TCS"
            },
            {
              "proName": "BSE:HDFCBANK",
              "title": "HDFC Bank"
            },
            {
              "proName": "BSE:INFY",
              "title": "Infosys"
            },
            {
              "proName": "BSE:ITC",
              "title": "ITC"
            },
            {
              "proName": "BSE:ICICIBANK",
              "title": "ICICI Bank"
            },
            {
              "proName": "BSE:HINDUNILVR",
              "title": "HUL"
            },
            {
              "proName": "BSE:LT",
              "title": "L&T"
            },
            {
              "proName": "BSE:SBIN",
              "title": "SBI"
            },
            {
              "proName": "BSE:BHARTIARTL",
              "title": "Bharti Airtel"
            },
            {
              "proName": "BSE:ASIANPAINT",
              "title": "Asian Paints"
            },
            {
              "proName": "BSE:MARUTI",
              "title": "Maruti Suzuki"
            },
            {
              "proName": "BITSTAMP:BTCUSD",
              "title": "Bitcoin"
            },
            {
              "proName": "BITSTAMP:ETHUSD",
              "title": "Ethereum"
            }
          ],
          "colorTheme": "${isDark ? "dark" : "light"}",
          "locale": "in",
          "largeChartUrl": "",
          "isTransparent": true,
          "showSymbolLogo": false,
          "displayMode": "adaptive"
        }`;
      container.current.appendChild(script);
    }
  }, [isDark]);

  return (
    <div
      className="tradingview-widget-container w-full overflow-hidden"
      ref={container}
      style={{ height: "40px", maxWidth: "100%" }}
    >
      <div className="tradingview-widget-container__widget"></div>
      <div className="tradingview-widget-copyright hidden">
        <span>Ticker tape by TradingView</span>
      </div>
    </div>
  );
}

export default memo(ScrollingTicker);
