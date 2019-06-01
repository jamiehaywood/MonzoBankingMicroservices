module.exports = async function (context, req) {
    var azure = require('azure-storage');
    var request = require("request");
    var entGen = azure.TableUtilities.entityGenerator;

    var tableService = azure.createTableService(process.env["storageName"], process.env["storageAccessKey"])

    if (req.body) {

        // Fetch existing credentials from the storage table
        export async function credentialsRetriever() {

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

        let existingCredentials = await credentialsRetriever()

        if (existingCredentials) {
            context.res = {
                status: 200,
                body: existingCredentials
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