// import React, { useState } from 'react';

// import axios from 'axios';

const Auth = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const response = await axios.post('http://localhost:3000/login', { email, password });
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    const handleRegister = async (event) => {
        event.preventDefault();
        try {
            console.log("im here");
            const response = 
            await axios.post('http://192.168.60.14:3000/register', { email, password });
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <form>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
            <button onClick={handleRegister}>Register</button>
        </form>
    )
}

export default Auth