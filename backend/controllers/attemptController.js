const Attempt = require('../models/Attempt');
const Test = require('../models/Test');
const Question = require('../models/Question');
const Memory = require('../models/Memory');
const { calculateAnalytics } = require('../utils/analyticsCalculator');
const { predictRank } = require('../utils/rankPredictor');
const { updateLeaderboard } = require('../utils/leaderboardGenerator');

// @desc    Submit test/practice attempt
// @route   POST /api/attempts
// @access  Private\


// exports.submitAttempt = async (req, res, next) => {
//   try {
//     const { attemptType, testId, responses, totalTimeSpent, questions } = req.body;
//     const userId = req.user.id;
// console.log("reached here")
//     // Validate attempt type
//     if (!['DPP_TEST', 'NEET_MOCK', 'PYQ', 'DPP', 'CHAPTERWISE'].includes(attemptType)) {
//       return res.status(400).json({
//         success: false,
//         message: 'Invalid attempt type'
//       });
//     }

//     // Get test details if applicable
//     let test = null;
//     let markingScheme = { positiveMarks: 4, negativeMarks: -1 };

//     if (['DPP_TEST', 'NEET_MOCK'].includes(attemptType)) {
//       test = await Test.findById(testId);
//       if (!test) {
//         return res.status(404).json({
//           success: false,
//           message: 'Test not found'
//         });
//       }
//       markingScheme = test.markingScheme;
//     }

//     // Get all questions for this attempt
//     const questionIds = questions || test?.questions || [];
//     const questionDetails = await Question.find({ _id: { $in: questionIds } });

//     // Calculate attempt number
//     const previousAttempts = await Attempt.countDocuments({
//       user: userId,
//       attemptType,
//       ...(test && { test: testId })
//     });
//     const attemptNumber = previousAttempts + 1;
//     const isFirstAttempt = attemptNumber === 1;

//     // Process responses and calculate score
//     const processedResponses = [];
//     let correctAnswers = 0;
//     let wrongAnswers = 0;
//     let unattempted = 0;
//     let obtainedMarks = 0;

//     for (const response of responses) {
//       const question = questionDetails.find(q => q._id.toString() === response.questionId);
      
//       if (!question) continue;

//       const correctOptionIndex = question.options.findIndex(opt => opt.isCorrect);
//       const isCorrect = response.selectedOption === correctOptionIndex;
//       const isAttempted = response.selectedOption !== null && response.selectedOption !== undefined;

//       if (isAttempted) {
//         if (isCorrect) {
//           correctAnswers++;
//           obtainedMarks += markingScheme.positiveMarks;
//         } else {
//           wrongAnswers++;
//           obtainedMarks += markingScheme.negativeMarks;
//         }
//       } else {
//         unattempted++;
//       }

//       processedResponses.push({
//         question: response.questionId,
//         selectedOption: response.selectedOption,
//         isCorrect,
//         timeSpent: response.timeSpent || 0,
//         isMarkedForReview: response.isMarkedForReview || false
//       });

//       // Update question analytics
//       if (isAttempted) {
//         await Question.findByIdAndUpdate(question._id, {
//           $inc: { 'analytics.totalAttempts': 1 },
//           $set: {
//             'analytics.averageTime': 
//               (question.analytics.averageTime * question.analytics.totalAttempts + response.timeSpent) / 
//               (question.analytics.totalAttempts + 1),
//             'analytics.bestTime': 
//               question.analytics.bestTime === 0 || response.timeSpent < question.analytics.bestTime
//                 ? response.timeSpent
//                 : question.analytics.bestTime,
//             'analytics.worstTime': 
//               response.timeSpent > question.analytics.worstTime
//                 ? response.timeSpent
//                 : question.analytics.worstTime
//           }
//         });
//       }

//       // Add to memories if wrong answer and test type qualifies
//       if (!isCorrect && isAttempted && ['DPP_TEST', 'NEET_MOCK'].includes(attemptType)) {
//         await Memory.create({
//           user: userId,
//           question: question._id,
//           test: testId,
//           attempt: null, // Will be updated after attempt is created
//           attemptType,
//           userAnswer: response.selectedOption,
//           correctAnswer: correctOptionIndex,
//           attemptNumber
//         });
//       }
//     }

//     const totalQuestions = questionIds.length;
//     const totalMarks = test?.markingScheme?.totalMarks || totalQuestions * markingScheme.positiveMarks;
//     const accuracy = totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0;

