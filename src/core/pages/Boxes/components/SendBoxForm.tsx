import React from "react"
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik"
import * as Yup from "yup"
import { Button, Grid, Typography } from "@material-ui/core"
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles"
import { clothType, clothTypesIcons } from "../../../../constants/costants"
import IconClothQuantity from "./IconClothQuantity"
import CircularLoader from "../../../../shared/components/CircularLoader"

// Defining the TS type for every property passed as props.
type Props = {
    handleClose: () => void,
    sendTransaction: (description: string, clothes: (({clothType: string, quantity: number})[])) => void,
}

function SendBoxForm ({ handleClose, sendTransaction }: Props) {
    const classes = useStyles()

    return (
        <div>
            <Formik
                initialValues={{
                    description: "",
                    clothes: [
                        {
                            clothType: clothType[0],
                            quantity: 0
                        },
                        {
                            clothType: clothType[1],
                            quantity: 0
                        },
                        {
                            clothType: clothType[2],
                            quantity: 0
                        },
                        {
                            clothType: clothType[3],
                            quantity: 0
                        },
                        {
                            clothType: clothType[4],
                            quantity: 0
                        },
                        {
                            clothType: clothType[5],
                            quantity: 0
                        }
                    ]
                }}
                validationSchema={
                    Yup.object({
                        description: Yup.string().max(120, "Must be 120 characters or less").required("Required"),
                        clothes: Yup.array()
                            .of(
                                Yup.object().shape({
                                    quantity: Yup.number().max(10, "Max 10 articles per category")
                                })
                            )
                            .required("Required")
                    })
                }
                onSubmit={(values, { setSubmitting, resetForm }) => {
                // Loading.
                    setTimeout(() => {
                        sendTransaction(values.description, values.clothes)
                        resetForm()
                        setSubmitting(false)
                    }, 2000)
                }}
                onReset={() => {
                    handleClose()
                }}
            >
                {({ values, isSubmitting }) => (
                    <Form className={classes.form}>
                        <Typography component="h5" variant="h5" align="center">Send a Box</Typography>
                        <FieldArray name="clothes">
                            {() => (
                                <Grid
                                    container
                                    direction="column"
                                    justify="center"
                                    alignItems="center"
                                    spacing={2}
                                >
                                    {values.clothes.length > 0 &&
                                    values.clothes.map((cloth, index) => (
                                        <Grid item key={index}>
                                            <IconClothQuantity
                                                url={clothTypesIcons[index]}
                                                dim={32}
                                            >
                                                <Field
                                                    name={`clothes.${index}.quantity`}
                                                    placeholder="0"
                                                    type="number"
                                                    className={classes.input}
                                                />
                                            </IconClothQuantity>
                                            <ErrorMessage
                                                name={`clothes.${index}.quantity`}
                                                render={(msg) => <div className={classes.error}>{msg}</div>}
                                            />
                                        </Grid>
                                    )
                                    )}
                                </Grid>
                            )}
                        </FieldArray>

                        <Grid
                            container
                            direction="column"
                            justify="center"
                            alignItems="center"
                        >
                            <Field
                                label="description"
                                name="description"
                                type="textarea"
                                placeholder="A short description..."
                                className={classes.textArea}
                            />
                        </Grid>
                        <ErrorMessage name="description" render={(msg) => <div className={classes.error}>{msg}</div>}/>
                        {(!isSubmitting) &&
                        <Grid
                            container
                            direction="row"
                            justify="center"
                            alignItems="center"
                        >
                            <Button type='reset' color="secondary" variant="outlined" style={{ margin: "5px" }}>Cancel</Button>
                            <Button type="submit" color="primary" variant="contained" style={{ margin: "5px" }}>Send </Button>
                        </Grid>
                        }
                        {(isSubmitting) &&
                        <CircularLoader />
                        }
                    </Form>
                )}
            </Formik>
        </div>
    )
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        form: {
            display: "flex",
            flexDirection: "column",
            width: "50vw"
        },
        label: {
            marginTop: "10px"
        },
        input: {
            fontSize: "1em",
            marginBottom: "5px",
            width: "15vw"
        },
        textArea: {
            fontSize: "1em",
            marginBottom: "5px",
            width: "25vw"
        },
        error: {
            fontSize: "1em",
            color: theme.palette.error.main,
            marginBottom: "5px"
        }
    })
)

export default SendBoxForm
