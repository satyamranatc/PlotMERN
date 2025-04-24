import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavBar from './Components/NavBar'

import LocationAdmin from './Pages/LocationAdmin.jsx'
import PropertieAdmin from './Pages/PropertiesAdmin.jsx'


function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={<LocationAdmin />} />
          <Route path="/propertieAdmin" element={<PropertieAdmin />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App