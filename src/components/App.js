import React, { useEffect, useState } from "react";
import Router from "components/Router";
import { authService } from "firebase.config";

function App() {
  const [init, setInit] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [isLogined, setIsLogin] = useState(false);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if(user){
        setIsLogin(true);
        setUserInfo(user);
      } else{
        setIsLogin(false);
      }
      setInit(true);
    });
  }, []);

  return !init ? "Initialize...." : <Router isLogined={isLogined} userInfo={userInfo} />;
}

export default App;
