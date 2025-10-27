// const jwt = require('jsonwebtoken');
// const User = require('../models/User');

// exports.protect = async (req, res, next) => {
//   try {
//     let token;

//     // Check for token in headers
//     if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
//   token = req.headers.authorization.split(' ')[1];
//   if (token.startsWith('"') && token.endsWith('"')) {
//     token = token.slice(1, -1);  // Remove wrapping quotes
//   }
//   console.log('Token:', token);
// }
//     // Or in cookies
//     else if (req.cookies.token) {
//       token = req.cookies.token;
//     }

//     if (!token) {
//       return res.status(401).json({
//         success: false,
//         message: 'Not authorized to access this route'
//       });
//     }

//     try {
//       // Verify token
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
//       // Get user from token
//       req.user = await User.findById(decoded.id).select('-password');
      
//       if (!req.user) {
//         return res.status(401).json({
//           success: false,
//           message: 'User not found'
//         });
//       }

//       next();
//     } catch (err) {
//       return res.status(401).json({
//         success: false,
//         message: 'Token is invalid or expired'
//       });
//     }
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: 'Server error in authentication',
//       error: error.message
//     });
//   }
// };

// // Generate JWT token
// exports.getSignedJwtToken = (userId) => {
//   return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
//     expiresIn: '7d'
//   });
// };

const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Generate JWT token
exports.getSignedJwtToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '30d',
  });
};

// Protect routes - verify token
exports.protect = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access this route'
      });
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id);
      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access this route'
      });
    }
  } catch (error) {
    next(error);
  }
};

// Grant access to specific roles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `User role ${req.user.role} is not authorized to access this route`
      });
    }
    next();
  };
};