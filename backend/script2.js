
// scripts/migrateChapters.js
const mongoose = require('mongoose');
const Question =require('../backend/models/Question')

const migrateChapters = async () => {
  try {
    await mongoose.connect('mongodb+srv://dev_db_user:preIuI4n0b46cyQN@cluster0.aticxv7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
    
    // Get all questions with single chapter
    const questions = await Question.find({});
    
    let updatedCount = 0;
    
    for (const question of questions) {
      // Convert single chapter to chapters array
      if (question.chapter && !question.chapters) {
        question.chapters = [question.chapter];
        await question.save();
        updatedCount++;
        console.log(`Updated question: ${question._id}`);
      }
    }
    
    console.log(`Migration completed. Updated ${updatedCount} questions.`);
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
};

migrateChapters();