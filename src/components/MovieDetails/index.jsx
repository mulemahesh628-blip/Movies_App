import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import Cookies from 'js-cookie'

import Header from '../Header'
import Footer from '../Footer'
import SimilarMovieDetails from '../SimilarMovieDetails'

import './index.css'

const MovieDetails = () => {
  const [movieData, setMovieData] =
    useState(null)

  const {id} = useParams()

  useEffect(() => {
    getMovieDetails()
  }, [])

  const getMovieDetails = async () => {
    const jwtToken =
      Cookies.get('jwt_token')

    const apiUrl = `https://apis.ccbp.in/movies-app/movies/${id}`

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

      const updatedData = {
        adult:
          data.movie_details.adult,
        backdropPath:
          data.movie_details
            .backdrop_path,
        budget:
          data.movie_details.budget,
        genres:
          data.movie_details.genres,
        id: data.movie_details.id,
        overview:
          data.movie_details.overview,
        posterPath:
          data.movie_details
            .poster_path,
        releaseDate:
          data.movie_details
            .release_date,
        runtime:
          data.movie_details.runtime,
        spokenLanguages:
          data.movie_details
            .spoken_languages,
        title:
          data.movie_details.title,
        voteAverage:
          data.movie_details
            .vote_average,
        voteCount:
          data.movie_details
            .vote_count,
        similarMovies:
          data.movie_details.similar_movies.map(
            eachMovie => ({
              id: eachMovie.id,
              backdropPath:
                eachMovie.backdrop_path,
              posterPath:
                eachMovie.poster_path,
              title: eachMovie.title,
            }),
          ),
      }

      setMovieData(updatedData)
    }
  }

  if (movieData === null) {
    return <h1>Loading...</h1>
  }

  const {
    backdropPath,
    title,
    runtime,
    releaseDate,
    voteAverage,
    overview,
    genres,
    spokenLanguages,
    voteCount,
    budget,
    similarMovies,
  } = movieData

  return (
    <div className="movie-details-container">
      <Header />

      <div
        className="movie-details-banner"
        style={{
          backgroundImage: `url(${backdropPath})`,
        }}
      >
        <div className="movie-content">
          <h1>{title}</h1>

          <div className="movie-meta">
            <p>{runtime} mins</p>
            <p>{releaseDate}</p>
            <p>{voteAverage}</p>
          </div>

          <p>{overview}</p>

          <button
            type="button"
            className="play-button"
          >
            Play
          </button>
        </div>
      </div>

      <div className="movie-bottom-section">
        <div className="details-column">
          <h1 className="section-heading">
            Genres
          </h1>

          <ul className="genre-list">
            {genres.map(eachGenre => (
              <li key={eachGenre.id}>
                {eachGenre.name}
              </li>
            ))}
          </ul>
        </div>

        <div className="details-column">
          <h1 className="section-heading">
            Audio Available
          </h1>

          <ul className="audio-list">
            {spokenLanguages.map(each => (
              <li key={each.id}>
                {each.english_name}
              </li>
            ))}
          </ul>
        </div>

        <div className="details-column">
          <h1 className="section-heading">
            Rating Count
          </h1>

          <p>{voteCount}</p>

          <h1 className="section-heading">
            Rating Average
          </h1>

          <p>{voteAverage}</p>
        </div>

        <div className="details-column">
          <h1 className="section-heading">
            Budget
          </h1>

          <p>{budget}</p>

          <h1 className="section-heading">
            Release Date
          </h1>

          <p>{releaseDate}</p>
        </div>
      </div>

      <h1 className="similar-heading">
        Similar Movies
      </h1>

      <ul className="similar-movies-list">
        {similarMovies.map(eachMovie => (
          <SimilarMovieDetails
            key={eachMovie.id}
            movieDetails={eachMovie}
          />
        ))}
      </ul>

      <Footer />
    </div>
  )
}

export default MovieDetails