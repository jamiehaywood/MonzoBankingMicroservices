module.exports = async function checkBankHolidays() {
    var request = require('request');
    var moment = require('moment');

    let body = await new Promise<Object>((res, rej) => {

        var options = {
            method: 'GET',
            url: 'https://www.gov.uk/bank-holidays.json',
            json: true
        };

        request(options, function (error, response, body) {
            if (!error && response === 200) {
                rej(error)
                throw new Error(error);
            }
            res(body)
        })
    });

    let holidays = await body["england-and-wales"].events

    let bankHolidayDates:Array<string> = holidays.map((x:any) => (x.date)) // how do I use the map function with TypeScript and make it look nice/not throw errors

    if (bankHolidayDates.includes(moment().format('YYYY-MM-DD'))) {
        return true
    }
    else {
        return false
    }
}