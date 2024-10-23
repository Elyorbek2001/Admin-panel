import React from 'react'

import "./Saidbar.css"

const Saidbar = () => {


    return (
        <div className='saidbar'>

            <h1>Autozoomadmin</h1>

            <div className='app'>
                <a href="/main" >
                    <i className='bx bx-home'></i>
                    <p>Dashbort</p>
                </a>

            </div>

            <div className='app'>
                <a href="/settings">
                    <i class='bx bx-cog'></i>
                    <p>Settings</p>
                </a>

            </div>

            <div className='app'>
                <a href="/brands">
                    <i class='bx bx-store-alt'></i>
                    <p>Brands</p>
                </a>

            </div>

            <div className='app'>
                <a href="/models">
                    <i class='bx bx-notepad'></i>
                    <p>Models</p>
                </a>

            </div>

            <div className='app'>
                <a href="">
                    <i class='bx bx-location-plus'></i>
                    <p>Locations</p>
                </a>
            </div>

            <div className='app'>
                <a href="">
                    <i class='bx bxs-city' ></i>
                    <p>Cities</p>
                </a>

            </div>

            <div className='app'>
                <a href="">
                    <i class='bx bx-car'></i>
                    <p>Cars</p></a>
            </div>






        </div>

    )
}

export default Saidbar
