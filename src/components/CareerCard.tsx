
import React, { useState } from 'react';
import { CareerRecommendation } from '../data/quizData';
import { ChevronDown, ChevronUp, BookOpen, Globe, PlayCircle, Briefcase, GraduationCap, ExternalLink, Star } from 'lucide-react';

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
  
  // Get top course and career option for preview
  const topCourse = career.courses[0];
  const topCareerOption = career.careerOptions[0];
  
  return (
    <div 
      className={`bg-white rounded-xl overflow-hidden transition-all duration-300 border ${
        expanded ? 'shadow-md border-blue-200' : 'shadow-sm border-gray-100 hover:border-blue-100'
      }`}
    >
      <div className="p-5 cursor-pointer" onClick={toggleExpand}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {rank <= 3 && (
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                rank === 1 ? 'bg-yellow-100 text-yellow-600' : 
                rank === 2 ? 'bg-gray-100 text-gray-600' : 
                'bg-orange-100 text-orange-600'
              }`}>
                <Star size={18} fill={rank <= 3 ? "currentColor" : "none"} />
              </div>
            )}
            {rank > 3 && (
              <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 font-medium">
                #{rank}
              </div>
            )}
            
            <div>
              <h3 className="text-xl font-semibold text-gray-900">{career.title}</h3>
              <div className="flex items-center mt-1">
                <div className="w-20 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${matchPercentage >= 90 ? 'bg-green-500' : 'bg-blue-500'}`}
                    style={{ width: `${matchPercentage}%` }}
                  />
                </div>
                <span className="ml-2 text-sm font-medium text-gray-700">{matchPercentage}% Match</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center">
            {!expanded && (
              <div className="hidden md:flex items-center mr-4 text-sm text-gray-500">
                <GraduationCap size={16} className="mr-1 text-blue-500" />
                <span className="truncate max-w-[120px]">{topCourse}</span>
              </div>
            )}
            {expanded ? (
              <ChevronUp className="text-gray-400" size={20} />
            ) : (
              <ChevronDown className="text-gray-400" size={20} />
            )}
          </div>
        </div>
        
        {!expanded && (
          <p className="text-gray-600 mt-2 text-sm line-clamp-2">{career.description}</p>
        )}
      </div>
      
      {expanded && (
        <div className="px-5 pb-5 animate-slide-down">
          <p className="text-gray-600 mb-4 border-t border-gray-100 pt-3">
            {career.description}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                <GraduationCap size={16} className="mr-2 text-blue-600" />
                Top Courses
              </h4>
              <ul className="space-y-2">
                {career.courses.slice(0, 3).map((course, idx) => (
                  <li key={idx} className="text-gray-700 flex items-start">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 mt-1.5"></span>
                    <span className="text-sm">{course}</span>
                  </li>
                ))}
                {career.courses.length > 3 && (
                  <li className="text-xs text-blue-600 pl-4">
                    +{career.courses.length - 3} more courses
                  </li>
                )}
              </ul>
            </div>
            
            <div className="bg-green-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                <Briefcase size={16} className="mr-2 text-green-600" />
                Career Paths
              </h4>
              <ul className="space-y-2">
                {career.careerOptions.slice(0, 3).map((option, idx) => (
                  <li key={idx} className="text-gray-700 flex items-start">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2 mt-1.5"></span>
                    <span className="text-sm">{option}</span>
                  </li>
                ))}
                {career.careerOptions.length > 3 && (
                  <li className="text-xs text-green-600 pl-4">
                    +{career.careerOptions.length - 3} more options
                  </li>
                )}
              </ul>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
              <BookOpen size={16} className="mr-2 text-purple-600" />
              Learning Resources
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              {career.resources.map((resource, idx) => {
                const Icon = typeIcons[resource.type];
                const bgColors = {
                  article: 'bg-blue-50 hover:bg-blue-100 text-blue-700',
                  video: 'bg-red-50 hover:bg-red-100 text-red-700',
                  course: 'bg-purple-50 hover:bg-purple-100 text-purple-700',
                };
                return (
                  <a
                    key={idx}
                    href={resource.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center p-2 rounded-md text-sm ${bgColors[resource.type]} transition-colors`}
                  >
                    <Icon size={14} className="mr-1 flex-shrink-0" />
                    <span className="truncate">{resource.title}</span>
                    <ExternalLink size={12} className="ml-1 flex-shrink-0" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CareerCard;
