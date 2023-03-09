import React from "react";
import { authService } from "firebase.config";
import {
    signInWithPopup,
    GoogleAuthProvider,
    GithubAuthProvider,
} from "firebase/auth";

const SocialLogin = () => {
    //Social Login Event
    const onSocialClick = async (e) => {
        const {
            target: { name },
        } = e;
        let provider;
        if (name === "google") {
            provider = new GoogleAuthProvider();
        } else if (name === "github") {
            provider = new GithubAuthProvider();
        }
        await signInWithPopup(authService, provider);
    };
    return (
        <>
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
export default SocialLogin;
