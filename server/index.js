require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
// app.use(cors({
//   origin: 'http://localhost:3000',
// }));
app.use(cors());

app.use(express.json());

// 1. Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
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
.catch(err => console.error('❌ MongoDB connection error:', err));

// 2. Load all models
require('./models/user');
require('./models/Ride');
require('./models/Request');
require('./models/Notification');

// 3. Load all routes
const userRoutes = require('./routes/users');
const rideRoutes = require('./routes/rides');
const requestRoutes = require('./routes/requests');
const notificationRoutes = require('./routes/notifications');
const authRoutes = require('./routes/auth');


// 4. Use routes
app.use('/api/users', userRoutes);
app.use('/api/rides', rideRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/auth', authRoutes);


// 5. Root route
app.get('/', (req, res) => {
  res.send('🚗 Ride Sharing API is running!');
});

