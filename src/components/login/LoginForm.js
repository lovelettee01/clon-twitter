import React, { useState } from "react";

import { authService } from "firebase.config";
import {
    setPersistence,
    browserSessionPersistence,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth";
import SocialLogin from "components/login/SocialLogin";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    //Input onChange Event
    const onChange = (e) => {
        const {
            target: { name, value },
        } = e;

        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    };

    //Form Submit Event
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            if (newAccount) {
                await createUserWithEmailAndPassword(
                    authService,
                    email,
                    password
                );
            } else {
                await setPersistence(authService, browserSessionPersistence);
                await signInWithEmailAndPassword(authService, email, password);
            }
        } catch (e) {
            setErrorMsg(e.message);
        }
    };

    // newAccout Or Login Toggle Event
    const toggleAccount = () => setNewAccount((prev) => !prev);

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

            <SocialLogin />
        </>
    );
};

export default LoginForm;
