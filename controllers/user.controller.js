const service = require("../services/user.service");

const createUser = async (req, res) => {
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
            message: "User created successfully",
            data,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
};

const getUsers = async (req, res) => {
    try {
        const data = await service.getUsers();
        return res.json({
            success: true,
            message: "Users fetched successfully",
            data,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
};

const getUser = async (req, res) => {
    const id = Number(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({
            success: false,
            message: "Id should be a number",
        });
    }
    try {
        const data = await service.getUser(id);
        if (data) {
            return res.json({
                success: true,
                message: "User fetched successfully",
                data,
            });
        }
        return res.status(404).json({
            success: false,
            message: "User not found",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
};

module.exports = {
    createUser,
    getUsers,
    getUser,
};
