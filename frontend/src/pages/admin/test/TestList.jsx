// components/TestList.js
import React from 'react';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import Badge from '../../../components/ui/Badge';
import Spinner from '../../../components/ui/Spinner';
import { Edit, Trash2, Calendar, Plus } from 'lucide-react';
import { formatDate } from '../../../utils/formatters';

const TestList = ({ tests, loading, onEditTest, onDeleteTest, onCreateTest }) => {
  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <Spinner size={32} />
      </div>
    );
  }

  if (tests.length === 0) {
    return (
      <Card className="p-12 text-center text-gray-500">
        No tests found.
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {tests.map((test) => (
        <Card key={test._id} className="p-6">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-xl font-semibold">{test.name}</h3>
                <Badge text={test.type} />
                {test.isActive ? (
                  <Badge text="Active" color="green" />
                ) : (
                  <Badge text="Inactive" color="gray" />
                )}
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-2">
                <div>
                  <span className="font-medium">Duration:</span> {test.duration} min
                </div>
                <div>
                  <span className="font-medium">Questions:</span> {test.questions?.length || 0}
                </div>
                <div>
                  <span className="font-medium">Total Marks:</span> {test.markingScheme?.totalMarks || 0}
                </div>
                <div>
                  <span className="font-medium">Marking:</span> +{test.markingScheme?.positiveMarks || 0}/-{test.markingScheme?.negativeMarks || 0}
                </div>
              </div>
              {test.scheduledDate && (
                <div className="flex gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Scheduled: {formatDate(test.scheduledDate)}
                  </span>
                  {test.startTime && (
                    <span>Start: {new Date(test.startTime).toLocaleTimeString()}</span>
                  )}
                  {test.endTime && (
                    <span>End: {new Date(test.endTime).toLocaleTimeString()}</span>
                  )}
                </div>
              )}
            </div>
            <div className="flex gap-2">
              <Button variant="outline cursor-pointer" size="sm" onClick={() => onEditTest(test)}>
                <Edit className="w-4 h-4" />
              </Button>
              <Button className="text-red-400 cursor-pointer" variant="danger" size="sm" onClick={() => onDeleteTest(test._id)}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default TestList;