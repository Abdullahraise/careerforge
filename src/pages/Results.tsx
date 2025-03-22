
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';
import Header from '../components/Header';
import CareerCard from '../components/CareerCard';
import { ArrowRight, RefreshCcw, Trophy, BookOpen, Star, Filter } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const Results = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { quizCompleted, recommendations, selectedStream, resetQuiz } = useQuiz();
  const [filterType, setFilterType] = useState<'all' | 'match' | 'popular'>('match');

  // Redirect if the user tries to access results without completing the quiz
  useEffect(() => {
    if (!quizCompleted || !recommendations) {
      navigate('/');
    }
  }, [quizCompleted, recommendations, navigate]);

  useEffect(() => {
    if (recommendations?.length) {
      toast({
        title: "Your career matches are ready!",
        description: `We've found ${recommendations.length} career paths that match your profile.`,
        duration: 5000,
      });
    }
  }, [recommendations, toast]);

  if (!quizCompleted || !recommendations || !selectedStream) {
    return null;
  }

  const handleRetakeQuiz = () => {
    resetQuiz();
    navigate('/quiz');
  };

  // Sort recommendations based on filter type
  const sortedRecommendations = [...recommendations].sort((a, b) => {
    if (filterType === 'match') {
      return (b.matchScore || 0) - (a.matchScore || 0);
    } else if (filterType === 'popular') {
      // For demo purposes, just reverse the match score order
      // In a real app, this would use actual popularity metrics
      return b.title.localeCompare(a.title);
    }
    return 0;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header />
      
      <div className="container mx-auto max-w-4xl px-4 pt-24 pb-16">
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Trophy size={24} className="text-blue-600" />
            <span className="text-lg font-semibold text-blue-600">Your Results</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Career Recommendations
          </h1>
          <p className="text-gray-600 max-w-xl mx-auto">
            Based on your <span className="font-medium">{selectedStream}</span> stream selection and quiz responses, 
            we've identified these career paths that align with your strengths.
          </p>
        </div>
        
        <div className="flex justify-center mb-6 space-x-2">
          <div className="bg-white p-2 rounded-lg shadow-sm flex items-center border">
            <Filter size={16} className="text-gray-500 mr-2" />
            <span className="text-sm text-gray-600 mr-2">Sort by:</span>
            <button
              onClick={() => setFilterType('match')}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                filterType === 'match' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Best Match
            </button>
            <button
              onClick={() => setFilterType('popular')}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                filterType === 'popular' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Popular
            </button>
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                filterType === 'all' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              All
            </button>
          </div>
        </div>
        
        <div className="space-y-4 mb-10">
          {sortedRecommendations.map((career, index) => (
            <div key={career.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <CareerCard career={career} rank={index + 1} />
            </div>
          ))}
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
          <button 
            className="button-gradient rounded-lg px-8 py-4 text-white font-semibold shadow-lg shadow-blue-200 flex items-center"
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
