/** @jsx React.DOM */
moment.locale('en');

var WEEK_LENGTH = 7;

var Day = React.createClass({displayName: 'Day',
  getInitialState: function() {
    return {
      events: []
    };
  },

  render: function() {
    return (
      React.DOM.div({className: this.props.className}, 
        React.DOM.div({className: "day-number"}, this.props.moment.date())
      )
    );
  }
});

var CalendarControls = React.createClass({displayName: 'CalendarControls',

  next: function() {
    this.props.onNext();
  },

  prev: function() {
    this.props.onPrev();
  },

  render: function() {
    return (
      React.DOM.nav({className: "clndr-controls"}, 
        React.DOM.div({className: "arrow arrow-previous", onClick: this.prev}), 
        React.DOM.h3({className: "title"}, this.props.date.format('MMMM YYYY')), 
        React.DOM.div({className: "arrow arrow-next", onClick: this.next})
      )
    );
  }
});

var Calendar = React.createClass({displayName: 'Calendar',

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
    this.setState({date: this.state.date.add(1, 'months')});
  },

  prev: function() {
    this.setState({date: this.state.date.subtract(1, 'months')});
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

      return Day(dayConfig);
    }

    var monthYear = this.state.date.format('MMYY'); // e.g. "0914" for Sept, 2014

    var days = this.getDaysOfMonth(monthYear);

    return (
      React.DOM.div({className: "clndr"}, 
        CalendarControls({date: this.state.date, onNext: this.next, onPrev: this.prev}), 
        React.DOM.div({className: "clndr-grid"}, 
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

var date = new Date(2014, 7, 9, 17, 0); // August 9, 1984

React.renderComponent(
  Calendar({date: date}),
  document.getElementById('calendar')
);