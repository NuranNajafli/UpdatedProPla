import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useRef, useState } from 'react';
import axios from "../components/interceptors/axios"




function Login() {

    const username = useRef('');
    const password = useRef('');
    const [err, setErr] = useState(false);

    const navigate = useNavigate()
    const sendRequest = (e) => {
        e.preventDefault()
        let data = {
                username: username.current.value,
                password: password.current.value
        }
        axios.post('Log', data)
            .then((response) => {
                if (response.data) {
                    localStorage.setItem('token', response.data)
                    navigate('home')
                }
                else {
                    console.log(JSON.stringify({ error: 'true' }));
                    setErr(true);
                }
            });
    }

    return (
        <div className='main-login'>
            {
                err === true ? (
                    <div className="alert alert-danger" role="alert">
                        Password or Email is incorrect!
                    </div>
                ) : (
                    <div></div>
                )

            }
            <form onSubmit={(e) => sendRequest(e)}>
                <div className="form-field">
                    <input ref={username} type="text" placeholder="Email / Username" required />
                </div>
                <div className="form-field">
                    <input ref={password} type="text" placeholder="Password" required />
                </div>
                <div className="form-field">
                    <button className="btn" type="submit">Log in</button>
                </div>
            </form>
        </div>
    )
}

export default Login