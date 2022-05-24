import React, { useState, useEffect, useRef, Fragment } from "react";
import { deleteTokenStorage } from "./Routing/utils/index";
import { axiosUser } from "../axios";
import { useStore } from "../Store";

//Logo

// import LoadingSpinner from "../components/LoadingSpinner";

const Topbar = (props) => {
  const {
    currentProjectName,
    userDetails,
    setUserDetails,
    prevBtn,
  } = useStore();
  const [userOptions, setUserOptions] = useState(false);
  const [editorPage, setEditorPage] = useState(false);
  const [projectId, setProjectId] = useState("");
  const [nameInitials, setNameInitials] = useState("");
  const [avatarColor, setAvatarColor] = useState("");

  let userID = window.localStorage.getItem("user");

  const node = useRef();

  async function getUserDetails() {
    try {
      await axiosUser.post("/me", { userId: userID }).then((res) => {
        // setUserDetails({
        //   FullName: res.data.FullName,
        //   Email: res.data.Email,
        // });
        // let initials = res.data.FullName.toUpperCase().split(" ");
        // setNameInitials(
        //   initials.length > 1
        //     ? initials[0].charAt(0) + initials[1].charAt(0)
        //     : initials[0].charAt(0)
        // );
        // setAvatarColor("#" + Math.floor(Math.random() * 16777215).toString(16));
      });
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    var href = window.location.href.split("/");
    if (href[3] === "editor") {
      setProjectId(href[4]);
      setEditorPage(true);
    }
    getUserDetails();

    // add when mounted
    document.addEventListener("mousedown", handleOptions);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener("mousedown", handleOptions);
    };
  }, []);

  const handleOptions = (e) => {
    if (node.current.contains(e.target)) {
      // inside click
      return;
    }
    // outside click
    setUserOptions(false);
  };

  const handleSignOut = () => {
    deleteTokenStorage();
  };

  return (
    <div className="topbar" ref={node}>
        <div className="editor-topbar-back">
          <a href="test.html">Test</a>
        </div>
    </div>
  );
};

export default Topbar;
