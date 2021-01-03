import React, { useState } from "react"
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles"
import FilterableBoxesList from "./components/FilterableBoxesList"
import Footer from "../../components/Footer"
import TransitionsModal from "../../../shared/components/TransitionsModal"
import SendBox from "./components/SendBox"
import { Fab } from "@material-ui/core"
import AddIcon from "@material-ui/icons/Add"
import DelayingCircularLoader from "../../../shared/components/DelayingCircularLoader"

function Boxes (props: any) {
    const classes = useStyles()
    const [openFabModal, setOpenFabModal] = useState(false) // Handles the modal open/close logic when clicking the fab button.

    // Callback for fab button click.
    const handleFabModalOpen = () => {
        setOpenFabModal(true)
    }

    // Callback to pass down as props for handling modal close.
    const handleFabModalClose = () => {
        setOpenFabModal(false)
    }
    return (
        <div style={{ width: "100vw" }}>
            {(!props.isAppEnabled || !props.isNetworkCorrect) &&
                <div style={{ marginTop: "70px" }}>
                    <DelayingCircularLoader
                        expirationTime={1500}
                        message={"Please enable MetaMask!"}
                    >

                    </DelayingCircularLoader>
                </div>
            }
            {(props.isAppEnabled) &&
                <div style={{ marginTop: "70px" }}>
                    <DelayingCircularLoader
                        expirationTime={2000}
                        message={"Reading Blockchain state..."}
                    >
                        <FilterableBoxesList
                            drizzle={props.drizzle}
                            userAccountAddress={props.userAccountAddress}
                            isCustomer={props.isCustomer}
                        />
                    </DelayingCircularLoader>

                    <TransitionsModal
                        isOpen={openFabModal}
                        handleClose={handleFabModalClose}
                    >
                        <SendBox
                            drizzle={props.drizzle}
                            handleClose={handleFabModalClose}
                            userAccountAddress={props.userAccountAddress}
                        />
                    </TransitionsModal>

                    {(props.isCustomer) && 
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
