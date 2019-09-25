let app = require('../server.js');
let testServer = require('supertest');

describe('test the root path of /library', () => {
    //just testing to see if supertest is working
    test('should respond 200 to /logout', async () => {
        let response = await testServer(app).post('/api/user/logout');
        expect(response.statusCode).toBe(200);
    });

    test('should get 403 to /api/library', async () => {
        let agent = testServer.agent(app);

        const userResponse = await agent.get('/api/library')
        expect(userResponse.statusCode).toBe(403);
    })

    //the below all work when you put in the correct password..


    test('try to get 200 when logged in to GET of /api/library', async () => {
        let agent = testServer.agent(app);
        const response = await agent.post('/api/user/login')
                                    .send({username: 'roo', password: 'as;dlfkjas;dlfkj'});
        expect(response.statusCode).toBe(200);
        const userResponse = await agent.get('/api/library');
        expect(userResponse.statusCode).toBe(200);
    })

    test('try to get 200 when logged in to GET of /api/library/details/34', async () => {
        let agent = testServer.agent(app);
        const response = await agent.post('/api/user/login')
            .send({ username: 'roo', password: 'asd;lfasdf' });
        expect(response.statusCode).toBe(200);
        const userResponse = await agent.get('/api/library/details/34');
        expect(userResponse.statusCode).toBe(200);
    })

    test('try to get 200 when logged in to GET of /api/library/wishlist', async () => {
        let agent = testServer.agent(app);
        const response = await agent.post('/api/user/login')
            .send({ username: 'roo', password: 'ldkjfaasdfasdf' });
        expect(response.statusCode).toBe(200);
        const userResponse = await agent.get('/api/library/wishlist');
        expect(userResponse.statusCode).toBe(200);
    })

    test('try to get 200 when logged in to GET of /api/library/notes/34', async () => {
        let agent = testServer.agent(app);
        const response = await agent.post('/api/user/login')
            .send({ username: 'roo', password: 'as;ldkjfa;lsdkjfa;sldkfj' });
        expect(response.statusCode).toBe(200);
        const userResponse = await agent.get('/api/library/notes/34');
        expect(userResponse.statusCode).toBe(200);
    })

    //test put route works, again, if right pwd is entered. db did update, and test passed.
    test('try to get 200 when logged in to PUT of /api/library/notes/', async () => {
        let agent = testServer.agent(app);
        const response = await agent.post('/api/user/login')
            .send({ username: 'roo', password: 'asld;fjas;dlkfjasd;lfkj' });
        expect(response.statusCode).toBe(200);
        const userResponse = await agent.put('/api/library/notes/')
            .send({bookId: 24, notes: 'hullo db'});
        expect(userResponse.statusCode).toBe(200);
    })
})