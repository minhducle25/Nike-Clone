import React, {useState} from 'react'
import { makeStyles, withStyles } from '@mui/styles'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import {FormControlLabel, Grid, Skeleton} from '@mui/material'
import { CheckBox } from '@mui/icons-material'
import * as ActionType from "../module/constant/constant"
import * as action from "../module/action/action"
import { useDispatch, useSelector } from 'react-redux'

const useStyles = makeStyles((theme) => ({
    Filter: {
        backgroundColor: 'white',
        float: 'left',
        width: 190,
        fontSize: 16,
    },
    FilterTop: {
        paddingBottom: 40
    },
    FilterItem: {
        color: 'black',
        textDecoration: 'none',
        "&:hover": {
            color: '#757575',
        },
        fontSize: 16,
    },
    FilterGroup: {
        paddingBottom: 20,
        borderTop: '1px solid #e5e5e5',
    },
    FilterName: {
        padding: '12px 0',
        cursor: 'pointer',
        color: 'black',
    },
    FilterIcon: {
        float: 'right',
    },
    FilterCheckboxContainer: {
        paddingLeft: 5,
    },
    FilterCheckboxLabel: {
        "&:hover": {
            color: '#757575',
        },
    },
    Color: {
        width: 28,
        height: 28,
        borderRadius: '50%',
        paddingTop: 3,
        color: 'white',
        fontWeight: 'bold'
    },
    ColorContainer: {
        cursor: 'pointer',
    },
    ColorName: {
        marginTop: 5,
        fontSize: 12,
        "&:hover": {
            color: '#757575',
        },
    },
    size: {
        padding: "5px 10px",
        textAlign: 'center',
        border: '1px #CCCCCC solid',
        borderRadius: 5,
        cursor: 'pointer',
    },
}));

const BlackCheckbox = withStyles({
  root:{
    width: 30,
    height: 30,
    color: '#cccccc',
    '&$checked': {
      color: "black",
    },
  },
  checkd: {}
})((props) => <CheckBox color="default" {...props}/>)

