import "./App.css";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import app from "./firebase/firebase.init";
import { useState } from "react";

const auth = getAuth(app);

function App() {
  const [user, setUser] = useState({});
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  const handleGoogleLogin = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        setUser(user);
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // github log in
  const handleGithubLogin = () => {
    signInWithPopup(auth, githubProvider)
      .then((result) => {
        const user = result.user;
        setUser(user);
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // signOut
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser({});
      })
      .catch((error) => {
        setUser({});
        console.log("error sign out", error);
      });
  };

  return (
    <div>
      {user.uid ? (
        <button onClick={handleSignOut}>Sign Out</button>
      ) : (
        <>
          <button className="btn" onClick={handleGoogleLogin}>
            Signin with Google
          </button>
          <button className="btn" onClick={handleGithubLogin}>
            Signin with Github
          </button>
        </>
      )}

      {user.uid && (
        <div>
          <h1>Name: {user?.displayname}</h1>
          <h3>Email: {user?.email}</h3>
          <img src={user?.photoURL} alt="user img" />
        </div>
      )}
    </div>
  );
}

export default App;
