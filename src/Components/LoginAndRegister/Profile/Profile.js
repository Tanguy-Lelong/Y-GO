import React, { useState } from 'react';
import './Profile.scss'

export function Profil() {
    return (
        <>
        <div>Profil</div>
        <button onClick={localStorage.clear()}>Clear</button>
        </>
    )
}

export default Profil;