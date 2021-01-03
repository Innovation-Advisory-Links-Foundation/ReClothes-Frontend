import React, { useState } from "react"
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles"
import FilterableBoxesList from "./components/FilterableBoxesList"
import Footer from "../../components/Footer"
import TransitionsModal from "../../../shared/components/TransitionsModal"
import SendBox from "./components/SendBox"
import { Fab } from "@material-ui/core"
import AddIcon from "@material-ui/icons/Add"
import DelayingCircularLoader from "../../../shared/components/DelayingCircularLoader"
import CircularLoader from "../../../shared/components/CircularLoader"

type Props = {
    drizzle: any,
    isAppEnabled: boolean,
    isNetworkCorrect: boolean,
    userAccountAddress: string,
    isCustomer: boolean 
}

/**
 * Show the boxes page. A user can send a new box of second-hand clothes to the ReClothes Dealer, fill in a form, 
 * and then see the box sent and the evaluation amount in RSC tokens (if evaluated).
 */
function Boxes ({ drizzle, isAppEnabled, isNetworkCorrect, userAccountAddress, isCustomer }: Props) {
    const classes = useStyles()

    const [openFabModal, setOpenFabModal] = useState<boolean>(false) // Fab button open/close flag.

    // Handle fab modal open.
    const handleFabModalOpen = () => {
        setOpenFabModal(true)
    }

    // Callback to pass down as props for handling modal close.
    const handleFabModalClose = () => {
        setOpenFabModal(false)
    }

    return (
        <div style={{ width: "100vw" }}>
            {/* Shows a loader when the app is not connected to the account or the network is wrong. */}
            {(!isAppEnabled || !isNetworkCorrect) &&
                <div style={{ marginTop: "70px" }}>
                    <CircularLoader />
                </div>
            }
            {(isAppEnabled && isNetworkCorrect) &&
                <div style={{ marginTop: "70px" }}>
                    <DelayingCircularLoader
                        expirationTime={2000}
                        message={"Reading Blockchain state..."}
                    >
                        <FilterableBoxesList
                            drizzle={drizzle}
                            userAccountAddress={userAccountAddress}
                            isCustomer={isCustomer}
                        />
                    </DelayingCircularLoader>

                    <TransitionsModal
                        isOpen={openFabModal}
                        handleClose={handleFabModalClose}
                    >
                        <SendBox
                            drizzle={drizzle}
                            userAccountAddress={userAccountAddress}
                            handleClose={handleFabModalClose}
                        />
                    </TransitionsModal>

                    {(isCustomer) && 
                        <Fab color="primary" aria-label="add" className={classes.fab} onClick={handleFabModalOpen}>
                            <AddIcon />
                        </Fab>
                    }
                </div>
            }
            <Footer />
        </div>
    )
}
const useStyles = makeStyles((theme: Theme) => createStyles({
    fab: {
        position: "fixed",
        bottom: theme.spacing(13),
        right: theme.spacing(4)
    }
}))

export default Boxes
