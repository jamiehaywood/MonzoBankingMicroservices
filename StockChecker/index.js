module.exports = async function (context, myTimer) {
    const stocks = require('../StockChecker/stocks.json');
    const iex = require('iexcloud_api_wrapper');

    const changeToday = await getTotalDayChange()
    console.log(changeToday)

    async function getTotalDayChange() {
        let dayChanges = []
        const quotes = await getTodaysStockQuotes(stocks)

        for (const stock in quotes) {
            if (quotes.hasOwnProperty(stock)) {
                const element = quotes[stock];
                dayChanges.push(element.changePercent)
            }
        }
        let totalChange = dayChanges.reduce((a, b) => a + b, 0)*100
        return totalChange/Object.keys(quotes).length;
    }

    async function getTodaysStockQuotes(stocks) {
        var stockTickers = stocks.map(x => x.ticker)
        let todaysStockQuotes = {}

        for (const ticker of stockTickers) {
            const quoteData = await iex.quote(ticker);
            todaysStockQuotes[ticker] = quoteData
        }
        return todaysStockQuotes
    }
}