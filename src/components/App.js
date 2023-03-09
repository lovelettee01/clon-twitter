import React, { useEffect, useState } from "react";
import Router from "components/Router";
import { authService } from "firebase.config";

function App() {
    const [init, setInit] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    useEffect(() => {
        authService.onAuthStateChanged((user) => {
            if (user) {
                setUserInfo({
                    uid: user.uid,
                    displayName: user.displayName,
                });
            } else {
                setUserInfo(null);
            }
            setInit(true);
        });
    }, []);

    const refreshUser = () => {
        const user = authService.currentUser;
        setUserInfo({
            uid: user.uid,
            displayName: user.displayName,
        });
    };

    return !init ? (
        "Initialize...."
    ) : (
        <Router
            isLogined={userInfo !== null}
            userInfo={userInfo}
            refreshUser={refreshUser}
        />
    );
}

export default App;
