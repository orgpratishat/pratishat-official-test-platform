// import React, { useState } from 'react';
// import { Upload, User, ChevronDown, Plus, X, Menu, X as CloseIcon, ArrowUpRight, Loader2 } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import LandingHeader from '../components/LandingHeader'
// import LandingFooter from '../components/LandingFooter';
// // API Service
// const API_BASE_URL = 'http://localhost:5000/api'; // Update with your backend URL

// // Cloudinary Configuration - Using same details from provided code
// const CLOUDINARY_CONFIG = {
//   cloudName: 'djwkt80ss', // Same as in provided code
//   uploadPreset: 'test_preset' // Same as in provided code
// };

// const studentApi = {
//   registerStudent: async (studentData) => {
//     const response = await fetch(`${API_BASE_URL}/students/register`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(studentData),
//     });
    
//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(errorData.message || 'Registration failed');
//     }
    
//     return response.json();
//   },
// };

// // Cloudinary upload function - Same as in provided code
// const uploadToCloudinary = async (file) => {
//   const formData = new FormData();
//   formData.append('file', file);
//   formData.append('upload_preset', CLOUDINARY_CONFIG.uploadPreset);
//   formData.append('cloud_name', CLOUDINARY_CONFIG.cloudName);

//   try {
//     const response = await fetch(
//       `https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.cloudName}/image/upload`,
//       {
//         method: 'POST',
//         body: formData,
//       }
//     );

//     const data = await response.json();
    
//     if (data.secure_url) {
//       return {
//         url: data.secure_url,
//         publicId: data.public_id
//       };
//     } else {
//       throw new Error(data.error?.message || 'Upload failed');
//     }
//   } catch (error) {
//     throw error;
//   }
// };

// export default function StudentRegistration() {
//   const navigate = useNavigate();
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [showOtherDetails, setShowOtherDetails] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(false);
//   const [photoPreview, setPhotoPreview] = useState(null);
//   const [selectedPhotoFile, setSelectedPhotoFile] = useState(null);

//   const handleContactClick = () => {
//     navigate('/contact-us');
//   };

//   const handleHomeClick = () => {
//     navigate('/landing');
//   };

//   const [formData, setFormData] = useState({
//     profilePhoto: {
//       url: '',
//       publicId: ''
//     },
//     name: '', // Single name field instead of firstName and lastName
//     email: '',
//     whatsappNumber: '',
//     isFresher: true,
//     // Other details (optional)
//     dob: '',
//     studentClass: '',
//     street: '',
//     city: '',
//     state: '',
//     zipCode: '',
//     country: '',
//     previousAttempts: [{ attempt: '', marks: '', rank: '' }]
//   });

//   const classOptions = ['6', '7', '8', '9', '10', '11', '12', 'Dropper'];

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//     if (error) setError(null);
//   };

//   const handlePhotoSelect = (e) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     // Validate file type - Same validation as in provided code
//     if (!file.type.startsWith('image/')) {
//       setError('Please select an image file (JPEG, PNG, GIF, etc.)');
//       return;
//     }
    
//     // Validate file size - 10MB limit as in provided code
//     if (file.size > 10 * 1024 * 1024) {
//       setError('Image size should be less than 10MB');
//       return;
//     }

//     setSelectedPhotoFile(file);

//     // Create preview
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setPhotoPreview(reader.result);
//     };
//     reader.readAsDataURL(file);

//     // Clear any previous errors
//     setError(null);
//   };

//   const handlePhotoUpload = async () => {
//     if (!selectedPhotoFile) {
//       setError('Please select a photo first');
//       return;
//     }

//     setIsUploadingPhoto(true);
//     setError(null);

//     try {
//       const cloudinaryResponse = await uploadToCloudinary(selectedPhotoFile);
      
//       setFormData(prev => ({ 
//         ...prev, 
//         profilePhoto: {
//           url: cloudinaryResponse.url,
//           publicId: cloudinaryResponse.publicId
//         }
//       }));
      
//       // Clear preview if it's a blob URL
//       if (photoPreview && photoPreview.startsWith('blob:')) {
//         URL.revokeObjectURL(photoPreview);
//       }
      
//       setError(null);
//     } catch (err) {
//       console.error('Photo upload error:', err);
//       setError(`Failed to upload photo: ${err.message}`);
//     } finally {
//       setIsUploadingPhoto(false);
//     }
//   };

//   const removePhoto = () => {
//     setFormData(prev => ({ 
//       ...prev, 
//       profilePhoto: {
//         url: '',
//         publicId: ''
//       }
//     }));
//     setPhotoPreview(null);
//     setSelectedPhotoFile(null);
    
//     // Clean up blob URL if exists
//     if (photoPreview && photoPreview.startsWith('blob:')) {
//       URL.revokeObjectURL(photoPreview);
//     }
//   };

//   const handleAttemptChange = (index, field, value) => {
//     const updatedAttempts = [...formData.previousAttempts];
//     updatedAttempts[index][field] = value;
//     setFormData(prev => ({ ...prev, previousAttempts: updatedAttempts }));
//   };

//   const addAttempt = () => {
//     setFormData(prev => ({
//       ...prev,
//       previousAttempts: [...prev.previousAttempts, { attempt: '', marks: '', rank: '' }]
//     }));
//   };

//   const removeAttempt = (index) => {
//     if (formData.previousAttempts.length > 1) {
//       const updatedAttempts = formData.previousAttempts.filter((_, i) => i !== index);
//       setFormData(prev => ({ ...prev, previousAttempts: updatedAttempts }));
//     }
//   };

