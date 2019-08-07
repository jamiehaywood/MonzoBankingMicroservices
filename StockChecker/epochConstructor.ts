import { Moment } from "moment";

const epochConstructor = function (today:Moment, daysAgo: number): number {
    let input = today.subtract(daysAgo, 'days').hours(12).minutes(0).seconds(0).millisecond(0)
    switch (input.day()) {
        case 0: //sunday
            return input.subtract(2, 'days').valueOf()
        case 6: //saturday
            return input.subtract(1, 'days').valueOf()
        case 1: //monday
            return input.subtract(3, 'days').valueOf()
        default:
            return input.valueOf()
    }
}

export default epochConstructor