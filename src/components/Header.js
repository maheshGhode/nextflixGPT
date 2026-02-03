import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/fireBase";
import { adduser, removeUser } from "../utils/userSlice";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { LOGO, USER_AVATAR } from "../utils/constant";

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
     const unsubscribe = onAuthStateChanged(auth, (user) => {
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

    return () => unsubscribe();
  }, []);
  return (
    <div className="w-full py-4 px-8 bg-gradient-to-b from-black z-10 flex justify-between">
      <img
        className="w-44"
        src={LOGO}
        title="Netflix Logo"
        alt="Nextflix Logo"
      />
      {user && (
        <div className="flex gap-2 items-center">
          <img
            alt="user-profile"
            className="w-12 h-12 rounded-full"
            src={USER_AVATAR}
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
