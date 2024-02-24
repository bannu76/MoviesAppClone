import {useState} from 'react'
import {IoMdCloseCircle} from 'react-icons/io'
import {HiOutlineSearch} from 'react-icons/hi'
import {Link} from 'react-router-dom'

import './index.css'

const Header = () => {
  const [toggleFlag, setToggleFlag] = useState(false)

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
      <Link className="nav-link" to="/account">
        Account
      </Link>
      <button className="nav-menu-button" onClick={togggleMenu}>
        <IoMdCloseCircle />
      </button>
    </div>
  )

  return (
    <div>
      <div className="header-container">
        <div className="website-logo-container">
          <img
            className="website-logo"
            src="https://res.cloudinary.com/dcyavhlbc/image/upload/v1708155229/Group_7399_wdd87l.png"
            alt="login website logo"
          />

          <Link className="nav-link-desk" to="/">
            Home
          </Link>
          <Link className="nav-link-desk" to="/popular">
            Popular
          </Link>
        </div>

        <div className="search-nav-menu">
          <Link className="nav-link" to="/search">
            <button className="search-button" data-testid="searchButton">
              <HiOutlineSearch size={28} />
            </button>
          </Link>
          <button className="nav-menu-button" onClick={togggleMenu}>
            <img
              className="nav-image"
              src="https://res.cloudinary.com/dcyavhlbc/image/upload/v1708585606/add-to-queue_1_1_gxya3y.png"
              alt="hamburger"
            />
          </button>
        </div>

        <div className="search-box-avatar-container">
          <Link to="/search">
            <button className="nav-menu-button">
              <HiOutlineSearch size={28} />
            </button>
          </Link>
          <Link className="nav-link" to="/account">
            <img
              className="nav-image"
              src="https://res.cloudinary.com/dcyavhlbc/image/upload/v1708612462/Avatar_p50rni.png"
              alt="avatar"
            />
          </Link>
        </div>
      </div>

      {toggleFlag && renderMenuItems()}
    </div>
  )
}
export default Header
