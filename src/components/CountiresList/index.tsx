import React, { ReactElement } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import useCountriesData from './useCountiresData';
import styles from './CountriesList.module.css';

function CountiresList(): ReactElement {
  const {
    loading, error, columns, rows,
  } = useCountriesData();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div className={styles.listContainer}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[5]}
      />
    </div>
  );
}

export default CountiresList;
