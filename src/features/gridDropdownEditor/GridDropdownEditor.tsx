import React from "react";

import Grid from "../../components/Grid";
import useGridApi from "../../hooks/useGridApi";

const GridDropdownEditor: React.FC = () => {
  const { onGridReady } = useGridApi();

  return (
    <Grid
      columnDefs={[]}
      rowData={[]}
      onGridReady={onGridReady}
      gridOptions={{
        defaultColDef: {
          filter: true,
          flex: 1,
          floatingFilter: true,
          resizable: true,
          sortable: true,
        },
      }}
    />
  );
};

export default GridDropdownEditor;
