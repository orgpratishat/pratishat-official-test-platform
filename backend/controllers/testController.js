// const Test = require('../models/Test');
// const Question = require('../models/Question');

// // In testController.js
// exports.startTestSession = async (req, res, next) => {
//   try {
//     const { testId } = req.params;
//     const userId = req.user.id;

//     const test = await Test.findById(testId);
//     if (!test) {
//       return res.status(404).json({ success: false, message: 'Test not found' });
//     }

//     // Check if user already has active session
//     const existingSession = test.testSessions.find(
//       session => session.user.toString() === userId && session.status === 'active'
//     );

//     const startTime = new Date();
//     const endTime = new Date(startTime.getTime() + (test.duration * 60 * 1000));

//     if (existingSession) {
//       // Resume existing session
//       existingSession.lastActivity = new Date();
//     } else {
//       // Create new session
//       test.testSessions.push({
//         user: userId,
//         startTime,
//         endTime,
//         status: 'active',
//         lastSavedAnswers: {},
//         lastActivity: new Date()
//       });
//     }

//     await test.save();

//     res.status(200).json({
//       success: true,
//       session: {
//         startTime,
//         endTime,
//         serverTime: new Date() // Current server time for client sync
//       }
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // @desc    Get all tests
// // @route   GET /api/tests
// // @access  Private
// exports.getAllTests = async (req, res, next) => {
//   try {
//     const { type, isActive } = req.query;

//     const filter = {};
//     if (type) filter.type = type;
//     if (isActive !== undefined) filter.isActive = isActive === 'true';

//     const tests = await Test.find(filter)
//       .populate('questions', 'subject chapter topic difficulty')
//       .sort({ scheduledDate: -1 });

//       console.log("tests are here",tests);

//     res.status(200).json({
//       success: true,
//       count: tests.length,
//       tests
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // @desc    Get single test by ID
// // @route   GET /api/tests/:id
// // @access  Private
// exports.getTestById = async (req, res, next) => {
//   try {
//     const test = await Test.findById(req.params.id)
//       .populate('questions');

//     if (!test) {
//       return res.status(404).json({
//         success: false,
//         message: 'Test not found'
//       });
//     }

//     res.status(200).json({
//       success: true,
//       test
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // @desc    Get test questions (without answers during exam)
// // @route   GET /api/tests/:id/questions
// // @access  Private
// exports.getTestQuestions = async (req, res, next) => {
//   try {
//     const test = await Test.findById(req.params.id)
//       .populate({
//         path: 'questions',
//         select: '-hint -approach -solution -analytics'
//       });

//     if (!test) {
//       return res.status(404).json({
//         success: false,
//         message: 'Test not found'
//       });
//     }

//     // Remove correct answer indicator during exam
//     const questionsForExam = test.questions.map(q => {
//       const questionObj = q.toObject();
//       questionObj.options = questionObj.options.map(opt => ({
//         optionText: opt.optionText,
//         optionImage: opt.optionImage
//       }));
//       return questionObj;
//     });

//     res.status(200).json({
//       success: true,
//       test: {
//         _id: test._id,
//         name: test.name,
//         type: test.type,
//         duration: test.duration,
//         markingScheme: test.markingScheme,
//         questions: questionsForExam
//       }
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // @desc    Get upcoming tests
// // @route   GET /api/tests/upcoming
// // @access  Private
// exports.getUpcomingTests = async (req, res, next) => {
//   try {
//     const now = new Date();

//     const tests = await Test.find({
//       startTime: { $gte: now },
//       isActive: true
//     })
//       .populate('questions', 'subject chapter topic difficulty')
//       .sort({ startTime: 1 })
//       .limit(10);

//     res.status(200).json({
//       success: true,
//       count: tests.length,
//       tests
//     });
//   } catch (error) {
//     next(error);
//   }
// };






const Test = require('../models/Test');
const Question = require('../models/Question');

