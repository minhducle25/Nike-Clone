import React from 'react'
//import {tab panel} from '@mui/lab'
import PropTypes from 'prop-types'
import API from '../../Axios/API'
import { makeStyles } from '@mui/styles'
import { AppBar, Button, Grid, MenuItem, Paper, Toolbar } from '@mui/material'
const useStyles = makeStyles((theme) => ({
  root: {
      flexGrow: 1,
      marginTop: '5em'
  },
  hidden: {
      display: 'none'
  },
  paper: {
      position: 'absolute',
      width: 1200,
      backgroundColor: theme.palette.background.paper,
      divShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
  },
  content: {
      '& .MuiTextField-root': {
          margin: theme.spacing(1),
          width: '45ch',
      },
      padding: theme.spacing(2),
  },
  content2: {
      '& .MuiTextField-root': {
          margin: theme.spacing(1),
          width: '30ch',
      },
      padding: theme.spacing(2),
  },
  contentBtn: {
      padding: theme.spacing(2),
      textAlign: 'center',
  },
  form: {
      '& .MuiTextField-root': {
          margin: theme.spacing(1),
          width: '45ch',
      },
  },
  sizes: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      listStyle: 'none',
      padding: theme.spacing(0.5),
      margin: 0,
  },
  chip: {
      margin: theme.spacing(0.5),
  },
  tabRoot: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
      display: 'flex',
      height: 224,
  },
  div: {
      borderRight: `1px solid ${theme.palette.div}`,
  },
  cover: {
      width: 151,
  },
  rootGallery: {
      display: 'flex',
      '& > *': {
          margin: theme.spacing(1),
      },
  },
  inlineField: {
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'wrap',
  },
  delete: {
      position: 'relative',
  },
  hiddenClear: {
      position: 'absolute',
      top: '0',
      right: '0',
      color: '#fff',
      background: '#555',
      opacity: '0.5',
      cursor: 'pointer',
      fontSize: '20px',
      '&:hover': {
          opacity: '1',
          color: '#f50057',
          background: '#efefef'
      }
  },
  appBar: {
      position: 'fixed',
  },
  title: {
      marginLeft: theme.spacing(2),
      flex: 1,
  },
}));

