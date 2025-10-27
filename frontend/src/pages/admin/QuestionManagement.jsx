

// import React, { useEffect, useMemo, useState, useRef } from 'react';
// import { createQuestion, updateQuestion, deleteQuestion } from '../../services/admin';
// import { getQuestions } from '../../services/questions';
// import Card from '../../components/ui/Card';
// import Button from '../../components/ui/Button';
// import Input from '../../components/ui/Input';
// import Spinner from '../../components/ui/Spinner';
// import Badge from '../../components/ui/Badge';
// import { Plus, Edit, Trash2, Search, X, Upload, Image as ImageIcon, FolderOpen, Superscript, Subscript, Type, Bold, Italic } from 'lucide-react';
// import { formatRelativeTime } from '../../utils/formatters';
// import toast from 'react-hot-toast';
// import Fuse from 'fuse.js';

// // Rich Text Editor Component
// const RichTextEditor = ({ value, onChange, placeholder = "Enter text..." }) => {
//   const [showGreekMenu, setShowGreekMenu] = useState(false);
//   const textareaRef = useRef(null);

//   const greekLetters = [
//     { symbol: 'α', name: 'alpha' }, { symbol: 'β', name: 'beta' }, { symbol: 'γ', name: 'gamma' },
//     { symbol: 'δ', name: 'delta' }, { symbol: 'ε', name: 'epsilon' }, { symbol: 'ζ', name: 'zeta' },
//     { symbol: 'η', name: 'eta' }, { symbol: 'θ', name: 'theta' }, { symbol: 'ι', name: 'iota' },
//     { symbol: 'κ', name: 'kappa' }, { symbol: 'λ', name: 'lambda' }, { symbol: 'μ', name: 'mu' },
//     { symbol: 'ν', name: 'nu' }, { symbol: 'ξ', name: 'xi' }, { symbol: 'ο', name: 'omicron' },
//     { symbol: 'π', name: 'pi' }, { symbol: 'ρ', name: 'rho' }, { symbol: 'σ', name: 'sigma' },
//     { symbol: 'τ', name: 'tau' }, { symbol: 'υ', name: 'upsilon' }, { symbol: 'φ', name: 'phi' },
//     { symbol: 'χ', name: 'chi' }, { symbol: 'ψ', name: 'psi' }, { symbol: 'ω', name: 'omega' },
//     { symbol: 'Α', name: 'Alpha' }, { symbol: 'Β', name: 'Beta' }, { symbol: 'Γ', name: 'Gamma' },
//     { symbol: 'Δ', name: 'Delta' }, { symbol: 'Ε', name: 'Epsilon' }, { symbol: 'Ζ', name: 'Zeta' },
//     { symbol: 'Η', name: 'Eta' }, { symbol: 'Θ', name: 'Theta' }, { symbol: 'Ι', name: 'Iota' },
//     { symbol: 'Κ', name: 'Kappa' }, { symbol: 'Λ', name: 'Lambda' }, { symbol: 'Μ', name: 'Mu' },
//     { symbol: 'Ν', name: 'Nu' }, { symbol: 'Ξ', name: 'Xi' }, { symbol: 'Ο', name: 'Omicron' },
//     { symbol: 'Π', name: 'Pi' }, { symbol: 'Ρ', name: 'Rho' }, { symbol: 'Σ', name: 'Sigma' },
//     { symbol: 'Τ', name: 'Tau' }, { symbol: 'Υ', name: 'Upsilon' }, { symbol: 'Φ', name: 'Phi' },
//     { symbol: 'Χ', name: 'Chi' }, { symbol: 'Ψ', name: 'Psi' }, { symbol: 'Ω', name: 'Omega' }
//   ];

//   const insertText = (text) => {
//     if (!textareaRef.current) return;

//     const textarea = textareaRef.current;
//     const start = textarea.selectionStart;
//     const end = textarea.selectionEnd;
//     const newValue = value.substring(0, start) + text + value.substring(end);
    
//     onChange(newValue);
    
//     // Restore cursor position after state update
//     setTimeout(() => {
//       if (textareaRef.current) {
//         textareaRef.current.focus();
//         textareaRef.current.setSelectionRange(start + text.length, start + text.length);
//       }
//     }, 0);
//   };

//   const wrapSelection = (prefix, suffix = '') => {
//     if (!textareaRef.current) return;

//     const textarea = textareaRef.current;
//     const start = textarea.selectionStart;
//     const end = textarea.selectionEnd;
//     const selectedText = value.substring(start, end);
//     const newText = prefix + selectedText + suffix;
//     const newValue = value.substring(0, start) + newText + value.substring(end);
    
//     onChange(newValue);
    
//     // Restore cursor position after state update
//     setTimeout(() => {
//       if (textareaRef.current) {
//         textareaRef.current.focus();
//         if (selectedText) {
//           textareaRef.current.setSelectionRange(start + prefix.length, start + prefix.length + selectedText.length);
//         } else {
//           textareaRef.current.setSelectionRange(start + prefix.length, start + prefix.length);
//         }
//       }
//     }, 0);
//   };

