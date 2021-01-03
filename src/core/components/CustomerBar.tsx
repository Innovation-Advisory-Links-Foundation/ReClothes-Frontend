import React, { useEffect, useState } from "react"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import { Grid, Hidden } from "@material-ui/core"
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles"
import Jdenticon from "react-jdenticon"
import ETHAddress from "../../shared/components/ETHAddress"

type Props = {
    drizzle: any, // Drizzle initialized instance.
    userAccountAddress: string,
    isCustomer: boolean
}

function CustomerBar ({ drizzle, userAccountAddress, isCustomer } : Props) {
    const classes = useStyles()

    // eslint-disable-next-line
    const [stackId, setStackId] = useState(0) // Drizzle tx stack identifier.
    const [customerRscBalance, setCustomerRscBalance] = useState(0)

    const sendTransaction = () => {
        setStackId(drizzle.contracts.ReclothesShop.methods.registerAsCustomer.cacheSend({ from: userAccountAddress }))
    }

    useEffect(() => {
        (async () => {
            if (isCustomer && userAccountAddress)
            // @ts-ignore
            { setCustomerRscBalance(await drizzle.contracts.ResellingCredit.methods.balanceOf(userAccountAddress).call()) }
        })()
    })

    return (
        <div>
            {(!isCustomer) &&
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    className={classes.containerGrid}
                >
                    <Grid item>
                        <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            style={{ width: "100%" }}
                            onClick={sendTransaction}
                        >
                        Click to register as Customer to buy clothes!
                        </Button>
                    </Grid>
                </Grid>
            }
            {(isCustomer) &&
                <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                    className={classes.containerGrid}
                >
                    <Grid item>
                        <Grid
                            container
                            direction="row"
                            justify="space-between"
                            alignItems="center"
                        >
                            <Grid item>
                                <Jdenticon size="50" value={userAccountAddress}/>
                            </Grid>
                            <Grid item>
                                <Hidden only="xs">
                                    <Typography variant="subtitle1" component="h6" align="center">
                                        {userAccountAddress}
                                    </Typography>
                                </Hidden>
                                <Hidden only={["sm", "md", "lg", "xl"]}>
                                    <Typography variant="subtitle1" component="h6" align="center">
                                        <ETHAddress address={userAccountAddress} chars={8} />
                                    </Typography>
                                </Hidden>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Typography variant="subtitle1" component="h4" align="center" className={classes.token}>
                            Balance: <b>{customerRscBalance} RSC</b>
                        </Typography>
                    </Grid>
                </Grid>
            }
        </div>
    )
}
const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        backgroundColor: theme.palette.background.default,
        marginBottom: "5vh"
    },
    token: {
        [theme.breakpoints.down("xs")]: {
            textAlign: "center"
        }
    },
    containerGrid: {
        padding: theme.spacing(4),
        [theme.breakpoints.down("xs")]: {
            flexDirection: "column",
            justifyContent: "center"
        }
    }
}))

export default CustomerBar
