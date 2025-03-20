
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
      // Filter questions for the selected stream
      const filteredQuestions = quizQuestions.filter(
        q => q.streams.includes(selectedStream)
      );
      setQuestionsForStream(filteredQuestions);
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

    // Calculate scores for different aspects
    const scores = {
      logical: 0,
      creative: 0,
      social: 0,
      analytical: 0,
      practical: 0,
    };

    Object.entries(answers).forEach(([questionId, value]) => {
      const question = questionsForStream.find(q => q.id === parseInt(questionId));
      if (question) {
        scores[question.aspect] += value;
      }
    });

    // Normalize scores
    const totalQuestions = {
      logical: questionsForStream.filter(q => q.aspect === 'logical').length,
      creative: questionsForStream.filter(q => q.aspect === 'creative').length,
      social: questionsForStream.filter(q => q.aspect === 'social').length,
      analytical: questionsForStream.filter(q => q.aspect === 'analytical').length,
      practical: questionsForStream.filter(q => q.aspect === 'practical').length,
    };

    const normalizedScores = {
      logical: totalQuestions.logical ? scores.logical / (totalQuestions.logical * 5) : 0,
      creative: totalQuestions.creative ? scores.creative / (totalQuestions.creative * 5) : 0,
      social: totalQuestions.social ? scores.social / (totalQuestions.social * 5) : 0,
      analytical: totalQuestions.analytical ? scores.analytical / (totalQuestions.analytical * 5) : 0,
      practical: totalQuestions.practical ? scores.practical / (totalQuestions.practical * 5) : 0,
    };

    // Match with careers based on stream and scores
    const matchedCareers = careerRecommendations
      .filter(career => career.streams.includes(selectedStream))
      .map(career => {
        // Calculate match score
        let matchScore = 0;
        Object.entries(normalizedScores).forEach(([aspect, score]) => {
          matchScore += score * (career.aspects[aspect] || 0);
        });
        
        return {
          ...career,
          matchScore: matchScore / Object.keys(normalizedScores).length,
        };
      })
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 5); // Top 5 recommendations

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
