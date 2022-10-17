import jwtDecode from "jwt-decode";
import { useContext, useRef, useState } from "react";
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
    const [message, setMessage] = useState('');

    const registerBtn = useRef();

    const register = async (e) => {
        e.preventDefault();
        let success = false;
        await signUp(firstname, lastname, age, email, password).then( async ({data:registerData}) => {
            if(registerData.message === "success"){
                await signIn(email, password).then( ({data: tokenData}) =>{
                    if(tokenData.message === "success") {
                        localStorage.setItem('token', tokenData.token);
                        setCurrentUser(tokenData.token && jwtDecode(tokenData.token)); 
                        success = true; 
                    }
                })
            }
            else{
                setMessage(registerData.message);
            }
        });
        if(success) navigate('/home');
    }

    return (
        <form className="container" onSubmit={register}>
            <div className="row mb-3">
                <div className="col-5 col-md-4 offset-1 offset-md-2">
                    <label htmlFor="" className="mb-1">First Name</label>
                    <input className="form-control" type="text" placeholder="First Name" value={firstname} onChange={e=>setFirstname(e.target.value)} />
                </div>
                <div className="col-5 col-md-4">
                    <label htmlFor="" className="mb-1">Last Name</label>
                    <input className="form-control" type="text" placeholder="Last Name" value={lastname} onChange={e=>setLastname(e.target.value)} />
                </div>
            </div>
            <div className="row mb-3">
                <div className="col-10 col-md-8 offset-1 offset-md-2">
                    <label htmlFor="" className="mb-1">Age</label>
                    <input className="form-control" type="text" placeholder="Age" value={age} onChange={e=>setAge(e.target.value)} />
                </div>
            </div>
            <div className="row mb-3">
                <div className="col-10 col-md-8 offset-1 offset-md-2">
                    <label htmlFor="" className="mb-1">E-mail</label>
                    <input className="form-control" type="text" placeholder="E-mail" value={email} onChange={e=>setEmail(e.target.value)} />
                </div>
            </div>
            <div className="row mb-3">
                <div className="col-10 col-md-8 offset-1 offset-md-2">
                    <label htmlFor="" className="mb-1">Password</label>
                    <input className="form-control" type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} onKeyDown={e => {if(e.key.toLowerCase() === "enter") (registerBtn.current as any).click()}}/>
                </div>
            </div>
            {message && 
            <div className="div row">
                <div className="col-10 col-md-8 offset-1 offset-md-2 text-bg-danger bg-opacity-25 subtext fw-bold rounded py-2 ">{message}</div>
            </div>
            }
            <div className="row mt-3"><button ref={registerBtn} className='btn bg-light btn-light col-4 col-md-2 offset-4 offset-md-5' type="submit">Register</button></div>
        </form>
    )
}