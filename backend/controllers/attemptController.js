const Attempt = require('../models/Attempt');
const Test = require('../models/Test');
const Question = require('../models/Question');
const Memory = require('../models/Memory');
const { calculateAnalytics } = require('../utils/analyticsCalculator');
const { predictRank } = require('../utils/rankPredictor');
const { updateLeaderboard } = require('../utils/leaderboardGenerator');

// In attemptController.js
const handleAutoSubmission = async (testId, userId) => {
  try {
    const test = await Test.findById(testId);
    const userSession = test.testSessions.find(
      session => session.user.toString() === userId && session.status === 'active'
    );

    if (!userSession) return;

    // Mark session as auto-submitted
    userSession.status = 'auto-submitted';

    // Prepare submission data from last saved answers
    const questionDetails = await Question.find({ _id: { $in: test.questions } });
    
    const formattedResponses = Object.entries(userSession.lastSavedAnswers).map(([questionId, selectedOption]) => {
      const question = questionDetails.find(q => q._id.toString() === questionId);
      return {
        questionId,
        selectedOption,
        timeSpent: 0, // You might want to track this differently
        isMarkedForReview: false
      };
    });

    // Calculate total time spent
    const totalTimeSpent = Math.floor(
      (userSession.endTime - userSession.startTime) / 1000
    );

    // Submit the attempt
    const submissionData = {
      attemptType: test.type,
      testId,
      responses: formattedResponses,
      totalTimeSpent,
      questions: test.questions
    };

    // Use your existing submit logic
    const attempt = await exports.submitAttempt({
      body: submissionData,
      user: { id: userId }
    }, { json: () => {} }, () => {});

    await test.save();
    return attempt;
  } catch (error) {
    console.error('Auto-submission error:', error);
  }
};

// In attemptController.js
exports.saveTestProgress = async (req, res, next) => {
  try {
    const { testId } = req.params;
    const { responses, currentQuestionIndex } = req.body;
    const userId = req.user.id;

    const test = await Test.findById(testId);
    if (!test) {
      return res.status(404).json({ success: false, message: 'Test not found' });
    }

    const userSession = test.testSessions.find(
      session => session.user.toString() === userId && session.status === 'active'
    );

    if (!userSession) {
      return res.status(400).json({ success: false, message: 'No active test session' });
    }

    // Check if time has expired on server
    if (new Date() > userSession.endTime) {
      await handleAutoSubmission(testId, userId);
      return res.status(400).json({ 
        success: false, 
        message: 'Time has expired. Test auto-submitted.' 
      });
    }

    // Update session with latest answers
    userSession.lastSavedAnswers = responses;
    userSession.lastActivity = new Date();
    
    await test.save();

    res.status(200).json({
      success: true,
      message: 'Progress saved',
      serverTime: new Date(),
      timeRemaining: userSession.endTime - new Date()
    });
  } catch (error) {
    next(error);
  }
};
// exports.submitAttempt = async (req, res, next) => {
//   try {
//     const { attemptType, testId, responses, totalTimeSpent, questions } = req.body;
//     const userId = req.user.id;

//     if (!['DPP_TEST', 'NEET_MOCK', 'PYQ', 'DPP', 'CHAPTERWISE'].includes(attemptType)) {
//       return res.status(400).json({ success: false, message: 'Invalid attempt type' });
//     }

//     let test = null;
//     let markingScheme = { positiveMarks: 4, negativeMarks: -1 };

//     if (['DPP_TEST', 'NEET_MOCK'].includes(attemptType)) {
//       test = await Test.findById(testId);
//       if (!test) return res.status(404).json({ success: false, message: 'Test not found' });
//       markingScheme = test.markingScheme || markingScheme;
//     }

//     // Establish the question set
//     const questionIds = questions && questions.length ? questions : (test?.questions || []);
//     if (!questionIds.length) {
//       return res.status(400).json({ success: false, message: 'No questions supplied for attempt' });
//     }

//     const questionDetails = await Question.find({ _id: { $in: questionIds } });

//     // Attempt counters
//     const previousAttempts = await Attempt.countDocuments({
//       user: userId,
//       attemptType,
//       ...(test && { test: testId })
//     });
//     const attemptNumber = previousAttempts + 1;
//     const isFirstAttempt = attemptNumber === 1;

//     // Process responses
//     const processedResponses = [];
//     const memoryBuffer = []; // collect to create later
//     let correctAnswers = 0;
//     let wrongAnswers = 0;
//     let unattempted = 0;
//     let obtainedMarks = 0;

