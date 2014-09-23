/** @jsx React.DOM */

// app namespace
var app = app || {};

app.CalendarGrid = React.createClass({displayName: 'CalendarGrid',
  getDefaultProps: function() {
    return {
      forceSixRows: false,
      lang: 'en',
      weekOffset: 0
    };
  },

  getInitialState: function() {
    return {
      date: moment(this.props.date)
    };
  },

  next: function() {
    this.setState({date: this.state.date.add(1, 'month')});
  },

  prev: function() {
    this.setState({date: this.state.date.subtract(1, 'month')});
  },

  getDaysOfMonth: _.memoize(function() {
    return this._getDaysOfMonth();
  }),

  render: function() {
    function renderDay(item) {
      var dayConfig = {moment: item.moment};

      if (item.className) {
        dayConfig.className = item.className;
      }

      return app.CalendarDay(dayConfig);
    }

    var monthYear = this.state.date.format('MMYY'); // e.g. "0914" for Sept, 2014

    var days = this.getDaysOfMonth(monthYear);

    return (
      React.DOM.div({className: "clndr"}, 
        app.CalendarControls({date: this.state.date, onNext: this.next, onPrev: this.prev}), 
        React.DOM.div({className: "calendar-grid"}, 
          React.DOM.div({className: "days"}, 
            _.map(days, renderDay)
          ), 
          React.DOM.div({className: "clearfix"})
        )
      )
    );
  },

  /**
   * Return an array of days for the current month
   */
  _getDaysOfMonth: function() {
    var days = [];

    var iterator = this.state.date.clone().startOf('month');
    var previousMonthIterator = iterator.clone().weekday(0);

    // previous month in first week
    while (previousMonthIterator.weekday() < iterator.weekday()) {
      days.push({
        moment: previousMonthIterator.clone(),
        className: 'day prev-month'
      });

      previousMonthIterator.add(1, 'day');
    }

    // days in month
    var daysInMonth = iterator.daysInMonth();

    for (var i = 0; i < daysInMonth; i++) {
      var day = {
        moment: iterator.clone(),
        className: 'day'
      };

      var now = moment();

      if (now.week() === iterator.week()) {
        day.className += ' active-week';

        if (now.dayOfYear() === iterator.dayOfYear()) {
          day.className += ' today';
        }
      }

      days.push(day);

      iterator.add(1, 'day');
    }

    // next month in last week
    while (iterator.weekday() !== 0) {
      days.push({
        moment: iterator.clone(),
        className: 'day next-month'
      });

      iterator.add(1, 'day');
    }

    return days;
  }
});