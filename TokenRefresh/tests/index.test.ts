const httpFunction = require('../index')
const context = require('./defaultContext')

test('HTTP trigger returns 200 if request contains body', async () => {

    const request = {
        body: {
            "type": expect.any(String)
        }
    }

await httpFunction(context, request);

expect(context.res.status).toEqual(200);
});


test('HTTP trigger returns 400 if request contains no body', async () => {

    const request = {
        body: null
    }

    await httpFunction(context, request);

    expect(context.res.status).toEqual(400);
});
