// Write your code here
/*eslint-disable*/
import {useEffect, useState} from 'react'
import Cookies from 'js-cookie'

import Header from '../Header'
import ReactSlick from '../ReactSlick'
import Footer from '../Footer'
import endpoints from '../endpoints'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const Home = () => {
  const [trendingMovies, setTrendingMovies] = useState([])

  const [originalMovies, setOriginalMovies] = useState([])

  const [bannerMovie, setBannerMovie] = useState(null)

  const [trendingStatus, setTrendingStatus] = useState(
    apiStatusConstants.initial,
  )

  const [originalStatus, setOriginalStatus] = useState(
    apiStatusConstants.initial,
  )

  const getTrendingMovies = async () => {
    setTrendingStatus(apiStatusConstants.inProgress)

    const jwtToken = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(endpoints.trendingMoviesApi, options)

    if (response.ok) {
      const data = await response.json()

      const updatedData = data.results.map(eachMovie => ({
        id: eachMovie.id,
        title: eachMovie.title,
        overview: eachMovie.overview,
        posterPath: eachMovie.poster_path,
        backdropPath: eachMovie.backdrop_path,
      }))

      setTrendingMovies(updatedData)

      setTrendingStatus(apiStatusConstants.success)
    } else {
      setTrendingStatus(apiStatusConstants.failure)
    }
  }

  const getOriginalMovies = async () => {
    setOriginalStatus(apiStatusConstants.inProgress)

    const jwtToken = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(endpoints.originalsApi, options)

    if (response.ok) {
      const data = await response.json()

      const updatedData = data.results.map(eachMovie => ({
        id: eachMovie.id,
        title: eachMovie.title,
        overview: eachMovie.overview,
        posterPath: eachMovie.poster_path,
        backdropPath: eachMovie.backdrop_path,
      }))

      setOriginalMovies(updatedData)

      if (updatedData.length > 0) {
        setBannerMovie(updatedData[0])
      }

      setOriginalStatus(apiStatusConstants.success)
    } else {
      setOriginalStatus(apiStatusConstants.failure)
    }
  }

  useEffect(() => {
    getTrendingMovies()
    getOriginalMovies()
  }, [])

  return (
    <div className="home-container">
      <div className="home-banner">
        <Header />

        {originalStatus === apiStatusConstants.success && (
          <div
            className="banner-content"
            style={{
              backgroundImage: `url(${bannerMovie.backdropPath})`,
            }}
          >
            <h1>{bannerMovie.title}</h1>

            <p>{bannerMovie.overview}</p>

            <button type="button" className="play-button">
              Play
            </button>
          </div>
        )}
      </div>

      <div className="movies-section">
        <h1 className="movies-heading">Trending Now</h1>

        <ReactSlick
          apiStatus={trendingStatus}
          moviesList={trendingMovies}
          retryFn={getTrendingMovies}
        />

        <h1 className="movies-heading">Originals</h1>

        <ReactSlick
          apiStatus={originalStatus}
          moviesList={originalMovies}
          retryFn={getOriginalMovies}
        />
      </div>

      <Footer />
    </div>
  )
}

export default Home