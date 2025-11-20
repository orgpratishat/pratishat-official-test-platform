


// import React, { useEffect, useMemo, useState, useRef } from 'react';
// import { createQuestion, updateQuestion, deleteQuestion } from '../../services/admin';
// import { getQuestions } from '../../services/questions';
// import Fuse from 'fuse.js';
// import toast from 'react-hot-toast';
// import QuestionList from './questions/QuestionList';
// import QuestionForm from './questions/QuestionForm';

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
//     topics: [],
//     difficulty: '',
//     exam: '',
//     questionText: '',
//     questionImage: '',
//     options: Array(4).fill({ optionText: '', optionImage: '', isCorrect: false }),
//     hint: { text: '', image: '' },
//     approach: { text: '', image: '' },
//     solution: [{ stepNumber: 1, stepText: '', stepImage: '' }],
//     year: new Date().getFullYear(),
//     showExamYear: true
//   };

//   const [formData, setFormData] = useState(initialFormData);
//   const [newData, setNewData] = useState({ 
//     ...initialFormData, 
//     subject: 'Physics', 
//     difficulty: 'Medium' 
//   });

//   // State for dropdown options
//   const [dropdownOptions, setDropdownOptions] = useState({
//     physics: { chapters: [], topics: [] },
//     chemistry: { chapters: [], topics: [] },
//     biology: { chapters: [], topics: [] },
//     exams: []
//   });

//   useEffect(() => { 
//     loadQuestions() 
//   }, []);

//   // Add CSS for enhanced styling
//   useEffect(() => {
//     const style = document.createElement('style');
//     style.textContent = `
//       .rich-text-preview .fraction {
//         display: inline-flex;
//         flex-direction: column;
//         align-items: center;
//         vertical-align: middle;
//         margin: 0 2px;
//       }
//       .rich-text-preview .numerator {
//         padding: 0 4px;
//         border-bottom: 1px solid currentColor;
//         line-height: 1.2;
//         font-size: 0.85em;
//       }
//       .rich-text-preview .denominator {
//         padding: 0 4px;
//         line-height: 1.2;
//         font-size: 0.85em;
//       }
//       .rich-text-preview .square-root {
//         display: inline-flex;
//         align-items: center;
//         vertical-align: middle;
//         position: relative;
//         margin: 0 1px;
//       }
//       .rich-text-preview .radical-symbol {
//         font-size: 1.2em;
//         margin-right: 1px;
//       }
//       .rich-text-preview .radical-content {
//         border-top: 1px solid currentColor;
//         padding: 0 4px;
//         margin-left: -1px;
//       }
//     `;
//     document.head.appendChild(style);
    
//     return () => {
//       document.head.removeChild(style);
//     };
//   }, []);

//   // Update dropdown options when questions change
//   useEffect(() => {
//     if (questions.length > 0) {
//       const physicsQuestions = questions.filter(q => q.subject === 'Physics');
//       const chemistryQuestions = questions.filter(q => q.subject === 'Chemistry');
//       const biologyQuestions = questions.filter(q => q.subject === 'Biology');
      
//       const physicsChapters = [...new Set(physicsQuestions.map(q => q.chapter).filter(Boolean))].sort();
//       const physicsTopics = [...new Set(physicsQuestions.flatMap(q => q.topics).filter(Boolean))].sort();
      
//       const chemistryChapters = [...new Set(chemistryQuestions.map(q => q.chapter).filter(Boolean))].sort();
//       const chemistryTopics = [...new Set(chemistryQuestions.flatMap(q => q.topics).filter(Boolean))].sort();
      
//       const biologyChapters = [...new Set(biologyQuestions.map(q => q.chapter).filter(Boolean))].sort();
//       const biologyTopics = [...new Set(biologyQuestions.flatMap(q => q.topics).filter(Boolean))].sort();
      
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

//   // Enhanced Fuse search to include createdBy information
//   const fuse = useMemo(() => new Fuse(questions, {
//     keys: [
//       'questionText',
//       'subject',
//       'chapter',
//       'topics',
//       'exam',
//       'createdBy.username'
//     ],
//     threshold: 0.3,
//     ignoreLocation: true
//   }), [questions]);

