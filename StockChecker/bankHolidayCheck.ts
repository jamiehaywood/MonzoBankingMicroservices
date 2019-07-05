import request from 'request';
import moment from 'moment';

const bankHolidayCheck: Function = async function (): Promise<Boolean> {
    let body = await new Promise<IHolidayEvent[]>((res, rej) => {

        var options = {
            method: 'GET',
            url: 'https://www.gov.uk/bank-holidays.json',
            json: true
        };

        request(options, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                res(body["england-and-wales"].events)
            }
            else {
                rej(error)
                throw new Error
            }
        })
    });

    let bankHolidayDates: Array<String> = body.map(x => x.date)

    if (bankHolidayDates.includes(moment().format('YYYY-MM-DD').valueOf())) {
        return true;
    }
    else {
        return false;
    }
};

export default bankHolidayCheck;