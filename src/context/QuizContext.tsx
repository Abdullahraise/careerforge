
import React, { createContext, useContext, useState, useEffect } from 'react';
import { QuizData, Stream, CareerRecommendation, quizQuestions, careerRecommendations } from '../data/quizData';

interface QuizContextType {
  currentQuestion: number;
  selectedStream: Stream | null;
  answers: Record<number, number>;
  quizStarted: boolean;
  quizCompleted: boolean;
  recommendations: CareerRecommendation[] | null;
  setSelectedStream: (stream: Stream) => void;
  startQuiz: () => void;
  answerQuestion: (questionId: number, answerValue: number) => void;
  nextQuestion: () => void;
  prevQuestion: () => void;
  completeQuiz: () => void;
  resetQuiz: () => void;
  progressPercentage: number;
  questionsForStream: QuizData[] | null;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

const QUESTIONS_PER_STREAM = 15;

export const QuizProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedStream, setSelectedStream] = useState<Stream | null>(null);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [recommendations, setRecommendations] = useState<CareerRecommendation[] | null>(null);
  const [questionsForStream, setQuestionsForStream] = useState<QuizData[] | null>(null);

  useEffect(() => {
    if (selectedStream) {
      const filteredQuestions = quizQuestions.filter(
        q => q.streams.includes(selectedStream)
      );
      
      let finalQuestions: QuizData[] = [];
      
      if (filteredQuestions.length >= QUESTIONS_PER_STREAM) {
        const shuffled = [...filteredQuestions].sort(() => 0.5 - Math.random());
        finalQuestions = shuffled.slice(0, QUESTIONS_PER_STREAM);
      } else {
        finalQuestions = [...filteredQuestions];
        
        const remainingQuestions = quizQuestions
          .filter(q => !q.streams.includes(selectedStream))
          .sort(() => 0.5 - Math.random())
          .slice(0, QUESTIONS_PER_STREAM - filteredQuestions.length);
          
        finalQuestions = [...finalQuestions, ...remainingQuestions];
      }
      
      finalQuestions.sort((a, b) => a.id - b.id);
      
      setQuestionsForStream(finalQuestions);
    } else {
      setQuestionsForStream(null);
    }
  }, [selectedStream]);

  const progressPercentage = questionsForStream
    ? Math.round(((currentQuestion + 1) / questionsForStream.length) * 100)
    : 0;

  const startQuiz = () => {
    setQuizStarted(true);
    setCurrentQuestion(0);
    setAnswers({});
    setQuizCompleted(false);
  };

  const answerQuestion = (questionId: number, answerValue: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: answerValue }));
  };

  const nextQuestion = () => {
    if (questionsForStream && currentQuestion < questionsForStream.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const completeQuiz = () => {
    if (!selectedStream || !questionsForStream) return;

    const scores = {
      logical: 0,
      creative: 0,
      social: 0,
      analytical: 0,
      practical: 0,
    };

    // Count total questions by aspect
    const totalQuestions = {
      logical: questionsForStream.filter(q => q.aspect === 'logical').length,
      creative: questionsForStream.filter(q => q.aspect === 'creative').length,
      social: questionsForStream.filter(q => q.aspect === 'social').length,
      analytical: questionsForStream.filter(q => q.aspect === 'analytical').length,
      practical: questionsForStream.filter(q => q.aspect === 'practical').length,
    };

    // Calculate the maximum possible score for each aspect
    const maxPossibleScores = {
      logical: totalQuestions.logical * 5,
      creative: totalQuestions.creative * 5,
      social: totalQuestions.social * 5,
      analytical: totalQuestions.analytical * 5,
      practical: totalQuestions.practical * 5,
    };

    // Track if user has shown extremely low interest
    let hasLowInterestPattern = true;
    let totalAnswerValue = 0;

    // Calculate scores and check for low interest pattern
    Object.entries(answers).forEach(([questionId, value]) => {
      const question = questionsForStream.find(q => q.id === parseInt(questionId));
      if (question) {
        scores[question.aspect] += value;
        totalAnswerValue += value;
        
        // If any answer is above 2, user doesn't have extremely low interest overall
        if (value > 2) {
          hasLowInterestPattern = false;
        }
      }
    });

    // Calculate interest profile percentages - higher score means more interest
    const interestProfile = {
      logical: totalQuestions.logical ? scores.logical / maxPossibleScores.logical : 0,
      creative: totalQuestions.creative ? scores.creative / maxPossibleScores.creative : 0,
      social: totalQuestions.social ? scores.social / maxPossibleScores.social : 0,
      analytical: totalQuestions.analytical ? scores.analytical / maxPossibleScores.analytical : 0,
      practical: totalQuestions.practical ? scores.practical / maxPossibleScores.practical : 0,
    };

    // Calculate average interest level (0-1 scale)
    const totalAnswers = Object.keys(answers).length;
    const averageInterestLevel = totalAnswers > 0 ? totalAnswerValue / (totalAnswers * 5) : 0;

    let matchedCareers = careerRecommendations
      .filter(career => career.streams.includes(selectedStream))
      .map(career => {
        let weightedMatchScore = 0;
        let totalWeight = 0;
        
        // Calculate weighted match score based on user's interest profile
        Object.entries(interestProfile).forEach(([aspect, interestLevel]) => {
          const aspectImportance = career.aspects[aspect] || 0;
          
          // Higher weight for aspects that are BOTH important to the career AND interesting to the user
          const weight = aspectImportance * 2;
          weightedMatchScore += interestLevel * aspectImportance * weight;
          totalWeight += weight;
        });
        
        // Normalize the match score
        const normalizedMatchScore = totalWeight > 0 ? weightedMatchScore / totalWeight : 0;
        
        // Adjust match score based on average interest level
        // If user shows very low interest overall, reduce match scores
        const adjustedMatchScore = hasLowInterestPattern 
          ? normalizedMatchScore * 0.5  // Reduce scores by 50% for low interest patterns
          : normalizedMatchScore;
          
        return {
          ...career,
          matchScore: adjustedMatchScore,
        };
      })
      .sort((a, b) => b.matchScore - a.matchScore);
    
    // Apply minimum threshold for recommendations
    const MIN_MATCH_THRESHOLD = 0.3; // 30% match required
    matchedCareers = matchedCareers.filter(career => career.matchScore >= MIN_MATCH_THRESHOLD);
    
    // If no careers meet the threshold and user has low interest
    if (matchedCareers.length === 0 && hasLowInterestPattern) {
      // Offer a broader selection with disclaimer
      matchedCareers = careerRecommendations
        .filter(career => career.streams.includes(selectedStream))
        .sort((a, b) => {
          // Sort by diversity of aspects
          const aDiversity = Object.values(a.aspects).filter(v => v > 0.5).length;
          const bDiversity = Object.values(b.aspects).filter(v => v > 0.5).length;
          return bDiversity - aDiversity;
        })
        .slice(0, 3)
        .map(career => ({
          ...career,
          matchScore: 0.3, // Indicate these are exploratory options
        }));
    }
    
    // Limit to top 3 recommendations
    matchedCareers = matchedCareers.slice(0, 3);

    setRecommendations(matchedCareers);
    setQuizCompleted(true);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedStream(null);
    setAnswers({});
    setQuizStarted(false);
    setQuizCompleted(false);
    setRecommendations(null);
  };

  return (
    <QuizContext.Provider
      value={{
        currentQuestion,
        selectedStream,
        answers,
        quizStarted,
        quizCompleted,
        recommendations,
        setSelectedStream,
        startQuiz,
        answerQuestion,
        nextQuestion,
        prevQuestion,
        completeQuiz,
        resetQuiz,
        progressPercentage,
        questionsForStream,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = (): QuizContextType => {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};
