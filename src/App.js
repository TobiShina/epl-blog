import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from ".//Home";
import Login from "./Login";
import CreatePost from "./CreatePost";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";
import { Helmet } from "react-helmet";

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = "/login";
    });
  };
  return (
    <Router>
      <Helmet>
        <meta content="width=device-width, initial-scale=1.0" charSet="utf-8" />
        <title>Vent</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <nav>
        <Link to="/">Home</Link>

        {!isAuth ? (
          <Link to="/login">Login</Link>
        ) : (
          <>
            <Link to="/createpost">Post vent</Link>
            <button onClick={signUserOut}>Log Out</button>
          </>
        )}
      </nav>
      <Routes>
        <Route path="/" element={<Home isAuth={isAuth} auth={auth} />} />
        <Route path="/createpost" element={<CreatePost isAuth={isAuth} />} />
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
      </Routes>
    </Router>
  );
}

export default App;
