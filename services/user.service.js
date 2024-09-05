const prisma = require("../utils/prisma");
const validator = require("validator");
const bcrypt = require("bcrypt");

// create user
const createUser = async (body) => {
    const user = await prisma.users.create({
        data: {
            name: body.name,
            email: body.email,
            password: bcrypt.hashSync(body.password, 10),
        },
    });

    const profile = await prisma.profiles.create({
        data: {
            user_id: user.id,
            address: body.address,
            identity_number: body.identity_number,
            identity_type: body.identity_type,
        },
    });

    delete user.password;

    return { user, profile };
};

// get all users
const getUsers = async () => {
    const data = await prisma.users.findMany({
        select: {
            id: true,
            name: true,
            email: true,
        },
    });
    return data;
};

// get user detail
const getUser = async (id) => {
    const data = await prisma.users.findFirst({
        where: {
            id,
        },
        select: {
            id: true,
            name: true,
            email: true,
            profile: {
                select: {
                    address: true,
                    identity_number: true,
                    identity_type: true,
                },
            },
        },
    });
    return data;
};

// validate input
const validateInput = async (body) => {
    if (!body.name) {
        return {
            valid: false,
            message: "Name is required",
        };
    }

    if (!validator.isEmail(body.email)) {
        return {
            valid: false,
            message: "Email is invalid",
        };
    }

    if (!body.password) {
        return {
            valid: false,
            message: "Password is required",
        };
    }

    if (!validator.isStrongPassword(body.password)) {
        return {
            valid: false,
            message: "Password is not strong enough",
        };
    }

    if (!body.address) {
        return {
            valid: false,
            message: "Address is required",
        };
    }

    if (!body.identity_number) {
        return {
            valid: false,
            message: "Identity number is required",
        };
    }

    if (!body.identity_type) {
        return {
            valid: false,
            message: "Identity type is required",
        };
    }

    if (!body.email) {
        return {
            valid: false,
            message: "Email is required",
        };
    }

    const user = await prisma.users.findFirst({
        where: {
            email: body.email,
        },
    });
    if (user) {
        return {
            valid: false,
            message: "Email already exists",
        };
    }

    return {
        valid: true,
        message: "",
    };
};

module.exports = {
    createUser,
    getUsers,
    getUser,
    validateInput,
};
