
import React, { useState, useEffect, Fragment } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";
import { axiosUser } from "../axios";

import { isAuth } from "../components/Routing/utils";
const Sign = (props) => {
    const [sign, setSign] = useState("in");
    const [email, setEmail] = useState("");
    const [resetMail, setResetMail] = useState("");
  
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [forgot, setForgot] = useState(false);
    const [accept, setAccept] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(true);

    useEffect(() => {
        if (isAuth()) {
          return (window.location.href = "/home");
        } else {
          setPageLoading(false);
        }
        // console.log(props.match.params);
        // const urlParams = new URLSearchParams(window.location.search);
    
        // if (urlParams.get("signup") === "true") {
        //   setSign("up");
        // }
    }, []);

    const handleEmail = (event) => {
        setEmail(event.target.value);
    };

    const handlePassword = (event) => {
        setPassword(event.target.value);
    };
    
    const handleRepeatPassword = (event) => {
        setRepeatPassword(event.target.value);
    };
    
    const handleSendingCredentials = (event) => {
        event.preventDefault();
        if (email === "" || password === "") {
          return alert("No valid password or email");
        }
        return props.signInFunc(email, password);
    };
    
    const handleSignUp = () => {
        if (name === "" || email === "") {
          return alert("No valid name or email");
        } else if (password !== repeatPassword) {
          return alert("Passwords are not the same");
        }
        setIsLoading(true);
        const user = {
          FullName: `${name}`,
          PhoneNumber: `${phone}`,
          Email: `${email}`,
          Password: `${password}`,
        };
    
        return props.signUpFunc(user);
    };

    return(
        <Fragment>
            <div className="container">
                <form onSubmit={handleSendingCredentials}>
                    <input
                      type="text"
                      placeholder="Email Address"
                      value={email}
                      className="sign-input"
                      onChange={handleEmail}
                      required
                    />
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={password}
                      className="sign-input"
                      onChange={handlePassword}
                      required
                    />
                    <p
                      onClick={() => {
                        setForgot(true);
                      }}
                      style={{
                        color: "white",
                        textDecoration: "underline",
                        fontWeight: "600",
                        cursor: "pointer",
                        width: "90%",
                        textAlign: "center",
                      }}
                    >
                      Forgot Password
                    </p>
                    {props.loading ? (
                      <div className="loader-signup">
                        {/* <LoadingSpinner strokeColor="white" /> */}
                        Loading Spinner...
                      </div>
                    ) : (
                      <button className="sign-buttons" type="submit">
                        Sign In
                      </button>
                    )}
                    <button
                      className="sign-buttons"
                      onClick={() => setSign("up")}
                    >
                      Create an Account
                    </button>
                </form>
            </div>
        </Fragment>
    )
};

// Sign.propTypes = {
//     width: PropTypes.oneOf(["lg", "md", "sm", "xl", "xs"]).isRequired,
// };

export default withRouter(Sign);
