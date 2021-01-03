import React, { useEffect, useState } from "react"
import { Container, Grid, Typography } from "@material-ui/core"
import DelayingCircularLoader from "../../../../shared/components/DelayingCircularLoader"
import PurchasedCloth from "./PurchasedCloth"
import WaitCollectionIcon from "../../../../assets/icons/wait_collection_icon.png"

// Defining the TS type for every property passed as props.
type Props = {
    drizzle: any, // Drizzle initialized instance.
    userAccountAddress: string,
    clothTypeFilter: number,
    clothSizeFilter: number,
    isCustomer: boolean
}

// Handles a filterable list of projects.
function CollectionClothesTable ({ drizzle, userAccountAddress, clothTypeFilter, clothSizeFilter, isCustomer }: Props) {
    const [dataKey, setDataKey] = useState("") // Drizzle cacheCall method data key.
    const [collectionClothesIds, setCollectionClothesIds] = useState([]) //

    const drizzleState = drizzle.store.getState() // Get an updated copy of drizzle state.
    const cachedMethod = drizzleState.contracts.ReclothesShop.getAllPurchasedClothesIds[dataKey]
    const collectionClothesComponents: any = [] // It will contain the list of Project components to display.

    // Get data key from the cacheCall() to observe the project changes.
    useEffect(() => {
        setDataKey(drizzle.contracts.ReclothesShop.methods.getAllPurchasedClothesIds.cacheCall(userAccountAddress, { from: userAccountAddress }))
        // eslint-disable-next-line
    }, [])

    // When the cacheCall() observed method updates, lets write the new data here.
    useEffect(() => {
        setCollectionClothesIds(dataKey ? drizzleState.contracts.ReclothesShop.getAllPurchasedClothesIds[dataKey].value : [])
        // eslint-disable-next-line
    }, [cachedMethod])

    return (
        <Container maxWidth="xl" style={{ width: "100vw" }}>
            <DelayingCircularLoader
                expirationTime={3000}
                message={"Loading your collection..."}
            >
                {(collectionClothesIds) &&
                    <Grid container justify="center" spacing={2} style={{ marginTop: "10px" }}>
                        {(collectionClothesIds.length > 0) &&
                        collectionClothesIds.forEach((id: number) => {
                            collectionClothesComponents.push(
                                <PurchasedCloth
                                    key={id}
                                    purchasedClothId={id}
                                    drizzle={drizzle}
                                    userAccountAddress={userAccountAddress}
                                    clothTypeFilter={clothTypeFilter}
                                    clothSizeFilter={clothSizeFilter}
                                    isCustomer={isCustomer}
                                />
                            )
                        })
                        }
                        {(collectionClothesComponents.length > 0) && collectionClothesComponents}
                        {(collectionClothesComponents.length === 0) &&
                            <Grid item style={{ marginTop: "20vh" }}>
                                <Typography color="inherit" align="center" noWrap>
                                    <img src={WaitCollectionIcon} alt="No Collection" style={{ height: "128px", width: "128px" }}/>
                                </Typography>
                                <Typography variant="h6" component="h2" color="inherit" align="center">
                                    You have not purchased any clothes yet!
                                </Typography>
                            </Grid>
                        }
                    </Grid>
                }
            </DelayingCircularLoader>
        </Container>
    )
}

export default CollectionClothesTable
