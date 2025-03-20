
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

  const handleChange = (newValue: number) => {
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
        <input 
          type="range"
          min="1"
          max="5"
          step="1"
          value={value}
          onChange={(e) => handleChange(parseInt(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
        />
        
        <div className="flex justify-between px-1 mt-2">
          {labels.map((label, index) => (
            <div 
              key={index} 
              className={`text-xs text-center ${value === index + 1 ? 'text-blue-600 font-medium' : 'text-gray-500'}`}
              style={{ width: '20%' }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-500">
          Drag the slider to indicate your preference
        </div>
        <div className="text-sm font-medium text-blue-600">
          Selected: {labels[value - 1]}
        </div>
      </div>
    </div>
  );
};

export default QuizQuestion;