//   const filteredQuestions = useMemo(() => {
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

//   const handleSubjectChange = (subject) => {
//     const setter = newMode ? setNewData : setFormData;
//     setter(prev => ({ 
//       ...prev, 
//       subject: subject,
//       chapter: '',
//       topics: []
//     }));
//   };

//   const handleFieldChange = (field, value) => {
//     const setter = newMode ? setNewData : setFormData;
    
//     if (field.includes('.')) {
//       const [parent, child] = field.split('.');
//       setter(prev => ({
//         ...prev,
//         [parent]: {
//           ...prev[parent],
//           [child]: value
//         }
//       }));
//     } else {
//       setter(prev => ({ ...prev, [field]: value }));
//     }
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
//         return data.secure_url;
//       } else {
//         throw new Error(data.error?.message || 'Upload failed');
//       }
//     } catch (error) {
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
//       const cloudinaryUrl = await uploadToCloudinary(file);
      
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
//         delete newSelected[fileId];
//         return newSelected;
//       });

//     if (newMode) {
//       setNewData(prev => updateImageField(prev, field, '', index, stepIndex));
//     } else {
//       setFormData(prev => updateImageField(prev, field, '', index, stepIndex));
//     }

//     toast.success('Image removed');
//   };

//   const handleSubmit = async (e) => {
//   e.preventDefault();
//   setLoading(true);
//   try {
//     const dataToSubmit = newMode ? newData : formData;

//     // ✅ Validation: At least one option must be selected as correct
//     const hasCorrectOption = dataToSubmit.options.some((opt) => opt.isCorrect);
//     if (!hasCorrectOption) {
//       alert('Please select at least one correct option');
//       setLoading(false);
//       return;
//     }

//     // ✅ Validate exam and year if showExamYear is true
//     if (dataToSubmit.showExamYear) {
//       if (!dataToSubmit.year) {
//         toast.error('Year is required when exam/year fields are shown');
//         setLoading(false);
//         return;
//       }
//       if (!dataToSubmit.exam) {
//         toast.error('Exam is required when exam/year fields are shown');
//         setLoading(false);
//         return;
//       }
//     }

//     // ✅ Proceed to submit
//     if (newMode) {
//       await createQuestion(dataToSubmit);
//       toast.success('Question created successfully');
//     } else {
//       await updateQuestion(editingQuestion._id, dataToSubmit);
//       toast.success('Question updated successfully');
//     }

//     resetAll();
//     loadQuestions();
//   } catch (error) {
//     console.error('Save error:', error);
//     toast.error('Save failed');
//   } finally {
//     setLoading(false);
//   }
// };


//   const handleEdit = q => {
//     setEditingQuestion(q);
//     setFormData({ 
//       ...initialFormData,
//       ...q,
//       options: q.options?.length ? q.options : Array(4).fill({ optionText: '', optionImage: '', isCorrect: false }),
//       hint: q.hint || { text: '', image: '' },
//       approach: q.approach || { text: '', image: '' },
//       solution: q.solution?.length ? q.solution : [{ stepNumber: 1, stepText: '', stepImage: '' }],
//       topics: q.topics || []
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

//   if (!showForm) {
//     return (
//       <QuestionList
//         questions={questions}
//         loading={loading}
//         searchTerm={searchTerm}
//         setSearchTerm={setSearchTerm}
//         toDelete={toDelete}
//         setToDelete={setToDelete}
//         onEdit={handleEdit}
//         onDelete={handleDelete}
//         onBulkDelete={handleBulkDelete}
//         onAddNew={() => { resetAll(); setNewMode(true); setShowForm(true) }}
//         filteredQuestions={filteredQuestions}
//       />
//     );
//   }

