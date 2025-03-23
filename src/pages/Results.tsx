
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';
import Header from '../components/Header';
import CareerCard from '../components/CareerCard';
import { ArrowRight, RefreshCcw, Trophy, BookOpen, Star, Filter, Sparkles, AlertCircle } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const Results = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { quizCompleted, recommendations, selectedStream, resetQuiz, answers } = useQuiz();
  const [filterType, setFilterType] = useState<'all' | 'match' | 'popular'>('match');

  // Check if user had very low interest (mostly 1-2 ratings)
  const hasLowInterest = React.useMemo(() => {
    if (!answers) return false;
    
    const answerValues = Object.values(answers);
    if (answerValues.length === 0) return false;
    
    const lowAnswers = answerValues.filter(v => v <= 2);
    return lowAnswers.length / answerValues.length >= 0.7; // 70% of answers are low interest
  }, [answers]);

  // Redirect if the user tries to access results without completing the quiz
  useEffect(() => {
    if (!quizCompleted || !recommendations) {
      navigate('/');
    }
  }, [quizCompleted, recommendations, navigate]);

  useEffect(() => {
    if (recommendations?.length) {
      if (hasLowInterest) {
        toast({
          title: "Low interest detected",
          description: "We've noticed you didn't show much interest in these topics. Consider exploring other streams!",
          duration: 6000,
        });
      } else {
        toast({
          title: "Your Future Forge paths are ready!",
          description: `We've discovered ${recommendations.length} career paths aligned with your strengths.`,
          duration: 5000,
        });
      }
    } else if (quizCompleted) {
      toast({
        title: "No strong matches found",
        description: "Based on your answers, we couldn't find strong matches. Try another stream or retake the quiz!",
        duration: 6000,
      });
    }
  }, [recommendations, toast, hasLowInterest, quizCompleted]);

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
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-indigo-50 to-white">
      <Header />
      
      <div className="container mx-auto max-w-4xl px-4 pt-24 pb-16">
        <div className="mb-10 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Sparkles size={28} className="text-amber-500" />
            <span className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Your Journey Begins</span>
            <Sparkles size={28} className="text-amber-500" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-700 bg-clip-text text-transparent">
            Your Future Forge Paths
          </h1>
          <div className="max-w-2xl mx-auto px-6 py-3 bg-white/80 backdrop-blur-md rounded-xl shadow-sm border border-indigo-100 transform hover:-translate-y-1 transition-all duration-300">
            <p className="text-gray-700">
              Based on your <span className="font-semibold text-indigo-700">{selectedStream}</span> pathway selection and your unique responses, 
              we've forged these personalized career directions that align with your natural talents.
            </p>
          </div>
        </div>
        
        {hasLowInterest && (
          <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-3">
            <AlertCircle className="text-amber-500 flex-shrink-0 mt-0.5" size={20} />
            <div>
              <h3 className="font-medium text-amber-800">Low interest detected</h3>
              <p className="text-sm text-amber-700">
                Your responses indicate low interest in the {selectedStream} stream. 
                These recommendations may not be ideal matches.
                Consider exploring other academic streams to find better-aligned paths.
              </p>
            </div>
          </div>
        )}
        
        <div className="flex justify-center mb-6 space-x-2">
          <div className="bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-sm flex items-center border border-indigo-100 transform hover:scale-101 transition-all duration-300">
            <Filter size={16} className="text-indigo-500 mr-2" />
            <span className="text-sm text-gray-600 mr-2">Sort by:</span>
            <button
              onClick={() => setFilterType('match')}
              className={`px-3 py-1.5 text-sm rounded-md transition-all duration-200 ${
                filterType === 'match' 
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md' 
                  : 'text-gray-600 hover:bg-indigo-50'
              }`}
            >
              Best Match
            </button>
            <button
              onClick={() => setFilterType('popular')}
              className={`px-3 py-1.5 text-sm rounded-md transition-all duration-200 ${
                filterType === 'popular' 
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md' 
                  : 'text-gray-600 hover:bg-indigo-50'
              }`}
            >
              Popular
            </button>
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-1.5 text-sm rounded-md transition-all duration-200 ${
                filterType === 'all' 
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-indigo-50'
              }`}
            >
              All
            </button>
          </div>
        </div>
        
        {sortedRecommendations.length > 0 ? (
          <div className="space-y-5 mb-12">
            {sortedRecommendations.map((career, index) => (
              <div key={career.id} 
                className="animate-fade-in transform hover:translate-x-1 transition-all duration-300" 
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CareerCard career={career} rank={index + 1} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center p-10 bg-white/80 rounded-xl shadow-sm border border-indigo-100 mb-12">
            <div className="text-gray-400 mb-4">
              <AlertCircle size={48} className="mx-auto" />
            </div>
            <h3 className="text-xl font-medium text-gray-800 mb-2">No Strong Matches Found</h3>
            <p className="text-gray-600 mb-4">
              Based on your responses, we couldn't find any strong career matches in the {selectedStream} stream.
              We recommend trying another academic stream or retaking the quiz.
            </p>
          </div>
        )}
        
        <div className="flex flex-col md:flex-row gap-5 justify-center items-center">
          <button 
            className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 rounded-lg px-8 py-4 text-white font-semibold shadow-lg shadow-blue-200/50 flex items-center transform hover:translate-y-[-2px] transition-all duration-300"
            onClick={handleRetakeQuiz}
          >
            <RefreshCcw className="mr-2" size={18} />
            Forge a New Path
          </button>
          
          <button 
            className="border border-indigo-200 bg-white hover:bg-indigo-50 text-indigo-700 rounded-lg px-8 py-4 text-center font-semibold transition-all duration-300 flex items-center shadow-sm hover:shadow transform hover:translate-y-[-2px]"
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
