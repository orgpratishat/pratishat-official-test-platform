// const DPP = require('../models/DPP');
// const Question = require('../models/Question');

// // Get all subjects available in DPPs
// exports.getDPPSubjects = async (req, res) => {
//   try {
//     const subjects = await DPP.distinct('subject', { isActive: true });
    
//     res.status(200).json({
//       success: true,
//       subjects: subjects.map(subject => ({
//         name: subject,
//         label: subject,
//         totalDPPs: 0 // We'll calculate this in aggregation
//       }))
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'Failed to fetch subjects'
//     });
//   }
// };

// // Get chapters for a specific subject
// exports.getSubjectChapters = async (req, res) => {
//   try {
//     const { subject } = req.params;
    
//     const chapters = await DPP.aggregate([
//       { $match: { subject, isActive: true } },
//       {
//         $group: {
//           _id: '$chapter',
//           totalDPPs: { $sum: 1 },
//           lastUpdated: { $max: '$updatedAt' }
//         }
//       },
//       { $sort: { _id: 1 } }
//     ]);

//     res.status(200).json({
//       success: true,
//       chapters: chapters.map(chapter => ({
//         name: chapter._id,
//         totalDPPs: chapter.totalDPPs,
//         lastUpdated: chapter.lastUpdated
//       }))
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'Failed to fetch chapters'
//     });
//   }
// };

// // Get DPPs for a specific chapter
// exports.getChapterDPPs = async (req, res) => {
//   try {
//     const { subject, chapter } = req.params;
    
//     const dpps = await DPP.find({
//       subject,
//       chapter,
//       isActive: true
//     })
//     .populate('questions', 'subject chapter topic difficulty questionText')
//     .sort({ order: 1, createdAt: 1 });

//     res.status(200).json({
//       success: true,
//       dpps
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'Failed to fetch DPPs'
//     });
//   }
// };

// // Get single DPP with all questions
// exports.getDPPById = async (req, res) => {
//   try {
//     const { id } = req.params;
    
//     const dpp = await DPP.findById(id)
//       .populate('questions');

//     if (!dpp) {
//       return res.status(404).json({
//         success: false,
//         message: 'DPP not found'
//       });
//     }

//     res.status(200).json({
//       success: true,
//       dpp
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'Failed to fetch DPP'
//     });
//   }
// };

// // Create new DPP
// exports.createDPP = async (req, res) => {
//   try {
//     const dpp = await DPP.create(req.body);
    
//     res.status(201).json({
//       success: true,
//       message: 'DPP created successfully',
//       dpp
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'Failed to create DPP'
//     });
//   }
// };



const DPP = require('../models/DPP');
const Question = require('../models/Question');

// Your existing functions...
exports.getDPPSubjects = async (req, res) => {
  try {
    const subjects = await DPP.distinct('subject', { isActive: true });
    
    // Get counts for each subject
    const subjectsWithCounts = await Promise.all(
      subjects.map(async (subject) => {
        const count = await DPP.countDocuments({ subject, isActive: true });
        return {
          name: subject,
          label: subject,
          totalDPPs: count
        };
      })
    );
    
    res.status(200).json({
      success: true,
      subjects: subjectsWithCounts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch subjects'
    });
  }
};

exports.getSubjectChapters = async (req, res) => {
  try {
    const { subject } = req.params;
    
    const chapters = await DPP.aggregate([
      { $match: { subject, isActive: true } },
      {
        $group: {
          _id: '$chapter',
          totalDPPs: { $sum: 1 },
          lastUpdated: { $max: '$updatedAt' }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.status(200).json({
      success: true,
      chapters: chapters.map(chapter => ({
        name: chapter._id,
        totalDPPs: chapter.totalDPPs,
        lastUpdated: chapter.lastUpdated
      }))
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch chapters'
    });
  }
};

exports.getChapterDPPs = async (req, res) => {
  try {
    const { subject, chapter } = req.params;
    
    const dpps = await DPP.find({
      subject,
      chapter,
      isActive: true
    })
    .populate('questions', 'subject chapter topic difficulty questionText')
    .sort({ order: 1, createdAt: 1 });

    res.status(200).json({
      success: true,
      dpps
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch DPPs'
    });
  }
};

exports.getDPPById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const dpp = await DPP.findById(id)
      .populate('questions');

    if (!dpp) {
      return res.status(404).json({
        success: false,
        message: 'DPP not found'
      });
    }

    res.status(200).json({
      success: true,
      dpp
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch DPP'
    });
  }
};

exports.createDPP = async (req, res) => {
  try {
    const dpp = await DPP.create(req.body);
    
    // Populate the created DPP with questions
    await dpp.populate('questions', 'subject chapter topic difficulty questionText');
    
    res.status(201).json({
      success: true,
      message: 'DPP created successfully',
      dpp
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create DPP'
    });
  }
};

// NEW CONTROLLER FUNCTIONS FOR MANAGEMENT:

// Get all DPPs (for management)
exports.getAllDPPs = async (req, res) => {
  try {
    const { subject, isActive } = req.query;
    
    const filter = {};
    if (subject && subject !== 'all') filter.subject = subject;
    if (isActive && isActive !== 'all') {
      filter.isActive = isActive === 'true';
    }

    const dpps = await DPP.find(filter)
      .populate('questions', 'subject chapter topic difficulty questionText')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      dpps
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch DPPs'
    });
  }
};

// Update DPP
exports.updateDPP = async (req, res) => {
  try {
    const dpp = await DPP.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('questions', 'subject chapter topic difficulty questionText');

    if (!dpp) {
      return res.status(404).json({
        success: false,
        message: 'DPP not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'DPP updated successfully',
      dpp
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update DPP'
    });
  }
};

// Delete DPP
exports.deleteDPP = async (req, res) => {
  try {
    const dpp = await DPP.findByIdAndDelete(req.params.id);

    if (!dpp) {
      return res.status(404).json({
        success: false,
        message: 'DPP not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'DPP deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete DPP'
    });
  }
};