



// import React, { useEffect, useMemo, useState } from 'react';
// import { createTest, updateTest, deleteTest } from '../../services/admin';
// import { getAllTests } from '../../services/tests';
// import { getQuestions, createQuestion } from '../../services/questions';
// import Card from '../../components/ui/Card';
// import Button from '../../components/ui/Button';
// import Input from '../../components/ui/Input';
// import Spinner from '../../components/ui/Spinner';
// import Badge from '../../components/ui/Badge';
// import { Plus, Edit, Trash2, Calendar, Search, X, Superscript, Subscript, Type } from 'lucide-react';
// import { formatDate } from '../../utils/formatters';
// import toast from 'react-hot-toast';
// import Fuse from 'fuse.js';

// // Rich Text Editor Component (same as before)
// const RichTextEditor = ({ value, onChange, placeholder = "Enter text..." }) => {
//   const [showGreekMenu, setShowGreekMenu] = useState(false);

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
//     const textarea = document.getElementById('rich-text-area');
//     if (!textarea) return;

//     const start = textarea.selectionStart;
//     const end = textarea.selectionEnd;
//     const newValue = value.substring(0, start) + text + value.substring(end);
    
//     onChange(newValue);
    
//     setTimeout(() => {
//       textarea.focus();
//       textarea.setSelectionRange(start + text.length, start + text.length);
//     }, 0);
//   };

//   const wrapSelection = (prefix, suffix = '') => {
//     const textarea = document.getElementById('rich-text-area');
//     if (!textarea) return;

//     const start = textarea.selectionStart;
//     const end = textarea.selectionEnd;
//     const selectedText = value.substring(start, end);
//     const newText = prefix + selectedText + suffix;
//     const newValue = value.substring(0, start) + newText + value.substring(end);
    
//     onChange(newValue);
    
//     setTimeout(() => {
//       textarea.focus();
//       if (selectedText) {
//         textarea.setSelectionRange(start + prefix.length, start + prefix.length + selectedText.length);
//       } else {
//         textarea.setSelectionRange(start + prefix.length, start + prefix.length);
//       }
//     }, 0);
//   };

//   return (
//     <div className="border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent">
//       {/* Toolbar */}
//       <div className="flex flex-wrap items-center gap-1 p-2 bg-gray-50 border-b border-gray-200">
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
//         <div className="relative">
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
//                 <div className="grid grid-cols-6 gap-1">
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
//           Use {'<sup>text</sup>'} for superscript, {'<sub>text</sub>'} for subscript
//         </div>
//       </div>

//       {/* Textarea */}
//       <textarea
//         id="rich-text-area"
//         rows={4}
//         className="w-full px-3 py-2 focus:outline-none resize-vertical bg-white"
//         value={value}
//         onChange={(e) => onChange(e.target.value)}
//         placeholder={placeholder}
//       />

//       {/* Preview */}
//       {value && (
//         <div className="p-3 bg-gray-50 border-t border-gray-200">
//           <div className="text-xs text-gray-600 font-medium mb-1">Preview:</div>
//           <div className="text-sm text-gray-800 min-h-6">
//             {formatTextWithHTML(value)}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// // Format text for display - CRITICAL FUNCTION for showing formatted text
// export const formatTextWithHTML = (text) => {
//   if (!text) return '';
  
//   return text
//     .replace(/<sup>(.*?)<\/sup>/g, '<sup>$1</sup>')
//     .replace(/<sub>(.*?)<\/sub>/g, '<sub>$1</sub>');
// };

// // Safe HTML component for rendering formatted text
// const SafeHTML = ({ html, className = '' }) => {
//   return (
//     <div 
//       className={className}
//       dangerouslySetInnerHTML={{ __html: formatTextWithHTML(html) }}
//     />
//   );
// };

// const TestManagement = () => {
//   const [tests, setTests] = useState([]);
//   const [questions, setQuestions] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [showForm, setShowForm] = useState(false);
//   const [editingTest, setEditingTest] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [showAddQuestion, setShowAddQuestion] = useState(false);

//   const [formData, setFormData] = useState({
//     name: '',
//     type: 'NEET_MOCK',
//     scheduledDate: '',
//     startTime: '',
//     endTime: '',
//     duration: 180,
//     questions: [],
//     markingScheme: {
//       totalMarks: 720,
//       positiveMarks: 4,
//       negativeMarks: 1
//     },
//     isActive: true
//   });

//   // New question form data
//   const [newQuestion, setNewQuestion] = useState({
//     subject: 'Physics',
//     chapter: '',
//     topic: '',
//     difficulty: 'Medium',
//     questionText: '',
//     options: [
//       { optionText: '', isCorrect: false },
//       { optionText: '', isCorrect: false },
//       { optionText: '', isCorrect: false },
//       { optionText: '', isCorrect: false },
//     ],
//   });

//   useEffect(() => {
//     loadTests();
//     loadQuestions();
//   }, []);

//   const loadTests = async () => {
//     setLoading(true);
//     try {
//       const response = await getAllTests();
//       setTests(response.tests || response);
//     } catch (error) {
//       toast.error('Failed to load tests');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const loadQuestions = async () => {
//     try {
//       const response = await getQuestions({ limit: 5000 });
//       setQuestions(response.questions || []);
//     } catch (error) {
//       console.error('Failed to load questions');
//     }
//   };

//   // Fuzzy search using Fuse.js
//   const fuse = useMemo(() => {
//     return new Fuse(questions, {
//       keys: ['questionText', 'subject', 'chapter', 'topic'],
//       threshold: 0.3,
//       ignoreLocation: true,
//       minMatchCharLength: 2,
//     });
//   }, [questions]);

