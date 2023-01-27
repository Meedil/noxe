import jwtDecode from "jwt-decode";
import { useContext, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { signIn } from "../APIs/userApi";
import { CurrentUserContext } from "../App";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setCurrentUser } = useContext(CurrentUserContext);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // ---- NO LONGER WORKS ---
  const login = async (e) => {
    e.preventDefault();
    let success = false;
    let message = "";
    await signIn(email, password).then(async (response) => {
      const { data } = response;
      message = data.message;
      if (data.message === "success") {
        localStorage.setItem("token", data.token);
        setCurrentUser(data.token && jwtDecode(data.token));
        success = true;
        console.log(success);
      }
    });
    if (success) {
      console.log("going home");
      navigate("/home");
    } else {
      setMessage(message);
    }
  };

  const goToHome = () => {
    setCurrentUser("token?");
  };

  return (
    <form
      onSubmit={(e) => {
        login(e);
      }}
      className="container pt-5"
    >
      <div className="row justify-content-center mt-5 mb-2">
        <div className="col-10 col-md-8">
          <label htmlFor="username-input">E-mail </label>
          <input
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="username-input"
            placeholder="address@domain.com"
            type="text"
          />
        </div>
      </div>
      <div className="row justify-content-center mb-4">
        <div className="col-10 col-md-8">
          <label htmlFor="password-input">Password</label>
          <input
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password-input"
            placeholder="password"
            type="password"
          />
        </div>
      </div>
      {message && (
        <div className="div row justify-content-center">
          <div className="col-10 col-md-8 text-bg-danger bg-opacity-25 subtext fw-bold rounded py-2 mb-3">
            {message}
          </div>
        </div>
      )}
      <div className="div row justify-content-center">
        <div className="col-10 col-md-8 text-bg-danger bg-opacity-25 login-message rounded py-2 mb-3">
          Unfortunately this login-page no longer works, due to access changes
          in the backend
          <br />
          <button className="btn text-light fw-bold mt-2" onClick={goToHome}>
            Click here to proceed
          </button>
        </div>
      </div>
      <div className="row justify-content-center">
        <button className="btn bg-light btn-light col-4 col-md-2" type="submit">
          Login
        </button>
      </div>
      <div className="row justify-content-center">
        <div className="col-8 col-md-4 text-center mt-3">
          Don't have an account?{" "}
          <Link className="fw-bold" to={"/register"}>
            Register
          </Link>
        </div>
      </div>
    </form>
  );
}