//   return (
//     <QuestionForm
//       newMode={newMode}
//       editingQuestion={editingQuestion}
//       formData={formData}
//       newData={newData}
//       dropdownOptions={dropdownOptions}
//       uploading={uploading}
//       selectedFiles={selectedFiles}
//       loading={loading}
//       onBack={resetAll}
//       onSubmit={handleSubmit}
//       onSubjectChange={handleSubjectChange}
//       onFieldChange={handleFieldChange}
//       onToggleOption={toggleOption}
//       onAddSolutionStep={addSolutionStep}
//       onRemoveSolutionStep={removeSolutionStep}
//       onUpdateSolutionStep={updateSolutionStep}
//       onFileSelect={handleFileSelect}
//       onImageUpload={handleImageUpload}
//       onRemoveImage={removeImage}
//       getSubjectSpecificOptions={getSubjectSpecificOptions}
//     />
//   );
// };

// export default QuestionManagement;





import React, { useEffect, useMemo, useState, useRef } from 'react';
import { createQuestion, updateQuestion, deleteQuestion } from '../../services/admin';
import { getQuestions } from '../../services/questions';
import Fuse from 'fuse.js';
import toast from 'react-hot-toast';
import QuestionList from './questions/QuestionList';
import QuestionForm from './questions/QuestionForm';

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
    topics: [],
    difficulty: '',
    exam: '',
    questionText: '',
    questionImage: '',
    options: Array(4).fill({ optionText: '', optionImage: '', isCorrect: false }),
    hint: { text: '', image: '' },
    approach: { text: '', image: '' },
    solution: [{ stepNumber: 1, stepText: '', stepImage: '' }],
    year: new Date().getFullYear(),
    showExamYear: true
  };

  const [formData, setFormData] = useState(initialFormData);
  const [newData, setNewData] = useState({ 
    ...initialFormData, 
    subject: 'Physics', 
    difficulty: 'Medium' 
  });

  // State for dropdown options
  const [dropdownOptions, setDropdownOptions] = useState({
    physics: { chapters: [], topics: [] },
    chemistry: { chapters: [], topics: [] },
    biology: { chapters: [], topics: [] },
    exams: []
  });

  useEffect(() => { 
    loadQuestions() 
  }, []);

  // Add CSS for enhanced styling
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .rich-text-preview .fraction {
        display: inline-flex;
        flex-direction: column;
        align-items: center;
        vertical-align: middle;
        margin: 0 2px;
      }
      .rich-text-preview .numerator {
        padding: 0 4px;
        border-bottom: 1px solid currentColor;
        line-height: 1.2;
        font-size: 0.85em;
      }
      .rich-text-preview .denominator {
        padding: 0 4px;
        line-height: 1.2;
        font-size: 0.85em;
      }
      .rich-text-preview .square-root {
        display: inline-flex;
        align-items: center;
        vertical-align: middle;
        position: relative;
        margin: 0 1px;
      }
      .rich-text-preview .radical-symbol {
        font-size: 1.2em;
        margin-right: 1px;
      }
      .rich-text-preview .radical-content {
        border-top: 1px solid currentColor;
        padding: 0 4px;
        margin-left: -1px;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Update dropdown options when questions change
  useEffect(() => {
    if (questions.length > 0) {
      const physicsQuestions = questions.filter(q => q.subject === 'Physics');
      const chemistryQuestions = questions.filter(q => q.subject === 'Chemistry');
      const biologyQuestions = questions.filter(q => q.subject === 'Biology');
      
      const physicsChapters = [...new Set(physicsQuestions.map(q => q.chapter).filter(Boolean))].sort();
      const physicsTopics = [...new Set(physicsQuestions.flatMap(q => q.topics).filter(Boolean))].sort();
      
      const chemistryChapters = [...new Set(chemistryQuestions.map(q => q.chapter).filter(Boolean))].sort();
      const chemistryTopics = [...new Set(chemistryQuestions.flatMap(q => q.topics).filter(Boolean))].sort();
      
      const biologyChapters = [...new Set(biologyQuestions.map(q => q.chapter).filter(Boolean))].sort();
      const biologyTopics = [...new Set(biologyQuestions.flatMap(q => q.topics).filter(Boolean))].sort();
      
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

  // Enhanced Fuse search to include createdBy information
  const fuse = useMemo(() => new Fuse(questions, {
    keys: [
      'questionText',
      'subject',
      'chapter',
      'topics',
      'exam',
      'createdBy.username'
    ],
    threshold: 0.3,
    ignoreLocation: true
  }), [questions]);

  const filteredQuestions = useMemo(() => {
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

  const handleSubjectChange = (subject) => {
    const setter = newMode ? setNewData : setFormData;
    setter(prev => ({ 
      ...prev, 
      subject: subject,
      chapter: '',
      topics: []
    }));
  };

  const handleFieldChange = (field, value) => {
    const setter = newMode ? setNewData : setFormData;
    
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setter(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setter(prev => ({ ...prev, [field]: value }));
    }
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
        return data.secure_url;
      } else {
        throw new Error(data.error?.message || 'Upload failed');
      }
    } catch (error) {
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

    // Create unique file ID for each option
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
      const cloudinaryUrl = await uploadToCloudinary(file);
      
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
        // Create a new options array to avoid reference sharing
        newData.options = newData.options.map((opt, i) => 
          i === index ? { ...opt, optionImage: imageUrl } : opt
        );
        break;
      case 'hintImage':
        newData.hint = { ...newData.hint, image: imageUrl };
        break;
      case 'approachImage':
        newData.approach = { ...newData.approach, image: imageUrl };
        break;
      case 'solutionImage':
        newData.solution = newData.solution.map((step, i) => 
          i === stepIndex ? { ...step, stepImage: imageUrl } : step
        );
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const dataToSubmit = newMode ? newData : formData;

      // ✅ Validation: At least one option must be selected as correct
      const hasCorrectOption = dataToSubmit.options.some((opt) => opt.isCorrect);
      if (!hasCorrectOption) {
        alert('Please select at least one correct option');
        setLoading(false);
        return;
      }

      // ✅ Validate exam and year if showExamYear is true
      if (dataToSubmit.showExamYear) {
        if (!dataToSubmit.year) {
          toast.error('Year is required when exam/year fields are shown');
          setLoading(false);
          return;
        }
        if (!dataToSubmit.exam) {
          toast.error('Exam is required when exam/year fields are shown');
          setLoading(false);
          return;
        }
      }

      // ✅ Proceed to submit
      if (newMode) {
        await createQuestion(dataToSubmit);
        toast.success('Question created successfully');
      } else {
        await updateQuestion(editingQuestion._id, dataToSubmit);
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
      options: q.options?.length ? q.options.map(opt => ({ 
        optionText: opt.optionText || '', 
        optionImage: opt.optionImage || '', 
        isCorrect: opt.isCorrect || false 
      })) : Array(4).fill({ optionText: '', optionImage: '', isCorrect: false }),
      hint: q.hint || { text: '', image: '' },
      approach: q.approach || { text: '', image: '' },
      solution: q.solution?.length ? q.solution : [{ stepNumber: 1, stepText: '', stepImage: '' }],
      topics: q.topics || []
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

  if (!showForm) {
    return (
      <QuestionList
        questions={questions}
        loading={loading}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        toDelete={toDelete}
        setToDelete={setToDelete}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onBulkDelete={handleBulkDelete}
        onAddNew={() => { resetAll(); setNewMode(true); setShowForm(true) }}
        filteredQuestions={filteredQuestions}
      />
    );
  }

  return (
    <QuestionForm
      newMode={newMode}
      editingQuestion={editingQuestion}
      formData={formData}
      newData={newData}
      dropdownOptions={dropdownOptions}
      uploading={uploading}
      selectedFiles={selectedFiles}
      loading={loading}
      onBack={resetAll}
      onSubmit={handleSubmit}
      onSubjectChange={handleSubjectChange}
      onFieldChange={handleFieldChange}
      onToggleOption={toggleOption}
      onAddSolutionStep={addSolutionStep}
      onRemoveSolutionStep={removeSolutionStep}
      onUpdateSolutionStep={updateSolutionStep}
      onFileSelect={handleFileSelect}
      onImageUpload={handleImageUpload}
      onRemoveImage={removeImage}
      getSubjectSpecificOptions={getSubjectSpecificOptions}
    />
  );
};

export default QuestionManagement;