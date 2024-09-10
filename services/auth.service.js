const prisma = require("../utils/prisma");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const { createUser, validateInput } = require("./user.service");
const { transporter } = require("../utils/mailer");

// validate credentials
const validateUser = async (body, user_agent) => {
    const user = await prisma.users.findFirst({
        where: {
            email: body.email,
        },
    });

    if (user && bcrypt.compareSync(body.password, user.password)) {
        if (user_agent === user.user_agent && user.otp === null) {
            return { user, is_need_otp: false };
        } else {
            const otp = Math.floor(1000 + Math.random() * 9000);
            await prisma.users.update({
                where: {
                    email: user.email,
                },
                data: {
                    otp: otp.toString(),
                    user_agent: user_agent,
                },
            });
            // Send OTP to User Email
            transporter.sendMail({
                from: process.env.EMAIL,
                to: user.email,
                subject: "OTP Verification",
                text: `Your OTP is ${otp}`,
            });
            return { user, is_need_otp: true };
        }
    }

    return null;
};

// validate OTP
const validateOTP = async (body) => {
    const user = await prisma.users.findFirst({
        where: {
            email: body.email,
            otp: body.otp,
        },
    });

    if (user) {
        await prisma.users.update({
            where: {
                id: user.id,
            },
            data: {
                otp: null,
            },
        });
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

// validate email
const validateEmail = async (body) => {
    const user = await prisma.users.findFirst({
        where: {
            email: body.email,
        },
    });

    return user;
};

// send password reset token
const sendPasswordToken = async (user) => {
    const token = jwt.sign(
        {
            id: user.id,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );

    await prisma.users.update({
        where: {
            id: user.id,
        },
        data: {
            pass_token: token,
        },
    });

    // Send Password Reset Link to User Email
    transporter.sendMail({
        from: process.env.EMAIL,
        to: user.email,
        subject: "Password Reset",
        text: `Click here to reset your password: ${process.env.CLIENT_URL}/reset-password?token=${token}`,
    });
};

// validate password reset token
const checkPasswordToken = async (body) => {
    const decoded = jwt.verify(body.token, process.env.JWT_SECRET);
    const user = await prisma.users.findFirst({
        where: {
            id: decoded.id,
            pass_token: body.token,
        },
    });

    if (body.password !== body.confirm_password) {
        return null;
    } else if (!validator.isStrongPassword(body.password)) {
        return null;
    }

    if (user) {
        await prisma.users.update({
            where: {
                id: user.id,
            },
            data: {
                pass_token: null,
                password: bcrypt.hashSync(body.password, 10),
            },
        });
        return user;
    }

    return null;
};

module.exports = {
    validateUser,
    setToken,
    clearToken,
    createUser,
    validateInput,
    validateOTP,
    validateEmail,
    sendPasswordToken,
    checkPasswordToken,
};