//   // Handle click outside to close Greek menu
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (showGreekMenu && !event.target.closest('.greek-menu-container')) {
//         setShowGreekMenu(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [showGreekMenu]);

//   return (
//     <div className="border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent">
//       {/* Toolbar */}
//       <div className="flex flex-wrap items-center gap-1 p-2 bg-gray-50 border-b border-gray-200">
//         {/* Bold */}
//         <button
//           type="button"
//           onClick={() => wrapSelection('<b>', '</b>')}
//           className="p-2 rounded hover:bg-gray-200 transition-colors duration-200 tooltip"
//           title="Bold"
//         >
//           <Bold className="w-4 h-4" />
//         </button>

//         {/* Italic */}
//         <button
//           type="button"
//           onClick={() => wrapSelection('<i>', '</i>')}
//           className="p-2 rounded hover:bg-gray-200 transition-colors duration-200 tooltip"
//           title="Italic"
//         >
//           <Italic className="w-4 h-4" />
//         </button>

//         {/* Superscript */}
//         <button
//           type="button"
//           onClick={() => wrapSelection('<sup>', '</sup>')}
//           className="p-2 rounded hover:bg-gray-200 transition-colors duration-200 tooltip"
//           title="Superscript"
//         >
//           <Superscript className="w-4 h-4" />
//         </button>

//         {/* Subscript */}
//         <button
//           type="button"
//           onClick={() => wrapSelection('<sub>', '</sub>')}
//           className="p-2 rounded hover:bg-gray-200 transition-colors duration-200 tooltip"
//           title="Subscript"
//         >
//           <Subscript className="w-4 h-4" />
//         </button>

//         {/* Greek Letters Dropdown */}
//         <div className="relative greek-menu-container">
//           <button
//             type="button"
//             onClick={() => setShowGreekMenu(!showGreekMenu)}
//             className="p-2 rounded hover:bg-gray-200 transition-colors duration-200 flex items-center gap-1 tooltip"
//             title="Greek Letters"
//           >
//             <Type className="w-4 h-4" />
//             <span className="text-xs font-medium">Greek</span>
//           </button>

//           {showGreekMenu && (
//             <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-w-64 max-h-64 overflow-y-auto">
//               <div className="p-2">
//                 <div className="grid grid-cols-6 gap-8">
//                   {greekLetters.map((letter, index) => (
//                     <button
//                       key={index}
//                       type="button"
//                       onClick={() => {
//                         insertText(letter.symbol);
//                         setShowGreekMenu(false);
//                       }}
//                       className="p-2 rounded hover:bg-blue-100 transition-colors duration-200 text-sm font-medium tooltip"
//                       title={letter.name}
//                     >
//                       {letter.symbol}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Format Help */}
//         <div className="ml-2 text-xs text-gray-500">
//           Use {'<b>text</b>'} for bold, {'<i>text</i>'} for italic, {'<sup>text</sup>'} for superscript, {'<sub>text</sub>'} for subscript
//         </div>
//       </div>

//       {/* Textarea */}
//       <textarea
//         ref={textareaRef}
//         rows={4}
//         className="w-full px-3 py-2 focus:outline-none resize-vertical bg-white"
//         value={value}
//         onChange={(e) => onChange(e.target.value)}
//         placeholder={placeholder}
//       />

//       {/* Preview (optional) */}
//       {value && (
//         <div className="p-3 bg-gray-50 border-t border-gray-200">
//           <div className="text-xs text-gray-600 font-medium mb-1">Preview:</div>
//           <div className="text-sm text-gray-800 min-h-6">
//             {value
//               .replace(/<b>(.*?)<\/b>/g, '<strong>$1</strong>')
//               .replace(/<i>(.*?)<\/i>/g, '<em>$1</em>')
//               .replace(/<sup>(.*?)<\/sup>/g, '<sup>$1</sup>')
//               .replace(/<sub>(.*?)<\/sub>/g, '<sub>$1</sub>')
//               .split('\n').map((line, index) => (
//                 <div key={index} dangerouslySetInnerHTML={{ 
//                   __html: line
//                     .replace(/<b>(.*?)<\/b>/g, '<strong>$1</strong>')
//                     .replace(/<i>(.*?)<\/i>/g, '<em>$1</em>')
//                     .replace(/<sup>(.*?)<\/sup>/g, '<sup>$1</sup>')
//                     .replace(/<sub>(.*?)<\/sub>/g, '<sub>$1</sub>')
//                 }} />
//               ))
//             }
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// // Format text for display (use this when displaying the content)
// export const formatTextWithHTML = (text) => {
//   if (!text) return '';
  
//   return text
//     .replace(/<b>(.*?)<\/b>/g, '<strong>$1</strong>')
//     .replace(/<i>(.*?)<\/i>/g, '<em>$1</em>')
//     .replace(/<sup>(.*?)<\/sup>/g, '<sup>$1</sup>')
//     .replace(/<sub>(.*?)<\/sub>/g, '<sub>$1</sub>');
// };

// const QuestionManagement = () => {
//   const [questions, setQuestions] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [showForm, setShowForm] = useState(false);
//   const [editingQuestion, setEditingQuestion] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [toDelete, setToDelete] = useState(new Set());
//   const [newMode, setNewMode] = useState(false);
//   const [uploading, setUploading] = useState(null);
//   const [selectedFiles, setSelectedFiles] = useState({});

//   const initialFormData = {
//     subject: '',
//     chapter: '',
//     topic: '',
//     difficulty: '',
//     exam: '',
//     questionText: '',
//     questionImage: '',
//     options: Array(4).fill({ optionText: '', optionImage: '', isCorrect: false }),
//     hint: { text: '', image: '' },
//     approach: { text: '', image: '' },
//     solution: [{ stepNumber: 1, stepText: '', stepImage: '' }],
//     year: new Date().getFullYear()
//   };

//   const [formData, setFormData] = useState(initialFormData);
//   const [newData, setNewData] = useState({ 
//     ...initialFormData, 
//     subject: 'Physics', 
//     difficulty: 'Medium' 
//   });

//   // State for dropdown options - now organized by subject
//   const [dropdownOptions, setDropdownOptions] = useState({
//     physics: { chapters: [], topics: [] },
//     chemistry: { chapters: [], topics: [] },
//     biology: { chapters: [], topics: [] },
//     exams: []
//   });

//   useEffect(() => { 
//     loadQuestions() 
//   }, []);

//   // Update dropdown options when questions change - now organized by subject
//   useEffect(() => {
//     if (questions.length > 0) {
//       // Filter questions by subject and extract unique chapters and topics
//       const physicsQuestions = questions.filter(q => q.subject === 'Physics');
//       const chemistryQuestions = questions.filter(q => q.subject === 'Chemistry');
//       const biologyQuestions = questions.filter(q => q.subject === 'Biology');
      
//       const physicsChapters = [...new Set(physicsQuestions.map(q => q.chapter).filter(Boolean))].sort();
//       const physicsTopics = [...new Set(physicsQuestions.map(q => q.topic).filter(Boolean))].sort();
      
//       const chemistryChapters = [...new Set(chemistryQuestions.map(q => q.chapter).filter(Boolean))].sort();
//       const chemistryTopics = [...new Set(chemistryQuestions.map(q => q.topic).filter(Boolean))].sort();
      
//       const biologyChapters = [...new Set(biologyQuestions.map(q => q.chapter).filter(Boolean))].sort();
//       const biologyTopics = [...new Set(biologyQuestions.map(q => q.topic).filter(Boolean))].sort();
      
//       const exams = [...new Set(questions.map(q => q.exam).filter(Boolean))].sort();
      
//       setDropdownOptions({
//         physics: { chapters: physicsChapters, topics: physicsTopics },
//         chemistry: { chapters: chemistryChapters, topics: chemistryTopics },
//         biology: { chapters: biologyChapters, topics: biologyTopics },
//         exams
//       });
//     }
//   }, [questions]);

//   const loadQuestions = async () => {
//     setLoading(true);
//     try {
//       const res = await getQuestions({ limit: 1000 });
//       setQuestions(res.questions || []);
//       setToDelete(new Set());
//     } catch {
//       toast.error('Load failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fuse = useMemo(() => new Fuse(questions, {
//     keys: ['questionText','subject','chapter','topic','exam'],
//     threshold: 0.3, ignoreLocation: true
//   }), [questions]);

//   const filtered = useMemo(() => {
//     if (!searchTerm.trim()) return questions;
//     return fuse.search(searchTerm).map(r => r.item);
//   }, [searchTerm, fuse, questions]);

//   const resetAll = () => {
//     setFormData(initialFormData);
//     setNewData({ ...initialFormData, subject: 'Physics', difficulty: 'Medium' });
//     setEditingQuestion(null);
//     setShowForm(false);
//     setNewMode(false);
//     setUploading(null);
//     setSelectedFiles({});
//   };

//   // Custom dropdown input component for chapters, topics, and exams
//   const DropdownInput = ({ 
//     label, 
//     value, 
//     onChange, 
//     options, 
//     placeholder = "Select or type...",
//     required = false,
//     field
//   }) => {
//     const [showDropdown, setShowDropdown] = useState(false);
//     const inputRef = useRef(null);

//     const handleSelect = (option) => {
//       onChange(option);
//       setShowDropdown(false);
//     };

//     const handleInputChange = (e) => {
//       onChange(e.target.value);
//     };

//     const handleInputFocus = () => {
//       setShowDropdown(true);
//     };

//     const handleInputBlur = (e) => {
//       // Delay hiding dropdown to allow for selection
//       setTimeout(() => setShowDropdown(false), 200);
//     };

//     const filteredOptions = options.filter(option => 
//       option.toLowerCase().includes(value.toLowerCase())
//     );

//     return (
//       <div className="relative">
//         <label className="block text-sm font-medium mb-2 text-gray-700">
//           {label}
//         </label>
//         <div className="relative">
//           <Input
//             ref={inputRef}
//             value={value}
//             onChange={handleInputChange}
//             onFocus={handleInputFocus}
//             onBlur={handleInputBlur}
//             placeholder={placeholder}
//             required={required}
//             className="pr-8"
//           />
//           <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
//             <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//             </svg>
//           </div>
//         </div>
        
//         {showDropdown && filteredOptions.length > 0 && (
//           <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto">
//             {filteredOptions.map((option, index) => (
//               <div
//                 key={index}
//                 className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
//                 onClick={() => handleSelect(option)}
//               >
//                 {option}
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     );
//   };

//   // Get subject-specific chapters and topics
//   const getSubjectSpecificOptions = (subject) => {
//     const currentData = newMode ? newData : formData;
//     const selectedSubject = currentData.subject;
    
//     switch (selectedSubject) {
//       case 'Physics':
//         return dropdownOptions.physics;
//       case 'Chemistry':
//         return dropdownOptions.chemistry;
//       case 'Biology':
//         return dropdownOptions.biology;
//       default:
//         return { chapters: [], topics: [] };
//     }
//   };

//   // Handle subject change - reset chapter and topic when subject changes
//   const handleSubjectChange = (subject) => {
//     const setter = newMode ? setNewData : setFormData;
//     setter(prev => ({ 
//       ...prev, 
//       subject: subject,
//       chapter: '', // Reset chapter when subject changes
//       topic: ''    // Reset topic when subject changes
//     }));
//   };

//   const uploadToCloudinary = async (file) => {
//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append('upload_preset', 'test_preset');
//     formData.append('cloud_name', 'djwkt80ss');

//     try {
//       const response = await fetch(
//         `https://api.cloudinary.com/v1_1/djwkt80ss/image/upload`,
//         {
//           method: 'POST',
//           body: formData,
//         }
//       );

//       const data = await response.json();
      
//       if (data.secure_url) {
//         console.log('Upload successful:', data.secure_url);
//         return data.secure_url;
//       } else {
//         console.error('Cloudinary error response:', data);
//         throw new Error(data.error?.message || 'Upload failed');
//       }
//     } catch (error) {
//       console.error('Cloudinary upload error:', error);
//       throw error;
//     }
//   };

//   const handleFileSelect = (file, field, index = null, stepIndex = null) => {
//     if (!file) return;
    
//     if (!file.type.startsWith('image/')) {
//       toast.error('Please select an image file (JPEG, PNG, GIF, etc.)');
//       return;
//     }
    
//     if (file.size > 10 * 1024 * 1024) {
//       toast.error('Image size should be less than 10MB');
//       return;
//     }

//     const fileId = `${field}-${index}-${stepIndex}`;
    
//     setSelectedFiles(prev => ({
//       ...prev,
//       [fileId]: file
//     }));

//     const localUrl = URL.createObjectURL(file);
    
//     if (newMode) {
//       setNewData(prev => updateImageField(prev, field, localUrl, index, stepIndex));
//     } else {
//       setFormData(prev => updateImageField(prev, field, localUrl, index, stepIndex));
//     }

//     toast.success('Image selected! Click "Upload Image" to save to cloud.');
//   };

//   const handleImageUpload = async (field, index = null, stepIndex = null) => {
//     const fileId = `${field}-${index}-${stepIndex}`;
//     const file = selectedFiles[fileId];

//     if (!file) {
//       toast.error('Please select an image first');
//       return;
//     }

//     setUploading(fileId);
    
//     try {
//       console.log('Starting upload for:', field, file);
//       const cloudinaryUrl = await uploadToCloudinary(file);
//       console.log('Upload completed, URL:', cloudinaryUrl);
      
//       if (newMode) {
//         setNewData(prev => updateImageField(prev, field, cloudinaryUrl, index, stepIndex));
//       } else {
//         setFormData(prev => updateImageField(prev, field, cloudinaryUrl, index, stepIndex));
//       }