//   const filteredQuestions = useMemo(() => {
//     if (!searchTerm.trim()) return questions;
//     const results = fuse.search(searchTerm);
//     return results.map((result) => result.item);
//   }, [searchTerm, fuse, questions]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       // Prepare the payload according to the model schema
//       const payload = {
//         name: formData.name,
//         type: formData.type,
//         scheduledDate: formData.scheduledDate ? new Date(formData.scheduledDate) : null,
//         startTime: formData.startTime ? new Date(formData.startTime) : null,
//         endTime: formData.endTime ? new Date(formData.endTime) : null,
//         duration: parseInt(formData.duration),
//         questions: formData.questions,
//         markingScheme: {
//           totalMarks: parseFloat(formData.markingScheme.totalMarks),
//           positiveMarks: parseFloat(formData.markingScheme.positiveMarks),
//           negativeMarks: parseFloat(formData.markingScheme.negativeMarks)
//         },
//         isActive: formData.isActive
//       };

//       if (editingTest) {
//         await updateTest(editingTest._id, payload);
//         toast.success('Test updated successfully');
//       } else {
//         await createTest(payload);
//         toast.success('Test created successfully');
//       }

//       setShowForm(false);
//       setEditingTest(null);
//       resetForm();
//       loadTests();
//     } catch (error) {
//       toast.error(error.message || 'Operation failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEdit = (test) => {
//     setEditingTest(test);
//     setFormData({
//       name: test.name || '',
//       type: test.type || 'DPP_TEST',
//       scheduledDate: test.scheduledDate ? new Date(test.scheduledDate).toISOString().split('T')[0] : '',
//       startTime: test.startTime ? new Date(test.startTime).toISOString().slice(0, 16) : '',
//       endTime: test.endTime ? new Date(test.endTime).toISOString().slice(0, 16) : '',
//       duration: test.duration || 180,
//       questions: test.questions?.map((q) => q._id || q) || [],
//       markingScheme: {
//         totalMarks: test.markingScheme?.totalMarks || 0,
//         positiveMarks: test.markingScheme?.positiveMarks || 0,
//         negativeMarks: test.markingScheme?.negativeMarks || 0
//       },
//       isActive: test.isActive !== undefined ? test.isActive : true
//     });
//     setShowForm(true);
//   };

//   const handleDelete = async (testId) => {
//     if (window.confirm('Are you sure you want to delete this test?')) {
//       try {
//         await deleteTest(testId);
//         toast.success('Test deleted successfully');
//         loadTests();
//       } catch (error) {
//         toast.error('Failed to delete test');
//       }
//     }
//   };

//   const resetForm = () => {
//     setFormData({
//       name: '',
//       type: 'DPP_TEST',
//       scheduledDate: '',
//       startTime: '',
//       endTime: '',
//       duration: 180,
//       questions: [],
//       markingScheme: {
//         totalMarks: 0,
//         positiveMarks: 0,
//         negativeMarks: 0
//       },
//       isActive: true
//     });
//     setSearchTerm('');
//     setShowAddQuestion(false);
//     resetNewQuestion();
//   };

//   const resetNewQuestion = () => {
//     setNewQuestion({
//       subject: 'Physics',
//       chapter: '',
//       topic: '',
//       difficulty: 'Medium',
//       questionText: '',
//       options: [
//         { optionText: '', isCorrect: false },
//         { optionText: '', isCorrect: false },
//         { optionText: '', isCorrect: false },
//         { optionText: '', isCorrect: false },
//       ],
//     });
//   };

//   const toggleQuestionSelection = (questionId) => {
//     setFormData((prev) => ({
//       ...prev,
//       questions: prev.questions.includes(questionId)
//         ? prev.questions.filter((id) => id !== questionId)
//         : [...prev.questions, questionId],
//     }));
//   };

//   const selectQuestionsByFilter = (subject) => {
//     const filtered = questions.filter((q) => q.subject === subject).map((q) => q._id);
//     setFormData((prev) => ({
//       ...prev,
//       questions: [...new Set([...prev.questions, ...filtered])],
//     }));
//   };

//   const handleCreateNewQuestion = async () => {
//     // Validation
//     if (!newQuestion.questionText.trim()) {
//       toast.error('Question text is required');
//       return;
//     }
//     if (!newQuestion.chapter.trim() || !newQuestion.topic.trim()) {
//       toast.error('Chapter and topic are required');
//       return;
//     }
//     const filledOptions = newQuestion.options.filter((opt) => opt.optionText.trim());
//     if (filledOptions.length < 2) {
//       toast.error('At least 2 options are required');
//       return;
//     }
//     const correctOption = newQuestion.options.find((opt) => opt.isCorrect);
//     if (!correctOption) {
//       toast.error('Please mark one option as correct');
//       return;
//     }

//     setLoading(true);
//     try {
//       const payload = {
//         ...newQuestion,
//         options: newQuestion.options.filter((opt) => opt.optionText.trim()),
//         hint: { text: '' },
//         approach: { text: '' },
//         solution: [{ stepNumber: 1, stepText: '' }],
//       };

//       const response = await createQuestion(payload);
//       const createdQuestion = response.question || response;

//       // Add to local questions list
//       setQuestions((prev) => [createdQuestion, ...prev]);

//       // Auto-select the newly created question
//       setFormData((prev) => ({
//         ...prev,
//         questions: [...prev.questions, createdQuestion._id],
//       }));

