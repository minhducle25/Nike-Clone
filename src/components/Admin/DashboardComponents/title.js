import React from 'react'
import { Typography } from '@mui/material'
import PropTypes from 'prop-types' //es6

const Title = (props) => {
  return (
    <Typography componenent="h2" variant='h6' color="primary" gutterBottom>
        {props.children}
    </Typography>
  )
}
Title.propTypes = {
    children: PropTypes.node
}
export default Title