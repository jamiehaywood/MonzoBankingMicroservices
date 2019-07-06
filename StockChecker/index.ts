import { AzureFunction, Context } from "@azure/functions"
import bankHolidayCheck from "./bankHolidayCheck"
import getStockQuotes from "./getStockQuotes";

const timerTrigger: AzureFunction = async function (): Promise<void> {
    if (await bankHolidayCheck() === false) {
        const quotes = await getStockQuotes()
    }
    

};

export default timerTrigger;