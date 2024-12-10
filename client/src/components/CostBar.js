import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { Context } from "../index";
import { useContext } from 'react';
import TextField from '@mui/material/TextField';


const minDistance = 1;

const CostBar = () => {
    const [range, setRange] = React.useState([0, 100000]);
    const { property } = useContext(Context);

    const handleCostChanges = (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) {
            return;
        }
        if (activeThumb === 0) {
            let setValue = Math.min(newValue[0], range[1] - minDistance);
            setRange([setValue, range[1]]);
            property.setCostMin(setValue);
        } else {
            let setValue = Math.max(newValue[1], range[0] + minDistance);
            setRange([range[0], setValue]);
            property.setCostMax(setValue);
        }
    };

    const handleMinChange = (event) => {
        setRange([event.target.value, range[1]]);
        property.setCostMin(event.target.value);
    }

    const handleMaxChange = (event) => {
        setRange([range[0], event.target.value]);
        property.setCostMax(event.target.value);
    }

    return (
        <Box className="mt-3" sx={{ width: 300 }}>
            <div style={{ fontWeight: 'bold', fontSize: '16px', textAlign: "center" }}>Цена</div>
            <div style={{ display: "flex", justifyContent: "center" }} className="mt-3">
                <TextField
                    label="Мин"
                    value={range[0]}
                    onChange={handleMinChange}
                />
                <span style={{ margin: "0 10px" }}>-</span>
                <TextField
                    label="Макс"
                    value={range[1]}
                    onChange={handleMaxChange}
                />
            </div>
            <Slider
                min={0}
                max={100000}
                value={range}
                onChange={handleCostChanges}
                valueLabelDisplay="auto"
                disableSwap
            />
        </Box>
    );
}

export default CostBar;