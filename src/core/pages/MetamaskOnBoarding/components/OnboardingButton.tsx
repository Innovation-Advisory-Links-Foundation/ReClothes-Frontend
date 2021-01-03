import { Button } from "@material-ui/core"
import MetaMaskOnboarding from "@metamask/onboarding"
import React, { useEffect, useState } from "react"

const ONBOARD_TEXT = "Install MetaMask"
const CONNECT_TEXT = "Connect to Reclothes dApp"
const CONNECTED_TEXT = "Go to Shop"

/**
 * Dynamic button for user onboarding with MetaMask.
 */
function OnboardingButton () {
    const [buttonText, setButtonText] = useState<string>(ONBOARD_TEXT)
    const [isDisabled, setDisabled] = useState<boolean>(false)
    const [accounts, setAccounts] = useState<string[]>([])
    const onboarding = React.useRef<MetaMaskOnboarding>()

    // Start a new onboarding if there is not already a current one.
    useEffect(() => {
        if (!onboarding.current) {
            onboarding.current = new MetaMaskOnboarding()
        }
    }, [])


    useEffect(() => {
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

    // Check if MetaMask is installed correctly.
    useEffect(() => {
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

    // Association of the account with the dApp.
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
