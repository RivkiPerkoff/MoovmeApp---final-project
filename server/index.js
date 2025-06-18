require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// 1. Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('✅ Connected to MongoDB');

  // Start server only after DB connection
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
  });
})
.catch(err => {
  console.error('❌ MongoDB connection error:', err);

  // Even if DB fails, still start the server so Render detects the port
  app.listen(PORT, () => {
    console.log(`⚠️ Server is listening on port ${PORT} without DB`);
  });
});

// 2. Load all models
require('./models/User');
require('./models/Ride');
require('./models/Request');
require('./models/Payment');
require('./models/Notification');
require('./models/Review');
require('./models/Message');
require('./models/Report');

// 3. Load all routes
const userRoutes = require('./routes/users');
const rideRoutes = require('./routes/rides');
const requestRoutes = require('./routes/requests');
const paymentRoutes = require('./routes/payments');
const notificationRoutes = require('./routes/notifications');
const reviewRoutes = require('./routes/reviews');
const messageRoutes = require('./routes/messages');
const reportRoutes = require('./routes/reports');
const authRoutes = require('./routes/auth');

// 4. Use routes
app.use('/api/users', userRoutes);
app.use('/api/rides', rideRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/auth', authRoutes);

// 5. Root route
app.get('/', (req, res) => {
  res.send('🚗 Ride Sharing API is running!');
});
