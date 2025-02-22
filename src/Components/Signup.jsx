import React from 'react'

function Signup() {
  return (
    <>
   <div className='auth-container'>
      <h1>Sign Up </h1>
      <label htmlFor="username">Username:</label>
      <input type="text" id="username" className="input-field" />

      <label htmlFor="password">Password:</label>
      <input type='password' id='password' className="input-field" />

      <button className='auth-btn'>Sign Up</button> 
    </div>
</>
  )
}

export default Signup