import React, { useEffect, useState } from "react"
import { Container, Grid, Typography } from "@material-ui/core"
import DelayingCircularLoader from "../../../../shared/components/DelayingCircularLoader"
import PurchasedCloth from "./PurchasedCloth"
import WaitCollectionIcon from "../../../../assets/icons/wait_collection_icon.png"

type Props = {
    drizzle: any,
    userAccountAddress: string,
    isCustomer: boolean,
    clothTypeFilter: number,
    clothSizeFilter: number
}

/**
 * Show the purchased clothes. Automatically update when a cloth is purchased from the shop by the customer.
 */
function CollectionClothesTable ({ drizzle, userAccountAddress, clothTypeFilter, clothSizeFilter, isCustomer }: Props) {
    const [dataKey, setDataKey] = useState<string>() // Data key from Drizzle cacheCall method.
    const [collectionClothesIds, setCollectionClothesIds] = useState<number[]>() // Identifiers of the purchased clothes in the collection.

    const drizzleState = drizzle.store.getState() // Updated copy of the Drizzle state.
    const cachedMethod = drizzleState.contracts.ReclothesShop.getAllPurchasedClothesIds[dataKey] // Declare this call to be cached and synchronized.
    const collectionClothesComponents: any = [] // List of PurchasedCloth components to display.

    // Set the dataKey to retrieve data from the cached method on the Drizzle store.
    useEffect(() => {
        setDataKey(drizzle.contracts.ReclothesShop.methods.getAllPurchasedClothesIds.cacheCall(userAccountAddress, { from: userAccountAddress }))
    }, [])

    // Store the updates for the observed cached method.
    useEffect(() => {
        setCollectionClothesIds(dataKey ? drizzleState.contracts.ReclothesShop.getAllPurchasedClothesIds[dataKey].value : [])
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
                                    drizzle={drizzle}
                                    userAccountAddress={userAccountAddress}
                                    isCustomer={isCustomer}
                                    clothTypeFilter={clothTypeFilter}
                                    clothSizeFilter={clothSizeFilter}
                                    purchasedClothId={id}
                                    key={id}
                                />
                            )
                        })
                        }
                        {(collectionClothesComponents.length > 0) && collectionClothesComponents}
                        {/* When no clothes have been purchased by the customer. */}
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
