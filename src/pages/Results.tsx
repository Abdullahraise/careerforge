
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';
import Header from '../components/Header';
import CareerCard from '../components/CareerCard';
import { ArrowRight, RefreshCcw } from 'lucide-react';

const Results = () => {
  const navigate = useNavigate();
  const { quizCompleted, recommendations, selectedStream, resetQuiz } = useQuiz();

  // Redirect if the user tries to access results without completing the quiz
  useEffect(() => {
    if (!quizCompleted || !recommendations) {
      navigate('/');
    }
  }, [quizCompleted, recommendations, navigate]);

  if (!quizCompleted || !recommendations || !selectedStream) {
    return null;
  }

  const handleRetakeQuiz = () => {
    resetQuiz();
    navigate('/quiz');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header />
      
      <div className="container mx-auto max-w-4xl px-4 pt-32 pb-16">
        <div className="mb-12 text-center">
          <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-600 text-sm font-medium mb-4 animate-fade-in">
            Your Results
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 animate-slide-down">
            Career Recommendations
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto animate-slide-down">
            Based on your {selectedStream} stream selection and quiz responses, we've identified the following career paths that align with your strengths and interests.
          </p>
        </div>
        
        <div className="space-y-6 mb-12">
          {recommendations.map((career, index) => (
            <div key={career.id} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <CareerCard career={career} rank={index + 1} />
            </div>
          ))}
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
          <button 
            className="button-gradient rounded-lg px-8 py-4 text-center font-semibold shadow-lg shadow-blue-200 flex items-center"
            onClick={handleRetakeQuiz}
          >
            <RefreshCcw className="mr-2" size={18} />
            Retake Quiz
          </button>
          
          <button 
            className="border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 rounded-lg px-8 py-4 text-center font-semibold transition-colors flex items-center"
            onClick={() => navigate('/')}
          >
            Back to Home
            <ArrowRight className="ml-2" size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Results;
