import {Component} from 'react'
import {v4} from 'uuid'
import './index.css'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem'

class Appointments extends Component {
  state = {titleIP: '', dateIP: '', appointmentsList: [], starFilteredON: false}

  addAppointment = () => {
    const {titleIP, dateIP} = this.state
    const formattedDate = dateIP
      ? format(new Date(dateIP), 'dd MMMM yyyy, EEEE')
      : ''
    if (titleIP !== '' && dateIP !== '') {
      const newAppointment = {
        id: v4(),
        title: titleIP,
        date: formattedDate,
        starred: false,
      }
      this.setState(prevState => ({
        appointmentsList: [...prevState.appointmentsList, newAppointment],
        titleIP: '',
        dateIP: '',
      }))
    }
  }

  starClicked = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, starred: !eachAppointment.isStarred}
        }
        return eachAppointment
      }),
    }))
  }

  inputValChange = event => {
    this.setState({titleIP: event.target.value})
  }

  dateValChange = event => {
    this.setState({dateIP: event.target.value})
  }

  filterStarred = () => {
    const {starFilteredON, appointmentsList} = this.state
    if (appointmentsList.length !== 0) {
      this.setState({starFilteredON: !starFilteredON})
    }
  }

  getFilteredAppoints = () => {
    const {appointmentsList, starFilteredON} = this.state
    if (starFilteredON) {
      return appointmentsList.filter(each => each.starred === true)
    }
    return appointmentsList
  }

  render() {
    const {titleIP, dateIP, starFilteredON} = this.state
    const starredBtnClass = starFilteredON ? 'Filled' : 'Empty'
    const filteredAppointmentList = this.getFilteredAppoints()
    return (
      <div className="mainContainer">
        <div className="cardContainer">
          <h1 className="mainHead">Add Appointment</h1>
          <div className="allDetailsContainer">
            <div className="title-and-date-Container">
              <label htmlFor="IPBox" className="labelCSS">
                Title
              </label>
              <input
                id="IPBox"
                className="inputBoxName"
                onChange={this.inputValChange}
                placeholder="Title"
                value={titleIP}
              />
              <label htmlFor="IPDate" className="labelCSS">
                Date
              </label>
              <input
                id="IPDate"
                type="date"
                className="inputDate"
                onChange={this.dateValChange}
                value={dateIP}
              />
              <button
                type="button"
                onClick={this.addAppointment}
                className="addBtn"
              >
                Add
              </button>
            </div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="imageAlter"
            />
          </div>
          <hr className="lineCSS" />
          <div className="appointmentsContainer">
            <div className="headAndStarred">
              <h1 className="appointmentsHead">Appointments</h1>
              <button
                className={starredBtnClass}
                onClick={this.filterStarred}
                type="button"
              >
                Starred
              </button>
            </div>
            <ul className="appointmentsList">
              {filteredAppointmentList.map(eachAppoint => (
                <AppointmentItem
                  key={eachAppoint.id}
                  details={eachAppoint}
                  starClicked={this.starClicked}
                  filterStarred={this.filterStarred}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
