// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { getSubjects, getChapters, getTopics, getQuestionsByTopic } from '../services/chapterwise';
// import Card from '../components/ui/Card';
// import Button from '../components/ui/Button';
// import Spinner from '../components/ui/Spinner';
// import { BookOpen, ChevronRight, AlertCircle } from 'lucide-react';

// const Chapterwise = () => {
//   const navigate = useNavigate();
//   const [subjects, setSubjects] = useState([]);
//   const [selectedSubject, setSelectedSubject] = useState(null);
//   const [chapters, setChapters] = useState([]);
//   const [selectedChapter, setSelectedChapter] = useState(null);
//   const [topics, setTopics] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // Load subjects on mount
//   useEffect(() => {
//     loadSubjects();
//   }, []);

//   const loadSubjects = async () => {
//     setLoading(true);
//     try {
//       const response = await getSubjects();
//       setSubjects(response.subjects || []);
//     } catch (error) {
//       console.error('Failed to load subjects:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const loadChapters = async (subject) => {
//     setLoading(true);
//     try {
//       const response = await getChapters(subject);
//       setChapters(response.chapters || []);
//       setSelectedSubject(subject);
//       setSelectedChapter(null);
//       setTopics([]);
//     } catch (error) {
//       console.error('Failed to load chapters:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const loadTopics = async (subject, chapter) => {
//     setLoading(true);
//     try {
//       const response = await getTopics(subject, chapter);
//       setTopics(response.topics || []);
//       setSelectedChapter(chapter);
//     } catch (error) {
//       console.error('Failed to load topics:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const startTopicPractice = (topic) => {
//     // Navigate to topic practice page
//     navigate(`/chapterwise/${selectedSubject}/${selectedChapter}/${topic}`);
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <Spinner size={48} />
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8">
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold text-gray-900">Chapterwise Practice</h1>
//         <p className="text-gray-600 mt-2">
//           Practice questions by subject, chapter, and topic
//         </p>
//       </div>

//       {/* Breadcrumb */}
//       <div className="flex items-center gap-2 mb-6 text-sm text-gray-600">
//         <button onClick={() => { setSelectedSubject(null); setSelectedChapter(null); setTopics([]); }}>
//           Subjects
//         </button>
//         {selectedSubject && (
//           <>
//             <ChevronRight className="w-4 h-4" />
//             <button onClick={() => { setSelectedChapter(null); setTopics([]); }}>
//               {selectedSubject}
//             </button>
//           </>
//         )}
//         {selectedChapter && (
//           <>
//             <ChevronRight className="w-4 h-4" />
//             <span>{selectedChapter}</span>
//           </>
//         )}
//       </div>

