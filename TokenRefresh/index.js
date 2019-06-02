module.exports = async function (context, myTimer) {
    var azure = require('azure-storage');
    var request = require("request");
    var entGen = azure.TableUtilities.entityGenerator;

    var tableService = azure.createTableService(process.env["storageName"], process.env["storageAccessKey"])

        // Fetch existing credentials from the storage table
        async function credentialsRetriever() {
            var query = new azure.TableQuery().top(5);

            return new Promise((res, rej) => {
                tableService.queryEntities(process.env["tableName"], query, null, function (error, result, response) {

                    if (!error) {
                        var credentialObject = {};
                        response.body.value.map(item => {
                            credentialObject[item.RowKey] = item.value
                        })
                        res(credentialObject)
                        context.log("Credentials successfully retrieved from table")
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
                        context.log("Monzo token refresh successful")
                    }
                    else {
                        rej(error)
                        context.log(response.statusMessage)
                    }
                });
            })
        }

        // Update the storage table with new credentials
        async function credentialsStorer(refreshedCredentials) {
            return new Promise((res, rej) => {
                var batch = new azure.TableBatch();
                
                var newRefreshToken = {
                    PartitionKey: entGen.String(process.env["refreshTokenPartitionKey"]),
                    RowKey: entGen.String(process.env["refreshTokenRowKey"]),
                    value: entGen.String(refreshedCredentials.refresh_token),
                }
                var newAccessToken = {
                    PartitionKey: entGen.String(process.env["accessTokenPartitionKey"]),
                    RowKey: entGen.String(process.env["accessTokenRowKey"]),
                    value: entGen.String(refreshedCredentials.refresh_token),
                }

                batch.replaceEntity(newRefreshToken, { echoContent: true });
                batch.replaceEntity(newAccessToken, { echoContent: true });
                
                tableService.executeBatch(process.env["tableName"], batch, function (error, result, response) {
                    if (!error) {
                        res(response.statusCode)
                        context.log(response.statusCode + ": " + "Successfully written refreshed credentials to table")
                    }
                    else {
                        context.log(response)
                        rej(error)
                    }
                });
            })
        }

        let existingCredentials = await credentialsRetriever()
        let refreshedCredentials = await credentialsRefresher(existingCredentials)
        let finalResponse = await credentialsStorer(refreshedCredentials)
        context.log(finalResponse)
}