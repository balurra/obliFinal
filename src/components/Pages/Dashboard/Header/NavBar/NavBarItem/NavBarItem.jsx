import { Link } from 'react-router-dom'
import Button from '@mui/material/Button';


const NavBarItem = ({ title, link }) => {
  return (
    <Button>
      <Link to={link}>
        {title}
      </Link>
    </Button>
  )
}

export default NavBarItem
