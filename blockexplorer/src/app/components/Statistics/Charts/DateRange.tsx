import React from 'react';
import DatePicker from 'react-datepicker';

const DateRange = ({
  initialStartDate,
  InitianEndDate,
  setEndDate,
  setStartDate,
}) => {
  return (
    <>
      <DatePicker
        selected={initialStartDate}
        onChange={date => setStartDate(date)}
        selectsStart
        startDate={initialStartDate}
        endDate={InitianEndDate}
      />
      <DatePicker
        selected={InitianEndDate}
        onChange={date => setEndDate(date)}
        selectsEnd
        startDate={initialStartDate}
        endDate={InitianEndDate}
        minDate={initialStartDate}
      />
    </>
  );
};

export default DateRange;
