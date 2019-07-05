module.exports = async function epochConstructor(daysAgo) {
    return moment().subtract(daysAgo, 'days').hours(12).minutes(0).seconds(0).milliseconds(0).valueOf();
}