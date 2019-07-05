import rp from 'request-promise'
import stocks from '../StockChecker/stocks.json'

const getStockQuotes = async function (): Promise<IStockQuotes> {
    let requestPromiseArray = stocks.map(x => {
        let options = {
            method: 'GET',
            url: 'https://www.stockopedia.com/ajax/get_prices/' + x.stockopediaTicker + '/',
            json: true
        };
        return rp(options);
    });

    const quotes = await Promise.all(requestPromiseArray);

    let keys = stocks.map(x => x.name);
    let result = {} as IStockQuotes
    keys.forEach((key, i) => result[key] = quotes[i]);
    
    return result
}

export default getStockQuotes