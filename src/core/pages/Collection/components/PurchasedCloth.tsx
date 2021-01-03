import React, { useEffect, useState } from "react"
import { Card, CardContent, CardMedia, Grid, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import clothesImages from "../../../../assets/mocks/saleableClothesExternalDataHash.json"
import { clothSize, clothStatus } from "../../../../constants/costants"

type Props = {
    drizzle: any, // Drizzle initialized instance.
    userAccountAddress: string,
    purchasedClothId: number,
    clothTypeFilter: number,
    clothSizeFilter: number,
    isCustomer: boolean
}
// Handles a filterable list of projects.
function PurchasedCloth ({ drizzle, userAccountAddress, purchasedClothId, clothTypeFilter, clothSizeFilter, isCustomer }: Props) {
    const classes = useStyles()
    const [purchasedClothData, setPurchasedClothData] = useState() // Saleable Cloth data.

    useEffect(() => {
        (async () => {
            setPurchasedClothData(await drizzle.contracts.ReclothesShop.methods.idToSaleableCloth(purchasedClothId).call({ from: userAccountAddress }))
        })()
    }, [purchasedClothId, drizzle.contracts.ReclothesShop.methods, userAccountAddress])

    if (purchasedClothData &&
        (clothTypeFilter === Number(purchasedClothData.clothType) || clothTypeFilter === 6) &&
        (clothSizeFilter === Number(purchasedClothData.clothSize) || clothSizeFilter === 6)
    ) {
        const humanReadableDate = new Date(purchasedClothData.timestamp * 1000)

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
    } else {
        return (
            <div></div>
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
export default PurchasedCloth