//       const currentData = newMode ? newData : formData;
//       const currentUrl = getCurrentImageUrl(currentData, field, index, stepIndex);
//       if (currentUrl && currentUrl.startsWith('blob:')) {
//         URL.revokeObjectURL(currentUrl);
//       }

//       setSelectedFiles(prev => {
//         const newSelected = { ...prev };
//         delete newSelected[fileId];
//         return newSelected;
//       });

//       toast.success('Image uploaded successfully to Cloudinary!');
//     } catch (error) {
//       console.error('Upload process error:', error);
//       toast.error(`Image upload failed: ${error.message}`);
//     } finally {
//       setUploading(null);
//     }
//   };

//   const getCurrentImageUrl = (data, field, index, stepIndex) => {
//     switch (field) {
//       case 'questionImage':
//         return data.questionImage;
//       case 'optionImage':
//         return data.options[index]?.optionImage;
//       case 'hintImage':
//         return data.hint.image;
//       case 'approachImage':
//         return data.approach.image;
//       case 'solutionImage':
//         return data.solution[stepIndex]?.stepImage;
//       default:
//         return '';
//     }
//   };

//   const updateImageField = (data, field, imageUrl, index, stepIndex) => {
//     const newData = { ...data };
    
//     switch (field) {
//       case 'questionImage':
//         newData.questionImage = imageUrl;
//         break;
//       case 'optionImage':
//         newData.options[index].optionImage = imageUrl;
//         break;
//       case 'hintImage':
//         newData.hint.image = imageUrl;
//         break;
//       case 'approachImage':
//         newData.approach.image = imageUrl;
//         break;
//       case 'solutionImage':
//         newData.solution[stepIndex].stepImage = imageUrl;
//         break;
//       default:
//         break;
//     }
    
//     return newData;
//   };

//   const removeImage = (field, index = null, stepIndex = null) => {
//     const fileId = `${field}-${index}-${stepIndex}`;
    
//     const currentData = newMode ? newData : formData;
//     const currentUrl = getCurrentImageUrl(currentData, field, index, stepIndex);
//     if (currentUrl && currentUrl.startsWith('blob:')) {
//       URL.revokeObjectURL(currentUrl);
//     }

//     setSelectedFiles(prev => {
//       const newSelected = { ...prev };
//       delete newSelected[fileId];
//       return newSelected;
//     });

//     if (newMode) {
//       setNewData(prev => updateImageField(prev, field, '', index, stepIndex));
//     } else {
//       setFormData(prev => updateImageField(prev, field, '', index, stepIndex));
//     }

//     toast.success('Image removed');
//   };

//   const handleSubmit = async e => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       if (newMode) {
//         await createQuestion(newData);
//         toast.success('Question created successfully');
//       } else {
//         await updateQuestion(editingQuestion._id, formData);
//         toast.success('Question updated successfully');
//       }
//       resetAll();
//       loadQuestions();
//     } catch (error) {
//       console.error('Save error:', error);
//       toast.error('Save failed');
//     } finally { 
//       setLoading(false);
//     }
//   };

//   const handleEdit = q => {
//     setEditingQuestion(q);
//     setFormData({ 
//       ...initialFormData,
//       ...q,
//       options: q.options?.length ? q.options : Array(4).fill({ optionText: '', optionImage: '', isCorrect: false }),
//       hint: q.hint || { text: '', image: '' },
//       approach: q.approach || { text: '', image: '' },
//       solution: q.solution?.length ? q.solution : [{ stepNumber: 1, stepText: '', stepImage: '' }]
//     });
//     setNewMode(false);
//     setShowForm(true);
//   };

//   const handleDelete = async id => {
//     if (!window.confirm('Are you sure you want to delete this question?')) return;
//     setLoading(true);
//     try { 
//       await deleteQuestion(id); 
//       toast.success('Question deleted successfully'); 
//       loadQuestions(); 
//     } catch (error) {
//       console.error('Delete error:', error);
//       toast.error('Delete failed');
//     } finally { 
//       setLoading(false);
//     }
//   };

//   const handleBulkDelete = async () => {
//     if (!window.confirm(`Are you sure you want to delete ${toDelete.size} questions?`)) return;
//     setLoading(true);
//     try {
//       await Promise.all(Array.from(toDelete).map(id => deleteQuestion(id)));
//       toast.success(`${toDelete.size} questions deleted successfully`);
//       loadQuestions();
//     } catch (error) {
//       console.error('Bulk delete error:', error);
//       toast.error('Bulk delete failed');
//     } finally { 
//       setLoading(false);
//     }
//   };

//   const toggleOption = (i, field, value) => {
//     const target = newMode ? newData : formData;
//     const setter = newMode ? setNewData : setFormData;
//     const opts = [...target.options];
//     if (field === 'isCorrect' && value) {
//       opts.forEach((o, j) => o.isCorrect = j === i);
//     } else {
//       opts[i] = { ...opts[i], [field]: value };
//     }
//     setter({ ...target, options: opts });
//   };

//   const addSolutionStep = () => {
//     const target = newMode ? newData : formData;
//     const setter = newMode ? setNewData : setFormData;
//     const newStep = {
//       stepNumber: target.solution.length + 1,
//       stepText: '',
//       stepImage: ''
//     };
//     setter({ ...target, solution: [...target.solution, newStep] });
//   };

//   const removeSolutionStep = (index) => {
//     const target = newMode ? newData : formData;
//     const setter = newMode ? setNewData : setFormData;
//     const newSolution = target.solution.filter((_, i) => i !== index)
//       .map((step, i) => ({ ...step, stepNumber: i + 1 }));
//     setter({ ...target, solution: newSolution });
//   };

//   const updateSolutionStep = (index, field, value) => {
//     const target = newMode ? newData : formData;
//     const setter = newMode ? setNewData : setFormData;
//     const newSolution = target.solution.map((step, i) =>
//       i === index ? { ...step, [field]: value } : step
//     );
//     setter({ ...target, solution: newSolution });
//   };

//   const ImageUploadField = ({ 
//     label, 
//     currentImage, 
//     field, 
//     index = null, 
//     stepIndex = null,
//     uploading = false 
//   }) => {
//     const fileId = `${field}-${index}-${stepIndex}`;
//     const hasSelectedFile = !!selectedFiles[fileId];
//     const isLocalImage = currentImage && currentImage.startsWith('blob:');
//     const isCloudImage = currentImage && !currentImage.startsWith('blob:');

//     return (
//       <div className="mb-4">
//         <label className="block text-sm font-medium mb-2 text-gray-700">{label}</label>
        
//         <div className="flex flex-wrap gap-2 mb-3">
//           <label className={`cursor-pointer px-4 py-2 rounded-lg border flex items-center gap-2 transition-colors ${
//             uploading 
//               ? 'bg-gray-400 text-white border-gray-400 cursor-not-allowed' 
//               : 'bg-blue-500 hover:bg-blue-600 text-white border-blue-500'
//           }`}>
//             <FolderOpen className="w-4 h-4" />
//             Select Image
//             <input
//               type="file"
//               accept="image/*"
//               className="hidden"
//               onChange={(e) => {
//                 const file = e.target.files[0];
//                 if (file) {
//                   handleFileSelect(file, field, index, stepIndex);
//                 }
//                 e.target.value = '';
//               }}
//               disabled={uploading}
//             />
//           </label>

//           <Button
//             type="button"
//             variant="success"
//             size="sm"
//             onClick={() => handleImageUpload(field, index, stepIndex)}
//             disabled={uploading || !hasSelectedFile}
//             className="flex items-center gap-2 bg-red-400"
//           >
//             <Upload className="w-4 h-4 " />
//             {uploading ? 'Uploading...' : 'Upload Image'}
//           </Button>

//           {currentImage && (
//             <Button
//               type="button"
//               variant="danger"
//               size="sm"
//               onClick={() => removeImage(field, index, stepIndex)}
//               disabled={uploading}
//               className="flex items-center gap-2"
//             >
//               <X className="w-4 h-4" />
//               Remove
//             </Button>
//           )}
//         </div>

//         <div className="flex items-center gap-3 mb-3">
//           {hasSelectedFile && !isCloudImage && (
//             <div className="flex items-center gap-2">
//               <ImageIcon className="w-4 h-4 text-orange-500" />
//               <span className="text-xs text-orange-600 font-medium">
//                 Image selected - Click "Upload Image" to save to cloud
//               </span>
//             </div>
//           )}
//           {isCloudImage && (
//             <div className="flex items-center gap-2">
//               <ImageIcon className="w-4 h-4 text-green-600" />
//               <span className="text-xs text-green-600 font-medium">
//                 Image uploaded to Cloudinary
//               </span>
//             </div>
//           )}
//         </div>

//         {currentImage && (
//           <div className="mt-3">
//             <div className="flex items-center gap-2 mb-2">
//               <span className="text-sm font-medium text-gray-700">Preview:</span>
//               {isLocalImage && (
//                 <Badge variant="warning" text="Local (Not uploaded)" />
//               )}
//               {isCloudImage && (
//                 <Badge variant="success" text="Cloud Storage" />
//               )}
//             </div>
//             <img 
//               src={currentImage} 
//               alt="Preview" 
//               className="max-w-48 max-h-48 object-contain border-2 border-green-200 rounded-lg bg-gray-50 p-2 shadow-sm"
//               onError={(e) => {
//                 console.error('Image failed to load:', currentImage);
//                 e.target.style.display = 'none';
//               }}
//               onLoad={(e) => {
//                 console.log('Image loaded successfully');
//               }}
//             />
//           </div>
//         )}
//       </div>
//     );
//   };

