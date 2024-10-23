import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./Header.css"

const Header = () => {
    const h_navigate = useNavigate()
    const handleClick = () => {
        h_navigate('/login'); // Sahifaga o'tish
    };
    return (
        <div className='header'>
            <button onClick={handleClick}>
                <i class='bx bx-user'></i>
                <span className='admin'>Admin</span>
                <span className='kursor'>Logout</span>
            </button>
        </div>
    )
}

export default Header
