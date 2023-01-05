import React, { forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import './custompicker.css';
import styled from 'styled-components';
import moment from 'moment';
import TextField from '@mui/material/TextField';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';


const PickerContainer = styled.div`
  display: flex;
  width: 250px;
`;
const Container = styled.div`
  display: flex;
  justify-content: space-around;
`;
const FilterContainer = styled.div`
  display: flex;
`;
const StyledButton = styled.button`
  margin: 1rem;
`;
const NewTextField = styled(TextField)`
  margin: 1rem;
  width: 125px;
`;
const CustomInputContainer = styled.div`
  display: flex;
  align-content: center;
  align-items: center;
  cursor: pointer;
`;

const DateRange = ({
  initialStartDate,
  InitianEndDate,
  setEndDate,
  setStartDate,
}) => {
  const changeDate = date => {
    setEndDate(new Date());
    setStartDate(new Date(date));
  };
  console.log({
    day: moment().subtract(1, 'days'),
    month: moment().subtract(1, 'months'),
    year: moment().subtract(1, 'years'),
    all: moment('01/01/2000'),
  });
  const CustomInput = forwardRef(({ value, onClick, label }: any, ref) => (
    <CustomInputContainer style={{ cursor: 'default' }} >
      <NewTextField
        id="standard-basic"
        label={label}
        variant="standard"
        value={value}
        ref={ref}
        onClick={onClick}
        color="secondary"
        style={{ cursor: 'default' }}
      />
      <CalendarMonthIcon
        onClick={onClick}
        style={{ cursor: 'default' }}
      />
    </CustomInputContainer>
  ));
  return (
    <Container>
      <PickerContainer>
        <DatePicker
          selected={initialStartDate}
          onChange={date => setStartDate(date)}
          selectsStart
          startDate={initialStartDate}
          endDate={InitianEndDate}
          customInput={<CustomInput label="Initial Date" />}
        // readOnly
        />
        <DatePicker
          selected={InitianEndDate}
          onChange={date => setEndDate(date)}
          selectsEnd
          startDate={initialStartDate}
          endDate={InitianEndDate}
          minDate={initialStartDate}
          customInput={<CustomInput label="End Date" />}
        // readOnly
        />
      </PickerContainer>
      <FilterContainer>
        <StyledButton
          onClick={() =>
            changeDate(moment().subtract(1, 'days').format('YYYY-MM-DD'))
          }
          style={{ cursor: 'default' }}
        >
          1 Day
        </StyledButton>

        <StyledButton
          onClick={() =>
            changeDate(moment().subtract(1, 'months').format('YYYY-MM-DD'))
          }
          style={{ cursor: 'default' }}
        >
          1 Month
        </StyledButton>
        <StyledButton
          onClick={() =>
            changeDate(moment().subtract(1, 'years').format('YYYY-MM-DD'))
          }
          style={{ cursor: 'default' }}
        >
          1 year
        </StyledButton>

        <StyledButton
          onClick={() =>
            changeDate(moment('01/01/2000', 'DD/MM/YYYY').format('YYYY-MM-DD'))
          }
          style={{ cursor: 'default' }}
        >
          All
        </StyledButton>
      </FilterContainer>
      
    </Container>
  );
};

export default DateRange;
