import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTestStore } from '../store/testStore';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Spinner from '../components/ui/Spinner';
import Badge from '../components/ui/Badge';
import { Calendar, Clock, BookOpen, ChevronRight } from 'lucide-react';
import { formatDate, formatTime } from '../utils/formatters';

const Tests = () => {
  const navigate = useNavigate();
  const { tests, loading, fetchTests } = useTestStore();
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchTests({isActive:true});
  }, []);

  const filteredTests = tests.filter(test => {
    if (filter === 'all') return true;
    return test.type === filter;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner size={48} />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">All Tests</h1>
        <p className="text-gray-600 mt-2">
          Choose from NEET Mock Tests or DPP Tests
        </p>
      </div>

   

        <div className="mb-6 flex gap-3">
  <Button
    variant="outline"
    size="sm"
    className={`${
      filter === 'all' 
        ? 'bg-gray-700 text-white border-gray-700 hover:bg-gray-800 hover:border-gray-800' 
        : 'text-gray-700 border-gray-300 hover:bg-gray-50'
    } transition-colors duration-200`}
    onClick={() => setFilter('all')}
  >
    All Tests
  </Button>
  <Button
    variant="outline"
    size="sm"
    className={`${
      filter === 'NEET_MOCK' 
        ? 'bg-gray-700 text-white border-gray-700 hover:bg-gray-800 hover:border-gray-800' 
        : 'text-gray-700 border-gray-300 hover:bg-gray-50'
    } transition-colors duration-200`}
    onClick={() => setFilter('NEET_MOCK')}
  >
    NEET Mock
  </Button>
  <Button
    variant="outline"
    size="sm"
    className={`${
      filter === 'DPP_TEST' 
        ? 'bg-gray-700 text-white border-gray-700 hover:bg-gray-800 hover:border-gray-800' 
        : 'text-gray-700 border-gray-300 hover:bg-gray-50'
    } transition-colors duration-200`}
    onClick={() => setFilter('DPP_TEST')}
  >
    DPP Tests
  </Button>
</div>

      {/* Tests Grid */}
      {filteredTests && filteredTests.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTests.map((test) => (
            <Card key={test._id} className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{test.name}</h3>
                <Badge text={test.type === 'NEET_MOCK' ? 'NEET Mock' : 'DPP Test'} />
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  {formatDate(test.scheduledDate)}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="w-4 h-4 mr-2" />
                  {formatTime(test.duration * 60)}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <BookOpen className="w-4 h-4 mr-2" />
                  {test.questions?.length || 0} Questions
                </div>
                <div className="pt-2 border-t">
                  <p className="text-sm font-medium text-gray-700">Marking Scheme</p>
                  <p className="text-xs text-gray-600 mt-1">
                    +{test.markingScheme?.positiveMarks} for correct, 
                    {test.markingScheme?.negativeMarks} for wrong
                  </p>
                </div>
              </div>

              <Button
                className="w-full group bg-red-400"
                onClick={() => navigate(`/test/${test._id}`)}
              >
                Start Test
                <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="p-12 text-center">
          <p className="text-gray-500">No tests available</p>
        </Card>
      )}
    </div>
  );
};

export default Tests;
