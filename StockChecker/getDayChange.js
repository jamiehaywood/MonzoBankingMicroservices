module.exports = async function getDayChange(quotes) {
    let obj = {}
    for (const i in quotes) {
        if (quotes.hasOwnProperty(i)) {
            let len = quotes[i].length
            let yesterdaysQuote = quotes[i][len - 2].pop();
            let todaysQuote = quotes[i].pop().pop()
            obj[i] = (todaysQuote - yesterdaysQuote) / yesterdaysQuote * 100
        }
    }
    return obj
}