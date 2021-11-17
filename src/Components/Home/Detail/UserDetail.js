import React, { Fragment } from 'react'

export default function UserDetail(props) {
    return (
        <Fragment>
            <a href={`tel:${props.detail.phone}`}><span style={{fontWeight:'bold', textDecoration: 'none', 'color':'black'}}>Phone number: </span>{props.detail.phone}</a>
            <p>This is the user detail page</p>
        </Fragment>
    )
}
