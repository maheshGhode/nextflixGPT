import React, { use, useRef, useState } from "react";
import Header from "./Header";
import { checkValidation } from "../utils/validation";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/fireBase";
import { adduser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  const name = useRef();
  const email = useRef();
  const password = useRef();
  const dispatch = useDispatch()

  const toggleSignUpForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  const onSubmitForm = () => {
    const message = checkValidation(
      email.current.value,
      password.current.value,
    );
    setErrorMsg(message);

    if (message) return;

    if (!isSignInForm) {
      //  Sign Up Logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value,
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: "https://media.licdn.com/dms/image/v2/D4E03AQG-k-jdB2bhjA/profile-displayphoto-shrink_200_200/B4EZdO3EUcHIAY-/0/1749374748923?e=1771459200&v=beta&t=TaCl24dV1GN2wUSJPo5YCef8lvtPp_lbhuhTAGvwI88",
          })
            .then(() => {
              const {uid, email, displayName} = auth.currentUser;
              dispatch(adduser({
                uid: uid,
                email: email,
                displayName: displayName,
                photoURL: 
                  "https://media.licdn.com/dms/image/v2/D4E03AQG-k-jdB2bhjA/profile-displayphoto-shrink_200_200/B4EZdO3EUcHIAY-/0/1749374748923?e=1771459200&v=beta&t=TaCl24dV1GN2wUSJPo5YCef8lvtPp_lbhuhTAGvwI88",
              }))
            })
            .catch((error) => {
              // An error occurred 
              setErrorMsg(error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error(
            "Error during sign up:",
            errorCode + "-" + errorMessage,
          );
          // ..
        });
    } else {
      //  Sign In Logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value,
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log("User Sign In Successful:", user);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error(
            "Error during sign in:",
            errorCode + "-" + errorMessage,
          );
        });
    }
  };
  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          alt="bg-image"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/fc164b4b-f085-44ee-bb7f-ec7df8539eff/d23a1608-7d90-4da1-93d6-bae2fe60a69b/IN-en-20230814-popsignuptwoweeks-perspective_alpha_website_large.jpg"
        />
      </div>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="absolute w-3/12 bg-black p-12 my-36 mx-auto right-0 left-0 text-white roundered-lg bg-opacity-80"
      >
        <h1 className="font-bold text-3xl py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="p-4 my-4 w-full bg-gray-700"
          />
        )}
        <input
          type="text"
          ref={email}
          placeholder="Email"
          className="p-4 my-4 w-full bg-gray-700"
        />
        <input
          type="password"
          ref={password}
          placeholder="Password"
          className="p-4 my-4 w-full bg-gray-700"
        />
        {errorMsg && (
          <p className="text-lg font-bold text-red-800">{errorMsg}</p>
        )}
        <button
          onClick={onSubmitForm}
          className="w-full bg-red-600 p-4 my-6 rounded-lg"
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className="py-4 cursor-pointer" onClick={toggleSignUpForm}>
          {isSignInForm
            ? "New to Nextflix Sign Up Now"
            : "Already have an account? Sign In"}
        </p>
      </form>
    </div>
  );
};

export default Login;
