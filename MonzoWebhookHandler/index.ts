import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { ITransactionCreated, Merchant, ITransactionData } from "./interface";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {

    const requestData: ITransactionData = req.body.data;

    if (requestData) {
        switch (requestData.merchant.name || requestData.description) {
            case "TFL SALARY":
                const savingsPercentage: number = + process.env["savingsAmount"]
                const savingsAmount = requestData.amount * savingsPercentage
                // request to potmover
                break;

            default:
                break;
        }

        context.res = {
            status: 200,
            body: "webhook processed"
        };
    }
    else {
        context.res = {
            status: 400,
            body: "Please pass a name on the query string or in the request body"
        };
    }
};

export default httpTrigger;