//     // Calculate analytics
//     const analytics = await calculateAnalytics(questionDetails, processedResponses);

//     // Predict rank for NEET and PYQ
//     let predictedRank = null;
//     if (['NEET_MOCK', 'PYQ'].includes(attemptType)) {
//       predictedRank = await predictRank(obtainedMarks, new Date().getFullYear());
//     }

//     // Create attempt
//     const attempt = await Attempt.create({
//       user: userId,
//       attemptType,
//       test: testId,
//       questions: questionIds,
//       responses: processedResponses,
//       score: {
//         totalMarks,
//         obtainedMarks,
//         correctAnswers,
//         wrongAnswers,
//         unattempted,
//         accuracy
//       },
//       totalTimeSpent,
//       attemptNumber,
//       isFirstAttempt,
//       analytics,
//       predictedRank,
//       completedAt: new Date()
//     });

//     // Update memories with attempt ID
//     if (['DPP_TEST', 'NEET_MOCK'].includes(attemptType)) {
//       await Memory.updateMany(
//         { user: userId, attempt: null, attemptType, attemptNumber },
//         { attempt: attempt._id }
//       );
//     }

//     // Update leaderboard if first attempt
//     if (isFirstAttempt && ['DPP_TEST', 'NEET_MOCK'].includes(attemptType)) {
//       await updateLeaderboard(testId, userId, attempt._id, obtainedMarks, accuracy, totalTimeSpent);
//     }

//     // Populate attempt with question details
//     const populatedAttempt = await Attempt.findById(attempt._id)
//       .populate('questions')
//       .populate('user', 'username email profile');

//     res.status(201).json({
//       success: true,
//       message: 'Attempt submitted successfully',
//       attempt: populatedAttempt
//     });
//   } catch (error) {
//     next(error);
//   }
// };