//       toast.success('Question created and added to test');
//       setShowAddQuestion(false);
//       resetNewQuestion();
//     } catch (error) {
//       toast.error(error.message || 'Failed to create question');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const updateNewQuestionOption = (index, field, value) => {
//     const updatedOptions = [...newQuestion.options];
//     if (field === 'isCorrect' && value) {
//       // Only one correct answer
//       updatedOptions.forEach((opt, i) => {
//         opt.isCorrect = i === index;
//       });
//     } else {
//       updatedOptions[index][field] = value;
//     }
//     setNewQuestion({ ...newQuestion, options: updatedOptions });
//   };

//   const handleMarkingSchemeChange = (field, value) => {
//     setFormData(prev => ({
//       ...prev,
//       markingScheme: {
//         ...prev.markingScheme,
//         [field]: value
//       }
//     }));
//   };

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8">
//       <div className="mb-8 flex items-center justify-between">
//         <h1 className="text-3xl font-bold text-gray-900">Test Management</h1>
//         <Button onClick={() => setShowForm(true)} className="text-black outline cursor-pointer hover:bg-gray-600 hover:text-white">
//           <Plus className="w-4 h-4 mr-2" />
//           Create Test
//         </Button>
//       </div>

//       {/* Tests List */}
//       <div className="space-y-4">
//         {loading ? (
//           <div className="flex justify-center py-8">
//             <Spinner size={32} />
//           </div>
//         ) : tests.length > 0 ? (
//           tests.map((test) => (
//             <Card key={test._id} className="p-6">
//               <div className="flex justify-between items-start">
//                 <div className="flex-1">
//                   <div className="flex items-center gap-3 mb-2">
//                     <h3 className="text-xl font-semibold">{test.name}</h3>
//                     <Badge text={test.type} />
//                     {test.isActive ? (
//                       <Badge text="Active" color="green" />
//                     ) : (
//                       <Badge text="Inactive" color="gray" />
//                     )}
//                   </div>
//                   <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-2">
//                     <div>
//                       <span className="font-medium">Duration:</span> {test.duration} min
//                     </div>
//                     <div>
//                       <span className="font-medium">Questions:</span> {test.questions?.length || 0}
//                     </div>
//                     <div>
//                       <span className="font-medium">Total Marks:</span> {test.markingScheme?.totalMarks || 0}
//                     </div>
//                     <div>
//                       <span className="font-medium">Marking:</span> +{test.markingScheme?.positiveMarks || 0}/-{test.markingScheme?.negativeMarks || 0}
//                     </div>
//                   </div>
//                   {test.scheduledDate && (
//                     <div className="flex gap-4 text-sm text-gray-500">
//                       <span className="flex items-center gap-1">
//                         <Calendar className="w-4 h-4" />
//                         Scheduled: {formatDate(test.scheduledDate)}
//                       </span>
//                       {test.startTime && (
//                         <span>Start: {new Date(test.startTime).toLocaleTimeString()}</span>
//                       )}
//                       {test.endTime && (
//                         <span>End: {new Date(test.endTime).toLocaleTimeString()}</span>
//                       )}
//                     </div>
//                   )}
//                 </div>
//                 <div className="flex gap-2">
//                   <Button variant="outline cursor-pointer" size="sm" onClick={() => handleEdit(test)}>
//                     <Edit className="w-4 h-4" />
//                   </Button>
//                   <Button className="text-red-400 cursor-pointer" variant="danger" size="sm" onClick={() => handleDelete(test._id)}>
//                     <Trash2 className="w-4 h-4" />
//                   </Button>
//                 </div>
//               </div>
//             </Card>
//           ))
//         ) : (
//           <Card className="p-12 text-center text-gray-500">No tests found.</Card>
//         )}
//       </div>

//       {/* Create/Edit Modal */}
//       {showForm && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
//           <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6">
//             <h2 className="text-2xl font-bold mb-6">
//               {editingTest ? 'Edit Test' : 'Create New Test'}
//             </h2>

//             <form onSubmit={handleSubmit} className="space-y-6">
//               {/* Basic Details */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium mb-1">Test Name *</label>
//                   <Input
//                     value={formData.name}
//                     onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                     required
//                     placeholder="e.g., NEET Mock Test 1"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium mb-1">Test Type *</label>
//                   <select
//                     value={formData.type}
//                     onChange={(e) => setFormData({ ...formData, type: e.target.value })}
//                     className="w-full rounded border border-gray-300 px-3 py-2"
//                     required
//                   >
//                     <option value="DPP_TEST">DPP Test</option>
//                     <option value="NEET_MOCK">NEET Mock Test</option>
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium mb-1">Duration (minutes) *</label>
//                   <Input
//                     type="number"
//                     value={formData.duration}
//                     onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
//                     required
//                     min="1"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium mb-1">Scheduled Date *</label>
//                   <Input
//                     type="date"
//                     value={formData.scheduledDate}
//                     onChange={(e) => setFormData({ ...formData, scheduledDate: e.target.value })}
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium mb-1">Start Time *</label>
//                   <Input
//                     type="datetime-local"
//                     value={formData.startTime}
//                     onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium mb-1">End Time *</label>
//                   <Input
//                     type="datetime-local"
//                     value={formData.endTime}
//                     onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
//                     required
//                   />
//                 </div>
//               </div>

