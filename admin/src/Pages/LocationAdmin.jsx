import React, { useState, useEffect } from 'react';
import axios from "axios";
import { MapPin, Trash2, Edit, Loader, Plus, X, Check, Image, AlertCircle } from "lucide-react";

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
    const [previewImage, setPreviewImage] = useState(null);
    const [submitLoading, setSubmitLoading] = useState(false);

    useEffect(() => {
        fetchLocations();
    }, []);

    // Set preview image when cityPoster changes
    useEffect(() => {
        if (formData.cityPoster) {
            setPreviewImage(formData.cityPoster);
        } else {
            setPreviewImage(null);
        }
    }, [formData.cityPoster]);

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
        setSubmitLoading(true);

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
            setPreviewImage(null);
            
            // Refresh data
            fetchLocations();
        } catch (err) {
            console.error("Error saving location:", err);
            setError("Failed to save location. Please try again.");
        } finally {
            setSubmitLoading(false);
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
        setPreviewImage(location.cityPoster);
        setIsModalOpen(true);
    }

    function openAddModal() {
        setUpdateMode(false);
        setCurrentId(null);
        setFormData({ cityPoster: '', cityName: '' });
        setPreviewImage(null);
        setIsModalOpen(true);
    }

    function handleImageError() {
        setPreviewImage("/api/placeholder/150/150");
    }

    if (loading && allLocations.length === 0) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-50">
                <div className="text-center">
                    <Loader className="h-12 w-12 animate-spin text-indigo-600 mx-auto" />
                    <p className="mt-4 text-lg text-gray-700">Loading locations...</p>
                </div>
            </div>
        );
    }

    if (error && allLocations.length === 0) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-50">
                <div className="bg-red-50 p-6 rounded-lg border border-red-200 shadow-md max-w-md w-full">
                    <div className="flex items-center">
                        <AlertCircle className="h-6 w-6 text-red-600 mr-2" />
                        <h2 className="text-xl font-semibold text-red-700">Error</h2>
                    </div>
                    <p className="text-red-600 mt-2">{error}</p>
                    <button 
                        onClick={() => fetchLocations()}
                        className="mt-4 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded w-full transition duration-200"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-6 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8 bg-white rounded-lg shadow-md p-6">
                    <h1 className="text-3xl font-bold text-gray-900">Location Management</h1>
                    <p className="mt-2 text-gray-600">Manage city locations and their properties</p>
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

                {/* Add City Button */}
                <div className="mb-6">
                    <button 
                        onClick={openAddModal}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg flex items-center shadow-md transition duration-200"
                    >
                        <Plus className="h-5 w-5 mr-2" />
                        Add New Location
                    </button>
                </div>

                {/* Stats Summary */}
                <div className="mb-6 bg-white rounded-lg shadow-md p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
                            <p className="text-indigo-700 font-medium">Total Locations</p>
                            <p className="text-3xl font-bold text-indigo-900">{allLocations.length}</p>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                            <p className="text-green-700 font-medium">Total Properties</p>
                            <p className="text-3xl font-bold text-green-900">
                                {allLocations.reduce((total, location) => 
                                    total + (location.totalProperties ? location.totalProperties.length : 0), 0)
                                }
                            </p>
                        </div>
                        <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
                            <p className="text-amber-700 font-medium">Avg Properties/Location</p>
                            <p className="text-3xl font-bold text-amber-900">
                                {allLocations.length > 0 
                                    ? Math.round(allLocations.reduce((total, location) => 
                                        total + (location.totalProperties ? location.totalProperties.length : 0), 0) / allLocations.length) 
                                    : 0
                                }
                            </p>
                        </div>
                    </div>
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
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {allLocations.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                                            <Image className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                                            <p className="text-lg font-medium">No locations found</p>
                                            <p className="text-sm text-gray-500 mt-1">Add your first location using the button above</p>
                                        </td>
                                    </tr>
                                ) : (
                                    allLocations.map((location) => (
                                        <tr key={location._id} className="hover:bg-gray-50 transition duration-150">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                <div className="font-mono">
                                                    {location._id.substring(0, 8)}...
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="h-16 w-16 rounded-md overflow-hidden shadow-sm">
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
                                                    <MapPin className="h-5 w-5 text-indigo-600 mr-2" />
                                                    <span className="text-base font-medium text-gray-900">{location.cityName}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="px-3 py-1 inline-flex text-sm leading-5 font-medium rounded-full bg-green-100 text-green-800">
                                                    {location.totalProperties ? location.totalProperties.length : 0} Properties
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-right">
                                                <div className="flex space-x-2 justify-end">
                                                    <button 
                                                        onClick={() => handleUpdate(location)}
                                                        className="bg-amber-100 text-amber-700 hover:bg-amber-200 p-2 rounded transition duration-200"
                                                        title="Edit location"
                                                    >
                                                        <Edit className="h-5 w-5" />
                                                    </button>
                                                    <button 
                                                        onClick={() => handleDelete(location._id)}
                                                        className="bg-red-100 text-red-700 hover:bg-red-200 p-2 rounded transition duration-200"
                                                        title="Delete location"
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
                {loading && allLocations.length > 0 && (
                    <div className="fixed bottom-4 right-4 bg-white p-4 rounded-full shadow-lg">
                        <Loader className="h-6 w-6 animate-spin text-indigo-600" />
                    </div>
                )}

                {/* Modal */}
                {isModalOpen && (
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
                        <label htmlFor="cityPoster" className="block text-sm font-medium text-gray-700">City Poster URL</label>
                        <input 
                            type="text" 
                            id="cityPoster"
                            name="cityPoster"
                            value={formData.cityPoster}
                            onChange={handleInputChange}
                            placeholder="Enter image URL for city poster"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 border focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 border focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            required
                        />
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
                )}
            </div>
        </div>
    );
}