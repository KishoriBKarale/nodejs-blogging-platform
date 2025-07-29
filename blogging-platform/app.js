require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const postRoutes = require('./routes/posts');
const commentRoutes = require('./routes/comments');
const categoryRoutes = require('./routes/categories');

// Error Handler
const errorHandler = require('./middleware/errorHandler');

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/posts', commentRoutes); // /:postId/comments inside this
app.use('/api/categories', categoryRoutes);

// Error handler (must be last)
app.use(errorHandler);

// DB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => app.listen(process.env.PORT, () => {
        console.log(`Server running on port ${process.env.PORT}`);
    }))
    .catch(err => console.error('DB connection error:', err));
