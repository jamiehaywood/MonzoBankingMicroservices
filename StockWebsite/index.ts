import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');

    context.res = {
        headers:{
            "Content-Type": "text/html"
        },
        body:`<!DOCTYPE html>
        <html lang='en'>
        
        <head>
            <meta charset='UTF-8'>
            <meta name='viewport' content='width=device-width, initial-scale=1.0'>
            <meta http-equiv='X-UA-Compatible' content='ie=edge'>
            <title>Hello World</title>
        </head>
        
        <body>
        Testing testing 123
        </body>
        
        </html>`
    };
};

export default httpTrigger;
