import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Users,
  Clock,
  AlertTriangle,
  Smile,
  CheckCircle,
  FileText,
  BarChart3,
} from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: <Users className="text-blue-600 w-14 h-14" />,
      title: 'OnTime',
      description: 'Monitor foot traffic in real-time to optimize operations.',
      planSlug: 'ontime',
    },
    {
      icon: <Clock className="text-green-600 w-14 h-14" />,
      title: 'Trackr',
      description: 'Analyze how long individuals stay in certain areas.',
      planSlug: 'trackr',
    },
    {
      icon: <AlertTriangle className="text-red-600 w-14 h-14" />,
      title: 'Pulse',
      description: 'Detect unauthorized access with smart alerts.',
      planSlug: 'pulse',
    },
    {
      icon: <Smile className="text-purple-600 w-14 h-14" />,
      title: 'ParkNpay',
      description: 'Identify and verify individuals with AI accuracy.',
      planSlug: 'parknpay',
    },
  ];

  const navigate = useNavigate();
  const [clickedIndex, setClickedIndex] = useState(null);
  const [runningIndex, setRunningIndex] = useState(null);

  const handleClick = (planSlug, index) => {
    setClickedIndex(index);
    setRunningIndex(index);
    navigate(`/pricing?plan=${planSlug}`);
  };

  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden bg-gradient-to-br from-[#050B1A] via-[#0C1524] to-[#050B1A] text-white py-24">
        {/* Decorative Background Glow */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-72 h-72 bg-[#C9A44C] rounded-full blur-3xl mix-blend-screen"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#E0C37E] rounded-full blur-3xl mix-blend-screen"></div>
        </div>

        {/* Content */}
        <div className="relative container mx-auto px-6 text-center max-w-5xl">
          <h1
            className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight"
            style={{
              backgroundImage:
                'linear-gradient(90deg, #C9A44C 0%, #E0C37E 50%, #C9A44C 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              lineHeight: '1.2',
            }}
          >
            Smart Surveillance Powered by AI Smart Solutions
          </h1>

          <p className="text-lg md:text-xl mb-10 text-gray-300 leading-relaxed max-w-3xl mx-auto">
            Comprehensive business management platform that streamlines
            operations, manages employees, and provides real-time AI-based
            People Counting, Intrusion Detection, Dwell Analysis, and Face
            Recognition to enhance security and intelligence.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Link
              to="/demo"
              className="px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:scale-105 transition-transform duration-300"
              style={{
                backgroundImage:
                  'linear-gradient(90deg, #C9A44C 0%, #E0C37E 100%)',
                color: '#050B1A',
              }}
            >
              🚀 Request Demo
            </Link>
            <Link
              to="/pricing"
              className="px-8 py-4 rounded-xl font-semibold text-lg hover:scale-105 transition-all duration-300"
              style={{
                border: '2px solid #C9A44C',
                color: '#C9A44C',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#C9A44C';
                e.currentTarget.style.color = '#050B1A';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#C9A44C';
              }}
            >
              💡 Get Started Free
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-extrabold text-black mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-lg text-gray-500 max-w-3xl mx-auto leading-relaxed">
              Our platform provides all the tools you need to manage your
              business efficiently and professionally.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 perspective-1500">
            {features.map((feature, index) => (
              <button
                key={index}
                onClick={() => handleClick(feature.planSlug, index)}
                className={`
                    relative w-full h-full cursor-pointer rounded-3xl shadow-lg
                    transform-style preserve-3d transition-transform duration-500
                    focus:outline-none focus:ring-4 focus:ring-[#C9A44C]/50
                    ${
                      clickedIndex === index
                        ? 'scale-105 shadow-2xl'
                        : 'hover:scale-105 hover:shadow-2xl'
                    }
                    ${
                      index % 2 === 0
                        ? 'bg-gradient-to-tr from-[#C9A44C] to-[#E0C37E] text-[#050B1A]'
                        : 'bg-gradient-to-tr from-[#2C3E50] to-[#4A6073] text-white'
                    }
                    ${runningIndex === index ? 'running-animation' : ''}
                  `}
                aria-label={`Feature: ${feature.title}`}
                onMouseEnter={(e) => {
                  if (runningIndex !== index) {
                    e.currentTarget.style.transform =
                      'rotateY(10deg) rotateX(5deg) scale(1.05)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (runningIndex !== index) {
                    e.currentTarget.style.transform =
                      'rotateY(0deg) rotateX(0deg) scale(1)';
                  }
                }}
              >
                <div className="flex flex-col items-center text-center px-8 py-12">
                  <div className="mb-6">
                    {React.cloneElement(feature.icon, {
                      className:
                        index % 2 === 0
                          ? 'w-16 h-16 text-[#050B1A]'
                          : 'w-16 h-16 text-[#E0C37E]',
                    })}
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-base leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <style>{`
            @keyframes runningFlip {
              0% { transform: rotateY(0deg) rotateX(0deg) scale(1.05); }
              25% { transform: rotateY(15deg) rotateX(5deg) scale(1.1); }
              50% { transform: rotateY(0deg) rotateX(0deg) scale(1.05); }
              75% { transform: rotateY(-15deg) rotateX(-5deg) scale(1.1); }
              100% { transform: rotateY(0deg) rotateX(0deg) scale(1.05); }
            }

            .running-animation {
              animation: runningFlip 3s ease-in-out infinite;
              box-shadow: 0 15px 30px rgba(201, 164, 76, 0.6);
              z-index: 10;
              position: relative;
            }
          `}</style>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                Why Choose BusinessCorp?
              </h2>
              <div className="space-y-4">
                {[
                  'Intuitive admin panel for complete control',
                  'Secure user authentication and management',
                  'Professional invoice generation tools',
                  'Comprehensive employee tracking',
                  'Mobile-responsive design',
                  '24/7 customer support',
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700 text-lg">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-teal-100 p-8 rounded-2xl">
              <div className="text-center">
                <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    Ready to Get Started?
                  </h3>
                  <p className="text-gray-600">
                    Join thousands of businesses already using our platform.
                  </p>
                </div>
                <Link
                  to="/pricing"
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-block"
                >
                  Start Free Trial
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;