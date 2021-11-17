import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from 'antd'
import './Rides.scss'
import { listRidesTest } from '../Tools'
import { BrowserRouter as Router, Link } from "react-router-dom";
export default function Rides() {
    const [listOfRides, setListOfRides] = useState(listRidesTest);
    const [selectedTripId, setSelectedTripId] = useState("")

    // useEffect(() => {
    //     axios.get("https://5d68yd1074.execute-api.eu-central-1.amazonaws.com/Prod/getdata")
    //     .then((res)=> {
    //         setListOfRides(res.data)
    //         console.log(res.data)
    //     } )
    //     // console.log('listOfRides[0] ==>', listOfRides[0].transport['L'][0])
    // }, [])

    const numberUser  = (maxUsers, booked) => {
        console.log("maxUsers", maxUsers)
        console.log('booked', booked)
        let bookedIcon = "https://image.flaticon.com/icons/png/512/1042/1042311.png"
        let tmp = [];
        for (let i = 0; i < booked; i++) {
            tmp.push(bookedIcon)
        }
        for (let i = 0; i < maxUsers - booked; i++) {
            tmp.push("https://cdn-icons-png.flaticon.com/512/1042/1042260.png")
        }
        return tmp
    }
    
    if (listOfRides.length === 0) {
        return (<div>loading</div>)
    }
    else {

 return (
     <div>
         {
             listOfRides.map(x =>
                <div>
                    {
                    x.transport.map(x => 
                    <div onClick={() => setSelectedTripId(x.idTrip)} className="rideWrapper">
                        <div>
                        {x.idTrip}
                        </div>
                        <div>
                        {x.timeDeparture}
                        </div>
                        <div>
                        {x.departureCity}
                        </div>
                        <div>
                        {x.arrivingCity}
                        </div>
                        <div>
                            {
                                x.smoking === true ? <img style={{width: "40px"}} src={"https://cdn-icons-png.flaticon.com/512/1144/1144245.png"}/>
                                : <img style={{width: "40px"}} src={"https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/No_smoking_symbol.svg/1024px-No_smoking_symbol.svg.png"}></img>
                            }
                        </div>
                        <div style={{display: "flex", flexDirection: "row", width: "100%", justifyContent: "right"}}>
                            {
                                numberUser(parseInt(x.maxPassengers), x.booking.length).map(x => 
                                <div >
                                    <img style={{width: "40px"}} src={x}/>
                                </div>)
                            }
                        </div>
                        {
                            selectedTripId === x.idTrip ? 
                            <div><Button>Rejoindre le covoiturage</Button></div> : null
                        }
                    </div>
                    )
                    }
                </div>
            )
         }
     </div>
 )
        }
}