//   const handleClear = () => {
//     setFormData({
//       profilePhoto: {
//         url: '',
//         publicId: ''
//       },
//       name: '',
//       email: '',
//       whatsappNumber: '',
//       isFresher: true,
//       dob: '',
//       studentClass: '',
//       street: '',
//       city: '',
//       state: '',
//       zipCode: '',
//       country: '',
//       previousAttempts: [{ attempt: '', marks: '', rank: '' }]
//     });
//     setPhotoPreview(null);
//     setSelectedPhotoFile(null);
//     setError(null);
//     setSuccess(false);
//   };

//   const validateForm = () => {
//     const errors = [];
    
//     if (!formData.name.trim()) errors.push('Name is required');
//     if (!formData.email.trim()) errors.push('Email is required');
//     if (!formData.whatsappNumber.trim()) errors.push('WhatsApp number is required');
    
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (formData.email && !emailRegex.test(formData.email)) {
//       errors.push('Please enter a valid email address');
//     }
    
//     return errors;
//   };

//   const formatDateForBackend = (dateString) => {
//     if (!dateString) return null;
    
//     const parts = dateString.split('-');
//     if (parts.length === 3) {
//       const [day, month, year] = parts;
//       return `${year}-${month}-${day}`;
//     }
    
//     return dateString;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     const validationErrors = validateForm();
//     if (validationErrors.length > 0) {
//       setError(validationErrors.join(', '));
//       return;
//     }
    
//     setIsSubmitting(true);
//     setError(null);
//     setSuccess(false);
    
//     try {
//       // Prepare data for backend
//       const studentData = {
//         name: formData.name.trim(), // Single name field
//         email: formData.email.trim().toLowerCase(),
//         whatsappNumber: formData.whatsappNumber.trim(),
//         isFresher: formData.isFresher,
        
//         // Include profile photo if uploaded
//         ...(formData.profilePhoto.url && { profilePhoto: formData.profilePhoto }),
        
//         // Optional fields
//         ...(formData.dob && { dob: formatDateForBackend(formData.dob) }),
//         ...(formData.studentClass && { studentClass: formData.studentClass.toLowerCase() }),
//         ...(formData.street || formData.city || formData.state || formData.zipCode || formData.country ? {
//           address: {
//             street: formData.street || '',
//             city: formData.city || '',
//             state: formData.state || '',
//             zipCode: formData.zipCode || '',
//             country: formData.country || ''
//           }
//         } : {}),
//         ...(!formData.isFresher && formData.previousAttempts.length > 0 ? {
//           previousAttempts: formData.previousAttempts
//             .filter(attempt => attempt.attempt.trim() || attempt.marks.trim() || attempt.rank.trim())
//             .map(attempt => ({
//               attempt: attempt.attempt.trim(),
//               marks: attempt.marks.trim(),
//               rank: attempt.rank.trim()
//             }))
//         } : { previousAttempts: [] }),
//       };
      
//       console.log('Sending data to backend:', studentData);
      
//       // Call backend API
//       const response = await studentApi.registerStudent(studentData);
      
//       setSuccess(true);
//       console.log('Registration successful:', response);
      
//       // Reset form after successful submission
//       setTimeout(() => {
//         handleClear();
//       }, 2000);
      
//     } catch (err) {
//       console.error('Registration error:', err);
//       setError(err.message || 'Failed to register student. Please try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Display current photo (preview or uploaded)
//   const displayPhoto = photoPreview || formData.profilePhoto.url;

//   return (
//     <div className="bg-[#fafaf8] min-h-screen px-4 sm:px-6 lg:px-6 ">
//       {/* Header */}
//      <LandingHeader/>

//       {/* Mobile Navigation Menu */}
//       {isMobileMenuOpen && (
//         <div className="md:hidden bg-white border-b border-gray-100 shadow-lg">
//           <div className="flex flex-col px-6 py-4 space-y-4">
//             <button
//               onClick={() => {
//                 handleHomeClick();
//                 setIsMobileMenuOpen(false);
//               }}
//               className="px-4 py-3 bg-black text-white rounded-full text-sm font-medium text-center"
//             >
//               Home
//             </button>

//             <button className="px-4 py-3 text-gray-700 font-medium text-sm border border-gray-200 rounded-full">
//               Course
//             </button>

//             <button className="px-4 py-3 text-gray-700 font-medium text-sm border border-gray-200 rounded-full">
//               About Us
//             </button>

//             <button
//               onClick={() => {
//                 handleContactClick();
//                 setIsMobileMenuOpen(false);
//               }}
//               className="px-4 py-3 border border-gray-300 text-black rounded-full text-sm font-medium
//                        flex items-center justify-center gap-2 group"
//             >
//               <span>Contact Us</span>
//               <ArrowUpRight className="w-3 h-3" />
//             </button>
//           </div>
//         </div>
//       )}

//       <div className="max-w-4xl lg:max-w-6xl mx-auto mt-6 lg:mt-8">
//         {/* Header Title */}
//         <div className="text-center mb-6 lg:mb-8 px-4">
//           <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-900 mb-2">
//             Student Registration
//           </h1>
//           <p className="text-sm sm:text-base text-gray-600">
//             Fill in the required information to register. Other details are optional.
//           </p>
//         </div>

//         {/* Success and Error Messages */}
//         {error && (
//           <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
//             <div className="flex items-center">
//               <div className="flex-shrink-0">
//                 <X className="h-5 w-5 text-red-400" />
//               </div>
//               <div className="ml-3">
//                 <h3 className="text-sm font-medium text-red-800">Error</h3>
//                 <div className="mt-2 text-sm text-red-700">
//                   <p>{error}</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {success && (
//           <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
//             <div className="flex items-center">
//               <div className="flex-shrink-0">
//                 <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
//                   <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                 </svg>
//               </div>
//               <div className="ml-3">
//                 <h3 className="text-sm font-medium text-green-800">Registration Successful!</h3>
//                 <div className="mt-2 text-sm text-green-700">
//                   <p>Student has been registered successfully. Form will be cleared shortly.</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         <form onSubmit={handleSubmit}>
//           {/* Required Information Section */}
//           <div className="bg-white border border-gray-200 rounded-lg p-6 sm:p-8 mb-6">
//             <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6">
//               Required Information
//             </h2>

//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
//               <div className="sm:col-span-2">
//                 <label className="block text-sm font-medium text-gray-900 mb-2">
//                   Full Name <span className="text-red-600">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleInputChange}
//                   placeholder="Enter full name"
//                   required
//                   disabled={isSubmitting}
//                   className="w-full px-3 sm:px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
//                 />
//               </div>
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-900 mb-2">
//                   Email Address <span className="text-red-600">*</span>
//                 </label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleInputChange}
//                   placeholder="Enter email address"
//                   required
//                   disabled={isSubmitting}
//                   className="w-full px-3 sm:px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-900 mb-2">
//                   WhatsApp Number <span className="text-red-600">*</span>
//                 </label>
//                 <input
//                   type="tel"
//                   name="whatsappNumber"
//                   value={formData.whatsappNumber}
//                   onChange={handleInputChange}
//                   placeholder="Enter WhatsApp number with country code"
//                   required
//                   disabled={isSubmitting}
//                   className="w-full px-3 sm:px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
//                 />
//               </div>
//             </div>

//             {/* Fresher/Dropper Switch */}
//             <div className="mb-4 sm:mb-6">
//               <label className="block text-sm font-medium text-gray-900 mb-3">
//                 Student Type <span className="text-red-600">*</span>
//               </label>
//               <div className="flex items-center space-x-4">
//                 <button
//                   type="button"
//                   onClick={() => setFormData(prev => ({ ...prev, isFresher: true }))}
//                   disabled={isSubmitting}
//                   className={`px-6 py-3 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
//                     formData.isFresher
//                       ? 'bg-green-100 text-green-800 border border-green-300'
//                       : 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200'
//                   }`}
//                 >
//                   Fresher
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => setFormData(prev => ({ ...prev, isFresher: false }))}
//                   disabled={isSubmitting}
//                   className={`px-6 py-3 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
//                     !formData.isFresher
//                       ? 'bg-blue-100 text-blue-800 border border-blue-300'
//                       : 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200'
//                   }`}
//                 >
//                   Dropper
//                 </button>
//               </div>
//               <p className="text-sm text-gray-500 mt-2">
//                 {formData.isFresher 
//                   ? "Student is a fresher (first-time aspirant)" 
//                   : "Student is a dropper (preparing again for entrance exams)"}
//               </p>
//             </div>
//           </div>

