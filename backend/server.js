const express = require('express');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
require('dotenv').config();

// 🕒 SERVER TIMER: Auto-submission worker
console.log('🕒 [SERVER_TIMER] Loading auto-submission worker...');
require('./services/autoSubmissionWorker');
console.log('✅ [SERVER_TIMER] Auto-submission worker loaded - checking every 60 seconds');

// Import routes
const studentRoutes = require('./routes/studentRoutes');
const authRoutes = require('./routes/authRoutes');
const questionRoutes = require('./routes/questionRoutes');
const testRoutes = require('./routes/testRoutes');
const attemptRoutes = require('./routes/attemptRoutes');
const memoryRoutes = require('./routes/memoryRoutes');
const pyqRoutes = require('./routes/pyqRoutes');
const chapterwiseRoutes = require('./routes/chapterwiseRoutes');
const leaderboardRoutes = require('./routes/leaderboardRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');
const adminRoutes = require('./routes/adminRoutes');
const dppRoutes=require('./routes/dppRoutes')
const rankRoutes=require('./routes/rankRanges')

// Import middleware
const errorHandler = require('./middleware/errorHandler');
const connectDB = require('./config/database');

// Initialize app
const app = express();

// Connect to database
connectDB();

// Middleware
app.use(helmet()); // Security headers
app.use(
    cors({
        origin:process.env.CLIENT_BASE_URL,
        methods: ['GET', 'POST','DELETE','PUT'],
        allowedHeaders:[
            "Content-Type",
            "Authorization",
            'Cache-Control',
            'Expires',
            'Pragma'
        ],
        credentials: true
    })
);

app.use(morgan('dev')); // Logging
app.use(express.json({ limit: '10mb' })); // Body parser
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser()); // Cookie parser



// Create a Nodemailer transporter using Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail', // Automatically sets host and port for Gmail[citation:4]
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

// Test the transporter configuration on server start
transporter.verify((error, success) => {
  if (error) {
    console.error('SMTP connection error:', error);
  } else {
    console.log('✅ Server is ready to send emails');
  }
});

// API endpoint to handle form submission
app.post('/api/send-contact', async (req, res) => {
  try {
    console.log("i am here")
    const { fullName, email, subject, message } = req.body;
     console.log(fullName, email, subject, message);
    // Basic validation
    if (!fullName || !email) {
      return res.status(400).json({ error: 'Full Name and Email are required.' });
    }

    // Configure the email to be sent
    const mailOptions = {
      from: `"MedDestiny Contact Form" <${process.env.GMAIL_USER}>`, // Sender name and address
      to: process.env.GMAIL_USER, // Send email to yourself
      replyTo: email, // Replies will go to the person who filled the form
      subject: `MedDestiny Contact: ${subject || 'No Subject'}`,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Full Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject || 'Not specified'}</p>
        <p><strong>Message:</strong></p>
        <p>${message || 'No message provided'}</p>
      `,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log('📧 Email sent:', info.messageId);
    res.status(200).json({ message: 'Message sent successfully!' });

  } catch (error) {
    console.error('❌ Error sending email:', error);
    res.status(500).json({ error: 'Failed to send message. Please try again.' });
  }
});


// 🕒 SERVER TIMER: API logging for test routes only
app.use('/api/tests', (req, res, next) => {
  console.log(`🕒 [SERVER_TIMER] ${req.method} ${req.originalUrl}`, {
    timestamp: new Date().toISOString(),
    body: req.body ? 'Has body' : 'No body'
  });
  next();
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/rankranges', rankRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/tests', testRoutes);
app.use('/api/attempts', attemptRoutes);
app.use('/api/memories', memoryRoutes);
app.use('/api/pyq', pyqRoutes);
app.use('/api/chapterwise', chapterwiseRoutes);
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/dpp', dppRoutes);
app.use('/api/students', studentRoutes);

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Root route
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'NEET Preparation Platform API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      questions: '/api/questions',
      tests: '/api/tests',
      attempts: '/api/attempts',
      memories: '/api/memories',
      pyq: '/api/pyq',
      chapterwise: '/api/chapterwise',
      leaderboard: '/api/leaderboard',
      analytics: '/api/analytics',
      admin: '/api/admin'
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Error handler middleware (must be last)
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════════════╗
║                                                       ║
║   🎓 NEET PREPARATION PLATFORM API                   ║
║                                                       ║
║   Server running in ${process.env.NODE_ENV || 'development'} mode              ║
║   Port: ${PORT}                                      ║
║   URL: http://localhost:${PORT}                      ║
║                                                       ║
║   🕒 SERVER TIMER: Auto-submission active ✅         ║
║                                                       ║
╚═══════════════════════════════════════════════════════╝
  `);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('❌ [SERVER_TIMER] Unhandled Promise Rejection:', err);
  server.close(() => process.exit(1));
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('❌ [SERVER_TIMER] Uncaught Exception:', err);
  process.exit(1);
});

module.exports = app;