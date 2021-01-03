import React, { useEffect, useState } from "react"
import { Container, Grid, Typography } from "@material-ui/core"
import Box from "./Box"
import DelayingCircularLoader from "../../../../shared/components/DelayingCircularLoader"
import WaitBoxesIcon from "../../../../assets/icons/wait_boxes_icon.png"

type Props = {
    drizzle: any,
    userAccountAddress: string,
    isCustomer: boolean,
    clothTypeFilter: number,
    evaluationStatusFilter: number
}

/**
 * Show the boxes sent from the customer. Automatically update when the customer sends a new box or the dealer evaluates a box.
 */
function BoxesTable ({ drizzle, userAccountAddress, isCustomer, clothTypeFilter, evaluationStatusFilter }: Props) {
    const [dataKey, setDataKey] = useState<string>() // Data key from Drizzle cacheCall method.
    const [customerBoxesIds, setCustomerBoxesIds] = useState<number[]>() // Identifiers of the boxes sent by the customer.

    const drizzleState = drizzle.store.getState() // Updated copy of the Drizzle state.
    const cachedMethod = drizzleState.contracts.ReclothesShop.getAllCustomerBoxesIds[dataKey] // Declare this call to be cached and synchronized.
    const customerBoxesComponents: any = [] // List of Box components to display.

    // Set the dataKey to retrieve data from the cached method on the Drizzle store.
    useEffect(() => {
        setDataKey(drizzle.contracts.ReclothesShop.methods.getAllCustomerBoxesIds.cacheCall(userAccountAddress, { from: userAccountAddress }))
    }, [])

    // Store the updates for the observed cached method.
    useEffect(() => {
        setCustomerBoxesIds(dataKey ? drizzleState.contracts.ReclothesShop.getAllCustomerBoxesIds[dataKey].value : [])
    }, [cachedMethod])

    return (
        <Container maxWidth="xl" style={{ width: "80vw", marginTop: "15px" }}>
            <DelayingCircularLoader
                expirationTime={3000}
                message={"Loading your boxes..."}
            >
                {(customerBoxesIds) && 
                    <Grid container justify="center" spacing={2}>
                        {(customerBoxesIds.length > 0) &&
                        customerBoxesIds.forEach((id: number) => {
                            customerBoxesComponents.push(
                                <Box
                                    drizzle={drizzle}
                                    userAccountAddress={userAccountAddress}
                                    isCustomer={isCustomer}
                                    clothTypeFilter={clothTypeFilter}
                                    evaluationStatusFilter={evaluationStatusFilter}
                                    boxId={id}
                                    key={id}
                                />
                            )
                        })
                        }
                        {(customerBoxesComponents.length > 0) && customerBoxesComponents}
                        {/* When no boxes are available. */}
                        {(customerBoxesComponents.length === 0) &&
                            <Grid item style={{ marginTop: "20vh" }}>
                                <Typography color="inherit" align="center" noWrap>
                                    <img src={WaitBoxesIcon} alt="No Boxes" style={{ height: "128px", width: "128px" }}/>
                                </Typography>
                                <Typography variant="h6" component="h2" color="inherit" align="center">
                                    You have not sent any boxes yet!
                                </Typography>
                            </Grid>
                        }
                    </Grid>
                }
            </DelayingCircularLoader>
        </Container>
    )
}

export default BoxesTable
