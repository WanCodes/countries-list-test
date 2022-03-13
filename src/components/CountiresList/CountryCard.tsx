import React, { ReactElement } from 'react';
import Typography from '@mui/material/Typography';
import {
  Box, CardContent, Card, CardHeader,
} from '@mui/material';
import { Country } from '../../types/global';

interface CountryProps {
  country: Country;
}

function CountryCard({ country }:CountryProps): ReactElement {
  return (
    <Box sx={{ minWidth: 300 }}>
      <Card variant="outlined">
        <CardHeader
          title={`${country.name}`}
          subheader={`${country.emoji} - ${country.code}`}
        />
        <CardContent>
          <Typography variant="body2">
            {country.capital}
          </Typography>
          <Typography variant="body2">
            {country.native}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

export default CountryCard;
