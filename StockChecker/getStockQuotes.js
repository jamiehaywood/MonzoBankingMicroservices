module.exports = async function getStockQuotes() {
    const stocks = require('./stocks.json')
    const rp = require("request-promise")

    let requestPromiseArray = stocks.map(x => {
        let options = {
            method: 'GET',
            url: 'https://www.stockopedia.com/ajax/get_prices/' + x.stockopediaTicker + '/',
            json: true
        };
        return rp(options);
    });

    const quotes = await Promise.all(requestPromiseArray);

    let keys = stocks.map(x => x.name);
    let result = {};
    keys.forEach((key, i) => result[key] = quotes[i]);

    return result
}