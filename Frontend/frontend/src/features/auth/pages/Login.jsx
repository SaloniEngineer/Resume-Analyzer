import React, { useState } from 'react'
import '../auth.from.scss' 
import { useAuth } from '../hooks/useAuth'
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const { loading, handleLogin } = useAuth() // 

  const navigate = useNavigate()
  
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("") // 

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    try {
      await handleLogin({ email, password }) // 
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed') // 
    }
  }

  if (loading) {
    return <main><h1>Loading...</h1></main>
  }

  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>
        {error && <p style={{ color: 'red' }}>{error}</p>} 
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className='button primary-button'>Login</button>
        </form>
        <p>Don't have an account? <Link to="/register">Register</Link></p>
      </div>
    </main>
  )
}

export default Login