import React, { useEffect, useState } from "react"
import { Card, CardContent, CardMedia, Grid, Typography } from "@material-ui/core"
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles"
import boxNotEvaluatedIcon from "../../../../assets/icons/boxNotEvaluatedIcon.png"
import boxEvaluatedIcon from "../../../../assets/icons/boxEvaluatedIcon.png"
import IconClothQuantity from "./IconClothQuantity"
import { clothTypesIcons } from "../../../../constants/costants"

type Props = {
    drizzle: any, // Drizzle initialized instance.
    userAccountAddress: string,
    boxId: number,
    clothTypeFilter: number,
    evaluationStatusFilter: number,
    isCustomer: boolean
}

// Handles a filterable list of projects.
function Box ({ drizzle, userAccountAddress, boxId, clothTypeFilter, evaluationStatusFilter, isCustomer }: Props) {
    const classes = useStyles()

    const boxSecondHandClothesComponents: any = []
    const [boxData, setBoxData] = useState() // Box data.
    const [boxSecondHandClothesTypes, setBoxSecondHandClothesTypes] = useState()
    const [boxSecondHandClothesQuantities, setBoxSecondHandClothesQuantities] = useState()

    const [dataKey, setDataKey] = useState("") // Drizzle cacheCall method data key.

    const drizzleState = drizzle.store.getState() // Get an updated copy of drizzle state.
    const cachedMethod = drizzleState.contracts.ReclothesShop.idToBox[dataKey]

    // Get data key from the cacheCall() to observe the project changes.
    useEffect(() => {
        setDataKey(drizzle.contracts.ReclothesShop.methods.idToBox.cacheCall(boxId, { from: userAccountAddress }))
        // eslint-disable-next-line
    }, [])

    // Get clothes from box.
    useEffect(() => {
        (async () => {
            if (dataKey && boxData) {
                const clothesTypes = []
                const clothesQuantities = []
                for (let i = 0; i < boxData.numberOfClothTypes; i++) {
                    const secondHandCloth = await drizzle.contracts.ReclothesShop.methods.boxToSecondHandClothes(boxId, i).call({ from: userAccountAddress })
                    clothesTypes.push(Number(secondHandCloth.clothType))
                    clothesQuantities.push(Number(secondHandCloth.quantity))
                }
                // @ts-ignore
                setBoxSecondHandClothesTypes(clothesTypes)
                // @ts-ignore
                setBoxSecondHandClothesQuantities(clothesQuantities)
            }
        })()
    }, [dataKey, boxData, drizzle.contracts.ReclothesShop.methods, boxId, userAccountAddress])

    // When the cacheCall() observed method updates, lets write the new data here.
    useEffect(() => {
        setBoxData(dataKey ? drizzleState.contracts.ReclothesShop.idToBox[dataKey].value : {})
        // eslint-disable-next-line
    }, [cachedMethod])

    if (boxData && boxSecondHandClothesTypes && boxSecondHandClothesQuantities && isCustomer && 
        ((boxSecondHandClothesTypes.includes((clothTypeFilter))) || clothTypeFilter === 6) &&
        (Number(boxData.evaluationInToken) === 0 && evaluationStatusFilter === 0 ||
         Number(boxData.evaluationInToken) >= 1 && evaluationStatusFilter === 1 ||
         evaluationStatusFilter === 2
        )) {
        let humanReadableDate
        if (boxData.timestamp) { humanReadableDate = new Date(boxData.timestamp * 1000) }

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
                                image={boxData.evaluationInToken === "0" ? boxNotEvaluatedIcon : boxEvaluatedIcon }
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
                                <Grid item >
                                    <IconClothQuantity
                                        url={clothTypesIcons[clothType]}
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
    } else {
        return (
            <div></div>
        )
    }
}
const useStyles = makeStyles((theme: Theme) => createStyles({
    containerItem: {
        border: "1px solid black",
        textAlign: "center",
        padding: theme.spacing(1)
    },
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
    },
    label: {
        opacity: "0.5"
    }
}))
export default Box