//           {/* Other Details Section - Collapsible */}
//           <div className="bg-white border border-gray-200 rounded-lg p-6 sm:p-8 mb-6">
//             <div className="flex justify-between items-center mb-4 sm:mb-6">
//               <h2 className="text-base sm:text-lg font-semibold text-gray-900">
//                 Other Details (Optional)
//               </h2>
//               <button
//                 type="button"
//                 onClick={() => setShowOtherDetails(!showOtherDetails)}
//                 disabled={isSubmitting}
//                 className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {showOtherDetails ? 'Hide Details' : 'Show Details'}
//                 <ChevronDown 
//                   size={16} 
//                   className={`transition-transform duration-200 ${showOtherDetails ? 'rotate-180' : ''}`}
//                 />
//               </button>
//             </div>

//             {showOtherDetails && (
//               <>
//                 {/* Profile Photo Section */}
//                 <div className="mb-6 sm:mb-8 pb-6 sm:pb-8 border-b border-gray-200">
//                   <h3 className="text-sm sm:text-base font-medium text-gray-900 mb-4 sm:mb-6">
//                     Profile Photo (Optional)
//                   </h3>
//                   <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
//                     <div className="relative">
//                       <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50 overflow-hidden">
//                         {displayPhoto ? (
//                           <img 
//                             src={displayPhoto} 
//                             alt="Profile preview" 
//                             className="w-full h-full object-cover"
//                           />
//                         ) : (
//                           <User size={32} className="sm:w-10 sm:h-10 text-gray-400" />
//                         )}
                        
//                         {/* Loading overlay */}
//                         {isUploadingPhoto && (
//                           <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-full">
//                             <Loader2 className="w-6 h-6 text-white animate-spin" />
//                           </div>
//                         )}
//                       </div>
                      
//                       {/* Remove photo button */}
//                       {displayPhoto && !isUploadingPhoto && (
//                         <button
//                           type="button"
//                           onClick={removePhoto}
//                           disabled={isSubmitting}
//                           className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
//                         >
//                           <X size={12} />
//                         </button>
//                       )}
//                     </div>
                    
//                     <div className="text-center sm:text-left space-y-3">
//                       {!displayPhoto ? (
//                         <>
//                           <label className="cursor-pointer">
//                             <div className="inline-flex items-center gap-2 bg-gray-200 px-4 py-2 rounded-lg text-sm font-medium text-blue-900 hover:bg-gray-300 transition-colors">
//                               <Upload size={16} />
//                               Select Photo
//                             </div>
//                             <input
//                               type="file"
//                               accept=".jpg,.jpeg,.png,.gif,.webp"
//                               onChange={handlePhotoSelect}
//                               className="hidden"
//                               disabled={isSubmitting}
//                             />
//                           </label>
//                           <p className="text-xs text-gray-500">JPG, PNG, GIF, WebP up to 10MB</p>
//                         </>
//                       ) : (
//                         <div className="space-y-3">
//                           {formData.profilePhoto.url ? (
//                             <p className="text-sm text-green-600">
//                               ✓ Photo uploaded to Cloudinary
//                             </p>
//                           ) : selectedPhotoFile ? (
//                             <div className="space-y-2">
//                               <p className="text-sm text-amber-600">
//                                 ⚠ Photo selected but not uploaded
//                               </p>
//                               <button
//                                 type="button"
//                                 onClick={handlePhotoUpload}
//                                 disabled={isUploadingPhoto || isSubmitting}
//                                 className="inline-flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                               >
//                                 {isUploadingPhoto ? (
//                                   <>
//                                     <Loader2 className="w-4 h-4 animate-spin" />
//                                     Uploading...
//                                   </>
//                                 ) : (
//                                   <>
//                                     <Upload size={16} />
//                                     Upload to Cloudinary
//                                   </>
//                                 )}
//                               </button>
//                             </div>
//                           ) : null}
                          
