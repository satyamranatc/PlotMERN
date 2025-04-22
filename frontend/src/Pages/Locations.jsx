import React,{useState,useEffect} from 'react'
import axios from "axios"

export default function Locations() {
    let [Locations,setLocations] = useState([]);
    useEffect(()=>{

        async function getLocations() {
            let Res = await axios.get("http://localhost:5500/api/location");
            setLocations(Res.data);
            console.log(Res.data);
        }
        getLocations();

    },[])
  return (
    <div>
        {
            Locations.map((e)=>(
                <div>
                    <img src={e.cityPoster} alt="" />
                    <h2>{e.cityName}</h2>
                    {
                        e.totalProperties.map((p)=>(
                            <h2>{p.propertyName}</h2>
                        ))
                    }
                </div>
            ))
        }
    </div>
  )
}
