import React from 'react'
import { makeStyles } from '@mui/styles'
import { TextField } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import Hidden from '@mui/material/Hidden'
import {useForm} from 'react-hook-form'
import * as action from "../userOrder/module/Action/action"

const useStyles = makeStyles((theme) => ({
    Container: {
        padding: '40px 48px',
        fontSize: 16,
        minHeight: 500,
    },
    Title:{
        fontSize: 24,
        marginBottom: 36,
    },
    Setting:{
        width: 266,
        paddingRight: 24,
        float: 'left',
    },
    SettingItem:{
        lineHeight: 1.75,
        cursor: 'pointer',
    },
    SettingItemIcon:{
        paddingRight: 20,
        width: 26,
    },
    AccountContainer:{
        marginLeft: 406,
        // [theme.breakpoints.down("sm")]: {
        //     marginLeft: 0
        // },
    },
    AccountDetail:{
        width: 415,
        // [theme.breakpoints.down("sm")]: {
        //     width: '100%',
        // },
    },
    Detail:{
        width: '100%',
        marginTop: '10px',
        padding: '18px 14px',
        fontSize: 18,
    },
    inputContainer: {
        marginBottom: 18,
    },
    inputValid:{
        color: '#fe0000',
    },
    ButtonSubmit: {
        outline: 'none',
        lineHeight: '24px',
        fontSize: 16,
        cursor: 'pointer',
        padding: '7px 28px',
        backgroundColor: 'white',
        borderRadius: 30,
        border: '1px solid #757575',
        marginTop: 15,
    }
}));

export default function UserProfile(){
    const classes = useStyles()
    const dispatch = useDispatch()
    const userLocal = useSelector(state => state.reducerSignSignUp.user)

    const age = []
    for(var i = 0; i<100; i++){
        age.push(i+1)
    }
    const listAge = age.map((item) => 
    <option key={item} value={item}>
        {item}
    </option>
    )
    const [ageSelect, setAgeSelect] = React.useState(userLocal ? userLocal.user.age : null)
    const HandleAgeSelct = (event) => {
        setAgeSelect(event.target.value)
    }

    // Validate form
    const {register, handleSubmit, errors} = useForm({
        mode: "onBlur"
    })
    const onSubmit = (data) => {
        const token = JSON.parse(localStorage.getItem("user")).token
        dispatch(action.updateProfileAPI(data,token))
    }
    return(
<div className={classes.Container}>
            <Hidden smDown><div className={classes.Title}>Settings</div></Hidden>
            <div className={classes.Wrapper}>
                <Hidden smDown>
                <div className={classes.Setting}>
                    <div className={classes.SettingItem}> 
                        <img src="https://www.nike.com/static/dotcom-member/settings/dist/3.0.4/images/accountDetails.svg" className={classes.SettingItemIcon}/>
                        Account Details
                    </div>
                    <div className={classes.SettingItem}> 
                        <img src="https://www.nike.com/static/dotcom-member/settings/dist/3.0.4/images/paymentMethods.svg" className={classes.SettingItemIcon}/>
                        Payment Method
                    </div>
                    <div className={classes.SettingItem}> 
                        <img src="https://www.nike.com/static/dotcom-member/settings/dist/3.0.4/images/deliveryAddresses.svg" className={classes.SettingItemIcon}/>
                        Delivery Addresses
                    </div>
                    <div className={classes.SettingItem}> 
                        <img src="https://www.nike.com/static/dotcom-member/settings/dist/3.0.4/images/shopPreferences.svg" className={classes.SettingItemIcon}/>
                        Shop References
                    </div>
                    <div className={classes.SettingItem}> 
                        <img src="https://www.nike.com/static/dotcom-member/settings/dist/3.0.4/images/communicationPreferences.svg" className={classes.SettingItemIcon}/>
                        Communication Preferences
                    </div>
                    <div className={classes.SettingItem}> 
                        <img src="https://www.nike.com/static/dotcom-member/settings/dist/3.0.4/images/personalization.svg" className={classes.SettingItemIcon}/>
                        Personalization
                    </div>
                    <div className={classes.SettingItem}> 
                        <img src="https://www.nike.com/static/dotcom-member/settings/dist/3.0.4/images/profileVisibility.svg" className={classes.SettingItemIcon}/>
                        Profile Visibility
                    </div>
                    <div className={classes.SettingItem}> 
                        <img src="https://www.nike.com/static/dotcom-member/settings/dist/3.0.4/images/linkedAccounts.svg" className={classes.SettingItemIcon}/>
                        Linked Accounts
                    </div>
                </div>
                </Hidden>
                <div className={classes.AccountContainer}>
                    {userLocal &&
                    <div className={classes.AccountDetail}>
                        <form id="formUserProfile" onSubmit={handleSubmit(onSubmit)} method="POST">
                            <div className={classes.Title}>Account Detail</div>
                            {/* <TextField 
                                className={classes.Detail} 
                                label="Email" 
                                name="email"
                                variant="outlined" 
                                defaultValue={userLocal.user.email} 
                                validators={['required']}
                                errorMessages={['this field is required']}
                            /> */}
                            <p className={classes.inputContainer}>
                                <div>Email:</div>
                                <input type="text"
                                placeholder='Email'
                                className={classes.input}
                                name="email"
                                {...register("email", {
                                  required: "This input is required",
                                  pattern:{
                                    value: "",
                                    mesage: "This input is number only"
                                  },
                                  minLength:{
                                    value: "",
                                    message: "This input must exceed 10 characters"
                                  }
                                })}
                                // {...register("email", {required: true},)}
                                />
                            </p>
                            <p className={classes.inputContainer}>
                                <div>Password:</div>
                                <input 
                                type="password"
                                placeholder='Password'
                                className={classes.input}
                                name="password"
                                // style={{borderColor: errors.password && "red"}}
                                // ref={register({
                                //   required:true,
                                // })}
                                {...register("password", {required:true})}
                                />
                            </p>
                            <p className={classes.inputContainer}>
                                <div>Name:</div>
                                <input 
                                    type="text"
                                    className={classes.Detail} 
                                    placeholder="Name" 
                                    name="name"
                                    {...register("name", {required:true})}
                                  
                                />
                                {/* {errors.name && 
                                    <p className={classes.inputValid}>Please enter a valid name.</p>
                                } */}
                            </p>
                            <p className={classes.inputContainer}>
                                <div>Age:</div>
                                <select 
                                    className={classes.Detail} 
                                
                                >
                                    {listAge}
                                </select>
                            </p>
                            {/* <TextField 
                                className={classes.Detail} 
                                label="Name" 
                                variant="outlined" 
                                defaultValue={userLocal.user.name} 
                            />
                            <TextField
                                select
                                className={classes.Detail} 
                                label="Age"
                                value={ageSelect}
                                onChange={HandleAgeSelect}
                                SelectProps={{
                                    native: true,
                                }}
                                variant="outlined"
                            >
                                {listAge}
                            </TextField> */}
                            <button className={classes.ButtonSubmit} type="submit">Save</button>
                        </form>
                    </div>
                    }
                </div>
            </div>
        </div>
    )
}