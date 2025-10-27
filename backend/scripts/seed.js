const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('../models/User');
const Question = require('../models/Question');
const Test = require('../models/Test');
const PYQ = require('../models/PYQ');
const RankRange = require('../models/RankRange');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected');
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await User.deleteMany({});
    await Question.deleteMany({});
    await Test.deleteMany({});
    await PYQ.deleteMany({});
    await RankRange.deleteMany({});

    // Create admin user
    console.log('👨‍💼 Creating admin user...');
    const adminPassword = await bcrypt.hash('admin123', 10);
    const admin = await User.create({
      username: 'admin',
      email: 'admin@neetplatform.com',
      password: adminPassword,
      role: 'admin',
      profile: {
        fullName: 'Admin User'
      }
    });

    // Create test user
    console.log('👤 Creating test user...');
    const userPassword = await bcrypt.hash('user123', 10);
    const user = await User.create({
      username: 'testuser',
      email: 'user@neetplatform.com',
      password: userPassword,
      role: 'user',
      profile: {
        fullName: 'Test User'
      }
    });

    // Create sample questions
    console.log('📝 Creating sample questions...');
    const questions = [
      {
        subject: 'Physics',
        chapter: 'Mechanics',
        topic: 'Laws of Motion',
        difficulty: 'Medium',
        questionText: 'A body of mass 5 kg is acted upon by two forces, each of magnitude 10 N. What is the maximum acceleration?',
        options: [
          { optionText: '2 m/s²', isCorrect: false },
          { optionText: '4 m/s²', isCorrect: true },
          { optionText: '6 m/s²', isCorrect: false },
          { optionText: '8 m/s²', isCorrect: false }
        ],
        hint: {
          text: 'Use Newton\'s second law: F = ma. Maximum force occurs when forces act in same direction.'
        },
        approach: {
          text: 'Calculate net force when both forces act in same direction, then divide by mass.'
        },
        solution: [
          {
            stepNumber: 1,
            stepText: 'Net force = 10 + 10 = 20 N (when forces act in same direction)'
          },
          {
            stepNumber: 2,
            stepText: 'Using F = ma, acceleration = F/m = 20/5 = 4 m/s²'
          }
        ],
        year: 2023
      },
      {
        subject: 'Chemistry',
        chapter: 'Chemical Bonding',
        topic: 'Ionic Bonding',
        difficulty: 'Easy',
        questionText: 'Which of the following has the highest ionic character?',
        options: [
          { optionText: 'HF', isCorrect: false },
          { optionText: 'HCl', isCorrect: false },
          { optionText: 'HBr', isCorrect: false },
          { optionText: 'HI', isCorrect: false },
          { optionText: 'NaF', isCorrect: true }
        ],
        hint: {
          text: 'Ionic character increases with electronegativity difference.'
        },
        year: 2023
      },
      {
        subject: 'Biology',
        chapter: 'Cell Biology',
        topic: 'Cell Structure',
        difficulty: 'Medium',
        questionText: 'Which organelle is known as the powerhouse of the cell?',
        options: [
          { optionText: 'Nucleus', isCorrect: false },
          { optionText: 'Mitochondria', isCorrect: true },
          { optionText: 'Ribosome', isCorrect: false },
          { optionText: 'Endoplasmic Reticulum', isCorrect: false }
        ],
        hint: {
          text: 'This organelle produces ATP through cellular respiration.'
        },
        solution: [
          {
            stepNumber: 1,
            stepText: 'Mitochondria are responsible for producing ATP (energy) through cellular respiration.'
          }
        ],
        year: 2023
      }
    ];

    const createdQuestions = await Question.insertMany(questions);
    console.log(`✅ Created ${createdQuestions.length} questions`);

    // Create sample test
    console.log('📋 Creating sample test...');
    const test = await Test.create({
      name: 'Sample NEET Mock Test 1',
      type: 'NEET_MOCK',
      scheduledDate: new Date(Date.now() + 86400000), // Tomorrow
      startTime: new Date(Date.now() + 86400000),
      endTime: new Date(Date.now() + 86400000 + 10800000), // 3 hours later
      duration: 180,
      questions: createdQuestions.map(q => q._id),
      markingScheme: {
        totalMarks: 720,
        positiveMarks: 4,
        negativeMarks: -1
      },
      isActive: true
    });
    console.log('✅ Created sample test');

    // Create sample PYQ
    console.log('📚 Creating sample PYQ...');
    const pyq = await PYQ.create({
      year: 2023,
      examName: 'NEET',
      questions: createdQuestions.filter(q => q.year === 2023).map(q => q._id),
      totalMarks: 720,
      duration: 180,
      markingScheme: {
        positiveMarks: 4,
        negativeMarks: -1
      }
    });
    console.log('✅ Created sample PYQ');

    // Create sample rank ranges
    console.log('🎯 Creating sample rank ranges...');
    const rankRanges = [
      {
        year: 2023,
        marksRangeStart: 700,
        marksRangeEnd: 720,
        rankRangeStart: 1,
        rankRangeEnd: 100,
        category: 'General'
      },
      {
        year: 2023,
        marksRangeStart: 650,
        marksRangeEnd: 699,
        rankRangeStart: 101,
        rankRangeEnd: 1000,
        category: 'General'
      },
      {
        year: 2023,
        marksRangeStart: 600,
        marksRangeEnd: 649,
        rankRangeStart: 1001,
        rankRangeEnd: 5000,
        category: 'General'
      },
      {
        year: 2023,
        marksRangeStart: 550,
        marksRangeEnd: 599,
        rankRangeStart: 5001,
        rankRangeEnd: 15000,
        category: 'General'
      }
    ];

    await RankRange.insertMany(rankRanges);
    console.log(`✅ Created ${rankRanges.length} rank ranges`);

    console.log(`
╔═══════════════════════════════════════════════════════╗
║                                                       ║
║   ✅ DATABASE SEEDING COMPLETED                      ║
║                                                       ║
║   Admin Login:                                        ║
║   Email: admin@neetplatform.com                      ║
║   Password: admin123                                  ║
║                                                       ║
║   Test User Login:                                    ║
║   Email: user@neetplatform.com                       ║
║   Password: user123                                   ║
║                                                       ║
╚═══════════════════════════════════════════════════════╝
    `);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

// Run seeding
connectDB().then(() => seedData());
