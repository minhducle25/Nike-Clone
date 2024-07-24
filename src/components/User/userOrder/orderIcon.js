import React from "react";
import { makeStyles, withStyles } from "@mui/styles"
import {Step, StepConnector, StepLabel, Stepper} from "@mui/material"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import clsx from "clsx"

const ColorlibConnector = withStyles({
    alternativeLabel: {
        top: 15,
    },
    active: {
        '& $line': {
        backgroundImage:
            'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
        },
    },
    completed: {
        '& $line': {
        backgroundImage:
            'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
        },
    },
    line: {
        height: 10,
        border: 0,
        backgroundColor: '#eaeaf0',
        borderRadius: 1,
    },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
    root: {
        backgroundColor: '#ccc',
        zIndex: 1,
        color: '#fff',
        width: 42,
        height: 42,
        display: 'flex',
        borderRadius: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    active: {
        backgroundImage:
        'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
        boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    },
    completed: {
        backgroundImage:
        'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    },
});

function ColorlibStepIcon(props) {
    const classes = useColorlibStepIconStyles();
    const { active, completed } = props;

    const icons = {
        1: <ShoppingCartIcon />,
        2: <LocalShippingIcon />,
        3: <DoneOutlineIcon />,
    };

  return (
    <div
        className={clsx(classes.root, {
            [classes.active]: active,
            [classes.completed]: completed,
        })}
    >
        {icons[String(props.icon)]}
    </div>
  );
}


const useStyles = makeStyles((theme) => ({
    root: {
        width: 350,
    },
    stepperContainer:{
        padding: 0,
        // [theme.breakpoints.down('xs')]: {
        //     width: '220px',
        // },
    },
    stepLabel:{
        // [theme.breakpoints.down('xs')]: {
        //     marginRight: '0px !important',
        // },
    }
}));

function getSteps() {
    return ['Confirm', 'Delivering', 'Delivered'];
}


export default function CustomizedSteppers(props) {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(props.status-1);
    const steps = getSteps();
    
    return (
    <div className={classes.root}>
        <Stepper className={classes.stepperContainer} alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
            {steps.map((lable) => (
            <Step key={lable}>
                <StepLabel className={classes.stepLabel} StepIconComponent={ColorlibStepIcon}></StepLabel>
            </Step>
            ))}
        </Stepper>
      
    </div>
  );
}