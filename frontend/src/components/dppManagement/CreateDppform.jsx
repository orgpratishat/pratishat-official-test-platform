

// import React, { useState, useEffect } from 'react';
// import { ArrowLeft, Save, Search } from 'lucide-react';
// import Button from '../ui/Button';
// import Card from '../ui/Card';
// import Input from '../ui/Input';
// import Spinner from '../ui/Spinner';
// import Badge from '../ui/Badge';
// import { createDPP, updateDPP } from '../../services/dppService';
// import { getQuestions } from '../../services/questions';
// import toast from 'react-hot-toast';

// const CreateDPPForm = ({ editingDPP, onBack, onSuccess }) => {
//   const [loading, setLoading] = useState(false);
//   const [questions, setQuestions] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedQuestions, setSelectedQuestions] = useState([]);
//   const [filterSubject, setFilterSubject] = useState('Physics');
//   const [filterChapter, setFilterChapter] = useState('');
//   const [availableChapters, setAvailableChapters] = useState([]);

//   const [formData, setFormData] = useState({
//     title: '',
//     subject: 'Physics',
//     chapter: '',
//     duration: 30,
//     totalMarks: 0,
//     markingScheme: {
//       positiveMarks: 4,
//       negativeMarks: 1
//     },
//     difficulty: 'Medium',
//     isActive: true,
//     order: 0
//   });

//   useEffect(() => {
//     if (editingDPP) {
//       setFormData({
//         title: editingDPP.title || '',
//         subject: editingDPP.subject || 'Physics',
//         chapter: editingDPP.chapter || '',
//         duration: editingDPP.duration || 30,
//         totalMarks: editingDPP.totalMarks || 0,
//         markingScheme: {
//           positiveMarks: editingDPP.markingScheme?.positiveMarks || 4,
//           negativeMarks: editingDPP.markingScheme?.negativeMarks || 1
//         },
//         difficulty: editingDPP.difficulty || 'Medium',
//         isActive: editingDPP.isActive !== undefined ? editingDPP.isActive : true,
//         order: editingDPP.order || 0
//       });
//       setSelectedQuestions(editingDPP.questions || []);
//     }
//     loadQuestions();
//   }, [editingDPP]);

//   useEffect(() => {
//     // Update available chapters when subject changes
//     updateAvailableChapters();
//   }, [filterSubject, questions]);

//   const loadQuestions = async () => {
//     try {
//       const response = await getQuestions({ limit: 1000 });
//       setQuestions(response.questions || []);
//     } catch (error) {
//       console.error('Failed to load questions');
//     }
//   };

//   const updateAvailableChapters = () => {
//     const chapters = [...new Set(questions
//       .filter(q => q.subject === filterSubject)
//       .map(q => q.chapter)
//     )].sort();
    
//     setAvailableChapters(chapters);
    
//     // If current chapter is not in available chapters for selected subject, clear it
//     if (formData.chapter && !chapters.includes(formData.chapter)) {
//       setFormData(prev => ({ ...prev, chapter: '' }));
//     }
//   };

