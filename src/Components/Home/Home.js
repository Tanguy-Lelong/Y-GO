import React, {Fragment, useState} from 'react'
import data from '../../app/data/data.json'
import { Card, Modal, Button } from 'antd';
import "./Home.scss";
import PassengerImage from './Passengers/PassengerImage';


export default function Home(props) {


    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    // const PassengersFun = (passengers, maxPassengers) => {
    // // !accepted passenger
    //   const accepted = passengers.filter( passengers => {
    //        return passengers.Status != "pending"
    //    } )
    // // !accepted passenger number
    //    const acceptedNumber = accepted.length;
    // // !accepted passenger image
    //   const acceptedImg = Array(accepted.length).fill(null).map( () => {
    //     return (
    //         <img className="passenger-img" src="https://cdn-icons-png.flaticon.com/512/1042/1042260.png"/>
    //     )
    //     })
    // // ! the availlable passenger places 
    //     let emptyPassenger;

    //     if (maxPassengers >= acceptedNumber) {
    //         emptyPassenger =  Array((maxPassengers - acceptedNumber)).fill(null).map( () => {
    //             return (
    //                 <img className="passenger-img" src="https://image.flaticon.com/icons/png/512/1042/1042311.png"/>
    //             )
    //         }) 
    //     } else {
    //         emptyPassenger = null
    //     }
    //    return {image :acceptedImg , emptyImage: emptyPassenger, number : acceptedNumber};
    // }

    return (
        <div id="parent-home">
         <div className="site-card-border-less-wrapper">
            {
                data.map( (el) => {
                    console.log('the data', el);
                    return (
                        <Fragment>
                            <Card  onClick={showModal} title="Ygo" bordered={false} style={{ width: "30%"}}>
                                    <p><span className="homeKey">Ville depart:</span> {el.departureCity}</p>
                                    <p><span className="homeKey">Ville d'arriver:</span> {el.trip.arrivingCity}</p>
                                    <p><span className="homeKey">heure depart:</span> {el.trip.timeDeparture}</p>
                                    <div className="image-container">
                                        
                                            {/* PassengersFun(el.trip.passengers, el.trip.maxPassengers).image */}
                                            <PassengerImage type="full" passengers={el.trip.passengers} maxPassengers= {el.trip.maxPassengers}/>
                                            <PassengerImage type="empty" passengers={el.trip.passengers} maxPassengers= {el.trip.maxPassengers}/>

                                            {/* {PassengersFun(el.trip.passengers, el.trip.maxPassengers).emptyImage} */}
                                    </div>

                            </Card>
                            <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                                    {
                                        el.trip.passengers.map((passenger, index) => {
                                            return (
                                                <Fragment>
                                                <h3>{`passenger ${index}`}</h3>
                                                <ul>
                                                    <li>{passenger.Status}</li>
                                                    <li>{passenger.email}</li>
                                                </ul>
                                                </Fragment>
                                            )
                                        } )
                                    }
                            </Modal>
                            <Button style={{display: "none"}} type="primary" onClick={showModal}>
                                Open Modal
                            </Button>
                        </Fragment>
                )
                } )
            }
        </div>
        </div>
    )
}


