// Write your JS code here
import {Component} from 'react'
import './index.css'

class RegistrationForm extends Component {
  state = {
    submit: false,
    firstName: '',
    lastName: '',
    lnameMsg: '',
    fnameMsg: '',
    onBlurFname: false,
    onBlurLname: false,
  }

  onBlurInputFname = () => {
    const {firstName} = this.state
    if (firstName.length === 0) {
      this.setState({onBlurFname: true, fnameMsg: 'Required'})
    } else {
      this.setState({onBlurFname: false, fnameMsg: ''})
    }
  }

  onBlurInputLName = () => {
    const {lastName} = this.state
    if (lastName.length === 0) {
      this.setState({onBlurLname: true, lnameMsg: 'Required'})
    } else {
      this.setState({onBlurLname: false, lnameMsg: ''})
    }
  }

  onChangeFirstName = async event => {
    await this.setState({firstName: event.target.value})
    await this.onBlurInputFname()
  }

  onChangeLastName = async event => {
    await this.setState({lastName: event.target.value})
    await this.onBlurInputLName()
  }

  fillTheForm = () => {
    const {
      lnameMsg,
      fnameMsg,
      firstName,
      lastName,
      onBlurFname,
      onBlurLname,
    } = this.state
    const firstNameStyle = onBlurFname ? 'blurred-style' : 'input-style'
    const lastNameStyle = onBlurLname ? 'blurred-style' : 'input-style'
    return (
      <form className="registration-card" onSubmit={this.onFormSubmit}>
        <div className="input-fields-container">
          <div className="input-field">
            <label htmlFor="firstName" className="label-style">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              placeholder="First Name"
              className={firstNameStyle}
              value={firstName}
              onChange={this.onChangeFirstName}
              onBlur={this.onBlurInputFName}
            />
            <p className="err-msg">{fnameMsg}</p>
          </div>
          <div className="input-field">
            <label htmlFor="lastName" className="label-style">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              placeholder="Last Name"
              className={lastNameStyle}
              value={lastName}
              onChange={this.onChangeLastName}
              onBlur={this.onBlurInputLName}
            />
            <p className="err-msg">{lnameMsg}</p>
          </div>
          <button type="submit" className="submit-btn">
            Submit
          </button>
        </div>
      </form>
    )
  }

  onFormSubmit = event => {
    event.preventDefault()
    const {firstName, lastName} = this.state
    if (firstName.length === 0) {
      this.setState({fnameMsg: 'Required', onBlurFname: true})
    }
    if (lastName.length === 0) {
      this.setState({lnameMsg: 'Required', onBlurLname: true})
    }
    if (firstName.length === 0 && lastName.length === 0) {
      this.setState({
        fnameMsg: 'Required',
        lnameMsg: 'Required',
        onBlurFname: true,
        onBlurLname: true,
      })
    }
    if (firstName.length !== 0 && lastName.length !== 0) {
      this.setState({submit: true, onBlurFname: false, onBlurLname: false})
    }
  }

  fillAnotherForm = () => (
    <div className="submitted-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/success-icon-img.png "
        alt="success"
        className="submit-img"
      />
      <p className="submitted">Submitted Successfully</p>
      <button
        type="button"
        className="submit-btn"
        onClick={this.onSubmitAnotherResponse}
      >
        Submit Another Response
      </button>
    </div>
  )

  onSubmitAnotherResponse = () => {
    this.setState({
      submit: false,
      lnameMsg: '',
      fnameMsg: '',
      firstName: '',
      lastName: '',
    })
  }

  render() {
    const {submit} = this.state
    const displayView = submit ? this.fillAnotherForm() : this.fillTheForm()
    return (
      <div className="registration-bg-container">
        <h1 className="heading">Registration</h1>
        {displayView}
      </div>
    )
  }
}
export default RegistrationForm
