
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

  // Updated emoji set to be more distinct and expressive
  const emojis = ['😕', '🙂', '😊', '😃', '🤩'];

  // Creating background colors that gradually intensify with value
  const getBgColor = (index: number, isSelected: boolean) => {
    const colors = [
      'from-red-50 to-red-100', // Not at all
      'from-amber-50 to-amber-100', // Slightly
      'from-yellow-50 to-yellow-100', // Moderately
      'from-teal-50 to-teal-100', // Very much
      'from-indigo-50 to-indigo-100', // Extremely
    ];
    
    const selectedColors = [
      'from-red-100 to-red-200 border-red-400', // Not at all
      'from-amber-100 to-amber-200 border-amber-400', // Slightly
      'from-yellow-100 to-yellow-200 border-yellow-400', // Moderately
      'from-teal-100 to-teal-200 border-teal-400', // Very much
      'from-indigo-100 to-indigo-200 border-indigo-400', // Extremely
    ];
    
    return isSelected ? selectedColors[index] : colors[index];
  };

  const getTextColor = (index: number, isSelected: boolean) => {
    const colors = [
      'text-red-700', // Not at all
      'text-amber-700', // Slightly
      'text-yellow-700', // Moderately
      'text-teal-700', // Very much
      'text-indigo-700', // Extremely
    ];
    
    return isSelected ? colors[index] : 'text-gray-600';
  };

  return (
    <div className={`glass-card rounded-xl p-4 md:p-6 ${animate ? 'animate-scale-in' : ''}`}>
      <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-4 md:mb-6">{question.question}</h3>
      
      <div className="mb-4 md:mb-6">
        <div className={`grid ${isMobile ? 'grid-cols-1 gap-3' : 'grid-cols-5 gap-2'}`}>
          {labels.map((label, index) => {
            const isSelected = value === index + 1;
            const bgColor = getBgColor(index, isSelected);
            const textColor = getTextColor(index, isSelected);
            
            return (
              <button
                key={index}
                className={`flex ${isMobile ? 'flex-row items-center justify-between' : 'flex-col items-center justify-center'} 
                  p-3 border-2 rounded-lg transition-all 
                  bg-gradient-to-br ${bgColor}
                  ${isSelected
                    ? 'shadow-md transform scale-[1.02]'
                    : 'border-gray-200 hover:shadow-sm'
                  }`}
                onClick={() => handleOptionSelect(index + 1)}
              >
                <span className={`${isMobile ? 'text-base' : 'text-sm'} font-medium ${textColor}`}>
                  {label}
                </span>
                <div className={`${isMobile ? 'text-2xl' : 'text-3xl mb-2'}`}>
                  {emojis[index]}
                </div>
              </button>
            );
          })}
        </div>
      </div>
      
      <div className="text-xs md:text-sm text-gray-500">
        Click on an option above to indicate your preference
      </div>
    </div>
  );
};

export default QuizQuestion;
