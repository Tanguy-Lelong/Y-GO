import React, {Fragment} from 'react'

export default function Passenger(props) {

    return (
        <Fragment>
             <div>
                <h3>{`passenger ${props.index}`}</h3>
                <ul>
                    <li>{props.status}</li>
                    <li>{props.email}</li>
                </ul>
            </div>
            <div>
                
            </div>
        </Fragment>
    )
}
