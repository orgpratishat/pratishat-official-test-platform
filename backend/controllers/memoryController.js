const Memory = require('../models/Memory');
const Question = require('../models/Question');

// @desc    Get user's memories (mistakes)
// @route   GET /api/memories
// @access  Private
exports.getMemories = async (req, res, next) => {
  try {
    const { attemptType, subject, page = 1, limit = 20 } = req.query;
    const userId = req.user.id;

    const filter = { user: userId };
    if (attemptType) filter.attemptType = attemptType;

    let memories = await Memory.find(filter)
      .populate({
        path: 'question',
        select: 'subject chapter topic difficulty questionText questionImage options hint approach solution'
      })
      .populate('test', 'name type')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    // Filter by subject if provided
    if (subject) {
      memories = memories.filter(m => m.question.subject === subject);
    }

    const total = await Memory.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: memories.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      memories
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get memories statistics
// @route   GET /api/memories/stats
// @access  Private
exports.getMemoriesStats = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const stats = await Memory.aggregate([
      { $match: { user: userId } },
      {
        $lookup: {
          from: 'questions',
          localField: 'question',
          foreignField: '_id',
          as: 'questionData'
        }
      },
      { $unwind: '$questionData' },
      {
        $group: {
          _id: '$questionData.subject',
          count: { $sum: 1 }
        }
      }
    ]);

    const topicStats = await Memory.aggregate([
      { $match: { user: userId } },
      {
        $lookup: {
          from: 'questions',
          localField: 'question',
          foreignField: '_id',
          as: 'questionData'
        }
      },
      { $unwind: '$questionData' },
      {
        $group: {
          _id: {
            subject: '$questionData.subject',
            topic: '$questionData.topic'
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);

    res.status(200).json({
      success: true,
      subjectWise: stats,
      topWeakTopics: topicStats
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Clear specific memory
// @route   DELETE /api/memories/:id
// @access  Private
exports.deleteMemory = async (req, res, next) => {
  try {
    const memory = await Memory.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    });

    if (!memory) {
      return res.status(404).json({
        success: false,
        message: 'Memory not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Memory deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
