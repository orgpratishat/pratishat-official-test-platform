import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSubjects, getChapters, getTopics, getQuestionsByTopic } from '../services/chapterwise';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Spinner from '../components/ui/Spinner';
import { BookOpen, ChevronRight, AlertCircle } from 'lucide-react';

const Chapterwise = () => {
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(false);

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
    } catch (error) {
      console.error('Failed to load topics:', error);
    } finally {
      setLoading(false);
    }
  };

  const startTopicPractice = (topic) => {
    // Navigate to topic practice page
    navigate(`/chapterwise/${selectedSubject}/${selectedChapter}/${topic}`);
  };

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
        <button onClick={() => { setSelectedSubject(null); setSelectedChapter(null); setTopics([]); }}>
          Subjects
        </button>
        {selectedSubject && (
          <>
            <ChevronRight className="w-4 h-4" />
            <button onClick={() => { setSelectedChapter(null); setTopics([]); }}>
              {selectedSubject}
            </button>
          </>
        )}
        {selectedChapter && (
          <>
            <ChevronRight className="w-4 h-4" />
            <span>{selectedChapter}</span>
          </>
        )}
      </div>

      {/* Content */}
      {!selectedSubject && (
        // Subjects Grid
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {subjects.map((subject) => (
            <Card key={subject} className="p-6 cursor-pointer hover:shadow-lg transition-shadow" onClick={() => loadChapters(subject)}>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{subject}</h3>
                  <p className="text-gray-600 mt-2">Practice questions</p>
                </div>
                <BookOpen className="w-8 h-8 text-primary-600" />
              </div>
            </Card>
          ))}
        </div>
      )}

      {selectedSubject && !selectedChapter && (
        // Chapters List
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {chapters.map((chapter) => (
            <Card key={chapter} className="p-6 cursor-pointer hover:shadow-lg transition-shadow" onClick={() => loadTopics(selectedSubject, chapter)}>
              <h3 className="text-lg font-semibold text-gray-900">{chapter}</h3>
              <p className="text-gray-600 mt-2">Click to view topics</p>
            </Card>
          ))}
        </div>
      )}

      {selectedChapter && (
        // Topics List
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {topics.map((topic) => (
            <Card key={topic} className="p-6 cursor-pointer hover:shadow-lg transition-shadow" onClick={() => startTopicPractice(topic)}>
              <h3 className="text-lg font-semibold text-gray-900">{topic}</h3>
              <p className="text-gray-600 mt-2">Practice questions on this topic</p>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Chapterwise;
