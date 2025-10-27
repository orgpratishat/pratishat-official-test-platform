import React, { useState, useEffect } from 'react';
import { getChapterDPPs } from '../../services/dppService';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Spinner from '../ui/Spinner';
import Badge from '../ui/Badge';
import { ArrowLeft, Clock, BookOpen, Target, Play } from 'lucide-react';

const DPPList = ({ subject, chapter, onBack }) => {
  const [dpps, setDpps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDPPs();
  }, [subject, chapter]);

  const loadDPPs = async () => {
    setLoading(true);
    try {
      const response = await getChapterDPPs(subject.name, chapter.name);
      setDpps(response.dpps);
    } catch (error) {
      console.error('Failed to load DPPs');
    } finally {
      setLoading(false);
    }
  };

  const handleStartDPP = (dpp) => {
    // Navigate to DPP test page
    window.location.href = `/dpp/${dpp._id}`;
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
          Back to Chapters
        </Button>
        <h2 className="text-2xl font-bold text-gray-900">
          {subject.name} - {chapter.name}
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {dpps.map((dpp) => (
          <Card key={dpp._id} className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {dpp.title}
                  </h3>
                  <Badge text={dpp.difficulty} />
                </div>
                
                {dpp.description && (
                  <p className="text-gray-600 mb-4">{dpp.description}</p>
                )}

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    {dpp.questions?.length || 0} Questions
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {dpp.duration} mins
                  </div>
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4" />
                    {dpp.totalMarks} Marks
                  </div>
                  <div className="text-sm">
                    Marking: +{dpp.markingScheme.positiveMarks}/-{dpp.markingScheme.negativeMarks}
                  </div>
                </div>

                {dpp.topics && dpp.topics.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {dpp.topics.map((topic, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="ml-6">
                <Button 
                  onClick={() => handleStartDPP(dpp)}
                  className="bg-red-400"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Start DPP
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {dpps.length === 0 && (
        <Card className="p-12 text-center">
          <p className="text-gray-500">
            No DPPs available for {chapter.name} in {subject.name}
          </p>
        </Card>
      )}
    </div>
  );
};

export default DPPList;