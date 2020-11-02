import React from 'react'

import Navbar from '../components/Navbar'
import LoginCard from '../components/Login Card/login'
import '../style/Login.css'

const Login = () => {
  return (
    <div className="Login-MainContainer">
      <Navbar />
      <div className="Login-Background">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="#044BD9"
            d="M49.9,-57.1C65.8,-46.2,80.4,-31.5,84.8,-13.9C89.1,3.7,83.2,24.2,71.7,39C60.3,53.8,43.2,62.9,25,70.3C6.7,77.7,-12.9,83.4,-28.7,78C-44.6,72.6,-56.7,56.2,-65.9,38.8C-75.2,21.3,-81.5,2.9,-78.9,-14.3C-76.3,-31.6,-64.9,-47.6,-50.3,-58.7C-35.6,-69.9,-17.8,-76,-0.4,-75.5C17,-75.1,34.1,-68,49.9,-57.1Z"
            transform="translate(100 100)"
          />
        </svg>
      </div>
      <div className="Login-Card">
        <LoginCard />
      </div>
    </div>
  )
}

export default Login