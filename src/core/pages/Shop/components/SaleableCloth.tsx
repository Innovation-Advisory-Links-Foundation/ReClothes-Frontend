import React, { useEffect, useState } from "react"
import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import clothesImages from "../../../../assets/mocks/saleableClothesExternalDataHash.json"
import { clothSize, clothStatus } from "../../../../constants/costants"
import { ClothData } from "../../../../Types"

type Props = {
    drizzle: any,
    userAccountAddress: string,
    isCustomer: boolean,
    clothTypeFilter: number,
    clothSizeFilter: number,
    saleableClothId: number
}

/**
 * Show and implement the purchase logic for a single saleable cloth in the shop.
 */
function SaleableCloth ({ drizzle, userAccountAddress, isCustomer, clothTypeFilter, clothSizeFilter, saleableClothId }: Props) {
    const classes = useStyles()

    const [saleableClothData, setSaleableClothData] = useState<ClothData>() // The object containing the whole data for the saleable cloth.
    const [dataKey, setDataKey] = useState<string>() // Drizzle cacheCall method data key.
    const [customerRscBalance, setCustomerRscBalance] = useState<number>() // The RSC tokens balance for the account.

    const drizzleState = drizzle.store.getState() // Get an updated copy of drizzle state.
    const cachedMethod = drizzleState.contracts.ReclothesShop.idToSaleableCloth[dataKey] // Declare this call to be cached and synchronized.

    // Callback function for sending a transaction.
    const sendTransactions = async () => {
        drizzle.contracts.ResellingCredit.methods.increaseAllowance(drizzle.contracts.ReclothesShop.address, saleableClothData.price).send({ from: userAccountAddress })
        drizzle.contracts.ReclothesShop.methods.buyCloth(saleableClothId).send({ from: userAccountAddress })
    }

    // Set the dataKey to retrieve data from the cached method on the Drizzle store.
    useEffect(() => {
        setDataKey(drizzle.contracts.ReclothesShop.methods.idToSaleableCloth.cacheCall(saleableClothId))
    }, [])

    // Store the updates for the observed cached method.
    useEffect(() => {
        setSaleableClothData(dataKey ? drizzleState.contracts.ReclothesShop.idToSaleableCloth[dataKey].value : {})
    }, [cachedMethod])

    // Retrieve the RSC tokens balance for the customer account.
    useEffect(() => {
        (async () => {
            if (userAccountAddress && isCustomer) { 
                setCustomerRscBalance(await drizzle.contracts.ResellingCredit.methods.balanceOf(userAccountAddress).call()) 
            }
        })()
    })

    // Match the saleable cloth data and filters.
    if(saleableClothData && 
        ((clothTypeFilter === Number(saleableClothData.clothType) || clothTypeFilter === 6) &&
        (clothSizeFilter === Number(saleableClothData.clothSize) || clothSizeFilter === 6) &&
        (saleableClothData.buyer === "0x0000000000000000000000000000000000000000"))) 
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
    else
        return null
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
    }
}))
export default SaleableCloth
