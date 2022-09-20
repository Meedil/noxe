import jwtDecode from "jwt-decode";
import { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { signIn, signUp } from "../APIs/userApi";
import { CurrentUserContext } from "../App";

export default function Register(){
    const {setCurrentUser} = useContext(CurrentUserContext);
    const navigate = useNavigate()

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [age, setAge] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const register = async (e) => {
        e.preventDefault();
        await signUp(firstname, lastname, age, email, password).then( () => {
            signIn(email, password).then( ({data: tokenData}) =>{
                if(tokenData.token) {localStorage.setItem('token', tokenData.token);
                setCurrentUser(tokenData.token && jwtDecode(tokenData.token));}
            })
        });
        navigate('/home');
    }

    return (
        <form className="container" onSubmit={register}>
            <div className="row mb-3">
                <label htmlFor="" className="mb-1">First Name</label>
                <input className="form-control" type="text" placeholder="First Name" value={firstname} onChange={e=>setFirstname(e.target.value)} />
            </div>
            <div className="row mb-3">
                <label htmlFor="" className="mb-1">Last Name</label>
                <input className="form-control" type="text" placeholder="Last Name" value={lastname} onChange={e=>setLastname(e.target.value)} />
            </div>
            <div className="row mb-3">
                <label htmlFor="" className="mb-1">Age</label>
                <input className="form-control" type="text" placeholder="Age" value={age} onChange={e=>setAge(e.target.value)} />
            </div>
            <div className="row mb-3">
                <label htmlFor="" className="mb-1">E-mail</label>
                <input className="form-control" type="text" placeholder="E-mail" value={email} onChange={e=>setEmail(e.target.value)} />
            </div>
            <div className="row mb-3">
                <label htmlFor="" className="mb-1">Password</label>
                <input className="form-control" type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
            </div>
            <div className="row"><button className='btn bg-light btn-light' type="submit">Register</button></div>
        </form>
    )
}