import {useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'

import Header from '../Header'
import Footer from '../Footer'

import './index.css'

const Account = () => {
  const navigate = useNavigate()

  const onClickLogout = () => {
    Cookies.remove('jwt_token')

    navigate('/login', {replace: true})
  }

  return (
    <div className="account-container">
      <Header />

      <div className="account-content">
        <h1>Account</h1>

        <hr />

        <div className="account-details">
          <p className="label-text">
            Member ship
          </p>

          <div>
            <p>rahul</p>

            <p>Password</p>

            <p>********</p>
          </div>
        </div>

        <hr />

        <div className="account-details">
          <p className="label-text">
            Plan details
          </p>

          <div className="plan-container">
            <p>Premium</p>

            <p className="plan-type">
              Ultra HD
            </p>
          </div>
        </div>

        <hr />

        <div className="logout-container">
          <button
            type="button"
            className="logout-button"
            onClick={onClickLogout}
          >
            Logout
          </button>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Account