module.exports = async function (context, myTimer) {
    const getStockQuotes = require('./getStockQuotes');
    const bankHolidayCheck = require('./bankHolidayCheck');


    const bankHoliday = await bankHolidayCheck()
    if (!bankHoliday) {
        const quotes = getStockQuotes()
        console.log(await quotes)
    }
}
//     const getTotalMonthChange = require('./getTotalMonthChange');
//     const getTotalValueChange = require('./getTotalValueChange');

//     else{
//         context.log("its a bank holiday!")
//         context.done()
//     }
// }