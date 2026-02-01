import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import styles from './LoginForm.module.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: '',
    showerrormsg: false,
    showpassword: false,
  }

  updateUsername = e => {
    this.setState({
      username: e.target.value,
    })
  }

  updatePassword = e => {
    this.setState({
      password: e.target.value,
    })
  }

  updateShowPassword = () => {
    this.setState(prevState => ({
      showpassword: !prevState.showpassword,
    }))
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({
      showerrormsg: true,
      errorMsg,
    })
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  renderUsername = () => {
    const {username} = this.state
    return (
      <div className={styles.fieldcont}>
        <label htmlFor="username" className={styles.labelField}>
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          onChange={this.updateUsername}
          value={username}
          className={styles.inputField}
          placeholder="Username"
        />
      </div>
    )
  }

  renderPassword = () => {
    const {password, showpassword} = this.state
    return (
      <div className={styles.fieldcont}>
        <label htmlFor="password" className={styles.labelField}>
          PASSWORD
        </label>
        <input
          type={showpassword ? 'text' : 'password'}
          id="password"
          onChange={this.updatePassword}
          value={password}
          className={styles.inputField}
          placeholder="Password"
        />
      </div>
    )
  }

  render() {
    const {showerrormsg, errorMsg, showpassword} = this.state
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className={styles.parentCont}>
        <div className={styles.mainCont}>
          <div className={styles.siteLogoCont}>
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
              className={styles.siteLogo}
              alt="logo"
            />
          </div>
          <form onSubmit={this.submitForm} className={styles.formsCont}>
            {this.renderUsername()}
            {this.renderPassword()}
            <div className={styles.checkboxcont}>
              <input
                type="checkbox"
                id="checkbox"
                className={styles.box}
                checked={showpassword}
                onChange={this.updateShowPassword}
              />
              <label className={styles.labelField} htmlFor="checkbox">
                Show Password
              </label>
            </div>
            <button className={styles.loginBtn} type="submit">
              Login
            </button>
            {showerrormsg && <p className={styles.errorMsg}>*{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default LoginForm
