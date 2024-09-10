const service = require('../services/auth.service');

const login = async (req, res) => {
  try {
    const body = req.body;
    const user_agent = req.headers['user-agent'];
    const data = await service.validateUser(body, user_agent);
    if (!data) {
      return res.status(400).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    if (data.is_need_otp) {
      return res.json({
        success: true,
        message: 'OTP sent successfully',
        is_need_otp: data.is_need_otp,
      });
    }

    service.setToken(data.user, res);
    return res.json({
      success: true,
      message: 'User logged in successfully',
      is_need_otp: data.is_need_otp,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'Something went wrong',
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
      message: 'User registered successfully',
      data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'Something went wrong',
    });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const body = req.body;
    const data = await service.validateOTP(body);
    if (!data) {
      return res.status(400).json({
        success: false,
        message: 'OTP does not match',
      });
    }

    service.setToken(data, res);
    return res.json({
      success: true,
      message: 'OTP verified successfully',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'Something went wrong',
    });
  }
};

const logout = async (req, res) => {
  try {
    service.clearToken(res);
    return res.json({
      success: true,
      message: 'User logged out successfully',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Something went wrong',
    });
  }
};

module.exports = {
  login,
  logout,
  register,
  verifyOtp,
};
