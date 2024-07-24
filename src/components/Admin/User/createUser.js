import React from "react";
import { makeStyles } from "@mui/styles";
import { Accordion } from "@mui/material";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { useForm } from "react-hook-form";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useDispatch } from "react-redux";
import * as action from "../Redux/Action/action";

const userStyles = makeStyles(() => ({
  container: {
    marginBottom: 100,
  },
  title: {
    fontSize: 18,
  },
  form: {
    width: "50%",
  },
  inputContainer: {
    marginBottom: 18,
  },
  inputValid: {
    color: "#fe000",
  },
  buttonSubmit: {
    outline: "none",
    lineHeight: "24",
    fontSize: 16,
    cursor: "pointer",
    padding: "7px 28px",
    backgroundColor: "white",
    borderRadius: 30,
    border: "1px solid #757575",
    marginTop: 15,
  },
  detail: {
    width: "100%",
    marginTop: "10px",
    padding: "18px 14px",
    fontSize: 18,
  },
}));
const Dashboard = () => {
  const classes = userStyles();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data, e) => {
    console.log(data);
    let form = document.getElementById("AdminFormCreateUser");
    form.reset();
    dispatch(action.createUserAPI(data));
  };
  const age = [];
  for (var i = 0; i < 100; i++) {
    age.push(i + 1);
  }
  const listAge = age.map((item) => {
    return (
      <option key={item} value={item}>
        {item}
      </option>
    );
  });
  return (
<div className={classes.container}>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                >
                    <div className={classes.title}>Create user Account</div>
                </AccordionSummary>
                <AccordionDetails>
                    <form method="POST" className={classes.form} id="AdminFormCreateUser" onSubmit={handleSubmit(onSubmit)}>
                        <div className={classes.inputContainer}>
                            <div>Email</div>
                            <input
                                type="text"
                                placeholder="Email"
                                className={classes.input}
                                name="email"
                                {...register("email", { required: true })}
                            />
                        </div>
                        <div className={classes.inputContainer}>
                            <div>password</div>
                            <input
                                type="password"
                                placeholder="Password"
                                className={classes.input}
                                name="password"
                                {...register("password", { required: true })}
                            />
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
                        <button className={classes.buttonSubmit} type="submit">
                            Create user</button>
                    </form>
                </AccordionDetails>
            </Accordion>
        </div>  );
};

export default Dashboard;