function a11yProps(index){
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

function TabPanel(props){
  const { children, value, index, ...other} = props;
  return (
    <div role="tabpanel" hidden={value !== index} id={`vertical-tabpanel-${index}`} aria-labelledby={`vertical-tab-${index}`} {...other}>
      {value === index && (
        <div p={3}>
            {children}
        </div>
      )}
    </div>
  )
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

export default function EditProductForm(props) {
    //get data when load
    React.useEffect(()=>{
        getCategories()
        getGenders()
    }, [])
    const product = props.product
    console.log(product);
    const [savedData, setSavedData] = React.useState({
        _id: product._id,
        color: product.color,
        typeProduct: product.typeProduct,
        img: product.img,
        name: product.name,
        price: product.price,
        description: product.description,
        sizes: product.sizes,
        imgDetails: product.imgDetails,
        userCreated: product.userCreated,
        gender: product.gender,
        status: product.status,
    })

    const classes = useStyles();
    const handleOnChange = (e) => {
        setSavedData({
            ...savedData,
            [e.target.name]: e.target.value
        })
    }

    //category
    const [selectedCategory, setSelectedCategory] = React.useState(product.typeProduct)
    const [category, setCategory] = React.useState([])
    const getCategories = async () => {
        const res = await API(`product/categories`, "GET");
        setCategory(res.data)
    }

    const handleChangeCategory = (e) => {
        setSelectedCategory(e.target.value)
        setSavedData({
            ...savedData,
            typeProduct: e.target.value
        })
    }

    //gender
    const [selectedGender, setSelectedGender] = React.useState(product.gender)
    const [gender, setGenders] = React.useState([])
    const getGenders = async () => {
        const res = await API(`product/genders`, "GET")
        setGenders(res.data)
    }

    const handleChangeGender = (e) => {
        setSelectedGender(e.target.value)
        setSavedData({
            ...savedData,
            gender: e.target.value
        })
    }

    //thumb
    const [thumb, setThumb] = React.useState({thumb:product.img})
    const handleOnChangeThumb =(e) => {
        setThumb({thumb: e.target.value})
        setSavedData({
            ...savedData,
            img: e.target.value
        })
    }
    //size
    const [sizes, setSizes] = React.useState(product.sizes)
    const sizesData = [...sizes]
    var newSize = null

    const handleDelete = (sizeDelete) => () => {
        setSizes((item) => item.filter((size) => size !== sizeDelete))
    }

    const handleOnChangeSize = (e) => {
        newSize = {size: e.target.value}
    }

    const handleAddSize = (e) => {
        e.preventDefault()
        if(newSize == null){
            alert("you must enter size")
        } else{
            const found = sizesData.some(el=> el.size === newSize.size);
            if(found){
                alert("size you entered is already exist")
            }else {
                sizesData.push(newSize)
                setSizes(sizesData)
                setSavedData({
                    ...savedData,
                    sizes: sizesData
                })
            }
        }
    }

    // colors (gallery)
    const [colors, setColors] = React.useState(product.imgDetails)
    const colorsData = [...colors]
    var newColor = null

    const [value, setValue] = React.useState(0)
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleDeleteColor = (idx) => () => {
        colorsData.splice(idx, 1)
        setColors(colorsData)
        setSavedData({
            ...savedData,
            imgDetails: colorsData
        })
    };

    const handleOnChangeColor = (e) => {
        newColor = {color: e.target.value, imgs:[]}
    }

    const handleAddColor = (e) => {
        e.preventDefault()
        if(newColor == null) {
            alert("You must enter color")
        } else{
            const found = colorsData.some(el => el.color === newColor.color);
            if(found){
                alert("Color your entered is already exist")
            }else{
                colorsData.push(newColor)
                setColors(colorsData)
                setSavedData({
                    ...savedData,
                    imgDetails: colorsData
                })
            }
        }
    }
    //galery
    var imgAddedObj = null
    const handleOnChangeAddImgToGallery = (e) => {
        if(e.target.value === ''){
            alert("Please enter image url")
        }else {
            imgAddedObj = {img: e.target.value}
        }
    }

    const handleAddImgToGallery = (idx) => {
        const found = colorsData[idx].imgs.some(el=> el.img === imgAddedObj.img);
        if(found){
            alert("Your new image is already exist in this gallery")
        } else{
            colorsData[idx].imgs.push(imgAddedObj)
            setColors(colorsData)
            setSavedData({
                ...savedData,
                imgDetails: colorsData
            })
        }
    }

    const handleDeleteImg = (galleryIdx, imgIdx) => {
        colorsData[galleryIdx].imgs.splice(imgIdx, 1)
        setColors(colorsData)
        setSavedData({
            ...savedData,
            imgDetails: colorsData
        })
    }

    //actions btn
    const saveBtn = async() => {
        console.log("save now");
        console.log(savedData);
        try{
            await API('product', "PUT", savedData, props.token)
            .then(res=>{
                if(res.config.status === 200){
                    alert('Successful updated product')
                    props.closeDialog()
                    props.getProducts()
                }else{
                    alert("Something wrong! Please try again")
                }
            })
        } catch(error){
            console.log(error)
        }
    }

    return(
        <div>
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <div variant="h6" className={classes.title}>
                        Edit {product.name}
                    </div>
                    <Button onClick={props.closeDialog}>Cancel</Button>
                    <Button autoFocus color="inherit" onClick={saveBtn}>save</Button>
                </Toolbar>
            </AppBar>
            <div className={classes.root}>
                {product ? (
                    <>
                        <form noValidate autoComplate="off">
                            <Grid container spacing={3}>
                                <Grid item xs={4}>
                                    <div eleevation={0} className={classes.content}>
                                        <div id="name" name="name" label="Name" defaultValue={product.name} variant="outlined" onChange={handleOnChange}/>
                                        <div id="message" name="message" label="Short Description" defaultValue={product.message} variant="outlined" onChange={handleOnChange} />
                                        <div id="selectPrdTypes" name="typeProduct" select label="Product Type" value={selectedCategory} onChange={handleChangeCategory} variant="outlined">
                                            {category.map((item,index) => {
                                                return <MenuItem key={index} value={item}>{item}</MenuItem>
                                            })}
                                        </div>
                                        <div id="selectPrdGender" name="gender" select label="Gender" value={selectedGender} variant="outlined">
                                            {gender.map((item,index)=> {
                                                return <MenuItem key={index} value={item}>{item}</MenuItem>
                                            })}

                                        </div>
                                        <div id="color" name="color" label="Color" defaultValue={product.color} variant="outlined" onChange={handleOnChange} />
                                        <div id="price" name="price" label="Price" defaultValue={product.price} variant="outlined" onChange={handleOnChange} />
                                    </div>
                                </Grid>
                                <Grid item xs={8}>
                                    <Paper elevation={0} className={classes.content2}>
                                        <h3>Thumbnail</h3>
                                        <div component="div" display="inline" className={classes.inlineField}>
                                            {thumb.thumb ? <img src={thumb.thumb} width="65" height="65" /> : <div fontSize="large"></div>}
                                            <div
                                                id="img"
                                                name="img"
                                                label="Image"
                                                defaultValue={thumb.thumb}
                                                variant="outlined"
                                                onChange={handleOnChangeThumb}
                                            />
                                        </div>
                                        <div p={1} />
                                        <h3> Sizes </h3>
                                        <div component="div" display="inline" className={classes.inlineField}>
                                            <div 
                                                id="addSize"
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
                                                enddiv={<div>add</div>}>
                                                    Add
                                                </Button>
                                        </div>
                                        <Paper component="ul" variant="outlined" elevation={0} className={classes.sizes}>
                                            {(sizes.length != 0) ? sizes.map((data) => {
                                                return(
                                                    <li key={data.key}>
                                                        <div label={data.size} onDelete={handleDelete(data)} className={classes.chip} />
                                                    </li>
                                                );
                                            }) : "There is no size for this product. Please add one."} 
                                        </Paper>
                                        <div p={1} />
                                        <h3>Gallery</h3>
                                        <div component="div" display="inline" className={classes.inlineField}>
                                            <div id="addColorGallery" label="Add color" variant="outlined" size="small" onChange={handleOnChangeColor} />
                                            <Button
                                                variant="outlined"
                                                color="primary"
                                                size="small"
                                                className={classes.button}
                                                onClick={handleAddColor}
                                                enddiv={<div>add</div>}
                                            >
                                                Add
                                            </Button>
                                        </div>
                                        <Paper component="ul" variant="outlined" elevation={0} className={classes.sizes}>
                                            <div className={classes.tabRoot}>
                                                <div orientation="vertical" variant="scrollable" value={value} onChange={handleChange} className={classes.div}>
                                                    {colors.map((data,index)=> {
                                                        return(
                                                            <div key={index} label={data.color}
                                                            {...a11yProps({index})} />
                                                        );
                                                    })}
                                                </div>
                                                {colors.map((data, idx) => {
                                                    return(
                                                        <TabPanel value={value} index={idx} key={idx}>
                                                            <div component="div" display="inline" className={classes.inlineField}>
                                                                <div
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
                                                                    onClick={()=> 
                                                                    handleOnChangeAddImgToGallery(idx)}
                                                                    enddiv={<div>add</div>}
                                                                >Add</Button>
                                                                <div ml={1}>
                                                                    <Button
                                                                        pl={2}
                                                                        variant="outlined"
                                                                        color="secondary"
                                                                        size="small"
                                                                        className={classes.button}
                                                                        onClick={handleDeleteColor(idx)}
                                                                        enddiv={<div>delete</div>}
                                                                    > delete color </Button>
                                                                </div>
                                                            </div>
                                                            <div display="flex" flexWrap="wrap" p={1} m={1} css={{maxWidth:500}}>
                                                                {(data.imgs.length >0) ?
                                                                data.imgs.map((img,imgIdx) =>{
                                                                    return(
                                                                        <div key={imgIdx} p={0} m={1} className={classes.delete}>
                                                                            <img src={img.img} width="60" height="60"/>
                                                                        <div className={classes.hiddenClear} onClick={() => handleDeleteImg(idx, imgIdx)} />
                                                                        </div>
                                                                    )
                                                                })   : "No image found in gallery"
                                                            }
                                                            </div>
                                                        </TabPanel>
                                                    )
                                                })}
                                            </div>
                                        </Paper>
                                    </Paper>

                                </Grid>
                            </Grid>
                            </form>
                        </>
                ) : (<div size="20px" />)}
            </div>
        </div>
    )
}
