import React from 'react'
import { makeStyles } from '@mui/styles'
import Title from './title'
import {Link, Typography} from '@mui/material'

function preventDefault(event){
    event.preventDefault()
}

const useStyles = makeStyles({
    depositContext: {
        flex:1,
    }
})

export default function Deposits(){
    const classes = useStyles()
    return(
        <React.Fragment>
            <Title>Today Incoming</Title>
            <Typography component="p" variant="h4">
                $3,024.00
            </Typography>
            <Typography color="textSecondary" className={classes.depositContext}>
                on 15 March, 2019
            </Typography>
            <div>
                <Link color="primary" href="#" onClick={preventDefault}>
                    Details
                </Link>
            </div>
        </React.Fragment>
    )
}