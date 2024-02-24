import {Link} from 'react-router-dom'
import './index.css'


const MovieItem = props => {
  const {item} = props

  return (
    <div className="item-container">
      <Link className="nav-link" to={`movies-app/movies/${item.id}`}>
        <img className="movie-image" src={item.posterPath} alt={item.title} />
      </Link>
    </div>
  )
}
export default MovieItem
