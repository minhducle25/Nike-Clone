import React from "react";
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import {
  Button,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputBase,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import TableCell from '@mui/material/TableCell';
import {
  KeyboardArrowDown,
  KeyboardArrowUp,
} from "@mui/icons-material";
import Search from '@mui/icons-material/Search';
import API from "../../../Axios/API";
import * as action2 from "../../ListProduct/module/action/action";
import * as ActionType2 from "../../ListProduct/module/constant/constant";
import * as action from "../Redux/Action/action";
import * as ActionType from "../Redux/Constant/constant";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { json } from "react-router-dom";
//import fade

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
  imgFavorite: {
    height: 100,
  },
  modifyUser: {
    cursor: "pointer",
    fontSize: 16,
    "&:hover": {
      color: "red",
    },
  },
  Title: {
    fontSize: 18,
  },
  inputContainer: {
    marginBottom: 18,
  },
  inputValid: {
    color: "#fe0000",
  },
  ButtonSubmit: {
    outline: "none",
    lineHeight: "24px",
    fontSize: 16,
    cursor: "pointer",
    padding: "7px 28px",
    backgroundColor: "white",
    borderRadius: 30,
    border: "1px solid #757575",
    marginTop: 15,
  },
  Detail: {
    width: "100%",
    marginTop: "10px",
    padding: "18px 14px",
    fontSize: 18,
  },
  Form: {
    width: 350,
  },
});