//                           <div className="space-x-2">
//                             <button
//                               type="button"
//                               onClick={removePhoto}
//                               disabled={isSubmitting || isUploadingPhoto}
//                               className="inline-flex items-center gap-2 bg-red-50 px-3 py-1.5 rounded border border-red-200 text-xs font-medium text-red-700 hover:bg-red-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                             >
//                               <X size={12} />
//                               Remove Photo
//                             </button>
                            
//                             <label className="inline-flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded border border-gray-200 text-xs font-medium text-gray-700 hover:bg-gray-200 transition-colors cursor-pointer">
//                               <Upload size={12} />
//                               Change
//                               <input
//                                 type="file"
//                                 accept=".jpg,.jpeg,.png,.gif,.webp"
//                                 onChange={handlePhotoSelect}
//                                 className="hidden"
//                                 disabled={isSubmitting || isUploadingPhoto}
//                               />
//                             </label>
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Personal Information (Optional) */}
//                 <div className="mb-6 sm:mb-8 pb-6 sm:pb-8 border-b border-gray-200">
//                   <h3 className="text-sm sm:text-base font-medium text-gray-900 mb-4 sm:mb-6">
//                     Additional Personal Information
//                   </h3>
//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-900 mb-2">
//                         Date of Birth
//                       </label>
//                       <input
//                         type="text"
//                         name="dob"
//                         value={formData.dob}
//                         onChange={handleInputChange}
//                         placeholder="dd-mm-yyyy"
//                         disabled={isSubmitting}
//                         className="w-full px-3 sm:px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-900 mb-2">
//                         Class
//                       </label>
//                       <div className="relative">
//                         <select
//                           name="studentClass"
//                           value={formData.studentClass}
//                           onChange={handleInputChange}
//                           disabled={isSubmitting}
//                           className="w-full px-3 sm:px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none pr-10 disabled:opacity-50 disabled:cursor-not-allowed"
//                         >
//                           <option value="">Select class (optional)</option>
//                           {classOptions.map((className) => (
//                             <option key={className} value={className.toLowerCase()}>
//                               {className}
//                             </option>
//                           ))}
//                         </select>
//                         <ChevronDown
//                           size={18}
//                           className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400"
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Previous Attempts Section */}
//                 {!formData.isFresher && (
//                   <div className="mb-6 sm:mb-8 pb-6 sm:pb-8 border-b border-gray-200">
//                     <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4 sm:mb-6">
//                       <h3 className="text-sm sm:text-base font-medium text-gray-900">
//                         Previous Attempts (For Droppers)
//                       </h3>
//                       <button
//                         type="button"
//                         onClick={addAttempt}
//                         disabled={isSubmitting}
//                         className="inline-flex items-center gap-2 bg-gray-200 px-4 py-2 rounded-lg text-sm font-medium text-blue-900 hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                       >
//                         <Plus size={16} />
//                         Add Attempt
//                       </button>
//                     </div>

//                     {formData.previousAttempts.map((attempt, index) => (
//                       <div
//                         key={index}
//                         className={`mb-6 sm:mb-8 pb-6 sm:pb-8 ${
//                           index < formData.previousAttempts.length - 1
//                             ? 'border-b border-gray-200'
//                             : ''
//                         }`}
//                       >
//                         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
//                           <h4 className="text-sm font-medium text-gray-900">
//                             Attempt {index + 1}
//                           </h4>
//                           {formData.previousAttempts.length > 1 && (
//                             <button
//                               type="button"
//                               onClick={() => removeAttempt(index)}
//                               disabled={isSubmitting}
//                               className="inline-flex items-center gap-1.5 bg-red-50 px-3 py-1.5 rounded border border-red-200 text-xs font-medium text-red-700 hover:bg-red-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                             >
//                               <X size={12} />
//                               Remove
//                             </button>
//                           )}
//                         </div>

//                         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
//                           <div>
//                             <label className="block text-sm font-medium text-gray-900 mb-2">
//                               Attempt
//                             </label>
//                             <input
//                               type="text"
//                               value={attempt.attempt}
//                               onChange={(e) => handleAttemptChange(index, 'attempt', e.target.value)}
//                               placeholder="e.g., JEE Main 2023"
//                               disabled={isSubmitting}
//                               className="w-full px-3 sm:px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
//                             />
//                           </div>
//                           <div>
//                             <label className="block text-sm font-medium text-gray-900 mb-2">
//                               Marks/Score
//                             </label>
//                             <input
//                               type="text"
//                               value={attempt.marks}
//                               onChange={(e) => handleAttemptChange(index, 'marks', e.target.value)}
//                               placeholder="Enter marks or score"
//                               disabled={isSubmitting}
//                               className="w-full px-3 sm:px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
//                             />
//                           </div>
//                           <div className="sm:col-span-2 lg:col-span-1">
//                             <label className="block text-sm font-medium text-gray-900 mb-2">
//                               Rank
//                             </label>
//                             <input
//                               type="text"
//                               value={attempt.rank}
//                               onChange={(e) => handleAttemptChange(index, 'rank', e.target.value)}
//                               placeholder="Enter rank"
//                               disabled={isSubmitting}
//                               className="w-full px-3 sm:px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
//                             />
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 )}

