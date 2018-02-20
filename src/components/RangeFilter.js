import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'react-dates/initialize';
import { DateRangePicker, isInclusivelyBeforeDay } from 'react-dates';
import moment from 'moment';
import 'react-dates/lib/css/_datepicker.css';
import './RangeFilter.css';

export default class RangeFilter extends Component {
  constructor() {
    super();
    this.state = {
      focusedInput: null,
      startDate: null,
      endDate: null,
    };
  }

  onDatesChange = ({ startDate, endDate }) => {
    this.setState({ startDate, endDate });
    const startDateValue = startDate ? startDate.valueOf() : null;
    const endDateValue = endDate ? endDate.valueOf() : null;
    this.props.onRangeSelect(startDateValue, endDateValue);
  }

  onFocusChange = (focusedInput) => {
    this.setState({ focusedInput });
  }

  render() {
    const { focusedInput, startDate, endDate } = this.state;

    return (
      <div className="date-range">
        <span className="date-range-label"> Filter By Date </span>
        <DateRangePicker
          onDatesChange={this.onDatesChange}
          onFocusChange={this.onFocusChange}
          focusedInput={focusedInput}
          startDate={startDate}
          endDate={endDate}
          startDateId="1"
          endDateId="2"
          isOutsideRange={day => !isInclusivelyBeforeDay(day, moment())}
        />
      </div>
    );
  }
}

RangeFilter.propTypes = {
  onRangeSelect: PropTypes.func.isRequired,
};
