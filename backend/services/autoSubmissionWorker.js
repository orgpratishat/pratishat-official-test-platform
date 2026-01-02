const Test = require('../models/Test');
const Attempt = require('../models/Attempt');
const Question = require('../models/Question');

const handleAutoSubmission = async (testId, userId) => {
  try {
    const test = await Test.findById(testId);
    const userSession = test.testSessions.find(
      session => session.user.toString() === userId && session.status === 'active'
    );

    if (!userSession || userSession.status !== 'active') return;

    console.log(`🕒 Auto-submitting test ${testId} for user ${userId}`);

    // Mark session as auto-submitted
    userSession.status = 'auto-submitted';
    
    // Get question details for submission
    const questionDetails = await Question.find({ _id: { $in: test.questions } });
    
    // Format responses from last saved answers
    const formattedResponses = Object.entries(userSession.lastSavedAnswers || {}).map(([questionId, selectedOption]) => {
      return {
        questionId,
        selectedOption,
        timeSpent: 0, // You can calculate this if you track per-question time
        isMarkedForReview: false
      };
    });

    // Calculate total time spent
    const totalTimeSpent = Math.floor(
      (userSession.endTime - userSession.startTime) / 1000
    );

    // Create submission data
    const submissionData = {
      attemptType: test.type,
      testId,
      responses: formattedResponses,
      totalTimeSpent,
      questions: test.questions
    };

    // Submit the attempt (you'll need to adapt this to your submission logic)
    const attempt = new Attempt({
      user: userId,
      attemptType: test.type,
      test: testId,
      questions: test.questions,
      responses: formattedResponses,
      score: {
        totalMarks: test.markingScheme.totalMarks,
        obtainedMarks: 0, // Calculate this based on answers
        correctAnswers: 0,
        wrongAnswers: 0,
        unattempted: test.questions.length - formattedResponses.length,
        accuracy: 0
      },
      totalTimeSpent,
      attemptNumber: 1,
      isFirstAttempt: true,
      completedAt: new Date()
    });

    await attempt.save();
    await test.save();

    console.log(`✅ Auto-submission completed for user ${userId}`);
    return attempt;
  } catch (error) {
    console.error('❌ Auto-submission error:', error);
  }
};

exports.checkExpiredTests = async () => {
  try {
    const now = new Date();
    
    // Find all tests with active sessions that have expired
    const tests = await Test.find({
      'testSessions.status': 'active',
      'testSessions.endTime': { $lt: now }
    }).populate('questions');

    console.log(`🔍 Checking ${tests.length} tests for expired sessions...`);

    for (const test of tests) {
      for (const session of test.testSessions) {
        if (session.status === 'active' && session.endTime < now) {
          console.log(`⏰ Time expired for user ${session.user} in test ${test._id}`);
          await handleAutoSubmission(test._id, session.user);
        }
      }
    }
  } catch (error) {
    console.error('Auto-submission worker error:', error);
  }
};

// Run this every minute
setInterval(exports.checkExpiredTests, 60000);

// Also run immediately on server start
exports.checkExpiredTests();