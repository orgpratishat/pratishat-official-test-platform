import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllYears } from '../services/pyq';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Spinner from '../components/ui/Spinner';
import { Calendar, Clock, BookOpen } from 'lucide-react';
import { formatTime } from '../utils/formatters';

const PYQ = () => {
  const navigate = useNavigate();
  const [years, setYears] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadYears();
  }, []);

  const loadYears = async () => {
    setLoading(true);
    try {
      const response = await getAllYears();
      console.log(response)
      setYears(response.pyqs || []);
    } catch (error) {
      console.error('Failed to load PYQ years:', error);
    } finally {
      setLoading(false);
    }
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
        <h1 className="text-3xl font-bold text-gray-900">Previous Year Questions</h1>
        <p className="text-gray-600 mt-2">
          Practice NEET PYQs year-wise with rank prediction
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {years.map((pyq) => (
          <Card key={pyq._id} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold text-gray-900">{pyq.year}</h3>
              <Calendar className="w-8 h-8 text-primary-600" />
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center text-sm text-gray-600">
                <BookOpen className="w-4 h-4 mr-2" />
                {pyq.examName}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="w-4 h-4 mr-2" />
                Duration: {formatTime(pyq.duration * 60)}
              </div>
              <div className="text-sm text-gray-600">
                Total Marks: {pyq.totalMarks}
              </div>
            </div>

            <Button
              className="w-full text-black"
              onClick={() => navigate(`/pyq/${pyq.year}`)}
            >
              Start PYQ {pyq.year}
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PYQ;
