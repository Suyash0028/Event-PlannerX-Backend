// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();
const app = express();
app.use(cors());
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.DB_URL, { useUnifiedTopology: true });

// Routes
const userRoutes = require('./routes/userRoutes');
const eventRoutes = require('./routes/eventRoutes');

app.get("/", (req, res) => {
    res.status(200).send("Hello I am Up!");
});

app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
