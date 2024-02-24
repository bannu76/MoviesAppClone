import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import MovieItem from '../MovieItem'
import './index.css'

const apiTerms = {fail: 'fail', success: 'success', progress: 'progress'}

const Popular = () => {
  const [apiStatus, setApiStatus] = useState(apiTerms.progress)
  const [popularList, setPopularList] = useState([])

  const token = Cookies.get('jwt_token')

  const options = {
    method: 'GET',
    headers: {
      authorization: `bearer ${token}`,
    },
  }

  const getData = async () => {
    const reponse = await fetch(
      `https://apis.ccbp.in/movies-app/popular-movies`,
      options,
    )

    if (reponse.ok) {
      const {results} = await reponse.json()
      const updateResults = results.map(item => ({
        backdropPath: item.backdrop_path,
        id: item.id,
        posterPath: item.poster_path,
        title: item.title,
      }))

      setPopularList(updateResults)
      setApiStatus(apiTerms.success)
    } else {
      setApiStatus(apiTerms.fail)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  const renderLoader = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  const renderFail = () => (
    <div className="fail-container">
      <img
        className="fail-image"
        src="https://res.cloudinary.com/dcyavhlbc/image/upload/v1708754332/Group_1_cabwfy.png"
        alt="fail"
      />
      <p className="fail-text">Something went wrong. Please try again</p>
      <button typee="button" className="try-again" onClick={getData}>
        Try Again
      </button>
    </div>
  )

  const renderPopulaList = () => (
    <ul className="unorder-search-list">
      {popularList.map(item => (
        <MovieItem item={item} key={item.id} />
      ))}
    </ul>
  )

  const renderPopularMovies = () => {
    switch (apiStatus) {
      case apiTerms.progress:
        return renderLoader()
      case apiTerms.success:
        return renderPopulaList()
      case apiTerms.fail:
        return renderFail()
      default:
        return null
    }
  }

  return (
    <div className="popular-container">
      <Header />
      {renderPopularMovies()}
    </div>
  )
}

export default Popular
