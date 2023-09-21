import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import CreatePost from "./CreatePost";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";
import { Nav, Button, Navbar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
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
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="An app that allows users across the world post life challenges and struggles. Serves as a medium to vent out personal frustration."
        />
        <title>Vent App</title>

        <link
          rel="canonical"
          content=" initial-scale=1.0"
          href="http://blog-753af.web.app"
        />
      </Helmet>
      <Nav>
        <Navbar>
          <Link to="/">VentApp</Link>

          {!isAuth ? (
            <Link to="/login">Login</Link>
          ) : (
            <>
              <Link to="/createpost">Post vent</Link>
              <Button onClick={signUserOut}>Log Out</Button>
            </>
          )}
        </Navbar>
      </Nav>
      <Routes>
        <Route path="/" element={<Home isAuth={isAuth} />} />
        <Route path="/createpost" element={<CreatePost isAuth={isAuth} />} />
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
      </Routes>
    </Router>
  );
}

export default App;
