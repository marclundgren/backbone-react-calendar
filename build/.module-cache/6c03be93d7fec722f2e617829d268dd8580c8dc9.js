/** @jsx React.DOM */

// app namespace
var app = app || {};

app.CalendarGrid = React.createClass({displayName: 'CalendarGrid',
  mixins: [Backbone.React.Component.mixin],

  getDefaultProps: function() {
    return {
      forceSixRows: false,
      lang: 'en',
      weekOffset: 0
    };
  },

  getInitialState: function() {
    return {
      date: moment(this.props.date),
      collection: [] // Backbone Models
    };
  },

  createDay: function(item) {

    // item.onClick = function(e) {
    //   console.log('hmmmm', e);
    //   debugger;
    // };

    return app.CalendarDate(item);

    var dayConfig = {moment: item.moment};

    if (item.className) {
      dayConfig.className = item.className;
    }

    if (item.events && item.events.length) {
      dayConfig.events = item.events;
      console.log('dayConfig.events: ', dayConfig.events);
    }

    return app.CalendarDate(dayConfig);
  },

  next: function() {
    this.setState({date: this.state.date.add(1, 'month')});
  },

  prev: function() {
    this.setState({date: this.state.date.subtract(1, 'month')});
  },

  // getDaysOfMonth: _.memoize(function() {
  //   return this._getDaysOfMonth();
  // }),

  getDaysOfMonth: function() {
    return this._getDaysOfMonth();
  },

  render: function() {
    // test
    // this.props.collection = [];

    var monthYear = this.state.date.format('MMYY'); // e.g. "0914" for Sept, 2014
    // todo, remove this and use app.Util.yearMonth

    var days = this.getDaysOfMonth(monthYear);

    return (
      React.DOM.div({className: "clndr"}, 
        app.CalendarControls({date: this.state.date, onPrev: this.prev, onNext: this.next}), 

        React.DOM.div({className: "calendar-grid"}, 
          React.DOM.div({className: "days"}, days.map(this.createDay)), 
          React.DOM.div({className: "clearfix"})
        )
      )
    );
  },

  _getEventsOfMonth: function(yearMonth) {
    // var googleEvents = new Backbone.GoogleEvents(this.props.collection);

    // var googleEvents = this.props.eventscollection;
    var googleEvents = this.state.collection;

    if (googleEvents.length && !(googleEvents instanceof Backbone.GoogleEvents)) {
      googleEvents = new Backbone.GoogleEvents(googleEvents);
    }

    // console.log('gridGoogleEvents: ', googleEvents);
    // window.gridGoogleEvents = googleEvents;

    var eventsOfMonth = googleEvents.length && googleEvents.where({yearMonth: yearMonth}) || [];
    console.log('eventsOfMonth: ', eventsOfMonth.length);

    return eventsOfMonth;
  },

  /**
   * Return an array of days for the current month
   */
  _getDaysOfMonth: function() {
    var days = [];

    var yearMonth = app.Util.yearMonth(this.state.date);

    var events = this._getEventsOfMonth(yearMonth);

    events = new Backbone.Collection(events);

    // debugger;

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

    // days in month
    var daysInMonth = iterator.daysInMonth();

    // for (var index = 1; index <= daysInMonth; index++) {
    var month = iterator.month();

    while (month === iterator.month()) {
      var iteratorDate = iterator.date();

      var date = {
        moment: iterator.clone(),
        className: 'date'
      };

      var now = moment();

      var dateEvents = events.filter(function(item) {
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