//     // NEW: Initialize chapter analytics
//     const chapterAnalytics = {};
//     const subjectAnalytics = {};

//     for (const resp of responses || []) {
//       const q = questionDetails.find(qq => qq._id.toString() === resp.questionId);
//       if (!q) continue;

//       const correctIdx = q.options.findIndex(o => o.isCorrect);
//       const isAttempted = resp.selectedOption !== null && resp.selectedOption !== undefined;
//       const isCorrect = isAttempted && resp.selectedOption === correctIdx;

//       if (isAttempted) {
//         if (isCorrect) {
//           correctAnswers += 1;
//           obtainedMarks += markingScheme.positiveMarks;
//         } else {
//           wrongAnswers += 1;
//           obtainedMarks -= Math.abs(markingScheme.negativeMarks);
//         }
//       } else {
//         unattempted += 1;
//       }

//       // Ensure timeSpent is a valid number, default to 0 if invalid
//       const timeSpent = typeof resp.timeSpent === 'number' && resp.timeSpent >= 0 ? resp.timeSpent : 0;

//       processedResponses.push({
//         question: q._id,
//         selectedOption: resp.selectedOption,
//         isCorrect,
//         timeSpent: timeSpent,
//         isMarkedForReview: resp.isMarkedForReview || false
//       });

//       // NEW: Update chapter analytics
//       if (q.chapter) {
//         if (!chapterAnalytics[q.chapter]) {
//           chapterAnalytics[q.chapter] = {
//             chapter: q.chapter,
//             subject: q.subject,
//             totalQuestions: 0,
//             attempted: 0,
//             correct: 0,
//             wrong: 0,
//             unattempted: 0,
//             totalTimeSpent: 0,
//             accuracy: 0
//           };
//         }

//         chapterAnalytics[q.chapter].totalQuestions++;
//         chapterAnalytics[q.chapter].totalTimeSpent += timeSpent;

//         if (isAttempted) {
//           chapterAnalytics[q.chapter].attempted++;
//           if (isCorrect) {
//             chapterAnalytics[q.chapter].correct++;
//           } else {
//             chapterAnalytics[q.chapter].wrong++;
//           }
//         } else {
//           chapterAnalytics[q.chapter].unattempted++;
//         }
//       }

//       // NEW: Update subject analytics (if you want this too)
//       if (q.subject) {
//         if (!subjectAnalytics[q.subject]) {
//           subjectAnalytics[q.subject] = {
//             subject: q.subject,
//             totalQuestions: 0,
//             attempted: 0,
//             correct: 0,
//             wrong: 0,
//             unattempted: 0,
//             totalTimeSpent: 0,
//             accuracy: 0
//           };
//         }

//         subjectAnalytics[q.subject].totalQuestions++;
//         subjectAnalytics[q.subject].totalTimeSpent += timeSpent;

//         if (isAttempted) {
//           subjectAnalytics[q.subject].attempted++;
//           if (isCorrect) {
//             subjectAnalytics[q.subject].correct++;
//           } else {
//             subjectAnalytics[q.subject].wrong++;
//           }
//         } else {
//           subjectAnalytics[q.subject].unattempted++;
//         }
//       }

//       // Update analytics on question only if attempted
//       if (isAttempted) {
//         const totalAttempts = (q.analytics?.totalAttempts || 0) + 1;
//         const prevAvg = q.analytics?.averageTime || 0;
//         const newAvg = ((prevAvg * (totalAttempts - 1)) + timeSpent) / totalAttempts;
//         const best = q.analytics?.bestTime || 0;
//         const worst = q.analytics?.worstTime || 0;
//         const newBest = best === 0 || timeSpent < best ? timeSpent : best;
//         const newWorst = timeSpent > worst ? timeSpent : worst;

//         await Question.findByIdAndUpdate(q._id, {
//           $inc: { 'analytics.totalAttempts': 1 },
//           $set: {
//             'analytics.averageTime': Math.round(newAvg),
//             'analytics.bestTime': Math.round(newBest),
//             'analytics.worstTime': Math.round(newWorst)
//           }
//         });
//       }

//       // Prepare wrong answers for memories (DPP_TEST / NEET_MOCK only)
//       if (!isCorrect && isAttempted && ['DPP_TEST', 'NEET_MOCK'].includes(attemptType)) {
//         memoryBuffer.push({
//           user: userId,
//           question: q._id,
//           test: testId || null,
//           attemptType,
//           userAnswer: resp.selectedOption,
//           correctAnswer: correctIdx,
//           attemptNumber
//         });
//       }
//     }

