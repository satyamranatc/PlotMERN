import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Home, Trash2, Edit, Loader, Plus, X, Check, Image, AlertCircle, DollarSign, MapPin } from "lucide-react";

export default function PropertiesAdmin() {
  const [allLocations, setAllLocations] = useState([]);
  const [allProperties, setAllProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateMode, setUpdateMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  
  const [formData, setFormData] = useState({
    propertyPoster: '',
    propertyName: '',
    propertyType: 'Plot',
    propertyPrice: '',
    Location: ''
  });

  useEffect(() => {
    fetchLocations();
    fetchProperties();
  }, []);
  
  // Set preview image when propertyPoster changes
  useEffect(() => {
    if (formData.propertyPoster) {
      setPreviewImage(formData.propertyPoster);
    } else {
      setPreviewImage(null);
    }
  }, [formData.propertyPoster]);

  async function fetchLocations() {
    try {
      const res = await axios.get("http://localhost:5500/api/location");
      setAllLocations(res.data);
    } catch (err) {
      console.error("Error fetching locations:", err);
      setError("Failed to load locations. Please try again later.");
    }
  }
  
  async function fetchProperties() {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5500/api/properties");
      setAllProperties(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching properties:", err);
      setError("Failed to load properties. Please try again later.");
      setLoading(false);
    }
  }
  
  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }
  
  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitLoading(true);

    try {
      if (updateMode) {
        await axios.put(`http://localhost:5500/api/properties/${currentId}`, formData);
        setUpdateMode(false);
        setCurrentId(null);
      } else {
        await axios.post("http://localhost:5500/api/properties", formData);
      }
      
      // Reset form
      setFormData({ 
        propertyPoster: '',
        propertyName: '',
        propertyType: 'Plot',
        propertyPrice: '',
        Location: ''
      });
      setIsModalOpen(false);
      setPreviewImage(null);
      
      // Refresh data
      fetchProperties();
    } catch (err) {
      console.error("Error saving property:", err);
      setError("Failed to save property. Please try again.");
    } finally {
      setSubmitLoading(false);
    }
  }
  
  async function handleDelete(id) {
    if (window.confirm("Are you sure you want to delete this property?")) {
      setLoading(true);
      try {
        await axios.delete(`http://localhost:5500/api/properties/${id}`);
        fetchProperties();
      } catch (err) {
        console.error("Error deleting property:", err);
        setError("Failed to delete property. Please try again.");
        setLoading(false);
      }
    }
  }
  
  function handleUpdate(property) {
    setUpdateMode(true);
    setCurrentId(property._id);
    setFormData({
      propertyPoster: property.propertyPoster,
      propertyName: property.propertyName,
      propertyType: property.propertyType,
      propertyPrice: property.propertyPrice,
      Location: property.Location
    });
    setPreviewImage(property.propertyPoster);
    setIsModalOpen(true);
  }
  
  function openAddModal() {
    setUpdateMode(false);
    setCurrentId(null);
    setFormData({ 
      propertyPoster: '',
      propertyName: '',
      propertyType: 'Plot',
      propertyPrice: '',
      Location: allLocations.length > 0 ? allLocations[0]._id : ''
    });
    setPreviewImage(null);
    setIsModalOpen(true);
  }
  
  function handleImageError() {
    setPreviewImage("/api/placeholder/150/150");
  }
  
  function getLocationNameById(id) {
    const location = allLocations.find(loc => loc._id === id);
    return location ? location.cityName : 'Unknown Location';
  }

  function formatPrice(price) {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  }
  
  if (loading && allProperties.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <Loader className="h-12 w-12 animate-spin text-indigo-600 mx-auto" />
          <p className="mt-4 text-lg text-gray-700">Loading properties...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-6 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-gray-900">Property Management</h1>
          <p className="mt-2 text-gray-600">Manage property listings and details</p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-600 p-4 rounded shadow-sm">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-red-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-red-600">{error}</p>
              </div>
              <div className="ml-auto pl-3">
                <button onClick={() => setError(null)} className="text-red-600 hover:text-red-800 transition duration-200">
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add Property Button */}
        <div className="mb-6">
          <button 
            onClick={openAddModal}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg flex items-center shadow-md transition duration-200"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add New Property
          </button>
        </div>

        {/* Stats Summary */}
        <div className="mb-6 bg-white rounded-lg shadow-md p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
              <p className="text-indigo-700 font-medium">Total Properties</p>
              <p className="text-3xl font-bold text-indigo-900">{allProperties.length}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border border-green-100">
              <p className="text-green-700 font-medium">Total Value</p>
              <p className="text-3xl font-bold text-green-900">
                {formatPrice(allProperties.reduce((sum, property) => sum + (parseInt(property.propertyPrice) || 0), 0))}
              </p>
            </div>
            <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
              <p className="text-amber-700 font-medium">Locations</p>
              <p className="text-3xl font-bold text-amber-900">
                {allLocations.length}
              </p>
            </div>
          </div>
        </div>

        {/* Properties Table */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden mb-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {allProperties.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                      <Home className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                      <p className="text-lg font-medium">No properties found</p>
                      <p className="text-sm text-gray-500 mt-1">Add your first property using the button above</p>
                    </td>
                  </tr>
                ) : (
                  allProperties.map((property) => (
                    <tr key={property._id} className="hover:bg-gray-50 transition duration-150">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="h-16 w-16 rounded-md overflow-hidden shadow-sm">
                          <img 
                            src={property.propertyPoster} 
                            alt={property.propertyName}
                            className="h-full w-full object-cover" 
                            onError={(e) => {e.target.src = "/api/placeholder/48/48"}}
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Home className="h-5 w-5 text-indigo-600 mr-2" />
                          <span className="text-base font-medium text-gray-900">{property.propertyName}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-3 py-1 inline-flex text-sm leading-5 font-medium rounded-full bg-blue-100 text-blue-800">
                          {property.propertyType}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-green-700 font-medium">
                          <DollarSign className="h-4 w-4 mr-1" />
                          {formatPrice(property.propertyPrice)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 text-gray-500 mr-1" />
                          <span className="text-gray-700">{getLocationNameById(property.Location)}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-right">
                        <div className="flex space-x-2 justify-end">
                          <button 
                            onClick={() => handleUpdate(property)}
                            className="bg-amber-100 text-amber-700 hover:bg-amber-200 p-2 rounded transition duration-200"
                            title="Edit property"
                          >
                            <Edit className="h-5 w-5" />
                          </button>
                          <button 
                            onClick={() => handleDelete(property._id)}
                            className="bg-red-100 text-red-700 hover:bg-red-200 p-2 rounded transition duration-200"
                            title="Delete property"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Loading indicator when refreshing data */}
        {loading && allProperties.length > 0 && (
          <div className="fixed bottom-4 right-4 bg-white p-4 rounded-full shadow-lg">
            <Loader className="h-6 w-6 animate-spin text-indigo-600" />
          </div>
        )}

        {/* Modal */}
        {isModalOpen && (
          <div>
           <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                          {/* Image Preview */}
                          <div className="mb-4 flex flex-col items-center">
                            <div className="h-32 w-32 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50 mb-2 overflow-hidden">
                              {previewImage ? (
                                <img 
                                  src={previewImage} 
                                  alt="Preview" 
                                  className="h-full w-full object-cover"
                                  onError={handleImageError}
                                />
                              ) : (
                                <Image className="h-12 w-12 text-gray-400" />
                              )}
                            </div>
                            <p className="text-xs text-gray-500">Image Preview</p>
                          </div>
                          
                          <div>
                            <label htmlFor="propertyPoster" className="block text-sm font-medium text-gray-700">Property Poster URL</label>
                            <input
                              type="text"
                              id="propertyPoster"
                              name="propertyPoster"
                              value={formData.propertyPoster}
                              onChange={handleInputChange}
                              placeholder="Enter image URL for property"
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 border focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                              required
                            />
                          </div>
  
                          <div>
                            <label htmlFor="propertyName" className="block text-sm font-medium text-gray-700">Property Name</label>
                            <input
                              type="text"
                              id="propertyName"
                              name="propertyName"
                              value={formData.propertyName}
                              onChange={handleInputChange}
                              placeholder="Enter property name"
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 border focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                              required
                            />
                          </div>
  
                          <div>
                            <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700">Property Type</label>
                            <select
                              id="propertyType"
                              name="propertyType"
                              value={formData.propertyType}
                              onChange={handleInputChange}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 border focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                              required
                            >
                              <option value="Plot">Plot</option>
                              <option value="Flat">Flat</option>
                              <option value="Independent Home">Independent Home</option>
                            </select>
                          </div>
  
                          <div>
                            <label htmlFor="propertyPrice" className="block text-sm font-medium text-gray-700">Property Price (₹)</label>
                            <input
                              type="number"
                              id="propertyPrice"
                              name="propertyPrice"
                              value={formData.propertyPrice}
                              onChange={handleInputChange}
                              placeholder="Enter property price"
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 border focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                              required
                            />
                          </div>
  
                          <div>
                            <label htmlFor="Location" className="block text-sm font-medium text-gray-700">Property Location</label>
                            <select
                              id="Location"
                              name="Location"
                              value={formData.Location}
                              onChange={handleInputChange}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 border focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                              required
                            >
                              <option value="">Select a location</option>
                              {allLocations.map((location) => (
                                <option key={location._id} value={location._id}>
                                  {location.cityName}
                                </option>
                              ))}
                            </select>
                          </div>
                          
                          <div className="mt-8 flex justify-end">
                            <button
                              type="button"
                              onClick={() => setIsModalOpen(false)}
                              className="mr-3 inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-200"
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              disabled={submitLoading}
                              className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed transition duration-200"
                            >
                              {submitLoading ? (
                                <>
                                  <Loader className="h-4 w-4 mr-2 animate-spin" />
                                  {updateMode ? 'Updating...' : 'Saving...'}
                                </>
                              ) : (
                                <>
                                  <Check className="h-4 w-4 mr-2" />
                                  {updateMode ? 'Update' : 'Save'}
                                </>
                              )}
                            </button>
                          </div>
                        </form>
          </div>

        )}
      </div>
    </div>
  );
}