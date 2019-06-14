module.exports = async function (context, myTimer) {
    const stocks = require('./stocks.json')
    var stockTickers = stocks.map(x => x.stockopediaTicker)
    var request = require("request");

    const todaysQuotes = async () => {
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
        return await promiseArray
    }

    Promise.all(todaysQuotes).then(
        console.log(todaysQuotes)
    )
}
    //     const bankHolidayCheck = require('./bankHolidayCheck');
//     const getTotalDayChange = require('./getTotalDayChange');
//     const getTotalMonthChange = require('./getTotalMonthChange');
//     const getTotalValueChange = require('./getTotalValueChange');

//     const bankHoliday = await bankHolidayCheck()

//     if(!bankHoliday){
//         const value = await getTotalValueChange()
//         console.log(value)
//     }
//     else{
//         context.log("its a bank holiday!")
//         context.done()
//     }
// }