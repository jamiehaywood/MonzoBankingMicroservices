module.exports = async function (context, req) {
    var azure = require('azure-storage');
    var request = require("request");
    var entGen = azure.TableUtilities.entityGenerator;

    var tableService = azure.createTableService(process.env["storageName"], process.env["storageAccessKey"])

    if (req.body) {

        // Fetch existing credentials from the storage table
        async function credentialsRetriever() {

            var query = new azure.TableQuery().top(5);

            return new Promise((res, rej) => {
                tableService.queryEntities('credentials', query, null, function (error, result, response) {

                    if (!error) {
                        var credentialObject = {};
                        response.body.value.map(item => {
                            credentialObject[item.RowKey] = item.value
                        })
                        res(credentialObject)
                        console.log("Credentials successfully retrieved from table")
                    }
                    else {
                        rej(error)
                    }

                })
            })
        };

        // Make a POST to Monzo to refresh the credentials
        async function credentialsRefresher(existingCredentials) {
            var options = {
                method: 'POST',
                url: 'https://api.monzo.com/oauth2/token',
                formData:
                {
                    grant_type: 'refresh_token',
                    client_id: await existingCredentials.clientID,
                    client_secret: await existingCredentials.clientSecret,
                    refresh_token: await existingCredentials.refreshToken
                }
            };

            return new Promise((res, rej) => {
                request(options, function (error, response, body) {
                    if (response.statusCode === 200) {
                        var newCredentials = JSON.parse(body)
                        res(newCredentials)
                        console.log("Monzo token refresh successful")
                    }
                    else {
                        rej(error)
                        console.log(response.statusMessage)
                    }
                });
            })
        }


        let existingCredentials = await credentialsRetriever()
        let refreshedCredentials = await credentialsRefresher(existingCredentials)

        if (refreshedCredentials) {
            context.res = {
                status: 200,
                body: refreshedCredentials
            }
        }
        else {
            context.res = {
                status: 400,
                body: "houston, we've had a problem."
            };

        }
    }
}