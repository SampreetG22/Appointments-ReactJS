import './index.css'

const AppointmentItem = props => {
  const {details, starClicked} = props
  const {id, title, date, starred} = details
  const starClick = () => {
    starClicked(id)
  }

  const Yellow =
    'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
  const White =
    'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
  const starClass = starred ? Yellow : White
  return (
    <li className="appointmentContainer">
      <div className="titleAndStarContainer">
        <p className="titleCSS">{title}</p>
        <button
          type="button"
          onClick={starClick}
          className="starBtn"
          data-testid="star"
        >
          <img src={starClass} alt="star" className="starImage" />
        </button>
      </div>
      <p className="dateCSS">Date: {date}</p>
    </li>
  )
}

export default AppointmentItem