// @desc    Start test session with server timer
// @route   POST /api/tests/:id/start-session
// @access  Private
// exports.startTestSession = async (req, res, next) => {
//   try {
//     const testId  = req.params.id;
//     const userId = req.user.id;

//     console.log('🕒 [TIMER_API] START_SESSION_REQUEST:', {
//       testId,
//       userId,
//       clientTime: new Date().toISOString()
//     });

//     const test = await Test.findById(testId);
//     if (!test) {
//       console.log('❌ [TIMER_API] Test not found:', testId);
//       return res.status(404).json({ success: false, message: 'Test not found' });
//     }

//     // Check if user already has active session
//     const existingSession = test.testSessions.find(
//       session => session.user.toString() === userId && session.status === 'active'
//     );

//     // const startTime = new Date();
//     // const endTime = new Date(startTime.getTime() + (test.duration * 60 * 1000));

//     // In your server startTestSession controller
// const startTime = new Date();
// const endTime = new Date(startTime.getTime() + (test.duration * 60 * 1000));

// // Convert to UTC strings for consistency
// const sessionData = {
//   startTime: startTime.toISOString(),  // UTC format
//   endTime: endTime.toISOString(),      // UTC format  
//   serverTime: new Date().toISOString() // UTC format
// };

//     console.log('⏰ [TIMER_API] SESSION_TIMES_CALCULATED:', {
//       startTime: startTime.toISOString(),
//       endTime: endTime.toISOString(),
//       duration: `${test.duration} minutes`,
//       timeRemaining: `${test.duration * 60} seconds`
//     });

//     if (existingSession) {
//       console.log('🔄 [TIMER_API] Resuming existing session for user:', userId);
//       existingSession.lastActivity = new Date();
//     } else {
//       console.log('🆕 [TIMER_API] Creating new session for user:', userId);
//       test.testSessions.push({
//         user: userId,
//         startTime,
//         endTime,
//         status: 'active',
//         lastSavedAnswers: {},
//         lastActivity: new Date()
//       });
//     }

//     await test.save();

//     console.log('✅ [TIMER_API] SESSION_STARTED_SUCCESS:', {
//       userId,
//       sessionActive: true,
//       serverTime: new Date().toISOString()
//     });

//     res.status(200).json({
//       success: true,
//       session: {
//         startTime,
//         endTime,
//         serverTime: new Date()
//       }
//     });
//   } catch (error) {
//     console.error('❌ [TIMER_API] START_SESSION_ERROR:', {
//       testId: req.params.testId,
//       userId: req.user.id,
//       error: error.message
//     });
//     next(error);
//   }
// };

