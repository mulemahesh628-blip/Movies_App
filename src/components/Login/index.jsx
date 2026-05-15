// Write your code here
import {useState} from 'react'
import {Navigate, useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'

import endpoints from '../endpoints'

import './index.css'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [showError, setShowError] = useState(false)

  const navigate = useNavigate()

  const jwtToken = Cookies.get('jwt_token')

  if (jwtToken !== undefined) {
    return <Navigate to="/" replace />
  }

  const onSubmitSuccess = jwtTokenValue => {
    Cookies.set('jwt_token', jwtTokenValue, {
      expires: 30,
    })

    localStorage.setItem('username', username)
    localStorage.setItem('password', password)

    navigate('/', {replace: true})
  }

  const onSubmitFailure = errorMessage => {
    setShowError(true)
    setErrorMsg(errorMessage)
  }

  const submitForm = async event => {
    event.preventDefault()

    const userDetails = {username, password}

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(endpoints.loginApi, options)

    const data = await response.json()

    if (response.ok) {
      onSubmitSuccess(data.jwt_token)
    } else {
      onSubmitFailure(data.error_msg)
    }
  }

  return (
    <div className="login-container">
      <form className="form-container" onSubmit={submitForm}>
        <img
          src="https://assets.ccbp.in/frontend/react-js/movies-app-login-img.png"
          alt="login website logo"
          className="login-logo"
        />

        <h1 className="login-heading">Login</h1>

        <label className="input-label" htmlFor="username">
          USERNAME
        </label>

        <input
          id="username"
          className="input-field"
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />

        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>

        <input
          id="password"
          className="input-field"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button type="submit" className="login-button">
          Login
        </button>

        {showError && <p className="error-msg">*{errorMsg}</p>}
      </form>
    </div>
  )
}

export default Login