const ListProductFilter = (props) => {
  const [gender, setGender] = useState(true)
  const [color, setColor] = useState(true)
  const [Brand, setBrand] = useState(true)
  const [sport, setSport] = useState(true)
  const dispatch = useDispatch()
  const filterColor = useSelector(state => state.reducerURL.filterColor)
  const filterSize = useSelector(state => state.reducerURL.filterSize)
  const data = useSelector(state => state.reducerURL.data)
  const isLoading = useSelector(state => state.reducerURL.isLoading)
  const classes = useStyles()
  //handle Array color

  const clickFilerColor = (filter) => {
    if(filter!=''){
      if(filterColor.indexOf(filter) > -1){
        filterColor.splice(filterColor.indexOf(filter), 1)
        dispatch(action.createAction({type: ActionType.FILTER_COLOR, payload:{filterColor}}))
      } else{
        filterColor.push(filter);
        dispatch(action.createAction({type: ActionType.FILTER_COLOR, payload: {filterColor: filterColor}}))
      }
    }
    else {
      dispatch(action.createAction({type: ActionType.FILTER_COLOR, payload: {
        filterColor: []
      }}))
      dispatch(action.createAction({type: ActionType.FILTER_SIZE, payload: {
        filterSize: []
      }}))
    }
  }

  //const handle array size
  const clickFilterSize = (filter) => {
    if(filterSize.indexOf(filter) > -1) {
      filterSize.splice(filterSize.indexOf(filter), 1)
      dispatch(action.createAction({type: ActionType.FILTER_SIZE, payload: {filterSize: filterSize}}))
    } else {
      filterSize.push(filter)
      dispatch(action.createAction({type: ActionType.FILTER_SIZE, payload: {filterSize: filterSize}}))
    }
  }
  
  //collect size
  var mySize = new Set()
  var Size = []
  console.log(data);
  for (let i =0; i< data?.length; i++) {
    for(let j = 0; j<data[i]?.sizes.length; j++){
      mySize.add(data[i].sizes[j].size)
    }
  }

  const listSize = Size.map((item,key) =>
    <Grid item xs={4} key={key}>
        {filterSize.indexOf(item) === -1 ? <div className={classes.size} onClick={() => {
          clickFilterSize(item); props.handleFilter(item)}}>{item}</div>
          : <div className={classes.Size} style={{border: '1px black solid'}} onClick={() => {clickFilterSize(item); props.handleFilter(item)}}>{item}</div>
        }
    </Grid>
  )
  var listSizeLazyLoad = [];
  for (let i =0; i < 15; i++){
    listSizeLazyLoad.push(
      <Grid item xs={4} key={i}>
        <Skeleton><div className={classes.Size}>40</div></Skeleton>
      </Grid>
    )
  }

  //collect color
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  var myColor = new Set()
  var Color = []
  for(let i =0; i< data.length; i++){
    for(let j=0; j<data[i].imgDetails.length; j++){
      const colorSplit = data[i].imgDetails[j].color.split('/');
      for (let n = 0; n < colorSplit.length; n++){
        myColor.add(colorSplit[n])
      }
    }
  }
  for (let item of myColor){
    Color.push(item)
  }
  const listColor = Color.map((item, key) => 
    <Grid item xs={4} className={classes.ColorContainer} key={key}
    onClick={() => {clickFilerColor(item); props.handleFilter(item)}}>
      {item === "white" ?
      <center>
        {filterColor.indexOf(item) === -1 ? <div className={classes.Color} style={{backgroundColor: item, border:'1px #CCCCCC solid'}}></div>
        : <div className={classes.Color} style={{backgroundColor: item, color:'black', border:'1px #CCCCCC solid'}}>&#10003;</div>}
        <div className={classes.ColorName}>{capitalizeFirstLetter(item)}</div>
      </center>
      :
      <center>
      {filterColor.indexOf(item) === -1 ? <div className={classes.Color} style={{backgroundColor: item}}></div>
      : <div className={classes.Color} style={{backgroundColor: item}}>&#10003;</div>}
      <div className={classes.ColorName}>{capitalizeFirstLetter(item)}</div>
    </center>
    }
    </Grid>
  );
  var listColorLazyLoad = [];
  for (let i = 0; i <12; i++){
    listColorLazyLoad.push(
      <Grid item xs={4} className={classes.ColorContainer} key={i}>
        <Skeleton>
          <div className={classes.Color} style={{backgroundColor: "white", color: "black", border: "1px #CCCCCC solid"}}>&#10003;</div>
        </Skeleton>

        <Skeleton>
          <div className={classes.ColorName}>Black</div>
        </Skeleton>
      </Grid>
    )
  }
  return (
    <Grid item md={3}>
      <div className={classes.Filter}>
        <div className={classes.FilterTop}>
          <a href="#a" className={classes.FilterItem}>
            Shoes
          </a>
        </div>

        {/* filterGroup */}
        <div className={classes.FilterGroup}>
          <div className={classes.FilterName} onClick={() => setGender(!gender)}>
            gender
            {gender && <ExpandLessIcon className={classes.FilterIcon} />}
            {!gender && <ExpandMoreIcon className={classes.FilterIcon} />}
          </div>
          {gender &&
          <div className={classes.FilterCheckboxContainer}>
            <div><FormControlLabel control={<BlackCheckbox />} label="men" className={classes.FilterCheckboxLabel}/></div>
            <div><FormControlLabel control={<BlackCheckbox />} label="women" className={classes.FilterCheckboxLabel}/></div>
          </div>
          }
        </div>
        <div className={classes.FilterGroup}>
          <div className={classes.FilterName} onClick={() => setColor(!color)}>
            color{filterColor.length > 0 && <span>{filterColor.length}</span>}
            {color && <ExpandLessIcon className={classes.FilterIcon} />}
            {!color && <ExpandMoreIcon className={classes.FilterIcon} />}
          </div>
          {color &&
            <div>
              {isLoading ?
              <Grid container spacing={2}>
                  {listColorLazyLoad}
              </Grid>
              :
              <Grid container spacing={2}>
                <Grid item xs={4} className={classes.ColorContainer} onClick={() => {
                  clickFilerColor('');
                  props.handleFilter('')
                }}>
                  <center>
                    {filterColor !== '' ?
                    <div className={classes.Color} style={{
                      backgroundColor: 'black'
                    }}></div>
                    :
                    <div className={classes.Color} style={{
                      backgroundColor: 'black'
                    }}>&#10003;</div>
                  }
                  <div className={classes.ColorName}> Multi-color</div>
                  </center>
                </Grid>
                {listColor}
              </Grid>
              }
            </div>
          }
        </div>
        <div className={classes.FilterGroup}>
          <div className={classes.FilterName} onClick={() => setBrand(!Brand)}>
            size{filterSize.length >0 && <span>{filterSize.length}</span>}
            {Brand && <ExpandLessIcon className={classes.FilterIcon} />}
            {!Brand && <ExpandMoreIcon className={classes.FilterIcon} />}
          </div>
          {Brand &&
          <div>
            {isLoading ?
            <Grid container spacing={1}>
              {listColorLazyLoad}
            </Grid>  
            :
            <Grid container spacing={1}>
              {listSize}
            </Grid>
          }
            </div>
          }
        </div>
      </div>
      </Grid>
  )
}

export default ListProductFilter