import { FormControl, InputLabel, MenuItem } from "@material-ui/core"
import React, { useState } from "react"
import Select from "@material-ui/core/Select/Select"

// Defining the TS type for every property passed as props.
type Props = {
    onEvaluationStatusFilterChange: (arg0: number) => void,
}

function EvaluationStatusFilter ({ onEvaluationStatusFilterChange }: Props) {
    const [evaluationStatus, setEvaluationStatus] = useState(2)

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
