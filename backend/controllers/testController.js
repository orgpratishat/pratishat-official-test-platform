const Test = require('../models/Test');
const Question = require('../models/Question');

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

      console.log("tests are here",tests);

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
