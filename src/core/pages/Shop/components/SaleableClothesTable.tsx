import React, { useEffect, useState } from "react"
import { Container, Grid, Typography } from "@material-ui/core"
import SaleableCloth from "./SaleableCloth"
import DelayingCircularLoader from "../../../../shared/components/DelayingCircularLoader"
import WaitClothesIcon from "../../../../assets/icons/wait_clothes_icon.png"

// Defining the TS type for every property passed as props.
type Props = {
    drizzle: any, // Drizzle initialized instance.
    userAccountAddress: string,
    clothTypeFilter: number,
    clothSizeFilter: number,
    isCustomer: boolean
}

// Handles a filterable list of projects.
function SaleableClothesTable ({ drizzle, userAccountAddress, clothTypeFilter, clothSizeFilter, isCustomer }: Props) {
    const [dataKey, setDataKey] = useState("") // Drizzle cacheCall method data key.
    const [saleableClothesIds, setSaleableClothesIds] = useState([]) //

    const drizzleState = drizzle.store.getState() // Get an updated copy of drizzle state.
    const cachedMethod = drizzleState.contracts.ReclothesShop.getAllSaleableClothesIds[dataKey]
    const saleableClothesComponents: any = [] // It will contain the list of Project components to display.

    // Get data key from the cacheCall() to observe the project changes.
    useEffect(() => {
        setDataKey(drizzle.contracts.ReclothesShop.methods.getAllSaleableClothesIds.cacheCall())
        // eslint-disable-next-line
    }, [])

    // When the cacheCall() observed method updates, lets write the new data here.
    useEffect(() => {
        setSaleableClothesIds(dataKey ? drizzleState.contracts.ReclothesShop.getAllSaleableClothesIds[dataKey].value : [])
        // eslint-disable-next-line
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
                                        key={id}
                                        saleableClothId={id}
                                        drizzle={drizzle}
                                        userAccountAddress={userAccountAddress}
                                        clothTypeFilter={clothTypeFilter}
                                        clothSizeFilter={clothSizeFilter}
                                        isCustomer={isCustomer}
                                    />
                                )
                            })
                        }
                        {(saleableClothesComponents.length > 0) && saleableClothesComponents}
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
