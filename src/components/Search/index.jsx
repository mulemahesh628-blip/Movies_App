import {useState} from 'react'

import Cookies from 'js-cookie'

import Header from '../Header'
import MovieItem from '../Movieitem'
import endpoints from '../endpoints'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const Search = () => {
  const [searchInput, setSearchInput] =
    useState('')

  const [moviesList, setMoviesList] =
    useState([])

  const [apiStatus, setApiStatus] =
    useState(apiStatusConstants.initial)

  const changeSearchInput = value => {
    setSearchInput(value)
  }

  const getMovies = async () => {
    setApiStatus(
      apiStatusConstants.inProgress,
    )

    const jwtToken =
      Cookies.get('jwt_token')

    const apiUrl = `${endpoints.searchMoviesApi}?search=${searchInput}`

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

      const updatedData =
        data.results.map(eachMovie => ({
          id: eachMovie.id,
          title: eachMovie.title,
          posterPath:
            eachMovie.poster_path,
        }))

      const filteredData =
        updatedData.filter(
          eachMovie =>
            eachMovie.posterPath !== null,
        )

      setMoviesList(filteredData)

      setApiStatus(
        apiStatusConstants.success,
      )
    } else {
      setApiStatus(
        apiStatusConstants.failure,
      )
    }
  }

  const renderMovies = () => {
    if (moviesList.length === 0) {
      return (
        <div>
          <p>
            Your search for {searchInput}{' '}
            did not find any matches.
          </p>
        </div>
      )
    }

    return (
      <ul className="search-movies-container">
        {moviesList.map(eachMovie => (
          <MovieItem
            key={eachMovie.id}
            movieDetails={eachMovie}
          />
        ))}
      </ul>
    )
  }

  const renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />

      <h1>
        Something went wrong. Please
        try again
      </h1>

      <button
        type="button"
        onClick={getMovies}
      >
        Try Again
      </button>
    </div>
  )

  const renderLoadingView = () => (
    <div
      data-testid="loader"
      className="loader-container"
    >
      <p>Loading...</p>
    </div>
  )

  const renderSearchResults = () => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderMovies()

      case apiStatusConstants.failure:
        return renderFailureView()

      case apiStatusConstants.inProgress:
        return renderLoadingView()

      default:
        return null
    }
  }

  return (
    <div className="search-container">
      <Header
        searchInput={searchInput}
        changeSearchInput={
          changeSearchInput
        }
        getMoviesWithInitialValue={
          getMovies
        }
      />

      {renderSearchResults()}
    </div>
  )
}

export default Search