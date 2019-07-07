import * as azure from 'azure-storage';

const credentialsRetriever = async function (): Promise<ICredentialsObject> {
    var tableService = azure.createTableService(process.env["storageName"], process.env["storageAccessKey"])

    var query = new azure.TableQuery().top(5);

    return new Promise((res, rej) => {
        tableService.queryEntities(process.env["tableName"], query, null, function (error, result, response) {

            if (!error) {
                var credentialObject = {} as ICredentialsObject;
                response.body["value"].map(item => {
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

export default credentialsRetriever