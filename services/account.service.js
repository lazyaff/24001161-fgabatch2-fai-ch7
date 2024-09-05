const prisma = require("../utils/prisma");
const validator = require("validator");

// create account
const createAccount = async (body) => {
    const account = await prisma.bank_accounts.create({
        data: {
            bank_name: body.bank_name,
            bank_account_number: body.bank_account_number,
            balance: Number(body.balance),
            user_id: body.user_id,
        },
    });
    return account;
};

// get all accounts
const getAccounts = async () => {
    const data = await prisma.bank_accounts.findMany();
    return data;
};

// get account detail
const getAccount = async (id) => {
    const data = await prisma.bank_accounts.findFirst({
        where: {
            id,
        },
        select: {
            id: true,
            bank_name: true,
            bank_account_number: true,
            balance: true,
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
        },
    });
    return data;
};

// validate input
const validateInput = async (body) => {
    if (!body.bank_name) {
        return {
            valid: false,
            message: "Bank name is required",
        };
    }

    if (!body.balance) {
        return {
            valid: false,
            message: "Balance is required",
        };
    }

    if (!validator.isNumeric(body.balance)) {
        return {
            valid: false,
            message: "Balance should be a number",
        };
    }

    if (!body.bank_account_number) {
        return {
            valid: false,
            message: "Bank account number is required",
        };
    }

    if (!validator.isNumeric(body.bank_account_number)) {
        return {
            valid: false,
            message: "Bank account number should be a number",
        };
    }

    const account = await prisma.bank_accounts.findFirst({
        where: {
            bank_account_number: body.bank_account_number,
        },
    });
    if (account) {
        return {
            valid: false,
            message: "Bank account number already exists",
        };
    }

    if (!body.user_id) {
        return {
            valid: false,
            message: "User id is required",
        };
    }

    const user = await prisma.users.findFirst({
        where: {
            id: body.user_id,
        },
    });
    if (!user) {
        return {
            valid: false,
            message: "User not found",
        };
    }

    return {
        valid: true,
        message: "",
    };
};

module.exports = {
    createAccount,
    getAccounts,
    getAccount,
    validateInput,
};
