const prisma = require("../utils/prisma");
const validator = require("validator");

// create transaction
const createTransaction = async (body) => {
    const transaction = await prisma.transactions.create({
        data: {
            amount: Number(body.amount),
            source_account_id: body.source_account_id,
            destination_account_id: body.destination_account_id,
        },
    });

    await prisma.bank_accounts.update({
        where: {
            id: body.source_account_id,
        },
        data: {
            balance: {
                decrement: Number(body.amount),
            },
        },
    });

    await prisma.bank_accounts.update({
        where: {
            id: body.destination_account_id,
        },
        data: {
            balance: {
                increment: Number(body.amount),
            },
        },
    });

    return transaction;
};

// get all transactions
const getTransactions = async () => {
    const data = await prisma.transactions.findMany();
    return data;
};

// get transaction detail
const getTransaction = async (id) => {
    const data = await prisma.transactions.findFirst({
        where: {
            id,
        },
        select: {
            id: true,
            amount: true,
            source_account: {
                select: {
                    id: true,
                    bank_name: true,
                    bank_account_number: true,
                },
            },
            destination_account: {
                select: {
                    id: true,
                    bank_name: true,
                    bank_account_number: true,
                },
            },
        },
    });
    return data;
};

// validate input
const validateInput = async (body) => {
    if (!body.source_account_id) {
        return {
            valid: false,
            message: "Source account id is required",
        };
    }

    const sourceAccount = await prisma.bank_accounts.findFirst({
        where: {
            id: body.source_account_id,
        },
    });
    if (!sourceAccount) {
        return {
            valid: false,
            message: "Source account not found",
        };
    }

    if (!body.destination_account_id) {
        return {
            valid: false,
            message: "Destination account id is required",
        };
    }

    const destinationAccount = await prisma.bank_accounts.findFirst({
        where: {
            id: body.destination_account_id,
        },
    });
    if (!destinationAccount) {
        return {
            valid: false,
            message: "Destination account not found",
        };
    }

    if (!body.amount) {
        return {
            valid: false,
            message: "Amount is required",
        };
    }

    if (!validator.isNumeric(body.amount)) {
        return {
            valid: false,
            message: "Amount should be a number",
        };
    }

    if (body.amount <= 0) {
        return {
            valid: false,
            message: "Amount should be greater than 0",
        };
    }

    if (sourceAccount.balance < body.amount) {
        return {
            valid: false,
            message: "Insufficient balance",
        };
    }

    return {
        valid: true,
        message: "",
    };
};

module.exports = {
    createTransaction,
    getTransactions,
    getTransaction,
    validateInput,
};
