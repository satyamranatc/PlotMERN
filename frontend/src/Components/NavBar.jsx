import React from 'react'
import {HomeIcon} from "lucide-react"
import {Link} from "react-router-dom"

export default function NavBar() {
  return (
    <nav>
        <h2>The Propto</h2>
        <ul>
            <li><Link to={"/"} >Home</Link></li>
            <li><Link to={"/locations"} >Locations</Link></li>
            <li><Link to={"/properties"} >Properties</Link></li>
        </ul>
    </nav>
  )
}
