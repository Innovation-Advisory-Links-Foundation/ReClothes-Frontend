import React, { useEffect, useState } from "react"
import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import clothesImages from "../../../../assets/mocks/saleableClothesExternalDataHash.json"
import { clothSize, clothStatus } from "../../../../constants/costants"

type Props = {
    drizzle: any, // Drizzle initialized instance.
    userAccountAddress: string,
    saleableClothId: number,
    clothTypeFilter: number,
    clothSizeFilter: number,
    isCustomer: boolean
}
// Handles a filterable list of projects.
function SaleableCloth ({ drizzle, userAccountAddress, saleableClothId, clothTypeFilter, clothSizeFilter, isCustomer }: Props) {
    const classes = useStyles()
    const [saleableClothData, setSaleableClothData] = useState() // Saleable Cloth data.

    // eslint-disable-next-line
    const [stackIdRC, setStackIdRC] = useState(-1) // Drizzle tx stack identifier.
    // eslint-disable-next-line
    const [stackIdRS, setStackIdRS] = useState(-1) // Drizzle tx stack identifier.
    const [dataKey, setDataKey] = useState("") // Drizzle cacheCall method data key.
    const [customerRscBalance, setCustomerRscBalance] = useState(0)

    const drizzleState = drizzle.store.getState() // Get an updated copy of drizzle state.
    const cachedMethod = drizzleState.contracts.ReclothesShop.idToSaleableCloth[dataKey]

    const sendTransactions = async () => {
        setStackIdRC(drizzle.contracts.ResellingCredit.methods.increaseAllowance.cacheSend(drizzle.contracts.ReclothesShop.address, saleableClothData.price, { from: userAccountAddress }))
        setStackIdRS(drizzle.contracts.ReclothesShop.methods.buyCloth.cacheSend(saleableClothId, { from: userAccountAddress }))
    }

    // Get data key from the cacheCall() to observe the project changes.
    useEffect(() => {
        setDataKey(drizzle.contracts.ReclothesShop.methods.idToSaleableCloth.cacheCall(saleableClothId))
        // eslint-disable-next-line
    }, [])

    // When the cacheCall() observed method updates, lets write the new data here.
    useEffect(() => {
        setSaleableClothData(dataKey ? drizzleState.contracts.ReclothesShop.idToSaleableCloth[dataKey].value : {})
        // eslint-disable-next-line
    }, [cachedMethod])

    useEffect(() => {
        (async () => {
            if (isCustomer && userAccountAddress)
            // @ts-ignore
            { setCustomerRscBalance(await drizzle.contracts.ResellingCredit.methods.balanceOf(userAccountAddress).call()) }
        })()
    })

    if (saleableClothData &&
        (clothTypeFilter === Number(saleableClothData.clothType) || clothTypeFilter === 6) &&
        (clothSizeFilter === Number(saleableClothData.clothSize) || clothSizeFilter === 6) &&
        (saleableClothData.buyer === "0x0000000000000000000000000000000000000000")) {
        return (
            <Grid item key={saleableClothId} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                    <CardMedia
                        className={classes.cardMedia}
                        image={clothesImages[saleableClothData.clothType].hash.toLowerCase() === saleableClothData.info.toLowerCase() ? clothesImages[saleableClothData.clothType].url : ""}
                        title={saleableClothData.description}
                    />
                    <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant="subtitle1" align="center" component="h6">
                            {saleableClothData.description}
                        </Typography>
                        <Grid
                            container
                            direction="column"
                            justify="space-around"
                            alignItems="center"
                        >
                            <Grid item>
                                <Typography gutterBottom variant="body1" align="center">
                                    <b>{clothStatus[saleableClothData.clothStatus]}</b> / <b>{clothSize[saleableClothData.clothSize]}</b>
                                </Typography>
                            </Grid>

                            <Grid item>
                                <Typography gutterBottom variant="body1" align="center">
                                    <b>{saleableClothData.price} </b> <i>RSC</i>
                                </Typography>
                            </Grid>
                        </Grid>
                        <CardActions style={{ justifyContent: "center" }}>
                            <Button
                                variant="contained"
                                color="primary"
                                size="small"
                                style={{ width: "50%" }}
                                disabled={(!isCustomer) || (Number(customerRscBalance) <= 0 && isCustomer)}
                                onClick={sendTransactions}
                            >
                                Buy
                            </Button>
                        </CardActions>
                    </CardContent>
                </Card>
            </Grid>
        )
    } else {
        return (
            null
        )
    }
}
const useStyles = makeStyles((theme) => ({
    card: {
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    cardMedia: {
        height: "480px",
        width: "100%"
    },
    cardContent: {
        flexGrow: 1
    },
    label: {
        opacity: "0.5"
    }
}))
export default SaleableCloth
