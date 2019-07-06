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

interface Company {
    day: number;
    week: number;
    month: number;
    ytd: number;
    year: number;
}


interface IPercentageChanges {
    string: Company
}