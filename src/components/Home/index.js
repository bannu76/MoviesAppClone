import {useState, useEffect} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import MoviesScroll from './MoviesScroll'
import Footer from '../Footer'
import Header from '../Header'
import './index.css'

const apiTerms = {
  progress: 'progress',
  success: 'success',
  fail: 'fail',
}

const Home = () => {
  const [moviePoster, setMoviePoster] = useState({
    movieImageUrl: '',
    movieTitle: '',
    movieDescription: '',
  })
  const [trendVideos, setTrendVideos] = useState([])
  const [originals, setOriginals] = useState([])

  const [trendApiStatus, setTrendApiStatus] = useState(apiTerms.progress)
  const [originalsApiStatus, setOriginalsApiStatus] = useState(
    apiTerms.progress,
  )
  const [moviePosterApiStatus, setmoviePosterApiStatus] = useState(
    apiTerms.progress,
  )

  const caseChange = item => ({
    backDropPath: item.backdrop_path,
    id: item.id,
    overview: item.overview,
    posterPath: item.poster_path,
    title: item.title,
  })
  const token = Cookies.get('jwt_token')

  const options = {
    method: 'GET',
    headers: {
      authorization: `Bearer ${token} `,
    },
  }

  useEffect(() => {
    const getData = async () => {
      const res = await fetch(
        'https://apis.ccbp.in/movies-app/trending-movies',
        options,
      )

      if (res.ok) {
        const {results} = await res.json()

        const updatedData = results.map(item => caseChange(item))
        setTrendApiStatus(apiTerms.success)
        setTrendVideos(updatedData)
      } else {
        setTrendApiStatus(apiTerms.fail)
      }
    }
    getData()
  }, [])

  useEffect(() => {
    const getData = async () => {
      const originalsRes = await fetch(
        'https://apis.ccbp.in/movies-app/originals',
        options,
      )

      if (originalsRes.ok) {
        const {results} = await originalsRes.json()
        const updateedOrignalsData = results.map(item => caseChange(item))
        setOriginalsApiStatus(apiTerms.success)
        setOriginals(updateedOrignalsData)

        const moviePosterIndex = Math.abs(
          Math.ceil(Math.random() * updateedOrignalsData.length - 1),
        )
        const BackgroudMovie = updateedOrignalsData[moviePosterIndex]
        setmoviePosterApiStatus(apiTerms.success)
        setMoviePoster({
          ...moviePoster,
          movieImageUrl: BackgroudMovie.backDropPath,
          movieTitle: BackgroudMovie.title,
          movieDescription: BackgroudMovie.overview,
        })
      } else {
        setOriginalsApiStatus(apiTerms.fail)
        setmoviePosterApiStatus(apiTerms.fail)
      }
    }

    getData()
  }, [])

  const renderLoader = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  const renderFail = () => {
    return (
      <div className="fail-container">
        <img
          className="fail-image"
          src="https://res.cloudinary.com/dcyavhlbc/image/upload/v1708499306/alert-triangle_ad7li7.png"
          alt="fail"
        />
        <p>Something went wrong. Please try again</p>
        <button className="try-again">Try Again</button>
      </div>
    )
  }

  const renderBackGroundPoster = () => (
    <div
      className="home-container"
      style={{backgroundImage: `url(${moviePoster.movieImageUrl})`}}
    >
      <div className="header-self-align">
        <Header />
      </div>
      <div className="summary">
        <h1>{moviePoster.movieTitle}</h1>
        <p>{moviePoster.movieDescription}</p>
        <button className="movie-play-button">Play</button>
      </div>
    </div>
  )

  const renderData = moviesData => {
    console.log()
    return <MoviesScroll movies={moviesData} />
  }

  const rendering = (apiStatus = '', moviesData = '') => {
    switch (apiStatus) {
      case apiTerms.progress:
        return renderLoader()
      case apiTerms.success:
        return renderBackGroundPoster()
      case apiTerms.fail:
        return renderFail()
      default:
        return null
    }
  }

  const renderingMovies = (apiStatus = '', moviesData = '') => {
    switch (apiStatus) {
      case apiTerms.progress:
        return renderLoader(moviesData)
      case apiTerms.success:
        return renderData(moviesData)
      case apiTerms.fail:
        return renderFail()
      default:
        return null
    }
  }

  return (
    <div className="home-main-container">
      {rendering(moviePosterApiStatus)}

      <h1 className="movie-heading">Trending Now</h1>

      {renderingMovies(trendApiStatus, trendVideos)}

      <h1 className="movie-heading">originals</h1>

      {renderingMovies(originalsApiStatus, originals)}

      <Footer />
    </div>
  )
}

export default Home
