import NavBarItem from './NavBarItem'
import * as React from 'react';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import LogoutButton from './LogoutButton'


const NavBar = () => {
  const sections = [
    { title: 'Agregar Persona', link: 'agregar-persona' },
    { title: 'Listado Personas', link: 'listado-personas' },
    { title: 'Censados Totales', link: 'censados-totales' },
    { title: 'Analisis', link: 'analisis' },
  ]

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *': {
          m: 1,
        },
      }}
    >    
    <ButtonGroup variant="outlined" aria-label="outlined button group">
      {sections.map(({ title, link }, index) => (
        <NavBarItem title={title} link={link} key={`navmenu-item-${index}`} />

      ))}
      <LogoutButton /> 
    </ButtonGroup>
    </Box>
    )

    // <ul>
    //   {sections.map(({ title, link }, index) => (
    //     
    //   ))}
    // </ul>  )
}

export default NavBar