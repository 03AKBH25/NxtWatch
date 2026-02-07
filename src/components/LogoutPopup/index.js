import Popup from 'reactjs-popup'
import Cookies from 'js-cookie'

const LogoutPopup = props => {
  const {history} = props

  const onConfirmLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <Popup modal trigger={<button type="button">Logout</button>}>
      {close => (
        <div>
          <p>Are you sure, you want to logout</p>
          <button type="button" onClick={() => close()}>
            Cancel
          </button>
          <button type="button" onClick={onConfirmLogout}>
            Confirm
          </button>
        </div>
      )}
    </Popup>
  )
}

export default LogoutPopup
