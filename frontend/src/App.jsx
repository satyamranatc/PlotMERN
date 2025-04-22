import React from 'react'
import NavBar from "./Components/NavBar.jsx"

import Home from "./Pages/Home.jsx"
import Locations from "./Pages/Locations.jsx"
import Properties from "./Pages/Properties.jsx"

import { BrowserRouter,Routes,Route } from 'react-router-dom'

export default function App() {
  return (
    <div>
      <BrowserRouter>
      <NavBar/>

      <Routes>

        <Route path='/' element = {<Home/>} />
        <Route path='/locations' element = {<Locations/>} />
        {/* <Route path='/loactions/:id' element = {<LocationDetails/>} /> */}
        <Route path='/Properties' element = {<Properties/>} />
        {/* <Route path='/properties/:id' element = {<propertiesDetails/>} /> */}

      </Routes>
      
      
      </BrowserRouter>
    </div>
  )
}
