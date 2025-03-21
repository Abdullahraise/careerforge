import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';
import { Stream } from '../data/quizData';
import Header from '../components/Header';
import ProgressBar from '../components/ProgressBar';
import QuizQuestion from '../components/QuizQuestion';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';

const Quiz = () => {
  const navigate = useNavigate();
  const {
    currentQuestion,
    selectedStream,
    answers,
    quizStarted,
    setSelectedStream,
    startQuiz,
    answerQuestion,
    nextQuestion,
    prevQuestion,
    completeQuiz,
    progressPercentage,
    questionsForStream,
  } = useQuiz();

  const [transitioning, setTransitioning] = useState(false);

  // Redirect to home if no stream is selected
  useEffect(() => {
    if (!quizStarted && !selectedStream) {
      navigate('/', { replace: true });
    }
  }, [quizStarted, selectedStream, navigate]);

  const handleStreamSelect = (stream: Stream) => {
    setSelectedStream(stream);
    startQuiz(); // Start quiz immediately after selecting a stream
  };

  const handleAnswerQuestion = (value: number) => {
    if (!questionsForStream) return;
    
    answerQuestion(questionsForStream[currentQuestion].id, value);
  };

  const handleNextQuestion = () => {
    setTransitioning(true);
    setTimeout(() => {
      nextQuestion();
      setTransitioning(false);
    }, 300);
  };

  const handlePrevQuestion = () => {
    setTransitioning(true);
    setTimeout(() => {
      prevQuestion();
      setTransitioning(false);
    }, 300);
  };

  const handleCompleteQuiz = () => {
    completeQuiz();
    navigate('/results');
  };

  const currentQuestionData = questionsForStream && questionsForStream[currentQuestion];
  const currentAnswer = currentQuestionData ? answers[currentQuestionData.id] : undefined;
  const isLastQuestion = questionsForStream && currentQuestion === questionsForStream.length - 1;

  const streamIcons = {
    'Bio-Comp': {
      bg: 'bg-purple-100',
      text: 'text-purple-600',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
        </svg>
      )
    },
    'Bio-Maths': {
      bg: 'bg-blue-100',
      text: 'text-blue-600',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9M19.1 4.9C23 8.8 23 15.2 19.1 19.1M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
        </svg>
      )
    },
    'Comp-Maths': {
      bg: 'bg-indigo-100',
      text: 'text-indigo-600',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      )
    },
    'Commerce': {
      bg: 'bg-green-100',
      text: 'text-green-600',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    'Arts': {
      bg: 'bg-pink-100',
      text: 'text-pink-600',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
      )
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header />
      
      <div className="container mx-auto max-w-3xl px-4 pt-32 pb-16">
        {/* Stream Selection */}
        {!quizStarted && (
          <div className="glass-card rounded-xl p-8 animate-scale-in">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">Select Your Academic Stream</h2>
            <p className="text-gray-600 mb-8 text-center">
              Choose the academic stream you're currently pursuing or interested in to get personalized career recommendations.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {(['Bio-Comp', 'Bio-Maths', 'Comp-Maths', 'Commerce', 'Arts'] as Stream[]).map((stream) => (
                <button
                  key={stream}
                  className={`p-6 rounded-xl border-2 transition-all hover-scale ${
                    selectedStream === stream
                      ? 'border-blue-500 bg-blue-50 shadow-md'
                      : 'border-gray-200 hover:border-blue-200 hover:bg-blue-50/50'
                  }`}
                  onClick={() => handleStreamSelect(stream)}
                >
                  <div className="flex justify-center items-center h-12 mb-4">
                    <div className={`w-12 h-12 ${streamIcons[stream].bg} rounded-full flex items-center justify-center`}>
                      {streamIcons[stream].icon}
                    </div>
                  </div>
                  <h3 className="font-semibold text-lg text-center">{stream}</h3>
                </button>
              ))}
            </div>
          </div>
        )}
        
        {/* Quiz Questions */}
        {quizStarted && questionsForStream && (
          <div className="animate-fade-in">
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl font-bold text-gray-900">Career Assessment Quiz</h2>
                <div className="text-sm font-medium text-gray-500">
                  Question {currentQuestion + 1} of {questionsForStream.length}
                </div>
              </div>
              
              <ProgressBar percentage={progressPercentage} />
            </div>
            
            <div className={`transition-opacity duration-300 ${transitioning ? 'opacity-0' : 'opacity-100'}`}>
              {currentQuestionData && (
                <QuizQuestion
                  question={currentQuestionData}
                  selectedValue={currentAnswer}
                  onAnswer={handleAnswerQuestion}
                />
              )}
            </div>
            
            <div className="mt-8 flex justify-between">
              <button
                className={`flex items-center px-6 py-3 rounded-lg border border-gray-300 bg-white text-gray-700 font-medium transition-colors ${
                  currentQuestion === 0
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:bg-gray-50'
                }`}
                onClick={handlePrevQuestion}
                disabled={currentQuestion === 0}
              >
                <ArrowLeft className="mr-2" size={18} />
                Previous
              </button>
              
              {isLastQuestion ? (
                <button
                  className={`button-gradient rounded-lg px-6 py-3 font-medium shadow-md shadow-blue-200 flex items-center ${
                    currentAnswer === undefined
                      ? 'opacity-50 cursor-not-allowed'
                      : ''
                  }`}
                  onClick={handleCompleteQuiz}
                  disabled={currentAnswer === undefined}
                >
                  Complete Quiz
                  <Check className="ml-2" size={18} />
                </button>
              ) : (
                <button
                  className={`button-gradient rounded-lg px-6 py-3 font-medium shadow-md shadow-blue-200 flex items-center ${
                    currentAnswer === undefined
                      ? 'opacity-50 cursor-not-allowed'
                      : ''
                  }`}
                  onClick={handleNextQuestion}
                  disabled={currentAnswer === undefined}
                >
                  Next Question
                  <ArrowRight className="ml-2" size={18} />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
