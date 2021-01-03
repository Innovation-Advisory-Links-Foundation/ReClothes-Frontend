import React from "react"
import { Grid, Hidden, Typography } from "@material-ui/core"
import Jdenticon from "react-jdenticon"
import ETHAddress from "../components/ETHAddress"
import environment from "../../constants/environment"

// Defining the TS type for every property passed as props.
type Props = {
    userAccountAddress: string, // User Ethereum account address.
    isNetworkCorrect: boolean, // Flag for checking the network connection.
    currentNetworkId: number // Current network identifier.
}

// Displays the ETHAccount connection info (jdenticon, address, network).
function ETHAccount ({ userAccountAddress, isNetworkCorrect, currentNetworkId }: Props) {
    return (
        <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
            spacing={2}
        >
            <Hidden only="xs">
                <Grid item>
                    <Jdenticon size="50" value={userAccountAddress} />
                </Grid>
            </Hidden>
            <Grid item>
                <Grid
                    container
                    direction="column"
                    justify="flex-start"
                    alignItems="center"
                >
                    <Grid item>
                        <ETHAddress address={userAccountAddress} chars={4} />
                    </Grid>
                    {(!isNetworkCorrect) &&
                            <Grid item>
                                <Typography style={{ color: "#C51B46" }} variant="overline" align="center" gutterBottom>
                                    Wrong Network
                                </Typography>
                            </Grid>
                    }
                    {(isNetworkCorrect) &&
                            <Grid item>
                                <Typography style={{ color: "#32CD32" }} variant="body1" align="center">
                                    Connected to {currentNetworkId === environment.PROD_NETWORK_ID ? environment.PROD_NETWORK_TYPE : environment.DEV_NETWORK_TYPE}
                                </Typography>
                            </Grid>
                    }
                </Grid>
            </Grid>
        </Grid>
    )
}

export default ETHAccount