//       {/* Content */}
//       {!selectedSubject && (
//         // Subjects Grid
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {subjects.map((subject) => (
//             <Card key={subject} className="p-6 cursor-pointer hover:shadow-lg transition-shadow" onClick={() => loadChapters(subject)}>
//               <div className="flex items-center justify-between">
//                 <div>
//                   <h3 className="text-xl font-semibold text-gray-900">{subject}</h3>
//                   <p className="text-gray-600 mt-2">Practice questions</p>
//                 </div>
//                 <BookOpen className="w-8 h-8 text-primary-600" />
//               </div>
//             </Card>
//           ))}
//         </div>
//       )}

//       {selectedSubject && !selectedChapter && (
//         // Chapters List
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {chapters.map((chapter) => (
//             <Card key={chapter} className="p-6 cursor-pointer hover:shadow-lg transition-shadow" onClick={() => loadTopics(selectedSubject, chapter)}>
//               <h3 className="text-lg font-semibold text-gray-900">{chapter}</h3>
//               <p className="text-gray-600 mt-2">Click to view topics</p>
//             </Card>
//           ))}
//         </div>
//       )}

//       {selectedChapter && (
//         // Topics List
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {topics.map((topic) => (
//             <Card key={topic} className="p-6 cursor-pointer hover:shadow-lg transition-shadow" onClick={() => startTopicPractice(topic)}>
//               <h3 className="text-lg font-semibold text-gray-900">{topic}</h3>
//               <p className="text-gray-600 mt-2">Practice questions on this topic</p>
//             </Card>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Chapterwise;




import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSubjects, getChapters, getTopics, getQuestionsByTopic } from '../services/chapterwise';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Spinner from '../components/ui/Spinner';
import { BookOpen, ChevronRight, AlertCircle, Search, X } from 'lucide-react';

const Chapterwise = () => {
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [topics, setTopics] = useState([]);
  const [allTopics, setAllTopics] = useState([]); // For all topics in subject
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState('chapters'); // 'chapters' or 'topics'
  const [searchTerm, setSearchTerm] = useState('');

  // Load subjects on mount
  useEffect(() => {
    loadSubjects();
  }, []);

  const loadSubjects = async () => {
    setLoading(true);
    try {
      const response = await getSubjects();
      setSubjects(response.subjects || []);
    } catch (error) {
      console.error('Failed to load subjects:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadChapters = async (subject) => {
    setLoading(true);
    try {
      const response = await getChapters(subject);
      setChapters(response.chapters || []);
      setSelectedSubject(subject);
      setSelectedChapter(null);
      setTopics([]);
      setAllTopics([]);
      setViewMode('chapters');
      setSearchTerm('');
    } catch (error) {
      console.error('Failed to load chapters:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadTopics = async (subject, chapter) => {
    setLoading(true);
    try {
      const response = await getTopics(subject, chapter);
      setTopics(response.topics || []);
      setSelectedChapter(chapter);
      setViewMode('topics');
      setSearchTerm('');
    } catch (error) {
      console.error('Failed to load topics:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadAllTopics = async (subject) => {
    setLoading(true);
    try {
      // You'll need to add this endpoint to your services
      const response = await getTopics(subject); // Without chapter parameter
      setAllTopics(response.topics || []);
      setSelectedSubject(subject);
      setSelectedChapter(null);
      setChapters([]);
      setViewMode('all-topics');
      setSearchTerm('');
    } catch (error) {
      console.error('Failed to load all topics:', error);
    } finally {
      setLoading(false);
    }
  };

  const startTopicPractice = (topic, chapter = null) => {
    if (chapter) {
      // Navigate with specific chapter
      navigate(`/chapterwise/${selectedSubject}/${chapter}/${topic}`);
    } else {
      // Navigate to topic practice page (you might need to update your route to handle this)
      navigate(`/chapterwise/${selectedSubject}/topic/${topic}`);
    }
  };

  const startMultiTopicPractice = (selectedTopics) => {
    if (selectedTopics.length === 0) return;
    
    if (selectedTopics.length === 1) {
      // If only one topic selected, navigate to single topic practice
      const topic = selectedTopics[0];
      navigate(`/chapterwise/${selectedSubject}/topic/${topic}`);
    } else {
      // For multiple topics, you might want to create a new route or use query parameters
      const topicsParam = selectedTopics.join(',');
      navigate(`/chapterwise/${selectedSubject}/multi-topics?topics=${topicsParam}`);
    }
  };

  // Filter topics based on search term
  const filteredTopics = allTopics.filter(topic => 
    topic.topic?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredChapterTopics = topics.filter(topic => 
    topic.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner size={48} />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Chapterwise Practice</h1>
        <p className="text-gray-600 mt-2">
          Practice questions by subject, chapter, and topic
        </p>
      </div>

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-6 text-sm text-gray-600">
        <button 
          onClick={() => { 
            setSelectedSubject(null); 
            setSelectedChapter(null); 
            setTopics([]); 
            setAllTopics([]);
            setViewMode('chapters');
            setSearchTerm('');
          }}
          className="hover:text-gray-900 transition-colors"
        >
          Subjects
        </button>
        {selectedSubject && (
          <>
            <ChevronRight className="w-4 h-4" />
            {viewMode === 'all-topics' ? (
              <span>All Topics - {selectedSubject}</span>
            ) : (
              <button 
                onClick={() => { 
                  setSelectedChapter(null); 
                  setTopics([]); 
                  setViewMode('chapters');
                  setSearchTerm('');
                }}
                className="hover:text-gray-900 transition-colors"
              >
                {selectedSubject}
              </button>
            )}
          </>
        )}
        {selectedChapter && (
          <>
            <ChevronRight className="w-4 h-4" />
            <span>{selectedChapter}</span>
          </>
        )}
      </div>

      {/* View Mode Toggle */}
      {selectedSubject && !selectedChapter && viewMode === 'chapters' && (
        <div className="mb-6">
          <Button
            variant="outline"
            onClick={() => loadAllTopics(selectedSubject)}
            className="mb-4"
          >
            View All Topics in {selectedSubject}
          </Button>
        </div>
      )}

      {/* Search for All Topics View */}
      {viewMode === 'all-topics' && (
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search topics..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {searchTerm && (
            <button 
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              onClick={() => setSearchTerm('')}
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      )}

      {/* Search for Chapter Topics View */}
      {viewMode === 'topics' && (
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search topics..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {searchTerm && (
            <button 
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              onClick={() => setSearchTerm('')}
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      )}

      {/* Content */}
      {!selectedSubject && (
        // Subjects Grid
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {subjects.map((subject) => (
            <Card 
              key={subject} 
              className="p-6 cursor-pointer hover:shadow-lg transition-shadow duration-200"
              onClick={() => loadChapters(subject)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{subject}</h3>
                  <p className="text-gray-600 mt-2">Practice questions by chapter and topic</p>
                </div>
                <BookOpen className="w-8 h-8 text-primary-600" />
              </div>
            </Card>
          ))}
        </div>
      )}

      {selectedSubject && viewMode === 'chapters' && !selectedChapter && (
        // Chapters List
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {chapters.map((chapter) => (
            <Card 
              key={chapter} 
              className="p-6 cursor-pointer hover:shadow-lg transition-shadow duration-200"
              onClick={() => loadTopics(selectedSubject, chapter)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{chapter}</h3>
                  <p className="text-gray-600 mt-2">View topics in this chapter</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </Card>
          ))}
        </div>
      )}

      {viewMode === 'topics' && selectedChapter && (
        // Topics List for Specific Chapter
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredChapterTopics.length === 0 ? (
            <div className="col-span-full text-center py-8">
              <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">
                {searchTerm ? 'No topics found matching your search.' : 'No topics available for this chapter.'}
              </p>
            </div>
          ) : (
            filteredChapterTopics.map((topic) => (
              <Card 
                key={topic} 
                className="p-6 cursor-pointer hover:shadow-lg transition-shadow duration-200"
                onClick={() => startTopicPractice(topic, selectedChapter)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{topic}</h3>
                    <p className="text-gray-600 mt-2 text-sm">
                      Practice questions on {topic.toLowerCase()}
                    </p>
                    <div className="mt-2 text-xs text-gray-500">
                      Chapter: {selectedChapter}
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </Card>
            ))
          )}
        </div>
      )}

      {viewMode === 'all-topics' && (
        // All Topics List for Subject
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTopics.length === 0 ? (
            <div className="col-span-full text-center py-8">
              <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">
                {searchTerm ? 'No topics found matching your search.' : 'No topics available for this subject.'}
              </p>
            </div>
          ) : (
            filteredTopics.map((topicObj) => (
              <Card 
                key={topicObj.topic} 
                className="p-6 cursor-pointer hover:shadow-lg transition-shadow duration-200"
                onClick={() => startTopicPractice(topicObj.topic)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{topicObj.topic}</h3>
                    <p className="text-gray-600 mt-2 text-sm">
                      Practice questions on {topicObj.topic.toLowerCase()}
                    </p>
                    {topicObj.chapters && topicObj.chapters.length > 0 && (
                      <div className="mt-2 text-xs text-gray-500">
                        Available in: {topicObj.chapters.slice(0, 2).join(', ')}
                        {topicObj.chapters.length > 2 && ` and ${topicObj.chapters.length - 2} more`}
                      </div>
                    )}
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </Card>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Chapterwise;