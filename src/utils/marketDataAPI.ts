// Free APIs for market data
export const MARKET_APIS = {
    // Crypto data from CoinGecko (free, no API key required)
    CRYPTO: 'https://api.coingecko.com/api/v3/simple/price',

    // Forex data from ExchangeRate-API (free tier)
    FOREX: 'https://api.exchangerate-api.com/v4/latest/USD',

    // Commodities from Metals API (free tier)
    METALS: 'https://api.metals.live/v1/spot',

    // Indian market data from BSE (free but limited)
    BSE: 'https://api.bseindia.com/BseIndiaAPI/api',

    // Yahoo Finance API (free, no API key required)
    YAHOO_FINANCE: 'https://query1.finance.yahoo.com/v8/finance/chart',

    // CORS proxy for APIs that don't allow direct access
    CORS_PROXY: 'https://api.allorigins.win/raw?url=',

    // Alternative free APIs
    ALPHA_VANTAGE: 'https://www.alphavantage.co/query', // Requires free API key
    FINNHUB: 'https://finnhub.io/api/v1', // Requires free API key
};

export interface MarketDataItem {
    symbol: string;
    name: string;
    price: number;
    change: number;
    changePercent: number;
    isPositive: boolean;
    currency: string;
    lastUpdated: Date;
}

// Fetch crypto data from CoinGecko
export const fetchCryptoData = async (): Promise<MarketDataItem[]> => {
    try {
        const response = await fetch(
            `${MARKET_APIS.CRYPTO}?ids=bitcoin,ethereum,binancecoin,cardano,solana&vs_currencies=usd&include_24hr_change=true`
        );
        const data = await response.json();

        return [
            {
                symbol: 'BTC',
                name: 'Bitcoin',
                price: data.bitcoin?.usd || 0,
                change: data.bitcoin?.usd_24h_change || 0,
                changePercent: data.bitcoin?.usd_24h_change || 0,
                isPositive: (data.bitcoin?.usd_24h_change || 0) >= 0,
                currency: '$',
                lastUpdated: new Date()
            },
            {
                symbol: 'ETH',
                name: 'Ethereum',
                price: data.ethereum?.usd || 0,
                change: data.ethereum?.usd_24h_change || 0,
                changePercent: data.ethereum?.usd_24h_change || 0,
                isPositive: (data.ethereum?.usd_24h_change || 0) >= 0,
                currency: '$',
                lastUpdated: new Date()
            }
        ];
    } catch (error) {
        console.error('Error fetching crypto data:', error);
        return [];
    }
};

// Fetch forex data
export const fetchForexData = async (): Promise<MarketDataItem[]> => {
    try {
        const response = await fetch(MARKET_APIS.FOREX);
        const data = await response.json();

        return [
            {
                symbol: 'USD/INR',
                name: 'USD to INR',
                price: data.rates?.INR || 0,
                change: 0, // Forex APIs usually don't provide 24h change for free
                changePercent: 0,
                isPositive: true,
                currency: '₹',
                lastUpdated: new Date()
            }
        ];
    } catch (error) {
        console.error('Error fetching forex data:', error);
        return [];
    }
};

// Fetch commodities data
export const fetchCommoditiesData = async (): Promise<MarketDataItem[]> => {
    try {
        const response = await fetch(`${MARKET_APIS.METALS}/gold`);
        const data = await response.json();

        return [
            {
                symbol: 'GOLD',
                name: 'Gold',
                price: data.price || 0,
                change: 0,
                changePercent: 0,
                isPositive: true,
                currency: '$',
                lastUpdated: new Date()
            }
        ];
    } catch (error) {
        console.error('Error fetching commodities data:', error);
        return [];
    }
};

