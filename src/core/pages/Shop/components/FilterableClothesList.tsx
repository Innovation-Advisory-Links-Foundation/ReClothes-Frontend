import React, { useState } from "react"
import { Grid } from "@material-ui/core"
import ClothTypeFilter from "../../../../shared/components/ClothTypeFilter"
import ClothSizeFilter from "../../../../shared/components/ClothSizeFilter"
import SaleableClothesTable from "./SaleableClothesTable"

type Props = {
    drizzle: any,
    userAccountAddress: string,
    isCustomer: boolean 
}

/**
 * Shows and filter on a list of saleable clothes.
 */
function FilterableClothesList ({ drizzle, userAccountAddress, isCustomer }: Props) {
    const [clothTypeFilter, setClothTypeFilter] = useState<number>(6) // Filter based on clothes type.
    const [clothSizeFilter, setClothSizeFilter] = useState<number>(6) // Filter based on clothes size.

    // Handler for cloth type filter changes.
    const onClothTypeFilterChange = (clothTypeFilter: number) => {
        setClothTypeFilter(clothTypeFilter)
    }
    
    // Handler for cloth size filter changes.
    const onClothSizeFilterChange = (clothSizeFilter: number) => {
        setClothSizeFilter(clothSizeFilter)
    }

    return (
        <div style={{ marginBottom: "50px" }}>
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
            <SaleableClothesTable
                drizzle={drizzle}
                userAccountAddress={userAccountAddress}
                isCustomer={isCustomer}
                clothTypeFilter={clothTypeFilter}
                clothSizeFilter={clothSizeFilter}
            />
        </div>
    )
}

export default FilterableClothesList
