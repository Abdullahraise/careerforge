
import React, { useState } from 'react';
import { CareerRecommendation } from '../data/quizData';
import { ChevronDown, ChevronUp, BookOpen, Globe, PlayCircle, Briefcase, GraduationCap, ExternalLink, Star, Sparkles, Award, TrendingUp, Brain } from 'lucide-react';

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
  
  return (
    <div 
      className={`bg-white rounded-xl overflow-hidden transition-all duration-300 border ${
        expanded 
          ? 'shadow-md border-indigo-200 transform scale-[1.01]' 
          : 'shadow-sm border-indigo-100 hover:border-indigo-200 hover:shadow'
      }`}
    >
      <div className="p-5 cursor-pointer" onClick={toggleExpand}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {rank <= 3 && (
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                rank === 1 
                  ? 'bg-gradient-to-br from-yellow-400 to-amber-500 text-white' 
                  : rank === 2 
                    ? 'bg-gradient-to-br from-gray-300 to-gray-400 text-white' 
                    : 'bg-gradient-to-br from-amber-500 to-orange-600 text-white'
              } shadow-md transform hover:scale-105 transition-transform duration-300`}>
                {rank === 1 && <Award size={24} />}
                {rank === 2 && <Star size={24} />}
                {rank === 3 && <TrendingUp size={24} />}
              </div>
            )}
            {rank > 3 && (
              <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-full flex items-center justify-center text-indigo-700 font-bold shadow-sm">
                #{rank}
              </div>
            )}
            
            <div>
              <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                {career.title}
                {matchPercentage >= 90 && <Sparkles size={16} className="ml-2 text-amber-500" />}
              </h3>
              <div className="flex items-center mt-1">
                <div className="w-24 h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${
                      matchPercentage >= 90 
                        ? 'bg-gradient-to-r from-green-400 to-green-500' 
                        : 'bg-gradient-to-r from-blue-400 to-indigo-500'
                    }`}
                    style={{ width: `${matchPercentage}%` }}
                  />
                </div>
                <span className={`ml-2 text-sm font-medium ${
                  matchPercentage >= 90 ? 'text-green-600' : 'text-indigo-600'
                }`}>
                  {matchPercentage}% Match
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center">
            {!expanded && (
              <div className="hidden md:flex items-center mr-4 text-sm text-gray-500">
                <GraduationCap size={16} className="mr-1 text-indigo-500" />
                <span className="truncate max-w-[120px]">{topCourse}</span>
              </div>
            )}
            {expanded ? (
              <ChevronUp className="text-indigo-400" size={20} />
            ) : (
              <ChevronDown className="text-indigo-400" size={20} />
            )}
          </div>
        </div>
        
        {!expanded && (
          <p className="text-gray-600 mt-3 text-sm line-clamp-2 ml-16">{career.description}</p>
        )}
      </div>
      
      {expanded && (
        <div className="px-5 pb-5 animate-slide-down">
          <p className="text-gray-600 mb-5 border-t border-indigo-100 pt-3">
            {career.description}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg p-4 border border-indigo-100 transform hover:scale-[1.01] transition-all duration-300">
              <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                <GraduationCap size={16} className="mr-2 text-indigo-600" />
                Top Courses
              </h4>
              <ul className="space-y-2">
                {career.courses.slice(0, 3).map((course, idx) => (
                  <li key={idx} className="text-gray-700 flex items-start">
                    <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full mr-2 mt-1.5"></span>
                    <span className="text-sm">{course}</span>
                  </li>
                ))}
                {career.courses.length > 3 && (
                  <li className="text-xs text-indigo-600 pl-4 mt-1 font-medium">
                    +{career.courses.length - 3} more courses
                  </li>
                )}
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-emerald-50 to-teal-100 rounded-lg p-4 border border-teal-100 transform hover:scale-[1.01] transition-all duration-300">
              <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                <Briefcase size={16} className="mr-2 text-teal-600" />
                Career Paths
              </h4>
              <ul className="space-y-2">
                {career.careerOptions.slice(0, 3).map((option, idx) => (
                  <li key={idx} className="text-gray-700 flex items-start">
                    <span className="w-1.5 h-1.5 bg-teal-500 rounded-full mr-2 mt-1.5"></span>
                    <span className="text-sm">{option}</span>
                  </li>
                ))}
                {career.careerOptions.length > 3 && (
                  <li className="text-xs text-teal-600 pl-4 mt-1 font-medium">
                    +{career.careerOptions.length - 3} more options
                  </li>
                )}
              </ul>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
              <Brain size={16} className="mr-2 text-purple-600" />
              Learning Resources
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              {career.resources.map((resource, idx) => {
                const Icon = typeIcons[resource.type];
                const bgColors = {
                  article: 'from-blue-50 to-blue-100 border-blue-200 text-blue-700 hover:shadow',
                  video: 'from-red-50 to-red-100 border-red-200 text-red-700 hover:shadow',
                  course: 'from-purple-50 to-purple-100 border-purple-200 text-purple-700 hover:shadow',
                };
                return (
                  <a
                    key={idx}
                    href={resource.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center p-2.5 rounded-md text-sm bg-gradient-to-br ${bgColors[resource.type]} border transition-all duration-300 transform hover:translate-y-[-1px]`}
                  >
                    <Icon size={14} className="mr-1.5 flex-shrink-0" />
                    <span className="truncate">{resource.title}</span>
                    <ExternalLink size={12} className="ml-1.5 flex-shrink-0" />
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
