import React from "react"
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles"
import Modal from "@material-ui/core/Modal"
import Backdrop from "@material-ui/core/Backdrop"
import Fade from "@material-ui/core/Fade"

type Props = {
    isOpen: boolean, // The open/close modal external handler.
    handleClose?: () => void, // Callback function that will set isOpen to false on modal close.
    children: {}
}

/**
 * A reusable custom Transitional Modal component.
 * The open/close behaviour can be handle outside the component, so it can be used for multiple purposes (e.g., always opened, open/close external buttons, etc.).
 */
function TransitionsModal ({ isOpen, handleClose, children }: Props) {
    const classes = useStyles()

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={isOpen}
                onClose={handleClose}
                disableAutoFocus={true}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500
                }}
            >
                <Fade in={isOpen}>
                    <div className={classes.paper}>
                        {children}
                    </div>
                </Fade>
            </Modal>
        </div>
    )
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        modal: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        },
        paper: {
            background: theme.palette.background.default,
            padding: theme.spacing(2, 3, 2)
        }
    })
)

export default TransitionsModal
