import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import request from 'request'
import credentialsRetriever from '../TokenRefresh/credentialsRetriever'

const MonzoFeedGenerator: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    const body: IRequestBody = (req.body);

    if (body.title && body.imageUrl) {
        let credentials = await credentialsRetriever()

        var options = {
            method: 'POST',
            url: 'https://api.monzo.com/feed',
            headers:
            {
                Authorization: "Bearer " + credentials.accessToken,
            },
            form:
            {
                account_id: credentials.accountID,
                type: "basic",
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
            if (!error && response.statusCode === 200) {
                console.log("Successfully wrote to feed");
            }
        });

        context.res = {
            status: 202,
            body: "Posted to feed"
        };
    }
    else {
        context.res = {
            status: 400,
            body: "There was an error posting to the feed."
        };
    }
};

export default MonzoFeedGenerator;