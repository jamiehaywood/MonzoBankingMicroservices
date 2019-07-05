interface IHolidayEvent {
    "title": String,
    "date": String,
    "notes": String,
    "bunting": true
}

interface IStockQuotes {
    company: number[][];
}

interface IEpochValues {
    "day": number,
    "week": number,
    "month": number,
    "ytd": number,
    "year": number
}

interface IPercentageChanges {
    "day": number,
    "week": number,
    "month": number,
    "year": number,
    "ytd": number,
    "sincePurchase": number
}