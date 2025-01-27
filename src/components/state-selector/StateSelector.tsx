import React, { useState } from 'react';
import { TextField, Autocomplete, Box, Button, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { StateOption } from '@/types';

interface StateSelectorProps {
  onSelectState: (stateCode: string, stateName: string) => void;
  onClearSelection: () => void;
  allStates: StateOption[];
  isLoading: boolean;
}

const StateSelector: React.FC<StateSelectorProps> = ({ onSelectState, onClearSelection, allStates }) => {
  const [searchQuery, setSearchQuery] = useState<StateOption | null>(null);


  const handleSelectState = (_: React.SyntheticEvent, value: StateOption | null) => {
    setSearchQuery(value);
    if (value && value['ID State'] && value['State']) {
      onSelectState(value['ID State'], value['State']);
    } else {
      onClearSelection();
    }
  };

  const handleClearButtonClick = () => {
    setSearchQuery(null);
    onClearSelection();
  }


  return (
    <Box display='flex' alignItems='center' mb={2}>
      <Autocomplete
        disablePortal
        size="small"
        id="state-select"
        options={allStates}
        getOptionLabel={(option) => option.State}
        value={searchQuery}
        onChange={handleSelectState}
        sx={{ width: 200 }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="State"
            size="small"
            InputProps={{
              ...params.InputProps,
              style: { padding: '2px' },
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}

          />
        )}
      />
      <Button type="button" variant="outlined" onClick={handleClearButtonClick} size="small" sx={{ ml: 1 }}
        disabled={!searchQuery}>Clear State</Button>
    </Box>
  );
};

export default StateSelector;