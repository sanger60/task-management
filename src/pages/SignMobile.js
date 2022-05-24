
import React, { useState, useEffect, useRef } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";
import { axiosProject, axiosImage, axiosUser } from "../axios";

const SignMobile = (props) => {
    return(
        <div>sa mobil login</div>
    )
};

SignMobile.propTypes = {
    width: PropTypes.oneOf(["lg", "md", "sm", "xl", "xs"]).isRequired,
};
export default withRouter(SignMobile);
