import React from 'react';
import { Button, Box } from '@mui/material';
import { ChartData } from '@/types';

interface FilterYearsProps {
    selectedYears: string[];
    chartData: ChartData[];
    handleYearToggle: (year: string) => void;
}

const FilterYears: React.FC<FilterYearsProps> = ({ selectedYears, chartData, handleYearToggle }) => {
    return (
        <Box>
            {chartData.map((item) => (
                <Button
                    key={item.name}
                    variant={selectedYears.includes(item.name) ? "contained" : "outlined"}
                    onClick={() => handleYearToggle(item.name)}
                    size="small"
                    sx={{ m: 0.5, p: 0, fontSize: '12px' }}
                >
                    {item.name}
                </Button>
            ))}
        </Box>
    );
};

export default FilterYears;