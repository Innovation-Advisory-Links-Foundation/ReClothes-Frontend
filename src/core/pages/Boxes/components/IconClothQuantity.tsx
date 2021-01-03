import { Grid, Typography } from "@material-ui/core"
import React from "react"
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles"

type Props = {
    url: string, // The url of the icon.
    dim?: number, // Icon dimension in pixels.
    children: {}
}

/**
 * A reusable component which displays a custom icon and the passed children in a flex row centered view.
 */
function IconClothQuantity ({ url, dim = 64, children }: Props) {
    const classes = useStyles()

    return (
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            wrap="nowrap"
        >
            <img src={url} alt="Cloth Type Icon" className={classes.icon} style={{ width: dim, height: dim }}/>
            <Typography variant="body1" align="center">
                x {children}
            </Typography>
        </Grid>
    )
}            


const useStyles = makeStyles((theme: Theme) => createStyles({
    icon: {
        margin: theme.spacing(1)
    }
}))

export default IconClothQuantity
