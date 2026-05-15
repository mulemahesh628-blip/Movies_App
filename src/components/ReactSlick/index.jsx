import {Link} from 'react-router-dom'

import './index.css'

const apiStatusConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const ReactSlick = props => {
  const {apiStatus, moviesList, retryFn} =
    props

  const renderLoadingView = () => (
    <div
      data-testid="loader"
      className="loader-container"
    >
      <p>Loading...</p>
    </div>
  )

  const renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />

      <p>
        Something went wrong. Please
        try again
      </p>

      <button
        type="button"
        onClick={retryFn}
      >
        Try Again
      </button>
    </div>
  )

  const renderMovies = () => (
    <div className="movies-list">
      {moviesList.map(eachMovie => (
        <Link
          to={`/movies/${eachMovie.id}`}
          key={eachMovie.id}
        >
          <img
            src={eachMovie.posterPath}
            alt={eachMovie.title}
            className="poster-image"
          />
        </Link>
      ))}
    </div>
  )

  switch (apiStatus) {
    case apiStatusConstants.inProgress:
      return renderLoadingView()

    case apiStatusConstants.failure:
      return renderFailureView()

    case apiStatusConstants.success:
      return renderMovies()

    default:
      return null
  }
}

export default ReactSlick