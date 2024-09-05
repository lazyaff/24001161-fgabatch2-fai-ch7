const service = require("../services/transaction.service");

const createTransaction = async (req, res) => {
    try {
        const body = req.body;
        const { valid, message } = await service.validateInput(body);
        if (!valid) {
            return res.status(400).json({
                success: false,
                message,
            });
        }

        const data = await service.createTransaction(body);
        return res.status(201).json({
            success: true,
            message: "Transaction created successfully",
            data,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
};

const getTransactions = async (req, res) => {
    try {
        const data = await service.getTransactions();
        return res.json({
            success: true,
            message: "Transactions fetched successfully",
            data,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
};

const getTransaction = async (req, res) => {
    const id = Number(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({
            success: false,
            message: "Id should be a number",
        });
    }
    try {
        const data = await service.getTransaction(id);
        if (data) {
            return res.json({
                success: true,
                message: "Transaction fetched successfully",
                data,
            });
        }
        return res.status(404).json({
            success: false,
            message: "Transaction not found",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
};

module.exports = {
    createTransaction,
    getTransactions,
    getTransaction,
};
