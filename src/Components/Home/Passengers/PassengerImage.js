import React, {Fragment, useState} from 'react'

export default function PassengerImage(props) {

    const [type, setType] = useState(props.type)
    let image;

    const PassengersFun = (passengers, maxPassengers) => {
        // !accepted passenger
          const accepted = passengers.filter( passengers => {
               return passengers.Status !== "pending"
           } )
        // !accepted passenger number
           const acceptedNumber = accepted.length;
        // !accepted passenger image
          const acceptedImg = Array(accepted.length).fill(null).map( () => {
            return (
                <img className="passenger-img" src="https://cdn-icons-png.flaticon.com/512/1042/1042260.png"/>
            )
            })
        // ! the availlable passenger places 
            let emptyPassenger;
    
            if (maxPassengers >= acceptedNumber) {
                emptyPassenger =  Array((maxPassengers - acceptedNumber)).fill(null).map( () => {
                    return (
                        <img className="passenger-img" src="https://image.flaticon.com/icons/png/512/1042/1042311.png"/>
                    )
                }) 
            } else {
                emptyPassenger = null
            }
           return {image :acceptedImg , emptyImage: emptyPassenger, number : acceptedNumber};
        }


        switch (type) {
            case "full":
                image = PassengersFun(props.passengers, props.maxPassengers).image
                break;
            case "empty":
                image = PassengersFun(props.passengers, props.maxPassengers).emptyImage
                break;
            default:
                break;
        }
       
    
    return (
        <Fragment>
            {
                image
            }
        </Fragment>
    )
}
