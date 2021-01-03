import { CssBaseline, ThemeProvider } from "@material-ui/core"
import React from "react"
import ReactDOM from "react-dom"
import theme from "./constants/theme"
import App from "./core/App"

ReactDOM.render(
    <React.Fragment>
        <CssBaseline>
            <ThemeProvider theme={theme}>
                <App />
            </ThemeProvider>
        </CssBaseline>
    </React.Fragment>,
    document.getElementById("root")
)
