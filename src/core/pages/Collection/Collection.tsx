import React from "react"
import Footer from "../../components/Footer"
import DelayingCircularLoader from "../../../shared/components/DelayingCircularLoader"
import FilterableCollectionClothesList from "./components/FilterableCollectionClothesList"
import CircularLoader from "../../../shared/components/CircularLoader"

type Props = {
    drizzle: any,
    isAppEnabled: boolean,
    isNetworkCorrect: boolean,
    userAccountAddress: string,
    isCustomer: boolean 
}

/**
 * Show the collection page where the customer can see his/her purchased clothes.
 */
function Collection ({drizzle, isAppEnabled, isNetworkCorrect, userAccountAddress, isCustomer }: Props) {
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
                    <DelayingCircularLoader
                        expirationTime={2000}
                        message={"Reading Blockchain state..."}
                    >
                        <FilterableCollectionClothesList
                            drizzle={drizzle}
                            userAccountAddress={userAccountAddress}
                            isCustomer={isCustomer}
                        />
                    </DelayingCircularLoader>
                </div>
            }
            <Footer />
        </div>
    )
}

export default Collection