//   return (
//     <div className="max-w-7xl mx-auto p-4">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold text-gray-800">Question Management</h1>
//         <div className="flex gap-2">
//           {toDelete.size > 0 && (
//             <Button className='bg-red-400' variant="danger" onClick={handleBulkDelete}>
//               Delete ({toDelete.size})
//             </Button>
//           )}
//           <Button className="outline text-black hover:bg-gray-600 hover:text-white" onClick={() => { resetAll(); setNewMode(true); setShowForm(true) }}>
//             <Plus className="w-4 h-4 mr-1" /> Add Question
//           </Button>
//         </div>
//       </div>

//       <div className="relative mb-6">
//         <Input
//           className="pl-10 pr-10"
//           placeholder="Search questions by text, chapter, topic, or exam..."
//           value={searchTerm}
//           onChange={e => setSearchTerm(e.target.value)}
//         />
//         <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//         {searchTerm && (
//           <button 
//             className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
//             onClick={() => setSearchTerm('')}
//           >
//             <X className="w-4 h-4" />
//           </button>
//         )}
//       </div>

//       {loading ? (
//         <div className="flex justify-center py-12">
//           <Spinner size={32} />
//         </div>
//       ) : filtered.length === 0 ? (
//         <Card className="text-center py-12">
//           <p className="text-gray-500 text-lg">
//             {searchTerm ? 'No questions found matching your search.' : 'No questions available.'}
//           </p>
//         </Card>
//       ) : (
//         filtered.map(q => (
//           <Card key={q._id} className="flex items-start mb-4 p-4 hover:shadow-md transition-shadow">
//             <input
//               type="checkbox"
//               className="mt-1 mr-3 h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
//               checked={toDelete.has(q._id)}
//               onChange={() => {
//                 const s = new Set(toDelete);
//                 s.has(q._id) ? s.delete(q._id) : s.add(q._id);
//                 setToDelete(s);
//               }}
//             />
//             <div className="flex-1">
//               <div className="flex gap-2 mb-2 flex-wrap">
//                 <Badge variant="primary" text={q.subject} />
//                 <Badge variant={q.difficulty === 'Easy' ? 'success' : q.difficulty === 'Medium' ? 'warning' : 'danger'} text={q.difficulty} />
//                 <Badge variant="outline" text={`${q.chapter} → ${q.topic}`} />
//                 {q.year && <Badge variant="secondary" text={`Year: ${q.year}`} />}
//                 {q.exam && <Badge variant="info" text={`Exam: ${q.exam}`} />}
//               </div>
//               <div 
//                 className="font-medium mb-2 text-gray-800 line-clamp-2"
//                 dangerouslySetInnerHTML={{ __html: formatTextWithHTML(q.questionText) }}
//               />
//               {(q.questionImage || q.options?.some(opt => opt.optionImage)) && (
//                 <div className="flex items-center gap-2 mt-1">
//                   <ImageIcon className="w-4 h-4 text-blue-500" />
//                   <span className="text-xs text-blue-500 font-medium">Contains images</span>
//                 </div>
//               )}
//               <p className="text-xs text-gray-500 mt-2">
//                 Created {formatRelativeTime(q.createdAt)}
//               </p>
//             </div>
//             <div className="flex gap-2">
//               <Button size="sm" variant="outline" onClick={() => handleEdit(q)}>
//                 <Edit className="w-4 h-4" />
//               </Button>
//               <Button className="bg-red-400" size="sm" variant="danger" onClick={() => handleDelete(q._id)}>
//                 <Trash2 className="w-4 h-4" />
//               </Button>
//             </div>
//           </Card>
//         ))
//       )}

//       {/* Modal */}
//       {showForm && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <Card className="w-full max-w-4xl p-6 overflow-y-auto max-h-[90vh]">
//             <div className="flex justify-between items-center mb-6">
//               <h2 className="text-xl font-bold text-gray-800 ">
//                 {newMode ? 'Add New Question' : 'Edit Question'}
//               </h2>
//               <button 
//                 onClick={resetAll}
//                 className="text-gray-500 hover:text-gray-700 p-1 transition-colors"
//               >
//                 <X className="w-6 h-6" />
//               </button>
//             </div>
            
//             <form onSubmit={handleSubmit} className="space-y-6">
//               {/* Basic Information */}
//               <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium mb-2 text-gray-700">
//                     Subject
//                   </label>
//                   <select
//                     required
//                     value={(newMode ? newData : formData).subject}
//                     onChange={(e) => handleSubjectChange(e.target.value)}
//                     className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   >
//                     <option value="">Select Subject</option>
//                     {['Physics', 'Chemistry', 'Biology'].map(v => (
//                       <option key={v} value={v}>{v}</option>
//                     ))}
//                   </select>
//                 </div>

//                 <div>
//                   <DropdownInput
//                     label="Chapter"
//                     value={(newMode ? newData : formData).chapter}
//                     onChange={(value) => {
//                       const setter = newMode ? setNewData : setFormData;
//                       setter(prev => ({ ...prev, chapter: value }));
//                     }}
//                     options={getSubjectSpecificOptions().chapters}
//                     placeholder="Select or type chapter..."
//                     required={true}
//                     field="chapter"
//                   />
//                 </div>

//                 <div>
//                   <DropdownInput
//                     label="Topic"
//                     value={(newMode ? newData : formData).topic}
//                     onChange={(value) => {
//                       const setter = newMode ? setNewData : setFormData;
//                       setter(prev => ({ ...prev, topic: value }));
//                     }}
//                     options={getSubjectSpecificOptions().topics}
//                     placeholder="Select or type topic..."
//                     required={true}
//                     field="topic"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium mb-2 text-gray-700">
//                     Difficulty
//                   </label>
//                   <select
//                     required
//                     value={(newMode ? newData : formData).difficulty}
//                     onChange={e => {
//                       const setter = newMode ? setNewData : setFormData;
//                       setter(prev => ({ ...prev, difficulty: e.target.value }));
//                     }}
//                     className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   >
//                     <option value="">Select Difficulty</option>
//                     {['Easy', 'Medium', 'Hard'].map(v => (
//                       <option key={v} value={v}>{v}</option>
//                     ))}
//                   </select>
//                 </div>

//                 <div>
//                   <DropdownInput
//                     label="Exam"
//                     value={(newMode ? newData : formData).exam}
//                     onChange={(value) => {
//                       const setter = newMode ? setNewData : setFormData;
//                       setter(prev => ({ ...prev, exam: value }));
//                     }}
//                     options={dropdownOptions.exams}
//                     placeholder="Select or type exam..."
//                     required={false}
//                     field="exam"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium mb-2 text-gray-700">
//                     Year
//                   </label>
//                   <Input
//                     type="number"
//                     min="2000"
//                     max="2030"
//                     value={(newMode ? newData : formData).year}
//                     onChange={e => {
//                       const setter = newMode ? setNewData : setFormData;
//                       setter(prev => ({ ...prev, year: parseInt(e.target.value) }));
//                     }}
//                     placeholder="Enter year"
//                   />
//                 </div>
//               </div>

//               {/* Question Text & Image */}
//               <div>
//                 <label className="block text-sm font-medium mb-2 text-gray-700">
//                   Question Text
//                 </label>
//                 <RichTextEditor
//                   value={(newMode ? newData : formData).questionText}
//                   onChange={(value) => {
//                     const setter = newMode ? setNewData : setFormData;
//                     setter(prev => ({ ...prev, questionText: value }));
//                   }}
//                   placeholder="Enter the question text..."
//                 />
//                 <ImageUploadField
//                   label="Question Image"
//                   currentImage={(newMode ? newData : formData).questionImage}
//                   field="questionImage"
//                   uploading={uploading === 'questionImage-null-null'}
//                 />
//               </div>

//               {/* Options */}
//               <div>
//                 <label className="block text-sm font-medium mb-3 text-gray-700">
//                   Options
//                 </label>
//                 {(newMode ? newData : formData).options.map((opt, i) => (
//                   <div key={i} className="mb-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
//                     <div className="flex gap-3 mb-3 items-start">
//                       <input
//                         type="radio"
//                         name="correctOption"
//                         checked={opt.isCorrect}
//                         onChange={() => toggleOption(i, 'isCorrect', true)}
//                         className="mt-2 text-blue-600 focus:ring-blue-500"
//                       />
//                       <div className="flex-1">
//                         <RichTextEditor
//                           value={opt.optionText}
//                           onChange={(value) => toggleOption(i, 'optionText', value)}
//                           placeholder={`Option ${i + 1}`}
//                         />
//                       </div>
//                     </div>
//                     <ImageUploadField
//                       label={`Option ${i + 1} Image`}
//                       currentImage={opt.optionImage}
//                       field="optionImage"
//                       index={i}
//                       uploading={uploading === `optionImage-${i}-null`}
//                     />
//                   </div>
//                 ))}
//               </div>

//               {/* Hint & Approach */}
//               <div className="flex gap-6">
//                 <div className="flex-1">
//                   <label className="block text-sm font-medium mb-2 text-gray-700">Hint</label>
//                   <RichTextEditor
//                     value={(newMode ? newData : formData).hint.text}
//                     onChange={(value) => {
//                       const setter = newMode ? setNewData : setFormData;
//                       setter(prev => ({
//                         ...prev,
//                         hint: { ...prev.hint, text: value }
//                       }));
//                     }}
//                     placeholder="Enter hint text (optional)"
//                   />
//                   <ImageUploadField
//                     label="Hint Image"
//                     currentImage={(newMode ? newData : formData).hint.image}
//                     field="hintImage"
//                     uploading={uploading === 'hintImage-null-null'}
//                   />
//                 </div>

