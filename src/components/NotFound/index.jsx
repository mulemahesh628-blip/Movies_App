import {Link} from 'react-router-dom'

import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <img
      src="https://res.cloudinary.com/dxujdlh0c/image/upload/v1757403348/not-found-img_rj6hyf.png"
      alt="not found"
      className="not-found-image"
    />

    <h1>Lost Your Way</h1>

    <p>
      we are sorry, the page you requested could not be found Please go back to
      the homepage.
    </p>

    <Link to="/">
      <button type="button" className="home-button">
        Go to Home
      </button>
    </Link>
  </div>
)

export default NotFound