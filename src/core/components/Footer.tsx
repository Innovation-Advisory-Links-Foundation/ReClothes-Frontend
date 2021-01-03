import { Link, Typography } from "@material-ui/core"
import React from "react"
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles"

function Footer () {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <Typography variant="body2" color="textSecondary" align="center">
                {"Copyright © "}
                <Link color="inherit" target="_blank" rel="noopener" href="http://overtheblock.io/">
                    OverTheBlock
                </Link>
                {" - "}
                <Link color="inherit" target="_blank" rel="noopener" href="https://linksfoundation.com/">
                    LINKS Foundation
                </Link>
                {" "}
                {new Date().getFullYear()}
                {"."}
            </Typography>
        </div>
    )
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        bottom: 0,
        left: 0,
        width: "100%",
        position: "fixed",
        padding: theme.spacing(1)
    }
}))

export default Footer
