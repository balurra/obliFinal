import { useDispatch } from 'react-redux'
import { onLogout } from '../../../../../../app/slices/userSlice'
import { removeUserFromLocalStorage } from '../../../../../../utils/storage'
import Button from '@mui/material/Button';


const LogoutButton = () => {
  const dispatch = useDispatch()

  const _onLogout = e => {
    e.preventDefault()
    removeUserFromLocalStorage()
    dispatch(onLogout())
  }

  return (
    <Button onClick={_onLogout}>Log out</Button>
  )
}

export default LogoutButton
