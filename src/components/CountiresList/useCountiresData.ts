import { ApolloError, useQuery } from '@apollo/client';
import { GridColDef } from '@mui/x-data-grid';
import GET_COUNTRIES from '../../graphql/queries/GET_COUNTRIES.queries';

export interface CountryDataType {
    id: string;
    code?: string;
    name: string;
    emoji: string;
}

export interface UseCountiresDataReturn {
    loading: boolean;
    error: ApolloError | undefined;
    columns: GridColDef[];
    rows: CountryDataType[];
}

const useCountriesData = ():UseCountiresDataReturn => {
  const { loading, error, data } = useQuery(GET_COUNTRIES);

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'Code',
      width: 90,
    },
    {
      field: 'name',
      headerName: 'Country',
      width: 150,
    },
    {
      field: 'emoji',
      headerName: 'Flag',
      width: 150,
    },
  ];
  const rows = data?.countries.map(
    ({ code, name, emoji }:CountryDataType) => ({ id: code, name, emoji }),
  ) || [];

  return {
    loading,
    error,
    columns,
    rows,
  };
};

export default useCountriesData;
