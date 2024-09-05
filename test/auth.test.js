const { request } = require("./jest.setup");

// customize this data based on your database
const data = {
    validUser: { email: "doejohn1@gmail.com", password: "Admin#1234" },
    invalidUser: { email: "qwerty@gmailcom", password: "Admin#1234" },
    validNewUser: {
        name: "doe",
        email: "doejohn25@gmail.com",
        password: "Admin#1234",
        address: "washington",
        identity_number: "45232",
        identity_type: "id",
    },
    invalidNewUser: {
        name: "doe",
        email: "doejohn1@gmail.com",
        password: "Admin#1234",
        address: "washington",
        identity_number: "45232",
        identity_type: "id",
    },
};

describe("Auth service", () => {
    // login
    describe("login", () => {
        it("should login successfully", async () => {
            const response = await request
                .post("/api/v1/auth/login")
                .send(data.validUser);
            expect(response.status).toBe(200);
        });

        it("should return 400 due to invalid credentials", async () => {
            const response = await request
                .post("/api/v1/auth/login")
                .send(data.invalidUser);
            expect(response.status).toBe(400);
        });
    });

    // logout
    describe("logout", () => {
        it("should logout successfully", async () => {
            const response = await request.post("/api/v1/auth/logout");
            expect(response.status).toBe(200);
        });
    });

    // register
    describe("register", () => {
        it("should register successfully", async () => {
            const response = await request
                .post("/api/v1/auth/register")
                .send(data.validNewUser);
            expect(response.status).toBe(201);
        });

        it("should return 400 due to invalid data for new user", async () => {
            const response = await request
                .post("/api/v1/auth/register")
                .send(data.invalidNewUser);
            expect(response.status).toBe(400);
        });
    });
});
