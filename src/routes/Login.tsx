import jwtDecode from 'jwt-decode';
import { useContext, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { signIn } from '../APIs/userApi';
import { CurrentUserContext } from '../App';


export default function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {setCurrentUser} = useContext(CurrentUserContext);
    const navigate = useNavigate();

    
    
    const login = async (e) => {
        e.preventDefault();
        await signIn(email, password).then(response => {
            const {data} = response;
            if(data.token) {localStorage.setItem('token', data.token);
            setCurrentUser(data.token && jwtDecode(data.token));}
        });
        navigate('/home');
    }

    return(
        <form onSubmit={e => {login(e); }} className="container">
            <div className="row justify-content-center mb-2">
                <label htmlFor="username-input">Username </label>
                <input className='form-control' value={email} onChange={e => setEmail(e.target.value)} id="username-input" placeholder="username" type="text" />
            </div>
            <div className="row justify-content-center mb-4">
                <label htmlFor="password-input">Password</label>
                <input className='form-control' value={password} onChange={e => setPassword(e.target.value)} id="password-input" placeholder='password' type="password" />
            </div>
            <div className="row justify-content-center"><button className='btn bg-light btn-light' type="submit">Login</button></div>
        </form>
    )
}