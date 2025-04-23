import React, { useState, useEffect } from 'react'
import axios from "axios"
import { Link } from "react-router-dom"
import { MapPin, Home, Loader } from "lucide-react"

export default function Locations() {
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function getLocations() {
            try {
                const response = await axios.get("http://localhost:5500/api/location");
                setLocations(response.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching locations:", err);
                setError("Failed to fetch locations");
                setLoading(false);
            }
        }
        getLocations();
    }, []);

    if (loading) return (
        <div className="flex items-center justify-center h-screen">
            <div className="text-center">
                <Loader className="h-12 w-12 animate-spin text-indigo-600 mx-auto" />
                <p className="mt-4 text-lg text-gray-700">Loading locations...</p>
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
                    Discover Our Locations
                </h1>
                <p className="mt-4 text-xl text-gray-500 max-w-2xl mx-auto">
                    Browse through our premium properties in these exclusive neighborhoods
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {locations.map((location) => (
                    <div 
                        key={location._id} 
                        className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:shadow-xl hover:-translate-y-1"
                    >
                        <div className="relative h-64">
                            <img 
                                src={location.cityPoster} 
                                alt={location.cityName} 
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                            <div className="absolute bottom-4 left-4 right-4">
                                <h2 className="text-2xl font-bold text-white">{location.cityName}</h2>
                                <div className="flex items-center mt-1 text-white/90">
                                    <MapPin className="h-4 w-4 mr-1" />
                                    <p className="text-sm">{location.streetName}</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-6">
                            <div className="flex items-center mb-4">
                                <Home className="h-5 w-5 text-indigo-600 mr-2" />
                                <p className="text-gray-700 font-medium">
                                    {location.totalProperties.length} {location.totalProperties.length === 1 ? 'Property' : 'Properties'} Available
                                </p>
                            </div>
                            
                            <Link 
                                to={`/locations/${location._id}`}
                                className="block w-full text-center bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200"
                            >
                                View Properties
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            {locations.length === 0 && (
                <div className="text-center py-16">
                    <p className="text-xl text-gray-600">No locations available at the moment.</p>
                </div>
            )}
        </div>
    );
}