import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import request from 'request'
import credentialsRetriever from '../TokenRefresh/credentialsRetriever'

const MonzoFeedGenerator: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    const body: IRequestBody = (req.body);

    if (body) {
        let credentials = await credentialsRetriever()
        let accessToken = credentials.accessToken

        var options = {
            method: 'POST',
            url: 'https://api.monzo.com/feed',
            headers:
            {
                Authorization: accessToken,
                "Content-Type": 'application/x-www-form-urlencoded'
            },
            form:
            {
                account_id: credentials.accountId,
                type: credentials.accountType,
                url: body.url,
                'params[title]': body.title,
                'params[image_url]': body.imageUrl,
                'params[background_color]': body.backgroundColor,
                'params[body_color]': body.bodyColor,
                'params[title_color]': body.titleColor,
                'params[body]': body.bodyText
            }
        };

        request(options, function (error, response, body) {
            if (error) throw new Error(error);

            console.log(body);
        });

        context.res = {
            status: 202, // for an async response.
            body: "Hello " + (req.query.name || req.body.name)
        };
    }
    else {
        context.res = {
            status: 400,
            body: "Please pass a name on the query string or in the request body"
        };
    }
};

export default MonzoFeedGenerator;
