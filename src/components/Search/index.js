import {IoMdCloseCircle} from 'react-icons/io'
import {MdOutlineSearch} from 'react-icons/md'
import {useState, useEffect, createContext} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'

import MovieItem from '../MovieItem'
import "./index.css"

const apiTerms = {fail: 'fail', success: 'success', progress: 'progress'}

const Search = () => {
  console.log('hi')

  const [apiStatus, setApiStatus] = useState(apiTerms.progress)
  const [searchText, setSearchText] = useState('')
  const [toggleFlag, setToggleFlag] = useState(false)
  const [searchList, setSearchList] = useState([])

  const changeText = event => {
    setSearchText(event.target.value)
  }
  const onSearch = event => {
    setSearchText(event.target.value)
    console.log(event.target.value)
  }

  const token = Cookies.get('jwt_token')

  const options = {
    method: 'GET',
    headers: {
      authorization: `bearer ${token}`,
    },
  }

  const getData = async () => {
    const reponse = await fetch(
      `https://apis.ccbp.in/movies-app/movies-search?search=${searchText}`,
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

      setSearchList(updateResults)
      setApiStatus(apiTerms.success)
    } else {
      setApiStatus(apiTerms.fail)
    }
  }

  useEffect(() => {
    getData()
  }, [searchText])

  const togggleMenu = () => {
    setToggleFlag(!toggleFlag)
  }

  const renderMenuItems = () => (
    <div className="hamburger-menu">
      <Link className="nav-link" to="/">
        Home
      </Link>
      <Link className="nav-link" to="/popular">
        Popular
      </Link>
      <Link className="nav-link" to="/accout">
        Account
      </Link>
      <button className="close-hamburger-button">
        <IoMdCloseCircle />
        {}
      </button>
    </div>
  )

  const getHeader = () => (
    <div>
      <div className="h-container">
        <div className="website-logo-container">
          <img
            className="website-logo"
            src="https://res.cloudinary.com/dcyavhlbc/image/upload/v1708155229/Group_7399_wdd87l.png"
            alt="website logo"
          />

          <Link className="nav-link-desk" to="/">
            Home
          </Link>
          <Link className="nav-link-desk" to="/popular">
            Popular
          </Link>
        </div>

        <div className="search-nav-menu">
          <div className="search-input-container">
            <input type="search" onChange={onSearch} />
            <button className="search-button">
              <MdOutlineSearch />
            </button>
          </div>
          <button className="nav-menu-button" onClick={togggleMenu}>
            <img
              className="nav-image"
              src="https://res.cloudinary.com/dcyavhlbc/image/upload/v1708585606/add-to-queue_1_1_gxya3y.png"
              alt="add to queue"
            />
          </button>
        </div>

        <div className="search-box-avatar-container">
          <div className="search-input-container">
            <input
              onChange={changeText}
              placeholder="Search"
              type="search"
              onChange={onSearch}
            />
            <button className="search-button">
              <MdOutlineSearch size={28} />
            </button>
          </div>

          <img
            className="nav-image"
            src="https://res.cloudinary.com/dcyavhlbc/image/upload/v1708612462/Avatar_p50rni.png"
            alt="avatar"
          />
        </div>
      </div>
      {toggleFlag && renderMenuItems()}
    </div>
  )

  const renderSearchList = () => (
    <ul className="unorder-search-list">
      {searchList.map(item => (
        <MovieItem item={item} key={item.id} />
      ))}
    </ul>
  )

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
      <button type="button" className="try-again" onClick={getData}>
        Try Again
      </button>
    </div>
  )

  const renderNoResults = () => (
    <div className="fail-container">
      <img
        className="fail-image"
        src="https://res.cloudinary.com/dcyavhlbc/image/upload/v1708673561/Group_7394_xhodi1.png"
        alt="no movies"
      />
      <p className="fail-text">
        Your search for {searchText} did not find any matches.
      </p>
    </div>
  )

  const renderingSearchMovies = () => {
    switch (apiStatus) {
      case apiTerms.progress:
        return renderLoader()
      case apiTerms.success:
        return searchList.length === 0 ? renderNoResults() : renderSearchList()
      case apiTerms.fail:
        return renderFail()
      default:
        return null
    }
  }

  return (
    <div className="search-container">
      {getHeader()}
      {renderingSearchMovies()}
    </div>
  )
}
export default Search
