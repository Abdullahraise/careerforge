import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';
import { ArrowRight, BookOpen, Award, LineChart, Compass } from 'lucide-react';
import Header from '../components/Header';

const Index = () => {
  const { resetQuiz } = useQuiz();
  const howItWorksRef = useRef<HTMLElement>(null);

  React.useEffect(() => {
    resetQuiz();
  }, [resetQuiz]);

  const scrollToHowItWorks = () => {
    howItWorksRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 md:px-0">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-12 mb-10 md:mb-0">
              <div className="animate-slide-down">
                <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-600 text-sm font-medium mb-4">
                  Career Guidance Platform
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                  Find Your <span className="text-blue-600">Perfect</span> Career Path!
                </h1>
                <p className="text-lg md:text-xl text-gray-600 mb-8">
                  Confused about your future? Our personalized assessment will help you discover the right career path based on your interests, strengths, and academic streams.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    to="/quiz"
                    className="button-gradient rounded-lg px-8 py-4 text-center font-semibold shadow-lg shadow-blue-200 flex items-center justify-center"
                    onClick={() => resetQuiz()}
                  >
                    Start Career Quiz
                    <ArrowRight className="ml-2" size={18} />
                  </Link>
                  
                  <button 
                    className="border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 rounded-lg px-8 py-4 text-center font-semibold transition-colors"
                    onClick={scrollToHowItWorks}
                  >
                    Learn More
                  </button>
                </div>
              </div>
            </div>
            
            <div className="md:w-1/2 animate-scale-in">
              <div className="relative">
                <div className="w-full h-full absolute -top-6 -left-6 bg-blue-200 rounded-xl"></div>
                <div className="w-full h-full absolute -bottom-6 -right-6 bg-blue-400 rounded-xl"></div>
                <img
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Students planning their future"
                  className="rounded-xl shadow-xl relative z-10 w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section ref={howItWorksRef} className="py-16 px-4 md:px-0">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our platform uses advanced algorithms to match your preferences, abilities, and academic stream to suitable career paths.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Compass,
                title: "Take the Quiz",
                description: "Answer questions about your interests, strengths, and preferences."
              },
              {
                icon: BookOpen,
                title: "Select Stream",
                description: "Choose your academic stream: Science, Commerce, or Arts."
              },
              {
                icon: LineChart,
                title: "Get Results",
                description: "Receive personalized career recommendations based on your profile."
              },
              {
                icon: Award,
                title: "Explore Options",
                description: "Discover suitable career paths, courses, and learning resources."
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="glass-card rounded-xl p-6 hover-scale"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4">
                  <feature.icon size={24} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link
              to="/quiz"
              className="inline-flex items-center justify-center space-x-2 text-blue-600 font-medium hover:text-blue-700"
            >
              <span>Start your journey now</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
      
      {/* Testimonials - Simplified */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto max-w-6xl px-4 md:px-0">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Success Stories</h2>
            <p className="text-lg text-gray-600">See how our platform has helped students find their path</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "This quiz helped me realize my passion for design. Now I'm pursuing a degree in UX Design!",
                name: "Priya S.",
                role: "Arts Student"
              },
              {
                quote: "I was confused between medicine and engineering. The assessment clarified my strengths perfectly.",
                name: "Rahul M.",
                role: "Science Student"
              },
              {
                quote: "The career resources provided were incredibly helpful for my college applications.",
                name: "Aisha K.",
                role: "Commerce Student"
              }
            ].map((testimonial, index) => (
              <div key={index} className="glass-card rounded-xl p-6">
                <div className="mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400">★</span>
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-200 rounded-full text-blue-600 flex items-center justify-center font-medium">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="ml-3">
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-8 bg-white border-t border-gray-100">
        <div className="container mx-auto max-w-6xl px-4 md:px-0">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                  <span className="text-white font-bold text-sm">CG</span>
                </div>
                <span className="font-display font-semibold text-lg text-gray-900">CareerGuide</span>
              </div>
            </div>
            
            <div className="text-sm text-gray-500">
              © {new Date().getFullYear()} CareerGuide. All rights reserved.
            </div>
            
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-gray-500 hover:text-blue-600">Privacy</a>
              <a href="#" className="text-gray-500 hover:text-blue-600">Terms</a>
              <a href="#" className="text-gray-500 hover:text-blue-600">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
