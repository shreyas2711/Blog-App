import React from 'react';
import {FaGithubSquare} from 'react-icons/fa';
import "./navbar.css";

const Navbar = () => {
  return (
    <>
    <nav className='main-nav'>
        <div className="logo">
            <h2>
                <span>Geeksphere</span>
            </h2>
        </div>
        <div className="menu-link">
            <ul>
                <li>
                <a href="">Home</a>
                </li>
                <li>
                <a href="">Login</a>
                </li>   
                <li>
                <a href="">About</a>
                </li>
            </ul>
        </div>
        <div className="social-media">
            <ul className="social-media-desktop">
                <li><a href="https://github.com/shreyas2711"><FaGithubSquare/>
                </a>
                </li>
               
            </ul>
        </div>
    </nav> 
    </>
  )
}

export default Navbar
