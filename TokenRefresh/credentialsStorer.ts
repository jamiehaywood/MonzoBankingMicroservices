import * as azure from 'azure-storage';

const credentialsStorer = async function (refreshedCredentials: IRefreshedCredentials): Promise<number> {

    var entGen = azure.TableUtilities.entityGenerator;
    var tableService = azure.createTableService(process.env["storageName"], process.env["storageAccessKey"])

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
            value: entGen.String(refreshedCredentials.access_token),
        }

        batch.replaceEntity(newRefreshToken);
        batch.replaceEntity(newAccessToken);

        tableService.executeBatch(process.env["tableName"], batch, function (error, result, response) {
            if (!error) {
                res(response.statusCode)
                console.log(response.statusCode + ": " + "Successfully written refreshed credentials to table")
            }
            else {
                console.log(response, error)
                rej(error)
            }
        });
    })
}

export default credentialsStorer