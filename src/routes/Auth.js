import React, { useState } from "react";
import { authService } from "firebase.config";
import {
  setPersistence,
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const onChange = (e) => {
    const {
      target: { name, value },
    } = e;

    if (name === "email") setEmail(value);
    else if (name === "password") setPassword(value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    let account;
    try {
      if (newAccount) {
        account = await createUserWithEmailAndPassword(
          authService,
          email,
          password
        );
      } else {
        //const persistence = await setPersistence(authService, browserSessionPersistence);
        account = await signInWithEmailAndPassword(
          authService,
          email,
          password
        );
      }
    } catch (e) {
      setErrorMsg(e.message);
    }
  };

  const toggleAccount = () => setNewAccount((prev) => !prev);

  const onSocialClick = async (e) => {
    const {
      target: { name },
    } = e;
    let provider;
    if (name === "google") provider = new GoogleAuthProvider();
    else if (name === "github") provider = new GithubAuthProvider();

    const data = await signInWithPopup(authService, provider)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(data);
  };
  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          value={password}
          onChange={onChange}
        />
        <input
          type="submit"
          value={newAccount ? "Create New Account" : "Log In"}
        />
      </form>
      <span onClick={toggleAccount}>
        {newAccount ? "Sign In" : "Create Account"}
      </span>
      <p>{errorMsg}</p>
      <div>
        <button name="google" onClick={onSocialClick}>
          Continue with Google
        </button>
        <button name="github" onClick={onSocialClick}>
          Continue with Github
        </button>
      </div>
    </>
  );
};
export default Auth;
