


// import React, { useState, useEffect } from 'react';
// import { ArrowLeft, Save, Plus, X, Search } from 'lucide-react';
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
//     description: '',
//     subject: 'Physics',
//     chapter: '',
//     topics: [],
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

//   const [newTopic, setNewTopic] = useState('');

//   useEffect(() => {
//     if (editingDPP) {
//       setFormData({
//         title: editingDPP.title || '',
//         description: editingDPP.description || '',
//         subject: editingDPP.subject || 'Physics',
//         chapter: editingDPP.chapter || '',
//         topics: editingDPP.topics || [],
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

//   const addTopic = () => {
//     if (newTopic.trim() && !formData.topics.includes(newTopic.trim())) {
//       setFormData(prev => ({
//         ...prev,
//         topics: [...prev.topics, newTopic.trim()]
//       }));
//       setNewTopic('');
//     }
//   };

//   const removeTopic = (topicToRemove) => {
//     setFormData(prev => ({
//       ...prev,
//       topics: prev.topics.filter(topic => topic !== topicToRemove)
//     }));
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
//               <label className="block text-sm font-medium mb-1">Difficulty</label>
//               <select
//                 value={formData.difficulty}
//                 onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
//                 className="w-full rounded border border-gray-300 px-3 py-2"
//               >
//                 <option value="Easy">Easy</option>
//                 <option value="Medium">Medium</option>
//                 <option value="Hard">Hard</option>
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-medium mb-1">Order</label>
//               <Input
//                 type="number"
//                 value={formData.order}
//                 onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
//                 min="0"
//               />
//             </div>
//           </div>

//           <div className="mt-4">
//             <label className="block text-sm font-medium mb-1">Description</label>
//             <textarea
//               value={formData.description}
//               onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//               rows={3}
//               className="w-full rounded border border-gray-300 px-3 py-2"
//               placeholder="Brief description of this DPP"
//             />
//           </div>

//           <div className="mt-4">
//             <label className="block text-sm font-medium mb-2">Topics</label>
//             <div className="flex gap-2 mb-2">
//               <Input
//                 value={newTopic}
//                 onChange={(e) => setNewTopic(e.target.value)}
//                 placeholder="Add a topic"
//                 className="flex-1"
//               />
//               <Button type="button" onClick={addTopic} variant="outline">
//                 <Plus className="w-4 h-4" />
//               </Button>
//             </div>
//             <div className="flex flex-wrap gap-2">
//               {formData.topics.map((topic, index) => (
//                 <Badge 
//                   key={index} 
//                   text={topic}
//                   onRemove={() => removeTopic(topic)}
//                 />
//               ))}
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
import { ArrowLeft, Save, Search } from 'lucide-react';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Spinner from '../ui/Spinner';
import Badge from '../ui/Badge';
import { createDPP, updateDPP } from '../../services/dppService';
import { getQuestions } from '../../services/questions';
import toast from 'react-hot-toast';

const CreateDPPForm = ({ editingDPP, onBack, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [filterSubject, setFilterSubject] = useState('Physics');
  const [filterChapter, setFilterChapter] = useState('');
  const [availableChapters, setAvailableChapters] = useState([]);

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

  const filteredQuestions = questions.filter(question => {
    const matchesSearch = searchTerm === '' || 
      question.questionText.toLowerCase().includes(searchTerm.toLowerCase()) ||
      question.topic.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSubject = question.subject === filterSubject;
    const matchesChapter = filterChapter === '' || question.chapter === filterChapter;
    
    return matchesSearch && matchesSubject && matchesChapter;
  });

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
              <label className="block text-sm font-medium mb-1">Difficulty</label>
              <select
                value={formData.difficulty}
                onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                className="w-full rounded border border-gray-300 px-3 py-2"
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Order</label>
              <Input
                type="number"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                min="0"
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

          {/* Question Filters */}
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

          {/* Questions List */}
          <div className="border rounded-lg max-h-96 overflow-y-auto">
            {filteredQuestions.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                No questions found matching your criteria
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