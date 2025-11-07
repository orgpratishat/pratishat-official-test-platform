import React from 'react';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Card';
import Badge from '../../../components/ui/Badge';
import Input from '../../../components/ui/Input';
import Spinner from '../../../components/ui/Spinner';
import { Edit, Trash2, Search, X, Image as ImageIcon,Plus } from 'lucide-react';
import { formatTextWithHTML } from '../../../utils/formatters';
import CreatorInfo from './CreatorInfo';
import TimestampDisplay from './TimeStampDisplay';

const QuestionList = ({
  questions,
  loading,
  searchTerm,
  setSearchTerm,
  toDelete,
  setToDelete,
  onEdit,
  onDelete,
  onBulkDelete,
  onAddNew,
  filteredQuestions
}) => {
  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Question Management</h1>
        <div className="flex gap-2">
          {toDelete.size > 0 && (
            <Button variant="danger" className="" onClick={onBulkDelete}>
              Delete ({toDelete.size})
            </Button>
          )}
          <Button className="cursor-pointer flex items-center justify-center outline hover:bg-gray-800 hover:text-white rounded-none h-10 w-[10vw]" onClick={onAddNew}>
            <Plus className="w-4 h-4 mr-1 " /> Add Question
          </Button>
        </div>
      </div>

      <div className="relative mb-6">
        <Input
          className="pl-10 pr-10"
          placeholder="Search questions by text, chapter, topic, exam, or creator..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        {searchTerm && (
          <button 
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            onClick={() => setSearchTerm('')}
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Spinner size={32} />
        </div>
      ) : filteredQuestions.length === 0 ? (
        <Card className="text-center py-12">
          <p className="text-gray-500 text-lg">
            {searchTerm ? 'No questions found matching your search.' : 'No questions available.'}
          </p>
        </Card>
      ) : (
        filteredQuestions.map(q => (
          <Card key={q._id} className="flex items-start mb-4 p-4 hover:shadow-md transition-shadow">
            <input
              type="checkbox"
              className="mt-1 mr-3 h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
              checked={toDelete.has(q._id)}
              onChange={() => {
                const s = new Set(toDelete);
                s.has(q._id) ? s.delete(q._id) : s.add(q._id);
                setToDelete(s);
              }}
            />
            <div className="flex-1">
              <div className="flex gap-2 mb-2 flex-wrap">
                <Badge variant="primary" text={q.subject} />
                <Badge variant={q.difficulty === 'Easy' ? 'success' : q.difficulty === 'Medium' ? 'warning' : 'danger'} text={q.difficulty} />
                <Badge variant="outline" text={`${q.chapter} → ${q.topics?.join(', ') || 'No topics'}`} />
                {q.year && <Badge variant="secondary" text={`Year: ${q.year}`} />}
                {q.exam && <Badge variant="info" text={`Exam: ${q.exam}`} />}
              </div>
              <div 
                className="font-medium mb-2 text-gray-800 line-clamp-2 whitespace-pre-wrap rich-text-preview"
                dangerouslySetInnerHTML={{ __html: formatTextWithHTML(q.questionText) }}
              />
              {(q.questionImage || q.options?.some(opt => opt.optionImage)) && (
                <div className="flex items-center gap-2 mt-1">
                  <ImageIcon className="w-4 h-4 text-blue-500" />
                  <span className="text-xs text-blue-500 font-medium">Contains images</span>
                </div>
              )}
              
              {/* Creator Information */}
              <CreatorInfo createdBy={q.createdBy} createdAt={q.createdAt} />
              
              {/* Timestamp Display */}
              <TimestampDisplay timestamp={q.createdAt} />
            </div>
            <div className="flex gap-10">
              <Button size="sm" variant="outline" onClick={() => onEdit(q)}>
                <Edit className="w-4 h-4" />
              </Button>
              <Button className="cursor-pointer" size="sm" variant="danger" onClick={() => onDelete(q._id)}>
                <Trash2 className="w-4 h-4 text-red-400" />
              </Button>
            </div>
          </Card>
        ))
      )}
    </div>
  );
};

export default QuestionList;