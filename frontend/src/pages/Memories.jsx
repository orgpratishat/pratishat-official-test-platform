

import React, { useEffect, useState } from 'react';
import { getMemories, getMemoryStats, deleteMemory } from '../services/memories';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Spinner from '../components/ui/Spinner';
import { Trash2, BookOpen, AlertTriangle } from 'lucide-react';
import { formatRelativeTime } from '../utils/formatters';
import toast from 'react-hot-toast';

const Memories = () => {
  const [memories, setMemories] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [deletingId, setDeletingId] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  useEffect(() => {
    loadMemories();
    loadStats();
  }, [selectedSubject]);

  const loadMemories = async () => {
    setLoading(true);
    try {
      const params = selectedSubject !== 'all' ? { subject: selectedSubject } : {};
      const response = await getMemories(params);
      setMemories(response.memories || []);
    } catch (error) {
      console.error('Failed to load memories:', error);
      toast.error('Failed to load memories');
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const response = await getMemoryStats();
      setStats(response);
    } catch (error) {
      console.error('Failed to load stats:', error);
    }
  };

  const handleDeleteMemory = async (memoryId) => {
    setDeletingId(memoryId);
    try {
      await deleteMemory(memoryId);
      toast.success('Memory deleted successfully');
      
      // Remove from local state immediately for better UX
      setMemories(prev => prev.filter(memory => memory._id !== memoryId));
      
      // Reload stats to update counts
      loadStats();
    } catch (error) {
      console.error('Failed to delete memory:', error);
      toast.error('Failed to delete memory');
    } finally {
      setDeletingId(null);
      setShowDeleteConfirm(null);
    }
  };

  const confirmDelete = (memoryId, questionText) => {
    setShowDeleteConfirm({
      id: memoryId,
      question: questionText.substring(0, 100) + '...'
    });
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(null);
  };

  if (loading && !memories.length) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner size={48} />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Your Memories</h1>
        <p className="text-gray-600 mt-2">
          Review your mistakes from tests and learn from them
        </p>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{memories.length}</div>
            <div className="text-sm text-gray-600">Total Mistakes</div>
          </Card>
          {stats.subjectWise.map((item) => (
            <Card key={item._id} className="p-4 text-center">
              <div className="text-2xl font-bold text-gray-900">{item.count}</div>
              <div className="text-sm text-gray-600">{item._id}</div>
            </Card>
          ))}
        </div>
      )}

      {/* Filter */}
    <div className="mb-6 flex gap-3">
  <Button
    variant="outline"
    size="sm"
    className={`${
      selectedSubject === 'all' 
        ? 'bg-gray-700 text-white border-gray-700 hover:bg-gray-800 hover:border-gray-800' 
        : 'text-gray-700 border-gray-300 hover:bg-gray-50'
    } transition-colors duration-200`}
    onClick={() => setSelectedSubject('all')}
  >
    All Subjects
  </Button>
  {['Physics', 'Chemistry', 'Biology'].map((subject) => (
    <Button
      key={subject}
      variant="outline"
      size="sm"
      className={`${
        selectedSubject === subject 
          ? 'bg-gray-700 text-white border-gray-700 hover:bg-gray-800 hover:border-gray-800' 
          : 'text-gray-700 border-gray-300 hover:bg-gray-50'
      } transition-colors duration-200`}
      onClick={() => setSelectedSubject(subject)}
    >
      {subject}
    </Button>
  ))}
</div>

      {/* Memories List */}
      <div className="space-y-6">
        {memories.map((memory) => (
          <Card key={memory._id} className="p-6 hover:shadow-lg transition-shadow duration-200">
            <div className="flex items-start justify-between mb-4">
              <div className="flex gap-3 flex-wrap">
                <Badge variant="primary" text={memory.question?.subject} />
                <Badge 
                  variant={
                    memory.question?.difficulty === 'Easy' ? 'success' : 
                    memory.question?.difficulty === 'Medium' ? 'warning' : 'danger'
                  } 
                  text={memory.question?.difficulty} 
                />
                <Badge variant="outline" text={formatRelativeTime(memory.createdAt)} />
                {memory.attemptType && (
                  <Badge variant="secondary" text={memory.attemptType} />
                )}
              </div>
              <Button
                variant="danger"
                size="sm"
                onClick={() => confirmDelete(memory._id, memory.question?.questionText)}
                disabled={deletingId === memory._id}
                className="flex items-center gap-2 bg-red-400 rounded-lg"
              >
                {deletingId === memory._id ? (
                  <Spinner size={16} />
                ) : (
                  <Trash2 className="w-4 h-4 " />
                )}
                Delete
              </Button>
            </div>

            <h3 className="text-sm text-gray-600 mb-2">
              {memory.question?.chapter} → {memory.question?.topic}
            </h3>
            
            <p className="text-lg text-gray-900 mb-4 leading-relaxed">
              {memory.question?.questionText}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                <h4 className="font-medium text-red-800 mb-2">Your Answer:</h4>
                <p className="text-red-700">
                  {memory.userAnswer !== null && memory.userAnswer !== undefined 
                    ? memory.question?.options[memory.userAnswer]?.optionText 
                    : 'Not answered'
                  }
                </p>
              </div>
              <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                <h4 className="font-medium text-green-800 mb-2">Correct Answer:</h4>
                <p className="text-green-700">
                  {memory.question?.options[memory.correctAnswer]?.optionText}
                </p>
              </div>
            </div>

            {memory.question?.hint?.text && (
              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-2">Hint:</h4>
                <p className="text-blue-700">{memory.question?.hint.text}</p>
              </div>
            )}

            {memory.question?.approach?.text && (
              <div className="mt-4 p-4 bg-purple-50 border border-purple-200 rounded-lg">
                <h4 className="font-medium text-purple-800 mb-2">Approach:</h4>
                <p className="text-purple-700">{memory.question?.approach.text}</p>
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Delete Memory?</h2>
            </div>
            
            <p className="text-gray-600 mb-2">
              Are you sure you want to delete this memory? This action cannot be undone.
            </p>
            
            <div className="bg-gray-50 p-3 rounded-lg mb-6">
              <p className="text-sm text-gray-500">Question:</p>
              <p className="text-gray-700 text-sm mt-1">{showDeleteConfirm.question}</p>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={cancelDelete}
                disabled={deletingId === showDeleteConfirm.id}
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                className="flex-1 bg-red-400"
                onClick={() => handleDeleteMemory(showDeleteConfirm.id)}
                disabled={deletingId === showDeleteConfirm.id}
              >
                {deletingId === showDeleteConfirm.id ? (
                  <>
                    <Spinner size={16} className="mr-2" />
                    Deleting...
                  </>
                ) : (
                  'Delete'
                )}
              </Button>
            </div>
          </Card>
        </div>
      )}

      {memories.length === 0 && !loading && (
        <Card className="p-12 text-center">
          <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No memories found. Take some tests to see your mistakes here.</p>
        </Card>
      )}
    </div>
  );
};

export default Memories;