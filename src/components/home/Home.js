import React from 'react'
import {useNavigate, useParams} from "react-router-dom"
import "./home.css"
import {API} from "../../global/connect"

function Home() {
const {email} = useParams()
const navigate =useNavigate()
  const logout=()=>{
    fetch(`${API}/user/logout/${email}`,{
      method:'DELETE',
      
    })
    .then(()=>(navigate('/signin')))
  }
  return (
    <div className='home'>
      <div className='welcome'>
        <p className='welcomeText'>Welcome Buddy</p>
        <p className='logout' onClick={()=>logout()}>Logout</p>
      </div>
      <div className='code'></div>
    </div>
  )
}

export default Home