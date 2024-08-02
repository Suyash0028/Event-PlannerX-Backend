// routes/userRoutes.js
const express = require('express');
const { registerUser, loginUser, updateUserProfile, getUserById, updateUserById, deleteUserById, getAllUsers } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/profile', authMiddleware, updateUserProfile);
router.get('/me', authMiddleware, async (req, res) => {
    res.send(req.user);
});
router.get('/',authMiddleware, getAllUsers);
router.get('/:id', authMiddleware, getUserById)
router.put('/:id',authMiddleware, updateUserById)
router.delete('/:id',authMiddleware, deleteUserById);

module.exports = router;
