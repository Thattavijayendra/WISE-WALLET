import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, PieChart, Calculator, TrendingUp } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { OnboardingStep } from '../types';

const Onboarding: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const { updateUserOnboardingStatus } = useAuth();
  const navigate = useNavigate();

  const onboardingSteps: OnboardingStep[] = [
    {
      title: "Track Your Expenses",
      description: "Easily record and categorize your daily expenses to keep a clear picture of where your money goes.",
      image: "expense-tracking"
    },
    {
      title: "Set Monthly Limits",
      description: "Create budgets for different expense categories and get alerts when you're approaching your limits.",
      image: "monthly-limits"
    },
    {
      title: "Visualize Your Spending",
      description: "See colorful charts and insights about your spending habits to make smarter financial decisions.",
      image: "charts"
    }
  ];

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete onboarding and navigate to dashboard
      completeOnboarding();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const completeOnboarding = async () => {
    try {
      await updateUserOnboardingStatus(true);
      navigate('/budget-assistant');
    } catch (error) {
      console.error('Failed to update onboarding status', error);
    }
  };

  // Get the appropriate icon for each step
  const getStepIcon = (step: number) => {
    switch (step) {
      case 0:
        return <Calculator size={120} className="text-emerald-400" />;
      case 1:
        return <TrendingUp size={120} className="text-emerald-400" />;
      case 2:
        return <PieChart size={120} className="text-emerald-400" />;
      default:
        return <Calculator size={120} className="text-emerald-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center items-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-gray-800 rounded-lg shadow-lg p-8">
          <div className="flex justify-center mb-8">
            {getStepIcon(currentStep)}
          </div>
          
          <h2 className="text-2xl font-bold text-center text-white mb-4">
            {onboardingSteps[currentStep].title}
          </h2>
          
          <p className="text-gray-300 text-center mb-8">
            {onboardingSteps[currentStep].description}
          </p>
          
          {/* Progress dots */}
          <div className="flex justify-center mb-8">
            {onboardingSteps.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full mx-1 ${
                  index === currentStep ? 'bg-emerald-500' : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
          
          <div className="flex justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className={`flex items-center px-4 py-2 rounded-md ${
                currentStep === 0 
                  ? 'text-gray-500 cursor-not-allowed' 
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              <ChevronLeft size={20} />
              <span className="ml-1">Previous</span>
            </button>
            
            <button
              onClick={handleNext}
              className="flex items-center bg-emerald-500 hover:bg-emerald-600 text-white font-medium px-4 py-2 rounded-md transition-colors duration-200"
            >
              <span className="mr-1">
                {currentStep < onboardingSteps.length - 1 ? 'Next' : 'Get Started'}
              </span>
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
        
        {/* Skip button */}
        <div className="text-center mt-4">
          <button
            onClick={completeOnboarding}
            className="text-gray-400 hover:text-white text-sm"
          >
            Skip Onboarding
          </button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;