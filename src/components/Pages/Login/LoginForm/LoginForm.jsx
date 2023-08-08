import { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { onLogin } from '../../../../app/slices/userSlice'
import { fetchLogin } from '../../../../services/censoAPI'
import Alert from '../../../UI/Alert'
import Button from '../../../UI/Button/Button'

const LoginForm = () => {
  const [message, setMessage] = useState('')
  const [classColor, setClassColor] = useState('')
  const [showAlert, setShowAlert] = useState(false)
  const [btnDisabled, setBtnDisabled] = useState(true)
  const inputUserName = useRef()
  const inputPassword = useRef()

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const _onLogin = ({ apiKey, id }) => {
    dispatch(onLogin({ apiKey, id }))
    navigate('/dashboard')
  }

  const _onHandleLogin = e => {
    e.preventDefault()
    if (!_isEmptyForm()) {
      setShowAlert(true)

      fetchLogin(inputUserName.current.value, inputPassword.current.value)
        .then(userData => {
          setMessage('Login exitoso')
          setClassColor('success')

          setTimeout(() => {
            _onLogin(userData)
          }, 2000)
        })
        .catch(e => {
          setShowAlert(true)
          setMessage(e.message)
          setClassColor('danger')
        })
    } else {
      setShowAlert(true)
      setMessage('Por favor complete los campos')
      setClassColor('danger')
    }
  }

  const _isEmptyForm = () => {
    return (
      inputUserName.current.value.length === 0 ||
      inputPassword.current.value.length === 0
    )
  }

  const _onHandleChange = () => {
    if (!_isEmptyForm()) {
      setBtnDisabled(false)
    } else {
      setBtnDisabled(true)
    }
  }

  return (
    <>
      <form>
        {showAlert ? <Alert classColor={classColor} message={message} /> : ''}
        <label>Username</label>
        <br />
        <input
          className='form-control'
          type='text'
          ref={inputUserName}
          onChange={_onHandleChange}
        />
        <br />
        <label>Password</label>
        <br />
        <input
          className='form-control'
          type='password'
          ref={inputPassword}
          onChange={_onHandleChange}
        />
        <br />
        <br />
        <Button
          cta={'Sign in'}
          classColor={'btn-primary'}
          onHandleClick={_onHandleLogin}
          disabled={btnDisabled}
        />
      </form>
    </>
  )
}

export default LoginForm
