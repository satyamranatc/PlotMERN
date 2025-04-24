import React, { useState, useEffect } from 'react';
import axios from "axios";
import { MapPin, Trash2, Edit, Loader, Plus, X, Check } from "lucide-react";

export default function LocationAdmin() {
    const [allLocations, setAllLocations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        cityPoster: '',
        cityName: '',
    });
    const [updateMode, setUpdateMode] = useState(false);
    const [currentId, setCurrentId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchLocations();
    }, []);

    async function fetchLocations() {
        setLoading(true);
        try {
            const res = await axios.get("http://localhost:5500/api/location");
            setAllLocations(res.data);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching locations:", err);
            setError("Failed to load locations. Please try again later.");
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
        setLoading(true);

        try {
            if (updateMode) {
                await axios.put(`http://localhost:5500/api/location/${currentId}`, formData);
                setUpdateMode(false);
                setCurrentId(null);
            } else {
                await axios.post("http://localhost:5500/api/location", formData);
            }
            
            // Reset form
            setFormData({ cityPoster: '', cityName: '' });
            setIsModalOpen(false);
            
            // Refresh data
            fetchLocations();
        } catch (err) {
            console.error("Error saving location:", err);
            setError("Failed to save location. Please try again.");
            setLoading(false);
        }
    }

    async function handleDelete(id) {
        if (window.confirm("Are you sure you want to delete this location?")) {
            setLoading(true);
            try {
                await axios.delete(`http://localhost:5500/api/location/${id}`);
                fetchLocations();
            } catch (err) {
                console.error("Error deleting location:", err);
                setError("Failed to delete location. Please try again.");
                setLoading(false);
            }
        }
    }

    function handleUpdate(location) {
        setUpdateMode(true);
        setCurrentId(location._id);
        setFormData({
            cityPoster: location.cityPoster,
            cityName: location.cityName
        });
        setIsModalOpen(true);
    }

    function openAddModal() {
        setUpdateMode(false);
        setCurrentId(null);
        setFormData({ cityPoster: '', cityName: '' });
        setIsModalOpen(true);
    }

    if (loading && allLocations.length === 0) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-center">
                    <Loader className="h-12 w-12 animate-spin text-indigo-600 mx-auto" />
                    <p className="mt-4 text-lg text-gray-700">Loading locations...</p>
                </div>
            </div>
        );
    }

    if (error && allLocations.length === 0) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="bg-red-50 p-6 rounded-lg border border-red-200">
                    <h2 className="text-xl font-semibold text-red-700">Error</h2>
                    <p className="text-red-600 mt-2">{error}</p>
                    <button 
                        onClick={() => fetchLocations()}
                        className="mt-4 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Header */}
            <div className="mb-12">
                <h1 className="text-3xl font-bold text-gray-900">Location Management</h1>
                <p className="mt-2 text-gray-600">Manage city locations and their properties</p>
            </div>

            {/* Error Alert */}
            {error && (
                <div className="mb-6 bg-red-50 border-l-4 border-red-600 p-4 rounded">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <X className="h-5 w-5 text-red-600" />
                        </div>
                        <div className="ml-3">
                            <p className="text-sm text-red-600">{error}</p>
                        </div>
                        <div className="ml-auto pl-3">
                            <button onClick={() => setError(null)} className="text-red-600 hover:text-red-800">
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Add City Button */}
            <div className="mb-8">
                <button 
                    onClick={openAddModal}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg flex items-center shadow-md"
                >
                    <Plus className="h-5 w-5 mr-2" />
                    Add New Location
                </button>
            </div>

            {/* Location Table */}
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Preview</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">City Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Properties</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {allLocations.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                                        No locations found. Add your first location!
                                    </td>
                                </tr>
                            ) : (
                                allLocations.map((location) => (
                                    <tr key={location._id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {location._id.substring(0, 8)}...
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="h-12 w-12 rounded-md overflow-hidden">
                                                <img 
                                                    src={location.cityPoster} 
                                                    alt={location.cityName}
                                                    className="h-full w-full object-cover" 
                                                    onError={(e) => {e.target.src = "/api/placeholder/48/48"}}
                                                />
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <MapPin className="h-4 w-4 text-indigo-600 mr-2" />
                                                <span className="text-sm font-medium text-gray-900">{location.cityName}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-3 py-1 inline-flex text-sm leading-5 font-medium rounded-full bg-green-100 text-green-800">
                                                {location.totalProperties ? location.totalProperties.length : 0} Properties
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="flex space-x-2">
                                                <button 
                                                    onClick={() => handleUpdate(location)}
                                                    className="bg-amber-100 text-amber-700 hover:bg-amber-200 p-2 rounded"
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </button>
                                                <button 
                                                    onClick={() => handleDelete(location._id)}
                                                    className="bg-red-100 text-red-700 hover:bg-red-200 p-2 rounded"
                                                >
                                                    <Trash2 className="h-4 w-4" />
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
            {loading && allLocations.length > 0 && (
                <div className="fixed bottom-4 right-4 bg-white p-3 rounded-full shadow-lg">
                    <Loader className="h-6 w-6 animate-spin text-indigo-600" />
                </div>
            )}

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={() => setIsModalOpen(false)}></div>
                        </div>

                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                                            {updateMode ? 'Update Location' : 'Add New Location'}
                                        </h3>
                                        
                                        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                                            <div>
                                                <label htmlFor="cityPoster" className="block text-sm font-medium text-gray-700">City Poster URL</label>
                                                <input 
                                                    type="text" 
                                                    id="cityPoster"
                                                    name="cityPoster"
                                                    value={formData.cityPoster}
                                                    onChange={handleInputChange}
                                                    placeholder="Enter image URL for city poster"
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                                    required
                                                />
                                            </div>
                                            
                                            <div>
                                                <label htmlFor="cityName" className="block text-sm font-medium text-gray-700">City Name</label>
                                                <input 
                                                    type="text" 
                                                    id="cityName"
                                                    name="cityName"
                                                    value={formData.cityName}
                                                    onChange={handleInputChange}
                                                    placeholder="Enter city name"
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                                    required
                                                />
                                            </div>
                                            
                                            <div className="mt-8 flex justify-end">
                                                <button
                                                    type="button"
                                                    onClick={() => setIsModalOpen(false)}
                                                    className="mr-3 inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    type="submit"
                                                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                >
                                                    <Check className="h-4 w-4 mr-2" />
                                                    {updateMode ? 'Update' : 'Save'}
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}