exports.submitAttempt = async (req, res, next) => {
  try {
    const { attemptType, testId, responses, totalTimeSpent, questions } = req.body;
    const userId = req.user.id;

    if (!['DPP_TEST', 'NEET_MOCK', 'PYQ', 'DPP', 'CHAPTERWISE'].includes(attemptType)) {
      return res.status(400).json({ success: false, message: 'Invalid attempt type' });
    }

    let test = null;
    let markingScheme = { positiveMarks: 4, negativeMarks: -1 };

    if (['DPP_TEST', 'NEET_MOCK'].includes(attemptType)) {
      test = await Test.findById(testId);
      if (!test) return res.status(404).json({ success: false, message: 'Test not found' });
      markingScheme = test.markingScheme || markingScheme;
    }

    // Establish the question set
    const questionIds = questions && questions.length ? questions : (test?.questions || []);
    if (!questionIds.length) {
      return res.status(400).json({ success: false, message: 'No questions supplied for attempt' });
    }

    const questionDetails = await Question.find({ _id: { $in: questionIds } });

    // Attempt counters
    const previousAttempts = await Attempt.countDocuments({
      user: userId,
      attemptType,
      ...(test && { test: testId })
    });
    const attemptNumber = previousAttempts + 1;
    const isFirstAttempt = attemptNumber === 1;

    // Process responses
    const processedResponses = [];
    const memoryBuffer = []; // collect to create later
    let correctAnswers = 0;
    let wrongAnswers = 0;
    let unattempted = 0;
    let obtainedMarks = 0;

    for (const resp of responses || []) {
      const q = questionDetails.find(qq => qq._id.toString() === resp.questionId);
      if (!q) continue;

      const correctIdx = q.options.findIndex(o => o.isCorrect);
      const isAttempted = resp.selectedOption !== null && resp.selectedOption !== undefined;
      const isCorrect = isAttempted && resp.selectedOption === correctIdx;

      if (isAttempted) {
        if (isCorrect) {
          correctAnswers += 1;
          obtainedMarks += markingScheme.positiveMarks;
        } else {
          wrongAnswers += 1;
          obtainedMarks += markingScheme.negativeMarks;
        }
      } else {
        unattempted += 1;
      }

      processedResponses.push({
        question: q._id,
        selectedOption: resp.selectedOption,
        isCorrect,
        timeSpent: resp.timeSpent || 0,
        isMarkedForReview: resp.isMarkedForReview || false
      });

      // Update analytics on question only if attempted
      if (isAttempted) {
        const totalAttempts = (q.analytics?.totalAttempts || 0) + 1;
        const prevAvg = q.analytics?.averageTime || 0;
        const newAvg = ((prevAvg * (totalAttempts - 1)) + (resp.timeSpent || 0)) / totalAttempts;
        const best = q.analytics?.bestTime || 0;
        const worst = q.analytics?.worstTime || 0;
        const newBest = best === 0 || (resp.timeSpent || 0) < best ? (resp.timeSpent || 0) : best;
        const newWorst = (resp.timeSpent || 0) > worst ? (resp.timeSpent || 0) : worst;

        await Question.findByIdAndUpdate(q._id, {
          $inc: { 'analytics.totalAttempts': 1 },
          $set: {
            'analytics.averageTime': newAvg,
            'analytics.bestTime': newBest,
            'analytics.worstTime': newWorst
          }
        });
      }

      // Prepare wrong answers for memories (DPP_TEST / NEET_MOCK only)
      if (!isCorrect && isAttempted && ['DPP_TEST', 'NEET_MOCK'].includes(attemptType)) {
        memoryBuffer.push({
          user: userId,
          question: q._id,
          test: testId || null,
          attemptType,
          userAnswer: resp.selectedOption,
          correctAnswer: correctIdx,
          attemptNumber
          // attempt will be added after Attempt is created
        });
      }
    }

    const totalQuestions = questionIds.length;
    const totalMarks = test?.markingScheme?.totalMarks || (totalQuestions * markingScheme.positiveMarks);
    const accuracy = totalQuestions ? (correctAnswers / totalQuestions) * 100 : 0;

    // Calculate analytics for the attempt
    const analytics = await calculateAnalytics(questionDetails, processedResponses);

    // Predict rank only for NEET_MOCK/PYQ
    let predictedRank = null;
    if (['NEET_MOCK', 'PYQ'].includes(attemptType)) {
      predictedRank = await predictRank(obtainedMarks, new Date().getFullYear());
    }

    // Create Attempt first
    const attempt = await Attempt.create({
      user: userId,
      attemptType,
      test: testId || null,
      questions: questionIds,
      responses: processedResponses,
      score: {
        totalMarks,
        obtainedMarks,
        correctAnswers,
        wrongAnswers,
        unattempted,
        accuracy
      },
      totalTimeSpent,
      attemptNumber,
      isFirstAttempt,
      analytics,
      predictedRank,
      completedAt: new Date()
    });

    // Now create Memory docs with the attempt id (satisfies required field)
    if (memoryBuffer.length) {
      const payload = memoryBuffer.map(m => ({ ...m, attempt: attempt._id }));
      await Memory.insertMany(payload);
    }

    // Leaderboard update only for first attempt and test-based types
    if (isFirstAttempt && ['DPP_TEST', 'NEET_MOCK'].includes(attemptType) && testId) {
      await updateLeaderboard(testId, userId, attempt._id, obtainedMarks, accuracy, totalTimeSpent);
    }

    const populatedAttempt = await Attempt.findById(attempt._id)
      .populate('questions')
      .populate('user', 'username email profile');

    return res.status(201).json({
      success: true,
      message: 'Attempt submitted successfully',
      attempt: populatedAttempt
    });
  } catch (error) {
    next(error);
  }
};


