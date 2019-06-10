module.exports = async function getTodaysStockQuotes() {
    let iex = require('iexcloud_api_wrapper')
    const stocks = require('./stocks.json')

    var stockTickers = stocks.map(x => x.ticker)
    let todaysStockQuotes = {}

    for (const ticker of stockTickers) {
        const quoteData = await iex.quote(ticker);
        todaysStockQuotes[ticker] = quoteData
    }
    return todaysStockQuotes
}