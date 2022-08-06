process.env.NODE_ENV = "test";

const request = require("supertest");
const app = require("./main");
const shoppingList = require('./fake_db');;


const testItem = {name: "bread", price: 2.43}


beforeEach(() => shoppingList.push(testItem));
afterEach(() => shoppingList.length = 0);


describe('GET route- /items', function (){
    test('Gets items from fake database', async function(){
        const resp = await request(app).get('/items');
        expect(resp.statusCode).toBe(200);
    })
})

describe('POST /items', function(){
    test('Creates new item in fake database', async function(){
        const resp = await request(app).post('/items?name=chocolate&price=2.95');
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({added: {name: "chocolate", price: "2.95"}})
    })
})

describe('GET /items/bread', function(){
    test('Get individual item from database', async function(){
        const resp = await request(app).get('/items/bread');
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({item: {name: "bread", price: 2.43}})
    })
})

describe('PATCH /items/bread', function(){
    test('Update item in fake database', async function(){
        const resp = await request(app).patch('/items/bread?name=rolls&price=3.56');
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({updated: {name: "rolls", price: "3.56"}})
    })
})

describe('DELETE /items/bread', function(){
    test('Delete item from fake database', async function(){
        const resp = await request(app).delete('/items/bread');
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({ deleted: "bread"})
    })
})
