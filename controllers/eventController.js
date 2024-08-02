// controllers/eventController.js
const Event = require('../models/Event');
const mongoose = require('mongoose');

const getEvents = async (req, res) => {
  try {
    const events = await Event.find().populate('organizer', 'username');
    res.json(events);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createEvent = async (req, res) => {
  const { title, description, date, time, location, price, capacity, isPrivate } = req.body;
  try {
    const event = new Event({
      title,
      description,
      date,
      time,
      location,
      price,
      capacity,
      organizer: req.user.id,
      isPrivate,
    });
    await event.save();
    res.status(201).json({ message: 'Event created successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateEvent = async (req, res) => {
  const { id } = req.params;
  try {
    const event = await Event.findByIdAndUpdate(id, req.body, { new: true });
    res.json(event);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteEvent = async (req, res) => {
  const { id } = req.params;
  try {
    await Event.findByIdAndDelete(id);
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getEventById = async (req, res) => {
  try {
      const eventId = req.params.id;

      if (!mongoose.Types.ObjectId.isValid(eventId)) {
          return res.status(400).json({ message: 'Invalid event ID' });
      }

      const event = await Event.findById(eventId).populate('organizer', 'username');

      if (!event) {
          return res.status(404).json({ message: 'Event not found' });
      }

      res.json(event);
  } catch (error) {
      console.error('Error fetching event:', error);
      res.status(500).json({ message: 'Server error' });
  }
};

const getMyEvents = async (req, res) => {
  try {
      const userId = req.user._id;
      if (!userId) {
          return res.status(400).json({ message: 'User not authenticated' });
      }

      const events = await Event.find({ organizer: userId }).populate('organizer', 'username');
      res.json(events);
  } catch (error) {
      res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getEvents, createEvent, updateEvent, deleteEvent, getEventById, getMyEvents };