//   const handleSubjectChange = (subject) => {
//     setFilterSubject(subject);
//     setFormData(prev => ({ ...prev, subject, chapter: '' }));
//     setFilterChapter('');
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (selectedQuestions.length === 0) {
//       toast.error('Please select at least one question');
//       return;
//     }

//     if (!formData.title || !formData.chapter) {
//       toast.error('Title and Chapter are required');
//       return;
//     }

//     setLoading(true);
//     try {
//       const payload = {
//         ...formData,
//         questions: selectedQuestions.map(q => q._id),
//         totalMarks: selectedQuestions.length * formData.markingScheme.positiveMarks
//       };

//       if (editingDPP) {
//         await updateDPP(editingDPP._id, payload);
//         toast.success('DPP updated successfully');
//       } else {
//         await createDPP(payload);
//         toast.success('DPP created successfully');
//       }
      
//       onSuccess();
//     } catch (error) {
//       toast.error(error.message || 'Failed to save DPP');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const toggleQuestionSelection = (question) => {
//     setSelectedQuestions(prev => {
//       const isSelected = prev.some(q => q._id === question._id);
//       if (isSelected) {
//         return prev.filter(q => q._id !== question._id);
//       } else {
//         return [...prev, question];
//       }
//     });
//   };

//   const filteredQuestions = questions.filter(question => {
//     const matchesSearch = searchTerm === '' || 
//       question.questionText.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       question.topic.toLowerCase().includes(searchTerm.toLowerCase());
    
//     const matchesSubject = question.subject === filterSubject;
//     const matchesChapter = filterChapter === '' || question.chapter === filterChapter;
    
//     return matchesSearch && matchesSubject && matchesChapter;
//   });

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center gap-4">
//         <Button variant="outline" onClick={onBack}>
//           <ArrowLeft className="w-4 h-4 mr-2" />
//           Back to List
//         </Button>
//         <h2 className="text-2xl font-bold text-gray-900">
//           {editingDPP ? 'Edit DPP' : 'Create New DPP'}
//         </h2>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-6">
//         <Card className="p-6">
//           <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
          
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium mb-1">Title *</label>
//               <Input
//                 value={formData.title}
//                 onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//                 placeholder="e.g., Laws of Motion - Practice Set 1"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium mb-1">Subject *</label>
//               <select
//                 value={formData.subject}
//                 onChange={(e) => handleSubjectChange(e.target.value)}
//                 className="w-full rounded border border-gray-300 px-3 py-2"
//                 required
//               >
//                 <option value="Physics">Physics</option>
//                 <option value="Chemistry">Chemistry</option>
//                 <option value="Biology">Biology</option>
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-medium mb-1">Chapter *</label>
//               <select
//                 value={formData.chapter}
//                 onChange={(e) => setFormData({ ...formData, chapter: e.target.value })}
//                 className="w-full rounded border border-gray-300 px-3 py-2"
//                 required
//               >
//                 <option value="">Select a chapter</option>
//                 {availableChapters.map(chapter => (
//                   <option key={chapter} value={chapter}>
//                     {chapter}
//                   </option>
//                 ))}
//               </select>
//               {availableChapters.length === 0 && (
//                 <p className="text-xs text-gray-500 mt-1">
//                   No chapters found for {formData.subject}. Add questions first.
//                 </p>
//               )}
//             </div>

//             <div>
//               <label className="block text-sm font-medium mb-1">Duration (minutes) *</label>
//               <Input
//                 type="number"
//                 value={formData.duration}
//                 onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
//                 min="1"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium mb-1">Difficulty *</label>
//               <select
//                 value={formData.difficulty}
//                 onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
//                 className="w-full rounded border border-gray-300 px-3 py-2"
//                 required
//               >
//                 <option value="Easy">Easy</option>
//                 <option value="Medium">Medium</option>
//                 <option value="Hard">Hard</option>
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-medium mb-1">Order ID*</label>
//               <Input
//                 type="number"
//                 value={formData.order}
//                 onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
//                 min="0"
//                 required
//               />
//             </div>
//           </div>
//         </Card>

//         <Card className="p-6">
//           <h3 className="text-lg font-semibold mb-4">Marking Scheme</h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium mb-1">Positive Marks</label>
//               <Input
//                 type="number"
//                 step="0.1"
//                 value={formData.markingScheme.positiveMarks}
//                 onChange={(e) => setFormData({
//                   ...formData,
//                   markingScheme: {
//                     ...formData.markingScheme,
//                     positiveMarks: parseFloat(e.target.value)
//                   }
//                 })}
//                 min="0"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-1">Negative Marks</label>
//               <Input
//                 type="number"
//                 step="0.1"
//                 value={formData.markingScheme.negativeMarks}
//                 onChange={(e) => setFormData({
//                   ...formData,
//                   markingScheme: {
//                     ...formData.markingScheme,
//                     negativeMarks: parseFloat(e.target.value)
//                   }
//                 })}
//                 min="0"
//                 required
//               />
//             </div>
//           </div>
//           <div className="mt-2 text-sm text-gray-600">
//             Total Marks: {selectedQuestions.length * formData.markingScheme.positiveMarks}
//           </div>
//         </Card>

//         <Card className="p-6">
//           <h3 className="text-lg font-semibold mb-4">
//             Select Questions ({selectedQuestions.length} selected)
//           </h3>

//           {/* Question Filters */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
//             <div>
//               <label className="block text-sm font-medium mb-1">Filter by Subject</label>
//               <select
//                 value={filterSubject}
//                 onChange={(e) => {
//                   setFilterSubject(e.target.value);
//                   setFilterChapter('');
//                 }}
//                 className="w-full rounded border border-gray-300 px-3 py-2"
//               >
//                 <option value="Physics">Physics</option>
//                 <option value="Chemistry">Chemistry</option>
//                 <option value="Biology">Biology</option>
//               </select>
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-1">Filter by Chapter</label>
//               <select
//                 value={filterChapter}
//                 onChange={(e) => setFilterChapter(e.target.value)}
//                 className="w-full rounded border border-gray-300 px-3 py-2"
//               >
//                 <option value="">All Chapters</option>
//                 {availableChapters.map(chapter => (
//                   <option key={chapter} value={chapter}>{chapter}</option>
//                 ))}
//               </select>
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-1">Search Questions</label>
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//                 <Input
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   placeholder="Search by question text or topic..."
//                   className="pl-10"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Questions List */}
//           <div className="border rounded-lg max-h-96 overflow-y-auto">
//             {filteredQuestions.length === 0 ? (
//               <div className="p-8 text-center text-gray-500">
//                 No questions found matching your criteria
//               </div>
//             ) : (
//               filteredQuestions.map(question => (
//                 <div
//                   key={question._id}
//                   className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
//                     selectedQuestions.some(q => q._id === question._id) ? 'bg-blue-50' : ''
//                   }`}
//                   onClick={() => toggleQuestionSelection(question)}
//                 >
//                   <div className="flex items-start gap-3">
//                     <input
//                       type="checkbox"
//                       checked={selectedQuestions.some(q => q._id === question._id)}
//                       onChange={() => {}}
//                       className="mt-1"
//                     />
//                     <div className="flex-1">
//                       <p className="text-sm font-medium mb-2 line-clamp-2">
//                         {question.questionText}
//                       </p>
//                       <div className="flex gap-2 flex-wrap">
//                         <Badge text={question.subject} />
//                         <Badge text={question.chapter} />
//                         <Badge text={question.topic} />
//                         <Badge text={question.difficulty} />
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>
//         </Card>

//         <div className="flex gap-3 justify-end">
//           <Button type="button" variant="outline" onClick={onBack}>
//             Cancel
//           </Button>
//           <Button type="submit" disabled={loading} className="bg-red-400">
//             <Save className="w-4 h-4 mr-2" />
//             {loading ? 'Saving...' : editingDPP ? 'Update DPP' : 'Create DPP'}
//           </Button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default CreateDPPForm;


import React, { useState, useEffect } from 'react';
import { ArrowLeft, Save, Search, Filter, CheckSquare, Square } from 'lucide-react';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Spinner from '../ui/Spinner';
import Badge from '../ui/Badge';
import { createDPP, updateDPP } from '../../services/dppService';
import { getQuestions } from '../../services/questions';
import toast from 'react-hot-toast';

// Date Filter Component
const DateFilter = ({ 
  startDate, 
  endDate, 
  onStartDateChange, 
  onEndDateChange, 
  onApplyFilter, 
  onClearFilter,
  isFilterActive 
}) => {
  return (
    <Card className="p-4 mb-4 bg-gray-50 border border-gray-200">
      <div className="flex items-center gap-2 mb-3">
        <Filter className="w-4 h-4 text-gray-600" />
        <h3 className="font-medium text-gray-800">Filter Questions by Creation Date</h3>
        {isFilterActive && (
          <Badge text="Filter Active" color="blue" />
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">
            Start Date & Time
          </label>
          <Input
            type="datetime-local"
            value={startDate}
            onChange={(e) => onStartDateChange(e.target.value)}
            className="w-full"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">
            End Date & Time
          </label>
          <Input
            type="datetime-local"
            value={endDate}
            onChange={(e) => onEndDateChange(e.target.value)}
            className="w-full"
          />
        </div>
        
        <div className="flex gap-2">
          <Button
            type="button"
            onClick={onApplyFilter}
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white cursor-pointer"
            size="sm"
          >
            Apply Filter
          </Button>
          <Button
            type="button"
            onClick={onClearFilter}
            variant="outline"
            className="flex-1 cursor-pointer"
            size="sm"
          >
            Clear
          </Button>
        </div>
      </div>
      
      {isFilterActive && (
        <div className="mt-3 text-xs text-gray-600">
          <p>Showing questions created between {new Date(startDate).toLocaleString()} and {new Date(endDate).toLocaleString()}</p>
        </div>
      )}
    </Card>
  );
};

// Question Statistics Component
const QuestionStatistics = ({ questions, selectedQuestions }) => {
  const stats = React.useMemo(() => {
    const total = questions.length;
    const selected = selectedQuestions.length;
    
    const bySubject = questions.reduce((acc, question) => {
      const subject = question.subject || 'Unknown';
      acc[subject] = (acc[subject] || 0) + 1;
      return acc;
    }, {});
    
    return { total, selected, bySubject };
  }, [questions, selectedQuestions]);

  if (questions.length === 0) return null;

  return (
    <Card className="p-4 mb-4 bg-green-50 border border-green-200">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">{stats.total}</div>
          <div className="text-gray-600">Total Questions</div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">{stats.selected}</div>
          <div className="text-gray-600">Selected</div>
        </div>
        
        {Object.entries(stats.bySubject).map(([subject, count]) => (
          <div key={subject} className="text-center">
            <div className="text-xl font-bold text-purple-600">{count}</div>
            <div className="text-gray-600">{subject}</div>
          </div>
        ))}
      </div>
    </Card>
  );
};

const CreateDPPForm = ({ editingDPP, onBack, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [filterSubject, setFilterSubject] = useState('Physics');
  const [filterChapter, setFilterChapter] = useState('');
  const [availableChapters, setAvailableChapters] = useState([]);

  // Date filter states
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isDateFilterActive, setIsDateFilterActive] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    subject: 'Physics',
    chapter: '',
    duration: 30,
    totalMarks: 0,
    markingScheme: {
      positiveMarks: 4,
      negativeMarks: 1
    },
    difficulty: 'Medium',
    isActive: true,
    order: 0
  });

  useEffect(() => {
    if (editingDPP) {
      setFormData({
        title: editingDPP.title || '',
        subject: editingDPP.subject || 'Physics',
        chapter: editingDPP.chapter || '',
        duration: editingDPP.duration || 30,
        totalMarks: editingDPP.totalMarks || 0,
        markingScheme: {
          positiveMarks: editingDPP.markingScheme?.positiveMarks || 4,
          negativeMarks: editingDPP.markingScheme?.negativeMarks || 1
        },
        difficulty: editingDPP.difficulty || 'Medium',
        isActive: editingDPP.isActive !== undefined ? editingDPP.isActive : true,
        order: editingDPP.order || 0
      });
      setSelectedQuestions(editingDPP.questions || []);
    }
    loadQuestions();
  }, [editingDPP]);

  useEffect(() => {
    // Update available chapters when subject changes
    updateAvailableChapters();
  }, [filterSubject, questions]);

  const loadQuestions = async () => {
    try {
      const response = await getQuestions({ limit: 1000 });
      setQuestions(response.questions || []);
    } catch (error) {
      console.error('Failed to load questions');
    }
  };

  const updateAvailableChapters = () => {
    const chapters = [...new Set(questions
      .filter(q => q.subject === filterSubject)
      .map(q => q.chapter)
    )].sort();
    
    setAvailableChapters(chapters);
    
    // If current chapter is not in available chapters for selected subject, clear it
    if (formData.chapter && !chapters.includes(formData.chapter)) {
      setFormData(prev => ({ ...prev, chapter: '' }));
    }
  };

  const handleSubjectChange = (subject) => {
    setFilterSubject(subject);
    setFormData(prev => ({ ...prev, subject, chapter: '' }));
    setFilterChapter('');
  };

  // Apply date filter to questions
  const filteredByDate = React.useMemo(() => {
    if (!isDateFilterActive || !startDate || !endDate) {
      return questions;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    return questions.filter(question => {
      const questionDate = new Date(question.createdAt);
      return questionDate >= start && questionDate <= end;
    });
  }, [questions, startDate, endDate, isDateFilterActive]);

  // Apply search and chapter filters
  const filteredQuestions = React.useMemo(() => {
    return filteredByDate.filter(question => {
      const matchesSearch = searchTerm === '' || 
        question.questionText.toLowerCase().includes(searchTerm.toLowerCase()) ||
        question.topic.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesSubject = question.subject === filterSubject;
      const matchesChapter = filterChapter === '' || question.chapter === filterChapter;
      
      return matchesSearch && matchesSubject && matchesChapter;
    });
  }, [filteredByDate, searchTerm, filterSubject, filterChapter]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (selectedQuestions.length === 0) {
      toast.error('Please select at least one question');
      return;
    }

    if (!formData.title || !formData.chapter) {
      toast.error('Title and Chapter are required');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        ...formData,
        questions: selectedQuestions.map(q => q._id),
        totalMarks: selectedQuestions.length * formData.markingScheme.positiveMarks
      };

      if (editingDPP) {
        await updateDPP(editingDPP._id, payload);
        toast.success('DPP updated successfully');
      } else {
        await createDPP(payload);
        toast.success('DPP created successfully');
      }
      
      onSuccess();
    } catch (error) {
      toast.error(error.message || 'Failed to save DPP');
    } finally {
      setLoading(false);
    }
  };

  const toggleQuestionSelection = (question) => {
    setSelectedQuestions(prev => {
      const isSelected = prev.some(q => q._id === question._id);
      if (isSelected) {
        return prev.filter(q => q._id !== question._id);
      } else {
        return [...prev, question];
      }
    });
  };

  // Select all questions from current filtered list
  const selectAllFilteredQuestions = () => {
    const filteredQuestionIds = filteredQuestions.map(q => q._id);
    const newSelectedQuestions = [...selectedQuestions];
    
    filteredQuestions.forEach(question => {
      if (!newSelectedQuestions.some(q => q._id === question._id)) {
        newSelectedQuestions.push(question);
      }
    });
    
    setSelectedQuestions(newSelectedQuestions);
    toast.success(`Added ${filteredQuestions.length} questions to DPP`);
  };

  // Deselect all questions from current filtered list
  const deselectAllFilteredQuestions = () => {
    const filteredQuestionIds = filteredQuestions.map(q => q._id);
    setSelectedQuestions(prev => 
      prev.filter(question => !filteredQuestionIds.includes(question._id))
    );
    toast.success(`Removed ${filteredQuestions.length} questions from DPP`);
  };

  // Date filter handlers
  const handleApplyDateFilter = () => {
    if (!startDate || !endDate) {
      toast.error('Please select both start and end dates');
      return;
    }

    if (new Date(startDate) > new Date(endDate)) {
      toast.error('Start date cannot be after end date');
      return;
    }

    setIsDateFilterActive(true);
    toast.success('Date filter applied');
  };

  const handleClearDateFilter = () => {
    setStartDate('');
    setEndDate('');
    setIsDateFilterActive(false);
    toast.success('Date filter cleared');
  };

  // Check if all filtered questions are selected
  const allFilteredSelected = React.useMemo(() => {
    if (filteredQuestions.length === 0) return false;
    return filteredQuestions.every(q => selectedQuestions.some(sq => sq._id === q._id));
  }, [filteredQuestions, selectedQuestions]);

  // Check if some filtered questions are selected
  const someFilteredSelected = React.useMemo(() => {
    if (filteredQuestions.length === 0) return false;
    return filteredQuestions.some(q => selectedQuestions.some(sq => sq._id === q._id)) && !allFilteredSelected;
  }, [filteredQuestions, selectedQuestions, allFilteredSelected]);

  // Toggle select all for filtered questions
  const toggleSelectAllFiltered = () => {
    if (allFilteredSelected) {
      deselectAllFilteredQuestions();
    } else {
      selectAllFilteredQuestions();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to List
        </Button>
        <h2 className="text-2xl font-bold text-gray-900">
          {editingDPP ? 'Edit DPP' : 'Create New DPP'}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title *</label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., Laws of Motion - Practice Set 1"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Subject *</label>
              <select
                value={formData.subject}
                onChange={(e) => handleSubjectChange(e.target.value)}
                className="w-full rounded border border-gray-300 px-3 py-2"
                required
              >
                <option value="Physics">Physics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Biology">Biology</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Chapter *</label>
              <select
                value={formData.chapter}
                onChange={(e) => setFormData({ ...formData, chapter: e.target.value })}
                className="w-full rounded border border-gray-300 px-3 py-2"
                required
              >
                <option value="">Select a chapter</option>
                {availableChapters.map(chapter => (
                  <option key={chapter} value={chapter}>
                    {chapter}
                  </option>
                ))}
              </select>
              {availableChapters.length === 0 && (
                <p className="text-xs text-gray-500 mt-1">
                  No chapters found for {formData.subject}. Add questions first.
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Duration (minutes) *</label>
              <Input
                type="number"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
                min="1"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Difficulty *</label>
              <select
                value={formData.difficulty}
                onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                className="w-full rounded border border-gray-300 px-3 py-2"
                required
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Order ID*</label>
              <Input
                type="number"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                min="0"
                required
              />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Marking Scheme</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Positive Marks</label>
              <Input
                type="number"
                step="0.1"
                value={formData.markingScheme.positiveMarks}
                onChange={(e) => setFormData({
                  ...formData,
                  markingScheme: {
                    ...formData.markingScheme,
                    positiveMarks: parseFloat(e.target.value)
                  }
                })}
                min="0"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Negative Marks</label>
              <Input
                type="number"
                step="0.1"
                value={formData.markingScheme.negativeMarks}
                onChange={(e) => setFormData({
                  ...formData,
                  markingScheme: {
                    ...formData.markingScheme,
                    negativeMarks: parseFloat(e.target.value)
                  }
                })}
                min="0"
                required
              />
            </div>
          </div>
          <div className="mt-2 text-sm text-gray-600">
            Total Marks: {selectedQuestions.length * formData.markingScheme.positiveMarks}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">
            Select Questions ({selectedQuestions.length} selected)
          </h3>

          {/* Date Filter Component */}
          <DateFilter
            startDate={startDate}
            endDate={endDate}
            onStartDateChange={setStartDate}
            onEndDateChange={setEndDate}
            onApplyFilter={handleApplyDateFilter}
            onClearFilter={handleClearDateFilter}
            isFilterActive={isDateFilterActive}
          />

          {/* Question Statistics */}
          <QuestionStatistics 
            questions={filteredQuestions}
            selectedQuestions={selectedQuestions}
          />

          {/* Question Filters and Search */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1">Filter by Subject</label>
              <select
                value={filterSubject}
                onChange={(e) => {
                  setFilterSubject(e.target.value);
                  setFilterChapter('');
                }}
                className="w-full rounded border border-gray-300 px-3 py-2"
              >
                <option value="Physics">Physics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Biology">Biology</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Filter by Chapter</label>
              <select
                value={filterChapter}
                onChange={(e) => setFilterChapter(e.target.value)}
                className="w-full rounded border border-gray-300 px-3 py-2"
              >
                <option value="">All Chapters</option>
                {availableChapters.map(chapter => (
                  <option key={chapter} value={chapter}>{chapter}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Search Questions</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by question text or topic..."
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          {/* Select All Controls */}
          {filteredQuestions.length > 0 && (
            <div className="flex justify-between items-center mb-3">
              <div className="text-sm text-gray-600">
                Showing {filteredQuestions.length} questions
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={toggleSelectAllFiltered}
                className="flex items-center gap-2 cursor-pointer"
                size="sm"
              >
                {allFilteredSelected ? (
                  <CheckSquare className="w-4 h-4" />
                ) : someFilteredSelected ? (
                  <Square className="w-4 h-4" />
                ) : (
                  <Square className="w-4 h-4" />
                )}
                {allFilteredSelected ? 'Deselect All' : 'Select All'}
              </Button>
            </div>
          )}

          {/* Questions List */}
          <div className="border rounded-lg max-h-96 overflow-y-auto">
            {filteredQuestions.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                {searchTerm || isDateFilterActive || filterChapter ? 
                  'No questions found matching your criteria' : 
                  'No questions available'
                }
              </div>
            ) : (
              filteredQuestions.map(question => (
                <div
                  key={question._id}
                  className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
                    selectedQuestions.some(q => q._id === question._id) ? 'bg-blue-50' : ''
                  }`}
                  onClick={() => toggleQuestionSelection(question)}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={selectedQuestions.some(q => q._id === question._id)}
                      onChange={() => {}}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium mb-2 line-clamp-2">
                        {question.questionText}
                      </p>
                      <div className="flex gap-2 flex-wrap">
                        <Badge text={question.subject} />
                        <Badge text={question.chapter} />
                        <Badge text={question.topic} />
                        <Badge text={question.difficulty} />
                        <Badge 
                          text={new Date(question.createdAt).toLocaleDateString('en-GB').split('/').join('-')} 
                          color="gray"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>

        <div className="flex gap-3 justify-end">
          <Button type="button" variant="outline" onClick={onBack}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading} className="bg-red-400">
            <Save className="w-4 h-4 mr-2" />
            {loading ? 'Saving...' : editingDPP ? 'Update DPP' : 'Create DPP'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateDPPForm;