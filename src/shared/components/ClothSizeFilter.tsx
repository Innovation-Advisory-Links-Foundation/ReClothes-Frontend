import { FormControl, InputLabel, MenuItem } from "@material-ui/core"
import React, { useState } from "react"
import Select from "@material-ui/core/Select/Select"

// Defining the TS type for every property passed as props.
type Props = {
    onClothSizeFilterChange: (arg0: number) => void,
}

function ClothSizeFilter ({ onClothSizeFilterChange }: Props) {
    const [clothSize, setClothSize] = useState(6)

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setClothSize(event.target.value as number)
        onClothSizeFilterChange(event.target.value as number)
    }

    return (
        <FormControl style={{ padding: "5px" }}>
            <InputLabel>Size</InputLabel>
            <Select
                value={clothSize}
                onChange={handleChange}
                displayEmpty
            >
                <MenuItem value={0}>Unique</MenuItem>
                <MenuItem value={1}>XS</MenuItem>
                <MenuItem value={2}>S</MenuItem>
                <MenuItem value={3}>M</MenuItem>
                <MenuItem value={4}>L</MenuItem>
                <MenuItem value={5}>XL</MenuItem>
                <MenuItem value={6}>All</MenuItem>
            </Select>
        </FormControl>
    )
}

export default ClothSizeFilter