// In your server's startTestSession controller
exports.startTestSession = async (req, res, next) => {
  try {
    const testId = req.params.id;
    const userId = req.user.id;

    console.log('🕒 [TIMER_API] START_SESSION_REQUEST:', {
      testId,
      userId,
      clientTime: new Date().toISOString()
    });

    const test = await Test.findById(testId);
    if (!test) {
      return res.status(404).json({ success: false, message: 'Test not found' });
    }

    // 🎯 CRITICAL FIX: CLEAR ALL OLD ACTIVE SESSIONS FIRST
    test.testSessions = test.testSessions.filter(
      session => !(session.user.toString() === userId && session.status === 'active')
    );

    const startTime = new Date();
    const endTime = new Date(startTime.getTime() + (test.duration * 60 * 1000));

    console.log('⏰ [TIMER_API] SESSION_TIMES_CALCULATED:', {
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      duration: `${test.duration} minutes`
    });

    // Create fresh session
    test.testSessions.push({
      user: userId,
      startTime,
      endTime,
      status: 'active',
      lastSavedAnswers: {},
      lastActivity: new Date()
    });

    await test.save();

    console.log('✅ [TIMER_API] NEW_SESSION_CREATED:', {
      userId,
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString()
    });

    res.status(200).json({
      success: true,
      session: {
        startTime: startTime.toISOString(),  // Use ISO string for consistency
        endTime: endTime.toISOString(),      // Use ISO string for consistency
        serverTime: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('❌ [TIMER_API] START_SESSION_ERROR:', error);
    next(error);
  }
};

// @desc    Save test progress
// @route   POST /api/tests/:id/save-progress
// @access  Private

// exports.saveTestProgress = async (req, res, next) => {
//   try {
//     const testId  = req.params.id;
//     const { responses, marked, currentQuestionIndex } = req.body;
//     const userId = req.user.id;

//     console.log('💾 [TIMER_API] SAVE_PROGRESS_REQUEST:', {
//       testId,
//       userId,
//       responsesCount: Object.keys(responses || {}).length,
//       markedCount: Object.keys(marked || {}).length,
//       currentQuestionIndex,
//       clientTime: new Date().toISOString()
//     });

//     const test = await Test.findById(testId);
//     if (!test) {
//       console.log('❌ [TIMER_API] Test not found for progress save:', testId);
//       return res.status(404).json({ success: false, message: 'Test not found' });
//     }

//     // Find user's active session
//     const userSession = test.testSessions.find(
//       session => session.user.toString() === userId && session.status === 'active'
//     );

//     if (!userSession) {
//       console.log('❌ [TIMER_API] No active session for user:', userId);
//       return res.status(400).json({ success: false, message: 'No active test session' });
//     }

//     // Check if time has expired on server
//     const now = new Date();
//     if (now > userSession.endTime) {
//       console.log('⏰ [TIMER_API] TIME_EXPIRED_ON_SERVER:', {
//         userId,
//         endTime: userSession.endTime.toISOString(),
//         currentTime: now.toISOString(),
//         answersSaved: Object.keys(userSession.lastSavedAnswers || {}).length
//       });
//       return res.status(400).json({ 
//         success: false, 
//         message: 'Time has expired. Test auto-submitted.' 
//       });
//     }

//     const timeRemaining = Math.floor((userSession.endTime - now) / 1000);
//     console.log('⏱️ [TIMER_API] TIME_REMAINING:', {
//       userId,
//       timeRemaining: `${timeRemaining} seconds`,
//       endTime: userSession.endTime.toISOString()
//     });

//     // Update session with latest answers
//     userSession.lastSavedAnswers = responses;
//     userSession.lastActivity = new Date();
    
//     await test.save();

//     console.log('✅ [TIMER_API] PROGRESS_SAVED_SUCCESS:', {
//       userId,
//       responsesSaved: Object.keys(responses || {}).length,
//       timeRemaining: `${timeRemaining} seconds`,
//       serverTime: new Date().toISOString()
//     });

//     res.status(200).json({
//       success: true,
//       message: 'Progress saved',
//       serverTime: new Date(),
//       timeRemaining: userSession.endTime - new Date()
//     });
//   } catch (error) {
//     console.error('❌ [TIMER_API] SAVE_PROGRESS_ERROR:', {
//       testId: req.params.testId,
//       userId: req.user.id,
//       error: error.message
//     });
//     next(error);
//   }
// };


// In your server's saveTestProgress controller
exports.saveTestProgress = async (req, res, next) => {
  try {
    const testId = req.params.id;
    const { responses, marked, currentQuestionIndex } = req.body;
    const userId = req.user.id;

    const test = await Test.findById(testId);
    if (!test) {
      return res.status(404).json({ success: false, message: 'Test not found' });
    }

    // Find user's MOST RECENT active session
    const userSession = test.testSessions
      .filter(session => session.user.toString() === userId && session.status === 'active')
      .sort((a, b) => new Date(b.startTime) - new Date(a.startTime))[0]; // Get most recent

    if (!userSession) {
      return res.status(400).json({ success: false, message: 'No active test session' });
    }

    // 🎯 VALIDATE SESSION TIMES
    const now = new Date();
    const expectedEndTime = new Date(userSession.startTime.getTime() + (test.duration * 60 * 1000));
    
    // If end time is wrong, fix it and log the issue
    if (userSession.endTime.getTime() !== expectedEndTime.getTime()) {
      console.log('🔄 [TIMER_API] CORRECTING_END_TIME:', {
        oldEndTime: userSession.endTime.toISOString(),
        newEndTime: expectedEndTime.toISOString(),
        discrepancy: (expectedEndTime - userSession.endTime) / 1000 + ' seconds'
      });
      userSession.endTime = expectedEndTime;
    }

    // Check if time has expired
    if (now > userSession.endTime) {
      console.log('⏰ [TIMER_API] TIME_EXPIRED:', {
        userId,
        endTime: userSession.endTime.toISOString(),
        currentTime: now.toISOString()
      });
      return res.status(400).json({ 
        success: false, 
        message: 'Time has expired',
        code: 'TIME_EXPIRED'  // Add specific error code
      });
    }

    // Update session data
    userSession.lastSavedAnswers = responses || {};
    userSession.lastActivity = new Date();
    
    await test.save();

    const timeRemaining = Math.floor((userSession.endTime - now) / 1000);
    
    console.log('✅ [TIMER_API] PROGRESS_SAVED:', {
      userId,
      responsesSaved: Object.keys(responses || {}).length,
      timeRemaining: `${timeRemaining} seconds`
    });

    res.status(200).json({
      success: true,
      message: 'Progress saved',
      serverTime: new Date().toISOString(),
      timeRemaining
    });
  } catch (error) {
    console.error('❌ [TIMER_API] SAVE_PROGRESS_ERROR:', error);
    next(error);
  }
};


// @desc    Get all tests
// @route   GET /api/tests
// @access  Private
exports.getAllTests = async (req, res, next) => {
  try {
    const { type, isActive } = req.query;

    const filter = {};
    if (type) filter.type = type;
    if (isActive !== undefined) filter.isActive = isActive === 'true';

    const tests = await Test.find(filter)
      .populate('questions', 'subject chapter topic difficulty')
      .sort({ scheduledDate: -1 });

    res.status(200).json({
      success: true,
      count: tests.length,
      tests
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single test by ID
// @route   GET /api/tests/:id
// @access  Private
exports.getTestById = async (req, res, next) => {
  try {
    const test = await Test.findById(req.params.id)
      .populate('questions');

    if (!test) {
      return res.status(404).json({
        success: false,
        message: 'Test not found'
      });
    }

    res.status(200).json({
      success: true,
      test
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get test questions (without answers during exam)
// @route   GET /api/tests/:id/questions
// @access  Private
exports.getTestQuestions = async (req, res, next) => {
  try {
    const test = await Test.findById(req.params.id)
      .populate({
        path: 'questions',
        select: '-hint -approach -solution -analytics'
      });

    if (!test) {
      return res.status(404).json({
        success: false,
        message: 'Test not found'
      });
    }

    // Remove correct answer indicator during exam
    const questionsForExam = test.questions.map(q => {
      const questionObj = q.toObject();
      questionObj.options = questionObj.options.map(opt => ({
        optionText: opt.optionText,
        optionImage: opt.optionImage
      }));
      return questionObj;
    });

    res.status(200).json({
      success: true,
      test: {
        _id: test._id,
        name: test.name,
        type: test.type,
        duration: test.duration,
        markingScheme: test.markingScheme,
        questions: questionsForExam
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get upcoming tests
// @route   GET /api/tests/upcoming
// @access  Private
exports.getUpcomingTests = async (req, res, next) => {
  try {
    const now = new Date();

    const tests = await Test.find({
      startTime: { $gte: now },
      isActive: true
    })
      .populate('questions', 'subject chapter topic difficulty')
      .sort({ startTime: 1 })
      .limit(10);

    res.status(200).json({
      success: true,
      count: tests.length,
      tests
    });
  } catch (error) {
    next(error);
  }
};