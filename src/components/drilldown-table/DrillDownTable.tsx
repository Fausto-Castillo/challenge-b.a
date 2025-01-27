import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Skeleton
} from '@mui/material';
import { fetchStateData } from '@/services/datausaService';
import { DataUSADataItem } from '@/types';
import calculatePercentage from '@/utils/calculatePercentage'
import styles from './DrillDownTable.module.css';

interface DrillDownTableProps {
  year: string | null;
  stateCode?: string;
}

const DrillDownTable: React.FC<DrillDownTableProps> = ({ year }) => {
  const [stateData, setStateData] = useState<DataUSADataItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const skeletonRows = Array.from({ length: 10 });

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      if (year) {
        try {
          const stateData = await fetchStateData(year);
          if (stateData && stateData.length > 0) {
            setStateData(stateData);
          } else {
            setStateData([]);
            console.error('No state Data Received from DataUSA API');
          }
        } catch (error) {
          console.error('Error fetching state data:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchData();
  }, [year]);

  return (
    <Box bgcolor="white" className={styles.tableContainer}>
      <>
        <Typography variant="subtitle2" textAlign="left" mb={2} className={styles.tableTitle}>State Data for {year}</Typography>
        {isLoading ? (
          <Box className={styles.skeletonContainer}>
            {skeletonRows.map((_, index) => (
              <Skeleton key={index} variant="rectangular" height={35} className={styles.skeletonRow} />
            ))}
          </Box>
        ) : (
          <TableContainer component={Paper} className={styles.tableScroll} sx={{ boxShadow: 'none' }} >
            <Table stickyHeader size='small' aria-label="customized table">
              <TableHead>
                <TableRow>
                  <TableCell className={styles.tableCellHead}>State Name</TableCell>
                  <TableCell className={styles.tableCellHead} align="right">Total Population</TableCell>
                  <TableCell className={styles.tableCellHead} align="right">Foreign-Born Citizens</TableCell>
                  <TableCell className={styles.tableCellHead} align="right">Foreign-Born Percentage</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {stateData.map((item, index) => (
                  <TableRow key={item['State']} className={index % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd} >
                    <TableCell className={styles.tableCell} >{item['State']}</TableCell>
                    <TableCell className={styles.tableCell} align="right">{item['Population'] || '-'}</TableCell>
                    <TableCell className={styles.tableCell} align="right">{item['Foreign-Born Citizens'] || '-'}</TableCell>
                    <TableCell className={styles.tableCell} align="right">{calculatePercentage(item['Foreign-Born Citizens'], item['Population']) ? calculatePercentage(item['Foreign-Born Citizens'], item['Population'])?.toFixed(2) + '%' : '-'}</TableCell>
                  </TableRow>
                ))}
                {stateData.length === 0 && <TableRow><TableCell colSpan={4} sx={{ textAlign: 'center', padding: 2 }}>No data available</TableCell></TableRow>}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </>
    </Box>
  );
};

export default DrillDownTable;