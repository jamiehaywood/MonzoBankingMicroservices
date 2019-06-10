module.exports = async function getTotalDayChange() {
    const getTodaysStockQuotes = require('./getTodaysStockQuotes')

    let dayChanges = []
    const quotes = await getTodaysStockQuotes()

    for (const stock in quotes) {
        if (quotes.hasOwnProperty(stock)) {
            const element = quotes[stock];
            dayChanges.push(element.changePercent)
        }
    }
    let totalChange = dayChanges.reduce((a, b) => a + b, 0)*100
    return totalChange/Object.keys(quotes).length;
}