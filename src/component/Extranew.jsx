import React from 'react';
import { motion } from 'framer-motion';
import { Home, Search, MapPin, Heart } from 'lucide-react';

const features = [
  {
    icon: Home,
    title: 'Explore Properties',
    description: 'Browse a wide range of properties tailored to your needs.',
  },
  {
    icon: Search,
    title: 'Advanced Search',
    description: 'Find your dream home with our powerful search filters.',
  },
  {
    icon: MapPin,
    title: 'Location Insights',
    description: 'Get detailed neighborhood and location information.',
  },
  {
    icon: Heart,
    title: 'Save Favorites',
    description: 'Save and compare your favorite properties easily.',
  },
];

const Extranew = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Features</h2>
          <p className="text-lg text-gray-600">Discover the tools to find your perfect home</p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <feature.icon className="w-12 h-12 text-blue-600 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Extranew;