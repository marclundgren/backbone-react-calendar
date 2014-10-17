/** @jsx React.DOM */

// app namespace
var app = app || {};

app.CalendarGrid = React.createClass({
  getDefaultProps: function() {
    return {
      active: true,
      className: 'calendar-grid',
      events: new Backbone.CalendarEvents(),
      headerNames: ['S', 'M', 'T', 'W', 'T', 'F', 'S']
    };
  },

  render: function() {

    if (!this.props.date.isValid()) {
      return <app.InvalidDate />
    }

    var monthYear = this.props.date.format('MMYY'); // e.g. "0914" for Sept, 2014

    var dates = this.getDaysOfMonth(monthYear); // ~250ms -> ~180ms

    var className = this.props.className;

    if (this.props.active) {
      className += ' active';
    }

    var events = this._getEventsOfMonth(); // ~1ms

    return (
      <div className={className}>
        <app.CalendarGridHeader names={this.props.headerNames} />

        <app.CalendarGridBody events={events} dates={dates} onGridSelect={this.props.onGridSelect} weekLength={this.props.headerNames.length} />

        {this.props.children}
      </div>
    );
  },

  _getEventsOfMonth: function(month) {
    return this.props.events.filter(function(item) {
      return (item.month() === month);
    });
  },

  /**
   * Return an array of days for the current month that may include days prior to and after the current month
   * to complete the grid.
   */
  getDaysOfMonth: function() {
    var days = [];

    if (!this.props.date.isValid()) {
      return days;
    }

    var yearMonth = app.Util.yearMonth(this.props.date);

    var events = this._getEventsOfMonth(yearMonth); // ~23

    var iterator = this.props.date.clone().startOf('month');

    var previousMonthIterator = iterator.clone().weekday(0);

    var weekOfMonth = 1;

    // previous month in first week
    while (previousMonthIterator.weekday() < iterator.weekday()) {
      days.push({
        className: 'date prev-month',
        fullDate: iterator.toDate(),
        moment: previousMonthIterator.clone(),
        week: weekOfMonth
      });

      previousMonthIterator.add(1, 'day');
    }

    var month = iterator.month();

    var collectionEvents = new Backbone.Collection(events);

    var m = moment();

    while (month === iterator.month()) {
      var iteratorDate = iterator.date();

      var dateEvents = collectionEvents.where({
        fullDate: iterator.format('YYYY-MM-DD')
      });

      var date = this.props.date;

      var activeWeek = date.week() === iterator.week();

      var activeDay = date.dayOfYear() === iterator.dayOfYear();

      if (activeWeek) {
        date.className += ' active-week';

        if (activeDay) {
          date.className += ' today';
        }
      }

      var date = {
        activeMonth: true,
        activeWeek: activeWeek,
        activeDay: activeDay,
        className: 'date',
        events: dateEvents,
        fullDate: iterator.toDate(),
        moment: iterator.clone(),
        week: weekOfMonth
      };

      days.push(date);

      iterator.add(1, 'day');

      if (days.length % 7 === 0) {
        weekOfMonth++;
      }
    }

    // next month in last week
    while (iterator.weekday() !== 0) {
      days.push({
        className: 'date next-month',
        fullDate: iterator.toDate(),
        moment: iterator.clone(),
        week: weekOfMonth
      });

      iterator.add(1, 'day');
    }

    return days;
  }
});