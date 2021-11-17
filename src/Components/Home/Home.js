import React, {Fragment, useState, useEffect} from 'react'
// import data from '../../app/data/data.json'
import { Card, Modal, Button } from 'antd';
import "./Home.scss";
import PassengerImage from './Passengers/PassengerImage';
import Passenger from './Detail/Passenger';
import UserDetail from './Detail/UserDetail';
import axios from 'axios';

export default function Home(props) {

    const [data, setdata] = useState([])
    // Similaire à componentDidMount et componentDidUpdate :
  useEffect(() => {
    // Met à jour le titre du document via l’API du navigateur
    axios.get(`https://wxv4hpv0o8.execute-api.eu-central-1.amazonaws.com/Prod/getdata`, {'Authorization':localStorage.getItem('token')})
      .then(res => {
        console.log(res.data)
        setdata(res.data)
      })
  },[]);
    

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

    if (data.length === 0) {
        return <p>chargement</p>
    }

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
                            <Modal title="Details" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                            <section id='detail'>
                                <div className="detail-child">
                                    {
                                        el.trip.passengers.map((passenger, index) => {
                                            return ( 
                                                <Passenger 
                                                index={index}
                                                status={passenger.Status}
                                                email= {passenger.email}/>
                                            )
                                        } ) 
                                    }
                                </div>
                                <div className="detail-child">
                                    <UserDetail detail={el.trip}/>
                                </div>
                            </section>
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


