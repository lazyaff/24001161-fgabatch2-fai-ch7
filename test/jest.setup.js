const supertest = require("supertest");
const app = require("../utils/app.js");

const request = supertest(app);

// customize this data based on your database
const data = {
    user: { email: "doejohn1@gmail.com", password: "Admin#1234" },
};

beforeAll(async () => {
    const response = await request.post("/api/v1/auth/login").send(data.user);

    global.cookie = response.headers["set-cookie"];
});

afterAll(async () => {
    global.cookie = null;
});

module.exports = { request };
