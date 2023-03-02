import React, { useEffect, useState } from "react";
import Router from "components/Router";
import { authService } from "firebase.config";

function App() {
  const [init, setInit] = useState(false);
  const [isLogined, setIsLogin] = useState(false);
  console.log(`isLogined ${isLogined}`);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      setIsLogin(user);
      setInit(true);
    });
  }, []);

  return !init ? "Initialize...." : <Router isLogined={isLogined} />;
}

export default App;