// @desc    Get user's attempt history
// @route   GET /api/attempts/history
// @access  Private
exports.getAttemptHistory = async (req, res, next) => {
  try {
    const { attemptType, page = 1, limit = 10 } = req.query;
    const userId = req.user.id;

    const filter = { user: userId };
    if (attemptType) filter.attemptType = attemptType;

    const attempts = await Attempt.find(filter)
      .populate('test', 'name type')
      .populate('questions', 'subject chapter topic')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Attempt.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: attempts.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      attempts
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get detailed attempt report
// @route   GET /api/attempts/:id/report
// @access  Private


// exports.getAttemptReport = async (req, res, next) => {
//   try {
//     const attempt = await Attempt.findOne({
//       _id: req.params.id,
//       user: req.user.id
//     })
//       .populate({
//         path: 'questions',
//         select: 'subject chapter topic difficulty questionText questionImage options hint approach solution'
//       })
//       .populate('test', 'name type markingScheme');

//     if (!attempt) {
//       return res.status(404).json({
//         success: false,
//         message: 'Attempt not found'
//       });
//     }

//     res.status(200).json({
//       success: true,
//       attempt
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// controllers/attemptController.js

exports.getAttemptReport = async (req, res, next) => {
  try {
    // Fetch attempt with populated questions and test
    const attempt = await Attempt.findOne({
      _id: req.params.id,
      user: req.user.id
    })
      .populate({
        path: 'questions',
        select: 'subject chapter topic difficulty questionText questionImage options hint approach solution'
      })
      .populate('test', 'name type markingScheme');

    if (!attempt) {
      return res.status(404).json({ success: false, message: 'Attempt not found' });
    }

    // Build detailed responses: include questionText and correctness
    const detailedResponses = attempt.responses.map(r => {
      const q = attempt.questions.find(q => q._id.equals(r.question));
      return {
        questionId: r.question,
        questionText: q?.questionText,
        selectedOption: r.selectedOption,
        isCorrect: r.isCorrect,
        timeSpent: r.timeSpent,
        isMarkedForReview: r.isMarkedForReview
      };
    });

    // Aggregate subject/chapter/topic analysis
    const subjectMap = {}, chapterMap = {}, topicMap = {};
    detailedResponses.forEach(r => {
      const q = attempt.questions.find(q => q._id.equals(r.questionId));
      if (!q) return;
      // Subject
      subjectMap[q.subject] = subjectMap[q.subject] || { attempted: 0, correct: 0 };
      subjectMap[q.subject].attempted++;
      if (r.isCorrect) subjectMap[q.subject].correct++;
      // Chapter
      const ch = `${q.subject} / ${q.chapter}`;
      chapterMap[ch] = chapterMap[ch] || { attempted: 0, correct: 0 };
      chapterMap[ch].attempted++;
      if (r.isCorrect) chapterMap[ch].correct++;
      // Topic
      const tp = `${q.subject} / ${q.chapter} / ${q.topic}`;
      topicMap[tp] = topicMap[tp] || { attempted: 0, correct: 0 };
      topicMap[tp].attempted++;
      if (r.isCorrect) topicMap[tp].correct++;
    });

    const subjectWiseAnalysis = Object.entries(subjectMap).map(([subject, data]) => ({
      subject,
      attempted: data.attempted,
      accuracy: parseFloat(((data.correct / data.attempted) * 100).toFixed(2))
    }));
    const chapterWiseAnalysis = Object.entries(chapterMap).map(([chapter, data]) => ({
      chapter,
      attempted: data.attempted,
      accuracy: parseFloat(((data.correct / data.attempted) * 100).toFixed(2))
    }));
    const topicWiseAnalysis = Object.entries(topicMap).map(([topic, data]) => ({
      topic,
      attempted: data.attempted,
      accuracy: parseFloat(((data.correct / data.atempted) * 100).toFixed(2))
    }));

    // Get weak topics from attempt.analytics
    const weakTopics = attempt.analytics.weakTopics || [];

    // Include leaderboard if stored on test
    const leaderboard = attempt.test.leaderboard || { entries: [], userRank: null };
   
      const responseData = {
      success: true,
      report: {
        _id: attempt._id,
        user: attempt.user,
        test: attempt.test,
        score: attempt.score,
        totalTimeSpent: attempt.totalTimeSpent,
        attemptNumber: attempt.attemptNumber,
        isFirstAttempt: attempt.isFirstAttempt,
        predictedRank: attempt.predictedRank,
        completedAt: attempt.completedAt,
        responses: detailedResponses,
        analytics: {
          ...attempt.analytics,
          subjectWiseAnalysis,
          chapterWiseAnalysis,
          topicWiseAnalysis,
          weakTopics
        },
        leaderboard
      }
    };

    // Console the response
    console.log('Attempt Report Response:', JSON.stringify(responseData, null, 2));

    res.status(200).json(responseData);
  } catch (error) {
    next(error);
  }
};



// @desc    Get previous attempts for same test
// @route   GET /api/attempts/test/:testId/previous
// @access  Private
exports.getPreviousAttemptsForTest = async (req, res, next) => {
  try {
    const attempts = await Attempt.find({
      test: req.params.testId,
      user: req.user.id
    })
      .select('attemptNumber score totalTimeSpent completedAt')
      .sort({ attemptNumber: 1 });

    res.status(200).json({
      success: true,
      count: attempts.length,
      attempts
    });
  } catch (error) {
    next(error);
  }
};
