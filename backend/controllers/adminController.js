

// controllers/adminController.js

const User = require('../models/User');
const Question = require('../models/Question');
const Test = require('../models/Test');
const PYQ = require('../models/PYQ');
const RankRange = require('../models/RankRange');
const ChangeLog = require('../models/ChangeLog');
const Attempt = require('../models/Attempt');

// Helper function to log changes
const logChange = async (adminId, action, collection, documentId, changes = null) => {
  try {
    await ChangeLog.create({
      admin: adminId,
      action,
      collection,
      documentId,
      changes,
      timestamp: new Date()
    });
  } catch (error) {
    console.error('Error logging change:', error);
  }
};

// ============= QUESTION MANAGEMENT =============

// @desc    Create question
// @route   POST /api/admin/questions
// exports.createQuestion = async (req, res, next) => {
//   try {
//     // Ensure options have correct structure
//     const questionData = {
//       ...req.body,
//       options: req.body.options.map(opt => ({
//         optionText: opt.optionText,
//         optionImage: opt.optionImage || '',
//         isCorrect: opt.isCorrect || false
//       })),
//       hint: {
//         text: req.body.hint?.text || '',
//         image: req.body.hint?.image || ''
//       },
//       approach: {
//         text: req.body.approach?.text || '',
//         image: req.body.approach?.image || ''
//       },
//       solution: req.body.solution?.map((step, index) => ({
//         stepNumber: index + 1,
//         stepText: step.stepText || '',
//         stepImage: step.stepImage || ''
//       })) || []
//     };

//     const question = await Question.create(questionData);

//     await logChange(req.user.id, 'CREATE', 'Question', question._id);

//     res.status(201).json({
//       success: true,
//       message: 'Question created successfully',
//       question
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // @desc    Update question
// // @route   PUT /api/admin/questions/:id
// exports.updateQuestion = async (req, res, next) => {
//   try {
//     const oldQuestion = await Question.findById(req.params.id);

//     if (!oldQuestion) {
//       return res.status(404).json({
//         success: false,
//         message: 'Question not found'
//       });
//     }
//     console.log("reached here")
//     // Ensure options have correct structure
//     const updateData = {
//       ...req.body,
//       options: req.body.options.map(opt => ({
//         optionText: opt.optionText,
//         optionImage: opt.optionImage || '',
//         isCorrect: opt.isCorrect || false
//       })),
//       hint: {
//         text: req.body.hint?.text || '',
//         image: req.body.hint?.image || ''
//       },
//       approach: {
//         text: req.body.approach?.text || '',
//         image: req.body.approach?.image || ''
//       },
//       solution: req.body.solution?.map((step, index) => ({
//         stepNumber: index + 1,
//         stepText: step.stepText || '',
//         stepImage: step.stepImage || ''
//       })) || []
//     };

//     const question = await Question.findByIdAndUpdate(
//       req.params.id,
//       updateData,
//       { new: true, runValidators: true }
//     );

//     await logChange(req.user.id, 'UPDATE', 'Question', question._id, {
//       old: oldQuestion,
//       new: question
//     });

