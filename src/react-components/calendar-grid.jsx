/** @jsx React.DOM */

// app namespace
var app = app || {};

app.CalendarGrid = React.createClass({
  getDefaultProps: function() {
    return {
      className: 'calendar-grid',
      // date: moment(),
      headerNames: ['S', 'M', 'T', 'W', 'T', 'F', 'S']
    };
  },

  getInitialState: function() {
    return {
      collection: []
    };
  },

  componentWillMount: function() {
    this.setState({collection: new Backbone.GoogleEvents(this.state.collection)});
  },

  getWeeks: function() {
    var weeks = [];

    var daysOfMonth = this.getDaysOfMonth();

    var weeksInMonth = (daysOfMonth.length / this.props.headerNames.length);

    var daysOfMonthCollection = new Backbone.Collection(daysOfMonth);

    for (var index = 0; index < weeksInMonth; index++) {
      weeks[index] = daysOfMonthCollection.where({week: index + 1});
    }

    return weeks;
  },

  render: function() {
    var monthYear = this.props.date.format('MMYY'); // e.g. "0914" for Sept, 2014

    var dates = this.getDaysOfMonth(monthYear);

    return (
      <div className={this.props.className}>
        <app.CalendarGridHeader names={this.props.headerNames} />
        <app.CalendarGridBody
          events={this._getEventsOfMonth()}
          dates={dates}
          onGridSelect={this.props.onGridSelect}
          weeks={this.getWeeks()} />
      </div>
    );
  },

  _getEventsOfMonth: function(yearMonth) {
    var googleEvents = this.state.collection;

    if (googleEvents.length && !(googleEvents instanceof Backbone.GoogleEvents)) {
      googleEvents = new Backbone.GoogleEvents(googleEvents);
    }

    // todo cleanup

    var eventsOfMonth = googleEvents.length && googleEvents.where({yearMonth: yearMonth}) || [];

    return eventsOfMonth;
  },

  /**
   * Return an array of days for the current month that may include days prior to and after the current month
   * to complete the grid.
   */
  getDaysOfMonth: function() {
    var days = [];

    var yearMonth = app.Util.yearMonth(this.props.date);

    var events = this._getEventsOfMonth(yearMonth);

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

    while (month === iterator.month()) {
      var iteratorDate = iterator.date();

      var collectionEvents = new Backbone.Collection(events);

      // IF i change the DATE attr, i could collectionEvents.where({date: iteratorDate})
      var dateEvents = collectionEvents.filter(function(item) {
        return moment(item.get('date')).date() === iteratorDate;
      });

      // var now = moment();
      var date = this.props.date;

      var activeWeek = date.week() === iterator.week();

      var activeDay = date.dayOfYear() === iterator.dayOfYear();
      // var activeDay = now.dayOfYear() === iterator.dayOfYear();

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