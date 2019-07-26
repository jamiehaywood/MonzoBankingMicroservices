export interface Address {
    address: string;
    city: string;
    country: string;
    latitude: number;
    longitude: number;
    postcode: string;
    region: string;
}

export interface Merchant {
    address: Address;
    created: Date;
    group_id: string;
    id: string;
    logo: string;
    emoji: string;
    name: string;
    category: string;
}

export interface ITransactionData {
    account_id: string;
    amount: number;
    created: Date;
    currency: string;
    description: string;
    id: string;
    category: string;
    is_load: boolean;
    settled: Date;
    merchant: Merchant;
}

export interface ITransactionCreated {
    type: string;
    data: ITransactionData;
}
