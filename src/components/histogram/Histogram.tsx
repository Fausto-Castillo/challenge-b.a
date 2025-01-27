import React, { useState, useEffect, useMemo } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box } from '@mui/material';
import { ChartData } from '@/types';
import calculatePercentage from '@/utils/calculatePercentage'
import FilterYears from './filter-years/FilterYears'

interface HistogramProps {
    onYearClick: (year: string | null) => void;
    chartData: ChartData[];
    isLoading: boolean;
}

const Histogram: React.FC<HistogramProps> = ({ onYearClick, chartData }) => {
    const [selectedYears, setSelectedYears] = useState<string[]>([]);
    const [selectedBar, setSelectedBar] = useState<string | null>(null);

    useEffect(() => {
        if (chartData && selectedYears.length === 0) {
            setSelectedYears(chartData.map((item) => item.name));
        }
    }, [chartData, selectedYears.length])

    const handleYearToggle = (year: string) => {
        if (selectedYears.includes(year)) {
            if (selectedYears.length === 1) return
            setSelectedYears(selectedYears.filter((y) => y !== year));
            if (selectedBar === year) {
                setSelectedBar(null);
                onYearClick(null);
            }
        } else {
            setSelectedYears([...selectedYears, year]);
        }
    };

    const handlePointClick = (e: Highcharts.PointClickEventObject) => {
        const year = e.point.name;
        if (typeof year === 'string' && selectedBar !== year) {
            setSelectedBar(year);
            onYearClick(year);
        }
        else {
            setSelectedBar(null);
            onYearClick(null);
        }
    }

    const filteredData = useMemo(() => {
        return chartData?.filter(item => selectedYears.length === 0 || selectedYears.includes(item.name)) || [];
    }, [chartData, selectedYears]);

    const chartOptions: Highcharts.Options = {
        chart: {
            backgroundColor: 'none',
        },
        title: {
            text: ''
        },
        xAxis: {
            type: 'category',
            title: {
                text: 'Year'
            },

        },
        yAxis: [{
            title: {
                text: 'Population and Foreign Born'
            },
        },
        {
            title: {
                text: 'Foreign Born Citizens (%)'
            },
            labels: {
                format: '{value}%'
            },
            opposite: true
        }],
        tooltip: {
            shared: true
        },
        plotOptions: {
            series: {
                cursor: 'pointer',
                point: {
                    events: {
                        click: handlePointClick
                    }
                }
            }
        },
        series: [
            {
                type: 'column',
                name: 'Population',
                data: filteredData.map((item) => ({
                    name: item.name,
                    y: item.population,
                    color: selectedBar === item.name ? '#0a4d8a' : 'rgb(44, 175, 254)',
                })),
            },
            {
                type: 'column',
                name: 'Foreign Born',
                data: filteredData.map((item) => ({
                    name: item.name,
                    y: item.foreignBorn,
                    color: selectedBar === item.name ? 'rgb(61, 34, 114)' : 'rgb(84, 79, 197)'
                })),
            },
            {
                type: 'spline',
                name: 'Foreign Born Citizens (%)',
                yAxis: 1,
                data: filteredData.map((item) => ({
                    name: item.name,
                    y: calculatePercentage(item.foreignBorn, item.population),
                    color: 'orange',
                })),
                tooltip: {
                    valueSuffix: '%'
                },
                marker: {
                    fillColor: 'orange',
                },
            },
        ]
    };

    return (
        <Box>
            <HighchartsReact highcharts={Highcharts} options={chartOptions} />
            <FilterYears selectedYears={selectedYears} chartData={chartData} handleYearToggle={handleYearToggle} />
        </Box>
    );
};

export default Histogram;