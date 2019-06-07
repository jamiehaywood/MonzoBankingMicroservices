module.exports = async function (context, myTimer) {
    var request = require("request");
    const stocks = require('../StockChecker/stocks.json')

    getStockClosePrice(stocks)

    async function getStockClosePrice(stocks) {
        let todaysStockPrices = []

        var stockTickers = stocks.map(x => x.ticker)

        for (const ticker of stockTickers) {
            var options = {
                method: 'GET',
                url: 'https://cloud.iexapis.com/stable/stock/' + ticker + '/ohlc',
                qs: {
                    token: process.env["iexAPIKey"]
                    },
            };
            let closePrice = await new Promise((res, rej) => {
                request(options, function (error, response, body) {
                    console.log(body)
                    rej(error)
                    res(response.close.price)
                })
            });
            todaysStockPrices.push(closePrice)
        }
    }
    context.done()
}