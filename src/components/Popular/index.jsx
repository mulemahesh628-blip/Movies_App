import {useEffect, useState} from 'react'
import Cookies from 'js-cookie'

import Header from '../Header'
import Movieitem from '../Movieitem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const Popular = () => {
  const [popularMovies, setPopularMovies] =
    useState([])

  const [apiStatus, setApiStatus] =
    useState(apiStatusConstants.initial)

  useEffect(() => {
    getPopularMovies()
  }, [])

  const getPopularMovies = async () => {
    setApiStatus(
      apiStatusConstants.inProgress,
    )

    const jwtToken =
      Cookies.get('jwt_token')

    const apiUrl =
      'https://apis.ccbp.in/movies-app/popular-movies'

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(
      apiUrl,
      options,
    )

    if (response.ok) {
      const data = await response.json()

      const updatedData = data.results.map(
        eachMovie => ({
          id: eachMovie.id,
          posterPath:
            eachMovie.poster_path,
          backdropPath:
            eachMovie.backdrop_path,
          title: eachMovie.title,
        }),
      )

      setPopularMovies(updatedData)

      setApiStatus(
        apiStatusConstants.success,
      )
    } else {
      setApiStatus(
        apiStatusConstants.failure,
      )
    }
  }

  const renderSuccessView = () => (
    <ul className="popular-movies-list">
      {popularMovies.map(eachMovie => (
        <MovieItem
          key={eachMovie.id}
          movieDetails={eachMovie}
        />
      ))}
    </ul>
  )

  const renderFailureView = () => (
    <div className="failure-view">
      <p>Something went wrong</p>

      <button
        type="button"
        onClick={getPopularMovies}
      >
        Try Again
      </button>
    </div>
  )

  const renderLoadingView = () => (
    <div className="loader-container">
      <p>Loading...</p>
    </div>
  )

  const renderPopularMovies = () => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderSuccessView()

      case apiStatusConstants.failure:
        return renderFailureView()

      case apiStatusConstants.inProgress:
        return renderLoadingView()

      default:
        return null
    }
  }

  return (
    <div className="popular-container">
      <Header />

      <div className="popular-content">
        {renderPopularMovies()}
      </div>
    </div>
  )
}

export default Popular