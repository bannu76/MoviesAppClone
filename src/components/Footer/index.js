import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'

import './index.css'

const Footer = () => {
  console.log()

  return (
    <div className="footer-container">
      <div className="media-icons-container">
        <button className="media-button">
          <FaGoogle />
        </button>

        <button className="media-button">
          <FaTwitter />
        </button>

        <button className="media-button">
          <FaInstagram />
        </button>
        <button className="media-button">
          <FaYoutube />
        </button>
      </div>
      <p>Contact Us</p>
    </div>
  )
}

export default Footer