//     // NEW: Calculate final chapter analytics
//     const chapterWiseAnalysis = Object.values(chapterAnalytics).map(chapter => {
//       const accuracy = chapter.attempted > 0 ? 
//         Math.round((chapter.correct / chapter.attempted) * 100) : 0;
      
//       return {
//         ...chapter,
//         accuracy: accuracy,
//         averageTimeSpent: chapter.attempted > 0 ? 
//           Math.round(chapter.totalTimeSpent / chapter.attempted) : 0
//       };
//     });

//     // NEW: Calculate final subject analytics
//     const subjectWiseAnalysis = Object.values(subjectAnalytics).map(subject => {
//       const accuracy = subject.attempted > 0 ? 
//         Math.round((subject.correct / subject.attempted) * 100) : 0;
      
//       return {
//         ...subject,
//         accuracy: accuracy,
//         averageTimeSpent: subject.attempted > 0 ? 
//           Math.round(subject.totalTimeSpent / subject.attempted) : 0
//       };
//     });

//     // NEW: Identify weak and strong chapters
//     const weakChapters = chapterWiseAnalysis
//       .filter(chapter => 
//         chapter.accuracy < 60 && 
//         chapter.attempted >= 3 // Minimum 3 attempted questions for meaningful data
//       )
//       .sort((a, b) => a.accuracy - b.accuracy) // Sort by worst accuracy first
//       .map(chapter => chapter.chapter);

//     const strongChapters = chapterWiseAnalysis
//       .filter(chapter => 
//         chapter.accuracy >= 75 && 
//         chapter.attempted >= 3 // Minimum 3 attempted questions for meaningful data
//       )
//       .sort((a, b) => b.accuracy - a.accuracy) // Sort by best accuracy first
//       .map(chapter => chapter.chapter);

//     // NEW: Identify weak and strong subjects
//     const weakSubjects = subjectWiseAnalysis
//       .filter(subject => 
//         subject.accuracy < 60 && 
//         subject.attempted >= 5 // Minimum 5 attempted questions for meaningful data
//       )
//       .sort((a, b) => a.accuracy - b.accuracy)
//       .map(subject => subject.subject);

//     const strongSubjects = subjectWiseAnalysis
//       .filter(subject => 
//         subject.accuracy >= 75 && 
//         subject.attempted >= 5 // Minimum 5 attempted questions for meaningful data
//       )
//       .sort((a, b) => b.accuracy - a.accuracy)
//       .map(subject => subject.subject);

//     const totalQuestions = questionIds.length;
//     const totalMarks = test?.markingScheme?.totalMarks || (totalQuestions * markingScheme.positiveMarks);
//     const accuracy = totalQuestions ? (correctAnswers / totalQuestions) * 100 : 0;

//     // Calculate analytics for the attempt
//     const analytics = await calculateAnalytics(questionDetails, processedResponses);

//     // NEW: Add chapter and subject analytics to the main analytics object
//     analytics.chapterWiseAnalysis = chapterWiseAnalysis;
//     analytics.subjectWiseAnalysis = subjectWiseAnalysis;
//     analytics.weakChapters = weakChapters;
//     analytics.strongChapters = strongChapters;
//     analytics.weakSubjects = weakSubjects;
//     analytics.strongSubjects = strongSubjects;

//     // Predict rank only for NEET_MOCK/PYQ
//     let predictedRank = null;
//     if (['NEET_MOCK', 'PYQ'].includes(attemptType)) {
//       predictedRank = await predictRank(obtainedMarks, new Date().getFullYear());
//     }

//     // Create Attempt first
//     const attempt = await Attempt.create({
//       user: userId,
//       attemptType,
//       test: testId || null,
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
//       totalTimeSpent: totalTimeSpent || 0,
//       attemptNumber,
//       isFirstAttempt,
//       analytics, // This now includes chapter analysis
//       predictedRank,
//       completedAt: new Date()
//     });

//     // Now create Memory docs with the attempt id (satisfies required field)
//     if (memoryBuffer.length) {
//       const payload = memoryBuffer.map(m => ({ ...m, attempt: attempt._id }));
//       await Memory.insertMany(payload);
//     }

//     // Leaderboard update only for first attempt and test-based types
//     if (isFirstAttempt && ['DPP_TEST', 'NEET_MOCK'].includes(attemptType) && testId) {
//       await updateLeaderboard(testId, userId, attempt._id, obtainedMarks, accuracy, totalTimeSpent);
//     }

