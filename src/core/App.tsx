import React, { useEffect, useState } from "react"
import { Drizzle } from "@drizzle/store"
import { DrizzleContext } from "@drizzle/react-plugin"
import getDrizzleOptions from "../constants/options"
import DelayingCircularLoader from "../shared/components/DelayingCircularLoader"
import Main from "./Main"
import MetamaskOnBoarding from "./pages/MetamaskOnBoarding/MetamaskOnBoarding"

/** 
 * Checks the connection to the blockchain by redirecting the user to a secure onboarding 
 * with MetaMask when it is not installed and initializing and maintaining the Drizzle instance. 
*/
function App () {
    const [drizzleInstance, setDrizzleInstance] = useState({}) // Instance of a Drizzle object (Redux state and Web3Provider).

    // Bootstrap drizzle w/ options at the component startup.
    useEffect(() => {
        (async () => {
            setDrizzleInstance(new Drizzle(await getDrizzleOptions()))
        })()
    }, [])

    return (
        <div>
            <DelayingCircularLoader
                expirationTime={4000}
                message={"Loading..."}
            >
            {Object.keys(drizzleInstance).length &&
                <DrizzleContext.Provider drizzle={drizzleInstance}>
                    <DrizzleContext.Consumer>
                        {(drizzleContext: any) => {
                            const { drizzle } = drizzleContext
                            const drizzleState = drizzle.store.getState()
                            
                            if (!drizzle.web3.givenProvider)
                                return (<MetamaskOnBoarding />)
                            else {
                                drizzle.web3.givenProvider.autoRefreshOnNetworkChange = false
                                drizzle.web3.givenProvider.on("chainChanged", () => window.location.reload())
                            }

                            if (drizzleState.drizzleStatus.initialized)
                                return <Main drizzle={drizzle} />
                        }}
                    </DrizzleContext.Consumer>
                </DrizzleContext.Provider>
            }
            </DelayingCircularLoader>
        </div>
    )
}

export default App
