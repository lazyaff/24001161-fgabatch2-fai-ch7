const { request } = require("./jest.setup");

// customize this data based on your database
const data = {
    existID: 1,
    notExistID: 100,
    invalidID: "string",
    validAccountData: {
        bank_name: "BRI",
        bank_account_number: "56354635",
        balance: "100000",
        user_id: 1,
    },
    invalidAccountData: {
        bank_name: "BRI",
        bank_account_number: "00004523453423",
        balance: "100000",
        user_id: 1,
    },
};

describe("Account service", () => {
    // get all accounts
    describe("get all accounts", () => {
        it("should get all accounts", async () => {
            const response = await request
                .get("/api/v1/accounts")
                .set("Cookie", global.cookie);
            expect(response.status).toBe(200);
        });
    });

    // get account details
    describe("get account detaiuls", () => {
        it("should get account details", async () => {
            const response = await request
                .get("/api/v1/accounts/" + data.existID)
                .set("Cookie", global.cookie);
            expect(response.status).toBe(200);
        });

        it("should return 404 due to account not found", async () => {
            const response = await request
                .get("/api/v1/accounts/" + data.notExistID)
                .set("Cookie", global.cookie);
            expect(response.status).toBe(404);
        });

        it("should return 400 due to invalid id", async () => {
            const response = await request
                .get("/api/v1/accounts/" + data.invalidID)
                .set("Cookie", global.cookie);
            expect(response.status).toBe(400);
        });
    });

    // create account
    describe("create account", () => {
        it("should create account", async () => {
            const response = await request
                .post("/api/v1/accounts")
                .set("Cookie", global.cookie)
                .send(data.validAccountData);
            expect(response.status).toBe(201);
        });

        it("should return 400 due to invalid account data", async () => {
            const response = await request
                .post("/api/v1/accounts")
                .set("Cookie", global.cookie)
                .send(data.invalidAccountData);
            expect(response.status).toBe(400);
        });
    });
});