//               {/* Marking Scheme */}
//               <div className="border-t pt-4">
//                 <h3 className="text-lg font-medium mb-3">Marking Scheme</h3>
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium mb-1">Total Marks *</label>
//                     <Input
//                       type="number"
//                       step="0.01"
//                       value={formData.markingScheme.totalMarks}
//                       onChange={(e) => handleMarkingSchemeChange('totalMarks', e.target.value)}
//                       required
//                       min="0"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium mb-1">Positive Marks *</label>
//                     <Input
//                       type="number"
//                       step="0.01"
//                       value={formData.markingScheme.positiveMarks}
//                       onChange={(e) => handleMarkingSchemeChange('positiveMarks', e.target.value)}
//                       required
//                       min="0"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium mb-1">Negative Marks *</label>
//                     <Input
//                       type="number"
//                       step="0.01"
//                       value={formData.markingScheme.negativeMarks}
//                       onChange={(e) => handleMarkingSchemeChange('negativeMarks', e.target.value)}
//                       required
//                       min="0"
//                     />
//                   </div>
//                 </div>
//               </div>

//               <div className="flex items-center gap-3">
//                 <input
//                   type="checkbox"
//                   checked={formData.isActive}
//                   onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
//                   id="isActiveCheck"
//                   className="w-4 h-4"
//                 />
//                 <label htmlFor="isActiveCheck" className="text-sm font-medium">
//                   Active (visible to students)
//                 </label>
//               </div>

//               {/* Question Selection */}
//               <div className="border-t pt-4">
//                 <div className="flex items-center justify-between mb-3">
//                   <label className="block text-sm font-medium">
//                     Select Questions ({formData.questions.length} selected) *
//                   </label>
//                   {/* <div className="flex gap-2">
//                     <Button
//                       type="button"
//                       variant="outline"
//                       size="sm"
//                       onClick={() => setShowAddQuestion(!showAddQuestion)}
//                     >
//                       <Plus className="w-4 h-4 mr-1" />
//                       Add New Question
//                     </Button>
//                     <Button
//                       type="button"
//                       variant="outline"
//                       size="sm"
//                       onClick={() => selectQuestionsByFilter('Physics')}
//                     >
//                       + Physics
//                     </Button>
//                     <Button
//                       type="button"
//                       variant="outline"
//                       size="sm"
//                       onClick={() => selectQuestionsByFilter('Chemistry')}
//                     >
//                       + Chemistry
//                     </Button>
//                     <Button
//                       type="button"
//                       variant="outline"
//                       size="sm"
//                       onClick={() => selectQuestionsByFilter('Biology')}
//                     >
//                       + Biology
//                     </Button>
//                   </div> */}
//                 </div>

//                 {/* Add New Question Form */}
//                 {showAddQuestion && (
//                   <Card className="p-4 mb-4 bg-blue-50 border-blue-200">
//                     <div className="flex items-center justify-between mb-3">
//                       <h3 className="font-semibold">Create New Question</h3>
//                       <button
//                         type="button"
//                         onClick={() => setShowAddQuestion(false)}
//                         className="text-gray-500 hover:text-gray-700"
//                       >
//                         <X className="w-5 h-5" />
//                       </button>
//                     </div>

//                     <div className="space-y-3">
//                       <div className="grid grid-cols-3 gap-3">
//                         <div>
//                           <label className="block text-xs font-medium mb-1">Subject *</label>
//                           <select
//                             value={newQuestion.subject}
//                             onChange={(e) =>
//                               setNewQuestion({ ...newQuestion, subject: e.target.value })
//                             }
//                             className="w-full rounded border border-gray-300 px-2 py-1 text-sm"
//                           >
//                             <option value="Physics">Physics</option>
//                             <option value="Chemistry">Chemistry</option>
//                             <option value="Biology">Biology</option>
//                           </select>
//                         </div>
//                         <div>
//                           <label className="block text-xs font-medium mb-1">Chapter *</label>
//                           <Input
//                             value={newQuestion.chapter}
//                             onChange={(e) =>
//                               setNewQuestion({ ...newQuestion, chapter: e.target.value })
//                             }
//                             placeholder="Chapter name"
//                             className="text-sm"
//                           />
//                         </div>
//                         <div>
//                           <label className="block text-xs font-medium mb-1">Topic *</label>
//                           <Input
//                             value={newQuestion.topic}
//                             onChange={(e) =>
//                               setNewQuestion({ ...newQuestion, topic: e.target.value })
//                             }
//                             placeholder="Topic name"
//                             className="text-sm"
//                           />
//                         </div>
//                       </div>

//                       <div>
//                         <label className="block text-xs font-medium mb-1">Difficulty</label>
//                         <select
//                           value={newQuestion.difficulty}
//                           onChange={(e) =>
//                             setNewQuestion({ ...newQuestion, difficulty: e.target.value })
//                           }
//                           className="w-full rounded border border-gray-300 px-2 py-1 text-sm"
//                         >
//                           <option value="Easy">Easy</option>
//                           <option value="Medium">Medium</option>
//                           <option value="Hard">Hard</option>
//                         </select>
//                       </div>

//                       <div>
//                         <label className="block text-xs font-medium mb-1">Question Text *</label>
//                         <RichTextEditor
//                           value={newQuestion.questionText}
//                           onChange={(value) =>
//                             setNewQuestion({ ...newQuestion, questionText: value })
//                           }
//                           placeholder="Enter question text"
//                         />
//                       </div>

//                       <div>
//                         <label className="block text-xs font-medium mb-1">Options *</label>
//                         {newQuestion.options.map((opt, i) => (
//                           <div key={i} className="flex gap-2 mb-2">
//                             <input
//                               type="radio"
//                               name="correctOption"
//                               checked={opt.isCorrect}
//                               onChange={() => updateNewQuestionOption(i, 'isCorrect', true)}
//                               className="mt-1"
//                             />
//                             <div className="flex-1">
//                               <RichTextEditor
//                                 value={opt.optionText}
//                                 onChange={(value) => updateNewQuestionOption(i, 'optionText', value)}
//                                 placeholder={`Option ${i + 1}`}
//                               />
//                             </div>
//                           </div>
//                         ))}
//                       </div>

