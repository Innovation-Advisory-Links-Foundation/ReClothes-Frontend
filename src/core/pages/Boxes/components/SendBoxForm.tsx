import React from "react"
import { FieldArray, useFormik } from "formik"
import * as Yup from "yup"
import { Button, Grid, TextField, Typography } from "@material-ui/core"
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles"
import { clothType, clothTypesIcons } from "../../../../constants/costants"
import IconClothQuantity from "./IconClothQuantity"
import CircularLoader from "../../../../shared/components/CircularLoader"
import { SecondHandClothesData } from "../../../../Types"
import classes from "*.module.css"

const validationSchema = Yup.object({
    description: Yup.string().max(120, "Must be 120 characters or less").required("Required"),
    clothes: Yup.array()
        .of(
            Yup.object().shape({
                quantity: Yup.number().max(10, "Max 10 articles per category")
            })
        )
        .required("Required")
})

type Props = {
    handleClose: () => void, // Callback function for handling modal close.
    sendTransaction: (description: string, clothes: SecondHandClothesData[]) => void // Callback function for sending a transaction.
}

/**
 * Displays the form for submitting a transaction for sending a box of second-hand clothes.
 */
function SendBoxForm ({ handleClose, sendTransaction }: Props) {
    const classes = useStyles()

    const formik = useFormik({
        initialValues: {
            description: "",
            clothes: [
                {
                    clothType: 0,
                    quantity: 0
                },
                {
                    clothType: 1,
                    quantity: 0
                },
                {
                    clothType: 2,
                    quantity: 0
                },
                {
                    clothType: 3,
                    quantity: 0
                },
                {
                    clothType: 4,
                    quantity: 0
                },
                {
                    clothType: 5,
                    quantity: 0
                }
            ]
        },
        validationSchema,
        onSubmit: (values, { setSubmitting, resetForm }) => {
            setTimeout(() => {
                sendTransaction(values.description, values.clothes)
                resetForm()
                setSubmitting(false)
            }, 1000)
        },
        onReset: () => {
            handleClose()
        }
    })

    return (
        <div>
            <form onSubmit={formik.handleSubmit} className={classes.form}>
                <Typography component="h5" variant="h5" align="center">Send a Box</Typography>
                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                    spacing={2}
                >
                    {formik.values.clothes.length > 0 &&
                    formik.values.clothes.map((cloth, index) => (
                        <Grid item key={index}>
                            <IconClothQuantity
                                url={clothTypesIcons[index]}
                                dim={64}
                            >
                                <TextField
                                    name={`clothes.${index}.quantity`}
                                    placeholder="0"
                                    type="number"
                                    value={formik.values.clothes[index].quantity}
                                    onChange={formik.handleChange}
                                    error={formik.touched.clothes && Boolean(formik.errors.clothes)}
                                    className={classes.input}
                                />
                            </IconClothQuantity>
                        </Grid>
                    )
                    )}
                </Grid>
                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                >
                    <Grid item>
                        <TextField
                            fullWidth
                            label="Description"
                            name="description"
                            type="textarea"
                            placeholder="A short description..."
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            error={formik.touched.description && Boolean(formik.errors.description)}
                            className={classes.textArea}
                        />
                    </Grid>
                    <Grid item>
                        <Button color="primary" variant="contained" type="submit" className={classes.button}>
                    Send box
                        </Button>
                    </Grid>
                </Grid>
            </form>
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
            marginBottom: "10px",
            width: "15vw"
        },
        textArea: {
            fontSize: "1em",
            marginBottom: "10px",
            width: "30vw"
        },
        button: {
            width: "25vw"
        }
    })
)

export default SendBoxForm
