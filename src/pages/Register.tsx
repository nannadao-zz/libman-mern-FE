import React, { useEffect } from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { TextField, Button, makeStyles } from '@material-ui/core'
import { Formik, Form, FormikProps } from 'formik'
import * as Yup from 'yup'
import Alert from '@material-ui/lab/Alert'
import { Tooltip, IconButton, Zoom } from '@material-ui/core'
import HelpIcon from '@material-ui/icons/Help'

import { RegisterForm, AppState } from '../types'
import Navbar from '../components/Navbar'
import { hideMessage, registerSucceed, loginFailed } from '../redux/actions/userActions'
import '../style/Register.css'

const useStyle = makeStyles({
  name: {
    margin: '1rem',
    backgroundColor: '#E8E8E8',
    flexBasis: '50%',
  },
  form: {
    margin: '1rem',
    backgroundColor: '#E8E8E8',
    width: '400px',
  },
  message: {
    margin: '2rem 0',
  },
  button: {
    display: 'block',
    margin: '1rem',
  },
})

const Register = () => {
  const style = useStyle()
  const dispatch = useDispatch()
  const history = useHistory()
  const userResponse = useSelector((state: AppState) => state.user)
  useEffect(() => {
    dispatch(hideMessage())
  }, [dispatch])

  useEffect(() => {
    if (userResponse.status === 'success') {
      setTimeout(() => history.push("/login"), 2000)
    }
  }, [userResponse.status, history])

  const createNewUser = async (values: RegisterForm) => {
    try {
      let { firstName, lastName, email, username, password } = values
      let res = await axios.post(
        '/api/v1/users/register',
        { firstName, lastName, email, username, password }
      )
      dispatch(registerSucceed(res.data))
    } catch (error) {
      dispatch(loginFailed(error.response.data))
    }
  }

  return (
    <div className="Register-MainContainer">
        <Navbar />
        <div className="Register-Background">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path
              fill="#044BD9"
              d="M49.9,-57.1C65.8,-46.2,80.4,-31.5,84.8,-13.9C89.1,3.7,83.2,24.2,71.7,39C60.3,53.8,43.2,62.9,25,70.3C6.7,77.7,-12.9,83.4,-28.7,78C-44.6,72.6,-56.7,56.2,-65.9,38.8C-75.2,21.3,-81.5,2.9,-78.9,-14.3C-76.3,-31.6,-64.9,-47.6,-50.3,-58.7C-35.6,-69.9,-17.8,-76,-0.4,-75.5C17,-75.1,34.1,-68,49.9,-57.1Z"
              transform="translate(100 100)"
            />
          </svg>
        </div>
        <div className="Register-Card">
          <h1> REGISTER </h1>
          <Formik
            initialValues={{
              lastName: '',
              firstName: '',
              username: '',
              email: '',
              password: '',
              confirmPassword: '',
            }}
            onSubmit={(values: RegisterForm, actions) => {
              createNewUser(values)
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string().email().required('Please enter valid email'),
              firstName: Yup.string().required('Please enter first name'),
              lastName: Yup.string().required('Please enter last name'),
              username: Yup.string()
                .matches(/^[a-z0-9._-]{3,15}$/)
                .required('Invalid username'),
              password: Yup.string()
                .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*]).{8,20}\S$/)
                .required('Invalid password'),
              confirmPassword: Yup.string()
                .required('Required')
                .test('password-match', 'Password must match', function (
                  value
                ) {
                  return this.parent.password === value
                }),
            })}
          >
            {(props: FormikProps<RegisterForm>) => {
              const {
                values,
                touched,
                errors,
                handleBlur,
                handleChange,
                isSubmitting,
              } = props
              return (
                <Form>
                  {userResponse.status && userResponse.message ? (
                    <Alert
                      variant="filled"
                      severity={userResponse.status}
                      classes={{ root: style.message }}
                    >
                      {userResponse.message}
                    </Alert>
                  ) : null}

                  <div className="Register-Form">
                    <div className="Register-NameField">
                      <TextField
                        classes={{ root: style.name }}
                        name="firstName"
                        id="firstName"
                        label="First Name"
                        variant="outlined"
                        value={values.firstName}
                        type="text"
                        helperText={
                          errors.firstName && touched.firstName
                            ? errors.firstName
                            : ''
                        }
                        error={
                          errors.firstName && touched.firstName ? true : false
                        }
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />

                      <TextField
                        classes={{ root: style.name }}
                        name="lastName"
                        id="lastName"
                        label="Last Name"
                        variant="outlined"
                        value={values.lastName}
                        type="text"
                        helperText={
                          errors.lastName && touched.lastName
                            ? errors.lastName
                            : ''
                        }
                        error={
                          errors.lastName && touched.lastName ? true : false
                        }
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>

                    <div>
                      <TextField
                        classes={{ root: style.form }}
                        name="email"
                        id="email"
                        label="Email"
                        variant="outlined"
                        value={values.email}
                        type="email"
                        helperText={
                          errors.email && touched.email ? errors.email : ''
                        }
                        error={errors.email && touched.email ? true : false}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>

                    <div className="Register-Fields">
                      <TextField
                        classes={{ root: style.form }}
                        name="username"
                        id="username"
                        label="Username"
                        variant="outlined"
                        value={values.username}
                        type="text"
                        helperText={
                          errors.username && touched.username
                            ? 'Invalid username'
                            : ''
                        }
                        error={
                          errors.username && touched.username ? true : false
                        }
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <Tooltip
                        title="Allowed special characters are: -, _ or ."
                        TransitionComponent={Zoom}
                      >
                        <IconButton aria-label="help">
                          <HelpIcon />
                        </IconButton>
                      </Tooltip>
                    </div>

                    <div className="Register-Fields">
                      <TextField
                        classes={{ root: style.form }}
                        name="password"
                        id="password"
                        label="Password"
                        variant="outlined"
                        value={values.password}
                        type="password"
                        helperText={
                          errors.password && touched.password
                            ? 'Invalid password'
                            : ''
                        }
                        error={
                          errors.password && touched.password ? true : false
                        }
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <Tooltip
                        title="Valid password: At least 8 characters, start with at least 1 uppercase & contain at least 1 special character."
                        TransitionComponent={Zoom}
                      >
                        <IconButton aria-label="help">
                          <HelpIcon />
                        </IconButton>
                      </Tooltip>
                    </div>

                    <div>
                      <TextField
                        classes={{ root: style.form }}
                        name="confirmPassword"
                        id="confirmPassword"
                        label="Confirm password"
                        variant="outlined"
                        value={values.confirmPassword}
                        type="password"
                        helperText={
                          errors.confirmPassword && touched.confirmPassword
                            ? errors.confirmPassword
                            : ''
                        }
                        error={
                          errors.confirmPassword && touched.confirmPassword
                            ? true
                            : false
                        }
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>

                    <div className="Register-Button">
                      <Button
                        classes={{ root: style.button }}
                        type="submit"
                        variant="contained"
                        size="large"
                        disableElevation
                        disabled={isSubmitting}
                      >
                        Submit
                      </Button>
                    </div>
                  </div>
                </Form>
              )
            }}
          </Formik>
        </div>
      </div>
  )
}

export default Register