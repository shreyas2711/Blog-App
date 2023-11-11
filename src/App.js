import './App.css';
import {BrowserRouter as Router,Route, Routes,Link} from "react-router-dom";



import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Login from "./pages/Login";
import { useState } from 'react';
import {signOut} from 'firebase/auth'
import {auth} from './firebase-config'
import ArticleLandingPage from './pages/ArticleLandingPage';



function App() {

  const [isAuth,setIsAuth]=useState(localStorage.getItem("isAuth"));

  
  const SignUserOut=()=>{
    signOut(auth).then(()=>{
      localStorage.clear()
      setIsAuth(false);
      window.location.pathname="/login";
    })
  }

  return (
    
    <Router>
      {/* <nav>
      <h1 className='brand'>Geeksphere</h1>
      <main>
        <Link to="/">Home</Link>
        {!isAuth ? (<Link to="/login">Login</Link>
        ): (  
          <>
          <Link to="/createpost">Create Post</Link>
          <button onClick={SignUserOut}>Log Out</button>
          </>
          )}
          <Link to="#" className="burger-icon">
      <FontAwesomeIcon icon={faBars} />
    </Link>
          </main>
        </nav> */}

        {/* New */}

        <nav className='navbar'>
          <div className="brand-title">Geeksphere</div>
          <div className="navbar-links">
            <ul>
            <Link to="/">Home</Link>
        {!isAuth ? (<Link to="/login">Login</Link>
        ): (  
          <>
          <Link to="/createpost">Create Post</Link>
          <button className= 'Logout' onClick={SignUserOut}>Log Out</button>
          </>
          )}
            </ul>
          </div>
        </nav>
        {/* <Navbar/> */}

      {/* <Navbar/> */}
        
      <Routes>
        <Route path="/" element={<Home isAuth={isAuth}/>}/>
        <Route path="/createpost" element={<CreatePost isAuth={isAuth} />}/>
        <Route path="/login" element={<Login setIsAuth= {setIsAuth} />}/>
        <Route path="/article/:id" element={<ArticleLandingPage />} /> {/* Add this route */}
        {/* <Route path="/articlelandingpage" element={<ArticleLandingPage/>} /> */}
        {/* <Route path="/aboutme" element={<AboutMe/>} /> */}
      </Routes>
    </Router>
   
  );
}

export default App;
