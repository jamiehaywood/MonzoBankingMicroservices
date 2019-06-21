module.exports = function getDayChange(quotes) {
    let obj = {}
    for (const i in quotes) {
        if (quotes.hasOwnProperty(i)) {
            let len = quotes[i].length - 2
            let yesterdaysQuote = quotes[i][len].pop();
            let todaysQuote = quotes[i].pop().pop();
            obj[i] = (todaysQuote - yesterdaysQuote) / yesterdaysQuote * 100
        }
    }
    obj["aggregatedChange"] = Object.values(obj).reduce((a, b) => a + b)
    return obj
}