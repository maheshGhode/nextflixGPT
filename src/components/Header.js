import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/fireBase";
import { adduser, removeUser } from "../utils/userSlice";
import { onAuthStateChanged, signOut } from "firebase/auth";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  const signOutUser = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        dispatch(
          removeUser()
        );
      })
      .catch((error) => {
        // An error happened.
        console.error("Error during sign out:", error);
      });
  };

   useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed, 
        const { uid, email, displayName, photoURL} = user;
        dispatch(
            adduser({
                uid,
                email,
                displayName,    
                photoURL
            })
        )
        navigate("/browse")
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/")
      }
    });
  }, []);
  return (
    <div className="absolute w-full py-4 px-8 bg-gradient-to-b from-black z-10 flex justify-between">
      <img
        className="w-44"
        src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
        title="Netflix Logo"
        alt="Nextflix Logo"
      />
      {user && (
        <div className="flex gap-2 items-center">
          <img
            alt="user-profile"
            className="w-12 h-12 rounded-full"
            src={user.photoURL}
          />
          <button className="text-white font-bold" onClick={signOutUser}>
            (Sign Out)
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
