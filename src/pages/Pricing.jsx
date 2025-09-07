import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Check, Star, Zap, Shield, Users } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Pricing = () => {
  const { plans, isAuthenticated } = useAuth();
  const location = useLocation();

  // Parse query param for selected plan
  const queryParams = new URLSearchParams(location.search);
  const selectedPlanSlug = queryParams.get('plan');

  // Refs for scrolling to selected plan
  const planRefs = useRef({});

  // Scroll to selected plan on mount/update
  useEffect(() => {
    if (selectedPlanSlug && planRefs.current[selectedPlanSlug]) {
      planRefs.current[selectedPlanSlug].scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [selectedPlanSlug]);

  const handleSelectPlan = (planId) => {
    if (!isAuthenticated) {
      window.location.href = `/register?plan=${planId}`;
    } else {
      console.log('Subscribe to plan:', planId);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-6">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Select the perfect plan for your business needs. All plans include
            our core features with varying limits and support levels.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => {
            const isSelected = plan.slug === selectedPlanSlug;

            return (
              <div
                key={plan.id}
                ref={(el) => (planRefs.current[plan.slug] = el)}
                className={`relative bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl p-8 border transition-all duration-300 hover:scale-105 ${
                  plan.popular
                    ? 'border-blue-500 ring-2 ring-blue-500 ring-opacity-50'
                    : 'border-white/20 hover:border-blue-300'
                } ${isSelected ? 'ring-4 ring-yellow-400' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center space-x-1 shadow-lg">
                      <Star className="h-4 w-4" />
                      <span>Most Popular</span>
                    </div>
                  </div>
                )}

                <div className="text-center mb-8">
                  <div
                    className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center ${
                      index === 0
                        ? 'bg-gradient-to-r from-green-400 to-green-500'
                        : index === 1
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600'
                        : 'bg-gradient-to-r from-purple-500 to-purple-600'
                    }`}
                  >
                    {index === 0 ? (
                      <Zap className="h-8 w-8 text-white" />
                    ) : index === 1 ? (
                      <Users className="h-8 w-8 text-white" />
                    ) : (
                      <Shield className="h-8 w-8 text-white" />
                    )}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-gray-800">
                      ${plan.price}
                    </span>
                    <span className="text-gray-600">/{plan.interval}</span>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <div
                      key={featureIndex}
                      className="flex items-center space-x-3"
                    >
                      <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Check className="h-3 w-3 text-green-600" />
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => handleSelectPlan(plan.id)}
                  className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-lg'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  {isAuthenticated ? 'Upgrade Now' : 'Get Started'}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Pricing;
