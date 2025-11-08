import React from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { Clock, AlertCircle, CheckCircle, BookOpen } from 'lucide-react';

const TestInstructions = ({ test, onStartTest, onBack }) => {
  const instructions = [
    {
      icon: <Clock className="w-5 h-5" />,
      title: "Time Limit",
      content: `You have ${test?.duration || 180} minutes to complete this test. The timer will start once you begin and cannot be paused.`
    },
    {
      icon: <BookOpen className="w-5 h-5" />,
      title: "Test Structure",
      content: `This test contains ${test?.totalQuestions || 0} questions across ${test?.subjects?.length || 3} subjects: ${test?.subjects?.join(', ') || 'Physics, Chemistry, Biology'}.`
    },
    {
      icon: <CheckCircle className="w-5 h-5" />,
      title: "Navigation",
      content: "Use the Next and Previous buttons to navigate between questions. You can also use the question palette to jump to any question directly."
    },
    {
      icon: <AlertCircle className="w-5 h-5" />,
      title: "Marking System",
      content: "Mark questions for review if you want to come back to them later. Use the flag icon to mark/unmark questions."
    },
    {
      icon: <CheckCircle className="w-5 h-5" />,
      title: "Answering Questions",
      content: "Click on any option to select your answer. You can change your answer anytime before submission."
    },
    {
      icon: <AlertCircle className="w-5 h-5" />,
      title: "Submission",
      content: "Once you submit the test, you cannot make any changes. Make sure to review all questions before submitting."
    }
  ];

  const importantNotes = [
    "Do not refresh the page or close the browser during the test as it may lead to loss of progress.",
    "All questions are mandatory, but you can choose to skip and come back later.",
    "Use the question palette to track your progress - answered, unanswered, and marked questions.",
    "The test will auto-submit when time expires.",
    "Ensure you have a stable internet connection throughout the test."
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{test?.name}</h1>
          <p className="text-lg text-gray-600">Please read all instructions carefully before starting</p>
        </div>

        <Card className="p-6 mb-6">
          {/* Test Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 bg-blue-50 rounded-lg">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{test?.duration || 180} mins</div>
              <div className="text-sm text-gray-600">Duration</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{test?.totalQuestions || 0}</div>
              <div className="text-sm text-gray-600">Total Questions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{test?.subjects?.length || 3}</div>
              <div className="text-sm text-gray-600">Subjects</div>
            </div>
          </div>

          {/* Instructions */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Test Instructions</h2>
            <div className="space-y-4">
              {instructions.map((instruction, index) => (
                <div key={index} className="flex items-start gap-4 p-3 bg-white rounded-lg border">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                    {instruction.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{instruction.title}</h3>
                    <p className="text-gray-600 text-sm">{instruction.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Important Notes */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Important Notes</h2>
            <div className="space-y-2">
              {importantNotes.map((note, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-2 h-2 bg-red-500 rounded-full mt-2" />
                  <p className="text-gray-600 text-sm">{note}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Agreement Checkbox */}
          <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200 mb-6">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                id="agreement"
                className="mt-1 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">
                I have read and understood all the instructions mentioned above. I agree to follow all the test rules and regulations.
              </span>
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-end">
            <Button
              variant="outline"
              onClick={onBack}
              className="min-w-[120px]"
            >
              Go Back
            </Button>
            <Button
              onClick={onStartTest}
              className="min-w-[120px] bg-blue-600 hover:bg-blue-700"
            >
              Start Test
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default TestInstructions;