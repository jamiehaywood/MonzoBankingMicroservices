import moment from 'moment';

const epochConstructor = function (daysAgo:number) : number {
    return moment().subtract(daysAgo, 'days').hours(12).minutes(0).seconds(0).millisecond(0).valueOf();
}

export default epochConstructor