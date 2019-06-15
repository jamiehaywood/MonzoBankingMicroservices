module.exports = function getChanges(epoch, quotes) {
    let obj = {}
    for (const i in quotes) {
        if (quotes.hasOwnProperty(i)) {
            quotes[i].forEach(element => {
                if(element[0] === epoch){
                    let period = element.pop()
                    let todaysQuote = quotes[i].pop().pop();
                    obj[i] = (todaysQuote - period) / period * 100
                }
            });
        }
    }
    obj["aggregatedChange"] = Object.values(obj).reduce((a, b) => a + b)
    return obj
}