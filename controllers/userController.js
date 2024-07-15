// controllers/userController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = new User({ username, email, password });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const token = jwt.sign({ id: user._id }, 'secretKey', { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateUserProfile = async (req, res) => {
    const { name, email } = req.body;
    console.log(req.user.id);
    let profilePic = req.body.profilePic; // Assuming profilePic is sent as a URL or base64 data

    try {
        const user = await User.findById(req.user.id);
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.name = name || user.name;
        user.email = email || user.email;

        if (profilePic) {
            user.profilePic = profilePic;
        }

        await user.save();

        res.status(200).json({ message: 'Profile updated successfully', user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { registerUser, loginUser, updateUserProfile };
