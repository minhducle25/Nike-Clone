import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@mui/styles'
import CreateUser from "../../components/Admin/User/createUser"
import ListUser from "../../components/Admin/User/listUser"

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function Dashboard(){
  const classes = useStyles();
  return(
    <div>
      <CreateUser/>
      <ListUser/>
    </div>
  )
}