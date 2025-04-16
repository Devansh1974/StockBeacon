const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const session = require('express-session');
require('./config/passport'); // Import Passport Config
const aiRoutes = require('./routes/ai');
const triviaRoutes = require('./routes/trivia.js')

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(cookieParser());
app.use('/api', aiRoutes); 

// Session Middleware (Required for Passport)
app.use(session({
  secret: process.env.JWT_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, httpOnly: true }
}));


// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/', authRoutes);

app.use('/api', triviaRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Debugging: Log session details
app.use((req, res, next) => {
  console.log("📌 Session Data:", req.session);
  console.log("📌 User Data:", req.user);
  next();
});


// Add `/users` route to get authenticated user info
app.get('/users', passport.authenticate('session', { session: true }), (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized. Please log in.' });
  }
  res.json({ user: req.user });
});


// Default Route
app.get('/', (req, res) => res.send('✅ Backend is running!'));

const PORT = process.env.PORT || 6900;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));