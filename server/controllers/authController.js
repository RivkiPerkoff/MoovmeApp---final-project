const { registerUserService, loginUserService } = require('../services/authService');

const registerUser = async (req, res) => {
  try {
    const result = await registerUserService(req.body);
    res.status(201).json(result);
  } catch (err) {
    console.error('Error in registerUser:', err);
    res.status(500).json({ message: err.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const result = await loginUserService(req.body);
    res.json(result);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
