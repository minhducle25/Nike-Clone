import React from 'react'
import { makeStyles } from '@mui/styles'
import { AppBar, Toolbar, TypoG, Typography } from '@mui/material'
import signIn from './NavBarMainComponents/signIn'
import { Link } from 'react-router-dom'
import * as action from "../ListProduct/module/action/action"
import * as ActionType from "../ListProduct/module/constant/constant"
import { useDispatch } from 'react-redux'
import SignIn from './NavBarMainComponents/signIn'

const useStyles = makeStyles((theme) => ({
  nav: {
      
      backgroundColor: "white !important",
      color: "black",
      paddingLeft: 36,
      paddingRight: 38,
      position: "relative",
      boxShadow: "none",
      fontFamily: '"Helvetica Neue",Helvetica,Arial,sans-serif',
      // [theme.breakpoints.down("sm")]: {
      //   display: "none",
      // },
      zIndex: 1101,
  },
  title: {
      flexGrow: 1,
  },
  toolbar: {
      padding: 0,
      minHeight: 36,
  },
  jordan: {
      height: 24,
      width: 24,
      "&:hover": {
          opacity: 0.7,
      },
  },
  linkJordan: {
      padding: "0 12px",
      height: 34,
      display: "flex",
      alignItems: "center",
  },
  nav1: {
      height: 34,
      display: "flex",
      alignItems: "center",
      textAlign: "center",
  },
  nav1Menu: {
      margin: "0 12px",
      textDecoration: "none",
      color: "black",
      fontSize: 12,
      "&:hover": {
          color: "grey",
      },
      cursor: "pointer",
  },
  helpMenuContainer: {
      padding: "24px 24px 24px 18px",
      position: "absolute",
      right: 130,
      zIndex: 10,
      width: 200,
      fontSize: 14,
      borderRadius: 10,
      textAlign: "left",
      backgroundColor: "white",
  },
  helpMenuHeader: {
      padding: "4px 8px",
      marginBottom: 12,
      fontSize: 16,
      cursor: "pointer",
  },
  helpMenuItem: {
      color: "#757575",
      padding: "4px 8px",
      cursor: "pointer",
      "&:hover": {
          color: "black",
      },
  },
}));

const NavSub = () => {
  const classes = useStyles()
  const [helpMenu, setHelpMenu] = React.useState(false)
  const dispatch = useDispatch()
  return (
    <AppBar className={classes.nav} id="navsub">
      <Toolbar className={classes.toolbar}>
        <div id='jordan' className={classes.linkJordan}>
              <img src="/assets/images/logoJordan.svg" className={classes.jordan}/>
        <Link 
              to="/ListProduct"
              className={classes.menuItem}
              onClick={() => {
                dispatch(
                  action.createAction({
                    type: ActionType.CHANGE_GENDER_TYPEPRODUCT,
                    payload: {gender:"male", typeProduct: "shoes"},
                  })
                );
              }}
              >
                All shoes
                </Link>
                </div>
      <Typography variant='h6' className={classes.title}>
      </Typography>
      <div className={classes.nav1}>
        <div
          onMouseOver={() => setHelpMenu(true)}
          onMouseLeave={() => setHelpMenu(false)}
          >
            <span className={classes.nav1Menu}>
              help
            </span>
            {helpMenu && (
              <div className={classes.helpMenuContainer}>
                <div className={classes.helpMenuHeader}>help</div>
                <div className={classes.helpMenuItem}>Order Status</div>
                <div className={classes.helpMenuItem}>Dispatch and Delivery</div>
                <div className={classes.helpMenuItem}>return</div>
                <div className={classes.helpMenuItem}>contact us</div>
                <div className={classes.helpMenuItem}>privacy policy</div>
                <div className={classes.helpMenuItem}>terms of sale</div>
                <div className={classes.helpMenuItem}>term of use</div>
                <div className={classes.helpMenuItem}>send us feedback</div>
              </div>
            )}
        </div>
        <SignIn />
      </div>
      </Toolbar>
    </AppBar>
  )
}

export default NavSub