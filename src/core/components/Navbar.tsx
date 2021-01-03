import React, { useState, useEffect } from "react"
import { createStyles, makeStyles, Theme, withStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import MenuIcon from "@material-ui/icons/Menu"
import { Grid, Hidden, ListItemIcon, ListItemText, Menu, MenuItem, MenuProps } from "@material-ui/core"
import ExitToAppIcon from "@material-ui/icons/ExitToApp"
import { Link } from "react-router-dom"
import TransitionsModal from "../../shared/components/TransitionsModal"
import ConnectionHelp from "../pages/ConnectionHelp/ConnectionHelp"
import ShopIcon from "@material-ui/icons/Shop"
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank"
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket"
import ReClothesLogo from "../../assets/icons/ReClothesLogo.png"

type Props = {
    handleMetaMaskButtonConnection: () => void, // Callback for handling MetaMask account association with this React app.
    isAppEnabled: boolean,
    isNetworkCorrect: boolean
}

/**
 * Navigation bar component for the entire application.
 */
function Navbar ({ handleMetaMaskButtonConnection, isAppEnabled, isNetworkCorrect }: Props) {
    const classes = useStyles()

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    return (
        <div className={classes.root}>
            <nav>
                <AppBar position="fixed">
                    <Toolbar style={!isAppEnabled ? { justifyContent: "center" } : { justifyContent: "inherit" }}>
                        {/* Shows only if the app and the network are correct. */}
                        {(isAppEnabled && isNetworkCorrect) &&
                            <Hidden only={["sm", "md", "lg", "xl"]}>
                                <IconButton
                                    aria-controls="customized-menu"
                                    aria-haspopup="true"
                                    color="inherit"
                                    onClick={handleClick}
                                >
                                    <MenuIcon />
                                </IconButton>
                                <StyledMenu
                                    id="customized-menu"
                                    anchorEl={anchorEl}
                                    keepMounted
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                >
                                    <StyledMenuItem>
                                        <ListItemIcon>
                                            <ShopIcon fontSize="small" />
                                        </ListItemIcon>
                                        <Link to="/shop" className={classes.linkMenu}>
                                            <ListItemText primary="Shop" />
                                        </Link>
                                    </StyledMenuItem>
                                    <StyledMenuItem>
                                        <ListItemIcon>
                                            <CheckBoxOutlineBlankIcon fontSize="small" />
                                        </ListItemIcon>
                                        <Link to="/boxes" className={classes.linkMenu}>
                                            <ListItemText primary="Boxes" />
                                        </Link>
                                    </StyledMenuItem>
                                    <StyledMenuItem>
                                        <ListItemIcon>
                                            <ShoppingBasketIcon fontSize="small" />
                                        </ListItemIcon>
                                        <Link to="/collection" className={classes.linkMenu}>
                                            <ListItemText primary="Collection" />
                                        </Link>
                                    </StyledMenuItem>
                                    <StyledMenuItem>
                                        <ListItemIcon>
                                            <ExitToAppIcon fontSize="small" />
                                        </ListItemIcon>
                                        <Link to="/" className={classes.linkMenu}>
                                            <ListItemText primary="Logout" />
                                        </Link>
                                    </StyledMenuItem>
                                </StyledMenu>
                            </Hidden>
                        }
                        {(isAppEnabled) &&
                            <Typography variant="h6" color="inherit" noWrap className={classes.title}>
                                <img src={ReClothesLogo} alt="ReClothes Logo" style={{ width: "256px" }}/>
                            </Typography>
                        }
                        {/* Button for associating the MetaMask account with the React app. */}
                        {(!isAppEnabled) &&
                            <Grid item>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    size="small"
                                    onClick={handleMetaMaskButtonConnection}
                                    style={{ marginRight: "4px" }}
                                >
                                    Enable MetaMask
                                </Button>
                            </Grid>
                        }
                        {/* Display info for connect to the right network. */}
                        {(isAppEnabled && !isNetworkCorrect) &&
                            <TransitionsModal
                                isOpen={true}
                            >
                                <ConnectionHelp />
                            </TransitionsModal>
                        }
                        {(isAppEnabled) &&
                            <Grid item>
                                <Hidden only={["xs"]}>
                                    <Link to="/shop" className={classes.linkBar}>
                                        <Button color="inherit">Shop</Button>
                                    </Link>
                                </Hidden>
                                <Hidden only={["xs"]}>
                                    <Link to="/boxes" className={classes.linkBar}>
                                        <Button color="inherit">Boxes</Button>
                                    </Link>
                                </Hidden>
                                <Hidden only={["xs"]}>
                                    <Link to="/collection" className={classes.linkBar}>
                                        <Button color="inherit">Collection</Button>
                                    </Link>
                                </Hidden>
                                <Hidden only={["xs"]}>
                                    <Link to="/" className={classes.linkBar}>
                                        <Button color="inherit">Logout</Button>
                                    </Link>
                                </Hidden>
                            </Grid>
                        }
                    </Toolbar>
                </AppBar>
            </nav>
        </div>
    )
}

/** Custom styles */

const StyledMenu = withStyles({
    paper: {
        border: "1px solid #d3d4d5"
    }
})((props: MenuProps) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: "bottom",
            horizontal: "center"
        }}
        transformOrigin={{
            vertical: "top",
            horizontal: "center"
        }}
        {...props}
    />
))

const StyledMenuItem = withStyles((theme) => ({
    root: {
        "&:focus": {
            backgroundColor: theme.palette.background.paper,
            "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
                color: theme.palette.primary.main
            }
        }
    }
}))(MenuItem)

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        "@global": {
            ul: {
                margin: 0,
                padding: 0,
                listStyle: "none"
            }
        },
        root: {
            flexGrow: 1
        },
        title: {
            flexGrow: 1,
            [theme.breakpoints.down("xs")]: {
                width: "auto",
                textAlign: "center",
                marginRight: "12px",
                marginTop: "8px"
            }
        },
        linkBar: {
            color: theme.palette.background.paper,
            margin: theme.spacing(1, 1.5),
            textDecoration: "none"
        },
        linkMenu: {
            color: theme.palette.common.black,
            margin: theme.spacing(1, 1.5),
            textDecoration: "none"
        }
    })
)

export default Navbar
