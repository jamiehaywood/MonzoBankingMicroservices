module.exports = async function (context, myTimer) {
    const stocks = require('../StockChecker/stocks.json');
    const iex = require('iexcloud_api_wrapper');
    const getTotalDayChange = require('./getTotalDayChange');

    const changeToday = await getTotalDayChange()
    console.log(changeToday)
}