const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');



dotenv.config();
const app = express();

app.use('/api/auth', authRoutes);

app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connecteds'))
  .catch(err => console.log(err));

app.get('/api/test', (req, res) => res.send('Backend is running!'));

const PORT = process.env.PORT || 6900;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));