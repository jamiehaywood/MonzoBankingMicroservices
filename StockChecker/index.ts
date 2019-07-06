import { AzureFunction, Context } from "@azure/functions"
import bankHolidayCheck from "./bankHolidayCheck"
import getStockQuotes from "./getStockQuotes";
import getPercentageChanges from "./getPercentageChanges";

const timerTrigger: AzureFunction = async function (): Promise<void> {
    if (await bankHolidayCheck() === false) {
        const quotes = await getStockQuotes()
        const percentageChanges = await getPercentageChanges(quotes)
        console.log(percentageChanges)
    }
    

};

export default timerTrigger;