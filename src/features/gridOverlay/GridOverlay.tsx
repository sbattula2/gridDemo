import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

import ButtonBar from "../../components/ButtonBar";
import Grid from "../../components/Grid";
import useGridApi from "../../hooks/useGridApi";

const GridOverlay: React.FC = () => {
  const { gridApi, onGridReady } = useGridApi();

  const Overlay = () => <FontAwesomeIcon icon={faCircleNotch} size="3x" spin />;

  return (
    <>
      <ButtonBar>
        {/*
         * Must use arrow function in order to properly use `gridApi` once it
         * initializes.
         */}
        <button onClick={() => gridApi?.showLoadingOverlay()}>
          Show overlay
        </button>
        <button onClick={() => gridApi?.hideOverlay()}>Hide overlay</button>
      </ButtonBar>
      <Grid
        columnDefs={[]}
        rowData={[]}
        loadingOverlayComponentFramework={Overlay}
        onGridReady={onGridReady}
      />
    </>
  );
};

export default GridOverlay;