//     res.status(200).json({
//       success: true,
//       message: 'Question updated successfully',
//       question
//     });
//   } catch (error) {
//     next(error);
//   }
// };


    exports.createQuestion = async (req, res, next) => {
  try {
    const { showExamYear, year, exam, ...otherData } = req.body;
    
    // Validate exam and year if showExamYear is true
    if (showExamYear) {
      if (!year) {
        return res.status(400).json({
          success: false,
          message: 'Year is required when exam/year fields are shown'
        });
      }
      if (!exam) {
        return res.status(400).json({
          success: false,
          message: 'Exam is required when exam/year fields are shown'
        });
      }
    }

    // Ensure options have correct structure
    const questionData = {
      ...otherData,
      showExamYear: showExamYear || false,
      year: showExamYear ? year : undefined,
      exam: showExamYear ? exam : undefined,
      createdBy: {
        userId: req.user._id,
        username: req.user.username
      },
      options: req.body.options.map(opt => ({
        optionText: opt.optionText,
        optionImage: opt.optionImage || '',
        isCorrect: opt.isCorrect || false
      })),
      hint: {
        text: req.body.hint?.text || '',
        image: req.body.hint?.image || ''
      },
      approach: {
        text: req.body.approach?.text || '',
        image: req.body.approach?.image || ''
      },
      solution: req.body.solution?.map((step, index) => ({
        stepNumber: index + 1,
        stepText: step.stepText || '',
        stepImage: step.stepImage || ''
      })) || []
    };

    const question = await Question.create(questionData);

    await logChange(req.user.id, 'CREATE', 'Question', question._id);

    res.status(201).json({
      success: true,
      message: 'Question created successfully',
      question
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update question
// @route   PUT /api/admin/questions/:id
exports.updateQuestion = async (req, res, next) => {
  try {
    const oldQuestion = await Question.findById(req.params.id);

    if (!oldQuestion) {
      return res.status(404).json({
        success: false,
        message: 'Question not found'
      });
    }

    const { showExamYear, year, exam, ...otherData } = req.body;
    
    // Validate exam and year if showExamYear is true
    if (showExamYear) {
      if (!year) {
        return res.status(400).json({
          success: false,
          message: 'Year is required when exam/year fields are shown'
        });
      }
      if (!exam) {
        return res.status(400).json({
          success: false,
          message: 'Exam is required when exam/year fields are shown'
        });
      }
    }

    // Ensure options have correct structure
    const updateData = {
      ...otherData,
      showExamYear: showExamYear || false,
      year: showExamYear ? year : undefined,
      exam: showExamYear ? exam : undefined,
      options: req.body.options.map(opt => ({
        optionText: opt.optionText,
        optionImage: opt.optionImage || '',
        isCorrect: opt.isCorrect || false
      })),
      hint: {
        text: req.body.hint?.text || '',
        image: req.body.hint?.image || ''
      },
      approach: {
        text: req.body.approach?.text || '',
        image: req.body.approach?.image || ''
      },
      solution: req.body.solution?.map((step, index) => ({
        stepNumber: index + 1,
        stepText: step.stepText || '',
        stepImage: step.stepImage || ''
      })) || []
    };

    const question = await Question.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    await logChange(req.user.id, 'UPDATE', 'Question', question._id, {
      old: oldQuestion,
      new: question
    });

    res.status(200).json({
      success: true,
      message: 'Question updated successfully',
      question
    });
  } catch (error) {
    next(error);
  }
};


// @desc    Delete question
// @route   DELETE /api/admin/questions/:id
exports.deleteQuestion = async (req, res, next) => {
  try {
    const question = await Question.findByIdAndDelete(req.params.id);

    if (!question) {
      return res.status(404).json({
        success: false,
        message: 'Question not found'
      });
    }

    await logChange(req.user.id, 'DELETE', 'Question', question._id, {
      deleted: question
    });

    res.status(200).json({
      success: true,
      message: 'Question deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Bulk upload questions
// @route   POST /api/admin/questions/bulk
exports.bulkUploadQuestions = async (req, res, next) => {
  try {
    const { questions } = req.body;

    if (!Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please provide an array of questions'
      });
    }

    // Process each question to ensure proper structure
    const processedQuestions = questions.map(question => ({
      ...question,
      options: question.options.map(opt => ({
        optionText: opt.optionText,
        optionImage: opt.optionImage || '',
        isCorrect: opt.isCorrect || false
      })),
      hint: {
        text: question.hint?.text || '',
        image: question.hint?.image || ''
      },
      approach: {
        text: question.approach?.text || '',
        image: question.approach?.image || ''
      },
      solution: question.solution?.map((step, index) => ({
        stepNumber: index + 1,
        stepText: step.stepText || '',
        stepImage: step.stepImage || ''
      })) || []
    }));

    const createdQuestions = await Question.insertMany(processedQuestions);

    // Log bulk creation
    await Promise.all(
      createdQuestions.map(q => 
        logChange(req.user.id, 'CREATE', 'Question', q._id)
      )
    );

    res.status(201).json({
      success: true,
      message: `${createdQuestions.length} questions created successfully`,
      count: createdQuestions.length,
      questions: createdQuestions
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all questions with filtering and pagination
// @route   GET /api/admin/questions
exports.getAllQuestions = async (req, res, next) => {
  try {
    const { 
      page = 1, 
      limit = 20, 
      subject, 
      chapter, 
      topic, 
      difficulty,
      search 
    } = req.query;

    const filter = {};
    
    if (subject) filter.subject = subject;
    if (chapter) filter.chapter = { $regex: chapter, $options: 'i' };
    if (topic) filter.topic = { $regex: topic, $options: 'i' };
    if (difficulty) filter.difficulty = difficulty;
    
    // Search across multiple fields
    if (search) {
      filter.$or = [
        { questionText: { $regex: search, $options: 'i' } },
        { chapter: { $regex: search, $options: 'i' } },
        { topic: { $regex: search, $options: 'i' } }
      ];
    }

    const questions = await Question.find(filter)
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const total = await Question.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: questions.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      questions
    });
  } catch (error) {
    next(error);
  }
};

// ============= TEST MANAGEMENT =============

// @desc    Create test
// @route   POST /api/admin/tests
exports.createTest = async (req, res, next) => {
  try {
    const test = await Test.create(req.body);

    await logChange(req.user.id, 'CREATE', 'Test', test._id);

    res.status(201).json({
      success: true,
      message: 'Test created successfully',
      test
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update test
// @route   PUT /api/admin/tests/:id
exports.updateTest = async (req, res, next) => {
  try {
    const oldTest = await Test.findById(req.params.id);

    if (!oldTest) {
      return res.status(404).json({
        success: false,
        message: 'Test not found'
      });
    }

    const test = await Test.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    await logChange(req.user.id, 'UPDATE', 'Test', test._id, {
      old: oldTest,
      new: test
    });

    res.status(200).json({
      success: true,
      message: 'Test updated successfully',
      test
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete test
// @route   DELETE /api/admin/tests/:id
exports.deleteTest = async (req, res, next) => {
  try {
    const test = await Test.findByIdAndDelete(req.params.id);

    if (!test) {
      return res.status(404).json({
        success: false,
        message: 'Test not found'
      });
    }

    await logChange(req.user.id, 'DELETE', 'Test', test._id, {
      deleted: test
    });

    res.status(200).json({
      success: true,
      message: 'Test deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all tests
// @route   GET /api/admin/tests
exports.getAllTests = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, type, status } = req.query;

    const filter = {};
    if (type) filter.type = type;
    if (status) filter.status = status;

    const tests = await Test.find(filter)
      .populate('questions')
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const total = await Test.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: tests.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      tests
    });
  } catch (error) {
    next(error);
  }
};

// ============= PYQ MANAGEMENT =============

// @desc    Create PYQ
// @route   POST /api/admin/pyq
exports.createPYQ = async (req, res, next) => {
  try {
    const pyq = await PYQ.create(req.body);

    await logChange(req.user.id, 'CREATE', 'PYQ', pyq._id);

    res.status(201).json({
      success: true,
      message: 'PYQ created successfully',
      pyq
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update PYQ
// @route   PUT /api/admin/pyq/:id
exports.updatePYQ = async (req, res, next) => {
  try {
    const oldPYQ = await PYQ.findById(req.params.id);

    if (!oldPYQ) {
      return res.status(404).json({
        success: false,
        message: 'PYQ not found'
      });
    }

    const pyq = await PYQ.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    await logChange(req.user.id, 'UPDATE', 'PYQ', pyq._id, {
      old: oldPYQ,
      new: pyq
    });

    res.status(200).json({
      success: true,
      message: 'PYQ updated successfully',
      pyq
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete PYQ
// @route   DELETE /api/admin/pyq/:id
exports.deletePYQ = async (req, res, next) => {
  try {
    const pyq = await PYQ.findByIdAndDelete(req.params.id);

    if (!pyq) {
      return res.status(404).json({
        success: false,
        message: 'PYQ not found'
      });
    }

    await logChange(req.user.id, 'DELETE', 'PYQ', pyq._id, {
      deleted: pyq
    });

    res.status(200).json({
      success: true,
      message: 'PYQ deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all PYQs
// @route   GET /api/admin/pyq
exports.getAllPYQs = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, subject, year } = req.query;

    const filter = {};
    if (subject) filter.subject = subject;
    if (year) filter.year = parseInt(year);

    const pyqs = await PYQ.find(filter)
      .populate('questions')
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .sort({ year: -1, createdAt: -1 });

    const total = await PYQ.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: pyqs.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      pyqs
    });
  } catch (error) {
    next(error);
  }
};

// ============= RANK RANGE MANAGEMENT =============

// @desc    Create rank range
// @route   POST /api/admin/rankranges
exports.createRankRange = async (req, res, next) => {
  try {
    const rankRange = await RankRange.create(req.body);

    await logChange(req.user.id, 'CREATE', 'RankRange', rankRange._id);

    res.status(201).json({
      success: true,
      message: 'Rank range created successfully',
      rankRange
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update rank range
// @route   PUT /api/admin/rankranges/:id
exports.updateRankRange = async (req, res, next) => {
  try {
    const oldRankRange = await RankRange.findById(req.params.id);

    if (!oldRankRange) {
      return res.status(404).json({
        success: false,
        message: 'Rank range not found'
      });
    }

    const rankRange = await RankRange.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    await logChange(req.user.id, 'UPDATE', 'RankRange', rankRange._id, {
      old: oldRankRange,
      new: rankRange
    });

    res.status(200).json({
      success: true,
      message: 'Rank range updated successfully',
      rankRange
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete rank range
// @route   DELETE /api/admin/rankranges/:id
exports.deleteRankRange = async (req, res, next) => {
  try {
    const rankRange = await RankRange.findByIdAndDelete(req.params.id);

    if (!rankRange) {
      return res.status(404).json({
        success: false,
        message: 'Rank range not found'
      });
    }

    await logChange(req.user.id, 'DELETE', 'RankRange', rankRange._id, {
      deleted: rankRange
    });

    res.status(200).json({
      success: true,
      message: 'Rank range deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Bulk upload rank ranges
// @route   POST /api/admin/rankranges/bulk
exports.bulkUploadRankRanges = async (req, res, next) => {
  try {
    const { rankRanges } = req.body;

    if (!Array.isArray(rankRanges) || rankRanges.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please provide an array of rank ranges'
      });
    }

    const createdRanges = await RankRange.insertMany(rankRanges);

    // Log bulk creation
    await Promise.all(
      createdRanges.map(range => 
        logChange(req.user.id, 'CREATE', 'RankRange', range._id)
      )
    );

    res.status(201).json({
      success: true,
      message: `${createdRanges.length} rank ranges created successfully`,
      count: createdRanges.length
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all rank ranges
// @route   GET /api/admin/rankranges
exports.getAllRankRanges = async (req, res, next) => {
  try {
    const { page = 1, limit = 50, exam } = req.query;

    const filter = {};
    if (exam) filter.exam = exam;

    const rankRanges = await RankRange.find(filter)
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .sort({ minRank: 1 });

    const total = await RankRange.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: rankRanges.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      rankRanges
    });
  } catch (error) {
    next(error);
  }
};

// ============= USER MANAGEMENT =============

// @desc    Get all users
// @route   GET /api/admin/users
exports.getAllUsers = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, role, search } = req.query;

    const filter = {};
    if (role) filter.role = role;
    
    // Search across username, email, or name
    if (search) {
      filter.$or = [
        { username: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { name: { $regex: search, $options: 'i' } }
      ];
    }

    const users = await User.find(filter)
      .select('-password')
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const total = await User.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: users.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      users
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update user role
// @route   PUT /api/admin/users/:id/role
exports.updateUserRole = async (req, res, next) => {
  try {
    const { role } = req.body;

    if (!['user', 'admin'].includes(role)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid role'
      });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    await logChange(req.user.id, 'UPDATE', 'User', user._id, {
      field: 'role',
      newValue: role
    });

    res.status(200).json({
      success: true,
      message: 'User role updated successfully',
      user
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete user
// @route   DELETE /api/admin/users/:id
exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    console.log("reached here")
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    await logChange(req.user.id, 'DELETE', 'User', user._id, {
      deleted: { username: user.username, email: user.email }
    });

    res.status(200).json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

// ============= CHANGELOG =============

// @desc    Get change logs
// @route   GET /api/admin/changelogs
exports.getChangeLogs = async (req, res, next) => {
  try {
    const { page = 1, limit = 50, collection, action, startDate, endDate } = req.query;

    const filter = {};
    if (collection) filter.collection = collection;
    if (action) filter.action = action;
    
    // Date range filter
    if (startDate || endDate) {
      filter.timestamp = {};
      if (startDate) filter.timestamp.$gte = new Date(startDate);
      if (endDate) filter.timestamp.$lte = new Date(endDate);
    }

    const logs = await ChangeLog.find(filter)
      .populate('admin', 'username email')
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .sort({ timestamp: -1 });

    const total = await ChangeLog.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: logs.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      logs
    });
  } catch (error) {
    next(error);
  }
};

// ============= DASHBOARD STATS =============

// @desc    Get admin dashboard stats
// @route   GET /api/admin/stats
exports.getDashboardStats = async (req, res, next) => {
  try {
    const [
      totalUsers,
      totalQuestions,
      totalTests,
      totalPYQs,
      totalAttempts,
      recentUsers,
      recentQuestions
    ] = await Promise.all([
      User.countDocuments(),
      Question.countDocuments(),
      Test.countDocuments(),
      PYQ.countDocuments(),
      Attempt.countDocuments(),
      User.find().sort({ createdAt: -1 }).limit(5).select('username email createdAt'),
      Question.find().sort({ createdAt: -1 }).limit(5).select('questionText subject difficulty createdAt')
    ]);

    const subjectDistribution = await Question.aggregate([
      {
        $group: {
          _id: '$subject',
          count: { $sum: 1 }
        }
      }
    ]);

    const difficultyDistribution = await Question.aggregate([
      {
        $group: {
          _id: '$difficulty',
          count: { $sum: 1 }
        }
      }
    ]);

    // Recent activity from change logs
    const recentActivity = await ChangeLog.find()
      .populate('admin', 'username')
      .sort({ timestamp: -1 })
      .limit(10);

    res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        totalQuestions,
        totalTests,
        totalPYQs,
        totalAttempts,
        subjectDistribution,
        difficultyDistribution
      },
      recent: {
        users: recentUsers,
        questions: recentQuestions,
        activity: recentActivity
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get system analytics
// @route   GET /api/admin/analytics
exports.getSystemAnalytics = async (req, res, next) => {
  try {
    // User growth over time (last 30 days)
    const userGrowth = await User.aggregate([
      {
        $match: {
          createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    // Question distribution by subject and difficulty
    const questionAnalytics = await Question.aggregate([
      {
        $group: {
          _id: { subject: "$subject", difficulty: "$difficulty" },
          count: { $sum: 1 }
        }
      }
    ]);

    // Test attempts over time
    const testAttempts = await Attempt.aggregate([
      {
        $match: {
          createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.status(200).json({
      success: true,
      analytics: {
        userGrowth,
        questionAnalytics,
        testAttempts
      }
    });
  } catch (error) {
    next(error);
  }
};