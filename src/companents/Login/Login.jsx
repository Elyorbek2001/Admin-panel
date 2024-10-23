import React, { useState } from 'react'
import "./Login.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const [phone, setPhone] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()
    const loginFunc = (event) => {
        event.preventDefault()
        fetch('https://autoapi.dezinfeksiyatashkent.uz/api/auth/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                phone_number: phone,
                password: password
            })
        })
            .then(response => response.json())
            .then(data => {

                if (data?.success === true) {
                    localStorage.setItem("token", data?.data?.tokens?.accessToken?.token)
                    toast.success(data?.message)
                    navigate("/")
                } else (toast.error(data?.message))

            })
            .catch(error => {
                console.log(error)
                if (error?.message === 'Token expired') {
                    localStorage.removeItem("token")
                }

            });
    }
    return (

        <div className='Login_page'>
            <form onSubmit={loginFunc} className='login' action="">
                <h1>Login</h1>

                <div className="input_box">
                    <input onChange={(e) => setPhone(e?.target?.value)} type="text" placeholder='username' />
                </div>

                <div className="input_box">
                    <input onChange={(e) => setPassword(e?.target?.value)} type="" placeholder='Password' />
                </div>

                <button type='submit' className='btn'>Login</button>

            </form>
        </div>

    )
}

export default Login