//     const populatedAttempt = await Attempt.findById(attempt._id)
//       .populate('questions')
//       .populate('user', 'username email profile');

//     return res.status(201).json({
//       success: true,
//       message: 'Attempt submitted successfully',
//       attempt: populatedAttempt
//     });
//   } catch (error) {
//     next(error);
//   }
// };


// @desc    Get user's attempt history
// @route   GET /api/attempts/history
// @access  Private


exports.submitAttempt = async (req, res, next) => {
  try {
    const { attemptType, testId, responses, totalTimeSpent, questions } = req.body;
    const userId = req.user.id;

    console.log('🚀 [DEBUG] Starting submitAttempt');
    console.log('📊 [DEBUG] Request body:', {
      attemptType,
      testId,
      responseCount: responses?.length,
      questionsCount: questions?.length,
      totalTimeSpent
    });

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
    console.log('🔍 [DEBUG] Question IDs:', questionIds.length);
    
    if (!questionIds.length) {
      return res.status(400).json({ success: false, message: 'No questions supplied for attempt' });
    }

    const questionDetails = await Question.find({ _id: { $in: questionIds } });
    console.log('📚 [DEBUG] Question details loaded:', questionDetails.length);

    // DEBUG: Check chapter data in questions
    console.log('🏷️ [DEBUG] Question chapter analysis:');
    questionDetails.forEach((q, i) => {
      console.log(`  Q${i+1}: ID=${q._id}, Subject=${q.subject}, Chapter=${q.chapter || 'NO CHAPTER!'}, HasChapter=${!!q.chapter}`);
    });

    const chaptersWithData = questionDetails.filter(q => q.chapter).length;
    console.log(`📈 [DEBUG] Questions with chapter data: ${chaptersWithData}/${questionDetails.length}`);

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

    // Initialize chapter analytics
    const chapterAnalytics = {};
    const subjectAnalytics = {};

    console.log('🔄 [DEBUG] Processing responses...');
    for (const resp of responses || []) {
      const q = questionDetails.find(qq => qq._id.toString() === resp.questionId);
      if (!q) {
        console.warn(`❌ [DEBUG] Question not found: ${resp.questionId}`);
        continue;
      }

      const correctIdx = q.options.findIndex(o => o.isCorrect);
      const isAttempted = resp.selectedOption !== null && resp.selectedOption !== undefined;
      const isCorrect = isAttempted && resp.selectedOption === correctIdx;

      if (isAttempted) {
        if (isCorrect) {
          correctAnswers += 1;
          obtainedMarks += markingScheme.positiveMarks;
        } else {
          wrongAnswers += 1;
          obtainedMarks -= Math.abs(markingScheme.negativeMarks);
        }
      } else {
        unattempted += 1;
      }

      // Ensure timeSpent is a valid number, default to 0 if invalid
      const timeSpent = typeof resp.timeSpent === 'number' && resp.timeSpent >= 0 ? resp.timeSpent : 0;

      processedResponses.push({
        question: q._id,
        selectedOption: resp.selectedOption,
        isCorrect,
        timeSpent: timeSpent,
        isMarkedForReview: resp.isMarkedForReview || false
      });

      // Update chapter analytics
      if (q.chapter) {
        if (!chapterAnalytics[q.chapter]) {
          chapterAnalytics[q.chapter] = {
            chapter: q.chapter,
            subject: q.subject,
            totalQuestions: 0,
            attempted: 0,
            correct: 0,
            wrong: 0,
            unattempted: 0,
            totalTimeSpent: 0,
            accuracy: 0
          };
          console.log(`📝 [DEBUG] Created chapter entry: ${q.chapter} (${q.subject})`);
        }

        chapterAnalytics[q.chapter].totalQuestions++;
        chapterAnalytics[q.chapter].totalTimeSpent += timeSpent;

        if (isAttempted) {
          chapterAnalytics[q.chapter].attempted++;
          if (isCorrect) {
            chapterAnalytics[q.chapter].correct++;
          } else {
            chapterAnalytics[q.chapter].wrong++;
          }
        } else {
          chapterAnalytics[q.chapter].unattempted++;
        }
      }

      // Update subject analytics
      if (q.subject) {
        if (!subjectAnalytics[q.subject]) {
          subjectAnalytics[q.subject] = {
            subject: q.subject,
            totalQuestions: 0,
            attempted: 0,
            correct: 0,
            wrong: 0,
            unattempted: 0,
            totalTimeSpent: 0,
            accuracy: 0
          };
        }

        subjectAnalytics[q.subject].totalQuestions++;
        subjectAnalytics[q.subject].totalTimeSpent += timeSpent;

        if (isAttempted) {
          subjectAnalytics[q.subject].attempted++;
          if (isCorrect) {
            subjectAnalytics[q.subject].correct++;
          } else {
            subjectAnalytics[q.subject].wrong++;
          }
        } else {
          subjectAnalytics[q.subject].unattempted++;
        }
      }

      // Update analytics on question only if attempted
      if (isAttempted) {
        const totalAttempts = (q.analytics?.totalAttempts || 0) + 1;
        const prevAvg = q.analytics?.averageTime || 0;
        const newAvg = ((prevAvg * (totalAttempts - 1)) + timeSpent) / totalAttempts;
        const best = q.analytics?.bestTime || 0;
        const worst = q.analytics?.worstTime || 0;
        const newBest = best === 0 || timeSpent < best ? timeSpent : best;
        const newWorst = timeSpent > worst ? timeSpent : worst;

        await Question.findByIdAndUpdate(q._id, {
          $inc: { 'analytics.totalAttempts': 1 },
          $set: {
            'analytics.averageTime': Math.round(newAvg),
            'analytics.bestTime': Math.round(newBest),
            'analytics.worstTime': Math.round(newWorst)
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
        });
      }
    }

    console.log('📊 [DEBUG] Chapter analytics after processing:');
    console.log(JSON.stringify(chapterAnalytics, null, 2));
    
    console.log('📊 [DEBUG] Subject analytics after processing:');
    console.log(JSON.stringify(subjectAnalytics, null, 2));

    // Calculate final chapter analytics
    const chapterWiseAnalysis = Object.values(chapterAnalytics).map(chapter => {
      const accuracy = chapter.attempted > 0 ? 
        Math.round((chapter.correct / chapter.attempted) * 100) : 0;
      
      return {
        ...chapter,
        accuracy: accuracy,
        averageTimeSpent: chapter.attempted > 0 ? 
          Math.round(chapter.totalTimeSpent / chapter.attempted) : 0
      };
    });

    // Calculate final subject analytics
    const subjectWiseAnalysis = Object.values(subjectAnalytics).map(subject => {
      const accuracy = subject.attempted > 0 ? 
        Math.round((subject.correct / subject.attempted) * 100) : 0;
      
      return {
        ...subject,
        accuracy: accuracy,
        averageTimeSpent: subject.attempted > 0 ? 
          Math.round(subject.totalTimeSpent / subject.attempted) : 0
      };
    });

    console.log('📈 [DEBUG] Final chapterWiseAnalysis:', chapterWiseAnalysis.length, 'chapters');
    console.log('📈 [DEBUG] Final subjectWiseAnalysis:', subjectWiseAnalysis.length, 'subjects');

    // Identify weak and strong chapters
    const weakChapters = chapterWiseAnalysis
      .filter(chapter => 
        chapter.accuracy < 60 && 
        chapter.attempted >= 3 // Minimum 3 attempted questions for meaningful data
      )
      .sort((a, b) => a.accuracy - b.accuracy) // Sort by worst accuracy first
      .map(chapter => chapter.chapter);

    const strongChapters = chapterWiseAnalysis
      .filter(chapter => 
        chapter.accuracy >= 75 && 
        chapter.attempted >= 3 // Minimum 3 attempted questions for meaningful data
      )
      .sort((a, b) => b.accuracy - a.accuracy) // Sort by best accuracy first
      .map(chapter => chapter.chapter);

    console.log('🔴 [DEBUG] Weak chapters:', weakChapters);
    console.log('🟢 [DEBUG] Strong chapters:', strongChapters);

    // Identify weak and strong subjects
    const weakSubjects = subjectWiseAnalysis
      .filter(subject => 
        subject.accuracy < 60 && 
        subject.attempted >= 5 // Minimum 5 attempted questions for meaningful data
      )
      .sort((a, b) => a.accuracy - b.accuracy)
      .map(subject => subject.subject);

    const strongSubjects = subjectWiseAnalysis
      .filter(subject => 
        subject.accuracy >= 75 && 
        subject.attempted >= 5 // Minimum 5 attempted questions for meaningful data
      )
      .sort((a, b) => b.accuracy - a.accuracy)
      .map(subject => subject.subject);

    console.log('🔴 [DEBUG] Weak subjects:', weakSubjects);
    console.log('🟢 [DEBUG] Strong subjects:', strongSubjects);

    const totalQuestions = questionIds.length;
    const totalMarks = test?.markingScheme?.totalMarks || (totalQuestions * markingScheme.positiveMarks);
    const accuracy = totalQuestions ? (correctAnswers / totalQuestions) * 100 : 0;

    console.log('📊 [DEBUG] Calling calculateAnalytics...');
    // Calculate analytics for the attempt
    const baseAnalytics = await calculateAnalytics(questionDetails, processedResponses);
    
    console.log('🔍 [DEBUG] Base analytics from calculateAnalytics:');
    console.log('Keys:', Object.keys(baseAnalytics));
    console.log('Has chapterWiseAnalysis?', 'chapterWiseAnalysis' in baseAnalytics);
    console.log('Has subjectWiseAnalysis?', 'subjectWiseAnalysis' in baseAnalytics);
    
    // ============ CRITICAL FIX: MERGE ANALYTICS ============
    // Create final analytics object by merging base analytics with our calculated analytics
    const finalAnalytics = {
      // Start with base analytics (from calculateAnalytics)
      ...baseAnalytics,
      
      // OVERRIDE with our more accurate subject analysis
      subjectWiseAnalysis: subjectWiseAnalysis,
      
      // ADD our chapter analysis (not present in baseAnalytics)
      chapterWiseAnalysis: chapterWiseAnalysis,
      
      // Ensure weak/strong arrays are properly set
      weakSubjects: weakSubjects.length > 0 ? weakSubjects : (baseAnalytics.weakSubjects || []),
      strongSubjects: strongSubjects.length > 0 ? strongSubjects : (baseAnalytics.strongSubjects || []),
      weakChapters: weakChapters,
      strongChapters: strongChapters,
      
      // Ensure topic arrays exist even if empty
      weakTopics: baseAnalytics.weakTopics || [],
      strongTopics: baseAnalytics.strongTopics || []
    };
    
    console.log('🔍 [DEBUG] Final analytics to save:');
    console.log('Keys:', Object.keys(finalAnalytics));
    console.log('chapterWiseAnalysis length:', finalAnalytics.chapterWiseAnalysis?.length);
    console.log('subjectWiseAnalysis length:', finalAnalytics.subjectWiseAnalysis?.length);
    console.log('weakChapters:', finalAnalytics.weakChapters);
    console.log('strongChapters:', finalAnalytics.strongChapters);

    // Predict rank only for NEET_MOCK/PYQ
    let predictedRank = null;
    if (['NEET_MOCK', 'PYQ'].includes(attemptType)) {
      predictedRank = await predictRank(obtainedMarks, new Date().getFullYear());
    }

    console.log('💾 [DEBUG] Creating attempt in database...');
    console.log('Attempt analytics to save:', {
      chapterCount: finalAnalytics.chapterWiseAnalysis?.length,
      subjectCount: finalAnalytics.subjectWiseAnalysis?.length,
      weakChaptersCount: finalAnalytics.weakChapters?.length,
      strongChaptersCount: finalAnalytics.strongChapters?.length
    });

    // Create Attempt with finalAnalytics
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
      totalTimeSpent: totalTimeSpent || 0,
      attemptNumber,
      isFirstAttempt,
      analytics: finalAnalytics,  // Use the merged analytics
      predictedRank,
      completedAt: new Date()
    });

    console.log('✅ [DEBUG] Attempt created:', attempt._id);
    console.log('📋 [DEBUG] Attempt analytics from DB (partial):', {
      hasChapterWiseAnalysis: !!attempt.analytics?.chapterWiseAnalysis,
      chapterCount: attempt.analytics?.chapterWiseAnalysis?.length,
      hasWeakChapters: !!attempt.analytics?.weakChapters,
      weakChaptersCount: attempt.analytics?.weakChapters?.length
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

    console.log('🎯 [DEBUG] Final populated attempt analytics check:');
    console.log({
      chapterWiseAnalysis: populatedAttempt.analytics?.chapterWiseAnalysis?.length || 0,
      subjectWiseAnalysis: populatedAttempt.analytics?.subjectWiseAnalysis?.length || 0,
      weakChapters: populatedAttempt.analytics?.weakChapters || [],
      strongChapters: populatedAttempt.analytics?.strongChapters || []
    });

    return res.status(201).json({
      success: true,
      message: 'Attempt submitted successfully',
      attempt: populatedAttempt
    });
  } catch (error) {
    console.error('❌ [DEBUG] Error in submitAttempt:', error);
    next(error);
  }
};


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
