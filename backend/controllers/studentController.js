const Student = require('../models/Student');

// Register a new student
exports.registerStudent = async (req, res) => {
  try {
    const {
      name,
      email,
      whatsappNumber,
      isFresher,
      // Optional fields
      dob,
      studentClass,
      street,
      city,
      state,
      zipCode,
      country,
      previousAttempts = [],
      profilePhoto
    } = req.body;

    // Check if student already exists
    const existingStudent = await Student.findOne({ 
      $or: [{ email }, { whatsappNumber }] 
    });

    if (existingStudent) {
      return res.status(400).json({
        success: false,
        message: 'Student with this email or WhatsApp number already exists'
      });
    }

    // Create student object
    const studentData = {
      name,
      email,
      whatsappNumber,
      isFresher: isFresher === 'false' ? false : Boolean(isFresher),
      dob: dob ? new Date(dob) : null,
      studentClass,
      address: {
        street: street || '',
        city: city || '',
        state: state || '',
        zipCode: zipCode || '',
        country: country || ''
      },
      previousAttempts: isFresher ? [] : previousAttempts
    };

    console.log(studentData);

    // Handle profile photo if provided
    if (profilePhoto) {
      studentData.profilePhoto = {
        url: profilePhoto.url,
        publicId: profilePhoto.publicId
      };
    }

    // Create student
    const student = await Student.create(studentData);

    res.status(201).json({
      success: true,
      message: 'Student registered successfully',
      data: student
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Error registering student',
      error: error.message
    });
  }
};

// Get all students
exports.getAllStudents = async (req, res) => {
  try {
    const { type, status, page = 1, limit = 10, search } = req.query;
    
    const query = {};
    
    if (type === 'fresher') query.isFresher = true;
    if (type === 'dropper') query.isFresher = false;
    if (status) query.status = status;
    
    // Add search functionality by name or email
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }
    
    const students = await Student.find(query)
      .sort({ registeredAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    
    const total = await Student.countDocuments(query);
    
    res.status(200).json({
      success: true,
      count: students.length,
      total,
      pages: Math.ceil(total / limit),
      data: students
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching students',
      error: error.message
    });
  }
};

// Get single student
exports.getStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: student
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching student',
      error: error.message
    });
  }
};

// Update student
exports.updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Student updated successfully',
      data: student
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating student',
      error: error.message
    });
  }
};

// Delete student
exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Student deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting student',
      error: error.message
    });
  }
};

// Get statistics
exports.getStatistics = async (req, res) => {
  try {
    const totalStudents = await Student.countDocuments();
    const freshers = await Student.countDocuments({ isFresher: true });
    const droppers = await Student.countDocuments({ isFresher: false });
    
    // Students by class
    const classDistribution = await Student.aggregate([
      {
        $group: {
          _id: '$studentClass',
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      }
    ]);
    
    // Monthly registration trend
    const monthlyRegistrations = await Student.aggregate([
      {
        $group: {
          _id: {
            year: { $year: '$registeredAt' },
            month: { $month: '$registeredAt' }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { '_id.year': 1, '_id.month': 1 }
      },
      {
        $limit: 12
      }
    ]);
    
    res.status(200).json({
      success: true,
      data: {
        totalStudents,
        freshers,
        droppers,
        classDistribution,
        monthlyRegistrations
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching statistics',
      error: error.message
    });
  }
};

// Search students by name
exports.searchStudentsByName = async (req, res) => {
  try {
    const { name } = req.query;
    
    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Name query parameter is required'
      });
    }
    
    const students = await Student.searchByName(name);
    
    res.status(200).json({
      success: true,
      count: students.length,
      data: students
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error searching students',
      error: error.message
    });
  }
};

// Get student by email
exports.getStudentByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    
    const student = await Student.findOne({ email });
    
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: student
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching student',
      error: error.message
    });
  }
};

// Bulk update student status
exports.bulkUpdateStatus = async (req, res) => {
  try {
    const { studentIds, status } = req.body;
    
    if (!studentIds || !Array.isArray(studentIds) || studentIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Student IDs array is required'
      });
    }
    
    if (!status || !['active', 'inactive', 'pending'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Valid status is required (active, inactive, pending)'
      });
    }
    
    const result = await Student.updateMany(
      { _id: { $in: studentIds } },
      { $set: { status } }
    );
    
    res.status(200).json({
      success: true,
      message: `${result.modifiedCount} students updated successfully`,
      modifiedCount: result.modifiedCount
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating student status',
      error: error.message
    });
  }
};