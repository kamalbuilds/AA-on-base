import React from "react"
// import {
//     Grid,
//     makeStyles,
//     Card,
//     CardContent,
//     MenuItem,
//     InputLabel,
//     Select,
//     CardActions,
//     Button,
//     CardHeader,
//     FormControl,
// } from "@material-ui/core"
import Grid from '@mui/material/Grid';
import makeStyles from '@mui/styles/makeStyles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import CardHeader from '@mui/material/CardHeader';
import FormControl from '@mui/material/FormControl';

import { Formik, Form, Field } from "formik"
import * as Yup from "yup"
import { TextField } from "formik-material-ui"


// const useStyle = makeStyles((theme) => ({
//     padding: {
//         padding: theme.spacing(3),
//     },
//     button: {
//         margin: theme.spacing(1),
//     },
// }))

//Data
const initialValues = {
    projectName: "",
    projectId: "",
    occupation: "",
    city: "",
    country: "",
    email: "",
    password: "",
}

const options = [
    { label: "Computer Programmer", value: "Computer_programmer" },
    { label: "Web Developer", value: "web_developer" },
    { label: "User Experience Designer", value: "user_experience_designer" },
    { label: "Systems Analyst", value: "systems_analyst" },
    { label: "Quality Assurance Tester", value: "quality_assurance_tester" },
]

//password validation
const lowercaseRegEx = /(?=.*[a-z])/
const uppercaseRegEx = /(?=.*[A-Z])/
const numericRegEx = /(?=.*[0-9])/
const lengthRegEx = /(?=.{6,})/

//validation schema
let validationSchema = Yup.object().shape({
    projectName: Yup.string(),
    projectId: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
        .matches(
            lowercaseRegEx,
            "Must contain one lowercase alphabetical character!"
        )
        .matches(
            uppercaseRegEx,
            "Must contain one uppercase alphabetical character!"
        )
        .matches(numericRegEx, "Must contain one numeric character!")
        .matches(lengthRegEx, "Must contain 6 characters!")
        .required("Required!"),
})

const Forms = () => {
    // const classes = useStyle()

    const onSubmit = (values: any) => {
        console.log(values)
    }

    return (
        <Grid container spacing={1} justifyContent="center">
            <Grid item md={6}>
                <Card >
                    <CardHeader title="REGISTER FORM"></CardHeader>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}>
                        {({ dirty, isValid, values, handleChange, handleBlur }) => {
                            return (
                                <Form>
                                    <CardContent>
                                        <Grid item container spacing={1} justifyContent="center">
                                            <Grid item
                                            // xs={12} sm={6} md={6}
                                            >
                                                <Field
                                                    label="Project Name"
                                                    variant="outlined"
                                                    fullWidth
                                                    name="projectName"
                                                    value={values.projectName}
                                                    component={TextField}
                                                />
                                            </Grid>

                                            <Grid item container spacing={1} justifyContent="center">
                                                <Grid item
                                                // xs={12} sm={6} md={6}
                                                >
                                                    <Field
                                                        label="Project Id"
                                                        variant="outlined"
                                                        fullWidth
                                                        name="projectId"
                                                        value={values.projectId}
                                                        component={TextField}
                                                    />
                                                </Grid>
                                            </Grid>


                                            <Grid item xs={12} sm={6} md={12}>
                                                <FormControl fullWidth variant="outlined">
                                                    <InputLabel id="demo-simple-select-outlined-label">
                                                        Occupation
                                                    </InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-outlined-label"
                                                        id="demo-simple-select-outlined"
                                                        label="Occupation"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.occupation}
                                                        name="occupation">
                                                        <MenuItem>None</MenuItem>
                                                        {options.map((item) => (
                                                            <MenuItem key={item.value} value={item.value}>
                                                                {item.label}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={12} sm={6} md={6}>
                                                <Field
                                                    label="City"
                                                    variant="outlined"
                                                    fullWidth
                                                    name="city"
                                                    value={values.city}
                                                    component={TextField}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6} md={6}>
                                                <Field
                                                    label="Country"
                                                    variant="outlined"
                                                    fullWidth
                                                    name="country"
                                                    value={values.country}
                                                    component={TextField}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6} md={6}>
                                                <Field
                                                    label="Email"
                                                    variant="outlined"
                                                    fullWidth
                                                    name="email"
                                                    value={values.email}
                                                    component={TextField}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6} md={6}>
                                                <Field
                                                    label="Password"
                                                    variant="outlined"
                                                    fullWidth
                                                    name="password"
                                                    value={values.password}
                                                    type="password"
                                                    component={TextField}
                                                />
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                    <CardActions>
                                        {/* <Button
                      disabled={!dirty || !isValid}
                      variant="contained"
                      color="primary"
                      type="Submit"
                      className={classes.button}>
                      REGISTER
                    </Button> */}
                                        <Button
                                            variant="contained"
                                            color="primary"
                                        >Register</Button>
                                    </CardActions>
                                </Form>
                            )
                        }}
                    </Formik>
                </Card>
            </Grid>
        </Grid>
    )
}

export default Forms