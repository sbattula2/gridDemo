// Must be very first imports
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";

import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { SingleDatePicker } from "react-dates";
import moment, { Moment } from "moment";
import { ICellEditorParams } from "@ag-grid-enterprise/all-modules";
import { ICellEditorReactComp } from "@ag-grid-community/react";

// The ISO day of week as used by `moment`.
// See https://momentjs.com/docs/#/get-set/iso-weekday
const MONDAY = 1;

const START_YEAR = 2021;

const GridSingleDateEditor = forwardRef<
  ICellEditorReactComp,
  ICellEditorParams
>((props, ref) => {
  const [date, setDate] = useState<Moment | null>(() => {
    if (props.value) {
      return moment(props.value, moment.HTML5_FMT.DATE, true);
    }

    return null;
  });

  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    setIsFocused(true);
  }, []);

  useImperativeHandle(ref, () => {
    return {
      getValue: () => {
        return date?.format(moment.HTML5_FMT.DATE);
      },
      isPopup: () => true,
    };
  });

  return (
    <SingleDatePicker
      date={date}
      displayFormat={moment.HTML5_FMT.DATE}
      focused={isFocused}
      id={`date-picker-${props.rowIndex}`}
      isOutsideRange={(date) => {
        return date.isoWeekday() !== MONDAY || date.year() < START_YEAR;
      }}
      onDateChange={setDate}
      onFocusChange={({ focused }) => setIsFocused(focused)}
    />
  );
});

export default GridSingleDateEditor;
