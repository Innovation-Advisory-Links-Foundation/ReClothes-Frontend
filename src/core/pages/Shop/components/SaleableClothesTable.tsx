import React, { useEffect, useState } from "react"
import { Container, Grid, Typography } from "@material-ui/core"
import SaleableCloth from "./SaleableCloth"
import DelayingCircularLoader from "../../../../shared/components/DelayingCircularLoader"
import WaitClothesIcon from "../../../../assets/icons/wait_clothes_icon.png"

type Props = {
    drizzle: any,
    userAccountAddress: string,
    isCustomer: boolean,
    clothTypeFilter: number,
    clothSizeFilter: number
}

/**
 * Show the clothing currently on sale. Automatically update when new cloth is available in the shop.
 */
function SaleableClothesTable ({ drizzle, userAccountAddress, clothTypeFilter, clothSizeFilter, isCustomer }: Props) {
    const [dataKey, setDataKey] = useState<string>() // Data key from Drizzle cacheCall method.
    const [saleableClothesIds, setSaleableClothesIds] = useState<number[]>() // Identifiers of the available clothes for sale.

    const drizzleState = drizzle.store.getState() // Updated copy of the Drizzle state.
    const cachedMethod = drizzleState.contracts.ReclothesShop.getAllSaleableClothesIds[dataKey] // Declare this call to be cached and synchronized.
    const saleableClothesComponents: any = [] // List of SaleableCloth components to display.

    // Set the dataKey to retrieve data from the cached method on the Drizzle store.
    useEffect(() => {
        setDataKey(drizzle.contracts.ReclothesShop.methods.getAllSaleableClothesIds.cacheCall())
    }, [])

    // Store the updates for the observed cached method.
    useEffect(() => {
        setSaleableClothesIds(dataKey ? drizzleState.contracts.ReclothesShop.getAllSaleableClothesIds[dataKey].value : [])
    }, [cachedMethod])

    return (
        <Container maxWidth="xl" style={{ width: "100vw" }}>
            <DelayingCircularLoader
                expirationTime={3000}
                message={"Loading available clothes from the shop..."}
            >
                {(saleableClothesIds) && 
                    <Grid container justify="center" spacing={3} style={{ marginTop: "10px" }}>
                        {(saleableClothesIds.length > 0) &&
                            saleableClothesIds.forEach((id: number) => {
                                saleableClothesComponents.push(
                                    <SaleableCloth
                                        drizzle={drizzle}
                                        userAccountAddress={userAccountAddress}
                                        isCustomer={isCustomer}
                                        clothTypeFilter={clothTypeFilter}
                                        clothSizeFilter={clothSizeFilter}
                                        saleableClothId={id}
                                        key={id}
                                    />
                                )
                            })
                        }
                        {(saleableClothesComponents.length > 0) && saleableClothesComponents}
                        {/* When no clothes are available. */}
                        {(saleableClothesComponents.length === 0) &&
                            <Grid item style={{ marginTop: "10vh" }}>
                                <Typography color="inherit" align="center" noWrap>
                                    <img src={WaitClothesIcon} alt="No Clothes" style={{ height: "128px", width: "128px" }}/>
                                </Typography>
                                <Typography variant="h6" component="h2" color="inherit" align="center">
                                    There are no available clothes in the shop!
                                </Typography>
                            </Grid>
                        }
                    </Grid>
                }
            </DelayingCircularLoader>
        </Container>
    )
}

export default SaleableClothesTable
