import React, { useState } from "react"
import { Grid } from "@material-ui/core"
import BoxesTable from "./BoxesTable"
import ClothTypeFilter from "../../../../shared/components/ClothTypeFilter"
import EvaluationStatusFilter from "./EvaluationStatusFitler"

// Handles a filterable list of projects.
function FilterableBoxesList (props: any) {
    const [clothTypeFilter, setClothTypeFilter] = useState(6)
    const [evaluationStatusFilter, setEvaluationStatusFilter] = useState(2)

    // On click handler for status filter changes.
    const onClothTypeFilterChange = (clothTypeFilter: number) => {
        setClothTypeFilter(clothTypeFilter)
    }
    // On click handler for status filter changes.
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
                drizzle={props.drizzle}
                userAccountAddress={props.userAccountAddress}
                clothTypeFilter={clothTypeFilter}
                evaluationStatusFilter={evaluationStatusFilter}
                isCustomer={props.isCustomer}
            />

        </div>
    )
}

export default FilterableBoxesList
