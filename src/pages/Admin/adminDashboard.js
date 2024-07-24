import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@mui/styles'
import Chart from '../../components/Admin/DashboardComponents/chart'
import Deposits from '../../components/Admin/DashboardComponents/deposit'
import Orders from '../../components/Admin/DashboardComponents/orders'
import {Grid, Paper} from '@mui/material'

const useStyles = makeStyles((theme) => ({
  paper: {
      // padding: theme.spacing(2),
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
  },
  fixedHeight: {
      height: 240,
  },
}));

export default function Dashboard(){
  const classes = useStyles()
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)

    return(
      <Grid container spacing={3}>
        <Grid item xs={12} md={8} lg={9}>
          <Paper className={fixedHeightPaper}>
            <Chart />
          </Paper>
        </Grid>
        {/* {Recent Deposit} */}
        <Grid item xs={12} md={4} lg={3}>
          <Paper className={fixedHeightPaper}>
            <Deposits />
          </Paper>
        </Grid>
        {/*Recent Orders */}
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Orders />
          </Paper>
        </Grid>
      </Grid>
    )
}