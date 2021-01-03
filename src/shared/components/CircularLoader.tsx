import React from "react"
import CircularProgress from "@material-ui/core/CircularProgress"
import { Grid, Typography } from "@material-ui/core"

// Defining the TS type for every property passed as props.
type Props = {
    color?: "inherit" | "primary" | "secondary" | undefined,
    size?: number,
    thickness?: number,
    message?: string
}

// A reusable component which displays a centered CircularProgress loader with a custom message.
function CircularLoader ({ color = "primary", size = 50, thickness = 5, message = "" }: Props) {
    return (
        <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            spacing={4}
        >
            <Grid item style={{ marginTop: "2vh" }}>
                <CircularProgress
                    color={color}
                    thickness={thickness}
                    size={size}
                    disableShrink
                />
            </Grid>
            <Grid item>
                <Typography variant="body1" component="h1" align="center" gutterBottom>
                    {message}
                </Typography>
            </Grid>
        </Grid>
    )
}

export default CircularLoader
