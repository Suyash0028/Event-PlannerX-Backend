// routes/eventRoutes.js
const express = require('express');
const Event = require('../models/Event');
const { getEvents, createEvent, updateEvent, deleteEvent, getEventById, getMyEvents } = require('../controllers/eventController');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', getEvents);
router.post('/', authMiddleware, createEvent);
router.put('/:id', authMiddleware, updateEvent);
router.delete('/:id', authMiddleware, deleteEvent);
router.get('/myevents', authMiddleware, getMyEvents );
router.get('/:id',authMiddleware, getEventById);

module.exports = router;
