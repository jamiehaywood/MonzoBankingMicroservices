interface ICredentialsObject {
    accessToken: string
    clientID: string
    clientSecret: string
    refreshToken: string
    accountId?: string
    accountType?: string
}

interface IRefreshedCredentials {
    access_token: string,
    client_id: string,
    expires_in: number,
    refresh_token: string,
    scope: string,
    token_type: string,
    user_id: string
}