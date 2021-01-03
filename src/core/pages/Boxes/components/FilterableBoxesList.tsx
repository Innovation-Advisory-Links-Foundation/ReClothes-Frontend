import React, { useState } from "react"
import { Grid } from "@material-ui/core"
import BoxesTable from "./BoxesTable"
import ClothTypeFilter from "../../../../shared/components/ClothTypeFilter"
import EvaluationStatusFilter from "./EvaluationStatusFitler"

type Props = {
    drizzle: any,
    userAccountAddress: string,
    isCustomer: boolean 
}

/**
 * Shows and filter on a list of boxes.
 */
function FilterableBoxesList ({ drizzle, userAccountAddress, isCustomer }: Props) {
    const [clothTypeFilter, setClothTypeFilter] = useState<number>(6) // Filter based on clothes type.
    const [evaluationStatusFilter, setEvaluationStatusFilter] = useState<number>(2)  // Filter based on box evaluation status.

    // Handler for cloth type filter changes.
    const onClothTypeFilterChange = (clothTypeFilter: number) => {
        setClothTypeFilter(clothTypeFilter)
    }

    // Handler for box evaluation status filter changes.
    const onEvaluationStatusFilterChange = (evaluationStatusFilter: number) => {
        setEvaluationStatusFilter(evaluationStatusFilter)
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
                    <EvaluationStatusFilter
                        onEvaluationStatusFilterChange={onEvaluationStatusFilterChange}
                    />
                </Grid>
            </Grid>
            <BoxesTable
                drizzle={drizzle}
                userAccountAddress={userAccountAddress}
                isCustomer={isCustomer}
                clothTypeFilter={clothTypeFilter}
                evaluationStatusFilter={evaluationStatusFilter}
            />
        </div>
    )
}

export default FilterableBoxesList
