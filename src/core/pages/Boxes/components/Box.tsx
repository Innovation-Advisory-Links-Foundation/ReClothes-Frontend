import React, { useEffect, useState } from "react"
import { Card, CardContent, CardMedia, Grid, Typography } from "@material-ui/core"
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles"
import boxNotEvaluatedIcon from "../../../../assets/icons/boxNotEvaluatedIcon.png"
import boxEvaluatedIcon from "../../../../assets/icons/boxEvaluatedIcon.png"
import IconClothQuantity from "./IconClothQuantity"
import { clothTypesIcons } from "../../../../constants/costants"
import { BoxData } from "../../../../Types"

type Props = {
    drizzle: any,
    userAccountAddress: string,
    isCustomer: boolean,
    clothTypeFilter: number,
    evaluationStatusFilter: number,
    boxId: number
}


/**
 * Show a single second-hand clothes box sent by the customer.
 */
function Box ({ drizzle, userAccountAddress, isCustomer, clothTypeFilter, evaluationStatusFilter, boxId }: Props) {
    const classes = useStyles()

    const [boxData, setBoxData] = useState<BoxData>() // The object containing the whole data for the box.
    const [dataKey, setDataKey] = useState<string>() // Drizzle cacheCall method data key.
    const [boxSecondHandClothesTypes, setBoxSecondHandClothesTypes] = useState<number[]>() // The cloth types in the second-hand clothes box.
    const [boxSecondHandClothesQuantities, setBoxSecondHandClothesQuantities] = useState<number[]>() // The quantities for each cloth type in the second-hand clothes box.

    const drizzleState = drizzle.store.getState() // Get an updated copy of drizzle state.
    const cachedMethod = drizzleState.contracts.ReclothesShop.idToBox[dataKey] // Declare this call to be cached and synchronized.
    const boxSecondHandClothesComponents: any = [] // The list of SecondHandClothes components to display.

    // Set the dataKey to retrieve data from the cached method on the Drizzle store.
    useEffect(() => {
        setDataKey(drizzle.contracts.ReclothesShop.methods.idToBox.cacheCall(boxId, { from: userAccountAddress }))
    }, [])

    // Retrieve the cloth types and quantities for each box.
    useEffect(() => {
        (async () => {
            if (boxData && dataKey) {
                const clothesTypes = []
                const clothesQuantities = []

                for (let i = 0; i < boxData.numberOfClothTypes; i++) {
                    const secondHandCloth = await drizzle.contracts.ReclothesShop.methods.boxToSecondHandClothes(boxId, i).call({ from: userAccountAddress })
                    clothesTypes.push(Number(secondHandCloth.clothType))
                    clothesQuantities.push(Number(secondHandCloth.quantity))
                }

                setBoxSecondHandClothesTypes(clothesTypes)
                setBoxSecondHandClothesQuantities(clothesQuantities)
            }
        })()
    }, [dataKey, boxData, drizzle.contracts.ReclothesShop.methods, boxId, userAccountAddress])

    // Store the updates for the observed cached method.
    useEffect(() => {
        setBoxData(dataKey ? drizzleState.contracts.ReclothesShop.idToBox[dataKey].value : {})
    }, [cachedMethod])
    
    // Match the box data, box second-hand clothes and filters.
    if (boxData && boxSecondHandClothesTypes && boxSecondHandClothesQuantities && isCustomer && 
        ((boxSecondHandClothesTypes.includes((clothTypeFilter))) || clothTypeFilter === 6) &&
        (Number(boxData.evaluationInToken) === 0 && evaluationStatusFilter === 0 || Number(boxData.evaluationInToken) >= 1 && evaluationStatusFilter === 1 || evaluationStatusFilter === 2)) {
 
        let humanReadableDate
        if (boxData.timestamp) { 
            humanReadableDate = new Date(boxData.timestamp * 1000) // Convert the UNIX timestamp to a human-readable data format.
        }

        return (
            <Grid item key={boxId} xs={12}>
                <Card className={classes.card}>
                    <Grid
                        item
                        container
                        direction="column"
                        justify="center"
                        alignItems="center"
                    >
                        <Grid item style={{ marginTop: "8px" }}>
                            <Typography component="h6" variant="body1" align="center" gutterBottom>
                                <i>ID:</i> <b>{boxData.id}</b>
                            </Typography>
                        </Grid>
                        <Grid item>
                            <CardMedia
                                image={boxData.evaluationInToken == 0 ? boxNotEvaluatedIcon : boxEvaluatedIcon }
                                className={classes.cardMedia}
                            />
                        </Grid>
                        <CardContent className={classes.cardContent}>
                            <Grid item>
                                <Typography variant="body1" align="center" gutterBottom>
                                    {boxData.description}
                                </Typography>
                            </Grid>

                            {(humanReadableDate) &&
                                    <Grid item>
                                        <Typography variant="body1" align="center" gutterBottom>
                                            <i>{humanReadableDate.toLocaleString()}</i>
                                        </Typography>
                                    </Grid>
                            }
                            {(boxData.evaluationInToken > 0) &&
                                    <Grid item>
                                        <Typography variant="body1" align="center" gutterBottom>
                                            <b>{boxData.evaluationInToken}</b> <i>RSC Token</i>
                                        </Typography>
                                    </Grid>
                            }
                        </CardContent>
                    </Grid>
                    <Grid
                        item
                        container
                        direction="row"
                        justify="space-around"
                        alignItems="center"
                    >
                        {(boxSecondHandClothesTypes.length > 0 && boxSecondHandClothesQuantities.length > 0) &&
                            boxSecondHandClothesTypes.forEach((clothType: number, idx: number) => {
                                boxSecondHandClothesComponents.push(
                                    <Grid item key={clothType + boxId}>
                                        <IconClothQuantity
                                            url={clothTypesIcons[clothType]}
                                            key={clothType + boxId}
                                        >
                                            {boxSecondHandClothesQuantities[idx]}
                                        </IconClothQuantity>
                                    </Grid>
                                )
                            })
                        }
                        {(boxSecondHandClothesComponents.length > 0) && boxSecondHandClothesComponents}
                    </Grid>
                </Card>
            </Grid>
        )
    } else
        return null
}
const useStyles = makeStyles((theme: Theme) => createStyles({
    cardMedia: {
        height: "128px",
        width: "128px"
    },
    card: {
        height: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        flexWrap: "nowrap"
    },
    cardContent: {
        flexGrow: 1
    }
}))
export default Box
