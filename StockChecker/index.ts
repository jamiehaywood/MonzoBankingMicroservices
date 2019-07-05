import { AzureFunction, Context } from "@azure/functions"
import bankHolidayCheck from "./bankHolidayCheck"

const timerTrigger: AzureFunction = async function (context: Context, myTimer: any): Promise<void> {
    if (await bankHolidayCheck() === false) {
    }
    

};

export default timerTrigger;