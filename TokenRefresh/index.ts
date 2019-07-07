import { AzureFunction, Context } from '@azure/functions';
import credentialsRetriever from './credentialsRetriever'
import credentialsRefresher from './credentialsRefresher'
import credentialsStorer from './credentialsStorer'

const timerTrigger: AzureFunction = async function (context: Context): Promise<void> {
    let existingCredentials = await credentialsRetriever()
    let refreshedCredentials = await credentialsRefresher(existingCredentials)
    let finalResponse = await credentialsStorer(refreshedCredentials)
    context.log(finalResponse)
}

export default timerTrigger;