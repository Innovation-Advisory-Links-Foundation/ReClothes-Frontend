import React from "react"
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles"
import Fade from "@material-ui/core/Fade"
import CircularProgress from "@material-ui/core/CircularProgress"
import Typography from "@material-ui/core/Typography"
import { Grid } from "@material-ui/core"

type Props = {
  expirationTime: number, // Delay expressed in milliseconds.
  message: string, // A custom message to display under the circular loader animation.
  children: {} // A JS object containing React components to display.
}

function DelayingCircularLoader ({ expirationTime = 1000, message = "", children }: Props) {
    const classes = useStyles()
    const timerRef = React.useRef<number>() // Persistent time reference for the timeout definition.
    const [status, setStatus] = React.useState("idle") // The circular loader status (idle, progress, finished).

    React.useEffect(() => {
        clearTimeout(timerRef.current)
        setStatus("progress")

        timerRef.current = window.setTimeout(() => {
            setStatus("finished")
        }, expirationTime)
    }, [expirationTime])

    return (
        <div className={classes.root}>
            {status === "finished" ? (
                <div className={classes.children}>
                    {children}
                </div>
            ) : (
                <div className={classes.placeholder}>
                    <Fade
                        in={status === "progress"}
                        style={{
                            transitionDelay: status === "progress" ? "800ms" : "0ms"
                        }}
                        unmountOnExit
                    >
                        <Grid
                            container
                            direction="column"
                            justify="center"
                            alignItems="center"
                            spacing={4}
                        >
                            <Grid item style={{ marginTop: "2vh" }}>
                                <CircularProgress
                                    thickness={5}
                                    size={50}
                                    disableShrink
                                />
                            </Grid>
                            <Grid item>
                                <Typography variant="body1">{message}</Typography>
                            </Grid>
                        </Grid>
                    </Fade>
                </div>
            )
            }
        </div>
    )
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%"
        },
        button: {
            margin: theme.spacing(2)
        },
        placeholder: {
            height: 40
        },
        children: {
            width: "100%"
        }
    })
)

export default DelayingCircularLoader