//                       <Button
//                         type="button"
//                         onClick={handleCreateNewQuestion}
//                         disabled={loading}
//                         size="sm"
//                         className="w-full bg-red-400"
//                       >
//                         {loading ? 'Creating...' : 'Create & Add to Test'}
//                       </Button>
//                     </div>
//                   </Card>
//                 )}

//                 {/* Search Bar */}
//                 <div className="relative mb-3">
//                   <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//                   <Input
//                     placeholder="Search questions by keyword, subject, chapter, topic..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="pl-10"
//                   />
//                   {searchTerm && (
//                     <button
//                       type="button"
//                       onClick={() => setSearchTerm('')}
//                       className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                     >
//                       <X className="w-4 h-4" />
//                     </button>
//                   )}
//                 </div>

//                 {/* Questions List */}
//                 <div className="max-h-64 overflow-y-auto border rounded p-3 space-y-2">
//                   {filteredQuestions.length === 0 ? (
//                     <p className="text-center text-gray-500 py-4 text-sm">
//                       {searchTerm ? 'No questions match your search' : 'No questions available'}
//                     </p>
//                   ) : (
//                     filteredQuestions.map((q) => (
//                       <div key={q._id} className="flex items-start gap-3 p-2 hover:bg-gray-50 rounded">
//                         <input
//                           type="checkbox"
//                           checked={formData.questions.includes(q._id)}
//                           onChange={() => toggleQuestionSelection(q._id)}
//                           className="mt-1"
//                         />
//                         <div className="flex-1">
//                           {/* Use SafeHTML to display formatted question text */}
//                           <SafeHTML 
//                             html={q.questionText} 
//                             className="text-sm font-medium"
//                           />
//                           <div className="flex gap-2 mt-1">
//                             <Badge text={q.subject} />
//                             <Badge text={q.difficulty} />
//                             <Badge text={`${q.chapter} → ${q.topic}`} />
//                           </div>
//                         </div>
//                       </div>
//                     ))
//                   )}
//                 </div>
//               </div>

//               {/* Form Actions */}
//               <div className="flex gap-3 justify-end pt-4 border-t">
//                 <Button className="cursor-pointer outline"
//                   type="button"
//                   variant="outline"
//                   onClick={() => {
//                     setShowForm(false);
//                     setEditingTest(null);
//                     resetForm();
//                   }}
//                 >
//                   Cancel
//                 </Button>
//                 <Button type="submit" disabled={loading} className="text-black outline cursor-pointer hover:bg-gray-800 hover:text-white">
//                   {loading ? 'Saving...' : editingTest ? 'Update Test' : 'Create Test'}
//                 </Button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TestManagement;









import React, { useEffect, useMemo, useState } from 'react';
import { createTest, updateTest, deleteTest } from '../../services/admin';
import { getAllTests } from '../../services/tests';
import { getQuestions, createQuestion } from '../../services/questions';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Spinner from '../../components/ui/Spinner';
import Badge from '../../components/ui/Badge';
import { Plus, Edit, Trash2, Calendar, Search, X, Superscript, Subscript, Type, ArrowLeft } from 'lucide-react';
import { formatDate } from '../../utils/formatters';
import toast from 'react-hot-toast';
import Fuse from 'fuse.js';

// Rich Text Editor Component (same as before)
const RichTextEditor = ({ value, onChange, placeholder = "Enter text..." }) => {
  const [showGreekMenu, setShowGreekMenu] = useState(false);

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
    const textarea = document.getElementById('rich-text-area');
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const newValue = value.substring(0, start) + text + value.substring(end);
    
    onChange(newValue);
    
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + text.length, start + text.length);
    }, 0);
  };

  const wrapSelection = (prefix, suffix = '') => {
    const textarea = document.getElementById('rich-text-area');
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    const newText = prefix + selectedText + suffix;
    const newValue = value.substring(0, start) + newText + value.substring(end);
    
    onChange(newValue);
    
    setTimeout(() => {
      textarea.focus();
      if (selectedText) {
        textarea.setSelectionRange(start + prefix.length, start + prefix.length + selectedText.length);
      } else {
        textarea.setSelectionRange(start + prefix.length, start + prefix.length);
      }
    }, 0);
  };

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 bg-gray-50 border-b border-gray-200">
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
        <div className="relative">
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
                <div className="grid grid-cols-6 gap-1">
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
          Use {'<sup>text</sup>'} for superscript, {'<sub>text</sub>'} for subscript
        </div>
      </div>

      {/* Textarea */}
      <textarea
        id="rich-text-area"
        rows={4}
        className="w-full px-3 py-2 focus:outline-none resize-vertical bg-white"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />

      {/* Preview */}
      {value && (
        <div className="p-3 bg-gray-50 border-t border-gray-200">
          <div className="text-xs text-gray-600 font-medium mb-1">Preview:</div>
          <div className="text-sm text-gray-800 min-h-6">
            {formatTextWithHTML(value)}
          </div>
        </div>
      )}
    </div>
  );
};

// Format text for display - CRITICAL FUNCTION for showing formatted text
export const formatTextWithHTML = (text) => {
  if (!text) return '';
  
  return text
    .replace(/<sup>(.*?)<\/sup>/g, '<sup>$1</sup>')
    .replace(/<sub>(.*?)<\/sub>/g, '<sub>$1</sub>');
};

