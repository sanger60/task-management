import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuth } from "./utils";

export default function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuth() ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
}