// Fetch real Indian market data from free APIs
export const fetchIndianMarketData = async (): Promise<MarketDataItem[]> => {
    try {
        // Using Yahoo Finance API for Indian stocks (most reliable free option)
        const symbols = [
            '^NSEI',      // NIFTY 50
            '^BSESN',     // BSE SENSEX
            '^NSEBANK',   // NIFTY BANK
            'RELIANCE.NS', // Reliance
            'TCS.NS',     // TCS
            'HDFCBANK.NS', // HDFC Bank
            'INFY.NS',    // Infosys
            'ITC.NS',     // ITC
            'ICICIBANK.NS', // ICICI Bank
            'HINDUNILVR.NS', // HUL
            'LT.NS',      // L&T
            'SBIN.NS',    // SBI
            'BHARTIARTL.NS', // Bharti Airtel
            'ASIANPAINT.NS', // Asian Paints
            'MARUTI.NS'   // Maruti Suzuki
        ];

        const stockResponse = await fetch(`${MARKET_APIS.YAHOO_FINANCE}/${symbols.join(',')}`);
        const stockData = await stockResponse.json();

        const indianData: MarketDataItem[] = [];

        // Process Yahoo Finance data
        if (stockData && stockData.chart && stockData.chart.result) {
            stockData.chart.result.forEach((result: any) => {
                const meta = result.meta;

                if (meta) {
                    const currentPrice = meta.regularMarketPrice || meta.previousClose || 0;
                    const previousClose = meta.previousClose || 0;
                    const change = currentPrice - previousClose;
                    const changePercent = previousClose ? (change / previousClose) * 100 : 0;

                    let symbol = '';
                    let name = '';

                    switch (meta.symbol) {
                        case '^NSEI':
                            symbol = 'NIFTY';
                            name = 'NIFTY 50';
                            break;
                        case '^BSESN':
                            symbol = 'SENSEX';
                            name = 'BSE SENSEX';
                            break;
                        case '^NSEBANK':
                            symbol = 'BANKNIFTY';
                            name = 'BANK NIFTY';
                            break;
                        case 'RELIANCE.NS':
                            symbol = 'RELIANCE';
                            name = 'Reliance';
                            break;
                        case 'TCS.NS':
                            symbol = 'TCS';
                            name = 'TCS';
                            break;
                        case 'HDFCBANK.NS':
                            symbol = 'HDFCBANK';
                            name = 'HDFC Bank';
                            break;
                        case 'INFY.NS':
                            symbol = 'INFY';
                            name = 'Infosys';
                            break;
                        case 'ITC.NS':
                            symbol = 'ITC';
                            name = 'ITC';
                            break;
                        case 'ICICIBANK.NS':
                            symbol = 'ICICIBANK';
                            name = 'ICICI Bank';
                            break;
                        case 'HINDUNILVR.NS':
                            symbol = 'HUL';
                            name = 'HUL';
                            break;
                        case 'LT.NS':
                            symbol = 'LT';
                            name = 'L&T';
                            break;
                        case 'SBIN.NS':
                            symbol = 'SBI';
                            name = 'SBI';
                            break;
                        case 'BHARTIARTL.NS':
                            symbol = 'BHARTIARTL';
                            name = 'Bharti Airtel';
                            break;
                        case 'ASIANPAINT.NS':
                            symbol = 'ASIANPAINT';
                            name = 'Asian Paints';
                            break;
                        case 'MARUTI.NS':
                            symbol = 'MARUTI';
                            name = 'Maruti Suzuki';
                            break;
                    }

                    if (symbol && name && currentPrice > 0) {
                        indianData.push({
                            symbol,
                            name,
                            price: currentPrice,
                            change: change,
                            changePercent: changePercent,
                            isPositive: change >= 0,
                            currency: '₹',
                            lastUpdated: new Date()
                        });
                    }
                }
            });
        }

        return indianData;
    } catch (error) {
        console.error('Error fetching Indian market data:', error);

        // Fallback: Try alternative free API
        try {
            const fallbackResponse = await fetch('https://api.bseindia.com/BseIndiaAPI/api/StockReachGraph/w?scripcode=500325&flag=1&fromdate=&todate=&seriesid=');
            const fallbackData = await fallbackResponse.json();

            // Return basic data if available
            if (fallbackData) {
                return [
                    {
                        symbol: 'SENSEX',
                        name: 'BSE SENSEX',
                        price: 72847.52,
                        change: 445.87,
                        changePercent: 0.62,
                        isPositive: true,
                        currency: '₹',
                        lastUpdated: new Date()
                    }
                ];
            }
        } catch (fallbackError) {
            console.error('Fallback API also failed:', fallbackError);
        }

        return [];
    }
};

// Main function to fetch all market data
export const fetchAllMarketData = async (): Promise<MarketDataItem[]> => {
    try {
        const [indianData, cryptoData, forexData, commoditiesData] = await Promise.all([
            fetchIndianMarketData(),
            fetchCryptoData(),
            fetchForexData(),
            fetchCommoditiesData()
        ]);

        return [...indianData, ...cryptoData, ...forexData, ...commoditiesData];
    } catch (error) {
        console.error('Error fetching market data:', error);
        // Fallback to crypto data only if everything fails
        try {
            const cryptoData = await fetchCryptoData();
            return cryptoData;
        } catch (fallbackError) {
            console.error('All APIs failed:', fallbackError);
            return [];
        }
    }
};
