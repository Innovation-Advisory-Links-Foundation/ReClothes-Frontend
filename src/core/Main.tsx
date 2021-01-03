import React, { useEffect, useState } from "react"
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom"
import { isAccountChanged } from "../shared/utils/metamask"
import environment from "../constants/environment"
import Navbar from "./components/Navbar"
import Boxes from "./pages/Boxes/Boxes"
import Shop from "./pages/Shop/Shop"
import Collection from "./pages/Collection/Collection"
import DelayingCircularLoader from "../shared/components/DelayingCircularLoader"

type Props = {
    drizzle: any, // Initialized Drizzle instance.
}

/**
 * Manages the information relating to the user's connection with MetaMask (account association, network, etc.). 
 * Also, it defines the routes through the react-router-dom library, allowing for immediate and straightforward passage 
 * of complete updated information between the components,  navigable through a navbar component.
 */
function Main ({ drizzle }: Props) {
    const drizzleState = drizzle.store.getState() // Get an updated copy of Drizzle's state.
    const provider = drizzle.web3.givenProvider // Get the MetaMask provider.
    const currentNetworkId = drizzleState.web3.networkId // Current chain id which MetaMask is connected.

    const [isAppEnabled, setIsAppEnabled] = useState<boolean>() // True when the user has the MetaMask account associated with this React app.
    const [isNetworkCorrect, setIsNetworkCorrect] = useState<boolean>() // True when the user is connected to the right network (Local dev or Besu networks).
    const [userAccountAddress, setUserAccountAddress] = useState<string>(drizzleState.accounts[0]) // Current Ethereum account address of the user.
    const [isCustomer, setIsCustomer] = useState<boolean>() // True when the user is registered as Customer.

    // Send a request to associate the user account with this React app using MetaMask.
    const handleMetaMaskButtonConnection = () => {
        provider.request({ method: "eth_requestAccounts" }).then((accounts: any) => {
            setIsAppEnabled(!!isAccountChanged(accounts, userAccountAddress))
        })
    }

    // Check if the current account is registered as Customer.
    useEffect(() => {
        (async () => {
            if (userAccountAddress) {
                setIsCustomer(await drizzle.contracts.ReclothesShop.methods.customers(userAccountAddress).call())
            }
        })()
    })

    // Re-renders on MetaMask account changes (nb. this will disable the app if there are no MetaMask account connected).
    useEffect(() => {
        provider.on("accountsChanged", async (accounts: any) => {
            setUserAccountAddress(isAccountChanged(accounts, userAccountAddress) ? accounts[0] : "")
            setIsAppEnabled(!!isAccountChanged(accounts, userAccountAddress))
        })
    })
        
    // Request to associate the current MetaMask account.
    useEffect(() => {
        provider.request({ method: "eth_requestAccounts" }).then((accounts: any) => {
            setIsAppEnabled(!!isAccountChanged(accounts, userAccountAddress))
            setUserAccountAddress(isAccountChanged(accounts, userAccountAddress) ? accounts[0] : "")
        })
    }, [])

    // Execute when the network changes to check if it is the right network.
    useEffect(() => {
        setIsNetworkCorrect((environment.PROD_NET_MODE && currentNetworkId === environment.PROD_NETWORK_ID) || (!environment.PROD_NET_MODE && currentNetworkId.toString().length === 13))
    }, [currentNetworkId])

    return (
        <DelayingCircularLoader
            expirationTime={3000}
            message={"Reading Blockchain state..."}
        >
            <Router>
                <Switch>
                    <Route path="/shop" exact render={(props) =>
                        <Shop
                            drizzle={drizzle}
                            isAppEnabled={isAppEnabled}
                            isNetworkCorrect={isNetworkCorrect}
                            userAccountAddress={userAccountAddress}
                            isCustomer={isCustomer}
                            {...props}
                        />}
                    />
                    <Route path="/boxes" exact render={(props) =>
                        <Boxes
                            drizzle={drizzle}
                            provider={provider}
                            isAppEnabled={isAppEnabled}
                            isNetworkCorrect={isNetworkCorrect}
                            userAccountAddress={userAccountAddress}
                            isCustomer={isCustomer}
                            {...props}
                        />}
                    />
                    <Route path="/collection" exact render={(props) =>
                        <Collection
                            drizzle={drizzle}
                            isAppEnabled={isAppEnabled}
                            isNetworkCorrect={isNetworkCorrect}
                            userAccountAddress={userAccountAddress}
                            isCustomer={isCustomer}
                            {...props}
                        />}
                    />
                </Switch>
                <Navbar
                    handleMetaMaskButtonConnection={handleMetaMaskButtonConnection}
                    isAppEnabled={isAppEnabled}
                    isNetworkCorrect={isNetworkCorrect}
                />
                <Redirect push to="/shop" />
            </Router>
        </DelayingCircularLoader>
    )
}

export default Main
