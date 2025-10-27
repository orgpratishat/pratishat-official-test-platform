// src/pages/PYQYear.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Spinner from '../components/ui/Spinner';
import Badge from '../components/ui/Badge';
import { ChevronLeft, ChevronRight, Lightbulb, Target, BookOpen, CheckCircle, XCircle, RotateCcw, Image as ImageIcon } from 'lucide-react';
import { getPYQByYear } from '../services/pyq';

// Format text for display - CRITICAL FUNCTION for showing formatted text
export const formatTextWithHTML = (text) => {
  if (!text) return '';
  
  return text
    .replace(/<sup>(.*?)<\/sup>/g, '<sup>$1</sup>')
    .replace(/<sub>(.*?)<\/sub>/g, '<sub>$1</sub>');
};

// Safe HTML component for rendering formatted text
const SafeHTML = ({ html, className = '' }) => {
  return (
    <div 
      className={className}
      dangerouslySetInnerHTML={{ __html: formatTextWithHTML(html) }}
    />
  );
};

const PYQYear = () => {
  const { year } = useParams();
  const [examData, setExamData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [lockedAnswers, setLockedAnswers] = useState({});
  const [showExplanation, setShowExplanation] = useState({});

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        console.log('Fetching data for year:', year);
        const res = await getPYQByYear(year);
        console.log('Raw response from backend:', res);
        
        if (res.success && res.pyq) {
          console.log('PYQ data found:', res.pyq);
          console.log('Questions in pyq:', res.pyq.questions);
          setExamData(res.pyq);
        } else {
          setExamData(res);
        }
      } catch (error) {
        console.error('Error loading PYQ:', error);
        setError(error.message);
        setExamData(null);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [year]);

  // Extract questions
  const questions = examData?.questions || [];
  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;
  const currentAnswer = answers[currentIndex];
  const isLocked = lockedAnswers[currentIndex];
  const currentShowExplanation = showExplanation[currentIndex];
  const selectedOption = currentAnswer !== undefined ? currentQuestion?.options?.[currentAnswer] : null;
  const isCorrect = selectedOption?.isCorrect;

  const selectAnswer = (i) => {
    if (!isLocked) {
      setAnswers(prev => ({ ...prev, [currentIndex]: i }));
    }
  };

  const lockAnswer = () => {
    if (currentAnswer !== undefined) {
      setLockedAnswers(prev => ({ ...prev, [currentIndex]: true }));
      setShowExplanation(prev => ({ ...prev, [currentIndex]: true }));
    }
  };

  const changeAnswer = () => {
    setLockedAnswers(prev => ({ ...prev, [currentIndex]: false }));
    setShowExplanation(prev => ({ ...prev, [currentIndex]: false }));
  };

  const nextQuestion = () => {
    setCurrentIndex(i => Math.min(i + 1, totalQuestions - 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const prevQuestion = () => {
    setCurrentIndex(i => Math.max(i - 1, 0));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Spinner size={32} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800">PYQ {year}</h1>
          <Link to="/pyq">
            <Button variant="outline" className="flex items-center gap-2">
              <ChevronLeft className="w-4 h-4" />
              Back to Years
            </Button>
          </Link>
        </div>
        <Card className="p-8 text-center text-red-500">
          Error: {error}
        </Card>
      </div>
    );
  }

  if (!examData || totalQuestions === 0) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800">PYQ {year}</h1>
          <Link to="/pyq">
            <Button variant="outline" className="flex items-center gap-2">
              <ChevronLeft className="w-4 h-4" />
              Back to Years
            </Button>
          </Link>
        </div>
        <Card className="p-8 text-center text-gray-500">
          No exam data found for {year}.
        </Card>
      </div>
    );
  }

  // Extract exam details
  const examName = examData.examName || `PYQ ${year}`;
  const totalMarks = examData.totalMarks || 0;
  const duration = examData.duration || 0;
  const markingScheme = examData.markingScheme || null;

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Exam Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{examName} - {year}</h1>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            {totalMarks > 0 && (
              <Badge variant="primary" text={`Total Marks: ${totalMarks}`} />
            )}
            {duration > 0 && (
              <Badge variant="secondary" text={`Duration: ${duration} min`} />
            )}
            {markingScheme && (
              <Badge variant="outline" text={`Marking: +${markingScheme.positiveMarks}/-${Math.abs(markingScheme.negativeMarks)}`} />
            )}
            <Badge variant="secondary" text={`${totalQuestions} Questions`} />
          </div>
        </div>
        <Link to="/pyq">
          <Button variant="outline" className="flex items-center gap-2">
            <ChevronLeft className="w-4 h-4" />
            Back to Years
          </Button>
        </Link>
      </div>

      {/* Progress Bar */}
      {totalQuestions > 0 && (
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">
              Question {currentIndex + 1} of {totalQuestions}
            </span>
            <span className="text-sm text-gray-500">
              {Math.round(((currentIndex + 1) / totalQuestions) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Current Question */}
      {currentQuestion && (
        <>
          <Card className="p-8 mb-6 shadow-lg border-2 border-gray-100">
            {/* Question Header */}
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-lg">Q</span>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">
                    Question {currentIndex + 1}
                  </span>
                  <div className="flex items-center gap-2 mt-1">
                    {currentQuestion.subject && (
                      <Badge variant="primary" text={currentQuestion.subject} />
                       
                    )}
                    {currentQuestion.difficulty && (
                      <Badge 
                        variant={
                          currentQuestion.difficulty === 'Easy' ? 'success' : 
                          currentQuestion.difficulty === 'Medium' ? 'warning' : 'danger'
                        } 
                        text={currentQuestion.difficulty} 
                      />
                      
                    )}
                  </div>
                </div>
              </div>
              <div className="text-sm text-gray-500">
                <Badge variant="primary" text={currentQuestion.exam} />
                {currentQuestion.chapter && currentQuestion.topic && (
                  <div className="text-right">
                    <div>{currentQuestion.chapter}</div>
                    <div className="text-xs">{currentQuestion.topic}</div>
                  </div>
                )}
              </div>
            </div>

            {/* Question Text - Using SafeHTML for formatted display */}
            <div className="mb-6">
              <SafeHTML 
                html={currentQuestion.questionText} 
                className="text-xl font-medium text-gray-800 leading-relaxed mb-4"
              />
              
              {/* Question Image */}
              {currentQuestion.questionImage && (
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <ImageIcon className="w-5 h-5 text-blue-500" />
                    <span className="text-sm font-medium text-gray-700">Question Image</span>
                  </div>
                  <div className="border-2 border-gray-200 rounded-xl p-4 bg-gray-50 flex justify-center">
                    <img 
                      src={currentQuestion.questionImage} 
                      alt="Question diagram"
                      className="max-w-full max-h-96 object-contain rounded-lg shadow-sm"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Options */}
            <div className="space-y-3 mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                {isLocked ? 'Your Answer:' : 'Select your answer:'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentQuestion.options?.map((opt, i) => {
                  const selected = currentAnswer === i;
                  const showCorrect = isLocked && opt.isCorrect;
                  const showIncorrect = isLocked && selected && !opt.isCorrect;
                  
                  return (
                    <button
                      key={i}
                      onClick={() => selectAnswer(i)}
                      disabled={isLocked}
                      className={`
                        relative p-6 rounded-2xl border-2 text-left transition-all duration-200
                        ${selected 
                          ? showCorrect
                            ? 'border-green-500 bg-green-50 shadow-md' 
                            : showIncorrect
                            ? 'border-red-500 bg-red-50 shadow-md'
                            : 'border-blue-500 bg-blue-50 shadow-md'
                          : showCorrect && isLocked
                          ? 'border-green-500 bg-green-50 shadow-md'
                          : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                        }
                        ${!isLocked && 'hover:scale-[1.01] active:scale-[0.99]'}
                        ${isLocked && !selected && !showCorrect && 'opacity-70'}
                      `}
                    >
                      {/* Option letter badge */}
                      <div className={`
                        absolute -top-2 -left-2 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm
                        ${selected 
                          ? showCorrect
                            ? 'bg-green-500' 
                            : showIncorrect
                            ? 'bg-red-500'
                            : 'bg-blue-500'
                          : showCorrect && isLocked
                          ? 'bg-green-500'
                          : 'bg-gray-400'
                        }
                      `}>
                        {String.fromCharCode(65 + i)}
                      </div>

                      <div className="flex flex-col gap-3">
                        {/* Option text with SafeHTML for formatted display */}
                        <SafeHTML 
                          html={opt.optionText} 
                          className="text-gray-800 font-medium leading-relaxed"
                        />
                        
                        {/* Option image */}
                        {opt.optionImage && (
                          <div className="border border-gray-200 rounded-lg p-2 bg-white">
                            <img 
                              src={opt.optionImage} 
                              alt={`Option ${i + 1} diagram`}
                              className="max-w-full max-h-32 object-contain mx-auto"
                              onError={(e) => {
                                e.target.style.display = 'none';
                              }}
                            />
                          </div>
                        )}
                      </div>

                      {/* Selection indicator */}
                      {selected && (
                        <div className={`
                          absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center
                          ${showCorrect 
                            ? 'bg-green-500' 
                            : showIncorrect
                            ? 'bg-red-500'
                            : 'bg-blue-500'
                          }
                        `}>
                          {showCorrect ? (
                            <CheckCircle className="w-4 h-4 text-white" />
                          ) : showIncorrect ? (
                            <XCircle className="w-4 h-4 text-white" />
                          ) : (
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          )}
                        </div>
                      )}

                      {/* Correct answer indicator */}
                      {!selected && showCorrect && isLocked && (
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Action Buttons */}
            {!isLocked && currentAnswer !== undefined && (
              <div className="flex justify-center">
                <Button 
                  onClick={lockAnswer}
                  className="px-8 py-3 text-lg font-semibold bg-red-400"
                >
                  Lock Answer & Show Explanation
                </Button>
              </div>
            )}

            {isLocked && (
              <div className="flex justify-center">
                <Button 
                  onClick={changeAnswer}
                  variant="outline"
                  className="flex items-center gap-2 px-6 py-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  Change Answer
                </Button>
              </div>
            )}
          </Card>

          {/* Explanation Section */}
          {currentShowExplanation && isLocked && (
            <div className="space-y-6 mb-6">
              {/* Result Banner */}
              <Card className={`p-6 border-2 ${
                isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
              }`}>
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    isCorrect ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    {isCorrect ? (
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    ) : (
                      <XCircle className="w-6 h-6 text-red-600" />
                    )}
                  </div>
                  <div>
                    <h3 className={`text-lg font-semibold ${
                      isCorrect ? 'text-green-800' : 'text-red-800'
                    }`}>
                      {isCorrect ? 'Correct! 🎉' : 'Incorrect! 💡'}
                    </h3>
                    <p className={`text-sm ${
                      isCorrect ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {isCorrect 
                        ? 'Great job! You selected the correct answer.' 
                        : 'The correct answer is marked in green. Learn from the explanation below.'
                      }
                    </p>
                  </div>
                </div>
              </Card>

              {/* Hint Section */}
              {currentQuestion.hint?.text && (
                <Card className="p-6 border-2 border-yellow-200 bg-yellow-50">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                      <Lightbulb className="w-5 h-5 text-yellow-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-yellow-800">Hint</h3>
                  </div>
                  {/* Hint text with SafeHTML for formatted display */}
                  <SafeHTML 
                    html={currentQuestion.hint.text} 
                    className="text-yellow-700 leading-relaxed"
                  />
                  {currentQuestion.hint.image && (
                    <div className="mt-4 border border-yellow-200 rounded-lg p-3 bg-white">
                      <img 
                        src={currentQuestion.hint.image} 
                        alt="Hint diagram"
                        className="max-w-full max-h-48 object-contain mx-auto rounded"
                      />
                    </div>
                  )}
                </Card>
              )}

              {/* Approach Section */}
              {currentQuestion.approach?.text && (
                <Card className="p-6 border-2 border-blue-200 bg-blue-50">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Target className="w-5 h-5 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-blue-800">Approach</h3>
                  </div>
                  {/* Approach text with SafeHTML for formatted display */}
                  <SafeHTML 
                    html={currentQuestion.approach.text} 
                    className="text-blue-700 leading-relaxed"
                  />
                  {currentQuestion.approach.image && (
                    <div className="mt-4 border border-blue-200 rounded-lg p-3 bg-white">
                      <img 
                        src={currentQuestion.approach.image} 
                        alt="Approach diagram"
                        className="max-w-full max-h-48 object-contain mx-auto rounded"
                      />
                    </div>
                  )}
                </Card>
              )}

              {/* Solution Steps */}
              {currentQuestion.solution?.length > 0 && (
                <Card className="p-6 border-2 border-purple-200 bg-purple-50">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-purple-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-purple-800">Step-by-Step Solution</h3>
                  </div>
                  <div className="space-y-4">
                    {currentQuestion.solution.map((step, stepIndex) => (
                      <div key={stepIndex} className="flex gap-4 p-4 bg-white rounded-lg border border-purple-100">
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-purple-600 font-bold text-sm">{step.stepNumber}</span>
                        </div>
                        <div className="flex-1">
                          {/* Solution step text with SafeHTML for formatted display */}
                          <SafeHTML 
                            html={step.stepText} 
                            className="text-purple-700 mb-2"
                          />
                          {step.stepImage && (
                            <div className="mt-2 border border-purple-200 rounded p-2 bg-white">
                              <img 
                                src={step.stepImage} 
                                alt={`Step ${step.stepNumber} diagram`}
                                className="max-w-full max-h-40 object-contain mx-auto rounded"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              )}
            </div>
          )}

          {/* Navigation */}
          {totalQuestions > 1 && (
            <div className="flex justify-between items-center">
              <Button 
                variant="outline" 
                onClick={prevQuestion} 
                disabled={currentIndex === 0}
                className="flex items-center gap-2 px-6 py-3 text-black bg-red-400"
              >
                <ChevronLeft className="w-5 h-5" />
                Previous
              </Button>
              
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600 font-medium">
                  {currentIndex + 1} / {totalQuestions}
                </span>
              </div>
              
              <Button 
                onClick={nextQuestion} 
                disabled={currentIndex === totalQuestions - 1}
                className="flex items-center gap-2 px-6 py-3 bg-red-400"
              >
                Next
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PYQYear;