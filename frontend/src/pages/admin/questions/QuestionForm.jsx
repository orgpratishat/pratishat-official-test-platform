import React from 'react';
import Card from "../../../components/ui/Card"
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Badge from '../../../components/ui/Badge';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react';
import RichTextEditor from './RichTextEditor';
import DropdownInput from './DropdownInput';
import MultiTopicInput from './MultiTopicInput';
import ImageUploadField from './ImageUploadField';
import CreatorInfo from './CreatorInfo';
import TimestampDisplay from './TimeStampDisplay';

const QuestionForm = ({
  newMode,
  editingQuestion,
  formData,
  newData,
  dropdownOptions,
  uploading,
  selectedFiles,
  loading,
  onBack,
  onSubmit,
  onSubjectChange,
  onFieldChange,
  onToggleOption,
  onAddSolutionStep,
  onRemoveSolutionStep,
  onUpdateSolutionStep,
  onFileSelect,
  onImageUpload,
  onRemoveImage,
  getSubjectSpecificOptions
}) => {
  const currentData = newMode ? newData : formData;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={onBack}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Questions
            </Button>
            <h1 className="text-2xl font-bold text-gray-800">
              {newMode ? 'Add New Question' : 'Edit Question'}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">
              {newMode ? 'Creating new question' : `Editing: ${editingQuestion?.questionText?.substring(0, 50)}...`}
            </span>
          </div>
        </div>

        {/* Form Content */}
        <Card className="p-6">
          <form onSubmit={onSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  Subject
                </label>
                <select
                  required
                  value={currentData.subject}
                  onChange={(e) => onSubjectChange(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Subject</option>
                  {['Physics', 'Chemistry', 'Biology'].map(v => (
                    <option key={v} value={v}>{v}</option>
                  ))}
                </select>
              </div>

              <div>
                <DropdownInput
                  label="Chapter"
                  value={currentData.chapter}
                  onChange={(value) => onFieldChange('chapter', value)}
                  options={getSubjectSpecificOptions().chapters}
                  placeholder="Select or type chapter..."
                  required={true}
                />
              </div>

              <div>
                <MultiTopicInput
                  label="Topics"
                  value={currentData.topics}
                  onChange={(value) => onFieldChange('topics', value)}
                  options={getSubjectSpecificOptions().topics}
                  placeholder="Add topics..."
                  required={true}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  Difficulty
                </label>
                <select
                  required
                  value={currentData.difficulty}
                  onChange={e => onFieldChange('difficulty', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Difficulty</option>
                  {['Easy', 'Medium', 'Hard'].map(v => (
                    <option key={v} value={v}>{v}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Show Exam/Year Toggle */}
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border">
              <input
                type="checkbox"
                id="showExamYear"
                checked={currentData.showExamYear}
                onChange={e => {
                  onFieldChange('showExamYear', e.target.checked);
                }}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <label htmlFor="showExamYear" className="text-sm font-medium text-gray-700">
                Show Exam and Year fields
              </label>
            </div>

            {/* Exam and Year Fields - Conditionally Rendered */}
            {currentData.showExamYear && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div>
                  <DropdownInput
                    label="Exam"
                    value={currentData.exam}
                    onChange={(value) => onFieldChange('exam', value)}
                    options={dropdownOptions.exams}
                    placeholder="Select or type exam..."
                    required={true}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    Year <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="number"
                    min="2000"
                    max="2030"
                    value={currentData.year || ''}
                    onChange={e => onFieldChange('year', parseInt(e.target.value) || '')}
                    placeholder="Enter year"
                    required={true}
                  />
                </div>
              </div>
            )}

            {/* Question Text & Image */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Question Text
              </label>
              <RichTextEditor
                value={currentData.questionText}
                onChange={(value) => onFieldChange('questionText', value)}
                placeholder="Enter the question text..."
              />
              <ImageUploadField
                label="Question Image"
                currentImage={currentData.questionImage}
                field="questionImage"
                uploading={uploading === 'questionImage-null-null'}
                onFileSelect={onFileSelect}
                onImageUpload={onImageUpload}
                onRemoveImage={onRemoveImage}
                selectedFiles={selectedFiles}
              />
            </div>

         {/* Options */}
<div>
  <label className="block text-sm font-medium mb-3 text-gray-700">
    Options
  </label>

  {currentData.options.map((opt, i) => (
    <div
      key={i}
      className={`relative mb-6 p-5 border rounded-xl transition-all duration-200 ${
        opt.isCorrect
          ? 'bg-green-50 border-green-400 ring-1 ring-green-300 shadow-sm'
          : 'bg-gray-50 border-gray-200 hover:shadow-md'
      }`}
    >
      {/* Floating Option Label */}
      <div className="absolute -top-3 left-4 bg-white px-3 py-1 text-sm font-semibold text-gray-700 rounded-full border border-gray-200 shadow-sm">
        Option {i + 1}
      </div>

      <div className="flex gap-4 mb-3 items-start mt-2">
        <input
          type="radio"
          name="correctOption"
          checked={opt.isCorrect}
          onChange={() => onToggleOption(i, 'isCorrect', true)}
          className="mt-2 text-green-600 focus:ring-green-500 scale-150 cursor-pointer"
        />

        <div className="flex-1">
          <RichTextEditor
            value={opt.optionText}
            onChange={(value) => onToggleOption(i, 'optionText', value)}
            placeholder={`Enter Option ${i + 1} text...`}
          />
        </div>
      </div>

      <ImageUploadField
        label={`Option ${i + 1} Image`}
        currentImage={opt.optionImage}
        field="optionImage"
        index={i}
        uploading={uploading === `optionImage-${i}-null`}
        onFileSelect={onFileSelect}
        onImageUpload={onImageUpload}
        onRemoveImage={onRemoveImage}
        selectedFiles={selectedFiles}
      />
    </div>
  ))}
</div>


            {/* Hint & Approach */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Hint</label>
                <RichTextEditor
                  value={currentData.hint.text}
                  onChange={(value) => onFieldChange('hint.text', value)}
                  placeholder="Enter hint text (optional)"
                />
                <ImageUploadField
                  label="Hint Image"
                  currentImage={currentData.hint.image}
                  field="hintImage"
                  uploading={uploading === 'hintImage-null-null'}
                  onFileSelect={onFileSelect}
                  onImageUpload={onImageUpload}
                  onRemoveImage={onRemoveImage}
                  selectedFiles={selectedFiles}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Concept</label>
                <RichTextEditor
                  value={currentData.approach.text}
                  onChange={(value) => onFieldChange('approach.text', value)}
                  placeholder="Enter concept text (optional)"
                />
                <ImageUploadField
                  label="Concept Image"
                  currentImage={currentData.approach.image}
                  field="approachImage"
                  uploading={uploading === 'approachImage-null-null'}
                  onFileSelect={onFileSelect}
                  onImageUpload={onImageUpload}
                  onRemoveImage={onRemoveImage}
                  selectedFiles={selectedFiles}
                />
              </div>
            </div>

            {/* Solution Steps */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="block text-sm font-medium text-gray-700">Solution Steps</label>
              
              </div>
              {currentData.solution.map((step, index) => (
                <div key={index} className="mb-4 p-4 border border-gray-200 rounded-lg bg-white">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-medium text-sm text-gray-800">Step {step.stepNumber}</span>
                    {currentData.solution.length > 1 && (
                      <Button
                        type="button"
                        variant="danger"
                        size="sm"
                        onClick={() => onRemoveSolutionStep(index)}
                        className="bg-red-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                  <RichTextEditor
                    value={step.stepText}
                    onChange={(value) => onUpdateSolutionStep(index, 'stepText', value)}
                    placeholder={`Describe step ${step.stepNumber}...`}
                  />
                  <ImageUploadField
                    label={`Step ${step.stepNumber} Image`}
                    currentImage={step.stepImage}
                    field="solutionImage"
                    stepIndex={index}
                    uploading={uploading === `solutionImage-null-${index}`}
                    onFileSelect={onFileSelect}
                    onImageUpload={onImageUpload}
                    onRemoveImage={onRemoveImage}
                    selectedFiles={selectedFiles}
                  />
                </div>
              ))}
                <Button className="bg-red-400" type="button" size="sm" onClick={onAddSolutionStep}>
                  <Plus className="w-4 h-4 mr-1" /> Add Step
                </Button>
            </div>

            {/* Creator Information in Edit Form */}
            {!newMode && editingQuestion?.createdBy && (
              <div className="pt-4 border-t">
                <CreatorInfo 
                  createdBy={editingQuestion.createdBy} 
                  createdAt={editingQuestion.createdAt} 
                />
              </div>
            )}

            {/* Timestamp Display in Edit Form */}
            {!newMode && editingQuestion && (
              <div className="pt-4 border-t">
                <TimestampDisplay 
                  timestamp={editingQuestion.createdAt} 
                  label="Question Created"
                />
              </div>
            )}

            {/* Form Actions */}
            <div className="flex justify-end gap-3 pt-6 border-t">
              <Button type="button" variant="outline" onClick={onBack}>
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={loading || uploading}
                className="min-w-24 bg-red-400"
              >
                {loading ? 'Saving...' : uploading ? 'Uploading...' : newMode ? 'Create Question' : 'Update Question'}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default QuestionForm;