//                 {/* Address Information Section */}
//                 <div>
//                   <h3 className="text-sm sm:text-base font-medium text-gray-900 mb-4 sm:mb-6">
//                     Address Information (Optional)
//                   </h3>

//                   <div className="mb-4 sm:mb-6">
//                     <label className="block text-sm font-medium text-gray-900 mb-2">
//                       Street Address
//                     </label>
//                     <input
//                       type="text"
//                       name="street"
//                       value={formData.street}
//                       onChange={handleInputChange}
//                       placeholder="Enter street address"
//                       disabled={isSubmitting}
//                       className="w-full px-3 sm:px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
//                     />
//                   </div>

//                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-900 mb-2">
//                         City
//                       </label>
//                       <input
//                         type="text"
//                         name="city"
//                         value={formData.city}
//                         onChange={handleInputChange}
//                         placeholder="Enter city"
//                         disabled={isSubmitting}
//                         className="w-full px-3 sm:px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-900 mb-2">
//                         State
//                       </label>
//                       <input
//                         type="text"
//                         name="state"
//                         value={formData.state}
//                         onChange={handleInputChange}
//                         placeholder="Enter state"
//                         disabled={isSubmitting}
//                         className="w-full px-3 sm:px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-900 mb-2">
//                         ZIP Code
//                       </label>
//                       <input
//                         type="text"
//                         name="zipCode"
//                         value={formData.zipCode}
//                         onChange={handleInputChange}
//                         placeholder="Enter ZIP code"
//                         disabled={isSubmitting}
//                         className="w-full px-3 sm:px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-900 mb-2">
//                         Country
//                       </label>
//                       <input
//                         type="text"
//                         name="country"
//                         value={formData.country}
//                         onChange={handleInputChange}
//                         placeholder="Enter country"
//                         disabled={isSubmitting}
//                         className="w-full px-3 sm:px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </>
//             )}
//           </div>

//           {/* Action Buttons */}
//           <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-4 mt-8 mb-2">
//             <button
//               type="button"
//               onClick={handleClear}
//               disabled={isSubmitting}
//               className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               Clear All
//             </button>
//             <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
//               <button
//                 type="submit"
//                 disabled={isSubmitting || (selectedPhotoFile && !formData.profilePhoto.url)}
//                 className="px-6 py-3 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-900 transition-colors w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//               >
//                 {isSubmitting ? (
//                   <>
//                     <Loader2 className="w-4 h-4 animate-spin" />
//                     Registering...
//                   </>
//                 ) : (
//                   'Register Student'
//                 )}
//               </button>
//             </div>
//           </div>
//         </form>
//       </div>

//       <LandingFooter/>
//     </div>
//   );
// }


