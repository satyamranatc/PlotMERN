import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavBar from './Components/NavBar'
import Home from './Pages/Home'
import Locations from './Pages/Locations'
import LocationDetails from './Pages/LocationDetails'
import Properties from './Pages/Properties'
import PropertyDetails from './Pages/PropertyDetails'

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/locations" element={<Locations />} />
          <Route path="/locations/:id" element={<LocationDetails />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/properties/:id" element={<PropertyDetails />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App