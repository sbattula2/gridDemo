import { ColDef } from "@ag-grid-enterprise/all-modules";
import React from "react";
import moment from "moment";

import Grid from "../../components/Grid";
import useGridApi from "../../hooks/useGridApi";

import GridSingleDateEditor from "./GridSingleDateEditor";

type Row = {
  id: number;
  returnWeek: string | null;
};

const rowData: Row[] = [
  {
    id: 1,
    returnWeek: "2020-01-01",
  },
  {
    id: 2,
    returnWeek: null,
  },
];

const columnDefs: ColDef[] = [
  {
    headerName: "Id",
    field: "id",
  },
  {
    headerName: "Return Week",
    field: "returnWeek",
    filter: "agDateColumnFilter",
    filterParams: {
      comparator: (filterDate: Date, cellDate: string): number =>
        moment(cellDate).diff(moment(filterDate)),
    },
    cellEditorFramework: GridSingleDateEditor,
    editable: true,
  },
];

const GridRowEditor: React.FC = () => {
  const { gridApi, onGridReady } = useGridApi();

  return (
    <>
      <Grid
        columnDefs={columnDefs}
        rowData={rowData}
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
    </>
  );
};

export default GridRowEditor;
