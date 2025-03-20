
import React, { useState } from 'react';
import { CareerRecommendation } from '../data/quizData';
import { ChevronDown, ChevronUp, BookOpen, Globe, PlayCircle } from 'lucide-react';

interface CareerCardProps {
  career: CareerRecommendation;
  rank: number;
}

const CareerCard: React.FC<CareerCardProps> = ({ career, rank }) => {
  const [expanded, setExpanded] = useState(false);
  
  const toggleExpand = () => {
    setExpanded(!expanded);
  };
  
  const typeIcons = {
    article: Globe,
    video: PlayCircle,
    course: BookOpen,
  };
  
  // Calculate the match percentage
  const matchPercentage = career.matchScore 
    ? Math.round(career.matchScore * 100) 
    : 75 + Math.floor(Math.random() * 20); // Fallback if no score
  
  return (
    <div 
      className={`glass-card rounded-xl overflow-hidden transition-all duration-300 ${
        expanded ? 'shadow-md' : 'shadow-sm hover:shadow-md'
      }`}
    >
      <div 
        className="p-6 cursor-pointer flex justify-between items-start"
        onClick={toggleExpand}
      >
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
            #{rank}
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-gray-900">{career.title}</h3>
            <p className="text-gray-600 mt-1">{career.description}</p>
            
            <div className="mt-3 flex items-center">
              <div className="text-sm font-medium text-gray-900">Match Score:</div>
              <div className="ml-2 w-24 h-2 bg-gray-200 rounded-full">
                <div 
                  className="h-full rounded-full bg-gradient-to-r from-blue-400 to-blue-600"
                  style={{ width: `${matchPercentage}%` }}
                ></div>
              </div>
              <div className="ml-2 text-sm font-medium text-blue-600">{matchPercentage}%</div>
            </div>
          </div>
        </div>
        
        <div>
          {expanded ? (
            <ChevronUp className="text-gray-500" />
          ) : (
            <ChevronDown className="text-gray-500" />
          )}
        </div>
      </div>
      
      {expanded && (
        <div className="px-6 pb-6 pt-2 border-t border-gray-100 animate-slide-down">
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-2">
              Recommended Courses
            </h4>
            <ul className="space-y-1">
              {career.courses.map((course, index) => (
                <li key={index} className="text-gray-700 flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  {course}
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-2">
              Learning Resources
            </h4>
            <ul className="space-y-2">
              {career.resources.map((resource, index) => {
                const Icon = typeIcons[resource.type];
                return (
                  <li key={index} className="hover-scale">
                    <a 
                      href={resource.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center p-2 rounded-lg bg-gray-50 hover:bg-blue-50 transition-colors"
                    >
                      <Icon size={16} className="text-blue-500 mr-2" />
                      <span className="text-gray-900">{resource.title}</span>
                      <span className="ml-auto text-xs px-2 py-1 rounded-full bg-gray-200 text-gray-700">
                        {resource.type}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default CareerCard;
