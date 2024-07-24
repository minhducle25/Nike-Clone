import React from 'react'
import {Container, CssBaseline, cssbaseline} from '@mui/material'
import ListProduct from '../../components/ListProduct/ListProduct'

const ListProductPage = () => {
  return (
    <React.Fragment>
        <CssBaseline />
        <Container maxWidth="xl">
            <ListProduct />
        </Container>
    </React.Fragment>
  )
}

export default ListProductPage