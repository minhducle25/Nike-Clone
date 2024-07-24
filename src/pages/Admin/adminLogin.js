import React from "react";
import { connect, useDispatch } from "react-redux";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import * as yup from "yup";
import { Formik, Form, ErrorMessage } from "formik";

function AdminSignIn() {
  const dispatch = useDispatch();
  const loginSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required(),
    password: yup.string().required(),
  });

  return (
    <Container component="main" maxWidth="xs" className="admin-login">
      <CssBaseline />
      <Typography component="h1" variant="h4" className="fw-100 text-center">
        Sign in
      </Typography>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={loginSchema}
        onSubmit={(values) => {
          //console.log(values)
          //dispatch(userLogin(values))
        }}
        render={(formikProps) => (
          <Form className="text-center">
            <ErrorMessage
              render={(msg) => <div className="err">{msg}</div>}
              name="email"
            />
            <ErrorMessage
              render={(msg) => <div className="err">{msg}</div>}
              name="password"
            />
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="email"
                name="email"
                onChange={formikProps.handleChange}
                placeholder="email"
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="password"
                name="password"
                onChange={formikProps.handleChange}
                placeholder="password"
              />
            </div>
            <button type="submit" className="sbt-btn">
              login
            </button>
          </Form>
        )}
      ></Formik>
    </Container>
  );
}
export default connect(AdminSignIn);
