import React from "react"
import Footer from "../../components/Footer"
import DelayingCircularLoader from "../../../shared/components/DelayingCircularLoader"
import FilterableCollectionClothesList from "./components/FilterableCollectionClothesList"

function Collection (props: any) {
    return (
        <div style={{ width: "100vw" }}>
            {(!props.isAppEnabled || !props.isNetworkCorrect) &&
                <div style={{ marginTop: "70px" }}>
                    <DelayingCircularLoader
                        expirationTime={1500}
                        message={"Please enable MetaMask!"}
                    >

                    </DelayingCircularLoader>
                </div>
            }
            {(props.isAppEnabled) &&
                <div style={{ marginTop: "70px" }}>
                    <DelayingCircularLoader
                        expirationTime={2000}
                        message={"Reading Blockchain state..."}
                    >
                        <FilterableCollectionClothesList
                            drizzle={props.drizzle}
                            userAccountAddress={props.userAccountAddress}
                            isCustomer={props.isCustomer}
                        />
                    </DelayingCircularLoader>
                </div>
            }
            <Footer />
        </div>
    )
}

export default Collection
