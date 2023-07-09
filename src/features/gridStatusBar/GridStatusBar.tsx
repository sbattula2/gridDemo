import React from "react";

import Grid from "../../components/Grid";

const GridOverlay: React.FC = () => {
  const columnDefs = [
    {
      headerCheckboxSelection: true,
      checkboxSelection: true,
      headerName: "Key",
      field: "key"
    },
    {
      headerName: "Value",
      field: "value",
      aggFunc: "sum",
      enableValue: true,

      // Fill rest of available space in grid.
      // See https://www.ag-grid.com/react-grid/column-sizing/#column-flex
      flex: 1
    }
  ];
  const rowData = [
    { key: "foo", value: 1 },
    { key: "bar", value: 2 },
    { key: "baz", value: 3 }
  ];

  return (
    <Grid
      columnDefs={columnDefs}
      rowData={rowData}
      gridOptions={{
        statusBar: {
          statusPanels: [
            {
              statusPanel: "agTotalRowCountComponent",
              align: "left"
            },
            { statusPanel: "agSelectedRowCountComponent" },
            { statusPanel: "agAggregationComponent" }
          ]
        },
        rowSelection: "multiple",
        enableRangeSelection: true
      }}
    />
  );
};

export default GridOverlay;
