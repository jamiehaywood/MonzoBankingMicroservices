module.exports = async function (context, myTimer) {
    var moment = require('moment');
    const getStockQuotes = require('./getStockQuotes');
    const bankHolidayCheck = require('./bankHolidayCheck');
    const getChanges = require('./getChanges')
    const year = require('./getFinancialDay.js')
    var moment = require('moment');
    var epochConstructor = require('./epochConstructor')

    const bankHoliday = await bankHolidayCheck()
    if (!bankHoliday) {
        const quotes = await getStockQuotes()
        let day = epochConstructor(1)
        let week = epochConstructor(7)
        let month = epochConstructor(28);
        let year = epochConstructor(365)
        let ytd = moment().month("January").date(2).hours(12).minutes(0).seconds(0).milliseconds(0).valueOf();
        const stocksDayChange = getChanges(day, quotes)
        const stocksWeekChange = getChanges(week, quotes)
        const stocksMonthChange = getChanges(month, quotes)
        const stocksYTDChange = getChanges(ytd, quotes)
    }
}