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
    return app.CalendarGridRow(item);
  },

  next: function() {
    this.setState({date: this.state.date.add(1, 'month')});
  },

  prev: function() {
    this.setState({date: this.state.date.subtract(1, 'month')});
  },

  getWeeks: function() {
    // convert the collection into weeks

    var collection = this.state.collection;


    // magic

    return [];
  },

  render: function() {
    var monthYear = this.state.date.format('MMYY'); // e.g. "0914" for Sept, 2014

    var dates = this.getDaysOfMonth(monthYear);

    var events = this._getEventsOfMonth();

    return (
      React.DOM.div({className: "clndr"}, 
        app.CalendarControls({date: this.state.date, onPrev: this.prev, onNext: this.next}), 

        React.DOM.div({className: "calendar-grid"}, 
          app.CalendarGridHeader(null), 
          app.CalendarGridBody({events: events, dates: dates})
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

    // previous month in first week
    while (previousMonthIterator.weekday() < iterator.weekday()) {
      days.push({
        moment: previousMonthIterator.clone(),
        className: 'date prev-month'
      });

      previousMonthIterator.add(1, 'day');
    }

    // days in this month
    var daysInMonth = iterator.daysInMonth();

    var month = iterator.month();

    while (month === iterator.month()) {
      var iteratorDate = iterator.date();

      var date = {
        moment: iterator.clone(),
        className: 'date'
      };

      var now = moment();

      var collectionEvents = new Backbone.Collection(events);

      var dateEvents = collectionEvents.filter(function(item) {
        return moment(item.get('date')).date() === iteratorDate;
      });

      date.events = dateEvents;

      if (date.events.length) {
        date.className += ' events';
      }

      if (now.week() === iterator.week()) {
        date.className += ' active-week';

        if (now.dayOfYear() === iterator.dayOfYear()) {
          date.className += ' today';
        }
      }

      days.push(date);

      iterator.add(1, 'day');
    }

    // next month in last week
    while (iterator.weekday() !== 0) {
      days.push({
        moment: iterator.clone(),
        className: 'date next-month'
      });

      iterator.add(1, 'day');
    }

    return days;
  }
});