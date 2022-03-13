import React, { ReactElement, useState } from 'react';
import {
  Alert,
  Box, Grid, LinearProgress, Pagination,
} from '@mui/material';
import { useQuery } from '@apollo/client';
import CountryCard from './CountryCard';
import GET_COUNTRIES from '../../graphql/queries/GET_COUNTRIES.queries';
import { Country } from '../../types/global';

// @TODO move to a global constant file
const CARDS_PER_PAGE = 6;

function CountiresList(): ReactElement {
  const [page, setPage] = useState(1);

  // @TODO create a custom took to seperate out the logic
  const { loading, error, data } = useQuery(GET_COUNTRIES);

  // @TODO create seperate component for progress and loading
  if (loading) return <LinearProgress />;
  if (error) return <Alert severity="error">Error loading countires...</Alert>;

  const { countries } = data;

  const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const startIndex = (page - 1) * CARDS_PER_PAGE;
  const endIndex = startIndex + CARDS_PER_PAGE;

  // @TODO add media query to grid to support different screen sizes
  return (
    <Box
      margin={5}
    >
      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        {countries.slice(startIndex, endIndex).map((country: Country) => (
          <Grid item key={country.code} xs={6}>
            <CountryCard country={country} />
          </Grid>
        ))}
      </Grid>

      <Box
        sx={{ display: 'flex', justifyContent: 'center' }}
        marginTop={5}
        width="100%"
      >
        <Pagination
          color="standard"
          count={Math.ceil(countries.length / CARDS_PER_PAGE)}
          page={page}
          onChange={handleChange}
        />
      </Box>
    </Box>
  );
}

export default CountiresList;
