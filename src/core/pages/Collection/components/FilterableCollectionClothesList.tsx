import React, { useState } from "react"
import { Grid } from "@material-ui/core"
import ClothTypeFilter from "../../../../shared/components/ClothTypeFilter"
import ClothSizeFilter from "../../../../shared/components/ClothSizeFilter"
import CollectionClothesTable from "./CollectionClothesTable"

// Handles a filterable list of projects.
function FilterableCollectionClothesList (props: any) {
    const [clothTypeFilter, setClothTypeFilter] = useState(6)
    const [clothSizeFilter, setClothSizeFilter] = useState(6) // Filter based on clothes status (second-hand, upcycled).

    // On click handler for status filter changes.
    const onClothTypeFilterChange = (clothTypeFilter: number) => {
        setClothTypeFilter(clothTypeFilter)
    }
    // On click handler for status filter changes.
    const onClothSizeFilterChange = (clothSizeFilter: number) => {
        setClothSizeFilter(clothSizeFilter)
    }

    return (
        <div style={{ marginBottom: "50px", marginTop: "10px" }}>
            <Grid
                container
                direction="row"
                justify="space-around"
                alignItems="center"
            >
                <Grid item
                >
                    <ClothTypeFilter
                        onClothTypeFilterChange={onClothTypeFilterChange}
                    />
                </Grid>
                <Grid item
                >
                    <ClothSizeFilter
                        onClothSizeFilterChange={onClothSizeFilterChange}
                    />
                </Grid>
            </Grid>
            <CollectionClothesTable
                drizzle={props.drizzle}
                userAccountAddress={props.userAccountAddress}
                clothTypeFilter={clothTypeFilter}
                clothSizeFilter={clothSizeFilter}
                isCustomer={props.isCustomer}
            />

        </div>
    )
}

export default FilterableCollectionClothesList
