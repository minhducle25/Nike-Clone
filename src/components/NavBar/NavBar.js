import React from 'react'
import {Container, Hidden} from '@mui/material'
import NavSub from './NavSub'
import {Outlet} from 'react-router-dom'

const NavBar = () => {
  return (
    <div>
      <Hidden lgDown>
        <Container maxWidth="xl">
          <NavSub />
        </Container>
      </Hidden>
      <Hidden xlUp>
        <Container>
          <NavSub />
        </Container>
      </Hidden>
      {/* nhớ ghi outlet */}
      <Outlet />
    </div>
  )
}

export default NavBar