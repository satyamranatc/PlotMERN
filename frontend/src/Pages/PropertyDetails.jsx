import React, { useState, useEffect } from 'react'
import axios from "axios"
import { Link, useParams, useNavigate } from "react-router-dom"
import { 
  MapPin, Home, Loader, Building, IndianRupee, Tag, ArrowLeft, 
  Phone, Calendar, Mail, CheckCircle, ChevronRight, Star, Users, Square
} from "lucide-react"

export default function PropertyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    async function getPropertyDetails() {
      try {
        const response = await axios.get(`http://localhost:5500/api/properties/${id}`);
        setProperty(response.data);
        setLoading(false);
        console.log(response.data);
      } catch (err) {
        console.error("Error fetching property details:", err);
        setError("Failed to fetch property details");
        setLoading(false);
      }
    }
    getPropertyDetails();
  }, [id]);

  if (loading) return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <Loader className="h-12 w-12 animate-spin text-indigo-600 mx-auto" />
        <p className="mt-4 text-lg text-gray-700">Loading property details...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-red-50 p-6 rounded-lg border border-red-200">
        <h2 className="text-xl font-semibold text-red-700">Error</h2>
        <p className="text-red-600 mt-2">{error}</p>
      </div>
    </div>
  );

  if (!property) return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
        <h2 className="text-xl font-semibold text-yellow-700">Property Not Found</h2>
        <p className="text-yellow-600 mt-2">The property you're looking for doesn't exist or has been removed.</p>
        <button 
          onClick={() => navigate('/properties')}
          className="mt-4 bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg"
        >
          Back to All Properties
        </button>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <Link to="/properties" className="inline-flex items-center text-indigo-600 hover:text-indigo-700 font-medium">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to All Properties
        </Link>
      </div>

      {/* Property Hero Section */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-10">
        <div className="relative h-80 md:h-96">
          <img 
            src={property.propertyPoster} 
            alt={property.propertyName} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
          <div className="absolute top-4 right-4">
            <span className="bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              {property.propertyType}
            </span>
          </div>
          <div className="absolute bottom-6 left-6 right-6">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{property.propertyName}</h1>
            {property.Location && (
              <div className="flex items-center text-white/90 mb-4">
                <MapPin className="h-5 w-5 mr-2" />
                <p className="text-lg">
                  {property.Location.streetName}, {property.Location.cityName}
                </p>
              </div>
            )}
            <div className="flex items-center">
              <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg">
                <div className="flex items-center text-indigo-600">
                  <IndianRupee className="h-5 w-5 mr-1" />
                  <span className="text-2xl font-bold">
                    {property.propertyPrice.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="bg-white rounded-xl shadow-lg mb-10">
        <div className="flex overflow-x-auto border-b border-gray-200">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-6 py-4 font-medium text-sm whitespace-nowrap ${
              activeTab === 'overview' 
                ? 'border-b-2 border-indigo-600 text-indigo-600' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('features')}
            className={`px-6 py-4 font-medium text-sm whitespace-nowrap ${
              activeTab === 'features' 
                ? 'border-b-2 border-indigo-600 text-indigo-600' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Features
          </button>
          <button
            onClick={() => setActiveTab('location')}
            className={`px-6 py-4 font-medium text-sm whitespace-nowrap ${
              activeTab === 'location' 
                ? 'border-b-2 border-indigo-600 text-indigo-600' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Location
          </button>
          <button
            onClick={() => setActiveTab('contact')}
            className={`px-6 py-4 font-medium text-sm whitespace-nowrap ${
              activeTab === 'contact' 
                ? 'border-b-2 border-indigo-600 text-indigo-600' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Contact Agent
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'overview' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Property Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                  <Building className="h-8 w-8 text-indigo-600 mr-4" />
                  <div>
                    <p className="text-sm text-gray-500">Property Type</p>
                    <p className="font-medium text-gray-900">{property.propertyType}</p>
                  </div>
                </div>
                <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                  <Square className="h-8 w-8 text-indigo-600 mr-4" />
                  <div>
                    <p className="text-sm text-gray-500">Property ID</p>
                    <p className="font-medium text-gray-900">{property._id.substring(0, 8)}</p>
                  </div>
                </div>
                <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                  <MapPin className="h-8 w-8 text-indigo-600 mr-4" />
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-medium text-gray-900">
                      {property.Location ? property.Location.cityName : 'N/A'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="prose max-w-none">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-700">
                  This beautiful {property.propertyType} in {property.Location ? property.Location.cityName : ''} 
                  offers a perfect blend of comfort and luxury. Located in the prime area of 
                  {property.Location ? ' ' + property.Location.streetName : ''}, this property provides
                  excellent connectivity and access to all essential amenities.
                </p>
                <p className="text-gray-700 mt-4">
                  With a competitive price of ₹{property.propertyPrice.toLocaleString()}, this property
                  represents an excellent investment opportunity in one of the most
                  promising real estate markets.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'features' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Property Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Prime Location</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Excellent Connectivity</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Near to Schools</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Shopping Centers Nearby</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Medical Facilities</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Parks and Recreation</span>
                </div>
                {property.propertyType === 'Plot' && (
                  <>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                      <span className="text-gray-700">Clear Legal Title</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                      <span className="text-gray-700">Ready for Construction</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {activeTab === 'location' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Location Information</h2>
              {property.Location && (
                <div className="mb-6">
                  <div className="flex items-center mb-2">
                    <MapPin className="h-5 w-5 text-indigo-600 mr-2" />
                    <h3 className="text-lg font-medium text-gray-900">
                      {property.Location.streetName}, {property.Location.cityName}
                    </h3>
                  </div>
                  <p className="text-gray-700">
                    Located in the beautiful area of {property.Location.streetName} in {property.Location.cityName}, 
                    this property offers excellent connectivity to major city landmarks.
                  </p>
                </div>
              )}

              <div className="bg-gray-100 p-4 rounded-lg mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Nearby Amenities</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <ChevronRight className="h-4 w-4 text-indigo-600 mr-2" />
                    <span className="text-gray-700">Shopping Centers (0.5 km)</span>
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="h-4 w-4 text-indigo-600 mr-2" />
                    <span className="text-gray-700">Schools & Colleges (1 km)</span>
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="h-4 w-4 text-indigo-600 mr-2" />
                    <span className="text-gray-700">Hospitals (2 km)</span>
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="h-4 w-4 text-indigo-600 mr-2" />
                    <span className="text-gray-700">Public Transportation (0.3 km)</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">Map location preview would appear here</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'contact' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Property Agent</h2>
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <div className="flex items-center mb-4">
                  <div className="h-16 w-16 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
                    <Users className="h-8 w-8 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Property Specialist</h3>
                    <div className="flex items-center text-yellow-500">
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                      <span className="ml-1 text-sm text-gray-500">(25 reviews)</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-indigo-600 mr-3" />
                    <span className="text-gray-700">+91 98765 43210</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-indigo-600 mr-3" />
                    <span className="text-gray-700">agent@property.com</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-indigo-600 mr-3" />
                    <span className="text-gray-700">Available Mon-Sat, 9:00 AM - 6:00 PM</span>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Send Message</h3>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Enter your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder={`I'm interested in ${property.propertyName} and would like more information.`}
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200"
                  >
                    Send Inquiry
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Similar Properties Suggestion */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Similar Properties</h2>
          <Link 
            to="/properties" 
            className="text-indigo-600 hover:text-indigo-700 font-medium flex items-center"
          >
            View All
            <ChevronRight className="h-5 w-5 ml-1" />
          </Link>
        </div>

        <div className="text-center py-16 bg-gray-50 rounded-xl">
          <Home className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-700 mb-2">Similar properties will be displayed here</h3>
          <p className="text-gray-500">Based on location, type, and price range</p>
        </div>
      </div>
    </div>
  );
}