const service = require("../services/auth.service");

const login = async (req, res) => {
    try {
        const body = req.body;
        const data = await service.validateUser(body);
        if (!data) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials",
            });
        }

        service.setToken(data, res);
        return res.json({
            success: true,
            message: "User logged in successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
};

const register = async (req, res) => {
    try {
        const body = req.body;
        const { valid, message } = await service.validateInput(body);
        if (!valid) {
            return res.status(400).json({
                success: false,
                message,
            });
        }

        const data = await service.createUser(body);
        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            data,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
};

const logout = async (req, res) => {
    try {
        service.clearToken(res);
        return res.json({
            success: true,
            message: "User logged out successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
};

module.exports = {
    login,
    logout,
    register,
};
