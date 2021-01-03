import React, { useEffect, useState } from "react"
import { Container, Grid, Typography } from "@material-ui/core"
import Box from "./Box"
import DelayingCircularLoader from "../../../../shared/components/DelayingCircularLoader"
import WaitBoxesIcon from "../../../../assets/icons/wait_boxes_icon.png"

type Props = {
    drizzle: any, // Drizzle initialized instance.
    userAccountAddress: string,
    clothTypeFilter: number,
    evaluationStatusFilter: number,
    isCustomer: boolean
}

// Handles a filterable list of projects.
function BoxesTable ({ drizzle, userAccountAddress, clothTypeFilter, evaluationStatusFilter, isCustomer }: Props) {
    const [dataKey, setDataKey] = useState("") // Drizzle cacheCall method data key.
    const [customerBoxesIds, setCustomerBoxesIds] = useState([]) //

    const drizzleState = drizzle.store.getState() // Get an updated copy of drizzle state.
    const cachedMethod = drizzleState.contracts.ReclothesShop.getAllCustomerBoxesIds[dataKey]
    const customerBoxesComponents: any = [] // It will contain the list of Project components to display.

    // Get data key from the cacheCall() to observe the project changes.
    useEffect(() => {
        setDataKey(drizzle.contracts.ReclothesShop.methods.getAllCustomerBoxesIds.cacheCall(userAccountAddress, { from: userAccountAddress }))
        // eslint-disable-next-line
    }, [])

    // When the cacheCall() observed method updates, lets write the new data here.
    useEffect(() => {
        setCustomerBoxesIds(dataKey ? drizzleState.contracts.ReclothesShop.getAllCustomerBoxesIds[dataKey].value : [])
        // eslint-disable-next-line
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
                                    key={id}
                                    boxId={id}
                                    drizzle={drizzle}
                                    userAccountAddress={userAccountAddress}
                                    clothTypeFilter={clothTypeFilter}
                                    evaluationStatusFilter={evaluationStatusFilter}
                                    isCustomer={isCustomer}
                                />
                            )
                        })
                        }
                        {(customerBoxesComponents.length > 0) && customerBoxesComponents}
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
