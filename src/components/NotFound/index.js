import './index.css'

const NotFound = props => {
  const goHome = () => {
    const {history} = props
    history.replace('/')
  }

  console.log('hi')

  return (
    <div className="not-found-container">
      <img
        className="not-found-image"
        src="https://res.cloudinary.com/dcyavhlbc/image/upload/v1708780868/Page_not_found_bveq5l.png"
        alt="not found"
      />

      <img
        className="not-found-image-desk"
        src="https://res.cloudinary.com/dcyavhlbc/image/upload/v1708780898/Page_not_found_1_o2jltd.png"
        alt="not found"
      />
    </div>
  )
}
export default NotFound
