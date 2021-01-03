import { FormControl, InputLabel, MenuItem } from "@material-ui/core"
import React, { useState } from "react"
import Select from "@material-ui/core/Select/Select"

type Props = {
    onEvaluationStatusFilterChange: (arg0: number) => void // Handler for box evaluation status filter changes.
}

/**
 * Implements filter logic based on the evaluation status of a box.
 */
function EvaluationStatusFilter ({ onEvaluationStatusFilterChange }: Props) {
    const [evaluationStatus, setEvaluationStatus] = useState<number>(2) // Current box evaluation status.

    // Callback function for handling filter change events.
    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setEvaluationStatus(event.target.value as number)
        onEvaluationStatusFilterChange(event.target.value as number)
    }

    return (
        <FormControl style={{ padding: "5px" }}>
            <InputLabel>Status</InputLabel>
            <Select
                value={evaluationStatus}
                onChange={handleChange}
                displayEmpty
            >
                <MenuItem value={0}>Not Evaluated</MenuItem>
                <MenuItem value={1}>Evaluated</MenuItem>
                <MenuItem value={2}>All</MenuItem>
            </Select>
        </FormControl>
    )
}

export default EvaluationStatusFilter