import React, { useState } from 'react';
import { Upload, User, ChevronDown, Plus, X, Menu, X as CloseIcon, ArrowUpRight, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LandingHeader from '../components/LandingHeader'
import LandingFooter from '../components/LandingFooter';

// API Service
const API_BASE_URL = 'http://localhost:5000/api'; // Update with your backend URL

// Cloudinary Configuration - Using same details from provided code
const CLOUDINARY_CONFIG = {
  cloudName: 'djwkt80ss', // Same as in provided code
  uploadPreset: 'test_preset' // Same as in provided code
};

const studentApi = {
  registerStudent: async (studentData) => {
    const response = await fetch(`${API_BASE_URL}/students/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(studentData),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Registration failed');
    }
    
    return response.json();
  },
};

// Cloudinary upload function - Same as in provided code
const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_CONFIG.uploadPreset);
  formData.append('cloud_name', CLOUDINARY_CONFIG.cloudName);

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.cloudName}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    const data = await response.json();
    
    if (data.secure_url) {
      return {
        url: data.secure_url,
        publicId: data.public_id
      };
    } else {
      throw new Error(data.error?.message || 'Upload failed');
    }
  } catch (error) {
    throw error;
  }
};

export default function StudentRegistration() {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showOtherDetails, setShowOtherDetails] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [selectedPhotoFile, setSelectedPhotoFile] = useState(null);

  const handleContactClick = () => {
    navigate('/contact-us');
  };

  const handleHomeClick = () => {
    navigate('/landing');
  };

  const [formData, setFormData] = useState({
    profilePhoto: {
      url: '',
      publicId: ''
    },
    name: '', // Single name field instead of firstName and lastName
    email: '',
    whatsappNumber: '',
    isFresher: true,
    // Other details (optional)
    dob: '',
    studentClass: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    previousAttempts: [{ attempt: '', marks: '', rank: '' }]
  });

  const classOptions = ['6', '7', '8', '9', '10', '11', '12', 'Dropper'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError(null);
  };

  const handlePhotoSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type - Same validation as in provided code
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file (JPEG, PNG, GIF, etc.)');
      return;
    }
    
    // Validate file size - 10MB limit as in provided code
    if (file.size > 10 * 1024 * 1024) {
      setError('Image size should be less than 10MB');
      return;
    }

    setSelectedPhotoFile(file);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPhotoPreview(reader.result);
    };
    reader.readAsDataURL(file);

    // Clear any previous errors
    setError(null);
  };

  const handlePhotoUpload = async () => {
    if (!selectedPhotoFile) {
      setError('Please select a photo first');
      return;
    }

    setIsUploadingPhoto(true);
    setError(null);

    try {
      const cloudinaryResponse = await uploadToCloudinary(selectedPhotoFile);
      
      setFormData(prev => ({ 
        ...prev, 
        profilePhoto: {
          url: cloudinaryResponse.url,
          publicId: cloudinaryResponse.publicId
        }
      }));
      
      // Clear preview if it's a blob URL
      if (photoPreview && photoPreview.startsWith('blob:')) {
        URL.revokeObjectURL(photoPreview);
      }
      
      setError(null);
    } catch (err) {
      console.error('Photo upload error:', err);
      setError(`Failed to upload photo: ${err.message}`);
    } finally {
      setIsUploadingPhoto(false);
    }
  };

  const removePhoto = () => {
    setFormData(prev => ({ 
      ...prev, 
      profilePhoto: {
        url: '',
        publicId: ''
      }
    }));
    setPhotoPreview(null);
    setSelectedPhotoFile(null);
    
    // Clean up blob URL if exists
    if (photoPreview && photoPreview.startsWith('blob:')) {
      URL.revokeObjectURL(photoPreview);
    }
  };

  const handleAttemptChange = (index, field, value) => {
    const updatedAttempts = [...formData.previousAttempts];
    updatedAttempts[index][field] = value;
    setFormData(prev => ({ ...prev, previousAttempts: updatedAttempts }));
  };

  const addAttempt = () => {
    setFormData(prev => ({
      ...prev,
      previousAttempts: [...prev.previousAttempts, { attempt: '', marks: '', rank: '' }]
    }));
  };

  const removeAttempt = (index) => {
    if (formData.previousAttempts.length > 1) {
      const updatedAttempts = formData.previousAttempts.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, previousAttempts: updatedAttempts }));
    }
  };

  const handleClear = () => {
    setFormData({
      profilePhoto: {
        url: '',
        publicId: ''
      },
      name: '',
      email: '',
      whatsappNumber: '',
      isFresher: true,
      dob: '',
      studentClass: '',
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
      previousAttempts: [{ attempt: '', marks: '', rank: '' }]
    });
    setPhotoPreview(null);
    setSelectedPhotoFile(null);
    setError(null);
    setSuccess(false);
  };

  const validateForm = () => {
    const errors = [];
    
    if (!formData.name.trim()) errors.push('Name is required');
    if (!formData.email.trim()) errors.push('Email is required');
    if (!formData.whatsappNumber.trim()) errors.push('WhatsApp number is required');
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      errors.push('Please enter a valid email address');
    }
    
    return errors;
  };

  const formatDateForBackend = (dateString) => {
    if (!dateString) return null;
    
    const parts = dateString.split('-');
    if (parts.length === 3) {
      const [day, month, year] = parts;
      return `${year}-${month}-${day}`;
    }
    
    return dateString;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setError(validationErrors.join(', '));
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);
    
    try {
      // Prepare data for backend
      const studentData = {
        name: formData.name.trim(), // Single name field
        email: formData.email.trim().toLowerCase(),
        whatsappNumber: formData.whatsappNumber.trim(),
        isFresher: formData.isFresher,
        
        // Include profile photo if uploaded
        ...(formData.profilePhoto.url && { profilePhoto: formData.profilePhoto }),
        
        // Optional fields
        ...(formData.dob && { dob: formatDateForBackend(formData.dob) }),
        ...(formData.studentClass && { studentClass: formData.studentClass.toLowerCase() }),
        ...(formData.street || formData.city || formData.state || formData.zipCode || formData.country ? {
          address: {
            street: formData.street || '',
            city: formData.city || '',
            state: formData.state || '',
            zipCode: formData.zipCode || '',
            country: formData.country || ''
          }
        } : {}),
        ...(!formData.isFresher && formData.previousAttempts.length > 0 ? {
          previousAttempts: formData.previousAttempts
            .filter(attempt => attempt.attempt.trim() || attempt.marks.trim() || attempt.rank.trim())
            .map(attempt => ({
              attempt: attempt.attempt.trim(),
              marks: attempt.marks.trim(),
              rank: attempt.rank.trim()
            }))
        } : { previousAttempts: [] }),
      };
      
      console.log('Sending data to backend:', studentData);
      
      // Call backend API
      const response = await studentApi.registerStudent(studentData);
      
      setSuccess(true);
      console.log('Registration successful:', response);
      
      // Reset form after successful submission
      setTimeout(() => {
        handleClear();
      }, 2000);
      
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.message || 'Failed to register student. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Display current photo (preview or uploaded)
  const displayPhoto = photoPreview || formData.profilePhoto.url;

  return (
    <div className="bg-[#fafaf8] min-h-screen">
      {/* Header - Full width, no padding */}
      <div className="w-full">
        <LandingHeader/>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 shadow-lg w-full">
          <div className="flex flex-col px-6 py-4 space-y-4">
            <button
              onClick={() => {
                handleHomeClick();
                setIsMobileMenuOpen(false);
              }}
              className="px-4 py-3 bg-black text-white rounded-full text-sm font-medium text-center"
            >
              Home
            </button>

            <button className="px-4 py-3 text-gray-700 font-medium text-sm border border-gray-200 rounded-full">
              Course
            </button>

            <button className="px-4 py-3 text-gray-700 font-medium text-sm border border-gray-200 rounded-full">
              About Us
            </button>

            <button
              onClick={() => {
                handleContactClick();
                setIsMobileMenuOpen(false);
              }}
              className="px-4 py-3 border border-gray-300 text-black rounded-full text-sm font-medium
                       flex items-center justify-center gap-2 group"
            >
              <span>Contact Us</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}

      {/* Main Content - With padding */}
      <div className="max-w-full">
        <div className="max-w-4xl lg:max-w-6xl mx-auto mt-6 lg:mt-8 px-4 sm:px-6 lg:px-6">
          {/* Header Title */}
          <div className="text-center mb-6 lg:mb-8 px-4">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-900 mb-2">
              Student Registration
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              Fill in the required information to register. Other details are optional.
            </p>
          </div>

          {/* Success and Error Messages */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <X className="h-5 w-5 text-red-400" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">Error</h3>
                  <div className="mt-2 text-sm text-red-700">
                    <p>{error}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-green-800">Registration Successful!</h3>
                  <div className="mt-2 text-sm text-green-700">
                    <p>Student has been registered successfully. Form will be cleared shortly.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Required Information Section */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 sm:p-8 mb-6">
              <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6">
                Required Information
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Full Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter full name"
                    required
                    disabled={isSubmitting}
                    className="w-full px-3 sm:px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Email Address <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter email address"
                    required
                    disabled={isSubmitting}
                    className="w-full px-3 sm:px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    WhatsApp Number <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="tel"
                    name="whatsappNumber"
                    value={formData.whatsappNumber}
                    onChange={handleInputChange}
                    placeholder="Enter WhatsApp number with country code"
                    required
                    disabled={isSubmitting}
                    className="w-full px-3 sm:px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Fresher/Dropper Switch */}
              <div className="mb-4 sm:mb-6">
                <label className="block text-sm font-medium text-gray-900 mb-3">
                  Student Type <span className="text-red-600">*</span>
                </label>
                <div className="flex items-center space-x-4">
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, isFresher: true }))}
                    disabled={isSubmitting}
                    className={`px-6 py-3 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                      formData.isFresher
                        ? 'bg-green-100 text-green-800 border border-green-300'
                        : 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200'
                    }`}
                  >
                    Fresher
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, isFresher: false }))}
                    disabled={isSubmitting}
                    className={`px-6 py-3 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                      !formData.isFresher
                        ? 'bg-blue-100 text-blue-800 border border-blue-300'
                        : 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200'
                    }`}
                  >
                    Dropper
                  </button>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  {formData.isFresher 
                    ? "Student is a fresher (first-time aspirant)" 
                    : "Student is a dropper (preparing again for entrance exams)"}
                </p>
              </div>
            </div>

            {/* Other Details Section - Collapsible */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 sm:p-8 mb-6">
              <div className="flex justify-between items-center mb-4 sm:mb-6">
                <h2 className="text-base sm:text-lg font-semibold text-gray-900">
                  Other Details (Optional)
                </h2>
                <button
                  type="button"
                  onClick={() => setShowOtherDetails(!showOtherDetails)}
                  disabled={isSubmitting}
                  className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {showOtherDetails ? 'Hide Details' : 'Show Details'}
                  <ChevronDown 
                    size={16} 
                    className={`transition-transform duration-200 ${showOtherDetails ? 'rotate-180' : ''}`}
                  />
                </button>
              </div>

              {showOtherDetails && (
                <>
                  {/* Profile Photo Section */}
                  <div className="mb-6 sm:mb-8 pb-6 sm:pb-8 border-b border-gray-200">
                    <h3 className="text-sm sm:text-base font-medium text-gray-900 mb-4 sm:mb-6">
                      Profile Photo (Optional)
                    </h3>
                    <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                      <div className="relative">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50 overflow-hidden">
                          {displayPhoto ? (
                            <img 
                              src={displayPhoto} 
                              alt="Profile preview" 
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <User size={32} className="sm:w-10 sm:h-10 text-gray-400" />
                          )}
                          
                          {/* Loading overlay */}
                          {isUploadingPhoto && (
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-full">
                              <Loader2 className="w-6 h-6 text-white animate-spin" />
                            </div>
                          )}
                        </div>
                        
                        {/* Remove photo button */}
                        {displayPhoto && !isUploadingPhoto && (
                          <button
                            type="button"
                            onClick={removePhoto}
                            disabled={isSubmitting}
                            className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                          >
                            <X size={12} />
                          </button>
                        )}
                      </div>
                      
                      <div className="text-center sm:text-left space-y-3">
                        {!displayPhoto ? (
                          <>
                            <label className="cursor-pointer">
                              <div className="inline-flex items-center gap-2 bg-gray-200 px-4 py-2 rounded-lg text-sm font-medium text-blue-900 hover:bg-gray-300 transition-colors">
                                <Upload size={16} />
                                Select Photo
                              </div>
                              <input
                                type="file"
                                accept=".jpg,.jpeg,.png,.gif,.webp"
                                onChange={handlePhotoSelect}
                                className="hidden"
                                disabled={isSubmitting}
                              />
                            </label>
                            <p className="text-xs text-gray-500">JPG, PNG, GIF, WebP up to 10MB</p>
                          </>
                        ) : (
                          <div className="space-y-3">
                            {formData.profilePhoto.url ? (
                              <p className="text-sm text-green-600">
                                ✓ Photo uploaded to Cloudinary
                              </p>
                            ) : selectedPhotoFile ? (
                              <div className="space-y-2">
                                <p className="text-sm text-amber-600">
                                  ⚠ Photo selected but not uploaded
                                </p>
                                <button
                                  type="button"
                                  onClick={handlePhotoUpload}
                                  disabled={isUploadingPhoto || isSubmitting}
                                  className="inline-flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  {isUploadingPhoto ? (
                                    <>
                                      <Loader2 className="w-4 h-4 animate-spin" />
                                      Uploading...
                                    </>
                                  ) : (
                                    <>
                                      <Upload size={16} />
                                      Upload to Cloudinary
                                    </>
                                  )}
                                </button>
                              </div>
                            ) : null}
                            
                            <div className="space-x-2">
                              <button
                                type="button"
                                onClick={removePhoto}
                                disabled={isSubmitting || isUploadingPhoto}
                                className="inline-flex items-center gap-2 bg-red-50 px-3 py-1.5 rounded border border-red-200 text-xs font-medium text-red-700 hover:bg-red-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                <X size={12} />
                                Remove Photo
                              </button>
                              
                              <label className="inline-flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded border border-gray-200 text-xs font-medium text-gray-700 hover:bg-gray-200 transition-colors cursor-pointer">
                                <Upload size={12} />
                                Change
                                <input
                                  type="file"
                                  accept=".jpg,.jpeg,.png,.gif,.webp"
                                  onChange={handlePhotoSelect}
                                  className="hidden"
                                  disabled={isSubmitting || isUploadingPhoto}
                                />
                              </label>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Personal Information (Optional) */}
                  <div className="mb-6 sm:mb-8 pb-6 sm:pb-8 border-b border-gray-200">
                    <h3 className="text-sm sm:text-base font-medium text-gray-900 mb-4 sm:mb-6">
                      Additional Personal Information
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">
                          Date of Birth
                        </label>
                        <input
                          type="text"
                          name="dob"
                          value={formData.dob}
                          onChange={handleInputChange}
                          placeholder="dd-mm-yyyy"
                          disabled={isSubmitting}
                          className="w-full px-3 sm:px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">
                          Class
                        </label>
                        <div className="relative">
                          <select
                            name="studentClass"
                            value={formData.studentClass}
                            onChange={handleInputChange}
                            disabled={isSubmitting}
                            className="w-full px-3 sm:px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none pr-10 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <option value="">Select class (optional)</option>
                            {classOptions.map((className) => (
                              <option key={className} value={className.toLowerCase()}>
                                {className}
                              </option>
                            ))}
                          </select>
                          <ChevronDown
                            size={18}
                            className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Previous Attempts Section */}
                  {!formData.isFresher && (
                    <div className="mb-6 sm:mb-8 pb-6 sm:pb-8 border-b border-gray-200">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4 sm:mb-6">
                        <h3 className="text-sm sm:text-base font-medium text-gray-900">
                          Previous Attempts (For Droppers)
                        </h3>
                        <button
                          type="button"
                          onClick={addAttempt}
                          disabled={isSubmitting}
                          className="inline-flex items-center gap-2 bg-gray-200 px-4 py-2 rounded-lg text-sm font-medium text-blue-900 hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Plus size={16} />
                          Add Attempt
                        </button>
                      </div>

                      {formData.previousAttempts.map((attempt, index) => (
                        <div
                          key={index}
                          className={`mb-6 sm:mb-8 pb-6 sm:pb-8 ${
                            index < formData.previousAttempts.length - 1
                              ? 'border-b border-gray-200'
                              : ''
                          }`}
                        >
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
                            <h4 className="text-sm font-medium text-gray-900">
                              Attempt {index + 1}
                            </h4>
                            {formData.previousAttempts.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeAttempt(index)}
                                disabled={isSubmitting}
                                className="inline-flex items-center gap-1.5 bg-red-50 px-3 py-1.5 rounded border border-red-200 text-xs font-medium text-red-700 hover:bg-red-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                <X size={12} />
                                Remove
                              </button>
                            )}
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                            <div>
                              <label className="block text-sm font-medium text-gray-900 mb-2">
                                Attempt
                              </label>
                              <input
                                type="text"
                                value={attempt.attempt}
                                onChange={(e) => handleAttemptChange(index, 'attempt', e.target.value)}
                                placeholder="e.g., JEE Main 2023"
                                disabled={isSubmitting}
                                className="w-full px-3 sm:px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-900 mb-2">
                                Marks/Score
                              </label>
                              <input
                                type="text"
                                value={attempt.marks}
                                onChange={(e) => handleAttemptChange(index, 'marks', e.target.value)}
                                placeholder="Enter marks or score"
                                disabled={isSubmitting}
                                className="w-full px-3 sm:px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                              />
                            </div>
                            <div className="sm:col-span-2 lg:col-span-1">
                              <label className="block text-sm font-medium text-gray-900 mb-2">
                                Rank
                              </label>
                              <input
                                type="text"
                                value={attempt.rank}
                                onChange={(e) => handleAttemptChange(index, 'rank', e.target.value)}
                                placeholder="Enter rank"
                                disabled={isSubmitting}
                                className="w-full px-3 sm:px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Address Information Section */}
                  <div>
                    <h3 className="text-sm sm:text-base font-medium text-gray-900 mb-4 sm:mb-6">
                      Address Information (Optional)
                    </h3>

                    <div className="mb-4 sm:mb-6">
                      <label className="block text-sm font-medium text-gray-900 mb-2">
                        Street Address
                      </label>
                      <input
                        type="text"
                        name="street"
                        value={formData.street}
                        onChange={handleInputChange}
                        placeholder="Enter street address"
                        disabled={isSubmitting}
                        className="w-full px-3 sm:px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">
                          City
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          placeholder="Enter city"
                          disabled={isSubmitting}
                          className="w-full px-3 sm:px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">
                          State
                        </label>
                        <input
                          type="text"
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          placeholder="Enter state"
                          disabled={isSubmitting}
                          className="w-full px-3 sm:px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">
                          ZIP Code
                        </label>
                        <input
                          type="text"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleInputChange}
                          placeholder="Enter ZIP code"
                          disabled={isSubmitting}
                          className="w-full px-3 sm:px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">
                          Country
                        </label>
                        <input
                          type="text"
                          name="country"
                          value={formData.country}
                          onChange={handleInputChange}
                          placeholder="Enter country"
                          disabled={isSubmitting}
                          className="w-full px-3 sm:px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-4 mt-8 mb-2">
              <button
                type="button"
                onClick={handleClear}
                disabled={isSubmitting}
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Clear All
              </button>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button
                  type="submit"
                  disabled={isSubmitting || (selectedPhotoFile && !formData.profilePhoto.url)}
                  className="px-6 py-3 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-900 transition-colors w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Registering...
                    </>
                  ) : (
                    'Register Student'
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Footer - Full width, no padding */}
      <div className="w-full">
        <LandingFooter/>
      </div>
    </div>
  );
}