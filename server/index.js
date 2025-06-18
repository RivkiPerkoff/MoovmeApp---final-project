require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('✅ Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
  });
})
.catch(err => {
  console.error('❌ MongoDB connection error:', err);

  app.listen(PORT, () => {
    console.log(`⚠️ Server is listening on port ${PORT} without DB`);
  });
});

require('./models/User');
require('./models/Ride');
require('./models/Request');
require('./models/Notification');

const userRoutes = require('./routes/users');
const rideRoutes = require('./routes/rides');
const requestRoutes = require('./routes/requests');
const notificationRoutes = require('./routes/notifications');
const authRoutes = require('./routes/auth');

app.use('/api/users', userRoutes);
app.use('/api/rides', rideRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('🚗 Ride Sharing API is running!');
});
