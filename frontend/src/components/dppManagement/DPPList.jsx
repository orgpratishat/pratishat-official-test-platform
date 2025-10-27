import React, { useState, useEffect } from 'react';
import { Edit, Trash2, Play, Eye, Search, Filter } from 'lucide-react';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Spinner from '../ui/Spinner';
import Badge from '../ui/Badge';
import { getAllDPPs, deleteDPP } from '../../services/dppService';
import toast from 'react-hot-toast';

const DPPList = ({ onEditDPP }) => {
  const [dpps, setDpps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSubject, setFilterSubject] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    loadDPPs();
  }, []);

  const loadDPPs = async () => {
    setLoading(true);
    try {
      const response = await getAllDPPs();
      setDpps(response.dpps || []);
    } catch (error) {
      toast.error('Failed to load DPPs');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (dppId) => {
    if (window.confirm('Are you sure you want to delete this DPP?')) {
      try {
        await deleteDPP(dppId);
        toast.success('DPP deleted successfully');
        loadDPPs();
      } catch (error) {
        toast.error('Failed to delete DPP');
      }
    }
  };

  const filteredDPPs = dpps.filter(dpp => {
    const matchesSearch = dpp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dpp.chapter.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSubject = filterSubject === 'all' || dpp.subject === filterSubject;
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'active' && dpp.isActive) ||
                         (filterStatus === 'inactive' && !dpp.isActive);
    
    return matchesSearch && matchesSubject && matchesStatus;
  });

  const subjects = [...new Set(dpps.map(dpp => dpp.subject))];

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <Spinner size={32} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by title or chapter..."
                className="pl-10"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Subject</label>
            <select
              value={filterSubject}
              onChange={(e) => setFilterSubject(e.target.value)}
              className="w-full rounded border border-gray-300 px-3 py-2"
            >
              <option value="all">All Subjects</option>
              {subjects.map(subject => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full rounded border border-gray-300 px-3 py-2"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          
          <div className="flex items-end">
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm('');
                setFilterSubject('all');
                setFilterStatus('all');
              }}
              className="w-full"
            >
              <Filter className="w-4 h-4 mr-2" />
              Clear Filters
            </Button>
          </div>
        </div>
      </Card>

      {/* DPPs List */}
      <div className="space-y-4">
        {filteredDPPs.length === 0 ? (
          <Card className="p-12 text-center">
            <p className="text-gray-500">
              {dpps.length === 0 ? 'No DPPs created yet' : 'No DPPs match your filters'}
            </p>
          </Card>
        ) : (
          filteredDPPs.map(dpp => (
            <Card key={dpp._id} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold">{dpp.title}</h3>
                    <div className="flex gap-2">
                      <Badge text={dpp.subject} />
                      <Badge text={dpp.difficulty} />
                      {dpp.isActive ? (
                        <Badge text="Active" color="green" />
                      ) : (
                        <Badge text="Inactive" color="gray" />
                      )}
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-3">{dpp.description}</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                    <div>
                      <span className="font-medium">Chapter:</span> {dpp.chapter}
                    </div>
                    <div>
                      <span className="font-medium">Questions:</span> {dpp.questions?.length || 0}
                    </div>
                    <div>
                      <span className="font-medium">Duration:</span> {dpp.duration} min
                    </div>
                    <div>
                      <span className="font-medium">Marks:</span> {dpp.totalMarks}
                    </div>
                  </div>
                  
                  {dpp.topics && dpp.topics.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
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
                
                <div className="ml-6 flex gap-2">
                  {/* <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(`/dpp/${dpp._id}`, '_blank')}
                  >
                    <Eye className="w-4 h-4" />
                  </Button> */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEditDPP(dpp)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button className="bg-red-400"
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(dpp._id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default DPPList;