const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const cors = require('cors');
const cookieParser = require('cookie-parser');

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(cookieParser());

app.use('/', authRoutes);


// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)  // Corrected variable name
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.get('/', (req, res) => res.send('Backend is running!'));

const PORT = process.env.PORT || 6900;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
