// routes/userRoutes.js
const express = require('express');
const { registerUser, loginUser, updateUserProfile } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/profile', authMiddleware, updateUserProfile);
router.get('/me', authMiddleware, async (req, res) => {
    res.send(req.user);
});

module.exports = router;
