module.exports = async function getTotalDayChange() {
    let iex = require('iexcloud_api_wrapper')
    const stocks = require('./stocks.json')
    
    const quotes = await (async () => {
    
        var stockTickers = stocks.map(x => x.ticker)
        let todaysStockQuotes = {}
    
        for (const ticker of stockTickers) {
            const quoteData = await iex.quote(ticker);
            todaysStockQuotes[ticker] = quoteData
        }
        return todaysStockQuotes
    })()

    let dayChanges = []

    for (const stock in quotes) {
        if (quotes.hasOwnProperty(stock)) {
            const element = quotes[stock];
            dayChanges.push(element.changePercent)
        }
    }
    let totalChange = dayChanges.reduce((a, b) => a + b, 0)*100
    return totalChange/Object.keys(quotes).length;
}