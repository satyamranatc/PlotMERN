import React, { useState, useEffect } from 'react'
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import { MapPin, Home, Loader, Building, IndianRupee, Tag, Filter } from "lucide-react"

export default function Properties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  let navigate = useNavigate()
  const [filters, setFilters] = useState({
    propertyType: 'all',
    priceRange: 'all'
  });

  useEffect(() => {
    async function getPropertiesDetails() {
      try {
        const response = await axios.get(`http://localhost:5500/api/properties/`);
        setProperties(response.data);
        setLoading(false);
        console.log(response.data);
      } catch (err) {
        console.error("Error fetching properties details:", err);
        setError("Failed to fetch properties details");
        setLoading(false);
      }
    }
    getPropertiesDetails();
  }, []);

  const filterProperties = () => {
    let filtered = [...properties];
    
    if (filters.propertyType !== 'all') {
      filtered = filtered.filter(property => property.propertyType === filters.propertyType);
    }
    
    if (filters.priceRange !== 'all') {
      switch (filters.priceRange) {
        case 'low':
          filtered = filtered.filter(property => property.propertyPrice < 5000000);
          break;
        case 'medium':
          filtered = filtered.filter(property => property.propertyPrice >= 5000000 && property.propertyPrice < 10000000);
          break;
        case 'high':
          filtered = filtered.filter(property => property.propertyPrice >= 10000000);
          break;
        default:
          break;
      }
    }
    
    return filtered;
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Get unique property types for filter dropdown
  const propertyTypes = properties.length > 0 
    ? ['all', ...new Set(properties.map(p => p.propertyType))]
    : ['all'];

  const filteredProperties = properties.length > 0 ? filterProperties() : [];

  if (loading) return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <Loader className="h-12 w-12 animate-spin text-indigo-600 mx-auto" />
        <p className="mt-4 text-lg text-gray-700">Loading properties...</p>
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
          All Properties
        </h1>
        <p className="mt-4 text-xl text-gray-500 max-w-2xl mx-auto">
          Discover our exclusive properties across all locations
        </p>
      </div>

      {/* Filters */}
      <div className="mb-10 bg-white p-6 rounded-xl shadow-md">
        <div className="flex items-center mb-4">
          <Filter className="h-5 w-5 text-indigo-600 mr-2" />
          <h2 className="text-lg font-medium text-gray-900">Filter Properties</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700 mb-1">
              Property Type
            </label>
            <select
              id="propertyType"
              name="propertyType"
              value={filters.propertyType}
              onChange={handleFilterChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {propertyTypes.map(type => (
                <option key={type} value={type}>
                  {type === 'all' ? 'All Types' : type}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="priceRange" className="block text-sm font-medium text-gray-700 mb-1">
              Price Range
            </label>
            <select
              id="priceRange"
              name="priceRange"
              value={filters.priceRange}
              onChange={handleFilterChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All Prices</option>
              <option value="low">Under ₹50 Lakhs</option>
              <option value="medium">₹50 Lakhs - ₹1 Crore</option>
              <option value="high">Above ₹1 Crore</option>
            </select>
          </div>
        </div>
      </div>

      {filteredProperties.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-xl">
          <Home className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-700 mb-2">No properties found</h3>
          <p className="text-gray-500">Try adjusting your filters to see more results</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.map((property) => (
            <div 
              key={property._id} 
              className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="relative h-60">
                <img 
                  src={property.propertyPoster} 
                  alt={property.propertyName} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4">
                  <span className="bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {property.propertyType}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{property.propertyName}</h3>
                
                {property.Location && (
                  <div className="flex items-center mb-4">
                    <MapPin className="h-4 w-4 text-gray-500 mr-2" />
                    <p className="text-gray-600 text-sm">
                      {property.Location.streetName}, {property.Location.cityName}
                    </p>
                  </div>
                )}
                
                <div className="flex flex-wrap gap-3 mb-4">
                  <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
                    <Building className="h-4 w-4 text-gray-600 mr-1" />
                    <span className="text-sm text-gray-700">{property.propertyType}</span>
                  </div>
                  <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
                    <Tag className="h-4 w-4 text-gray-600 mr-1" />
                    <span className="text-sm text-gray-700">ID: {property._id.substring(0, 8)}</span>
                  </div>
                  {property.Location && (
                    <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
                      <MapPin className="h-4 w-4 text-gray-600 mr-1" />
                      <span onClick={(()=>{
                        navigate(`/locations/${property.Location._id}`)
                      })} className="cursor-pointer text-sm text-gray-700">{property.Location.cityName}</span>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center">
                    <IndianRupee className="h-5 w-5 text-indigo-600 mr-1" />
                    <span className="text-xl font-bold text-gray-900">
                      {property.propertyPrice.toLocaleString()}
                    </span>
                  </div>
                  
                  <Link 
                    to={`/properties/${property._id}`}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}