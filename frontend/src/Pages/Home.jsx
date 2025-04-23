import React from 'react'
import { Link } from 'react-router-dom'
import { Home as HomeIcon, Search, MapPin, Star } from 'lucide-react'

export default function Home() {
  // Featured properties - in a real app these would come from an API
  const featuredProperties = [
    {
      id: '1',
      title: 'Modern Apartment',
      location: 'Downtown',
      price: '1,250,000',
      image: '/api/placeholder/600/400',
      rating: 4.8
    },
    {
      id: '2',
      title: 'Luxury Villa',
      location: 'Beachfront',
      price: '3,450,000',
      image: '/api/placeholder/600/400',
      rating: 4.9
    },
    {
      id: '3',
      title: 'Cozy Townhouse',
      location: 'Suburban Area',
      price: '875,000',
      image: '/api/placeholder/600/400',
      rating: 4.7
    }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="py-16 md:py-24 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6">
          Find Your Dream Home
        </h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10">
          Discover exceptional properties in the most desirable locations
        </p>
        
        {/* Search Bar */}
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-4 flex flex-col md:flex-row items-center gap-4">
          <div className="flex-grow relative">
            <input
              type="text"
              placeholder="Search by location, property type..."
              className="w-full py-3 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <Search className="absolute left-3 top-3.5 text-gray-400 h-5 w-5" />
          </div>
          <button className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-8 rounded-lg transition duration-200">
            Search
          </button>
        </div>
      </div>

      {/* Featured Properties Section */}
      <div className="py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Featured Properties</h2>
          <Link to="/properties" className="text-indigo-600 hover:text-indigo-800 font-medium">
            View All
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProperties.map(property => (
            <div key={property.id} className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="relative h-56">
                <img 
                  src={property.image} 
                  alt={property.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-md text-sm font-medium text-gray-900 flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 mr-1" />
                  {property.rating}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900">{property.title}</h3>
                <div className="flex items-center mt-2 text-gray-600">
                  <MapPin className="h-4 w-4 mr-1" />
                  <p>{property.location}</p>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <p className="text-xl font-bold text-indigo-600">${property.price}</p>
                  <Link 
                    to={`/properties/${property.id}`}
                    className="text-indigo-600 hover:text-indigo-800 font-medium"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Locations Preview */}
      <div className="py-12 bg-gray-50 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">Popular Locations</h2>
            <p className="mt-4 text-lg text-gray-500">Explore our premium properties in these exclusive neighborhoods</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Downtown', 'Beachfront', 'Suburban Area', 'Countryside'].map((location, index) => (
              <div key={index} className="relative h-48 rounded-lg overflow-hidden group">
                <img 
                  src={`/api/placeholder/300/240`} 
                  alt={location} 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-lg font-bold text-white">{location}</h3>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Link 
              to="/locations"
              className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-8 rounded-lg transition duration-200"
            >
              Browse All Locations
            </Link>
          </div>
        </div>
      </div>

      {/* Feature Section */}
      <div className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Why Choose Us</h2>
          <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
            We offer premium services to help you find your perfect home
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: 'Premium Locations',
              description: 'Access to exclusive properties in the most sought-after neighborhoods',
              icon: <MapPin className="h-8 w-8 text-indigo-600" />
            },
            {
              title: 'Expert Guidance',
              description: 'Our experienced agents will guide you through every step of the process',
              icon: <HomeIcon className="h-8 w-8 text-indigo-600" />
            },
            {
              title: 'Top-Tier Support',
              description: 'Dedicated support team available 24/7 to answer all your questions',
              icon: <Star className="h-8 w-8 text-indigo-600" />
            }
          ].map((feature, index) => (
            <div key={index} className="text-center p-6">
              <div className="mx-auto mb-4 bg-indigo-100 p-3 rounded-full inline-flex items-center justify-center">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-12 mb-8 bg-indigo-100 rounded-xl -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="max-w-4xl mx-auto text-center py-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Find Your Dream Home?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Join thousands of satisfied customers who found their perfect property with us
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/properties"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-8 rounded-lg transition duration-200"
            >
              Browse Properties
            </Link>
            <Link
              to="/contact"
              className="bg-white hover:bg-gray-50 text-indigo-600 font-medium py-3 px-8 rounded-lg border border-indigo-600 transition duration-200"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}