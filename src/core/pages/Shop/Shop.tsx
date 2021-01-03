import React from "react"
import FilterableClothesList from "./components/FilterableClothesList"
import Footer from "../../components/Footer"
import CustomerBar from "./components/CustomerBar"
import CircularLoader from "../../../shared/components/CircularLoader"

type Props = {
    drizzle: any,
    isAppEnabled: boolean,
    isNetworkCorrect: boolean,
    userAccountAddress: string,
    isCustomer: boolean 
}

/**
 * Show the shop page. A user can register as a Customer and subsequently purchase one or more clothes using RSC tokens.
 */
function Shop ({ drizzle, isAppEnabled, isNetworkCorrect, userAccountAddress, isCustomer }: Props) {
    return (
        <div style={{ width: "100vw" }}>
            {/* Shows a loader when the app is not connected to the account or the network is wrong. */}
            {(!isAppEnabled || !isNetworkCorrect) &&
                <div style={{ marginTop: "70px" }}>
                    <CircularLoader />
                </div>
            }
            {(isAppEnabled && isNetworkCorrect) &&
                <div style={{ marginTop: "70px" }}>
                    <CustomerBar
                        drizzle={drizzle}
                        userAccountAddress={userAccountAddress}
                        isCustomer={isCustomer}
                    />
                    <FilterableClothesList
                        drizzle={drizzle}
                        userAccountAddress={userAccountAddress}
                        isCustomer={isCustomer}
                    />
                </div>
            }
            <Footer />
        </div>
    )
}

export default Shop