//                 <div className="flex-1">
//                   <label className="block text-sm font-medium mb-2 text-gray-700">Concept</label>
//                   <RichTextEditor
//                     value={(newMode ? newData : formData).approach.text}
//                     onChange={(value) => {
//                       const setter = newMode ? setNewData : setFormData;
//                       setter(prev => ({
//                         ...prev,
//                         approach: { ...prev.approach, text: value }
//                       }));
//                     }}
//                     placeholder="Enter concept text (optional)"
//                   />
//                   <ImageUploadField
//                     label="Concept Image"
//                     currentImage={(newMode ? newData : formData).approach.image}
//                     field="approachImage"
//                     uploading={uploading === 'approachImage-null-null'}
//                   />
//                 </div>
//               </div>

//               {/* Solution Steps */}
//               <div>
//                 <div className="flex justify-between items-center mb-3">
//                   <label className="block text-sm font-medium text-gray-700">Solution Steps</label>
//                   <Button className="cursor-pointer text-black hover:underline" type="button" size="sm" onClick={addSolutionStep}>
//                     <Plus className="w-4 h-4 mr-1  " /> Add Step
//                   </Button>
//                 </div>
//                 {(newMode ? newData : formData).solution.map((step, index) => (
//                   <div key={index} className="mb-4 p-4 border border-gray-200 rounded-lg bg-white">
//                     <div className="flex justify-between items-center mb-3">
//                       <span className="font-medium text-sm text-gray-800">Step {step.stepNumber}</span>
//                       {(newMode ? newData : formData).solution.length > 1 && (
//                         <Button
//                           type="button"
//                           variant="danger"
//                           size="sm"
//                           onClick={() => removeSolutionStep(index)}
//                         >
//                           <Trash2 className="w-4 h-4" />
//                         </Button>
//                       )}
//                     </div>
//                     <RichTextEditor
//                       value={step.stepText}
//                       onChange={(value) => updateSolutionStep(index, 'stepText', value)}
//                       placeholder={`Describe step ${step.stepNumber}...`}
//                     />
//                     <ImageUploadField
//                       label={`Step ${step.stepNumber} Image`}
//                       currentImage={step.stepImage}
//                       field="solutionImage"
//                       stepIndex={index}
//                       uploading={uploading === `solutionImage-null-${index}`}
//                     />
//                   </div>
//                 ))}
//               </div>

//               {/* Form Actions */}
//               <div className="flex justify-end gap-3 pt-6 border-t">
//                 <Button type="button" variant="outline" onClick={resetAll} className="cursor-pointer">
//                   Cancel
//                 </Button>
//                 <Button 
//                   type="submit" 
//                   disabled={loading || uploading}
//                   className="min-w-24 outline text-black hover:bg-gray-600 hover:text-white cursor-pointer"
//                 >
//                   {loading ? 'Saving...' : uploading ? 'Uploading...' : newMode ? 'Create Question' : 'Update Question'}
//                 </Button>
//               </div>
//             </form>
//           </Card>
//         </div>
//       )}
//     </div>
//   );
// };

// export default QuestionManagement;







import React, { useEffect, useMemo, useState, useRef } from 'react';
import { createQuestion, updateQuestion, deleteQuestion } from '../../services/admin';
import { getQuestions } from '../../services/questions';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Spinner from '../../components/ui/Spinner';
import Badge from '../../components/ui/Badge';
import { Plus, Edit, Trash2, Search, X, Upload, Image as ImageIcon, FolderOpen, Superscript, Subscript, Type, Bold, Italic } from 'lucide-react';
import { formatRelativeTime } from '../../utils/formatters';
import toast from 'react-hot-toast';
import Fuse from 'fuse.js';