// Safe HTML component for rendering formatted text
const SafeHTML = ({ html, className = '' }) => {
  return (
    <div 
      className={className}
      dangerouslySetInnerHTML={{ __html: formatTextWithHTML(html) }}
    />
  );
};

const TestManagement = () => {
  const [tests, setTests] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingTest, setEditingTest] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddQuestion, setShowAddQuestion] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    type: 'NEET_MOCK',
    scheduledDate: '',
    startTime: '',
    endTime: '',
    duration: 180,
    questions: [],
    markingScheme: {
      totalMarks: 720,
      positiveMarks: 4,
      negativeMarks: 1
    },
    isActive: true
  });

  // New question form data
  const [newQuestion, setNewQuestion] = useState({
    subject: 'Physics',
    chapter: '',
    topic: '',
    difficulty: 'Medium',
    questionText: '',
    options: [
      { optionText: '', isCorrect: false },
      { optionText: '', isCorrect: false },
      { optionText: '', isCorrect: false },
      { optionText: '', isCorrect: false },
    ],
  });

  useEffect(() => {
    loadTests();
    loadQuestions();
  }, []);

  const loadTests = async () => {
    setLoading(true);
    try {
      const response = await getAllTests();
      setTests(response.tests || response);
    } catch (error) {
      toast.error('Failed to load tests');
    } finally {
      setLoading(false);
    }
  };

  const loadQuestions = async () => {
    try {
      const response = await getQuestions({ limit: 5000 });
      setQuestions(response.questions || []);
    } catch (error) {
      console.error('Failed to load questions');
    }
  };

  // Fuzzy search using Fuse.js
  const fuse = useMemo(() => {
    return new Fuse(questions, {
      keys: ['questionText', 'subject', 'chapter', 'topic'],
      threshold: 0.3,
      ignoreLocation: true,
      minMatchCharLength: 2,
    });
  }, [questions]);

  const filteredQuestions = useMemo(() => {
    if (!searchTerm.trim()) return questions;
    const results = fuse.search(searchTerm);
    return results.map((result) => result.item);
  }, [searchTerm, fuse, questions]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Prepare the payload according to the model schema
      const payload = {
        name: formData.name,
        type: formData.type,
        scheduledDate: formData.scheduledDate ? new Date(formData.scheduledDate) : null,
        startTime: formData.startTime ? new Date(formData.startTime) : null,
        endTime: formData.endTime ? new Date(formData.endTime) : null,
        duration: parseInt(formData.duration),
        questions: formData.questions,
        markingScheme: {
          totalMarks: parseFloat(formData.markingScheme.totalMarks),
          positiveMarks: parseFloat(formData.markingScheme.positiveMarks),
          negativeMarks: parseFloat(formData.markingScheme.negativeMarks)
        },
        isActive: formData.isActive
      };

      if (editingTest) {
        await updateTest(editingTest._id, payload);
        toast.success('Test updated successfully');
      } else {
        await createTest(payload);
        toast.success('Test created successfully');
      }

      setShowForm(false);
      setEditingTest(null);
      resetForm();
      loadTests();
    } catch (error) {
      toast.error(error.message || 'Operation failed');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (test) => {
    setEditingTest(test);
    setFormData({
      name: test.name || '',
      type: test.type || 'DPP_TEST',
      scheduledDate: test.scheduledDate ? new Date(test.scheduledDate).toISOString().split('T')[0] : '',
      startTime: test.startTime ? new Date(test.startTime).toISOString().slice(0, 16) : '',
      endTime: test.endTime ? new Date(test.endTime).toISOString().slice(0, 16) : '',
      duration: test.duration || 180,
      questions: test.questions?.map((q) => q._id || q) || [],
      markingScheme: {
        totalMarks: test.markingScheme?.totalMarks || 0,
        positiveMarks: test.markingScheme?.positiveMarks || 0,
        negativeMarks: test.markingScheme?.negativeMarks || 0
      },
      isActive: test.isActive !== undefined ? test.isActive : true
    });
    setShowForm(true);
  };

  const handleDelete = async (testId) => {
    if (window.confirm('Are you sure you want to delete this test?')) {
      try {
        await deleteTest(testId);
        toast.success('Test deleted successfully');
        loadTests();
      } catch (error) {
        toast.error('Failed to delete test');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      type: 'DPP_TEST',
      scheduledDate: '',
      startTime: '',
      endTime: '',
      duration: 180,
      questions: [],
      markingScheme: {
        totalMarks: 0,
        positiveMarks: 0,
        negativeMarks: 0
      },
      isActive: true
    });
    setSearchTerm('');
    setShowAddQuestion(false);
    resetNewQuestion();
  };

  const resetNewQuestion = () => {
    setNewQuestion({
      subject: 'Physics',
      chapter: '',
      topic: '',
      difficulty: 'Medium',
      questionText: '',
      options: [
        { optionText: '', isCorrect: false },
        { optionText: '', isCorrect: false },
        { optionText: '', isCorrect: false },
        { optionText: '', isCorrect: false },
      ],
    });
  };

  const toggleQuestionSelection = (questionId) => {
    setFormData((prev) => ({
      ...prev,
      questions: prev.questions.includes(questionId)
        ? prev.questions.filter((id) => id !== questionId)
        : [...prev.questions, questionId],
    }));
  };

  const selectQuestionsByFilter = (subject) => {
    const filtered = questions.filter((q) => q.subject === subject).map((q) => q._id);
    setFormData((prev) => ({
      ...prev,
      questions: [...new Set([...prev.questions, ...filtered])],
    }));
  };

  const handleCreateNewQuestion = async () => {
    // Validation
    if (!newQuestion.questionText.trim()) {
      toast.error('Question text is required');
      return;
    }
    if (!newQuestion.chapter.trim() || !newQuestion.topic.trim()) {
      toast.error('Chapter and topic are required');
      return;
    }
    const filledOptions = newQuestion.options.filter((opt) => opt.optionText.trim());
    if (filledOptions.length < 2) {
      toast.error('At least 2 options are required');
      return;
    }
    const correctOption = newQuestion.options.find((opt) => opt.isCorrect);
    if (!correctOption) {
      toast.error('Please mark one option as correct');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        ...newQuestion,
        options: newQuestion.options.filter((opt) => opt.optionText.trim()),
        hint: { text: '' },
        approach: { text: '' },
        solution: [{ stepNumber: 1, stepText: '' }],
      };

      const response = await createQuestion(payload);
      const createdQuestion = response.question || response;

      // Add to local questions list
      setQuestions((prev) => [createdQuestion, ...prev]);

      // Auto-select the newly created question
      setFormData((prev) => ({
        ...prev,
        questions: [...prev.questions, createdQuestion._id],
      }));

      toast.success('Question created and added to test');
      setShowAddQuestion(false);
      resetNewQuestion();
    } catch (error) {
      toast.error(error.message || 'Failed to create question');
    } finally {
      setLoading(false);
    }
  };

  const updateNewQuestionOption = (index, field, value) => {
    const updatedOptions = [...newQuestion.options];
    if (field === 'isCorrect' && value) {
      // Only one correct answer
      updatedOptions.forEach((opt, i) => {
        opt.isCorrect = i === index;
      });
    } else {
      updatedOptions[index][field] = value;
    }
    setNewQuestion({ ...newQuestion, options: updatedOptions });
  };

  const handleMarkingSchemeChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      markingScheme: {
        ...prev.markingScheme,
        [field]: value
      }
    }));
  };

  const handleGoBack = () => {
    setShowForm(false);
    setEditingTest(null);
    resetForm();
  };

  // Show test list view
  if (!showForm) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Test Management</h1>
          <Button 
            onClick={() => setShowForm(true)} 
            className="text-black outline cursor-pointer hover:bg-gray-600 hover:text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Test
          </Button>
        </div>

        {/* Tests List */}
        <div className="space-y-4">
          {loading ? (
            <div className="flex justify-center py-8">
              <Spinner size={32} />
            </div>
          ) : tests.length > 0 ? (
            tests.map((test) => (
              <Card key={test._id} className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold">{test.name}</h3>
                      <Badge text={test.type} />
                      {test.isActive ? (
                        <Badge text="Active" color="green" />
                      ) : (
                        <Badge text="Inactive" color="gray" />
                      )}
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-2">
                      <div>
                        <span className="font-medium">Duration:</span> {test.duration} min
                      </div>
                      <div>
                        <span className="font-medium">Questions:</span> {test.questions?.length || 0}
                      </div>
                      <div>
                        <span className="font-medium">Total Marks:</span> {test.markingScheme?.totalMarks || 0}
                      </div>
                      <div>
                        <span className="font-medium">Marking:</span> +{test.markingScheme?.positiveMarks || 0}/-{test.markingScheme?.negativeMarks || 0}
                      </div>
                    </div>
                    {test.scheduledDate && (
                      <div className="flex gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          Scheduled: {formatDate(test.scheduledDate)}
                        </span>
                        {test.startTime && (
                          <span>Start: {new Date(test.startTime).toLocaleTimeString()}</span>
                        )}
                        {test.endTime && (
                          <span>End: {new Date(test.endTime).toLocaleTimeString()}</span>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline cursor-pointer" size="sm" onClick={() => handleEdit(test)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button className="text-red-400 cursor-pointer" variant="danger" size="sm" onClick={() => handleDelete(test._id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <Card className="p-12 text-center text-gray-500">No tests found.</Card>
          )}
        </div>
      </div>
    );
  }

  // Show full-page form view
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header with Back Button */}
      <div className="mb-6 flex items-center">
        <Button
          variant="outline"
          onClick={handleGoBack}
          className="flex items-center gap-2 mr-4 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Go Back to Test Management
        </Button>
        <h1 className="text-3xl font-bold text-gray-900">
          {editingTest ? 'Edit Test' : 'Create New Test'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Details */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Basic Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Test Name *</label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                placeholder="e.g., NEET Mock Test 1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Test Type *</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full rounded border border-gray-300 px-3 py-2"
                required
              >
                <option value="DPP_TEST">DPP Test</option>
                <option value="NEET_MOCK">NEET Mock Test</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Duration (minutes) *</label>
              <Input
                type="number"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
                required
                min="1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Scheduled Date *</label>
              <Input
                type="date"
                value={formData.scheduledDate}
                onChange={(e) => setFormData({ ...formData, scheduledDate: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Start Time *</label>
              <Input
                type="datetime-local"
                value={formData.startTime}
                onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">End Time *</label>
              <Input
                type="datetime-local"
                value={formData.endTime}
                onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                required
              />
            </div>
          </div>
        </Card>

        {/* Marking Scheme */}
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4">Marking Scheme</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Total Marks *</label>
              <Input
                type="number"
                step="0.01"
                value={formData.markingScheme.totalMarks}
                onChange={(e) => handleMarkingSchemeChange('totalMarks', e.target.value)}
                required
                min="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Positive Marks *</label>
              <Input
                type="number"
                step="0.01"
                value={formData.markingScheme.positiveMarks}
                onChange={(e) => handleMarkingSchemeChange('positiveMarks', e.target.value)}
                required
                min="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Negative Marks *</label>
              <Input
                type="number"
                step="0.01"
                value={formData.markingScheme.negativeMarks}
                onChange={(e) => handleMarkingSchemeChange('negativeMarks', e.target.value)}
                required
                min="0"
              />
            </div>
          </div>
        </Card>

        {/* Active Status */}
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={formData.isActive}
              onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
              id="isActiveCheck"
              className="w-4 h-4"
            />
            <label htmlFor="isActiveCheck" className="text-sm font-medium">
              Active (visible to students)
            </label>
          </div>
        </Card>

        {/* Question Selection */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold">
              Select Questions ({formData.questions.length} selected) *
            </h3>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setShowAddQuestion(!showAddQuestion)}
                className="cursor-pointer"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add New Question
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => selectQuestionsByFilter('Physics')}
                className="cursor-pointer"
              >
                + Physics
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => selectQuestionsByFilter('Chemistry')}
                className="cursor-pointer"
              >
                + Chemistry
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => selectQuestionsByFilter('Biology')}
                className="cursor-pointer"
              >
                + Biology
              </Button>
            </div>
          </div>

          {/* Add New Question Form */}
          {showAddQuestion && (
            <Card className="p-4 mb-4 bg-blue-50 border-blue-200">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">Create New Question</h3>
                <button
                  type="button"
                  onClick={() => setShowAddQuestion(false)}
                  className="text-gray-500 hover:text-gray-700 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-medium mb-1">Subject *</label>
                    <select
                      value={newQuestion.subject}
                      onChange={(e) =>
                        setNewQuestion({ ...newQuestion, subject: e.target.value })
                      }
                      className="w-full rounded border border-gray-300 px-2 py-1 text-sm"
                    >
                      <option value="Physics">Physics</option>
                      <option value="Chemistry">Chemistry</option>
                      <option value="Biology">Biology</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1">Chapter *</label>
                    <Input
                      value={newQuestion.chapter}
                      onChange={(e) =>
                        setNewQuestion({ ...newQuestion, chapter: e.target.value })
                      }
                      placeholder="Chapter name"
                      className="text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1">Topic *</label>
                    <Input
                      value={newQuestion.topic}
                      onChange={(e) =>
                        setNewQuestion({ ...newQuestion, topic: e.target.value })
                      }
                      placeholder="Topic name"
                      className="text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium mb-1">Difficulty</label>
                  <select
                    value={newQuestion.difficulty}
                    onChange={(e) =>
                      setNewQuestion({ ...newQuestion, difficulty: e.target.value })
                    }
                    className="w-full rounded border border-gray-300 px-2 py-1 text-sm"
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium mb-1">Question Text *</label>
                  <RichTextEditor
                    value={newQuestion.questionText}
                    onChange={(value) =>
                      setNewQuestion({ ...newQuestion, questionText: value })
                    }
                    placeholder="Enter question text"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium mb-1">Options *</label>
                  {newQuestion.options.map((opt, i) => (
                    <div key={i} className="flex gap-2 mb-2">
                      <input
                        type="radio"
                        name="correctOption"
                        checked={opt.isCorrect}
                        onChange={() => updateNewQuestionOption(i, 'isCorrect', true)}
                        className="mt-1 cursor-pointer"
                      />
                      <div className="flex-1">
                        <RichTextEditor
                          value={opt.optionText}
                          onChange={(value) => updateNewQuestionOption(i, 'optionText', value)}
                          placeholder={`Option ${i + 1}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <Button
                  type="button"
                  onClick={handleCreateNewQuestion}
                  disabled={loading}
                  size="sm"
                  className="w-full bg-red-400 cursor-pointer"
                >
                  {loading ? 'Creating...' : 'Create & Add to Test'}
                </Button>
              </div>
            </Card>
          )}

          {/* Search Bar */}
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search questions by keyword, subject, chapter, topic..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Questions List */}
          <div className="max-h-96 overflow-y-auto border rounded p-3 space-y-2">
            {filteredQuestions.length === 0 ? (
              <p className="text-center text-gray-500 py-4 text-sm">
                {searchTerm ? 'No questions match your search' : 'No questions available'}
              </p>
            ) : (
              filteredQuestions.map((q) => (
                <div key={q._id} className="flex items-start gap-3 p-2 hover:bg-gray-50 rounded">
                  <input
                    type="checkbox"
                    checked={formData.questions.includes(q._id)}
                    onChange={() => toggleQuestionSelection(q._id)}
                    className="mt-1 cursor-pointer"
                  />
                  <div className="flex-1">
                    {/* Use SafeHTML to display formatted question text */}
                    <SafeHTML 
                      html={q.questionText} 
                      className="text-sm font-medium"
                    />
                    <div className="flex gap-2 mt-1">
                      <Badge text={q.subject} />
                      <Badge text={q.difficulty} />
                      <Badge text={`${q.chapter} → ${q.topic}`} />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>

        {/* Form Actions */}
        <div className="flex gap-3 justify-end pt-4">
          <Button 
            type="button" 
            variant="outline" 
            onClick={handleGoBack}
            className="cursor-pointer"
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            disabled={loading} 
            className="text-black outline cursor-pointer hover:bg-gray-800 hover:text-white"
          >
            {loading ? 'Saving...' : editingTest ? 'Update Test' : 'Create Test'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default TestManagement;