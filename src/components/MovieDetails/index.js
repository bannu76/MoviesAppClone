import {useEffect, useState} from 'react'
import Cookies from 'js-cookie'
import {format} from 'date-fns'
import Loader from 'react-loader-spinner'

import './index.css'

import Header from '../Header'
import Footer from '../Footer'
import MovieItem from '../MovieItem'
const MovieDetails = props => {
  const {match} = props
  const {params} = match
  const {id} = params

  const [loading, setLoading] = useState(true)
  const [movieObject, setMovieObject] = useState({})

  const token = Cookies.get('jwt_token')
  const options = {
    method: 'GET',
    headers: {
      authorization: `bearer ${token}`,
    },
  }

  const getCaseChange = item => ({
    adult: item.adult,
    backdropPath: item.backdrop_path,
    budget: item.budget,
    genres: item.genres,
    id: item.id,
    overview: item.overview,
    posterPath: item.poster_path,
    releaseDate: item.release_date.replace(/-/g, ', '),
    runtime: item.runtime,
    similarMovies: item.similar_movies,
    spokenLanguages: item.spoken_languages,
    title: item.title,
    voteAverage: item.vote_average,
    voteCount: item.vote_count,
  })

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(
        `https://apis.ccbp.in/movies-app/movies/${id}`,
        options,
      )

      if (response.ok) {
        const data = await response.json()
        console.log(data.movie_details)
        const movieDetails = getCaseChange(data.movie_details)

        movieDetails.similarMovies = movieDetails.similarMovies.map(item => ({
          backdropPath: item.backdrop_path,
          id: item.id,
          posterPath: item.poster_path,
          title: item.title,
        }))

        const hours = Math.floor(movieDetails.runtime / 60)
        const minutes = movieDetails.runtime % 60
        movieDetails.runtime = `${hours}h ${minutes}min`

        setMovieObject(movieDetails)
        setLoading(false)
      } else {
        setLoading(true)
      }
    }

    getData()
  }, [])

  const getSpokenLanguages = () => {
    return movieObject.spokenLanguages !== undefined ? (
      <div className="specific-details-column-container">
        <ul className="specifi-text-ul">
          <li className="list-item">
            <p className="specific-heading">Audio Available</p>
          </li>
          {movieObject.spokenLanguages.map(item => (
            <li className="list-item" key={item.id}>
              {item.english_name}
            </li>
          ))}
        </ul>
      </div>
    ) : (
      ''
    )
  }

  const getGenres = () => {
    return movieObject.genres !== undefined ? (
      <div className="specific-details-column-container">
        <ul className="specific-text-ul">
          <li className="list-item">
            <p className="specific-heading">Genres</p>
          </li>
          {movieObject.genres.map(item => (
            <li className="list-item" key={item.id}>
              {item.name}
            </li>
          ))}
        </ul>
      </div>
    ) : (
      ''
    )
  }

  const getratingCount = () => {
    return movieObject.voteCount !== undefined &&
      movieObject.voteAverage !== undefined ? (
      <div className="specific-details-column-container">
        <ul className="specific-text-ul">
          <li className="list-item">
            <p className="specific-heading">Rating Count</p>
          </li>
          <li className="list-item">{movieObject.voteCount}</li>

          <li className="list-item">
            <p className="specific-heading">Rating Average</p>
          </li>
          <li className="list-item">{movieObject.voteAverage}</li>
        </ul>
      </div>
    ) : (
      ''
    )
  }

  const getBudgetReleaseDate = () => {
    return movieObject.voteCount !== undefined &&
      movieObject.voteAverage !== undefined ? (
      <div className="specific-details-column-container">
        <ul className="specific-text-ul">
          <li className="list-item">
            <p className="specific-heading">Budget</p>
          </li>
          <li className="list-item">{movieObject.budget}</li>

          <li className="list-item">
            <p className="specific-heading">Release Date</p>
          </li>
          <li className="list-item">
            {format(new Date(movieObject.releaseDate), 'do MMMM y')}
          </li>
        </ul>
      </div>
    ) : (
      ''
    )
  }

  const getMoreLikeMovies = () => {
    return movieObject.similarMovies !== undefined ? (
      <ul className="more-like-movies">
        {movieObject.similarMovies.map(item => (
          <MovieItem key={item.id} item={item} />
        ))}
      </ul>
    ) : (
      ''
    )
  }
  const renderBackdropPoster = () => {
    return (
      <div
        className="backdrop-container"
        style={{backgroundImage: `url(${movieObject.backdropPath})`}}
      >
        <Header />

        <div className="movie-detailing">
          <h1 className="movie-title">{movieObject.title}</h1>
          <div className="runtime-adult-container">
            <p>{movieObject.runtime}</p>
            <div className="adult-decor">
              <p>{movieObject.adult ? 'U' : 'U/A'}</p>
            </div>
            <p>
              {movieObject.releaseDate !== undefined
                ? format(new Date(movieObject.releaseDate), 'y')
                : ''}
            </p>
          </div>

          <p>{movieObject.overview}</p>
          <button className="play-button">Play</button>

          <div className="specific-details-container">
            {getGenres()}
            {getSpokenLanguages()}
            {getratingCount()}
            {getBudgetReleaseDate()}
          </div>
        </div>
      </div>
    )
  }

  const renderLoader = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )
  const renderAll = () => {
    return (
      <div>
        {renderBackdropPoster()}
        <h1>More like this </h1>
        {getMoreLikeMovies()}
      </div>
    )
  }

  return (
    <div className="movie-details-container">
      {loading === true ? renderLoader() : renderAll()}

      <Footer />
    </div>
  )
}
export default MovieDetails
