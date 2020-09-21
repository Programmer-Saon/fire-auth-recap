import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Button } from "react-bootstrap";
import firebaseConfig from "./firebase.config";
import * as firebase from "firebase/app";
import "firebase/auth";

firebase.initializeApp(firebaseConfig);

function App() {
  let [user, setUser] = useState({
    isSignedIn: false,
    name: "",
    photo: "",
    email: "",
  });
  const provider = new firebase.auth.GoogleAuthProvider();
  const handleSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((res) => {
        console.log(res);
        let { displayName, photoURL, email } = res.user;
        let signedInUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photo: photoURL,
        };
        setUser(signedInUser);

        const token = res.credential.accessToken;
        const user = res.user;
      })
      .catch((error) => {
        console.log(error);
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = error.credential;
        console.log(error.message);
      });
  };

  const handleSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then((res) => {
        const user = {
          isSignedIn: false,
          name: "",
          photo: "",
          email: "",
        };
        setUser(user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = () => {
    console.log("submitted form");
  }
  const handleBlur = (e) => {
    console.log(e.target.name, e.target.value);
    if(e.target.name === 'email'){
      
      
    }if(e.target.password === 'password'){

    }
  }

  return (
    <div className="App">
      {user.isSignedIn ? (
        <button onClick={handleSignOut} className="btn-primary">
          Sign out Btn
        </button>
      ) : (
        <button onClick={handleSignIn} className="btn-primary">
          Sign In Btn
        </button>
      )}
      {user.isSignedIn && (
        <div>
          <h5>Welcome {user.name}</h5>

          <h4>{user.email}</h4>
          <img src={user.photo} alt="" />
        </div>
      )}

      <h1>Our Own Authentication</h1>
      <form onSubmit={handleSubmit} action="">
        <input type="text" placeholder="your email address" 
        onBlur={handleBlur}
        name="email"
        required />
        <br />
        <input
          type="password"
          id=""
          placeholder="your password"
          required
          onBlur={handleBlur}
          name="password"
        />
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default App;
