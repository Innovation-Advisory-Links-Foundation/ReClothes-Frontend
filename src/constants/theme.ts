import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles"

/**
 * Material-UI custom theme for the entire application.
 * To learn more visit https://material-ui.com/customization/theming/.
 */
let theme = createMuiTheme({
    typography: {
        fontSize: 18,
    },
    spacing: 4, // Theme spacing (e.g., theme.spacing(2) // = 4 * 2 = 8px).
    palette: {
        primary: {
            main: "#2F4C3E",
            light: "#3F5426",
            dark: "#283618"
        },
        secondary: {
            main: "#606C38",
            light: "#8FA253",
            dark: "#606C38"
        },
        error: {
            main: "#BC6C25",
            light: "#DDA15E",
            dark: "#BC6C25"
        },
        background: {
            paper: "#F5F5F5",
            default: "#FFFFFF"
        }
    }
})

// Automatic responsive font size for Typography component.
theme = responsiveFontSizes(
    theme,
    {
        breakpoints: ["xs", "sm", "md", "lg", "xl"],
        factor: 3
    }
)

export default theme
