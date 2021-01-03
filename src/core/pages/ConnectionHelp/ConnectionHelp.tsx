import { Container, Grid, Typography } from "@material-ui/core"
import React from "react"

function ConnectionHelp () {
    return (
        <Container maxWidth="sm">
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
                spacing={4}
            >
                <Grid item>
                    <Typography component="h1" variant="h6" align="center" gutterBottom>
                        How to connect using MetaMask
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant="body1" align="center" gutterBottom>
                        Please create a new custom RPC network on your MetaMask using these values for the specified fields.
                        <br></br>
                        <br></br>
                        - New RPC URL: <b>http://linksfoundationtodo/besu:8545</b>
                        <br></br>
                        - Chain ID: <b>2018</b>
                        <br></br>
                        <br></br>
                        For any question regarding how to add a custom RPC network with MetaMask, check the official documentation at <a href="https://metamask.io" rel="noopener noreferrer" target="_blank">MetaMask</a>
                    </Typography>
                </Grid>
            </Grid>
        </Container>
    )
}

export default ConnectionHelp
