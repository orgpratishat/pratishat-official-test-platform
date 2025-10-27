import React, { useState, useEffect } from 'react';
import { getSubjectChapters } from '../../services/dppService';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Spinner from '../ui/Spinner';
import { ArrowLeft, FileText, Calendar } from 'lucide-react';
import { formatDate } from '../../utils/formatters';

const ChaptersList = ({ subject, onChapterSelect, onBack }) => {
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadChapters();
  }, [subject]);

  const loadChapters = async () => {
    setLoading(true);
    try {
      const response = await getSubjectChapters(subject.name);
      setChapters(response.chapters);
    } catch (error) {
      console.error('Failed to load chapters');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <Spinner size={32} />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Subjects
        </Button>
        <h2 className="text-2xl font-bold text-gray-900">
          {subject.name} - Chapters
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {chapters.map((chapter) => (
          <Card 
            key={chapter.name} 
            className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => onChapterSelect(chapter)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {chapter.name}
                </h3>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <FileText className="w-4 h-4" />
                    {chapter.totalDPPs} DPPs
                  </div>
                  {chapter.lastUpdated && (
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Updated {formatDate(chapter.lastUpdated)}
                    </div>
                  )}
                </div>
              </div>
              <Button variant="outline" size="sm">
                View DPPs
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {chapters.length === 0 && (
        <Card className="p-12 text-center">
          <p className="text-gray-500">No chapters available for {subject.name}</p>
        </Card>
      )}
    </div>
  );
};

export default ChaptersList;