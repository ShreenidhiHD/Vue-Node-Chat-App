require('dotenv').config();
const request = require('supertest');
const http = require('http');
const app = require('../index'); // Import your app

const SERVER_URL = process.env.SERVER_URL;
const SERVER_PORT = process.env.SERVER_PORT;

describe('GET /', () => {
    it('responds with a 200 status', done => {
        request(`${SERVER_URL}:${SERVER_PORT}`)
            .get('/')
            .expect(200, done);
    });
});

// Temporarily comment out Socket.IO tests to isolate the issue
// describe('Socket.IO', () => {
//     let server;
//     let client;

//     // ...rest of the Socket.IO test code...
// });

