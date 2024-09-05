const prisma = require("../utils/prisma");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createUser, validateInput } = require("./user.service");

// validate credentials
const validateUser = async (body) => {
    const user = await prisma.users.findFirst({
        where: {
            email: body.email,
        },
    });

    if (user && bcrypt.compareSync(body.password, user.password)) {
        return user;
    }

    return null;
};

// generate and set JSON web token
const setToken = (user, res) => {
    token = jwt.sign(
        {
            id: user.id,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );

    res.cookie("token", token, {
        httpOnly: true,
    });
};

// clear JSON web token
const clearToken = (res) => {
    res.clearCookie("token");
};

module.exports = {
    validateUser,
    setToken,
    clearToken,
    createUser,
    validateInput,
};
