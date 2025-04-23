import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from "axios"
import { MapPin, Home, Loader, ArrowLeft, Tag, Building, IndianRupee } from "lucide-react"

export default function LocationDetails() {
    const { id } = useParams();
    const [location, setLocation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function getLocationDetails() {
            try {
                const response = await axios.get(`http://localhost:5500/api/location/${id}`);
                setLocation(response.data);
                setLoading(false);
                console.log(response.data);
            } catch (err) {
                console.error("Error fetching location details:", err);
                setError("Failed to fetch location details");
                setLoading(false);
            }
        }
        getLocationDetails();
    }, [id]);

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

    if (!location) return (
        <div className="flex items-center justify-center h-screen">
            <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
                <h2 className="text-xl font-semibold text-yellow-700">Not Found</h2>
                <p className="text-yellow-600 mt-2">Location not found</p>
            </div>
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="mb-8">
                <Link to="/locations" className="inline-flex items-center text-indigo-600 hover:text-indigo-700 font-medium">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to All Locations
                </Link>
            </div>

            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl overflow-hidden mb-12">
                <div className="relative h-64 md:h-80">
                    <img 
                        src={location.cityPoster} 
                        alt={location.cityName} 
                        className="w-full h-full object-cover opacity-60"
                    />
                    <div className="absolute inset-0 flex flex-col justify-end p-8 bg-gradient-to-t from-black/70 to-transparent">
                        <h1 className="text-4xl font-extrabold text-white sm:text-5xl mb-2">
                            {location.cityName}
                        </h1>
                        <div className="flex items-center text-white/90">
                            <MapPin className="h-5 w-5 mr-2" />
                            <p className="text-lg">{location.streetName}</p>
                        </div>
                        <div className="flex items-center mt-3 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full w-fit">
                            <Home className="h-5 w-5 text-white mr-2" />
                            <p className="text-white font-medium">
                                {location.totalProperties.length} {location.totalProperties.length === 1 ? 'Property' : 'Properties'} Available
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {location.totalProperties.length === 0 ? (
                <div className="text-center py-16">
                    <p className="text-xl text-gray-600">No properties available in this location at the moment.</p>
                </div>
            ) : (
                <>
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900">
                            Available Properties
                        </h2>
                        <p className="mt-4 text-xl text-gray-500 max-w-2xl mx-auto">
                            Browse through our exclusive properties in {location.cityName}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {location.totalProperties.map((property) => (
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
                                    
                                    <div className="flex items-center mb-4">
                                        <MapPin className="h-4 w-4 text-gray-500 mr-2" />
                                        <p className="text-gray-600 text-sm">{location.streetName}, {location.cityName}</p>
                                    </div>
                                    
                                    <div className="flex flex-wrap gap-3 mb-4">
                                        <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
                                            <Building className="h-4 w-4 text-gray-600 mr-1" />
                                            <span className="text-sm text-gray-700">{property.propertyType}</span>
                                        </div>
                                        <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
                                            <Tag className="h-4 w-4 text-gray-600 mr-1" />
                                            <span className="text-sm text-gray-700">ID: {property._id.substring(0, 8)}</span>
                                        </div>
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
                </>
            )}
        </div>
    );
}