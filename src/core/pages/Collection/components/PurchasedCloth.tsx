import React, { useEffect, useState } from "react"
import { Card, CardContent, CardMedia, Grid, Typography } from "@material-ui/core"
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
    purchasedClothId: number
}

/**
 * Show a single purchased cloth in the collection.
 */
function PurchasedCloth ({ drizzle, userAccountAddress, isCustomer, clothTypeFilter, clothSizeFilter, purchasedClothId }: Props) {
    const classes = useStyles()

    const [purchasedClothData, setPurchasedClothData] = useState<ClothData>() // The object containing the whole data for the purchased cloth.

    // Read the purchased cloth data from the blockchain state.
    useEffect(() => {
        (async () => {
            setPurchasedClothData(await drizzle.contracts.ReclothesShop.methods.idToSaleableCloth(purchasedClothId).call({ from: userAccountAddress }))
        })()
    }, [purchasedClothId, drizzle.contracts.ReclothesShop.methods, userAccountAddress])

    // Match the purchased cloth data and filters.
    if (purchasedClothData &&
        (clothTypeFilter === Number(purchasedClothData.clothType) || clothTypeFilter === 6) &&
        (clothSizeFilter === Number(purchasedClothData.clothSize) || clothSizeFilter === 6)) {
        const humanReadableDate = new Date(purchasedClothData.timestamp * 1000) // Convert the UNIX timestamp to a human-readable data format.

        return (
            <Grid item key={purchasedClothId} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                    <CardMedia
                        className={classes.cardMedia}
                        image={clothesImages[purchasedClothData.clothType].hash.toLowerCase() === purchasedClothData.info.toLowerCase() ? clothesImages[purchasedClothData.clothType].url : ""}
                        title={purchasedClothData.description}
                    />
                    <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant="subtitle1" align="center" component="h6">
                            {purchasedClothData.description}
                        </Typography>
                        <Grid
                            container
                            direction="column"
                            justify="space-around"
                            alignItems="center"
                        >
                            <Grid item>
                                <Typography gutterBottom variant="body1" align="center">
                                    <b>{clothStatus[purchasedClothData.clothStatus]}</b> / <b>{clothSize[purchasedClothData.clothSize]}</b>
                                </Typography>
                            </Grid>

                            <Grid item>
                                <Typography gutterBottom variant="body1" align="center">
                                    <b>{purchasedClothData.price} </b> <i>RSC</i>
                                </Typography>
                            </Grid>

                            <Grid item>
                                <Typography gutterBottom variant="body2" align="center">
                                    <i>{humanReadableDate.toLocaleString()}</i>
                                </Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
        )
    } else 
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
export default PurchasedCloth
