//State files
import React, { useState, Fragment, useRef } from "react";
import axios from "axios";
import { axiosUser } from "./axios";
//useContext
import { StoreContext } from "./Store";
//Routing BrowserRouter as Router
import { Router, Switch, Route } from "react-router-dom";
import { setTokenStorage, setUserStorage } from "./components/Routing/utils";
import PrivateRoute from "./components/Routing/PrivateRoute";
import { createBrowserHistory } from "history";

import Topbar from "./components/Topbar";

//Pages
import Sign from "./pages/Sign";
import SignMobile from "./pages/SignMobile";
import Home from "./pages/Home";


// import GuidedTour from "./pages/GuidedTour";

const App = () => {
  const history = createBrowserHistory({ forceRefresh: true });
  const prevBtn = useRef();
  const [openTagMedia, setOpenTagMedia] = useState(false);
  const [userDetails, setUserDetails] = useState({ FullName: "", Email: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [currentProjectName, setCurrentProjectName] = useState("Project");

  const [device, setDevice] = useState(
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    ) === true
      ? "phone"
      : "pc"
  );

  const handleRedirectHome = (res) => {
    setTokenStorage(res.token);
    setUserStorage(res.userDetails.Id);
    // history.push(`/home`);
    window.location.href = "/home";
  };

  const handleSignIn = async (email, password) => {
    //email: deneme
    //password: mert
    if (email === "" || password === "") {
      return alert("No valid password or email");
    }
    setIsLoading(true);

    try {
      await axiosUser
        .post("/login", {
          Email: email,
          Password: password,
        })
        .then((res) => {
          setIsLoading(false);
          if (res.data.auth) {
            handleRedirectHome(res.data);
          } else {
            alert("Wrong email or password");
          }
        });
    } catch (error) {
      setIsLoading(false);
      alert("Wrong email or password");
      console.log("sign in error:", error);
    }
  };

  const handleSignUp = (user_details) => {
    setIsLoading(true);
    axiosUser
      .post("/register", user_details)
      .then((res) => {
        setIsLoading(false);
        if (res.data.auth) {
          setUserDetails({
            FullName: res.data.userDetails.FullName,
            Email: res.data.userDetails.Email,
          });
          handleRedirectHome(res.data);
        }
      })
      .catch(() => console.error());
  };

  const handleResetPassword = (mail) => {
    axios.post(`http://localhost:5000/sendMail/${mail}`).then((res) => {
      console.log("reset password", res.data);
    });
  };
  
  const handleOpenTagMedia = () => {
    setOpenTagMedia((prevState) => !prevState);
  };

  return (
    <StoreContext.Provider
      value={{
        openTagMedia,
        handleOpenTagMedia,
        prevBtn,
        userDetails,
        setUserDetails,
        currentProjectName,
        setCurrentProjectName,
      }}
    >
      {/* <Topbar userDetails={userDetails} mobileView={device === "mobile"} /> */}
      <Router history={history}>
        <Switch>
          <Fragment>
            <div
              style={{ display: "flex", flexDirection: "row", height: "100%" }}
            >
              <Route exact path="/">
                {device === "pc" ? (
                  <Sign
                    signInFunc={handleSignIn}
                    signUpFunc={handleSignUp}
                    resetPasswordFunc={handleResetPassword}
                    loading={isLoading}
                    redirect={handleRedirectHome}
                  />
                ) : (
                  <SignMobile signInFunc={handleSignIn} />
                )}
              </Route>
              {/* <Route
                path="/changePassword/:user_id"
                component={ChangePassword}
              /> */}

              <PrivateRoute
                path="/home"
                component={Home}
                // component={device === "pc" ? Home : HomeMobile}
                // component={false ? Home : HomeMobile}
              />
              {/* <Route path="/preview/:project_id" component={Preview} /> */}
              {/* <PrivateRoute path="/resetPass" component={ResetPass} />
              <PrivateRoute path="/editProfile" component={EditProfile} />
              <PrivateRoute
                path="/organizationSettings"
                component={Organization}
              />
              <PrivateRoute path="/analytics" component={Analytics} />
              <PrivateRoute path="/CRM" component={CRM} /> */}
            </div>
          </Fragment>
        </Switch>
      </Router>
    </StoreContext.Provider>
  );
};

export default App;
