import {Link} from 'react-router-dom'

import './index.css'

const SimilarMovieDetails = props => {
  const {movieDetails} = props

  const {id, posterPath, title} = movieDetails

  return (
    <li className="similar-movie-item">
      <Link to={`/movies/${id}`}>
        <img
          src={posterPath}
          alt={title}
          className="similar-movie-image"
        />
      </Link>
    </li>
  )
}

export default SimilarMovieDetails