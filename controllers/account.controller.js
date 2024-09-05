const service = require("../services/account.service");

const createAccount = async (req, res) => {
    try {
        const body = req.body;
        const { valid, message } = await service.validateInput(body);
        if (!valid) {
            return res.status(400).json({
                success: false,
                message,
            });
        }

        const data = await service.createAccount(body);
        return res.status(201).json({
            success: true,
            message: "Account created successfully",
            data,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
};

const getAccounts = async (req, res) => {
    try {
        const data = await service.getAccounts();
        return res.json({
            success: true,
            message: "Accounts fetched successfully",
            data,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
};

const getAccount = async (req, res) => {
    const id = Number(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({
            success: false,
            message: "Id should be a number",
        });
    }
    try {
        const data = await service.getAccount(id);
        if (data) {
            return res.json({
                success: true,
                message: "Acoount fetched successfully",
                data,
            });
        }
        return res.status(404).json({
            success: false,
            message: "Acoount not found",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
};

module.exports = {
    createAccount,
    getAccounts,
    getAccount,
};
