import React, { useState, useEffect, useCallback } from 'react';
import Histogram from '@/components/histogram/Histogram';
import DrillDownTable from '@/components/drilldown-table/DrillDownTable';
import StateSelector from './components/state-selector/StateSelector';
import Header from '@/components/header/Header';
import './App.css';
import { Container, Grid2 as Grid, Typography } from '@mui/material';
import { fetchNationalData, fetchStateData } from '@/services/datausaService';
import { ChartData, StateOption } from '@/types';

const App: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [selectedState, setSelectedState] = useState<string | undefined>(undefined);
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [allStates, setAllStates] = useState<StateOption[]>([]);
  const [statesLoading, setStatesLoading] = useState(true);

  const fetchAllStates = useCallback(async () => {
    setStatesLoading(true);
    try {
      const stateData = await fetchStateData('2013');
      if (stateData && stateData.length > 0) {
        const uniqueStates = Array.from(new Set(stateData.map(item => ({ 'State': item['State'], 'ID State': item['ID State'] })))) as StateOption[]
        setAllStates(uniqueStates);
      } else {
        setAllStates([]);
        console.error('No state Data Received from DataUSA API')
      }
    } catch (error) {
      console.error("Error fetching all states", error)
    } finally {
      setStatesLoading(false)
    }
  }, []);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const nationalData = await fetchNationalData(selectedState);
      if (nationalData && nationalData.length > 0) {
        const chartData = nationalData.map((item) => ({
          name: item.Year,
          population: Number(item.Population),
          foreignBorn: Number(item['Foreign-Born Citizens']),
        })).sort((a, b) => parseInt(a.name) - parseInt(b.name));
        setChartData(chartData);
      } else {
        setChartData([]);
        console.error('No Data Received from DataUSA API')
      }
    } catch (error) {
      console.error('Error fetching national data:', error);
    } finally {
      setIsLoading(false);
    }
  }, [selectedState]);

  useEffect(() => {
    fetchAllStates()
  }, [fetchAllStates]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleYearClick = (year: string | null) => {
    setSelectedYear(year);
  };

  const handleSelectState = (stateCode: string) => {
    setSelectedState(stateCode);
  };

  const handleClearSelection = () => {
    setSelectedState(undefined);
  };

  return (
    <Container className="appContainer">
      <Header />
      <Typography variant="h6" component="h2" textAlign="left" mb={3} px={5} color='black'>Population and Foreign-Born Citizens</Typography>
      <Grid container spacing={4} px={5} >
        <Grid size={{ xs: 12, md: selectedYear ? 6 : 12 }}>
          <StateSelector onSelectState={handleSelectState} onClearSelection={handleClearSelection} allStates={allStates} isLoading={statesLoading} />
          <Histogram onYearClick={handleYearClick} chartData={chartData} isLoading={isLoading} />
        </Grid>
        {selectedYear &&
          <Grid size={{ xs: 12, md: 6 }} >
            <DrillDownTable year={selectedYear} stateCode={selectedState} />
          </Grid>
        }
      </Grid>
    </Container>
  );
};

export default App;