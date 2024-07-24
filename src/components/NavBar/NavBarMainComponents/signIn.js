import React from "react";
import { makeStyles } from "@mui/styles";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import { connect } from "react-redux";
import * as action from "./module/action/action";
import { useForm } from "react-hook-form";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { LOGOUT } from "./module/constant/constant";
import { Link } from "react-router-dom";
import { ErrorMessage } from "@hookform/error-message";

// import Link from '@mui/material/Link';

const preventDefault = (event) => event.preventDefault();
const useStyles = makeStyles((theme) => ({
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
  backdrop: {
    minHeight: 500,
    margin: "auto",
    width: 512,
    // [theme.breakpoints.down("xs")]: {
    //   width: 320,
    // },
  },
  SignInContainer: {
    margin: "0 28px",
    padding: 28,
    // [theme.breakpoints.down("xs")]: {
    //   margin: 0,
    // },
  },
  nike: {
    width: 50,
    hegiht: 17,
  },
  formHeader: {
    padding: "30px 0",
    margin: "0 auto",
    fontSize: "20px",
    maxWidth: "25ch",
    lineHeight: "26px",
    textAlign: "center",
    fontWeight: 700,
  },
  inputContainer: {
    margin: "15px 0",
  },
  input: {
    width: "100%",
    border: "1px solid #e5e5e5",
    borderRadius: 3,
    color: "#8d8d8d",
    height: 40,
    lineHeight: 17,
    padding: "0 16px",
    outline: 0,
  },
  inputValid: {
    color: "#fe0000",
    fontSize: 12,
  },
  NikeBirthday: {
    fontSize: 12,
    color: "#8d8d8d",
    textAlign: "center",
  },
  formSupport: {
    margin: "18px 0",
    color: "#8D8D8D",
    fontSize: 12,
    display: "flex",
  },
  formSupportGrow: {
    flexGrow: 1,
    verticalAlign: "baseline",
  },
  forgotPassword: {
    color: "#8D8D8D",
    textDecoration: "none",
  },
  formTerm: {
    fontSize: 12,
    textAlign: "center",
    color: "#8d8d8d",
    maxWidth: 285,
    margin: "3px auto 24px",
  },
  buttonSignIn: {
    width: "100%",
    borderRadius: 3,
    border: "none",
    color: "#fff",
    fontSize: 15,
    backgroundColor: "black",
    height: 40,
    fontWeight: 500,
    margin: "5px 0",
    cursor: "pointer",
  },
  facebookLink: {
    width: "100%",
    borderRadius: 3,
    border: "none",
    color: "#fff",
    fontSize: 15,
    backgroundColor: "#4267B2",
    height: 40,
    fontWeight: 500,
    margin: "5px 0",
    cursor: "pointer",
  },
  facebookContainer: {
    display: "flex",
    alignItems: "center",
    margin: "0px auto",
    width: 190,
  },
  Imange: {
    height: 30,
    width: 30,
    marginLeft: 10,
  },
  googleLink: {
    width: "100%",
    borderRadius: 3,
    border: "none",
    color: "#fff",
    fontSize: 15,
    backgroundColor: "#DE5246",
    height: 40,
    fontWeight: 500,
    margin: "5px 0",
    cursor: "pointer",
  },
  googleContainer: {
    display: "flex",
    alignItems: "center",
    margin: "0px auto",
    width: 170,
  },
  joinUsContainer: {
    marginTop: 10,
    color: "#8d8d8d",
    fontSize: 12,
  },
  joinUs: {
    color: "black",
  },
  closeSignIn: {
    position: "absolute",
    right: 10,
    top: 10,
    color: "black",
  },
  signInWithNormal: {
    // [theme.breakpoints.down("xs")]: {
    //   display: "none",
    // },
    // [theme.breakpoints.up("sm")]: {
    //   display: "block",
    // },
  },
  signInWithMobile: {
    // [theme.breakpoints.down("xs")]: {
    //   display: "block",
    // },
    // [theme.breakpoints.up("sm")]: {
    //   display: "none",
    // },
  },
  UserMenuContainer: {
    padding: "24px 24px 24px 18px",
    position: "absolute",
    right: 0,
    zIndex: 10,
    width: 200,
    fontSize: 14,
    borderRadius: 10,
    textAlign: "left",
    backgroundColor: "white",
  },
  UserMenuHeader: {
    padding: "4px 8px",
    marginBottom: 12,
    fontSize: 16,
    cursor: "pointer",
  },
  UserMenuItem: {
    color: "#757575",
    padding: "4px 8px",
    cursor: "pointer",
    "&:hover": {
      color: "black",
    },
    width: '100%',
  },
  UserIcon: {
    marginLeft: 10,
    height: 28,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function SignIn(props) {
  const classes = useStyles();

  let { open } = props;
  let { openSU } = props;
  let { isAdmin } = props;

  const [userMenu, setUserMenu] = React.useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm( {criteriaMode: "all"});
  // const onSubmit = (data) => console.log(data);
  /*Validate form */
  // const { register, handleSubmit, errors } = useForm({
  //   mode: "onBlur",
  // });
  const onSubmit = (data, e) => {
    console.log(data);
    let form = document.getElementById("formSignIn");
    form.reset();
    // console.log(data);
    props.callApiLogin(data);
  };
  // console.log(props);

  const onCloseSignIn = (data, e) => {
    let form = document.getElementById("formSignIn");
    form.reset();
  };
  // console.log(props);

  const onSubmitSignUp = () => {
    let form = document.getElementById("formSignUp");
    form.reset();
  };
  let { userLocal } = props;
  // console.log(userLocal.hoTen);
  return (
    <span>
      {!userLocal && (
        <div>
          <span className={classes.nav1Menu}>Join Us</span>|
          <span
            className={classes.nav1Menu}
            onClick={() => {
              props.emitOpen(!props.open);
            }}
          >
            Sign In
          </span>
          <Dialog
            open={open ? true : false}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => {
              props.emitOpen(!props.open);
              onCloseSignIn();
            }}
            classes={{
              root: classes.backdrop,
            }}
          >
            <div className={classes.SignInContainer}>
              {/*Close button*/}
              <IconButton
                className={classes.closeSignIn}
                onClick={() => {
                  props.emitOpen(!props.open);
                  onCloseSignIn();
                }}
              >
                <CloseIcon />
              </IconButton>

              {/*Header*/}
              <div>
                <center>
                  <img
                    src="https://www.logomaker.com/wp-content/uploads/2018/05/2000px-Logo_NIKE.png"
                    className={classes.nike}
                    alt=""
                  />
                </center>
              </div>
              <div className={classes.formHeader}>
                YOUR ACCOUNT FOR EVERYTHING NIKE
              </div>

              {/*Form*/}
              <form id="formSignIn" onSubmit={handleSubmit(onSubmit)}>
                {/*Input*/}
                <div className={classes.inputContainer}>
                  <input
                    type="text"
                    placeholder="Email"
                    className={classes.input}
                    name="email"
                    {...register("email", {
                      required: "This input is required",
                      pattern: {
                        value: "",
                        message: "This input is number only."
                      },
                      minLength: {
                        value: "",
                        message: "This input must exceed 10 characters"
                      }
                    })}

                    // {...register("email", { required: true },)}
                  />
                  <ErrorMessage
                    errors={errors}
                    name="email"
                    render={({ messages }) => {
                      console.log("messages", messages);
                      return messages
                        ? Object.entries(messages).map(([type, message]) => (
                          <p key={type}>{message}</p>
                        ))
                        : null;
                    }}
                  />
                </div>
                <div className={classes.inputContainer}>
                  <input
                    type="password"
                    placeholder="Password"
                    className={classes.input}
                    name="password"
                    // style={{ borderColor: errors.password && "red" }}
                    // ref={register({
                    //   required: true,
                    // })}
                    {...register("password", { required: true })}
                  />
                  {/* {errors.password && (
                    <p className={classes.inputValid}>
                      Please enter a password.
                    </p>
                  )} */}
                </div>
                {/*Support*/}
                <div className={classes.formSupport}>
                  <span className={classes.formSupportGrow}>
                    <input type="checkbox" style={{ margin: "0 15px 0 0" }} />
                    Keep me signed in
                  </span>
                  <span
                    className={classes.formSupportGrow}
                    style={{ textAlign: "right" }}
                  >
                    <a href="#a" className={classes.forgotPassword}>
                      Forgot password?
                    </a>
                  </span>
                </div>
                {/*Term*/}
                <div className={classes.formTerm}>
                  By logging in, you agree to Nike's{" "}
                  <a href="#a" style={{ color: "#8d8d8d" }}>
                    Privary Policy
                  </a>{" "}
                  and{" "}
                  <a href="#a" style={{ color: "#8d8d8d" }}>
                    Term of Use
                  </a>
                </div>
                {/*Sign In*/}
                <input
                  className={classes.buttonSignIn}
                  type="submit"
                  value="SIGN IN"
                />

                <center>
                  <b>OR</b>
                </center>

                {/*Sign In with FB or GG normal*/}
                <span className={classes.signInWithNormal}>
                  <button className={classes.facebookLink}>
                    <span className={classes.facebookContainer}>
                      Sign in with Facebook{" "}
                      <img
                        src="https://www.facebook.com/images/fb_icon_325x325.png"
                        className={classes.Imange}
                        alt=""
                      />
                    </span>
                  </button>
                  <button className={classes.googleLink}>
                    <span className={classes.googleContainer}>
                      Sign in with Google{" "}
                      <img
                        src="https://icons-for-free.com/iconfiles/png/512/app+global+google+plus+ios+media+social+icon-1320193328869704656.png"
                        className={classes.Imange}
                        alt=""
                      />
                    </span>
                  </button>
                </span>

                {/*Sign In with FB or GG mobile*/}
                <center className={classes.signInWithMobile}>
                  <a href="#a">
                    <img
                      src="https://www.facebook.com/images/fb_icon_325x325.png"
                      className={classes.Imange}
                      alt=""
                    />
                  </a>
                  <a href="#a">
                    <img
                      src="https://icons-for-free.com/iconfiles/png/512/app+global+google+plus+ios+media+social+icon-1320193328869704656.png"
                      className={classes.Imange}
                      alt=""
                    />
                  </a>
                </center>

                {/*Sign Up*/}
                <center className={classes.joinUsContainer}>
                  Not a member?{" "}
                  <a
                    className={classes.joinUs}
                    onClick={() => {
                      props.emitOpenSU(!props.openSU);
                      props.emitOpen(!props.open);
                      onCloseSignIn();
                    }}
                  >
                    Join Us
                  </a>
                </center>
              </form>
            </div>
          </Dialog>
          <Dialog
            open={openSU ? true : false}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => {
              props.emitOpenSU(!props.openSU);
              onSubmitSignUp();
            }}
            classes={{
              root: classes.backdrop,
            }}
          >
            <div className={classes.SignInContainer}>
              {/*Close button*/}
              <IconButton
                className={classes.closeSignIn}
                onClick={() => {
                  props.emitOpenSU(!props.openSU);
                  onSubmitSignUp();
                }}
              >
                <CloseIcon />
              </IconButton>

              {/* <SignUp /> */}

              {/*Sign In*/}
              <center className={classes.joinUsContainer}>
                Already a Member?{" "}
                <a
                  className={classes.joinUs}
                  onClick={() => {
                    props.emitOpenSU(!props.openSU);
                    props.emitOpen(!props.open);
                    onSubmitSignUp();
                  }}
                >
                  Sign In
                </a>
              </center>
            </div>
          </Dialog>
        </div>
      )}
      {userLocal && (
        <div
          onMouseOver={() => setUserMenu(true)}
          onMouseLeave={() => setUserMenu(false)}
        >
          <span
            className={classes.nav1Menu}
            style={{ display: "flex", alignItems: "center" }}
          >
            Hi, {userLocal.user.name}

            <PersonOutlineIcon className={classes.UserIcon} />
          </span>


          {userMenu && (
            <div className={classes.UserMenuContainer}>
              <div className={classes.UserMenuHeader}>Account</div>
              <Link to="/user/profile" style={{ textDecoration: 'none' }}>
                <div className={classes.UserMenuItem}>Profile</div>
              </Link>
              <Link to="/user/order" style={{ textDecoration: 'none' }}>
                <div className={classes.UserMenuItem}>Orders</div>
              </Link>
              <Link to="/user/favorite" style={{ textDecoration: 'none' }}>
                <div className={classes.UserMenuItem}>Favourites</div>
              </Link>
              <div className={classes.UserMenuItem}>Inbox</div>
              <div className={classes.UserMenuItem}>Events</div>
              <div className={classes.UserMenuItem}>Account Settings</div>
              {localStorage.getItem("isAdmin") ?
                <Link to="/admin" style={{ textDecoration: 'none' }}>
                  <div className={classes.UserMenuItem}>Admin Panel</div>
                </Link>
                : ''}
              {/* <a href="truongquangvuong">nhnas em di</a> */}
              <div
                className={classes.UserMenuItem}
                onClick={() => {
                  props.logoutAction(userLocal);
                }}
              >
                Log out
              </div>
            </div>
          )}
        </div>
      )}
    </span>
  );
}
const mapStateToProps = (state) => {
  return {
    open: state.reducerSignSignUp.open,
    openSU: state.reducerSignSignUp.openSU,
    userLocal: state.reducerSignSignUp.user,
    isAdmin: state.reducerSignSignUp.isAdmin

  };

};

const mapDispatchToProps = (dispatch) => {
  return {
    emitOpen: (valueOpen) => {
      dispatch(action.emitOpenAction(valueOpen));
    },
    emitOpenSU: (valueOpenSU) => {
      // dispatch(action.emitOpenSignup(valueOpenSU));
    },
    logoutAction: (userLocal) => {
      dispatch(action.createAction({ type: LOGOUT, payload: null }));
      alert("goodbye " + `${userLocal.user.name}`);
      localStorage.removeItem("user");
      localStorage.removeItem("userFavor")
      localStorage.removeItem("cart");
    },
    callApiLogin: (data) => {
      dispatch(action.fetchApiLoginUser(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);