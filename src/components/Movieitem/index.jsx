import {Link} from 'react-router-dom'

import './index.css'

const MovieItem = props => {
  const {movieDetails} = props

  const {
    id,
    posterPath,
    title,
  } = movieDetails

  return (
    <li className="movie-item">
      <Link to={`/movies/${id}`}>
        <img
          src={posterPath}
          alt={title}
          className="movie-image"
        />
      </Link>
    </li>
  )
}

export default MovieItem