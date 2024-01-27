import { useState } from "react";
import "./App.css";
import Login from "./page/Login";
import AccountProvider from "./context/AccountProvider.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  const clientId =
    "99471757283-oo5pepdv2k0re5tcelfvilcj07laga29.apps.googleusercontent.com";

  return (
    <>
      <GoogleOAuthProvider clientId={clientId}>
        <AccountProvider>
          <Login />
        </AccountProvider>
      </GoogleOAuthProvider>
      ;
    </>
  );
}

export default App;
