import React, { useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import useAuth from "../hooks/useAuth";
import axios from "axios";

function Signin(props) {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');


  function loginpatient(event) {
    event.preventDefault();
    let data = { email, pwd };
    try {
      const result = axios.post("http://localhost:4001/patient/login", data, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        console.log(response)
        const uid = response?.data?.uid
        const accessToken = response?.data?.accessToken

        setAuth({ email, pwd, uid, accessToken })//storing accessToken in Auth object
        navigate("/PatientDetails")
      })
      /* console.log(result?.data?.accessToken) */
      setEmail('')
      setPwd('')

    } catch (error) {
      console.log(error)
      if (!error?.result) {
        alert('No Server Response')
      } else if (error.result?.status === 400) {
        alert('Missing Username or Password')
      } else if (error.result?.status === 401) {
        alert('Unathorized User')
      } else {
        alert('Login Failed')
      }
    }

  }
  return (
    <div>
      <Navbar></Navbar>
      <div className="container signin-panel">
        <div class="container mt-5">
          <div class="row justify-content-center">
            <div class="col-md-6">
              <div class="card">
                <div class="card-body">
                  <h4
                    class="card-title text-center mb-4"
                    style={{ color: "#0f583f" }}
                  >
                    {props.name}'s Login
                  </h4>
                  <form onSubmit={loginpatient}>
                    <div class="form-group">
                      <label for="email">Email address</label>
                      <input
                        type="email"
                        class="form-control"
                        id="email"
                        aria-describedby="emailHelp"
                        placeholder="Enter email"
                        required
                        value={email} onChange={p => { setEmail(p.target.value) }}
                      />
                    </div>
                    <div class="form-group">
                      <label for="pwd">Password</label>
                      <input
                        type="password"
                        class="form-control"
                        id="pwd"
                        placeholder="Password"
                        required
                        value={pwd} onChange={p => { setPwd(p.target.value) }}
                      />
                    </div>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <button type="submit" class="btn btn-primary bg-success">
                        Sign In
                      </button>
                    </div>
                  </form>
                  <div class="text-center mt-3">
                    Don't have an account? <Link to={props.register}>Sign up</Link>
                    <p>
                      You ain't {props.name}? <Link to="/">Switch here!</Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signin;
