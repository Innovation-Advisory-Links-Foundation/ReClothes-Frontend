import { Button } from "@material-ui/core"
import MetaMaskOnboarding from "@metamask/onboarding"
import React from "react"

const ONBOARD_TEXT = "Install MetaMask"
const CONNECT_TEXT = "Connect to Reclothes dApp"
const CONNECTED_TEXT = "Go to Shop"

function OnboardingButton () {
    const [buttonText, setButtonText] = React.useState(ONBOARD_TEXT)
    const [isDisabled, setDisabled] = React.useState(false)
    const [accounts, setAccounts] = React.useState([])
    const onboarding = React.useRef<MetaMaskOnboarding>()

    React.useEffect(() => {
        if (!onboarding.current) {
            onboarding.current = new MetaMaskOnboarding()
        }
    }, [])

    React.useEffect(() => {
        if (MetaMaskOnboarding.isMetaMaskInstalled()) {
            if (accounts.length > 0) {
                setButtonText(CONNECTED_TEXT)
                if (onboarding.current) { onboarding.current.stopOnboarding() }
            } else {
                setButtonText(CONNECT_TEXT)
                setDisabled(false)
            }
        }
    }, [accounts])

    React.useEffect(() => {
        function handleNewAccounts (newAccounts: any) {
            setAccounts(newAccounts)
        }
        if (MetaMaskOnboarding.isMetaMaskInstalled()) {
            // @ts-ignore
            window.ethereum
                .request({ method: "eth_requestAccounts" })
                .then(handleNewAccounts)

            // @ts-ignore
            window.ethereum.on("accountsChanged", handleNewAccounts)

            return () => {
                // @ts-ignore
                window.ethereum.off("accountsChanged", handleNewAccounts)
            }
        }
    }, [])

    const onClick = () => {
        if (MetaMaskOnboarding.isMetaMaskInstalled()) {
            // @ts-ignore
            window.ethereum
                .request({ method: "eth_requestAccounts" })
                .then((newAccounts: any) => setAccounts(newAccounts))
        } else {
            if (onboarding.current) { onboarding.current.startOnboarding() }
        }
    }
    return (
        <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={isDisabled}
            onClick={onClick}
        >
            {buttonText}
        </Button>
    )
}

export default OnboardingButton
