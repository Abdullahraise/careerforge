
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

  // Redirect to results if the user tries to access the quiz after completion
  useEffect(() => {
    if (quizStarted && !questionsForStream) {
      navigate('/');
    }
  }, [quizStarted, questionsForStream, navigate]);

  const handleStreamSelect = (stream: Stream) => {
    setSelectedStream(stream);
  };

  const handleStartQuiz = () => {
    startQuiz();
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
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {(['Science', 'Commerce', 'Arts'] as Stream[]).map((stream) => (
                <button
                  key={stream}
                  className={`p-6 rounded-xl border-2 transition-all ${
                    selectedStream === stream
                      ? 'border-blue-500 bg-blue-50 shadow-md'
                      : 'border-gray-200 hover:border-blue-200 hover:bg-blue-50/50'
                  }`}
                  onClick={() => handleStreamSelect(stream)}
                >
                  <div className="flex justify-center items-center h-12 mb-4">
                    {stream === 'Science' && (
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                        </svg>
                      </div>
                    )}
                    {stream === 'Commerce' && (
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    )}
                    {stream === 'Arts' && (
                      <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <h3 className="font-semibold text-lg text-center">{stream}</h3>
                </button>
              ))}
            </div>
            
            <div className="flex justify-center">
              <button
                className={`button-gradient rounded-lg px-8 py-4 font-semibold shadow-lg shadow-blue-200 flex items-center justify-center ${
                  !selectedStream ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                onClick={handleStartQuiz}
                disabled={!selectedStream}
              >
                Start Career Quiz
                <ArrowRight className="ml-2" size={18} />
              </button>
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
