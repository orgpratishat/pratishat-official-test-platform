import React, { useState, useEffect } from 'react';
import { getDPPSubjects } from '../../services/dppService';
import SubjectsList from './SubjectsList';
import ChaptersList from './ChaptersList';
import DPPList from '../DppList';
import Spinner from '../ui/Spinner';

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
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Daily Practice Problems</h1>
        <p className="text-gray-600 mt-2">
          Practice chapter-wise questions to strengthen your concepts
        </p>
      </div>

      {/* Breadcrumb */}
      <div className="mb-6 flex items-center gap-2 text-sm text-gray-600">
        <button
          onClick={handleBackToSubjects}
          className={`hover:text-gray-900 ${currentView !== 'subjects' ? 'text-blue-600' : ''}`}
        >
          Subjects
        </button>
        
        {selectedSubject && (
          <>
            <span>›</span>
            <button
              onClick={handleBackToChapters}
              className={`hover:text-gray-900 ${currentView === 'dpps' ? 'text-blue-600' : ''}`}
            >
              {selectedSubject?.name}
            </button>
          </>
        )}
        
        {selectedChapter && (
          <>
            <span>›</span>
            <span className="text-gray-900">{selectedChapter?.name}</span>
          </>
        )}
      </div>

      {/* Content */}
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
  );
};

export default DPPSection;