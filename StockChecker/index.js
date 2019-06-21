module.exports = async function (context, myTimer) {
    const getStockQuotes = require('./getStockQuotes');
    const bankHolidayCheck = require('./bankHolidayCheck');
    const getDayChange = require('./getDayChange')


    const bankHoliday = await bankHolidayCheck()
    if (!bankHoliday) {
        const quotes = await getStockQuotes()
        const stocksDayChange = getDayChange(quotes)
    }
}