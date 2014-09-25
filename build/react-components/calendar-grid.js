/** @jsx React.DOM */

// app namespace
var app = app || {};

app.CalendarGrid = React.createClass({displayName: 'CalendarGrid',
  getInitialState: function() {
    return {
      collection: [],
      date: moment(this.props.date)
    };
  },

  createEntry: function (entry) {
    return (
      React.DOM.div({className: "event"}, 
        React.DOM.h3({className: "title"}, 
          React.DOM.a({href: entry.get('link')}, entry.get('title'))
        ), 
        React.DOM.div({className: "when"}, 
          React.DOM.div({className: "starts"}, 
            "Starts: ", entry.starts()
          ), 
          React.DOM.div({className: "duration"}, 
            "Duration: ", entry.duration()
          )
        ), 
        React.DOM.div({className: "where"}, 
          "Location: ", entry.get('location')
        ), 
        React.DOM.div({className: "entry-content"}, entry.get('content'))
      )
    );
  },

  createDate: function(item) {
    return app.CalendarDate(item);
  },

  createCell: function(item) {
    return app.CalendarGridDate(item);
  },

  createRow: function() {
    return (
      React.DOM.div({className: "row"}
      )
    );

    // will not run
    return app.CalendarGridRow(item);
  },

  next: function() {
    this.setState({date: this.state.date.add(1, 'month')});
  },

  prev: function() {
    this.setState({date: this.state.date.subtract(1, 'month')});
  },

  getWeeks: function() {
    var daysOfMonth = this.getDaysOfMonth();
    // todo: make this clear, we're returning a grid that may include days prior to and after the current month

    var weeksInMonth = (daysOfMonth.length / 7);

    var daysOfMonthCollection = new Backbone.Collection(daysOfMonth);

    var weeks = [];

    for (var index = 0; index < weeksInMonth; index++) {
      weeks[index] = daysOfMonthCollection.where({week: index + 1});
    }

    console.log('weeks', weeks);

    return weeks;
  },

  render: function() {
    var monthYear = this.state.date.format('MMYY'); // e.g. "0914" for Sept, 2014

    var dates = this.getDaysOfMonth(monthYear);

    var events = this._getEventsOfMonth();

    var weeks = this.getWeeks();
    console.log('weeks: ', weeks);

    // todo move calendar and controls into calendar.jsx

    return (
      React.DOM.div({className: "calendar"}, 
        app.CalendarControls({date: this.state.date, onPrev: this.prev, onNext: this.next}), 

        React.DOM.div({className: "calendar-grid"}, 
          app.CalendarGridHeader(null), 
          app.CalendarGridBody({events: events, dates: dates, weeks: weeks})
        )
      )
    );
  },

  _getEventsOfWeek: function() {
    // todo

    // var eventsOfMonth = this._getEventsOfMonth();

    // var eventsOfWeek =
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
   * Return an array of days for the current month
   */
  getDaysOfMonth: function() {
    var days = [];

    var yearMonth = app.Util.yearMonth(this.state.date);

    var events = this._getEventsOfMonth(yearMonth);

    var iterator = this.state.date.clone().startOf('month');

    var previousMonthIterator = iterator.clone().weekday(0);

    var weekOfMonth = 1;

    // previous month in first week
    while (previousMonthIterator.weekday() < iterator.weekday()) {
      days.push({
        activeMonth: false,
        activeWeek: false,
        activeDay: false,
        className: 'date prev-month',
        events: [],
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

      var now = moment();

      var activeWeek = now.week() === iterator.week();

      var activeDay = now.dayOfYear() === iterator.dayOfYear();

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
        activeMonth: false,
        activeWeek: false,
        activeDay: false,
        moment: iterator.clone(),
        className: 'date next-month',
        events: [],
        week: weekOfMonth
      });

      iterator.add(1, 'day');
    }

    return days;
  }
});