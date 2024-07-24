import React from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import ImageIcon from "@mui/icons-material/Image";
import ClearIcon from "@mui/icons-material/Clear";
import API from "../../Axios/API";
import { notifiError, notifisuccess } from "../../utils/MyToys";
import {
  AppBar,
  Button,
  Chip,
  Divider,
  Grid,
  Icon,
  MenuItem,
  Paper,
  Tab,
  Tabs,
  TextField,
  Toolbar,
} from "@mui/material";
import { Box } from "@mui/system";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: "5em",
  },
  hidden: {
    display: "none",
  },
  paper: {
    position: "absolute",
    width: 1200,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  content: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "45ch",
    },
    padding: theme.spacing(2),
  },
  content2: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "30ch",
    },
    padding: theme.spacing(2),
  },
  contentBtn: {
    padding: theme.spacing(2),
    textAlign: "center",
  },
  form: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "45ch",
    },
  },
  sizes: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: theme.spacing(0.5),
    margin: 0,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  tabRoot: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    height: 224,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  cover: {
    width: 151,
  },
  rootGallery: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  inlineField: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
  },
  delete: {
    position: "relative",
  },
  hiddenClear: {
    position: "absolute",
    top: "0",
    right: "0",
    color: "#fff",
    background: "#555",
    opacity: "0.5",
    cursor: "pointer",
    fontSize: "20px",
    "&:hover": {
      opacity: "1",
      color: "#f50057",
      background: "#efefef",
    },
  },
  appBar: {
    position: "fixed",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

TabPanel.PropTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

export default function AddProductForm(props) {
  //get data when load
  React.useEffect(() => {
    getCategories();
    getGenders();
  }, []);

  //const product = props.itemData
  const [savedData, setSavedData] = React.useState({
    color: "",
    typeProduct: "",
    img: "",
    name: "",
    message: "",
    price: 0,
    description: "",
    sizes: [],
    imgDetails: [],
    userCreated: props.userId,
    gender: "",
    status: 1,
  });

  const classes = useStyles();
  const handleOnChange = (e) => {
    setSavedData({
      ...savedData,
      [e.target.name]: e.target.value,
    });
  };
  //category
  const [selectedCategory, setSelectedCategory] = React.useState();
  const [category, setCategory] = React.useState([]);
  const getCategories = async () => {
    const res = await API(`product/categories`, "GET");
    setCategory(res.data);
  };

  const handleChangeCategory = (e) => {
    setSelectedCategory(e.target.value);
    setSavedData({
      ...savedData,
      typeProduct: e.target.value,
    });
  };

  //gender
  const [selectedGender, setSelectedGender] = React.useState();
  const [gender, setGenders] = React.useState([]);
  const getGenders = async () => {
    const res = await API(`product/genders`, "GET");
    setGenders(res.data);
  };

  const handleChangeGender = (e) => {
    setSelectedGender(e.target.value);
    setSavedData({
      ...savedData,
      gender: e.target.value,
    });
  };

  //thumb
  const [thumb, setThumb] = React.useState({ thumb: "" });
  const handleOnChangeThumb = (e) => {
    setThumb({ thumb: e.target.value });
    setSavedData({
      ...savedData,
      img: e.target.value,
    });
  };

  //sizes
  const [sizes, setSizes] = React.useState([]);
  const sizesData = [...sizes];
  var newSize = null;

  const handleDelete = (sizeDelete) => () => {
    setSizes((item) => item.filter((size) => size !== sizeDelete));
  };

  const handleOnChangeSize = (e) => {
    newSize = { size: e.target.value };
  };

  const handleAddSize = (e) => {
    e.preventDefault();
    if (newSize == null) {
      alert("You must enter size");
    } else {
      const found = sizesData.some((el) => el.size === newSize.size);
      if (found) {
        alert("size you entered is already exist");
      } else {
        sizesData.push(newSize);
        setSizes(sizesData);
        setSavedData({
          ...savedData,
          size: sizesData,
        });
      }
    }
  };

  //color
  const [colors, setColors] = React.useState([]);
  const colorsData = [...colors];
  var newColor = null;

  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleDeleteColor = (idx) => () => {
    colorsData.splice(idx, 1);
    setColors(colorsData);
    setSavedData({
      ...savedData,
      imgDetails: colorsData,
    });
  };

  const handleOnChangeColor = (e) => {
    newColor = { color: e.target.value, imgs: [] };
  };

  const handleAddColor = (e) => {
    e.preventDefault();
    if (newColor == null) {
      alert("You must enter color");
    } else {
      const found = colorsData.some((el) => el.color === newColor.color);
      if (found) {
        alert("color you entered is already exist");
      } else {
        colorsData.push(newColor);
        setColors(colorsData);
        setSavedData({
          ...savedData,
          imgDetails: colorsData,
        });
      }
    }
  };

  //gallery
  var imgAddedObj = null;
  const handleOnChangeAddImgToGallery = (e) => {
    if (e.target.value === "") {
      alert("Please enter image URL");
    } else {
      imgAddedObj = { img: e.target.value };
    }
  };

  const handleAddImgToGallery = (idx) => {
    const found = colorsData[idx].imgs.some((el) => el.img === imgAddedObj.img);
    if (found) {
      alert("Your new image is already exist in this gallery");
    } else {
      colorsData[idx].imgs.push(imgAddedObj);
      setColors(colorsData);
      setSavedData({
        ...savedData,
        imgDetails: colorsData,
      });
    }
  };

  const handleDeleteImg = (galleryIdx, imgIdx) => {
    colorsData[galleryIdx].imgs.splice(imgIdx, 1);
    setColors(colorsData);
    setSavedData({
      ...savedData,
      imgDetails: colorsData,
    });
  };

  //actions btn
  const saveBtn = async () => {
    try {
      await API("product", "POST", savedData, props.token).then((res) => {
        if (res.status === 201) {
          notifisuccess("Successful added product");
          props.closeDialog();
        } else {
          notifiError("Something wrong! Please try again");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Appbar className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Add new product
          </Typography>
          <Button onClick={props.handleCloseAddNew}> Cancel</Button>
          <Button autoFocus color="inherit" onClick={saveBtn}>
            Create
          </Button>
        </Toolbar>
      </Appbar>

      <div className={classes.root}>
        <form noValidate autoComplete="off">
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <Paper elevation={0} className={classes.content}>
                <TextField
                  id="name"
                  name="name"
                  label="Name"
                  variant="outlined"
                  onChange={handleOnChange}
                />
                <TextField
                  id="message"
                  name="message"
                  label="Short Description"
                  variant="outlined"
                  onChange={handleOnChange}
                />
                <TextField
                  id="desc"
                  name="description"
                  label="Details"
                  variant="outlined"
                  multiline
                  rows={4}
                  onChange={handleOnChange}
                />
                <TextField
                  id="selectPrdTypes"
                  name="typeProduct"
                  select
                  label="Product Type"
                  value={selectedCategory}
                  variant="outlined"
                  onChange={handleChangeCategory}
                />
                <TextField
                  id="selectPrdGender"
                  name="gender"
                  select
                  label="gender"
                  value={selectedGender}
                  variant="outlined"
                  onChange={handleChangeGender}
                >
                  {gender.map((item, ịndex) => {
                    return (
                      <MenuItem key={inde} value={item}>
                        {item}
                      </MenuItem>
                    );
                  })}
                </TextField>
                <TextField
                  id="color"
                  name="color"
                  label="Color"
                  variant="outlined"
                  onChange={handleOnChange}
                />
              </Paper>
            </Grid>
            <Grid item xs={8}>
              <Paper elevation={0} className={classes.content2}>
                <h3>Thumbnail</h3>
                {thumb.thumb ? (
                  <img src={thumb.thumb} width="65" height="65" />
                ) : (
                  <ImageIcon fontSize="larget"></ImageIcon>
                )}
                <Box
                  component="div"
                  display="inline"
                  className={classes.inlineField}
                >
                  <TextField
                    id="img"
                    name="img"
                    label="Image"
                    variant="outlined"
                    onChange={handleOnChangeThumb}
                  />
                </Box>
                <Divider p={1} />
                <h3>Sizes</h3>
                <Box
                  component="div"
                  display="inline"
                  className={classes.inlineField}
                >
                  <TextField
                    id="addSize"
                    name="sizes"
                    label="Add Size"
                    variant="outlined"
                    size="small"
                    onChange={handleOnChangeSize}
                  />
                  <Button
                    variant="outlined"
                    color="primary"
                    size="medium"
                    className={classes.button}
                    onClick={handleAddSize}
                    endIcon={<Icon>add</Icon>}
                  >
                    Add
                  </Button>
                </Box>
                <Paper
                  component="ul"
                  variant="outlined"
                  elevation={0}
                  className={classes.sizes}
                >
                  {sizes.length !== 0
                    ? sizes.map((data) => {
                        return (
                          <li key={data.key}>
                            <Chip
                              label={data.size}
                              onDelete={handleDelete(data)}
                              className={classes.chip}
                            />
                          </li>
                        );
                      })
                    : "There is no size for this product. Please add one."}
                </Paper>
                <Divider p={1} />
                <h3>Gallery</h3>
                <Box
                  component="div"
                  display="inline"
                  className={classes.inlineField}
                >
                  <TextField
                    id="addColorGallery"
                    label="Add Color"
                    variant="outlined"
                    size="small"
                    onChange={handleOnChangeColor}
                  />
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    className={classes.button}
                    onClick={handleAddColor}
                    endIcon={<Icon>add</Icon>}
                  >
                    Add
                  </Button>
                </Box>
                <Paper
                  component="ul"
                  variant="outlined"
                  elevation={0}
                  className={classes.sizes}
                >
                  <div className={classes.tabRoot}>
                    <Tabs
                      orientation="vertical"
                      variant="scrollable"
                      value={value}
                      onChange={handleChange}
                      className={classes.tabs}
                    >
                      {colors.map((data, index) => {
                        return (
                          <Tab
                            key={index}
                            label={data.color}
                            {...a11yProps({ index })}
                          />
                        );
                      })}
                    </Tabs>
                    {colors.map((data, idx) => {
                      return (
                        <TabPanel value={value} index={idx} key={idx}>
                          <Box
                            component="div"
                            display="inline"
                            className={classes.inlineField}
                          >
                            <TextField
                              id="addImgGallery"
                              label="Add Image"
                              variant="outlined"
                              size="small"
                              onChange={handleOnChangeAddImgToGallery}
                            />
                            <Button
                              variant="outlined"
                              color="primary"
                              size="small"
                              className={classes.button}
                              onClick={() => handleAddImgToGallery(idx)}
                              endIcon={<Icon>add</Icon>}
                            >
                              Add
                            </Button>
                            <Box ml={1}>
                              <Button
                                pl={2}
                                variant="outlined"
                                color="secondary"
                                size="small"
                                className={classes.button}
                                onClick={handleDeleteColor(idx)}
                                enIcon={<Icon>delete</Icon>}
                              >
                                delete color
                              </Button>
                            </Box>
                          </Box>

                          <Box
                            display="flex"
                            flexWrap="wrap"
                            p={1}
                            m={1}
                            css={{ maxWidht: 500 }}
                          >
                            {data.imgs.length > 0
                              ? data.imgs.map((img, imgIdx) => {
                                  return (
                                    <Box
                                      key={imgIdx}
                                      p={0}
                                      m={1}
                                      className={classes.delete}
                                    >
                                      <img
                                        src={img.img}
                                        width="60"
                                        height="60"
                                      />
                                      <ClearIcon
                                        className={classes.hiddenClear}
                                        onClick={() =>
                                          handleDeleteImg(idx, imgIdx)
                                        }
                                      />
                                    </Box>
                                  );
                                })
                              : "No image found in gallery"}
                          </Box>
                        </TabPanel>
                      );
                    })}
                  </div>
                </Paper>
              </Paper>
            </Grid>
          </Grid>
        </form>
      </div>
    </div>
  );
}
