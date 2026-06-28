const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err.message));

app.use('/api/books', require('./routes/bookRoutes'));
app.use('/api/members', require('./routes/memberRoutes'));
app.use('/api/transactions', require('./routes/transactionRoutes'));

app.get('/', (req, res) => res.send('Library Management API is running'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
