import React from 'react'

function Signin() {
  return (
    <>
   <div className='auth-container'>
      <h1>Sign In </h1>
      <label htmlFor="username">Username:</label>
      <input type="text" id="username" className="input-field" />

      <label htmlFor="password">Password:</label>
      <input type='password' id='password' className="input-field" />

      <button className='auth-btn'>Sign In</button> 
    </div>
</>
  )
}

export default Signin