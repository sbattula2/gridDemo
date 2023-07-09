import React from "react";
import { DateTime, Duration, Info } from "luxon";
import { groupBy } from "lodash";

import Grid from "../../components/Grid";
import { ColDef, ColGroupDef } from "@ag-grid-enterprise/all-modules";

const createMondaysForYear = (year: number): DateTime[] => {
  const firstMondayOfYear = DateTime.fromObject({
    weekYear: year,
    weekNumber: 1,
  });
  const lastDayOfYear = DateTime.utc(year).endOf("year");

  // Create a year-long interval
  const yearInterval = firstMondayOfYear.until(lastDayOfYear);

  // Create an array of week-long intervals
  const oneWeek = Duration.fromObject({ weeks: 1 });
  const weekIntervals = yearInterval.splitBy(oneWeek);

  // Return the start date of each week-long interval
  return weekIntervals.map((weekInterval) => weekInterval.start);
};

const createForecastColDefs = (): ColGroupDef[] => {
  const weekStartDates = createMondaysForYear(2021);
  const weekStartDatesGroupedByMonth = groupBy(
    weekStartDates,
    (date) => date.monthLong,
  );

  const today = DateTime.utc();
  const monthsToShow = Info.months().slice(today.month - 1, today.month + 2);

  return Object.entries(weekStartDatesGroupedByMonth).map(
    ([monthName, weekStartDates]) => {
      const childrenColDefsForMonth = weekStartDates.map(
        (weekStartDate): ColDef => {
          // Format as "1/4", "2/18", etc.
          const formattedWeekStartDate = weekStartDate.toFormat("M/d");

          // Only show current month + 2 months
          const hide = !monthsToShow.includes(monthName);

          return {
            headerName: formattedWeekStartDate,
            valueGetter: (params) => {
              return params.data.forecast[formattedWeekStartDate];
            },
            hide,
          };
        },
      );

      return {
        headerName: monthName,
        children: childrenColDefsForMonth,
      };
    },
  );
};

const columnDefs = createForecastColDefs();
const rowData = [
  {
    id: 1,
    forecast: {
      "4/5": 0,
      "4/12": 0,
      "4/19": 0,
      "4/26": 1,
      "5/3": 1,
      "5/10": 1,
      "5/17": 1,
    },
  },
];

const GridDynamicDateColumns: React.FC = () => {
  return (
    <>
      <Grid
        columnDefs={columnDefs}
        rowData={rowData}
        gridOptions={{
          defaultColDef: {
            filter: true,
            resizable: true,
            suppressMenu: true,
            initialWidth: 75,
          },
        }}
      />
    </>
  );
};

export default GridDynamicDateColumns;
