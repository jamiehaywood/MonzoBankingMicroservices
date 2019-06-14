module.exports = async function getTotalMonthChange() {
    const stocks = require('./stocks.json')
    let iex = require('iexcloud_api_wrapper')
    var stockTickers = stocks.map(x => x.stockopediaTicker)
    var request = require("request");

    const todaysQuotes = (async () => {
        let promiseArray = []
        stockTickers.forEach(ticker => {
            var options = {
                method: 'GET',
                url: 'https://www.stockopedia.com/ajax/get_prices/' + ticker + '/'
            };
            new Promise(function (res, rej) {
                request(options, function (error, response, body) {
                    let quotesObject = {}
                    rej(error)
                    quotesObject[ticker] = body.pop().pop()
                    promiseArray.push(res(quotesObject))
                });
            })
        });
        return await Promise.all(promiseArray)
    })()
}