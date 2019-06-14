module.exports = async function getTotalMonthChange() {
    const stocks = require('./stocks.json')
    let iex = require('iexcloud_api_wrapper')

    const quotes = await (async () => {
        var stockChangesOverOneMonth = []
        var stockTickers = stocks.map(x => x.ticker)
        for (const ticker of stockTickers) {
            const quoteData = await iex.history(ticker);
            stockChangesOverOneMonth.push(quoteData.pop().changeOverTime)
        }
        return stockChangesOverOneMonth
    })()
    let totalChange = quotes.reduce((a, b) => a + b, 0) * 100
    return totalChange / quotes.length;
}