function Row(props) {
  const { row } = props;
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [dataUpdate, setDataUpdate] = React.useState({
    id: "",
    name: "",
    email: "",
    age: null,
  });
  const classes = useRowStyles();

  const [openDialog, setOpenDialog] = React.useState(false);
  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleClose = () => {
    setOpenDialog(false);
  };

  const age = [];
  for (var i = 0; i < 100; i++) {
    age.push(i + 1);
  }
  const listAge = age.map((item, key) => (
    <option key={key} value={item}>
      {item}
    </option>
  ));

  /*Validate form */
  const { register, handleSubmit, errors } = useForm({
    mode: "onBlur",
  });

  const onSubmit = (data) => {
    // confirm({ description: Update this user ? })
    // .then(() => console.log("Update success"))
    // .catch(() => console.log("Deletion cancelled."));
    console.log(data);
    dispatch(action.updateUserAPI(data, dataUpdate.id));
  };
  const handleDeleteUser = (data) => {
    dispatch(action.deleteUserAPI(data));
  };

  const capitalizeFirstLetter = (str) => {
    var splitStr = str.toLowerCase().split(" ");
    for (var i = 0; i < splitStr.length; i++) {
      splitStr[i] =
        splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(" ");
  };

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="left">{row.email}</TableCell>
        <TableCell align="left">{row.age}</TableCell>
        <TableCell align="left">{row.userType}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <div>
                <div
                  className={classes.modifyUser}
                  onClick={() => {
                    setDataUpdate({
                      id: row._id,
                      name: row.name,
                      email: row.email,
                      age: row.age,
                    });
                    setOpenDialog(!openDialog);
                  }}
                >
                  Update users
                </div>
                <div
                  className={classes.modifyUser}
                  onClick={() => {
                    handleDeleteUser(row._id);
                  }}
                >
                  Delete users
                </div>
              </div>
              <Typography
                variant="h6"
                gutterBottom
                component="div"
                style={{ marginTop: 10 }}
              >
                {capitalizeFirstLetter(row.name)}'s favourite products
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Image</TableCell>
                    <TableCell>Product Name</TableCell>
                    <TableCell align="right">Product Price (vnđ)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.productsFavorite.map((favoriteRow, key) => (
                    <TableRow key={key}>
                      <TableCell component="th" scope="row">
                        <img
                          src={favoriteRow.img}
                          className={classes.imgFavorite}
                        />
                      </TableCell>
                      <TableCell>{favoriteRow.name}</TableCell>
                      <TableCell align="right">
                        {favoriteRow.price.toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      <Dialog
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Update User</DialogTitle>
        <form
          method="POST"
          className={classes.Form}
          id="AdminFormDeleteUser"
          onSubmit={handleSubmit(onSubmit)}
        >
          <DialogContent>
            <div className={classes.inputContainer}>
              <input
                type="text"
                placeholder="Email"
                className={classes.input}
                name="email"
                // style={{ borderColor: errors.email && "red" }}
                // ref={register({
                //   required: true,
                //   pattern: {
                //     value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                //   },
                // })}
                {...register("email", { required: true })}
              />
              {/* {errors.email && (
                    <p className={classes.inputValid}>
                      Please enter a valid email address.
                    </p>
                  )} */}
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
            <div className={classes.inputContainer}>
              <div>name:</div>
              <input
                type="text"
                placeholder="name"
                className={classes.detail}
                name="name"
                {...register("name", { required: true })}
              />
            </div>
            <div className={classes.inputContainer}>
              <div>Age:</div>
              <select className={classes.detail}
                name='age'
                {...register("age", { required: true })}
              >
                <option value=''>Age</option>
                {listAge}
              </select>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button
              type="submit"
              onClick={handleClose}
              color="primary"
              autoFocus
            >
              Update
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
}

const useStyles = makeStyles((theme) => ({
  Title: {
    fontSize: 25,
  },
  search: {
    position: "relative",
    // borderRadius: theme.shape.borderRadius,
    // backgroundColor: fade(theme.palette.common.white, 0.15),
    // "&:hover": {
    //   backgroundColor: fade(theme.palette.common.white, 0.25),
    // },
    marginLeft: 0,
    width: "100%",

  },
  searchIcon: {
    // padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    // padding: theme.spacing(1, 1, 1, 0),
    // // vertical padding + font size from searchIcon
    // paddingLeft: calc(1em + ${theme.spacing(4)}px),
    // transition: theme.transitions.create("width"),
    width: "100%",
    // [theme.breakpoints.up("sm")]: {
    //   width: "12ch",
    //   "&:focus": {
    //     width: "20ch",
    //   },
    // },
  },
  Content: {
    display: "flex",
    justifyContent: "space-between",
    backgroundImage:
      "linear-gradient(to left, #227df9 0%, #7462f9 25%, #df3ef8 50%, #7462f9 75%, #227df9 100%)",
    backgroundSize: "250% auto",
    transform: "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)",
    transformOrigin: "50% 50% 0px",
    transition: "all 0.5s ease !important",
    "&:hover": {
      backgroundPosition: "right center",
    },
  },
}));

export default function CollapsibleTable() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.reducerURL.isLoading);

  React.useEffect(() => {
    const callAPI = async () => {
      try {
        dispatch(
          action2.createAction({
            type: ActionType2.IS_LOADING_LIST_PRODUCT,
            payload: true,
          })
        );
        const token = JSON.parse(localStorage.getItem("user")).token;
        const res = await API("users", "GET", null, token);
        dispatch(
          action.createAction({ type: ActionType.LIST_USER, payload: res.data })
        );
        dispatch(
          action2.createAction({
            type: ActionType2.IS_LOADING_LIST_PRODUCT,
            payload: false,
          })
        );
      } catch (error) {
        console.log({ ...error });
      }
    };
    callAPI();
  }, []);

  const listUser = useSelector((state) => state.reducerAdmin.listUser);
  //   console.log(listUser);
  var listUserLazyLoad = [];
  for (let i = 0; i < 10; i++) {
    listUserLazyLoad.push({
      age: 90,
      userType: "user",
      _id: "5f82dbb68fdc3827c3f3ffed",
      email: "abcxyz@gmail.com",
      name: "abcxyz",
      productsFavorite: [],
    });
  }
  const [valueSearch, setValue] = React.useState("");
  const handleSearchInput = (e) => {
    // console.log(e.target.value);
    setValue(e.target.value);
  };
  const filter = () => {
    //    console.log(listUser.filter((item) => {
    //     return (
    //       item.email.toLowerCase().trim().indexOf(valueSearch.toLowerCase().trim()) !== -1);
    //     }).map((row) => (
    //     <Row key={row.email} row={row} />
    //     )));
    return listUser.filter((item) => {
      return (
        item.email.toLowerCase().trim().indexOf(valueSearch.toLowerCase().trim()) !== -1);
    }).map((row, key) => (
      <Row key={key} row={row} />
    ))

  }
  return (
    <div className={classes.Title}>
      <div className={classes.Content}>
        <div className={classes.Title}>List User</div>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <Search />
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            onInput={(e) => {
              handleSearchInput(e);
            }}
            inputProps={{ "aria-label": "search" }}
          />
        </div>
      </div>

      <TableContainer component={Paper}>
        {isLoading ? (
          <Table aria-label="collapsible table">
            <TableBody>
              {listUserLazyLoad.map((row, key) => (
                <Skeleton width="100%" key={key}>
                  <Row key={row.name} row={row} />
                </Skeleton>
              ))}
            </TableBody>
          </Table>
        ) : (
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Name</TableCell>
                <TableCell align="left">Email</TableCell>
                <TableCell align="left">Age</TableCell>
                <TableCell align="left">Type</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filter()}
            </TableBody>
          </Table>
        )}
      </TableContainer>
    </div>
  );
}