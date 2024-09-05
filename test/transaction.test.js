const { request } = require("./jest.setup");

// customize this data based on your database
const data = {
    existID: 3,
    notExistID: 100,
    invalidID: "string",
    validTransactionData: {
        source_account_id: 1,
        destination_account_id: 3,
        amount: "10",
    },
    invalidTransactionData: {
        source_account_id: 1,
        destination_account_id: 3,
        amount: "9999999999",
    },
};

describe("Transaction service", () => {
    // get all transactions
    describe("get all transactions", () => {
        it("should get all transactions", async () => {
            const response = await request
                .get("/api/v1/transactions")
                .set("Cookie", global.cookie);
            expect(response.status).toBe(200);
        });
    });

    // get transaction details
    describe("get transaction detaiuls", () => {
        it("should get transaction details", async () => {
            const response = await request
                .get("/api/v1/transactions/" + data.existID)
                .set("Cookie", global.cookie);
            expect(response.status).toBe(200);
        });

        it("should return 404 due to transaction not found", async () => {
            const response = await request
                .get("/api/v1/transactions/" + data.notExistID)
                .set("Cookie", global.cookie);
            expect(response.status).toBe(404);
        });

        it("should return 400 due to invalid id", async () => {
            const response = await request
                .get("/api/v1/transactions/" + data.invalidID)
                .set("Cookie", global.cookie);
            expect(response.status).toBe(400);
        });
    });

    // create transaction
    describe("create transaction", () => {
        it("should create transaction", async () => {
            const response = await request
                .post("/api/v1/transactions")
                .set("Cookie", global.cookie)
                .send(data.validTransactionData);
            expect(response.status).toBe(201);
        });

        it("should return 400 due to invalid transaction data", async () => {
            const response = await request
                .post("/api/v1/transactions")
                .set("Cookie", global.cookie)
                .send(data.invalidTransactionData);
            expect(response.status).toBe(400);
        });
    });
});
