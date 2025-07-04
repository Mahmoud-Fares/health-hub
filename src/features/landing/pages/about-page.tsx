import React from 'react';
import { Award, Users, BookOpen, Heart, Smile, Coffee } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="pt-28 pb-20">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About HealthHub
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            We're on a mission to make evidence-based nutrition accessible to everyone and empower healthier lives through education and personalized guidance.
          </p>
        </div>
        
        {/* Our Story */}
        <div className="flex flex-col md:flex-row items-center gap-12 mb-20">
          <div className="md:w-1/2">
            <img 
              src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg" 
              alt="HealthHub team" 
              className="rounded-xl shadow-lg w-full h-auto"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <p className="text-gray-700 mb-4">
              HealthHub was founded in 2020 by a team of registered dietitians, nutritionists, and health coaches who saw a critical gap in nutrition education and personalized wellness support.
            </p>
            <p className="text-gray-700 mb-4">
              In a world of fad diets and conflicting nutrition advice, we set out to create a platform that provides clear, science-based guidance tailored to individual needs and goals.
            </p>
            <p className="text-gray-700">
              Today, we're proud to have helped thousands of clients transform their relationship with food, improve their health markers, and develop sustainable eating habits that support their unique lifestyles.
            </p>
          </div>
        </div>
        
        {/* Our Values */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ValueCard 
              icon={<BookOpen className="text-blue-600" size={32} />}
              title="Evidence-Based Approach"
              description="We base all our recommendations on the latest scientific research and proven nutrition principles."
            />
            <ValueCard 
              icon={<Users className="text-blue-600" size={32} />}
              title="Personalized Guidance"
              description="We recognize that nutrition is not one-size-fits-all and tailor our advice to individual needs and goals."
            />
            <ValueCard 
              icon={<Heart className="text-blue-600" size={32} />}
              title="Holistic Wellness"
              description="We consider the whole person—physical, mental, and emotional health—in our approach to nutrition."
            />
            <ValueCard 
              icon={<Award className="text-blue-600" size={32} />}
              title="Professional Excellence"
              description="We maintain the highest standards of expertise, ethics, and continuing education in our field."
            />
            <ValueCard 
              icon={<Smile className="text-blue-600" size={32} />}
              title="Positive Relationship with Food"
              description="We promote enjoyable, sustainable eating habits rather than restrictive diets or quick fixes."
            />
            <ValueCard 
              icon={<Coffee className="text-blue-600" size={32} />}
              title="Accessibility"
              description="We strive to make quality nutrition guidance available to people of all backgrounds and circumstances."
            />
          </div>
        </div>
        
      
        {/* Our Approach */}
        <div className="bg-blue-50 p-8 md:p-12 rounded-2xl">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Our Approach</h2>
            <p className="text-gray-700 mb-6">
              At HealthHub, we believe that good nutrition should be accessible, enjoyable, and sustainable. Our approach is centered on these key principles:
            </p>
            
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Individualized Plans</h3>
                <p className="text-gray-700">
                  We recognize that each person has unique nutritional needs, preferences, and goals. That's why we create customized plans rather than one-size-fits-all solutions.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Education First</h3>
                <p className="text-gray-700">
                  We empower our clients with knowledge about nutrition science, helping them understand the 'why' behind our recommendations so they can make informed choices.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Sustainable Habits</h3>
                <p className="text-gray-700">
                  We focus on gradual, lasting changes rather than quick fixes. Our goal is to help you develop eating habits that you can maintain for life.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Whole-Person Wellness</h3>
                <p className="text-gray-700">
                  We consider all aspects of health—physical, mental, and emotional—in our approach to nutrition, recognizing that these elements are deeply interconnected.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ValueCard = ({ 
  icon, 
  title, 
  description 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
}) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
    <div className="mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
    <p className="text-gray-700">{description}</p>
  </div>
);



export default AboutPage;