module.exports = async function checkBankHolidays() {
    var request = require('request');
    var moment = require('moment');

    let body = await new Promise((res, rej) => {

        var options = {
            method: 'GET',
            url: 'https://www.gov.uk/bank-holidays.json'
        };

        request(options, function (error, response, body) {
            if (error) throw new Error(error);
            res(body)
            rej(error)
        })
    });
    
    let obj = JSON.parse(await body)
    let holidays = obj["england-and-wales"].events
    
    let bankHolidayDates = holidays.map(x => x.date)

    if (bankHolidayDates.includes(moment().format('YYYY-MM-DD'))) {
        return true
    }
    else {
        return false
    }
}