import React from "react"
import * as Yup from "yup"
import { Formik, Form, Field, ErrorMessage } from "formik"
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles"
import { Box, Button, Grid } from "@material-ui/core"
import CircularLoader from "./CircularLoader"

// TS Props type.
type Props = {
    sendTx: (values: any[]) => void
}

// A simple customizable form component, created using Formik and validated using Yup, that call a sendTx()
// Method on submit, passing the form values as parameters.
function SimpleSendTxForm ({ sendTx }: Props) {
    const classes = useStyles()

    return (
        <Formik
            initialValues={{
                // Your initial values for each form field.
                myValue: 1
            }}
            validationSchema={
                // Your validation schema using Yup (find more here https://github.com/jquense/yup).
                Yup.object({
                    myValue: Yup.number()
                        .min(1, "Must be greater or equal than 1")
                        .max(100, "Must be lower or equal to 100")
                        .required(true)
                })
            }
            onSubmit={(values, { setSubmitting, resetForm }) => {
                // Call the method and reset the form on submit.
                setTimeout(() => {
                    sendTx(Object.values(values))
                    resetForm()
                    setSubmitting(false)
                }, 2000)
            }}
        >

            {(formikProps) => (
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                >
                    <Form>
                        <Field
                            label="myValue"
                            name="myValue"
                            type="number"
                            placeholder="Min 1, Max 100"
                        />

                        {/* Displays a button if is not submitting. */}
                        {(!formikProps.isSubmitting) &&
                        <Button type="submit" color="primary" variant="contained" style={{ marginLeft: "5px" }}> Submit </Button>
                        }

                        {/* Displays a circular loader if submitting. */}
                        {(formikProps.isSubmitting) &&
                        <CircularLoader
                            size={35}
                            thickness={4}
                        />
                        }
                        <ErrorMessage name="myValue" render={(msg) => <Box className={classes.error}>{msg}</Box>}/>
                    </Form>
                </Grid>
            )}
        </Formik>
    )
}

// Custom styles.
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        error: {
            fontSize: "1em",
            color: theme.palette.error.main,
            marginBottom: "5px"
        }
    })
)

export default SimpleSendTxForm