// Rich Text Editor Component
const RichTextEditor = ({ value, onChange, placeholder = "Enter text..." }) => {
  const [showGreekMenu, setShowGreekMenu] = useState(false);
  const textareaRef = useRef(null);

  const greekLetters = [
    { symbol: 'α', name: 'alpha' }, { symbol: 'β', name: 'beta' }, { symbol: 'γ', name: 'gamma' },
    { symbol: 'δ', name: 'delta' }, { symbol: 'ε', name: 'epsilon' }, { symbol: 'ζ', name: 'zeta' },
    { symbol: 'η', name: 'eta' }, { symbol: 'θ', name: 'theta' }, { symbol: 'ι', name: 'iota' },
    { symbol: 'κ', name: 'kappa' }, { symbol: 'λ', name: 'lambda' }, { symbol: 'μ', name: 'mu' },
    { symbol: 'ν', name: 'nu' }, { symbol: 'ξ', name: 'xi' }, { symbol: 'ο', name: 'omicron' },
    { symbol: 'π', name: 'pi' }, { symbol: 'ρ', name: 'rho' }, { symbol: 'σ', name: 'sigma' },
    { symbol: 'τ', name: 'tau' }, { symbol: 'υ', name: 'upsilon' }, { symbol: 'φ', name: 'phi' },
    { symbol: 'χ', name: 'chi' }, { symbol: 'ψ', name: 'psi' }, { symbol: 'ω', name: 'omega' },
    { symbol: 'Α', name: 'Alpha' }, { symbol: 'Β', name: 'Beta' }, { symbol: 'Γ', name: 'Gamma' },
    { symbol: 'Δ', name: 'Delta' }, { symbol: 'Ε', name: 'Epsilon' }, { symbol: 'Ζ', name: 'Zeta' },
    { symbol: 'Η', name: 'Eta' }, { symbol: 'Θ', name: 'Theta' }, { symbol: 'Ι', name: 'Iota' },
    { symbol: 'Κ', name: 'Kappa' }, { symbol: 'Λ', name: 'Lambda' }, { symbol: 'Μ', name: 'Mu' },
    { symbol: 'Ν', name: 'Nu' }, { symbol: 'Ξ', name: 'Xi' }, { symbol: 'Ο', name: 'Omicron' },
    { symbol: 'Π', name: 'Pi' }, { symbol: 'Ρ', name: 'Rho' }, { symbol: 'Σ', name: 'Sigma' },
    { symbol: 'Τ', name: 'Tau' }, { symbol: 'Υ', name: 'Upsilon' }, { symbol: 'Φ', name: 'Phi' },
    { symbol: 'Χ', name: 'Chi' }, { symbol: 'Ψ', name: 'Psi' }, { symbol: 'Ω', name: 'Omega' }
  ];

  const insertText = (text) => {
    if (!textareaRef.current) return;

    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const newValue = value.substring(0, start) + text + value.substring(end);
    
    onChange(newValue);
    
    // Restore cursor position after state update
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        textareaRef.current.setSelectionRange(start + text.length, start + text.length);
      }
    }, 0);
  };

  const wrapSelection = (prefix, suffix = '') => {
    if (!textareaRef.current) return;

    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    const newText = prefix + selectedText + suffix;
    const newValue = value.substring(0, start) + newText + value.substring(end);
    
    onChange(newValue);
    
    // Restore cursor position after state update
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        if (selectedText) {
          textareaRef.current.setSelectionRange(start + prefix.length, start + prefix.length + selectedText.length);
        } else {
          textareaRef.current.setSelectionRange(start + prefix.length, start + prefix.length);
        }
      }
    }, 0);
  };

  // Handle click outside to close Greek menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showGreekMenu && !event.target.closest('.greek-menu-container')) {
        setShowGreekMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showGreekMenu]);

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 bg-gray-50 border-b border-gray-200">
        {/* Bold */}
        <button
          type="button"
          onClick={() => wrapSelection('<b>', '</b>')}
          className="p-2 rounded hover:bg-gray-200 transition-colors duration-200 tooltip"
          title="Bold"
        >
          <Bold className="w-4 h-4" />
        </button>

        {/* Italic */}
        <button
          type="button"
          onClick={() => wrapSelection('<i>', '</i>')}
          className="p-2 rounded hover:bg-gray-200 transition-colors duration-200 tooltip"
          title="Italic"
        >
          <Italic className="w-4 h-4" />
        </button>

        {/* Superscript */}
        <button
          type="button"
          onClick={() => wrapSelection('<sup>', '</sup>')}
          className="p-2 rounded hover:bg-gray-200 transition-colors duration-200 tooltip"
          title="Superscript"
        >
          <Superscript className="w-4 h-4" />
        </button>

        {/* Subscript */}
        <button
          type="button"
          onClick={() => wrapSelection('<sub>', '</sub>')}
          className="p-2 rounded hover:bg-gray-200 transition-colors duration-200 tooltip"
          title="Subscript"
        >
          <Subscript className="w-4 h-4" />
        </button>

        {/* Greek Letters Dropdown */}
        <div className="relative greek-menu-container">
          <button
            type="button"
            onClick={() => setShowGreekMenu(!showGreekMenu)}
            className="p-2 rounded hover:bg-gray-200 transition-colors duration-200 flex items-center gap-1 tooltip"
            title="Greek Letters"
          >
            <Type className="w-4 h-4" />
            <span className="text-xs font-medium">Greek</span>
          </button>

          {showGreekMenu && (
            <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-w-64 max-h-64 overflow-y-auto">
              <div className="p-2">
                <div className="grid grid-cols-6 gap-8">
                  {greekLetters.map((letter, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => {
                        insertText(letter.symbol);
                        setShowGreekMenu(false);
                      }}
                      className="p-2 rounded hover:bg-blue-100 transition-colors duration-200 text-sm font-medium tooltip"
                      title={letter.name}
                    >
                      {letter.symbol}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Format Help */}
        <div className="ml-2 text-xs text-gray-500">
          Use {'<b>text</b>'} for bold, {'<i>text</i>'} for italic, {'<sup>text</sup>'} for superscript, {'<sub>text</sub>'} for subscript
        </div>
      </div>

      {/* Textarea */}
      <textarea
        ref={textareaRef}
        rows={4}
        className="w-full px-3 py-2 focus:outline-none resize-vertical bg-white"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />

      {/* Preview (optional) */}
      {value && (
        <div className="p-3 bg-gray-50 border-t border-gray-200">
          <div className="text-xs text-gray-600 font-medium mb-1">Preview:</div>
          <div className="text-sm text-gray-800 min-h-6">
            {value
              .replace(/<b>(.*?)<\/b>/g, '<strong>$1</strong>')
              .replace(/<i>(.*?)<\/i>/g, '<em>$1</em>')
              .replace(/<sup>(.*?)<\/sup>/g, '<sup>$1</sup>')
              .replace(/<sub>(.*?)<\/sub>/g, '<sub>$1</sub>')
              .split('\n').map((line, index) => (
                <div key={index} dangerouslySetInnerHTML={{ 
                  __html: line
                    .replace(/<b>(.*?)<\/b>/g, '<strong>$1</strong>')
                    .replace(/<i>(.*?)<\/i>/g, '<em>$1</em>')
                    .replace(/<sup>(.*?)<\/sup>/g, '<sup>$1</sup>')
                    .replace(/<sub>(.*?)<\/sub>/g, '<sub>$1</sub>')
                }} />
              ))
            }
          </div>
        </div>
      )}
    </div>
  );
};

// Format text for display (use this when displaying the content)
export const formatTextWithHTML = (text) => {
  if (!text) return '';
  
  return text
    .replace(/<b>(.*?)<\/b>/g, '<strong>$1</strong>')
    .replace(/<i>(.*?)<\/i>/g, '<em>$1</em>')
    .replace(/<sup>(.*?)<\/sup>/g, '<sup>$1</sup>')
    .replace(/<sub>(.*?)<\/sub>/g, '<sub>$1</sub>');
};

// Custom dropdown input component for chapters, topics, and exams
const DropdownInput = React.memo(({ 
  label, 
  value, 
  onChange, 
  options, 
  placeholder = "Select or type...",
  required = false
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const inputRef = useRef(null);

  // Sync inputValue with value prop
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleSelect = (option) => {
    setInputValue(option);
    onChange(option);
    setShowDropdown(false);
  };

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange(newValue);
  };

  const handleInputFocus = () => {
    setShowDropdown(true);
  };

  const handleInputBlur = (e) => {
    // Use setTimeout to allow click events on dropdown items to fire first
    setTimeout(() => {
      // If the blurred element is not a dropdown item, close the dropdown
      if (!e.relatedTarget || !e.relatedTarget.closest('.dropdown-options')) {
        setShowDropdown(false);
      }
    }, 200);
  };

  const handleOptionMouseDown = (e, option) => {
    // Prevent the blur event from firing immediately
    e.preventDefault();
    handleSelect(option);
  };

  const filteredOptions = options.filter(option => 
    option.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <div className="relative">
      <label className="block text-sm font-medium mb-2 text-gray-700">
        {label}
      </label>
      <div className="relative">
        <input
          ref={inputRef}
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          placeholder={placeholder}
          required={required}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8"
        />
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      
      {showDropdown && filteredOptions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto dropdown-options">
          {filteredOptions.map((option, index) => (
            <div
              key={index}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
              onMouseDown={(e) => handleOptionMouseDown(e, option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

const QuestionManagement = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [toDelete, setToDelete] = useState(new Set());
  const [newMode, setNewMode] = useState(false);
  const [uploading, setUploading] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState({});

  const initialFormData = {
    subject: '',
    chapter: '',
    topic: '',
    difficulty: '',
    exam: '',
    questionText: '',
    questionImage: '',
    options: Array(4).fill({ optionText: '', optionImage: '', isCorrect: false }),
    hint: { text: '', image: '' },
    approach: { text: '', image: '' },
    solution: [{ stepNumber: 1, stepText: '', stepImage: '' }],
    year: new Date().getFullYear()
  };

  const [formData, setFormData] = useState(initialFormData);
  const [newData, setNewData] = useState({ 
    ...initialFormData, 
    subject: 'Physics', 
    difficulty: 'Medium' 
  });

  // State for dropdown options - now organized by subject
  const [dropdownOptions, setDropdownOptions] = useState({
    physics: { chapters: [], topics: [] },
    chemistry: { chapters: [], topics: [] },
    biology: { chapters: [], topics: [] },
    exams: []
  });

  useEffect(() => { 
    loadQuestions() 
  }, []);

  // Update dropdown options when questions change - now organized by subject
  useEffect(() => {
    if (questions.length > 0) {
      // Filter questions by subject and extract unique chapters and topics
      const physicsQuestions = questions.filter(q => q.subject === 'Physics');
      const chemistryQuestions = questions.filter(q => q.subject === 'Chemistry');
      const biologyQuestions = questions.filter(q => q.subject === 'Biology');
      
      const physicsChapters = [...new Set(physicsQuestions.map(q => q.chapter).filter(Boolean))].sort();
      const physicsTopics = [...new Set(physicsQuestions.map(q => q.topic).filter(Boolean))].sort();
      
      const chemistryChapters = [...new Set(chemistryQuestions.map(q => q.chapter).filter(Boolean))].sort();
      const chemistryTopics = [...new Set(chemistryQuestions.map(q => q.topic).filter(Boolean))].sort();
      
      const biologyChapters = [...new Set(biologyQuestions.map(q => q.chapter).filter(Boolean))].sort();
      const biologyTopics = [...new Set(biologyQuestions.map(q => q.topic).filter(Boolean))].sort();
      
      const exams = [...new Set(questions.map(q => q.exam).filter(Boolean))].sort();
      
      setDropdownOptions({
        physics: { chapters: physicsChapters, topics: physicsTopics },
        chemistry: { chapters: chemistryChapters, topics: chemistryTopics },
        biology: { chapters: biologyChapters, topics: biologyTopics },
        exams
      });
    }
  }, [questions]);

  const loadQuestions = async () => {
    setLoading(true);
    try {
      const res = await getQuestions({ limit: 1000 });
      setQuestions(res.questions || []);
      setToDelete(new Set());
    } catch {
      toast.error('Load failed');
    } finally {
      setLoading(false);
    }
  };

  const fuse = useMemo(() => new Fuse(questions, {
    keys: ['questionText','subject','chapter','topic','exam'],
    threshold: 0.3, ignoreLocation: true
  }), [questions]);

  const filtered = useMemo(() => {
    if (!searchTerm.trim()) return questions;
    return fuse.search(searchTerm).map(r => r.item);
  }, [searchTerm, fuse, questions]);

  const resetAll = () => {
    setFormData(initialFormData);
    setNewData({ ...initialFormData, subject: 'Physics', difficulty: 'Medium' });
    setEditingQuestion(null);
    setShowForm(false);
    setNewMode(false);
    setUploading(null);
    setSelectedFiles({});
  };

  // Get subject-specific chapters and topics
  const getSubjectSpecificOptions = (subject) => {
    const currentData = newMode ? newData : formData;
    const selectedSubject = currentData.subject;
    
    switch (selectedSubject) {
      case 'Physics':
        return dropdownOptions.physics;
      case 'Chemistry':
        return dropdownOptions.chemistry;
      case 'Biology':
        return dropdownOptions.biology;
      default:
        return { chapters: [], topics: [] };
    }
  };

  // Handle subject change - reset chapter and topic when subject changes
  const handleSubjectChange = (subject) => {
    const setter = newMode ? setNewData : setFormData;
    setter(prev => ({ 
      ...prev, 
      subject: subject,
      chapter: '', // Reset chapter when subject changes
      topic: ''    // Reset topic when subject changes
    }));
  };

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'test_preset');
    formData.append('cloud_name', 'djwkt80ss');

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/djwkt80ss/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      const data = await response.json();
      
      if (data.secure_url) {
        console.log('Upload successful:', data.secure_url);
        return data.secure_url;
      } else {
        console.error('Cloudinary error response:', data);
        throw new Error(data.error?.message || 'Upload failed');
      }
    } catch (error) {
      console.error('Cloudinary upload error:', error);
      throw error;
    }
  };

  const handleFileSelect = (file, field, index = null, stepIndex = null) => {
    if (!file) return;
    
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file (JPEG, PNG, GIF, etc.)');
      return;
    }
    
    if (file.size > 10 * 1024 * 1024) {
      toast.error('Image size should be less than 10MB');
      return;
    }

    const fileId = `${field}-${index}-${stepIndex}`;
    
    setSelectedFiles(prev => ({
      ...prev,
      [fileId]: file
    }));

    const localUrl = URL.createObjectURL(file);
    
    if (newMode) {
      setNewData(prev => updateImageField(prev, field, localUrl, index, stepIndex));
    } else {
      setFormData(prev => updateImageField(prev, field, localUrl, index, stepIndex));
    }

    toast.success('Image selected! Click "Upload Image" to save to cloud.');
  };

  const handleImageUpload = async (field, index = null, stepIndex = null) => {
    const fileId = `${field}-${index}-${stepIndex}`;
    const file = selectedFiles[fileId];

    if (!file) {
      toast.error('Please select an image first');
      return;
    }

    setUploading(fileId);
    
    try {
      console.log('Starting upload for:', field, file);
      const cloudinaryUrl = await uploadToCloudinary(file);
      console.log('Upload completed, URL:', cloudinaryUrl);
      
      if (newMode) {
        setNewData(prev => updateImageField(prev, field, cloudinaryUrl, index, stepIndex));
      } else {
        setFormData(prev => updateImageField(prev, field, cloudinaryUrl, index, stepIndex));
      }

      const currentData = newMode ? newData : formData;
      const currentUrl = getCurrentImageUrl(currentData, field, index, stepIndex);
      if (currentUrl && currentUrl.startsWith('blob:')) {
        URL.revokeObjectURL(currentUrl);
      }

      setSelectedFiles(prev => {
        const newSelected = { ...prev };
        delete newSelected[fileId];
        return newSelected;
      });

      toast.success('Image uploaded successfully to Cloudinary!');
    } catch (error) {
      console.error('Upload process error:', error);
      toast.error(`Image upload failed: ${error.message}`);
    } finally {
      setUploading(null);
    }
  };

  const getCurrentImageUrl = (data, field, index, stepIndex) => {
    switch (field) {
      case 'questionImage':
        return data.questionImage;
      case 'optionImage':
        return data.options[index]?.optionImage;
      case 'hintImage':
        return data.hint.image;
      case 'approachImage':
        return data.approach.image;
      case 'solutionImage':
        return data.solution[stepIndex]?.stepImage;
      default:
        return '';
    }
  };

  const updateImageField = (data, field, imageUrl, index, stepIndex) => {
    const newData = { ...data };
    
    switch (field) {
      case 'questionImage':
        newData.questionImage = imageUrl;
        break;
      case 'optionImage':
        newData.options[index].optionImage = imageUrl;
        break;
      case 'hintImage':
        newData.hint.image = imageUrl;
        break;
      case 'approachImage':
        newData.approach.image = imageUrl;
        break;
      case 'solutionImage':
        newData.solution[stepIndex].stepImage = imageUrl;
        break;
      default:
        break;
    }
    
    return newData;
  };

  const removeImage = (field, index = null, stepIndex = null) => {
    const fileId = `${field}-${index}-${stepIndex}`;
    
    const currentData = newMode ? newData : formData;
    const currentUrl = getCurrentImageUrl(currentData, field, index, stepIndex);
    if (currentUrl && currentUrl.startsWith('blob:')) {
      URL.revokeObjectURL(currentUrl);
    }

    setSelectedFiles(prev => {
      const newSelected = { ...prev };
      delete newSelected[fileId];
      return newSelected;
    });

    if (newMode) {
      setNewData(prev => updateImageField(prev, field, '', index, stepIndex));
    } else {
      setFormData(prev => updateImageField(prev, field, '', index, stepIndex));
    }

    toast.success('Image removed');
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      if (newMode) {
        await createQuestion(newData);
        toast.success('Question created successfully');
      } else {
        await updateQuestion(editingQuestion._id, formData);
        toast.success('Question updated successfully');
      }
      resetAll();
      loadQuestions();
    } catch (error) {
      console.error('Save error:', error);
      toast.error('Save failed');
    } finally { 
      setLoading(false);
    }
  };

  const handleEdit = q => {
    setEditingQuestion(q);
    setFormData({ 
      ...initialFormData,
      ...q,
      options: q.options?.length ? q.options : Array(4).fill({ optionText: '', optionImage: '', isCorrect: false }),
      hint: q.hint || { text: '', image: '' },
      approach: q.approach || { text: '', image: '' },
      solution: q.solution?.length ? q.solution : [{ stepNumber: 1, stepText: '', stepImage: '' }]
    });
    setNewMode(false);
    setShowForm(true);
  };

  const handleDelete = async id => {
    if (!window.confirm('Are you sure you want to delete this question?')) return;
    setLoading(true);
    try { 
      await deleteQuestion(id); 
      toast.success('Question deleted successfully'); 
      loadQuestions(); 
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Delete failed');
    } finally { 
      setLoading(false);
    }
  };

  const handleBulkDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete ${toDelete.size} questions?`)) return;
    setLoading(true);
    try {
      await Promise.all(Array.from(toDelete).map(id => deleteQuestion(id)));
      toast.success(`${toDelete.size} questions deleted successfully`);
      loadQuestions();
    } catch (error) {
      console.error('Bulk delete error:', error);
      toast.error('Bulk delete failed');
    } finally { 
      setLoading(false);
    }
  };

  const toggleOption = (i, field, value) => {
    const target = newMode ? newData : formData;
    const setter = newMode ? setNewData : setFormData;
    const opts = [...target.options];
    if (field === 'isCorrect' && value) {
      opts.forEach((o, j) => o.isCorrect = j === i);
    } else {
      opts[i] = { ...opts[i], [field]: value };
    }
    setter({ ...target, options: opts });
  };

  const addSolutionStep = () => {
    const target = newMode ? newData : formData;
    const setter = newMode ? setNewData : setFormData;
    const newStep = {
      stepNumber: target.solution.length + 1,
      stepText: '',
      stepImage: ''
    };
    setter({ ...target, solution: [...target.solution, newStep] });
  };

  const removeSolutionStep = (index) => {
    const target = newMode ? newData : formData;
    const setter = newMode ? setNewData : setFormData;
    const newSolution = target.solution.filter((_, i) => i !== index)
      .map((step, i) => ({ ...step, stepNumber: i + 1 }));
    setter({ ...target, solution: newSolution });
  };

  const updateSolutionStep = (index, field, value) => {
    const target = newMode ? newData : formData;
    const setter = newMode ? setNewData : setFormData;
    const newSolution = target.solution.map((step, i) =>
      i === index ? { ...step, [field]: value } : step
    );
    setter({ ...target, solution: newSolution });
  };

  const ImageUploadField = ({ 
    label, 
    currentImage, 
    field, 
    index = null, 
    stepIndex = null,
    uploading = false 
  }) => {
    const fileId = `${field}-${index}-${stepIndex}`;
    const hasSelectedFile = !!selectedFiles[fileId];
    const isLocalImage = currentImage && currentImage.startsWith('blob:');
    const isCloudImage = currentImage && !currentImage.startsWith('blob:');

    return (
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2 text-gray-700">{label}</label>
        
        <div className="flex flex-wrap gap-2 mb-3">
          <label className={`cursor-pointer px-4 py-2 rounded-lg border flex items-center gap-2 transition-colors ${
            uploading 
              ? 'bg-gray-400 text-white border-gray-400 cursor-not-allowed' 
              : 'bg-blue-500 hover:bg-blue-600 text-white border-blue-500'
          }`}>
            <FolderOpen className="w-4 h-4" />
            Select Image
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  handleFileSelect(file, field, index, stepIndex);
                }
                e.target.value = '';
              }}
              disabled={uploading}
            />
          </label>

          <Button
            type="button"
            variant="success"
            size="sm"
            onClick={() => handleImageUpload(field, index, stepIndex)}
            disabled={uploading || !hasSelectedFile}
            className="flex items-center gap-2 bg-red-400"
          >
            <Upload className="w-4 h-4 " />
            {uploading ? 'Uploading...' : 'Upload Image'}
          </Button>

          {currentImage && (
            <Button
              type="button"
              variant="danger"
              size="sm"
              onClick={() => removeImage(field, index, stepIndex)}
              disabled={uploading}
              className="flex items-center gap-2"
            >
              <X className="w-4 h-4" />
              Remove
            </Button>
          )}
        </div>

        <div className="flex items-center gap-3 mb-3">
          {hasSelectedFile && !isCloudImage && (
            <div className="flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-orange-500" />
              <span className="text-xs text-orange-600 font-medium">
                Image selected - Click "Upload Image" to save to cloud
              </span>
            </div>
          )}
          {isCloudImage && (
            <div className="flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-green-600" />
              <span className="text-xs text-green-600 font-medium">
                Image uploaded to Cloudinary
              </span>
            </div>
          )}
        </div>

        {currentImage && (
          <div className="mt-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-medium text-gray-700">Preview:</span>
              {isLocalImage && (
                <Badge variant="warning" text="Local (Not uploaded)" />
              )}
              {isCloudImage && (
                <Badge variant="success" text="Cloud Storage" />
              )}
            </div>
            <img 
              src={currentImage} 
              alt="Preview" 
              className="max-w-48 max-h-48 object-contain border-2 border-green-200 rounded-lg bg-gray-50 p-2 shadow-sm"
              onError={(e) => {
                console.error('Image failed to load:', currentImage);
                e.target.style.display = 'none';
              }}
              onLoad={(e) => {
                console.log('Image loaded successfully');
              }}
            />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Question Management</h1>
        <div className="flex gap-2">
          {toDelete.size > 0 && (
            <Button className='bg-red-400' variant="danger" onClick={handleBulkDelete}>
              Delete ({toDelete.size})
            </Button>
          )}
          <Button className="outline text-black hover:bg-gray-600 hover:text-white" onClick={() => { resetAll(); setNewMode(true); setShowForm(true) }}>
            <Plus className="w-4 h-4 mr-1" /> Add Question
          </Button>
        </div>
      </div>

      <div className="relative mb-6">
        <Input
          className="pl-10 pr-10"
          placeholder="Search questions by text, chapter, topic, or exam..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        {searchTerm && (
          <button 
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            onClick={() => setSearchTerm('')}
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Spinner size={32} />
        </div>
      ) : filtered.length === 0 ? (
        <Card className="text-center py-12">
          <p className="text-gray-500 text-lg">
            {searchTerm ? 'No questions found matching your search.' : 'No questions available.'}
          </p>
        </Card>
      ) : (
        filtered.map(q => (
          <Card key={q._id} className="flex items-start mb-4 p-4 hover:shadow-md transition-shadow">
            <input
              type="checkbox"
              className="mt-1 mr-3 h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
              checked={toDelete.has(q._id)}
              onChange={() => {
                const s = new Set(toDelete);
                s.has(q._id) ? s.delete(q._id) : s.add(q._id);
                setToDelete(s);
              }}
            />
            <div className="flex-1">
              <div className="flex gap-2 mb-2 flex-wrap">
                <Badge variant="primary" text={q.subject} />
                <Badge variant={q.difficulty === 'Easy' ? 'success' : q.difficulty === 'Medium' ? 'warning' : 'danger'} text={q.difficulty} />
                <Badge variant="outline" text={`${q.chapter} → ${q.topic}`} />
                {q.year && <Badge variant="secondary" text={`Year: ${q.year}`} />}
                {q.exam && <Badge variant="info" text={`Exam: ${q.exam}`} />}
              </div>
              <div 
                className="font-medium mb-2 text-gray-800 line-clamp-2"
                dangerouslySetInnerHTML={{ __html: formatTextWithHTML(q.questionText) }}
              />
              {(q.questionImage || q.options?.some(opt => opt.optionImage)) && (
                <div className="flex items-center gap-2 mt-1">
                  <ImageIcon className="w-4 h-4 text-blue-500" />
                  <span className="text-xs text-blue-500 font-medium">Contains images</span>
                </div>
              )}
              <p className="text-xs text-gray-500 mt-2">
                Created {formatRelativeTime(q.createdAt)}
              </p>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => handleEdit(q)}>
                <Edit className="w-4 h-4" />
              </Button>
              <Button className="bg-red-400" size="sm" variant="danger" onClick={() => handleDelete(q._id)}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        ))
      )}

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-4xl p-6 overflow-y-auto max-h-[90vh]">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800 ">
                {newMode ? 'Add New Question' : 'Edit Question'}
              </h2>
              <button 
                onClick={resetAll}
                className="text-gray-500 hover:text-gray-700 p-1 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    Subject
                  </label>
                  <select
                    required
                    value={(newMode ? newData : formData).subject}
                    onChange={(e) => handleSubjectChange(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Subject</option>
                    {['Physics', 'Chemistry', 'Biology'].map(v => (
                      <option key={v} value={v}>{v}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <DropdownInput
                    label="Chapter"
                    value={(newMode ? newData : formData).chapter}
                    onChange={(value) => {
                      const setter = newMode ? setNewData : setFormData;
                      setter(prev => ({ ...prev, chapter: value }));
                    }}
                    options={getSubjectSpecificOptions().chapters}
                    placeholder="Select or type chapter..."
                    required={true}
                  />
                </div>

                <div>
                  <DropdownInput
                    label="Topic"
                    value={(newMode ? newData : formData).topic}
                    onChange={(value) => {
                      const setter = newMode ? setNewData : setFormData;
                      setter(prev => ({ ...prev, topic: value }));
                    }}
                    options={getSubjectSpecificOptions().topics}
                    placeholder="Select or type topic..."
                    required={true}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    Difficulty
                  </label>
                  <select
                    required
                    value={(newMode ? newData : formData).difficulty}
                    onChange={e => {
                      const setter = newMode ? setNewData : setFormData;
                      setter(prev => ({ ...prev, difficulty: e.target.value }));
                    }}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Difficulty</option>
                    {['Easy', 'Medium', 'Hard'].map(v => (
                      <option key={v} value={v}>{v}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <DropdownInput
                    label="Exam"
                    value={(newMode ? newData : formData).exam}
                    onChange={(value) => {
                      const setter = newMode ? setNewData : setFormData;
                      setter(prev => ({ ...prev, exam: value }));
                    }}
                    options={dropdownOptions.exams}
                    placeholder="Select or type exam..."
                    required={false}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    Year
                  </label>
                  <Input
                    type="number"
                    min="2000"
                    max="2030"
                    value={(newMode ? newData : formData).year}
                    onChange={e => {
                      const setter = newMode ? setNewData : setFormData;
                      setter(prev => ({ ...prev, year: parseInt(e.target.value) }));
                    }}
                    placeholder="Enter year"
                  />
                </div>
              </div>

              {/* Question Text & Image */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  Question Text
                </label>
                <RichTextEditor
                  value={(newMode ? newData : formData).questionText}
                  onChange={(value) => {
                    const setter = newMode ? setNewData : setFormData;
                    setter(prev => ({ ...prev, questionText: value }));
                  }}
                  placeholder="Enter the question text..."
                />
                <ImageUploadField
                  label="Question Image"
                  currentImage={(newMode ? newData : formData).questionImage}
                  field="questionImage"
                  uploading={uploading === 'questionImage-null-null'}
                />
              </div>

              {/* Options */}
              <div>
                <label className="block text-sm font-medium mb-3 text-gray-700">
                  Options
                </label>
                {(newMode ? newData : formData).options.map((opt, i) => (
                  <div key={i} className="mb-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
                    <div className="flex gap-3 mb-3 items-start">
                      <input
                        type="radio"
                        name="correctOption"
                        checked={opt.isCorrect}
                        onChange={() => toggleOption(i, 'isCorrect', true)}
                        className="mt-2 text-blue-600 focus:ring-blue-500"
                      />
                      <div className="flex-1">
                        <RichTextEditor
                          value={opt.optionText}
                          onChange={(value) => toggleOption(i, 'optionText', value)}
                          placeholder={`Option ${i + 1}`}
                        />
                      </div>
                    </div>
                    <ImageUploadField
                      label={`Option ${i + 1} Image`}
                      currentImage={opt.optionImage}
                      field="optionImage"
                      index={i}
                      uploading={uploading === `optionImage-${i}-null`}
                    />
                  </div>
                ))}
              </div>

              {/* Hint & Approach */}
              <div className="flex gap-6">
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-2 text-gray-700">Hint</label>
                  <RichTextEditor
                    value={(newMode ? newData : formData).hint.text}
                    onChange={(value) => {
                      const setter = newMode ? setNewData : setFormData;
                      setter(prev => ({
                        ...prev,
                        hint: { ...prev.hint, text: value }
                      }));
                    }}
                    placeholder="Enter hint text (optional)"
                  />
                  <ImageUploadField
                    label="Hint Image"
                    currentImage={(newMode ? newData : formData).hint.image}
                    field="hintImage"
                    uploading={uploading === 'hintImage-null-null'}
                  />
                </div>

                <div className="flex-1">
                  <label className="block text-sm font-medium mb-2 text-gray-700">Concept</label>
                  <RichTextEditor
                    value={(newMode ? newData : formData).approach.text}
                    onChange={(value) => {
                      const setter = newMode ? setNewData : setFormData;
                      setter(prev => ({
                        ...prev,
                        approach: { ...prev.approach, text: value }
                      }));
                    }}
                    placeholder="Enter concept text (optional)"
                  />
                  <ImageUploadField
                    label="Concept Image"
                    currentImage={(newMode ? newData : formData).approach.image}
                    field="approachImage"
                    uploading={uploading === 'approachImage-null-null'}
                  />
                </div>
              </div>

              {/* Solution Steps */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="block text-sm font-medium text-gray-700">Solution Steps</label>
                  <Button className="cursor-pointer text-black hover:underline" type="button" size="sm" onClick={addSolutionStep}>
                    <Plus className="w-4 h-4 mr-1  " /> Add Step
                  </Button>
                </div>
                {(newMode ? newData : formData).solution.map((step, index) => (
                  <div key={index} className="mb-4 p-4 border border-gray-200 rounded-lg bg-white">
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-medium text-sm text-gray-800">Step {step.stepNumber}</span>
                      {(newMode ? newData : formData).solution.length > 1 && (
                        <Button
                          type="button"
                          variant="danger"
                          size="sm"
                          onClick={() => removeSolutionStep(index)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                    <RichTextEditor
                      value={step.stepText}
                      onChange={(value) => updateSolutionStep(index, 'stepText', value)}
                      placeholder={`Describe step ${step.stepNumber}...`}
                    />
                    <ImageUploadField
                      label={`Step ${step.stepNumber} Image`}
                      currentImage={step.stepImage}
                      field="solutionImage"
                      stepIndex={index}
                      uploading={uploading === `solutionImage-null-${index}`}
                    />
                  </div>
                ))}
              </div>

              {/* Form Actions */}
              <div className="flex justify-end gap-3 pt-6 border-t">
                <Button type="button" variant="outline" onClick={resetAll} className="cursor-pointer">
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={loading || uploading}
                  className="min-w-24 outline text-black hover:bg-gray-600 hover:text-white cursor-pointer"
                >
                  {loading ? 'Saving...' : uploading ? 'Uploading...' : newMode ? 'Create Question' : 'Update Question'}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
};

export default QuestionManagement;