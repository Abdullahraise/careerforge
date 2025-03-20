
import React, { useState, useEffect } from 'react';
import { QuizData } from '../data/quizData';

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

  return (
    <div className={`glass-card rounded-xl p-6 ${animate ? 'animate-scale-in' : ''}`}>
      <h3 className="text-xl font-semibold text-gray-900 mb-6">{question.question}</h3>
      
      <div className="mb-6">
        <div className="grid grid-cols-5 gap-2">
          {labels.map((label, index) => (
            <button
              key={index}
              className={`flex flex-col items-center justify-center p-3 border-2 rounded-lg transition-all ${
                value === index + 1
                  ? 'border-blue-500 bg-blue-50 shadow-md'
                  : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50/50'
              }`}
              onClick={() => handleOptionSelect(index + 1)}
            >
              <div className="text-3xl mb-2">
                {index === 0 && '😐'}
                {index === 1 && '🙂'}
                {index === 2 && '😊'}
                {index === 3 && '😄'}
                {index === 4 && '🤩'}
              </div>
              <span className={`text-sm ${value === index + 1 ? 'text-blue-600 font-medium' : 'text-gray-600'}`}>
                {label}
              </span>
            </button>
          ))}
        </div>
      </div>
      
      <div className="text-sm text-gray-500">
        Click on an option above to indicate your preference
      </div>
    </div>
  );
};

export default QuizQuestion;
