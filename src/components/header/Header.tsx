import React from 'react';
import { Typography, Box, } from '@mui/material';
import logo from '@/assets/logo-boostup.svg';
import styles from './Header.module.css'


const Header: React.FC = () => {
    return (
        <>
            <Box className={styles.headerContainer}>
                <Box display='flex' flexDirection='column' alignItems='flex-start'>
                    <img src={logo} alt="Logo" className={styles.logo} />
                    <Typography variant="h4" component="h1"  >
                        US Demographic Data Visualization
                    </Typography>
                    <Typography variant="subtitle2" color='grey' pl={0.5}>
                        by Fausto Castillo
                    </Typography>
                </Box>
            </Box>
        </>
    );
};

export default Header;