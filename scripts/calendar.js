/** @jsx React.DOM */
moment.locale('en');

var Day = React.createClass({displayName: 'Day',
  render: function() {
    // todo: why is `this.props.day.day` a property?
    return (
      React.DOM.div({className: this.props.day.classes}, 
        React.DOM.span({className: "day-number"}, this.props.day.day.date())
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
      React.DOM.div({className: "clndr-controls"}, 
        React.DOM.div({onClick: this.prev}, "Prev"), 
        React.DOM.div({className: "current-month"}, this.props.date.format('MMMM YYYY')), 
        React.DOM.div({onClick: this.next}, "Next")
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
      date: moment()
    };
  },

  next: function() {
    this.setState({date: this.state.date.add(1, 'months')});
  },

  prev: function() {
    this.setState({date: this.state.date.subtract(1, 'months')});
  },

  createDay: function(day) {
    return {
      date: day,
      day: day.date()
    };
  },

  /**
   * Return an array of days for the current month
   */
  days: function() {
    var days = [];
    var date = this.state.date.startOf('month');
    var diff = date.weekday() - this.props.weekOffset;
    if (diff < 0) diff += 7;

    var i;
    for (i = 0; i < diff; i++) {
      days.push({
        day: moment([this.state.date.year(), this.state.date.month(), i-diff+1]),
        classes: 'prev-month'
      });
    }

    var numberOfDays = date.daysInMonth();
    for (i = 1; i <= numberOfDays; i++) {
      days.push({
        day: moment([this.state.date.year(), this.state.date.month(), i])
      });
    }

    i = 1;
    while (days.length % 7 !== 0) {
      days.push({
        day: moment([this.state.date.year(), this.state.date.month(), numberOfDays+i]), classes: 'next-month'
      });
      i++;
    }

    if (this.props.forceSixRows && days.length !== 42) {
      var start = moment(days[days.length-1].date).add(1, 'days');
      while (days.length < 42) {
        days.push({day: moment(start), classes: 'next-month'});
        start.add(1, 'days');
      }
    }

    return days;
  },

  render: function() {
    var renderDay = function(day) {
      return Day({day: day});
    };

    return (
      React.DOM.div({className: "clndr"}, 
        CalendarControls({date: this.state.date, onNext: this.next, onPrev: this.prev}), 
        React.DOM.div({className: "clndr-grid"}, 
          React.DOM.div({className: "days"}, 
            this.days().map(renderDay)
          ), 
          React.DOM.div({className: "clearfix"})
        )
      )
    );
  }
});

React.renderComponent(
  Calendar({url: "events.json"}),
  document.getElementById('calendar')
);