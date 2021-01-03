import React, { useState } from "react"
import Link from "@material-ui/core/Link"
import Grid from "@material-ui/core/Grid"
import Box from "@material-ui/core/Box"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import ReClothesLogo from "../../../assets/icons/ReClothesLogo.png"
import OnboardingButton from "./components/OnboardingButton"
import TransitionsModal from "../../../shared/components/TransitionsModal"
import ConnectionHelp from "../ConnectionHelp/ConnectionHelp"

function Copyright () {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {"Copyright © "}
            <Link color="inherit" target="_blank" rel="noopener" href="http://overtheblock.io/">
                OverTheBlock
            </Link>
            {" - "}
            <Link color="inherit" target="_blank" rel="noopener" href="https://linksfoundation.com/">
                LINKS Foundation
            </Link>
            {" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    )
}

// Guide the user through Metamask installation and connection with the Reclothes dApp.
function MetamaskOnBoarding () {
    const classes = useStyles()
    const [openHelpModal, setOpenHelpModal] = useState(false) // Handles the modal open/close logic when clicking the fab button.

    // Callback for fab button click.
    const handleHelpModalOpen = () => {
        setOpenHelpModal(true)
    }

    // Callback to pass down as props for handling modal close.
    const handleHelpModalClose = () => {
        setOpenHelpModal(false)
    }
    return (
        <Container component="main" maxWidth="md">
            <div className={classes.root}>
                <img src={ReClothesLogo} alt="ReClothes Logo" style={{ width: "auto", height: "auto" }} />
                <Typography component="h1" variant="h4" align="center" gutterBottom style={{marginTop: "5%"}}>
                    Sell second-hand clothes <span role="img" aria-label="t-shirt">👕</span>  Earn tokens<span role="img" aria-label="loot">💰</span>  Save the Earth<span role="img" aria-label="earth">🌍</span>
                </Typography>
                <br></br>
                <form className={classes.form} noValidate>
                    <OnboardingButton/>
                    <TransitionsModal
                        isOpen={openHelpModal}
                        handleClose={handleHelpModalClose}
                    >
                        <ConnectionHelp />
                    </TransitionsModal>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                How it works?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="#" variant="body2" onClick={handleHelpModalOpen}>
                                <b>Any connection issue?</b>
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    )
}

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: "15%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(10)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    }
}))

export default MetamaskOnBoarding
