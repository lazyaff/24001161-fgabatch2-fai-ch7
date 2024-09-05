const { request } = require("./jest.setup");

// customize this data based on your database
const data = {
    existID: 2,
    notExistID: 100,
    invalidID: "string",
    validUserData: {
        name: "doe",
        email: "doejohn26@gmail.com",
        password: "Admin#1234",
        address: "washington",
        identity_number: "45232",
        identity_type: "id",
    },
    invalidUserData: {
        name: "doe",
        email: "doejohn1@gmail.com",
        password: "Admin#1234",
        address: "washington",
        identity_number: "45232",
        identity_type: "id",
    },
};

describe("User service", () => {
    // get all users
    describe("get all users", () => {
        it("should get all users", async () => {
            const response = await request
                .get("/api/v1/users")
                .set("Cookie", global.cookie);
            expect(response.status).toBe(200);
        });
    });

    // get user details
    describe("get user detaiuls", () => {
        it("should get user details", async () => {
            const response = await request
                .get("/api/v1/users/" + data.existID)
                .set("Cookie", global.cookie);
            expect(response.status).toBe(200);
        });

        it("should return 404 due to user not found", async () => {
            const response = await request
                .get("/api/v1/users/" + data.notExistID)
                .set("Cookie", global.cookie);
            expect(response.status).toBe(404);
        });

        it("should return 400 due to invalid id", async () => {
            const response = await request
                .get("/api/v1/users/" + data.invalidID)
                .set("Cookie", global.cookie);
            expect(response.status).toBe(400);
        });
    });

    // create user
    describe("create user", () => {
        it("should create user", async () => {
            const response = await request
                .post("/api/v1/users")
                .set("Cookie", global.cookie)
                .send(data.validUserData);
            expect(response.status).toBe(201);
        });

        it("should return 400 due to invalid user data", async () => {
            const response = await request
                .post("/api/v1/users")
                .set("Cookie", global.cookie)
                .send(data.invalidUserData);
            expect(response.status).toBe(400);
        });
    });
});
