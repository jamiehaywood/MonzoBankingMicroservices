import request from 'request'

const credentialsRefresher = async function (existingCredentials: ICredentialsObject): Promise<IRefreshedCredentials> {
    var options = {
        method: 'POST',
        url: 'https://api.monzo.com/oauth2/token',
        form:
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
                var newCredentials:IRefreshedCredentials = JSON.parse(body)
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

export default credentialsRefresher