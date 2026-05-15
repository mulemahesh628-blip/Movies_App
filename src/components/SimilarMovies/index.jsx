import './index.css'

const SimilarMovies = props => {
  const {movieDetails} = props

  return (
    <li className="similar-movie-item">
      <img
        src={movieDetails.poster_path}
        alt={movieDetails.title}
        className="similar-movie-image"
      />
    </li>
  )
}

export default SimilarMovies