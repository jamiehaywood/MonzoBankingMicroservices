import epochConstructor from './epochConstructor'
import moment from 'moment'
import stocks from './stocks.json'

const getPercentageChanges = function (quotes: IStockQuotes): object {
    let epochValues: IEpochValues = {
        day: epochConstructor(1),
        week: epochConstructor(7),
        month: epochConstructor(28),
        ytd: moment().month("January").date(2).hours(12).minutes(0).seconds(0).milliseconds(0).valueOf(),
        year: epochConstructor(365)
    }

    console.log(epochValues)
    let percentageChanges = {} as IPercentageChanges;

    for (const company in quotes) {
        percentageChanges[company] = "";
        let constructorObject: object = {}
        for (const timePeriod in epochValues) {
            var epochValue = epochValues[timePeriod];
            var foundValue = quotes[company].find(i => i[0] == epochValue);
            let period = foundValue.pop()
            let todaysQuote = quotes[company][quotes[company].length - 1][1];
            constructorObject[timePeriod] = (todaysQuote - period) / period * 100;

            let purchasePrice = stocks.find(i => i.name == company).averagePurchasePrice
            constructorObject["totalChange"] = (todaysQuote - purchasePrice) / purchasePrice * 100;
            percentageChanges[company] = constructorObject
        }
    }
    return percentageChanges
}

export default getPercentageChanges
