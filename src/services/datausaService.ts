import axios from 'axios';
import { DataUSAResponse, DataUSADataItem } from '@/types';

const API_BASE_URL = 'https://datausa.io/api/data';

const fetchDataUSA = async (params: string): Promise<DataUSADataItem[]> => {
  try {
    const response = await axios.get<DataUSAResponse>(`${API_BASE_URL}?${params}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching data from DataUSA API:', error);
    throw error;
  }
};

export const fetchNationalData = async (stateCode: string = ''): Promise<DataUSADataItem[]> => {
  let params = 'drilldowns=Nation&measures=Population,Foreign-Born Citizens';

  if (stateCode) {
    params = `drilldowns=State&measures=Population,Foreign-Born Citizens&Geography=${stateCode}`;
  }

  return fetchDataUSA(params);
};

export const fetchStateData = async (year: string): Promise<DataUSADataItem[]> => {
  const params = `drilldowns=State&measures=Population,Foreign-Born Citizens&year=${year}`;

  return fetchDataUSA(params);
};