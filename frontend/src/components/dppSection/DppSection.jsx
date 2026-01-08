// import React, { useState, useEffect } from 'react';
// import { getDPPSubjects } from '../../services/dppService';
// import SubjectsList from './SubjectsList';
// import ChaptersList from './ChaptersList';
// import DPPList from '../DppList';
// import Spinner from '../ui/Spinner';

// const DPPSection = () => {
//   const [subjects, setSubjects] = useState([]);
//   const [selectedSubject, setSelectedSubject] = useState(null);
//   const [selectedChapter, setSelectedChapter] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [currentView, setCurrentView] = useState('subjects'); // 'subjects', 'chapters', 'dpps'

//   useEffect(() => {
//     loadSubjects();
//   }, []);

//   const loadSubjects = async () => {
//     setLoading(true);
//     try {
//       const response = await getDPPSubjects();
//       setSubjects(response.subjects);
//     } catch (error) {
//       console.error('Failed to load subjects');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubjectSelect = (subject) => {
//     setSelectedSubject(subject);
//     setCurrentView('chapters');
//   };

//   const handleChapterSelect = (chapter) => {
//     setSelectedChapter(chapter);
//     setCurrentView('dpps');
//   };

//   const handleBackToSubjects = () => {
//     setSelectedSubject(null);
//     setCurrentView('subjects');
//   };

//   const handleBackToChapters = () => {
//     setSelectedChapter(null);
//     setCurrentView('chapters');
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-64">
//         <Spinner size={32} />
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-8">
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold text-gray-900">Daily Practice Problems</h1>
//         <p className="text-gray-600 mt-2">
//           Practice chapter-wise questions to strengthen your concepts
//         </p>
//       </div>

//       {/* Breadcrumb */}
//       <div className="mb-6 flex items-center gap-2 text-sm text-gray-600">
//         <button
//           onClick={handleBackToSubjects}
//           className={`hover:text-gray-900 ${currentView !== 'subjects' ? 'text-blue-600' : ''}`}
//         >
//           Subjects
//         </button>
        
//         {selectedSubject && (
//           <>
//             <span>›</span>
//             <button
//               onClick={handleBackToChapters}
//               className={`hover:text-gray-900 ${currentView === 'dpps' ? 'text-blue-600' : ''}`}
//             >
//               {selectedSubject?.name}
//             </button>
//           </>
//         )}
        
//         {selectedChapter && (
//           <>
//             <span>›</span>
//             <span className="text-gray-900">{selectedChapter?.name}</span>
//           </>
//         )}
//       </div>

//       {/* Content */}
//       {currentView === 'subjects' && (
//         <SubjectsList 
//           subjects={subjects} 
//           onSubjectSelect={handleSubjectSelect} 
//         />
//       )}

//       {currentView === 'chapters' && selectedSubject && (
//         <ChaptersList 
//           subject={selectedSubject}
//           onChapterSelect={handleChapterSelect}
//           onBack={handleBackToSubjects}
//         />
//       )}

//       {currentView === 'dpps' && selectedSubject && selectedChapter && (
//         <DPPList 
//           subject={selectedSubject}
//           chapter={selectedChapter}
//           onBack={handleBackToChapters}
//         />
//       )}
//     </div>
//   );
// };

// export default DPPSection;



import React, { useState, useEffect } from 'react';
import { getDPPSubjects } from '../../services/dppService';
import SubjectsList from './SubjectsList';
import ChaptersList from './ChaptersList';
import DPPList from '../DppList';
import Spinner from '../ui/Spinner';
import { Target, Clock, ChevronRight, FolderOpen, Layers } from 'lucide-react';

const DPPSection = () => {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentView, setCurrentView] = useState('subjects'); // 'subjects', 'chapters', 'dpps'

  useEffect(() => {
    loadSubjects();
  }, []);

  const loadSubjects = async () => {
    setLoading(true);
    try {
      const response = await getDPPSubjects();
      setSubjects(response.subjects);
    } catch (error) {
      console.error('Failed to load subjects');
    } finally {
      setLoading(false);
    }
  };

  const handleSubjectSelect = (subject) => {
    setSelectedSubject(subject);
    setCurrentView('chapters');
  };

  const handleChapterSelect = (chapter) => {
    setSelectedChapter(chapter);
    setCurrentView('dpps');
  };

  const handleBackToSubjects = () => {
    setSelectedSubject(null);
    setCurrentView('subjects');
  };

  const handleBackToChapters = () => {
    setSelectedChapter(null);
    setCurrentView('chapters');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <Spinner size={32} />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center shadow-lg">
            <Target className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 to-rose-900 bg-clip-text text-transparent">
              Daily Practice Problems
            </h1>
            <p className="text-gray-500 mt-2">
              Practice chapter-wise questions to strengthen your concepts
            </p>
          </div>
        </div>

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6 text-sm text-gray-600 bg-gradient-to-r from-gray-50 to-gray-100/50 rounded-xl px-4 py-3">
          <button
            onClick={handleBackToSubjects}
            className={`font-medium transition-colors ${currentView !== 'subjects' ? 'text-rose-600 hover:text-rose-700' : 'text-gray-900'}`}
          >
            Subjects
          </button>
          
          {selectedSubject && (
            <>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <button
                onClick={handleBackToChapters}
                className={`font-medium transition-colors ${currentView === 'dpps' ? 'text-rose-600 hover:text-rose-700' : 'text-gray-900'}`}
              >
                {selectedSubject?.name}
              </button>
            </>
          )}
          
          {selectedChapter && (
            <>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <span className="font-medium text-gray-900">{selectedChapter?.name}</span>
            </>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="mt-8">
        {currentView === 'subjects' && (
          <SubjectsList 
            subjects={subjects} 
            onSubjectSelect={handleSubjectSelect} 
          />
        )}

        {currentView === 'chapters' && selectedSubject && (
          <ChaptersList 
            subject={selectedSubject}
            onChapterSelect={handleChapterSelect}
            onBack={handleBackToSubjects}
          />
        )}

        {currentView === 'dpps' && selectedSubject && selectedChapter && (
          <DPPList 
            subject={selectedSubject}
            chapter={selectedChapter}
            onBack={handleBackToChapters}
          />
        )}
      </div>

    
    </div>
  )
};

export default DPPSection;