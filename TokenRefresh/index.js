module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    if (req.body) {
        context.res = {
            status: 200
        };
    }

    else {
        context.res = {
            status: 400
        };
    }
};