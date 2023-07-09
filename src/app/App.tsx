import React from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  Link as ReactRouterLink,
} from "react-router-dom";
import MuiLink from "@mui/material/Link";

import GridDropdownEditor from "../features/gridDropdownEditor/GridDropdownEditor";
import GridDynamicDateColumns from "../features/gridDynamicDateColumns/GridDynamicDateColumns";
import GridOverlay from "../features/gridOverlay/GridOverlay";
import GridRowEditor from "../features/gridRowEditor/GridRowEditor";
import GridStatusBar from "../features/gridStatusBar/GridStatusBar";
import HomePage from "../features/homePage/HomePage";

const App: React.FC = () => {
  const exampleConfigs = [
    {
      url: "/",
      element: <HomePage />,
      label: "Home",
    },
    {
      url: "/dropdown-editor",
      element: <GridDropdownEditor />,
      label: "Dropdown Editor",
    },
    {
      url: "/dynamic-date-columns",
      element: <GridDynamicDateColumns />,
      label: "Dynamic Date Columns",
    },
    {
      url: "/row-editor",
      element: <GridRowEditor />,
      label: "Row Editor",
    },
    {
      url: "/overlay",
      element: <GridOverlay />,
      label: "Overlay",
    },
    {
      url: "/status-bar",
      element: <GridStatusBar />,
      label: "Status Bar",
    },
  ];

  const renderNavLinks = () => {
    return exampleConfigs.map((config) => (
      <li
        key={`nav-${config.label}`}
        style={{
          display: "inline",
          marginRight: "4px",
        }}
      >
        {"| "}
        <MuiLink component={ReactRouterLink} to={config.url}>
          {config.label}
        </MuiLink>
      </li>
    ));
  };

  const renderRoutes = () => {
    return exampleConfigs.map((config) => (
      <Route
        key={`route-${config.label}`}
        path={config.url}
        element={config.element}
      />
    ));
  };

  return (
    <BrowserRouter>
      <nav>
        <ul
          style={{
            margin: "2px",
            padding: 0,
          }}
        >
          {renderNavLinks()}
        </ul>
      </nav>

      <Routes>{renderRoutes()}</Routes>
    </BrowserRouter>
  );
};

export default App;
