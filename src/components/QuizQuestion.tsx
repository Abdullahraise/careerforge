
import React, { useState, useEffect } from 'react';
import { QuizData } from '../data/quizData';
import { useIsMobile } from '../hooks/use-mobile';

interface QuizQuestionProps {
  question: QuizData;
  selectedValue: number;
  onAnswer: (value: number) => void;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  selectedValue,
  onAnswer,
}) => {
  const [value, setValue] = useState<number>(selectedValue || 3);
  const [animate, setAnimate] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    setValue(selectedValue || 3);
    setAnimate(true);
    const timer = setTimeout(() => setAnimate(false), 500);
    return () => clearTimeout(timer);
  }, [question.id, selectedValue]);

  const handleOptionSelect = (newValue: number) => {
    setValue(newValue);
    onAnswer(newValue);
  };

  const labels = [
    'Not at all',
    'Slightly',
    'Moderately',
    'Very much',
    'Extremely',
  ];

  const emojis = ['😐', '🙂', '😊', '😄', '🤩'];

  return (
    <div className={`glass-card rounded-xl p-4 md:p-6 ${animate ? 'animate-scale-in' : ''}`}>
      <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-4 md:mb-6">{question.question}</h3>
      
      <div className="mb-4 md:mb-6">
        <div className={`grid ${isMobile ? 'grid-cols-1 gap-3' : 'grid-cols-5 gap-2'}`}>
          {labels.map((label, index) => (
            <button
              key={index}
              className={`flex ${isMobile ? 'flex-row items-center justify-between' : 'flex-col items-center justify-center'} 
                p-3 border-2 rounded-lg transition-all ${
                value === index + 1
                  ? 'border-blue-500 bg-blue-50 shadow-md'
                  : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50/50'
              }`}
              onClick={() => handleOptionSelect(index + 1)}
            >
              <span className={`${isMobile ? 'text-base' : 'text-sm'} ${value === index + 1 ? 'text-blue-600 font-medium' : 'text-gray-600'}`}>
                {label}
              </span>
              <div className={`${isMobile ? 'text-2xl' : 'text-3xl mb-2'}`}>
                {emojis[index]}
              </div>
            </button>
          ))}
        </div>
      </div>
      
      <div className="text-xs md:text-sm text-gray-500">
        Click on an option above to indicate your preference
      </div>
    </div>
  );
};

export default QuizQuestion;
