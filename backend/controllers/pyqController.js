// const PYQ = require('../models/PYQ');
// const Question = require('../models/Question');
// const Attempt = require('../models/Attempt');

// // @desc    Get all PYQ years
// // @route   GET /api/pyq/years
// // @access  Private

// // exports.getAllYears = async (req, res, next) => {
// //   try {
// //     const pyqs = await PYQ.find()
// //       .select('year examName totalMarks duration')
// //       .sort({ year: -1 });

// //     res.status(200).json({
// //       success: true,
// //       count: pyqs.length,
// //       pyqs
// //     });
// //   } catch (error) {
// //     next(error);
// //   }
// // };

// exports.getAllYears = async (req, res, next) => {
//   try {
//     const pyqs = await PYQ.find()
//       .select('year examName totalMarks duration')
//       .sort({ year: -1 });

//     // Log the data to the console
//     console.log("PYQs fetched from DB:", pyqs);

//     res.status(200).json({
//       success: true,
//       count: pyqs.length,
//       pyqs
//     });
//   } catch (error) {
//     console.error("Error fetching PYQs:", error);
//     next(error);
//   }
// };


// // @desc    Get PYQ by year
// // @route   GET /api/pyq/:year
// // @access  Private

// exports.getPYQByYear = async (req, res, next) => {
//   try {
//     const pyq = await PYQ.findOne({ year: req.params.year })
//       .populate({
//         path: 'questions',
      
//       });
//       console.log(pyq)

//     if (!pyq) {
//       return res.status(404).json({
//         success: false,
//         message: 'PYQ not found for this year'
//       });
//     }

//     // Remove correct answer indicator
//     const questionsForExam = pyq.questions.map(q => {
//       const questionObj = q.toObject();
//       questionObj.options = questionObj.options.map(opt => ({
//         optionText: opt.optionText,
//         optionImage: opt.optionImage
//       }));
//       return questionObj;
//     });

//     res.status(200).json({
//       success: true,
//       pyq: {
//         ...pyq.toObject(),
//         questions: questionsForExam
//       }
//     });
//   } catch (error) {
//     next(error);
//   }
// };



// // @desc    Get PYQ attempt history for a year
// // @route   GET /api/pyq/:year/attempts
// // @access  Private
// exports.getPYQAttempts = async (req, res, next) => {
//   try {
//     const pyq = await PYQ.findOne({ year: req.params.year });

//     if (!pyq) {
//       return res.status(404).json({
//         success: false,
//         message: 'PYQ not found for this year'
//       });
//     }

//     const attempts = await Attempt.find({
//       user: req.user.id,
//       attemptType: 'PYQ',
//       questions: { $in: pyq.questions }
//     })
//       .select('attemptNumber score totalTimeSpent predictedRank completedAt')
//       .sort({ attemptNumber: 1 });

//     res.status(200).json({
//       success: true,
//       count: attempts.length,
//       attempts
//     });
//   } catch (error) {
//     next(error);
//   }
// };






// controllers/pyqController.js

const Question = require('../models/Question');
const Attempt = require('../models/Attempt');

// @desc    Get all available PYQ years
// @route   GET /api/pyq/years
// @access  Private
exports.getAllYears = async (req, res, next) => {
  try {
    // Get distinct years from questions where year exists
    const years = await Question.distinct('year', { 
      year: { $exists: true, $ne: null } 
    });

    // Sort years in descending order
    const sortedYears = years.sort((a, b) => b - a);

    // Get question count per year
    const yearsWithCounts = await Promise.all(
      sortedYears.map(async (year) => {
        const count = await Question.countDocuments({ year });
        return {
          year,
          examName: 'NEET',
          totalQuestions: count,
          totalMarks: count * 4, // assuming 4 marks per question
          duration: 180 // minutes
        };
      })
    );

    console.log("PYQ Years fetched:", yearsWithCounts);

    res.status(200).json({
      success: true,
      count: yearsWithCounts.length,
      pyqs: yearsWithCounts
    });
  } catch (error) {
    console.error("Error fetching PYQ years:", error);
    next(error);
  }
};

// @desc    Get PYQ questions by year
// @route   GET /api/pyq/:year
// @access  Private
exports.getPYQByYear = async (req, res, next) => {
  try {
    const year = parseInt(req.params.year);

    // Get all questions for this year
    const questions = await Question.find({ year })
      .select('-__v')
      .sort({ subject: 1, chapter: 1, topic: 1 });

    if (!questions.length) {
      return res.status(404).json({
        success: false,
        message: `No PYQ questions found for year ${year}`
      });
    }

    // Remove correct answer indicator for exam mode
    const questionsForExam = questions.map(q => {
      const questionObj = q.toObject();
      questionObj.options = questionObj.options.map(opt => ({
        optionText: opt.optionText,
        optionImage: opt.optionImage
      }));
      return questionObj;
    });

    console.log(`PYQ ${year} fetched: ${questions.length} questions`);

    res.status(200).json({
      success: true,
      pyq: {
        year,
        examName: 'NEET',
        totalMarks: questions.length * 4,
        duration: 180,
        totalQuestions: questions.length,
        questions: questionsForExam
      }
    });
  } catch (error) {
    console.error("Error fetching PYQ by year:", error);
    next(error);
  }
};

// @desc    Get PYQ questions by year with filters
// @route   GET /api/pyq/:year/questions
// @access  Private
exports.getPYQQuestionsByYear = async (req, res, next) => {
  try {
    const year = parseInt(req.params.year);
    const { subject, chapter, topic, difficulty } = req.query;

    const filter = { year };
    if (subject) filter.subject = subject;
    if (chapter) filter.chapter = chapter;
    if (topic) filter.topic = topic;
    if (difficulty) filter.difficulty = difficulty;

    const questions = await Question.find(filter)
      .select('-__v')
      .sort({ subject: 1, chapter: 1, topic: 1 });

    res.status(200).json({
      success: true,
      count: questions.length,
      questions
    });
  } catch (error) {
    console.error("Error fetching PYQ questions:", error);
    next(error);
  }
};

// @desc    Get PYQ attempt history for a year
// @route   GET /api/pyq/:year/attempts
// @access  Private
exports.getPYQAttempts = async (req, res, next) => {
  try {
    const year = parseInt(req.params.year);

    // Get all question IDs for this year
    const questions = await Question.find({ year }).select('_id');
    const questionIds = questions.map(q => q._id);

    if (!questionIds.length) {
      return res.status(404).json({
        success: false,
        message: `No PYQ found for year ${year}`
      });
    }

    // Find attempts that include questions from this year
    const attempts = await Attempt.find({
      user: req.user.id,
      attemptType: 'PYQ',
      questions: { $in: questionIds }
    })
      .select('attemptNumber score totalTimeSpent predictedRank completedAt')
      .sort({ attemptNumber: 1 });

    res.status(200).json({
      success: true,
      count: attempts.length,
      attempts
    });
  } catch (error) {
    console.error("Error fetching PYQ attempts:", error);
    next(error);
  }
};

// @desc    Get subject-wise breakdown for a year
// @route   GET /api/pyq/:year/subjects
// @access  Private
exports.getPYQSubjects = async (req, res, next) => {
  try {
    const year = parseInt(req.params.year);

    const subjects = await Question.aggregate([
      { $match: { year } },
      {
        $group: {
          _id: '$subject',
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.status(200).json({
      success: true,
      year,
      subjects: subjects.map(s => ({
        subject: s._id,
        questionCount: s.count,
        marks: s.count * 4
      }))
    });
  } catch (error) {
    console.error("Error fetching PYQ subjects:", error);
    next(error);
  }
};
