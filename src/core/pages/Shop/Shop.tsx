import React from "react"
import FilterableClothesList from "./components/FilterableClothesList"
import Footer from "../../components/Footer"
import CustomerBar from "../../components/CustomerBar"
import CircularLoader from "../../../shared/components/CircularLoader"

function Shop (props: any) {
    return (
        <div style={{ width: "100vw" }}>
            {(!props.isAppEnabled || !props.isNetworkCorrect) &&
                <div style={{ marginTop: "70px" }}>
                    <CircularLoader />
                </div>
            }
            {(props.isAppEnabled) &&
                <div style={{ marginTop: "70px" }}>
                    <CustomerBar
                        userAccountAddress={props.userAccountAddress}
                        drizzle={props.drizzle}
                        isCustomer={props.isCustomer}
                    />
                    <FilterableClothesList
                        drizzle={props.drizzle}
                        userAccountAddress={props.userAccountAddress}
                        isCustomer={props.isCustomer}
                    />
                </div>
            }
            <Footer />
        </div>
    )
}

export default Shop
